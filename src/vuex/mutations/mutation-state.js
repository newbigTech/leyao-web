import {
  SET_USER_NAME,
  SET_LOGIN_STATE,
  SET_USER_INFO
} from './mutation-type'
export default {
  SET_USER_NAME(state, userName) {
    state.userName = userName
  },
  SET_LOGIN_TICKET(state,ticket){
    state.ticket = ticket
  },
  SET_LOGIN_STATE(state, loginFlag) {
    state.loginFlag = loginFlag
  },
  SET_USER_INFO(state, userObj) {
    state.loginUser = userObj||{}
  },
  UPDATE_SIDEBAR(state, data) {
    state.sidebarMenu = data
  },
  UPDATE_SELECTED(state, item) {
    state.loginUser.supplierID = item.supplierId
    state.loginUser.selectedName = item.itemName
    if(state.loginType==2){
      state.loginUser.shopID=item.id
    }
  },
  UPDATE_MENU_LIST(state, menusList) {
    state.loginUser.menus = menusList||[]
  },
  SET_LOGIN_TYPE(state, loginType) { //设置登录方式
    state.loginType = loginType
  },
  SET_OPEN_SYSTEM_ALL(state, v) { //设置用户是否同时开通店铺和电商
    state.openSystemAll = v
  },
  SET_SHOP_LIST(state, shopList) { //设置店铺列表
    state.loginUser.selectedList = shopList||[]
  },
  SET_QUERY_PARAMS(state,queryParams){//设置查询参数
    state.queryParams=queryParams||{}
  },
  UPDATE_SUPPLIERSHOP(state,data){
    state.shopData=data||[]
  },
  UPDATE_CLOUDSHOW_URL(state,cloudShorUrl){
    state.cloudShowUrl=cloudShorUrl
  }
}
