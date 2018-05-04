<template>
<div class="_container">
	<card-panel>
    <h3 slot="title">修改网销卡</h3>
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
					           <el-input placeholder="请输入销售卡名称" v-model="rechargeSaleCardObj.saleCardName"></el-input>
					        </el-form-item>
					        <el-form-item label="网销卡使用规则" prop="saleCardUseRule">
					           <el-input type="textarea" :rows="2" placeholder="请输入网销卡使用规则" v-model="rechargeSaleCardObj.saleCardUseRule"></el-input>
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
					           <el-input type="number" placeholder="请输入排序" v-model="rechargeSaleCardObj.sortIndex"></el-input>
					        </el-form-item>
					        <el-form-item label="是否推荐" prop="isHot">
					          <el-radio-group v-model="rechargeSaleCardObj.isHot">
					            <el-radio :label="0">不推荐</el-radio>
					            <el-radio :label="1">推荐</el-radio>
					          </el-radio-group>
					        </el-form-item>
					        <el-form-item label="卡金额" prop="cardPrice">
					           <el-input type="number" placeholder="请输入卡面额" v-model="rechargeSaleCardObj.cardPrice" disabled></el-input>
					        </el-form-item>
					        <el-form-item label="销售价" prop="salePrice">
					           <el-input type="number" placeholder="请输入销售价" v-model="rechargeSaleCardObj.salePrice"></el-input>
					        </el-form-item>
					        <el-form-item label="卡有效期约束" prop="timeLimitType">
					          <el-radio-group v-model="rechargeSaleCardObj.timeLimitType">
					            <el-radio :label="0" v-if="rechargeSaleCardObj.timeLimitType==0">时间段约束</el-radio>
					            <el-radio :label="1" v-if="rechargeSaleCardObj.timeLimitType==1">天数量约束</el-radio>
					          </el-radio-group>
					        </el-form-item>
					        <el-form-item label="有效期" prop="day" v-if="rechargeSaleCardObj.timeLimitType==0">
					          <el-input placeholder="请输入销售价" v-model="rechargeSaleCardObj.day" disabled></el-input>
					        </el-form-item>
					        <el-form-item label="有效天数" prop="dayNumber" v-if="rechargeSaleCardObj.timeLimitType==1">
					           <el-input-number v-model="rechargeSaleCardObj.dayNumber" :min="1" :max="99999" disabled></el-input-number>
					        </el-form-item>
					        <el-form-item label="发行量/库存/销售量" prop="countNumber_str">
					           <el-input v-model="rechargeSaleCardObj.countNumber_str" disabled></el-input>
					        </el-form-item>
					        <el-form-item label="订单可支付比例" prop="orderPayLimit">
					           <el-input-number title="比例范围1-100" v-model="rechargeSaleCardObj.orderPayLimit" :min="1" :max="100" disabled></el-input-number>
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
					    <el-button @click.native.prevent="modifyMallRechargeSaleCardInfo" type="primary">修改</el-button>
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
  import { modifyMallRechargeSaleCard} from 'src/vuex/actions/rechargeSaleCardAction'
  import { getMallGiftDetail} from 'src/vuex/actions/giftAction'
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
      var checkSalePrice = (rule, value, callback) => {
      	setTimeout(() => {
          if ( !/^([0]|[1-9][0-9]{0,7})(\.[0-9]{1,2})?$/.test(value)|| value<=0) {
            callback(new Error('请输入数字值(>0.00)'));
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
        saleCardPic:'',
        tab5vm: new this.$root.constructor(),
        rechargeSaleCardObjOld:{},
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
      		day:[null,null],
      		dayNumber:1,
      		orderPayLimit:50,
      		shopId:0,
      		goodsId:0,
      		number:0,
      		giftNote:'',
      		giveGoods:[],
      	},
      	giveGoods:{},
      	rules: {
          saleCardName: [
            { required:true, message: '请输入销售卡名称', trigger: 'blur' }
          ],
          sortIndex: [
            { validator: checkSortIndex,required:true, trigger: 'blur,change' }
          ],
          salePrice: [
            { validator: checkSalePrice,required:true, trigger: 'blur,change' }
          ],
        },
      	//*************************
      }
    },
    vuex:{
      
    },
    created(){
    	this.rechargeSaleCardObj = _.clone(this.obj.card);
    	this.rechargeSaleCardObj.giveGoods = [];
    	this.rechargeSaleCardObj.giveUrlType = 'recharge';
    	this.rechargeSaleCardObj.countNumber_str = this.rechargeSaleCardObj.countNumber +' / '+ this.rechargeSaleCardObj.stockNumber +' / '+ this.rechargeSaleCardObj.useNumber;
    	this.rechargeSaleCardObjOld = _.clone(this.rechargeSaleCardObj);
    	this.saleCardPic = this.obj.cloudShowUrl+this.rechargeSaleCardObj.saleCardPic;
    	if(this.rechargeSaleCardObj.timeLimitType==0){
    		this.rechargeSaleCardObj.day = dateFormat(this.rechargeSaleCardObj.beginDay,'yyyy-MM-dd')+'至'+dateFormat(this.rechargeSaleCardObj.endDay,'yyyy-MM-dd');
    	}
    	
    	if(this.rechargeSaleCardObj.goodsId !=0){
	    	this.giveGoods.goodsId = this.rechargeSaleCardObj.goodsId;
	    	this.giveGoods.shopId = this.rechargeSaleCardObj.shopId;
	    	this.giveGoods.number = this.rechargeSaleCardObj.number;
	    	this.giveGoods.giftNote = this.rechargeSaleCardObj.giftNote;
	    	this.giveGoods.status = 1;
	    	this.rechargeSaleCardObj.giveGoods = [this.giveGoods];
    		this.loadGiveGoods();
    	}
    },
    methods:{
      handleClick(tab) {
    		this.gotoTab(tab.name);
    	},
    	gotoTab(tab){
    		this.activeName = tab;
    		if(tab !='tab2'){return ; }//没切换到tab2，不用处理
    		if(this.$refs.activityGiveGoods){
    				if(this.rechargeSaleCardObj.goodsId !=0){
	    				this.$refs.activityGiveGoods.giveGoods = [this.giveGoods];
	    			}else{
	    				this.$refs.activityGiveGoods.giveGoods = [];
	    			}
            this.$refs.activityGiveGoods.reloadGiftForGoods();
        };
    	},
      loadGiveGoods(){
        this.loading = true;
        getMallGiftDetail({
          goodsId:this.rechargeSaleCardObj.goodsId,
        }).then((data) => {
          this.loading = false;
          const {success,msg,result}=data;
          if(success && result){
          	var di = _.clone(this.giveGoods);
          	if(result.deleteFlag==1){
          		di.status = -1;
          	}else{
          		di.status = result.statusCode;
          	}
          	di.goodsSn = result.goodsSn;
          	di.goodsName = result.goodsName;
          	di.marketPrice = result.marketPrice;
          	di.goodsPic = result.goodsPic;
            this.$set(this,'giveGoods',_.clone(di));
          }
        });
      },
      
      modifyMallRechargeSaleCardInfo(){
      	this.$refs.rechargeSaleCardObj.validate((valid) => {
          if (valid) {
          	var param = {};
		      	
		      	if(this.rechargeSaleCardObj.saleCardName!=this.rechargeSaleCardObjOld.saleCardName){
		      		param.saleCardName = this.rechargeSaleCardObj.saleCardName;
		      	}
		      	if(this.rechargeSaleCardObj.saleCardUseRule!=this.rechargeSaleCardObjOld.saleCardUseRule){
		      		param.saleCardUseRule = this.rechargeSaleCardObj.saleCardUseRule;
		      	}
		      	if(this.rechargeSaleCardObj.saleCardPic!=this.rechargeSaleCardObjOld.saleCardPic){
		      		param.saleCardPic = this.rechargeSaleCardObj.saleCardPic;
		      	}
		      	if(this.rechargeSaleCardObj.sortIndex!=this.rechargeSaleCardObjOld.sortIndex){
		      		param.sortIndex = this.rechargeSaleCardObj.sortIndex;
		      	}
		      	if(this.rechargeSaleCardObj.isHot!=this.rechargeSaleCardObjOld.isHot){
		      		param.isHot = this.rechargeSaleCardObj.isHot;
		      	}
		      	if(this.rechargeSaleCardObj.salePrice!=this.rechargeSaleCardObjOld.salePrice){
		      		param.salePrice = this.rechargeSaleCardObj.salePrice;
		      	}
		      	var giveGoods = this.$refs.activityGiveGoods.giveGoods;
		      	if(giveGoods && giveGoods.length>0){//存在赠品情况
		      		giveGoods = giveGoods[0];
		      		if(!/^(1|([1-9]([0-9]*)))$/.test(giveGoods.number)){
			      		giveGoods.number = 1;
			      	}else if(giveGoods.stockNumber>0 && giveGoods.number > giveGoods.stockNumber){
			      		giveGoods.number = giveGoods.stockNumber;
			      	}
			      	if(giveGoods.giftNote && giveGoods.giftNote.length>250){
			      		giveGoods.giftNote = giveGoods.giftNote.substring(0,250);
			      	}
			      	if(giveGoods.goodsId!=this.rechargeSaleCardObjOld.goodsId){
		      			param.goodsId = giveGoods.goodsId;
			      	}
			      	if(giveGoods.shopId!=this.rechargeSaleCardObjOld.shopId){
		      			param.shopId = giveGoods.shopId;
			      	}
			      	if(giveGoods.number!=this.rechargeSaleCardObjOld.number){
		      			param.number = giveGoods.number;
			      	}
			      	if(giveGoods.giftNote!=this.rechargeSaleCardObjOld.giftNote){
		      			param.giftNote = giveGoods.giftNote;
			      	}
		      	}else if(this.rechargeSaleCardObjOld.goodsId != 0){//原来存在的赠品，现在被删除了
		      		param.goodsId = 0;
		      		param.shopId = 0;
		      		param.number = 0;
		      		param.giftNote = '';
		      	}
		      	if(_.isEmpty(param)){
		      		this.$message({
		      			showClose: true,
			            type: 'warning',
			            message: '没有任何数据变动！'
			        });
		      		return;
		      	}
		      	param.cardId = this.rechargeSaleCardObj.cardId;
		      	
		        this.$confirm('确定修改网销卡么？', '提示', {
		          type: 'warning'
		        }).then(() => {//确定
	        	  modifyMallRechargeSaleCard(param).then((data) => {
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
