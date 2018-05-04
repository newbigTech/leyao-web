import * as adSaleAPI from '../api/adSaleAPI'

/**
 * 分页查询营销广告
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _getAdSalePage = (params) => {
     return adSaleAPI._getAdSalePage(params).then((data) => Promise.resolve(data));
}

/**
 * 增加营销广告
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _addOrUpdateAdSale = (params) => {
     return adSaleAPI._addOrUpdateAdSale(params).then((data) => Promise.resolve(data));
}

/**
 * 删除营销广告
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _deleteBackAdSale = (params) => {
     return adSaleAPI._deleteBackAdSale(params).then((data) => Promise.resolve(data));
}

/**
 * 启动营销广告
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _startBackAdSale = (params) => {
     return adSaleAPI._startBackAdSale(params).then((data) => Promise.resolve(data));
}

/**
 * 停止营销广告
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _stopBackAdSale = (params) => {
     return adSaleAPI._stopBackAdSale(params).then((data) => Promise.resolve(data));
}























