<!-- 商品基本信息选项卡-->
<template>
    <div class="container-fluid">
        <div class="page-header" style="margin:0;">
            <h1 style="font-weight: bold;">基本信息</h1>
        </div>
        <el-row style="padding-top: 15px;">
            <el-col :span="4">
                <div id="menuContent" class="menuContent well" v-show="!goodsObj.goodsId">
                    <div class="page-header" style="margin:0;">
                        <!--  <el-alert title="操作提示" type="info" description="请选择您要创建的品类" show-icon :closable="false">
                            </el-alert> -->
                        <h1><i class="el-icon-menu"></i> 请选择商品主分类</h1>
                    </div>
                    <ul id="classTree22" class="ztree classifyTree" style="margin-top:0px; width:100%;padding-top: 15px;min-height: 690px;overflow: auto;"></ul>
                </div>
            </el-col>
            <el-col :span="4">
                <div id="menuContent" class="menuContent well">
                    <div class="page-header" style="margin:0;">
                        <!--  <el-alert title="操作提示" type="info" description="请选择您要创建的品类" show-icon :closable="false">
                            </el-alert> -->
                        <h1><i class="el-icon-menu"></i>商品副分类(可选)</h1>
                    </div>
                    <ul id="classTree3" class="ztree classifyTree3" style="margin-top:0px; width:100%;padding-top: 15px;min-height: 690px;overflow: auto;"></ul>
                </div>
            </el-col>
            <el-col :span="12">
                <el-form :model="goodsObj" :rules="rules" ref="goodsObj" label-width="100px" style="min-width: 370px;max-width: 550px;">
                    <el-form-item label="商品主分类" prop="classifyId">
                        <input type="hidden" v-model.number="goodsObj.classifyId"></input>
                        <el-input v-model="goodsObj.classifyName" :maxlength="20" readonly placeholder="请选择主分类"></el-input>
                        <!-- <el-select v-model="goodsObj.classifyId" @change="onChangeClassify" filterable clearable>
                                <el-option v-for="(item, index) in paramObj.shopClassifyData" :label="item.classifyName" :value="item.classifyId + ''"></el-option>
                            </el-select> -->
                    </el-form-item>
                    <el-form-item label="商品类型" prop="goodsType" required v-if="!goodsObj.goodsId">
                        <el-radio-group v-model="goodsObj.goodsType" @change="onGoodsTypeChange">
                            <el-radio :label="0">单品</el-radio>
                            <el-radio :label="1">规格商品</el-radio>
                            <el-radio :label="2">组合商品</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="商品类型" v-if="goodsObj.goodsId">
                        <span v-if="goodsObj.goodsType===0"><el-tag>单品</el-tag></span>
                        <span v-if="goodsObj.goodsType===1"><el-tag>规格商品</el-tag></span>
                        <span v-if="goodsObj.goodsType===2"><el-tag>组合商品</el-tag></span>
                    </el-form-item>
                    <el-form-item label="库存类型" prop="stockType">
                        <el-radio-group v-model.number="goodsObj.stockType" @change="onStockTypeChange">
                            <el-radio :label="0">无限制</el-radio>
                            <el-radio :label="1" v-show="goodsObj.goodsType==0">独立库存</el-radio>
                            <el-radio :label="2" v-show="goodsObj.goodsType==1">共享库存</el-radio>
                            <el-radio :label="3" v-show="goodsObj.goodsType==1">独立库存</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="库存数量" v-show="goodsObj.stockType===1||goodsObj.stockType===2" prop="stockNumber">
                        <el-input-number v-model.number="goodsObj.stockNumber" :min="0" :max="99999" :maxlength="5" placeholder="库存数量"></el-input-number>
                    </el-form-item>
                    <el-form-item label="库存提醒" v-show="goodsObj.stockType===1||goodsObj.stockType===2" prop="stockWarn">
                        <el-input-number v-model.number="goodsObj.stockWarn" :min="0" :max="99999" :maxlength="5" placeholder="库存提醒"></el-input-number>
                    </el-form-item>
                    <el-form-item label="商品编码" prop="goodsSn">
                        <el-input v-model="goodsObj.goodsSn" :maxlength="50" placeholder="商品编码"></el-input>
                    </el-form-item>
                    <el-form-item label="商品名称" prop="goodsName">
                        <el-input v-model="goodsObj.goodsName" :maxlength="100" placeholder="商品名称" @input="vm.$emit('_goodsNameChange', goodsObj.goodsName)"></el-input>
                    </el-form-item>
                    <el-form-item label="商品全称">
                        <el-input v-model="goodsObj.goodsFullName" :maxlength="250" placeholder="商品全称"></el-input>
                    </el-form-item>
                    <el-form-item label="商品简介" prop="goodsDesc">
                        <el-input type="textarea" v-model="goodsObj.goodsDesc" :maxlength="250" placeholder="商品简介"></el-input>
                    </el-form-item>
                    <el-form-item label="商品品牌">
                        <el-select v-model="goodsObj.brandId" filterable clearable>
                            <el-option v-for="(item, index) in brandData" :label="item.brandName" :value="item.brandId + ''"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="排序">
                        <el-input-number v-model="goodsObj.sortIndex" :min="1" :max="100" :maxlength="3"></el-input-number>
                    </el-form-item>
                    <el-form-item label="总销量初始值" prop="virtualSaleNumber">
                    <el-input v-model.number="goodsObj.virtualSaleNumber" :maxlength="8" placeholder="点击随机生成" style="width:170px;"></el-input>
                        <el-button type="primary" size="mini" @click.native.prevent="onGenerator">生成随机数</el-button>
                    </el-form-item>
                    <el-form-item label="商品主图片" prop="goodsPic">
                        <div class="_classify-uploader">
                            <div class="_upload-select" @click="openShopFileDialog">
                                <div class="_upload-select-box">
                                    <div class="_upload-select-icon"><i class="el-icon-upload"></i></div>
                                    <div class="_upload-select-text">点击上传商品图片</div>
                                    <div class="_upload-select-preview" v-show="!!goodsObj.goodsPic && (goodsObj.goodsPic.length > 1)">
                                        <img :src="goodsObj.goodsPic !== picMD5_0 ? ((cloudShowUrl + goodsObj.goodsPic)) : goodsPic">
                                        <div class="_upload-select-cover"> <span>点击更换图片</span> </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item v-if="!paramObj.view">
                        <el-button type="primary" @click.native.prevent="nextFlag=true;handleSaveAndNext()">保存商品并继续编辑</el-button>
                        <el-button type="primary" @click.native.prevent="nextFlag=false;handleSaveAndNext()">保存</el-button>
                        <el-button type="default" @click.native.prevent="$emit('forward','','GoodsList')">返回到列表</el-button>
                    </el-form-item>
                </el-form>
                <!--商品图库Dialog-->
                <el-dialog title="商品图库" v-model="shopFileDialog" class="shop-img-file-dialog">
                    <!-- <component is="ShopFile" @onSuccess=""></component> -->
                    <shop-file @onSuccess="getShopFile" :vm="tab5vm"></shop-file>
                </el-dialog>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import ShopFile from 'pages/main/mall/common/components/shop_file'
import {
    saveGoodsFormTab1,
    getMallGoodsClassifyMapList
} from 'actions/goodsAction'
import prettysize from "lib/utils/prettysize"
import RegExp from 'lib/utils/regexp'
export default {
    name: 'goods_from_tab1',
    components: {
        ShopFile
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
    computed: {
        cloudShowUrl() {
            return this.$store.getters.cloudShowUrl
        }
    },
    data() {
        return {
            showTree: true,
            nextFlag: true,
            brandData: [],
            goodsPic: '',
            uploading: 0,
            picMD5_0: '',
            shopFileDialog: false,
            tab5vm: new this.$root.constructor(),
            cDataBak:[],
            goodsObj: {
                goodsId: undefined,
                classifyName: '',
                brandId: '',
                classifyId: undefined,
                goodsSn: '',
                goodsName: '',
                goodsFullName: '',
                goodsDesc: '',
                sortIndex: 1,
                goodsPic: '',
                goodsType: 0,
                stockType: 0,
                stockNumber: 0,
                stockWarn: 0,
                virtualSaleNumber:0,
                classifyIDs:''
            },
            rules: {
                classifyId: [{
                    type: 'number',
                    required: true,
                    message: '请选择主分类',
                    trigger: 'change'
                }],
                goodsSn: [{
                    required: true,
                    message: '请输入商品编码',
                    trigger: 'blur'
                }],
                goodsName: [{
                    required: true,
                    message: '请输入商品名称',
                    trigger: 'blur'
                }],
                goodsFullName: [{
                    required: true,
                    message: '请输入商品全称',
                    trigger: 'blur'
                }],
                goodsDesc: [{
                    required: true,
                    message: '请输入商品简介',
                    trigger: 'blur'
                }],
                goodsPic: [{
                    required: true,
                    message: '请输入商品图片',
                    trigger: 'blur'
                }],
                stockType: [{
                    type: 'number',
                    required: true,
                    message: '请选择库存类型',
                    trigger: 'blur'
                }],
                stockNumber: [{
                    type: 'number',
                    required: true,
                    trigger: 'blur',
                    message: '请输入库存数量 '
                }, {
                    pattern: RegExp.numer,
                    trigger: 'blur',
                    message: '格式错误， 请输入一个整数'
                }],
                virtualSaleNumber: [{
                    type: 'number',
                    required: true,
                    trigger: 'blur',
                    message: '请输入总销量初始值 '
                }, {
                    pattern: RegExp.numer,
                    trigger: 'change',
                    message: '格式错误， 请输入一个整数'
                }],
                stockWarn: [{
                    type: 'number',
                    required: true,
                    message: '请输入库存提醒设置数量',
                    trigger: 'blur'
                }, {
                    pattern: RegExp.numer,
                    trigger: 'blur',
                    message: '格式错误， 请输入一个整数'
                }]
            }
        }
    },
    methods: {
        onGenerator(){
            this.goodsObj.virtualSaleNumber=_.random(1, 10000)
        },
        showMenu() {
            // var cityObj = $("#citySel");
            // var cityOffset = $("#citySel").offset();
            // $("#menuContent").css({
            //     left: cityOffset.left + "px",
            //     top: cityOffset.top + cityObj.outerHeight() + "px"
            // }).slideDown("fast");
            // $("body").bind("mousedown", this.onBodyDown);
        },
        // onBodyDown(event) {
        //     if (!(event.target.id == "menuBtn" || event.target.id == "citySel" || event.target.id == "menuContent" || $(event.target).parents("#menuContent").length > 0)) {
        //         this.hideMenu();
        //     }
        // },
        // hideMenu() {
        //     $("#menuContent").fadeOut("fast");
        //     $("body").unbind("mousedown", this.onBodyDown);
        // },
        onGoodsTypeChange(v) {
            //v:商品类型 0 SPU商品 1 SKU商品 2 组合商品
            this.goodsObj.stockType = 0
            this.goodsObj.stockNumber = 0
            this.goodsObj.stockWarn = 0
            this.$store.getters.ev.$emit('onchangeGoodsType', v)
        },
        onStockTypeChange(v) {
            this.goodsObj.stockNumber = 0
            this.goodsObj.stockWarn = 0
            this.$store.getters.ev.$emit('onchangeStockType', v)
        },
        openShopFileDialog() {
            this.shopFileDialog = true
            this.tab5vm.$emit('on-load')
        },
        getShopFile(shopFiles) {
            if (shopFiles.length == 0) {
                this.shopFileDialog = false
                return false
            }
            if (shopFiles.length > 1) {
                this.$message.error('只能选择一张图片')
                return false
            } else {
                this.shopFileDialog = false
                this.picMD5_0 = shopFiles[0].fileMd5
                this.goodsPic = this.cloudShowUrl + shopFiles[0].fileMd5
                this.goodsObj.goodsPic = shopFiles[0].fileMd5
            }
        },
        onTreeClick(event, treeId, treeNode) {
            this.goodsObj.classifyId = treeNode.classifyId
            this.goodsObj.classifyName = treeNode.classifyName
            if (this.vm) {
                this.vm.$emit('classify-onchange', this.goodsObj.classifyId)
                this.vm.$emit('classify-onchange-skuproperty', this.goodsObj.classifyId)
            }
        },
        // 图片上传
        uploadBefore(file) {
            // 限制文件大小 (大图500kb)
            if (parseInt(prettysize(file.size)) > 500) {
                this.$message.error('图片不能超过500kb, 请重新上传!')
                return false
            }

            this.uploading = 1
            try {
                this.goodsPic = URL.createObjectURL(file)
            } catch (err) {
                this.goodsPic = false
                console.log('URL.createObjectURL', err)
            }
        },

        uploadSuccess(response, file, fileList) {
            if (response.success) {
                this.uploading = 0
                this.picMD5_0 = response.result.picMD5
                this.goodsPic = this.cloudShowUrl + response.result.picMD5
                this.goodsObj.goodsPic = response.result.picMD5
            }
        },

        uploadError(err, response, file) {
            this.uploading = 2
            this.goodsObj.goodsPic = ''
            this.goodsPic = ''
        },

        handleSaveAndNext() {
            var ctree = $.fn.zTree.getZTreeObj("classTree3")
            let checkedClassifyIds=_.map(ctree.getCheckedNodes(true), 'classifyId')
            this.goodsObj.classifyIDs=checkedClassifyIds.join(',')
            // 商品类型 0 SPU商品 1 SKU商品 2 组合商品
            // if (this.goodsObj.goodsType === 2) {
            //     let bindGoodsData = this.$refs.bindGoodsCom.bindGoodsData
            //     if (bindGoodsData.length === 0) {
            //         this.$message.error('组合商品必须添加商品到组合中')
            //         return false
            //     }
            //     bindGoodsData.forEach((item, i) => {
            //         item.sortIndex = i + 1
            //     })
            //     this.goodsObj.bindGoodsDataJson = JSON.stringify(bindGoodsData)
            //         //console.log('this.goodsObj.bindGoodsDataJson', this.goodsObj.bindGoodsDataJson);
            // }
            this.$refs.goodsObj.validate((valid) => {
                if (valid) {
                    this.paramObj.goodsObj.goodsType = this.goodsObj.goodsType
                    this.paramObj.goodsObj.goodsName = this.goodsObj.goodsName
                    saveGoodsFormTab1(this.goodsObj).then(data => {
                        const {
                            success,
                            msg,
                            result
                        } = data
                        if (success) {
                            this.goodsObj.goodsId = result
                            this.paramObj.goodsObj.goodsId = result
                            this.$message.success('操作成功')
                            if (this.nextFlag) {
                                if (_.toNumber(this.goodsObj.goodsType) === 2) {
                                    this.$emit('forward', 'tab3', this.goodsObj)
                                } else {
                                    this.$emit('forward', 'tab2', this.goodsObj)
                                }
                            }
                        } else {
                            this.$message.error(msg)
                            return false
                        }
                    })
                }
            })
        }
    },
    created() {
        if (this.paramObj.goodsObj.goodsId) {
            //Object.assign(this.goodsObj, this.paramObj.goodsObj)
            this.goodsObj = _.pick(this.paramObj.goodsObj, _.keys(this.goodsObj))
            this.goodsObj.classifyId = this.goodsObj.classifyId
            this.goodsObj.brandId = this.goodsObj.brandId + ''
            this.$store.getters.ev.$emit('onchangeGoodsType', _.toNumber(this.goodsObj.goodsType))
        }
        
    },
    mounted() {
        this.$store.getters.ev.$once('onchangeData', (data) => {
            this.brandData = data.shopBrandList || []
            let setting = { //zTree配置
                view: {
                    showIcon: false
                },
                check: {
                    enable: true,
                    //autoCheckTrigger: true,
                    chkStyle: "radio",
                    radioType: "all"
                },
                data: {
                    key: {
                        name: "classifyName"
                    },
                    simpleData: {
                        enable: true,
                        idKey: "classifyId",
                        pIdKey: "parentId",
                    }
                },
                callback: {
                    onClick: function(event, treeId, treeNode) {
                        treeObj.checkNode(treeNode, true, false, true)
                    },
                    onCheck: (event, treeId, treeNode) => this.onTreeClick(event, treeId, treeNode),
                }
            }
            var setting2 = {
                treeId:'classTree3',
                view: {
                    showIcon: false
                },
                check: {
                    enable: true
                },
                data: {
                    key: {
                        name: "classifyName"
                    },
                    simpleData: {
                        enable: true,
                        idKey: "classifyId",
                        pIdKey: "parentId",
                    }
                },
                callback: {
                    onClick: function(event, treeId, treeNode) {
                        treeObj2.checkNode(treeNode, true, false, true);
                    }
                }
            };
            let cData = data.shopClassifyData
            if (this.goodsObj.goodsId) {
                let classifyObj = _.find(cData, {
                    'classifyId': this.goodsObj.classifyId
                })
                if (classifyObj) {
                    this.goodsObj.classifyName = classifyObj.classifyName
                }
            }
            var treeObj2;
            this.cDataBak=JSON.parse(JSON.stringify(cData))
            this.cDataBak.forEach(function(item) {
                if (item.childNumber > 0) {
                    item.nocheck = true
                    item.open = true
                }
            })
            cData.forEach(function(item) {
                if (item.childNumber > 0) {
                    item.nocheck = true
                    item.open = true
                }
            })
            if (this.paramObj.goodsObj.goodsId) {
               getMallGoodsClassifyMapList({'goodsId':this.paramObj.goodsObj.goodsId}).then((data)=>{
                 if(data.length>0){
                    this.cDataBak.forEach(function(item) {
                          if(_.includes(data, item.classifyId)){
                            item.checked=true
                          }
                  })
                 }
                 treeObj2 = $.fn.zTree.init($(this.$el.querySelector('.classifyTree3')), setting2, this.cDataBak)
                })
             }else{
                 treeObj2 = $.fn.zTree.init($(this.$el.querySelector('.classifyTree3')), setting2, cData)
             }

            var treeObj = $.fn.zTree.init($(this.$el.querySelector('.classifyTree')), setting, cData)
            
        })
    }
}
</script>
<style lang="sass">
</style>
