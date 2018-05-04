<template>
    <div class="shop_custom_classify">
      <!-- 面包屑 -->
      <div class="_breadcrumb">
          <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/mall' }">商城</el-breadcrumb-item>
            <el-breadcrumb-item>店铺商品</el-breadcrumb-item>
            <el-breadcrumb-item>分组管理</el-breadcrumb-item>
            <!-- <el-breadcrumb-item v-if="currentComponent === 'classifyAdd'">新增商品分类管理</el-breadcrumb-item> -->
          </el-breadcrumb>
      </div>
      <!-- <transition name="fade" mode="out-in" appear> -->
        <!-- <keep-alive> -->
          <component :is="currentComponent" :obj="obj" @forward="forward" @reback="reback"></component>
        <!-- </keep-alive> -->
      <!-- </transition> -->
    </div>
</template>
<script>
import { getCustomClassifyPageList, deleteCustomClassify } from 'src/vuex/actions/shopCustomClassifyAction'

import classifyList from "./classify-list"
import classifyAdd from "./classify-add"

export default {
    name: 'shop_custom_classify_index',
    components: { classifyList, classifyAdd },
    data() {
      return {
        currentComponent: 'classifyList',
        obj: {}
      }
    },

    methods: {
        forward(comp, data) {
          this.currentComponent = comp
          this.obj = data || {}
        },
        reback(comp, data) {
          this.currentComponent = comp
          this.obj = data || {}
        }
    },
    created() {
      // this.searchTableList();
    }
}
</script>
<style lang="sass">
</style>
