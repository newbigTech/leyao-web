/**
 * Created by yujx on 2016/11/21.
 */
import http from 'src/lib/utils/https'

/**
 * 店铺订单查询
 * 
 * @param pageNum 请求页
 * @param pageSize 每页大小
 * @param createDtmStart 起始日期
 * @param createDtmEnd 结束日期
 * @param orderCodes 交易状态集合
 * @param goodsName 商品名称
 * @param userName 客户名称
 * @param payStatus 支付状态
 * @param orderNo 订单号码
 * 
 * @private
 */
export const _findShopOrderList = ({ pageNum, pageSize, createDtmStart, createDtmEnd, orderCodes, goodsName, userMobile, payStatus, orderNo }) => {
    return http.post('/shop/mallShopOrder/orderList', { pageNum, pageSize, createDtmStart, createDtmEnd, orderCodes, goodsName, userMobile, payStatus, orderNo });
};

/**
 * [分页查询店铺订单列表 add by cypeng 20161205]
 * @param  {[type]} params.pageNo [当前页 默认1]
 * @param  {[type]} params.pageSize [每页显示记录数 默认20]
 * @param  {[type]} params.shopId [店铺Id]
 * @param  {[type]} params.startDateTime [下单开始时间]
 * @param  {[type]} params.endDateTime [下单结束时间]
 * @param  {[type]} params.orderNo [订单号]
 * @param  {[type]} params.payStatus [支付状态 0 未支付 1 已支付]
 * @param  {[type]} params.orderCode [订单状态 1 待确认 2 已确认 3 未支付 4 已支付 5 已发货 6 已完成 99 已取消]
 * @param  {[type]} params.packStatus [包装状态 根据店铺设置 只在2已确认/4已支付 到 5已发货中间环节流转]
 * @return {[type]}        [List json]
 */
export const _getShopOrderPageList = (params) => http.post('/shop/mallShopOrder/getShopOrderPageList', params)

/**
 * [发货操作]
 * @param  {[type]} params.orderId [订单号]
 * @return {[type]}        [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _sendGoods = (params) => http.post('/shop/mallShopOrder/sendGoods', params)

/**
 * [发货操作]
 * @param  {[type]} params.orderIds [订单号 多个以逗号隔开]
 * @return {[type]}        [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _batchSendGoods = (params) => http.post('/shop/mallShopOrder/batchSendGoods', params)

/**
 * [查询订单详情]
 * @param  {[type]} params.orderId [订单Id]
 * @return {[type]}        [{success: true, msg: "操作成功", msgCode: 0, result: Object}]
 */
export const _getOrderObj = (params) => http.post('/shop/mallShopOrder/getOrderObj', params)

/**
 * [支付查询订单详情]
 * @param  {[type]} params.orderId [订单Id]
 * @return {[type]}        [{success: true, msg: "操作成功", msgCode: 0, result: Object}]
 */
export const _getOrderObjByOrderNo = (params) => http.post('/shop/mallShopOrder/getOrderObjByOrderNo', params)

/**
 * [备注订单]
 * @param  {[type]} params.orderId [订单Id]
 * @param  {[type]} params.comments [备注信息]
 * @return {[type]}        [{success: true, msg: "操作成功", msgCode: 0, result: Object}]
 */
export const _setOrderComments = (params) => http.post('/shop/mallShopOrder/setOrderComments', params)

/**
 * [查询物流公司列表]
 * @return {[type]}        [List]
 */
export const _getExpressList = (params) => http.post('/shop/mallShopOrder/getExpressList', params)

/**
 * [未支付订单改价]
 * @param  {[type]} params.orderId [订单号]
 * @param  {[type]} params.afterPrice [订单总价优惠金额]
 * @param  {[type]} params.postPrice [运费优惠金额]
 * @param  {[type]} params.alterPriceNote [优惠原因]
 * @return {[type]}        [{success: true, msg: "操作成功", msgCode: 0, result: Object}]
 */
export const _updateOrderPrice = (params) => http.post('/shop/mallShopOrder/updateOrderPrice', params)