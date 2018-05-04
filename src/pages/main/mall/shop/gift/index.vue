<template lang="html">
  <div class="">
    <!-- 导航面包屑 -->
    <div class="_breadcrumb">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/mall' }">商城</el-breadcrumb-item>
        <el-breadcrumb-item @click.native.prevent="curComponent = 'GiftList' ">店铺商品</el-breadcrumb-item>
        <el-breadcrumb-item>赠送商品</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <component :is="curComponent" :paramObj="paramObj" @forward="forward"></component>
  </div>
</template>

<script>

import GiftList from './gift_list'
import GiftForm from './gift_form'
import GiftView from './gift_view'
export default {
    name: 'gift_index',
    components: { GiftList,GiftForm,GiftView},
    data() {
        return {
          curComponent:'GiftList',
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
