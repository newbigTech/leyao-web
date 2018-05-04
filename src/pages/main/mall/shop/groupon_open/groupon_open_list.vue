<template>
    
     <el-tabs v-model="rootActiveName" style="width:100%" @tab-click="onRootTabClick">
        <el-tab-pane label="拼团查询" name="tab1">
            <div class="_container">
                <!-- 查询条件 -->
                <div class="_setting-bar">
                    <div class="_query-form">
                        <div class="_query-form-item">
                            <el-form :inline="true" :model="grouponOpenObj" class="demo-form-inline">
                                <el-form-item>
                                    <el-input v-model="grouponOpenObj.activityName" placeholder="活动名称" :maxlength="50"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-input v-model="grouponOpenObj.goodsName" placeholder="拼团商品" :maxlength="50"></el-input>
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
                <el-tabs v-model="activeName" style="width:100%" @tab-click="onTabClick">
                    <el-tab-pane label="已成团" name="tab1"></el-tab-pane>
                    <el-tab-pane label="未成团" name="tab2"></el-tab-pane>
                    <el-tab-pane label="已过期" name="tab3"></el-tab-pane>
                </el-tabs>
                <!-- 商品列表 -->
                <div class="_table-container">
                    <div class="_table-list">
                        <el-table :data="tableData">
                            <el-table-column property="grouponId" label="序号" width="75"></el-table-column>
                            <!-- <el-table-column property="activityId" label="团编号"></el-table-column> -->
                            <el-table-column inline-template label="类型"  width="100">
                                <span>{{row.grouponType == 0 ? '普通团' : row.grouponType == 1?'定点团':'一人成团' }}</span>
                            </el-table-column>
                            <el-table-column property="activityName" label="团活动名"></el-table-column>
                            <el-table-column property="userAlias" label="开团用户" width="150">
                            </el-table-column>
                            <!-- <el-table-column property="goodsName" label="拼团商品">
                            </el-table-column> -->
                            <el-table-column property="createdDtm" label="开始时间" :formatter="dateFormat1" width="175"> </el-table-column>
                            <el-table-column property="endDtm" label="结束时间" :formatter="dateFormat2" width="175"> </el-table-column>
                            <el-table-column property="memberCount" label="已参团人数/成团人数" inline-template  width="250">
                                <span>{{row.joinCount}} / {{row.memberCount}}</span>
                            </el-table-column>
                            <!-- <el-table-column property="joinCount" label="参团人数">
                            </el-table-column> -->
                           <!--  <el-table-column label="状态" :formatter="statusCodeFormat">
                            </el-table-column> -->
                            <el-table-column inline-template label="操作"  width="120">
                                <span>
                                  <el-button type="primary" @click.native.prevent="setParams();$emit('forward','GroupOpenItemList',row)">拼团详情</el-button>
                                </span>
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
        </el-tab-pane>
        <el-tab-pane label="高级查询" name="tab2"><groupon-order></groupon-order></el-tab-pane>
     </el-tabs>
</template>
<script>
import {
    dateFormat as _dateFormat
} from "lib/utils/dateFormat"
import {
    getGrouponOpenPageList
} from 'actions/grouponActivityAction'
import GrouponOrder from './groupon_order'
export default {
    name: 'groupon_open_list',
    components: {GrouponOrder},
    computed: {
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
            rootActiveName: 'tab1',
            grouponOpenObj: {
                activityName: '',
                goodsName: '',
                statusCode: 1
            },
            dateFormat1: function(row, col) {
                return _dateFormat(row.createdDtm, 'yyyy-MM-dd HH:mm:ss')
            },
            dateFormat2: function(row, col) {
                return _dateFormat(row.expireDateTime, 'yyyy-MM-dd HH:mm:ss')
            },
            statusCodeFormat: function(row, col) {
                if (row.statusCode == 1)
                    return '已成团'
                if (new Date(row.expireDateTime).getTime() < _.now()) {
                    row.statusCode = 2
                    return '已过期'
                }
                if (row.statusCode == 0)
                    return '未成团'
                if (row.statusCode == 2)
                    return '已过期'
                return ''
            }
        }
    },
    methods: {
        onRootTabClick(tab, event) {
            
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        onTabClick(tab, event) {
            this.grouponOpenObj.activeName = tab.name
            this.loadTableData()
        },
        setParams() {
            this.$store.commit('SET_QUERY_PARAMS', this.grouponOpenObj)
        },
        loadTableData() {
            //状态 0 未成团 1 已成团 2 已过期
            if (this.activeName === 'tab1') {
                this.grouponOpenObj.statusCode=1
            } else if (this.activeName === 'tab2') {
                this.grouponOpenObj.statusCode=0
            }else if (this.activeName === 'tab3') {
                this.grouponOpenObj.statusCode=2
            }
            this.grouponOpenObj.pageNo = this.page
            this.grouponOpenObj.pageSize = this.pageSize
            getGrouponOpenPageList(this.grouponOpenObj).then(data => {
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
        if (Object.keys(this.queryParams).length !== 0) {
            Object.assign(this.grouponOpenObj, this.queryParams)
            this.activeName = this.queryParams.activeName || 'tab1'
        }
        this.loadTableData()
    }
}
</script>
