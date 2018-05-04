import * as ShopCustomClassifyAPI from '../api/shopCustomClassifyAPI'

/**
 * 分页查询店铺自定义分类列表
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getCustomClassifyPageList = (params) => {
     return ShopCustomClassifyAPI._getCustomClassifyPageList(params).then((data) => Promise.resolve(data));
}

/**
 * 保存店铺自定义分类(新增/修改)
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const saveCustomClassify = (params) => {
     return ShopCustomClassifyAPI._saveCustomClassify(params).then((data) => Promise.resolve(data));
}

/**
 * 删除店铺自定义分类
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const deleteCustomClassify = (params) => {
     return ShopCustomClassifyAPI._deleteCustomClassify(params).then((data) => Promise.resolve(data));
}

/**
 * 根据主键查找自定义分类对象
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getCustomClassifyByID = (params) => {
     return ShopCustomClassifyAPI._getCustomClassifyByID(params).then((data) => Promise.resolve(data));
}
