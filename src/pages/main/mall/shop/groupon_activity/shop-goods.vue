<template lang="html">
    <div class="container-fluid">
        <el-dialog v-model="goodsDataVisible" @open="onDailogOpen">
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
                                        <h3>【{{row.goodsType == 0 ? '单品' : (row.goodsType == 1?'规格商品':'组合商品')}}】{{row.goodsName}}</h3>
                                        <h4><a href="javascript:void(0)">编码: {{row.goodsSn}}</a></h4>
                                        <h5><a href="javascript:void(0)">市场价: ￥ {{row.mprice}}</a><a href="javascript:void(0)">销售价: ￥ {{row.price}}</a></h5>
                                    </div>
                                </div>
                            </el-table-column>
                            <el-table-column label="操作" inline-template width="200">
                                <div>
                                    <el-button v-show="row.goodsType !== 1" size="small" type="success" @click.native.prevent="onSelected(row)">添加</el-button>
                                    <el-button size="small" type="success" @click="onSelectSKU(row)" v-show="row.goodsType === 1">选择规格</el-button>
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
            <!--商品规格Dialog-->
            <el-dialog2 :title="goodSkuDialogTitle" :show="goodSkuDialog" @close="goodSkuDialog = false">
                <el-table :data="goodSkuList" style="width: 100%">
                    <el-table-column prop="goodsSkuId" label="ID" width="80"></el-table-column>
                    <el-table-column prop="goodsSkuName" label="规格名称" min-width="100"></el-table-column>
                    <el-table-column prop="mprice" label="市场价" width="100"></el-table-column>
                    <el-table-column prop="price" label="销售价" width="100"></el-table-column>
                    <el-table-column inline-template label="操作" min-width="130">
                        <div>
                            <el-button size="small" type="primary" icon="plus" @click.native.prevent="onAddSkuGoods(row)">添加</el-button>
                        </div>
                    </el-table-column>
                </el-table>
            </el-dialog2>
        </el-dialog>
    </div>
</template>
<script>
import {
    getGoodsPageList,
    getGoodSkuList
} from 'actions/goodsAction'
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
            goodSkuList: [],
            goodsObj: {
                goodsName: '',
                goodsSn: ''
            },
            goodSkuDialog: false,
            goodSkuDialogTitle: ''
        }
    },
    methods: {
        onAddSkuGoods(row) {
            row.goodsPic=this.skuGoods.goodsPic
            let result = {
                id: row.goodsId,
                name: row.goodsSkuFullName,
                goodsSkuId: row.goodsSkuId,
                sign: row.activitySign, //商品只有参加活动才会有该值
                goodsPic:this.skuGoods.goodsPic,
                goodsSn:row.goodsSn,
                goodsDesc:this.skuGoods.goodsDesc,
                row: row
            }
            this.goodSkuDialog = false
            this.goodsDataVisible = false
            this.$emit('onSuccess', result)
        },
        onSelectSKU(row) {
            this.skuGoods = row
            this.goodSkuDialog = true
            this.goodSkuDialogTitle = `商品规格列表【${row.goodsName}】`
            getGoodSkuList({
                goodsId: row.goodsId
                //activityFlag: 'activityGoods'
            }).then(data => {
                //console.log(JSON.parse(JSON.stringify(data)))
                if (data.length > 0) {
                    this.goodSkuList = data
                }
            })
        },
        onSelected(row) {
            this.goodsDataVisible = false
            let result = {
                id: row.goodsId,
                name: row.goodsName,
                goodsPic:row.goodsPic,
                goodsSn:row.goodsSn,
                goodsDesc:row.goodsDesc,
                row: row
            }
            this.$emit('onSuccess', result)
        },
        onDailogOpen() {
            this.loadTableData()
        },
        loadTableData() {
            let params = {
                deleteFlag: 0, //生效
                statusCode: 1, //已上架商品
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
    },
    created() {},
    mounted() {}
}
</script>
<style lang="sass">
</style>
