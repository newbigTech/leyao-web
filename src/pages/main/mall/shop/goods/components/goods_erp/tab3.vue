<!-- 组合商品选项卡-->
<style lang="css">
</style>
<template lang="html">
    <div class="container-fluid">
        <div class="page-header" style="margin:0;">
            <h1 style="font-weight: bold;">组合商品配置</h1>
        </div>
        <div class="container-fluid" style="padding-top: 15px;">
            <el-alert title="只有商品类型选择为组合商品时,才可以操作!" type="info" :closable="false" v-show="goodsObj.goodsType !== 2" show-icon></el-alert>
        </div>
        <div class="row" v-show="goodsObj.goodsType === 2" style="padding-top: 15px;">
            <div class="col-md-5" style="padding: 0" v-if="!paramObj.view">
                <div class="well">
                    <div class="page-header" style="margin:0;">
                        <h1 style="font-weight: bold;">商品列表</h1>
                    </div>
                    <!-- 查询条件 -->
                    <div class="_setting-bar">
                        <div class="_query-form">
                            <div class="_query-form-item">
                                <el-form :inline="true" :model="goodsObj" class="demo-form-inline">
                                    <el-form-item>
                                        <el-input v-model="goodsObj.goodsName" placeholder="商品名称" :maxlength="20"></el-input>
                                    </el-form-item>
                                    <el-form-item>
                                        <el-input v-model="goodsObj.goodsSn" placeholder="商品编码" :maxlength="120"></el-input>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <div class="_query-form-btn">
                                <el-button @click.native.prevent="loadTableData">查询</el-button>
                            </div>
                        </div>
                    </div>
                    <!-- 商品列表 -->
                    <div class="_table-container">
                        <div class="_table-list">
                            <el-table :data="tableData" style="width: 100%">
                                <el-table-column inline-template label="商品" min-width="300">
                                    <div class="_goods-item-cell">
                                        <div class="_goods-item-img"><img :src="cloudShowUrl + row.goodsPic"></div>
                                        <div class="_goods-item-info">
                                            <h3>{{row.goodsName}}</h3>
                                            <h4><a href="javascript:void(0)">编码: {{row.goodsSn}}</a></h4>
                                            <h5><a href="javascript:void(0)">市场价: ￥ {{Number((row.mprice).toFixed(2))}}</a><a href="javascript:void(0)">销售价: ￥ {{Number((row.price).toFixed(2))}}</a></h5>
                                        </div>
                                    </div>
                                </el-table-column>
                                <el-table-column label="操作" inline-template width="100" align="center">
                                    <el-button size="small" type="success" @click.native.prevent="onAddGoods(row)">添加</el-button>
                                </el-table-column>
                            </el-table>
                            <!-- 分页 -->
                            <div class="_pagination">
                                <el-pagination :total="total" :page-size="pageSize" layout="total, sizes, prev, pager, next" @current-change="handleCurrentChange" @size-change="handleSizeChange">
                                </el-pagination>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div :class="paramObj.view ? 'col-md-12':'col-md-7'" style="padding-left: 5px;padding-right: 0px;">
                <div class="well">
                    <div class="page-header" style="margin:0;">
                        <h1 style="font-weight: bold;">组合商品列表</h1>
                    </div>
                    <div class="_setting-bar">
                        <div class="_query-form">
                            <div class="_query-form-item">
                                <el-form :inline="true" :model="goodsObj" class="demo-form-inline">
                                    <el-form-item label="市场价">
                                        ￥ {{Number((goodsObj.mPrice).toFixed(2))}}
                                    </el-form-item>
                                    <el-form-item label="销售价">
                                        ￥ {{Number((goodsObj.price).toFixed(2))}}
                                    </el-form-item>
                                </el-form>
                            </div>
                        </div>
                    </div>
                    <div class="_table-container">
                        <div class="_table-list">
                            <el-table :data="bindGoodsData" style="width: 100%">
                                <el-table-column prop="goodsName" label="商品名称" min-width="120" align="center"></el-table-column>
                                <el-table-column prop="mprice" label="市场价（元）" width="100" align="center"></el-table-column>
                                <el-table-column prop="price" label="销售价（元）" width="100" align="center"></el-table-column>
                                <el-table-column inline-template label="分账价格（元）" width="100" align="center">
                                    <div>
                                        <el-input v-model.number="row.fprice" :maxlength="10" type="number"></el-input>
                                    </div>
                                </el-table-column>
                                <el-table-column inline-template label="数量" width="90" align="center">
                                    <div>
                                        <el-input v-model.number="row.number" :maxlength="10" type="number"></el-input>
                                    </div>
                                </el-table-column>
                                <el-table-column inline-template label="操作" width="100" align="center">
                                    <div v-if="!paramObj.view">
                                        <el-button size="small" type="danger" @click.native.prevent="onDelete(row)">移除</el-button>
                                    </div>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                    <div style="margin-top: 20px;" v-if="!paramObj.view">
                        <el-button type="primary" @click.native.prevent="nextFlag=true;handleSaveAndNext()">保存商品并继续编辑</el-button>
                        <el-button type="primary" @click.native.prevent="nextFlag=false;handleSaveAndNext()">保存</el-button>
                        <el-button type="primary" @click.native.prevent="handleSaveAndNext(1)">保存并上架</el-button>
                        <el-button type="default" @click.native.prevent="$emit('forward','','GoodsList')">返回到列表</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {
    saveGoodsFormTab3,
    getGoodsPageList,
    getGoodSkuList,
    saveGoodState
} from 'actions/goodsAction'
export default {
    name: 'goods_from_tab3',
    computed: {
        cloudShowUrl() {
            return this.$store.getters.cloudShowUrl
        }
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
    data() {
        return {
            nextFlag: true,
            page: 1,
            pageSize: 10,
            total: 0,
            tableData: [],
            bindGoodsData: [],
            gridData: [],
            goodSkuDialog: false,
            goodSkuDialogTitle: '',
            goodSkuList: [], //商品sku列表
            goodsObj: {
                goodsId: undefined,
                goodsName: '',
                goodsFullName: '',
                goodsSn: '',
                statusCode: '',
                goodsType: 0,
                mPrice: 0,
                price: 0
            }
        }
    },
    methods: {
        onSetState() {
            let params = {
                statusCode: 1,
                goodsId: this.goodsObj.goodsId
            }
            saveGoodState(params).then(data => {
                const { success, msg, result } = data
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
            let bindGoodsData = this.bindGoodsData
            if (bindGoodsData.length === 0) {
                this.$message.error('组合商品必须添加商品到组合中')
                return false
            }
            bindGoodsData.forEach((item, i) => {
                item.sortIndex = i + 1
            })
            this.goodsObj.mPrice = _.sumBy(bindGoodsData, item => {
                return (item.mprice * item.number)
            })
            this.goodsObj.price = _.sumBy(bindGoodsData, item => {
                return (item.fprice * item.number)
            })
            this.goodsObj.bindGoodsDataJson = JSON.stringify(bindGoodsData)
            if (this.paramObj.goodsObj.goodsId) {
                this.goodsObj.goodsId = this.paramObj.goodsObj.goodsId
                this.goodsObj.goodsType = this.paramObj.goodsObj.goodsType
                saveGoodsFormTab3(this.goodsObj).then(data => {
                    const { success, msg, result } = data
                    if (success) {
                        if(v&&v==1){
                            this.onSetState()
                        }else{
                        this.$message.success('操作成功')
                        if (this.nextFlag)
                            this.$emit('forward', 'tab2') 
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
        },
        loadTableData() {
            let params = {
                goodsType: 0, //单品
                deleteFlag: 0, //生效
                pageNo: this.page,
                pageSize: this.pageSize,
                goodsName: this.goodsObj.goodsName,
                goodsSn: this.goodsObj.goodsSn
            }
            getGoodsPageList(params).then(data => {
                this.tableData = data.rows
                this.total = data.total
            })
        },
        handleSizeChange(val) {
            this.pageSize = val
            this.loadTableData()
        },
        handleCurrentChange(val) {
            this.page = val
            this.loadTableData()
        },
        onDelete(row) {
            var index = this.bindGoodsData.indexOf(row)
            if (index !== -1) {
                this.bindGoodsData.splice(index, 1)
            }
        },
        onAddGoods(row) {
            // console.log('this.bindGoodsData',this.bindGoodsData);
            if (this.bindGoodsData.length > 5) {
                this.$message('最多只能添加6个商品')
                return false
            }
            //商品类型 0 SPU商品 1 SKU商品 2 组合商品
            if (parseInt(row.goodsType) === 1) {
                this.goodSkuDialog = true
                this.goodSkuDialogTitle = `商品规格列表【${row.goodsName}】`
                getGoodSkuList({
                    goodsId: row.goodsId
                }).then(data => {
                    if (data.length > 0)
                        this.goodSkuList = data
                })
            } else {
                if (_.findIndex(this.bindGoodsData, {
                        'packageGoodsId': row.goodsId
                    }) !== -1) {
                    this.$message('商品已添加')
                } else {
                    let _row = {
                        packageGoodsId: row.goodsId,
                        goodsName: row.goodsName,
                        goodsType: row.goodsType,
                        packageGoodsSkuId: 0,
                        price: row.price,
                        mprice: row.mprice,
                        goodsPic: row.goodsPic,
                        number: 1,
                        fprice: row.price
                    }
                    this.bindGoodsData.push(_row)
                }
            }
        },
    },
    created() {
        //商品类型change事件
        this.$store.getters.ev.$on('onchangeGoodsType', (v) => {
            //v:商品类型 0 SPU商品 1 SKU商品 2 组合商品
            //this.goodsObj.goodsType = v
            this.$set(this.goodsObj, 'goodsType', v)
        })
        this.loadTableData()
        if (this.paramObj.goodsObj.goodsId) {
            Object.assign(this.goodsObj, _.pick(this.paramObj.goodsObj, ['goodsId', 'goodsType', 'mprice', 'price']))
            this.goodsObj.mPrice = this.goodsObj.mprice
        }
        this.$store.getters.ev.$once('onchangeData', (data) => {
            if (data.goodsObj.goodsItemsData && data.goodsObj.goodsItemsData.length > 0)
                this.bindGoodsData = data.goodsObj.goodsItemsData
        })
    }
}
</script>
