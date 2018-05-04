import http from 'src/lib/utils/https'
/**
 * [分页查询赠送商品]
 * @param  {[type]} options.goodsName        [商品名称] 可为空
 * @param  {[type]} options.pageNo           [当前页] 可为空 默认值 1
 * @param  {[type]} options.pageSize         [每页显示记录数]可为空 默认值 20
 * @return {[type]}        [Page]
 */
export const _getGiftPageList = (params) => http.post('mall/gift/getGiftPageList', params)

/**
 * [新增、修改赠送商品]
 * @param  {[type]} params.goodsId [商品主键 修改必传]
 * @return {[type]}        [{success: true, msg: "操作成功", msgCode: 0, result: Object}]
 */
export const _addOrUpdateGift = (params) => http.post('mall/gift/addOrUpdateGift', params) 
/**
 * [删除赠送商品]
 * @param  {[type]} params.goodsId [商品主键]
 * @return {[type]}        [{success: true, msg: "操作成功", msgCode: 0, result: Object}]
 */
export const _deleteGift = (params) => http.post('mall/gift/deleteGift', params) 
/**
 * [上下架赠送商品]
 * @param  {[type]} params.goodsId [商品主键 修改必传]
 * @return {[type]}        [{success: true, msg: "操作成功", msgCode: 0, result: Object}]
 */
export const _updateGiftStatus = (params) => http.post('mall/gift/updateGiftStatus', params) 

/**
 * [设置赠送商品库存]
 * @param  {[type]} params.goodsId [商品主键 修改必传]
 * @return {[type]}        [{success: true, msg: "操作成功", msgCode: 0, result: Object}]
 */
export const _saveGiftStock = (params) => http.post('mall/gift/saveGoodsStock', params) 
/**
 * 赠品明细 wbj
 * @param goodsId 赠品编号
 * @return {[type]}
 */
export const _getMallGiftDetail = ({
	goodsId
	}) => {
    return http.post('/mall/gift/getMallGiftDetail', {
    	goodsId
    });
};