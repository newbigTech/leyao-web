<template>
    <div class="_container">
      <!-- 查询条件 -->
      <div class="_setting-options">
        <div class="_setting-options-left">
            <el-form :inline="true" :model="withdrawsModel" class="demo-form-inline">
              <el-form-item>
                 <el-date-picker
                    v-model="withdrawsModel.rangeTime"
                    type="daterange"
                    placeholder="选择日期范围"
                    style="width: 220px"
                    :picker-options="rangeTimeOptions">
                 </el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-select v-model="withdrawsModel.status" placeholder="提现状态" v-show="statusFlag" clearable>
                    <!-- <el-option label="全部" value=""></el-option> -->
                    <el-option label="待审核" value="APPLYING"></el-option>
                    <el-option label="审核中" value="AUDITING"></el-option>
                    <el-option label="待付款" value="CONFIRM"></el-option>
                    <el-option label="审核不通过" value="REJECT"></el-option>
                    <el-option label="已打款" value="REMITED"></el-option>
                    <el-option label="打款失败" value="REMIT_FAIL"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button @click="onSubmit">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="_setting-options-right">
            <el-button type="primary" @click="vm.dialogExportExcel = true">导出</el-button>
          </div>
        </div>
      <el-tabs :active-name="activeName" style="width:100%" @tab-click="onTabClick">
            <el-tab-pane label="全部" name="tab1"></el-tab-pane>
            <el-tab-pane label="审核中" name="tab2"></el-tab-pane>
            <el-tab-pane label="待付款" name="tab3"></el-tab-pane>
            <el-tab-pane label="已付款" name="tab4"></el-tab-pane>
      </el-tabs>
      <!-- 列表数据 -->
      <div class="_table-container">
        <div class="_table-list">
            <el-table :data="withdrawsData" style="width: 100%" border>
                <el-table-column type="index" width="80" align="center"></el-table-column>
                <el-table-column property="applyTime" label="申请时间" width="172" :formatter="dateFormat" align="center"></el-table-column>
                <el-table-column property="bankName" label="银行名称" min-width="200" align="center"></el-table-column>
                <el-table-column property="accountNo" label="帐号" min-width="220" align="center"> </el-table-column>
                <el-table-column property="withdrawAmount" label="提现金额(元)" width="120" align="center"> </el-table-column>
                <el-table-column property="payAmount" label="打款金额(元)" width="120" align="center"> </el-table-column>
                <el-table-column property="settleFee" label="转账手续费(元)" width="130" align="center"> </el-table-column>
                <el-table-column property="payee" label="收款人" width="110" align="center"> </el-table-column>
                <el-table-column inline-template label="提现状态"  width="110" align="center">
                    <div>
                      <span v-if="row.status == 'APPLYING'">待审核</span>
                      <span v-if="row.status == 'AUDITING'">审核中</span>
                      <span v-if="row.status == 'CONFIRM'">待付款</span>
                      <span v-if="row.status == 'REJECT'">审核不通过</span>
                      <span v-if="row.status == 'REMITED'">已打款</span>
                      <span v-if="row.status == 'REMIT_FAIL'">打款失败</span>
                    </div>
                </el-table-column>
                <el-table-column property="applyerUserName" label="申请人"  width="120"> </el-table-column>
                <el-table-column property="comments" label="备注"  width="200"> </el-table-column>
            </el-table>
            <!-- 分页 -->
            <div class="_pagination">
                <el-pagination
                    :total="total"
                    :page-size="pageSize"
                    :page-sizes="[2, 20, 30, 40]"
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
  import {dateFormat as _dateFormat } from "lib/utils/dateFormat"
  import { _getShopWithdrawRecordPage } from 'src/vuex/actions/payAction'

  export default {
    name:'withdraws_list',
    components: {
      exportExcel,
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
        dateFormat: (row, col) => _dateFormat(new Date(row.applyTime), 'yyyy-MM-dd HH:mm:ss'),
        page: 1,
        pageSize: 2,
        total: 0,
        withdrawsModel: {
          status:'',
          rangeTime:'',
          status:''
        },
        // withdrawsData: [{"applyTime":"2016-02-12","bankName":"招商银行","accountNo":"62284879646536000445","withdrawAmount":"185","payAmount":"180","settleFee":"5","payee":"sean","status":"APPLYING","accountType":"0"}],
        withdrawsData: [],

        activeName:'tab1',
        statusFlag:true,
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
        if(this.withdrawsModel.rangeTime[0] && this.withdrawsModel.rangeTime[1]){
           tempDtmStart = _dateFormat(new Date(this.withdrawsModel.rangeTime[0]),"yyyy-MM-dd") ;
           tempDtmEnd = _dateFormat(new Date(this.withdrawsModel.rangeTime[1]),"yyyy-MM-dd") ;
        }

        let params = {
          orderNo: this.withdrawsModel.orderNo,
          tradeType: this.withdrawsModel.tradeType,
          status:this.withdrawsModel.status,
          startTime:tempDtmStart,
          tempDtmEnd:tempDtmEnd,
          pageNo: this.page,
          pageSize: this.pageSize
        }
        return params ;
      },
      searchTableList() {
        let tempParams = this.initParams() ;
        tempParams.pageNo = this.page
        tempParams.pageSize = this.pageSize
        //console.log(JSON.stringify(params))
        _getShopWithdrawRecordPage(tempParams).then(data => {
          const { success, result, msg } = data
          if (success) {
            this.withdrawsData = result.list
            this.total = result.total
            this.vm.maxPage = this.total % this.pageSize == 0 ? this.total / this.pageSize : Math.ceil(this.total / this.pageSize) ;
          }
        })
      },
      onSubmit(){
        this.searchTableList()
      },
      onTabClick(tab, event) {
          this.activeName=tab.name
          if(tab.name==='tab1'){
              this.page = 1
              this.withdrawsModel.status = ''
              this.statusFlag = true ;
          }else if(tab.name==='tab2'){
              this.page= 1
              this.withdrawsModel.status = 'AUDITING'
              this.statusFlag = false ;
          }else if(tab.name==='tab3'){
              this.page = 1
              this.withdrawsModel.status = 'CONFIRM'
              this.statusFlag = false ;
          }else if(tab.name==='tab4'){
              this.page = 1
              this.withdrawsModel.status = 'REMITED'
              this.statusFlag = false ;
          }
          this.searchTableList()
      },
      // 导出当前页
      exportCurrentPage(){
        console.log("exportCurrentPage")
        let tempParams = this.initParams() ;
        tempParams.pageNo = this.page
        tempParams.pageSize = this.pageSize
        location.href='/pay/mallShopExportPayController/exportWithdrawRecordList?'+$.param(tempParams) ;
      },
      // 导出所有
      exportAllPage(){
        let tempParams = this.initParams() ;
        tempParams.pageNo = 1;
        tempParams.pageSize = undefined ;
        location.href='/pay/mallShopExportPayController/exportWithdrawRecordList?'+$.param(tempParams) ;
        console.log("exportAllPage")
      },
      // 导出指定页数
      gotoSomePage(somePage){
        let tempParams = this.initParams() ;
        tempParams.pageNo = 1;
        tempParams.pageSize = somePage*this.pageSize ;
        location.href='/pay/mallShopExportPayController/exportWithdrawRecordList?'+$.param(tempParams) ;
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
