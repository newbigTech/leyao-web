<template>
<div class="_container">
	<card-panel style="margin-bottom: 0;" class="_normal">
    <h3 slot="title">批量审核评论</h3>
    <div slot="panel-btns">
      <el-button size="small" type="primary" @click.native.prevent="$emit('reback', 'goodsVoucherList',obj)">返回</el-button>
    </div>
    <div slot="panel-body">
    	<goodsVoucherCheck @checkGoodsVoucherCallBack="checkGoodsVoucherCallBack" :obj="chooseVoucher"></goodsVoucherCheck>
    </div>
  </card-panel>
</template>
<script>
	import { mapGetters } from 'vuex'
	import goodsVoucherCheck from './goodsVoucherCheck'
  import {dateFormat} from 'lib/utils/dateFormat.js'
  export default {
  	components: {
     goodsVoucherCheck
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
      checkGoodsVoucherCallBack(status){//审核弹窗口回调
      	this.$emit('reback', 'goodsVoucherList',this.obj)
      },
      //**********************   
    }
  }
</script>
