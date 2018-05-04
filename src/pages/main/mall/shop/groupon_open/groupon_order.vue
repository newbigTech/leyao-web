<template>
    <div class="_container">
        <!-- 查询条件 -->
        <div class="_setting-bar">
            <div class="_query-form">
                <div class="_query-form-item">
                    <el-form :inline="true" :model="queryObj">
                        <el-form-item  style="width:360px;">
                            <el-input placeholder="请输入查询条件" v-model="queryObj.inputValue" style="width:350px;" :maxlength="25">
                                <el-select v-model="queryObj.inputType" slot="prepend" placeholder="请选择" style="width:130px;">
                                    <el-option label="订单号" value="orderNo"></el-option>
                                    <el-option label="用户名" value="userAlias"></el-option>
                                    <el-option label="手机号" value="userMobile"></el-option>
                                    <el-option label="收货人" value="adName"></el-option>
                                    <el-option label="收货人手机号" value="adPhone"></el-option>
                                </el-select>
                            </el-input>
                        </el-form-item>
                        <el-form-item  style="width: 330px;">
                            <el-date-picker v-model="queryObj.queryDateTime" type="datetimerange" :picker-options="pickerOptions2" placeholder="下订单截止时间范围" align="right" style="width:330px">
                            </el-date-picker>
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
                <el-table :data="tableData" border style="width: 100%">
                    <el-table-column align="center" property="orderNo" label="订单号" width="250"></el-table-column>
                    <el-table-column align="center" property="activityName" label="拼团活动" width="250"></el-table-column>
                    <el-table-column align="center" property="grouponNote" label="团类型" width="100"></el-table-column>
                    <el-table-column align="center" label="参团用户名" inline-template width="100">
                        <span>{{row.userAlias}}<br>({{row.userMobile}})</span>
                    </el-table-column>
                    <el-table-column label="成员类型" inline-template  width="100">
                        <span>{{row.mapGrouponId==0?'团长':'团员'}}</span>
                    </el-table-column>
                    <el-table-column property="memberPrice" label="参团价" width="100"></el-table-column>
                    <el-table-column align="center" property="adName" label="收货人" inline-template min-width="100">
                        <span>{{row.adName}}<br>({{row.adPhone}})</span>
                    </el-table-column>
                    <el-table-column align="center" label="支付状态" inline-template width="100">
                        <span>{{row.payStatus==0?'未支付':'已支付'}}</span>
                    </el-table-column>
                     <el-table-column align="center" label="团状态" inline-template width="100">
                        <span>{{row.grouponStatus==0?'未成团':row.grouponStatus==1?'已成团':'已过期'}}</span>
                    </el-table-column>
                    <el-table-column align="center" label="参团状态" inline-template width="100">
                        <span>{{!row.grouponId&&row.grouponStatus==1&&row.payStatus==1?'参团失败，生成退订单':'参团成功'}}</span>
                    </el-table-column>
                    <el-table-column align="center" property="createdDtm" label="参团时间" width="170"> </el-table-column>
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
    getMallGrouponOrderViewList
} from 'actions/grouponActivityAction'
export default {
    components: {},
    computed: {},
    data() {
        return {
            page: 1,
            pageSize: 20,
            total: 0,
            tableData: [],
            queryObj: {
                inputValue: '',
                inputType: 'orderNo',
                queryDateTime:[]
            },
            pickerOptions2: {
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                        const end = new Date()
                        const start = new Date()
                        start.setHours(0,0,0)
                        start.setDate(start.getDate())
                        end.setHours(23,59,59)
                        picker.$emit('pick', [start, end])
                    }
                },{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date()
                        const start = new Date()
                        start.setHours(0,0,0)
                        start.setDate(start.getDate()-7)
                        end.setHours(23,59,59)
                        //start.setTime(end.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end])
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date()
                        const start = new Date()
                        start.setHours(0,0,0)
                        start.setMonth(start.getMonth()-1)
                        end.setHours(23,59,59)
                        //start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end])
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date()
                        const start = new Date()
                        start.setHours(0,0,0)
                        start.setMonth(start.getMonth()-3)
                        end.setHours(23,59,59)
                        //start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end])
                    }
                }]
            }
        }
    },
    methods: {
        loadTableData() {
            let params = {
                pageNo: this.page,
                pageSize: this.pageSize
            }
            params[this.queryObj.inputType] = this.queryObj.inputValue
            if (_.isArray(this.queryObj.queryDateTime) && this.queryObj.queryDateTime.length === 2) {
                if (!_.isNull(this.queryObj.queryDateTime[0]) && !_.isNull(this.queryObj.queryDateTime[1])) {
                    params.startDateTime = _dateFormat(this.queryObj.queryDateTime[0], 'yyyy-MM-dd HH:mm:ss')
                    params.endDateTime = _dateFormat(this.queryObj.queryDateTime[1], 'yyyy-MM-dd HH:mm:ss')
                }
            }
            getMallGrouponOrderViewList(params).then(data => {
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
        this.loadTableData()
    }
}
</script>
