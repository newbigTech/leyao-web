import http from 'src/lib/utils/https'

/**
 * 分页查询店铺自定义商品品牌列表
 * @param  {[type]} options.brandName        [商品品牌名称] 可为空
 * @param  {[type]} options.brandFullName    [商品品牌全名] 可为空
 * @param  {[type]} options.pageNo           [当前页] 可为空 默认值 1
 * @param  {[type]} options.pageSize         [每页显示记录数]可为空 默认值 20
 * @return {[type]}                          [{success: true, msg: "操作成功", msgCode: 0, result: Object}]
 */
export const _getCustomBrandPageList = ({
  brandName,
  brandFullName,
  pageNo,
  pageSize
}) => {
  return http.post('mall/mallBrand/getMallBrandPageList', {
    brandName,
    brandFullName,
    pageNo,
    pageSize
  });
};

/**
 * 保存店铺自定义商品品牌(新增/修改)
 * @param  {[type]} options.brandId       [商品品牌主键] 可为空 为空执行新增 非空执行修改
 * @param  {[type]} options.brandName     [商品品牌名称]
 * @param  {[type]} options.brandFullName [商品品牌全名]
 * @param  {[type]} options.sortIndex     [商品品牌排序]
 * @param  {[type]} options.brandNote     [商品品牌备注] 可为空
 * @param  {[type]} options.brandPic      [商品品牌图片MD5值] 可为空
 * @param  {[type]} options.brandSPic     [商品品牌小图片MD5值] 可为空
 * @return {[type]}                       [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _saveCustomBrand = ({
  brandId,
  brandName,
  brandFullName,
  sortIndex,
  brandNote,
  brandPic,
  brandSPic,
  comments
}) => {
  return http.post('/mall/mallBrand/saveCustomClassify', {
    brandId,
    brandName,
    brandFullName,
    sortIndex,
    brandNote,
    brandPic,
    brandSPic,
    comments
  });
}

/**
 * 删除店铺自定义商品品牌
 * @param  {[type]} options.brandId     [商品品牌主键]
 * @return {[type]}                     [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _deleteCustomBrand = ({
  brandId
}) => {
  return http.post('/mall/mallBrand/deleteMallBrand', {
    brandId
  });
}

/**
 * 根据主键查找自定义商品品牌对象
 * @param  {[type]} options.brandId     [商品品牌主键]
 * @return {[type]}                     [{success: true, msg: "操作成功", msgCode: 0, result: Object}]
 */
export const _getCustomBrandByID = ({
  brandId
}) => {
  return http.post('/mall/mallBrand/getMallBrandByID', {
    brandId
  });
}

/**
 * 查询品牌关联分类
 * @param  {[type]} brandId [品牌Id]
 * @param  {[type]}
 * @return {[type]}         [JSON]
 */
export const _getBrandClassifyList = ({
  brandId
}) => {
  return http.post('/mall/mallBrand/getBrandClassifyList', {
    brandId
  });
}

/**
 * 保存品牌关联分类
 * @param  {[type]} params [{brandId:品牌Id,classifyIds:分类Id集合 多个以逗号隔开}]
 * @return {[type]}        [{success: true, msg: "操作成功", msgCode: 0, result: null}]
 */
export const _saveBrandClassify = (params) => {
  return http.post('/mall/mallBrand/saveBrandClassify', params);
}

/**
 * [分页查询品类下品牌]
 * @param  {[type]} params.classifyId [品类id]
 * @param  {[type]} params.pageNo [当前页]
 * @param  {[type]} params.pageSize [每页显示行数]
 * @return {[type]}        [{success: true, msg: "操作成功", msgCode: 0, result: Page}]
 */
export const _getMallClassifyBrandPageList=(params)=>http.post('/mall/mallBrand/getMallClassifyBrandPageList', params)