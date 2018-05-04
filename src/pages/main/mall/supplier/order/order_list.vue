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
        <shop-order :shopId="mallOrder.shopId" @onOrderDetail="onViewOrder">
            <span slot="header" style="padding-left: 15px;"><el-button @click.native.prevent="$router.push({name: 'supplierOrder'})">返回</el-button></span>
        </shop-order>
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
import ShopOrder from 'pages/main/mall/common/components/shop_order'
export default {
    name: 'supplier_order_list',
    components:{ShopOrder},
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
            }
        }
    },
    methods: {
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
        }
    },
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
                //Object.assign(this.mallOrder, _.pick(this.$route.query, ['shopId', 'shopName']))
                this.$set(this.mallOrder,'shopId',_.toNumber(this.$route.query['shopId']))
                this.$set(this.mallOrder,'shopName',this.$route.query['shopName'])
                //this.loadTableData()
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

</style>
