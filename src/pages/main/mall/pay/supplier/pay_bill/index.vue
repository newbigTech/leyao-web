<template>
    <div>
      <!-- 面包屑 -->
      <div class="_breadcrumb">
          <el-breadcrumb separator=">">
            <el-breadcrumb-item>资产管理</el-breadcrumb-item>
            <el-breadcrumb-item>对账单管理</el-breadcrumb-item>
          </el-breadcrumb>
      </div>
      <component :is="currentComponent" :model="model" @forward="forward" @reback="reback"></component>
    </div>
</template>
<script>

import payBillList from "./components/pay-bill-list"


export default {
    name: 'pay-bill-list',
    components: { payBillList },
    data() {
      return {
        currentComponent: 'payBillList',
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
