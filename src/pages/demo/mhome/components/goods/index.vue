<template>
  <div class="_app-goods-wrapper">
    <!-- 详细列表 商品图片长宽比1:1 -->
    <div class="_app-goods" v-show="1">
      <div class="_app-goods-title">
        <div>最新上架</div>
        <a href="javascript:;" class="_app-more">更多 <i class="el-icon-arrow-right"></i></a>
      </div>
      <div class="_app-goods-list">
        <a href="javascript:;" class="_app-goods-item">
          <div class="_app-goods-item-image">
            <img src="https://dummyimage.com/320x320/81d6fa/fff">
          </div>
          <div class="_app-goods-item-info">
            <!-- 商品名称 -->
            <h3 class="_app-goods-item-name">黑池口感烘焙</h3>

            <!-- 商品简短描述 -->
            <h5 class="_app-goods-item-desc"> [4店通用] 100元提货券1张，可叠加 </h5>
            
            <!-- 商品信息 -->
            <div class="_app-goods-item-meta">

              <!-- 商品价格 -->
              <p class="_app-goods-item-price">
                <strong>999.99</strong>
                <small>1000</small>
              </p>

              <!-- 商品销售数量 -->
              <p class="_app-goods-item-sale">
                <small>已售9999</small>
              </p>

              <!--  -->

            </div>
          </div>
        </a>

        <a href="javascript:;" class="_app-goods-item">
          <div class="_app-goods-item-image">
            <img src="https://dummyimage.com/320x320/ffbe32/fff">
          </div>
          <div class="_app-goods-item-info">
            <!-- 商品名称 -->
            <h3 class="_app-goods-item-name">黑池口感烘焙</h3>

            <!-- 商品简短描述 -->
            <h5 class="_app-goods-item-desc"> [4店通用] 100元提货券1张，可叠加 </h5>
            
            <!-- 商品信息 -->
            <div class="_app-goods-item-meta">

              <!-- 商品价格 -->
              <p class="_app-goods-item-price">
                <strong>999.99</strong>
                <small>1000</small>
              </p>

              <!-- 商品销售数量 -->
              <p class="_app-goods-item-sale">
                <small>已售9999</small>
              </p>

              <!--  -->

            </div>
          </div>
        </a>

        <a href="javascript:;" class="_app-goods-item">
          <div class="_app-goods-item-image">
            <img src="https://dummyimage.com/320x320/ff7ec4/fff">
          </div>
          <div class="_app-goods-item-info">
            <!-- 商品名称 -->
            <h3 class="_app-goods-item-name">黑池口感烘焙</h3>

            <!-- 商品简短描述 -->
            <h5 class="_app-goods-item-desc"> [4店通用] 100元提货券1张，可叠加 </h5>
            
            <!-- 商品信息 -->
            <div class="_app-goods-item-meta">

              <!-- 商品价格 -->
              <p class="_app-goods-item-price">
                <strong>999.99</strong>
                <small>1000</small>
              </p>

              <!-- 商品销售数量 -->
              <p class="_app-goods-item-sale">
                <small>已售9999</small>
              </p>

              <!--  -->

            </div>
          </div>
        </a>
      </div>
    </div>

    <!-- 简单展示  -->
    <div class="_app-goods-card" v-show="1">
      <div class="_app-goods-card-title _app-goods-title">
        <div>最新优惠</div>
        <a href="javascript:;" class="_app-more">更多优惠 <i class="el-icon-arrow-right"></i></a>
      </div>
      <div class="_app-goods-card-list">
        <a href="javascript:;" class="_app-goods-card-item">
          <img src="https://dummyimage.com/120x90/81d6fa/fff">
          <h3 class="_app-goods-card-name">吉兆手握寿司</h3>
          <p class="_app-goods-card-price">
            <ins>999</ins>
            <del>888</del>
          </p>
        </a>
        <a href="javascript:;" class="_app-goods-card-item">
          <img src="https://dummyimage.com/120x90/ffbe32/fff">
          <h3 class="_app-goods-card-name">幸福西饼蛋糕</h3>
          <p class="_app-goods-card-price">
            <ins>999</ins>
            <del>888</del>
          </p>
        </a>
        <a href="javascript:;" class="_app-goods-card-item">
          <img src="https://dummyimage.com/120x90/ff7ec4/fff">
          <h3 class="_app-goods-card-name">十三羊蒙古羊排店</h3>
          <p class="_app-goods-card-price">
            <ins>999</ins>
            <del>888</del>
          </p>
        </a>
        <a href="javascript:;" class="_app-goods-card-item">
          <img src="https://dummyimage.com/120x90/81d6fa/fff">
          <h3 class="_app-goods-card-name">吉兆手握寿司</h3>
          <p class="_app-goods-card-price">
            <ins>999</ins>
            <del>888</del>
          </p>
        </a>
        <a href="javascript:;" class="_app-goods-card-item">
          <img src="https://dummyimage.com/120x90/ffbe32/fff">
          <h3 class="_app-goods-card-name">幸福西饼蛋糕</h3>
          <p class="_app-goods-card-price">
            <ins>999</ins>
            <del>888</del>
          </p>
        </a>
        <a href="javascript:;" class="_app-goods-card-item">
          <img src="https://dummyimage.com/120x90/ff7ec4/fff">
          <h3 class="_app-goods-card-name">十三羊蒙古羊排店</h3>
          <p class="_app-goods-card-price">
            <ins>999</ins>
            <del>888</del>
          </p>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style lang="sass" scoped>
  ._app-goods-wrapper {
    position: relative;
    background: #fff;
  }

  // 商品详细展示
  ._app-goods {
    background: linear-gradient(0,#e1e1e1,#e1e1e1 50%,transparent 0) 100% 100%/100% 1px no-repeat;
    background-color: #fff;
    position: relative;
    // padding: 10px 0;
  }
  ._app-goods-title {
    position: relative;
    color: #444;
    font-weight: 400;
    padding-left: 25px;
    height: 40px;
    background: linear-gradient(0, #e1e1e1, #e1e1e1 50%, transparent 0) 100% 100%/100% 1px no-repeat;
    
    display: flex;
    align-items: center;
    justify-content: space-between;

    a { color: #888; display: block; padding: 0 10px; height: 40px; line-height: 40px; text-align: center;}
    a i { font-size: 13px; }

    &::before {
      content: " ";
      width: 3px;
      height: 20px;
      background-color: #f75454;

      position: absolute;
      top: 10px;
      left: 15px;
    }
    
  }
  ._app-goods-list {

  }
  ._app-goods-item {
    margin-left: 15px;
    padding: 11px 10px 11px 0;
    display: flex;
    background: linear-gradient(0,#e1e1e1,#e1e1e1 50%,transparent 0) 100% 100%/100% 1px no-repeat;
  }
  ._app-goods-item-image {
    position: relative;
    font-size: 0;
    margin-right: 10px;
    // width: 90px;
    // height: 90px;
    min-width: 90px;
    min-height: 90px;
    img {
      width: 90px;
      height: 90px;
    }
  }
  ._app-goods-item-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 3px 0 2px 0;
    overflow: hidden;
    ._app-goods-item-name {
      font-size: 17px;
      font-weight: 500;
      max-width: 150px;
      padding-right: 5px;
      margin-bottom: 3px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    ._app-goods-item-desc {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 13px;
      color: #777;
    }

    ._app-goods-item-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    ._app-goods-item-price {
      strong {
        color: #f63;
        font-size: 21px;
        text-decoration: none;
        font-weight: 500;
      }
      small {
        font-size: 13px;
        color: #777;
        text-decoration: line-through;
        vertical-align: 1px;
      }
      strong::before, small::before { 
        content: "\A5";
        font-size: 14px;
        margin-right: 2px;
        vertical-align: 1px;
        display: none;
      }
      
    }

    ._app-goods-item-sale {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: right;
      font-size: 13px;
      color: #777;
      line-height: 24px;
      small { margin-top: 3px; display: inline-block; }
    }
  }


  // 商品简单展示
  ._app-goods-card {
    background-color: #fff;
  }
  ._app-goods-card-title {
    padding-left: 17px;
    &::before { left: 7px; }
  }
  ._app-goods-card-list {
    padding: 5px;
    position: relative;
    overflow: hidden;
    ._app-goods-card-item {
      width: 50%;
      width: 33.33%;
      border-radius: 3px;
      padding: 0 2px;
      display: block;
      float: left;
      margin-bottom: 10px;
    }
    img { width: 100%; height: auto; }
    ._app-goods-card-name {
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      width: 100%;
      color: #333;
      font-size: 14px;
      padding-top: 3px;
    }
    ._app-goods-card-price {
      font-size: 0;
      padding-top: 1px;
      position: relative;
      white-space: nowrap;
      ins:before, del:before {
        content: "\A5";
        font-size: 14px;
      }
      ins {
        color: #f63;
        text-decoration: none;
        font-size: 17px;
      }
      del {
        color: #999;
        font-size: 11px;
        margin-left: 2px;
      }
    }
  }
</style>
