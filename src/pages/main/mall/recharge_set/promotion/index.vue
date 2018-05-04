<template>
    <div>
      <!-- 面包屑 -->
      <div class="_breadcrumb">
          <el-breadcrumb separator=">">
            <el-breadcrumb-item>充值统计</el-breadcrumb-item>
            <el-breadcrumb-item v-if="currentComponent === 'promotionList'">充值统计列表</el-breadcrumb-item>
          </el-breadcrumb>
      </div>
      <component :is="currentComponent" :paramObj="paramObj"  @forward="forward" @reback="reback"></component>
    </div>
</template>
<script>

import promotionList from "./components/promotioner-list"


export default {
    name: 'promotioner-list',
    components: { promotionList },
    data() {
      return {
        currentComponent: 'promotionList',
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
      //this.$store.dispatch('updateSupplierShopPageList')
    } 
}
</script>
<style lang="sass">
</style>
