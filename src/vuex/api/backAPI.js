import http from 'src/lib/utils/https'


//**************************************退件收货地址管理***********************************


/**
 * 分页查询退件收货地址数据
 * @param  {[type]} options.strAddress         [退件收货地址]可为空    
 * @param  {[type]} options.receiverUserName   [收件人] 可为空
 * @param  {[type]} options.mobilePhone        [联系电话]可为空    
 * @return {[type]}                            [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _getBackAddressPage = ({ strAddress, receiverUserName, mobilePhone, isDefault, pageNo, pageSize }) => {
    return http.post('/mall/mallBackAddressController/getBackAddressPage', { strAddress, receiverUserName, mobilePhone, isDefault, pageNo, pageSize });
};

/**
 * 获取退件收货地址详情
 * @param  {[type]} options.backAddressId      [收货地址Id]不可为空    
 * @return {[type]}                     [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _getBackAddressDetail = ({ backAddressId }) => {
    return http.post('/mall/mallBackAddressController/getBackAddressDetail', { backAddressId });
};

/**
 * 提交退件收货地址
 * @return {[type]}                     [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _saveBackAddress = (param) => {
    return http.post('/mall/mallBackAddressController/addOrUpdateMallBackAddress', param);
};

/**
 * 设置默认地址
 * @return {[type]}                     [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _setDefaultBackAddress = ({ backAddressId }) => {
    return http.post('/mall/mallBackAddressController/setDefaultBackAddress', { backAddressId });
};

/**
 * 删除退订地址
 * @return {[type]}                     [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _deleteBackAddress = ({ backAddressId }) => {
    return http.post('/mall/mallBackAddressController/deleteBackAddress', { backAddressId });
};




/**
 * 分页查询退件收货地址数据
 * @param  {[type]} options.backType         [退换货方式]可为空    
 * @param  {[type]} options.backOrderType    [退订单类型] 可为空
 * @param  {[type]} options.userAlias        [客户]可为空  
 * @param  {[type]} options.orderNo          [订单号]可为空    
 * @param  {[type]} options.backOrderNo      [退订单号] 可为空
 * @param  {[type]} options.startTime        [开始时间]可为空
 * @param  {[type]} options.endTime          [结束时间]可为空
 * @param  {[type]} options.statusCode       [退订单状态]可为空
 * @param  {[type]} options.pageNo           [当前页]可为空
 * @param  {[type]} options.pageSize         [页面大小]可为空      
 * @return {[type]}                          [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _getBackOrderPage = ({ backType, backOrderType,userAlias, orderNo, 
									backOrderNo,startTime,endTime,statusCode, flag, pageNo, pageSize }) => {
    return http.post('/mall/mallBackOrderController/getBackOrderPage', 
    	{ backType, backOrderType,userAlias, orderNo, backOrderNo,startTime, endTime, statusCode, flag, pageNo, pageSize });
};


/**
 * 根据Id获取退订单数据
 * @param  {[type]} options.backOrderId         [退订单Id]不可为空    
 * @return {[type]}                          [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _getBackOrderDetail = ({ backOrderId }) => {
    return http.post('/mall/mallBackOrderController/getBackOrderDetail', { backOrderId });
};


/**
 * 分页查询退件收货地址数据
 * @param  {[type]} options.backOrderId         [退订单Id]不可为空    
 * @return {[type]}                          [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _getBackOrderItemList = ({ backOrderId }) => {
    return http.post('/mall/mallBackOrderController/getBackOrderItemList', { backOrderId });
};




// ==========================退款流程
/**
 * 同意退换货申请
 * @param  {[type]} options.backOrderId         [退订单Id]不可为空    
 * @param  {[type]} options.returnType          [是否需要退回商品]不可为空 
 * @return {[type]}                          [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _passBackOrderApply = ({ backOrderId, returnType }) => {
    return http.post('/mall/mallBackOrderController/passBackOrderApply', { backOrderId, returnType });
};

/**
 * 拒绝退换货申请
 * @param  {[type]} options.backOrderId         [退订单Id]不可为空    
 * @return {[type]}                          [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _rejectBackOrderApply = ({ backOrderId }) => {
    return http.post('/mall/mallBackOrderController/rejectBackOrderApply', { backOrderId});
};

/**
 * 分配取货人员
 * @param  {[type]} options.backOrderId               [退订单Id]不可为空  
 * @param  {[type]} options.pickerName                [取件人姓名]不可为空 
 * @param  {[type]} options.pickerMobilePhone         [取件人电话]不可为空 
 * @param  {[type]} options.note                      [备注]可为空   
 * @return {[type]}                          [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _assignPicker = ({ backOrderId,pickerName,pickerMobilePhone,note }) => {
    return http.post('/mall/mallBackOrderController/assignPicker', { backOrderId,pickerName,pickerMobilePhone,note });
};


/**
 * 获取取货单信息详情
 * @param  {[type]} options.backOrderId               [退订单Id]不可为空  
 * @return {[type]}                          [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _getPickupDetail = ({ backOrderId }) => {
    return http.post('/mall/mallBackOrderController/getPickupDetail', { backOrderId });
};


/**
 * 打印取货单（改变取件单的状态为：已打印）
 * @param  {[type]} options.backOrderId               [退订单Id]不可为空   
 * @return {[type]}                          [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _printPickupRecord = ({ backOrderId }) => {
    return http.post('/mall/mallBackOrderController/printPickupRecord', { backOrderId });
};


/**
 * 标记取件成功
 * @param  {[type]} options.backOrderId               [退订单Id]不可为空   
 * @return {[type]}                          [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _markPickupSuccess = ({ backOrderId }) => {
    return http.post('/mall/mallBackOrderController/markPickupSuccess', { backOrderId });
};


/**
 * 查询取件单信息分页列表              
 * @return {[type]}                          [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _queryPickupPageList = ( params ) => {
    return http.post('/mall/mallBackOrderController/queryPickupPageList', params);
};

/**
 * 查询收货信息分页列表              
 * @return {[type]}                          [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _queryReceiptPageList = ( params ) => {
    return http.post('/mall/mallBackOrderController/queryReceiptPageList', params);
};


/**
 * 获取收货信息详情
 * @param  {[type]} options.backOrderId                
 * @return {[type]}                          [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _getReceiptDetail = ( { backOrderId } ) => {
    return http.post('/mall/mallBackOrderController/getReceiptDetail', { backOrderId });
};

/**
 * 验货
 * @return {[type]}                          [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _checkReceipt = (param) => {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: '/mall/mallBackOrderController/checkReceipt',
            type: 'POST',
            data: param,
            dataType: 'json',
            contentType:'application/json;charset=utf-8',
            timeout: process.env.NODE_ENV == 'development' ? 30 * 1000 : 60 * 1000,
            success: data => resolve(data),
            error: xhrErr => reject(xhrErr)
        });
    });
    //return http.post('/mall/mallBackOrderController/checkReceipt', param);
}

/**
 * 同意退款
 * @param  {[type]} options.backOrderId                [退订单Id]不可为空    
 * @param  {[type]} options.actualRefundAmount         [退订单金额]可为空 
 * @return {[type]}                          [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _refund = ({ backOrderId, actualRefundAmount }) => {
    return http.post('/mall/mallBackOrderController/refund', { backOrderId, actualRefundAmount });
};

/**
 * 拒绝退款
 * @param  {[type]} options.backOrderId                [退订单Id]不可为空    
 * @param  {[type]} options.reason                     [拒绝理由]可为空 
 * @return {[type]}                          [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _rejectRefund = ({ backOrderId, reason }) => {
    return http.post('/mall/mallBackOrderController/rejectRefund', { backOrderId, reason });
}

/**
 * 同意换货，生成新订单
 * @param  {[type]} options.backOrderId                [退订单Id]不可为空    
 * @return {[type]}                          [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _exangeGoods = ({ backOrderId }) => {
    return http.post('/mall/mallBackOrderController/exangeGoods', { backOrderId });
}

/**
 * 拒绝换货
 * @param  {[type]} options.backOrderId                [退订单Id]不可为空    
 * @param  {[type]} options.reason                     [理由]可为空  
 * @return {[type]}                          [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _rejectExchange = ({ backOrderId,reason }) => {
    return http.post('/mall/mallBackOrderController/rejectExchange', { backOrderId,reason });
}

/**
 * 拒绝换货
 * @param  {[type]} options.backOrderId                [退订单Id]不可为空    
 * @param  {[type]} options.reason                     [理由]可为空  
 * @return {[type]}                          [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _getBackExpressDetail = ({ backOrderId }) => {
    return http.post('/mall/mallBackOrderController/getBackExpressDetail', { backOrderId });
}