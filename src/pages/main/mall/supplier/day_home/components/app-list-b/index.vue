<template>
  <div class="_app-list-b">
    <h3 class="_app-list-b-title" v-show="obj.data.title.length" :class="'_' + obj.prop.titleAlign">
      <div>
        <i></i>
        {{obj.data.title}}
      </div>
      <a href="#">更多<i class="el-icon-arrow-right"></i></a>
    </h3>

    <!-- default -->
    <div class="_app-list-b-body" v-show="!obj.data.list.length">
      <a href="#">
        <div class="_app-list-b-img"></div>
        <div class="_app-list-b-txt">
          <p>商品名称</p>
          <p>¥ 99.99</p>
        </div>
      </a>
      <a href="#">
        <div class="_app-list-b-img"></div>
        <div class="_app-list-b-txt">
          <p>商品名称</p>
          <p>¥ 99.99</p>
        </div>
      </a>
      <a href="#">
        <div class="_app-list-b-img"></div>
        <div class="_app-list-b-txt">
          <p>商品名称</p>
          <p>¥ 99.99</p>
        </div>
      </a>
    </div>
    <!-- have data -->
    <div class="_app-list-b-body" v-show="!!obj.data.list.length">
      <a href="#" v-for="(item, index) in obj.data.list">
        <div class="_app-list-b-img">
          <img :src="item.goodsPic && item.goodsPic.length ? cloudShowUrl + item.goodsPic : ''">
          <div style="color: white;position: absolute;left:0;top:0;background-color: blue;">{{item.activitySign}}</div>
        </div>
        <div class="_app-list-b-txt">
          <p>{{item.goodsName}}</p>
          <p>{{item.price}}</p>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "appListB",
    computed: {
      cloudShowUrl() {
        return this.$store.getters.cloudShowUrl
      }
    },
    props: { obj: { type: Object, default: () => { return {} } } },
  }
</script>

<style scoped lang="sass">
  ._app-list-b {
    background-color: #fff;
    padding: 10px 5px;
  }
  ._app-list-b-title {
    height: 22px;
    line-height: 22px;
    padding-left: 0px;
    font-size: 16px;
    margin-bottom: 8px;
    color: #424242;
    position: relative;
    > div {
      display: inline-block;
      border-left: 3px solid #81D6FA;
      padding-left: 3px;
    }
    > a {
      color: #999;
      position: absolute;
      right: 2px;
      bottom: 0;
      i {
        font-size: 13px;
        position: relative;
        bottom: 1px;
      }
    }
  }
  ._app-list-b-title._center {
    text-align: center;
    > div { border-left: 0; }
  }
  ._app-list-b-body {
    display: flex;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    overflow: hidden;
    a {
      width: 106px;
      display: block;
      height: auto;
      margin-right: 5px;
    }
    ._app-list-b-img {
      width: 106px;
      height: calc( 106px * 0.718);
      background: #81D6FA;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
    }
    a:nth-child(2) ._app-list-b-img { background: #FF7EC4;}
    a:nth-child(3) ._app-list-b-img { background: #FFBE32;}
    ._app-list-b-txt {
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
      }
      p:last-child {
        // text-align: center;
        color: #FC234C;
      }
    }
  }
</style>
