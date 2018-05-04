<!-- 商品新增修改主界面-->
<template>
    <div class="_container">
        <card-panel>
            <span slot="title">{{paramObj.goodsId?'编辑商品':'创建商品'}}</span>
            <div slot="panel-btns">
                <el-button size="small" type="success" @click.native.prevent="$emit('forward','GiftList')">返回商品列表</el-button>
            </div>
            <div slot="panel-body">
                <el-form :model="giftObj" :rules="rules" ref="giftObj" label-width="150px">
                    <el-form-item label="商品名称" prop="goodsName">
                        <el-input v-model="giftObj.goodsName" :maxlength="100" style="width:330px"></el-input>
                    </el-form-item>
                    <el-form-item label="商品类型">
                        <el-input v-model="giftObj.classifyName" :maxlength="20" icon="search" :on-icon-click="handleIconClick" style="width:330px" readonly placeholder="点击选择按钮"></el-input>
                    </el-form-item>
                    <el-form-item label="商品全称">
                        <el-input v-model="giftObj.goodsFullName" :maxlength="250" placeholder="商品全称" style="width:330px"></el-input>
                    </el-form-item>
                    <el-form-item label="商品简介">
                        <el-input type="textarea" v-model="giftObj.goodsDesc" :maxlength="500" placeholder="商品简介" style="width:330px"></el-input>
                    </el-form-item>
                    <el-form-item label="商品编号">
                        <el-input v-model="giftObj.goodsSn" :maxlength="50" style="width:330px"></el-input>
                    </el-form-item>
                    <el-form-item label="商品单位">
                        <el-input v-model="giftObj.unit" :maxlength="5" style="width:330px"></el-input>
                    </el-form-item>
                    <el-form-item label="市场价" prop="marketPrice">
                        <el-input v-model.number="giftObj.marketPrice" :maxlength="10" style="width:330px"></el-input>&nbsp;&nbsp;（单位：元）
                    </el-form-item>
                    <el-form-item label="库存数量" prop="stockNumber" v-if="!paramObj.goodsId">
                        <el-input v-model.number="giftObj.stockNumber" :maxlength="7" style="width:330px"></el-input>
                    </el-form-item>
                    <el-form-item label="排序" prop="sortIndex">
                        <el-input v-model.number="giftObj.sortIndex" :maxlength="7" style="width:330px"></el-input>
                    </el-form-item>
                    <el-form-item label="商品主图片">
                        <div class="_classify-uploader">
                            <div class="_upload-select" @click="openShopFileDialog(0)">
                                <div class="_upload-select-box">
                                    <div class="_upload-select-icon"><i class="el-icon-upload"></i></div>
                                    <div class="_upload-select-text">点击上传商品图片</div>
                                    <div class="_upload-select-preview" v-show="!!giftObj.goodsPic && (giftObj.goodsPic.length > 1)">
                                        <img :src="giftObj.goodsPic !== picMD5_0 ? ((cloudShowUrl + giftObj.goodsPic)) : goodsPic">
                                        <div class="_upload-select-cover"> <span>点击更换图片</span> </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="商品图片">
                        <el-button type="warning" size="small" @click.native.prevent="openShopFileDialog(1)">选择商品图片</el-button>
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
                    </el-form-item>
                    <el-form-item label="商品详情">
                        <el-button type="warning" size="small" @click.native.prevent="openShopFileDialog(2)">选择商品详情图片</el-button>
                        <draggable :list="tableData1" :options="{group:'people'}" class="_draggable-wrapper">
                            <div v-for="(element, idx) in tableData1" class="_drag-div" :index="idx">
                                <div class="_drag-div-img"><img :src="cloudShowUrl+element.fileMd5"></div>
                                <div class="_drag-div-caption">
                                    <!-- <p title="">{{element.fileMd5}}</p> -->
                                    <el-tooltip effect="light" :content="element.fileMd5" placement="top">
                                        <!-- <p><el-button size="mini">{{element.fileMd5}}</el-button></p> -->
                                        <p>{{element.fileMd5}}</p>
                                    </el-tooltip>
                                    <el-button class="_drag-div-btn" size="mini" type="danger" @click.native.prevent="onDelete1(element)" v-if="!paramObj.view">移除</el-button>
                                </div>
                            </div>
                        </draggable>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click.stop.prevent="onSave(1)">保存</el-button>
                        <!-- <el-button type="primary" @click.stop.prevent="onSave(1)">保存并上架</el-button> -->
                        <el-button @click.native.prevent="$emit('forward','GiftList')">返回列表</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </card-panel>
        <!--商品品类Dialog-->
        <goods-classify ref="goodsClassifyCom" @onSuccess="onSelectedClassify"></goods-classify>
        <!--商品图库Dialog-->
        <el-dialog title="商品图库" v-model="shopFileDialog" class="shop-img-file-dialog">
            <shop-file @onSuccess="getShopFile" :vm="tab5vm"></shop-file>
        </el-dialog>
    </div>
</template>
<script>
import ShopFile from 'pages/main/mall/common/components/shop_file'
import GoodsClassify from '../goods/components/goods_form/goods-classify'
import draggable from 'vuedraggable'
import RegExp from 'lib/utils/regexp'
import {
    addOrUpdateGift
} from 'actions/giftAction'
export default {
    name: 'gift_form',
    components: {
        ShopFile,
        GoodsClassify,
        draggable
    },
    props: {
        paramObj: {
            type: Object,
            default: {}
        }
    },
    computed: {
        cloudShowUrl() {
            return this.$store.getters.cloudShowUrl
        },
        queryParams() {
            return this.$store.getters.queryParams
        }
    },
    data() {
        return {
            goodsPic: '',
            uploading: 0,
            picMD5_0: '',
            tab5vm: new this.$root.constructor(),
            shopFileDialog: false,
            tableData: [],
            tableData1:[],
            shopFileIndex: 0,
            giftObj: {
                goodsName: '',
                goodsFullName: '',
                classifyId: undefined,
                classifyName: '',
                goodsPic: '',
                goodsDesc: '',
                goodsSn: '',
                unit: '',
                marketPrice: '0.00',
                stockNumber: 1,
                sortIndex: 0
            },
            rules: {
                goodsName: [{
                    required: true,
                    message: '请输入商品名称',
                    trigger: 'blur'
                }],
                marketPrice: [{
                    type: 'number',
                    required: true,
                    trigger: 'blur',
                    message: '格式错误，请输入大于0且小数位不超过两位的数字 '
                }, {
                    pattern: RegExp.amount,
                    trigger: 'blur',
                    message: '格式错误， 格式：0.00'
                }],
                stockNumber: [{
                    type: 'number',
                    required: true,
                    message: '库存数量不能为空',
                    trigger: 'change'
                }, {
                    pattern: RegExp.numer,
                    trigger: 'blur',
                    message: '格式错误， 请输入一个整数'
                }],
                sortIndex: [{
                    type: 'number',
                    required: true,
                    message: '排序不能为空',
                    trigger: 'change'
                }, {
                    pattern: RegExp.numer,
                    trigger: 'blur',
                    message: '格式错误， 请输入一个整数'
                }]
            },
            pickerOptions0: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            }
        }
    },
    methods: {
        onDelete(row) {
            var index = this.tableData.indexOf(row)
            if (index !== -1) {
                this.tableData.splice(index, 1)
            }
        },
        onDelete1(row) {
            var index = this.tableData1.indexOf(row)
            if (index !== -1) {
                this.tableData1.splice(index, 1)
            }
        },
        onSelectedClassify(c) {
            this.giftObj.classifyId = c.classifyId
            this.giftObj.classifyName = c.classifyName
        },
        handleIconClick() {
            this.$refs.goodsClassifyCom.goodsClassifyDialog = true
        },
        openShopFileDialog(i) {
            this.shopFileIndex = i
            this.shopFileDialog = true
            this.tab5vm.$emit('on-load')
        },
        getShopFile(shopFiles) {
            if (this.shopFileIndex === 0) {
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
                    this.giftObj.goodsPic = shopFiles[0].fileMd5
                }
            } else if(this.shopFileIndex === 1){
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
            }else{
                this.shopFileDialog = false
                if (shopFiles.length == 0) {
                    return false
                }
                let fileSize = this.tableData1.length + shopFiles.length
                    //console.log('fileSize',fileSize)
                if (fileSize >= 6) {
                    this.$message.error('最多只能添加5张图片')
                    return false
                }
                shopFiles.forEach(item => {
                    if (!this.tableData1.some(data => data.fileMd5 === item.fileMd5)) {
                        item.goodsFileType = 0
                        this.tableData1.unshift(item)
                    }
                })
            }

        },
        onSave(v) {
            this.$refs.giftObj.validate(valid => {
                if (valid) {
                    let params = {}
                    Object.assign(params, this.giftObj)
                    //商品图
                    let pics = []
                    if (this.tableData.length > 0) {
                        _.forEach(this.tableData, item => {
                            pics.push(item.fileMd5)
                        })
                    }
                    //商品详情图
                    let pics2 = []
                    if (this.tableData1.length > 0) {
                        _.forEach(this.tableData1, item => {
                            pics2.push(item.fileMd5)
                        })
                    }
                    params.goodsPics = pics.join(',')
                    //商品详情图
                    params.strVal1 = pics2.join(',')
                    params.statusCode = v
                    params.goodsDesc=_.escapeRegExp(params.goodsDesc)
                    //console.log(params)
                    addOrUpdateGift(params).then(data => {
                        if (data.success) {
                            this.$message.success('操作成功')
                            this.$emit('forward', 'GiftList')
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
        if (this.paramObj.goodsId) {
            Object.assign(this.giftObj, _.pick(this.paramObj, ['goodsId','goodsName', 'goodsFullName', 'classifyId', 'classifyName', 'goodsPic', 'goodsDesc', 'goodsSn', 'unit', 'marketPrice', 'sortIndex']))
            this.$set(this.giftObj,'goodsDesc',_.unescape(this.giftObj.goodsDesc))
            this.giftObj.goodsDesc=_.unescape(this.giftObj.goodsDesc)
            if(this.paramObj.goodsPics&&this.paramObj.goodsPics.length>1){
                let pics=this.paramObj.goodsPics.split(',')
                _.forEach(pics,p=>{
                    let item={'fileMd5':p}
                    this.tableData.push(item)
                })
            }
            if(this.paramObj.strVal1&&this.paramObj.strVal1.length>1){
                let pics=this.paramObj.strVal1.split(',')
                _.forEach(pics,p=>{
                    let item={'fileMd5':p}
                    this.tableData1.push(item)
                })
            }
        }
    }
}
</script>
