import http from 'src/lib/utils/https'


/**
 * 分页查询sku属性
 * @param  {[type]} params.classifyId [分类ID] 为0则查询运营商下所有公共属性
 * @param  {[type]} params.queryType  [查询类型 0 查询运营商规格 1 查询店铺规格 不传后端默认值为0]
 * @param  {[type]} params.pageNo     [当前页]
 * @param  {[type]} params.pageSize   [每页显示行数]
 * @return {[type]}                    [{success: true, msg: "操作成功", msgCode: 0, result: Object}]
 */
export const _getSkuPropertyPageList = (params) => {
    return http.post('/mall/skuController/getSkuPropertyPageList', params)
}

/**
 * 查询全局规格和品类下的规格
 * @param  {[type]} params.classifyId [品类Id]
 * @return {[List]}        [Json]
 */
export const _getGlobalSkuPropertyList=(params)=>http.post('/mall/skuController/getGlobalSkuPropertyList', params)

/**
 * 新增/修改sku属性
 * @param  {[type]} params.skuId      [主键] 修改操作必传,新增不传
 * @param  {[type]} params.classifyId [所属分类ID 公共属性传0]
 * @param  {[type]} params.queryType  [设置类型 0 运营商规格 1 店铺规格 不传后端默认值为0]
 * @param  {[type]} params.skuName    [属性名称]
 * @param  {[type]} params.sortIndex  [排序]
 * @return {[type]}                    [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _addOrUpdateSkuProperty = (params) => {
    return http.post('/mall/skuController/addOrUpdateSkuProperty', params)
}

/**
 * 删除sku属性
 * @param  {[type]} options.skuId      [主键]必传
 * @return {[type]}                    [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _deleteSkuProperty = ({ skuId }) => {
    return http.post('/mall/skuController/deleteSkuProperty', { skuId })
}

/**
 * 查询sku属性选项列表
 * @param  {[type]} options.skuId [属性ID]
 * @return {[type]}               [{success: true, msg: "操作成功", msgCode: 0, result: Object}]
 */
export const _getSkuPropertyItemList = ({ skuId }) => {
    return http.post('/mall/skuController/getSkuPropertyItemList', { skuId })
}

/**
 * 新增/修改sku属性选项
 * @param  {[type]} options.itemId       [主键]
 * @param  {[type]} options.skuId        [归属属性ID]
 * @param  {[type]} options.itemName     [选项值]
 * @param  {[type]} options.itemFullName [选项全称]
 * @param  {[type]} options.itemPic      [属性值图片]
 * @param  {[type]} options.itemSPic     [属性值小图片]
 * @param  {[type]} options.sortIndex    [排序]
 * @return {[type]}                      [{success: true, msg: "操作成功", msgCode: 0, result: Object}]
 */
export const _addOrUpdateSkuPropertyItem = (params) => {
    return http.post('/mall/skuController/addOrUpdateSkuPropertyItem', params)
}

/**
 * 删除sku属性
 * @param  {[type]} options.itemId      [主键]必传
 * @return {[type]}                    [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _deleteSkuPropertyItem = ({ itemId }) => {
    return http.post('/mall/skuController/deleteSkuPropertyItem', { itemId })
}

/**
 * [同步店铺ERP规格]
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export const _syncShopGoodsSku = (params) => http.post('/mall/skuController/syncShopGoodsSku', params)
