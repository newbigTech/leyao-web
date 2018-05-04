import http from 'src/lib/utils/https'

/**
 * 查询字典列表 wbj
 * @param keyCode 参数码
 * @param pKeyValue 父参数值
 * @return {[type]}
 */
export const _getDictionary = ({keyCode,pKeyValue}) => {
    return http.post('/pub/pubController/getDictionary', {keyCode,pKeyValue});
};