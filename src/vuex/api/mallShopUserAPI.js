import http from 'src/lib/utils/https'

/**
 * 分页查询店铺会员
 * @param  {[type]} options.shopId         [店铺Id]
 * @param  {[type]} options.typeFlag       [查询条件] 可为空
 * @param  {[type]} options.typeContent    [查询内容] 可为空
 * @param  {[type]} options.createDtmStart [起始日期] 可为空
 * @param  {[type]} options.createDtmEnd   [结束日期] 可为空
 * @param  {[type]} options.usableFlag     [领取标识] 可为空
 * @param  {[type]} options.couponsId      [优惠券Id] 可为空
 * @param  {[type]} options.lastDtmStart   [最后访问起始日期] 可为空
 * @param  {[type]} options.lastDtmEnd     [最后访问结束日期] 可为空
 * @param  {[type]} options.pageNo         [当前页] 可为空 默认值 1
 * @param  {[type]} options.pageSize       [每页显示记录数]可为空 默认值 20
 * @return {[type]}                        [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _getMallShopMembersPage = ({ shopId, typeFlag, typeContent, createDtmStart, createDtmEnd, usableFlag, couponsId,lastDtmStart,lastDtmEnd, pageNo, pageSize }) => {
    return http.post('/shop/mallShopUserController/getMallShopUserPage', 
    		{ shopId, typeFlag, typeContent, createDtmStart, createDtmEnd, usableFlag, couponsId,lastDtmStart,lastDtmEnd, pageNo, pageSize });
};

/**
 * 分页查询店铺购买订单的会员 207-04-14
 * @param  {[type]} options.orderDtmStart  [下单起始时间]
 * @param  {[type]} options.orderDtmEnd    [下单结束时间] 可为空
 * @param  {[type]} options.queryType      [查询类型] 可为空
 * @param  {[type]} options.goodsId        [商品Id] 可为空
 * @param  {[type]} options.num            [查询数量] 可为空
 * @param  {[type]} options.pageNo         [当前页] 可为空 默认值 1
 * @param  {[type]} options.pageSize       [每页显示记录数]可为空 默认值 20
 * @return {[type]}                        [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _getMallShopOrderUserPage = ({ orderDtmStart, orderDtmEnd, queryType, goodsId, num,pageNo, pageSize }) => {
    return http.post('/shop/mallShopUserController/getMallShopOrderUserPage', 
    		{ orderDtmStart, orderDtmEnd, queryType, goodsId, num, pageNo, pageSize });
};


/**
 * 分页查询店铺用户列表
 * @param  {[type]} options.shopId         [店铺Id]
 * @param  {[type]} options.userAlias      [用户名称] 可为空
 * @param  {[type]} options.userMobile     [用户电话] 可为空
 * @param  {[type]} options.createDtmStart [起始日期] 可为空
 * @param  {[type]} options.createDtmEnd   [结束日期] 可为空
 * @param  {[type]} options.usableFlag     [领取标识] 可为空
 * @param  {[type]} options.couponsId      [优惠券Id] 可为空
 * @param  {[type]} options.lastDtmStart   [最后访问起始日期] 可为空
 * @param  {[type]} options.lastDtmEnd     [最后访问结束日期] 可为空
 * @param  {[type]} options.pageNo         [当前页] 可为空 默认值 1
 * @param  {[type]} options.pageSize       [每页显示记录数]可为空 默认值 20
 * @return {[type]}                        [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _getMallShopUserPage = ({ shopId, userAlias, userMobile, createDtmStart, createDtmEnd, usableFlag, couponsId,lastDtmStart,lastDtmEnd, pageNo, pageSize }) => {
    return http.post('/shop/mallShopUserController/getMallShopUserPage', 
    		{ shopId, userAlias, userMobile, createDtmStart, createDtmEnd, usableFlag, couponsId,lastDtmStart,lastDtmEnd, pageNo, pageSize });
};

/**
 * 分页查询用户关注店铺列表
 * @param  {[type]} options.userAlias      [用户名称] 可为空
 * @param  {[type]} options.userMobile     [用户电话] 可为空
 * @param  {[type]} options.usableFlag     [领取标识] 可为空
 * @param  {[type]} options.couponsId      [优惠券Id] 可为空
 * @param  {[type]} options.createDtmStart [起始日期] 可为空
 * @param  {[type]} options.createDtmEnd   [结束日期] 可为空
 * @param  {[type]} options.lastDtmStart   [最后访问起始日期] 可为空
 * @param  {[type]} options.lastDtmEnd     [最后访问结束日期] 可为空
 * @param  {[type]} options.pageNo         [当前页] 可为空 默认值 1
 * @param  {[type]} options.pageSize       [每页显示记录数]可为空 默认值 20
 * @return {[type]}                    [description]
 */
export const _getConcernShopPage = ({ userAlias, userMobile, createDtmStart, createDtmEnd, usableFlag, couponsId,lastDtmStart,lastDtmEnd, pageNo, pageSize }) => {
    return http.post('/shop/mallShopUserController/getConcernShopPage', { userAlias, userMobile, createDtmStart, createDtmEnd, usableFlag, couponsId,lastDtmStart,lastDtmEnd, pageNo, pageSize });
}


/**
 * 分页查询用户关注商品列表
 * @param  {[type]} options.userAlias      [用户名称] 可为空
 * @param  {[type]} options.goodsName      [商品名称] 可为空
 * @param  {[type]} options.userMobile     [用户电话] 可为空
 * @param  {[type]} options.usableFlag     [领取标识] 可为空
 * @param  {[type]} options.couponsId      [优惠券Id] 可为空
 * @param  {[type]} options.pageNo         [当前页] 可为空 默认值 1
 * @param  {[type]} options.pageSize       [每页显示记录数]可为空 默认值 20
 * @return {[type]}                    [description]
 */
export const _getConcernGoodsPage = ({ userId, goodsName, userAlias, userMobile, usableFlag, couponsId, createDtmStart, createDtmEnd, pageNo, pageSize }) => {
    return http.post('/shop/mallShopUserController/getConcernGoodsPage', { userId, goodsName, userAlias, userMobile, usableFlag, couponsId, createDtmStart, createDtmEnd, pageNo, pageSize });
}

/**
 * 分页查询用户关注商品列表（优惠券推用）
 * @param  {[type]} options.userAlias      [用户名称] 可为空
 * @param  {[type]} options.goodsName      [商品名称] 可为空
 * @param  {[type]} options.userMobile     [用户电话] 可为空
 * @param  {[type]} options.usableFlag     [领取标识] 可为空
 * @param  {[type]} options.couponsId      [优惠券Id] 可为空
 * @param  {[type]} options.createDtmStart [起始日期] 可为空
 * @param  {[type]} options.createDtmEnd   [结束日期] 可为空
 * @param  {[type]} options.lastDtmStart   [最后访问起始日期] 可为空
 * @param  {[type]} options.lastDtmEnd     [最后访问结束日期] 可为空
 * @param  {[type]} options.pageNo         [当前页] 可为空 默认值 1
 * @param  {[type]} options.pageSize       [每页显示记录数]可为空 默认值 20
 * @return {[type]}                    [description]
 */
export const _getConcernGoodsForCouponsPage = ({ userAlias, goodsName, userMobile,usableFlag, couponsId, createDtmStart, createDtmEnd,lastDtmStart,lastDtmEnd, pageNo, pageSize }) => {
    return http.post('/shop/mallShopUserController/getConcernGoodsForCouponsPage', { userAlias, goodsName, userMobile,usableFlag, couponsId, createDtmStart, createDtmEnd,lastDtmStart,lastDtmEnd, pageNo, pageSize });
}


/**
 * 分页查询收货地址列表
 * @param  {[type]} options.adName      [用户名称] 可为空
 * @param  {[type]} options.adPhone     [用户电话] 可为空
 * @param  {[type]} options.pageNo         [当前页] 可为空 默认值 1
 * @param  {[type]} options.pageSize       [每页显示记录数]可为空 默认值 20
 * @return {[type]}                        [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _getMallShopAddressPage = ({userId, adName, adPhone, pageNo, pageSize }) => {
    return http.post('/shop/mallShopUserController/getShopUserAddressPage', 
    		{userId, adName, adPhone, pageNo, pageSize });
};