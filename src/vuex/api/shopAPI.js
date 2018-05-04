import http from '../../lib/utils/https'
//import { Promise } from 'es6-promise';

/**
 * 获取店铺分页 * @param  {[type]} options.shopName [description]
 * @return {[type]}                  [description]
 */
export const _getMallShopList = (param) => {
   	return http.post('/shop/mallShopController/getMallShopPage',param, false).then((data) => Promise.resolve(data));
}


/**
 * 增加店铺
 * @param  {[type]} param [description]
 * @return {[type]}       [description]
 */
export const _addMallShop = (param) => {
   	return http.post('/shop/mallShopController/addMallShop',param).then((data) => Promise.resolve(data));
}

/**
 * 修改店铺
 * @param  {[type]} param [description]
 * @return {[type]}       [description]
 */
export const _updateMallShop = (param) => {
   	return http.post('/shop/mallShopController/updateMallShop',param).then((data) => Promise.resolve(data));
}


/**
 * 删除店铺
 * @param  {[type]} param [description]
 * @return {[type]}       [description]
 */
export const _deleteMallShop = (mallShopId) => {
   	return http.post('/shop/mallShopController/deleteMallShop',{"mallShopIdStr":mallShopId}).then((data) => Promise.resolve(data));
}

/**
 * 获取店铺信息
 * @param  {[type]} mallShopId [description]
 * @return {[type]}            [description]
 */
export const _getMallShopByShopId = (mallShopId) => {
   	return http.post('/shop/mallShopController/getMallShopByShopId',{"mallShopIdStr":mallShopId}).then((data) => Promise.resolve(data));
}

/**
 * 根据店铺Id获取对应的分类
 * @param  {[type]} mallShopId [description]
 * @return {[type]}            [description]
 */
export const _getMallShopClassifyListBySId = (mallShopId) => {
      return http.post('/shop/mallShopController/getMallShopClassifyListBySId',{"mallShopIdStr":mallShopId}).then((data) => Promise.resolve(data));
}

/**
 * 获取运营商自营店铺的数量
 * @param  {[type]} mallShopId [description]
 * @return {[type]}            [description]
 */
export const _getIsMyselfShopCount = () => {
      return http.post('/shop/mallShopController/getIsMyselfShopCount',{}).then((data) => Promise.resolve(data));
}

/**
 * 根据店铺获取运营的分类
 * @param  {[type]} mallShopId [description]
 * @return {[type]}            [description]
 */
export const _getMallShopClassifyList = () => {
      return http.post('/shop/mallShopController/getMallShopClassifyList',{}).then((data) => Promise.resolve(data));
}

/**
 * 根据店铺获取文件分类
 * @param  {[type]} mallShopId [description]
 * @return {[type]}            [description]
 */
export const _getMallShopFileClassifyZtree = () => {
      return http.post('/shop/mallShopController/getMallShopFileClassifyZtree',{}).then((data) => Promise.resolve(data));
}

/**
 * 获取店铺素材分类列表
 * @param  {[type]} mallShopId [description]
 * @return {[type]}            [description]
 */
export const _getMallShopFileClassfyTreeData = (cid) => {
   	return http.post('/shop/mallShopController/getFileClassifyTreeList',{"cid":cid}).then((data) => Promise.resolve(data));
}

/**
 * 获取店铺素材分类列表(重载)
 * @param  {[type]} mallShopId [description]
 * @return {[type]}            [description]
 */
export const _getMallShopFileClassfyTreeDatas = (cid,classifyName) => {
    return http.post('/shop/mallShopController/getFileClassifyTreeList',{"cid":cid,"classifyName":classifyName}).then((data) => Promise.resolve(data));
}

/**
 * 增加店铺素材分类
 * @param  {[type]} param [description]
 * @return {[type]}       [description]
 */
export const _addMallShopFileClassfy = (param) => {
   	return http.post('/shop/mallShopController/addShopFileClassify',param).then((data) => Promise.resolve(data));
}

/**
 * 修改店铺素材分类
 * @param  {[type]} param [description]
 * @return {[type]}       [description]
 */
export const _updateMallShopFileClassfy = (param) => {
   	return http.post('/shop/mallShopController/updateShopFileClassify',param).then((data) => Promise.resolve(data));
}


/**
 * 删除店铺素材分类
 * @param  {[type]} param [description]
 * @return {[type]}       [description]
 */
export const _deleteMallShopFileClassfy = (cid) => {
   	return http.post('/shop/mallShopController/deleteShopFileClassify',
   		{'cid':cid}).then((data) => Promise.resolve(data));
}



//*********************************************************************

/**
 * 获取店铺素材列表
 * @param  {[type]} mallShopId [description]
 * @return {[type]}            [description]
 */
export const _getMallShopFileData = (param) => {
      return http.post('/shop/mallShopController/getMallShopFileList',param).then((data) => Promise.resolve(data));
}

/**
 * 增加店铺素材
 * @param  {[type]} param [description]
 * @return {[type]}       [description]
 */
export const _addMallShopFile = (param) => {
      return http.post('/shop/mallShopController/addMallShopFile',param).then((data) => Promise.resolve(data));
}

/**
 * 修改店铺素材
 * @param  {[type]} param [description]
 * @return {[type]}       [description]
 */
export const _updateMallShopFile = (param) => {
      return http.post('/shop/mallShopController/updateMallShopFile',param).then((data) => Promise.resolve(data));
}


/**
 * 批量修改店铺素材对应的分类Id
 * @param  {[type]} param [description]
 * @return {[type]}       [description]
 */
export const _updateBatchShopFileClassifyId = (param) => {
      return http.post('/shop/mallShopController/updateBatchShopFileClassifyId',param).then((data) => Promise.resolve(data));
}


/**
 * 素材重命名
 * @param  {[type]} param [description]
 * @return {[type]}       [description]
 */
export const _updateShopFileName = (param) => {
      return http.post('/shop/mallShopController/updateShopFileName',param).then((data) => Promise.resolve(data));
}



/**
 * 删除店铺素材
 * @param  {[type]} param [description]
 * @return {[type]}       [description]
 */
export const _deleteMallShopFile = (fileId) => {
      return http.post('/shop/mallShopController/deleteMallShopFile',
         {'shopFileId':fileId}).then((data) => Promise.resolve(data));
}





/**
 * 获取公司列表
 * @param  {[type]} mallShopId [description]
 * @return {[type]}            [description]
 */
export const _findCompanyList = (param) => {
      return http.post('/shop/mallShopController/findCompanyList',param).then((data) => Promise.resolve(data));
}

/**
 * 获取运营商公司信息
 * @param  {[type]} mallShopId [description]
 * @return {[type]}            [description]
 */
export const _findSupplierCompanyInfo = () => {
      return http.post('/mall/supplier/getSupplierCompanyInfo',{}).then((data) => Promise.resolve(data));
}

/**
 * 判断 用户公司是否存在 xwen
 * @param companyName 验证值
 * @return {[type]}
 */
export const _validCompanyName = (companyName) => {
    return http.post('/shop/mallShopController/validCom',{"companyName":companyName}).then((data) => Promise.resolve(data));
};

/**
 * 判断 该公司是否能开店
 * @param companyId 验证值
 * @return {[type]}
 */
export const _validateExistMallShop = (companyId) => {
    return http.post('/shop/mallShopController/validateExistMallShop',{"companyId":companyId}).then((data) => Promise.resolve(data));
};


/**
 * 判断 通过Id获取运营商编码 xwen
 * @return {[type]}
 */
export const _queryLySupplierVoById = () => {
    return http.post('/shop/mallShopController/queryLySupplierVoById',{}).then((data) => Promise.resolve(data));
};

/**
 * 用户列表 xwen
 * @param companyId 公司编号
 * @param userMobile 根据手机号查询(可选)
 * @param userAlias 根据用户名查询(可选)
 * @param pageNo  第几页
 * @param pageSize 页大小
 * @return {[type]}
 */
export const _getSSOUserPageList = ({companyId,userMobile,userAlias,pageNo,pageSize}) => {
    return http.post('/shop/mallShopController/findList', {companyId,userMobile,userAlias,pageNo,pageSize});
};

/**
 * 用户列表 xwen
 * @param companyId 公司编号
 * @param userMobile 根据手机号查询(可选)
 * @param userAlias 根据用户名查询(可选)
 * @param pageNo  第几页
 * @param pageSize 页大小
 * @return {[type]}
 */
export const _getBaseUserById = (adminUserId) => {
    return http.post('/shop/mallShopController/getBaseUserById', {"adminUserId":adminUserId}).then((data) => Promise.resolve(data));
};

/**
 * 获取店铺分类叶子节点集合(用于创建商品选择店铺分类) add by cypeng
 * @return {[type]} [List Json]
 */
export const _getShopClassifyList = () => http.post('/shop/mallShopController/getShopClassifyList')

/**
 * 获取店铺素材分类列表
 * @return {[type]} [List Json]
 */
export const _getShopFileClassifyList = () => http.post('/shop/mallShopController/getMallShopFileClassifyList')

/**
 * [分页查询店铺标签]
 * @param  {[type]} params.pageNo [当前页 默认1]
 * @param  {[type]} params.pageSize [每页显示记录数 默认20]
 * @param  {[type]} params.tagName [标签名]
 * @return {[type]}        [List json]
 */
export const _queryMallTagPageList = (parmas) => http.post('/shop/mallTag/queryMallTagPageList',parmas)

/**
 * [新增/修改店铺标签]
 * @param  {[type]} params.tagId [标签id 修改操作必传]
 * @param  {[type]} params.tagName [标签名]
 * @return {[type]}        [{success: true, msg: "操作成功", msgCode: 0, result: Object}]
 */
export const _addOrUpdateMallTag = (parmas) => http.post('/shop/mallTag/addOrUpdateMallTag',parmas)
/**
 * [删除店铺标签]
 * @param  {[type]} params.tagId [标签id 修改操作必传]
 * @return {[type]} [{success: true, msg: "操作成功", msgCode: 0, result: Object}]
 */
export const _deleteMallTag = (parmas) => http.post('/shop/mallTag/deleteMallTag',parmas)

/**
 * 分页查询运营商店铺列表 add by cypeng 20161205
 * @param  {[type]} params.pageNo [当前页 默认1]
 * @param  {[type]} params.pageSize [每页显示记录数 默认20]
 * @param  {[type]} params.shopName [店铺名称]
 * @return {[type]}        [List json]
 */
export const _getSupplierShopPageList=(params)=>http.post('/shop/mallShopController/getSupplierShopPageList',params)

/**
 * [查询用户开通店铺列表]
 * @param  {[type]} params [description]
 * @return {[type]}        [List JSON]
 */
export const _getUserShopList = (params) => http.post('/shop/mallShopController/getUserShopList',params)

/**
 * [用户切换店铺登录]
 * @param  {[type]} params.companyId [公司id]
 * @return {[type]}        [{success: true, msg: "操作成功", msgCode: 0, result: Object}]
 */
export const _changeShopLogin = (params) => http.post('/shop/mallShopController/changeShopLogin',params)

/**
 * [查询店铺开放API列表]
 * @param  {[type]} params [description]
 * @return {[type]}        [List JSON]
 */
export const _getMallOpenVoList = (params) => http.post('mall/mallOpen/getMallOpenVoList',params)

/**
 * [新增修改API]
 * @param  {[type]} params.openId [主键]
 * @return {[type]}        [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _addOrUpdateMallOpen = (params) => http.post('mall/mallOpen/addOrUpdateMallOpen',params)

/**
 * [删除API]
 * @param  {[type]} params.openId [主键]
 * @return {[type]}        [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _deleteMallOpen = (params) => http.post('mall/mallOpen/deleteMallOpen',params)





/**
 * [设置满包邮 xwen]
 * @param  {[type]} params.openId [主键]
 * @return {[type]}        [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _setShopFreePostage = (params) => {
    return http.post('/shop/mallShopController/setShopFreePostage',params).then((data) => Promise.resolve(data));
}

/**
 * [获取店铺信息]
 * @param  {[type]} params) [description]
 * @return {[type]}         [description]
 */
export const _getMallShopObj = (params) => http.post('/shop/mallShopController/getMallShopObj',params)