<template lang="html">
  <div class="">
    <!-- 导航面包屑 -->
    <div class="_breadcrumb">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/mall' }">商城</el-breadcrumb-item>
        <el-breadcrumb-item @click.native.prevent="curComponent = 'GroupOpenList' ">店铺订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>拼团订单</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <component :is="curComponent" :paramObj="paramObj" @forward="forward"></component>
  </div>
</template>

<script>

import GroupOpenList from './groupon_open_list'
import GroupOpenItemList from './groupon_open_item_list'
import OrderView from './order_view'
export default {
    name: 'groupon_open_index',
    components: { GroupOpenList,GroupOpenItemList,OrderView},
    data() {
        return {
          curComponent:'GroupOpenList',
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
