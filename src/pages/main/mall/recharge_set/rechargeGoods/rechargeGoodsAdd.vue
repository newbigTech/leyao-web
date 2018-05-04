<template>
  <div class="_container">
  	<card-panel>
      <h3 slot="title">创建充值规则</h3>
      <div slot="panel-btns">
        <el-button size="small" type="success" @click.native.prevent="$emit('reback', 'rechargeGoodsList')">返回列表</el-button>
      </div>
      <div slot="panel-body">
        <div class="_v-tab_wrapper">
          <el-tabs @tab-click="handleClick" type="border-card" class="_v-tab" v-model="activeName">
  					<el-tab-pane label="基本信息" name="tab1">
  					  <card-panel>
                <h3 slot="title">录入充值规则基本信息</h3>     
                <div slot="panel-body">
                  <el-form style="width: 500px;" :rules="rules" ref="rechargeGoodsObj" :model="rechargeGoodsObj" label-width="120px">
                    <el-form-item label="商品名称" prop="goodsName">
                       <el-input placeholder="请输入商品名称" v-model="rechargeGoodsObj.goodsName"></el-input>
                    </el-form-item>
                    <el-form-item label="商品全名" prop="goodsFullName">
                       <el-input placeholder="请输入商品全名" v-model="rechargeGoodsObj.goodsFullName"></el-input>
                    </el-form-item>
                    <el-form-item label="充值金额" prop="topUpAmount">
                       <el-input placeholder="请输入充值金额" v-model="rechargeGoodsObj.topUpAmount"></el-input>
                    </el-form-item>
                    <el-form-item label="排序" prop="sortIndex">
                       <el-input-number v-model="rechargeGoodsObj.sortIndex" :min="0" :max="1000000"></el-input-number>
                    </el-form-item>
                    <el-form-item label="状态">
                      <el-radio-group v-model="rechargeGoodsObj.statusCode">
                        <el-radio :label="0">下架</el-radio>
                        <el-radio :label="1">上架</el-radio>
                      </el-radio-group>
                    </el-form-item> 
                   <!-- <el-form-item label="是否推荐">
                      <el-radio-group v-model="rechargeGoodsObj.isHot">
                        <el-radio :label="0">否</el-radio>
                        <el-radio :label="1">是</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="是否分期返还">
                      <el-radio-group v-model="rechargeGoodsObj.isLock">
                        <el-radio :label="0">否</el-radio>
                        <el-radio :label="1">是</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="锁定期数(1-12)" prop="lockMonth" v-if="rechargeGoodsObj.isLock==1">
                      <el-input-number v-model="rechargeGoodsObj.lockMonth" :min="0" :max="12"></el-input-number>
                    </el-form-item>
                    -->
                    <el-form-item label="充值时间设置">
                      <el-radio-group v-model="rechargeGoodsObj.isTime">
                        <el-radio :label="0">无</el-radio>
                        <el-radio :label="1">有</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="充值时间段" v-if="rechargeGoodsObj.isTime">
                      <el-col :span="9">
                        <el-form-item prop="beginDay">
                          <el-date-picker type="date" placeholder="选择起始日期" 
                            v-model="rechargeGoodsObj.beginDay" style="width: 100%;"
                            :picker-options="pickerOptions0"
                          ></el-date-picker>
                        </el-form-item>
                      </el-col>
                      <el-col class="line" :span="2" style="text-align: center;"> ~ </el-col>
                      <el-col :span="9">
                        <el-form-item prop="endDay">
                          <el-date-picker type="date" placeholder="选择截止日期" 
                            v-model="rechargeGoodsObj.endDay" style="width: 100%;"
                            :picker-options="pickerOptions1"
                          ></el-date-picker>
                        </el-form-item>
                      </el-col>
                      <el-col :span="2" style="padding-left:5px;">
                        <el-button @click.native="resetRechargeGoodsDay" >清空</el-button>
                      </el-col>
                    </el-form-item>
                    <el-form-item label="商品图片">
						          <div class="_classify-uploader">
						            <div class="_upload-select" @click="openShopFileDialog(1)">
						                <div class="_upload-select-box">
						                    <div class="_upload-select-icon"><i class="el-icon-upload"></i></div>
						                    <div class="_upload-select-text">点击上传图片</div>
						                    <div class="_upload-select-preview" v-show="!!rechargeGoodsObj.goodsPic && (rechargeGoodsObj.goodsPic.length > 1)">
						                        <img :src="goodsPic">
						                        <div class="_upload-select-cover"> <span>点击更换图片</span> </div>
						                        <div class="_upload-select-cover"> <span @click.stop.prevent="rechargeGoodsObj.goodsPic='';saleCardPic=''" style="position:absolute;top:0;right: 10px">X</span> </div>
						                    </div>
						                </div>
						                <div class="_upload-select-lable">商品图片</div>
						            </div>
                      <!-- </el-col> -->
                    </el-form-item>
                    <el-form-item label="商品简介">
                      <el-input type="textarea" v-model="rechargeGoodsObj.goodsDesc"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button @click.native="gotoTab('tab2')" type="primary">下一步</el-button>
                    </el-form-item>
                  </el-form>
                </div>
              </card-panel>
  	        </el-tab-pane>
            <el-tab-pane label="赠送商品" name="tab2">
              <card-panel class="">
                <h3 slot="title">选择赠送商品 <el-tag type="danger" style="background-color: transparent">赠送金额合计: <strong style="font-size: 13px; font-weight: 500;">{{rechargeGoodsObj.givenAmount}}</strong></el-tag></h3>
                <div slot="panel-btns"> <el-tag type="primary" style="background-color: transparent">请在下边的优惠券/商品列表中添加</el-tag></div>
                <div slot="panel-body">
                  <el-table :data="rechargeGoodsObj.goodsItem" stripe border>
                    <el-table-column align="center" prop="itemTypeStr" label="类型" width="120"></el-table-column>
                    <el-table-column align="center" prop="itemName" label="名称" min-width="150"></el-table-column>
                    <el-table-column align="center"  inline-template label="赠送价值" width="200">
                      <div>
                        <input v-model="row.itemPrice" v-on:change="changeItemPrice(row)" class="el-input__inner"/>
                      </div>
                    </el-table-column>
                    <el-table-column align="center" inline-template label="操作" width="90">
                      <el-button size="mini" type="danger" @click.native="removeGoodsItem(row)">移除</el-button>
                    </el-table-column>
                  </el-table>
                </div>
              </card-panel>
              <card-panel style="margin-top: 20px;" class="_left">
                <h3 slot="title"> 优惠券/商品列表 </h3>
                <div slot="panel-btns" class="flex-vc">
                  <!-- <div style="margin-right:10px;">店铺选择: </div> -->
                  <el-select v-model="shop" placeholder="请选择店铺" @change="changeChange" class="_small">
                    <el-option
                      v-for="item in shopList"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </div>
                <div slot="panel-body">
                  <el-tabs type="border-card" @tab-click="changeTab" style="width: 100%;">
                    <el-tab-pane label="优惠券" name="iTab1">
                      <couponsForGoods @chooseCoupons="chooseCoupons" @unChooseCoupons="unChooseCoupons" :obj="paramObj" ref="couponsForGoods"></couponsForGoods>
                    </el-tab-pane>
                    <el-tab-pane label="商品" name="iTab2">
                      <spuGoodsForGoods @chooseGoods="chooseGoods" @unChooseGoods="unChooseGoods" :obj="paramObj" ref="spuGoodsForGoods"></spuGoodsForGoods>
                    </el-tab-pane>
                  </el-tabs>
                </div>
              </card-panel>
              <div style="margin-top: 20px;">
                <el-button @click.native="gotoTab('tab1')" type="primary">上一步</el-button>
                <el-button @click.native="addMallRechargeGoodsInfo" type="primary">新增</el-button> 
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
  </div>
</template>
<style>
</style>
<script>
	import couponsForGoods from "../couponsForGoods"
	import spuGoodsForGoods from "../spuGoodsForGoods"
	import ShopFile from 'pages/main/mall/common/components/shop_file'
  import { 
  	 addMallRechargeGoods
  	,validMallRechargeGoodsGoodsName
  	,validMallRechargeGoodsGoodsFullName
  	,getSupplierShop
  } from 'src/vuex/actions/rechargeGoodsAction'
  import {dateFormat} from 'lib/utils/dateFormat.js'
  import prettysize from "lib/utils/prettysize"
  import RegExp from 'lib/utils/regexp'
  import _ from "lodash"
  export default {
    props: {
      obj: {
        type: Object,
        default: {}
      }
    },
    components:{ShopFile,couponsForGoods,spuGoodsForGoods},
    data(){
      var _this = this;
      var checkGoodsNameExists = (rule, value, callback) => {
      	value = _.trim(value);
      	if(value == ''){
      		callback(new Error('请输入商品名称'));
      		return;	
      	}
      	validMallRechargeGoodsGoodsName({goodsName:value,goodsId:this.rechargeGoodsObj.goodsId}).then((data) => {
            const {success,msg,result}=data;
            if(!success) {
              callback(new Error(msg));
            }else{
              callback();
            }
        }); 
      };
      var checkGoodsFullNameExists = (rule, value, callback) => {
      	value = _.trim(value);
      	if(value == ''){
      		callback(new Error('请输入商品全名'));
      		return;	
      	}
      	validMallRechargeGoodsGoodsFullName({goodsFullName:value,goodsId:this.rechargeGoodsObj.goodsId}).then((data) => {
            const {success,msg,result}=data;
            if(!success) {
              callback(new Error(msg));
            }else{
              callback();
            }
        }); 
      };
      var bdt = new Date();
      var edt = new Date(Date.now()+30*24*60*60*1000);
      return {
      	loading:false,//遮罩层
        shopFileDialog:false,
        tab5vm: new this.$root.constructor(),
        goodsPic:'',
      	uploading:0,
      	previewPic:'',
      	activeName:'tab1',
        pickerOptions0: {
        	disabledDate(time){
            return _this.rechargeGoodsObj.endDay == '' || typeof _this.endDay =='undefined'?time.getTime() < Date.now() - 8.64e7:time.getTime() > _this.rechargeGoodsObj.endDay.getTime();
          }
        },
        pickerOptions1: {
          disabledDate(time){
            return _this.rechargeGoodsObj.beginDay == '' || typeof _this.beginDay =='undefined'?time.getTime() < Date.now() - 8.64e7:time.getTime() < _this.rechargeGoodsObj.beginDay.getTime();
          }
        },
        goodsTypeMap:{0: '单品商品', 1:'规格商品', 2:'组合商品'},
      	paramObj:{},//传参给获取商品列表
        picMD5_0: '',
        shopList:[],
        shop:{},
        defBeginDay:dateFormat(bdt,'yyyy-MM-dd'),
        defEndDay:dateFormat(edt,'yyyy-MM-dd'),
      	rechargeGoodsObj:{
      		goodsName:'',
      		goodsFullName:'',
      		sortIndex:0,
      		topUpAmount:'1.00',
      		givenAmount:0.00,
      		isLock:0,
      		lockMonth:0,
      		goodsPic:'',
      		goodsDesc:'',
      		isHot:0,
      		isTime:0,
      		beginDay:bdt,
      		endDay:edt,
      		statusCode:0,
      		goodsItem:[],
      	},
      	rules: {
          topUpAmount: [
            { required:true, trigger: 'blur', message: '请输入充值金额'},
            { pattern: RegExp.amount,trigger: 'blur',message: '格式错误， 格式：0.00'}
          ],
          goodsName: [
            { required: true, message: '请输入商品名称', trigger: 'blur,change' },
            { validator: checkGoodsNameExists, trigger: 'blur' }
          ],
          goodsFullName: [
            { required: true, message: '请输入商品全名', trigger: 'blur,change' },
            { validator: checkGoodsFullNameExists, trigger: 'blur' }
          ],
        },
      	//*************************
      }
    },
    vuex:{
      
    },
    methods:{
      handleClick(tab) {
      	this.gotoTab(tab.name);
    	},
    	gotoTab(tab){
    		this.activeName = tab;
    		if(tab !='tab2'){return ; }//没切换到tab2，不用处理
    		//时间发送变化，要清空活动商品列表
    		var bd = this.rechargeGoodsObj.beginDay==""? "":dateFormat(this.rechargeGoodsObj.beginDay,'yyyy-MM-dd');
    		var ed = this.rechargeGoodsObj.endDay==""? "":dateFormat(this.rechargeGoodsObj.endDay,'yyyy-MM-dd');
      	if(this.rechargeGoodsObj.isTime==1 &&(this.defBeginDay != bd || this.defEndDay != ed)){
      		var goodsItem = [];
      		this.rechargeGoodsObj.goodsItem.forEach((item)=>{
      			if(item.itemType != 0){
      				goodsItem.push(item);
      			}
      		});
      		this.rechargeGoodsObj.goodsItem = goodsItem;
	      	this.defBeginDay = bd;
	      	this.defEndDay = ed;
      	}
      	/*this.$store.getters.ev.$emit('onchangeCouponsForGoods',{
      		beginDay:this.rechargeGoodsObj.isTime==0 ?dateFormat(new Date(),'yyyy-MM-dd'):bd,
      		endDay:this.rechargeGoodsObj.isTime==0 ?'':ed,
      	});*/
    	},
      changeTab(tab){
      	
      },
     chooseCoupons(row){
     		//判断是否已经存在
     		var di;
     		var isHas = false;
     		for(var i=0,li=this.rechargeGoodsObj.goodsItem.length; i<li; i++){
     			di = this.rechargeGoodsObj.goodsItem[i];
     			if(di.itemType == 0 && di.itemVal1==row.couponsId){
     				isHas = true;
     				break;
     			}
     		}
     		if(isHas){
     			this.$message.error('该优惠券已经存在');
     			return;
     		}
      	this.rechargeGoodsObj.goodsItem.push({
      		itemType:0,
      		itemTypeStr:'优惠券',
      		itemName:row.couponsName,
      		itemVal1:row.couponsId,
      		itemVal2:0,
      		sortIndex:this.rechargeGoodsObj.goodsItem.length +1,
      		itemPrice:row.couponsPrice,
      		status:1,
      	});
        this.watchGoodsItemChange();
        
        this.notifyCouponsForGoods();
      },
      chooseGoods(row){
      	//判断是否已经存在
      	row.goodsSkuId = row.goodsSkuId || 0;
     		var di;
     		var isHas = false;
     		for(var i=0,li=this.rechargeGoodsObj.goodsItem.length; i<li; i++){
     			di = this.rechargeGoodsObj.goodsItem[i];
     			if(di.itemType == 1 && di.itemVal1==row.goodsId && di.itemVal2==row.goodsSkuId){
     				isHas = true;
     				break;
     			}
     		}
     		if(isHas){
     			this.$message.error('该'+this.goodsTypeMap[row.goodsType]+'已经存在');
     			return;
     		}
      	this.rechargeGoodsObj.goodsItem.push({
      		itemType:1,
      		itemTypeStr:this.goodsTypeMap[row.goodsType],
      		itemName:row.goodsName,
      		itemVal1:row.goodsId,
      		itemVal2:row.goodsSkuId || 0,
      		sortIndex:this.rechargeGoodsObj.goodsItem.length +1,
      		itemPrice:row.price,
      		status:1,
      	});
        this.watchGoodsItemChange();
        
        this.notifySpuGoodsForGoods();
      },
      removeGoodsItem(row){//移除选中的优惠券/商品
      	var index = this.rechargeGoodsObj.goodsItem.indexOf(row)
        if (index !== -1) {
          this.rechargeGoodsObj.goodsItem.splice(index, 1);
          this.watchGoodsItemChange();
          if(row.itemType==1){
          	this.notifySpuGoodsForGoods();
          }else{
          	this.notifyCouponsForGoods();
          }
        }
        
      },
      changeItemPrice(item){
      	if ( !/^(0|[1-9][0-9]{0,7})(\.[0-9]{1,2})?$/.test(item.itemPrice)){
      		item.itemPrice = 0;
      	}else{
      		item.itemPrice = parseFloat(item.itemPrice);
      	}
      	item.itemPrice = item.itemPrice.toFixed(2);
      	this.watchGoodsItemChange();
      },
      watchGoodsItemChange(){
    		let ga = 0;
    		for(var i=0,li=this.rechargeGoodsObj.goodsItem.length;i<li; i++){
  				ga += parseFloat(this.rechargeGoodsObj.goodsItem[i].itemPrice);
  			}
    		this.rechargeGoodsObj.givenAmount = ga.toFixed(2);
    	},
      //反选
      unChooseGoods(){
      	var goodsItem = [];
      	for(var i=0,li=this.rechargeGoodsObj.goodsItem.length; i<li; i++){
    			if(this.rechargeGoodsObj.goodsItem[i].itemType != 1){
    				goodsItem.push(this.rechargeGoodsObj.goodsItem[i]);
    			}
      	}
      	this.rechargeGoodsObj.goodsItem = goodsItem;
      	this.watchGoodsItemChange();
      	//通知商品列表
      	this.notifySpuGoodsForGoods();
      },
      unChooseCoupons(){
      	var goodsItem = [];
      	for(var i=0,li=this.rechargeGoodsObj.goodsItem.length; i<li; i++){
    			if(this.rechargeGoodsObj.goodsItem[i].itemType == 1){
    				goodsItem.push(this.rechargeGoodsObj.goodsItem[i]);
    			}
      	}
      	this.rechargeGoodsObj.goodsItem = goodsItem;
      	this.watchGoodsItemChange();
      	//通知商品列表
      	this.notifyCouponsForGoods();
      },
      //通知商品列表
      notifySpuGoodsForGoods(){
      	if(this.$refs.spuGoodsForGoods){
      		var parentGoodList = [];
      		for(var i=0,li=this.rechargeGoodsObj.goodsItem.length; i<li; i++){
      			if(this.rechargeGoodsObj.goodsItem[i].itemType==1){
      				parentGoodList.push({
      					goodsId:this.rechargeGoodsObj.goodsItem[i].itemVal1,
      					goodsSkuId:this.rechargeGoodsObj.goodsItem[i].itemVal2 || 0
      				});
      			}
	      	}
	      	
    		  this.$refs.spuGoodsForGoods.parentGoodList = parentGoodList;
    		  this.$refs.spuGoodsForGoods.signListIsChoose();
        };
      },
      //通知优惠券列表
      notifyCouponsForGoods(){
      	if(this.$refs.couponsForGoods){
      		var parentGoodList = [];
      		for(var i=0,li=this.rechargeGoodsObj.goodsItem.length; i<li; i++){
      			if(this.rechargeGoodsObj.goodsItem[i].itemType==0){
      				parentGoodList.push({
      					couponsId:this.rechargeGoodsObj.goodsItem[i].itemVal1,
      				});
      			}
	      	}
	      	
    		  this.$refs.couponsForGoods.parentGoodList = parentGoodList;
    		  this.$refs.couponsForGoods.signListIsChoose();
        };
      },
    	
      addMallRechargeGoodsInfo(){
      	//处理排序
      	var sortIndex = this.rechargeGoodsObj.sortIndex;
      	sortIndex = parseInt(sortIndex,10);
      	if(isNaN(sortIndex)){
      		sortIndex = 0;
      	}
      	//处理分期
      	var lockMonth  = this.rechargeGoodsObj.lockMonth;
      	lockMonth = parseInt(lockMonth,10);
      	if(isNaN(lockMonth)){
      		lockMonth = 0;
      	}
      	if(this.rechargeGoodsObj.isLock == 1 &&(lockMonth<1 || lockMonth>12)){
      		this.$message({type: 'error',message:'选是分期返还时，锁定期数必须是1到12'});
      		return false;
      	}
      	if(this.rechargeGoodsObj.topUpAmount <= 0){
      		this.$message({type: 'error',message:'充值金额必须大于0'});
      		return false;
      	}
      	//
      	if(this.rechargeGoodsObj.isTime == 1){
      		if(this.rechargeGoodsObj.beginDay=='' || this.rechargeGoodsObj.beginDay==null || typeof this.rechargeGoodsObj.beginDay=='undefined'){
      			this.$message({type: 'error',message:'选设置充值时间时，必须填写开始日期'});
      			return false;
      		}
      		if(this.rechargeGoodsObj.endDay=='' || this.rechargeGoodsObj.endDay==null || typeof this.rechargeGoodsObj.endDay=='undefined'){
      			this.$message({type: 'error',message:'选设置充值时间时，必须填写截止日期'});
      			return false;
      		}
      	}
      	//允许不送任何东西
      	/*if(this.rechargeGoodsObj.goodsItem.length<=0){
      		this.$message({type: 'error',message:'请在右边的优惠券/SPU商品/SKU商品列表中添加给充值规则'});
      		return false; 
      	}*/
      	var goodsItem = [];
      	var gi;
      	for(var i=0,li=this.rechargeGoodsObj.goodsItem.length; i<li; i++){
      		gi = this.rechargeGoodsObj.goodsItem[i];
      		//[{itemType,itemVal1,itemVal2,sortIndex,itemPrice}]
      		goodsItem.push({
      			itemType : gi.itemType,
      			itemVal1 : gi.itemVal1,
      			itemVal2 : gi.itemVal2,
      			sortIndex : gi.sortIndex,
      			itemPrice : gi.itemPrice,
      		});
      	}
      	var param = {
      		goodsName: this.rechargeGoodsObj.goodsName,
      		goodsFullName: this.rechargeGoodsObj.goodsFullName,
      		sortIndex: sortIndex,
      		topUpAmount: this.rechargeGoodsObj.topUpAmount,
      		isLock : this.rechargeGoodsObj.isLock,
      		lockMonth : lockMonth,
      		goodsPic: this.rechargeGoodsObj.goodsPic,
      		goodsDesc: this.rechargeGoodsObj.goodsDesc,
      		isHot: this.rechargeGoodsObj.isHot,
      		isTime: this.rechargeGoodsObj.isTime,
      		beginDay: this.rechargeGoodsObj.isTime == 0? null:dateFormat(this.rechargeGoodsObj.beginDay,'yyyy-MM-dd'),
      		endDay:  this.rechargeGoodsObj.isTime == 0? null:dateFormat(this.rechargeGoodsObj.endDay,'yyyy-MM-dd'),
      		goodsItem:JSON.stringify(goodsItem),
      		statusCode: this.rechargeGoodsObj.statusCode,
      	};
      	
      	this.$refs.rechargeGoodsObj.validate((valid) => {
          if (valid) {
           //console.log(this.rechargeGoodsObj)
		        this.$confirm(goodsItem.length<=0 ?'充值规则未选择赠送优惠券/商品，是否继续提交？':'确定创建充值规则么？', '提示', {
		          type: 'warning'
		        }).then(() => {//确定
	        	  addMallRechargeGoods(param).then((data) => {
		            const {success,msg,result}=data;
		            this.$message({
			            type: success? 'success':'error',
			            message: msg
				        });
				        if(success){
									this.$emit('reback', 'rechargeGoodsList');
				        }
			        });
			        
		          
		        }).catch(() => {//取消
		                    
		        });
		        //*******************************
          } else {
          	this.activeName = 'tab1';
            this.$message({
	            type: 'error',
	            message: '请正确填写必填字段'
	        });
            return false;
          }
        });
      	
         
      },
     	resetRechargeGoodsDay(){
     		this.rechargeGoodsObj.beginDay = "";
     		this.rechargeGoodsObj.endDay = "";
     	},
     	//***加载运营商店铺列表*****
      loadShopListData(){
        var param ={
          isMyself: 1,
          statusCode: 1
        };
        this.loading = true;
        getSupplierShop(param).then((data) => {
          this.loading = false;
          const {success,result}=data;
          //console.log(JSON.stringify(result))
          if(success){
              if(result && result.length>0){
              	result.forEach((item)=>{
                  this.shopList.push({
                  	value: item.shopId,
          					label: item.shopName
                  });
                });
              	this.shop = this.shopList[0].value;
              	this.paramObj = {
		      		  	shopId:this.shop,
		      		    beginDay:this.rechargeGoodsObj.isTime==0 ?dateFormat(new Date(),'yyyy-MM-dd'):this.defBeginDay,
		      		    endDay:this.rechargeGoodsObj.isTime==0 ?'':this.defEndDay,
		      		  };
      					this.reloadCouponsForGoods();
              } 
              
          }
        });
      },
      changeChange(){
      	this.rechargeGoodsObj.givenAmount = 0.0;
      	this.rechargeGoodsObj.goodsItem = [];
      	if(this.$refs.spuGoodsForGoods){
      		this.$refs.spuGoodsForGoods.parentGoodList = [];
      		this.reloadSpuGoodsForGoods();
        };
      	if(this.$refs.couponsForGoods){
      		this.$refs.couponsForGoods.parentGoodList = [];
      		this.reloadCouponsForGoods();
        };
      },
      reloadCouponsForGoods(){
      	if(this.$refs.couponsForGoods){
      		  this.$refs.couponsForGoods.paramObj = {
      		  	shopId:this.shop,
      		    //beginDay:this.rechargeGoodsObj.isTime==0 ?dateFormat(new Date(),'yyyy-MM-dd'):this.defBeginDay,
      		    //endDay:this.rechargeGoodsObj.isTime==0 ?'':this.defEndDay,
      		  };
            this.$refs.couponsForGoods.loadCouponsData();
        };
      },
      reloadSpuGoodsForGoods(){
      	if(this.$refs.spuGoodsForGoods){
      		  this.$refs.spuGoodsForGoods.paramObj = {shopId:this.shop};
            this.$refs.spuGoodsForGoods.loadGoodsData();
        };
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
              this.goodsPic = this.obj.cloudShowUrl + shopFiles[0].fileMd5
              this.rechargeGoodsObj.goodsPic = shopFiles[0].fileMd5
          }
      },
      //**********************   
    },
    created() {
      this.loadShopListData();
    }
  }
</script>
