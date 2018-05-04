<template>
    <div class="shop_custom_classify">
      <!-- 面包屑 -->
      <div class="_breadcrumb">
          <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/mall' }">商城</el-breadcrumb-item>
            <el-breadcrumb-item>充值设置</el-breadcrumb-item>
            <el-breadcrumb-item>充值规则设置</el-breadcrumb-item>
            <el-breadcrumb-item v-if="currentComponent === 'rechargeGoodsAdd'">新增充值商品页面</el-breadcrumb-item>
            <el-breadcrumb-item v-if="currentComponent === 'rechargeGoodsModify'">修改充值商品页面</el-breadcrumb-item>
            <el-breadcrumb-item v-if="currentComponent === 'rechargeGoodsDetail'">充值上商品明细列表页面</el-breadcrumb-item>
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
import rechargeGoodsList from "./rechargeGoods/rechargeGoodsList"
import rechargeGoodsAdd from "./rechargeGoods/rechargeGoodsAdd"
import rechargeGoodsModify from "./rechargeGoods/rechargeGoodsModify"
import rechargeGoodsDetail from "./rechargeGoods/rechargeGoodsDetail"

export default {
    name: 'mall_basic_rechargeGoods',
    components: { rechargeGoodsList, rechargeGoodsAdd,rechargeGoodsDetail,rechargeGoodsModify },
    data() {
      return {
      	loading:false,//遮罩层
        currentComponent: '',
        obj: {}
      }
    },
    computed:{
    	...mapGetters(['supplierID','cloudShowUrl'])
    },

    methods: {
        forward(comp, data) {
          this.currentComponent = comp
          this.obj = data || {goodsParam:{},goods:{}};
          this.obj.cloudShowUrl = this.cloudShowUrl;
        },
        reback(comp, data) {
          this.currentComponent = comp
          this.obj = data || {goodsParam:{},goods:{}}
          this.obj.cloudShowUrl = this.cloudShowUrl;
        },

    },
    created() {
     	 this.currentComponent= 'rechargeGoodsList';
       this.obj= {goodsParam:{},goods:{}}
    }
}
</script>
<style lang="sass">
</style>