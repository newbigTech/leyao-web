<template>
    <div>
      <!-- 面包屑 -->
      <div class="_breadcrumb">
          <el-breadcrumb separator=">">
            <el-breadcrumb-item>退订单管理</el-breadcrumb-item>
            <el-breadcrumb-item>退件地址</el-breadcrumb-item>
          </el-breadcrumb>
      </div>
      <component :is="currentComponent" :model="model" @forward="forward" @reback="reback"></component>
    </div>
</template>
<script>

import backAddressList from "./components/back-address-list"
import addBackAddress from "./components/add-back-address"


export default {
    name: 'back-Address-list',
    components: { backAddressList,addBackAddress },
    data() {
      return {
        currentComponent: 'backAddressList',
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
