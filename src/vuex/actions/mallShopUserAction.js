import * as MallShopUserAPI from '../api/mallShopUserAPI'

/**
 * 分页查询店铺会员
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _getMallShopMembersPage = (params) => {
     return MallShopUserAPI._getMallShopMembersPage(params).then((data) => Promise.resolve(data));
}

/**
 * 分页查询店铺购买订单的会员 added 2017-04-14
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _getMallShopOrderUserPage = (params) => {
     return MallShopUserAPI._getMallShopOrderUserPage(params).then((data) => Promise.resolve(data));
}

/**
 * 分页查询店铺用户列表
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _getMallShopUserPage = (params) => {
     return MallShopUserAPI._getMallShopUserPage(params).then((data) => Promise.resolve(data));
}

/**
 * 分页查询用户关注店铺列表
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _getConcernShopPage = (params) => {
     return MallShopUserAPI._getConcernShopPage(params).then((data) => Promise.resolve(data));
}


/**
 * 分页查询用户关注商品列表
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _getConcernGoodsPage = (params) => {
     return MallShopUserAPI._getConcernGoodsPage(params).then((data) => Promise.resolve(data));
}

/**
 * 分页查询用户关注商品列表(推用优惠券)
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _getConcernGoodsForCouponsPage = (params) => {
     return MallShopUserAPI._getConcernGoodsForCouponsPage(params).then((data) => Promise.resolve(data));
}



/**
 * 分页查询收获地址列表
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _getMallShopAddressPage = (params) => {
     return MallShopUserAPI._getMallShopAddressPage(params).then((data) => Promise.resolve(data));
}