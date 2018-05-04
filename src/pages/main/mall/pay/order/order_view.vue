<template lang="html">
    <div>
        <!-- 导航面包屑 -->
        <div class="_breadcrumb">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/mall' }">商城</el-breadcrumb-item>
                <el-breadcrumb-item>资金管理</el-breadcrumb-item>
                <el-breadcrumb-item @click.native.prevent="onBack">交易记录</el-breadcrumb-item>
                <el-breadcrumb-item>订单详情</el-breadcrumb-item>
            </el-breadcrumb>
            <span style="float: right;position: absolute;right: 30px;margin-top:5px;"><el-button type="small" @click.native.prevent="onBack">返回</el-button></span>
        </div>
        <order-detail :orderNo="mallOrder.orderNo" ref="orderdetail"></order-detail>
    </div>
</template>
<script>
import {
    getOrderObjByOrderNo
} from 'actions/mallShopOrderAction'
import {
    dateFormat as _dateFormat
} from "lib/utils/dateFormat"
import MD5 from 'crypto-js/md5'
import OrderDetail from 'pages/main/mall/common/components/order_pay_detail'
export default {
    name: 'supplier_order_pay_view',
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
                //orderId: undefined,
                orderNo: ''
            },
            urlPathName:''

        }
    },
    methods: {
        onBack() {
            // let params = {
            //     shopId: _.toNumber(this.$refs.orderdetail.mallOrder.shopId),
            //     shopName: this.shopName,
            //     r: _.toNumber(_.now())
            // }
            // params.passKey = MD5(JSON.stringify(params) + 'supplierOrderList').toString()
            this.$router.push({
                name: this.urlPathName
            })
        }
    },
    created() {
        if (_.isObject(this.$route.query) && this.$route.query['passKey']) {
            let params = {
                orderNo: this.$route.query['orderNo'],
                urlPathName : this.$route.query['urlPathName'],
                r: _.toNumber(this.$route.query['r'])
            }
            if (this.$route.query['passKey'] === MD5(JSON.stringify(params) + this.$route.name).toString()) {
                this.mallOrder.orderNo=this.$route.query.orderNo
                this.urlPathName = this.$route.query.urlPathName
            } else {
                this.$message.error('请求参数错误')
            }
        } else {
            this.$message.error('请求参数错误')
        }
    }
}
</script>
<style lang="sass">

</style>
