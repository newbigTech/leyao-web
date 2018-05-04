import * as SupplierAPI from '../api/supplierUserAPI'

/**
 * [查询电商基础信息]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getSupplierObj = () => SupplierAPI._getSupplierObj().then(data => Promise.resolve(data))

/**
 * [修改电商基础信息]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const editSupplierObj = (params) => SupplierAPI._editSupplierObj(params).then(data => Promise.resolve(data))

/**
 * [验证电商名是否存在 true 存在 false 不存在]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const exsitSupplierName = (params) => SupplierAPI._exsitSupplierName(params).then(data => Promise.resolve(data))