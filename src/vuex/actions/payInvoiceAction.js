import * as payInvoiceAPI from '../api/payInvoiceAPI'



//**************************************运营商发票管理***********************************
/**
 * 查询运营商发票数据
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _getInvoiceStatis = () => {
     return payInvoiceAPI._getInvoiceStatis().then((data) => Promise.resolve(data));
}

/**
 * 分页查询运营商发票数据
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _getInvoicePageList = (params) => {
     return payInvoiceAPI._getInvoicePageList(params).then((data) => Promise.resolve(data));
}

/**
 * 获取发票申请详情
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _getInvoiceDetail = (params) => {
     return payInvoiceAPI._getInvoiceDetail(params).then((data) => Promise.resolve(data));
}

/**
 * 提交发票申请（状态为：草稿）
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _saveInvoiceApply = (params) => {
     return payInvoiceAPI._saveInvoiceApply(params).then((data) => Promise.resolve(data));
}


/**
 * 提交发票申请（状态为：待审核）
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _submitInvoiceApply = (params) => {
     return payInvoiceAPI._submitInvoiceApply(params).then((data) => Promise.resolve(data));
}


/**
 * 获取可申请的服务费的月份数据
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _getCanApplyMonthInvoice = () => {
     return payInvoiceAPI._getCanApplyMonthInvoice().then((data) => Promise.resolve(data));
}

