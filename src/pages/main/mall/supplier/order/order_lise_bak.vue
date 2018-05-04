<template lang="html">
    <div>
        <!-- 导航面包屑 -->
        <div class="_breadcrumb">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/mall' }">商城</el-breadcrumb-item>
                <el-breadcrumb-item>电商订单管理</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ name: 'supplierOrder' }">电商电铺</el-breadcrumb-item>
                <el-breadcrumb-item><span class="label label-default">{{mallOrder.shopName}}</span></el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!-- 查询条件 -->
        <div class="_setting-bar">
            <div class="_query-form">
                <div class="_query-form-item">
                    <el-form :inline="true" :model="mallOrder">
                        <el-form-item>
                            <el-select v-model.number="mallOrder.searchType" placeholder="订单类型">
                                <el-option label="订单号" :value="0"></el-option>
                                <!-- <el-option label="外部单号" :value="1"></el-option> -->
                                <el-option label="收货人姓名" :value="2"></el-option>
                                <el-option label="收货人手机号" :value="3"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="mallOrder.searchValue" :placeholder="mallOrder.searchType===0?'订单号':mallOrder.searchType===1?'外部单号':mallOrder.searchType===2?'收货人姓名':'收货人手机号'" clearable></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-select v-model.number="mallOrder.orderType" placeholder="订单类型" clearable>
                                <el-option label="普通订单" :value="0"></el-option>
                                <el-option label="虚拟订单" :value="1"></el-option>
                                <!-- <el-option label="充值订单" :value="2"></el-option> -->
                                <el-option label="赠送订单" :value="3"></el-option>
                                <!-- <el-option label="团购订单" :value="4"></el-option> -->
                            </el-select>
                        </el-form-item>
                        <el-form-item style="width: 360px;">
                            <el-date-picker v-model="mallOrder.queryDateTime" type="datetimerange" :picker-options="pickerOptions2" placeholder="下订单截止时间范围" align="right" style="width:350px">
                            </el-date-picker>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="_query-form-btn">
                    <el-button @click.native.prevent="loadTableData">查 询</el-button>
                    <el-button @click.native.prevent="$router.push({name: 'supplierOrder'})">返回</el-button>
                </div>
            </div>
            <div class="_actions-btn">
                <!-- <el-button type="primary">新增</el-button> -->
            </div>
        </div>
        <!--1 待确认 2 已确认 3 未支付 4 已支付 5 已发货 6 已完成 99 已取消-->
        <el-tabs :active-name="activeName" style="width:100%" @tab-click="onTabClick">
            <el-tab-pane label="全部" name="tab1"></el-tab-pane>
            <!-- <el-tab-pane label="待确认" name="tab2"></el-tab-pane>
            <el-tab-pane label="已确认" name="tab3"></el-tab-pane> -->
            <el-tab-pane label="待付款" name="tab4"></el-tab-pane>
            <el-tab-pane label="待发货" name="tab5"></el-tab-pane>
            <el-tab-pane label="已发货" name="tab6"></el-tab-pane>
            <el-tab-pane label="已完成" name="tab7"></el-tab-pane>
            <el-tab-pane label="已关闭" name="tab8"></el-tab-pane>
        </el-tabs>
        <div class="_container">
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
                            售后
                        </th>
                        <th>
                            买家
                        </th>
                        <th>
                            订单状态
                        </th>
                        <th>
                            实付金额(元)
                        </th>
                    </tr>
                </thead>
                <tbody v-if="tableData.length===0">
                    <tr>
                        <td colspan="6" style="text-align: center;">暂无相关数据</td>
                    </tr>
                </tbody>
                <tbody v-for="(item, index) in tableData" style="border:0 solid;">
                    <tr class="separation-row">
                        <td colspan="6"></td>
                    </tr>
                    <tr class="header-row">
                        <td colspan="5" class="text-left">
                            <div>
                                {{dateFormat(item)}}&nbsp;&nbsp;&nbsp;订单号: {{item.orderNo}}
                            </div>
                            <div class="clearfix">
                            </div>
                        </td>
                        <td class="text-right">
                            <div>
                                <a href="javascript:;" style="color:blue" @click="onViewOrder(item)">订单详情>></a>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="goods-td" colspan="2">
                            <table class="table table-bordered" style="margin-bottom: 0px;border:0 solid;">
                                <tbody>
                                    <tr v-for="(g,i) in item.orderItem">
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
                                                    <p>({{g.number}}{{g.unit}})</p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td>
                        </td>
                        <td style="text-align: center">
                            <span style="color:blue">{{item.userAlias}}({{item.userMobile}})  
                            </span>
                            <svg class="icon">
                                <use xlink:href="#icon-user"></use>
                            </svg>
                            <p style="padding-top: 10px;">{{item.adName}}</p>
                            <p>{{item.adPhone}}</p>
                        </td>
                        <td style="text-align: center">
                            <!--1 待确认 2 已确认 3 未支付 4 已支付 5 已发货 6 已完成 99 已取消-->
                            <p v-if="item.orderCode===1">待确认</p>
                            <p v-if="item.orderCode===2">已确认</p>
                            <p v-if="item.orderCode===3">待支付</p>
                            <p v-if="item.orderCode===4">已支付/待发货</p>
                            <p v-if="item.orderCode===5">已发货</p>
                            <p v-if="item.orderCode===6">已完成</p>
                            <p v-if="item.orderCode===99">已关闭</p>
                        </td>
                        <td style="text-align: center">
                            总额:￥{{item.amountPrice}}
                            <hr>({{item.payType===0?'电商支付':'货到付款'}})
                        </td>
                    </tr>
                </tbody>
            </table>
            <br>
            <!-- 分页 -->
            <div style="text-align: center">
                <el-pagination :total="total" :page-size="pageSize" layout="total, sizes, prev, pager, next" @current-change="handleCurrentChange" @size-change="handleSizeChange">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import {
    getShopOrderPageList
} from 'actions/mallShopOrderAction'
import {
    dateFormat as _dateFormat
} from "lib/utils/dateFormat"
import MD5 from 'crypto-js/md5'
export default {
    name: 'supplier_order_list',
    computed: {
        cloudShowUrl() {
            return this.$store.getters.cloudShowUrl
        }
    },
    data() {
        return {
            page: 1,
            pageSize: 20,
            total: 0,
            tableData: [],
            activeName: 'tab1',
            mallOrder: {
                shopId: undefined,
                queryDateTime: '',
                shopName: '',
                orderType: '',
                searchType: 0,
                searchValue: ''
            },
            dateFormat: function(row) {
                return _dateFormat(row.createdDtm, 'yyyy-MM-dd HH:mm:ss')
            },
            pickerOptions2: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                    }
                }]
            },
        }
    },
    methods: {
        onTabClick(tab, event) {
            if (tab.name === 'tab1') {
                this.mallOrder.pageNo = 1
                this.mallOrder.orderCode = ''
            } else if (tab.name === 'tab2') {
                this.mallOrder.pageNo = 1
                this.mallOrder.orderCode = 1
            } else if (tab.name === 'tab3') {
                this.mallOrder.pageNo = 1
                this.mallOrder.orderCode = 2
            } else if (tab.name === 'tab4') {
                this.mallOrder.pageNo = 1
                this.mallOrder.orderCode = 3
            } else if (tab.name === 'tab5') {
                this.mallOrder.pageNo = 1
                this.mallOrder.orderCode = 4
            } else if (tab.name === 'tab6') {
                this.mallOrder.pageNo = 1
                this.mallOrder.orderCode = 5
            } else if (tab.name === 'tab7') {
                this.mallOrder.pageNo = 1
                this.mallOrder.orderCode = 6
            } else if (tab.name === 'tab8') {
                this.mallOrder.pageNo = 1
                this.mallOrder.orderCode = 99
            }
            this.loadTableData()
        },
        onViewOrder(item) {
            let params = {
                orderId: _.toNumber(item.orderId),
                orderNo: item.orderNo,
                shopName: this.mallOrder.shopName,
                r: _.toNumber(_.now())
            }
            params.passKey = MD5(JSON.stringify(params) + 'viewSupplierOrder').toString()
            this.$router.push({
                name: 'viewSupplierOrder',
                query: params
            })
        },
        loadTableData() {
            this.mallOrder.pageNo = this.page
            this.mallOrder.pageSize = this.pageSize
            if (!_.isNumber(this.mallOrder.shopId)) {
                this.$message.error('请求参数错误')
                return false
            }
            if (_.isArray(this.mallOrder.queryDateTime) && this.mallOrder.queryDateTime.length === 2) {
                if (!_.isNull(this.mallOrder.queryDateTime[0]) && !_.isNull(this.mallOrder.queryDateTime[1])) {
                    this.mallOrder.startDateTime = _dateFormat(this.mallOrder.queryDateTime[0], 'yyyy-MM-dd HH:mm:ss')
                    this.mallOrder.endDateTime = _dateFormat(this.mallOrder.queryDateTime[1], 'yyyy-MM-dd HH:mm:ss')
                } else {
                    this.mallOrder.startDateTime = ''
                    this.mallOrder.endDateTime = ''
                }
            } else {
                this.mallOrder.startDateTime = ''
                this.mallOrder.endDateTime = ''
            }
            this.mallOrder.orderNo = ''
            this.mallOrder.associatedOrid = ''
            this.mallOrder.adName = ''
            this.mallOrder.adPhone = ''
            if (this.mallOrder.searchType === 0) {
                //订单号OrderNo
                this.mallOrder.orderNo = this.mallOrder.searchValue
            } else if (this.mallOrder.searchType === 1) {
                //外部单号
                if (_.isNumber(this.mallOrder.searchValue)) {
                    this.mallOrder.associatedOrid = this.mallOrder.searchValue
                }
            } else if (this.mallOrder.searchType === 2) {
                //收货人姓名
                this.mallOrder.adName = this.mallOrder.searchValue
            } else if (this.mallOrder.searchType === 3) {
                //收货人手机号
                this.mallOrder.adPhone = this.mallOrder.searchValue
            }

            //console.log('this.mallOrder',JSON.parse(JSON.stringify(this.mallOrder)))
            //return false
            getShopOrderPageList(this.mallOrder).then(data => {
                this.tableData = data.rows || []
                _.forEach(this.tableData, item => {
                    if (item.orderItemJson) {
                        item.orderItem = JSON.parse(item.orderItemJson)
                    }
                })
                this.total = data.total
                    //console.log('this.tableData',this.tableData)
            })
        },
        handleSizeChange(val) {
            this.pageSize = val
            this.loadTableData()
        },
        handleCurrentChange(val) {
            this.page = val
            this.loadTableData()
        }

    },
    // beforeRouteEnter(to, from, next) {
    //     // 在渲染该组件的对应路由被 confirm 前调用
    //     // 不！能！获取组件实例 `this`
    //     // 因为当钩子执行前，组件实例还没被创建
    //     console.log('to', to, from)
    //     if (_.isObject(to.query) && _.size(to.query) > 2 && to.query['passKey']) {
    //         let params = _.pick(to.query, ['shopId', 'shopName'])
    //         if (to.query['passKey'] === MD5(JSON.stringify(params) + to.name).toString()) {
    //             next()
    //         } else {
    //             next({
    //                 name: 'supplierOrder'
    //             })
    //         }
    //     } else {
    //         next({
    //             name: 'supplierOrder'
    //         })
    //     }
    // },
    created() {
        if (_.isObject(this.$route.query) && _.size(this.$route.query) > 3 && this.$route.query['passKey']) {
            //let params = _.pick(this.$route.query, ['shopId', 'shopName'])
            let params = {
                    shopId: _.toNumber(this.$route.query['shopId']),
                    shopName: this.$route.query['shopName'],
                    r: _.toNumber(this.$route.query['r'])
                }
                // console.log('passKey',this.$route.query['passKey'])
                // console.log('passKey2',MD5(JSON.stringify(params) + this.$route.name).toString())
                // console.log('JSON.stringify(params)',JSON.stringify(params)+ this.$route.name)
            if (this.$route.query['passKey'] === MD5(JSON.stringify(params) + this.$route.name).toString()) {
                Object.assign(this.mallOrder, _.pick(this.$route.query, ['shopId', 'shopName']))
                this.loadTableData()
            } else {
                this.$message.error('请求参数错误')
                this.$router.push({
                    name: 'supplierOrder'
                })
            }
        } else {
            this.$message.error('请求参数错误')
            this.$router.push({
                name: 'supplierOrder'
            })
        }
        //console.log('this.$route.params',this.$route.params)
    }
}
</script>
<style lang="sass">
.ui-table-order {
    width: 100%;
    font-size: 12px;
    text-align: left;
    margin-bottom: 0;
    border: 0;
}

.ui-table-order .header-tr {
    height: 35px;
}

.ui-table-order .header-tr th {
    border: 0px solid;
    background: #f5f5f5;
}

.ui-table-order .separation-row {
    border: none;
    height: 10px;
}

.ui-table-order .separation-row td {
    border: 0;
    height: 10px;
}

.ui-table-order .header-row {
    background: #f5f5f5;
    height: 35px;
}

.ui-table-order .header-row td {
    background: #f5f5f5;
    height: 35px;
}

.ui-table-order td.text-left {
    border-right: 0;
}

.ui-table-order td.text-right {
    text-align: right;
    padding-left: 0;
    border-left: 0;
}

.ui-table-order .goods-td {
    padding: 0px;
}

.ui-table-order .goods-td .list-group {
    padding: 0px;
    border: 0px solid;
    margin: 0;
}
</style>
