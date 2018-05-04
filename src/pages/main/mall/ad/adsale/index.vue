<template>
    <div>
      <!-- 面包屑 -->
      <div class="_breadcrumb">
          <el-breadcrumb separator=">">
            <el-breadcrumb-item>营销广告管理</el-breadcrumb-item>
            <el-breadcrumb-item v-if="currentComponent === 'adSaleAdd'">编辑</el-breadcrumb-item>
            <el-breadcrumb-item v-if="currentComponent === 'adSaleList'">营销广告列表</el-breadcrumb-item>
          </el-breadcrumb>
      </div>
      <component :is="currentComponent" :paramObj="paramObj"  @forward="forward" @reback="reback"></component>
    </div>
</template>
<script>

import adSaleAdd from "./components/ad-sale-add"
import adSaleList from "./components/ad-sale-list"


export default {
    name: 'ad-sale-list',
    components: { adSaleAdd,adSaleList },
    data() {
      return {
        currentComponent: 'adSaleList',
        paramObj: {},
      }
    },

    methods: {
        forward(comp, data) { 
          this.currentComponent = comp
          this.paramObj = data || {}
        },
        reback(comp, data) {
          this.currentComponent = comp
          this.paramObj = data || {}
        },
    },
    created() {
      this.$store.dispatch('updateSupplierShopPageList')
    } 
}
</script>
<style lang="sass">
</style>
