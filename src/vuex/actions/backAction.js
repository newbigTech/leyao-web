import * as backAPI from '../api/backAPI'



//**************************************退件收货地址管理***********************************


/**
 * 分页查询退件收货地址
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _getBackAddressPage = (params) => {
     return backAPI._getBackAddressPage(params).then((data) => Promise.resolve(data));
}

/**
 * 增加退件地址
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _addOrUpdateBackAddress = (params) => {
     return backAPI._saveBackAddress(params).then((data) => Promise.resolve(data));
}

/**
 * 删除退件地址
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _deleteBackAddress = (params) => {
     return backAPI._deleteBackAddress(params).then((data) => Promise.resolve(data));
}

/**
 * 设置默认地址
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _setDefaultBackAddress = (params) => {
     return backAPI._setDefaultBackAddress(params).then((data) => Promise.resolve(data));
}


/**
 * 分页查询退订单数据
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _getBackOrderPage = (params) => {
     return backAPI._getBackOrderPage(params).then((data) => Promise.resolve(data));
}


/**
 * 根据Id获取退订单数据
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _getBackOrderDetail = (params) => {
     return backAPI._getBackOrderDetail(params).then((data) => Promise.resolve(data));
}


/**
 * 分页查询退订单明细数据
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _getBackOrderItemList = (params) => {
     return backAPI._getBackOrderItemList(params).then((data) => Promise.resolve(data));
}




// ==========================退款流程
/**
 * 同意退换货申请
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _passBackOrderApply= (params) => {
     return backAPI._passBackOrderApply(params).then((data) => Promise.resolve(data));
}


/**
 * 拒绝退换货申请
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _rejectBackOrderApply= (params) => {
     return backAPI._rejectBackOrderApply(params).then((data) => Promise.resolve(data));
}


/**
 * 分配取货人员
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _assignPicker= (params) => {
     return backAPI._assignPicker(params).then((data) => Promise.resolve(data));
}


/**
 * 获取取货单信息详情
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _getPickupDetail= (params) => {
     return backAPI._getPickupDetail(params).then((data) => Promise.resolve(data));
}

/**
 * 打印取货单（改变取件单的状态为：已打印）
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _printPickupRecord= (params) => {
     return backAPI._printPickupRecord(params).then((data) => Promise.resolve(data));
}


/**
 * 标记取件成功
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _markPickupSuccess= (params) => {
     return backAPI._markPickupSuccess(params).then((data) => Promise.resolve(data));
}

/**
 * 查询取件单信息分页列表
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _queryPickupPageList= (params) => {
     return backAPI._queryPickupPageList(params).then((data) => Promise.resolve(data));
}

/**
 * 查询收货信息分页列表
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _queryReceiptPageList= (params) => {
     return backAPI._queryReceiptPageList(params).then((data) => Promise.resolve(data));
}

/**
 * 获取收货信息详情
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _getReceiptDetail= (params) => {
     return backAPI._getReceiptDetail(params).then((data) => Promise.resolve(data));
}

/**
 * 验货
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _checkReceipt= (params) => {
     return backAPI._checkReceipt(params).then((data) => Promise.resolve(data));
}


/**
 * 同意退款
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _refund = (params) => {
     return backAPI._refund(params).then((data) => Promise.resolve(data));
}


/**
 * 拒绝退款
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _rejectRefund = (params) => {
     return backAPI._rejectRefund(params).then((data) => Promise.resolve(data));
}


/**
 * 同意换货，生成新订单
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _exangeGoods = (params) => {
     return backAPI._exangeGoods(params).then((data) => Promise.resolve(data));
}


/**
 * 拒绝换货
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _rejectExchange = (params) => {
     return backAPI._rejectExchange(params).then((data) => Promise.resolve(data));
}


/**
 * 获取快递信息
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _getBackExpressDetail = (params) => {
     return backAPI._getBackExpressDetail(params).then((data) => Promise.resolve(data));
}





















