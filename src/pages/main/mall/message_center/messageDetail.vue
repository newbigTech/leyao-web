<template>
<div class="_container">
  <card-panel>
    <span slot="title">详情页面</span>
    <div slot="panel-btns">
      <el-button size="small" @click.native="$emit('forward', 'messageList',obj)" type="primary">返回</el-button>
    </div>
    <div slot="panel-body">
    	<h3 style="font-weight:bold;font-size:14px;">{{messageObj.messageTitle}}</h3>
      <p style="color:#a0a0a0;margin-top:10px;" v-if="messageObj.msgReceiverId>0">发送人：{{messageObj.sendUserName}}</p>
      <p style="color:#a0a0a0;margin-top:5px;">时  间：{{messageObj.createdDtm_str}}</p>
      <p style="margin-top:5px;padding-top:5px;border-top:1px solid #ccc;">{{messageObj.messageContent}}</p>
    </div>
  </card-panel>
</div>   

</template>
<style lang="sass">
  /*.el-form--inline .el-form-item {
    vertical-align: baseline;
  }*/
</style>
<script>
  import {dateFormat} from 'lib/utils/dateFormat.js'
  import _ from "lodash"
  export default {
    props: {
      obj: {
        type: Object,
        default: {}
      }
    },
    data(){
      var _this = this;
      return {
        loading:false,//遮罩层
        messageObj:this.obj.message,
      }
    },
    created(){
    	
    },
    methods:{ 
      gotoForward(url,row){
	    	if(typeof row == 'undefined'){
	    		row = {};
	    	}
	    	this.$emit('forward', url, this.obj);
      }, 
      //**********************   
    }
  }
</script>
