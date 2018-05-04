<template>
  <div class="_app-status">
    <div class="_left">
      <div class="_icon-signal"> <div></div><div></div><div></div><div></div><div></div> </div>
      <div>中国联通 4G</div>
    </div>
    <div class="_center">15:21</div>
    <div class="_right"><div>77%</div><div class="_icon-battery"></div></div>
  </div>
</template>

<style scoped>
  ._app-status {
    position: relative;
    padding: 1px 3px;
    font-size: 11px;
    background: transparent;
    color: #fff;
  }
  ._left, ._right {
    position: absolute;
    height: 18px;
    top: 2px;
    width: 110px;
  }

  ._left {
    left: 3px;
  }

  ._right {
    right: 5px;
    text-align: right;
  }

  ._center {
    width: 100%;
    height: 18px;
    line-height: 18px;
    text-align: center;
    font-weight: 500;
  }
  ._left > *,  ._right > *{ display: inline-block; vertical-align: middle;  }

  ._icon-signal > div {
    display: inline-block;
    color: #fff;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    margin-right: 2px;
    border: solid 1px currentColor;
  }
  ._icon-signal > div:nth-child(1), ._icon-signal > div:nth-child(2), ._icon-signal > div:nth-child(3) { background-color: #fff; }
  
  ._icon-battery {
    margin-left: 2px;
    width: 20px;
    height: 9px;
    border-radius: 2px;
    border: solid 1px #fff;
    position: relative;
  }
  ._icon-battery::before {
    content: '';
    position: absolute;
    display: block;
    width: 2px;
    height: 3px;
    border-radius: 0 2px 2px 0;
    border-top: solid 1px #fff;
    border-right: solid 1px #fff;
    border-bottom: solid 1px #fff;
    right: -3px;
    top: 1px;
  }
  ._icon-battery::after {
    content: '';
    position: absolute;
    display: block;
    left: 1px;
    top: 1px;
    width: 11px;
    height: 5px;
    background-color: #fff;
  }
</style>
