<template>
    <div>
      <!-- 面包屑 -->
      <div class="_breadcrumb">
          <el-breadcrumb separator=">">
            <el-breadcrumb-item>资产管理</el-breadcrumb-item>
            <el-breadcrumb-item>发票管理</el-breadcrumb-item>
          </el-breadcrumb>
      </div>
      <component :is="currentComponent" :str="str" :model="model" @forward="forward" @reback="reback"></component>
    </div>
</template>
<script>

import invoiceList from "./components/invoice-list"
import invoiceAudit from "./components/invoice-audit"



export default {
    name: 'invoice-list',
    components: { invoiceList,invoiceAudit },
    data() {
      return {
        currentComponent: 'invoiceList',
        model: {},
        str:""
      }
    },

    methods: {
        forward(comp, data,str) {
          this.currentComponent = comp
          this.model = data || {}
          this.str = str
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
