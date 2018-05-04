<template>
  <div class="shop_custom_classify">
    <!-- 面包屑 -->
    <div class="_breadcrumb">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/mall' }">商城</el-breadcrumb-item>
        <el-breadcrumb-item>店铺商品</el-breadcrumb-item>
        <el-breadcrumb-item>配送设施</el-breadcrumb-item>
        <el-breadcrumb-item v-if="currentComponent === 'classifyAdd'">新增商品分类管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!-- <transition name="fade" mode="out-in" appear> -->
    <!-- <keep-alive> -->
    <component :is="currentComponent" :obj="obj" :shop-update-param="shopUpdateParam" @forward="forward" @reback="reback"></component>
    <!-- </keep-alive> -->
    <!-- </transition> -->
  </div>
</template>
<script>
  
  import addressList from "./address_index"
  import priceSet from "./price_set"
  
  export default {
    name: 'address_index',
    components: { addressList,priceSet},
    data() {
      return {
        currentComponent: 'addressList',
        obj: {},
        shopUpdateParam:{}
      }
    },
    
    methods: {
      forward(comp, data) {
        this.currentComponent = comp
        this.obj = data || {}
        this.shopUpdateParam = data || {}
      },
      reback(comp, data) {
        this.currentComponent = comp
        this.obj = data || {}
        this.shopUpdateParam = data || {}
      },
      
    },
  }
</script>
<style lang="sass">
</style>
