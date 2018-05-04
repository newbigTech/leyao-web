import * as SkuPropertyAPI from '../api/skuPropertyAPI'

export const getSkuPropertyPageList = (params) => {
     return SkuPropertyAPI._getSkuPropertyPageList(params).then((data) => Promise.resolve(data))
}
export const addOrUpdateSkuProperty = (params) => {
     return SkuPropertyAPI._addOrUpdateSkuProperty(params).then((data) => Promise.resolve(data))
}
export const deleteSkuProperty = (params) => {
     return SkuPropertyAPI._deleteSkuProperty(params).then((data) => Promise.resolve(data))
}
export const getSkuPropertyItemList = (params) => {
     return SkuPropertyAPI._getSkuPropertyItemList(params).then((data) => Promise.resolve(data))
}
export const addOrUpdateSkuPropertyItem = (params) => {
     return SkuPropertyAPI._addOrUpdateSkuPropertyItem(params).then((data) => Promise.resolve(data))
}
export const deleteSkuPropertyItem = (params) => {
     return SkuPropertyAPI._deleteSkuPropertyItem(params).then((data) => Promise.resolve(data))
}
/**
 * 查询全局规格和品类下的规格
 * @param  {[type]} params.classifyId [品类Id]
 * @return {[List]}        [Json]
 */
export const getGlobalSkuPropertyList=(params)=>SkuPropertyAPI._getGlobalSkuPropertyList(params).then((data) => Promise.resolve(data))

/**
 * [同步店铺ERP规格]
 * @param  {[type]} params) [description]
 * @return {[type]}         [description]
 */
export const syncShopGoodsSku = (params) => SkuPropertyAPI._syncShopGoodsSku(params).then((data) => Promise.resolve(data))