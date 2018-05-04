/**
 * Created by yujx on 2016/11/4.
 */
import http from 'src/lib/utils/https'
import httpJSON from 'src/lib/utils/httpsJSON'
/**
 * 添加或修改店铺配送设置
 * expressId 存在或不为空时 修改相应的 配日送价格
 * expressId 不存在 新增相应的 配日设置
 * @param expressWrap
 *      {
          shopId:1,
          expresses:[{
            expressId:3,province:"广东省",city:"深圳市",'statusCode':0,'deleteFlag':0,expressPrice:"20",expressType:"1",comments:"..."，areaExpressPrice:[{areaId:110115,text:"福田区",price:"10",comments:"..."}]
          }]   
        }
 * @return {[type]}       [description]
 */
export const _saveOrUpdateExpressSetting = (param) => {
  return httpJSON.post('/mall/shopExpress/saveExpresses',param);
};
/**
 * 根据条件查询
 * {province:"广东省",city:"深圳市",expressPrice:"20",expressType:"1"]}
 * 
 */
export const _findExpressSetting = (param) => {
  return http.post('/mall/shopExpress/findExpresses',param);
};

/**
 * 根据ids 删除配送设置
 * @param  "ids":"1，2，3";(expressId)
 *
 */
export const _deleteExpressSetting = (param) => {
  return http.post('/mall/shopExpress/delExpresses',param);
};
