import http from 'src/lib/utils/https'

/**
 * 充值卡列表 wbj
 * @param cardId 充值卡批次号(可选)
 * @param saleCardName 销售卡名称(可选 模糊)
 * @param beginDay 有效期起始日期(可选 格式:yyyy-MM-dd)
 * @param endDay 有效期截止日期(可选 格式:yyyy-MM-dd)
 * @param isHot 是否推荐 0 否 1 是(可选)
 * @param hasGift 是否有赠品 0 否 1 是(可选)
 * @param useStatus 充值卡使用情况(可选  0未使用 1使用中 2已使用完)
 * @param statusCode 状态 0 下架 1 上架 (可选)
 * @param deleteFlag 软删除状态 0 正常 1 删除(可选)
 * @param pageNo 第几页(不传默认1)
 * @param pageSize 页大小(不传默认20)
 * @param orderByKey 排序字段(可选 表的字段)
 * @param orderByValue 排序值 DESC/ASC(可选)
 * @return {[type]}
 */
export const _getMallRechargeSaleCardList = ({
	cardId,saleCardName,beginDay,endDay,isHot,
	hasGift,useStatus,statusCode,deleteFlag,
	pageNo,pageSize,orderByKey,orderByValue
	}) => {
    return http.post('/mall/mallRechargeSaleCardController/findMallRechargeSaleCardList', {
    	cardId,saleCardName,beginDay,endDay,isHot,
    	hasGift,useStatus,statusCode,deleteFlag,
    	pageNo,pageSize,orderByKey,orderByValue
    });
};

/**
 * 删除充值卡 只能删除未使用的，删除时会删除item表一起 wbj
 * @param cardId 充值卡批次号 多个英文逗号隔开
 * @return {[type]}
 */
export const _deleteMallRechargeSaleCard = ({cardId}) => {
	return http.post('/mall/mallRechargeSaleCardController/deleteMallRechargeSaleCard', {cardId});
};

/**
 * 新增网销卡 wbj
 * @param saleCardName 卡名称
 * @param saleCardUseRule 网销卡使用规则(可选)
 * @param saleCardPic 网销卡图片(可选)
 * @param sortIndex 排序(可选 默认0)
 * @param isHot 是否推荐 0 否 1 是(可选 默认0)
 * @param countNumber 卡发行数量
 * @param cardPrice 卡面额
 * @param salePrice 销售价
 * @param timeLimitType 卡有效期约束 0 时间段约束 1 天数量约束
 * @param beginDay 有效期 起始日期(yyyy-MM-dd HH:mm:ss)(timeLimitType=0 用到)
 * @param endDay 有效期 截止日期(yyyy-MM-dd HH:mm:ss)(timeLimitType=0 用到)
 * @param dayNumber 有效天数(timeLimitType=1 用到)
 * @param orderPayLimit 订单可支付比例 1-100
 * @param shopId 赠品所属店铺(无赠品 是0)
 * @param goodsId 赠品所属编号(无赠品 是0)
 * @param number 赠品所属店铺(无赠品 是0)
 * @param giftNote 赠品所属编号(无赠品 是'')
 * @return {[type]}
 */
export const _addMallRechargeSaleCard = ({
	saleCardName,saleCardUseRule,saleCardPic,sortIndex,isHot,
	countNumber, cardPrice, salePrice,timeLimitType, beginDay,endDay,
	dayNumber,orderPayLimit,shopId,goodsId,number,giftNote
 }) => {
	return http.post('/mall/mallRechargeSaleCardController/addMallRechargeSaleCard', {
		saleCardName,saleCardUseRule,saleCardPic,sortIndex,isHot,
		countNumber, cardPrice, salePrice,timeLimitType, beginDay,endDay,
		dayNumber,orderPayLimit,shopId,goodsId,number,giftNote
	});
};
/**
 * 修改网销卡 wbj
 * @param saleCardName 卡名称
 * @param saleCardUseRule 网销卡使用规则(可选)
 * @param saleCardPic 网销卡图片(可选)
 * @param sortIndex 排序(可选 默认0)
 * @param isHot 是否推荐 0 否 1 是(可选 默认0)
 * @param salePrice 销售价
 * @param shopId 赠品所属店铺(无赠品 是0)
 * @param goodsId 赠品所属编号(无赠品 是0)
 * @param number 赠品所属店铺(无赠品 是0)
 * @param giftNote 赠品所属编号(无赠品 是'')
 * @return {[type]}
 */
export const _modifyMallRechargeSaleCard = ({
	 cardId,saleCardName,saleCardUseRule,saleCardPic,sortIndex,isHot,
	 shopId,goodsId,number,giftNote,
	 salePrice,statusCode
 }) => {
	return http.post('/mall/mallRechargeSaleCardController/modifyMallRechargeSaleCard', {
		cardId,saleCardName,saleCardUseRule,saleCardPic,sortIndex,isHot,
	  shopId,goodsId,number,giftNote,
		salePrice,statusCode
	});
};