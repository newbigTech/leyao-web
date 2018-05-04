import * as VipPrivilegeAPI from '../api/mallVipPrivilegeAPI'

/**
 * [保存会员等级特权]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const saveVipPrivilege = (params) => VipPrivilegeAPI._saveVipPrivilege(params).then(data => Promise.resolve(data))
/**
 * [保存会员适用店铺]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const saveVipPrivilegeShop = (params) => VipPrivilegeAPI._saveVipPrivilegeShop(params).then(data => Promise.resolve(data))
/**
 * [查询电商会员特权适用店铺列表]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const queryVipPrivilegeShopList = (params) => VipPrivilegeAPI._queryVipPrivilegeShopList(params).then(data => Promise.resolve(data))
/**
 * [查询电商会员特权列表]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const queryVipPrivilegeItemList = (params) => VipPrivilegeAPI._queryVipPrivilegeItemList(params).then(data => Promise.resolve(data))
/**
 * [删除会员特权选项]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const deleteVipPrivilegeItem = (params) => VipPrivilegeAPI._deleteVipPrivilegeItem(params).then(data => Promise.resolve(data))
/**
 * [删除适用店铺]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const deleteVipShop = (params) => VipPrivilegeAPI._deleteVipShop(params).then(data => Promise.resolve(data))
/**
 * [设置会员特权状态]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const updateVipPrivilegeStatusCode = (params) => VipPrivilegeAPI._updateVipPrivilegeStatusCode(params).then(data => Promise.resolve(data))
/**
 * [删除会员特权]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const deleteVipPrivilege = (params) => VipPrivilegeAPI._deleteVipPrivilege(params).then(data => Promise.resolve(data))
