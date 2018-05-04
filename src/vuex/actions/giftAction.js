import * as GiftAPI from '../api/giftAPI'
/**
 * [分页查询赠送商品]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getGiftPageList = (params) => GiftAPI._getGiftPageList(params).then(data => Promise.resolve(data))

/**
 * [新增、修改赠送商品]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const addOrUpdateGift = (params) => GiftAPI._addOrUpdateGift(params).then(data => Promise.resolve(data))
/**
 * [删除赠送商品]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const deleteGift = (params) => GiftAPI._deleteGift(params).then(data => Promise.resolve(data))
/**
 * [上下架赠送商品]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const updateGiftStatus = (params) => GiftAPI._updateGiftStatus(params).then(data => Promise.resolve(data))
/**
 * [赠送商品明细]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getMallGiftDetail = (params) => GiftAPI._getMallGiftDetail(params).then(data => Promise.resolve(data))
/**
 * [设置赠送商品库存]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const saveGiftStock = (params) => GiftAPI._saveGiftStock(params).then(data => Promise.resolve(data))
