<template>
  <div class="_el-dialog3" v-show="show || value">
    <div class="_el-dialog-wrapper">
      <div class="_el-dialog3-header">
        <h3>{{title}}</h3>
        <i class="el-icon-close" @click.stop="$emit('close')"></i>
      </div>
      <div class="_el-dialog3-body"><slot></slot></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "elDialog3",
    props: {
      title: String,
      show: {type: Boolean, default: false},
      value: {type: Boolean, default: false},
    },
    watch: {
      show(n, o) {
        if (n) {
          document.body.style.overflow = "hidden"
        } else {
          document.body.style.overflow = "inherit"
        }
      },
      value(n) {
        if (n) {
          document.body.style.overflow = "hidden"
        } else {
          document.body.style.overflow = "inherit"
        }
      }
    }
  }
</script>

<style>
  ._el-dialog3 {
    top: -10%;
    left: 50%;
    transform: translateX(-50%);
    position: fixed;
    z-index: 3000;
    width: 100vw;
    height: calc(100vh + 20%);
    background-color: rgba(0, 0, 0, .6);
  }
  ._el-dialog3 ._el-dialog-wrapper {
    position: relative;
    top: 20%;
    width: 1050px;
    margin: 0 auto;
    /*height: 100vh;*/
    border-radius: 4px;
    border: 1px solid #ccc;
  }

  ._el-dialog3-header {
    height: 44px;
    padding: 0 15px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #d3dce6;
  }
  ._el-dialog3-header h3 {
    color: #444;
    font-size: 16px;
  }
  ._el-dialog3-header .el-icon-close {
    cursor: pointer;
    color: #c0ccda;
  }
  ._el-dialog3-header .el-icon-close:hover {
    color: #20a0ff;
  }

  ._el-dialog3-body {
    padding: 15px;
    background-color: #fff;
    overflow: auto;
    height: 65vh;
  }


</style>
