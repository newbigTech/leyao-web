// import { Promise } from 'es6-promise' // es6-promise babel-runtime已自动包含
import * as RechargeSaleCardAPI from '../api/rechargeSaleCardAPI'

/**
 * 获取网销卡列表
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getMallRechargeSaleCardList = (params) => {
     return RechargeSaleCardAPI._getMallRechargeSaleCardList(params).then((data) => Promise.resolve(data));
}

/**
 * 删除网销卡
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const deleteMallRechargeSaleCard = (params) => {
     return RechargeSaleCardAPI._deleteMallRechargeSaleCard(params).then((data) => Promise.resolve(data));
}
/**
 * 新增网销卡
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const addMallRechargeSaleCard = (params) => {
     return RechargeSaleCardAPI._addMallRechargeSaleCard(params).then((data) => Promise.resolve(data));
}
/**
 * 修改网销卡
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const modifyMallRechargeSaleCard = (params) => {
     return RechargeSaleCardAPI._modifyMallRechargeSaleCard(params).then((data) => Promise.resolve(data));
}
