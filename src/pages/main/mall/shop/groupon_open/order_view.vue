<template lang="html">
    <div>
        <div class="_breadcrumb">
             <span style="float: right;position: absolute;right: 30px;margin-top:5px;"><el-button type="small" @click.native.prevent="onBack">返回</el-button></span>
        </div>
        <order-detail :orderId="paramObj.orderId"></order-detail>
    </div>
</template>
<script>
import OrderDetail from 'pages/main/mall/common/components/order_detail'
export default {
    name: 'OrderView',
    props: {
        paramObj: {
            type: Object,
            default: {}
        }
    },
    components: {
        OrderDetail
    },
    data() {
        return {
        }
    },
    methods: {
        onBack() {
            this.$emit('forward','GroupOpenItemList',this.paramObj)
        }
    },
    created() {
    }
}
</script>
<style lang="sass">
</style>
