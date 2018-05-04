import * as promotionAPI from '../api/promotionAPI'

/**
 * 分页查询充值统计
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _getPromotionPage = (params) => {
     return promotionAPI._getPromotionPage(params).then((data) => Promise.resolve(data));
}


/**
 * 不分页查询充值统计
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _getPromotionList = (params) => {
     return promotionAPI._getPromotionList(params).then((data) => Promise.resolve(data));
}


















