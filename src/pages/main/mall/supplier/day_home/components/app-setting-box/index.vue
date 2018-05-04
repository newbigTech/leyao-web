<template>
  <div class="_app-setting-box">
    <div class="_app-setting-box-arrow"></div>
    <slot></slot>
  </div>
</template>

<style>
  ._app-setting-box {
    position: relative;
    color: #444;
    width: 440px;
    margin-left: 10px;
    padding: 10px 8px;
    min-height: 66px;
    background: #f8f8f8;
    border-radius: 3px;
    border: 1px solid #d4d4d4;
    font-size: 13px;
  }
  ._app-setting-box button *,
  ._app-setting-box el-radio *,
  ._app-setting-box .el-tag { font-size: 13px !important; }


  ._app-setting-box-arrow {
    width: 0px;
    height: 0px;
    border-style: solid;
    border-width: 6px 7px 6px 0;
    border-color: transparent #d4d4d4 transparent transparent;
    position: absolute;
    left: -7px;
    top: 10px;
  }
  ._app-setting-box-arrow::after {
    width: 0px;
    height: 0px;
    border-style: solid;
    border-width: 6px 7px 6px 0;
    border-color: transparent #d1d1d1 transparent transparent;
    position: absolute;
    left: -6px;
    top: 19px;
    content: "";
    border-right-color: #f8f8f8;
    left: 2px;
    top: -6px;
  }
</style>
