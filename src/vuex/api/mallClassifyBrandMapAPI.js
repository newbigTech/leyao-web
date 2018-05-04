import http from 'src/lib/utils/https'

/**
 * 保存商品分类与品牌绑定(新增/修改)
 * @param  {[type]} options.mapId       [商品分类与品牌绑定主键] 可为空 为空执行新增 非空执行修改
 * @param  {[type]} options.classifyId  [商品分类id] 不可为空
 * @param  {[type]} options.brandId     [商品品牌id] 不可为空
 * @param  {[type]} options.comments    [备注]
 * @return {[type]}                     [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _saveMallClassifyBrandMap = ({ mapId, classifyId, brandId, comments }) => {
    return http.post('/mall/mallClassifyBrandMap/addMallClassifyBrandMap', {  mapId, classifyId, brandId, comments });
}

/**
 * 删除商品分类与品牌绑定
 * @param  {[type]} options.mapId     [商品分类与品牌绑定主键]
 * @return {[type]}                   [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _deleteMallClassifyBrandMap = ({ mapId }) => {
    return http.post('/mall/mallClassifyBrandMap/deleteMallClassifyBrandMap', { mapId });
}























