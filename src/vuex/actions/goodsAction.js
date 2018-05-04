import * as GoodsAPI from '../api/goodsAPI'
import {
  _getShopClassifyList
} from '../api/shopAPI'

/**
 * 分页查询商品列表
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getGoodsPageList = (params) => GoodsAPI._getGoodsPageList(params).then(data => Promise.resolve(data))

/**
 * [description]
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export const getGoodStockLogPageList = (params) => GoodsAPI._getGoodStockLogPageList(params).then(data => Promise.resolve(data))
/**
 * 获取商品初始化界面数据
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getGoodsObj = (params) => GoodsAPI._getGoodsObj(params).then(data => Promise.resolve(data))
/**
 * 获取品类列表(用于创建商品选择店铺分类)
 * @return {[type]} [详见API]
 */
export const getShopClassifyList = () => _getShopClassifyList().then(data => Promise.resolve(data))

/**
 * 保存（新增/修改）商品管理-tab1界面属性
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const saveGoodsFormTab1 = (params) => GoodsAPI._saveMallGoods(params).then(data => Promise.resolve(data))

/**
 * 保存商品管理-tab2界面属性-商品价格(保存商品价格相关信息  修改信息包括:1.限购数量 2.销售单位 3.市场价 4.销售价)
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const saveGoodsFormTab2=(params)=>GoodsAPI._saveGoodsPrice(params).then(data=>Promise.resolve(data))

/**
 * 保存商品管理-tab3界面属性-商品分组(保存商品分组相关信息)
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const saveGoodsFormTab3=(params)=>GoodsAPI._saveGoodsItems(params).then(data=>Promise.resolve(data))

/**
 * 保存商品管理-tab3界面属性-商品库存(保存商品库存相关信息 修改内容包括 1.库存类型 2.库存数量 3.库存提醒设置数量)
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const saveGoodsStock=(params)=>GoodsAPI._saveGoodsStock(params).then(data=>Promise.resolve(data))
/**
 * 保存商品管理-tab4界面属性-保存商品自定义分组
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const saveGoodsFormTab4=(params)=>GoodsAPI._saveGoodsGroups(params).then(data=>Promise.resolve(data))
/**
 * 保存商品管理-tab5界面属性-保存商品关联图片
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const saveGoodsFormTab5=(params)=>GoodsAPI._saveGoodsFiles(params).then(data=>Promise.resolve(data))
/**
 * 获取商品图片集合
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getGoodsFileList=(params)=>GoodsAPI._getGoodsFileList(params).then(data=>Promise.resolve(data))
/**
 * 查询商品sku
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getGoodSkuList=(params)=>GoodsAPI._getGoodSkuList(params).then(data=>Promise.resolve(data))
/**
 * 查询组合商品列表
 * @param  {[type]} params.goodsId [商品主键]
 * @return {[type]}        [List json]
 */
export const getMallGoodsItemList=(params)=>GoodsAPI._getMallGoodsItemList(params).then(data=>Promise.resolve(data))
/**
 * 查询商品规格列表
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getGoodsSkuMapList=(params)=>GoodsAPI._getGoodsSkuMapList(params).then(data=>Promise.resolve(data))
/**
 * 查询商品属性列表
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getGoodsPropertyList=(params)=>GoodsAPI._getGoodsPropertyList(params).then(data=>Promise.resolve(data))

/**
 * 保存商品管理-tab6界面属性-保存商品sku信息
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const saveGoodsFormTab6=(params)=>GoodsAPI._saveGoodsSku(params).then(data=>Promise.resolve(data))
/**
 * 保存商品管理-tab7界面属性-保存商品属性
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const saveGoodsFormTab7=(params)=>GoodsAPI._saveGoodsProperty(params).then(data=>Promise.resolve(data))
/**
 * 商品管理-上架 下架商品
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const saveGoodState=(params)=>GoodsAPI._saveGoodState(params).then(data=>Promise.resolve(data))
/**
 * 商品管理-移除商品
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const delGoods=(params)=>GoodsAPI._delGoods(params).then(data=>Promise.resolve(data))

/**
 * 获取商品详细信息 用于首页设置商品列表选择商品生成商品json
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getGoodsMapJson=(params)=>GoodsAPI._getGoodsMapJson(params).then(data=>Promise.resolve(data))

/**
 * [获取店铺品类列表]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getShopClassifyData = (params) => GoodsAPI._getShopClassifyData(params).then(data=>Promise.resolve(data))
/**
 * [获取商品关联分类]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getMallGoodsClassifyMapList = (params) =>GoodsAPI._getMallGoodsClassifyMapList(params).then(data=>Promise.resolve(data))
/**
 * [分页查询erp商品列表]
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export const getERPGoods = (params) =>GoodsAPI._getERPGoods(params).then(data=>Promise.resolve(data))
/**
 * [查询ERP商品详情]
 * @param  {[type]} params.erpGoodsId [description]
 * @return {[type]}        [description]
 */
export const getERPGoodsDetail = (params) =>GoodsAPI._queryERPGoodsDetail(params).then(data=>Promise.resolve(data))
/**
 * [保存erp商品sku]
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export const saveEPRGoodsSku = (params) => GoodsAPI._saveEPRGoodsSku(params).then(data=>Promise.resolve(data))
/**
 * [查询商品sku]
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export const getGoodsSkuObj = (params) => GoodsAPI._getGoodsSkuObj(params).then(data=>Promise.resolve(data))