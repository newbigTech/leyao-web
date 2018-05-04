<template lang="html">
  <div class="">
    <!-- 导航面包屑 -->
    <div class="_breadcrumb">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/mall' }">商城</el-breadcrumb-item>
        <el-breadcrumb-item @click.native.prevent="curComponent = 'OpenList' ">店铺基础设置</el-breadcrumb-item>
        <el-breadcrumb-item>开放API</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <component :is="curComponent" :paramObj="paramObj" @forward="forward"></component>
  </div>
</template>

<script>

import OpenList from './open_api_list'
import OpenAdd from './open_api_add'
export default {
    name: 'shop_open_api_index',
    components: { OpenList,OpenAdd},
    data() {
        return {
          curComponent:'OpenList',
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
