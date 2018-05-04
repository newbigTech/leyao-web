<template>
    <div class="_container">
      <card-panel class="">
        <h3 slot="title">交易记录</h3>
        <div slot="panel-btns">
            <el-button size="small" type="success" 
            @click.native.prevent="$emit('reback','userAccountList',model)">返回</el-button>
        </div>
      </card-panel>
      <!-- 查询条件 -->
      <div class="_setting-options">
        <div class="_setting-options-left">
          <el-form :inline="true" :model="transactionModel" class="demo-form-inline">
          <el-form-item>
             <el-date-picker
                v-model="transactionModel.rangeTime"
                type="daterange"
                placeholder="选择日期范围"
                style="width: 220px"
                :picker-options="rangeTimeOptions">
             </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-input v-model="transactionModel.merchantOrderNo" placeholder="订单号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="transactionModel.orderStatus" placeholder="订单状态" clearable>
                <!-- <el-option label="全部" value=""></el-option> -->
                <el-option label="待付款" value="WAIT_BUYER_PAY"></el-option>
                <el-option label="关闭" value="CLOSED"></el-option>
                <el-option label="成功 " value="SUCCESS"></el-option>
                <el-option label="交易结束" value="FINISHED"></el-option>
                <el-option label="失败" value="FAIL"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select v-model="transactionModel.tradeType" placeholder="交易类型" clearable>
                <!-- <el-option label="全部" value=""></el-option> -->
                <el-option label="消费" value="CONSUME"></el-option>
                <el-option label="充值" value="RECHARGE"></el-option>
                <el-option label="退款" value="REFUND"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button @click="onSubmit">查询</el-button>
          </el-form-item>
        </el-form>
        </div>
        <div class="_setting-options-right">
          <!-- <el-button type="primary" @click="vm.dialogExportExcel = true">导出</el-button> -->
        </div>
      </div>
      <!-- 列表数据 -->
      <div class="_table-container">
        <div class="_table-list">
            <el-table :data="transactionData" style="width: 100%" border>
                <el-table-column fixed type="index" width="50"></el-table-column>
                <el-table-column fixed property="merchantOrderNo" label="订单号" width="230"></el-table-column>
                <el-table-column fixed property="payTime" label="支付时间" width="180" :formatter="dateFormat"></el-table-column>
                <el-table-column fixed property="productName" label="交易名称" width="200"> </el-table-column>               
                <el-table-column inline-template label="交易类型" width="150">
                     <div>
                      <span v-if="row.tradeType == 'CONSUME'">消费</span>
                      <span v-if="row.tradeType == 'RECHARGE'">充值</span>
                      <span v-if="row.tradeType == 'REFUND'">退款</span>
                    </div>
                </el-table-column>
                <el-table-column  inline-template label="订单状态" width="150">
                    <div>
                      <span v-if="row.orderStatus == 'WAIT_BUYER_PAY'">待付款</span>
                      <span v-if="row.orderStatus == 'CLOSED'">关闭</span>
                      <span v-if="row.orderStatus == 'SUCCESS'">成功</span>
                      <span v-if="row.orderStatus == 'FINISHED'">交易结束</span>
                      <span v-if="row.orderStatus == 'FAIL'">失败</span>
                    </div>
                </el-table-column>                
                <el-table-column property="paymentNo" label="支付流水号"  width="250"></el-table-column>
                <el-table-column inline-template label="支付方式" width="150">
                    <div>
                      <span v-if="row.payWay == 'ACCOUNT'">余额</span>
                      <span v-if="row.payWay == 'CARD_ACCOUNT'">卡支付</span>
                      <span v-if="row.payWay == 'ALIPAY'">支付宝</span>
                      <span v-if="row.payWay == 'WEIXIN'">微信</span>
                    </div>
                </el-table-column>
                <!-- <el-table-column property="buyerName" label="买家" width="150"> </el-table-column> -->
                <el-table-column property="totalAmount" label="订单金额(元)" width="150"> </el-table-column>
                <el-table-column property="payFee" label="支付平台手续费(元)" width="200"></el-table-column>
                <el-table-column property="serviceFee" label="平台管理费(元)" width="200"></el-table-column>
                <!-- <el-table-column fixed="right" inline-template label="操作" width="190">
                  <div>
                      <el-button type="primary" size="small"
                        @click.native.prevent="$emit('forward', 'transactionListDetail', row)">支付详情</el-button>
                      <el-button type="primary" size="small"
                        @click.native.prevent="onViewOrder(row)">订单详情</el-button>
                  
                  </div>
                </el-table-column> -->
            </el-table>
            <!-- 分页 -->
            <div class="_pagination">
                <el-pagination
                    :total="total"
                    :page-size="pageSize"
                    :page-sizes="[10, 20, 30, 40]"
                    layout="total, sizes, prev, pager, next"
                    @current-change="handleCurrentChange"
                    @size-change="handleSizeChange"
                >
                </el-pagination>
            </div>
        </div>
      </div>

      <!-- 导出excel导航 -->
      <el-dialog title="导出excel" v-model="vm.dialogExportExcel" size="tiny">
          <export-excel @exportCurrentPage="exportCurrentPage" @exportAllPage="exportAllPage"
              @gotoSomePage="gotoSomePage" :vm="vm"></export-excel>
      </el-dialog>
    </div>
</template>

<script>

  import exportExcel from "pages/main/mall/common/components/export_excel"
  import { dateFormat as _dateFormat } from "lib/utils/dateFormat"
  import { _getUserTransactionListPage,_exportTransactionList } from 'src/vuex/actions/payAction'
  import MD5 from 'crypto-js/md5'

  export default {
    name:'user_account_transaction_list',
    components: {
      exportExcel,
    },
    props: {
      model: Object, default: () => {},
    },
    computed: {

    },
    data() {
      return {
         rangeTimeOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        dateFormat: (row, col) => _dateFormat(new Date(row.payTime), 'yyyy-MM-dd HH:mm:ss'),
        page: 1,
        pageSize: 10,
        total: 0,
        transactionModel: {
          orderStatus:'',
          tradeType:'',
          rangeTime:'',
        },
        transactionData: [],
        vm:{
          dialogExportExcel:false , // 导出excel
        }
      }
    },
    created(){
      this.searchTableList()
    },
    methods: {
      initParams(){
        let tempDtmStart = '' ;
        let tempDtmEnd = '' ;
        if(this.transactionModel.rangeTime[0] && this.transactionModel.rangeTime[1]){
           tempDtmStart = _dateFormat(new Date(this.transactionModel.rangeTime[0]),"yyyy-MM-dd") ;
           tempDtmEnd = _dateFormat(new Date(this.transactionModel.rangeTime[1]),"yyyy-MM-dd") ;
        }
        let params = {
          merchantOrderNo: this.transactionModel.merchantOrderNo,
          tradeType: this.transactionModel.tradeType,
          orderStatus:this.transactionModel.orderStatus,
          //payWay:this.transactionModel.payWay,
          startTime:tempDtmStart,
          endTime:tempDtmEnd,
        }
        return params ;
      },
      searchTableList() {
        let tempParams = this.initParams() ;
        tempParams.buyerId = this.model.userId ;
        tempParams.pageNo = this.page
        tempParams.pageSize = this.pageSize;
        //console.log(JSON.stringify(tempParams)) ;
        _getUserTransactionListPage(tempParams).then(data => {
          const { success, result, msg } = data
          if (success) {
            this.transactionData = result.list ;
            this.total = result.total
            this.vm.maxPage = this.total % this.pageSize == 0 ? this.total / this.pageSize : Math.ceil(this.total / this.pageSize) ;
          }
        })
      },
      onSubmit(){
        this.searchTableList() ;
      },
      onViewOrder(item) {
            let params = {
                orderNo: item.merchantOrderNo,
                urlPathName:'transaction_supplier_record',
                r: _.toNumber(_.now())
            }
            params.passKey = MD5(JSON.stringify(params) + 'viewPayOrder').toString()
            this.$router.push({
                name: 'viewPayOrder',
                query: params
            })
      },


      // 导出当前页
      exportCurrentPage(){
        console.log("exportCurrentPage")
        let tempParams = this.initParams() ;
        tempParams.pageNo = this.page
        tempParams.pageSize = this.pageSize
        location.href='/pay/mallExportPayController/exportTransactionList?'+$.param(tempParams) ;
      },
      // 导出所有
      exportAllPage(){
        let tempParams = this.initParams() ;
        tempParams.pageNo = 1;
        tempParams.pageSize = undefined ;
        location.href='/pay/mallExportPayController/exportTransactionList?'+$.param(tempParams) ;
        console.log("exportAllPage")
      },
      // 导出指定页数
      gotoSomePage(somePage){
        let tempParams = this.initParams() ;
        tempParams.pageNo = 1;
        tempParams.pageSize = somePage*this.pageSize ;
        location.href='/pay/mallExportPayController/exportTransactionList?'+$.param(tempParams) ;
        console.log("gotoSomePage===="+somePage)
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.searchTableList()
      },
      handleCurrentChange(val) {
        this.page = val
        this.searchTableList()
      },
    }
  }
</script>
