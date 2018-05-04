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
            <span style="float: right;position: absolute;right: 30px;margin-top:5px;"><el-button type="small" @click.native.prevent="onBack">返回</el-button></span>
        </div>
        <order-detail :orderId="mallOrder.orderId" ref="orderdetail"></order-detail>
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
import OrderDetail from 'pages/main/mall/common/components/order_detail'
export default {
    name: 'supplier_order_view',
    components: {
        OrderDetail
    },
    computed: {
        cloudShowUrl() {
            return this.$store.getters.cloudShowUrl
        }
    },
    data() {
        return {
            shopName: '',
            mallOrder: {
                orderId: undefined,
                orderNo: ''
            }
        }
    },
    methods: {
        onBack() {
            let params = {
                shopId: _.toNumber(this.$refs.orderdetail.mallOrder.shopId),
                shopName: this.shopName,
                r: _.toNumber(_.now())
            }
            params.passKey = MD5(JSON.stringify(params) + 'supplierOrderList').toString()
            this.$router.push({
                name: 'supplierOrderList',
                query: params
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
                this.mallOrder.orderId=_.toNumber(this.$route.query.orderId)
                this.mallOrder.orderNo=_.toNumber(this.$route.query.orderNo)
                //Object.assign(this.mallOrder, _.pick(this.$route.query, ['orderId', 'orderNo']))
               //console.log('this.mallOrder',this.mallOrder)
                    //this.loadOrderObj()
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
    }
}
</script>
<style lang="sass">

</style>
