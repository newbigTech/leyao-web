import * as UserAPI from '../api/userAPI'

//回调sso
export const gosso = (url) => {
    return UserAPI._gosso(url);
}
/**
 * 获取公司用列表
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getCompanyUserList = (params) => {
     return UserAPI._getCompanyUserList(params).then((data) => Promise.resolve(data));
}
/**
 * 移除用户出公司
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const removeCompanyUser = (params) => {
     return UserAPI._removeCompanyUser(params).then((data) => Promise.resolve(data));
}
/**
 * 导入用户进公司
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const synCompanyUser = (params) => {
     return UserAPI._synCompanyUser(params).then((data) => Promise.resolve(data));
}
/**
 * 获取公司用户明细
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getCompanyUserDetail = (params) => {
     return UserAPI._getCompanyUserDetail(params).then((data) => Promise.resolve(data));
}
/**
 * 新增公司用户
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const addCompanyUser = (params) => {
     return UserAPI._addCompanyUser(params).then((data) => Promise.resolve(data));
}
/**
 * 修改公司用户
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const modifyCompanyUser = (params) => {
     return UserAPI._modifyCompanyUser(params).then((data) => Promise.resolve(data));
}
/**
 * 验证用户名/邮箱/手机号是否存在
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const validUser = (params) => {
     return UserAPI._validUser(params).then((data) => Promise.resolve(data));
}

/**
 * 验证手机号是否存在
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const existMobile=(params)=>UserAPI._existMobile(params).then((data) => Promise.resolve(data))

/**
 * 验证验证码是否正确
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const existAuthCode=(params)=>UserAPI._existAuthCode(params).then((data) => Promise.resolve(data))

/**
 * 发送手机验证码
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const sendMobileCode=(params)=>UserAPI._sendMobileCode(params).then((data) => Promise.resolve(data))
/**
 * 验证手机验证码
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const verifyMobileCode=(params)=>UserAPI._verifyMobileCode(params).then((data) => Promise.resolve(data))
/**
 * 验证手机验证码
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const resetUserPassword=(params)=>UserAPI._resetUserPassword(params).then((data) => Promise.resolve(data))
