<template lang="html">
  <div class="">
    <!-- 导航面包屑 -->
    <div class="_breadcrumb">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/mall' }">商城</el-breadcrumb-item>
        <el-breadcrumb-item @click.native.prevent="curComponent = 'GoodsList' ">店铺商品</el-breadcrumb-item>
        <el-breadcrumb-item>库存设置</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <component :is="curComponent" :rowData="rowData" @forward="forward"></component>
  </div>
</template>

<script>

import GoodsList from './goods_list'
import SetStock from './set_stock'
export default {
    name: 'goods_index',
    components: { GoodsList,SetStock},
    data() {
        return {
          curComponent:'GoodsList',
          rowData: {},
        }
    },
    methods:{
      forward(comp,row){
        this.curComponent=comp
        this.rowData=row||{} 
      }
    }
}

</script>
