<template>
  <div>
    <div class="_app-notice _app-border-top _default" v-show="!obj.data.list.length">
      <div class="_app-notice-inner" :style="{'background-color': obj.prop.bgColor}">
        <label>{{ obj.data.title || '文本标题'}}</label>
        <div class="_app-notice-list">
          <a href="javascript:;"> 上下滚动文本链接.... </a>
        </div>
      </div>
    </div>

    <div class="_app-notice _app-border-top" v-show="!!obj.data.list.length">
      <div class="_app-notice-inner" :style="{'background-color': obj.prop.bgColor}">
        <label v-show="!!obj.data.title">{{obj.data.title}}</label>
        <div class="_app-notice-list">
          <a href="javascript:;" v-for="(item, index) in obj.data.list"> {{item.title || item.name}} </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "appNotice",
    props: { obj: { type: Object, default: () => { return {} } } },
  }
</script>


<style lang="sass" scoped>
  ._app-notice {
    padding: 7px 6px;
    background-color: #fff;
  }
  ._app-notice-inner {
    color: #fff;
    background-color: #4ADA9E;
    display: flex;
    align-items: center;
    padding: 5px 8px;
    border-radius: 4px;
    label {
      display: block;
      padding-right: 15px;
      font-size: 15px;
      font-weight: 500;
      margin-top: -2px;
      position: relative;
      &::after {
        content: " ";
        display: block;
        position: absolute;
        width: 5px;
        height: 5px;
        background-color: currentColor;
        border-radius: 50%;
        right: 6px;
        top: 1px; bottom: 0;
        margin: auto 0;
      }
    }
    ._app-notice-list {
      flex: 1;
      height: 25px;
      border-radius: 5px;
      overflow: hidden;
      background-color: #fff;
      > a {
        display: block;
        color: #666;
        line-height: 25px;
        font-size: 12px;
        padding: 0 5px;
      }
    }
  }

</style>
