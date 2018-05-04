// import { Promise } from 'es6-promise' // es6-promise babel-runtime已自动包含
import * as MessageAPI from '../api/messageAPI'

/**
 * 获发送/草稿取消息列表
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getMallMessageList = (params) => {
     return MessageAPI._getMallMessageList(params).then((data) => Promise.resolve(data));
}
/**
 * 获接收取消息列表
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getMallMessageReceiverList = (params) => {
     return MessageAPI._getMallMessageReceiverList(params).then((data) => Promise.resolve(data));
}
/**
 * 标记消息为已读
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const signMallMessageReceiverIsReaded = (params) => {
     return MessageAPI._signMallMessageReceiverIsReaded(params).then((data) => Promise.resolve(data));
}
/**
 * 删除消息
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const deleteMallMessage = (params) => {
     return MessageAPI._deleteMallMessage(params).then((data) => Promise.resolve(data));
}
/**
 * 删除消息
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const deleteMallMessageReceiver = (params) => {
     return MessageAPI._deleteMallMessageReceiver(params).then((data) => Promise.resolve(data));
}