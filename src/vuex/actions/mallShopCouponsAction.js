import * as MallShopCouponsAPI from '../api/mallShopCouponsAPI'

/**
 * 获取优惠券列表
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _getMallCouponsPage = (params) => {
     return MallShopCouponsAPI._getMallCouponsPage(params).then((data) => Promise.resolve(data));
}

/**
 * 获取优惠券明细列表
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _getMallCouponsItemPage = (params) => {
     return MallShopCouponsAPI._getMallCouponsItemPage(params).then((data) => Promise.resolve(data));
}

/**
 * 启用优惠券
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _startMallCoupons = (params) => {
     return MallShopCouponsAPI._startMallCoupons(params).then((data) => Promise.resolve(data));
}

/**
 * 停用优惠券
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _stopMallCoupons = (params) => {
     return MallShopCouponsAPI._stopMallCoupons(params).then((data) => Promise.resolve(data));
}

/**
 * 将优惠券推送给店铺用户
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _pushCouponsToUser = (params) => {
     return MallShopCouponsAPI._pushCouponsToUser(params).then((data) => Promise.resolve(data));
}

/**
 * 增加优惠券
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _addCoupons = (params) => {
     return MallShopCouponsAPI._addCoupons(params).then((data) => Promise.resolve(data));
}

/**
 * 删除优惠券
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _deleteCoupons = (params) => {
     return MallShopCouponsAPI._deleteCoupons(params).then((data) => Promise.resolve(data));
}


/**
 * 获取优惠商品列表
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _getMallCouponsGoodsPage = (params) => {
     return MallShopCouponsAPI._getMallCouponsGoodsPage(params).then((data) => Promise.resolve(data));
}


/**
 * 查询该店铺是否是自营
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _queryShopIsMyself = () => {
     return MallShopCouponsAPI._queryShopIsMyself().then((data) => Promise.resolve(data));
}


/**
 * 获取二维码地址
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _getMallCouponsCodeUrl = () => {
     return MallShopCouponsAPI._getMallCouponsCodeUrl().then((data) => Promise.resolve(data));
}