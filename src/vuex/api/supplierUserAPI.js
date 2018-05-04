import http from '../../lib/utils/https'
//import { Promise } from 'es6-promise';

/**
 * 获取运营会员列表
 * @param  {[type]} param [description]
 * @return {[type]}       [description]
 */
export const _getSupplierUserList = (param) => {
    return http.post('/mall/supplier/getLySupplierUserPage', param, false).then((data) => Promise.resolve(data));
}

/**
 * [查询帮助分类集合]
 * @param  {[type]} params [description]
 * @return {[type]}         [List]
 */
export const _queryHelpClassifyList = (params) => http.post('/mall/helpController/queryHelpClassifyList', params)
/**
 * [查询帮助分类下内容集合]
 * @param  {[type]} params.classifyId [分类id]
 * @return {[type]}         [List]
 */
export const _queryHelpContentList = (params) => http.post('/mall/helpController/queryHelpContentList', params)
/**
 * [新增/修改帮助分类]
 * @param  {[type]} params.classifyId [分类id 修改]
 * @return {[type]}         [List]
 */
export const _addOrUpdateHelpClassify = (params) => http.post('/mall/helpController/addOrUpdateHelpClassify', params)
/**
 * [删除帮助分类]
 * @param  {[type]} params.classifyId [分类id 修改]
 * @return {[type]}         [List]
 */
export const _deleteHelpClassify = (params) => http.post('/mall/helpController/deleteHelpClassify', params)
/**
 * [新增/修改帮助内容]
 * @param  {[type]} params.contentId [分类id 修改]
 * @return {[type]}         [List]
 */
export const _addOrUpdateHelpContent = (params) => http.post('/mall/helpController/addOrUpdateHelpContent', params)
/**
 * [删除帮助内容]
 * @param  {[type]} params.contentId [分类id 修改]
 * @return {[type]}         [List]
 */
export const _deleteHelpContent = (params) => http.post('/mall/helpController/deleteHelpContent', params)

/**
 * [查询电商基础信息]
 * @return {[type]} [{success: true, msg: "操作成功", msgCode: 0, result: Object}]
 */
export const _getSupplierObj = () => http.post('/mall/supplier/getSupplierObj')

/**
 * [修改电商基础信息]
 * @return {[type]} [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _editSupplierObj = (params) => http.post('/mall/supplier/editSupplierObj',params)

/**
 * [验证电商名是否存在 true 存在 false 不存在]
 * @return {[type]} [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _exsitSupplierName = (params) => http.post('/mall/supplier/verifySupplierObj',params)
