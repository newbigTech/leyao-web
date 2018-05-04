<template>
  <div class="_container">
    <card-panel class="">
      <span slot="title"> 优惠券明细 </span>
      <div slot="panel-btns"> <el-button type="primary" size="small" @click="$emit('reback','shopCouponsList',obj)"> 返回 </el-button> </div>
      <div slot="panel-body">
        <div class="well">  
          <div class="_div-table">
            <div class="_div-table-row">
              <div class="_div-table-cell" style="padding-right: 20px;">优惠券名称：<el-tag type="danger">{{obj.couponsName}}</el-tag></div>
              <div class="_div-table-cell" style="padding-right: 20px;">优惠券金额/折扣：<el-tag type="danger"> {{obj.couponsType == 0 ? '现金券' : '折扣券'}}-{{getCouponsVal}} </el-tag></div>
              <div class="_div-table-cell" style="padding-right: 20px;">最低消费：<el-tag type="danger"> {{obj.couponsLimitPrice}}元 </el-tag></div>
            </div>
          </div>
        </div>
        <!-- 查询条件 -->
        <div class="_setting-bar">
          <div class="_query-form">
            <div class="_query-form-item">
              <el-form :inline="true" :model="couponsItemParam">
                <el-form-item>
                  <el-input v-model="couponsItemParam.couponsCode" placeholder="优惠券码"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-input v-model="couponsItemParam.userAlias" placeholder="领取用户"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-select v-model="couponsItemParam.statusCode" placeholder="优惠券状态" clearable>
                    <el-option label="未使用" value="0"></el-option>
                    <el-option label="已使用" value="1"></el-option>
                    <el-option label="已过期" value="2"></el-option>
                  </el-select>                  
                </el-form-item>
                <el-form-item>
                     <el-date-picker
                        v-model="rangeTime"
                        type="daterange"
                        placeholder="选择起始日期和结束日期"
                        style="width: 220px"
                        :picker-options="rangeTimeOptions">
                     </el-date-picker>                 
                </el-form-item>                                
              </el-form>
            </div>
            <div class="_query-form-btn" style="margin-left: 80px;">
              <el-button @click.native.prevent="onSubmit">查询</el-button>
            </div>
          </div>
          <!-- <div class="_actions-btn">
            <el-button type="primary">新增</el-button>
          </div> -->
        </div> 
        <!-- table data -->
        <div class="_table-container">
          <div class="_table-list">
            <el-table
              :data="mallCouponsItemDataList"
              selection-mode="multiple"
              stripe
              border
              @selectionchange="handleMultipleSelectionChange">
              <el-table-column align="center" type="index" width="70"></el-table-column>
              <el-table-column align="center" property="couponsCode" label="优惠券码" width="180"> </el-table-column>
              <el-table-column align="center" inline-template label="优惠券金额/折扣" width="150">
                <div>
                  {{obj.couponsType == 0 ? '现金券' : '折扣券'}} - {{getCouponsVal}}
                </div>
               </el-table-column>
              <el-table-column align="center" inline-template label="最低消费" width="120"> 
                <div>
                  {{obj.couponsLimitPrice}}元
                </div>
              </el-table-column>
              <el-table-column align="center" property="userAlias" label="领取用户" width="130"> </el-table-column>
              <el-table-column align="center" inline-template label="领取时间" width="180">
                <div>
                    <span v-if="row.userGetDtm == '2010-01-01 00:00:00'"></span>
                    <span v-if="row.userGetDtm != '2010-01-01 00:00:00'">{{row.userGetDtm}}</span>
                </div>         
              </el-table-column>
              <el-table-column align="center" inline-template label="起始时间" width="180">
                <div>
                    <span v-if="row.beginDay == '2010-01-01 00:00:00'"></span>
                    <span v-if="row.beginDay != '2010-01-01 00:00:00'">{{row.beginDay}}</span>
                </div>         
              </el-table-column>
              <el-table-column align="center" inline-template label="结束时间" width="180">
                <div>
                    <span v-if="row.endDay == '2010-01-01 00:00:00'"></span>
                    <span v-if="row.endDay != '2010-01-01 00:00:00'">{{row.endDay}}</span>
                </div>         
              </el-table-column>                            
              <!-- <el-table-column align="center" property="beginDay" label="领取方式"> </el-table-column> -->
              <el-table-column align="center" inline-template label="状态" width="120">
                <div>
                  <span v-if="row.statusCode == 0">未使用</span>
                  <span v-if="row.statusCode == 1">已使用</span>
                  <span v-if="row.statusCode == 2">已过期</span>
                </div>
              </el-table-column>

              <el-table-column align="center" property="orderCode" label="订单号" min-width="150"></el-table-column>
            </el-table>
            <!-- 分页 -->
            <div class="_pagination">
              <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalSize">
              </el-pagination>
            </div>
          </div>
        </div>
        
      </div>
    </card-panel>
  </div>
</template>
<script>
  import breadcrumb from "components/breadcrumb"
  import tabItems from "components/tab-items"
  import { _getMallCouponsItemPage } from 'src/vuex/actions/mallShopCouponsAction'
  import dateFormat from 'src/lib/utils/dateFormat'
  import { dateFormat as _dateFormat } from "lib/utils/dateFormat"
  
  export default {
    props: {
      obj: {
        type: Object,
        default: {}
      },
      statusFlag:0
    },
    computed: {
      init() {
        return this.obj
      },
      getCouponsVal(){
          if(this.obj.couponsType==0){ //{0: 优惠券 1：折扣券},
            return this.obj.couponsVal+'元';
          }else if(this.obj.couponsType==1){
            return this.obj.couponsVal/10+'折';
          }
      }
    },
    components: {
      breadcrumb,
      tabItems
    },
    data(){
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
        dateFormat,
        rangeTime:'',
        page :1,
        pageSize :10,
        totalSize: 0,
        mallCouponsItemDataList:[],
        couponsItemParam:{
          statusCode:""
        },
        multipleSelection:[], // 多选
      }
    },  
    methods:{
      onSubmit() {
        this.loadData();
      },
      loadData(){
          //console.log(JSON.stringify(this.statusFlag))
          let tempDtmStart = '' ;
          let tempDtmEnd = '' ;
          if(this.rangeTime[0] && this.rangeTime[1]){
             tempDtmStart = _dateFormat(new Date(this.rangeTime[0]),"yyyy-MM-dd") ;
             tempDtmEnd = _dateFormat(new Date(this.rangeTime[1]),"yyyy-MM-dd") ;
          }
          this.param = {
              couponsId:this.obj.couponsId ,
              couponsCode:this.couponsItemParam.couponsCode,
              userAlias:this.couponsItemParam.userAlias,
              statusCode:this.couponsItemParam.statusCode,
              beginDay:tempDtmStart+" 00:00:00",
              endDay:tempDtmEnd+" 23:59:59",
              pageNo:this.page,
              pageSize:this.pageSize
          }
          console.log(JSON.stringify(this.param));
          _getMallCouponsItemPage(this.param).then((data) => {
              const {success,result}=data;
              if(success){
                  this.mallCouponsItemDataList = result.rows ;
                  this.totalSize = result.total;
              }else{
                console.log(JSON.stringify(result))
              }
          })
      },
      handleMultipleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleSizeChange(val) {
        this.pageSize = val ;
        this.loadData();
      },
      handleCurrentChange(val) {
        this.page = val ;
        this.loadData();
      }      
    },
    mounted(){
      
    },
    created(){
      this.loadData();
    }
  }
</script>
