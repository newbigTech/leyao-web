import http from 'src/lib/utils/https'


//**************************************运营商资金管理***********************************
/**
 * 获取账户余额信息
 * @param  {[type]} options.userId         [获取用户余额]不可为空    
 * @return {[type]}                        [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _getUserAccount = () => {
    return http.post('/pay/mallPayController/getUserAccount', {});
};

/**
 * 获取运营商最近指定天数的收入
 * @param  {[type]} options.day         [天数]不可为空    
 * @return {[type]}                     [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _getIncomeForPartner = ({ day }) => {
    return http.post('/pay/mallPayController/getIncomeForPartner', { day });
};

/**
 * 运营商提现申请
 * @param  {[type]} options.day         [数量]不可为空    
 * @return {[type]}                     [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _applyWithdrawForPartner = ({ amount }) => {
    return http.post('/pay/mallPayController/applyWithdrawForPartner', { amount });
};


/**
 * 分页查询【运营商】交易记录列表
 * @param  {[type]} options.startTime      [起始时间]可为空    
 * @param  {[type]} options.endTime        [结束时间] 可为空
 * @param  {[type]} options.orderNo        [订单号] 可为空
 * @param  {[type]} options.tradeType      [交易类型] 可为空
 * @param  {[type]} options.payWay         [支付类型] 可为空
 * @param  {[type]} options.orderStatus    [订单状态] 可为空
 * @param  {[type]} options.pageNo         [当前页] 可为空 默认值 1
 * @param  {[type]} options.pageSize       [每页显示记录数]可为空 默认值 20
 * @return {[type]}                        [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _getTransactionListPage = ({ startTime, endTime, merchantOrderNo, tradeType, settleStatus, payWay, orderStatus, pageNo, pageSize  }) => {
    return http.post('/pay/mallPayController/getTransactionListPage', 
    		{ startTime, endTime, merchantOrderNo, tradeType, settleStatus, payWay, orderStatus, pageNo, pageSize });
};


/**
 * 分页查询交易记录明细列表
 * @param  {[type]} options.orderNo        [订单号] 可为空
 * @return {[type]}                        [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _getTransactionListDetailPage = ({ merchantOrderId }) => {
    return http.post('/pay/mallPayController/getTransactionListDetailPage', { merchantOrderId });
};



/**
 * 分页查询对账单列表
 * @param  {[type]} options.year         [年]可为空    
 * @param  {[type]} options.month        [月] 可为空
 * @param  {[type]} options.pageNo         [当前页] 可为空 默认值 1
 * @param  {[type]} options.pageSize       [每页显示记录数]可为空 默认值 20
 * @return {[type]}                        [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _getPayBillListPage = ({ year, month, pageNo, pageSize  }) => {
    return http.post('/pay/mallPayController/getPayBillListPage', 
    		{ year, month, pageNo, pageSize });
};



/**
 * 分页查询资金明细列表
 * @param  {[type]} options.startTime      [起始时间]可为空    
 * @param  {[type]} options.endTime        [结束时间] 可为空
 * @param  {[type]} options.businessType   [资金业务类型]可为空    
 * @param  {[type]} options.minAmount      [最小金额] 可为空
 * @param  {[type]} options.maxAmount      [最大金额]可为空    
 * @param  {[type]} options.pageNo         [当前页] 可为空 默认值 1
 * @param  {[type]} options.pageSize       [每页显示记录数]可为空 默认值 20
 * @return {[type]}                        [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _getFundRecordPage = ({ startTime, endTime, businessType, fundNo, minAmount, maxAmount, pageNo, pageSize  }) => {
    return http.post('/pay/mallPayController/getFundRecordPage', 
    		{ startTime, endTime, businessType, fundNo, minAmount, maxAmount, pageNo, pageSize });
};



/**
 * 提现记录
 * @param  {[type]} options.startTime      [起始时间]可为空    
 * @param  {[type]} options.endTime        [结束时间] 可为空
 * @param  {[type]} options.status         [提现状态]可为空     
 * @param  {[type]} options.pageNo         [当前页] 可为空 默认值 1
 * @param  {[type]} options.pageSize       [每页显示记录数]可为空 默认值 20
 * @return {[type]}                        [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _getWithdrawRecordPage = ({ startTime, endTime, status, pageNo, pageSize  }) => {
    return http.post('/pay/mallPayController/getWithdrawRecordPage', 
    		{ startTime, endTime, status, pageNo, pageSize });
};


//收款帐号管理
/**
 * 查询收款列表     
 * @return {[type]}                        [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _getBankAccountList = ({}) => {
    return http.post('/pay/mallPayController/getBankAccountList', {});
};


/**
 * 增加收款信息
 * @param  {[type]} options.bankName         [支付名]不可为空    
 * @param  {[type]} options.accountNo        [支付帐号]不可为空    
 * @param  {[type]} options.userName         [收款用户]不可为空       
 * @return {[type]}                     [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _addBankAccount = ({ bankName,accountNo,userName }) => {
    return http.post('/pay/mallPayController/addBankAccountList', { bankName,accountNo,userName });
};

/**
 * 删除收款信息
 * @param  {[type]} options.receiptAccountIds    [收款Id]不可为空         
 * @return {[type]}                              [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _deleteReceiptAccount = ({ receiptAccountIds }) => {
    return http.post('/pay/mallPayController/deleteReceiptAccount', { receiptAccountIds });
};

/**
 * 设置默认收款信息
 * @param  {[type]} options.accountId   [收款Id]不可为空         
 * @return {[type]}                     [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _setDefaultReceiptAccount = ({ accountId }) => {
    return http.post('/pay/mallPayController/setDefaultReceiptAccount', { accountId });
};

/**
 * 提现记录
 * @param  {[type]} options.startTime      [起始时间]可为空    
 * @param  {[type]} options.endTime        [结束时间] 可为空   
 * @param  {[type]} options.pageNo         [当前页] 可为空 默认值 1
 * @param  {[type]} options.pageSize       [每页显示记录数]可为空 默认值 20
 * @return {[type]}                        [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _getDepositListPage = ({ startTime, endTime, pageNo, pageSize  }) => {
    return http.post('/pay/mallPayController/getDepositPage', 
            { startTime, endTime, pageNo, pageSize });
};

/**
 * 获取提现记录详情
 * @param  {[linkId]} options.startTime      [提现记录Id]可为空    
 * @return {[type]}                        [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _getWithdrawDetailRecord = ({ linkId}) => {
    return http.post('/pay/mallPayController/getWithdrawDetailRecord',{ linkId });
};

/**
 * 分页查询【用户】余额明细
 * @param  {[type]} options.userMobile     [联系电话]可为空    
 * @param  {[type]} options.pageNo         [当前页] 可为空 默认值 1
 * @param  {[type]} options.pageSize       [每页显示记录数]可为空 10
 * @param  {[type]} options.buyerId        [用户Id]不能为空
 * @return {[type]}                        [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _getUserAccountPage = ({ userMobile, amount, operator, pageNo, pageSize  }) => {
    return http.post('/pay/mallPayController/getUserAccountPage', 
            { userMobile, amount, operator, pageNo, pageSize });
};

/**
 * 分页查询【用户】交易记录列表
 * @param  {[type]} options.startTime      [起始时间]可为空    
 * @param  {[type]} options.endTime        [结束时间] 可为空
 * @param  {[type]} options.orderNo        [订单号] 可为空
 * @param  {[type]} options.tradeType      [交易类型] 可为空
 * @param  {[type]} options.payWay         [支付类型] 可为空
 * @param  {[type]} options.orderStatus    [订单状态] 可为空
 * @param  {[type]} options.pageNo         [当前页] 可为空 默认值 1
 * @param  {[type]} options.pageSize       [每页显示记录数]可为空 10
 * @param  {[type]} options.buyerId        [用户Id]不能为空
 * @return {[type]}                        [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _getUserTransactionListPage = ({ startTime, endTime, merchantOrderNo, tradeType, payWay, orderStatus, buyerId, pageNo, pageSize  }) => {
    return http.post('/pay/mallPayController/getUserTransactionListPage', 
            { startTime, endTime, merchantOrderNo, tradeType, payWay, orderStatus, buyerId, pageNo, pageSize });
};

/***************************************************************************************
****************************************************************************************
*****************************************店铺资金管理***********************************
****************************************************************************************
****************************************************************************************/


/**
 * 获取店铺账户余额信息
 * @param  {[type]} options.userId         [获取用户余额]不可为空    
 * @return {[type]}                        [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _getShopUserAccount = () => {
    return http.post('/pay/mallShopPayController/getUserAccount', {});
};

/**
 * 获取店铺最近指定天数的收入
 * @param  {[type]} options.day         [天数]不可为空    
 * @return {[type]}                     [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _getIncomeForShop = ({ day }) => {
    return http.post('/pay/mallPayController/getIncomeForShop', { day });
};

/**
 * 运营商收入统计
 * @param  {[type]} options.type        [类型]不可为空，0：小时、1：日、2：周、3：月
 * @param  {[type]} options.startTime   [起始时间]不可为空    
 * @param  {[type]} options.endTime     [结束时间]不可为空
 * @return {[type]}                     [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _getPartnerIncomeStatis = ({type, startTime,  endTime}) => {
    return http.post('/pay/mallPayController/getPartnerIncomeStatis', {type, startTime,  endTime});
};

/**
 * 商家（店铺）收入统计
 * @param  {[type]} options.type        [类型]不可为空，0：小时、1：日、2：周、3：月
 * @param  {[type]} options.startTime   [起始时间]不可为空    
 * @param  {[type]} options.endTime     [结束时间]不可为空
 * @return {[type]}                     [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _getShopIncomeStatis = ({type, startTime,  endTime}) => {
    return http.post('/pay/mallPayController/getShopIncomeStatis', {type, startTime,  endTime});
};

/**
 * 店铺提现申请
 * @param  {[type]} options.day         [数量]不可为空    
 * @return {[type]}                     [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _applyShopWithdrawForPartner = ({ amount }) => {
    return http.post('/pay/mallShopPayController/applyWithdrawForPartner', { amount });
};


/**
 * 店铺分页查询交易记录列表
 * @param  {[type]} options.startTime      [起始时间]可为空    
 * @param  {[type]} options.endTime        [结束时间] 可为空
 * @param  {[type]} options.merchantOrderNo        [订单号] 可为空
 * @param  {[type]} options.tradeType      [交易类型] 可为空
 * @param  {[type]} options.payWay         [支付类型] 可为空
 * @param  {[type]} options.orderStatus    [订单状态] 可为空
 * @param  {[type]} options.pageNo         [当前页] 可为空 默认值 1
 * @param  {[type]} options.pageSize       [每页显示记录数]可为空 默认值 20
 * @return {[type]}                        [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _getShopTransactionListPage = ({ startTime, endTime, merchantOrderNo, tradeType, settleStatus, payWay, orderStatus, pageNo, pageSize  }) => {
    return http.post('/pay/mallShopPayController/getTransactionListPage', 
            { startTime, endTime, merchantOrderNo, tradeType, settleStatus, payWay, orderStatus, pageNo, pageSize });
};


/**
 * 店铺分页查询交易记录明细列表
 * @param  {[type]} options.orderNo        [订单号] 可为空
 * @return {[type]}                        [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _getShopTransactionListDetailPage = ({ merchantOrderId }) => {
    return http.post('/pay/mallShopPayController/getTransactionListDetailPage', { merchantOrderId });
};



/**
 * 店铺分页查询对账单列表
 * @param  {[type]} options.year         [年]可为空    
 * @param  {[type]} options.month        [月] 可为空
 * @param  {[type]} options.pageNo         [当前页] 可为空 默认值 1
 * @param  {[type]} options.pageSize       [每页显示记录数]可为空 默认值 20
 * @return {[type]}                        [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _getShopPayBillListPage = ({ year, month, pageNo, pageSize  }) => {
    return http.post('/pay/mallShopPayController/getPayBillListPage', 
            { year, month, pageNo, pageSize });
};



/**
 * 店铺分页查询资金明细列表
 * @param  {[type]} options.startTime      [起始时间]可为空    
 * @param  {[type]} options.endTime        [结束时间] 可为空
 * @param  {[type]} options.businessType   [资金业务类型]可为空    
 * @param  {[type]} options.minAmount      [最小金额] 可为空
 * @param  {[type]} options.maxAmount      [最大金额]可为空    
 * @param  {[type]} options.pageNo         [当前页] 可为空 默认值 1
 * @param  {[type]} options.pageSize       [每页显示记录数]可为空 默认值 20
 * @return {[type]}                        [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _getShopFundRecordPage = ({ startTime, endTime, businessType, fundNo, minAmount, maxAmount, pageNo, pageSize  }) => {
    return http.post('/pay/mallShopPayController/getFundRecordPage', 
            { startTime, endTime, businessType, fundNo, minAmount, maxAmount, pageNo, pageSize });
};



/**
 * 店铺提现记录
 * @param  {[type]} options.startTime      [起始时间]可为空    
 * @param  {[type]} options.endTime        [结束时间] 可为空
 * @param  {[type]} options.status         [提现状态]可为空     
 * @param  {[type]} options.pageNo         [当前页] 可为空 默认值 1
 * @param  {[type]} options.pageSize       [每页显示记录数]可为空 默认值 20
 * @return {[type]}                        [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _getShopWithdrawRecordPage = ({ startTime, endTime, status, pageNo, pageSize  }) => {
    return http.post('/pay/mallShopPayController/getWithdrawRecordPage', 
            { startTime, endTime, status, pageNo, pageSize });
};

//收款帐号管理
/**
 * 查询收款列表     
 * @return {[type]}                        [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _getShopBankAccountList = ({}) => {
    return http.post('/pay/mallShopPayController/getBankAccountList', {});
};


/**
 * 增加收款信息
 * @param  {[type]} options.bankName         [支付名]不可为空    
 * @param  {[type]} options.accountNo        [支付帐号]不可为空    
 * @param  {[type]} options.userName         [收款用户]不可为空       
 * @return {[type]}                     [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _addShopBankAccount = ({ bankName,accountNo,userName }) => {
    return http.post('/pay/mallShopPayController/addBankAccountList', { bankName,accountNo,userName });
};

/**
 * 删除收款信息
 * @param  {[type]} options.receiptAccountIds    [收款Id]不可为空         
 * @return {[type]}                              [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _deleteShopReceiptAccount = ({ receiptAccountIds }) => {
    return http.post('/pay/mallShopPayController/deleteReceiptAccount', { receiptAccountIds });
};

/**
 * 设置默认收款信息
 * @param  {[type]} options.accountId   [收款Id]不可为空         
 * @return {[type]}                     [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _setShopDefaultReceiptAccount = ({ accountId }) => {
    return http.post('/pay/mallShopPayController/setDefaultReceiptAccount', { accountId });
};
