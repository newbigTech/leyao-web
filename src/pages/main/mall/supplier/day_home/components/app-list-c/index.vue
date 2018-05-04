<template>
  <div class="_app-list-c">
    <div class="_app-list-c-cover">
      <img :src="obj.data.img && obj.data.img.length ? cloudShowUrl + obj.data.img : ''" v-show="!!obj.data.img">
    </div>

    <!-- default -->
    <div class="_app-list-c-body" v-show="!obj.data.list.length">
      <a href="#">
        <div class="_app-list-c-img"></div>
        <div class="_app-list-c-txt">
          <p>商品名称</p>
          <p>¥ 99.99</p>
        </div>
      </a>
      <a href="#">
        <div class="_app-list-c-img"></div>
        <div class="_app-list-c-txt">
          <p>商品名称</p>
          <p>¥ 99.99</p>
        </div>
      </a>
      <a href="#">
        <div class="_app-list-c-img"></div>
        <div class="_app-list-c-txt">
          <p>商品名称</p>
          <p>¥ 99.99</p>
        </div>
      </a>
    </div>

    <div class="_app-list-c-body" v-show="!!obj.data.list.length">
      <a href="#" v-for="(item, index) in obj.data.list">
        <div class="_app-list-c-img">
          <img :src="item.goodsPic && item.goodsPic.length ? cloudShowUrl + item.goodsPic : ''">
          <div style="color: white;position: absolute;left:0;top:0;background-color: blue;">{{item.activitySign}}</div>
        </div>
        <div class="_app-list-c-txt">
          <p>{{item.goodsName}}</p>
          <p>{{item.price}}</p>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "appListC",
    computed: {
      cloudShowUrl() {
        return this.$store.getters.cloudShowUrl
      }
    },
    props: { obj: { type: Object, default: () => { return {} } } },
  }
</script>

<style scoped lang="sass">
  ._app-list-c {
    background-color: #fff;
  }
  ._app-list-c-cover {
    width: 100%;
    min-height: 150px;
    background: #81D6FA;
    position: relative;
    img {
      width: 100%;
      height: 150px;
    }
  }
  ._app-list-c-cover::before {
    content: " ";
    display: block;
    width: 18px;
    height: 18px;
    position: absolute;
    left: 5%;
    bottom: -12px;
    transform: rotate(45deg);
    border-style: solid;
    border-width: 0px 1px 1px 0px;
    border-color: #fff;
    background: #fff;
  }
  ._app-list-c-body {
    height: 140px;
    background: #fff;
    margin-top: 8px;
    position: relative;
    overflow: hidden;
    display: flex;
  }

  ._app-list-c-body > a {
    display: block;
    width: 106px;
    margin-right: 2px;

    ._app-list-c-img {
      background: #81D6FA;
      width: 106px;
      height: 90px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    &:nth-child(2) ._app-list-c-img{ background: #FFBE32; }
    &:nth-child(3) ._app-list-c-img{ background: #FF7EC4; }
    ._app-list-c-txt {
      width: 106px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      font-size: 13px;
      // text-align: center;
      p {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 1px 3px;
      }
      p:last-child {
        // text-align: center;
        color: #FC234C;
      }
    }
  }
</style>
