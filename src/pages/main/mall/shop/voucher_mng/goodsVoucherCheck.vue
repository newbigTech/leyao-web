<template>
<div class="_row-left-right">
  <div class="_table-container">
    <div id="iDiv_voucher_check" class="_table-list">
    	<el-table :data="chooseVoucherList" stripe style="width: 100%" border>
        <el-table-column align='center' label="商品信息" width="160">
        	<template scope="scope">
        		<div style="padding:10px 0;">
        			<div style="margin:0 auto;width:100px;height:100px;">
	          		<img class="i-img-voucher" style="max-width:100px;height:100px;" :src="cloudShowUrl + scope.row.goodsPic0">
	          	</div>
        			<div>{{scope.row.goodsSkuFullName}}</div>
        		</div>
        	</template>
        </el-table-column>
        <el-table-column align='left' label="商品评论" min-width="600">
        	<template scope="scope">
        		<div style="padding:10px;">
        			<p>订单号：{{scope.row.orderNo}}</p>
	        		<el-rate v-if="scope.row.grade>=7" v-model="scope.row.gradeHalf" disabled show-text text-color="#ff9900" text-template="【好评】"></el-rate>
	        		<el-rate v-if="scope.row.grade>=3 && scope.row.grade<=6" v-model="scope.row.gradeHalf" disabled show-text text-color="#ff9900" text-template="【中评】"></el-rate>
	        		<el-rate v-if="scope.row.grade<=2" v-model="scope.row.gradeHalf" disabled show-text text-color="#ff9900" text-template="【差评】"></el-rate>
	        		<p style="padding:10px 0;">{{scope.row.voucherNote}}</p>
	        		<div style="width:100%;height:56px;padding:2px 0;margin-top:5px;" v-if="scope.row.picList.length>0">
		          	<div style="text-align:center;float:left;width:52px;height:52px;border:1px solid #e2e2e2;margin-right:6px;padding:1px;" v-for="(x,index) in scope.row.picList">
		          		<img class="i-img-voucher" style="max-width:48px;height:48px;" :src="cloudShowUrl + x">
		          	</div>
		          </div>
		          <div style="margin-top:5px;" v-if="scope.row.voucherSignList.length>0">
		          	<el-tag type="primary" v-for="(x,index) in scope.row.voucherSignList" style="margin-right:5px;">{{x}}</el-tag>
		          </div>
		          <p style="color:#999;">
		          	<span title="评论时间" style="margin-right:10px;">{{scope.row.voucherDtm_str}}</span>
		          </p>
        		</div>
        		<div :id="'iDiv_voucher_s_second_'+scope.row.voucherId" style="margin:10px 0;" v-if="scope.row.isSecondVoucher == 1">
        			<p style="color:#999;">
        				<a href="javascript:;" v-on:click="showDivFunc(scope.row.voucherId,'second')">
        				   <i id="iI_btn" class="el-icon-arrow-down" style="color:#666;" title="显示/隐藏买家追评"></i>
        			  </a>
        				[购买后{{scope.row.secondVoucherDays<=0?'当':scope.row.secondVoucherDays}}天追评]
        		  </p>
        			<div id="iDiv_content">
	        			<p style="padding:10px 0;">{{scope.row.secondVoucherNote}}</p>
		        		<div style="width:100%;height:56px;padding:2px 0;margin-top:5px;" v-if="scope.row.secondPicList.length>0">
			          	<div style="text-align:center;float:left;width:52px;height:52px;border:1px solid #e2e2e2;margin-right:6px;padding:1px;" v-for="(x,index) in scope.row.secondPicList">
			          		<img class="i-img-voucher" style="max-width:48px;height:48px;" :src="cloudShowUrl + x">
			          	</div>
			          </div>
			        </div>
        		</div>
        	</template>
        </el-table-column>
    	</el-table>
    </div>
    <div style="margin-top: 20px;text-align:center;">
      <el-button @click.native="checkGoodsVoucher(1)" type="success">审核通过</el-button>
      <el-button @click.native="checkGoodsVoucher(2)" type="danger">审核不通过</el-button>
    </div>
  </div>
</div>
</template>
<style>
</style>
<script>

  import { modifyMallGoodsVoucher } from 'src/vuex/actions/goodsVoucherAction'
  import {dateFormat} from 'lib/utils/dateFormat.js'
  export default {
    props: {
      obj: {
        type: Object,
        default: {}
      }
    },
    components:{},
    computed: {
	    cloudShowUrl() {
      	return this.$store.getters.cloudShowUrl
      },
	  },
    data(){
      var _this = this;
      //console.log(this.obj)
      return {
      	loading:false,//遮罩层
      	chooseVoucherList:this.obj.chooseVoucherList,
      	
      	//*************************
      }
    },
    created(){
    },
    methods:{
      showDivFunc(voucherId,t){
      	var obj = $("#iDiv_voucher_check").find('#iDiv_voucher_s_'+t+'_'+voucherId);
      	
      	if(obj.find("#iI_btn").hasClass('el-icon-arrow-down')){//打开状态
      		obj.find("#iDiv_content").hide();
      		obj.find("#iI_btn").removeClass('el-icon-arrow-down').addClass('el-icon-arrow-up');
      	}else{
      		obj.find("#iDiv_content").show();
      		obj.find("#iI_btn").removeClass('el-icon-arrow-up').addClass('el-icon-arrow-down');
      	}
      },
     	checkGoodsVoucher(v){//审核通过
     		
     		var vids =[];
     		for(var i=0,li=this.chooseVoucherList.length; i<li; i++){
     			vids.push(this.chooseVoucherList[i].voucherId);
     		}
     		if(vids.length <=0 ){
     			this.$message({
            type: 'error',
            message: '没有任何评论需要审核'
          });
     			return;
     		}
     		var param = {
     			statusCode: v,
     			voucherId: vids.join(',')
     		};
        modifyMallGoodsVoucher(param).then((data) => {
          const {success,msg,result}=data;
          this.$message({
            type: success? 'success':'error',
            message: msg
          });
          if(success){
          	this.$emit('checkGoodsVoucherCallBack',true);
          }
        });
      },
     	
      //**********************  
    },
    mounted(){
      
    }
  }
</script>
