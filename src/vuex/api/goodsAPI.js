
import http from 'src/lib/utils/https'
/**
 * 分页查询商品列表
 * @param  {[type]} params [pageNo:当前页 默认1]
 *                         [pageSize:每页显示记录数 默认20]
 *                         [goodsName:商品名称 可空]
 *                         [goodsFullName:商品全称]
 *                         [goodsSn:商品编码]
 * @return {[type]}        [{success: true, msg: "操作成功", msgCode: 0, result: Object}]
 */
export const _getGoodsPageList = (params) => http.post('mall/goods/getMallGoodsPageList', params)

/**
 * 分页查询商品库存记录列表
 * @param  {[type]} params [pageNo:当前页 默认1]
 *                         [pageSize:每页显示记录数 默认20]
 *                         [goodsId:商品id]
 * @return {[type]}        [{success: true, msg: "操作成功", msgCode: 0, result: Object}]
 */
export const _getGoodStockLogPageList = (params) => http.post('mall/goods/getGoodStockLogPageList', params)

/**
 * 获取商品初始化界面数据
 * @param  {[type]} params.goodsId [商品主键 可为空]
 * @param  {[type]} params.classifyId [商品品类 可为空]
 * @param  {[type]} params.goodsType [商品类型 商品类型 0 SPU商品 1 SKU商品 2 组合商品 可为空]
 * @return {[type]}        [description]
 */
export const _getGoodsObj = (params) => http.post('mall/goods/getGoodsObj', params)

/**
 * 保存（新增/修改）商品管理-tab1界面属性
 * @param  {[type]} params.classifyId [品类ID]
 * @param  {[type]} params.goodsSn [商品编码]
 * @param  {[type]} params.goodsName [商品名称]
 * @param  {[type]} params.goodsFullName [商品全称]
 * @param  {[type]} params.goodsDesc [商品描述]
 * @param  {[type]} params.sortIndex [排序]
 * @param  {[type]} params.goodsPic [商品图片MD5]
 * @param  {[type]} params.goodsType [商品类型 0 SPU商品 1 SKU商品 2 组合商品]
 * @return {[responseObj]}        [{success: true, msg: "操作成功", msgCode: 0, result: Object}]
 */
export const _saveMallGoods = (params) => http.post('mall/goods/saveMallGoods', params)

/**
 * 保存商品管理-tab2界面属性-商品价格(保存商品价格相关信息  修改信息包括:1.限购数量 2.销售单位 3.市场价 4.销售价)
 * @param  {[type]} params.goodsId [商品主键]
 * @param  {[type]} params.limitNumber [限购数量 0 表示无限制]
 * @param  {[type]} params.unit [销售单位]
 * @param  {[type]} params.MPrice [市场价]
 * @param  {[type]} params.price [销售价]
 * @return {[type]}        [{success: true, msg: "操作成功", msgCode: 0, result: Object}]
 */
export const _saveGoodsPrice=(params)=>http.post('mall/goods/saveGoodsPrice',params)


/**
 * 保存商品管理-tab3界面属性-商品分组(保存商品分组相关信息)
 * @param  {[type]} params.goodsId [商品主键]
 * @param  {[type]} params.mPrice [分组商品销售价]
 * @param  {[type]} params.price [分组商品市场价]
 * @param  {[type]} params.bindGoodsDataJson [绑定商品 json格式字符串]
 * @return {[type]}        [{success: true, msg: "操作成功", msgCode: 0, result: Object}]
 */
export const _saveGoodsItems=(params)=>http.post('mall/goods/saveGoodsItems',params)

/**
 * 商品库存(保存商品库存相关信息 修改内容包括 1.库存类型 2.库存数量 3.库存提醒设置数量)
 * @param  {[type]} params.goodsId [商品主键]
 * @param  {[type]} params.stockType [库存类型 0 无限制 1 SPU独立库存 2 SKU共享库存 3 SKU独立库存]
 * @param  {[type]} params.stockNumber [库存数量]
 * @param  {[type]} params.goodsType [商品类型 0 SPU商品 1 SKU商品 2 组合商品]
 * @param  {[type]} params.addNumber [增加库存数]
 * @param  {[type]} params.goodSkuListJson [商品sku库存列表]
 * @return {[type]}        [{success: true, msg: "操作成功", msgCode: 0, result: Object}]
 */
export const _saveGoodsStock=(params)=>http.post('mall/goods/saveGoodsStock',params)

/**
 * 保存商品管理-tab4界面属性-保存商品自定义分组和标签
 * @param  {[type]} params.goodsId [商品主键]
 * @param  {[type]} params.customClassifyId [所属店铺自定义分类 0 与分类无关]
 * @param  {[type]} params.goodsSign [商品标签]
 * @return {[type]}        [{success: true, msg: "操作成功", msgCode: 0, result: Object}]
 */
export const _saveGoodsGroups=(params)=>http.post('mall/goods/saveGoodsGroups',params)

/**
 * 保存商品管理-tab5界面属性-保存商品关联图片
 * @param  {[type]} params.goodsId [商品主键]
 * @param  {[type]} params.fileDataJsonStr [图片list json]
 * @return {[type]}        [{success: true, msg: "操作成功", msgCode: 0, result: Object}]
 */
export const _saveGoodsFiles=(params)=>http.post('mall/goods/saveGoodsFiles',params)

/**
 * 获取商品图片集合
 * @param  {[type]} params.goodsId [商品主键]
 * @return {[type]}        [List json]
 */
export const _getGoodsFileList=(params)=>http.post('mall/goods/getGoodsFileList',params)
/**
 * 查询商品sku
 * @param  {[type]} params.goodsId [商品主键]
 * @return {[type]}        [List json]
 */
export const _getGoodSkuList=(params)=>http.post('mall/goods/getGoodSkuList',params)
/**
 * 查询组合商品列表
 * @param  {[type]} params.goodsId [商品主键]
 * @return {[type]}        [List json]
 */
export const _getMallGoodsItemList=(params)=>http.post('mall/goods/getMallGoodsItemList',params)
/**
 * 查询商品规格列表
 * @param  {[type]} params.goodsId [商品主键]
 * @return {[type]}        [List json]
 */
export const _getGoodsSkuMapList=(params)=>http.post('mall/goods/getGoodsSkuMapList',params)
/**
 * 查询商品属性列表
 * @param  {[type]} params.goodsId [商品主键]
 * @return {[type]}        [List json]
 */
export const _getGoodsPropertyList=(params)=>http.post('mall/goods/getGoodsPropertyList',params)
/**
 * 保存商品管理-tab6界面属性-保存商品sku信息
 * @param  {[type]} params.goodsId [商品主键]
 * @param  {[type]} params.skuPropsJson [sku规格属性集合json]
 * @param  {[type]} params.skusJson [商品sku集合json]
 * @return {[type]}        [{success: true, msg: "操作成功", msgCode: 0, result: Object}]
 */
export const _saveGoodsSku=(params)=>http.post('mall/goods/saveGoodsSku',params)

/**
 * 保存商品管理-tab7界面属性-保存商品属性
 * @param  {[type]} params.goodsId [商品主键]
 * @param  {[type]} params.goodsPropertyJson [商品主键]
 * @return {[type]}        [{success: true, msg: "操作成功", msgCode: 0, result: Object}]
 */
export const _saveGoodsProperty=(params)=>http.post('mall/goods/saveGoodsProperty',params)

/**
 * 商品管理-上架 下架商品
 * @param  {[type]} params.goodsId [商品主键]
 * @param  {[type]} params.statusCode [状态 0 下架 1 上架]
 * @return {[type]}        [{success: true, msg: "操作成功", msgCode: 0, result: Object}]
 */
export const _saveGoodState=(params)=>http.post('mall/goods/saveGoodState',params)

/**
 * 商品管理-移除商品
 * @param  {[type]} params.goodsId [商品主键]
 * @return {[type]}        [{success: true, msg: "操作成功", msgCode: 0, result: Object}]
 */
export const _delGoods=(params)=>http.post('mall/goods/delGoods',params)

/**
 * [获取商品详细信息 用于首页设置商品列表选择商品生成商品json]
 * @param  {[type]} params.goodsId [商品id]
 * @return {[type]}        [{success: true, msg: "操作成功", msgCode: 0, result: Object}]
 */
export const _getGoodsMapJson = (params) => http.post('mall/goods/getGoodsMapJson', params)

/**
 * 获取店铺品类列表
 * @param  {[type]} params [description]
 * @return {[type]}        [List json]
 */
export const _getShopClassifyData = (params) => http.post('mall/goods/getShopClassifyData',params)

/**
 * 获取商品关联分类
 * @param  {[type]} params [description]
 * @return {[type]}        [List json]
 */
export const _getMallGoodsClassifyMapList = (params) => http.post('mall/goods/getMallGoodsClassifyMapList',params)

/**
 * [分页查询erp商品列表]
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export const _getERPGoods = (params) => http.post('mall/goods/queryERPGoods',params)
/**
 * [查询ERP商品详情]
 * @param  {[type]} params.erpGoodsId [description]
 * @return {[type]}        [description]
 */
export const _queryERPGoodsDetail = (params) => http.post('mall/goods/queryERPGoodsDetail',params)
/**
 * [保存erp商品sku]
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export const _saveEPRGoodsSku = (params) => http.post('mall/goods/saveEPRGoodsSku',params)

/**
 * [查询商品sku]
 * @param  {[type]} params.goodsId [description]
 * @return {[type]}        [description]
 */
export const _getGoodsSkuObj = (params) => http.post('mall/goods/getGoodsSkuObj',params)