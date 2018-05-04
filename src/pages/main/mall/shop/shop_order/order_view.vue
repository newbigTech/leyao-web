<template lang="html">
    <div>
        <!-- 导航面包屑 -->
        <div class="_breadcrumb">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/mall' }">商城</el-breadcrumb-item>
                <el-breadcrumb-item @click.native.prevent="onBack">电铺订单管理</el-breadcrumb-item>
                <el-breadcrumb-item>订单详情</el-breadcrumb-item>
            </el-breadcrumb>
             <span style="float: right;position: absolute;right: 30px;margin-top:5px;"><el-button type="small" @click.native.prevent="onBack">返回</el-button></span>
        </div>
        <order-detail :orderId="orderId"></order-detail>
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
    name: 'shopOrderView',
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
            orderId: undefined,
        }
    },
    methods: {
        onBack() {
            this.$router.push({
                name: 'order_manage'
            })
        }
    },
    created() {
        if (_.isObject(this.$route.query) && _.size(this.$route.query) > 3 && this.$route.query['passKey']) {
            let params = {
                orderId: _.toNumber(this.$route.query['orderId']),
                orderNo: this.$route.query['orderNo'],
                r: _.toNumber(this.$route.query['r'])
            }
            if (this.$route.query['passKey'] === MD5(JSON.stringify(params) + this.$route.name).toString()) {
                this.orderId= _.toNumber(this.$route.query['orderId'])
                //console.log('this.mallOrder',this.mallOrder)
            } else {
                this.$message.error('请求参数错误')
                this.$router.push({
                    name: 'order_manage'
                })
            }
        } else {
            this.$message.error('请求参数错误')
            this.$router.push({
                name: 'order_manage'
            })
        }
    }
}
</script>
<style lang="sass">
</style>
