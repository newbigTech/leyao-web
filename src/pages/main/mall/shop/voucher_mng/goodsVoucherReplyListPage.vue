<template>
<div class="_container">
	<card-panel style="margin-bottom: 0;" class="_normal">
    <h3 slot="title">评论回复列表</h3>
    <div slot="panel-btns">
      <el-button size="small" type="primary" @click.native.prevent="$emit('reback', 'goodsVoucherList',obj)">返回</el-button>
    </div>
    <div slot="panel-body">
    	<goodsVoucherReplyList :obj="chooseVoucher"></goodsVoucherReplyList>
    </div>
  </card-panel>
</template>
<script>
	import { mapGetters } from 'vuex'
	import goodsVoucherReplyList from './goodsVoucherReplyList'
  import {dateFormat} from 'lib/utils/dateFormat.js'
  export default {
  	components: {
     goodsVoucherReplyList
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
      	chooseVoucher:this.obj.voucher,
      }
    },
    computed: {
	    
	  },
    created(){
    },
    methods:{
      
      //**********************   
    }
  }
</script>
