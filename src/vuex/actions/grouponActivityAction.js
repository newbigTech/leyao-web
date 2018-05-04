import * as GrouponActivityAPI from '../api/grouponActivityAPI'

/**
 * [分页查询拼团活动]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getGrouponActivityPageList = (params) => GrouponActivityAPI._getGrouponActivityPageList(params).then(data => Promise.resolve(data))

/**
 * [新增/修改拼团活动]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const addOrUpdateGrouponActivity = (params) => GrouponActivityAPI._addOrUpdateGrouponActivity(params).then(data => Promise.resolve(data))
/**
 * [启用/停用拼团活动]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const updateGrouponActivityState = (params) => GrouponActivityAPI._updateGrouponActivityState(params).then(data => Promise.resolve(data))
/**
 * [删除拼团活动]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const delGrouponActivity = (params) => GrouponActivityAPI._delGrouponActivity(params).then(data => Promise.resolve(data))
/**
 * [分页查询开团列表]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getGrouponOpenPageList = (params) => GrouponActivityAPI._getGrouponOpenPageList(params).then(data => Promise.resolve(data))

/**
 * [查看开团详情]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getGroupOpenItemList = (params) => GrouponActivityAPI._getGroupOpenItemList(params).then(data => Promise.resolve(data))

/**
 * [分页查询拼团订单]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getMallGrouponOrderViewList = (params) => GrouponActivityAPI._queryMallGrouponOrderViewList(params).then(data => Promise.resolve(data))