<template>
    <div class="_container">
      <!-- 查询条件 -->
      <div class="_setting-options">
        <div class="_setting-options-left">
          <el-form :inline="true" :model="billModel" class="demo-form-inline">
            <el-form-item>
              <el-date-picker
                v-model="billYearAndMonth"
                type="month"
                placeholder="选择月">
              </el-date-picker>
             </el-form-item>
              <el-form-item>
                <el-button @click="onSubmit">查询</el-button>
             </el-form-item>
          </el-form>
        </div>
        <div class="_setting-options-right">
          <el-button type="primary" @click="vm.dialogExportExcel=true">导出</el-button>
        </div>
      </div>
      <!-- 列表数据 -->
      <div class="_table-container">
        <div class="_table-list">
            <el-table :data="billData" style="width: 100%" border>
                <el-table-column align="center" type="index" width="80"></el-table-column>
                <el-table-column align="center" property="billDate" label="日期" :formatter="dateFormat" width="172"></el-table-column>
                <el-table-column align="center" property="incomeAmount" label="订单收入(元)"></el-table-column>
                <el-table-column align="center" property="refundAmount" label="订单退款(元)"> </el-table-column>
                <el-table-column align="center" property="withdrawAmount" label="提现付款"> </el-table-column>
                <el-table-column align="center" property="balance" label="可用余额(元)"> </el-table-column>
                <el-table-column align="center" property="unAvailableBalance" label="不可用余额(元)"> </el-table-column>
                <el-table-column align="center" property="serviceFee" label="平台管理费(元)"></el-table-column>
                <el-table-column align="center" property="refundFee" label="退款手续费(元)"></el-table-column>
                <el-table-column align="center" inline-template label="操作">
                  <div>
                      <el-button type="primary" size="small"
                      @click.native.prevent="clickDetail(row)">详情</el-button>
                  </div>
                </el-table-column>
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
  import {dateFormat as _dateFormat } from "lib/utils/dateFormat"
  import { _getPayBillListPage } from 'src/vuex/actions/payAction'

  export default {
    name:'pay_bill',
    components: {
      exportExcel,
    },
    data() {
      return {
        dateFormat: (row, col) => _dateFormat(new Date(row.billDate), 'yyyy-MM-dd'),
        page: 1,
        pageSize: 40,
        total: 0,
        billModel: {},
        billYearAndMonth:new Date(),
        billData: [],
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
        let tempDtm = '' ;
        if(this.billYearAndMonth){
           tempDtm = _dateFormat(this.billYearAndMonth,"yyyy-MM") ;
        }
        if(tempDtm == ''){
          this.$message({message: '请选择日期进行查询', type: 'warning'});
          return ;
        }
        let params = {
          year:tempDtm.split("-")[0],
          month:tempDtm.split("-")[1],
          pageNo: this.page,
          pageSize: this.pageSize
        }
        return params ;
      },
      searchTableList() {
        let tempParams = this.initParams() ;
        tempParams.pageNo = this.page
        tempParams.pageSize = this.pageSize
        _getPayBillListPage(tempParams).then(data => {
          const { success, result, msg } = data
          if (success) {
            this.billData = result.list
            this.total = result.total
            this.vm.maxPage = this.total % this.pageSize == 0 ? this.total / this.pageSize : Math.ceil(this.total / this.pageSize) ;
            //console.log(JSON.stringify(this.billData))
          }
        })
      },
      onSubmit(){
        // if(tempDtm == ''){
        //   this.$message({message: '请选择日期进行查询', type: 'warning'});
        //   return ;
        // }
        this.searchTableList() ;
      },
      // 导出当前页
      exportCurrentPage(){
        let tempParams = this.initParams() ;
        tempParams.pageNo = this.page
        tempParams.pageSize = this.pageSize
        location.href='/pay/mallExportPayController/exportPayBillList?'+$.param(tempParams) ;
      },
      // 导出所有
      exportAllPage(){
        let tempParams = this.initParams() ;
        tempParams.pageNo = 1;
        tempParams.pageSize = undefined ;
        location.href='/pay/mallExportPayController/exportPayBillList?'+$.param(tempParams) ;
      },
      // 导出指定页数
      gotoSomePage(somePage){
        let tempParams = this.initParams() ;
        tempParams.pageNo = 1;
        tempParams.pageSize = somePage*this.pageSize ;
        location.href='/pay/mallExportPayController/exportPayBillList?'+$.param(tempParams) ;
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.searchTableList()
      },
      handleCurrentChange(val) {
        this.page = val
        this.searchTableList()
      },
      clickDetail(row) {
        this.$router.push({ name: 'financial_supplier_detail', params: { billDate: row.billDate }})
      }
    }
  }
</script>
