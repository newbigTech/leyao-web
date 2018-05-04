<template>
  <div class="_down-menu" v-show="show">
    <div class="_down-menu-header"><slot name="menu-title"></slot></div>
    <div class="_down-menu-body"><slot name="menu-list"></slot></div>
    <div class="_down-menu-footer"><slot name="menu-footer"></slot></div>
  </div>
</template>

<script>
  export default {
    props: {
      show: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style lang="sass">
  ._down-menu {
    position: absolute;
    right: 0;
    top: 100%;
    max-height: 300px;
    background-color: #fff;
    color: #444444;
    font-size: 14px;
    display: flex;
    flex-direction: column;
    border: 1px solid #eee;
    min-width: 120px;
    max-width: 280px;
    text-align: center;
    & > *:empty { display: none; }
  }
  ._down-menu-header { border-bottom: 1px solid #f4f4f4; }
  ._down-menu-header, ._down-menu-footer {
    padding: 6px 10px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  ._down-menu-body {
    flex: 1;
    a {
      display: block;
      border-bottom: 1px solid #f4f4f4;
      color: #444444;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding: 7px 10px;
      &:hover {
        background-color: #FEE188;
      }
    }
  }

</style>
