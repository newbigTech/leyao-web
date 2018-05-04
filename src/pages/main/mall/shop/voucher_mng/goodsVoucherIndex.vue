<template>
    <div class="shop_custom_classify">
      <!-- 面包屑 -->
      <div class="_breadcrumb">
          <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/mall' }">商城</el-breadcrumb-item>
            <el-breadcrumb-item>评论管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品评论</el-breadcrumb-item>
            <el-breadcrumb-item v-if="currentComponent === 'goodsVoucherList'">商品评论列表页面</el-breadcrumb-item>
            <el-breadcrumb-item v-if="currentComponent === 'goodsVoucherCheckPage'">审批评论页面</el-breadcrumb-item>
            <el-breadcrumb-item v-if="currentComponent === 'goodsVoucherReplyPage'">回复评论页面</el-breadcrumb-item>
            <el-breadcrumb-item v-if="currentComponent === 'goodsVoucherReplyListPage'">评论回复列表页面</el-breadcrumb-item>
          </el-breadcrumb>
      </div>
      <!-- <transition name="fade" mode="out-in" appear> -->
        <!-- <keep-alive> -->
          <component :is="currentComponent" :obj="obj" @forward="forward" @reback="reback"></component>
        <!-- </keep-alive> -->
      <!-- </transition> -->
    <!--遮罩层-->
    <div v-loading="loading" class="el-loading-demo"></div>
    </div>
</template>
<script>

import { mapGetters } from 'vuex'
import goodsVoucherList from "./goodsVoucherList"
import goodsVoucherCheckPage from "./goodsVoucherCheckPage"
import goodsVoucherReplyPage from "./goodsVoucherReplyPage"
import goodsVoucherReplyListPage from "./goodsVoucherReplyListPage"

export default {
    name: 'mall_basic_rechargeCard',
    components: { 
    	goodsVoucherList,
   	  goodsVoucherCheckPage, 
   	  goodsVoucherReplyPage,
   	  goodsVoucherReplyListPage,
    },
    data() {
      return {
      	loading:false,//遮罩层
        currentComponent: '',
        obj: {}
      }
    },
    computed:{
    	...mapGetters(['shopID'])
    },

    methods: {
        forward(comp, data) {
          this.currentComponent = comp
          this.obj = data || {voucherParam:{},voucher:{}};
          this.obj.shopId = this.shopID;
        },
        reback(comp, data) {
          this.currentComponent = comp
          this.obj = data || {voucherParam:{},voucher:{}}
          this.obj.shopId = this.shopID;
        },

    },
    created() {
     	 this.currentComponent= 'goodsVoucherList';
       this.obj= {voucherParam:{},voucher:{}}
       this.obj.shopId = this.shopID;
    }
}
</script>
<style lang="sass">
  
</style>
