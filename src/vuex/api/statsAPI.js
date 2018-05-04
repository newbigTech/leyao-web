import http from 'src/lib/utils/https'

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
export const getMarketingStats = (param) => http.post('/mall/mallStatsController/getMarketingStats', param);
/**
 * 营销统计清单 wbj
 * @param orderType -1订单汇总 0 普通订单 1 虚拟订单 2 充值订单 4 团购订单 5 拼团订单 6 网销卡订单
 * @param supplierId 所属运营商编号(supplierId/shopId 二选一)
 * @param shopId 卖家店铺编号(supplierId/shopId 二选一)
 * @param beginDay 查询开始日期(可选 格式:yyyy-MM-dd)
 * @param endDay 查询结束日期(可选 格式:yyyy-MM-dd)
 * @return {[type]}
 */
export const getMarketingStatsList = (param) => http.post('/mall/mallStatsController/getMarketingStatsList', param);
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
export const getSaleData = (param) => http.post('/mall/mallStatsController/getSaleData', param);
/**
 * 销售数据清单 wbj
 * @param orderType -1订单汇总 0 普通订单 1 虚拟订单 2 充值订单 4 团购订单 5 拼团订单 6 网销卡订单
 * @param supplierId 所属运营商编号(supplierId/shopId 二选一)
 * @param shopId 卖家店铺编号(supplierId/shopId 二选一)
 * @param beginDay 查询开始日期(可选 格式:yyyy-MM-dd)
 * @param endDay 查询结束日期(可选 格式:yyyy-MM-dd)
 * @return {[type]}
 */
export const getSaleDataList = (param) => http.post('/mall/mallStatsController/getSaleDataList', param);
/**
 * 销售数据 wbj
 * @param statsType 0日报 1周报 2月报
 * @param supplierId 所属运营商编号(supplierId/shopId 二选一)
 * @param shopId 卖家店铺编号(supplierId/shopId 二选一)
 * @param beginDay 查询开始日期(可选 格式:yyyy-MM-dd)
 * @param endDay 查询结束日期(可选 格式:yyyy-MM-dd)
 * @return {[type]}
 */
export const getSaleDetail = (param) => http.post('/mall/mallStatsController/getSaleDetail', param);
/**
 * 销售数据清单 wbj
 * @param orderType -1订单汇总 0 普通订单 1 虚拟订单 2 充值订单 4 团购订单 5 拼团订单 6 网销卡订单
 * @param supplierId 所属运营商编号(supplierId/shopId 二选一)
 * @param shopId 卖家店铺编号(supplierId/shopId 二选一)
 * @param beginDay 查询开始日期(可选 格式:yyyy-MM-dd)
 * @param endDay 查询结束日期(可选 格式:yyyy-MM-dd)
 * @return {[type]}
 */
export const getSaleDetailList = (param) => http.post('/mall/mallStatsController/getSaleDetailList', param);
/**
 * 销售数据 wbj
 * @param statsType 0日报 1周报 2月报
 * @param supplierId 所属运营商编号
 * @param beginDay 查询开始日期(可选 格式:yyyy-MM-dd)
 * @param endDay 查询结束日期(可选 格式:yyyy-MM-dd)
 * @return {[type]}
 */
export const getRechargeStats = (param) => http.post('/mall/mallStatsController/getRechargeStats', param);
/**
 * 销售数据清单 wbj
 * @param rechargeType 清单类型 -1全部类型 0 充值 1 充值卡 2 网销卡
 * @param rechargeStatus 充值/绑定/购买状态 -1全部状态  0 失败 1 成功
 * @param supplierId 所属运营商编号
 * @param beginDay 查询开始日期(可选 格式:yyyy-MM-dd)
 * @param endDay 查询结束日期(可选 格式:yyyy-MM-dd)
 * @return {[type]}
 */
export const getRechargeStatsList = (param) => http.post('/mall/mallStatsController/getRechargeStatsList', param);
/**
 * 用户余额 wbj
 * @param supplierId 所属运营商编号
 * @return {[type]}
 */
export const getUserBalanceStats = (param) => http.post('/mall/mallStatsController/getUserBalanceStats', param);
/**
 * 运营商用户有余额信息 wbj
 * @param supplierId 所属运营商编号
 * @return {[type]}
 */
export const getUserBalanceList = (param) => http.post('/mall/mallStatsController/getUserBalanceList', param);
/**
 * 运营商有余额的的充值卡/网销信息 wbj
 * @param supplierId 所属运营商编号
 * @param cardItemType 卡类型 0 实物卡 1 网销卡
 * @return {[type]}
 */
export const getRechargeCardItemList = (param) => http.post('/mall/mallStatsController/getRechargeCardItemList', param);