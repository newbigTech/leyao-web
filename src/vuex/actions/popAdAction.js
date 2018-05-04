import * as popAdAPI from '../api/popAdAPI'

/**
 * 分页查询广告弹出层
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _getPopAdPage = (params) => {
     return popAdAPI._getPopAdPage(params).then((data) => Promise.resolve(data));
}

/**
 * 增加广告弹出层
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _addOrUpdatePopAd = (params) => {
     return popAdAPI._addOrUpdatePopAd(params).then((data) => Promise.resolve(data));
}

/**
 * 删除广告弹出层
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _deleteBackPopAd = (params) => {
     return popAdAPI._deleteBackPopAd(params).then((data) => Promise.resolve(data));
}

/**
 * 启动广告弹出层
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _startBackPopAd = (params) => {
     return popAdAPI._startBackPopAd(params).then((data) => Promise.resolve(data));
}

/**
 * 停止广告弹出层
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _stopBackPopAd = (params) => {
     return popAdAPI._stopBackPopAd(params).then((data) => Promise.resolve(data));
}























