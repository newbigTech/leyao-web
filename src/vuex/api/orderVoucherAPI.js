import http from 'src/lib/utils/https'

/**
 * 查询电商店铺/商品评论晒单列表
 * @param shopId 对应商品评论晒单(shopId/goodsId二选一)
 * @param goodsId 对应商品评论晒单(shopId/goodsId二选一)
 * @param statusCode 状态 0 草稿 1 发布 (可选)
 * @param deleteFlag 删除 0 正常 1 已删 (可选 默认0)
 * @param pageNo 第几页(不传默认1)
 * @param pageSize 页大小(不传默认20)
 * @param orderByKey 排序字段(可选 表的字段)
 * @param orderByValue 排序值 DESC/ASC(可选)
 * @return {[type]}
 */
export const _getMallOrderVoucherList = ({
	shopId,goodsId,statusCode,deleteFlag,
	pageNo,pageSize,orderByKey,orderByValue
	}) => {
    return http.post('/mall/mallOrderVoucherController/findMallOrderVoucherList', {
	shopId,goodsId,statusCode,deleteFlag,
	pageNo,pageSize,orderByKey,orderByValue
    	});
};
