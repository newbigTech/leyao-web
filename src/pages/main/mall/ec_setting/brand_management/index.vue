<template lang="html">
  <div class="">
    <!-- 导航面包屑 -->
    <div class="_breadcrumb">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/mall' }">商城</el-breadcrumb-item>
        <el-breadcrumb-item>电商设置</el-breadcrumb-item>
        <el-breadcrumb-item>商品品牌管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="_container">
      <component :is="curComponent" :paramObj="paramObj" @forward="forward"></component>
    </div>
  </div>
</template>

<script>

import BrandList from './brand_list'
import BrandForm from './brand_form'
import BindClassify from './bind_classify'
export default {
    name: 'brand_index',
    components: {
        BrandList, BrandForm,BindClassify
    },
    data() {
        return {
          curComponent:'BrandList',
          paramObj:{}
        }
    },
    methods:{
      forward(comp,data){
        this.curComponent=comp
        this.paramObj=data||{}
      }
    }
}

</script>
