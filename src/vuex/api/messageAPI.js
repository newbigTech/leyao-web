import http from 'src/lib/utils/https'

/**
 * 接收消息列表 wbj
 * @param receiverType 接收者类型 0全平台 1运营商 2店铺 3用户
 * @param receiverId 接收者编号(运营商编号/店铺编号/用户编号)
 * @param isReaded 是否已读 0否 1是(可选)(messageType=0用到)
 * @param createdDtmSt 接收时间范围开始(可选 格式:yyyy-MM-dd HH:mm:ss)
 * @param createdDtmEt 接收时间范围结束(可选 格式:yyyy-MM-dd HH:mm:ss)
 * @param messageTitle 标题(可选 模糊)
 * @param messageContent 消息内容(可选 模糊)
 * @param statusCode 状态 0 停用 1 启用 (可选)
 * @param deleteFlag 删除 0 正常 1 已删 (可选 默认0)
 * @param pageNo 第几页(不传默认1)
 * @param pageSize 页大小(不传默认20)
 * @param orderByKey 排序字段(可选 表的字段)
 * @param orderByValue 排序值 DESC/ASC(可选)
 * @return {[type]}
 */
export const _getMallMessageReceiverList = (param) => {
    return http.post('/mall/mallMessageController/findMallMessageReceiverList', param);
};
/**
 * 发送/草稿消息列表 wbj
 * @param receiverType 接收者类型 0全平台 1运营商 2店铺 3用户
 * @param messageType 消息类型 0 系统消息 1 活动消息 2 其它
 * @param createdDtmSt 发送时间范围开始(可选 格式:yyyy-MM-dd HH:mm:ss)
 * @param createdDtmEt 发送时间范围结束(可选 格式:yyyy-MM-dd HH:mm:ss)
 * @param messageTitle 标题(可选 模糊)
 * @param messageContent 消息内容(可选 模糊)
 * @param statusCode 状态 0 停用 1 启用 (可选)
 * @param deleteFlag 删除 0 正常 1 已删 (可选 默认0)
 * @param pageNo 第几页(不传默认1)
 * @param pageSize 页大小(不传默认20)
 * @param orderByKey 排序字段(可选 表的字段)
 * @param orderByValue 排序值 DESC/ASC(可选)
 * @return {[type]}
 */
export const _getMallMessageList = (param) => {
    return http.post('/mall/mallMessageController/findMallMessageList', param);
};
/**
 * 标记消息为已读 wbj
 * @param msgReceiverId 接收消息编号(格式 messageId#msgReceiverId) 多个英文逗号隔开
 * @param isReaded 是否已读(如果传入0 那么会标记为未读  默认是1)
 * @return {[type]}
 */
export const _signMallMessageReceiverIsReaded = (param) => {
    return http.post('/mall/mallMessageController/signMallMessageReceiverIsReaded', param);
};
/**
 * 删除消息 wbj
 * @param messageId 发送消息编号 多个英文逗号隔开
 * @return {[type]}
 */
export const _deleteMallMessage = (param) => {
    return http.post('/mall/mallMessageController/deleteMallMessage', param);
};
/**
 * 删除消息 wbj
 * @param msgReceiverId 接收消息编号 多个英文逗号隔开(已接收用到)
 * @return {[type]}
 */
export const _deleteMallMessageReceiver = (param) => {
    return http.post('/mall/mallMessageController/deleteMallMessageReceiver', param);
};