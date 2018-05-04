<template>
  <div class="_settingComopnent _setting-goods">

    <div class="flex-vc">
      <label>选择样式: </label>
      <div class="flex-item">
        <el-radio label="详细列表"></el-radio>
        <el-radio label="小图展示"></el-radio>
      </div>
    </div>

    <div class="flex-vc">
      <label>商品来源: </label>
      <!-- <el-select size="small" class="flex-item">
        <el-option value="0" label="单个商品"></el-option>
        <el-option value="1" label="商品分组"></el-option>
      </el-select> -->
      <div class="flex-item">
        <el-radio label="单个商品"></el-radio>
        <el-radio label="分组商品"></el-radio>
      </div>
      <!-- <el-button size="small" style="margin-left: 5px;">选择</el-button> -->
    </div>

    <div class="flex-vc">
      <label>列表标题: </label>
      <el-input size='small' placeholder="标题最多不能超过10个字" class="flex-item"></el-input>
    </div>


    <!-- 选择单个单个的商品 -->
    <div v-show="1" class="_setting-add-goods">
      <div class="flex">
        <label>选择商品: </label>
        <div class="flex-item">
          <ul class="_setting-add-goods-list">
            <li class="_setting-add-goods-item">
              <img src="https://dummyimage.com/50x50/F04F84/fff.png">
              <div class="_remove-goods-link"><i class="el-icon-circle-close"></i></div>
            </li>
            <li class="_setting-add-goods-item">
              <img src="https://dummyimage.com/50x50/38C45C/fff.png">
              <div class="_remove-goods-link"><i class="el-icon-circle-close"></i></div>
            </li>
            <li class="_setting-add-goods-item">
              <img src="https://dummyimage.com/50x50/FC9A6A/fff.png">
              <div class="_remove-goods-link"><i class="el-icon-circle-close"></i></div>
            </li>
            <li class="_setting-add-goods-item">
              <img src="https://dummyimage.com/50x50/2BBAEC/fff.png">
              <div class="_remove-goods-link"><i class="el-icon-circle-close"></i></div>
            </li>
            <li class="_setting-add-goods-item">
              <img src="https://dummyimage.com/50x50/1BA2E8/fff.png">
              <div class="_remove-goods-link"><i class="el-icon-circle-close"></i></div>
            </li>
            <li class="_setting-add-goods-item">
              <img src="https://dummyimage.com/50x50/FB673E/fff.png">
              <div class="_remove-goods-link"><i class="el-icon-circle-close"></i></div>
            </li>
            <li class="_setting-add-goods-item">
              <img src="https://dummyimage.com/50x50/21B9B7/fff.png">
              <div class="_remove-goods-link"><i class="el-icon-circle-close"></i></div>
            </li>

            <li class="_add-goods-btn">
              <i class="el-icon-plus"></i>
            </li>
          </ul>
          
        </div>
      </div>
    </div>
    
    <!-- 选择商品分组 -->
    <div v-show="1">
      <div class="flex-vc">
        <label>选择分组: </label>
        <el-input placeholder="请选择需要展示的商品分组" size="small" class="flex-item" :disabled="true"></el-input>
        <el-button size="small" style="margin-left: 5px;">选择</el-button>
      </div>

      <div class="flex-vc">
        <label>显示个数: </label>
        <div class="flex-item">
          <el-radio label="3"></el-radio>
          <el-radio label="6"></el-radio>
          <el-radio label="9"></el-radio>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="sass">
  ._setting-add-goods-list > li{
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

    ._remove-goods-link {
      position: absolute;
      right: -5px;
      top: -12px;
      color: #a7a7a7;
      font-size: 18px;
      cursor: pointer;
      z-index: 2;
      visibility: hidden;
      &:hover { color: #333; }
      i {
        border-radius: 50%;
        background: #fff;
      }
    }
    &:hover ._remove-goods-link { visibility: visible; }
  }
  ._add-goods-btn {
    &:hover { color: #20A0FF; }
  }
  
</style>
