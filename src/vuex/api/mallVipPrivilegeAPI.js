import http from 'src/lib/utils/https'

/**
 * [保存会员等级特权]
 * @param  {[type]} params.privilegeType [特权类型 0 满减 1 充值返 2 网销卡返]
 * @param  {[type]} params.calculationType [特权计算类型 0 比例 1 金额]
 * @param  {[type]} params.paramsJson [会员特权json]
 * @return {[type]}        [{success: true, msg: "操作成功", msgCode: 0, result: Object}]
 */
export const _saveVipPrivilege = (params) => http.post('mall/vipPrivilege/saveVipPrivilege', params)
/**
 * [保存会员适用店铺]
 * @param  {[type]} params.paramsJson [适用店铺json]
 * @return {[type]}        [{success: true, msg: "操作成功", msgCode: 0, result: Object}]
 */
export const _saveVipPrivilegeShop = (params) => http.post('mall/vipPrivilege/saveVipPrivilegeShop', params)

/**
 * [查询电商会员特权适用店铺列表]
 * @param  {[type]} params [description]
 * @return {[type]}        [List Json]
 */
export const _queryVipPrivilegeShopList = (params) => http.post('mall/vipPrivilege/queryVipPrivilegeShopList', params)
/**
 * [查询电商会员特权列表]
 * @param  {[type]} params.privilegeType [特权类型 0 满减 1 充值返 2 网销卡返 可选 不传查询所有]
 * @return {[type]}        [List Json]
 */
export const _queryVipPrivilegeItemList = (params) => http.post('mall/vipPrivilege/queryVipPrivilegeItemList', params)
/**
 * [删除会员特权选项]
 * @param  {[type]} params.privilegeIdItemId [主键]
 * @return {[type]}        [{success: true, msg: "操作成功", msgCode: 0, result: Object}]
 */
export const _deleteVipPrivilegeItem = (params) => http.post('mall/vipPrivilege/deleteVipPrivilegeItem', params)
/**
 * [删除适用店铺]
 * @param  {[type]} params.vipShopId [主键]
 * @return {[type]}        [{success: true, msg: "操作成功", msgCode: 0, result: Object}]
 */
export const _deleteVipShop = (params) => http.post('mall/vipPrivilege/deleteVipShop', params)
/**
 * [设置会员特权状态]
 * @param  {[type]} params.privilegeId [主键]
 * @return {[type]}        [{success: true, msg: "操作成功", msgCode: 0, result: Object}]
 */
export const _updateVipPrivilegeStatusCode = (params) => http.post('mall/vipPrivilege/updateVipPrivilegeStatusCode', params)
/**
 * [删除会员特权]
 * @param  {[type]} params.privilegeId [主键]
 * @return {[type]}        [{success: true, msg: "操作成功", msgCode: 0, result: Object}]
 */
export const _deleteVipPrivilege = (params) => http.post('mall/vipPrivilege/deleteVipPrivilege', params)
