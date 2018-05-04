<template>
    <div class="shop_custom_classify">
      <!-- 面包屑 -->
      <div class="_breadcrumb">
          <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/mall' }">商城</el-breadcrumb-item>
            <el-breadcrumb-item>充值设置</el-breadcrumb-item>
            <el-breadcrumb-item>网销卡设置</el-breadcrumb-item>
            <el-breadcrumb-item v-if="currentComponent === 'rechargeSaleCardAdd'">新增网销卡页面</el-breadcrumb-item>
            <el-breadcrumb-item v-if="currentComponent === 'rechargeSaleCardModify'">修改网销卡页面</el-breadcrumb-item>
            <el-breadcrumb-item v-if="currentComponent === 'rechargeSaleCardDetail'">网销卡详情页面</el-breadcrumb-item>
            <el-breadcrumb-item v-if="currentComponent === 'rechargeSaleCardItemList'">网销卡明细列表页面</el-breadcrumb-item>
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
import rechargeSaleCardList from "./rechargeSaleCard/rechargeSaleCardList"
import rechargeSaleCardAdd from "./rechargeSaleCard/rechargeSaleCardAdd"
import rechargeSaleCardDetail from "./rechargeSaleCard/rechargeSaleCardDetail"
import rechargeSaleCardModify from "./rechargeSaleCard/rechargeSaleCardModify"
import rechargeSaleCardItemList from "./rechargeSaleCard/rechargeSaleCardItemList"

export default {
    name: 'mall_basic_rechargeSaleCard',
    components: { rechargeSaleCardList, rechargeSaleCardAdd,rechargeSaleCardDetail,rechargeSaleCardModify,rechargeSaleCardItemList },
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
          this.obj = data || {cardParam:{},card:{}};
          this.obj.cloudShowUrl = this.cloudShowUrl;
        },
        reback(comp, data) {
          this.currentComponent = comp
          this.obj = data || {cardParam:{},cardItem:{}}
          this.obj.cloudShowUrl = this.cloudShowUrl;
        },

    },
    created() {
     	 this.currentComponent= 'rechargeSaleCardList';
       this.obj= {cardParam:{},cardItem:{}}
       this.obj.cloudShowUrl = this.cloudShowUrl;
    }
}
</script>
<style lang="sass">
  
</style>
