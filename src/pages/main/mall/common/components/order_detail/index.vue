<template lang="html">
    <div>
        <div class="container-fluid">
            <div class="container-fluid" style="padding-top: 10px;" v-if="mallOrder.orderCode!==99">
                <div class="well" style="text-align: center;align:center;">
                    <el-steps :space="300" :active="activeIndex" :align-center="true" finish-status="success">
                        <el-step title="买家下单" :description="dateTime1"></el-step>
                        <el-step title="买家付款" :description="dateTime2"></el-step>
                        <el-step title="商家发货" :description="dateTime3"></el-step>
                        <el-step title="交易完成" :description="dateTime4"></el-step>
                    </el-steps>
                </div>
            </div>
            <div class="container-fluid">
                <table class="table table-bordered">
                    <tbody>
                        <tr>
                            <td style="width:35%;margin:10px;vertical-align:top;">
                                <div class="page-header" style="margin:0;">
                                    <h1 style="font-weight: bold;">订单详情</h1>
                                </div>
                                <div class="container-fluid order-info">
                                    <div class="row order-row">
                                        <div class="col-md-12">
                                            <div class="order-status">
                                                <h1 v-if="mallOrder.orderCode===1">待确认</h1>
                                                <h1 v-if="mallOrder.orderCode===2">已确认</h1>
                                                <h1 v-if="mallOrder.orderCode===3">待支付</h1>
                                                <h1 v-if="mallOrder.orderCode===4">已支付/待发货</h1>
                                                <h1 v-if="mallOrder.orderCode===5">已发货</h1>
                                                <h1 v-if="mallOrder.orderCode===6">已完成</h1>
                                                <h1 v-if="mallOrder.orderCode===99">已关闭</h1>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row order-row">
                                        <div class="col-md-12">
                                            <div class="page-header" style="margin:0;">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row order-row">
                                        <div class="col-md-4 order-row-r">订单号：</div>
                                        <div class="col-md-8 order-row-l">{{mallOrder.orderNo}}</div>
                                    </div>
                                    <div class="row order-row">
                                        <div class="col-md-4 order-row-r">交易状态：</div>
                                        <div class="col-md-8 order-row-l">
                                            <p v-if="mallOrder.payStatus===0">未支付</p>
                                            <p v-if="mallOrder.payStatus===1">已支付</p>
                                        </div>
                                    </div>
                                    <div class="row order-row">
                                        <div class="col-md-4 order-row-r">订单类型：</div>
                                        <div class="col-md-8 order-row-l">
                                            <!--订单类型 0 普通订单 1 虚拟订单 2 充值订单 3 赠送订单 4 团购订单-->
                                            <p v-if="mallOrder.orderType===0">普通订单</p>
                                            <p v-if="mallOrder.orderType===1">虚拟订单</p>
                                            <p v-if="mallOrder.orderType===2">充值订单</p>
                                            <p v-if="mallOrder.orderType===3">赠送订单</p>
                                            <p v-if="mallOrder.orderType===4">团购订单</p>
                                            <p v-if="mallOrder.orderType===5">拼团订单</p>
                                            <p v-if="mallOrder.orderType===6">网销卡订单</p>
                                            <p v-if="mallOrder.orderType===7">网销卡赠送订单</p>
                                            <p v-if="mallOrder.orderType===8">换货订单</p>
                                            <p v-if="mallOrder.orderType===9">自提购订单</p>
                                        </div>
                                    </div>
                                    <div class="row order-row">
                                        <div class="col-md-4 order-row-r">买家账号：</div>
                                        <div class="col-md-8 order-row-l">{{mallOrder.userAlias}}({{mallOrder.userMobile}})</div>
                                    </div>
                                    <div class="row order-row" v-show="mallOrder.expressNo">
                                        <div class="col-md-4 order-row-r">物流单号：</div>
                                        <div class="col-md-8 order-row-l">{{mallOrder.expressNo}}({{mallOrder.expressCompanyName}})</div>
                                    </div>
                                    <div class="row order-row" v-if="changePriceObj">
                                        手工改价记录:
                                    </div>
                                    <div class="row order-row" v-if="changePriceObj">
                                        <div class="col-md-4 order-row-r">{{dateFormat1(changePriceObj.logDtm)}}</div>
                                        <div class="col-md-4 order-row-l">{{changePriceObj.logNote}}</div>
                                        <div class="col-md-4 order-row-l">修改人：{{changePriceObj.userAlias}}</div>
                                    </div>
                                </div>
                            </td>
                            <td style="width:35%;vertical-align:top;">
                                <div class="page-header" style="margin:0;">
                                    <h1 style="font-weight: bold;">付款信息</h1>
                                </div>
                                <div class="container-fluid order-info" v-if="mallOrder.payStatus===0">
                                    暂无相关数据！
                                </div>
                                <div class="container-fluid order-info" v-if="mallOrder.payStatus===1">
                                    <div class="row order-row">
                                        <div class="col-md-4 order-row-r">付款方式：</div>
                                        <div class="col-md-8 order-row-l">
                                            <span v-if="payOrderObj.payItems.COUPONS">优惠券支付</span>
                                            <span v-if="payOrderObj.payItems.RECHARGECARD">充值卡支付</span>
                                            <span v-if="payOrderObj.payItems.ACCOUNT">余额支付</span>
                                            <span v-if="payOrderObj.payItems.ALIPAY">支付宝支付
                                            <el-tooltip class="item" effect="dark" :content="`支付宝交易流水号：`+payOrderObj.tradeNo" placement="right-start">
                                  <i class="el-icon-information"></i>
                                 </el-tooltip></span>
                                            <span v-if="payOrderObj.payItems.WEIXIN">微信支付
                            <el-tooltip class="item" effect="dark" :content="`微信交易流水号：`+payOrderObj.tradeNo" placement="right-start">
                           <i class="el-icon-information"></i>
                           </el-tooltip>
                                            </span>
                                        </div>
                                    </div>
                                    <div class="row order-row" v-if="payOrderObj.paymentNo">
                                        <div class="col-md-4 order-row-r">交易流水号：</div>
                                        <div class="col-md-8 order-row-l">{{payOrderObj.paymentNo}}</div>
                                    </div>
                                    <div class="row order-row">
                                        <div class="col-md-4 order-row-r">付款时间：</div>
                                        <div class="col-md-8 order-row-l">{{dateTime2}}</div>
                                    </div>
                                    <div class="row order-row">
                                        <div class="col-md-4 order-row-r">商品总额：</div>
                                        <div class="col-md-8 order-row-l">¥ {{mallOrder.totalPrice||0}}</div>
                                    </div>
                                    <div class="row order-row">
                                        <div class="col-md-4 order-row-r">手工优惠 :</div>
                                        <div class="col-md-8 order-row-l">¥ {{Number(((mallOrder.alterPostPrice||0)+(mallOrder.alterPrice||0)).toFixed(2))}}</div>
                                    </div>
                                    <div class="row order-row">
                                        <div class="col-md-4 order-row-r">会员权益 :</div>
                                        <div class="col-md-8 order-row-l">¥ {{Number((mallOrder.vipPrice||0).toFixed(2))}}</div>
                                    </div>
                                    <div class="row order-row">
                                        <div class="col-md-4 order-row-r">应支付金额：</div>
                                        <div class="col-md-8 order-row-l">¥ {{mallOrder.amountPrice}}</div>
                                    </div>
                                    <div class="row order-row">
                                        <div class="col-md-4 order-row-r">运费金额 :</div>
                                        <div class="col-md-8 order-row-l">¥ {{mallOrder.postPrice}}</div>
                                    </div>
                                    <div class="row order-row">
                                        <div class="col-md-4 order-row-r">使用优惠券 :</div>
                                        <div class="col-md-8 order-row-l">¥ {{mallOrder.couponsPrice}}</div>
                                    </div>
                                    <div class="row order-row">
                                        <div class="col-md-4 order-row-r">订单总优惠 :</div>
                                        <div class="col-md-8 order-row-l">¥ {{mallOrder.totalCouponsPrice}}</div>
                                    </div>
                                </div>
                            </td>
                            <td style="width:30%;vertical-align:top;">
                                <div class="page-header" style="margin:0;padding-top: 0">
                                    <h1 style="font-weight: bold;">收货人信息</h1>
                                </div>
                                <div class="container-fluid order-info">
                                    <div class="row order-row">
                                        <div class="col-md-4 order-row-r">收货人：</div>
                                        <div class="col-md-8 order-row-l">{{mallOrder.adName}}</div>
                                    </div>
                                    <div class="row order-row">
                                        <div class="col-md-4 order-row-r">收货地址：</div>
                                        <div class="col-md-8 order-row-l">{{mallOrder.strAddress}}</div>
                                    </div>
                                    <div class="row order-row">
                                        <div class="col-md-4 order-row-r">手机号码：</div>
                                        <div class="col-md-8 order-row-l">{{mallOrder.adPhone}}</div>
                                    </div>
                                    <div class="row order-row">
                                        <div class="col-md-4 order-row-r">是否开发票：</div>
                                        <div class="col-md-8 order-row-l">{{mallOrder.hasInvoice==0?'不开':'开'}}</div>
                                    </div>
                                    <div class="row order-row" v-show="mallOrder.hasInvoice==1">
                                        <div class="col-md-4 order-row-r">发票类型：</div>
                                        <div class="col-md-8 order-row-l">{{mallOrder.invoiceType==0?'普通发票':mallOrder.invoiceType==1?'电子发票':'增值税发票'}}</div>
                                    </div>
                                    <div class="row order-row" v-show="mallOrder.hasInvoice==1">
                                        <div class="col-md-4 order-row-r">发票抬头：</div>
                                        <div class="col-md-8 order-row-l">{{mallOrder.invoiceTitle}}</div>
                                    </div>
                                    <div class="row order-row" v-show="mallOrder.hasInvoice==1">
                                        <div class="col-md-4 order-row-r">发票内容：</div>
                                        <div class="col-md-8 order-row-l">{{mallOrder.invoiceContent}}</div>
                                    </div>
                                </div>
                            </td>
                            <!-- <td style="width:10%;vertical-align:top;"></td> -->
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="container-fluid">
                <table class="table table-hover" style="border:2px solid #f5f5f5;">
                    <thead>
                        <tr>
                            <th style="width:25%">
                                商品
                            </th>
                            <th style="text-align: left;width:10%">
                                单价(元)
                            </th>
                            <th style="text-align: left;width:10%">
                                数量
                            </th>
                            <th style="text-align: left;width:15%">
                                活动优惠金额(元)
                            </th>
                            <th style="text-align: left;width:15%">
                                优惠券金额(元)
                            </th>
                            <th style="text-align: left;width:10%">
                                小计(元)
                            </th>
                            <th style="text-align: left;width:15%">
                                订单分配金额(元)
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(g,i) in tableData">
                            <td>
                                <div class="row">
                                    <div class="col-md-3">
                                        <img :src="cloudShowUrl + g.goodsPic" width="80px" height="80px" class="img-rounded">
                                    </div>
                                    <div class="col-md-9">
                                        <p style="color:blue">{{g.goodsName}}</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                ￥{{g.unitPrice}}
                            </td>
                            <td>
                                × {{g.number}}
                            </td>
                            <td>
                                <p v-if="g.activityPrice">￥{{Number((g.activityPrice||0).toFixed(2))}}</p>
                                <p v-else>￥0.00</p>
                                <!-- <p>(活动优惠金额：￥{{g.activityPrice}})</p>
                                <p>(优惠券金额：￥{{g.couponsPrice}})</p> -->
                            </td>
                            <td>
                                <p v-if="g.couponsPrice">￥{{Number((g.couponsPrice||0).toFixed(2))}}</p>
                                <p v-else>￥0.00</p>
                                <!-- <p>(活动优惠金额：￥{{g.activityPrice}})</p>
                                <p>(优惠券金额：￥{{g.couponsPrice}})</p> -->
                            </td>
                            <td>
                                <p>￥{{Number((g.totalPrice||0).toFixed(2))}}</p>
                            </td>
                            <td>
                                <p>￥{{Number((g.orderAllotPrice||0).toFixed(2))}}</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="page-header" style="margin:0;text-align: right;padding-right: 15px;">
                </div>
                <div class="page-header" style="margin:0;text-align: right;padding-right: 25px;padding-top: 10px;">
                    <h1><span style="font-weight: bold;">订单共 {{tableData.length}} 件商品，总计：<span style="color: #f44">￥{{mallOrder.totalPrice||0}}</span></span> （运费 ￥{{mallOrder.postPrice||0}}）</h1>
                </div>
            </div>
            <div class="container-fluid" v-if="mallOrder.isBack==1">
                <div class="page-header" style="margin:0;">
                    <h1 style="font-weight: bold;">退订单列表</h1>
                </div>
                <div class="_container" style="padding: 0;">
                    <table class="table table-bordered ui-table-order">
                        <thead>
                            <tr class="header-tr">
                                <th style="min-width: 500px;">
                                    商品
                                </th>
                                <th>
                                    单价(元)/数量
                                </th>
                                <th>
                                    退款原因/说明
                                </th>
                                <th>
                                    订单状态
                                </th>
                                <th>
                                    申请退款金额
                                </th>
                                <th>
                                    实退金额
                                </th>
                            </tr>
                        </thead>
                        <tbody v-if="backOrderData.length===0">
                            <tr>
                                <td colspan="6" style="text-align: center;">暂无相关数据</td>
                            </tr>
                        </tbody>
                        <tbody v-for="(item, index) in backOrderData" style="border:0 solid;">
                            <tr class="separation-row">
                                <td colspan="6"></td>
                            </tr>
                            <tr class="header-row">
                                <td colspan="5" class="text-left">
                                    <div>
                                        &nbsp;&nbsp;&nbsp; {{dateFormat(item)}}&nbsp;&nbsp;&nbsp;订单号: {{item.backOrderNo}} &nbsp;&nbsp;&nbsp;
                                        <label v-if="item.backOrderType===1">取消</label>
                                        <label v-if="item.backOrderType===2">退款</label>
                                        <label v-if="item.backOrderType===3">退货</label>
                                        <label v-if="item.backOrderType===4">换货</label>
                                        <label v-if="item.backOrderType===5">维修</label>
                                    </div>
                                    <div class="clearfix">
                                    </div>
                                </td>
                                <td class="text-right">
                                    <div>
                                       
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td class="goods-td" colspan="2">
                                    <table class="table table-bordered" style="margin-bottom: 0px;border:0 solid;">
                                        <tbody>
                                            <tr v-for="(g,i) in item.backOrderItemList">
                                                <td style="border-left:0 solid;border-right:0 solid;border-bottom:0 solid; ">
                                                    <div class="row">
                                                        <div class="col-md-2">
                                                            <img :src="cloudShowUrl + g.goodsPic" width="80px" height="80px" class="img-rounded">
                                                        </div>
                                                        <div class="col-md-8">
                                                            <p style="color:blue">{{g.goodsName}}</p>
                                                        </div>
                                                        <div class="col-md-2" style="text-align: center">
                                                            <p>￥{{g.unitPrice}}</p>
                                                            <br>
                                                            <p>× {{g.number}}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                                <td style="text-align: center">
                                   <p>{{item.reason}}</p>
                                   <p>{{item.refundNote}}</p>
                                </td>
                                <td style="text-align: center">
                                    <!--状态 1 申请中 2 待退款 3 待退货 4 货已退-待确认 5 失败 6 完成-->
                                    <p v-if="item.statusCode===1">申请中</p>
                                    <p v-if="item.statusCode===2">待退款</p>
                                    <p v-if="item.statusCode===3">待退货</p>
                                    <p v-if="item.statusCode===4">货已退-待确认</p>
                                    <p v-if="item.statusCode===5">失败</p>
                                    <p v-if="item.statusCode===6">已完成</p>
                                </td>
                                <td style="text-align: center">
                                    
                                    <p>￥ {{item.refundAmount}}</p>
                                </td>
                                <td style="text-align: center">
                                    ￥ {{item.actualRefundAmount}}
                                </td>
                            </tr>
                            <tr v-if="item.comments">
                                <td colspan="6" style="color: red;"><strong>备注：</strong>{{item.comments}}</td>
                            </tr>
                        </tbody>
                    </table>
                    <br>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import {
    getOrderObj
} from 'actions/mallShopOrderAction'
import {
    dateFormat as _dateFormat
} from "lib/utils/dateFormat"
export default {
    name: 'order_detail',
    props: {
        orderId: {
            type: Number,
            required: true
        }
    },
    computed: {
        cloudShowUrl() {
            return this.$store.getters.cloudShowUrl
        }
    },
    data() {
        return {
            changePriceObj:undefined,
            tableData: [],
            orderStatusData: [],
            backOrderData:[],
            dateTime1: '', //下单时间
            dateTime2: '', //付款时间
            dateTime3: '', //发货时间
            dateTime4: '', //交易完成时间
            activeIndex: 1,
            payOrderObj: {
                paymentNo: undefined,
                tradeNo: undefined,
                payItems: {
                    WEIXIN: undefined,
                    ACCOUNT: undefined,
                    ALIPAY: undefined,
                    COUPONS: undefined,
                    RECHARGECARD: undefined
                }
            },
            mallOrder: {
                orderId: undefined
            },
            dateFormat: function(row) {
                return _dateFormat(row.createdDtm, 'yyyy-MM-dd HH:mm:ss')
            },
            dateFormat1:function(v){
                return _dateFormat(v, 'yyyy-MM-dd HH:mm:ss')
            }
        }
    },
    methods: {
        loadOrderObj() {
            this.mallOrder.orderId = this.orderId
            getOrderObj(this.mallOrder).then(data => {
                const {
                    success,
                    msg,
                    result
                } = data || {}
                if (success) {
                    this.mallOrder = result.orderObj || {}
                    //是否退订 0 无 1 有
                    if(this.mallOrder.isBack==1){
                        this.backOrderData=result.backOrderData||[]
                    }
                        //进度条显示：订单状态 1 待确认 2 已确认 3 待付款 4 已支付 5 已发货 6 已完成 99 已取消
                    if (this.mallOrder.orderCode === 6) {
                        //交易完成
                        this.activeIndex = 4
                    } else if (this.mallOrder.orderCode === 5) {
                        //已发货
                        this.activeIndex = 3
                    } else if (this.mallOrder.orderCode === 4) {
                        //已付款
                        this.activeIndex = 2
                    } else {
                        this.activeIndex = 1
                    }
                    this.dateTime1 = _dateFormat(this.mallOrder.createdDtm, 'yyyy-MM-dd HH:mm:ss')
                    if (result.orderChangePriceData.length > 0){
                        this.changePriceObj=result.orderChangePriceData[0]
                    }
                    if (result.orderStatusData.length > 0) {
                        this.orderStatusData = result.orderStatusData || []
                            //订单状态 1 待确认 2 已确认 3 待付款 4 已支付 5 已发货 6 已完成 7 已支付，待确认 99 已取消
                        _.forEach(this.orderStatusData, item => {
                            if (item.statusCode === 4) {
                                this.dateTime2 = _dateFormat(item.logDtm, 'yyyy-MM-dd HH:mm:ss')
                            } else if (item.statusCode === 5) {
                                this.dateTime3 = _dateFormat(item.logDtm, 'yyyy-MM-dd HH:mm:ss')
                            } else if (item.statusCode === 6) {
                                this.dateTime4 = _dateFormat(item.logDtm, 'yyyy-MM-dd HH:mm:ss')
                            }else if (item.statusCode === 7) {
                                this.dateTime2 = _dateFormat(item.logDtm, 'yyyy-MM-dd HH:mm:ss')
                            }
                        })
                    }
                    if (_.size(result.orderObj.orderItemJson) > 5) {
                        this.tableData = JSON.parse(result.orderObj.orderItemJson)
                    }
                    if (_.size(result.orderObj.paymentBack) > 5) {
                        this.payOrderObj = JSON.parse(result.orderObj.paymentBack)
                    }
                } else {
                    this.$message.error(msg)
                }
            })
        }
    },
    created() {
        this.loadOrderObj()
    }
}
</script>
<style lang="sass">
.order-info {
    padding-top: 10px;
    height: 300px;
}

.order-info .order-row {
    padding-top: 15px;
}

.order-row-r {
    padding-right: 10px;
    text-align: right;
}

.order-row-l {
    padding-left: 0px;
}

.order-status h1 {
    font-weight: bold;
    font-size: 30px;
    text-align: center;
    padding-top: 10px;
}
</style>
