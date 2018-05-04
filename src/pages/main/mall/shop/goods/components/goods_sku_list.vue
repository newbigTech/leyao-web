<!-- 商品列表中点击sku商品弹出框 -->
<template>
    <div class="_container">
        <!-- 商品列表 -->
        <div class="_table-container">
            <div class="_table-list">
                <el-table :data="tableData">
                    <el-table-column prop="goodsSkuId" label="ID" width="80"></el-table-column>
                    <el-table-column prop="goodsSkuName" label="规格名称"></el-table-column>
                    <el-table-column prop="goodsSn" label="商品编号"></el-table-column>
                    <el-table-column prop="mprice" label="市场价"></el-table-column>
                    <el-table-column prop="price" label="销售价"></el-table-column>
                    <el-table-column prop="saleNumber" label="销售数量"></el-table-column>
                    <el-table-column prop="stockNumber" :label="paramObj.stockType==2?'占用库存数':'当前库存数'" width="150" align="center"></el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>
<script>
import {
    dateFormat as _dateFormat
} from "lib/utils/dateFormat"
import {
    getGoodSkuList
} from 'actions/goodsAction'
export default {
    name: 'group_goods_items',
    props: {
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
            tableData: [],
            dateFormat: function(row, col) {
                return _dateFormat(row.createdDtm, 'yyyy-MM-dd hh:mm:ss')
            },
            goodsObj: {
                goodsId: undefined,
                stockType:0
            }
        }
    },
    methods: {
        loadTableData() {
            getGoodSkuList(this.goodsObj).then(data => {
                this.tableData = data || []
            })
        }
    },
    created() {
        if (this.paramObj.goodsId) {
            this.goodsObj.goodsId = this.paramObj.goodsId
            this.goodsObj.stockType=this.paramObj.stockType
            this.loadTableData()
        }
    }
}
</script>
