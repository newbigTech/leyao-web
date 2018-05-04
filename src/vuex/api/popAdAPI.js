import http from 'src/lib/utils/https'

/**
 * 分页查询广告弹出层
 * @param  {[type]} options.adName         [广告名]可为空    
 * @param  {[type]} options.linkName       [链接名] 可为空   
 * @return {[type]}                        [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _getPopAdPage = ({ adName, linkName, statusCode, pageNo, pageSize }) => {
    return http.post('/mall/mallPopAdController/getPopAdPage', { adName, linkName, statusCode, pageNo, pageSize });
};


/**
 * 增加广告弹出层
 * @return {[type]}                     [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _addOrUpdatePopAd = (param) => {
    return http.post('/mall/mallPopAdController/addPopAdList', param);
};


/**
 * 删除广告弹出层
 * @return {[type]}                     [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _deleteBackPopAd = ({ adIds }) => {
    return http.post('/mall/mallPopAdController/deletePopAd', { adIds });
};

/**
 * 启动广告弹出层
 * @return {[type]}                     [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _startBackPopAd = ({ adIds }) => {
    return http.post('/mall/mallPopAdController/startPopAd', { adIds });
};


/**
 * 停止广告弹出层
 * @return {[type]}                     [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _stopBackPopAd = ({ adIds }) => {
    return http.post('/mall/mallPopAdController/stopPopAd', { adIds });
};


