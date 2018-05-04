<template>
  <div class="_app-grids-wrapper">
    <div class="_app-grids">
      <a href="javascript:;" class="_app-grid">
        <div class="_app-grid-icon"><img src="/static/images/icons/circle-icon/20160126194705meishi.png"></div>
        <p class="_app-grid-text">导航名称</p>
      </a>
      <a href="javascript:;" class="_app-grid">
        <div class="_app-grid-icon"><img src="/static/images/icons/circle-icon/20160126202841xiuxianyule.png"></div>
        <p class="_app-grid-text">导航名称</p>
      </a>
      <a href="javascript:;" class="_app-grid">
        <div class="_app-grid-icon"><img src="/static/images/icons/circle-icon/20160126203251waimai.png"></div>
        <p class="_app-grid-text">导航名称</p>
      </a>
      <a href="javascript:;" class="_app-grid">
        <div class="_app-grid-icon"><img src="/static/images/icons/circle-icon/20160126203617jianshen.png"></div>
        <p class="_app-grid-text">导航名称</p>
      </a>
      <a href="javascript:;" class="_app-grid">
        <div class="_app-grid-icon"><img src="/static/images/icons/circle-icon/20160126203742aiche.png"></div>
        <p class="_app-grid-text">导航名称</p>
      </a>
      <a href="javascript:;" class="_app-grid">
        <div class="_app-grid-icon"><img src="/static/images/icons/circle-icon/20160126205426shenghuofuwu.png"></div>
        <p class="_app-grid-text">导航名称</p>
      </a>
      <a href="javascript:;" class="_app-grid">
        <div class="_app-grid-icon"><img src="/static/images/icons/circle-icon/20160316143612qinzisheying.png"></div>
        <p class="_app-grid-text">导航名称</p>
      </a>
      <a href="javascript:;" class="_app-grid">
        <div class="_app-grid-icon"><img src="/static/images/icons/circle-icon/20160125182200more.png"></div>
        <p class="_app-grid-text">导航名称</p>
      </a>
    </div>
  </div>
</template>

<style lang="sass" scoped>
  ._app-grids-wrapper {
    background: #fff;
    ._app-grids {
      overflow: hidden;
      position: relative;
      ._app-grid {
        position: relative;
        display: block;
        float: left;

        width: 25%;
        height: 87px;
        text-align: center;
        padding: 10px 0 3px;; 

        ._app-grid-icon {
          width: 44px;
          height: 44px;
          display: inline-block;
          border-radius: 50%;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }
        ._app-grid-text {
          padding-top: 5px;
          color: #555;
        }
      }
    }

    // 有分割线
    ._app-grids._bordered {
      &:before {
        content: " ";
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        height: 1px;
        border-top: 1px solid #D9D9D9;
        color: #D9D9D9;
        transform-origin: 0 0;
        transform: scaleY(0.5);
      }
      &:after {
        content: " ";
        position: absolute;
        left: 0;
        top: 0;
        width: 1px;
        bottom: 0;
        border-left: 1px solid #D9D9D9;
        color: #D9D9D9;
        transform-origin: 0 0;
        transform: scaleX(0.5);
      }
      ._app-grid:before {
        content: " ";
        position: absolute;
        right: 0;
        top: 0;
        width: 1px;
        bottom: 0;
        border-right: 1px solid #D9D9D9;
        color: #D9D9D9;
        transform-origin: 100% 0;
        transform: scaleX(0.5);
      }
      ._app-grid:after{
        content: " ";
        position: absolute;
        left: 0;
        bottom: 0;
        right: 0;
        height: 1px;
        border-bottom: 1px solid #D9D9D9;
        color: #D9D9D9;
        transform-origin: 0 100%;
        transform: scaleY(0.5);
      }
    }
  }
</style>
