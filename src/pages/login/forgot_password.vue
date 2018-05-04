<template>
    <div class="container">
        <header class="_login-header">
            <div class="_login-container" style="position: relative;">
                <div class="_leyao-logo"><img src="/static/images/leyao-logo.png"></div>
                <div class="_login-title">找回密码</div>
                <div style="position: absolute; right: 0; top: 19px;"><router-link class="el-button el-button--primary" :to="{ path: '/userlogin'}">立即登录</router-link></div>
            </div>
        </header>
        <section style="background-color: #fff" class="_login-body">
          <div class="_login-container">
            <!-- 用户注册步骤显示 -->
            <step-indicator :number="curStep" :type="curTab" style="margin-bottom: 30px;"></step-indicator>

            <!-- 找回密码步骤 -->
            <step1 v-show="curStep===1" :paramsObj="paramsObj" @forward="forward"></step1>
            <step2 v-show="curStep===2" ref="step2Comm" :paramsObj="paramsObj" @forward="forward"></step2>
            <step3 v-show="curStep===3" :paramsObj="paramsObj" @forward="forward"></step3>
            <step4 v-show="curStep===4" :paramsObj="paramsObj" @forward="forward"></step4>
          </div>
            <!-- <div class="container"> -->
                <!-- 用户注册步骤显示 -->
                <!-- <step-indicator :number="curStep" :type="curTab"></step-indicator> -->
            <!-- </div> -->
            <!-- <div class="container">
                <step1 v-show="curStep===1" :paramsObj="paramsObj" @forward="forward"></step1>
                <step2 v-show="curStep===2" ref="step2Comm" :paramsObj="paramsObj" @forward="forward"></step2>
                <step3 v-show="curStep===3" :paramsObj="paramsObj" @forward="forward"></step3>
                <step4 v-show="curStep===4" :paramsObj="paramsObj" @forward="forward"></step4>
            </div> -->
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
import step1 from "./components/reset-password-step/step1.vue"
import step2 from "./components/reset-password-step/step2.vue"
import step3 from "./components/reset-password-step/step3.vue"
import step4 from "./components/reset-password-step/step4.vue"
import stepIndicator from "./components/step-indicator"
export default {
    name: 'forgotPassword-page',
    components: {
        stepIndicator,
        step1,
        step2,
        step3,
        step4
    },
    data() {
        return {
            curTab: 'resetPassword',
            curStep: 1,
            paramsObj: {
                userMobile: '',
                authCode: '',
                mobileCode:'',
                password:'',
                password2:''
            }
        }
    },
    methods: {
        forward(step,paramsObj){
            this.curStep=step
            if(step===2){
              this.$refs.step2Comm.onSendMobileCode()
            }
        }
    }
}
</script>
<style lang="sass">
</style>
