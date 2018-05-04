import * as MallClassifyBrandMapAPI from '../api/mallClassifyBrandMapAPI'

/**
 * 保存商品分类与品牌绑定(新增/修改)
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const saveMallClassifyBrandMap = (params) => {
     return MallClassifyBrandMapAPI._saveMallClassifyBrandMap(params).then((data) => Promise.resolve(data));
}

/**
 * 删除商品分类与品牌绑定
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const deleteMallClassifyBrandMap = (params) => {
     return MallClassifyBrandMapAPI._deleteMallClassifyBrandMap(params).then((data) => Promise.resolve(data));
}
