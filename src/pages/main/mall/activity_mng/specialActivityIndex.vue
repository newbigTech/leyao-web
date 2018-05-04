<template>
    <div>
      <!-- 面包屑 -->
      <div class="_breadcrumb">
          <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/mall' }">商城</el-breadcrumb-item>
            <el-breadcrumb-item>店铺营销</el-breadcrumb-item>
            <el-breadcrumb-item>专题管理</el-breadcrumb-item>
            <el-breadcrumb-item v-if="currentComponent === 'activityAdd'">新增专题页面</el-breadcrumb-item>
            <el-breadcrumb-item v-if="currentComponent === 'activityModify'">修改专题页面</el-breadcrumb-item>
            <el-breadcrumb-item v-if="currentComponent === 'activityGoodsList'">专题商品列表页面</el-breadcrumb-item>
            <el-breadcrumb-item v-if="currentComponent === 'activityDetail'">专题明细页面</el-breadcrumb-item>
            <el-breadcrumb-item v-if="currentComponent === 'activityPage'">{{obj.activityType_str}}活动页</el-breadcrumb-item>
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
import activityList from "./activityList"
import activityAdd from "./activityAdd"
import activityModify from "./activityModify"
import activityGoodsList from "./activityGoodsList"
import activityDetail from "./activityDetail"
import activityPage from "./activityPage"

export default {
    name: 'shop_special_activity_mng',
    components: { activityList, activityAdd,activityModify,activityGoodsList,activityDetail,activityPage },
    data() {
      return {
      	loading:false,//遮罩层
        currentComponent: '',
        obj: {}
      }
    },
    computed:{
    	...mapGetters(['cloudShowUrl','shopID'])
    },

    methods: {
        forward(comp, data) {
        	var activeName = this.obj.activeName;
          this.currentComponent = comp
          this.obj = data || {};
          this.obj.cloudShowUrl = this.cloudShowUrl;
          this.obj.isActivity = 0;
          this.obj.activeName = activeName;
          this.obj.shopId = parseInt(this.shopID,10);
        },
        reback(comp, data) {
        	var activeName = this.obj.activeName;
          this.currentComponent = comp
          this.obj = data || {}
          this.obj.cloudShowUrl = this.cloudShowUrl;
          this.obj.isActivity = 0;
          this.obj.activeName = activeName;
          this.obj.shopId = parseInt(this.shopID,10);
        },

    },
    created() {
     	 this.currentComponent= 'activityList';
       this.obj= {}
       this.obj.cloudShowUrl = this.cloudShowUrl;
       this.obj.isActivity = 0;
       this.obj.shopId = parseInt(this.shopID,10);
    }
}
</script>
<style lang="sass">
  
</style>
