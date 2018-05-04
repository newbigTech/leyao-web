<template>
  <div class="_shop-management"> 
    <div class="_shop-form _container">
      <card-panel style="margin-bottom: 0;" class="_normal">
        <h3 slot="title">商品关注</h3>
        <div slot="panel-btns"> 
          <el-button size="small" type="success" @click.native="reback">返回商品列表</el-button> 
        </div>
        <div slot="panel-body">
        	<goods-detail :paramObj="paramObj"></goods-detail>
					<div style="margin:20px 0 0 20px;"><el-tag type="primary">评论列表</el-tag></div>
          <user-enshrine :paramObj="paramObj"></user-enshrine>
        </div>
      </card-panel>
    </div>
  </div>
 
</template>

<script>
import GoodsDetail from 'pages/main/mall/shop/order_voucher/goodsDetail'
import UserEnshrine from 'pages/main/mall/shop/user_enshrine/userEnshrineList'


  export default {
    name: 'shopUserEnshrine',
    components: { GoodsDetail,UserEnshrine},
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
