<template>
    <div>
      <!-- 面包屑 -->
      <div class="_breadcrumb">
          <el-breadcrumb separator=">">
            <el-breadcrumb-item>资产管理</el-breadcrumb-item>
            <el-breadcrumb-item>交易记录</el-breadcrumb-item>
          </el-breadcrumb>
      </div>
      <component :is="currentComponent" :model="model" @forward="forward" @reback="reback"></component>
    </div>
</template>
<script>

import transactionList from "./components/transaction-list"
import transactionListDetail from "./components/transaction-list-detail"


export default {
    name: 'transaction-list',
    components: { transactionList,transactionListDetail},
    data() {
      return {
        currentComponent: 'transactionList',
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
