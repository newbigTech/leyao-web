import http from 'src/lib/utils/https'

 /**
 * 查询店铺/商品关注列表
 * @param shopId 对应商品评论关注(shopId/goodsId二选一)
 * @param goodsId 对应商品关注(shopId/goodsId二选一)
 * @param statusCode 状态 0 正常 1 失效 (可选)
   * @param deleteFlag 删除 0 正常 1 已删 (可选 默认0)
 * @param pageNo 第几页(不传默认1)
 * @param pageSize 页大小(不传默认20)
 * @param orderByKey 排序字段(可选 表的字段)
 * @param orderByValue 排序值 DESC/ASC(可选)
 */
export const _getMallUserEnshrineList = ({
	shopId,goodsId,statusCode,deleteFlag,
	pageNo,pageSize,orderByKey,orderByValue
	}) => {
    return http.post('/mall/mallUserEnshrineController/findMallUserEnshrineList', {
	shopId,goodsId,statusCode,deleteFlag,
	pageNo,pageSize,orderByKey,orderByValue
  });
};
 /**
 * 删除店铺/商品关注
 * @param enshrineId 收藏编号
 * @param goodsId 对应商品关注
 */
export const _deleteMallUserEnshrine = ({
	enshrineId,goodsId
	}) => {
    return http.post('/mall/mallUserEnshrineController/deleteMallUserEnshrine', {
	enshrineId,goodsId
  });
};
