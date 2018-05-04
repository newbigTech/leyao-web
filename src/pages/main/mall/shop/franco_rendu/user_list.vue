<template>
    <div class="_container">
        <card-panel>
            <h3 slot="title">自提点用户列表</h3>
            <div slot="panel-btns">
                <button class="btn btn-default btn-sm" @click="onBackPage">返回</button>
            </div>
            <div slot="panel-body">
                <!-- 查询条件 -->
                <div class="_setting-bar">
                    <div class="_query-form">
                        <div class="_query-form-item">
                            <el-form :inline="true" :model="queryObj" class="demo-form-inline">
                                <el-form-item label="自提点名称:" style="width:320px;">
                                    <span>{{paramObj.selfSiteName}}</span>
                                </el-form-item>
                                <el-form-item>
                                    <el-input placeholder="请输入查询条件" v-model="queryObj.inputValue" style="width:350px;" :maxlength="25">
                                        <el-select v-model="queryObj.inputType" slot="prepend" placeholder="请选择" style="width:110px;">
                                            <el-option label="用户名" value="userAlias"></el-option>
                                            <el-option label="手机号" value="userMobile"></el-option>
                                            <el-option label="昵称" value="nickName"></el-option>
                                        </el-select>
                                    </el-input>
                                </el-form-item>
                                <el-form-item>
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
                        <el-table :data="tableData" border>
                            <el-table-column align="center" type="index" width="80"></el-table-column>
                            <el-table-column align="center" property="userMobile" label="手机号"></el-table-column>
                            <el-table-column align="center" property="userAlias" label="用户名"></el-table-column>
                            <el-table-column align="center" property="nickName" label="昵称"></el-table-column>
                            <el-table-column align="center" property="orderNumber" label="下订单数量"></el-table-column>
                            <el-table-column align="center" property="successOrderNumber" label="成功订单数量"></el-table-column>
                            <el-table-column align="center" property="createdDtm" label="首次下单时间"> </el-table-column>
                            <el-table-column align="center" property="lastDtm" label="最后下单时间"> </el-table-column>
                        </el-table>
                        <!-- 分页 -->
                        <div class="_pagination">
                            <el-pagination :total="total" :page-size="pageSize" layout="total, sizes, prev, pager, next" @current-change="handleCurrentChange" @size-change="handleSizeChange">
                            </el-pagination>
                        </div>
                    </div>
                </div>
            </div>
        </card-panel>
    </div>
</template>
<script>
import {
    getSelfPurchaseUserPage
} from 'actions/francoRenduAction'
export default {
    name: 'franco_rendu_user_list',
    props: {
        paramObj: {
            type: Object,
            default: {}
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
            queryObj: {
                inputValue: '',
                inputType: 'userMobile',

            }
        }
    },
    methods: {
        setParams() {
            this.$store.commit('SET_QUERY_PARAMS', this.queryObj)
        },
        loadTableData() {
            let params={
                pageNo:this.page,
                pageSize:this.pageSize,
                selfPurchaseId:this.paramObj.selfPurchaseId
            }
            params[this.queryObj.inputType]=this.queryObj.inputValue
            getSelfPurchaseUserPage(params).then(data => {
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
        onBackPage(){
            this.$emit('forward', 'RenduList')
        }
    },
    created() {
        if (this.paramObj.selfPurchaseId) {
            Object.assign(this.queryObj, _.pick(this.paramObj, ['selfPurchaseId', 'selfSiteName']))
            this.loadTableData()
        }
    }
}
</script>
