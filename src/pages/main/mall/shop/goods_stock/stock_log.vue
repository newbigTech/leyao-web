<template>
    <div class="_container">
        <!-- 商品列表 -->
        <div class="_table-container">
            <div class="_table-list">
                <el-table :data="tableData">
                    <el-table-column property="setNote" label="操作记录"></el-table-column>
                    <el-table-column property="setNumber" label="增加库存数"></el-table-column>
                    <el-table-column property="createdDtm" label="操作时间" :formatter="dateFormat"> </el-table-column>
                </el-table>
                <!-- 分页 -->
                <div class="_pagination">
                    <el-pagination :total="total" :page-size="pageSize" layout="total, sizes, prev, pager, next" @current-change="handleCurrentChange" @size-change="handleSizeChange">
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {
    dateFormat as _dateFormat
} from "lib/utils/dateFormat"
import {
    getGoodStockLogPageList
} from 'actions/goodsAction'
export default {
    name: 'goods_stock_log_list',
    props: {
        paramObj: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            page: 1,
            pageSize: 10,
            total: 0,
            tableData: [],
            dateFormat: function(row, col) {
                return _dateFormat(row.createdDtm, 'yyyy-MM-dd hh:mm:ss')
            },
            goodsObj: {
                goodsId: undefined,
            }
        }
    },
    methods: {
        loadTableData() {
            this.goodsObj.pageNo = this.page
            this.goodsObj.pageSize = this.pageSize
            getGoodStockLogPageList(this.goodsObj).then(data => {
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
        }
    },
    created() {
        if (this.paramObj.goodsId) {
            this.goodsObj.goodsId = this.paramObj.goodsId
            this.loadTableData()
        }
    }
}
</script>
