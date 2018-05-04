<template>
  <div class="_settingComopnent">
    <ul class="_add-ads-list">
      <li>
        <div class="_add-ads-img">
          <img src="https://dummyimage.com/750x320/F04F84/fff">
          <p>重新选择</p>
        </div>
        <div class="_add-ads-link">
          <div class="flex-vc">
            <label style="min-width: 40px;">标题: </label>
            <el-input :maxlength="20" placeholder="广告标题最多20个文字" size="small" class="flex-item"></el-input>
          </div>
          <div class="flex">
            <label style="min-width: 40px;">链接: </label>
            <div class="flex-item" >
              <el-tag type="primary" style="margin-bottom: 10px; width: 100%; height: 30px; line-height: 30px; font-size: 13px;" :close-transition="false" :hit="true">元旦专题活动01</el-tag>
              <el-input size="small" :disabled="true" placeholder="请选择相应的链接" style="margin-bottom: 10px" v-show="false"></el-input>
              <el-button size="small" style="width: 100%;">选择链接</el-button> 
            </div>
          </div>
        </div>
        <div class="_remove-ads-link"><i class="el-icon-circle-close" style="background: #fff;"></i></div>
      </li>
      <li>
        <div class="_add-ads-img">
          <img src="https://dummyimage.com/750x320/38C45C/fff">
          <p>重新选择</p>
        </div>
        <div class="_add-ads-link">
          <div class="flex-vc">
            <label style="min-width: 40px;">标题: </label>
            <el-input :maxlength="20" placeholder="广告标题最多20个文字" size="small" class="flex-item"></el-input>
          </div>
          <div class="flex">
            <label style="min-width: 40px;">链接: </label>
            <div class="flex-item" >
              <el-tag type="primary" style="margin-bottom: 10px; width: 100%; height: 30px; line-height: 30px; font-size: 13px;" :close-transition="false" :hit="true">元旦专题活动01</el-tag>
              <el-input size="small" :disabled="true" placeholder="请选择相应的链接" style="margin-bottom: 10px" v-show="false"></el-input>
              <el-button size="small" style="width: 100%;">选择链接</el-button> 
            </div>
          </div>
        </div>
        <div class="_remove-ads-link"><i class="el-icon-circle-close" style="background: #fff;"></i></div>
      </li>
      <li>
        <div class="_add-ads-img">
          <img src="https://dummyimage.com/750x320/FC9A6A/fff">
          <p>重新选择</p>
        </div>
        <div class="_add-ads-link">
          <div class="flex-vc">
            <label style="min-width: 40px;">标题: </label>
            <el-input :maxlength="20" placeholder="广告标题最多20个文字" size="small" class="flex-item"></el-input>
          </div>
          <div class="flex">
            <label style="min-width: 40px;">链接: </label>
            <div class="flex-item" >
              <el-tag type="primary" style="margin-bottom: 10px; width: 100%; height: 30px; line-height: 30px; font-size: 13px;" :close-transition="false" :hit="true">元旦专题活动01</el-tag>
              <el-input size="small" :disabled="true" placeholder="请选择相应的链接" style="margin-bottom: 10px" v-show="false"></el-input>
              <el-button size="small" style="width: 100%;">选择链接</el-button> 
            </div>
          </div>
        </div>
        <div class="_remove-ads-link"><i class="el-icon-circle-close" style="background: #fff;"></i></div>
      </li>
    </ul>
    <!-- <button class="btn btn-default btn-block">添加广告</button> -->
    <el-button style="display: block; width: 100%; color: #20A0FF;">添加广告 <i class="el-icon-plus"></i> </el-button>
  </div>
</template>

<style lang="sass">
  ._add-ads-list > li {
    position: relative;
    display: flex;
    padding: 10px;
    margin-bottom: 12px;
    border: 1px solid #ddd;
    background: #fff;
    ._add-ads-img {
      width: 120px;
      position: relative;
      img { max-width: 120px; height: auto; min-height: 120px;}
      p {
        position: absolute;
        bottom: 3px;
        width: 100%;
        padding: 5px;
        text-align: center;
        background: rgba(0,0,0,.5);
        color: #fff;
        cursor: pointer;
      }
    }
    ._add-ads-link {
      flex: 1;
    }
    ._remove-ads-link {
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
    // &:hover ._remove-ads-link { visibility: visible; }
  }
</style>
