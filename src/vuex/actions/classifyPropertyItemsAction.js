import * as classifyPropertyItemsAPI from '../api/classifyPropertyItemsAPI'


/**
 * 新增
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const addMallClassifyPropertyItems = (params) => {
     return classifyPropertyItemsAPI._addMallClassifyPropertyItems(params).then((data) => Promise.resolve(data));
}

/**
 * 删除
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const deleteMallClassifyPropertyItems = (params) => {
     return classifyPropertyItemsAPI._deleteMallClassifyPropertyItems(params).then((data) => Promise.resolve(data));
}

/**
 * 修改
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const updateMallClassifyPropertyItems = (params) => {
     return classifyPropertyItemsAPI._updateMallClassifyPropertyItems(params).then((data) => Promise.resolve(data));
}

/**
 * 查询
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getPropertyItemsByPropertyId = (params) => {
     return classifyPropertyItemsAPI._getPropertyItemsByPropertyId(params).then((data) => Promise.resolve(data));
}