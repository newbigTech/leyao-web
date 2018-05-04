import * as FancoRenduAPI from '../api/francoRenduAPI'

/**
 * [获取电商运营区域列表]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const querySupplierAreaVoList = (params) => FancoRenduAPI._querySupplierAreaVoList(params).then(data => Promise.resolve(data))
/**
 * [分页获取自提点列表]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getMallSelfPurchasePage = (params) => FancoRenduAPI._getMallSelfPurchasePage(params).then(data => Promise.resolve(data))
/**
 * [保存自提点设置]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const saveMallSelfPurchase = (params) => FancoRenduAPI._saveMallSelfPurchase(params).then(data => Promise.resolve(data))

/**
 * [删除自提点设置]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const delMallSelfPurchase = (params) => FancoRenduAPI._delMallSelfPurchase(params).then(data => Promise.resolve(data))
/**
 * [启用、停用自提点]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const setMallSelfPurchaseStatus = (params) => FancoRenduAPI._setMallSelfPurchaseStatus(params).then(data => Promise.resolve(data))

/**
 * [查询自提点商品列表]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const querySelfPurchaseGoodsList = (params) => FancoRenduAPI._querySelfPurchaseGoodsList(params).then(data => Promise.resolve(data))
/**
 * [保存自提点商品]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const saveSelfPurchaseGoods = (params) => FancoRenduAPI._saveSelfPurchaseGoods(params).then(data => Promise.resolve(data))
/**
 * [修改自提点商品销售价和成本价]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const saveSelfPurchaseGoodsPrice = (params) => FancoRenduAPI._saveSelfPurchaseGoodsPrice(params).then(data => Promise.resolve(data))
/**
 * [上下架自提点商品]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const saveSelfPurchaseGoodsStatus = (params) => FancoRenduAPI._saveSelfPurchaseGoodsStatus(params).then(data => Promise.resolve(data))
/**
 * [移除自提点商品]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const delSelfPurchaseGoods = (params) => FancoRenduAPI._delSelfPurchaseGoods(params).then(data => Promise.resolve(data))
/**
 * [保存自提点商品排序]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const saveSelfPurchaseGoodsSort = (params) => FancoRenduAPI._saveSelfPurchaseGoodsSort(params).then(data => Promise.resolve(data))
/**
 * [保存自提点顶部和尾部配置]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const saveSelfPurchaseJson = (params) => FancoRenduAPI._saveSelfPurchaseJson(params).then(data => Promise.resolve(data))
/**
 * [查询自提点顶部和尾部配置]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getMallSelfPurchasePageJson = (params) => FancoRenduAPI._getMallSelfPurchasePageJson(params).then(data => Promise.resolve(data))
/**
 * [更新redis]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const reloadSelfPurchasePageRedis = (params) => FancoRenduAPI._reloadSelfPurchasePageRedis(params).then(data => Promise.resolve(data))/**
 /**
 * [查询自提点下用户]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getSelfPurchaseUserPage = (params) => FancoRenduAPI._getSelfPurchaseUserPage(params).then(data => Promise.resolve(data))
 /**
 * [查询自提购月订单数列表]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getSelfPurchaseCollect = (params) => FancoRenduAPI._getSelfPurchaseCollect(params).then(data => Promise.resolve(data))
 /**
 * [分页获取自提点日订单列表]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getSelfPurchaseOrderPage = (params) => FancoRenduAPI._getSelfPurchaseOrderPage(params).then(data => Promise.resolve(data))
/**
 * [更新自提点订单统计]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const reloadPurchaseDayCollect = (params) => FancoRenduAPI._reloadPurchaseDayCollect(params).then(data => Promise.resolve(data))