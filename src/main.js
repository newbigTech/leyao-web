import "./sass/app.scss"

import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入Config
import { AppConf } from './config/config'
//启动应用
import router from './routes'
import App from './App.vue'
import store from 'src/vuex/store'

import "./lib/filters"

// ----- 为了减少打包文件大小, 使用cdn
// 饿了么前端vue2.0组件库
// http://element.eleme.io/#/component/quickstart
// import Element from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'
// Vue.use(Element)

import cardPanel from "components/card-panel"
Vue.component('card-panel', cardPanel)

/*Vue.directive('blur-price', {
  inserted: function (el, binding, vnode) {
    let _this = vnode.context.$data
    let _price = binding.value
    if (Number.isInteger(_price)) _price += ".00"
    if (_price == '') _price = "0.00"
    el.value = _price

    el.oninput = function() {
      let val = Number(el.value)
      if (isNaN(val)) return
      _this.price = Number(el.value)
    }

    el.onblur = function() {
      let val = Number(el.value)
      if (isNaN(val)) return
      if (Number.isInteger(val)) {
        el.value = val + ".00"
      } else {
        el.value += ''
      }
      _this.price = Number(el.value)
    }
  }
})*/

window.AppConf = AppConf;
router.beforeEach((to, from, next) => {
    // return next()
    let currentTokenId = localStorage.getItem('ticket')
    let ticket = store.getters.ticket
    if (ticket && currentTokenId && store.getters.ticket !== currentTokenId) {
        localStorage.setItem('ticket', currentTokenId)
        setTimeout(() => {
            location.reload()
        }, 500)
        return false
    }

    if (_.startsWith(to.path, '/userlogin')) {
        if (store.getters.loginFlag) {
            return next({ path: '/' })
        } else {
            // 验证登录
            store.dispatch('getLoginUser').then(data => {
                    // 登录通过
                    if (store.getters.loginFlag) {
                        //账号异地登录
                        let len = store.getters.userObj.menus.length
                        if (len === 1 && store.getters.userObj.menus[0].resultCode && store.getters.userObj.menus[0].resultCode == 101) {
                            alert(store.getters.userObj.menus[0].systemName)
                            window.location.href = "/logout"
                        } else {
                            return next({ path: '/' })
                        }
                    } else {
                        next()
                    }
                })
                .catch(err => {
                    console.log('login error: ', err)
                        // next({ name: 'LoginPage', query: { redirect: to.fullPath } })
                    next({ path: 'userlogin', params: { redirect: to.fullPath } })
                })
        }
    }
    // 不需要授权
    if (!to.matched.some(record => record.meta.auth)) return next()
        // 有登录标识
    if (store.getters.loginFlag) return next()

    // 验证登录
    store.dispatch('getLoginUser').then(data => {
            // 登录通过
            if (store.getters.loginFlag) {
                let len = store.getters.userObj.menus.length
                //账号异地登录
                if (len === 1 && store.getters.userObj.menus[0].resultCode && store.getters.userObj.menus[0].resultCode == 101) {
                    alert(store.getters.userObj.menus[0].systemName)
                    window.location.href = "/logout"
                } else {
                    return next()
                }
            }
            // 没有通过
            console.log('next router')
                // 注意这里使用next(path) 有bug 见: https://github.com/vuejs/vue-router/issues/856
                // 使用path似乎有效
            next({ path: 'userlogin', params: { redirect: to.fullPath } })
        })
        .catch(err => {
            console.log('login error: ', err)
                // next({ name: 'LoginPage', query: { redirect: to.fullPath } })
            next({ path: 'userlogin', params: { redirect: to.fullPath } })
        })
})

const app = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
