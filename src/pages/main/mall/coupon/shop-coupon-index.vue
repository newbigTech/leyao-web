<template>
    <div class="shop_coupon_index">
      <!-- 面包屑 -->
      <div class="_breadcrumb">
          <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/mall' }">商城</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '#/mall/shop_coupons' }">优惠券列表</el-breadcrumb-item>
            <el-breadcrumb-item v-if="currentComponent === 'couponsAdd'">新增优惠券</el-breadcrumb-item>
            <el-breadcrumb-item v-if="currentComponent === 'shopCouponsItemList'">优惠券明细</el-breadcrumb-item>
          </el-breadcrumb>
      </div>
      <!-- <transition name="fade" mode="out-in" appear> -->
        <!-- <keep-alive> -->
          <component :is="currentComponent" :obj="obj" :statusFlag="statusFlag"
           @forward="forward" @reback="reback"></component>
        <!-- </keep-alive> -->
      <!-- </transition> -->
    </div>
</template>
<script>

import shopCouponsList from "./shop-coupon-list"
import shopCouponsItemList from "./shop-coupon-item-list"
import couponsAdd from "./shop-coupon-add"
import couponsGoodsDetail from "./coupons-goods-detail"
import couponsPushUser from "./coupons-push-user"

export default {
    name: 'shop_coupon_index',
    components: { 
        shopCouponsList,
        couponsAdd,
        shopCouponsItemList,
        couponsGoodsDetail,
        couponsPushUser},
    data() {
      return {
        currentComponent: 'shopCouponsList',
        obj: {},
        statusFlag:0,
      }
    },

    methods: {
        forward(comp, data, statusFlag) {
          this.currentComponent = comp
          this.obj = data || {}
          this.statusFlag = statusFlag
        },
        reback(comp, data, statusFlag) {
          this.currentComponent = comp
          this.obj = data || {}
          this.statusFlag = statusFlag
        },
    },
    created() {
    }
}
</script>
<style lang="sass">
</style>
