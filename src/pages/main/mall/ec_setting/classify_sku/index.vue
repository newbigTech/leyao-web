<template>
  <div class="ec-setting-classify-sku">
    <!-- 导航面包屑 -->
    <div class="_breadcrumb">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item to="/mall">商城</el-breadcrumb-item>
        <el-breadcrumb-item>电商设置</el-breadcrumb-item>
        <el-breadcrumb-item>分类规格管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- body -->
    <div class="_container-wrapper">
      <!-- tabs -->
      <div class="_sub-body">
        <!-- tab选项卡 -->
        <div class="_tab-items"> 
          <el-tabs type="card" @tab-click="tabClick" :active-name="curTabName">
            <el-tab-pane label="全局规格" name="skuPublic">
              <sku-public :e="e"></sku-public>
            </el-tab-pane>
            <el-tab-pane label="分类规格" name="skuClassify">
              <sku-classify :e="e"></sku-classify>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import skuPublic from "./sku-public"
  import skuClassify from "./sku-classify"
  export default {
    components: {
      skuPublic, skuClassify
    },
    data() {
      return {
        e: new this.$root.constructor(),
        curTabName: 'skuPublic'
      }
    },
    methods: {
      tabClick(tab) {
        this.e.$emit(tab.name)
      }
    }
  }
</script>
