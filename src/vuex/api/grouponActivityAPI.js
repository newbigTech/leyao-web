import http from 'lib/utils/https'

/**
 * [分页查询拼团活动]
 * @param  {[type]} params.activityName [活动名称]
 * @param  {[type]} params.goodsName [商品名称]
 * @return {[type]}        [Page]
 */
export const _getGrouponActivityPageList = (params) => http.post('mall/grouponActivity/getGrouponActivityPageList',params)

/**
 * [新增/修改拼团活动]
 * @param  {[type]} params.activityName [拼团活动名称]
 * @param  {[type]} params.activityType [拼团活动类型 0:关闭 1：开启 [0]:普通团 [1]:定点团 [2]:一人成团]
 * @param  {[type]} params.beginDtm [促销开始时间]
 * @param  {[type]} params.endDtm [促销结束时间]
 * @param  {[type]} params.goodsId [拼团商品]
 * @param  {[type]} params.activityName [拼团活动名称]
 * @param  {[type]} params.activityName [拼团活动名称]
 * @return {[type]}        [{success: true, msg: "操作成功", msgCode: 0, result: Object}]
 */
export const _addOrUpdateGrouponActivity = (params) => http.post('mall/grouponActivity/addOrUpdateGrouponActivity',params)
/**
 * [启用/停用拼团活动]
 * @param  {[type]} params.activityIds [活动id 多个以逗号隔开]
 * @param  {[type]} params.statusCode [活动状态 0 初始化 1 启用中 2 停用 3 已过期]
 * @return {[type]}        [{success: true, msg: "操作成功", msgCode: 0, result: Object}]
 */
export const _updateGrouponActivityState = (params) => http.post('mall/grouponActivity/updateGrouponActivityState',params)

/**
 * [删除拼团活动]
 * @param  {[type]} params.activityIds [活动id 多个以逗号隔开]
 * @return {[type]}        [{success: true, msg: "操作成功", msgCode: 0, result: Object}]
 */
export const _delGrouponActivity = (params) => http.post('mall/grouponActivity/delGrouponActivity',params)

/**
 * 分页查询开团列表
 * @param  {[type]} params [pageNo:当前页 默认1]
 *                         [pageSize:每页显示记录数 默认20]
 *                         [goodsName:商品名称 可空]
 *                         [activityName:活动全称]
 * @return {[type]}        [{success: true, msg: "操作成功", msgCode: 0, result: Object}]
 */
export const _getGrouponOpenPageList = (params) => http.post('mall/grouponActivity/getGrouponOpenPageList',params)

/**
 * [查看开团详情]
 * @param  {[type]} params.grouponId [开团编号]
 * @return {[type]}        [List]
 */
export const _getGroupOpenItemList = (params) => http.post('mall/grouponActivity/getGroupOpenItemList',params)

/**
 * 分页查询拼团订单
 * @param  {[type]} params.orderNo [订单号]
 * @return {[type]}        [List]
 */
export const _queryMallGrouponOrderViewList = (params) => http.post('mall/grouponActivity/queryMallGrouponOrderViewList',params)