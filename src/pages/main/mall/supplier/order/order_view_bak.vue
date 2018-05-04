<template lang="html">
    <div>
        <!-- 导航面包屑 -->
        <div class="_breadcrumb">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/mall' }">商城</el-breadcrumb-item>
                <el-breadcrumb-item>电商订单管理</el-breadcrumb-item>
                <el-breadcrumb-item @click.native.prevent="onBack">订单管理</el-breadcrumb-item>
                <el-breadcrumb-item>订单详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
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
                                <div class="container-fluid order-info well">
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
                                            <p v-if="mallOrder.payStatus===0">普通订单</p>
                                            <p v-if="mallOrder.payStatus===1">虚拟订单</p>
                                            <p v-if="mallOrder.payStatus===2">充值订单</p>
                                            <p v-if="mallOrder.payStatus===3">赠送订单</p>
                                            <p v-if="mallOrder.payStatus===4">团购订单</p>
                                        </div>
                                    </div>
                                    <div class="row order-row">
                                        <div class="col-md-4 order-row-r">买家账号：</div>
                                        <div class="col-md-8 order-row-l">{{mallOrder.userAlias}}({{mallOrder.userMobile}})</div>
                                    </div>
                                </div>
                            </td>
                            <td style="width:30%;vertical-align:top;">
                                <div class="page-header" style="margin:0;">
                                    <h1 style="font-weight: bold;">付款信息</h1>
                                </div>
                                <div class="container-fluid order-info well" v-if="mallOrder.payStatus===0">
                                    暂无相关数据！
                                </div>
                                <div class="container-fluid order-info well" v-if="mallOrder.payStatus===1">
                                    <div class="row order-row">
                                        <div class="col-md-4 order-row-r">付款方式：</div>
                                        <div class="col-md-8 order-row-l">
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
                                    <div class="row order-row">
                                        <div class="col-md-4 order-row-r">交易流水号：</div>
                                        <div class="col-md-8 order-row-l">{{payOrderObj.paymentNo}}</div>
                                    </div>
                                    <div class="row order-row">
                                        <div class="col-md-4 order-row-r">付款时间：</div>
                                        <div class="col-md-8 order-row-l">{{dateTime2}}</div>
                                    </div>
                                    <div class="row order-row">
                                        <div class="col-md-4 order-row-r">商品总额：</div>
                                        <div class="col-md-8 order-row-l">¥ {{mallOrder.totalPrice}}</div>
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
                                        <div class="col-md-4 order-row-r">优惠券 :</div>
                                        <div class="col-md-8 order-row-l">¥ {{mallOrder.couponsPrice}}</div>
                                    </div>
                                    <div class="row order-row">
                                        <div class="col-md-4 order-row-r">订单优惠 :</div>
                                        <div class="col-md-8 order-row-l">¥ {{mallOrder.totalCouponsPrice}}</div>
                                    </div>
                                </div>
                            </td>
                            <td style="width:35%;vertical-align:top;">
                                <div class="page-header" style="margin:0;padding-top: 0">
                                    <h1 style="font-weight: bold;">收货人信息</h1>
                                </div>
                                <div class="container-fluid order-info well">
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
                                        <div class="col-md-4 order-row-r">买家留言：</div>
                                        <div class="col-md-8 order-row-l"></div>
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
                            <th style="width:35%">
                                商品
                            </th>
                            <th style="text-align: left;width:10%">
                                单价(元)
                            </th>
                            <th style="text-align: left;width:10%">
                                数量
                            </th>
                            <th style="text-align: left;width:20%">
                                优惠(元)
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
                                {{g.number}}{{g.unit}}
                            </td>
                            <td>
                                <p>￥{{g.activityPrice+g.couponsPrice}}</p>
                                <p>(活动优惠金额：￥{{g.activityPrice}})</p>
                                <p>(优惠券金额：￥{{g.couponsPrice}})</p>
                            </td>
                            <td>
                                <p>￥{{g.amountPrice}}</p>
                            </td>
                            <td>
                                <p>￥{{g.orderAllotPrice}}</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="page-header" style="margin:0;text-align: right;padding-right: 15px;">
                </div>
                <div class="page-header" style="margin:0;text-align: right;padding-right: 25px;padding-top: 10px;">
                    <h1><span style="font-weight: bold;">订单共 {{tableData.length}} 件商品，总计：<span style="color: #f44">￥{{mallOrder.amountPrice}}</span></span> （含运费 ￥{{mallOrder.postPrice}}）</h1>
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
import MD5 from 'crypto-js/md5'
export default {
    name: 'supplier_order_view',
    computed: {
        cloudShowUrl() {
            return this.$store.getters.cloudShowUrl
        }
    },
    data() {
        return {
            tableData: [],
            orderStatusData: [],
            dateTime1: '', //下单时间
            dateTime2: '', //付款时间
            dateTime3: '', //发货时间
            dateTime4: '', //交易完成时间
            activeIndex: 1,
            shopName: '',
            payOrderObj: {
                paymentNo: undefined,
                tradeNo: undefined,
                payItems: {
                    WEIXIN: undefined,
                    ACCOUNT: undefined,
                    ALIPAY: undefined
                }
            },
            mallOrder: {
                orderId: undefined,
                orderNo: ''
            }
        }
    },
    methods: {
        onBack() {
            let params = {
                    shopId: _.toNumber(this.mallOrder.shopId),
                    shopName: this.shopName,
                    r: _.toNumber(_.now())
                }
            params.passKey = MD5(JSON.stringify(params) + 'supplierOrderList').toString()
            this.$router.push({
                name: 'supplierOrderList',
                query: params
            })
        },
        loadOrderObj() {
            getOrderObj(this.mallOrder).then(data => {
                const {
                    success,
                    msg,
                    result
                } = data || {}
                if (success) {
                    this.mallOrder = result.orderObj || {}
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
                    if (_.size(result.orderStatusData) > 1) {
                        this.orderStatusData = result.orderStatusData || []
                            //订单状态 1 待确认 2 已确认 3 待付款 4 已支付 5 已发货 6 已完成 99 已取消
                        _.forEach(this.orderStatusData, item => {
                            if (item.StatusCode === 4) {
                                this.dateTime2 = _dateFormat(item.logDtm, 'yyyy-MM-dd HH:mm:ss')
                            } else if (item.StatusCode === 5) {
                                this.dateTime3 = _dateFormat(item.logDtm, 'yyyy-MM-dd HH:mm:ss')
                            } else if (item.StatusCode === 6) {
                                this.dateTime4 = _dateFormat(item.logDtm, 'yyyy-MM-dd HH:mm:ss')
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
        if (_.isObject(this.$route.query) && _.size(this.$route.query) > 4 && this.$route.query['passKey']) {
            //let params = _.pick(this.$route.query, ['shopId', 'shopName'])
            this.shopName = this.$route.query['shopName']
            let params = {
                orderId: _.toNumber(this.$route.query['orderId']),
                orderNo: this.$route.query['orderNo'],
                shopName: this.shopName,
                r: _.toNumber(this.$route.query['r'])
            }
            if (this.$route.query['passKey'] === MD5(JSON.stringify(params) + this.$route.name).toString()) {
                Object.assign(this.mallOrder, _.pick(this.$route.query, ['orderId', 'orderNo']))
                this.loadOrderObj()
            } else {
                this.$message.error('请求参数错误')
                this.$router.push({
                    name: 'supplierOrder'
                })
                    //this.tableData=[]
            }
        } else {
            this.$message.error('请求参数错误')
            this.$router.push({
                    name: 'supplierOrder'
                })
                //this.tableData=[]
        }
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
