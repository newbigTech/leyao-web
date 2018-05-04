import http from 'src/lib/utils/https'


//**************************************运营商发票管理***********************************

/**
 * 查询运营商发票数据
 * @param  {[type]} options.partnerCode      [运营商编码]不可为空    
 * @return {[type]}                          [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _getInvoiceStatis = () => {
    return http.post('/pay/mallPayInvoiceController/getInvoiceStatis', {});
}


/**
 * 分页查询运营商发票数据
 * @param  {[type]} options.partnerCode      [运营商编码]可为空    
 * @param  {[type]} options.status           [状态] 可为空
 * @param  {[type]} options.startTime        [开始时间]可为空    
 * @param  {[type]} options.endTime          [结束时间] 可为空 
 * @return {[type]}                          [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _getInvoicePageList = ({ status, startTime, endTime, pageNo, pageSize }) => {
    return http.post('/pay/mallPayInvoiceController/getInvoicePageList', { status, startTime, endTime, pageNo, pageSize });
};

/**
 * 获取发票申请详情
 * @param  {[type]} options.invoiceId      [发票Id]不可为空    
 * @return {[type]}                     [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _getInvoiceDetail = ({ invoiceId }) => {
    return http.post('/pay/mallPayInvoiceController/getInvoiceDetail', { invoiceId });
};

/**
 * 提交发票申请（状态为：待审核）
 * @return {[type]}                     [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _submitInvoiceApply = (param) => {
    return http.post('/pay/mallPayInvoiceController/submitInvoiceApply', param);
};

/**
 * 提交发票申请（状态为：草稿）
 * @return {[type]}                     [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _saveInvoiceApply = (param) => {
    return http.post('/pay/mallPayInvoiceController/saveInvoiceApply', param);
};

/**
 * 获取可申请的服务费的月份数据
 * @return {[type]}                     [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _getCanApplyMonthInvoice = () => {
    return http.post('/pay/mallPayInvoiceController/getCanApplyMonthInvoice', {});
};


