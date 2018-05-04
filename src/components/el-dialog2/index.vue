<template>
  <div class="_el-dialog2" v-show="show">
    <div class="_el-dialog-wrapper">
      <div class="_el-dialog2-header">
        <h3>{{title}}</h3>
        <i class="el-icon-close" @click.stop="$emit('close')"></i>
      </div>
      <div class="_el-dialog2-body"><slot></slot></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "elDialog2",
    props: {
      title: String,
      show: {type: Boolean, default: false},
    },
  }
</script>

<style>
  ._el-dialog2 {
    top: -20%;
    left: 50%;
    transform: translateX(-50%);
    position: fixed;
    z-index: 3000;
    width: 100vw;
    height: calc(100vh + 20%);
    background-color: rgba(0, 0, 0, .6);
  }
  ._el-dialog2 ._el-dialog-wrapper {
    position: relative;
    top: 20%;
    width: 1050px;
    margin: 0 auto;
    /*height: 100vh;*/
    border-radius: 4px;
    border: 1px solid #ccc;
  }

  ._el-dialog2-header {
    height: 44px;
    padding: 0 15px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #d3dce6;
  }
  ._el-dialog2-header h3 {
    color: #444;
    font-size: 16px;
  }
  ._el-dialog2-header .el-icon-close {
    cursor: pointer;
    color: #c0ccda;
  }
  ._el-dialog2-header .el-icon-close:hover {
    color: #20a0ff;
  }

  ._el-dialog2-body {
    padding: 15px;
    background-color: #fff;
    overflow: auto;
    height: 65vh;
  }


</style>
