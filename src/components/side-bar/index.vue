<template>
  <div class="_side-bar">
    <div class="_side-bar-inner">
      <ul class="_side-bar-nav _menu-list">
        <item v-for="(model, index) in dataSource" :model="model" :index="index"></item>
        <li class="_side-bar-footer"><a></a></li>
      </ul>
    </div>
  </div>
</template>

<script>
  import item from "./item"
  export default {
    components: {
      item
    },
    props: {
      dataSource: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {
      }
    },

  }
</script>

<style lang="sass">
  // default theme
  // $sidebar-bg: #F5F5F5;
  // $sidebar-color: #334254;
  // $sidebar-border-color: #e5e5e5;
  // $sidebar-border-right-color: #e5e5e5;
  // $sidebar-menu-item-border-color: #e5e5e5;
  // $sidebar-menu-item-a-border-color: transparent;
  // $sidebar-menu-active-color: #f92e59;
  // $sidebar-menu-active-bg: #e3f5fb;
  // $sidebar-menu-contain-active-color: #f92e59;
  // $sidebar-menu-open-bg: #fff;
  // $sidebar-menu-first-child-border-color: transparent;

  // black theme
  $sidebar-bg: #282d30;
  $sidebar-color: #d0d0d0;
  $sidebar-border-color: #e5e5e5;
  $sidebar-border-right-color: #e5e5e5;
  $sidebar-menu-item-border-color: #000000;
  $sidebar-menu-item-a-border-color: #4c4c4c;
  $sidebar-menu-active-color: #f92e59;
  $sidebar-menu-active-bg: #000;
  $sidebar-menu-contain-active-color: #f92e59;
  $sidebar-menu-open-bg: #282d30;
  $sidebar-menu-first-child-border-color: #4c4c4c;


  ._side-bar {
    // min-width: 190px;
    // width: 30vh;
    width: 230px;
    // max-width: 230px;
    height: 100%;
    border-right: 1px solid $sidebar-border-color;
    background-color: $sidebar-bg;
    position: relative;
    // margin-top: -1px;
  }
  ._side-bar-inner {
    position: fixed;
    left: 0;
    height: calc(100vh - 60px );
    // min-width: 190px;
    // width: 30vh;
    width: 230px;
    // max-width: 230px;
    border-right: 1px solid $sidebar-border-color;
    background-color: $sidebar-bg;
    overflow-x: hidden;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 2px;
      border-radius: 3px;
      // background-color: #f8f8f8;
      background-color: #000;
    }
    &::-webkit-scrollbar-track {
      width: 0;
    }
    &::-webkit-scrollbar-thumb {
      // background-color: rgba(0, 0, 0, 0.4);
      background-color: #f92e59;
      border-radius: 3px;
    }
  }
  ._side-bar-nav {
    background-color: $sidebar-bg;
    li {
      display: block;
      position: relative;
      border-style: solid;
      border-color: $sidebar-menu-item-border-color;
      border-width: 1px 0 0 0;
      > a {
        display: block;
        height: 40px;
        line-height: 40px;
        padding-left: 15px;
        padding-right: 15px;
        text-shadow: none!important;
        font-size: 15px;
        // color: #585858;
        color: $sidebar-color;
        border-top: 1px solid $sidebar-menu-item-a-border-color;
      }
      &:hover > a{
        // background-color: #FFF;
        color: $sidebar-menu-active-color;
      }
      > ul {
        background-color: $sidebar-menu-open-bg;
        li > a {
          padding-left: 30px;
          &:hover {
            // background-color: #F1F5F9;
          }
        }
      }
    }

    li a {
      position: relative;
    }

    > li:first-child { 
      border-top: 1px solid #4c4c4c;
      > a { border-top: 1px solid transparent; }
    }

    // menu-icon
    li a ._menu-icon {
      display: inline-block;
      min-width: 30px;
      margin-right: 2px;
      vertical-align: middle;
      text-align: center;
      font-size: 18px;
      font-weight: 400;
    }

    // active
    li.active { 
      background-color: $sidebar-menu-active-bg;
      color: $sidebar-menu-active-color;
      border-top-color: $sidebar-menu-first-child-border-color;
    }
    // li.active > a { border-top-color:  $sidebar-menu-active-bg; }
    li.active > a {
      // background-color: $sidebar-menu-active-bg;
      color: $sidebar-menu-active-color;
      border-top-color: transparent;
    }

    // li.active::before {
    //   content: " ";
    //   display: block;
    //   position: absolute;
    //   top: -1px;
    //   left: 0;
    //   z-index: 1;
    //   height: 37px;
    //   width: 3px;
    //   max-width: 3px;
    //   overflow: hidden;
    //   background-color: #f92e59;
    // }
    li._contain-active > a {
      background-color: $sidebar-menu-open-bg;
      color: $sidebar-menu-active-color;
    }
    li._contain-active::before {
      content: " ";
      display: block;
      position: absolute;
      top: 5px;
      left: 0;
      z-index: 1;
      height: 30px;
      width: 5px;
      max-width: 5px;
      overflow: hidden;
      background-color: $sidebar-menu-active-color;
    }

    // arrow
    li > a ._arrow {
      display: block;
      width: 16px!important;
      height: 16px;
      line-height: 16px;
      text-shadow: none;
      font-size: 20px;
      position: absolute;
      right: 5px;
      top: 11px;
      padding: 0;
      text-align: center;
      transform: rotate(0);
      transition: transform .2s ease;
    }

    // open
    li._open > a ._arrow {
      transform: rotate(90deg);
    }

    // sub-menu
    li > ._sub-menu {
      transition: opacity 200ms linear;
      // max-height: 0;
      // overflow: hidden;
      display: none;
      opacity: 0;
    }
    li._open > ._sub-menu {
      opacity: 1;
    }
    li ._sub-menu > li > a{
      height: 35px;
      line-height: 35px;
      padding-left: 30px;
      font-size: 14px;
    }

    // sub-menu sub-menu
    li ._sub-menu .sub-menu {

    }
    li._side-bar-footer {
      height: 32px;
    }
  }
</style>
