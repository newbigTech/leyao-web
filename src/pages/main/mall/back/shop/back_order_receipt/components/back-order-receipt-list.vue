<template>
    <div class="_container">
      <!-- 查询条件 -->
      <div class="_setting-bar">
        <div class="_query-form">
          <div class="_query-form-item">
            <el-form :inline="true" :model="backOrderReceiptModel" class="demo-form-inline">
              <el-form-item style="width: auto;">
                 <el-date-picker
                    v-model="rangeTime"
                    type="daterange"
                    placeholder="选择日期范围"
                    style="width: 220px"
                    :picker-options="rangeTimeOptions">
                 </el-date-picker>
              </el-form-item>
              <el-form-item style="width: 210px;">
                <el-input v-model="backOrderReceiptModel.backOrderNo" placeholder="退换货申请号"></el-input>
              </el-form-item>
              <el-form-item style="width: 210px;">
                <el-input v-model="backOrderReceiptModel.orderNo" placeholder="订单编号"></el-input>
              </el-form-item>
              <el-form-item style="width: 210px;">
                <el-input v-model="backOrderReceiptModel.expressNo" placeholder="运单号"></el-input>
              </el-form-item>
              <el-form-item style="width: 210px;">
                <el-input v-model="backOrderReceiptModel.receiptNo" placeholder="收货单号"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input v-model="backOrderReceiptModel.userAlias" placeholder="客户"></el-input>
              </el-form-item>
              <el-form-item>
                <el-select v-model="backOrderReceiptModel.backType" placeholder="寄回方式" clearable>
                  <el-option label="无" value="0"></el-option>
                  <el-option label="上门取件" value="1"></el-option>
                  <el-option label="用户自寄" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-select v-model="backOrderReceiptModel.statusCode" placeholder="状态" v-show="isEditStatusFlag" clearable>
                  <el-option label="初始化" value="0"></el-option>
                  <el-option label="合格" value="1"></el-option>
                  <el-option label="不合格" value="2"></el-option>
                  <el-option label="部分合格" value="3"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item style="width: 85px">
                <el-button @click="onSubmit">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <!-- 列表数据 -->
      <div class="_table-container">
        <div class="_table-list">
            <el-table :data="backOrderReceiptData" style="width: 100%" border>
                <el-table-column width="70" align="center" type="index"></el-table-column>
                <el-table-column width="180" align="center" property="receiptNo" label="收货单编号"> </el-table-column>
                <el-table-column width="230" align="center" property="backOrderNo" label="退换货申请号"> </el-table-column>
                <el-table-column width="230" align="center" property="orderNo" label="订单编号"> </el-table-column>
                <el-table-column width="200" align="center" property="expressNo" label="运单号"> </el-table-column>
                <el-table-column width="130" align="center" inline-template label="退货商品/数量">
                  <div>
                    <el-popover
                      ref="goodsDetailPopover"
                      placement="bottom"
                      width="600"
                      trigger="click">
                      <el-table :data="goodListData">
                        <el-table-column align="center" type="index" width="70"></el-table-column>
                        <el-table-column align="center" property="goodsName" label="商品名称"> </el-table-column>
                        <el-table-column align="center" property="number" label="退换货数量">
                        </el-table-column>
                      </el-table>
                    </el-popover>
                    <el-button size="small" v-popover:goodsDetailPopover @click.native.prevent="popoverClickEvent(row)">点击查看</el-button>
                  </div>
                </el-table-column>
                <el-table-column width="110" align="center" inline-template label="寄回方式">
                  <div>
                      <span v-if="row.backType == 0">无</span>
                      <span v-if="row.backType == 1">上门取件</span>
                      <span v-if="row.backType == 2">用户自寄</span>
                  </div>
                </el-table-column>
                <el-table-column width="120" align="center" property="userAlias" label="客户"></el-table-column>
                <el-table-column width="120" align="center" inline-template label="状态">
                  <div>
                      <span v-if="row.statusCode == 0">初始化</span>
                      <span v-if="row.statusCode == 1">合格</span>
                      <span v-if="row.statusCode == 2">不合格</span>
                      <span v-if="row.statusCode == 3">部分合格</span>
                  </div>
                </el-table-column>
                <el-table-column width="175" align="center" property="createdDtm" label="退换货申请日期" :formatter="dateFormat"></el-table-column>
                <el-table-column width="100" align="center" inline-template label="订单处理">
                  <div>
                      <el-button type="warning" size="mini" v-if="row.statusCode == 0" @click.native.prevent="$emit('forward', 'backReceiptItem', row)">操作</el-button>
                      <el-button type="primary" size="mini" v-if="row.statusCode != 0" @click.native.prevent="$emit('forward', 'backReceiptItem', row)">详情</el-button>
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
  import { _queryReceiptPageList,_getBackOrderItemList } from 'src/vuex/actions/backAction'
  import MD5 from 'crypto-js/md5'

  export default {
    name:'back_order_receipt_list',
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
        backOrderReceiptModel: {
          statusCode:'',
          backType:'',
        },
        rangeTime:'',
        backOrderReceiptData: [],

        goodListData:[], //商品明细
        isEditStatusFlag : true ,
      }
    },
    created(){
      this.searchTableList() ;
    },
    methods: {
      searchTableList() {
        this.backOrderReceiptModel.pageNo = this.page ;
        this.backOrderReceiptModel.pageSize = this.pageSize ;

        let tempDtmStart = '' ;
        let tempDtmEnd = '' ;
        if(this.rangeTime[0] && this.rangeTime[1]){
           tempDtmStart = _dateFormat(new Date(this.rangeTime[0]),"yyyy-MM-dd") ;
           tempDtmEnd = _dateFormat(new Date(this.rangeTime[1]),"yyyy-MM-dd") ;
        }
        this.backOrderReceiptModel.startTime = tempDtmStart ;
        this.backOrderReceiptModel.endTime = tempDtmEnd ;
        //console.log(JSON.stringify(this.backOrderReceiptModel))
        _queryReceiptPageList(this.backOrderReceiptModel).then(data => {
          const { success, result, msg } = data
          if (success) {
            //console.log(JSON.stringify(result.list))
            this.backOrderReceiptData = result.list ;
            this.total = result.total
          }
        })
      },
      onSubmit(){
        this.searchTableList() ;
      },
      popoverClickEvent(row){
        let params = {'backOrderId':row.backOrderId}
        _getBackOrderItemList(params).then(data => {
          const { success, result, msg } = data
          if (success) {
            this.goodListData = result.mallBackOrderList ;
            console.log(JSON.stringify(this.goodListData))
          }
        })
      } ,
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
