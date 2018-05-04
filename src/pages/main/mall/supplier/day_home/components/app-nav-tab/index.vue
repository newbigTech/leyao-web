<template>
  <div class="_nav-tab">
    <a href="javascript:;" class="_nav-tab-item _active">
      <svg class="icon _nav-tab-icon"><use xlink:href="#icon-home"></use></svg>
      <div class="_nav-tab-label">首页</div>
    </a>

    <a href="javascript:;" class="_nav-tab-item">
      <svg class="icon _nav-tab-icon"><use xlink:href="#icon-category"></use></svg>
      <div class="_nav-tab-label">品类</div>
    </a>

    <a href="javascript:;" class="_nav-tab-item">
      <svg class="icon _nav-tab-icon"><use xlink:href="#icon-shopcar"></use></svg>
      <div class="_nav-tab-label">购物车</div>
    </a>

    <a href="javascript:;" class="_nav-tab-item">
      <svg class="icon _nav-tab-icon"><use xlink:href="#icon-user2"></use></svg>
      <div class="_nav-tab-label">个人中心</div>
    </a>
  </div>
</template>

<style scoped>
  ._nav-tab {
    position: relative;
    display: flex;
    width: 100%;
    height: 49px;
    line-height: 49px;
    /* background-color: #f8f8f8; */
    background: rgba(248, 248, 248, 0.71);
    color: #4A3F73;
  }
  
  ._nav-tab::before, ._nav-tab::after {
    display: block;
    content: " ";
    position: absolute;
    left: 0; right: 0; 
    height: 1px;
    border-top: 1px solid #d9d9d9;
    transform-origin: 0 0;
    transform: scaleY(0.5);
  }
  ._nav-tab::before { top: 0; }
  ._nav-tab::after { bottom: 0; transform-origin: 0 100%; }

  ._nav-tab-item {
    flex: 1 1 0%;
    display: block;
    height: 100%;
    font-size: 12px;
    line-height: 1;
    overflow: hidden;
    white-space: nowrap;
    text-align: center;
    color: #4A3F73;
  }

  ._nav-tab-item._active {
    color: #E4145D;
  }

  ._nav-tab-icon {
    font-size: 26px;
    margin: 4px 0 2px 0px;
  }

</style>
