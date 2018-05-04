<template>
  <div class="_tab-items">
    <ul class="">
      <slot></slot>
    </ul>
  </div>
</template>

<style lang="sass">
  ._tab-items > ul {
    &::before, &::after { display: table; content: " "; }
    &::after { clear: both; }
    border-bottom: 1px solid #ddd;
    background-color: #F9FAFC;
    > li {
      position: relative;
      display: block;
      margin-bottom: -1px;
      float: left;
      &:first-child > a {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      }
      &:first-child.active > a {
        border-left-color: transparent;
      }
      > a {
        position: relative;
        display: block;
        height: 41px;
        padding: 0 12px;
        margin-right: 2px;
        margin-top: -1px;
        padding-top: 1px;
        line-height:39px;
        border: 1px solid transparent;
        border-top-color: transparent;
        border-radius: 4px 4px 0 0;
        font-size: 14px;
        &:hover {
          border-color: #eee #eee #ddd;
          text-decoration: none;
          background-color: #fff;
        }
      }
      &.active > a {
        color: #555;
        cursor: default;
        background-color: #fff;
        border: 1px solid #ddd;
        // border-top-color: transparent;
        border-bottom-color: transparent;
      }
    }
  }
</style>
