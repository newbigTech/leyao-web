<template>
  <div class="_shop-management"> 
    <div class="_shop-form _container">
      <card-panel style="margin-bottom: 0;" class="_normal">
        <h3 slot="title">商品评价</h3>
        <div slot="panel-btns"> 
          <el-button size="small" type="success" @click.native="reback">返回商品列表</el-button> 
        </div>
        <div slot="panel-body">
        	<goods-detail :paramObj="rowData"></goods-detail>
					<div style="margin:20px 0 0 20px;"><el-tag type="primary">评论列表</el-tag></div>
          <order-voucher :paramObj="rowData"></order-voucher>
        </div>
      </card-panel>
    </div>
  </div>
 
</template>

<script>
import GoodsDetail from 'pages/main/mall/shop/order_voucher/goodsDetail'
import OrderVoucher from 'pages/main/mall/shop/order_voucher/orderVoucherList'


  export default {
    name: 'shopOrderVoucher',
    components: { GoodsDetail,OrderVoucher},
    props: {
      rowData: {
        type: Object,
        default: {}
      }
    },
	  computed: {
	    cloudShowUrl() {
      	return this.$store.getters.cloudShowUrl
      },
	  },
    data() {
      return {
        tabIndex: '1',
      }
    },
    methods: {
      tabClick(tab) {
        // console.log(tab.index)
      },
      reback() {
        this.$emit('forward','goodsList');
      }
    },
    created() {
      
    }
  }
</script>
