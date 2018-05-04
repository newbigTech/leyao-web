// import { Promise } from 'es6-promise' // es6-promise babel-runtime已自动包含
import * as RechargeCardAPI from '../api/rechargeCardAPI'

/**
 * 获取充值卡列表
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getMallRechargeCardList = (params) => {
     return RechargeCardAPI._getMallRechargeCardList(params).then((data) => Promise.resolve(data));
}
/**
 * 获取充值卡列表
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getMallRechargeOrderList = (params) => {
     return RechargeCardAPI._getMallRechargeOrderList(params).then((data) => Promise.resolve(data));
}
/**
 * 获取充值卡明细列表
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getMallRechargeCardItemList = (params) => {
     return RechargeCardAPI._getMallRechargeCardItemList(params).then((data) => Promise.resolve(data));
}/**
 * 获取充值卡订单列表
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getMallRechargeCardTradeList = (params) => {
     return RechargeCardAPI._getMallRechargeCardTradeList(params).then((data) => Promise.resolve(data));
}
/**
 * 删除充值卡订单
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const deleteMallRechargeCardTrade = (params) => {
     return RechargeCardAPI._deleteMallRechargeCardTrade(params).then((data) => Promise.resolve(data));
}
/**
 * 删除充值卡
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const deleteMallRechargeCard = (params) => {
     return RechargeCardAPI._deleteMallRechargeCard(params).then((data) => Promise.resolve(data));
}
/**
 * 新增充值卡
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const addMallRechargeCard = (params) => {
     return RechargeCardAPI._addMallRechargeCard(params).then((data) => Promise.resolve(data));
}
