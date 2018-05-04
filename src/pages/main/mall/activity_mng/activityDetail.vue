<template>
  <div class="_container">
    <card-panel>
      <h3 slot="title">活动/专题详情</h3>
      <div slot="panel-btns"><el-button type="primary" size="small" @click.native.prevent="$emit('reback', 'activityList',obj)">返回</el-button></div>
      <div slot="panel-body">
        <div class="_v-tab_wrapper">
          <el-tabs type="border-card" class="_v-tab"  v-model="activeName">
            <el-tab-pane label="基本信息" name="tab1">
              <el-form class="demo-form" style="width: 560px;" ref="activityObj" :model="activityObj" label-width="100px">
                <el-form-item :label="titleName+'名称'">
                   <el-input :placeholder="'请输入'+titleName+'名称'" v-model="activityObj.activityName" disabled></el-input>
                </el-form-item>
                <el-form-item :label="titleName+'全名'">
                   <el-input :placeholder="'请输入'+titleName+'全名'" v-model="activityObj.activityFullName" disabled></el-input>
                </el-form-item>
                <el-form-item label="有效期">
                  <el-row>
                    <el-col :span="11">
                      <el-form-item prop="beginDtm">
                        <el-input placeholder="选择起始日期" 
                          v-model="activityObj.beginDtm_str" style="width: 100%;"
                          disabled
                        ></el-input>
                      </el-input>
                    </el-col>
                    <el-col class="line" :span="2" style="text-align: center;"> ~ </el-col>
                    <el-col :span="11">
                      <el-form-item prop="endDtm">
                        <el-input placeholder="选择截止日期" 
                          v-model="activityObj.endDtm_str" style="width: 100%;"
                          disabled
                        ></el-input>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </el-form-item>
                <el-form-item :label="titleName+'图片'">
                  <div class="_img-groups">
                    <div class="_img-groups-container">
                      <div class="_img-group">
                        <div class="_img-box">
                          <div class="_img-box-view">
                            <img :src="obj.cloudShowUrl + activityObj.activityPic"> 
                          </div>
                        </div>
                        <div class="_img-group-text">专题大图</div>
                      </div>
                      <div class="_img-group">
                        <div class="_img-box">
                          <div class="_img-box-view">
                            <img :src="obj.cloudShowUrl + activityObj.activitySPic"> 
                          </div>
                        </div>
                        <div class="_img-group-text">专题小图</div>
                      </div>
                      <div class="_img-group">
                        <div class="_img-box">
                          <div class="_img-box-view">
                            <img :src="obj.cloudShowUrl + activityObj.activityIcon"> 
                          </div>
                        </div>
                        <div class="_img-group-text">专题图标</div>
                      </div>
                    </div>
                  </div>
                </el-form-item>
                <!--<el-form-item :label="titleName+'约束金额'" v-if="activityObj.activityType!=0">
                   <el-input :placeholder="'请输入'+titleName+'约束金额'" v-model="activityObj.activityLimitPrice" disabled></el-input>
                </el-form-item>-->
                <el-form-item :label="titleName+'类型'">
                  <el-radio-group v-model="activityObj.activityType">
                    <el-radio :label="0" v-if="activityObj.activityType==0">专题</el-radio>
                    <el-radio :label="1" v-if="activityObj.activityType==1">特价</el-radio>
                    <el-radio :label="2" v-if="activityObj.activityType==2">新人专享</el-radio>
                    <el-radio :label="3" v-if="activityObj.activityType==3">包邮</el-radio>
                    <el-radio :label="4" v-if="activityObj.activityType==4">满减</el-radio>
                    <el-radio :label="5" v-if="activityObj.activityType==5">满送</el-radio>
                    <el-radio :label="6" v-if="activityObj.activityType==6">满换</el-radio>
                    <el-radio :label="7" v-if="activityObj.activityType==7">第二件半价/特价</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item :label="titleName+'状态'" prop="statusCode">
                  <el-radio-group v-model="activityObj.statusCode">
                    <el-radio :label="0" v-if="activityObj.statusCode==0">停用</el-radio>
                    <el-radio :label="1" v-if="activityObj.statusCode==1">启用</el-radio>
                  </el-radio-group>
                </el-form-item>
                <el-form-item :label="titleName+'标签'">
                   <el-tag
                    v-for="tag in activitySign"
                    :type="tag.type"
                    :key="tag.key"
                    :style="'margin-right:10px;'"
                  >
                  {{tag.name}} 
                  </el-tag>
                </el-form-item>
                <el-form-item v-if="activityObj.activityType==1 || activityObj.activityType==2" label="价格类型" prop="priceType">
                  <el-radio-group v-model="activityJson.priceType">
                    <el-radio :label="0" v-if="activityJson.priceType==0">价格</el-radio>
                    <el-radio :label="1" v-if="activityJson.priceType==1">折扣(1-99)</el-radio>
                  </el-radio-group>
                </el-form-item>
                <!--<el-form-item v-if="activityObj.activityType==2" label="限购数量" prop="limitBuyNumber">
                   <el-input-number v-model="activityJson.limitBuyNumber" :min="1" :max="999999" disabled></el-input-number>
                </el-form-item>-->
                <el-form-item v-if="activityObj.activityType==3" label="包邮规则">
                   <el-col class="line" :span="2">满</el-col>
                   <el-col class="line" :span="10">
                     <el-form-item prop="fullPrice">
                      <el-input type="text" :placeholder="'请输入满金额'" v-model="activityJson.fullPrice" disabled></el-input>
                     </el-form-item>
                   </el-col>
                   <el-col class="line" :span="12" style="text-align:left;">元，包邮</el-col>
                </el-form-item>
                <el-form-item v-if="activityObj.activityType==4" label="满减规则">
                   <el-col class="line" :span="2">满</el-col>
                   <el-col class="line" :span="8">
                     <el-form-item prop="fullPrice">
                      <el-input :placeholder="'请输入满金额'" v-model="activityJson.fullPrice" disabled></el-input>
                     </el-form-item>
                   </el-col>
                     <el-col class="line" :span="4" style="width:50px;">元，减</el-col>
                   <el-col class="line" :span="8">
                     <el-form-item prop="cutPrice">
                      <el-input :placeholder="'请输入减金额'" v-model="activityJson.cutPrice" disabled></el-input>
                     </el-form-item>
                   </el-col>
                   <el-col class="line" :span="2" style="text-align:left;">元</el-col>
                </el-form-item>
                <el-form-item v-if="activityObj.activityType==2" label="订单数" prop="orderNumber">
                  	<el-col class="line" :span="4" style="width:40px;">小于</el-col>
                     <el-col class="line" :span="10">
                       <el-form-item prop="orderNumber">
                        <el-input type="text" :placeholder="'请输入定义新人订单数'" v-model="activityJson.orderNumber" disabled></el-input>
                       </el-form-item>
                     </el-col>
                     <el-col class="line" :span="10" style="text-align:left;">笔订单，算新人</el-col>
                </el-form-item>
                <el-form-item v-if="activityObj.activityType==5" label="满送规则">
                   <el-col class="line" :span="2">满</el-col>
                   <el-col class="line" :span="10">
                     <el-form-item prop="fullPrice">
                      <el-input type="text" :placeholder="'请输入满金额'" v-model="activityJson.fullPrice" disabled></el-input>
                     </el-form-item>
                   </el-col>
                   <el-col class="line" :span="12" style="text-align:left;">元，赠送商品</el-col>
                </el-form-item>
                <el-form-item v-if="activityObj.activityType==6" label="满换规则">
                   <el-col class="line" :span="2">满</el-col>
                   <el-col class="line" :span="10">
                     <el-form-item prop="fullPrice">
                      <el-input type="text" :placeholder="'请输入满金额'" v-model="activityJson.fullPrice" disabled></el-input>
                     </el-form-item>
                   </el-col>
                   <el-col class="line" :span="12" style="text-align:left;">元，换购商品</el-col>
                </el-form-item>
                <el-form-item v-if="activityObj.activityType==7" label="购满数量" prop="fullNumber">
                     <el-col class="line" :span="2">第</el-col>
                     <el-col class="line" :span="10">
                       <el-form-item prop="fullNumber">
                        <el-input type="text" :placeholder="'请输入定义购满数量'" v-model="activityJson.fullNumber" disabled></el-input>
                       </el-form-item>
                     </el-col>
                     <el-col class="line" :span="12" style="text-align:left;">件，半价/特价</el-col>
                </el-form-item>
              </el-form>
              <div style="margin-top: 20px;">
                <el-button @click.native="gotoTab('tab2')" type="primary">下一步</el-button>
              </div>
            </el-tab-pane>
            <el-tab-pane label="商品信息" name="tab2">
              <goodsOfActivity2 :obj="obj"></goodsOfActivity2>
              <exchangeListOfActivity2 :obj="obj" v-if="activityObj.activityType==6"></exchangeListOfActivity2>
              <giveGoodsOfActivity2 :obj="obj" v-if="activityObj.activityType==5"></giveGoodsOfActivity2>
              <div style="margin-top: 20px;">
                <el-button @click.native="gotoTab('tab1')" type="primary">上一步</el-button>
                <el-button @click.native="gotoTab('tab3')" type="primary">下一步</el-button>
              </div>
            </el-tab-pane>
            <el-tab-pane label="页面信息" name="tab3">
              <activityPageDetail :obj="obj"></Activitypagedetail>
              <div style="margin-top: 20px;">
                <el-button @click.native="gotoTab('tab2')" type="primary">上一步</el-button>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </card-panel>
    
  </div>
</template>
<style lang="sass">
  
</style>
<script>
	import goodsOfActivity2 from "./goodsOfActivity2"
	import exchangeListOfActivity2 from "./exchangeListOfActivity2"
	import giveGoodsOfActivity2 from "./giveGoodsOfActivity2"
	import activityPageDetail from "./activityPageDetail"
  import { 
  	getMallActivityGoodsList,
    getMallGoodsListByGoodsIds, 
  } from 'src/vuex/actions/activityAction'
  import { getMallGiftDetail} from 'src/vuex/actions/giftAction'
  import {dateFormat} from 'lib/utils/dateFormat.js'
  import prettysize from "lib/utils/prettysize"
  import _ from "lodash"
  export default {
    props: {
      obj: {
        type: Object,
        default: {}
      }
    },
    components: {
     goodsOfActivity2,activityPageDetail,exchangeListOfActivity2,giveGoodsOfActivity2
    },
    data(){
      var _this = this; 
      var titleName = this.obj.isActivity==1?'活动':'专题';
      return {
      	loading:false,//遮罩层
      	titleName:titleName,
        activitySign:[],//标签
        activeName:'tab1',
        activityJson:$.parseJSON(this.obj.activityJson),
      	activityObj:{
      		activityType:'',
      		statusCode:'',
      		activityName:'',
      		activityFullName:'',
      		beginDtm:'',
      		endDtm:'',
      		activityLimitPrice:'',
      		activityPic:'',
      		activitySPic:'',
      		activityIcon:'',
      		activitySign:'',
      		priceType:'',
      		isPage:'',
          fullPrice:0,
          cutPrice:0,
          orderNumber:1,
          fullNumber:0,
      		exchangeList:[],
      		giveGoods:{},
      		giveGoodsList:[],
      	},
      	goodsTypeMap:{0: '单品', 1:'规格', 2:'组合'},
      	//*************************
      }
    },
    created(){
    	this.obj.opt = 'activityDetail';
      this.activityObj = this.obj;
      this.activityObj.orderNumber = this.activityJson.orderNumber;
      this.activityObj.fullNumber = this.activityJson.fullNumber;
      this.activityObj.exchangeList = this.activityJson.exchangeList;
      this.activityObj.giveGoods = this.activityJson.giveGoods;
      this.activityObj.beginDtm_str = this.activityObj.beginDtm? dateFormat(this.activityObj.beginDtm,'yyyy-MM-dd HH:mm:ss') :'';
      this.activityObj.endDtm_str = this.activityObj.endDtm? dateFormat(this.activityObj.endDtm,'yyyy-MM-dd HH:mm:ss') :'';
      //处理标签
      if(typeof this.activityObj.activitySign !='undefined' && this.activityObj.activitySign!=''){
      	var activitySign = this.activityObj.activitySign.split(',');
      	for(var i=0,li=activitySign.length; i<li; i++){
	    		this.activitySign.push({ key: i, name: activitySign[i], type: 'gray' });
	    	}
      }
      //去加载它的商品列表
      if(this.activityObj.activityType==6){//满换
      	this.loadExchangeList();
      }
      if(this.activityObj.activityType==5 && this.activityObj.giveGoods.length>0 && this.activityObj.giveGoods[0].goodsId>0){//满送
      	this.loadGiveGoods();
      }
    },
    methods:{
      gotoTab(tab){
    		this.activeName = tab;
    	},
    	loadExchangeList(){
      	var goodsList = [];
      	var di;
      	for(var i=0,li=this.activityJson.exchangeList.length; i<li; i++){
      		di = this.activityJson.exchangeList[i];
      		goodsList.push({goodsId:di.goodsId,goodsSkuId:di.goodsSkuId});
      	}
        this.loading = true;
        getMallGoodsListByGoodsIds({
          goodsList:JSON.stringify(goodsList),
        }).then((data) => {
          this.loading = false;
          const {success,msg,result}=data;
          if(success){
            var di;
            var exchangeList = [];
            for(var i=0,li=this.activityJson.exchangeList.length; i<li; i++){
		      		di = this.activityJson.exchangeList[i];
		      		result.forEach((item) => {
		      			if(di.goodsId==item.goodsId && di.goodsSkuId==item.goodsSkuId){
		      				di.goodsSn=item.goodsSn;
	                di.goodsName=item.goodsName;
	                di.goodsName_str=this.goodsTypeMap[item.goodsType]+'-'+item.goodsName;
	                di.goodsPrice=item.goodsPrice;
	  				      di.statusCode=item.statusCode;
		      				return false;
		      			}
	            });
	            exchangeList.push(_.clone(di));
		      	}
	  				this.$set(this.activityObj,'exchangeList',exchangeList);
            
          }
        });
      },
       loadGiveGoods(){
      	
        this.loading = true;
        getMallGiftDetail({
          goodsId:this.activityObj.giveGoods[0].goodsId,
        }).then((data) => {
          this.loading = false;
          const {success,msg,result}=data;
          if(success && result){
          	var di = {goodsId:result.goodsId};
          	di.deleteFlag = result.deleteFlag;
          	di.goodsSn = result.goodsSn;
          	di.goodsName = result.goodsName;
          	di.marketPrice = result.marketPrice;
					  di.goodsPic = result.goodsPic;
					  di.statusCode = result.statusCode;
            this.$set(this.activityObj,'giveGoodsList',[di]);
          }
        });
      },
      //**********************   
    },
    mounted(){
      
    }
  }
</script>
