<template>
    <div class="shop_custom_classify">
      <!-- 面包屑 -->
      <div class="_breadcrumb">
          <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/mall' }">商城</el-breadcrumb-item>
            <el-breadcrumb-item>基础设置</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item v-if="currentComponent === 'userAdd'">新增用户页面</el-breadcrumb-item>
            <el-breadcrumb-item v-if="currentComponent === 'userModify'">用户修改页面</el-breadcrumb-item>
            <el-breadcrumb-item v-if="currentComponent === 'userDetail'">用户明细页面</el-breadcrumb-item>
            <el-breadcrumb-item v-if="currentComponent === 'userPermission'">用户权限页面</el-breadcrumb-item>
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
import userList from "./userMng/userList"
import userAdd from "./userMng/userAdd"
import userModify from "./userMng/userModify"
import userDetail from "./userMng/userDetail"
import userPermission from "./userMng/userPermission"

export default {
    name: 'mall_basic_user',
    components: { userList, userAdd,userModify,userDetail,userPermission },
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
          this.obj = data || {}
          this.obj.companyId = this.supplierID;
          this.obj.companyType = 0;
          this.obj.cloudShowUrl = this.cloudShowUrl;
        },
        reback(comp, data) {
          this.currentComponent = comp
          this.obj = data || {}
          this.obj.companyId = this.supplierID;
          this.obj.companyType = 0;
          this.obj.cloudShowUrl = this.cloudShowUrl;
        },

    },
    created() {
     	 this.currentComponent= 'userList';
       this.obj= {
         companyId : this.supplierID
       	,companyType : 0
       	,cloudShowUrl : this.cloudShowUrl
       };
    }
}
</script>
<style lang="sass">
</style>