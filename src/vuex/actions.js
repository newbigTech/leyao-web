/**
 * 此文件用于多组件共享公共状态数据使用，其它业务不在此处理
 */
import * as UserAPI from './api/userAPI'
import {
    SET_USER_NAME,
    SET_LOGIN_STATE,
    SET_USER_INFO
}
from './mutations/mutation-type'
import { getSupplierShopPageList } from 'actions/shopAction'

export default {
  login: ({ commit }, params) => { //用户登录
    return UserAPI._login(params).then((data) => {
      const { result, ticket, msg } = data
      if (result) {
        commit(SET_LOGIN_STATE, true)
        localStorage.setItem('ticket', ticket)
        commit('SET_LOGIN_TICKET', ticket)
      }
      return Promise.resolve(data)
    });
  },
  getLoginUser: ({ commit }) => { //获取用户信息
    return UserAPI._getLoginUser().then((data) => {
      const {success, result, msgCode, msg } = data
      if (success) {
        let { userAlias, userMobile, loginType,openSystemAll } = result
        commit('SET_LOGIN_TICKET', localStorage.getItem('ticket'))
        commit(SET_LOGIN_STATE, true)
        commit(SET_USER_NAME, userAlias)
        commit(SET_USER_INFO, result)
        commit('SET_LOGIN_TYPE', parseInt(loginType))
        commit('SET_OPEN_SYSTEM_ALL', openSystemAll)
      } else {
        commit(SET_LOGIN_STATE, false)
        commit(SET_USER_NAME, '')
        commit(SET_USER_INFO, {})
      }
      return Promise.resolve(data)
    });
  },
  updateSelected: ({ commit },params) => {
    return UserAPI._updateSelected(params).then((data) => {
      commit('UPDATE_SELECTED', params)
      commit('UPDATE_MENU_LIST', data)
      return Promise.resolve(data)
    });
  },
  updateSupplierShopPageList:({commit})=>{
      let params={
        pageNo:1,
        pageSize:1000
      }
      getSupplierShopPageList(params).then(data => {
        commit('UPDATE_SUPPLIERSHOP', data.rows)
        return Promise.resolve(data)
    })
  },
  initWebContext:({commit})=>{
    UserAPI._initWebContext().then(data=>{
      commit('UPDATE_CLOUDSHOW_URL',data.cloudShowUrl)
    })
  }
}
