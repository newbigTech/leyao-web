<template>
  <div class="_settingComopnent">
    <div class="flex-vc">
      <label>每行显示图标: </label>
      <div class="flex-item">
        <el-radio :label="3"></el-radio>
        <el-radio :label="4"></el-radio>
        <el-radio :label="5"></el-radio>
      </div>
    </div>
    <ul class="_add-grid-item">
      <li>
        <div class="_add-grid-item-icon">
          <img src="https://dummyimage.com/50x50/F04F84/fff.png">
          <p>修改</p>
        </div>
        <div class="_add-grid-item-link">
          <div class="flex-vc" style="margin-bottom: 0px;">
            <el-input placeholder="请输入导航名称,不能超过4个字" size="small" class="flex-item" style="margin-left: 5px;" :maxlength="4"></el-input>
            <!-- <el-button size="small" style="margin-left: 5px;" :disabled="true">导航名称</el-button> -->
          </div>
          <div class="flex-vc" style="margin-bottom: 0px;">
            <el-input placeholder="请选择导航链接" size="small" class="flex-item" style="margin-left: 5px;" :disabled="true"></el-input>
            <el-button size="small" style="margin-left: 5px;">选择链接</el-button>
          </div>
        </div>

        <div class="_remove-grid-link"><i class="el-icon-circle-close" style="background: #fff;"></i></div>
      </li>
      <li>
        <div class="_add-grid-item-icon">
          <img src="https://dummyimage.com/50x50/FC9B9C/fff.png">
          <p>修改</p>
        </div>
        <div class="_add-grid-item-link">
          <div class="flex-vc" style="margin-bottom: 0px;">
            <el-input placeholder="请输入导航名称,不能超过4个字" size="small" class="flex-item" style="margin-left: 5px;" :maxlength="4"></el-input>
            <!-- <el-button size="small" style="margin-left: 5px;" :disabled="true">导航名称</el-button> -->
          </div>
          <div class="flex-vc" style="margin-bottom: 0px;">
            <el-input placeholder="请选择导航链接" size="small" class="flex-item" style="margin-left: 5px;" :disabled="true"></el-input>
            <el-button size="small" style="margin-left: 5px;">选择链接</el-button>
          </div>
        </div>

        <div class="_remove-grid-link"><i class="el-icon-circle-close" style="background: #fff;"></i></div>
      </li>
      <li>
        <div class="_add-grid-item-icon">
          <img src="https://dummyimage.com/50x50/38C45C/fff.png">
          <p>修改</p>
        </div>
        <div class="_add-grid-item-link">
          <div class="flex-vc" style="margin-bottom: 0px;">
            <el-input placeholder="请输入导航名称,不能超过4个字" size="small" class="flex-item" style="margin-left: 5px;" :maxlength="4"></el-input>
            <!-- <el-button size="small" style="margin-left: 5px;" :disabled="true">导航名称</el-button> -->
          </div>
          <div class="flex-vc" style="margin-bottom: 0px;">
            <el-input placeholder="请选择导航链接" size="small" class="flex-item" style="margin-left: 5px;" :disabled="true"></el-input>
            <el-button size="small" style="margin-left: 5px;">选择链接</el-button>
          </div>
        </div>

        <div class="_remove-grid-link"><i class="el-icon-circle-close" style="background: #fff;"></i></div>
      </li>
    </ul>
     <el-button style="display: block; width: 100%; color: #20A0FF;">添加导航入口 <i class="el-icon-plus"></i> </el-button>
  </div>
</template>

<style lang="sass">
  ._add-grid-item > li{
    position: relative;
    display: flex;
    margin-bottom: 12px;
    padding: 10px 8px;
    margin-bottom: 12px;
    border: 1px solid #ddd;
    background: #fff;
    ._add-grid-item-icon {
      position: relative;
      width: 70px;
      height: 70px;
      border: 1px solid #ccc;
      cursor: pointer;
      margin-top: 1px;
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
    ._add-grid-item-link {
      flex: 1;
    }
    ._remove-grid-link {
      position: absolute;
      right: -5px;
      top: -12px;
      color: #a7a7a7;
      font-size: 18px;
      cursor: pointer;
      z-index: 2;
      // visibility: hidden;
      &:hover { color: #333; }
    }
  }
  ._setting-prop > li {
    position: relative;
    display: flex;
    margin-bottom: 12px;
    padding: 10px 8px;
    margin-bottom: 12px;
    border: 1px solid #ddd;
    background: #fff;
  }
</style>
