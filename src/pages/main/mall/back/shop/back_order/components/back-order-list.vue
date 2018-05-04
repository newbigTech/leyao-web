<template>
    <div class="_container">
      <el-tabs :active-name="activeName" style="width:100%" @tab-click="onTabClick">
            <el-tab-pane label="待处理退换单" name="tab1"></el-tab-pane>
            <el-tab-pane label="历史退货单" name="tab2"></el-tab-pane>
      </el-tabs>
      <!-- 查询条件 -->
      <div class="_setting-bar">
        <div class="_query-form">
          <div class="_query-form-item">
            <el-form :inline="true" :model="backOrderModel" class="demo-form-inline">
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
                <el-input v-model="backOrderModel.backOrderNo" placeholder="退换货申请号"></el-input>
              </el-form-item>
              <el-form-item style="width: 210px;">
                <el-input v-model="backOrderModel.orderNo" placeholder="订单编号"></el-input>
              </el-form-item>
              <el-form-item>
                <el-input v-model="backOrderModel.userAlias" placeholder="客户"></el-input>
              </el-form-item>
              <el-form-item>
                <el-select v-model="backOrderModel.backOrderType" placeholder="退订单类型" clearable>
                  <el-option label="取消" value="1"></el-option>
                  <el-option label="退款" value="2"></el-option>
                  <el-option label="退货" value="3"></el-option>
                  <el-option label="换货" value="4"></el-option>
                  <el-option label="维修" value="5"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-select v-model="backOrderModel.backType" placeholder="寄回方式" clearable>
                  <el-option label="无" value="0"></el-option>
                  <el-option label="上门取件" value="1"></el-option>
                  <el-option label="用户自寄" value="2"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item v-show="isEditStatusFlag">
                <el-select v-model="backOrderModel.statusCode" placeholder="退换货状态" clearable>
                  <el-option label="申请中" value="1"></el-option>
                  <el-option label="待退款" value="2"></el-option>
                  <el-option label="待退货" value="3"></el-option>
                  <el-option label="货已退-待确认" value="4"></el-option>
                  <!-- <el-option label="失败" value="5"></el-option> -->
                </el-select>
              </el-form-item>
              <el-form-item v-show="!isEditStatusFlag">
                <el-select v-model="backOrderModel.statusCode" placeholder="退换货状态" clearable>
                  <el-option label="已完成" value="6"></el-option>
                  <el-option label="失败" value="5"></el-option>
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
            <el-table :data="backOrderData" style="width: 100%" border>
                <el-table-column align="center" type="index" min-width="50"></el-table-column>
                <el-table-column align="center" min-width="100" property="userAlias" label="客户"></el-table-column>
                <el-table-column align="center" width="150" property="refundAmount" label="申请退款金额(元)"></el-table-column>
                <el-table-column align="center" width="210" property="backOrderNo" label="退换货申请号"> </el-table-column>
                <el-table-column align="center" width="175" property="createdDtm" label="退换货申请日期" :formatter="dateFormat"></el-table-column>
                <el-table-column align="center" width="240" property="orderNo" label="订单编号"></el-table-column>
                <el-table-column align="center" width="95" inline-template label="寄回方式">
                  <div>
                      <span v-if="row.backType == 0">无</span>
                      <span v-if="row.backType == 1">上门取件</span>
                      <span v-if="row.backType == 2">用户自寄</span>
                  </div>
                </el-table-column>
                <el-table-column align="center" width="95" inline-template label="退货类型">
                  <div>
                      <span v-if="row.backOrderType == 1">取消</span>
                      <span v-if="row.backOrderType == 2">退款</span>
                      <span v-if="row.backOrderType == 3">退货</span>
                      <span v-if="row.backOrderType == 4">换货</span>
                      <span v-if="row.backOrderType == 5">维修</span>
                  </div>
                </el-table-column>
                <el-table-column align="center" width="120" property="totalPrice" label="订单金额(元)"></el-table-column>

                <el-table-column align="center" min-width="100" inline-template label="状态">
                  <div>
                      <el-tag type="danger" v-if="row.statusCode == 1">申请中</el-tag>
                      <el-tag type="danger" v-if="row.statusCode == 2">待退款</el-tag>
                      <el-tag type="danger" v-if="row.statusCode == 3">待退货</el-tag>
                      <el-tag type="danger" v-if="row.statusCode == 4">货已退-待确认</el-tag>
                      <el-tag type="danger" v-if="row.statusCode == 5">失败</el-tag>
                      <el-tag type="danger" v-if="row.statusCode == 6">完成</el-tag>
                  </div>
                </el-table-column>
                <el-table-column align="center" width="100" inline-template label="订单处理">
                  <div>
                      <el-button type="warning" size="mini" class="el-button--mini"
                        @click.native.prevent="$emit('forward', 'backOrderDetail', {row, backOrderModel})">
                            {{(row.statusCode == 5 || row.statusCode == 6)?'详情':'编辑'}}
                        </el-button>
                  </div>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <div class="_pagination">
                <el-pagination
                    :total="total"
                    :page-size="pageSize"
                    :page-sizes="[10, 20, 30, 40]"
                    :current-page="page"
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
  import { _getBackOrderPage } from 'src/vuex/actions/backAction'
  import MD5 from 'crypto-js/md5'

  export default {
    name:'back_order_list',
    props: {
      paramObj: Object, default: () => {},
    },
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
        pageSize: 20,
        total: 0,
        backOrderModel: {
          statusCode:'',
          backType:'',
          backOrderType:'',
          flag:0

        },
        rangeTime:[],
        backOrderData: [],

        backOrderObj:{}, // 新增发票为空对象，

        activeName:'tab1',
        isEditStatusFlag : true ,
      }
    },
    created(){
      console.log(JSON.stringify(this.paramObj))
      if(JSON.stringify(this.paramObj) != '{}'){
        console.log(JSON.stringify(this.paramObj))
        this.backOrderModel = this.paramObj.backOrderModel ;   
        this.page = this.backOrderModel.pageNo ;

        this.activeName = this.backOrderModel.activeName ;

        if(this.backOrderModel.startTime != ''){
          this.rangeTime[0] = new Date(this.backOrderModel.startTime) ; 
          this.rangeTime[1] = new Date(this.backOrderModel.endTime) ;   
        }
      }
      this.searchTableList() ;
    },
    methods: {
      searchTableList() {
        this.backOrderModel.pageNo = this.page ;
        this.backOrderModel.pageSize = this.pageSize ;

        let tempDtmStart = '' ;
        let tempDtmEnd = '' ;

        if(this.rangeTime && this.rangeTime[0] && this.rangeTime[1]){
           tempDtmStart = _dateFormat(new Date(this.rangeTime[0]),"yyyy-MM-dd") ;
           tempDtmEnd = _dateFormat(new Date(this.rangeTime[1]),"yyyy-MM-dd") ;
        }
        this.backOrderModel.startTime = tempDtmStart ;
        this.backOrderModel.endTime = tempDtmEnd ;
        console.log(JSON.stringify(this.backOrderModel))
        _getBackOrderPage(this.backOrderModel).then(data => {
          const { success, result, msg } = data
          //console.log(JSON.stringify(data))
          if (success) {
            this.backOrderData = result.list ;
            this.total = result.total
          }
        })
      },
      onSubmit(){
        this.searchTableList() ; 
      },
      onTabClick(tab, event) {
          this.backOrderModel.activeName=tab.name
          if(tab.name==='tab1'){
              this.page = 1
              this.backOrderModel.statusCode='';
              this.backOrderModel.flag=0;
              this.isEditStatusFlag = true ;
          }else if(tab.name==='tab2'){
              this.page= 1;
              this.isEditStatusFlag = false ;
              this.backOrderModel.flag=1;
              this.backOrderModel.statusCode=''
          }
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
