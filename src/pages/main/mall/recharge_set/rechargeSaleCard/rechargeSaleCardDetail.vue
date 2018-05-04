<template>
<div class="_container">
	<card-panel>
    <h3 slot="title">网销卡详情</h3>
    <div slot="panel-btns"> <el-button @click.native.prevent="$emit('reback', 'rechargeSaleCardList',obj)" size="small">返回</el-button> </div>
    <div slot="panel-body">
      <div class="_v-tab_wrapper">
        <el-tabs @tab-click="handleClick" type="border-card" class="_v-tab" v-model="activeName">
          <el-tab-pane label="基本信息" name="tab1">
            <card-panel>
              <span slot="title">录入网销卡基本信息</span>
						    <div slot="panel-body">
						      <el-form style="width:500px;" label-width="140px">
						        <el-form-item label="销售卡名称" prop="saleCardName" >
						           <el-input placeholder="请输入销售卡名称" v-model="rechargeSaleCardObj.saleCardName" disabled></el-input>
						        </el-form-item>
						        <el-form-item label="网销卡使用规则" prop="saleCardUseRule">
						           <el-input type="textarea" :rows="2" placeholder="请输入网销卡使用规则" v-model="rechargeSaleCardObj.saleCardUseRule" disabled></el-input>
						        </el-form-item>
						        <el-form-item label="网销卡图片">
						          <el-col :span="10">
						            <img style="width:100%;" :src="obj.cloudShowUrl+rechargeSaleCardObj.saleCardPic"/>
						          </el-col>
						        </el-form-item>
						        <el-form-item label="排序" prop="sortIndex">
						           <el-input type="number" placeholder="请输入排序" v-model="rechargeSaleCardObj.sortIndex" disabled></el-input>
						        </el-form-item>
						        <el-form-item label="是否推荐" prop="isHot">
						          <el-radio-group v-model="rechargeSaleCardObj.isHot">
						            <el-radio :label="0" v-if="rechargeSaleCardObj.isHot==0">不推荐</el-radio>
						            <el-radio :label="1" v-if="rechargeSaleCardObj.isHot==1">推荐</el-radio>
						          </el-radio-group>
						        </el-form-item>
						        <el-form-item label="卡金额" prop="cardPrice">
						           <el-input type="number" placeholder="请输入卡面额" v-model="rechargeSaleCardObj.cardPrice" disabled></el-input>
						        </el-form-item>
						        <el-form-item label="销售价" prop="salePrice">
						           <el-input type="number" placeholder="请输入销售价" v-model="rechargeSaleCardObj.salePrice" disabled></el-input>
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
						        <el-form-item label="卡发行数量" prop="countNumber">
						           <el-input-number v-model="rechargeSaleCardObj.countNumber" :min="1" :max="999999" disabled></el-input-number>
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
		        <card-panel>
		          <div slot="panel-table">
		            <div class="_table-list">
			            <el-table :data="giveGoods" stripe style="width: 100%" border>
					      	<el-table-column align="center" label="" width="120">
				          	<template scope="scope">
				                <img :src="cloudShowUrl + scope.row.goodsPic" width="80px" height="80px" class="img-rounded">
							      </template>
				          </el-table-column>
			              <el-table-column align="center" property="goodsSn" label="赠品编码"></el-table-column>
			              <el-table-column align="center" property="activityName" label="名称" min-width="130">
			              	<template scope="scope">
		                      <div v-show="scope.row.status == -1" style="color:red;text-decoration:line-through;" title="该赠品已被删除">{{scope.row.goodsName}}</div>
		                      <div v-show="scope.row.status == 0"  style="color:red;text-decoration:line-through;" title="该赠品已被下架">{{scope.row.goodsName}}</div>
		                      <div v-show="scope.row.status!=-1 && giveGoods.status!=0">{{scope.row.goodsName}}</div>
								      </template>
			              </el-table-column>
			              <el-table-column align="center" property="marketPrice" label="市场价"></el-table-column>
			              <el-table-column align="center" property="number" label="赠送数量"></el-table-column>
										<el-table-column align="center" property="giftNote" label="赠送说明"></el-table-column>
			            </el-table>
		            </div>
		          </div>
		        </card-panel>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </card-panel>
  <!--遮罩层-->
  <div v-loading="loading" class="el-loading-demo"></div>
</div>
</template>
<style>
</style>
<script>
	import { mapGetters } from 'vuex'
  import { addMallRechargeSaleCard} from 'src/vuex/actions/rechargeSaleCardAction'
  import { getMallGiftDetail} from 'src/vuex/actions/giftAction'
  import {dateFormat} from 'lib/utils/dateFormat.js'
  import _ from "lodash"
  export default {
  	components: {
     
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
      	loading:false,//遮罩层
        shopFileDialog:false,
        activeName: 'tab1',//选项卡
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
      		day:[null,null],
      		dayNumber:1,
      		orderPayLimit:50,
      		shopId:0,
      		goodsId:0,
      		number:0,
      		giftNote:'',
      	},
      	giveGoods:[]
      	//*************************
      }
    },
    vuex:{
      
    },
    created(){
    	this.rechargeSaleCardObj = this.obj.card;
    	if(this.rechargeSaleCardObj.timeLimitType==0){
    		this.rechargeSaleCardObj.day = dateFormat(this.rechargeSaleCardObj.beginDay,'yyyy-MM-dd')+'至'+dateFormat(this.rechargeSaleCardObj.endDay,'yyyy-MM-dd');
    	}
    	if(this.rechargeSaleCardObj.goodsId !=0){
	    	this.loadGiveGoods();
    	}
    },
    computed:{
    	...mapGetters(['cloudShowUrl'])
    },
    methods:{
      handleClick(tab) {
    		this.gotoTab(tab.name);
    	},
    	gotoTab(tab){
    		this.activeName = tab;
    	},
      loadGiveGoods(){
        this.loading = true;
        getMallGiftDetail({
          goodsId:this.rechargeSaleCardObj.goodsId,
        }).then((data) => {
          this.loading = false;
          const {success,msg,result}=data;
          if(success && result){
          	var di = {
          		goodsId : this.rechargeSaleCardObj.goodsId,
          		shoupId : this.rechargeSaleCardObj.shoupId,
          		number : this.rechargeSaleCardObj.number,
          		giftNote : this.rechargeSaleCardObj.giftNote,
          	};
          	if(result.deleteFlag==1){
          		di.status = -1;
          	}else{
          		di.status = result.statusCode;
          	}
          	di.goodsSn = result.goodsSn;
          	di.goodsName = result.goodsName;
          	di.marketPrice = result.marketPrice;
					  di.goodsPic = result.goodsPic;
            this.$set(this,'giveGoods',[di]);
          }
        });
      },
      //**********************   
    },
    mounted(){
      
    }
  }
</script>
