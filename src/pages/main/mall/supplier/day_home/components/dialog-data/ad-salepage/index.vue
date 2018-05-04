<template>
    <div class="_container">
        <!-- 查询条件 -->
        <div class="_setting-bar">
            <div class="_query-form">
                <div class="_query-form-item">
                    <el-form :inline="true" :model="queryObj" class="demo-form-inline">
                        <el-form-item>
                            <el-input v-model="queryObj.selfSiteName" placeholder="营销广告名称" :maxlength="20"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
               
            </div>
            <div class="_actions-btn">
               <el-button @click.native.prevent="loadData">查询</el-button>
            </div>
        </div>
        <!-- 商品列表 -->
        <div class="_table-container">
            <div class="_table-list">
                <el-table :data="tableData">
                    <el-table-column align="center" width="150" property="adId" label="营销广告ID"></el-table-column>
                    <el-table-column property="adName" label="营销广告名称"></el-table-column>
                    <el-table-column inline-template label="操作" min-width="80">
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
import {
    dateFormat as _dateFormat
} from "lib/utils/dateFormat"
  import { _getAdSalePage} from 'actions/adSaleAction'
export default {
    name: 'ad_salepage_list',
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
    computed: {},
    data() {
        return {
            page: 1,
            pageSize: 20,
            total: 0,
            tableData: [],
            areaSourceData: [],
            provinceList: [],
            cityList: [],
            areaList: [],
            queryObj: {
                adName: ''
            }
        }
    },
    methods: {
        onSelected(item) {
            let result={
                id:item.adId,
                name:item.adName,
                row:item
            }
            this.$emit('onSuccess',result)
        },
        loadData() {
            this.queryObj.pageNo = this.page
            this.queryObj.pageSize = this.pageSize
            this.queryObj.statusCode = 0
            this.queryObj.shopId = this.queryParams.shopId
            _getAdSalePage(this.queryObj).then(data => {
                const { success, result, msg } = data
                this.tableData = result.list
                this.total = result.total
            })
        },
        handleSizeChange(val) {
            this.pageSize = val
            this.loadData()
        },
        handleCurrentChange(val) {
            this.page = val
            this.loadData()
        }
    },
    created() {
    }
}
</script>
