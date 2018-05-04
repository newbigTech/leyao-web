<template>
  <div class="_app-list-a">
    <div class="_app-list-a-header _app-border-bottom">
      <div class="_line"></div>
      <div>{{obj.data.title}}</div>
      <div class="_line"></div>
    </div>

    <!-- default -->
    <div class="_app-list-a-body" v-show="!obj.data.list.length">
      <a href="javascript:;" class="_app-list-a-item _app-border-bottom">
        <div>
          <img src="/static/images/default-192x192.png">
        </div>
        <div>
          <div>
            <h1>商品名</h1>
            <h2>商品简短的描述</h2>
          </div>
          <h3>
            <p>会员价¥ <strong>99.99</strong> <small>¥110.00</small></p>
            <p><svg class="icon"><use xlink:href="#icon-shopcar-add"></use></svg></p>
          </h3>
        </div>
      </a>
      <a href="javascript:;" class="_app-list-a-item _app-border-bottom">
        <div>
          <img src="/static/images/default-192x192.png">
        </div>
        <div>
          <div>
            <h1>商品名</h1>
            <h2>商品简短的描述</h2>
          </div>
          <h3>
            <p>会员价¥ <strong>99.99</strong> <small>¥110.00</small></p>
            <p><svg class="icon"><use xlink:href="#icon-shopcar-add"></use></svg></p>
          </h3>
        </div>
      </a>
      <a href="javascript:;" class="_app-list-a-item _app-border-bottom">
        <div>
          <img src="/static/images/default-192x192.png">
        </div>
        <div>
          <div>
            <h1>商品名</h1>
            <h2>商品简短的描述</h2>
          </div>
          <h3>
            <p>会员价¥ <strong>99.99</strong> <small>¥110.00</small></p>
            <p><svg class="icon"><use xlink:href="#icon-shopcar-add"></use></svg></p>
          </h3>
        </div>
      </a>
    </div>

    <div class="_app-list-a-body" v-show="!!obj.data.list.length">
      <a href="javascript:;" class="_app-list-a-item _app-border-bottom" v-for="(item, index) in obj.data.list">
        <div style="position: relative;">
          <img :src="(item.goodsPic&&item.goodsPic.length > 1) ? (cloudShowUrl + item.goodsPic): '/static/images/default-192x192.png'">
          <div style="color: white;position: absolute;left:0;top:0;background-color: blue;">{{item.activitySign}}</div>
        </div>
        <div>
          <div>
            <h1>{{item.goodsName}}</h1>
            <h2>{{item.goodsDesc}}</h2>
          </div>
          <h3>
            <p>销售价¥ <strong>{{item.price}}</strong> <small>¥{{item.mPrice}}</small></p>
            <p><svg class="icon"><use xlink:href="#icon-shopcar-add"></use></svg></p>
          </h3>
        </div>
      </a>
    </div>



    <a href="javascript:;" class="_app-list-a-footer"> 查看更多 </a>
  </div>
</template>

<script>
  export default {
    name: "appListA",
    computed: {
        cloudShowUrl() {
            return this.$store.getters.cloudShowUrl
        }
    },
    props: { obj: { type: Object, default: () => { return {} } } },
  }
</script>

<style scoped lang="sass">
  ._app-list-a {
    background-color: #fff;
  }
  ._app-list-a-header {
    height: 40px;
    line-height: 40px;
    display: flex;
    font-size: 15px;
    color: #F60046;
    ._line {
      flex: 1;
      position: relative;
      &::before {
        position: absolute;
        content: " ";
        display: block;
        height: 1px;
        width: 55px;
        background-color: currentColor;
        right: 0px;
        top: 0; bottom: 0;
        margin: auto 10px;
      }
    }
    > div:last-child::before { left: 0px; }
  }
  ._app-list-a-item {
    padding: 5px;
    display: flex;
    > div:nth-child(1) {
      width: 90px;
      height: 90px;
      display: flex;
      img { width: 100%; height: 100%; margin: auto;}
    }
    > div:nth-child(2) {
      padding: 5px 8px;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      overflow: hidden;
      h1 {
        font-size: 17px;
        font-weight: 500;
        padding-right: 5px;
        margin-bottom: 3px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      h2 {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 13px;
        color: #777;
        margin-top: 8px;
      }
      h3 {
        position: relative;
        display: flex;
        height: 36px;
        padding-top: 12px;
        padding-right: 30px;
        font-size: 13px;
        p:nth-child(1) {
          color: #F60046;
          strong { font-size: 18px; font-weight: 500; }
          small {
            color: #777;
            font-size: 12px;
            text-decoration: line-through;
            vertical-align: 1px;
          }
        }
        p:last-child {
          position: absolute;
          bottom: -4px;
          right: -5px;
          font-size: 21px;
          color: #F60046;
          padding: 8px 7px 2px 7px;
          border-radius: 50%;
          border: 1px solid #F2F2F2;
        }
      }
    }
  }
  ._app-list-a-footer {
    display: block;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: #999;
  }
</style>
