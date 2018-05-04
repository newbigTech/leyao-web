<template>
  <appSettingBox class="_app-goods-setting">
    <div class="_row-flex">
      <label>商品来源: </label>
      <div class="_row-auto">
        <el-select size="small" v-model="obj.data.type">
          <el-option :value="0" label="商品"></el-option> 
          <el-option :value="1" label="分组"></el-option> 
          <el-option :value="2" label="活动"></el-option> 
          <el-option :value="3" label="专题"></el-option> 
        </el-select>
      </div>
    </div>

    <div class="_row-flex">
      <label>列表标题: </label>
      <el-input size='small' placeholder="标题最多不能超过10个字" class="_row-auto" v-model="obj.data.listTitle" :maxlength="10"></el-input>
    </div>

    <div class="_row-flex">
      <label>选择样式: </label>
      <div class="_row-auto" style="padding-top: 3px;">
        <el-radio :label="0" v-model="obj.prop.layout">详细列表</el-radio>
        <el-radio :label="1" v-model="obj.prop.layout">小图展示A</el-radio>
        <el-radio :label="2" v-model="obj.prop.layout">小图展示B</el-radio>
      </div>
    </div>

    <!-- 商品来源 分组 -->
    <div class="_app-goods-setting-from-group" v-show="obj.data.type == 1">
      <div class="_row-flex">
        <label>选择分组: </label>
        <el-input placeholder="请选择需要展示的商品分组" size="small" class="flex-item" :disabled="true"></el-input>
        <el-button size="small" style="margin-left: 5px;">选择</el-button>
      </div>

      <div class="_row-flex">
        <label>显示个数: </label>
        <div class="_row-auto" style="padding-top: 3px;">
          <el-radio v-model="obj.prop.showNumber" :label="6">6</el-radio>
          <el-radio v-model="obj.prop.showNumber" :label="12">12</el-radio>
          <el-radio v-model="obj.prop.showNumber" :label="18">18</el-radio>
        </div>
      </div>
    </div>

    <!-- 商品来源 商品,活动,专题 -->
    <div class="_app-goods-setting-from-goods" v-show="obj.data.type != 1">
      <div class="_row-flex">
        <label>选择商品: </label>
        <div class="_row-auto">
          <ul class="_app-goods-setting-list">
            <li class="_app-goods-setting-item" v-for="(item, index) in obj.data.list">
              <img :src="item.picUrl">
              <div class="_app-setting-remove-icon"><i class="el-icon-circle-close"></i></div>
            </li>

            <li class="_app-goods-setting-add">
              <i class="el-icon-plus"></i>
            </li>
          </ul>
        </div>
      </div>
    </div>

  </appSettingBox>
</template>

<script>
  import appSettingBox from "../app-setting-box"
  export default {
    name: 'appGoodsSetting',
    props: { obj: { type: Object, default: () => { return {} } } },
    components: { appSettingBox }
  }
</script>

<style lang="sass" scoped>
  ._app-goods-setting-from-goods {
    ._app-goods-setting-list {
      overflow: hidden;
      padding: 8px 0px;
    }

    ._app-goods-setting-list > li {
      float: left;
      width: 55px;
      height: 55px;
      font-size: 20px;
      font-weight: 300;
      border-radius: 0;
      color: #ccc;
      border: 1px solid #ccc;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 8px;
      margin-bottom: 8px;
      cursor: pointer;
      position: relative;

      img {
        width: 100%;
        height: 100%;
      }
    }

    ._app-setting-remove-icon {
      right: -5px;
      top: -12px;
      visibility: hidden;
    }
    ._app-goods-setting-item:hover ._app-setting-remove-icon { visibility: visible; }
    ._app-goods-setting-add:hover { color: #20A0FF; }
  }
</style>
