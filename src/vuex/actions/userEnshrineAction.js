// import { Promise } from 'es6-promise' // es6-promise babel-runtime已自动包含
import * as UserEnshrineAPI from '../api/userEnshrineAPI'

/**
 *  分页查询电商店铺/商品关注列表
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getMallUserEnshrineList = (params) => {
     return UserEnshrineAPI._getMallUserEnshrineList(params).then((data) => Promise.resolve(data));
}
/**
 *  删除电商店铺/商品关注
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const deleteMallUserEnshrine = (params) => {
     return UserEnshrineAPI._deleteMallUserEnshrine(params).then((data) => Promise.resolve(data));
}