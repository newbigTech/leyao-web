<template>
<div class="_container">
	<card-panel>
    <h3 slot="title">新增网销卡</h3>
    <div slot="panel-btns"> <el-button @click.native.prevent="$emit('reback', 'rechargeSaleCardList',obj)" size="small">返回</el-button> </div>

    <div slot="panel-body">
      <div class="_v-tab_wrapper">
        <el-tabs @tab-click="handleClick" type="border-card" class="_v-tab" v-model="activeName">
          <el-tab-pane label="基本信息" name="tab1">
            <card-panel>
              <span slot="title">录入网销卡基本信息</span>
					    <div slot="panel-body">
					      <el-form style="width:500px;" :rules="rules" ref="rechargeSaleCardObj" :model="rechargeSaleCardObj" label-width="140px">
					        <el-form-item label="销售卡名称" prop="saleCardName" >
					           <el-input placeholder="请输入销售卡名称" v-model="rechargeSaleCardObj.saleCardName" :maxlength=100></el-input>
					        </el-form-item>
					        <el-form-item label="网销卡使用规则" prop="saleCardUseRule">
					           <el-input type="textarea" :rows="2" placeholder="请输入网销卡使用规则" v-model="rechargeSaleCardObj.saleCardUseRule" :maxlength=250></el-input>
					        </el-form-item>
					        <el-form-item label="网销卡图片">
					          <div class="_classify-uploader">
					            <div class="_upload-select" @click="openShopFileDialog(1)">
					                <div class="_upload-select-box">
					                    <div class="_upload-select-icon"><i class="el-icon-upload"></i></div>
					                    <div class="_upload-select-text">点击上传图片</div>
					                    <div class="_upload-select-preview" v-show="!!rechargeSaleCardObj.saleCardPic && (rechargeSaleCardObj.saleCardPic.length > 1)">
					                        <img :src="saleCardPic">
					                        <div class="_upload-select-cover"> <span>点击更换图片</span> </div>
					                        <div class="_upload-select-cover"> <span @click.stop.prevent="rechargeSaleCardObj.saleCardPic='';saleCardPic=''" style="position:absolute;top:0;right: 10px">X</span> </div>
					                    </div>
					                </div>
					                <div class="_upload-select-lable">网销卡图片</div>
					            </div>
					          </div>
					        </el-form-item>
					        <el-form-item label="排序" prop="sortIndex">
					           <el-input-number v-model="rechargeSaleCardObj.sortIndex" @change="handleSortIndexChange" :min="1" :max="999999"></el-input-number>
					        </el-form-item>
					        <el-form-item label="是否推荐" prop="isHot">
					          <el-radio-group v-model="rechargeSaleCardObj.isHot">
					            <el-radio :label="0">不推荐</el-radio>
					            <el-radio :label="1">推荐</el-radio>
					          </el-radio-group>
					        </el-form-item>
					        <el-form-item label="卡面额" prop="cardPrice">
					           <el-input type="number" placeholder="请输入卡面额" v-model="rechargeSaleCardObj.cardPrice"></el-input>
					        </el-form-item>
					        <el-form-item label="销售价" prop="salePrice">
					           <el-input type="number" placeholder="请输入销售价" v-model="rechargeSaleCardObj.salePrice"></el-input>
					        </el-form-item>
					        <el-form-item label="卡有效期约束" prop="timeLimitType">
					          <el-radio-group v-model="rechargeSaleCardObj.timeLimitType">
					            <el-radio :label="0">时间段约束</el-radio>
					            <el-radio :label="1">天数量约束</el-radio>
					          </el-radio-group>
					        </el-form-item>
					        <el-form-item label="有效期" prop="day" v-if="rechargeSaleCardObj.timeLimitType==0">
					          <el-date-picker type="daterange" placeholder="选择有效期范围"
					            v-model="rechargeSaleCardObj.day" style="width: 100%;"
					            :picker-options="pickerOptions0"
					          ></el-date-picker>
					        </el-form-item>
					        <el-form-item label="有效天数" prop="dayNumber" v-if="rechargeSaleCardObj.timeLimitType==1">
					           <el-input-number v-model="rechargeSaleCardObj.dayNumber" @change="handleDayNumberChange" :min="1" :max="99999"></el-input-number>
					        </el-form-item>
					        <el-form-item label="卡发行数量" prop="countNumber">
					           <el-input-number v-model="rechargeSaleCardObj.countNumber" @change="handleCountNumberChange" :min="1" :max="999999"></el-input-number>
					        </el-form-item>
					        <el-form-item label="订单可支付比例" prop="orderPayLimit">
					           <el-input-number title="比例范围1-100" v-model="rechargeSaleCardObj.orderPayLimit" @change="handleOrderPayLimitChange" :min="1" :max="100"></el-input-number>
					        </el-form-item>
					        <el-form-item>
                  	<el-button @click.native="gotoTab('tab2')" type="primary">下一步</el-button>
					        </el-form-item>
					      </el-form>
					    </div>

            </card-panel>
          </el-tab-pane>
          <el-tab-pane label="赠送商品" name="tab2">
            <activityGiveGoods
              :obj="rechargeSaleCardObj"
              ref="activityGiveGoods"
            ></activityGiveGoods>
            <div style="margin-top: 20px;">
              <el-button @click.native="gotoTab('tab1')" type="primary">上一步</el-button>
              <el-button @click.native.prevent="addMallRechargeSaleCardInfo" type="success">创建</el-button>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </card-panel>
  <!--商品图库Dialog-->
  <el-dialog title="商品图库" v-model="shopFileDialog" class="shop-img-file-dialog">
    <shop-file @onSuccess="getShopFile" :vm="tab5vm"></shop-file>
  </el-dialog>
  <!--遮罩层-->
  <div v-loading="loading" class="el-loading-demo"></div>
</div>
</template>
<style>
</style>
<script>
	import activityGiveGoods from "pages/main/mall/activity_mng/activityGiveGoods"
	import ShopFile from 'pages/main/mall/common/components/shop_file'
  import { addMallRechargeSaleCard} from 'src/vuex/actions/rechargeSaleCardAction'
  import {dateFormat} from 'lib/utils/dateFormat.js'
  import _ from "lodash"
  export default {
  	components: {
     ShopFile,activityGiveGoods,
    },
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
      var checkSalePrice = (rule, value, callback) => {
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
      var checkSortIndex = (rule, value, callback) => {
      	this.rechargeSaleCardObj.sortIndex = parseInt(value,10);
        if (isNaN(this.rechargeSaleCardObj.sortIndex)) {
          callback(new Error("请输入数字!"))
        } else {
          callback()
        }
      };
      return {
      	loading:false,//遮罩层
        shopFileDialog:false,
        activeName: 'tab1',//选项卡
        tab5vm: new this.$root.constructor(),
        saleCardPic:'',
      	rechargeSaleCardObj:{
      		saleCardName:'',
      		saleCardUseRule:'',
      		saleCardPic:'',
      		sortIndex:1,
      		isHot:0,
      		countNumber:1,
      		cardPrice:1,
      		salePrice:1,
      		timeLimitType:0,
      		day:[new Date(),new Date(Date.now()+30*24*60*60*1000)],
      		dayNumber:1,
      		orderPayLimit:50,
      		shopId:0,
      		goodsId:0,
      		giveGoods:[],
      		giveUrlType:'recharge',//标记给activityGiveGoods是充值，那边会显示赠送数量和赠送说明
      	},
      	pickerOptions0: {
        	disabledDate(time){
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
      	rules: {
          saleCardName: [
            { required:true, message: '请输入销售卡名称', trigger: 'blur' }
          ],
          cardPrice: [
            { validator: checkCardPrice,required:true, trigger: 'blur,change' }
          ],
          salePrice: [
            { validator: checkSalePrice,required:true, trigger: 'blur,change' }
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
      handleCountNumberChange(value){
      	this.$nextTick(() => {
      		this.rechargeSaleCardObj.countNumber = parseInt(value,10);
      	});
      },
      handleOrderPayLimitChange(value){
      	this.$nextTick(() => {
      		this.rechargeSaleCardObj.orderPayLimit = parseInt(value,10);
      	});
      },
      handleDayNumberChange(value){
      	this.$nextTick(() => {
      		this.rechargeSaleCardObj.dayNumber = parseInt(value,10);
      	});
      },
      handleSortIndexChange(value){
      	this.$nextTick(() => {
      		this.rechargeSaleCardObj.sortIndex = parseInt(value,10);
      	});
      },
      handleClick(tab) {
    		this.gotoTab(tab.name);
    	},
    	gotoTab(tab){
    		this.activeName = tab;
    		if(tab !='tab2'){return ; }//没切换到tab2，不用处理
    		if(this.$refs.activityGiveGoods){
            this.$refs.activityGiveGoods.reloadGiftForGoods();
        };
    	},
      addMallRechargeSaleCardInfo(){

      	this.$refs.rechargeSaleCardObj.validate((valid) => {
          if (valid) {
		        this.$confirm('确定创建网销卡么？', '提示', {
		          type: 'warning'
		        }).then(() => {//确定
		        	var param = {
		        		saleCardName: this.rechargeSaleCardObj.saleCardName,
		        		saleCardUseRule: this.rechargeSaleCardObj.saleCardUseRule,
		        		saleCardPic: this.rechargeSaleCardObj.saleCardPic,
		        		sortIndex: this.rechargeSaleCardObj.sortIndex,
		        		isHot: this.rechargeSaleCardObj.isHot,
			      		countNumber: this.rechargeSaleCardObj.countNumber,
			      		cardPrice: this.rechargeSaleCardObj.cardPrice,
			      		salePrice: this.rechargeSaleCardObj.salePrice,
			      		orderPayLimit: this.rechargeSaleCardObj.orderPayLimit,
			      		timeLimitType: this.rechargeSaleCardObj.timeLimitType,
			      		shopId:0,
			      		goodsId:0,
			      		number:0,
			      		giftNote:'',
			      	};
			      	if(param.timeLimitType == 0){//日期段
			      		param.beginDay = dateFormat(this.rechargeSaleCardObj.day[0],'yyyy-MM-dd')+' 00:00:00';
			      		param.endDay = dateFormat(this.rechargeSaleCardObj.day[1],'yyyy-MM-dd')+' 23:59:59';
			      	}else{
			      		param.dayNumber = this.rechargeSaleCardObj.dayNumber;
			      	}
			      	var giveGoods = this.$refs.activityGiveGoods.giveGoods;
			      	if(giveGoods && giveGoods.length>0){
			      		giveGoods = giveGoods[0];
			      		if(!/^(1|([1-9]([0-9]*)))$/.test(giveGoods.number)){
				      		giveGoods.number = 1;
				      	}else if(giveGoods.stockNumber>0 && giveGoods.number > giveGoods.stockNumber){
				      		giveGoods.number = giveGoods.stockNumber;
				      	}
				      	if(giveGoods.giftNote && giveGoods.giftNote.length>250){
				      		giveGoods.giftNote = giveGoods.giftNote.substring(0,250);
				      	}
			      		param.goodsId = giveGoods.goodsId;
			      		param.shopId = giveGoods.shopId;
			      		param.number = giveGoods.number;
			      		param.giftNote = giveGoods.giftNote;
			      	}
			      	//console.log(param);
	        	  addMallRechargeSaleCard(param).then((data) => {
		            const {success,msg,result}=data;
		            this.$message({
			            type: success? 'success':'error',
			            message: msg
				        });

				        if(success){
									this.$emit('reback', 'rechargeSaleCardList',this.obj);
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
	        	this.gotoTab('tab1');
            return false;
          }
        });


      },

      openShopFileDialog(v) {
          this.curDailogIndex=v
          this.shopFileDialog = true
          this.tab5vm.$emit('on-load')
      },
      getShopFile(shopFiles) {
          if (shopFiles.length == 0) {
              this.shopFileDialog = false
              return false
          }
          if (shopFiles.length > 1) {
              this.$message.error('只能选择一张图片')
              return false
          } else {
              this.shopFileDialog = false
              this.saleCardPic = this.obj.cloudShowUrl + shopFiles[0].fileMd5
              this.rechargeSaleCardObj.saleCardPic = shopFiles[0].fileMd5
          }
      },
      //**********************
    },
    mounted(){

    }
  }
</script>
