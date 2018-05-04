<template>
    <div>
      <!-- 面包屑 -->
      <div class="_breadcrumb">
          <el-breadcrumb separator=">">
            <el-breadcrumb-item>广告弹出管理</el-breadcrumb-item>
            <el-breadcrumb-item v-if="currentComponent === 'popAdAdd'">编辑</el-breadcrumb-item>
            <el-breadcrumb-item v-if="currentComponent === 'popAdList'">广告弹出列表</el-breadcrumb-item>
          </el-breadcrumb>
      </div>
      <component :is="currentComponent" :paramObj="paramObj"  @forward="forward" @reback="reback"></component>
    </div>
</template>
<script>

import popAdAdd from "./components/pop-ad-add"
import popAdList from "./components/pop-ad-list"


export default {
    name: 'pop-ad-list',
    components: { popAdAdd,popAdList },
    data() {
      return {
        currentComponent: 'popAdList',
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
