<template>
    <div class="_container _goods-list">
        <!-- 查询条件 -->
        <div class="_setting-bar">
            <div class="_query-form">
                <div class="_query-form-item">
                    <el-form :inline="true" :model="goodsObj">
                        <el-form-item>
                            <el-input v-model="goodsObj.goodsName" placeholder="商品名称" :maxlength="20"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="goodsObj.goodsSn" placeholder="商品编码" :maxlength="120"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="goodsObj.classifyName" placeholder="商品分类" :maxlength="20" icon="search" :on-icon-click="handleIconClick"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="_query-form-btn">
                    <el-button @click.native.prevent="loadTableData">查询</el-button>
                </div>
            </div>
            <div class="_actions-btn">
                <el-button type="primary" @click.native.prevent="setParams();$emit('forward','GiftForm')">新增</el-button>
            </div>
        </div>
        <el-tabs v-model="activeName" style="width:100%" @tab-click="onTabClick">
            <el-tab-pane label="全部商品" name="tab1"></el-tab-pane>
            <el-tab-pane label="已删除商品" name="tab2"></el-tab-pane>
        </el-tabs>
        <!-- 商品列表 -->
        <div class="_table-container">
            <div class="_table-list">
                <el-table :data="tableData" border>
                    <el-table-column prop="goodsId" label="商品" align="center" inline-template min-width="200">
                        <div class="_goods-item-cell">
                            <div class="_goods-item-img"><img :src="cloudShowUrl + row.goodsPic"></div>
                            <div class="_goods-item-info">
                                <h3>{{row.goodsName}}</h3>
                                <h4><a href="javascript:void(0)" >编码: {{row.goodsSn}}</a></h4>
                            </div>
                        </div>
                    </el-table-column>
                    <el-table-column label="所属分类" align="center" width="150" property="classifyName">
                    </el-table-column>
                    <el-table-column label="市场价(元)" inline-template align="center" width="150">
                        <div>{{row.marketPrice}}</div>
                    </el-table-column>
                    <el-table-column inline-template label="总库存" align="center" width="150">
                        <div>
                            {{row.stockNumber}}
                        </div>
                    </el-table-column>
                    <!-- <el-table-column inline-template label="状态" align="center">
                        <div>{{row.statusCode == 0 ? '已下架' : '已上架'}}</div>
                    </el-table-column> -->
                    <el-table-column inline-template label="操作" align="center" min-width="150">
                        <div>
                            <el-dropdown split-button type="primary" @click="setParams();$emit('forward','GiftView',row)">
                                查看详情
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item v-if="row.deleteFlag ==0" @click.native.prevent="onSetStockNumber(row)">设置库存</el-dropdown-item>
                                    <el-dropdown-item @click.native.prevent="onShowLog(row)">查看历史库存</el-dropdown-item>
                                    <el-dropdown-item v-if="row.deleteFlag ==0" @click.native.prevent="setParams();$emit('forward','GiftForm',row)">修改</el-dropdown-item>
                                    <el-dropdown-item v-if="row.deleteFlag ==0" @click.native.prevent="onDelRow(row)">删除</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                    </el-table-column>
                </el-table>
                <!-- 分页 -->
                <div class="_pagination">
                    <el-pagination :total="total" :page-size="pageSize" layout="total, sizes, prev, pager, next" @current-change="handleCurrentChange" @size-change="handleSizeChange">
                    </el-pagination>
                </div>
            </div>
        </div>
        <!--商品品类Dialog-->
        <goods-classify ref="goodsClassifyCom" :shopId="targetShopId" @onSuccess="onSelectedClassify"></goods-classify>
        <!--商品库存日志Dialog-->
        <el-dialog title="库存日志" v-model="goodStockDialog">
            <stock-log ref="stockLogCom" :paramObj="rowObj"></stock-log>
        </el-dialog>
    </div>
</template>
<script>
import {
    getGiftPageList,
    updateGiftStatus,
    deleteGift,
    saveGiftStock
}
from 'actions/giftAction'
import GoodsClassify from '../goods/components/goods_form/goods-classify'
import StockLog from '../goods_stock/stock_log'
export default {
    name: 'gift_list',
    props: {
        targetShopId: {
            type: Number,
            default: undefined
        },
        e: Object || {},
    },
    components: {
        GoodsClassify,
        StockLog
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
            page: 1,
            pageSize: 20,
            total: 0,
            tableData: [],
            activeName: 'tab1',
            goodsClassifyDialog: false,
            goodStockDialog:false,
            rowObj: {},
            goodsObj: {
                goodsId: undefined,
                classifyId: undefined,
                classifyName: '',
                goodsName: '',
                goodsFullName: '',
                goodsSn: ''
            }
        }
    },
    methods: {
        onShowLog(row){
            this.rowObj = row
            this.goodStockDialog = true
            if (this.$refs.stockLogCom) {
                this.$refs.stockLogCom.goodsObj.goodsId = row.goodsId
                this.$refs.stockLogCom.loadTableData()
            }
        },
        onSetStockNumber(row) {
            this.$prompt('请输入增加库存数', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /^(-?[1-9]\d*|0)$/,
                inputErrorMessage: '库存数格式不正确'
            }).then(({
                value
            }) => {
                let params={
                    'goodsId':row.goodsId,
                    'addNumber':value
                }
                saveGiftStock(params).then(data => {
                    const { success, msg, result } = data
                    if (success) {
                        this.$message({
                            type: 'success',
                            message: '操作成功!'
                        });
                        this.loadTableData()
                    } else {
                        this.$message.error(msg);
                    }
                })
            }).catch(() => {
                
            });
        },
        onSelectedClassify(c) {
            this.goodsObj.classifyId = c.classifyId
            this.goodsObj.classifyName = c.classifyName
        },
        handleIconClick() {
            this.$refs.goodsClassifyCom.goodsClassifyDialog = true
        },
        setParams() {
            this.$store.commit('SET_QUERY_PARAMS', this.goodsObj)
        },
        onTabClick(tab, event) {
            this.goodsObj.activeName = tab.name
            if (tab.name === 'tab1') {
                this.goodsObj.pageNo = 1
                this.goodsObj.deleteFlag = 0
            } else if (tab.name === 'tab2') {
                this.goodsObj.pageNo = 1
                this.goodsObj.deleteFlag = 1
            }
            this.loadTableData()
        },
        onSetState(row) {
            let params = {
                statusCode: parseInt(row.statusCode) === 0 ? 1 : 0,
                goodsId: row.goodsId
            }
            let mess = row.statusCode == 0 ? '是否确认上架' : '是否确认下架'
            this.$confirm(`${mess}?`, '提示', {
                type: 'warning'
            }).then(() => {
                updateGiftStatus(params).then(data => {
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
                        this.loadTableData()
                    } else {
                        this.$message.error(msg);
                    }
                })
            })
        },
        loadTableData() {
            this.goodsObj.pageNo = this.page
            this.goodsObj.pageSize = this.pageSize
            if (this.goodsObj.classifyName.length == 0) {
                this.goodsObj.classifyId = undefined
            }
            getGiftPageList(this.goodsObj).then(data => {
                this.tableData = data.rows
                this.total = data.total
            })
        },
        handleSizeChange(val) {
            console.log('handleSizeChange', val)
            this.pageSize = val
            this.loadTableData()
        },
        handleCurrentChange(val) {
            console.log('handleCurrentChange', val)
            this.page = val
            this.loadTableData()
        },
        onDelRow(row) {
            this.$confirm('是否确认删除?', '提示', {
                type: 'warning'
            }).then(() => {
                deleteGift(row).then(data => {
                    const {
                        success,
                        msg,
                        result
                    } = data
                    if (success) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.loadTableData()
                    } else {
                        this.$message.error(msg);
                    }
                })
            }).catch(() => {});
        },
    },
    created() {
        if (Object.keys(this.queryParams).length !== 0) {
            Object.assign(this.goodsObj, this.queryParams)
            this.activeName = this.queryParams.activeName || 'tab1'
        }
        this.loadTableData()
    }
}
</script>
<style lang="sass">
._goods-list {
    // .el-table .skuItem { background: #c9e5f5; }
    // .el-table .singleItem { background: #e2f0e4; }
    // .el-table__body tr td { transition: none; }
    // .el-table__body tr.hover-row td { background-color: transparent;  }
}
</style>
