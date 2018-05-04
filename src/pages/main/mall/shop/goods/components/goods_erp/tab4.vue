<style lang="css">
</style>
<template lang="html">
    <div class="container-fluid">
        <div class="page-header" style="margin:0;">
            <h1 style="font-weight: bold;">设置商品分组/标签</h1>
        </div>
        <div style="padding-top: 15px;"></div>
        <el-form :model="goodsObj" :rules="rules" ref="goodsObj" label-width="120px" style="width: 750px;">
            <el-form-item label="选择商品分组" prop="customClassifyId">
                <el-row type="flex">
                    <el-col>
                        <el-select v-model="goodsObj.customClassifyId" placeholder="请选择商品分组" filterable clearable>
                            <el-option v-for="(item, index) in paramObj.shopCustomClassifyData" :label="item.classifyName" :value="item.customClassifyId"></el-option>
                        </el-select>
                    </el-col>
                    <el-col style="width: 120px; margin-left: 12px;" v-if="!paramObj.view">
                        <el-button @click="addDomain">创建新分组</el-button>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item label="设置商品标签">
                <el-row type="flex">
                    <el-col>
                        <div class="_tags-text">
                            <!-- <el-input type="textarea"></el-input> -->
                            <div class="_tags-textarea clearfix" @click="editTags">
                                <div class="_placeholder" v-show="signTags.length == 0 && showPlaceholder">请按回车键输入标签,最多5个</div>
                                <el-tag v-for="tag in signTags" :closable="true" type="primary" @close="handleClose(tag)">
                                    <span>{{tag}}</span>
                                </el-tag>
                                <div class="_tags-input-div">
                                    <input type="text" class="_tags-input" maxlength="20" v-model="tagText" :style="{width: (50 + (this.tagText.length * 15)) + 'px'}" @keyup.enter="addTag" @blur="tagInputBlur">
                                </div>
                            </div>
                            <p style="color: #9aaabf;">请按回车键输入标签,最多5个</p>
                        </div>
                    </el-col>
                    <el-col style="width: 120px; margin-left: 12px;" v-if="!paramObj.view">
                        <el-button @click="onOpenSelectTag" style="padding-left: 15px;float: left;">选择标签</el-button>
                    </el-col>
                </el-row>
            </el-form-item>
            <el-form-item v-if="!paramObj.view">
                <el-button type="primary" @click.native.prevent="nextFlag=true;handleSaveAndNext()">保存商品并继续编辑</el-button>
                <el-button type="primary" @click.native.prevent="nextFlag=false;handleSaveAndNext()">保存</el-button>
                <el-button type="primary" @click.native.prevent="handleSaveAndNext(1)">保存并上架</el-button>
                <el-button type="default" @click.native.prevent="$emit('forward','','GoodsList')">返回到列表</el-button>
            </el-form-item>
        </el-form>
        <!-- 添加分组 -->
        <el-dialog title="创建新的商品分组" v-model="showDialogAddNewClassify" size="small" :show-close="false">
            <el-form :model="txtObj" :rules="rules" ref="txtObj" label-width="100px">
                <el-form-item v-for="(domain, index) in txtObj.domains" label="分组名称" :key="domain.key" :prop="'domains:' + index" :rules="{type: 'object', required: true,fields: {value: { required: true, message: '分组名称不能为空', trigger: 'blur' }}}">
                    <el-row type="flex">
                        <el-col>
                            <el-input v-model="domain.value"></el-input>
                        </el-col>
                        <el-col style="width: 300px; margin-left: 12px;">
                            <el-button type="primary" @click.native.prevent="onSaveCustomClassify(domain)">添加</el-button>
                            <el-button @click.native.prevent="removeDomain(domain)">取消</el-button>
                        </el-col>
                    </el-row>
                </el-form-item>
            </el-form>
        </el-dialog>
        <!--店铺标签Dialog-->
        <el-dialog title="店铺标签库" v-model="shopTagDialog" class="shop-img-file-dialog">
            <shop-tag @onSelectTag="onSelectTag" ref="tag_comp"></shop-tag>
        </el-dialog>
    </div>
</template>
<script>
import {
    saveCustomClassify,
    getCustomClassifyPageList
} from 'src/vuex/actions/shopCustomClassifyAction'
import {
    saveGoodsFormTab4,
    saveGoodState
} from 'actions/goodsAction'
import ShopTag from 'pages/main/mall/common/components/shop_tag'
export default {
    name: 'goods_from_tab4',
    components: {
        ShopTag
    },
    props: {
        vm: {
            type: Object
        },
        paramObj: {
            type: Object,
            default: {}
        }
    },
    computed: {},
    data() {
        return {
            shopTagDialog: false,
            nextFlag: true,
            signTags: [],
            showSignWell: false,
            signObj: {
                signName: '',
            },
            goodsObj: {
                goodsId: undefined,
                customClassifyId: '',
                goodsSign: ' '
            },
            txtObj: {
                domains: []
            },
            classifyObj: {},
            customClassifyData: [],
            page: 1,
            pageSize: 100,
            total: 0,
            rules: {
                signName: [{
                    required: true,
                    message: '请输入商品标签',
                    trigger: 'blur'
                }],
                customClassifyId: [{
                    type: 'number',
                    required: true,
                    message: '请选择一个分组',
                    trigger: 'change'
                }]
            },


            // 
            tagText: '',
            showPlaceholder: true,
            showDialogAddNewClassify: false,
        }
    },
    methods: {
        onSetState() {
            let params = {
                statusCode: 1,
                goodsId: this.goodsObj.goodsId
            }
            saveGoodState(params).then(data => {
                const {
                    success,
                    msg,
                    result
                } = data
                if (success) {
                    this.$message({
                        type: 'success',
                        message: '操作成功!'
                    });
                    this.$emit('forward', '', 'GoodsList')
                } else {
                    if (result) {
                        let gstr = _.map(result, 'goodsName').join(',')
                        this.$alert(`已绑定未上架商品有：${gstr}`, msg, {
                            confirmButtonText: '确定',
                            callback: action => {}
                        });

                    } else {
                        this.$message.error(msg);
                    }
                }
            })
        },
        onOpenSelectTag() {
            this.shopTagDialog = true
            if (this.$refs.tag_comp) {
                this.$refs.tag_comp.initData()
            }
        },
        onSelectTag(tags) {
            let _signTags = _.union(this.signTags, tags)
            if (_signTags.length > 5) {
                this.$message.info("最多只允许添加5个标签")
                return false
            }
            this.shopTagDialog = false
            this.signTags = _signTags
        },
        loadData() {
            let params = {
                classifyName: this.classifyObj.name,
                classifyFullName: this.classifyObj.fullName,
                pageNo: this.page,
                pageSize: this.pageSize
            }
            getCustomClassifyPageList(params).then(data => {
                const {
                    success,
                    result,
                    msg
                } = data
                if (success) {
                    //this.$nextTick(()=>{
                    this.paramObj.shopCustomClassifyData = result.rows
                    this.total = result.total
                        //})
                }
            })
        },
        handleSaveAndNext(v) {
            this.$refs.goodsObj.validate((valid) => {
                if (valid) {
                    if (this.paramObj.goodsObj.goodsId) {
                        if (this.signTags.length > 0) {
                            //this.goodsObj.goodsSign=_.map(this.signTags, 'name').join(',')
                            this.goodsObj.goodsSign = this.signTags.join(',')
                        } else {
                            this.goodsObj.goodsSign = " "
                        }
                        this.goodsObj.goodsId = this.paramObj.goodsObj.goodsId
                        saveGoodsFormTab4(this.goodsObj).then(data => {
                            const {
                                success,
                                msg,
                                result
                            } = data
                            if (success) {
                                if (v && v == 1) {
                                    this.onSetState()
                                } else {
                                    this.$message.success('操作成功')
                                    if (this.nextFlag)
                                        this.$emit('forward', 'tab5')
                                }

                            } else {
                                this.$message.error(msg)
                                return false
                            }
                        })
                    } else {
                        this.$message.info("请先保存商品基本信息")
                        this.$emit('forward', 'tab1')
                    }
                }
            })
        },
        onSaveCustomClassify(domain) {
            this.$refs.txtObj.validate((valid) => {
                console.log('this.$refs', valid);
            })
            if (domain.value.length > 0) {
                let params = {
                    classifyName: domain.value,
                    classifyFullName: domain.value,
                    sortIndex: 1
                }
                saveCustomClassify(params).then(data => {
                    const {
                        success,
                        result,
                        msg
                    } = data;
                    if (success) {
                        this.showDialogAddNewClassify = false
                        this.txtObj.domains = []
                        this.loadData()
                    } else {
                        this.$message.error(msg);
                    }
                })
            }
        },
        removeDomain(item) {
            var index = this.txtObj.domains.indexOf(item)
            if (index !== -1) {
                this.txtObj.domains.splice(index, 1)
            }
            this.showDialogAddNewClassify = false
        },
        addDomain() {
            this.showDialogAddNewClassify = true
            if (this.txtObj.domains.length === 1) return false
            this.txtObj.domains.push({
                key: this.txtObj.domains.length,
                value: ''
            });
        },
        onSaveSignName() {
            if (this.signTags.length > 4) {
                this.$message.error("最多只允许添加5个标签")
                return false
            }
            // this.$refs.singForm.validate((valid) => {
            //   if (valid) {
            //     this.signTags.push(this.signObj.signName)
            //     this.signObj.signName=''
            //   }
            // })
        },
        handleClose(tag) {
            this.signTags.splice(this.signTags.indexOf(tag), 1);
        },

        // 处理标签
        editTags(e) {
            // console.log('click tag')
            this.showPlaceholder = false
            this.$el.querySelector('._tags-input').focus()
        },
        addTag() {
            if (this.signTags.length > 4) {
                this.$message.error("最多只允许添加5个标签")
                this.tagText = ''
                return false
            }
            // console.log("addTag...")
            if (this.tagText.trim().length == 0) return
            this.signTags.push(this.tagText)
            this.signObj.signName = this.tagText

            this.tagText = ''
        },
        tagInputBlur() {
            console.log('tagInputBlur')

            if (this.signTags.length > 0 || this.tagText.length > 0) {
                this.showPlaceholder = false
            } else {
                this.showPlaceholder = true
            }
        }

    },
    created() {
        //this.loadData()
        if (this.paramObj.goodsObj.goodsId) {
            Object.assign(this.goodsObj, _.pick(this.paramObj.goodsObj, ['goodsId', 'customClassifyId', 'goodsSign']))
            if (this.goodsObj.goodsSign) {
                this.signTags = this.goodsObj.goodsSign.split(',')
            }
            //this.goodsObj=_.pick(this.paramObj.goodsObj,_.keys(this.goodsObj))
            //console.log('=-------',this.goodsObj)
        }
        // if(this.paramObj.goodsId){
        //    this.goodsObj.goodsId=this.paramObj.goodsId
        //    if(this.paramObj.customClassifyId!==0){
        //       this.goodsObj.customClassifyId=this.paramObj.customClassifyId
        //    }
        // }
    },
    mounted() {

    }
}
</script>
<style lang="sass">
._tags-text {
    ._tags-textarea {
        display: block;
        position: relative;
        padding: 5px 7px;
        line-height: 1.5;
        width: 100%;
        font-size: 14px;
        color: #1f2d3d;
        background-color: #fff;
        border: 1px solid #C0CCDA;
        border-radius: 4px;
        min-height: 57px;
        cursor: text;
        .el-tag {
            margin-top: 5px;
            margin-right: 5px;
        }
        ._tags-input-div {
            display: inline-block;
        }
        ._tags-input-div input {
            margin: 0px;
            font-family: helvetica;
            font-size: 13px;
            border: 1px solid transparent;
            // padding: 5px;
            background: transparent;
            color: #000;
            outline: 0px;
            width: 50px;
        }
        ._placeholder {
            position: absolute;
            top: 7px;
            left: 10px;
            color: #9aaabf;
        }
    }
}
</style>
