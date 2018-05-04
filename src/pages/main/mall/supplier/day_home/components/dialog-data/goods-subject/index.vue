<template>
    <div class="container-fluid">
        <!-- 查询条件 -->
        <div class="_setting-bar">
            <div class="_query-form">
                <div class="_query-form-item">
                    <el-form :inline="true" :model="activityParams" class="demo-form-inline">
                        <el-form-item>
                            <el-input v-model="activityParams.activityName" placeholder="专题名称" :maxlength="20"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="_query-form-btn">
                    <el-button @click.native.prevent="loadTableData">查询</el-button>
                </div>
            </div>
            <div class="_actions-btn">
            </div>
        </div>
        <!-- 商品列表 -->
        <div class="_table-container">
            <div class="_table-list">
                <el-table :data="tableData">
                    <el-table-column prop="activityName" label="活动名称" align="center">
                    </el-table-column>
                    <el-table-column label="有效期" inline-template align="center">
                    <div><p>{{dateFormat(row.beginDtm)}}</p><p>{{dateFormat(row.endDtm)}}</p></div>
                    </el-table-column>
                    <el-table-column inline-template label="操作" align="center">
                        <div>
                            <el-button type="success" size="small" @click="onSelected(row)">选择</el-button>
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
</template>
<script>
import { querySupplierActivityPageList } from 'actions/activityAction'
import { dateFormat as _dateFormat } from "lib/utils/dateFormat"
export default {
    name: 'goods_subject',
    props: {
        queryParams: {
            type: Object,
            default () {
                return {
                    shopId: ''
                }
            }
        }
    },
    components: {},
    computed: {
        cloudShowUrl() {
            return this.$store.getters.cloudShowUrl
        }
    },
    data() {
        return {
            page: 1,
            pageSize: 10,
            total: 0,
            tableData: [],
            activityParams: {
                activityName: '',
                shopName: '',
                lastDtm: _.now()
            },
            dateFormat: function(v) {
                return _dateFormat(v, 'yyyy-MM-dd HH:mm:ss')
            },
        }
    },
    methods: {
        onSelected(row){
            let result={
                id:row.activityId,
                name:row.activityName,
                row:row
            }
            this.$emit('onSuccess',result)
        },
        loadTableData() {
            this.activityParams.pageNo = this.page
            this.activityParams.pageSize = this.pageSize
            this.activityParams.shopId = this.queryParams.shopId
            this.activityParams.activityType = 0
            querySupplierActivityPageList(this.activityParams).then(data => {
                this.tableData = data.rows
                this.total = data.total
            })
        },
        loadData() {
            this.page = 1
            if (this.queryParams.shopId == '') {
                this.tableData = []
                this.total = 0
            } else {
                this.loadTableData()
            }
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

    }
}
</script>
