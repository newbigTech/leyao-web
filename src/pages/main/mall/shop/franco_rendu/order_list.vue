<template>
    <div class="ec-setting-classify-management">
        <!-- 查询条件 -->
        <div class="_setting-bar">
            <div class="_query-form">
                <div class="_query-form-item">
                    <el-form :inline="true" class="demo-form-inline">
                        <el-form-item label="自提点名称:" style="width:100%;">
                            <span>{{paramObj.selfSiteName}}</span>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="_query-form-btn">
                </div>
            </div>
            <div class="_actions-btn">
              <el-button @click.native.prevent="onBackPage">返回</el-button>
            </div>
        </div>
        <br>
        <!-- body -->
        <div class="_container-wrapper">
            <div class="_sub-sidebar" style="width:550px;">
                <div class="_tree-header">
                    <h3>自提点订单统计 </h3>
                    <div>
                        <div class="block">
                          <span class="demonstration"></span>
                          <el-date-picker
                            v-model="queryObj.selectedMonth"
                            type="month"
                            placeholder="选择月" @change="loadTableData1" :clearable="false">
                          </el-date-picker>
                          <el-button @click.native.prevent="loadTableData1">查询</el-button>
                          <el-button @click.native.prevent="reloadDay">更新统计</el-button>
                        </div>
                    </div>
                </div>
                <div class="_table-list">
                    <el-table :data="dayList" border>
                        <el-table-column align="center" property="days" label="日期"></el-table-column>
                        <el-table-column align="center" label="成功订单数/总订单数量" inline-template>
                             <span><el-button type="text" @click.native.prevent="onSetQueryType(row,1)">{{row.orderSuccessNumber}}</el-button> / <el-button type="text"  @click.native.prevent="onSetQueryType(row,0)">{{row.orderNumber}}</el-button></span>
                        </el-table-column>
                        <el-table-column align="center" label="自提订单数" inline-template>
                            <span><el-button type="text" @click.native.prevent="onSetQueryType(row,2)">{{row.deliveryOrderNumber}}</el-button></span>
                        </el-table-column>
                        <el-table-column align="center" property="lastDtm" label="最后更新时间" min-width="150"></el-table-column>
                    </el-table>
                </div>
            </div>
            <div class="_sub-body">
                <div class="_tree-header">
                    <h3>日订单列表 <span v-show="selectedDay!=''">[{{selectedDay}}]</span></h3>
                    <div style="margin-top: 23px;">
                        <el-form :inline="true" :model="queryOrderParams" class="demo-form-inline">
                        <el-form-item>
                            <el-input v-model="queryOrderParams.orderNo" placeholder="订单号" :maxlength="50"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="queryOrderParams.adName" placeholder="收货人姓名" :maxlength="20"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="queryOrderParams.adPhone" placeholder="收货人手机号" :maxlength="20"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click.native.prevent="loadTableData">查询</el-button>
                        </el-form-item>
                    </el-form>
                    </div>
                </div>
                <div class="_table-list">
                    <el-table :data="tableData" border>
                        <el-table-column align="center" property="orderNo" label="订单号" min-width="120"></el-table-column>
                        <el-table-column align="center" property="userAlias" label="用户名" inline-template  min-width="70">
                            <span>{{row.userMobile}}</span>
                        </el-table-column>
                        <el-table-column align="center" property="amountPrice" label="实际金额/支付金额" inline-template>
                        <span>{{row.amountPrice}} / {{row.paymentPrice}}</span>
                        </el-table-column>
                        <el-table-column align="center" property="adName" label="收货人" inline-template>
                            <span>{{row.adName}}<br>({{row.adPhone}})</span>
                        </el-table-column>
                        <el-table-column align="center" property="createdDtm" label="下单时间" min-width="100"></el-table-column>
                        <el-table-column align="center" property="strVal1" label="提货时间" min-width="100"></el-table-column>
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
import {
    dateFormat as _dateFormat
} from "lib/utils/dateFormat"
import {
    getSelfPurchaseCollect,getSelfPurchaseOrderPage,reloadPurchaseDayCollect
} from 'actions/francoRenduAction'
export default {
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
            selectedDay: '',
            dayList:[],
            page: 1,
            pageSize: 20,
            total: 0,
            tableData: [],
            queryObj:{
                selectedMonth: '',
            },
            queryOrderParams:{
                queryType:'',//type查询条件 0：查询下订单数 1：查询成功订单数 2：查询自提单数
                queryDay:'',
                orderNo:'',
                adName:'',
                adPhone:''
            }
        }
    },
    methods: {
        reloadDay(){
            let params={
                selfPurchaseId:this.paramObj.selfPurchaseId,
                queryDay:_dateFormat(this.queryObj.selectedMonth,'yyyy-MM-dd')
            }
           reloadPurchaseDayCollect(params).then(data=>{
              const { success, msg, result } = data
              if (success) {
                    this.$message.success('操作成功,请稍后查看')
                } else {
                    this.$message.error(msg)
                    return false
                }
            })
        },
        onBackPage() {
            this.$emit('forward', 'RenduList')
        },
        loadTableData1(){
            let params={
                selfPurchaseId:this.paramObj.selfPurchaseId,
            }
            if(_.isDate(this.queryObj.selectedMonth)){
                params.queryMonth=_dateFormat(this.queryObj.selectedMonth,'yyyy-MM-dd')
            }else{
                params.queryMonth=this.queryObj.selectedMonth
            }
            //console.log('params',params)
            this.queryOrderParams={
                queryType:'',//type查询条件 0：查询下订单数 1：查询成功订单数 2：查询自提单数
                queryDay:'',
                orderNo:'',
                adName:'',
                adPhone:''
            }
            this.tableData=[]
            this.selectedDay=''
            getSelfPurchaseCollect(params).then(data => {
                this.dayList = data||[]
            })
        },
        onSetQueryType(row,type){
            this.queryOrderParams.queryType=type
            this.queryOrderParams.queryDay=row.days
            this.selectedDay=row.days
            this.loadTableData()
        },
        loadTableData() {
            let params={
                pageNo:this.page,
                pageSize:this.pageSize,
                queryType:this.queryOrderParams.queryType,
                queryDay:this.queryOrderParams.queryDay,
                selfPurchaseId:this.paramObj.selfPurchaseId,
                orderNo:this.queryOrderParams.orderNo,
                adName:this.queryOrderParams.adName,
                adPhone:this.queryOrderParams.adPhone
            }
            getSelfPurchaseOrderPage(params).then(data => {
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
        if (this.paramObj.selfPurchaseId) {
            this.queryObj.selectedMonth=_dateFormat(new Date(),'yyyy-MM-dd')
            Object.assign(this.queryObj, _.pick(this.paramObj, ['selfPurchaseId', 'selfSiteName']))
            this.loadTableData1()
        }
        
    }
}
</script>
<style lang="sass">
</style>
