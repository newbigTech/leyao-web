<template>
    <div class="shop_custom_classify">
      <!-- 面包屑 -->
      <div class="_breadcrumb">
          <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/mall' }">商城</el-breadcrumb-item>
            <el-breadcrumb-item>基础设置</el-breadcrumb-item>
            <el-breadcrumb-item>角色管理</el-breadcrumb-item>
            <el-breadcrumb-item v-if="currentComponent === 'roleAdd'">新增角色页面</el-breadcrumb-item>
            <el-breadcrumb-item v-if="currentComponent === 'roleModify'">角色修改页面</el-breadcrumb-item>
            <el-breadcrumb-item v-if="currentComponent === 'roleDetail'">角色明细页面</el-breadcrumb-item>
            <el-breadcrumb-item v-if="currentComponent === 'rolePermission'">角色权限页面</el-breadcrumb-item>
            <el-breadcrumb-item v-if="currentComponent === 'roleUser'">角色用户页面</el-breadcrumb-item>
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
import roleList from "../basic_setting/roleMng/roleList"
import roleAdd from "../basic_setting/roleMng/roleAdd"
import roleModify from "../basic_setting/roleMng/roleModify"
import roleDetail from "../basic_setting/roleMng/roleDetail"
import rolePermission from "../basic_setting/roleMng/rolePermission"
import roleUser from "../basic_setting/roleMng/roleUser"

export default {
    name: 'shop_basic_role',
    components: { roleList, roleAdd,roleModify,roleDetail,rolePermission,roleUser },
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
          this.obj = data || {};
          this.obj.companyId = this.shopID;
          this.obj.companyType = 1;
        },
        reback(comp, data) {
          this.currentComponent = comp
          this.obj = data || {}
          this.obj.companyId = this.shopID;
          this.obj.companyType = 1;
        },

    },
    created() {
     	 this.currentComponent= 'roleList';
       this.obj= {companyId : this.shopID,companyType : 1}
    }
}
</script>
<style lang="sass">
</style>