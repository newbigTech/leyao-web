<template>
  <div class="_shop-management"> 
    <div class="_shop-form _container">
      <card-panel style="margin-bottom: 0;" class="_normal">
        <h3 slot="title">商品评价</h3>
        <div slot="panel-btns"> 
          <el-button size="small" type="success" @click.native="reback">返回商品列表</el-button> 
        </div>
        <div slot="panel-body">
        	<goods-detail :paramObj="paramObj"></goods-detail>
					<div style="margin:20px 0 0 20px;"><el-tag type="primary">关注用户列表</el-tag></div>
          <order-voucher :paramObj="paramObj"></order-voucher>
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
      e: Object, default: () => { return { $on: () => {}, $emit: () => {} } },
    },
    data() {
      return {
        tabIndex: '1',
        paramObj: {} 
      }
    },
    methods: {
      tabClick(tab) {
        // console.log(tab.index)
      },
      reback() {
        this.e.$emit('forward', 'goodsList',{shopId:this.e.model.shopId})
      }
    },
    created() {
      this.paramObj = this.e.model
    }
  }
</script>
