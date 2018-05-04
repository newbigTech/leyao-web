<template>
  <appSettingBox class="_app-ads-setting">
    <ul class="_app-ads-setting-list">
      <li v-for="(item, index) in obj.data.list">
        <div class="_app-ads-setting-img">
          <img :src="item.picUrl">
          <p>重新选择</p>
        </div>
        <div class="_add-ads-setting-link">
          <div class="_row-flex">
            <label style="min-width: 40px;">标题: </label>
            <el-input :maxlength="20" placeholder="广告标题最多20个文字" size="small" class="_row-auto" v-model="item.title"></el-input>
          </div>
          <div class="_row-flex" style="margin-bottom: 0;">
            <label style="min-width: 40px;">链接: </label>
            <div class="_row-auto">
              <el-tag type="primary" style="margin-bottom: 10px; width: 100%; height: 30px; line-height: 30px; font-size: 13px;" :close-transition="false" :hit="true">{{item.linkName}}</el-tag>
              <el-input size="small" :disabled="true" placeholder="请选择相应的链接" style="margin-bottom: 10px" v-show="false"></el-input>
              <el-button size="small" style="width: 100%; margin-top: 3px;">选择链接</el-button> 
            </div>
          </div>
        </div>

        <div class="_app-setting-remove-icon"><i class="el-icon-circle-close" style="background: #fff;"></i></div>
      </li> 
    </ul>
    <el-button style="display: block; width: 100%; color: #20A0FF; margin-top: 5px;">添加广告 <i class="el-icon-plus"></i> </el-button>
  </appSettingBox>
</template>

<script>
  import appSettingBox from "../app-setting-box"
  export default {
    name: 'appAdsSetting',
    props: { obj: { type: Object, default: () => { return {} } } },
    components: { appSettingBox }
  }
</script>

<style lang="sass" scoped>
  ._app-ads-setting-list {

  }
  ._app-ads-setting-list > li {
    position: relative;
    display: flex;
    padding: 10px;
    margin-bottom: 12px;
    border: 1px solid #ddd;
    background: #fff;
  }
  ._app-ads-setting-img {
    width: 120px;
    position: relative;
    img { max-width: 120px; height: auto; min-height: 120px;}
    p {
      position: absolute;
      bottom: 0px;
      width: 100%;
      padding: 5px;
      text-align: center;
      background: rgba(0,0,0,.5);
      color: #fff;
      cursor: pointer;
    }
  }
  ._add-ads-setting-link {
    flex: 1;
  }
</style>
