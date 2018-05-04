<template>
  <div>
    <!-- default -->
    <div class="_app-grids _default" v-show="!obj.data.list.length">
      <a href="javascript:;" class="_app-grid">
        <div class="_app-grid-icon">
          <img src="/static/images/default-90x90.png">
        </div>
        <p class="_app-grid-text">导航文本</p>
      </a>
      <a href="javascript:;" class="_app-grid">
        <div class="_app-grid-icon">
          <img src="/static/images/default-90x90.png">
        </div>
        <p class="_app-grid-text">导航文本</p>
      </a>
      <a href="javascript:;" class="_app-grid">
        <div class="_app-grid-icon">
          <img src="/static/images/default-90x90.png">
        </div>
        <p class="_app-grid-text">导航文本</p>
      </a>
      <a href="javascript:;" class="_app-grid">
        <div class="_app-grid-icon">
          <img src="/static/images/default-90x90.png">
        </div>
        <p class="_app-grid-text">导航文本</p>
      </a>
    </div>

    <div class="_app-grids" v-show="!!obj.data.list.length">
      <a href="javascript:;" class="_app-grid" v-for="(item, index) in obj.data.list">
        <div class="_app-grid-icon">
          <img :src="item.img !== '' ? (cloudShowUrl + item.img): 'static/images/default-90x90.png'">
        </div>
        <p class="_app-grid-text">{{item.name}}</p>
      </a>
    </div>
  </div>

</template>

<style scoped>
  ._app-grids {
    background: #fff;
    position: relative;
    overflow: hidden;
  }

  ._app-grid {
    position: relative;
    display: block;
    float: left;

    width: 25%;
    height: 87px;
    text-align: center;
    padding: 10px 0 3px;
  }
  ._app-grid-icon {
    width: 45px;
    height: 45px;
    display: inline-block;
    /* border-radius: 50%; */
  }
  ._app-grid-icon img {
    width: 100%;
    height: 100%;
    /* border-radius: 50%; */
  }
  ._app-grid-text {
    padding-top: 5px;
    font-size: 13px;
    color: #999999;
  }

  /* bordered */
  ._app-grids._bordered::before,
  ._app-grids._bordered::after {
    content: " ";
    position: absolute;
    left: 0; top: 0;
    color: #D9D9D9;
    transform-origin: 0 0;
  }
  ._app-grids._bordered::before {
    right: 0;
    height: 1px;
    border-top: 1px solid #D9D9D9;
    transform: scaleY(0.5);
  }
  ._app-grids._bordered::after {
    width: 1px;
    bottom: 0;
    border-left: 1px solid #D9D9D9;
    transform: scaleX(0.5);
  }
  ._app-grids._bordered ._app-grid::before,
  ._app-grids._bordered ._app-grid::after {
    content: " ";
    position: absolute;
    right: 0; bottom: 0;
    color: #D9D9D9;
  }
  ._app-grids._bordered ._app-grid::before {
    top: 0;
    width: 1px;
    border-right: 1px solid #D9D9D9;
    transform-origin: 100% 0;
    transform: scaleX(0.5);
  }
  ._app-grids._bordered ._app-grid::after {
    left: 0;
    height: 1px;
    border-bottom: 1px solid #D9D9D9;
    transform-origin: 0 100%;
    transform: scaleY(0.5);
  }
</style>

<script>
  export default {
    name: "appGrids",
    props: { obj: { type: Object, default: () => { return {} } } },
    computed:{
      cloudShowUrl() {
            return this.$store.getters.cloudShowUrl
        }
    }
  }
</script>
