<template lang="html">
    <div class="container-fluid">
        <el-dialog v-model="goodsDataVisible" @open="onDailogOpen">
            <div class="well">
                <div class="page-header" style="margin:0;">
                    <h1 style="font-weight: bold;">ERP商品列表</h1>
                </div>
                <!-- 查询条件 -->
                <div class="_setting-bar">
                    <div class="_query-form">
                        <div class="_query-form-item">
                            <el-form :inline="true" :model="goodsObj" class="demo-form-inline">
                                <el-form-item style="width:100%;">
                                    <el-radio-group v-model="goodsObj.goodsType" @change="loadTableData">
                                        <el-radio :label="0">单品</el-radio>
                                        <el-radio :label="1">规格商品</el-radio>
                                        <el-radio :label="2">组合商品</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-form>
                        </div>
                        <div class="_query-form-btn">
                            <!-- <el-button @click.native.prevent="loadTableData">查询</el-button> -->
                        </div>
                    </div>
                </div>
                <!-- 商品列表 -->
                <div class="_table-container">
                    <div class="_table-list">
                        <el-table :data="tableData" style="width: 100%">
                            <el-table-column inline-template label="商品" min-width="300">
                                <div class="_goods-item-cell">
                                    <div class="_goods-item-img"><img :src="row.goodsImageUrl"></div>
                                    <div class="_goods-item-info">
                                        <h3>{{row.goodsName}}</h3>
                                        <h3>{{row.goodsDesc}}</h3>
                                        <h4><a href="javascript:void(0)">编码: {{row.goodsSn}}</a></h4>
                                    </div>
                                </div>
                            </el-table-column>
                            <el-table-column property="createdDtm" label="创建时间" min-width="150"></el-table-column>
                            <el-table-column label="操作" inline-template>
                                <div>
                                    <el-button size="small" type="success" @click.native.prevent="onSelected(row)">添加</el-button>
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
            </div>
    </div>
</template>
<script>
import { getERPGoods } from 'actions/goodsAction'
import elDialog2 from "components/el-dialog2"
export default {
    name: 'shop_goods_data',
    components: {
        elDialog2
    },
    computed: {
        cloudShowUrl() {
            return this.$store.getters.cloudShowUrl
        }
    },
    data() {
        return {
            goodsDataVisible: false,
            page: 1,
            pageSize: 10,
            total: 0,
            tableData: [],
            goodsObj: {
                goodsType: 0
            }
        }
    },
    methods: {
        onSelected(row) {
            this.goodsDataVisible = false
            let result = {
                id: row.goodsId,
                name: row.goodsName,
                goodsPic:row.goodsImageUrl,
                goodsSn:row.goodsSn,
                goodsDesc:row.goodsDesc,
                goodsType:row.goodsType,
                stockType:row.stockType
            }
            this.$emit('onSuccess', result)
        },
        onDailogOpen() {
            this.loadTableData()
        },
        loadTableData() {
            let params = {
                pageNo: this.page,
                pageSize: this.pageSize,
                goodsType: this.goodsObj.goodsType
            }
            getERPGoods(params).then(data => {
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
    },
    created() {},
    mounted() {}
}
</script>
<style lang="sass">
</style>
