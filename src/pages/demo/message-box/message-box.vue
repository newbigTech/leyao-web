<template>
  <div class="message-box">
    <el-button type="text" @click.native="open3">点击打开 Message Box</el-button>
  </div>
</template>

<script>
  export default {
    methods: {
      open3() {
        this.$prompt('请输入邮箱', '提示', {
          inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
          inputErrorMessage: '邮箱格式不正确'
        })
      }
    }
  }
</script>

