import http from 'src/lib/utils/https'

/**
 * 增加商品分类
 * @param  {[type]} param [description]
 * @return {[type]}       [description]
 */
export const _addClassify = (param) => {
  return http.post('/mall/classify/addClassify',param)
}
/**
 * 查询单个商品分类
 * @param options.classifyId 商品分类
 * @return {[type]}       [description]
 */
export const _getClassifyById = (param) => {
  return http.post('/mall/classify/getClassifyById',param)
}
/**
 * 更新单个商品分类
 * @param options.classifyId 商品分类
 * @return {[type]}       [description]
 */
export const _updateClassifyById = (param) => {
  return http.post('/mall/classify/updateClassify',param)
}

/**
 * 获取运营商下商品分类列表
 * @param params.statusCode [查询状态 不传返回所有数据]
 * @return {[type]} [Json]
 */
export const _getClassifyList2zTree=(params)=>{
  return http.post('/mall/supplier/getClassifyListBySupplierId',params);
}

/**
 * 获取店铺品类列表
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export const _getShopClassifyData = (params) => http.post('mall/goods/getShopClassifyData',params)