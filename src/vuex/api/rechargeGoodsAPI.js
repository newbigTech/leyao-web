import http from 'src/lib/utils/https'

/**
 * 分页查询电商实物充值商品列表 wbj
 * @param goodsId 商品编号(可选)
 * @param goodsName 商品名称(可选)
 * @param goodsFullName 商品全名(可选)
 * @param topUpAmountSt 充值金额范围开始(可选)
 * @param topUpAmountEt 充值金额范围结束(可选)
 * @param isLock 金额是否需要锁定 分期返还 0 否 1 是(可选)
 * @param isHot 是否推荐 0 否 1 是(可选)
 * @param isTime 充值时间设置 0 无 1 有(可选)
 * @param statusCode 状态 0 上架 1 下架 (可选)
 * @param deleteFlag 删除 0 正常 1 已删 (可选 默认0)
 * @param beginDay 开始日期(可选 格式:yyyy-MM-dd, isTime=1时起作用)
 * @param endDay 截止日期(可选 格式:yyyy-MM-dd, isTime=1时起作用)
 * @param pageNo 第几页(不传默认1)
 * @param pageSize 页大小(不传默认20)
 * @param orderByKey 排序字段(可选 表的字段)
 * @param orderByValue 排序值 DESC/ASC(可选)
 * @return {[type]}
 */
export const _getMallRechargeGoodsList = ({
	   goodsId,goodsName,goodsFullName,topUpAmountSt,topUpAmountEt
	  ,isLock,isHot,isTime,statusCode,deleteFlag
	  ,beginDay,endDay
	  ,pageNo,pageSize,orderByKey,orderByValue}) => {
    return http.post('/mall/mallRechargeGoodsController/findMallRechargeGoodsList', {
     goodsId,goodsName,goodsFullName,topUpAmountSt,topUpAmountEt
    ,isLock,isHot,isTime,statusCode,deleteFlag
	  ,beginDay,endDay
    ,pageNo,pageSize,orderByKey,orderByValue
  });
};
/**
 * 分页查询电商实物充值商品明细列表 wbj
 * @param goodsId 充值商品批次号
 * @return {[type]}
 */
export const _getMallRechargeGoodsItemList = ({goodsId}) => {
    return http.post('/mall/mallRechargeGoodsController/findMallRechargeGoodsItemList', {goodsId});
};
/**
 * 删除充值卡 只能删除未使用的，删除时会删除item表一起 wbj
 * @param goodsId 充值商品批次号 多个英文逗号隔开
 * @return {[type]}
 */
export const _deleteMallRechargeGoods = ({goodsId}) => {
	return http.post('/mall/mallRechargeGoodsController/deleteMallRechargeGoods', {goodsId});
};
/**
 * 检查商品名称是否被子占用 wbj
 * @param goodsName 检查的商品名称
 * @param goodsId 充值商品编号，如果传入该值标示排除它的名称
 * @return {[type]}
 */
export const _validMallRechargeGoodsGoodsName = ({goodsName,goodsId}) => {
	return http.post('/mall/mallRechargeGoodsController/validMallRechargeGoodsGoodsName', {goodsName,goodsId});
};
/**
 * 检查商品全名是否被子占用 wbj
 * @param goodsFullName 检查的商品全名
 * @param goodsId 充值商品编号，如果传入该值标示排除它的全名
 * @return {[type]}
 */
export const _validMallRechargeGoodsGoodsFullName = ({goodsFullName,goodsId}) => {
	return http.post('/mall/mallRechargeGoodsController/validMallRechargeGoodsGoodsFullName', {goodsFullName,goodsId});
};
/**
 * 新增电商实物充值商品 wbj
 * @param goodsName 商品名称
 * @param goodsFullName 商品全名
 * @param sortIndex 排序(可选 默认0)
 * @param topUpAmount 充值金额
 * @param isLock 金额是否需要锁定 分期返还 0 否 1 是(可选 默认0)
 * @param lockMonth 锁定期数 0至12(可选 isLock=1起作用,同时1<=lockMonth<=12)
 * @param goodsPic 商品图片(可选)
 * @param goodsDesc 商品简介(可选)
 * @param isHot 是否推荐 0 否 1 是(可选 默认0)
 * @param isTime 充值时间设置 0 无 1 有(可选 默认0)
 * @param beginDay 开始日期(可选 isTime=1起作用)
 * @param endDay 截止日期(可选 isTime=1起作用)
 * @param statusCode 状态 0 上架 1 下架(可选 默认0)
 * @param goodsItem 商品赠送明细(格式：[{itemType,itemVal1,itemVal2,sortIndex,itemPrice}]
 * 其中：itemType是 0 优惠卷 1商品,itemVal1对应优惠卷编号商品编号,itemVal2是SKU商品编号(优惠券/SPU商品填0),sortIndex是排序,itemPrice是赠送价值
 * @return {[type]}
 */
export const _addMallRechargeGoods = ({
		 goodsName, goodsFullName, sortIndex, topUpAmount
		,isLock,lockMonth,goodsPic,goodsDesc,isHot
		,isTime,beginDay,endDay,statusCode,goodsItem
	}) => {
	return http.post('/mall/mallRechargeGoodsController/addMallRechargeGoods', {
		 goodsName, goodsFullName, sortIndex, topUpAmount
		,isLock,lockMonth,goodsPic,goodsDesc,isHot
		,isTime,beginDay,endDay,statusCode,goodsItem
	});
};
/**
 * 修改电商实物充值商品 wbj
 * @param goodsId 充值商品编号
 * @param goodsName 商品名称
 * @param goodsFullName 商品全名
 * @param sortIndex 排序(可选 默认0)
 * @param goodsPic 商品图片(可选)
 * @param goodsDesc 商品简介(可选)
 * @param isHot 是否推荐 0 否 1 是(可选 默认0)
 * @param statusCode 状态 0 上架 1 下架(可选 默认0)
 * @param goodsItem 商品赠送明细(格式：[{itemType,itemVal1,itemVal2,sortIndex,itemPrice}]
 * 其中：itemType是 0 优惠卷 1商品,itemVal1对应优惠卷编号商品编号,itemVal2是SKU商品编号(优惠券/SPU商品填0),sortIndex是排序,itemPrice是赠送价值
 * @return {[type]}
 */
export const _modifyMallRechargeGoods = ({
		 goodsId,goodsName, goodsFullName, sortIndex
		,goodsPic,goodsDesc,isHot,statusCode,goodsItem
	}) => {
	return http.post('/mall/mallRechargeGoodsController/modifyMallRechargeGoods', {
		 goodsId,goodsName, goodsFullName, sortIndex
		,goodsPic,goodsDesc,isHot,statusCode,goodsItem
	});
};
/**
 * 分页查询优惠券列表 wbj
 * @param shopId 所属店铺编号
 * @param couponsId 优惠券编号(可选)
 * @param couponsName 优惠券名称(可选)
 * @param couponsType 优惠券类型(可选)
 * @param beginDay 起始日期yyyy-MM-dd(可选)
 * @param endDay  截止日期yyyy-MM-dd(可选)
 * @param pageNo 第几页(不传默认1)
 * @param pageSize 页大小(不传默认20)
 * @param orderByKey 排序字段(可选 表的字段)
 * @param orderByValue 排序值 DESC/ASC(可选)
 * @return {[type]}
 */
export const _getMallCouponsListForRecharge = ({
	   shopId,couponsId,couponsName,couponsType,beginDay,endDay
	  ,pageNo,pageSize,orderByKey,orderByValue}) => {
    return http.post('/shop/mallCouponsController/getMallCouponsListForRecharge', {
	   shopId,couponsId,couponsName,couponsType,beginDay,endDay
    ,pageNo,pageSize,orderByKey,orderByValue
  });
};
/**
 * 查询运营商店铺列表 wbj
 * @param isMyself 是否自营(可选)
 * @param statusCode 0测试中 1开启 2关闭(可选)
 * @return {[type]}
 */
export const _getSupplierShop = ({
	   isMyself,statusCode
	  }) => {
    return http.post('/shop/mallShopController/getSupplierShop', {
	   isMyself,statusCode
  });
};
/**
 * 分页查询商品列表 wbj
 * @param shopId 所属店铺编号
 * @param goodsType 商品类型(可选 0单品 1规格商品 2组合商品)
 * @param stockType 商品类型(可选 0无限制 1单品独立库存 2规格品共享库存 3规格品独立库存)
 * @param goodsSn 商品编码(可选)
 * @param goodsName 商品名称(可选)
 * @param classifyId 商品分类
 * @param pageNo 第几页(不传默认1)
 * @param pageSize 页大小(不传默认20)
 * @param orderByKey 排序字段(可选 表的字段)
 * @param orderByValue 排序值 DESC/ASC(可选)
 * @return {[type]}
 */
export const _getMallGoodsListForRecharge = ({
	   shopId,goodsType,stockType,goodsSn,goodsName,classifyId,
	  pageNo,pageSize,orderByKey,orderByValue}) => {
    return http.post('/mall/goods/getMallGoodsListForRecharge', {
     shopId,goodsType,stockType,goodsSn,goodsName,classifyId,
	  pageNo,pageSize,orderByKey,orderByValue
  });
};
/**
 * 分页查询商品列表(活动) wbj
 * @param goodsType 商品类型(可选 0单品 1规格商品 2组合商品)
 * @param stockType 商品类型(可选 0无限制 1单品独立库存 2规格品共享库存 3规格品独立库存)
 * @param goodsSn 商品编码(可选)
 * @param goodsName 商品名称(可选)
 * @param classifyId 商品分类
 * @param beginDtm 活动开始时间(可选 排除该时间段)
 * @param endDtm 活动结束时间(可选 排除该时间段)
 * @param isExchange 换购用(可选 )
 * @param activityId 活动、专题id(可选 用于排除该活动的已存在的商品 修改用到)
 * @param pageNo 第几页(不传默认1)
 * @param pageSize 页大小(不传默认20)
 * @param orderByKey 排序字段(可选 表的字段)
 * @param orderByValue 排序值 DESC/ASC(可选)
 * @return {[type]}
 */
export const _getMallGoodsListForActivity = ({
	   goodsType,stockType,goodsSn,goodsName,beginDtm,endDtm,isExchange,activityId,classifyId,
	  pageNo,pageSize,orderByKey,orderByValue}) => {
    return http.post('/mall/goods/getMallGoodsListForActivity', {
    goodsType,stockType,goodsSn,goodsName,beginDtm,endDtm,isExchange,activityId,classifyId,
	  pageNo,pageSize,orderByKey,orderByValue
  });
};
/**
 * 分页查询赠品列表 wbj
 * @param goodsSn 商品编码(可选)
 * @param goodsName 商品名称(可选)
 * @param classifyId 商品分类
 * @param pageNo 第几页(不传默认1)
 * @param pageSize 页大小(不传默认20)
 * @param orderByKey 排序字段(可选 表的字段)
 * @param orderByValue 排序值 DESC/ASC(可选)
 * @return {[type]}
 */
export const _getMallGiftListForRechargeAndActivity = ({
	   shopId,goodsType,stockType,goodsSn,goodsName,classifyId,
	  pageNo,pageSize,orderByKey,orderByValue}) => {
    return http.post('/mall/gift/queryMallGiftListForRechargeAndActivity', {
     shopId,goodsType,stockType,goodsSn,goodsName,classifyId,
	  pageNo,pageSize,orderByKey,orderByValue
  });
};

/**
 * 查询sku商品列表 wbj
 * @param goodsId 商品编号
 * @return {[type]}
 
 */
export const _getMallGoodsSkuListOfGoodsForRecharge = ({
	   goodsId
	  }) => {
    return http.post('/mall/skuController/getMallGoodsSkuListOfGoodsForRecharge', {
	   goodsId
  });
};
/**
 * 查询sku商品列表(活动) wbj
 * @param shopId 店铺编号
 * @param goodsId 商品编号
 * @param isExchange 满换用到(可选)
 * @param beginDtm 开始时间(可选  专题不需要传)
 * @param endDtm 结束时间(可选 专题不需要传)
 * @param activityId 活动、专题id(可选 用于排除该活动的已存在的商品 修改用到)
 * @return {[type]}
 */
export const _getMallGoodsSkuListOfGoodsForActivity = ({
	   shopId,goodsId,beginDtm,endDtm,activityId,isExchange,
	  }) => {
    return http.post('/mall/skuController/getMallGoodsSkuListOfGoodsForActivity', {
	   shopId,goodsId,beginDtm,endDtm,activityId,isExchange,
  });
};

/**
 * 分页查询商品列表 xwen
 * @param goodsId 商品编号(可选)
 * @param goodsSn 商品编码(可选)
 * @param goodsName 商品名称(可选)
 * @param pageNo 第几页(不传默认1)
 * @param pageSize 页大小(不传默认20)
 * @param orderByKey 排序字段(可选 表的字段)
 * @param orderByValue 排序值 DESC/ASC(可选)
 * @return {[type]}
 */
export const _getMallGoodsListForCoupon = ({
	   goodsId,goodsSn,goodsName,goodsFullName
	  ,pageNo,pageSize,orderByKey,orderByValue}) => {
    return http.post('/mall/goods/getMallGoodsListForCoupon', {
     goodsId,goodsSn,goodsName,goodsFullName
	  ,pageNo,pageSize,orderByKey,orderByValue
  });
};

/**
 * 分页查询sku优惠商品列表 xwen
 * @param goodsSkuId SKU商品编号(可选)
 * @param goodsSkuName SKU商品名称(可选)
 * @param goodsSn 商品编码(可选)
 * @param goodsName 商品名称(可选)
 * @param pageNo 第几页(不传默认1)
 * @param pageSize 页大小(不传默认20)
 * @param orderByKey 排序字段(可选 表的字段)
 * @param orderByValue 排序值 DESC/ASC(可选)
 * @return {[type]}
 */
export const _getMallGoodsSkuListForCoupon = ({
	   goodsSkuId,goodsSkuName,goodsSn,goodsName
	  ,pageNo,pageSize,orderByKey,orderByValue}) => {
    return http.post('/mall/skuController/getMallGoodsSkuListForCoupon', {
	   goodsSkuId,goodsSkuName,goodsSn,goodsName
    ,pageNo,pageSize,orderByKey,orderByValue
  });
};