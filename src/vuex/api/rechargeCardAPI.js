import http from 'src/lib/utils/https'

/**
 * 充值卡列表 wbj
 * @param cardId 充值卡批次号(可选)
 * @param beginDaySt 有效期起始日期范围开始(可选 格式:yyyy-MM-dd)
 * @param beginDayEt 有效期起始日期范围结束(可选 格式:yyyy-MM-dd)
 * @param endDaySt 有效期截止日期范围开始(可选 格式:yyyy-MM-dd)
 * @param endDayEt 有效期截止日期范围结束(可选 格式:yyyy-MM-dd)
 * @param beginDay 有效期起始日期(可选 格式:yyyy-MM-dd)
 * @param endDay 有效期截止日期(可选 格式:yyyy-MM-dd)
 * @param useStatus 充值卡使用情况(可选  0未使用 1使用中 2已用完)
 * @param pageNo 第几页(不传默认1)
 * @param pageSize 页大小(不传默认20)
 * @param orderByKey 排序字段(可选 表的字段)
 * @param orderByValue 排序值 DESC/ASC(可选)
 * @return {[type]}
 */
export const _getMallRechargeCardList = ({cardId,beginDaySt,beginDayEt,endDaySt,beginDay,endDay,endDayEt,useStatus,pageNo,pageSize,orderByKey,orderByValue}) => {
    return http.post('/mall/mallRechargeCardController/findMallRechargeCardList', {cardId,beginDaySt,beginDayEt,endDaySt,endDayEt,beginDay,endDay,useStatus,pageNo,pageSize,orderByKey,orderByValue});
};
/**
 * 充值订单列表 wbj
 * @param orderType 订单类型(可选 默认 2充值订单)
 * @param asOrderType 关联订单类型(可选 默认 3赠送订单)
 * @param orderCode 订单状态(可选)
 * @param orderNo 充值卡编号(可选)
 * @param orderId 对应订单编号(可选)
 * @param goodsName 商品名称(可选)
 * @param userMobile 充值人手机号(可选)
 * @param userAlias 充值人用户名(可选)
 * @param realName 充值人姓名(可选)
 * @param rechargeType  充值方式(可选)
 * @param createdDtmSt 下单时间范围开始(可选 >= 格式:yyyy-MM-dd HH:mm:ss)
 * @param createdDtmEt 下单时间范围结束(可选 <= 格式:yyyy-MM-dd HH:mm:ss)
 * @param pageNo 第几页(不传默认1)
 * @param pageSize 页大小(不传默认20)
 * @param orderByKey 排序字段(可选 表的字段)
 * @param orderByValue 排序值 DESC/ASC(可选)
 * @return {[type]}
 */
export const _getMallRechargeOrderList = ({
	orderType,asOrderType,orderCode,orderNo,orderId,goodsName
	,userMobile,userAlias,realName
	,rechargeType,createdDtmSt,createdDtmEt
	,pageNo,pageSize,orderByKey,orderByValue}) => {
    return http.post('/mall/mallRechargeCardController/findMallRechargeOrderList', {
  orderType,asOrderType,orderCode,orderNo,orderId,goodsName
  ,userMobile,userAlias,realName
  ,rechargeType,createdDtmSt,createdDtmEt
  ,pageNo,pageSize,orderByKey,orderByValue});
};
/**
 * 充值卡明细列表 wbj
 * @param cardId 充值卡批次号
 * @param cardItemId 充值卡明细编号(可选)
 * @param cardNo 卡号(可选)
 * @param orderNo 对应单号(可选)
 * @param bindDtmSt 卡绑定时间范围开始(可选 格式:yyyy-MM-dd HH:mm:ss)
 * @param bindDtmEt 卡绑定时间范围结束(可选 格式:yyyy-MM-dd HH:mm:ss)
 * @param statusCode 状态 0 未绑定 1 已绑定(可选)
 * @param pageNo 第几页(不传默认1)
 * @param pageSize 页大小(不传默认20)
 * @param orderByKey 排序字段(可选 表的字段)
 * @param orderByValue 排序值 DESC/ASC(可选)
 * @return {[type]}
 */
export const _getMallRechargeCardItemList = ({cardId,cardItemId,cardNo,orderNo,bindDtmSt,bindDtmEt,statusCode,pageNo,pageSize,orderByKey,orderByValue}) => {
    return http.post('/mall/mallRechargeCardController/findMallRechargeCardItemList', {cardId,cardItemId,cardNo,orderNo,bindDtmSt,bindDtmEt,statusCode,pageNo,pageSize,orderByKey,orderByValue});
};
/**
 * 分页查询电商实物充值卡订单列表 wbj
 * @param cardItemId 充值卡明细编号(可选)
 * @param orderId 对应订单编号(可选)
 * @param orderNo 对应订单号(可选)
 * @param cardId 充值卡批次号(可选)
 * @param cardNo 卡号(可选 模糊)
 * @param cardSeq 卡序号(可选)
 * @param createdDtmSt 下单时间时间范围开始(可选>= 格式:yyyy-MM-dd HH:mm:ss)
 * @param createdDtmEt 下单时间时间范围结束(可选<= 格式:yyyy-MM-dd HH:mm:ss)
 * @param statusCode 状态 0 锁定 1 交易成功(可选)
 * @param pageNo 第几页(不传默认1)
 * @param pageSize 页大小(不传默认20)
 * @param orderByKey 排序字段(可选 表的字段)
 * @param orderByValue 排序值 DESC/ASC(可选)
 * @return {[type]}
 */
export const _getMallRechargeCardTradeList = ({
	 cardItemId,orderId,orderNo,cardId,cardNo
	,cardSeq,createdDtmSt,createdDtmEt,statusCode
	,pageNo,pageSize,orderByKey,orderByValue}) => {
  return http.post('/mall/mallRechargeCardController/findMallRechargeCardTradeList', {
  	 cardItemId,orderId,orderNo,cardId,cardNo
		,cardSeq,createdDtmSt,createdDtmEt,statusCode
		,pageNo,pageSize,orderByKey,orderByValue
	});
};
/**
 * 删除充值卡 只能删除未使用的，删除时会删除item表一起 wbj
 * @param tradeId 充值订单编号 多个英文逗号隔开
 * @return {[type]}
 */
export const _deleteMallRechargeCardTrade = ({tradeId}) => {
	return http.post('/mall/mallRechargeCardController/deleteMallRechargeCardTrade', {tradeId});
};
/**
 * 删除充值卡 只能删除未使用的，删除时会删除item表一起 wbj
 * @param cardId 充值卡批次号 多个英文逗号隔开
 * @return {[type]}
 */
export const _deleteMallRechargeCard = ({cardId}) => {
	return http.post('/mall/mallRechargeCardController/deleteMallRechargeCard', {cardId});
};

/**
 * 新增充值卡 wbj
 * @param cardNumber 卡发行数量
 * @param cardPrice 实物卡金额
 * @param mPrice 市场价格
 * @param beginDay 有效期 起始日期
 * @param endDay 有效期 截止日期
 * @return {[type]}
 */
export const _addMallRechargeCard = ({cardNumber, cardPrice, mPrice, beginDay,endDay}) => {
	return http.post('/mall/mallRechargeCardController/addMallRechargeCard', {cardNumber, cardPrice, mPrice, beginDay,endDay});
};
