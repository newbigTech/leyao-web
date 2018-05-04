import http from 'src/lib/utils/https'

/**
 * 分页查询营销广告
 * @param  {[type]} options.adName         [广告名]可为空    
 * @param  {[type]} options.linkName       [链接名] 可为空   
 * @return {[type]}                        [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _getAdSalePage = ({ shopId, adName,  statusCode, adBeginDay, adEndDay, pageNo, pageSize }) => {
    return http.post('/mall/mallAdvertisementController/getAdSalePage', { shopId, adName, statusCode,adBeginDay, adEndDay, pageNo, pageSize });
};


/**
 * 增加营销广告
 * @return {[type]}                     [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _addOrUpdateAdSale = (param) => {
    return http.post('/mall/mallAdvertisementController/addAdSaleList', param);
};


/**
 * 删除营销广告
 * @return {[type]}                     [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _deleteBackAdSale = ({ adIds }) => {
    return http.post('/mall/mallAdvertisementController/deleteSaleAd', { adIds });
};

/**
 * 启动营销广告
 * @return {[type]}                     [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _startBackAdSale = ({ adIds }) => {
    return http.post('/mall/mallAdvertisementController/startSaleAd', { adIds });
};


/**
 * 停止营销广告
 * @return {[type]}                     [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _stopBackAdSale = ({ adIds }) => {
    return http.post('/mall/mallAdvertisementController/stopSaleAd', { adIds });
};


