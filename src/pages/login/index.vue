<template>
  <div class="_login-pages">
    <header class="_login-header">
      <div class="_login-container">
        <div class="_leyao-logo"><img src="/static/images/leyao-logo.png"></div>
        <div class="_login-title">欢迎登录</div>
      </div>
    </header>
    <section class="_login-body">
      <div class="_login-container"><router-view></router-view></div>
    </section>
    <footer class="_login-footer">
      <div class="_login-container">
        <div>©2015-2016 深圳市智联宝生态科技有限公司</div>  
        <div><a href="http://www.miibeian.gov.cn" target="_blank">粤ICP备15102042号-5</a></div>
        <div><img src="/static/images/ghs.png"><a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44030502000157" target="_blank" style="margin-left: 0;"> 粤公网安备 44030502000157号</a></div>
      </div>
    </footer>
  </div>
</template>

<script>
  import loginBox from "./components/login-box"
  export default {
    name: "login-page",
    components: { loginBox }
  }
</script>

<style lang="sass">
  ._login-pages {}
  ._login-header {
    ._login-container {
      display: flex;
      align-items: center;
      height: 70px;
      ._leyao-logo {
        height: 37px;
        margin-top: 5px;
        img { max-height: 100%; width: auto;}
      }
      ._login-title {
        font-size: 21px;
        margin-left: 25px;
      }
    }
  }
  ._login-footer {
    ._login-container {
      height: 50px;
      text-align: center;
      padding: 15px;
      > div {
        display: inline-block;
        margin-right: 20px;
        color: #999999;
      }
    }
  }
  ._login-body {
    min-height: calc(100vh - 70px - 50px);
    background-color: #f5f5f5;
    // for IE
    ._login-container {
      flex-direction: column;
    }
  }
  ._login-container {
    width: 1024px; 
    margin: 0 auto;
  }
</style>



