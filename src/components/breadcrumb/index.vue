<template>
  <div class="_breadcrumbs">
    <ul class="_breadcrumb">
      <slot></slot>
    </ul>
    <!-- 店铺切换 -->
    <div class="_shop-selector">
      <!-- <span>当前店铺: </span> -->
      <slot name="shop-selector"></slot>
    </div>
  </div>
</template>

<style lang="sass">
  ._breadcrumbs {
    position: relative;
    z-index: auto;
    border-bottom: 1px solid #E5E5E5;
    background-color: #F5F5F5;
    min-height: 41px;
    line-height: 39px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  ._breadcrumb {
    background-color: transparent;
    padding: 0 10px;
    font-size: 13px;
    color: #333;
    border-radius: 0;
    & > li {
      display: inline-block;
      ._breadcrumb-icon {
        font-size: 18px;
      }
    }
    & > li, & > li.active {
      color: #555;
      padding: 0 3px;
    }
    >li > a {
      color: #4C8FBD;
    }
    & > li + li:before {
      font-family: FontAwesome;
      font-size: 15px;
      content: "\f105";
      color: #B2B6BF;
      padding: 0;
      margin: 0 8px 0 0;
      position: relative;
      top: 1px;
    }
  }
  ._shop-selector {
    max-width: 220px;
    padding: 0 10px;
    display: flex;
    align-items: center;
    select {
      min-width: 120px;
    }
  }
</style>
