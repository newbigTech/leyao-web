import http from 'src/lib/utils/https'

/**
 * 分页查询店铺自定义分类列表
 * @param  {[type]} options.classifyName     [分类名称] 可为空
 * @param  {[type]} options.classifyFullName [分类全名] 可为空
 * @param  {[type]} options.pageNo           [当前页] 可为空 默认值 1
 * @param  {[type]} options.pageSize         [每页显示记录数]可为空 默认值 20
 * @return {[type]}                          [{success: true, msg: "操作成功", msgCode: 0, result: Object}]
 */
export const _getCustomClassifyPageList = (params) => http.post('/mall/shopCustomClassify/getCustomClassifyPageList', params)


/**
 * 保存店铺自定义分类(新增/修改)
 * @param  {[type]} options.customClassifyId [分类主键] 可为空 为空执行新增 非空执行修改
 * @param  {[type]} options.classifyName     [分类名称]
 * @param  {[type]} options.classifyFullName [分类全名]
 * @param  {[type]} options.sortIndex        [分类排序]
 * @param  {[type]} options.classifyNote     [分类备注] 可为空 
 * @param  {[type]} options.classifyPic      [分类图片MD5值] 可为空
 * @param  {[type]} options.classifySPic     [分类小图片MD5值] 可为空
 * @return {[type]}                          [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _saveCustomClassify = ({ customClassifyId, classifyName, classifyFullName, sortIndex, classifyNote, classifyPic, classifySPic }) => {
    return http.post('/mall/shopCustomClassify/saveCustomClassify', { customClassifyId, classifyName, classifyFullName, sortIndex, classifyNote, classifyPic, classifySPic })
}

/**
 * 删除店铺自定义分类
 * @param  {[type]} options.customClassifyId [分类主键]
 * @return {[type]}                          [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _deleteCustomClassify = ({ customClassifyId }) => {
    return http.post('/mall/shopCustomClassify/deleteCustomClassify', { customClassifyId })
}

/**
 * 根据主键查找自定义分类对象
 * @param  {[type]} options.customClassifyId [分类主键]
 * @return {[type]}                          [{success: true, msg: "操作成功", msgCode: 0, result: Object}]
 */
export const _getCustomClassifyByID = ({customClassifyId}) => {
    return http.post('/mall/shopCustomClassify/getCustomClassifyByID', {customClassifyId})
}
