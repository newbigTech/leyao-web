<template>
    <div>
      <!-- 面包屑 -->
      <div class="_breadcrumb">
          <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/mall' }">商城</el-breadcrumb-item>
            <el-breadcrumb-item>店铺营销</el-breadcrumb-item>
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item v-if="currentComponent === 'activityAdd'">新增{{obj.activityType_str}}页面</el-breadcrumb-item>
            <el-breadcrumb-item v-if="currentComponent === 'activityModify'">修改{{obj.activityType_str}}页面</el-breadcrumb-item>
            <el-breadcrumb-item v-if="currentComponent === 'activityGoodsList'">{{obj.activityType_str}}商品列表页面</el-breadcrumb-item>
            <el-breadcrumb-item v-if="currentComponent === 'activityDetail'">{{obj.activityType_str}}明细页面</el-breadcrumb-item>
            <el-breadcrumb-item v-if="currentComponent === 'generalActivityHome'">活动首页</el-breadcrumb-item>
            <el-breadcrumb-item v-if="currentComponent === 'activityList'">{{obj.activityType_str}}列表页面</el-breadcrumb-item>
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
import generalActivityHome from "./generalActivityHome"
import activityPage from "./activityPage"

export default {
    name: 'shop_special_activity_mng',
    components: { 
    	activityList, activityAdd,
      activityModify,activityGoodsList,
      activityDetail,generalActivityHome,
      activityPage,
    },
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
        	var activityType = this.obj.activityType;
        	var activityType_str = this.obj.activityType_str;
        	var activeName = this.obj.activeName;
        	if(typeof data !='undefined' && typeof data.activityType !='undefined'){
        		activityType = data.activityType;
        	}
        	if(typeof data !='undefined' && typeof data.activityType_str !='undefined'){
        		activityType_str = data.activityType_str;
        	}
        	if(typeof data !='undefined' && typeof data.activeName !='undefined'){
        		activeName = data.activeName;
        	}
          this.currentComponent = comp
          this.obj = data || {};
          this.obj.cloudShowUrl = this.cloudShowUrl;
          this.obj.isActivity = 1;
          this.obj.activityType_str = activityType_str;
          this.obj.activityType = activityType;
          this.obj.activeName = activeName;
          this.obj.shopId = parseInt(this.shopID,10);
        },
        reback(comp, data) {
        	var activityType = this.obj.activityType;
        	var activityType_str = this.obj.activityType_str;
        	var activeName = this.obj.activeName;
        	
        	if(typeof data !='undefined' && typeof data.activityType !='undefined'){
        		activityType = data.activityType;
        	}
        	if(typeof data !='undefined' && typeof data.activityType_str !='undefined'){
        		activityType_str = data.activityType_str;
        	}
          this.currentComponent = comp
          this.obj = data || {}
          this.obj.cloudShowUrl = this.cloudShowUrl;
          this.obj.isActivity = 1;
          this.obj.activityType_str = activityType_str;
          this.obj.activityType = activityType;
          this.obj.activeName = activeName;
          this.obj.shopId = parseInt(this.shopID,10);
          
        },

    },
    created() {
     	 this.currentComponent= 'generalActivityHome';
       this.obj= {}
       this.obj.cloudShowUrl = this.cloudShowUrl;
       this.obj.isActivity = 1;
       this.obj.shopId = parseInt(this.shopID,10);
    }
}
</script>
<style lang="sass">
  
</style>
