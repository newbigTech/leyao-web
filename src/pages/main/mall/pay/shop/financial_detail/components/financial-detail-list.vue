<template>
    <div class="_container">
      <!-- 查询条件 -->
      <div class="_setting-options">
        <div class="_setting-options-left">
          <el-form :inline="true" :model="financialModel" class="demo-form-inline">
            <el-form-item>
               <el-date-picker
                  v-model="financialModel.rangeTime"
                  type="daterange"
                  placeholder="选择日期范围"
                  style="width: 220px"
                  :picker-options="rangeTimeOptions">
               </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-input v-model="financialModel.fundNo" placeholder="资金流水号"></el-input>
            </el-form-item>
            <el-form-item>
              <el-select v-model="financialModel.businessType" placeholder="资金业务类型" clearable>
                  <!-- <el-option label="全部" value=""></el-option> -->
                  <el-option label="消费" value="CONSUME"></el-option>
                  <el-option label="充值" value="RECHARGE"></el-option>
                  <el-option label="退款 " value="REFUND"></el-option>
                  <el-option label="提现" value="WITHDRAW"></el-option>
                  <el-option label="平台服务费" value="SERVICE_FEE"></el-option>
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
      <!-- 列表数据 -->
      <div class="_table-container">
        <div class="_table-list">
            <el-table :data="financialData" style="width: 100%" border>
                <el-table-column align="center" type="index" width="80"></el-table-column>
                <el-table-column align="center" property="createTime" label="创建日期" :formatter="dateFormat" width="172"></el-table-column>
                <el-table-column align="center" inline-template label="资金业务类型" width="160">
                  <div>
                    <span v-if="row.businessType == 'CONSUME'">消费</span>
                    <span v-if="row.businessType == 'RECHARGE'">充值</span>
                    <span v-if="row.businessType == 'REFUND'">退款</span>
                    <span v-if="row.businessType == 'WITHDRAW'">提现</span>
                    <span v-if="row.businessType == 'SERVICE_FEE'">平台服务费</span>
                  </div>
                </el-table-column>
                <el-table-column align="center" property="eventName" label="名称"> </el-table-column>
                <el-table-column align="center" property="fundNo" label="收支流水号"  width="250"> </el-table-column>
                <el-table-column align="center" property="incomeAmount" label="收入(元)"> </el-table-column>
                <el-table-column align="center" property="costAmount" label="支出(元)"> </el-table-column>
                <el-table-column align="center" inline-template label="可用余额(元)">
                  <div>
                    <span v-if="row.businessType == 'WITHDRAW'"></span>
                    <span v-if="row.businessType != 'WITHDRAW'">{{row.balance}}</span>
                  </div>
                </el-table-column>
                <el-table-column align="center" inline-template label="操作">
                      <div v-if="row.businessType == 'CONSUME' ||
                                row.businessType == 'RECHARGE' ||
                                row.businessType == 'SERVICE_FEE'">
                        <el-button
                          size="small"
                          type="danger"
                          @click.native.prevent="onViewOrder(row)">详情</el-button>
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
  import { _getShopFundRecordPage } from 'src/vuex/actions/payAction'
  import MD5 from 'crypto-js/md5'

  export default {
    name:'financial_list',
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
        dateFormat: (row, col) => _dateFormat(new Date(row.createTime), 'yyyy-MM-dd HH:mm:ss'),
        page: 1,
        pageSize: 10,
        total: 0,
        financialModel: {

          rangeTime:[],
          businessType:''
        },
        financialData: [],
        vm:{
          dialogExportExcel:false , // 导出excel
        }
      }
    },
    created(){
      if(this.$route.params.billDate){
        this.financialModel.rangeTime.push(new Date(this.$route.params.billDate))
        this.financialModel.rangeTime.push(new Date(this.$route.params.billDate))
      }
      this.searchTableList()
    },
    methods: {
      initParams(){
        let tempDtmStart = '' ;
        let tempDtmEnd = '' ;
        if(this.financialModel.rangeTime[0] && this.financialModel.rangeTime[1]){
           tempDtmStart = _dateFormat(new Date(this.financialModel.rangeTime[0]),"yyyy-MM-dd") ;
           tempDtmEnd = _dateFormat(new Date(this.financialModel.rangeTime[1]),"yyyy-MM-dd") ;
        }
        let params = {
          startTime:tempDtmStart,
          endTime:tempDtmEnd,
          businessType:this.financialModel.businessType,
          fundNo:this.financialModel.fundNo,
          pageNo: this.page,
          pageSize: this.pageSize
        }
        return params ;
      },
      searchTableList() {
        //console.log(JSON.stringify(params))
        let tempParams = this.initParams() ;
        _getShopFundRecordPage(tempParams).then(data => {
          const { success, result, msg } = data
          if (success) {
            this.financialData = result.list
            this.total = result.total
            this.vm.maxPage = this.total % this.pageSize == 0 ? this.total / this.pageSize : Math.ceil(this.total / this.pageSize) ;
          }
        })
      },
      onSubmit(){
        this.searchTableList()
      },
      onViewOrder(item) {
            //console.log(JSON.stringify(item))
            let params = {
                orderNo: item.linkNo,
                urlPathName:'financial_shop_detail',
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
        location.href='/pay/mallShopExportPayController/exportFundRecordList?'+$.param(tempParams) ;
      },
      // 导出所有
      exportAllPage(){
        let tempParams = this.initParams() ;
        tempParams.pageNo = 1;
        tempParams.pageSize = undefined ;
        location.href='/pay/mallShopExportPayController/exportFundRecordList?'+$.param(tempParams) ;
        console.log("exportAllPage")
      },
      // 导出指定页数
      gotoSomePage(somePage){
        let tempParams = this.initParams() ;
        tempParams.pageNo = 1;
        tempParams.pageSize = somePage*this.pageSize ;
        location.href='/pay/mallShopExportPayController/exportFundRecordList?'+$.param(tempParams) ;
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
    },
  }
</script>
