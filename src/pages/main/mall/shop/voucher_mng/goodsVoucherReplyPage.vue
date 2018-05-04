<template>
<div class="_container">
	<card-panel style="margin-bottom: 0;" class="_normal">
    <h3 slot="title">批量回复评论</h3>
    <div slot="panel-btns">
      <el-button size="small" type="primary" @click.native.prevent="$emit('reback', 'goodsVoucherList',obj)">返回</el-button>
    </div>
    <div slot="panel-body">
    	<goodsVoucherReply @replyGoodsVoucherCallBack="replyGoodsVoucherCallBack" :obj="chooseVoucher"></goodsVoucherReply>
    </div>
  </card-panel>
</template>
<script>
	import { mapGetters } from 'vuex'
	import goodsVoucherReply from './goodsVoucherReply'
  import {dateFormat} from 'lib/utils/dateFormat.js'
  export default {
  	components: {
     goodsVoucherReply
    },
    props: {
      obj: {
        type: Object,
        default: {}
      }
    },
    data(){
    	var _this = this;
    	
      return {
      	chooseVoucher:{chooseVoucherList:this.obj.voucher},
      }
    },
    computed: {
	    
	  },
    created(){
    },
    methods:{
      replyGoodsVoucherCallBack(status){//回复弹窗口回调
      	this.$emit('reback', 'goodsVoucherList',this.obj)
      },
      //**********************   
    }
  }
</script>
