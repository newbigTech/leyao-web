/**
 * Created by yujx on 2016/11/21.
 */

import * as ShopOrderAPI from '../api/mallShopOrderAPI'

/**
 * 查询店铺订单商品属性列表
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const findShopOrderList = (params) => ShopOrderAPI._findShopOrderList(params).then(data => Promise.resolve(data));


/**
 * [分页查询店铺订单列表 add by cypeng 20161205]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getShopOrderPageList = (params) => ShopOrderAPI._getShopOrderPageList(params).then(data => Promise.resolve(data))

/**
 * [查询订单详情]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getOrderObj = (params) => ShopOrderAPI._getOrderObj(params).then(data => Promise.resolve(data))


/**
 * [支付查询订单详情]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getOrderObjByOrderNo = (params) => ShopOrderAPI._getOrderObjByOrderNo(params).then(data => Promise.resolve(data))

/**
 * [发货操作]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const sendGoods = (params) => ShopOrderAPI._sendGoods(params).then(data => Promise.resolve(data))

/**
 * [批量发货操作]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const batchSendGoods = (params) => ShopOrderAPI._batchSendGoods(params).then(data => Promise.resolve(data))

/**
 * [备注订单]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const setOrderComments = (params) =>ShopOrderAPI._setOrderComments(params).then(data => Promise.resolve(data))

/**
 * [查询物流公司列表]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getExpressList = (params) =>ShopOrderAPI._getExpressList(params).then(data => Promise.resolve(data))

/**
 * [未支付订单改价]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const updateOrderPrice = (params) =>ShopOrderAPI._updateOrderPrice(params).then(data => Promise.resolve(data))