import * as payAPI from '../api/payAPI'

//**************************************运营商资金管理***********************************
/**
 * 获取账户余额信息
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _getUserAccount = () => {
     return payAPI._getUserAccount().then((data) => Promise.resolve(data));
}

/**
 * 获取运营商最近指定天数的收入
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _getIncomeForPartner = (params) => {
     return payAPI._getIncomeForPartner(params).then((data) => Promise.resolve(data));
}


/**
 * 运营商提现申请
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _applyWithdrawForPartner = (params) => {
     return payAPI._applyWithdrawForPartner(params).then((data) => Promise.resolve(data));
}

/**
 * 分页查询交易记录列表
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _getTransactionListPage = (params) => {
     return payAPI._getTransactionListPage(params).then((data) => Promise.resolve(data));
}

/**
 * 分页查询交易记录明细列表
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _getTransactionListDetailPage = (params) => {
     return payAPI._getTransactionListDetailPage(params).then((data) => Promise.resolve(data));
}



/**
 * 分页查询对账单列表
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _getPayBillListPage = (params) => {
     return payAPI._getPayBillListPage(params).then((data) => Promise.resolve(data));
}


/**
 * 分页查询资金明细列表
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _getFundRecordPage = (params) => {
     return payAPI._getFundRecordPage(params).then((data) => Promise.resolve(data));
}


/**
 * 提现申请列表
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _getWithdrawRecordPage = (params) => {
     return payAPI._getWithdrawRecordPage(params).then((data) => Promise.resolve(data));
}


/**
 * 查询收款列表
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _getBankAccountList = (params) => {
     return payAPI._getBankAccountList(params).then((data) => Promise.resolve(data));
}

/**
 * 增加收款信息
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _addBankAccount = (params) => {
     return payAPI._addBankAccount(params).then((data) => Promise.resolve(data));
}

/**
 * 删除收款信息
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _deleteReceiptAccount = (params) => {
     return payAPI._deleteReceiptAccount(params).then((data) => Promise.resolve(data));
}

/**
 * 设置默认收款信息
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _setDefaultReceiptAccount = (params) => {
     return payAPI._setDefaultReceiptAccount(params).then((data) => Promise.resolve(data));
}


/**
 * 查询保证金缴纳列表
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _getDepositListPage = (params) => {
     return payAPI._getDepositListPage(params).then((data) => Promise.resolve(data));
}

/**
 * 获取提现记录详情
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _getWithdrawDetailRecord = (params) => {
     return payAPI._getWithdrawDetailRecord(params).then((data) => Promise.resolve(data));
}



/**
 * 分页查询【用户】余额明细
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _getUserAccountPage = (params) => {
     return payAPI._getUserAccountPage(params).then((data) => Promise.resolve(data));
}

/**
 * 分页查询【用户】交易记录列表
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _getUserTransactionListPage = (params) => {
     return payAPI._getUserTransactionListPage(params).then((data) => Promise.resolve(data));
}

//***************************************店铺资金管理***********************************

/**
 * 获取店铺账户余额信息
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _getShopUserAccount = () => {
     return payAPI._getShopUserAccount().then((data) => Promise.resolve(data));
}

/**
 * 获取店铺最近指定天数的收入
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _getIncomeForShop = (params) => {
     return payAPI._getIncomeForShop(params).then((data) => Promise.resolve(data));
}


/**
 * 店铺提现申请
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _applyShopWithdrawForPartner = (params) => {
     return payAPI._applyShopWithdrawForPartner(params).then((data) => Promise.resolve(data));
}

/**
 * 店铺分页查询交易记录列表
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _getShopTransactionListPage = (params) => {
     return payAPI._getShopTransactionListPage(params).then((data) => Promise.resolve(data));
}

/**
 * 店铺分页查询交易记录明细列表
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _getShopTransactionListDetailPage = (params) => {
     return payAPI._getShopTransactionListDetailPage(params).then((data) => Promise.resolve(data));
}



/**
 * 店铺分页查询对账单列表
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _getShopPayBillListPage = (params) => {
     return payAPI._getShopPayBillListPage(params).then((data) => Promise.resolve(data));
}


/**
 * 店铺分页查询资金明细列表
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _getShopFundRecordPage = (params) => {
     return payAPI._getShopFundRecordPage(params).then((data) => Promise.resolve(data));
}


/**
 * 店铺提现申请列表
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _getShopWithdrawRecordPage = (params) => {
     return payAPI._getShopWithdrawRecordPage(params).then((data) => Promise.resolve(data));
}


//***************************************收款帐号管理***********************************

/**
 * 查询收款列表
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _getShopBankAccountList = (params) => {
     return payAPI._getShopBankAccountList(params).then((data) => Promise.resolve(data));
}

/**
 * 增加收款信息
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _addShopBankAccount = (params) => {
     return payAPI._addShopBankAccount(params).then((data) => Promise.resolve(data));
}

/**
 * 删除收款信息
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _deleteShopReceiptAccount = (params) => {
     return payAPI._deleteShopReceiptAccount(params).then((data) => Promise.resolve(data));
}

/**
 * 设置默认收款信息
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _setShopDefaultReceiptAccount = (params) => {
     return payAPI._setShopDefaultReceiptAccount(params).then((data) => Promise.resolve(data));
}

/**
 * 获取店铺提现记录详情
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _getShopWithdrawDetailRecord = (params) => {
     return payAPI._getShopWithdrawDetailRecord(params).then((data) => Promise.resolve(data));
}