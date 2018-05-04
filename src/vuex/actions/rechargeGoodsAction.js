// import { Promise } from 'es6-promise' // es6-promise babel-runtime已自动包含
import * as RechargeGoods from '../api/rechargeGoodsAPI'

/**
 * 获取充值商品列表
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getMallRechargeGoodsList = (params) => {
     return RechargeGoods._getMallRechargeGoodsList(params).then((data) => Promise.resolve(data));
}
/**
 * 获取充值商品列表
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getMallRechargeGoodsItemList = (params) => {
     return RechargeGoods._getMallRechargeGoodsItemList(params).then((data) => Promise.resolve(data));
}
/**
 * 检查商品名称是否被子占用
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const validMallRechargeGoodsGoodsName = (params) => {
     return RechargeGoods._validMallRechargeGoodsGoodsName(params).then((data) => Promise.resolve(data));
}
/**
 * 检查商品全名是否被子占用
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const validMallRechargeGoodsGoodsFullName = (params) => {
     return RechargeGoods._validMallRechargeGoodsGoodsFullName(params).then((data) => Promise.resolve(data));
}
/**
 * 删除充值商品
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const deleteMallRechargeGoods = (params) => {
     return RechargeGoods._deleteMallRechargeGoods(params).then((data) => Promise.resolve(data));
}
/**
 * 新增充值商品
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const addMallRechargeGoods = (params) => {
     return RechargeGoods._addMallRechargeGoods(params).then((data) => Promise.resolve(data));
}
/**
 * 修改充值商品
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const modifyMallRechargeGoods = (params) => {
     return RechargeGoods._modifyMallRechargeGoods(params).then((data) => Promise.resolve(data));
}
/**
 * 分页查询商品列表(充值) wbj
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getMallGoodsListForRecharge = (params) => {
     return RechargeGoods._getMallGoodsListForRecharge(params).then((data) => Promise.resolve(data));
}

/**
 * 分页查询商品品列表(活动) wbj
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getMallGoodsListForActivity = (params) => {
     return RechargeGoods._getMallGoodsListForActivity(params).then((data) => Promise.resolve(data));
}
/**
 * 分页查询赠品列表(充值) wbj
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getMallGiftListForRechargeAndActivity = (params) => {
     return RechargeGoods._getMallGiftListForRechargeAndActivity(params).then((data) => Promise.resolve(data));
}

/**
 * 查询sku商品列表 wbj
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getMallGoodsSkuListOfGoodsForRecharge = (params) => {
     return RechargeGoods._getMallGoodsSkuListOfGoodsForRecharge(params).then((data) => Promise.resolve(data));
}
/**
 * 查询sku商品列表(活动) wbj
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getMallGoodsSkuListOfGoodsForActivity = (params) => {
     return RechargeGoods._getMallGoodsSkuListOfGoodsForActivity(params).then((data) => Promise.resolve(data));
}
/**
 * 分页查询商品列表进行优惠 xwen
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getMallGoodsListForCoupon = (params) => {
     return RechargeGoods._getMallGoodsListForCoupon(params).then((data) => Promise.resolve(data));
}
/**
 * 分页查询sku商品列表进行优惠 xwen
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getMallGoodsSkuListForCoupon = (params) => {
     return RechargeGoods._getMallGoodsSkuListForCoupon(params).then((data) => Promise.resolve(data));
}

/**
 * 分页查询优惠券列表 wbj
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getMallCouponsListForRecharge = (params) => {
     return RechargeGoods._getMallCouponsListForRecharge(params).then((data) => Promise.resolve(data));
}
/**
 * 查询运营商店铺列表 wbj
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getSupplierShop = (params) => {
     return RechargeGoods._getSupplierShop(params).then((data) => Promise.resolve(data));
}