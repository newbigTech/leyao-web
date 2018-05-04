import * as MallBrandAPI from '../api/mallBrandAPI'

/**
 * 商品品牌查询店铺自定义分类列表
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getCustomBrandPageList = (params) => {
  return MallBrandAPI._getCustomBrandPageList(params).then((data) => Promise.resolve(data));
}

/**
 * 保存店铺自定义商品品牌(新增/修改)
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const saveCustomBrand = (params) => {
  return MallBrandAPI._saveCustomBrand(params).then((data) => Promise.resolve(data));
}

/**
 * 删除店铺自定义商品品牌
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const deleteCustomBrand = (params) => {
  return MallBrandAPI._deleteCustomBrand(params).then((data) => Promise.resolve(data));
}

/**
 * 根据主键查找自定义商品品牌对象
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getCustomBrandByID = (params) => {
  return MallBrandAPI._getCustomBrandByID(params).then((data) => Promise.resolve(data));
}

/**
 * 查询品牌关联分类
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getBrandClassifyList = (params) => {
  return MallBrandAPI._getBrandClassifyList(params).then(data => Promise.resolve(data))
}

/**
 * 保存品牌关联分类
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const saveBrandClassify=(params)=>{
  return MallBrandAPI._saveBrandClassify(params).then(data=>Promise.resolve(data))
}
/**
 * [分页查询品类下品牌]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getMallClassifyBrandPageList=(params)=>MallBrandAPI._getMallClassifyBrandPageList(params)
