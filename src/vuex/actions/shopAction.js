import {
    _getShopFileClassifyList,
    _getMallShopFileData,
    _addMallShopFile,
    _getSupplierShopPageList,
    _queryMallTagPageList,
    _addOrUpdateMallTag,
    _deleteMallTag,
    _getUserShopList,
    _changeShopLogin,
    _getMallOpenVoList,
    _addOrUpdateMallOpen,
    _deleteMallOpen,
    _getMallShopObj
} from '../api/shopAPI'

/**
 * 查询店铺开放API列表
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getMallOpenVoList = (params) => _getMallOpenVoList(params).then(data => Promise.resolve(data))

/**
 * 新增修改API
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const addOrUpdateMallOpen = (params) => _addOrUpdateMallOpen(params).then(data => Promise.resolve(data))

/**
 * 删除API
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const deleteMallOpen = (params) => _deleteMallOpen(params).then(data => Promise.resolve(data))

/**
 * [获取店铺素材分类列表]
 * @type {[type]}
 */
export const getShopFileClassifyList = () => _getShopFileClassifyList().then(data => Promise.resolve(data))

/**
 * 获取店铺素材资源列表
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getMallShopFileData = (params) => _getMallShopFileData(params).then(data => Promise.resolve(data))

/**
 * 保存店铺素材资源
 * @param {[type]} params [详见API]
 * @return {[type]}       [详见API]
 */
export const addMallShopFile = (params) => _addMallShopFile(params).then(data => Promise.resolve(data))

/**
 * [分页查询店铺标签 add by cypeng 20161209]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const queryMallTagPageList = (params) => _queryMallTagPageList(params).then(data => Promise.resolve(data))

/**
 * [删除店铺标签 add by cypeng 20161209]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const deleteMallTag = (params) => _deleteMallTag(params).then(data => Promise.resolve(data))

/**
 * [新增/修改店铺标签 add by cypeng 20161209]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const addOrUpdateMallTag = (params) => _addOrUpdateMallTag(params).then(data => Promise.resolve(data))

/**
 * [分页查询运营商店铺列表 add by cypeng 20161205]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getSupplierShopPageList = (params) => _getSupplierShopPageList(params).then(data => Promise.resolve(data))
/**
 * [查询用户开通店铺列表]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getUserShopList = (params) => _getUserShopList(params).then(data => Promise.resolve(data))

/**
 * [用户切换店铺登录]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const changeShopLogin = (params) => _changeShopLogin(params).then(data => Promise.resolve(data))
/**
 * [获取店铺信息]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getMallShopObj = (params) => _getMallShopObj(params).then(data => Promise.resolve(data))