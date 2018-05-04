<template>
  <div class="_app-search">
    <div class="_app-search-position">
      <span>深圳</span> 
      <svg class="icon"><use xlink:href="#icon-caret"></use></svg>
    </div>
    <div class="_app-search-box">
      <svg class="icon"><use xlink:href="#icon-search"></use></svg>
      <div class="_app-search-input">搜索商户或商品</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "appSearch",
    props: { obj: { type: Object, default: () => { return {} } } },
  }
</script>

<style scoped>
  ._app-search {
    display: flex;
    background: transparent;
    padding: 7px 10px 7px 5px;
  }
  ._app-search-position { 
    display: flex;
    width: 55px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 15px;
    margin-top: -3px;
  }
  ._app-search-box {
    flex: 1;
    display: flex;
    align-items: center;
    background-color: rgba(248, 248, 248, 0.58);
    color: #656565;
    padding: 0 5px;
    border-radius: 3px;
    height: 30px;
    cursor: text;
  }
  ._app-search-box svg { font-size: 18px; margin-right: 5px; }
</style>
