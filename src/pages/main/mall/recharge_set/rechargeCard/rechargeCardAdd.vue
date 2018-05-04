<template>
<div class="_container">
	<card-panel>
    <h3 slot="title">新增充值卡</h3>
    <div slot="panel-btns"> <el-button @click.native.prevent="$emit('reback', 'rechargeCardList',obj)" size="small">返回</el-button> </div>
    <div slot="panel-body">
      <el-form style="width:500px;" :rules="rules" ref="rechargeCardObj" :model="rechargeCardObj" label-width="140px">
        <el-form-item label="卡金额" prop="cardPrice">
           <el-input placeholder="请输入卡金额" v-model="rechargeCardObj.cardPrice"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" prop="mPrice">
           <el-input placeholder="请输入市场价格" v-model="rechargeCardObj.mPrice"></el-input>
        </el-form-item>
        <el-form-item label="有效期"  prop="day">
          <el-date-picker type="daterange" placeholder="选择有效期范围" 
            v-model="rechargeCardObj.day" style="width: 100%;"
            :picker-options="pickerOptions0"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="卡发行数量(1-1000)" prop="cardNumber">
           <el-input-number v-model="rechargeCardObj.cardNumber" @change="handleCardNumberChange" :min="1" :max="1000"></el-input-number>
        </el-form-item>
        <el-form-item>
          <el-button @click.native="addMallRechargeCardInfo" type="primary">新增</el-button>
          <el-button @click.native.prevent="$emit('reback', 'rechargeCardList',obj)">返回</el-button>
        </el-form-item>
      </el-form>
    </div>
	</card-panel>
</div>
</template>
<style>
</style>
<script>
  import { addMallRechargeCard} from 'src/vuex/actions/rechargeCardAction'
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
      var checkCardPrice = (rule, value, callback) => {
        setTimeout(() => {
          if ( !/^([0]|[1-9][0-9]{0,7})(\.[0-9]{1,2})?$/.test(value)|| value<=0) {
            callback(new Error('请输入数字值(>0.00)'));
          } else{
            callback();
          } 
        }, 500);
      };
      var checkMPrice = (rule, value, callback) => {
      	setTimeout(() => {
          if ( !/^([0]|[1-9][0-9]{0,7})(\.[0-9]{1,2})?$/.test(value)|| value<=0) {
            callback(new Error('请输入数字值(>0.00)'));
          } else{
            callback();
          } 
        }, 500);
      };
      var checkDay = (rule, value, callback) => {
        setTimeout(() => {
          if ( typeof value == 'undefined' || (!value[0]&&!value[1])) {
            callback(new Error('有效期不能为空'));
          } else{
            callback();
          } 
        }, 500);
      };
      return {
      	loading:false,//遮罩层
      	
      	rechargeCardObj:{
      		cardNumber:1,
      		cardPrice:1,
      		mPrice:1,
      		day:[new Date(),new Date(Date.now()+30*24*60*60*1000)],
      	},
      	pickerOptions0: {
        	disabledDate(time){
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
      	rules: {
          cardPrice: [
            { validator: checkCardPrice,required:true, trigger: 'blur,change' }
          ],
          mPrice: [
            { validator: checkMPrice,required:true, trigger: 'blur,change' }
          ],
          day: [
            {validator: checkDay,required:true, trigger: 'blur,change' }
          ],
        },
      	//*************************
      }
    },
    vuex:{
      
    },
    methods:{
      handleCardNumberChange(value){
      	this.$nextTick(() => {
      		this.rechargeCardObj.cardNumber = parseInt(value,10);
      	});
      },
      
      addMallRechargeCardInfo(){
      	
      	this.$refs.rechargeCardObj.validate((valid) => {
          if (valid) {
		        this.$confirm('确定创建充值卡么？', '提示', {
		          type: 'warning'
		        }).then(() => {//确定
		        	var param = {
			      		cardNumber: this.rechargeCardObj.cardNumber,
			      		cardPrice: this.rechargeCardObj.cardPrice,
			      		mPrice: this.rechargeCardObj.mPrice,
			      		beginDay: dateFormat(this.rechargeCardObj.day[0],'yyyy-MM-dd'),
			      		endDay: dateFormat(this.rechargeCardObj.day[1],'yyyy-MM-dd')
			      	};
	        	  addMallRechargeCard(param).then((data) => {
		            const {success,msg,result}=data;
		            this.$message({
			            type: success? 'success':'error',
			            message: msg
				        });
				        
				        if(success){
									this.$emit('reback', 'rechargeCardList',this.obj);
				        }
			        });
			        
		          
		        }).catch(() => {//取消
		                    
		        });
		        //*******************************
          } else {
            this.$message({
	            type: 'error',
	            message: '请正确填写必填字段'
	        });
            return false;
          }
        });
      	
         
      },
     
      //**********************   
    },
    mounted(){
      
    }
  }
</script>
