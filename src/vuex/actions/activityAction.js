// import { Promise } from 'es6-promise' // es6-promise babel-runtime已自动包含
import * as ActivityAPI from '../api/activityAPI'

/**
 *  分页查询电商活动/专题列表
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getMallActivityList = (params) => {
     return ActivityAPI._getMallActivityList(params).then((data) => Promise.resolve(data));
}
/**
 *  修改活动/专题
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const modifyMallActivity = (params) => {
     return ActivityAPI._modifyMallActivity(params).then((data) => Promise.resolve(data));
}
/**
 *  删除活动/专题
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const deleteMallActivity = (params) => {
     return ActivityAPI._deleteMallActivity(params).then((data) => Promise.resolve(data));
}
/**
 *  新增活动/专题
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const addMallActivity = (params) => {
     return ActivityAPI._addMallActivity(params).then((data) => Promise.resolve(data));
}
/**
 *  验证活动/专题名称是否存在
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const validMallActivityName = (params) => {
     return ActivityAPI._validMallActivityName(params).then((data) => Promise.resolve(data));
}
/**
 *  验证活动/专题全名是否存在
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const validMallActivityFullName = (params) => {
     return ActivityAPI._validMallActivityFullName(params).then((data) => Promise.resolve(data));
}
/**
 *  新增活动/专题商品
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const addMallActivityGoods = (params) => {
     return ActivityAPI._addMallActivityGoods(params).then((data) => Promise.resolve(data));
}
/**
 *  修改电商活动/专题商品
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const modifyMallActivityGoods = (params) => {
     return ActivityAPI._modifyMallActivityGoods(params).then((data) => Promise.resolve(data));
}
/**
 *  删除电商活动/专题商品
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const deleteMallActivityGoods = (params) => {
     return ActivityAPI._deleteMallActivityGoods(params).then((data) => Promise.resolve(data));
}
/**
 *  排序电商活动/专题商品
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const sortMallActivityGoods = (params) => {
     return ActivityAPI._sortMallActivityGoods(params).then((data) => Promise.resolve(data));
}
/**
 *  排序电商活动/专题商品标签
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const sortMallActivityGoodsSign = (params) => {
     return ActivityAPI._sortMallActivityGoodsSign(params).then((data) => Promise.resolve(data));
}
/**
 *  修改活动/专题商品的标签
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const modifyMallActivityGoodsBySign = (params) => {
     return ActivityAPI._modifyMallActivityGoodsBySign(params).then((data) => Promise.resolve(data));
}
/**
 *  删除活动/专题商品的标签
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const deleteMallActivityGoodsBySign = (params) => {
     return ActivityAPI._deleteMallActivityGoodsBySign(params).then((data) => Promise.resolve(data));
}
/**
 *  查询电商活动/专题分类列表
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getMallActivityGoodsSignList = (params) => {
     return ActivityAPI._getMallActivityGoodsSignList(params).then((data) => Promise.resolve(data));
}
/**
 *  查询电商活动/专题分类列表
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getMallActivityGoodsList = (params) => {
     return ActivityAPI._getMallActivityGoodsList(params).then((data) => Promise.resolve(data));
}
 /**
 *  查询电商活动/专题活动页
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getMallActivityPageOfActivity = (params) => {
     return ActivityAPI._getMallActivityPageOfActivity(params).then((data) => Promise.resolve(data));
}
/**
 *  保存电商活动/专题活动页
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const saveMallActivityPage = (params) => {
     return ActivityAPI._saveMallActivityPage(params).then((data) => Promise.resolve(data));
}
/**
 *  删除电商活动/专题活动页
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const deleteMallActivityPageOfActivity = (params) => {
     return ActivityAPI._deleteMallActivityPageOfActivity(params).then((data) => Promise.resolve(data));
}
//***************************
/**
 * [获取运营下对应日期专题列表 如果日期为空 则默认返回品类列表 add by cypeng 2161215]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const querySupplierDaySubject=(params)=>ActivityAPI._querySupplierDaySubject(params).then(data => Promise.resolve(data))

/**
 * [分页查询电商电铺专题活动列表 add by cypeng 2161215]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const querySupplierActivityPageList=(params)=>ActivityAPI._querySupplierActivityPageList(params).then(data => Promise.resolve(data))
/**
 * [新增具体日期专题 add by cypeng 2161215]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const addDaySubject=(params)=>ActivityAPI._addDaySubject(params).then(data => Promise.resolve(data))
/**
 * [编辑具体日期专题 add by cypeng 2161215]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const editDaySubject=(params)=>ActivityAPI._editDaySubject(params).then(data => Promise.resolve(data))
/**
 * [移除日期专题 add by cypeng 2161215]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const deleteDaySubject=(params)=>ActivityAPI._deleteDaySubject(params).then(data => Promise.resolve(data))
/**
 * [保存日期首页 add by cypeng 20161223]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const saveDayHome=(params)=>ActivityAPI._saveDayHome(params).then(data => Promise.resolve(data))
/**
 * [查询日期首页 add by cypeng 20161223]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const queryDayHome=(params)=>ActivityAPI._queryDayHome(params).then(data => Promise.resolve(data))

/**
 * [更新电商app首页redis数据]
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export const reloadDayHome=(params)=>ActivityAPI._reloadDayHome(params).then(data => Promise.resolve(data))

/**
 * [查询首页导航列表]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const queryPageNavbarList=(params)=>ActivityAPI._queryPageNavbarList(params).then(data => Promise.resolve(data))
/**
 * [新增、修改电商首页导航]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const addOrUpdatePageNavbar=(params)=>ActivityAPI._addOrUpdatePageNavbar(params).then(data => Promise.resolve(data))
/**
 * [删除电商首页导航]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const deletePageNavbar=(params)=>ActivityAPI._deletePageNavbar(params).then(data => Promise.resolve(data))
/**
 * [更新首页导航排序]
 * @param  {[type]} params [description]
 * @return {[type]}        [description]
 */
export const updatePageNavbarSortIndex=(params)=>ActivityAPI._updatePageNavbarSortIndex(params).then(data => Promise.resolve(data))
/**
 *  查询电商活动换购商品列表
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getMallGoodsListByGoodsIds = (params) => {
     return ActivityAPI._getMallGoodsListByGoodsIds(params).then((data) => Promise.resolve(data));
}