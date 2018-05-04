<template>
    <div class="_login-component-container">
        <div class="login-img"><img src="/static/images/login-left.png"></div>
        <div class="login-box">
            <el-tabs class="_login-type" @tab-click="onTabClick">
                <el-tab-pane label="运营登录" name="supplier_login"></el-tab-pane>
                <el-tab-pane label="店铺登录" name="shop_login"></el-tab-pane>
            </el-tabs>
            <!-- 用户名输入 -->
            <div class="input-box">
                <svg class="icon">
                    <use xlink:href="#icon-user"></use>
                </svg>
                <input type="text" placeholder="请输入用户名/手机号/邮箱" v-model="userName" @keyup.enter="onLogin" maxlength="20">
            </div>
            <!-- 密码输入 -->
            <div class="input-box">
                <svg class="icon">
                    <use xlink:href="#icon-lock"></use>
                </svg>
                <input type="password" placeholder="请输入登录密码" v-model="password" @keyup.enter="onLogin"  maxlength="20">
            </div>
            <!-- 验证码输入 -->
            <div class="input-box vcode">
                <svg class="icon">
                    <use xlink:href="#icon-shield"></use>
                </svg>
                <div class="input-div">
                    <input type="text" placeholder="请输入验证码" maxlength="4" v-model="authCode" @keyup.enter="onLogin">
                </div>
                <div class="vcode-img" @click="getcode=getCodePath+Math.random()"><img :src="getcode"></div>
            </div>
            <!-- 忘记密码 注册账号 -->
            <div class="input-box fr">
                <a href="#">
                    <!-- 忘记密码? -->
                </a>
                <!-- <a href="#">注册账号</a> -->
                <router-link :to="{ name: 'forgotPassword'}">找回密码?</router-link>
            </div>
            <!-- 登录按钮 -->
            <div class="input-box login-btn" @click="onLogin">
                <button>登 录</button>
            </div>
            <!-- 提示信息 -->
            <div class="input-box info">
                <p>{{errorMsg}}</p>
            </div>
        </div>
    </div>
</template>
<style lang="sass">
.login-box {
    // 标题
    h3 {
        font-size: 21px;
        margin-bottom: 23px;
        font-weight: 500;
    }
    background-color: rgba(255, 255, 255, 0.82);
    min-width: 370px;
    width: 44vh;
    max-width: 460px;
    min-height: 400px;
    height: 55vh;
    max-height: 510px;
    padding: 30px 35px;
    box-shadow: 0px 0px 5px 2px #ddd;
    margin-left: -5%;
    .input-box {
        position: relative;
        margin-bottom: 15px;
        svg.icon {
            position: absolute;
            color: #A9A9A9;
            font-size: 23px;
            top: 10px;
            left: 10px;
        }
        input {
            display: block;
            width: 100%;
            height: 44px;
            padding: 6px 12px 6px 38px;
            font-size: 16px;
            line-height: 1.42857143;
            color: #555;
            background-color: #fff;
            background-image: none;
            border: 1px solid #D0CFCF;
            &:focus {
                border-color: #fbacb9;
            }
        }
    }
    .input-box.fr {
        display: flex;
        align-items: center;
        justify-content: space-between;
        color: #706F6F;
        a {
            display: block;
        }
    }
    .input-box.vcode {
        display: flex;
        align-items: center;
        .input-div {
            flex: 1;
        }
        .vcode-img {
            margin-left: 3px;
            padding: 2px;
            height: 44px;
            border: 1px solid #D0CFCF;
            width: 90px;
            cursor: pointer;
            background: #fff;
            img {
                max-width: 100%;
                height: auto;
            }
        }
    }
    .input-box.login-btn {
        button {
            display: block;
            width: 100%;
            padding: 10px 15px;
            margin-bottom: 0;
            font-size: 18px;
            font-weight: 500;
            line-height: 1.42857143;
            text-align: center;
            white-space: nowrap;
            background-image: none;
            border: 1px solid transparent;
            background-color: #ff1d43;
            color: #fff;
            &:active {
                opacity: .7;
            }
        }
    }
    .input-box.info {
        margin-bottom: 0;
        color: #0004f7;
        text-align: center;
    }
}

._login-type {
    width: 100%;
    .el-tabs__item {
        width: 50%;
        text-align: center;
    }
    .el-tabs__item.is-active {
        color: #ff1d43;
    }
    .el-tabs__active-bar {
        background-color: #ff1d43;
    }
}

._login-component-container {
    // min-height: calc(100vh - 70px - 50px);
    height: calc(100vh - 70px - 50px); // for IE
    display: flex;
    align-items: center;
    justify-content: space-around;
}

.login-img {
    min-height: 400px;
    // height: 54vh;
    max-height: 510px;
    margin-left: -5%;
    min-width: 400px;
    width: 49vh;
    max-width: 460px;
    // img { max-height: 100%; width: auto; }
    img {
        max-width: 100%;
        height: auto;
    }
}
</style>
<script>
window.callback = function(data) {}
import sconfig from 'src/config/config'
import { gosso } from 'src/vuex/actions/userAction'
import Validator from 'lib/utils/validator'
const validator=new Validator()
//const SSO_URL=process.env.NODE_ENV == 'development' ? sconfig.DEV_SSO : sconfig.PROD_SSO
export default {
    name: 'Login',
    data() {
        return {
            userName: '',
            password: '',
            authCode: '', //TODO:开发环境设置默认值
            getCodePath: '/pub/pubController/getCode?r=',
            getcode: '',
            errorMsg: '',
            loginType: 1
        }
    },
    components: {},
    methods: {
        onTabClick(tab) {
            let type = tab.name === 'supplier_login' ? 1 : 2
            this.loginType = type
                //console.log('loginType',this.loginType);
            this.$store.commit('SET_LOGIN_TYPE', parseInt(type))
        },
        onLogin() {
            this.errorMsg = ''
            if (!this.userName.trim() || !this.password.trim() || !this.authCode.trim()) {
                this.errorMsg = "用户名、密码、验证码不能为空"
                return false
            }
            if(!validator.username(this.userName)&&!validator.mobile(this.userName)&&!validator.email(this.userName)){
                this.errorMsg = "用户名输入错误"
                return false
            }
            if(!validator.alphaNumberChineseUnderline(this.password)){
                this.errorMsg = "密码输入错误"
                return false
            }
            if(!validator.isChrnum(this.authCode)){
                this.errorMsg = "验证码输入错误"
                return false
            }
            this.$store.dispatch('login', {
                loginType: this.loginType,
                username: this.userName.trim(),
                password: this.password.trim(),
                authcode: this.authCode.trim()
            }).then((data) => {
                const { result, ticket, msg, ssoUrl } = data
                if (result) {
                    gosso(`/sso?ticket=${ticket}`).then(data => {
                        if (data.success) {
                            this.$store.dispatch('getLoginUser').then(data => {
                                const redirect = this.$route.params.redirect || '/'
                                this.$router.push({
                                    path: redirect
                                })
                            })
                            const SSO_URL=ssoUrl
                            //"http://192.168.1.233:8080/setCookie"
                            $.ajax({
                                type: "get",
                                async: false,
                                url: `${SSO_URL}/setCookie`,
                                data: {
                                    ticket: ticket
                                },
                                dataType: "jsonp",
                                jsonCallback: 'callback',
                                crossDomain: true
                            });
                        } else {
                            // alert(data.msg);
                            this.errorMsg = data.msg
                            // location.href = '/#/userlogin';
                            return false
                        }
                    })
                } else {
                    this.errorMsg = msg
                };
            });
        }
    },
    created() {
        this.getcode = this.getCodePath + Math.random()
    },
    mounted() {}
}
</script>
