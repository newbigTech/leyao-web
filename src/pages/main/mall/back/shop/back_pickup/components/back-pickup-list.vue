<template>
    <div class="_container">
      <!-- 查询条件 -->
      <div class="_setting-bar">
        <div class="_query-form">
          <div class="_query-form-item">
            <el-form :inline="true" :model="backPickupModel" class="demo-form-inline">
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
                <el-input v-model="backPickupModel.backOrderNo" placeholder="退换货申请号"></el-input>
              </el-form-item>
              <el-form-item style="width: 210px;">
                <el-input v-model="backPickupModel.orderNo" placeholder="订单编号"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input v-model="backPickupModel.userAlias" placeholder="客户"></el-input>
              </el-form-item>
              <el-form-item>
                <el-select v-model="backPickupModel.pickupType" placeholder="退订单类型" clearable>
                  <el-option label="退货取货" value="0"></el-option>
                  <el-option label="换货取货" value="1"></el-option>
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
            <el-table :data="backOrderPickupData" style="width: 100%" border>
                <el-table-column width="80" align="center" type="index"></el-table-column>
                <el-table-column width="230" align="center" property="backOrderNo" label="退换货申请号"> </el-table-column>
                <el-table-column width="230" align="center" property="orderNo" label="订单编号"> </el-table-column>
                <el-table-column width="100" align="center" inline-template label="退货类型">
                  <div>
                      <span v-if="row.pickupType == 0">退货取货</span>
                      <span v-if="row.pickupType == 1">换货取货</span>
                  </div>
                </el-table-column>
                <el-table-column width="180" align="center" inline-template label="退货商品/数量">
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
                    <el-button size="small" v-popover:goodsDetailPopover @click.native.prevent="popoverClickEvent(row)">查看</el-button>
                  </div>
                </el-table-column>
                <el-table-column min-width="100" align="center" property="userAlias" label="客户"></el-table-column>
                <el-table-column width="175" align="center" property="createdDtm" label="创建日期" :formatter="dateFormat"></el-table-column>
                <el-table-column width="175" align="center" property="createdDtm" label="打印时间" :formatter="dateFormat"></el-table-column>
                <el-table-column width="175" align="center" inline-template label="订单处理">
                  <div>
                      <el-button type="warning" size="mini" @click.native.prevent="handlePickupDetail(row,'operate')">操作</el-button>
                      <el-button type="primary" size="mini" @click.native.prevent="handlePickupDetail(row,'detail')">打印</el-button>
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
      <!--收件单Dialog-->
      <back-pickup-detail ref="pickupDetaiCom" :pickupObj="pickupObj" @onSuccess="onSelectedSome">
      </back-pickup-detail>
    </div>
</template>
<script>

  import { dateFormat as _dateFormat } from "lib/utils/dateFormat"
  import { _queryPickupPageList,_getBackOrderItemList } from 'src/vuex/actions/backAction'
  import BackPickupDetail from './back-pickup-detail'
  import MD5 from 'crypto-js/md5'

  export default {
    name:'back_pickup_list',
    components: {
      BackPickupDetail
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
        backPickupModel: {
          pickupType:'',
        },
        rangeTime:'',
        backOrderPickupData: [],

        goodListData:[], //商品明细
        pickupDetailDialog : true ,
        pickupObj:{}
      }
    },
    created(){
      this.searchTableList() ;
    },
    methods: {
      searchTableList() {
        this.backPickupModel.pageNo = this.page ;
        this.backPickupModel.pageSize = this.pageSize ;

        let tempDtmStart = '' ;
        let tempDtmEnd = '' ;
        if(this.rangeTime[0] && this.rangeTime[1]){
           tempDtmStart = _dateFormat(new Date(this.rangeTime[0]),"yyyy-MM-dd") ;
           tempDtmEnd = _dateFormat(new Date(this.rangeTime[1]),"yyyy-MM-dd") ;
        }
        this.backPickupModel.startTime = tempDtmStart ;
        this.backPickupModel.endTime = tempDtmEnd ;
        //console.log(JSON.stringify(this.backPickupModel))
        _queryPickupPageList(this.backPickupModel).then(data => {
          const { success, result, msg } = data
          if (success) {
            //console.log(JSON.stringify(result.list))
            this.backOrderPickupData = result.list ;
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

      handlePickupDetail(row,flag){
        this.pickupObj = row ;
        this.pickupObj.flag = flag ;
        this.$refs.pickupDetaiCom.pickupDetailDialog=true
      },
      onSelectedSome(c){
            // this.goodsObj.classifyId=c.classifyId
            // this.goodsObj.classifyName=c.classifyName
      },
    }
  }
</script>
