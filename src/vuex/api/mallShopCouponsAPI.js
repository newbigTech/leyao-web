import http from 'src/lib/utils/https'

/**
 * 分页查询优惠券列表
 * @param  {[type]} options.couponsName    [优惠券名称] 可为空
 * @param  {[type]} options.statusCode     [优惠券状态] 可为空
 * @param  {[type]} options.createDtmStart [起始日期] 可为空
 * @param  {[type]} options.createDtmEnd   [结束日期] 可为空
 * @param  {[type]} options.pageNo         [当前页] 可为空 默认值 1
 * @param  {[type]} options.pageSize       [每页显示记录数]可为空 默认值 20
 * @return {[type]}                        [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _getMallCouponsPage = ({ couponsName, couponsType, fetchWay, couponsLimit , statusCode, deleteFlag, createDtmStart, createDtmEnd, pageNo, pageSize }) => {
    return http.post('/shop/mallCouponsController/getMallCouponsPage', 
    		{ couponsName, couponsType, fetchWay, couponsLimit, statusCode, deleteFlag, createDtmStart, createDtmEnd, pageNo, pageSize });
};

/**
 * 分页查询优惠券明细列表
 * @param  {[type]} options.couponsName    [优惠券名称] 可为空
 * @param  {[type]} options.couponsCode     [优惠券码] 可为空
 * @param  {[type]} options.statusCode     [优惠券状态] 可为空
 * @param  {[type]} options.userGetDtmStart [起始日期] 可为空
 * @param  {[type]} options.userGetDtmEnd   [结束日期] 可为空
 * @param  {[type]} options.pageNo         [当前页] 可为空 默认值 1
 * @param  {[type]} options.pageSize       [每页显示记录数]可为空 默认值 20
 * @return {[type]}                        [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _getMallCouponsItemPage = ({ couponsId,couponsCode,userAlias,couponsName, statusCode, userGetDtmStart, userGetDtmEnd, beginDay, endDay, pageNo, pageSize }) => {
    return http.post('/shop/mallCouponsController/getMallCouponsItemPage',
     { couponsId,couponsCode,userAlias,couponsName, statusCode, userGetDtmStart, userGetDtmEnd, beginDay, endDay, pageNo, pageSize });
}

/**
 * 启用优惠券
 * @param  {[type]} options.couponId [description]
 * @return {[type]}                  [description]
 */
export const _startMallCoupons = ({couponsId}) => {
    return http.post('/shop/mallCouponsController/startMallCoupons', {couponsId});
};

/**
 * 停用优惠券
 * @param  {[type]} options.couponId [description]
 * @return {[type]}                  [description]
 */
export const _stopMallCoupons = ({couponsId}) => {
    return http.post('/shop/mallCouponsController/stopMallCoupons', {couponsId});
};

/**
 * 将优惠券推送给店铺用户
 * @param  {[type]} options.couponId [description]
 * @return {[type]}                  [description]
 */
export const _pushCouponsToUser = ({couponsId,userIdStr}) => {
    return http.post('/shop/mallCouponsController/pushCouponsToUser', {couponsId,userIdStr});
};

/**
 * 增加优惠券
 * @param  {[type]} param [description]
 * @return {[type]}       [description]
 */
export const _addCoupons = (param) => {
    return http.post('/shop/mallCouponsController/addMallCoupons', param);
};

/**
 * 删除优惠券
 * @param  {[type]} param [description]
 * @return {[type]}       [description]
 */
export const _deleteCoupons = ({couponsIdStr}) => {
    return http.post('/shop/mallCouponsController/deleteMallCoupons', {couponsIdStr});
};


/**
 * 获取优惠商品列表
 * @param couponsId 优惠券Id
 * @param pageNo 第几页(不传默认1)
 * @param pageSize 页大小(不传默认20)
 */
export const _getMallCouponsGoodsPage = (param) => {
     return http.post('/shop/mallCouponsController/getMallCouponsGoodsPage', param);
}

/**
 * 查询该店铺是否是自营
 */
export const _queryShopIsMyself = () => {
     return http.post('/shop/mallCouponsController/queryShopIsMyself');
}

/**
 * 获取二维码地址
 */
export const _getMallCouponsCodeUrl = () => {
     return http.post('/shop/mallCouponsController/getMallCouponsCodeUrl');
}