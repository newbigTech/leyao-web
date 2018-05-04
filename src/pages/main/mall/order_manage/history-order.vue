<template>
  <div>
    <div style="padding: 0 10px;">
      <div>
        <div class="_setting-bar">
          <div class="_query-form">
            <div class="_query-form-item bottom-pad">
              <el-form :inline="true" :model="searchParam" class="demo-form-inline">
                <el-form-item style="width: 350px;">
                  <el-row type="flex" justify="space-between">
                    <el-col :span="12">
                      <el-date-picker type="date" placeholder="订单开始日期" v-model="searchParam.createDtmStart" style="width: 168px;"></el-date-picker>
                    </el-col>
                    <el-col :span="0" style="text-align: center; width: 15px;"> ~ </el-col>
                    <el-col :span="12">
                      <el-date-picker type="date" placeholder="订单结束日期" v-model="searchParam.createDtmEnd" style="width: 168px;"></el-date-picker>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item>
                  <el-select v-model="searchParam.orderCodes" placeholder="交易状态" clearable>
                    <el-option label="所有" value="6,99"></el-option>
                    <el-option label="交易关闭" value="99"></el-option>
                    <el-option label="交易完成" value="6"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-input v-model="searchParam.goodsName" placeholder="商品名称"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-input v-model="searchParam.userMobile" placeholder="手机号"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-select v-model="searchParam.payStatus" placeholder="支付状态" clearable>
                    <el-option label="全部" value=""></el-option>
                    <el-option label="未支付" value="0"></el-option>
                    <el-option label="已支付" value="1"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-input v-model="searchParam.orderNo" placeholder="订单编号"></el-input>
                </el-form-item>
              </el-form>
            </div>
            <div class="_query-form-btn">
              <el-button @click.native.prevent="handleFind">查询</el-button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="table-title">
          <span style="width: 32%;">商　品　信　息</span><span>实　付　金　额(元)</span><span>手　机　号</span><span>备　注</span><span>交　易　状　态</span>
        </div>
        <table class="table table-bordered center" style="margin-bottom:0;">
          <tbody v-for="(row, i) in orderRows" style="margin-bottom: 10px;">
          <tr style="background: #F9FAFC;">
            <!--<span>订单编号：{{row.orderNo}}</span><span style="padding-left: 30%;">订单日期：{{row.createdDtm}}</span>-->
            <td colspan="6"><span>订单编号：{{row.orderNo}}</span><span style="padding-left: 5%;">订单日期：{{row.createdDtm}}</span></td>
            <!--<td style="width: 16.66%;border-top:none;">订单日期：{{row.createdDtm}}</td>-->
          </tr>
          <tr  v-for="(items, index) in row.row">
            <td class="order-info2" colspan="2">
              <div class="info-position">
                <img :src="cloudShowUrl+items.GoodsPic" alt="">
                <div>
                  <strong>{{items.GoodsName}}</strong><br>
                  <span>{{items.GoodsSkuName}}</span><br>
                  <span>数量:{{items.Number}}</span><br>
                </div>
              </div>
            </td>
            <td :rowspan="row.row.length" :class="{hiddenPart:index!=0}" colspan="4" style="width: 68%">
                      <span style="padding-left: 10%">{{row.totalPrice}}
                        <p v-if="row.isBack==1">(退)</p>
                      </span>
              <span style="padding-left: 19.5%">{{row.userMobile}}</span>
                          <span style="padding-left: 18%;">
                            <span>{{row.comments}}</span>
                            <!--<span>客户备注</span>
                            <span>商家备忘</span>-->
                          </span>
                      <span style="padding-left: 20%">
                        <span v-if="row.orderCode==1">
                         待确认        
                        </span>
                        <span v-if="row.orderCode==2">
                         已确认         
                       </span>
                        <span v-if="row.orderCode==3">
                         未支付
                       </span>
                        <span v-if="row.orderCode==4">
                        已支付
                        </span>
                        <span v-if="row.orderCode==5">
                         已发货
                        </span>
                        <span v-if="row.orderCode==6">
                         交易成功         
                        </span>
                      </span>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      <div class="_pagination">
        <!-- 分页 -->
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
</template>
<style lang="sass">
  .bottom-pad .el-form-item {

  }
  .header-top {

  .order-p {
    text-align: left;
  }
  h3 {
    text-align: center;
    font-size: 18px;
    font-weight: bold;
  }
  }
  .hiddenPart {
    display: none;
  }
  .table-title {
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
    background:#EFF2F7;
  span {
    width: 16%;
    display: inline-block;
    text-align: center;
    padding: 8px;
    line-height: 1.42857143;
    font-weight: bold;
  }
  .order-info2 {
    width: 10%;
    height: 50px;
  }

  }
  .info-position {
    display: flex;
  img {
    width: 30%;
    height:80px;
    margin: 10px;
    border: 1px solid #cccccc;
    border-radius: 5px;
    padding: 2px;
  }
  div {
    margin-left: 45px;
    margin-top: 22px;

  }
  }
  .position-r {
    margin-left: 10%;
  }
</style>
<script>
  import historyOrder from "./history-order"
  import _ from "lodash"
  import {findShopOrderList } from 'src/vuex/actions/mallShopOrderAction.js'
  import {dateFormat} from 'lib/utils/dateFormat.js'
  export default {
    components: {
      historyOrder
    },
    data(){
      return {
        orderFind: {
        },
        searchParam:{
          pageNum:1,
          pageSize:100,
          createDtmStart:'',
          createDtmEnd:'',
          orderCodes:'6,99',
          goodsName:'',
          userMobile:'',
          payStatus:'',
          orderNo:''
        },
        page :1,
        pageSize : 10,
        totalSize: 100,
        orderRows:[],
      }
    },
    computed: {
      cloudShowUrl() {
        return this.$store.getters.cloudShowUrl
      }
    },
    vuex:{
    },
    methods:{
      handleFind(val){
        this.searchParam.pageNum=1;
        this.searchParam.pageSize=100;
        if(this.searchParam.createDtmStart){
          this.searchParam.createDtmStart=dateFormat(this.searchParam.createDtmStart,'yyyy-MM-dd HH:mm:ss');
        }
        if(this.searchParam.createDtmEnd){
          this.searchParam.createDtmEnd=dateFormat(this.searchParam.createDtmEnd,'yyyy-MM-dd HH:mm:ss');
        }
        findShopOrderList(this.searchParam).then((data)=>{
          this.orderRows=[];
        const {success,result}=data;
        if(success){
          this.totalSize=result.total;
          this.page=result.pageNum;
          this.pageSize=result.pageSize;
          let list=result.list;
          for(let i in list){
            let ord={};
            ord.orderNo=list[i].orderNo;
            ord.createdDtm= dateFormat(list[i].createdDtm,'yyyy-MM-dd HH:mm:ss');
            ord.totalPrice=list[i].totalPrice;
            ord.comments=list[i].comments;
            ord.orderCode=list[i].orderCode;
            ord.userMobile=list[i].userMobile;
            ord.isBack=list[i].isBack;
            ord.row=list[i].row;
            this.orderRows.push(ord);
          }
        }
      });
      },
      handleRemove(tab) {
        console.log(tab);
      },
      handleClick(tab, event) {
        //console.log(tab, event);
      },
      handleSizeChange(val) {
        this.pageSize = val ;
      },
      handleCurrentChange(val) {
        this.page = val ;
      }
    },
    mounted(){
    },
    created(){
      this.handleFind();
    }
  }
</script>
