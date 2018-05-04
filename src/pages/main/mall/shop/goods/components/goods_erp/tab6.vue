<!-- 商品规格选项卡-->
<template>
    <div class="container-fluid">
        <div class="page-header" style="margin:0;">
            <h1 style="font-weight: bold;">设置商品规格</h1>
        </div>
        <div class="container-fluid" v-show="goodsObj.goodsType !== 1" style="padding-top: 15px;">
            <el-alert title="只有商品类型选择为规格商品时,才可以设置商品规格!" type="info" :closable="false" show-icon></el-alert>
        </div>
        <div v-show="goodsObj.goodsType == 1" style="padding-top: 15px;">
            <el-form :inline="true" label-width="90px">
                <el-form-item label="展示方式">
                    <el-checkbox v-model.number="goodsObj.skuShowType" :true-label="0" :false-label="1">按规格展示商品</el-checkbox>
                    <el-tooltip class="item" effect="dark" content="按规格展示商品是将商品规格以多个商品的方式在前端呈现" placement="right-start">
                        <i class="el-icon-information"></i>
                    </el-tooltip>
                </el-form-item>
                <el-form-item label="库存提醒" v-show="goodsObj.stockType===3">
                    <el-input-number v-model.number="goodsObj.stockWarn" :min="0" :max="99999" :maxlength="5"></el-input-number>
                </el-form-item>
            </el-form>
            <table class="table table-bordered center">
                <thead>
                    <tr>
                        <th v-for="(s, i) in skuProps">{{s.pname}}</th>
                        <th style="width:15%">市场价（元）
                            <input type="number" v-model="globalMPrice" style="width:70px" min="0.00" step="0.01">
                        </th>
                        <th style="width:15%">销售价（元）
                            <input type="number" v-model="globalPrice" style="width:70px" min="0.00" step="0.01">
                        </th>
                        <th style="width:15%">库存
                            <input type="text" v-model="globalStockNumber" style="width:70px" :disabled="goodsObj.stockType===0">
                        </th>
                        <th style="width:15%"> 商品编码
                            <input type="text" v-model="globalGoodsSn" style="width:70px">
                        </th>
                        <th style="width:15%"> 规格标签
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row, i) in skuRows">
                        <td v-for="(col, ii) in row.goodsSkuPros">{{col.vname}}</td>
                        <td>
                            <input class="mPrice" type="number" v-model.number="row.suggestPrice" max="999999" min="0.00" step="0.01">
                        </td>
                        <td>
                            <input class="sPrice" type="number" v-model.number="row.mallPrice" max="999999" min="0.00" step="0.01">
                        </td>
                        <td>
                            <input type="number" v-model.number="row.stockNumber" :disabled="goodsObj.stockType===0" max="999999"> </td>
                        <td>
                            <input type="text" v-model="row.goodsSn" maxlength="50"> </td>
                        <td>
                            <input type="text" v-model="row.comments" maxlength="50"> </td>
                    </tr>
                </tbody>
            </table>
            <div style="margin-left: 0px;" v-if="!paramObj.view">
                <el-button type="primary" @click.native.prevent="nextFlag=true;handleSaveAndNext()">保存商品并继续编辑</el-button>
                <el-button type="primary" @click.native.prevent="nextFlag=false;handleSaveAndNext()">保存</el-button>
                <el-button type="primary" @click.native.prevent="handleSaveAndNext(1)">保存并上架</el-button>
                <el-button type="default" @click.native.prevent="$emit('forward','','GoodsList')">返回到列表</el-button>
                <span class="error-info" v-show="ifError" style="color: red;padding-left: 30px;">*{{ErrorInfo}}</span>
            </div>
        </div>
    </div>
</template>
<script>
import combine from "lib/utils/combine"
import {
    getGlobalSkuPropertyList,
    getSkuPropertyItemList
}
from 'actions/skuPropertyAction'
import {
    mapGetters
} from 'vuex'
import {
    getGoodsSkuMapList,
    getGoodSkuList,
    saveGoodsFormTab6,
    saveGoodState,
    saveEPRGoodsSku,
    getGoodsSkuObj
} from 'actions/goodsAction'
import RegExp from 'lib/utils/regexp'
export default {
    name: 'goods_from_tab6',
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
        ...mapGetters(['supplierID', 'shopID'])
    },
    watch: {
        globalMPrice(val, oldVal) {
            _.forEach(this.skuRows, (item) => {
                item.suggestPrice = Number(val)
            })
        },
        globalPrice(val, oldVal) {
            _.forEach(this.skuRows, (item) => {
                item.mallPrice = Number(val)
            })
        },
        globalStockNumber(val, oldVal) {
            _.forEach(this.skuRows, (item) => {
                item.stockNumber = Number(val)
            })
        },
        globalGoodsSn(val, oldVal) {
            _.forEach(this.skuRows, (item) => {
                item.goodsSn = val
            })
        }
    },
    data() {
        return {
            nextFlag: false,
            globalMPrice: '',
            globalPrice: '',
            globalStockNumber: '',
            globalGoodsSn: '',
            goodsObj: {
                goodsId: undefined,
                classifyId: undefined,
                goodsName: '',
                skuPropsJson: '', //sku属性
                skusJson: '', //商品sku
                skuShowType: 0,
                stockType: 0,
                stockWarn: 0,
                maxMprice: 0,
                minPrice: 0
            },
            ifError: false,
            ErrorInfo: '',
            skuRows: [],
            skuProps: []
        }
    },
    directives: {},
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
        reloadSkuData(data){
            if (data.goodsSkuData && data.goodsSkuData.length > 0) {
                    let _skuRows = data.goodsSkuData
                    this.goodsObj.skuShowType = _skuRows[0]['isSkuShow']
                    this.goodsObj.stockWarn = _skuRows[0]['stockWarn']
                    this.skuRows=_.map(_skuRows,(item)=>{
                        let v={
                            goodsSkuId:item.goodsSkuId,
                            suggestPrice:item.mprice,
                            mallPrice:item.price,
                            stockNumber:item.stockNumber,
                            goodsSn:item.goodsSn,
                            comments:item.comments,
                            goodsSkuPros:_.map(item.row,(r)=>{
                                return {
                                    pid:r.skuId,
                                    pname:_.find(data.goodsSkuPropertyData,{'skuId':_.toNumber(r.skuId)}).skuName,
                                    vid:r.itemId,
                                    vname:r.itemName
                                }
                            })
                        }
                        return v
                    })

                    this.skuProps = _.map(this.skuRows[0]['goodsSkuPros'], (item) => {
                        return {
                            pid: item.pid,
                            pname: item.pname
                        }
                    })

                    console.log('aaaaaaaaaaaa',this.skuRows)
                }
        },
        handleSaveAndNext(v) {
            if (!this.paramObj.goodsObj.goodsId) {
                this.$message.info("请先保存商品基本信息")
                this.$emit('forward', 'tab1')
                return false
            }
            this.goodsObj.goodsName = this.paramObj.goodsObj.goodsName
            let _mprice = []
            let _price = []
            let _skuRows = JSON.parse(JSON.stringify(this.skuRows))
            _.forEach(_skuRows, (item, index) => {
                    _mprice.push(item.suggestPrice)
                    _price.push(item.mallPrice)
                    item.goodsSkuName = _.map(item.goodsSkuPros, (d) => d.vname).join(" ")
                    item.goodsSkuFullName = this.paramObj.goodsObj.goodsName + ' ' + item.goodsSkuName
                    item.itemIds = _.map(item.goodsSkuPros, (d) => d.vid).join("-")
                    item.itemVals = _.map(item.goodsSkuPros, (d) => d.vname).join("-")
                    item.skuIds = _.map(item.goodsSkuPros, (d) => d.pid).join("-")
                })
                //取市场价最高价
            this.goodsObj.maxMprice = _.max(_mprice)
                //取销售价最低价
            this.goodsObj.minPrice = _.max(_price)
            this.goodsObj.skusJson = JSON.stringify(_skuRows)
            this.goodsObj.goodsId = this.paramObj.goodsObj.goodsId
            //console.log('save skusJson',this.goodsObj.skusJson)
            saveEPRGoodsSku(this.goodsObj).then(data => {
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
                            this.$emit('forward', 'tab7')
                    }
                } else {
                    this.$message.error(msg)
                    return false
                }
            })
        }
    },
    created() {
        if (this.paramObj.goodsObj.goodsId) {
            Object.assign(this.goodsObj, _.pick(this.paramObj.goodsObj, ['goodsId', 'goodsType', 'goodsName', 'stockType', 'classifyId']))
        }
        let _this = this
        this.$store.getters.ev.$on('onLoadERPData', (data) => {
            //v:商品类型 0 SPU商品 1 SKU商品 2 组合商品
            this.$set(this.goodsObj, 'goodsType', _.toNumber(data.goodsType))
            if (data.stockType == 1)
                this.$set(this.goodsObj, 'stockType', 3)
            if (_.toNumber(data.goodsType) == 1) {
                _this.skuRows = data.skus || []
                if (data.skus && data.skus.length > 0) {
                    _this.skuProps = _.map(data.skus[0]['goodsSkuPros'], (item) => {
                        return {
                            pid: item.pid,
                            pname: item.pname
                        }
                    })
                }
            }
        })

        this.$store.getters.ev.$on('onSaveGoodsSku', () => {
            this.goodsObj.goodsId = this.paramObj.goodsObj.goodsId
            this.goodsObj.goodsName = this.paramObj.goodsObj.goodsName
            let _mprice = []
            let _price = []
            let _skuRows = JSON.parse(JSON.stringify(this.skuRows))
            _.forEach(_skuRows, (item, index) => {
                    _mprice.push(item.suggestPrice)
                    _price.push(item.mallPrice)
                    item.goodsSkuName = _.map(item.goodsSkuPros, (d) => d.vname).join(" ")
                    item.goodsSkuFullName = this.paramObj.goodsObj.goodsName + ' ' + item.goodsSkuName
                    item.itemIds = _.map(item.goodsSkuPros, (d) => d.vid).join("-")
                    item.itemVals = _.map(item.goodsSkuPros, (d) => d.vname).join("-")
                    item.skuIds = _.map(item.goodsSkuPros, (d) => d.pid).join("-")
                })
                //取市场价最高价
            this.goodsObj.maxMprice = _.max(_mprice)
                //取销售价最低价
            this.goodsObj.minPrice = _.max(_price)
            this.goodsObj.skusJson = JSON.stringify(_skuRows)
            //console.log('---skuRows', JSON.stringify(this.goodsObj))
                //return false;
            saveEPRGoodsSku(this.goodsObj).then(data => {
                const { success, msg, result } = data
                if (success) {
                    getGoodsSkuObj({'goodsId':this.goodsObj.goodsId}).then(data1=>{
                        if(data1.success){
                            this.paramObj.goodsObj.goodsSkuData = data1.result.goodSkuData||[]
                            this.paramObj.goodsObj.goodsSkuPropertyData = data1.result.goodsSkuPropertyData||[]
                            this.$store.getters.ev.$emit('onReloadSkuData',this.paramObj)
                        }
                    })
                } else {
                    this.$message.error(msg)
                    return false
                }
            })

            //console.log('submit goodsObj', JSON.stringify(this.goodsObj))
        })

        this.$store.getters.ev.$once('onchangeData', (data) => {
                //sku商品数据加载
            if (parseInt(data.goodsObj.goodsType) === 1) {
                let _d={
                    goodsSkuData:data.goodsObj.goodsSkuData,
                    goodsSkuPropertyData:data.goodsObj.goodsSkuPropertyData
                }
                this.reloadSkuData(_d)
            }
        })

        this.$store.getters.ev.$once('onReloadSkuData', (data) => {
                let _d={
                    goodsSkuData:data.goodsObj.goodsSkuData,
                    goodsSkuPropertyData:data.goodsObj.goodsSkuPropertyData
                }
                this.reloadSkuData(_d)
        })
    }
}
</script>
<style lang="sass">
</style>
