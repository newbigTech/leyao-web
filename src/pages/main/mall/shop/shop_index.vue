<template>
    <div class="_shop-management">
      <!-- 面包屑 -->
      <div class="_breadcrumb">
          <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/mall' }">商城</el-breadcrumb-item>
            <el-breadcrumb-item>店铺管理</el-breadcrumb-item>
          </el-breadcrumb>
      </div>
      <component :is="currentComponent" :obj="obj" :shop-update-param="shopUpdateParam" @forward="forward" @reback="reback"></component>
    </div>
</template>
<script>

import shopList from "./index"
import addShop from "./addShop"
import updateShop from "./updateShop"


export default {
    name: 'shop_shop_name_index',
    components: { shopList, addShop, updateShop,shopList},
    data() {
      return {
        currentComponent: 'shopList',
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
    created() {
    }
}
</script>
<style lang="sass">
</style>
