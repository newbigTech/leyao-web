<template>
    <div>
      <!-- 面包屑 -->
      <div class="_breadcrumb">
          <el-breadcrumb separator=">">
            <el-breadcrumb-item>资产管理</el-breadcrumb-item>
            <el-breadcrumb-item>提现记录</el-breadcrumb-item>
          </el-breadcrumb>
      </div>
      <component :is="currentComponent" :model="model" @forward="forward" @reback="reback"></component>
    </div>
</template>
<script>

import withdrawsCashList from "./components/withdraws-cash-list"


export default {
    name: 'withdraws-cash-list',
    components: { withdrawsCashList},
    data() {
      return {
        currentComponent: 'withdrawsCashList',
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
