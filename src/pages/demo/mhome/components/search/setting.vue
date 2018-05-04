<template>
  <div class="_settingComopnent">
    <div class="flex-vc">
      <label>背景色: </label>
      <el-input type="color" v-model="obj.prop.bgColor" class="flex-item" size="small"></el-input>
      <el-button style="margin-left: 10px;" @click="obj.prop.bgColor = '#f8f8f8'" size='small'>重置</el-button>
    </div>

    <div class="flex">
      <label>搜索热词: </label>
      <div class="flex-item">
        <input-tag :tags="obj.data.hotWords" placeholder="热词输入" class="_hot-words"></input-tag>
        <p class="text-muted">请按回车键输入热词</p>
      </div>
    </div>
  </div>
</template>

<script>
  import InputTag from 'components/input-tag'
  export default {
    components: { InputTag, },
    props: { obj: { type: Object, default: () => { return {} } } }
  }
</script>
