import http from 'src/lib/utils/https'

/**
 * 商品评论列表 wbj
 * @param shopId 店铺编号
 * @param goodsId 商品编号
 * @param goodsName 商品名称(可选 模糊)
 * @param orderNo   订单号(可选 模糊)
 * @param userAlias 评论用户名(可选 模糊)
 * @param userMobile 评论用户手机(可选 模糊)
 * @param voucherDtmSt 评论时间范围开始(可选 格式:yyyy-MM-dd HH:mm:ss)
 * @param voucherDtmEt 评论时间范围结束(可选 格式:yyyy-MM-dd HH:mm:ss)
 * @param secondVoucherDtmSt 追评时间范围开始(可选 格式:yyyy-MM-dd HH:mm:ss)
 * @param secondVoucherDtmEt 追评时间范围结束(可选 格式:yyyy-MM-dd HH:mm:ss)
 * @param grade 评分 1-10之间(可选 区间用-隔开 比如1分到4分是 1-4)
 * @param isPic 是否有图 0 无 1 是(可选)
 * @param isSecondVoucher 是否有追评 0 无 1 有(可选)
 * @param pageNo 第几页(不传默认1)
 * @param pageSize 页大小(不传默认20)
 * @param orderByKey 排序字段(可选 表的字段)
 * @param orderByValue 排序值 DESC/ASC(可选)
 * @return {[type]}
 */
export const _getMallGoodsVoucherList = (param) => {
    return http.post('/mall/mallGoodsVoucherController/findMallGoodsVoucherList', param);
};
/**
 * 修改商品评论 wbj
 * @param voucherId 评论编号 多个英文逗号隔开
 * @param isTop -1隐藏 0普通 1置顶(可选)
 * @param statusCode 状态 0待审 1发布 2审核不通过(可选)
 * @return {[type]}
 */
export const _modifyMallGoodsVoucher = (param) => {
    return http.post('/mall/mallGoodsVoucherController/modifyMallGoodsVoucher', param);
};
/**
 * 删除商品评论 wbj
 * @param voucherId 评论编号 多个英文逗号隔开
 * @return {[type]}
 */
export const _deleteMallGoodsVoucher = (param) => {
    return http.post('/mall/mallGoodsVoucherController/deleteMallGoodsVoucher', param);
};
/**
 * 回复商品评论 wbj
 * @param voucherId 回复的评论编号 多个英文逗号隔开
 * @param replyType 回复类型 0 店铺回复 1 用户回复
 * @param replyNote 回复内容
 * @return {[type]}
 */
export const _addMallGoodsVoucherReply = (param) => {
    return http.post('/mall/mallGoodsVoucherController/addMallGoodsVoucherReply', param);
};
/**
 * 商品评论回复列表 wbj
 * @param voucherId 店铺编号
 * @param pageNo 第几页(不传默认1)
 * @param pageSize 页大小(不传默认20)
 * @return {[type]}
 */
export const _getMallGoodsVoucherReplyList = (param) => {
    return http.post('/mall/mallGoodsVoucherController/findMallGoodsVoucherReplyList', param);
};