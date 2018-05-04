<template>
  <appSettingBox class="_app-search-setting">
    <div class="_row-flex">
      <label>搜索背景: </label>
      <div class="_row-auto _row-flex"> 
        <el-input type="color" class="_row-auto" size="small" v-model="obj.prop.bgColor"></el-input>
        <el-button style="margin-left: 5px;" size='small'>重置</el-button>
      </div>
    </div>

    <div class="_row-flex">
      <label>搜索热词: </label>
      <div class="_row-auto">
        <input-tag :tags="obj.data.list" placeholder="热词输入" class="_hot-words"></input-tag>
        <p class="text-muted" style="font-size: 12px !important">请按回车键输入热词</p>
      </div>
    </div>
  </appSettingBox>
</template>

<script>
  import appSettingBox from "../app-setting-box"
  import InputTag from 'components/input-tag'
  export default {
    name: 'appSearchSetting',
    props: { obj: { type: Object, default: () => { return {} } } },
    components: { appSettingBox, InputTag }
  }
</script>

<style>
  ._app-search-setting ._hot-words {
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #c0ccda;
    color: #1f2d3d;
    display: block;
    padding: 4px 0 0 4px;
    -webkit-appearance: initial;
  }
  ._app-search-setting ._hot-words .input-tag{
    padding: 1px 2px;
  }
  ._app-search-setting ._hot-words .new-tag {
    padding: 1px 3px;
    margin-bottom: 3px;
    margin-top: 1px;
  }
</style>
