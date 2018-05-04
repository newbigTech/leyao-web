<template>
    <div>
      <!-- 面包屑 -->
      <div class="_breadcrumb">
          <el-breadcrumb separator=">">
            <el-breadcrumb-item>退订单管理</el-breadcrumb-item>
            <el-breadcrumb-item>收货单列表</el-breadcrumb-item>
          </el-breadcrumb>
      </div>
      <component :is="currentComponent" :model="model" @forward="forward" @reback="reback"></component>
    </div>
</template>
<script>

import backOrderReceiptList from "./components/back-order-receipt-list"
import backReceiptItem from "./components/back-receipt-item"


export default {
    name: 'back-order-receipt-list',
    components: { backOrderReceiptList,backReceiptItem },
    data() {
      return {
        currentComponent: 'backOrderReceiptList',
        model: {}
      }
    },

    methods: {
        forward(comp, data) {
          this.currentComponent = comp
          this.model = data || {}
        },
        reback(comp, data) {
          this.currentComponent = comp
          this.model = data || {}
        },
    },
    created() {
    }
}
</script>
<style lang="sass">
</style>
