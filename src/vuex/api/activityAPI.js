import http from 'src/lib/utils/https'

/**
 * 分页查询电商活动/专题 wbj
 * @param isActivity 是否活动(0专题 1活动)
 * @param activityType 活动类型1 特价 2 新人专享 3 包邮(可选 isActivity=1时起作用)
 * @param isPage 是否设置活动页页 0 否 1 是(可选)
 * @param activityId 活动/专题编号(可选)
 * @param activityName 专题/活动名(可选 模糊)
 * @param activityFullName 专题/活动全名(可选 模糊)
 * @param beginDtmSt 活动/专题开始时间范围开始(可选>= 格式:yyyy-MM-dd HH:mm:ss)
 * @param beginDtmEt 活动/专题开始时间范围结束(可选<= 格式:yyyy-MM-dd HH:mm:ss)
 * @param endDtmSt 活动/专题截止时间范围开始(可选>= 格式:yyyy-MM-dd HH:mm:ss)
 * @param endDtmEt 活动/专题截止时间范围结束(可选<= 格式:yyyy-MM-dd HH:mm:ss)
 * @param beginDtm 活动截止时间(可选 不能与beginDtmSt/beginDtmEt共存直接是>=beginDtm 格式:yyyy-MM-dd HH:mm:ss)
 * @param endDtm 活动截止时间(可选 不能与endDtmSt/endDtmEt共存直接是<=endDtm 格式:yyyy-MM-dd HH:mm:ss)
 * @param isMinField 传入1时只返回少量字段(可选)
 * @param statusCode 状态 0 停用 1 启用 (可选)
 * @param deleteFlag 删除 0 正常 1 已删 (可选 默认0)
 * @param pageNo 第几页(不传默认1)
 * @param pageSize 页大小(不传默认20)
 * @param orderByKey 排序字段(可选 表的字段)
 * @param orderByValue 排序值 DESC/ASC(可选)
 * @return {[type]}
 */
export const _getMallActivityList = ({
	isActivity,activityType,isPage,activityId,activityName,
	activityFullName,beginDtmSt,beginDtmEt,endDtmSt,endDtmEt,statusCode,deleteFlag,
	beginDtm,endDtm,isMinField,
	pageNo,pageSize,orderByKey,orderByValue
	}) => {
    return http.post('/mall/mallActivityController/findMallActivityList', {
	isActivity,activityType,isPage,activityId,activityName,
	activityFullName,beginDtmSt,beginDtmEt,endDtmSt,endDtmEt,statusCode,deleteFlag,
	beginDtm,endDtm,isMinField,
	pageNo,pageSize,orderByKey,orderByValue
    	});
};

/**
 * 修改活动/专题 wbj
 * @param activityId 活动/专题编号
 * @param statusCode 状态 0 草稿 1 发布 (可选)
 * @param activityName 专题/活动名(可选)
 * @param activityFullName 专题/活动全名(可选)
 * @param beginDtm 活动/专题开始时间(可选 格式:yyyy-MM-dd HH:mm:ss)
 * @param endDtm 活动/专题截止时间(可选 格式:yyyy-MM-dd HH:mm:ss)
 * @param activityIcon 专题/活动图标(可选)
 * @param activityPic 专题/活动图片(可选)
 * @param activitySPic 专题/活动小图片(可选)
 * @param activitySign 专题/活动标签(可选)
 * @param activityLimitPrice 活动约束金额(可选)
 * @param activityJson 专题/活动约束Json(可选)
 * @return {[type]}
 */
export const _modifyMallActivity = ({
	activityId,statusCode,activityName,activityFullName,beginDtm,endDtm,
	activityIcon,activityPic,activitySPic,activitySign,activityLimitPrice,activityJson
	}) => {
	return http.post('/mall/mallActivityController/modifyMallActivity', {
	activityId,statusCode,activityName,activityFullName,beginDtm,endDtm,
	activityIcon,activityPic,activitySPic,activitySign,activityLimitPrice,activityJson
	});
};
/**
 * 删除电商活动/专题 在未使用状态可以删除同时删除activity_goods、activity_page表
 * @param activityId 活动/专题编号 多个英文逗号隔开
 * @return {[type]}
 */
export const _deleteMallActivity = ({activityId}) => {
	return http.post('/mall/mallActivityController/deleteMallActivity', {activityId});
};

/**
 * 新增电商活动/专题 wbj
 * @param activityType 活动类型0专题 1 特价 2 新人专享 3 包邮
 * @param activityName 专题/活动名
 * @param activityFullName 专题/活动全名
 * @param beginDtm 专题/活动开始时间
 * @param endDtm 专题/活动 截止时间
 * @param statusCode 状态 0 草稿 1 发布(可选 默认0)
 * @param activityIcon 专题/活动图标(可选)
 * @param activityPic 专题/活动图片(可选)
 * @param activitySPic 专题/活动小图片(可选)
 * @param activitySign 专题/活动标签(可选)
 * @param activityLimitPrice 活动约束金额(可选 默认0)
 * @param activityJson 专题/活动约束Json格式：{
 		activityType//活动类型
 		priceType//价格类型
 		limitBuyNumber//限购数量(可选，新人专享用到)
 		fullPrice//满多少(可选，满减用到)
 		cutPrice//减多少(可选，满减用到)
 		goodsList:[//商品列表
 			{sign//标签(没有就"")
 			 itemList:[{//标签下的商品
 			 	goodsId//商品编号
 			 	goodsSkuId:sku商品编号(不是sku填写0)
 			 	price//活动价或打折(1-99) 由activityJson.priceType决定
 			 	stockNumber//库存0表示无限制
 			 	}]
 			}
 		]
  }
 * @return {[type]}
 */
export const _addMallActivity = ({
	activityType, activityName, activityFullName, beginDtm,endDtm,
	activityJson,statusCode,activityIcon,activityPic,activitySPic,activitySign,activityLimitPrice
	}) => {
	return http.post('/mall/mallActivityController/addMallActivity', {
	activityType, activityName, activityFullName, beginDtm,endDtm,
	activityJson,statusCode,activityIcon,activityPic,activitySPic,activitySign,activityLimitPrice
	});
};
/**
 * 验证活动/专题名称是否存在
 * @param activityName 活动/专题名称
 * @param activityId 活动/专题编号(可选)
 * @return {[type]}
 */
export const _validMallActivityName = ({activityName,activityId}) => {
	return http.post('/mall/mallActivityController/validMallActivityName', {activityName,activityId});
};
/**
 * 验证活动/专题全名是否存在
 * @param activityFullName 活动/专题全名
 * @param activityId 活动/专题编号(可选)
 * @return {[type]}
 */
export const _validMallActivityFullName = ({activityFullName,activityId}) => {
	return http.post('/mall/mallActivityController/validMallActivityFullName', {activityFullName,activityId});
};
/**
 * 新增电商活动/专题商品 wbj
	 * @param activityId 所属活动/专题编号
	 * @param sign 标签分类
	 * @param signSortIndex 标签排序
	 * @param goodsId 对应商品编号
	 * @param goodsSkuId 对应SKU商品编号 0 对应SPU商品
	 * @param price 价格/折扣比例(0-100)
	 * @param stockNumber 可售数量 0 表示无限制库存
	 * @param sortIndex 排序
 * @return {[type]}
 */
export const _addMallActivityGoods = ({
	activityId, sign, signSortIndex, goodsId,goodsSkuId,
	price,stockNumber,sortIndex
	}) => {
	return http.post('/mall/mallActivityController/addMallActivityGoods', {
	activityId, sign, signSortIndex, goodsId,goodsSkuId,
	price,stockNumber,sortIndex
	});
};
/**
 * 修改电商活动/专题商品 wbj
 * @param activityGoodsId 所属活动/专题商品编号
 * @param price 价格/折扣比例(0-100)(可选)
 * @param stockNumber 可售数量 0 表示无限制库存(可选)
 * @param sortIndex 排序(可选)
 * @return {[type]}
 */
export const _modifyMallActivityGoods = ({
	activityGoodsId, price, stockNumber,sortIndex
	}) => {
	return http.post('/mall/mallActivityController/modifyMallActivityGoods', {
	activityGoodsId, price, stockNumber,sortIndex
	});
};
/**
 * 删除电商活动/专题商品 wbj
 * @param activityGoodsId 所属活动/专题商品编号
 * @return {[type]}
 */
export const _deleteMallActivityGoods = ({
	activityGoodsId
	}) => {
	return http.post('/mall/mallActivityController/deleteMallActivityGoods', {
	activityGoodsId
	});
};
/**
 * 排序电商活动/专题商品 wbj
 * @param activityGoodsId 所属活动/专题商品编号
 * @param sortType 排序类型1上移2下移3置顶4置底
 * @return {[type]}
 */
export const _sortMallActivityGoods = ({
	activityGoodsId,sortType
	}) => {
	return http.post('/mall/mallActivityController/sortMallActivityGoods', {
	activityGoodsId,sortType
	});
};
/**
 * 排序电商活动/专题商品标签 wbj
 * @param activityGoodsId 所属活动/专题商品编号
 * @param sortType 排序类型1上移2下移3置顶4置底
 * @return {[type]}
 */
export const _sortMallActivityGoodsSign = ({
	activityId,sign,sortType
	}) => {
	return http.post('/mall/mallActivityController/sortMallActivityGoodsSign', {
	activityId,sign,sortType
	});
};
/**
 * 修改活动/专题商品的标签 wbj
 * @param activityId 所属活动/专题编号
 * @param sign 标签
 * @param newSign 新标签(可选)
 * @param signSortIndex 标签排序(可选)
 * @return {[type]}
 */
export const _modifyMallActivityGoodsBySign = ({
	activityId, sign, newSign,signSortIndex
	}) => {
	return http.post('/mall/mallActivityController/modifyMallActivityGoodsBySign', {
	activityId, sign, newSign,signSortIndex
	});
};
/**
 * 删除活动/专题商品的标签 wbj
 * @param activityId 所属活动/专题编号
 * @param sign 标签
 * @return {[type]}
 */
export const _deleteMallActivityGoodsBySign = ({
	activityId, sign
	}) => {
	return http.post('/mall/mallActivityController/deleteMallActivityGoodsBySign', {
	activityId, sign
	});
};
/**
 * 查询电商活动/专题分类列表 wbj
 * @param activityId 活动专题编号
 * @return {[type]}
 */
export const _getMallActivityGoodsSignList = ({
	activityId
	}) => {
  return http.post('/mall/mallActivityController/findMallActivityGoodsSignList', {
	activityId
  });
};
/**
 * 查询电商活动/专题分类列表
 * @param activityId 所属活动/专题编号
 * @param sign 标签(不传就查询该活动的所有商品)
 * @param pageNo 第几页(不传默认1)
 * @param pageSize 页大小(不传默认20)
 * @param orderByKey 排序字段(可选 表的字段)
 * @param orderByValue 排序值 DESC/ASC(可选)
 * @return {[type]}
 */
export const _getMallActivityGoodsList = ({
	activityId,sign,
	pageNo,pageSize,orderByKey,orderByValue
	}) => {
  return http.post('/mall/mallActivityController/findMallActivityGoodsList', {
	activityId,sign,
	pageNo,pageSize,orderByKey,orderByValue
  });
};
/**
 * 查询电商活动/专题活动页(最多5条记录)
 * @param activityId 所属活动/专题编号
 * @return {[type]}
 */
export const _getMallActivityPageOfActivity = ({
	activityId
	}) => {
  return http.post('/mall/mallActivityController/findMallActivityPageOfActivity', {
	activityId
  });
};
/**
 * 保存电商活动/专题活动页(最多5条记录)
 * @param activityId 所属活动/专题编号
 * @param activityPageJsonList[//最大5张图片
 		{pageId//修改原来的有
 		 pagePic//背景图片
	   width//背景宽
	   height//背景高
	   goodsList:{//该背景图片下的商品
	   	goodsId//商品编号,
	    goodsSkuId//sku商品编号,
	    left//商品距离左边(离背景图片左边)
	    top//商品距离上边(离背景图片上边)
	    width//商品宽
	    height//商品高
	   },
	  }
   ]
 * @return {[type]}
 */
export const _saveMallActivityPage = ({
	activityId,activityPageJsonList
	}) => {
  return http.post('/mall/mallActivityController/saveMallActivityPage', {
	activityId,activityPageJsonList
  });
};
/**
 * 删除电商活动/专题活动页
 * @param activityId 所属活动/专题编号
 * @return {[type]}
 */
export const _deleteMallActivityPageOfActivity = ({
	activityId
	}) => {
  return http.post('/mall/mallActivityController/deleteMallActivityPageOfActivity', {
	activityId
  });
};

/**
 * [获取运营下对应日期专题列表 如果日期为空 则默认返回品类列表]
 * @param  {[type]} params.day [专题日期 格式:YYYY-MM-DD]
 * @return {[type]}        [List json]
 */
export const _querySupplierDaySubject = (params) => http.post('/mall/supplier/querySupplierDaySubject', params)

/**
 * 分页查询电商电铺专题活动列表 add by cypeng 2161215
 * @param  {[type]} params.pageNo [当前页 默认1]
 * @param  {[type]} params.pageSize [每页显示记录数 默认20]
 * @param  {[type]} params.activityName [专题名称]
 * @param  {[type]} params.shopName [店铺名称]
 * @param  {[type]} params.beginDtm [专题开始时间]
 * @param  {[type]} params.endDtm [专题结束时间]
 * @return {[type]}        [List json]
 */
export const _querySupplierActivityPageList = (params) => http.post('/mall/supplier/querySupplierActivityPageList', params)

/**
 * 新增具体日期专题 add by cypeng 2161215
 * @param  {[type]} params.shopId [店铺Id]
 * @param  {[type]} params.activityName [专题名称]
 * @param  {[type]} params.activityId [专题Id]
 * @param  {[type]} params.activityIcon [活动图标]
 * @param  {[type]} params.startDay [开始日期 格式:YYYY-MM-DD]
 * @param  {[type]} params.endDay [结束日期 格式:YYYY-MM-DD]
 * @param  {[type]} params.lbs [位置 0 置顶 1 置低 2 自定义[某分类下面]]
 * @param  {[type]} params.classifyId [品类id]
 * @return {[type]}        [{success: true, msg: "操作成功", msgCode: 0, result: Object}]
 */
export const _addDaySubject = (params) => http.post('/mall/supplier/addDaySubject', params)

/**
 * 编辑具体日期专题 add by cypeng 2161215
 * @param  {[type]} params.dayClassifyId [专题主键]
 * @param  {[type]} params.activityName [专题名称]
 * @param  {[type]} params.activityIcon [活动图标]
 * @param  {[type]} params.lbs [位置 0 置顶 1 置低 2 自定义[某分类下面]]
 * @param  {[type]} params.classifyId [品类id]
 * @return {[type]}        [{success: true, msg: "操作成功", msgCode: 0, result: Object}]
 */
export const _editDaySubject = (params) => http.post('/mall/supplier/editDaySubject', params)
/**
 * 移除日期专题 add by cypeng 2161215
 * @param  {[type]} params.dayClassifyId [专题主键]
 * @param  {[type]} params.deleteSign [删除标识  null:移除单天专题 all:移除对应所有天的专题 day:移除传入日期范围专题]
 * @param  {[type]} params.startDay [开始日期 格式:YYYY-MM-DD]
 * @param  {[type]} params.endDay [结束日期 格式:YYYY-MM-DD]
 * @param  {[type]} params.activityId [专题Id]
 * @return {[type]}        [{success: true, msg: "操作成功", msgCode: 0, result: Object}]
 */
export const _deleteDaySubject = (params) => http.post('/mall/supplier/deleteDaySubject', params)

/**
 * 保存日期首页 add by cypeng 20161223
 * @param  {[type]} params.navbarId [导航ID 如果为-1或null表示非导航首页配置]
 * @param  {[type]} params.pageDaySet [页面是否有日期设置 0 无 1 有]
 * @param  {[type]} params.pageDay [编辑日期 格式:YYYY-MM-DD]
 * @param  {[type]} params.startDay [开始日期 格式:YYYY-MM-DD]
 * @param  {[type]} params.endDay [结束日期 格式:YYYY-MM-DD]
 * @param  {[type]} params.pageJson [页面json]
 * @return {[type]}        [{success: true, msg: "操作成功", msgCode: 0, result: Object}]
 */
export const _saveDayHome = (params) => http.post('/mall/supplier/saveDayHome', params)

/**
 * 查询日期首页 add by cypeng 20161223
 * @param  {[type]} params.navbarId [导航ID 如果为-1或null表示非导航首页配置]
 * @param  {[type]} params.pageDaySet [页面是否有日期设置 0 无 1 有]
 * @param  {[type]} params.pageDay [编辑日期 格式:YYYY-MM-DD]
 * @return {[type]}        [{success: true, msg: "操作成功", msgCode: 0, result: Object}]
 */
export const _queryDayHome = (params) => http.post('/mall/supplier/queryDayHome', params)

/**
 * [更新电商app首页redis数据]
 * @param  {[type]} params [description]
 * @return {[type]}        [{success: true, msg: "操作成功", msgCode: 0, result: Object}]
 */
export const _reloadDayHome = (params) => http.post('/mall/supplier/reloadDayHome', params)

/**
 * 查询首页导航列表
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export const _queryPageNavbarList = (params) => http.post('/mall/supplier/getPageNavbarList',params)
/**
 * [新增、修改电商首页导航]
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export const _addOrUpdatePageNavbar = (params) => http.post('/mall/supplier/addOrUpdatePageNavbar',params)
/**
 * [删除电商首页导航]
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export const _deletePageNavbar = (params) => http.post('/mall/supplier/deletePageNavbar',params)
/**
 * [更新首页导航排序]
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export const _updatePageNavbarSortIndex = (params) => http.post('/mall/supplier/updatePageNavbarSortIndex',params)
/**
 * 查询电商活动换购商品列表
 * @param goodsList [{goodsId,goodsSkuId}] 字符串
 * @return {[type]}
 */
export const _getMallGoodsListByGoodsIds = ({goodsList}) => {
	return http.post('/mall/mallActivityController/getMallGoodsListByGoodsIds', {goodsList});
};