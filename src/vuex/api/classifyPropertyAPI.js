import http from 'src/lib/utils/https'

/**
 * 分页获取商品分类属性
 * @param  {[type]} options.classifyId [商品分类ID] 必填
 * @param  {[type]} options.pageNo     [当前页]
 * @param  {[type]} options.pageSize   [每页显示行数]
 * @return {[type]}                    [{success: true, msg: "操作成功", msgCode: 0, result: Object}]
 */
export const _getClassifyPropertyPageList=({classifyId,pageNo, pageSize})=>{
	return http.post('/mall/mallClassifyPropertyController/getMallClassifyPropertyPage', { classifyId, pageNo, pageSize })
}

/**
 * 获取品类属性列表（包含属性选项列表）
 * @param  {[type]} params.classifyId [品类Id]
 * @return {[List]}        [Json]
 */
export const _getClassifyPropertyAndItems=(params)=>http.post('/mall/mallClassifyPropertyController/getClassifyPropertyAndItems', params)
/**
 * 增加
 * @param  {[type]} param [description]
 * @return {[type]}       [description]
 */
export const _addMallClassifyProperty = ({propertyId,classifyId,propertyName,propertyType,isRequired,sortIndex}) => {
   	return http.post('/mall/mallClassifyPropertyController/addMallClassifyProperty',{propertyId,classifyId,propertyName,propertyType,isRequired,sortIndex})
}

/**
 * 删除
 * @param  {[type]} param [description]
 * @return {[type]}       [description]
 */
export const _deleteMallClassifyProperty = ({propertyId}) => {
   	return http.post('/mall/mallClassifyPropertyController/deleteMallClassifyProperty',{propertyId})
}

/**
 * 修改
 * @param  {[type]} param [description]
 * @return {[type]}       [description]
 */
export const _updateMallClassifyProperty = (param) => {
   	return http.post('/mall/mallClassifyPropertyController/updateMallClassifyProperty',param);
}

/**
 * 查询
 * @param  {[type]} mallPropertyId [description]
 * @return {[type]}            [description]
 */
export const _getMallClassifyPropertyByPropertyId = (mallPropertyId) => {
   	return http.post('/mall/mallClassifyPropertyController/getMallClassifyPropertyByPropertyId',{mallPropertyId});
}
