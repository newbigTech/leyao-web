import http from 'src/lib/utils/https'

/**
 * 分页查询业务员
 * @return {[type]}                        [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _getPromotionPage = ({ fullName , beginDay, endDay, pageNo, pageSize }) => {
    return http.post('/mall/mallPromotionerController/getPromoyionerPage', { fullName , beginDay, endDay, pageNo, pageSize });
};

/**
 * 不分页查询业务员 
 * @return {[type]}                        [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _getPromotionList = ({ fullName }) => {
    return http.post('/mall/mallPromotionerController/getPromoyionerList', { fullName });
};


/**
 * 增加业务员
 * @return {[type]}                     [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _addOrUpdatePromotion = (param) => {
    return http.post('/mall/mallPromotionerController/addOrUpdatePromotion', param);
};
