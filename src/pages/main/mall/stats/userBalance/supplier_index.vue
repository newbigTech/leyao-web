<template>
    <div class="shop_custom_classify">
      <!-- 面包屑 -->
      <div class="_breadcrumb">
          <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/mall' }">商城</el-breadcrumb-item>
            <el-breadcrumb-item>数据分析</el-breadcrumb-item>
            <el-breadcrumb-item>用户余额</el-breadcrumb-item>
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
import list from "./list"

export default {
    name: 'mall_sale_data',
    components: { list },
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
          this.obj = data || {param:{},supplierId:this.supplierID};
        },
        reback(comp, data) {
          this.currentComponent = comp
          this.obj = data || {param:{},supplierId:this.supplierID}
        },

    },
    created() {
     	 this.currentComponent= 'list';
       this.obj= {param:{},supplierId:this.supplierID}
    }
}
</script>
<style lang="sass">
  
</style>
