<template>
  <div class="_shop-management"> 
    <div class="_shop-form _container">
      <card-panel style="margin-bottom: 0;" class="_normal">
        <h3 slot="title">商品评价</h3>
        <div slot="panel-btns"> 
          <el-button size="small" type="success" @click.native="reback">返回商品列表</el-button> 
        </div>
        <div slot="panel-body">
        	<goods-detail :paramObj="rowData" id="iGd_detail"></goods-detail>
					<div style="margin:20px 0 0 20px;"><el-tag type="primary">关注用户列表</el-tag></div>
          <user-enshrine :paramObj="rowData"></user-enshrine>
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
	    	tableData:[this.paramObj],
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
