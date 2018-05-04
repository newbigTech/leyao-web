<template>
    <div>
      <!-- 面包屑 -->
      <div class="_breadcrumb">
          <el-breadcrumb separator=">">
            <el-breadcrumb-item>退订单管理</el-breadcrumb-item>
            <el-breadcrumb-item>退换货</el-breadcrumb-item>
          </el-breadcrumb>
      </div>
      <component :is="currentComponent" :paramObj="paramObj"  @forward="forward" @reback="reback"></component>
    </div>
</template>
<script>

import backOrderList from "./components/back-order-list"
import backOrderDetail from "./components/back-order-detail"


export default {
    name: 'back-order-list',
    components: { backOrderList,backOrderDetail },
    data() {
      return {
        currentComponent: 'backOrderList',
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
    }
}
</script>
<style lang="sass">
</style>
