<template>
  <appSettingBox class="_app-grids-setting">
    <div class="_row-flex" v-show="0">
      <label>每行显示: </label>
      <div class="_row-auto" style="padding-top: 4px;">
        <el-radio :label="3"></el-radio>
        <el-radio :label="4"></el-radio>
        <el-radio :label="5"></el-radio>
      </div>
    </div> 

    <ul class="_app-grids-setting-list">
      <li v-for="(item, index) in obj.data.list">
        <div class="_app-grids-setting-item-icon">
          <img :src="item.picUrl">
          <p>修改</p>
        </div>
        <div class="_app-grids-setting-item-link">
          <div class="_row-flex" style="margin-bottom: 9px">
            <el-input placeholder="请输入导航名称,不能超过4个字" size="small" class="flex-item" style="margin-left: 5px;" :maxlength="4" v-model="item.linkName"></el-input>
          </div>
          <div class="_row-flex" style="margin-bottom: 0">
            <el-input placeholder="请选择导航链接" size="small" class="_row-auto" style="margin-left: 5px;" :disabled="true"></el-input>
            <el-button size="small" style="margin-left: 5px;">选择链接</el-button>
          </div>
        </div>
        <div class="_app-setting-remove-icon"><i class="el-icon-circle-close" style="background: #fff;"></i></div>
      </li>
    </ul>

    <el-button style="display: block; width: 100%; color: #20A0FF;">添加导航入口 <i class="el-icon-plus"></i> </el-button>
  </appSettingBox>
</template>

<script>
  import appSettingBox from "../app-setting-box"
  export default {
    name: 'appgridsSetting',
    props: { obj: { type: Object, default: () => { return {} } } },
    components: { appSettingBox }
  }
</script>

<style lang="sass" scoped>
  ._app-grids-setting-list {

  }
  ._app-grids-setting-list > li {
    position: relative;
    display: flex;
    margin-bottom: 12px;
    padding: 10px 8px;
    margin-bottom: 12px;
    border: 1px solid #ddd;
    background: #fff;
    ._app-grids-setting-item-icon {
      position: relative;
      width: 70px;
      height: 70px;
      border: 1px solid #ccc;
      cursor: pointer;
      img { width: 60px; height: 60px; margin: 5px auto; display: block; border-radius: 50%;}
      p {
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        background-color: rgba(0,0,0,0.5);
        text-align: center;
        color: #fff;
        line-height: 70px;
        visibility: hidden;
        font-size: 12px;
      }
      &:hover p { visibility: visible; }
    }

    ._app-grids-setting-item-link {
      flex: 1;
    }

  }
</style>
