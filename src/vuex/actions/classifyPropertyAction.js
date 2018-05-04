import * as classifyPropertyAPI from '../api/classifyPropertyAPI'

/**
 * 分页查询商品分类属性
 * add by cypeng 20161031
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getClassifyPropertyPageList = (params) => {
    return classifyPropertyAPI._getClassifyPropertyPageList(params).then((data) => Promise.resolve(data))
}

/**
 * 获取品类属性列表（包含属性选项列表）
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getClassifyPropertyAndItems= (params) => classifyPropertyAPI._getClassifyPropertyAndItems(params)

//回调sso
export const gosso = (url) => {
    return classifyPropertyAPI._gosso(url)
}

/**
 * 新增
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const addMallClassifyProperty = (params) => {
    return classifyPropertyAPI._addMallClassifyProperty(params).then((data) => Promise.resolve(data))
}

/**
 * 删除
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const deleteMallClassifyProperty = (params) => {
    return classifyPropertyAPI._deleteMallClassifyProperty(params).then((data) => Promise.resolve(data))
}

/**
 * 修改
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _updateMallClassifyProperty = (params) => {
    return classifyPropertyAPI._updateMallClassifyProperty(params).then((data) => Promise.resolve(data))
}

/**
 * 查询
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const _getMallClassifyPropertyByPropertyId = (params) => {
    return classifyPropertyAPI._getMallClassifyPropertyByPropertyId(params).then((data) => Promise.resolve(data))
}
