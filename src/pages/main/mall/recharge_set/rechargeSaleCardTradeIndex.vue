<template>
    <div class="shop_custom_classify">
      <!-- 面包屑 -->
      <div class="_breadcrumb">
          <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/mall' }">商城</el-breadcrumb-item>
            <el-breadcrumb-item>网销设置</el-breadcrumb-item>
            <el-breadcrumb-item>网销订单管理</el-breadcrumb-item>
            <el-breadcrumb-item v-if="currentComponent === 'orderList'">网销订单列表页面</el-breadcrumb-item>
            <el-breadcrumb-item v-if="currentComponent === 'orderDetail'">订单明细页面</el-breadcrumb-item>
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
import orderList from "./rechargeSaleOrder/orderList"
import orderDetail from "./rechargeSaleOrder/orderDetail"

export default {
    name: 'mall_basic_rechargeSaleOrder',
    components: { orderList,orderDetail },
    data() {
      return {
      	loading:false,//遮罩层
        currentComponent: '',
        obj: {shopParam:{},orderParam:{},shop:{},order:{}}
      }
    },
    computed:{
    	...mapGetters(['supplierID'])
    },

    methods: {
        forward(comp, data) {
          this.currentComponent = comp
          this.obj = data || {orderParam:{},shop:{},order:{}};//shopParam:店铺列表的查询参数 shop:店铺对象
        },
        reback(comp, data) {
          this.currentComponent = comp
          this.obj = data || {orderParam:{},shop:{},order:{}};
        },

    },
    created() {
     	 this.currentComponent= 'orderList';
    }
}
</script>
<style lang="sass">
</style>