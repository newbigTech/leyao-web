<template>
    <div class="shop_custom_classify">
      <!-- 面包屑 -->
      <div class="_breadcrumb">
          <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/mall' }">商城</el-breadcrumb-item>
            <el-breadcrumb-item>消息中心</el-breadcrumb-item>
            <el-breadcrumb-item>店铺消息</el-breadcrumb-item>
            <el-breadcrumb-item v-if="currentComponent === 'messageList'">消息列表页面</el-breadcrumb-item>
            <el-breadcrumb-item v-if="currentComponent === 'messageDetail'">消息详情页面</el-breadcrumb-item>
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
import messageList from "./messageList"
import messageDetail from "./messageDetail"

export default {
    name: 'mall_shop_message_center',
    components: { 
   	  messageList, 
   	  messageDetail,
    },
    data() {
      return {
      	loading:false,//遮罩层
        currentComponent: '',
        obj: {}
      }
    },
    computed:{
    	...mapGetters(['shopID'])
    },

    methods: {
        forward(comp, data) {
          this.currentComponent = comp
          this.obj = data || {messageParam:{},message:{}};
          this.obj.shopId = this.shopID;
        },
        reback(comp, data) {
          this.currentComponent = comp
          this.obj = data || {messageParam:{},message:{}}
          this.obj.shopId = this.shopID;
        },

    },
    created() {
     	 this.currentComponent= 'messageList';
       this.obj= {messageParam:{},message:{}}
       this.obj.shopId = this.shopID;
    }
}
</script>
<style lang="sass">
  
</style>
