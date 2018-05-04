<template>
    <div class="shop_custom_classify">
      <!-- 面包屑 -->
      <div class="_breadcrumb">
          <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/mall' }">商城</el-breadcrumb-item>
            <el-breadcrumb-item>数据分析</el-breadcrumb-item>
            <el-breadcrumb-item>销售数据</el-breadcrumb-item>
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
        orderTypeList:[//-1订单汇总 2 充值订单 6 网销卡订单
        	{value: -1,label: '全部订单'},
        	{value: 2,label: '充值订单'},
        	{value: 6,label: '网销卡订单'},
        ],
        obj: {}
      }
    },
    computed:{
    	...mapGetters(['supplierID'])
    },

    methods: {
        forward(comp, data) {
          this.currentComponent = comp
          this.obj = data || {param:{},supplierId:this.supplierID,shopId:0,orderTypeList:this.orderTypeList};
        },
        reback(comp, data) {
          this.currentComponent = comp
          this.obj = data || {param:{},supplierId:this.supplierID,shopId:0,orderTypeList:this.orderTypeList}
        },

    },
    created() {
     	 this.currentComponent= 'list';
       this.obj= {param:{},supplierId:this.supplierID,shopId:0,orderTypeList:this.orderTypeList}
    }
}
</script>
<style lang="sass">
  
</style>
