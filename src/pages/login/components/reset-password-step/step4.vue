<template>
    <!-- 第四步 完成-->
    <div class="container-fluid" style="width:500px;">
        <div class="flex-hc">
          <el-alert title="密码修改成功" type="success" :closable="false" show-icon style=" width: 145px;">
          </el-alert>
          <div style="margin-left: 8px;"><router-link class="el-button el-button--primary" :to="{ path: '/userlogin'}">立即登录</router-link></div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'forgot-password-step-4'
}
</script>
<style lang="sass">
</style>
