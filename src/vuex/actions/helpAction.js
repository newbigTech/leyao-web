import * as HelpAPI from '../api/supplierUserAPI'

/**
 * [查询帮助分类集合]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const queryHelpClassifyList = (params) => HelpAPI._queryHelpClassifyList(params).then(data => Promise.resolve(data))
/**
 * [查询帮助分类下内容集合]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const queryHelpContentList = (params) => HelpAPI._queryHelpContentList(params).then(data => Promise.resolve(data))
/**
 * [新增/修改帮助分类]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const addOrUpdateHelpClassify = (params) => HelpAPI._addOrUpdateHelpClassify(params).then(data => Promise.resolve(data))
/**
 * [删除帮助分类]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const deleteHelpClassify = (params) => HelpAPI._deleteHelpClassify(params).then(data => Promise.resolve(data))
/**
 * [新增/修改帮助内容]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const addOrUpdateHelpContent = (params) => HelpAPI._addOrUpdateHelpContent(params).then(data => Promise.resolve(data))
/**
 * [删除帮助内容]
 * @param  {[type]} params [详见API]
 * @return {[type]}        [详见API]
 */
export const deleteHelpContent = (params) => HelpAPI._deleteHelpContent(params).then(data => Promise.resolve(data))
