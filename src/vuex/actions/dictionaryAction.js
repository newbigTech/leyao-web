import * as DictionaryAPI from '../api/dictionaryAPI'
/**
 * 获取字典列表
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const getDictionary = (params) => {
     return DictionaryAPI._getDictionary(params).then((data) => Promise.resolve(data));
}
