// import { Promise } from 'es6-promise' // es6-promise babel-runtime已自动包含
import * as GoodsVoucherAPI from '../api/goodsVoucherAPI'

/**
 * 获取商品评论列表
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getMallGoodsVoucherList = (params) => {
     return GoodsVoucherAPI._getMallGoodsVoucherList(params).then((data) => Promise.resolve(data));
}
/**
 * 修改商品评论
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const modifyMallGoodsVoucher = (params) => {
     return GoodsVoucherAPI._modifyMallGoodsVoucher(params).then((data) => Promise.resolve(data));
}
/**
 * 删除商品评论
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const deleteMallGoodsVoucher = (params) => {
     return GoodsVoucherAPI._deleteMallGoodsVoucher(params).then((data) => Promise.resolve(data));
}
/**
 * 回复评论
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const addMallGoodsVoucherReply = (params) => {
     return GoodsVoucherAPI._addMallGoodsVoucherReply(params).then((data) => Promise.resolve(data));
}
/**
 * 获取商品评论回复列表
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getMallGoodsVoucherReplyList = (params) => {
     return GoodsVoucherAPI._getMallGoodsVoucherReplyList(params).then((data) => Promise.resolve(data));
}