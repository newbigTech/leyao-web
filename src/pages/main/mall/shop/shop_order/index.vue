<template lang="html">
    <div>
        <!-- 导航面包屑 -->
        <div class="_breadcrumb">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/mall' }">商城</el-breadcrumb-item>
                <el-breadcrumb-item>店铺订单管理</el-breadcrumb-item>
                <el-breadcrumb-item><span class="label label-default">{{selectedName}}</span></el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="_container">
          <shop-order :shopId="mallOrder.shopId" @onOrderDetail="onViewOrder" :enableBtn="{logisticsBtn:true}">
          </shop-order>
        </div>
    </div>
</template>
<script>
import {
    getShopOrderPageList
} from 'actions/mallShopOrderAction'
import MD5 from 'crypto-js/md5'
import ShopOrder from 'pages/main/mall/common/components/shop_order'
import {
    mapGetters
} from 'vuex'
export default {
    name: 'shop_order_list',
    components: {
        ShopOrder
    },
    computed: {
        ...mapGetters(['shopID', 'selectedName']),
        cloudShowUrl() {
            return this.$store.getters.cloudShowUrl
        }
    },
    data() {
        return {
            mallOrder: {
                shopId: undefined
            }
        }
    },
    methods: {
        onViewOrder(item) {
            let params = {
                orderId: _.toNumber(item.orderId),
                orderNo: item.orderNo,
                r: _.toNumber(_.now())
            }
            params.passKey = MD5(JSON.stringify(params) + 'shopOrderView').toString()
                //console.log('params', params)
            this.$router.push({
                name: 'shopOrderView',
                query: params
            })

        }
    },
    created() {
        this.$set(this.mallOrder, 'shopId', _.toNumber(this.shopID))
    }
}
</script>
<style lang="sass">
</style>
