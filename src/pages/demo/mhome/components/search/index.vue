<template>
  <div class="_app-search" :style="{'background-color': obj.prop.bgColor || 'transparent'}">
    <form>
      <input type="text" placeholder="搜索商品" disabled="true">
      <button type="submit"> 搜索 </button>
    </form>
  </div>
</template>

<script>
  export default {
    props: {
      obj: { type: Object, default: () => { return {} } }
    }
  }
</script>

<style lang="sass" scoped>
  ._app-search {
    padding: 10px;
    form {
      margin: 0;
      position: relative;
      background: #fff;
      border-radius: 4px;
      border: 0 none;
      overflow: hidden;
    }
    input {
      margin: 0;
      padding: 8px 8px 8px 32px;
      -webkit-appearance: none;
      -moz-appearance: none;
      line-height: 20px;
      height: 35px;
      width: 100%;
      box-sizing: border-box;
      border: 1px solid #e5e5e5;
      border-radius: 4px;
      outline: none;
      font-size: 14px;
      box-shadow: 0 0 0 0;
      background-color: transparent;
    }
    button {
      position: absolute;
      top: 1px;
      left: 1px;
      border: 0px none;
      border-radius: 4px;
      height: 33px;
      line-height: 35px;
      width: 22px;
      padding: 0;
      color: #fff;
      font-size: 14px;
      text-indent: -9999px;
      background: #fff url("/static/images/icons/search_icon_2.png") right center no-repeat;
      background-size: 14px 14px;
      border-radius: 5px 0 0 5px;
    }
  }
</style>
