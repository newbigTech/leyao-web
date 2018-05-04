import http from 'src/lib/utils/https'

/**
 * [获取电商运营区域列表]
 * @param  {[type]} params [description]
 * @return {[type]}        [List Json]
 */
export const _querySupplierAreaVoList = (params) => http.post('mall/mallFrancoRendu/querySupplierAreaVoList', params)

/**
 * [分页获取自提点列表]
 * @param  {[type]} params [description]
 * @return {[type]}        [Page]
 */
export const _getMallSelfPurchasePage = (params) => http.post('mall/mallFrancoRendu/getMallSelfPurchasePage', params)
/**
 * [保存自提点设置]
 * @param  {[type]} params [description]
 *              isHot:0,
                selfSiteName:'',
                selfSitePic:'',
                selfSiteNote:'',
                province:'',
                city:'',
                area:'',
                strProvince:'',
                strCity:'',
                strArea:'',
                selfAddress:'',
                baiduAreaCode:'',
                longitude:'',
                latitude:'',
                selfScope:1000,
                virtualSelfUserNumber:0,
                virtualSelfOrderNumber:0,
                selfPhone:'',
                saleDate:[],
                orderDeadline:undefined,
                deliveryTime:[],
                selfGroupOwner:'',
                goodsShowType:0,
                selfGroupQuickMark:'',
                selfGroupOwnerQuickMark:''
 * @return {[type]}        [{success: true, msg: "操作成功", msgCode: 0, result: Object}]
 */
export const _saveMallSelfPurchase = (params) => http.post('mall/mallFrancoRendu/saveMallSelfPurchase', params)

/**
 * [启用、停用自提点]
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export const _setMallSelfPurchaseStatus = (params) => http.post('mall/mallFrancoRendu/setMallSelfPurchaseStatus', params)

/**
 * [删除自提点设置]
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export const _delMallSelfPurchase = (params) => http.post('mall/mallFrancoRendu/delMallSelfPurchase', params)

/**
 * [查询自提点商品列表]
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export const _querySelfPurchaseGoodsList = (params) => http.post('mall/mallFrancoRendu/querySelfPurchaseGoodsList', params)
/**
 * [保存自提点商品]
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export const _saveSelfPurchaseGoods = (params) => http.post('mall/mallFrancoRendu/saveSelfPurchaseGoods', params)
/**
 * [修改自提点商品销售价和成本价]
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export const _saveSelfPurchaseGoodsPrice = (params) => http.post('mall/mallFrancoRendu/saveSelfPurchaseGoodsPrice', params)
/**
 * [上下架自提点商品]
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export const _saveSelfPurchaseGoodsStatus = (params) => http.post('mall/mallFrancoRendu/saveSelfPurchaseGoodsStatus', params)
/**
 * [移除自提点商品]
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export const _delSelfPurchaseGoods = (params) => http.post('mall/mallFrancoRendu/delSelfPurchaseGoods', params)
/**
 * [保存自提点商品排序]
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export const _saveSelfPurchaseGoodsSort = (params) => http.post('mall/mallFrancoRendu/saveSelfPurchaseGoodsSort', params)
/**
 * [保存自提点顶部和尾部配置]
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export const _saveSelfPurchaseJson = (params) => http.post('mall/mallFrancoRendu/saveSelfPurchaseJson', params)
/**
 * [查询自提点顶部和尾部配置]
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export const _getMallSelfPurchasePageJson = (params) => http.post('mall/mallFrancoRendu/getMallSelfPurchasePageJson', params)

/**
 * [更新redis]
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export const _reloadSelfPurchasePageRedis = (params) => http.post('mall/mallFrancoRendu/reloadSelfPurchasePageRedis', params)
 /**
 * [查询自提点下用户]
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export const _getSelfPurchaseUserPage = (params) => http.post('mall/mallFrancoRendu/getSelfPurchaseUserPage', params)
 /**
 * [查询自提购月订单数列表]
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export const _getSelfPurchaseCollect = (params) => http.post('mall/mallFrancoRendu/getSelfPurchaseCollect', params)
 /**
 * [分页获取自提点日订单列表]
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export const _getSelfPurchaseOrderPage = (params) => http.post('mall/mallFrancoRendu/getSelfPurchaseOrderPage', params)
 /**
 * [更新自提点订单统计]
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export const _reloadPurchaseDayCollect = (params) => http.post('mall/mallFrancoRendu/reloadPurchaseDayCollect', params)