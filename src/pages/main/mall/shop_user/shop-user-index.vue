<template>
    <div class="shop_custom_classify">
      <!-- 面包屑 -->
      <div class="_breadcrumb">
          <el-breadcrumb separator=">">
            <el-breadcrumb-item>商城</el-breadcrumb-item>
            <el-breadcrumb-item>店铺关注用户</el-breadcrumb-item>
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

import shopUserList from "./shop-user-list"
import shopUserAddressList from "./shop-user-address"

export default {
    name: 'shop_user_index',
    components: { shopUserList, shopUserAddressList},
    data() {
      return {
        currentComponent: 'shopUserList',
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
        },
    },
    created() {
    }
}
</script>
<style lang="sass">
</style>
