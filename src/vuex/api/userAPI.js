import http from 'src/lib/utils/https'

/**
 * 用户登录
 * @param { username: this.userName.trim(),//用户名
            password: this.password.trim(),//密码
            authcode: this.authCode.trim(),//验证码
            service: `${reqURL}/sso`//回调地址
          }
 * @return {[type]}
 * {result: true, CASTGC: "TGT-1638-EA224291136E4BC58865E8181C288ACB",
 *  ticket: "st-1-d791ecc978584b9e99a9b30582824800", msg: "登录成功"}
 */
export const _login = ({ loginType, username, password, authcode, service }) => {
    return http.post('/pub/pubController/login', { loginType, username, password, authcode, service })
};

/**
 * 获取当前登录用户信息
 * @return {[type]} {success: true, msg: "操作成功", msgCode: 0, result: Object}
 */
export const _getLoginUser = () => {
    return http._post('/pub/loginController/getLoginUser')
}

/**
 * 获取当前登录用户开通运营商集合
 * @return {[type]} [description]
 */
export const _getUserSuppliers = () => {
    return http.post('/mall/supplier/getUserSupplier')
}

/**
 * 获取用户店铺列表
 * @return {[type]} [description]
 */
export const _getUserShopList=()=>{
  return http.post('/pub/loginController/getUserShopList')
}

/**
 * 切换运营商或店铺
 * @param  {[type]} params.itemId [运营商或店铺Id]
 * @param  {[type]} params.supplierId [运营商Id]
 * @param  {[type]} params.itemName [运营商名或店铺名]
 * @return {[type]} [success: true, msg: "操作成功", msgCode: 0, result: {}]
 */
export const _updateSelected=(params)=>http.post('/pub/loginController/changeSelected',params)

/**
 * 用户列表 wbj
 * @param companyId 公司编号
 * @param userMobile 根据手机号查询(可选)
 * @param userAlias 根据用户名查询(可选)
 * @param pageNo  第几页
 * @param pageSize 页大小
 * @return {[type]}
 */
export const _getCompanyUserList = ({ companyId, userMobile, userAlias, pageNo, pageSize }) => {
    return http.post('/userMng/findList', { companyId, userMobile, userAlias, pageNo, pageSize })
};
/**
 * 移除用户出公司 wbj
 * @param companyId 公司编号
 * @param userId 用户编号
 * @return {[type]}
 */
export const _removeCompanyUser = ({ companyId, userId }) => {
    return http.post('/userMng/removeCompanyUser', { companyId, userId })
};
/**
 * 导入用户进公司 wbj
 * @param companyId 公司编号
 * @param userMobile 用户手机号
 * @return {[type]}
 */
export const _synCompanyUser = ({ companyId,companyType, userMobile }) => {
    return http.post('/userMng/synCompanyUser', { companyId,companyType, userMobile })
};
/**
 * 用户明细 wbj
 * @param userId 用户编号
 * @return {[type]}
 */
export const _getCompanyUserDetail = ({ userId }) => {
    return http.post('/userMng/getCompanyUserDetail', { userId })
};

/**
 * 修改用户 wbj
 * @param companyId 公司编号
 * @param userId 用户编号
 * @return {[type]}
 */
export const _modifyCompanyUser = ({ userId, nickName, realName, userPic, sex, birthday, province, city, area, address, strAddress }) => {
    return http.post('/userMng/modifyCompanyUser', { userId, nickName, realName, userPic, sex, birthday, province, city, area, address, strAddress })
};
/**
 * 新增用户 wbj
 * @param companyId 公司编号
 * @param userId 用户编号
 * @return {[type]}
 */
export const _addCompanyUser = ({ companyId,companyType, userMobile, userAlias, password, nickName, realName, userPic, sex, birthday, province, city, area, address, strAddress }) => {
    return http.post('/userMng/addCompanyUser', { companyId,companyType, userMobile, userAlias, password, nickName, realName, userPic, sex, birthday, province, city, area, address, strAddress })
};
/**
 * 判断用户名/手机号/邮箱是否存在 wbj
 * @param validValue 验证值
 * @param validType 验证方式 0 手机 1 用户名 2 邮箱
 * @return {[type]}
 */
export const _validUser = ({ validValue, validType }) => {
    return http.post('/userMng/validUser', { validValue, validType }, false)
};
/**
 * 回调sso
 * @param  {[type]} url 回调地址
 * @return {[type]}     [description]
 */
export const _gosso = (url) => {
    return http.get(url)
}

/**
 * 初始化系统配置参数
 * @return {[type]} [map]
 */
export const _initWebContext=()=>http.post("/pub/pubController/init")

/**
 * 验证手机号是否存在 找回密码界面调用
 * @param  {[type]} params.userMobile [手机号]
 * @return {[type]}        [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _existMobile=(params)=>http.post("pub/pubController/existMobile?r="+Math.random(),params, false)

/**
 * 验证验证码是否正确
 * @param  {[type]} params.authCode [验证码]
 * @return {[type]}        [description]
 */
export const _existAuthCode=(params)=>http.get("pub/pubController/getCode?r="+Math.random(),params, false)

/**
 * 发送手机验证码
 * @param  {[type]} params.userMobile [手机号]
 * @return {[type]}        [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _sendMobileCode=(params)=>http.post("pub/pubController/sendMobileCode?r="+Math.random(),params, false)
/**
 * 验证手机验证码
 * @param  {[type]} params.userMobile [手机号]
 * @param  {[type]} params.mobileCode [手机短信验证码]
 * @return {[type]}        [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _verifyMobileCode=(params)=>http.post("pub/pubController/verifyMobileCode?r="+Math.random(),params, false)

/**
 * 重置密码
 * @param  {[type]} params.userMobile [手机号]
 * @param  {[type]} params.mobileCode [手机短信验证码]
 * @param  {[type]} params.mobileCode [新密码]
 * @return {[type]}        [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _resetUserPassword=(params)=>http.post("pub/pubController/resetUserPassword?r="+Math.random(),params, false)
