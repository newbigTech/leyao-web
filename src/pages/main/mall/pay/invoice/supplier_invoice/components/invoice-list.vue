<template>
    <div class="_container">
        <el-card class="box-card bg-purple-light" style="margin-top: 20px;">
            <el-row>
              <div >
                <el-col :span="8">
                  <div class="grid-content" style="font-size: 18px;text-align: center">
                    <div>{{invoiceResult.availableAmount}}元</div>
                    <div>可开票金额（不含运费）</div>
                  </div>
                </el-col>
                <el-col :span="8">
                  <div class="grid-content" style="font-size: 18px;text-align: center">
                    <div>{{invoiceResult.consumerAmount}}元</div>
                    <div>累计已开票金额</div>
                  </div>
                </el-col>
                <el-col :span="8">
                   <div class="grid-content" style="font-size: 18px;text-align: center">
                     <div>{{invoiceResult.pendingAmount}}元</div>
                     <div>审核中发票金额</div>
                   </div>
                </el-col>
              </div>
            </el-row>
        </el-card>
      <!-- 查询条件 -->
      <div class="_setting-options">
        <div class="_setting-options-left">
          <el-form :inline="true" :model="invoiceModel" class="demo-form-inline">
            <el-form-item>
               <el-date-picker
                  v-model="invoiceModel.rangeTime"
                  type="daterange"
                  placeholder="选择日期范围"
                  style="width: 220px"
                  :picker-options="rangeTimeOptions">
               </el-date-picker>
            </el-form-item>
            <el-form-item>
              <el-select v-model="invoiceModel.status" placeholder="发票状态" clearable>
                  <el-option label="草稿" value="DRAFT"></el-option>
                  <el-option label="待审核" value="PENDING"></el-option>
                  <el-option label="审核通过 " value="PASS"></el-option>
                  <el-option label="审核不通过" value="REJECT"></el-option>
                  <el-option label="已出票" value="GETED"></el-option>
                  <el-option label="已寄出" value="SENDED"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="_setting-options-right">
          <el-button type="warning" @click.native.prevent="$emit('forward', 'invoiceAudit', invoiceObj,'insert')">索取发票</el-button>
        </div>
      </div>
      <!-- 列表数据 -->
      <div class="_table-container">
        <div class="_table-list">
            <el-table :data="invoiceListData" style="width: 100%" border>
                <el-table-column  type="index" width="80" align="center"></el-table-column>
                <el-table-column  property="createdDtm" label="提交日期" :formatter="dateFormat"></el-table-column>
                <el-table-column property="invoiceTitle" label="发票抬头"> </el-table-column>
                <el-table-column property="serviceFee" label="金额(元)"> </el-table-column>
                <el-table-column property="receiverName" label="收件人"> </el-table-column>
                <el-table-column property="mobilePhone" label="收件人电话"> </el-table-column>
                <el-table-column inline-template label="状态" width="120">
                     <div>
                      <span v-if="row.statusCode == 'DRAFT'">草稿</span>
                      <span v-if="row.statusCode == 'PENDING'">待审核</span>
                      <span v-if="row.statusCode == 'PASS'">审核通过</span>
                      <span v-if="row.statusCode == 'REJECT'">审核不通过</span>
                      <span v-if="row.statusCode == 'GETED'">已出票</span>
                      <span v-if="row.statusCode == 'SENDED'">已寄出</span>
                    </div>
                </el-table-column>
                <el-table-column inline-template label="操作" width="250">
                  <div>
                      <el-button type="primary" size="small" 
                        v-if="row.statusCode == 'DRAFT' || row.statusCode == 'REJECT'"
                        @click.native.prevent="$emit('forward', 'invoiceAudit', row,'edit')">编辑</el-button>
                      <el-button type="primary" size="small"
                        @click.native.prevent="$emit('forward', 'invoiceAudit', row,'detail')">发票详情</el-button>
                      <el-button type="primary" size="small" 
                        v-if="row.statusCode == 'DRAFT' || row.statusCode == 'REJECT'"
                        @click.native.prevent="$emit('forward', 'invoiceAudit', row,'audit')">提交审核</el-button>
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

    </div>
</template>

<script>

  import { dateFormat as _dateFormat } from "lib/utils/dateFormat"
  import { _getInvoiceStatis,_getInvoicePageList } from 'src/vuex/actions/payInvoiceAction'
  import MD5 from 'crypto-js/md5'

  export default {
    name:'invoice_list',
    components: {

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
        dateFormat: (row, col) => _dateFormat(new Date(row.createdDtm), 'yyyy-MM-dd HH:mm:ss'),
        page: 1,
        pageSize: 10,
        total: 0,
        invoiceModel: {
          status:'',
          tradeType:'',
          rangeTime:'',
        },
        invoiceListData: [],
        invoiceResult:{},

        invoiceObj:{} // 新增发票为空对象
      }
    },
    created(){
      this.loadInitData() ;
      this.searchTableList() ;
    },
    methods: {
      loadInitData(){
          _getInvoiceStatis().then(data => {
            const { success, result, msg } = data
            //console.log(JSON.stringify(data))
            if (success) {
              this.invoiceResult = result ;
            }
          })
      },
      initParams(){
        let tempDtmStart = '' ;
        let tempDtmEnd = '' ;
        if(this.invoiceModel.rangeTime[0] && this.invoiceModel.rangeTime[1]){
           tempDtmStart = _dateFormat(new Date(this.invoiceModel.rangeTime[0]),"yyyy-MM-dd") ;
           tempDtmEnd = _dateFormat(new Date(this.invoiceModel.rangeTime[1]),"yyyy-MM-dd") ;
        }
        let params = {
          status:this.invoiceModel.status,
          startTime:tempDtmStart,
          endTime:tempDtmEnd,
        }
        return params ;
      },
      searchTableList() {
        let tempParams = this.initParams() ;
        tempParams.pageNo = this.page
        tempParams.pageSize = this.pageSize
        //console.log(JSON.stringify(tempParams))
        _getInvoicePageList(tempParams).then(data => {
          const { success, result, msg } = data
          //console.log(JSON.stringify(data))
          if (success) {
            this.invoiceListData = result.list ;
            this.total = result.total
          }
        })
      },
      onSubmit(){
        this.searchTableList() ;
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
<style scoped>
  .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
