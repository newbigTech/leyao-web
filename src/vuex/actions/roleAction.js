// import { Promise } from 'es6-promise' // es6-promise babel-runtime已自动包含
import * as RoleAPI from '../api/roleAPI'

/**
 * 获取公司角色列表
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getCompanyRoleList = (params) => {
     return RoleAPI._getCompanyRoleList(params).then((data) => Promise.resolve(data));
}
/**
 * 删除角色
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const deleteCompanyRole = (params) => {
     return RoleAPI._deleteCompanyRole(params).then((data) => Promise.resolve(data));
}
/**
 * 获取公司角色明细
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getCompanyRoleDetail = (params) => {
     return RoleAPI._getCompanyRoleDetail(params).then((data) => Promise.resolve(data));
}
/**
 * 新增公司角色
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const addCompanyRole = (params) => {
     return RoleAPI._addCompanyRole(params).then((data) => Promise.resolve(data));
}
/**
 * 修改公司角色
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const modifyCompanyRole = (params) => {
     return RoleAPI._modifyCompanyRole(params).then((data) => Promise.resolve(data));
}
/**
 * 验证角色名是否存在
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const validCompanyRole = (params) => {
     return RoleAPI._validCompanyRole(params).then((data) => Promise.resolve(data));
}
/**
 * 角色总权限
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getCompanyRoleMenuFull = (params) => {
     return RoleAPI._getCompanyRoleMenuFull(params).then((data) => Promise.resolve(data));
}
/**
 * 角色权限
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getRoleMenu = (params) => {
     return RoleAPI._getRoleMenu(params).then((data) => Promise.resolve(data));
}
/**
 * 角色用户列表
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getCompRoleUserPageList = (params) => {
     return RoleAPI._getCompRoleUserPageList(params).then((data) => Promise.resolve(data));
}
/**
 * 添加用户到角色
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const addUserIntoRole = (params) => {
     return RoleAPI._addUserIntoRole(params).then((data) => Promise.resolve(data));
}
/**
 * 删除角色用户
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const deleteRoleUser = (params) => {
     return RoleAPI._deleteRoleUser(params).then((data) => Promise.resolve(data));
}
/**
 * 设置角色权限
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const setUserRoleMenu = (params) => {
     return RoleAPI._setUserRoleMenu(params).then((data) => Promise.resolve(data));
}
/**
 * 用户权限
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getUserPermission = (params) => {
     return RoleAPI._getUserPermission(params).then((data) => Promise.resolve(data));
}