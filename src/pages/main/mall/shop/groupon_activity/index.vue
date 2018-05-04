<template lang="html">
  <div class="">
    <!-- 导航面包屑 -->
    <div class="_breadcrumb">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/mall' }">商城</el-breadcrumb-item>
        <el-breadcrumb-item @click.native.prevent="curComponent = 'ActivityList' ">店铺营销管理</el-breadcrumb-item>
        <el-breadcrumb-item>拼团活动</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <component :is="curComponent" :paramObj="paramObj" @forward="forward"></component>
  </div>
</template>

<script>

import ActivityList from './activity_list'
import ActivityAdd from './add_activity'
import ActivityView from './activity_view'
export default {
    name: 'groupon_activity_index',
    components: { ActivityList,ActivityAdd,ActivityView},
    data() {
        return {
          curComponent:'ActivityList',
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
