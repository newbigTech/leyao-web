<template lang="html">
    <!-- 页面重构 2016-11-21 by cy -->
    <!-- 商品图片 -->
    <div class="container-fluid">
        <div class="page-header" style="margin:0;">
            <div class="row">
                <div class="col-md-8 flex-vc">
                    <h1 style="font-weight: bold; margin-right: 15px;">商品图片 - (图片可以拖动排序,建议尺寸:<b style="color: #FF2B53">750x640</b>)</h1>
                    <el-button v-if="!paramObj.view" type="warning" size="small" @click.native.prevent="openShopFileDialog">选择商品图片</el-button>
                </div>
                <!-- <div class="col-md-4" style="text-align: right;" v-if="!paramObj.view">
                    <el-button type="success" size="small" @click.native.prevent="openShopFileDialog">选择商品图片</el-button>
                </div> -->
            </div>
        </div>
        <div class="container-fluid" style="padding-top: 15px;" v-show="tableData.length == 0">
            <el-alert title="请选择商品图片!" type="info" :closable="false" show-icon></el-alert>
        </div>
        <div style="padding-top: 15px;"></div>
        <draggable :list="tableData" :options="{group:'people'}" class="_draggable-wrapper">
            <div v-for="(element, idx) in tableData" class="_drag-div" :index="idx">
                <div class="_drag-div-img"><img :src="cloudShowUrl+element.fileMd5"></div>
                <div class="_drag-div-caption">
                    <!-- <p title="">{{element.fileMd5}}</p> -->
                    <el-tooltip effect="light" :content="element.fileMd5" placement="top">
                        <!-- <p><el-button size="mini">{{element.fileMd5}}</el-button></p> -->
                        <p>{{element.fileMd5}}</p>
                    </el-tooltip>
                    <el-button class="_drag-div-btn" size="mini" type="danger" @click.native.prevent="onDelete(element)" v-if="!paramObj.view">移除</el-button>
                </div>
            </div>
        </draggable>
        <div v-if="!paramObj.view">
            <el-button v-show="tableData.length" type="primary" @click.native.prevent="nextFlag=true;handleSaveAndNext()">保存商品并继续编辑</el-button>
            <el-button v-show="tableData.length" type="primary" @click.native.prevent="nextFlag=false;handleSaveAndNext()">保存</el-button>
            <el-button type="primary" @click.native.prevent="handleSaveAndNext(1)">保存并上架</el-button>
            <el-button v-show="tableData.length" type="default" @click.native.prevent="$emit('forward','','GoodsList')">返回到列表</el-button>
        </div>
        <!--商品图库Dialog-->
        <el-dialog title="商品图库" v-model="shopFileDialog" class="shop-img-file-dialog">
            <shop-file @onSuccess="getShopFile" :vm="tab5vm"></shop-file>
        </el-dialog>
    </div>
</template>
<script>
import ShopFile from 'pages/main/mall/common/components/shop_file'
import {
    saveGoodsFormTab5,
    saveGoodState
} from 'actions/goodsAction'
import draggable from 'vuedraggable'
export default {
    name: 'goods_from_tab5',
    props: {
        vm: {
            type: Object
        },
        paramObj: {
            type: Object,
            default: {}
        }
    },
    components: {
        ShopFile,
        draggable
    },
    computed: {
        cloudShowUrl() {
            return this.$store.getters.cloudShowUrl
        }
    },
    data() {
        return {
            nextFlag: true,
            goodsObj: {
                goodsId: undefined,
                fileType: 0,
                goodsFileType: 0,
                fileDataJsonStr: undefined
            },
            shopFileDialog: false,
            tableData: [],
            tab5vm: new this.$root.constructor()
        }
    },
    methods: {
        onDelete(row) {
            var index = this.tableData.indexOf(row)
            if (index !== -1) {
                this.tableData.splice(index, 1)
            }
        },
        openShopFileDialog() {
            this.shopFileDialog = true
            this.tab5vm.$emit('on-load')
        },
        getShopFile(shopFiles) {
            this.shopFileDialog = false
            if (shopFiles.length == 0) {
                return false
            }
            let fileSize = this.tableData.length + shopFiles.length
                //console.log('fileSize',fileSize)
            if (fileSize >= 6) {
                this.$message.error('最多只能添加5张图片')
                return false
            }
            shopFiles.forEach(item => {
                    if (!this.tableData.some(data => data.fileMd5 === item.fileMd5)) {
                        item.goodsFileType = 0
                        this.tableData.unshift(item)
                    }

                })
                //this.tableData=this.tableData.concat(shopFiles)
        },
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
        handleSaveAndNext(v) {
            if (this.tableData.length > 0) {
                _.forEach(this.tableData, (item, index) => {
                    item.sortIndex = index + 1
                })
                this.goodsObj.fileDataJsonStr = JSON.stringify(this.tableData)
            }
            if (this.paramObj.goodsObj.goodsId) {
                this.goodsObj.goodsId = this.paramObj.goodsObj.goodsId
                saveGoodsFormTab5(this.goodsObj).then(data => {
                    const { success, msg, result } = data
                    if (success) {
                        if (v && v == 1) {
                            this.onSetState()
                        } else {
                            this.$message.success('操作成功')
                            if (this.nextFlag) {
                                if (_.toNumber(this.paramObj.goodsObj.goodsType) === 1) {
                                    this.$emit('forward', 'tab6', this.goodsObj)
                                } else {
                                    this.$emit('forward', 'tab7', this.goodsObj)
                                }
                            }
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
    },
    created() {
        this.$store.getters.ev.$once('onchangeData', (data) => {
            this.tableData = data.goodsObj.goodsFileData || []
        })
        if (this.paramObj.goodsObj.goodsId) {
            this.goodsObj.goodsId = this.paramObj.goodsObj.goodsId
                //Object.assign(this.goodsObj, _.pick(this.paramObj.goodsObj,['goodsId'])
                //this.goodsObj=_.pick(this.paramObj.goodsObj,_.keys(this.goodsObj))
                //Object.assign(this.goodsObj, this.paramObj.goodsObj)
        }
    }
}
</script>
<style lang="css">
</style>
