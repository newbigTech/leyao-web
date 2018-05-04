<template>
    <div class="shop_custom_classify">
      <!-- 面包屑 -->
      <div class="_breadcrumb">
          <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/mall' }">商城</el-breadcrumb-item>
            <el-breadcrumb-item>充值设置</el-breadcrumb-item>
            <el-breadcrumb-item>充值卡设置</el-breadcrumb-item>
            <el-breadcrumb-item v-if="currentComponent === 'rechargeCardAdd'">新增充值卡页面</el-breadcrumb-item>
            <el-breadcrumb-item v-if="currentComponent === 'rechargeCardItemList'">充值卡明细列表页面</el-breadcrumb-item>
          </el-breadcrumb>
      </div>
      <!-- <transition name="fade" mode="out-in" appear> -->
        <!-- <keep-alive> -->
          <component :is="currentComponent" :obj="obj" @forward="forward" @reback="reback"></component>
        <!-- </keep-alive> -->
      <!-- </transition> -->
    <!--遮罩层-->
    <div v-loading="loading" class="el-loading-demo"></div>
    </div>
</template>
<script>

import { mapGetters } from 'vuex'
import rechargeCardList from "./rechargeCard/rechargeCardList"
import rechargeCardAdd from "./rechargeCard/rechargeCardAdd"
import rechargeCardItemList from "./rechargeCard/rechargeCardItemList"

export default {
    name: 'mall_basic_rechargeCard',
    components: { rechargeCardList, rechargeCardAdd,rechargeCardItemList },
    data() {
      return {
      	loading:false,//遮罩层
        currentComponent: '',
        obj: {}
      }
    },
    computed:{
    	...mapGetters(['supplierID'])
    },

    methods: {
        forward(comp, data) {
          this.currentComponent = comp
          this.obj = data || {cardParam:{},card:{}};
        },
        reback(comp, data) {
          this.currentComponent = comp
          this.obj = data || {cardParam:{},cardItem:{}}
        },

    },
    created() {
     	 this.currentComponent= 'rechargeCardList';
       this.obj= {cardParam:{},cardItem:{}}
    }
}
</script>
<style lang="sass">
  
</style>
