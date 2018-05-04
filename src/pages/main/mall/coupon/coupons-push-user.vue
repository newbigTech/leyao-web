<template>
  <div class="_container">
    <card-panel class="">
      <span slot="title">优惠券推送</span>
      <div slot="panel-btns"> <el-button size="small" type="primary" @click="$emit('reback','shopCouponsList',obj)"> 返回 </el-button> </div>
      <div slot="panel-body">

        <div class="well">  
          <div class="_div-table">
            <div class="_div-table-row">
              <div class="_div-table-cell" style="padding-right: 20px;">可用优惠券：<el-tag type="danger">{{obj.couponsNumber-obj.getNumber}}张</el-tag></div>
              <div class="_div-table-cell" style="padding-right: 20px;">优惠券名称：<el-tag type="danger"> {{obj.couponsName}} </el-tag></div>
              <div class="_div-table-cell" style="padding-right: 20px;">优惠券金额/折扣：<el-tag type="danger"> {{obj.couponsType == 0 ? '现金券' : '折扣券'}}-{{getCouponsVal}} </el-tag></div>
              <div class="_div-table-cell" style="padding-right: 20px;">最低消费：<el-tag type="danger"> {{obj.couponsLimitPrice}}元 </el-tag></div>
            </div>
          </div>
        </div>

       <el-tabs type="border-card" @tab-click="changeTab" style="width:100%;">
        <el-tab-pane label="店铺用户">
          <couponsPushShopUser :model="obj"></couponsPushShopUser>
        </el-tab-pane>
        <el-tab-pane label="店铺收藏">
          <couponsPushShopConcern :model="obj"></couponsPushShopConcern>
        </el-tab-pane>
        <el-tab-pane label="商品关注">
          <couponsPushGoodsConcern :model="obj"></couponsPushGoodsConcern>
        </el-tab-pane>                           
       </el-tabs>
      </div>
    </card-panel>
  </div>  
</template>

<style lang="sass">
  input[type=file]{
    display: none;
  }
  .shop-classify {
    font-size: 15px;
    color: #8492A6;
    margin-bottom: 10px;
    background-color: #EFF2F7;
    border: 1px solid #EFF2F7;  
    padding: 10px 5px;
    border-radius: 1px;
  }
</style>
<script>

  import couponsPushShopUser from "./coupons-push-shop-user"
  import couponsPushShopConcern from "./coupons-push-shop-concern"
  import couponsPushGoodsConcern from "./coupons-push-goods-concern"
  import breadcrumb from "components/breadcrumb"
  import tabItems from "components/tab-items"
  import {dateFormat as dateFormat_ } from "lib/utils/dateFormat"

  
  import RegExp from 'lib/utils/regexp'
 
  export default {
    props: {
      obj: {
        type: Object,
        default: {}
      }
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
      tabItems,
      couponsPushShopUser,
      couponsPushShopConcern,
      couponsPushGoodsConcern
    },
    data(){
      return {
        // 已选择商品
        cpage :1,
        cpageSize :5,
        ctotalSize: 0,
        cmallGoodsList:[],
        errorMsg:'',

      };
    },
    methods:{
        loadData(){  
            this.headerTitle='优惠券推送' 
          
        }, 
        changeTab(tab){
          //console.log(tab)
        },
        chooseUser(){

        },
        handleMultipleSelectionChange(val) {          
          this.multipleSelection = val;         
        },
        handleReset() {
          this.$refs.ruleForm.resetFields();
        },      
        handleSizeChange(val) {
          this.pageSize = val ;
        },
        handleCurrentChange(val) {
          this.page = val ;
        },         
    },

    created(){
      this.loadData() ;      
    }
  }
</script>
