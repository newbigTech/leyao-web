<template lang="html">
  <div class="">
    <!-- 导航面包屑 -->
    <div class="_breadcrumb">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/mall' }">商城</el-breadcrumb-item>
        <el-breadcrumb-item @click.native.prevent="curComponent = 'ActivityList' ">店铺营销管理</el-breadcrumb-item>
        <el-breadcrumb-item>自提购管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <component :is="curComponent" :paramObj="paramObj" @forward="forward"></component>
  </div>
</template>

<script>

import RenduList from './list'
import RenduForm from './form'
import SetGoods from './set_goods'
import SetPage from './set_page'
import UserList from './user_list'
import OrderList from './order_list'
export default {
    name: 'franco_rendu_index',
    components: { RenduList,RenduForm,SetGoods,SetPage,UserList,OrderList},
    data() {
        return {
          curComponent:'RenduList',
          paramObj: {},
        }
    },
    methods:{
      forward(comp,row){
        this.curComponent=comp
        this.paramObj=row||{} 
      }
    }
}
</script>
