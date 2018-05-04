// import { Promise } from 'es6-promise' // es6-promise babel-runtime已自动包含
import * as OrderVoucherAPI from '../api/orderVoucherAPI'

/**
 *  分页查询电商店铺/商品评论晒单列表
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getMallOrderVoucherList = (params) => {
     return OrderVoucherAPI._getMallOrderVoucherList(params).then((data) => Promise.resolve(data));
}
