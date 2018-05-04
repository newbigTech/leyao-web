import http from 'src/lib/utils/https'

/**
 * 增加
 * @param  {[type]} param [description]
 * @return {[type]}       [description]
 */
export const _addMallClassifyPropertyItems = ({itemId,itemName,propertyId,itemFullName,sortIndex,comments}) => {
   	return http.post('/mall/mallClassifyPropertyItemsController/addmallClassifyPropertyItems',{itemId,itemName,propertyId,itemFullName,sortIndex,comments}).then((data) => Promise.resolve(data));
}

/**
 * 删除
 * @param  {[type]} param [description]
 * @return {[type]}       [description]
 */
export const _deleteMallClassifyPropertyItems = ({itemId}) => {
   	return http.post('/mall/mallClassifyPropertyItemsController/deletemallClassifyPropertyItems',{itemId}).then((data) => Promise.resolve(data));
}

/**
 * 修改
 * @param  {[type]} param [description]
 * @return {[type]}       [description]
 */
export const _updateMallClassifyPropertyItems = (param) => {
   	return http.post('/mall/mallClassifyPropertyItemsController/updateMallClassifyPropertyItems',param).then((data) => Promise.resolve(data));
}

/**
 * 查询
 * @param  {[type]} mallPropertyId [description]
 * @return {[type]}            [description]
 */
export const _getPropertyItemsByPropertyId = ({propertyId}) => {
   	return http.post('/mall/mallClassifyPropertyItemsController/getPropertyItemsList',{propertyId}).then((data) => Promise.resolve(data));
}