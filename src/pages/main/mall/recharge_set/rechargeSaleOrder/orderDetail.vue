<template lang="html">
<div class="_container">
  <card-panel class="_normal">
    <h3 slot="title"></h3>
    <div slot="panel-btns"> <el-button size="small" type="primary" @click.native.prevent="$emit('reback', 'orderList',obj)" >返回</el-button></div>
    <div slot="panel-body">
       <order-detail :orderId="obj.order.orderId" ref="orderdetail"></order-detail>
    </div>
  </card-panel>
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
    props: {
      obj: {
        type: Object,
        default: {}
      }
    },
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
            
        }
    },
    methods: {
        
    },
    created() {
        
    }
}
</script>
<style lang="sass">

</style>
