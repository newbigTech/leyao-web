import * as API from '../api/statsAPI'
/**
 * 营销统计 wbj
 * @param statsType 0日报 1周报 2月报
 * @param orderType -1订单汇总 0 普通订单 1 虚拟订单 2 充值订单 4 团购订单 5 拼团订单 6 网销卡订单
 * @param supplierId 所属运营商编号(supplierId/shopId 二选一)
 * @param shopId 卖家店铺编号(supplierId/shopId 二选一)
 * @param beginDay 查询开始日期(可选 格式:yyyy-MM-dd)
 * @param endDay 查询结束日期(可选 格式:yyyy-MM-dd)
 * @return {[type]}
 */
export const getMarketingStats = (params) => API.getMarketingStats(params).then((data) => Promise.resolve(data));

/**
 * 营销统计清单 wbj
 * @param orderType -1订单汇总 0 普通订单 1 虚拟订单 2 充值订单 4 团购订单 5 拼团订单 6 网销卡订单
 * @param supplierId 所属运营商编号(supplierId/shopId 二选一)
 * @param shopId 卖家店铺编号(supplierId/shopId 二选一)
 * @param beginDay 查询开始日期(可选 格式:yyyy-MM-dd)
 * @param endDay 查询结束日期(可选 格式:yyyy-MM-dd)
 * @return {[type]}
 */
export const getMarketingStatsList = (params) => API.getMarketingStatsList(params).then((data) => Promise.resolve(data));
/**
 * 销售数据 wbj
 * @param statsType 0日报 1周报 2月报
 * @param orderType -1订单汇总 0 普通订单 1 虚拟订单 2 充值订单 4 团购订单 5 拼团订单 6 网销卡订单
 * @param supplierId 所属运营商编号(supplierId/shopId 二选一)
 * @param shopId 卖家店铺编号(supplierId/shopId 二选一)
 * @param beginDay 查询开始日期(可选 格式:yyyy-MM-dd)
 * @param endDay 查询结束日期(可选 格式:yyyy-MM-dd)
 * @return {[type]}
 */
export const getSaleData = (params) => API.getSaleData(params).then((data) => Promise.resolve(data));

/**
 * 销售数据清单 wbj
 * @param orderType -1订单汇总 0 普通订单 1 虚拟订单 2 充值订单 4 团购订单 5 拼团订单 6 网销卡订单
 * @param supplierId 所属运营商编号(supplierId/shopId 二选一)
 * @param shopId 卖家店铺编号(supplierId/shopId 二选一)
 * @param beginDay 查询开始日期(可选 格式:yyyy-MM-dd)
 * @param endDay 查询结束日期(可选 格式:yyyy-MM-dd)
 * @return {[type]}
 */
export const getSaleDataList = (params) => API.getSaleDataList(params).then((data) => Promise.resolve(data));
/**
 * 销售数据 wbj
 * @param statsType 0日报 1周报 2月报
 * @param supplierId 所属运营商编号(supplierId/shopId 二选一)
 * @param shopId 卖家店铺编号(supplierId/shopId 二选一)
 * @param beginDay 查询开始日期(可选 格式:yyyy-MM-dd)
 * @param endDay 查询结束日期(可选 格式:yyyy-MM-dd)
 * @return {[type]}
 */
export const getSaleDetail = (params) => API.getSaleDetail(params).then((data) => Promise.resolve(data));

/**
 * 销售数据清单 wbj
 * @param orderType -1订单汇总 0 普通订单 1 虚拟订单 2 充值订单 4 团购订单 5 拼团订单 6 网销卡订单
 * @param supplierId 所属运营商编号(supplierId/shopId 二选一)
 * @param shopId 卖家店铺编号(supplierId/shopId 二选一)
 * @param beginDay 查询开始日期(可选 格式:yyyy-MM-dd)
 * @param endDay 查询结束日期(可选 格式:yyyy-MM-dd)
 * @return {[type]}
 */
export const getSaleDetailList = (params) => API.getSaleDetailList(params).then((data) => Promise.resolve(data));
/**
 * 充值统计 wbj
 * @param statsType 0日报 1周报 2月报
 * @param supplierId 所属运营商编号
 * @param beginDay 查询开始日期(可选 格式:yyyy-MM-dd)
 * @param endDay 查询结束日期(可选 格式:yyyy-MM-dd)
 * @return {[type]}
 */
export const getRechargeStats = (params) => API.getRechargeStats(params).then((data) => Promise.resolve(data));

/**
 * 充值统计清单 wbj
 * @param rechargeType 清单类型 -1全部类型 0 充值 1 充值卡 2 网销卡
 * @param rechargeStatus 充值/绑定/购买状态 -1全部状态  0 失败 1 成功
 * @param supplierId 所属运营商编号
 * @param beginDay 查询开始日期(可选 格式:yyyy-MM-dd)
 * @param endDay 查询结束日期(可选 格式:yyyy-MM-dd)
 * @return {[type]}
 */
export const getRechargeStatsList = (params) => API.getRechargeStatsList(params).then((data) => Promise.resolve(data));

/**
 * 用户余额 wbj
 * @param supplierId 所属运营商编号
 * @return {[type]}
 */
export const getUserBalanceStats = (params) => API.getUserBalanceStats(params).then((data) => Promise.resolve(data));
/**
 * 运营商用户有余额信息 wbj
 * @param supplierId 所属运营商编号
 * @return {[type]}
 */
export const getUserBalanceList = (params) => API.getUserBalanceList(params).then((data) => Promise.resolve(data));
/**
 * 运营商有余额的的充值卡/网销信息 wbj
 * @param supplierId 所属运营商编号
 * @param cardItemType 卡类型 0 实物卡 1 网销卡
 * @return {[type]}
 */
export const getRechargeCardItemList = (params) => API.getRechargeCardItemList(params).then((data) => Promise.resolve(data));