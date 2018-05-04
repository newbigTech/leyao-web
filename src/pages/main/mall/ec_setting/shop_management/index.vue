<template>
  <div class="_shop-management">
    <!-- 面包屑 -->
    <div class="_breadcrumb">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/mall' }">商城</el-breadcrumb-item>
        <el-breadcrumb-item>店铺管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    
    <!-- 动态组件 -->
    <component :is="curComponent" :e="e"></component>
  </div>
</template>

<script>
  // 店铺列表
  import shopList from "./components/shop-list"
  // 添加/编辑 店铺
  import shopForm from "./components/shop-form"
  // 店铺商品列表
  import goodsList from "./components/goods-list"
  //评论
  import OrderVoucher from './components/order-voucher'
  //关注
  import UserEnshrine from './components/user-enshrine'

  export default {
    name: 'shopManagement',
    components: { shopList, shopForm, goodsList,OrderVoucher,UserEnshrine, },
    data() {
      return {
        curComponent: 'shopList',
        e: new this.$root.constructor(),
      }
    },

    created() {
      this.e.$on('forward', (component, model) => {
        this.curComponent = component || 'shopList'
        //console.log("forward: ", model)
        this.e.model = model || {}
      })
    }
  }
</script>
