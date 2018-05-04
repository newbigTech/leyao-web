<template>
  <div class="_container">
    <card-panel>
      <h3 slot="title">修改{{titleName}}</h3>
      <div slot="panel-btns">
        <el-button size="small" type="success" @click.native.prevent="$emit('reback', 'activityList',obj)">返回{{titleName}}列表</el-button>
      </div>
      <div slot="panel-body">
        <div class="_v-tab_wrapper">
          <el-tabs @tab-click="handleClick" type="border-card" class="_v-tab" v-model="activeName">
            <el-tab-pane label="基本信息" name="tab1">
              <card-panel>
                <span slot="title">修改基本信息</span>
                <div slot="panel-body">
                  <el-form class="demo-form" style="width:550px;" :rules="rules" ref="activityObj" :model="activityObj" label-width="90px">
                    <el-form-item label="活动类型" prop="activityType" v-if="activityObj.activityType!=0">
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
                    <el-form-item :label="titleName+'名称'" prop="activityName">
                       <el-input :placeholder="'请输入'+titleName+'名称'" v-model="activityObj.activityName" disabled></el-input>
                    </el-form-item>
                    <el-form-item :label="titleName+'全名'" prop="activityFullName">
                       <el-input :placeholder="'请输入'+titleName+'全名'" v-model="activityObj.activityFullName" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="有效期" required>
                      <el-col :span="11">
                        <el-form-item prop="beginDtm">
                          <el-date-picker type="datetime" placeholder="选择起始日期" 
                            v-model="activityObj.beginDtm" style="width: 100%;"
                            :picker-options="pickerOptions0" disabled
                          ></el-date-picker>
                        </el-form-item>
                      </el-col>
                      <el-col class="line" :span="2">-</el-col>
                      <el-col :span="11">
                        <el-form-item prop="endDtm">
                          <el-date-picker type="datetime" placeholder="选择截止日期" 
                            v-model="activityObj.endDtm" style="width: 100%;"
                            :picker-options="pickerOptions1" disabled
                          ></el-date-picker>
                        </el-form-item>
                      </el-col>
                    </el-form-item>
                    
                    <el-form-item :label="titleName+'图片'">
                      <div class="_classify-uploader">
                        <div class="_upload-select" @click="openShopFileDialog(1)">
                            <div class="_upload-select-box">
                                <div class="_upload-select-icon"><i class="el-icon-upload"></i></div>
                                <div class="_upload-select-text">点击上传图片</div>
                                <div class="_upload-select-preview" v-show="!!activityObj.activityPic && (activityObj.activityPic.length > 1)">
                                    <img :src="activityPic">
                                    <div class="_upload-select-cover"> <span>点击更换图片</span> </div>
                                    <div class="_upload-select-cover"> <span @click.stop.prevent="activityObj.activityPic='';activityPic=''" style="position:absolute;top:0;right: 10px">X</span> </div>
                                </div>
                            </div>
                            <div class="_upload-select-lable">{{titleName}}图片</div>
                        </div>
                        <div class="_upload-select" @click="openShopFileDialog(2)" style="margin-left:5px;">
                            <div class="_upload-select-box" style="height: 80px;width:90px;">
                                <div class="_upload-select-icon"><i class="el-icon-upload"></i></div>
                                <div class="_upload-select-text">点击上传图片</div>
                                <div class="_upload-select-preview" v-show="!!activityObj.activitySPic && (activityObj.activitySPic.length > 1)" style="height: 80px">
                                    <img :src="activitySPic">
                                    <div class="_upload-select-cover"> <span>点击更换图片</span> </div>
                                    <div class="_upload-select-cover"> <span @click.stop.prevent="activityObj.activitySPic='';activitySPic=''" style="position:absolute;top:0;right: 10px">X</span> </div>
                                </div>
                            </div>
                            <div class="_upload-select-lable">{{titleName}}小图片</div>
                        </div>
                        <div class="_upload-select" @click="openShopFileDialog(3)" style="margin-left:5px;">
                            <div class="_upload-select-box" style="height: 80px;width:90px;">
                                <div class="_upload-select-icon"><i class="el-icon-upload"></i></div>
                                <div class="_upload-select-text">点击上传图片</div>
                                <div class="_upload-select-preview" v-show="!!activityObj.activityIcon && (activityObj.activityIcon.length > 1)" style="height: 80px">
                                    <img :src="activityIcon">
                                    <div class="_upload-select-cover"> <span>点击更换图片</span> </div>
                                    <div class="_upload-select-cover"> <span @click.stop.prevent="activityObj.activityIcon='';activityIcon=''" style="position:absolute;top:0;right: 10px">X</span> </div>
                                </div>
                            </div>
                            <div class="_upload-select-lable">{{titleName}}图标</div>
                        </div>
                      </div>
                    </el-form-item>
                    <!--
                    <el-form-item :label="titleName+'约束金额'" prop="activityLimitPrice" v-if="activityObj.activityType==3||activityObj.activityType==4">
                       <el-input :placeholder="'请输入'+titleName+'约束金额'" v-model="activityObj.activityLimitPrice"></el-input>
                    </el-form-item>
                    -->
                    <el-form-item :label="titleName+'标签'">
                       <el-tag
                        v-for="tag in activitySigns"
                        :closable="true"
                        :type="tag.type"
                        :key="tag.key"
                        :close-transition="false"
                        @close="handleCloseSign(tag)"
                        :style="'margin-right:10px;'"
                      >
                      {{tag.name}}
                      </el-tag>
                      <el-button :style="'margin-left:10px;'" @click.native.prevent="addActivitySign()" type="text" size="small">添加标签(最多5个)</el-button>
                    </el-form-item>
                    <el-form-item v-if="activityObj.activityType==1 || activityObj.activityType==2" label="价格类型" prop="priceType">
                      <el-radio-group v-model="activityObj.priceType">
                        <el-radio :label="0" v-if="activityJson.priceType==0">价格</el-radio>
                        <el-radio :label="1" v-if="activityJson.priceType==1">折扣(1-99)</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <!--<el-form-item v-if="activityObj.activityType==2" label="限购数量" prop="buyNumber">
                       <el-input-number v-model="activityObj.limitBuyNumber" :min="1" :max="999999"></el-input-number>
                    </el-form-item>-->
                    <el-form-item v-if="activityObj.activityType==3" label="包邮规则">
                       <el-col class="line" :span="2">满</el-col>
                       <el-col class="line" :span="10">
                         <el-form-item prop="fullPrice">
                          <el-input type="text" :placeholder="'请输入满金额'" v-model="activityObj.fullPrice"></el-input>
                         </el-form-item>
                       </el-col>
                       <el-col class="line" :span="12" style="text-align:left;">元，包邮</el-col>
                    </el-form-item>
                    <el-form-item v-if="activityObj.activityType==4" label="满减规则">
	                     <el-col class="line" :span="2">满</el-col>
	                     <el-col class="line" :span="8">
	                       <el-form-item prop="fullPrice">
	                        <el-input type="text" :placeholder="'请输入满金额'" v-model="activityObj.fullPrice"></el-input>
	                       </el-form-item>
	                     </el-col>
	                     <el-col class="line" :span="4" style="width:50px;">元，减</el-col>
	                     <el-col class="line" :span="8">
	                       <el-form-item prop="cutPrice">
	                        <el-input type="text" :placeholder="'请输入减金额'" v-model="activityObj.cutPrice"></el-input>
	                       </el-form-item>
	                     </el-col>
	                     <el-col class="line" :span="2" style="text-align:left;">元</el-col>
                    </el-form-item>
	                  <el-form-item v-if="activityObj.activityType==2" label="订单数" prop="orderNumber">
	                  	<el-col class="line" :span="4" style="width:40px;">小于</el-col>
	                     <el-col class="line" :span="10">
	                       <el-form-item prop="orderNumber">
	                        <el-input type="text" :placeholder="'请输入定义新人订单数'" v-model="activityObj.orderNumber"></el-input>
	                       </el-form-item>
	                     </el-col>
	                     <el-col class="line" :span="10" style="text-align:left;">笔订单，算新人</el-col>
	                  </el-form-item>
	                  <el-form-item v-if="activityObj.activityType==5" label="满送规则">
	                     <el-col class="line" :span="2">满</el-col>
	                     <el-col class="line" :span="10">
	                       <el-form-item prop="fullPrice">
	                        <el-input type="text" :placeholder="'请输入满金额'" v-model="activityObj.fullPrice"></el-input>
	                       </el-form-item>
	                     </el-col>
	                     <el-col class="line" :span="12" style="text-align:left;">元，赠送商品</el-col>
	                  </el-form-item>
	                  <el-form-item v-if="activityObj.activityType==6" label="满换规则">
	                     <el-col class="line" :span="2">满</el-col>
	                     <el-col class="line" :span="10">
	                       <el-form-item prop="fullPrice">
	                        <el-input type="text" :placeholder="'请输入满金额'" v-model="activityObj.fullPrice"></el-input>
	                       </el-form-item>
	                     </el-col>
	                     <el-col class="line" :span="12" style="text-align:left;">元，换购商品</el-col>
	                  </el-form-item>
	                  <el-form-item v-if="activityObj.activityType==7" label="购满数量" prop="fullNumber">
	                     <el-col class="line" :span="2">第</el-col>
	                     <el-col class="line" :span="10">
	                       <el-form-item prop="fullNumber">
	                        <el-input type="text" :placeholder="'请输入定义购满数量'" v-model="activityObj.fullNumber"></el-input>
	                       </el-form-item>
	                     </el-col>
	                     <el-col class="line" :span="12" style="text-align:left;">件，半价/特价</el-col>
	                  </el-form-item>
                    <!--<el-form-item label="活动状态" prop="statusCode" v-if="activityObj.activityType!=0">
                      <el-radio-group v-model="activityObj.statusCode">
                        <el-radio :label="0">停用</el-radio>
                        <el-radio :label="1">启用</el-radio>
                      </el-radio-group>
                    </el-form-item>-->
                    <el-form-item>
                      <el-button @click.native="gotoTab('tab2')" type="primary">下一步</el-button>
                    </el-form-item>
                  </el-form>
                </div>
              </card-panel>
            </el-tab-pane>
            <el-tab-pane label="活动商品" name="tab2">
              <activityGoodsList 
                @addActivitySign="addActivitySign" 
                @deleteActivitySign="deleteActivitySign"
                @modifyActivitySign="modifyActivitySign"
                :obj="activityObj"
                ref="activityGoodsList"
                ></activityGoodsList>
              <div style="margin-top: 60px;"></div>
              <activityGiveGoods v-if="activityObj.activityType==5" 
                :obj="activityObj"
                ref="activityGiveGoods"
              ></activityGiveGoods>
              <activityExchangeList v-if="activityObj.activityType==6"
                :obj="activityObj"
                ref="activityExchangeList"
              ></activityExchangeList>
              <div style="margin-top: 20px;">
                <el-button @click.native="gotoTab('tab1')" type="primary">上一步</el-button>
                <el-button @click.native="modifyMallActivityInfo" type="success">修改</el-button>
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
  import activityGoodsList from "./activityGoodsList"
  import ShopFile from 'pages/main/mall/common/components/shop_file'
	import activityExchangeList from "./activityExchangeList"
	import activityGiveGoods from "./activityGiveGoods"
  import { 
    modifyMallActivity,
    validMallActivityName,
    validMallActivityFullName,
    getMallActivityGoodsList,
    deleteMallActivityGoodsBySign,
    deleteMallActivityGoods,
    getMallGoodsListByGoodsIds,
  } from 'src/vuex/actions/activityAction'
  import { getMallGiftDetail} from 'src/vuex/actions/giftAction'
  import {dateFormat} from 'lib/utils/dateFormat.js'
  import prettysize from "lib/utils/prettysize"
  import _ from "lodash"
  export default {
    components: {
     ShopFile,activityGoodsList,activityExchangeList,activityGiveGoods
    },
    props: {
      obj: {
        type: Object,
        default: {}
      }
    },
    data(){
      var _this = this;
      var checkMoney = (rule, value, callback) => {
        setTimeout(() => {
          if ( !/^([0]|[1-9]([0-9]*))(\.[0-9]{1,2})?$/.test(value)) {
            callback(new Error('请输入数字值(>=0.00)'));
          } else{
            callback();
          } 
        }, 200);
      };
      var checkActivityNameExists = (rule, value, callback) => {
        value = _.trim(value);
        if(value == ''){
          callback(new Error('请输入'+_this.titleName+'名'));
          return; 
        }
        validMallActivityName({activityName:value,activityId:_this.activityObj.activityId}).then((data) => {
            const {success,msg,result}=data;
            if(!success) {
              callback(new Error(msg));
            }else{
              callback();
            }
        }); 
      };
      var checkActivityFullNameExists = (rule, value, callback) => {
        value = _.trim(value);
        if(value == ''){
          callback(new Error('请输入'+_this.titleName+'全名'));
          return; 
        }
        validMallActivityFullName({activityFullName:value,activityId:_this.activityObj.activityId}).then((data) => {
            const {success,msg,result}=data;
            if(!success) {
              callback(new Error(msg));
            }else{
              callback();
            }
        }); 
      };
      var checkOrderNumber = (rule, value, callback) => {
        setTimeout(() => {
          if ( !/^[1-9]([0-9]*)$/.test(value)) {
            callback(new Error('请输入正整数(>=1)'));
          } else{
            callback();
          } 
        }, 100);
      };
      var checkFullNumber = (rule, value, callback) => {
        setTimeout(() => {
          if ( !/^([2]|[1-9]([0-9]*))$/.test(value)) {
            callback(new Error('请输入正整数(>=2)'));
          } else{
            callback();
          } 
        }, 100);
      };
      var checkCutPrice = (rule, value, callback) => {
        setTimeout(() => {
          if ( !/^([0]|[1-9]([0-9]*))(\.[0-9]{1,2})?$/.test(value)) {
            callback(new Error('请输入数字值(>=0.00)'));
          }else if(parseFloat(value,10) > parseFloat(this.activityObj.fullPrice,10)){
          	callback(new Error('减数值不能大于购买数值'));
          } else{
            callback();
          } 
        }, 200);
      };
      var titleName = this.obj.isActivity==1?'活动':'专题';
      return {
        loading:false,//遮罩层
        titleName:titleName,
        activeName: 'tab1',//选项卡
        vm: new this.$root.constructor(),
        pickerOptions0: {
          disabledDate(time){
            return _this.activityObj.endDtm=='' || typeof _this.activityObj.endDtm=='undefined'?time.getTime() < Date.now() - 8.64e7:time.getTime() < Date.now() - 8.64e7||time.getTime() > _this.activityObj.endDtm.getTime();
          }
        },
        pickerOptions1: {
          disabledDate(time){
            return _this.activityObj.beginDtm=='' || typeof _this.activityObj.beginDtm=='undefined'?time.getTime() < Date.now() - 8.64e7:time.getTime() < Date.now() - 8.64e7||time.getTime() < _this.activityObj.beginDtm.getTime();
          }
        },
        goodsTypeMap:{0: '单品', 1:'规格品', 2:'组合品'},
        //上传图片参数******************
        activityPic: '',
        activitySPic: '',
        activityIcon: '',
        shopFileDialog:false,
        curDailogIndex:1,
        tab5vm: new this.$root.constructor(),
        //*****************
        activitySigns:[],//标签
        //****************
        activityJson:$.parseJSON(this.obj.activityJson),
        defActivityJson:_.clone($.parseJSON(this.obj.activityJson)),
        activityObj:{
          activityType:this.obj.isActivity==1?this.obj.activityType:0,
          statusCode:0,
          activityName:'',
          activityFullName:'',
          beginDtm:new Date(),
          endDtm:new Date(Date.now()+7*24*60*60*1000),
          activityLimitPrice:0,
          activityPic:'',
          activitySPic:'',
          activityIcon:'',
          activitySign:'',
          activitySigns:[],//给商品列表使用
          limitBuyNumber:-1,
          fullPrice:0,
          cutPrice:0,
          orderNumber:1,
          fullNumber:0,
      		exchangeList:[],
      		giveGoods:[],
      		giveUrlType:'',
          priceType:1,
          isActivity:this.obj.isActivity,
          formatDate:function(d){ return dateFormat(d,'yyyy-MM-dd HH:mm:ss');},
      		shopId:this.obj.shopId
        },
        rules: {
          activityLimitPrice: [
            { validator: checkMoney,required:true, trigger: 'blur,change' }
          ],
          /*activityName: [
            { required: true, message: '请输入'+titleName+'名', trigger: 'blur' },
            { validator: checkActivityNameExists, trigger: 'blur' }
          ],
          activityFullName: [
            { required: true, message: '请输入'+titleName+'全名', trigger: 'blur' },
            { validator: checkActivityFullNameExists, trigger: 'blur' }
          ],*/
          fullPrice: [
            { validator: checkMoney,required:true, trigger: 'blur,change' }
          ],
          cutPrice: [
            { validator: checkCutPrice,required:true, trigger: 'blur,change' }
          ],
          orderNumber: [
            { validator: checkOrderNumber,required:true, trigger: 'blur,change' }
          ],
          fullNumber: [
            { validator: checkFullNumber,required:true, trigger: 'blur,change' }
          ],
        },
        //*************************
      }
    },
    created(){
      //this.loadRoleDetail();
     
      this.activityObj.activityType = this.obj.activityType;
      this.activityObj.activityId = this.obj.activityId;
      this.activityObj.statusCode = this.obj.statusCode;
      this.activityObj.activityName = this.obj.activityName;
      this.activityObj.activityFullName = this.obj.activityFullName;
      this.activityObj.beginDtm = new Date(this.obj.beginDtm);
      this.activityObj.endDtm = new Date(this.obj.endDtm);
      this.activityObj.activityLimitPrice = this.obj.activityLimitPrice;
      this.activityObj.activityPic = this.obj.activityPic;
      this.activityObj.activitySPic = this.obj.activitySPic;
      this.activityObj.activityIcon = this.obj.activityIcon;
      this.activityObj.activitySign = this.obj.activitySign;
      this.activityObj.activitySigns = [];
      this.activityObj.limitBuyNumber = this.activityJson.limitBuyNumber;
      this.activityObj.fullPrice = this.activityJson.fullPrice;
      this.activityObj.cutPrice = this.activityJson.cutPrice;
      this.activityObj.priceType = this.activityJson.priceType;
      this.activityObj.orderNumber = this.activityJson.orderNumber;
      this.activityObj.fullNumber = this.activityJson.fullNumber;
      this.activityObj.exchangeList = this.activityJson.exchangeList;
      this.activityObj.giveGoods = this.activityJson.giveGoods;
      this.activityObj.formatDate = function(d){ return dateFormat(d,'yyyy-MM-dd HH:mm:ss');};
      
      this.defActivityObj = _.clone(this.activityObj);
      //处理标签
      if(typeof this.activityObj.activitySign !='undefined' && this.activityObj.activitySign!=''){
        var activitySigns = this.activityObj.activitySign.split(',');
        for(var i=0,li=activitySigns.length; i<li; i++){
          this.activitySigns.push({ key: i, name: activitySigns[i], type: 'gray' });
          this.activityObj.activitySigns.push({isOpen:true,name:activitySigns[i],goodsItem:[]});
        }
      }
      //处理图片
      this.activityPic = this.activityObj.activityPic? this.obj.cloudShowUrl + this.activityObj.activityPic :'';
      this.activitySPic = this.activityObj.activitySPic? this.obj.cloudShowUrl + this.activityObj.activitySPic :'';
      this.activityIcon = this.activityObj.activityIcon? this.obj.cloudShowUrl + this.activityObj.activityIcon :'';
      //去加载它的商品列表
      if(this.activityObj.activityType==6){//满换
      	this.loadExchangeList();
      }
      
      this.loadGoodsList();
      
    },
    methods:{
      handleClick(tab) {
        this.gotoTab(tab.name);
      },
      gotoTab(tab){
        this.activeName = tab;
        if(this.activeName !='tab2'){return ; }//没切换到tab2，不用处理
        var param = {
          urlType:'activity',
          beginDtm:this.activityObj.beginDtm=='' || typeof this.activityObj.beginDtm=='undefined'? '':this.activityObj.formatDate(this.activityObj.beginDtm),
          endDtm:this.activityObj.endDtm=='' || typeof this.activityObj.endDtm=='undefined'? '':this.activityObj.formatDate(this.activityObj.endDtm)
        };
        if(this.activityObj.activityType!=0){
        }else{//专题不用时间限制
          param.beginDtm = "";
          param.endDtm = "";
          
        }
        //this.$store.getters.ev.$emit('onchangeSpuGoodsForGoods',param);
        if(this.$refs.activityGoodsList){
      		  this.$refs.activityGoodsList.paramObj.beginDtm = param.beginDtm;
      		  this.$refs.activityGoodsList.paramObj.endDtm = param.endDtm;
            this.$refs.activityGoodsList.reloadSpuGoodsForGoods();
        };
        if(this.$refs.activityExchangeList){
            this.$refs.activityExchangeList.reloadSpuGoodsForGoods();
        };
        if(this.$refs.activityGiveGoods){
            this.$refs.activityGiveGoods.loadGiveGoods();
            this.$refs.activityGiveGoods.reloadGiftForGoods();
        };
      },
      loadGoodsList(){
        this.loading = true;
        getMallActivityGoodsList({
          activityId:this.obj.activityId,
          pageNo:1,
          pageSize:999999,
        }).then((data) => {
          this.loading = false;
          const {success,msg,result}=data;
          if(success){
            this.dataList = result.rows ;
            var sign = {};
            var gl_ = this.activityJson.goodsList;
            var di;
            this.dataList.forEach((item) => {
              if(item.sign==''){ item.sign = '默认标签'; }
              if( !sign[item.sign]){
                sign[item.sign] = {isOpen:true,name:item.sign,goodsItem:[]};
              }
              for(var i=0,li=gl_.length; i<li; i++){
                if(gl_[i].goodsId==item.goodsId && gl_[i].goodsSkuId==item.goodsSkuId){
                  di = gl_[i];
                  break;
                }
              }
              sign[item.sign].goodsItem.push({//添加在最前
                activityGoodsId:item.activityGoodsId,
                goodsSn:item.goodsSn,
                goodsId:item.goodsId,
                goodsSkuId:item.goodsSkuId,
                goodsName:item.goodsName,
                goodsName_str:this.goodsTypeMap[item.goodsType]+'-'+item.goodsName,
                goodsPrice:item.goodsPrice,
                price:item.price,
                priceRate:(item.price*100 /item.goodsPrice).toFixed(2),
  				      statusCode:item.statusCode,
                stockNumber:item.stockNumber,
                limitBuyNumber:di.limitBuyNumber,
              });
            });
            $.each(sign,function(k,v){
              v.goodsItem.sort(function(a,b){
                return a.signSortIndex - b.signSortIndex;
              }); 
            })  
            this.activityObj.activitySigns.forEach((item) => {
              if(sign[item.name]){
                item.goodsItem = sign[item.name].goodsItem;
              }
            });
          }
        });
      },
      loadExchangeList(){
      	var goodsList = [];
      	var di;
      	for(var i=0,li=this.activityObj.exchangeList.length; i<li; i++){
      		di = this.activityObj.exchangeList[i];
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
            for(var i=0,li=this.activityObj.exchangeList.length; i<li; i++){
		      		di = this.activityObj.exchangeList[i];
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
      modifyMallActivityInfo(){
        var activityJson = {
      		"activityType":this.activityObj.activityType, //活动类型 0 专题 1 特价 2 包邮 3 满减 4 新人
      		"priceType":this.activityObj.priceType, //价格类型 0 价格 1 折扣比例 默认 1  只有 特价和新人 1/4的情况下才存在0的情况
      		"fullPrice":0, //满金额	 默认 0 只有包邮和满减 2/3的情况下才会有满金额
      		"cutPrice":0,  //减金额	 默认 0 只有满减 3的情况下才会有减金额
      		"orderNumber":1,//新人订单数 默认 1 只有新人 4情况下才会有新人订单数 大于等于1
      		"fullNumber":0,//第二件购满数量 默认 0 只有第二件半价/特价 7情况下才会有 大于等于2
      		"exchangeList":[],//满换 默认[] 换购商品[{goodsId,goodsSkuId,price/*换购价*/}]
      		"giveGoods":[],//满送 默认[] 赠送商品[{goodsId}]
        };
        if(this.activityObj.activityType==2){//新人专享
          activityJson.orderNumber = this.activityObj.orderNumber;
        }
        if(this.activityObj.activityType==3){//满多少包邮
          activityJson.fullPrice = this.activityObj.fullPrice;
      		this.activityObj.activityLimitPrice = this.activityObj.fullPrice;//使用满多少价来填充
        }
        if(this.activityObj.activityType==4){//满减
          activityJson.fullPrice = this.activityObj.fullPrice;
          activityJson.cutPrice = this.activityObj.cutPrice;
      		this.activityObj.activityLimitPrice = this.activityObj.fullPrice;//使用满多少价来填充
      	}
      	if(this.activityObj.activityType==7){//第二件
      		activityJson.fullNumber = this.activityObj.fullNumber;
      	}
      	if(this.activityObj.activityType==6){//满换
      		activityJson.fullPrice = this.activityObj.fullPrice;
      		if(this.activityObj.exchangeList.length <= 0){
	      		this.$message.error('活动换购商品列表不能为空');
		    		return ;
      		}
      		var di;
      		for(var i=0,li=this.activityObj.exchangeList.length; i<li; i++){
      			di = this.activityObj.exchangeList[i];
	      		activityJson.exchangeList.push({
	      			goodsId:di.goodsId,
	      			goodsSkuId:di.goodsSkuId,
	      			price:di.price
	      		});
	      	}
      	}
      	if(this.activityObj.activityType==5){//满送
      		activityJson.fullPrice = this.activityObj.fullPrice;
      		
      		var giveGoods = this.$refs.activityGiveGoods.giveGoods;
      		if(giveGoods && giveGoods.length>0){
	      		activityJson.giveGoods = [{
	      			goodsId:giveGoods[0].goodsId
	      		}];
	      	}else{
	      		this.$message.error('活动赠送商品不能为空');
		    		return ;
	      	}
      		
      	}
      	var activitySign = [];
      	for(var i=0,li=this.activitySigns.length; i<li; i++){
      		activitySign.push(this.activitySigns[i].name);
      	}
      	var goodsList = [];
      	var itemList;
      	var di,dj;
      	var at = this.activityObj.activityType;
      	var changeStockNumber = function(sn){
      		if(at==0 || at==2){//专题和新人没有设置库存
      			return -1;
      		}
      		return sn;
      	};
      	if(at==0 || at==3 || at==4 || at==5 || at==6){//专题 包邮 满减 满送 满换
    			activityJson.priceType = 1;
    		}else if(at==7){
    			activityJson.priceType = 0;
    		}
      	var changePrice = function(sn){
      		if(at==0 || at==3 || at==4 || at==5 || at==6){//专题 包邮 满减 满送 满换
      			return 100;
      		}
      		return sn;
      	};
      	var changeLimitBuyNumber = function(sn){
      		if(at==0 || at==3 || at==5 || at==6 || at==7){//专题和包邮无限购数量 满送 满换 第二件
      			return 0;
      		}
      		return sn;
      	};
        for(var i=0,li=this.activityObj.activitySigns.length; i<li; i++){
          di = this.activityObj.activitySigns[i];
          itemList = [];
          for(var j=0,lj=di.goodsItem.length; j<lj; j++){
            dj = di.goodsItem[j];
            itemList.push({
              "goodsId":dj.goodsId,
              "goodsSkuId":dj.goodsSkuId,
              "price":changePrice(dj.price),
              "stockNumber":changeStockNumber(dj.stockNumber),
              "limitBuyNumber":changeLimitBuyNumber(dj.limitBuyNumber),
            });
          }
          if(itemList.length>0){
            goodsList.push({
              "sign":activitySign.indexOf(di.name)==-1?'':di.name,
              "itemList":itemList,
            });
          }
        }
        if(goodsList.length <=0){
          this.$message.error('活动商品列表不能为空');
          return ;
        }
        activityJson.goodsList = goodsList;
        var param = {
          
        };
        activityJson = JSON.stringify(activityJson);
        if(this.defActivityJson != activityJson){
          param.activityJson = activityJson;
        }
        if(this.defActivityObj.activityLimitPrice != this.activityObj.activityLimitPrice){
          param.activityLimitPrice = this.activityObj.activityLimitPrice;
        }
        if(this.defActivityObj.activityPic != this.activityObj.activityPic){
          param.activityPic = this.activityObj.activityPic;
        }
        if(this.defActivityObj.activitySPic != this.activityObj.activitySPic){
          param.activitySPic = this.activityObj.activitySPic;
        }
        if(this.defActivityObj.activityIcon != this.activityObj.activityIcon){
          param.activityIcon = this.activityObj.activityIcon;
        }
        if(this.defActivityObj.activityName != this.activityObj.activityName){
          param.activityName = this.activityObj.activityName;
        }
        if(this.defActivityObj.activityFullName != this.activityObj.activityFullName){
          param.activityFullName = this.activityObj.activityFullName;
        }
        
        activitySign = activitySign.join(',');
        //标签
        if(this.defActivityObj.activitySign != activitySign){
          param.activitySign = activitySign;
        }
        if(_.isEmpty(param)){
          this.$message({
            showClose: true,
              type: 'warning',
              message: '没有任何数据变动！'
          });
          return;
        }
        param.activityId = this.activityObj.activityId;
        
        this.$refs.activityObj.validate((valid) => {
          if (valid) {
            //console.log(param)
            this.$confirm('确定修改'+this.titleName+'么？', '提示', {
              type: 'warning'
            }).then(() => {//确定
              modifyMallActivity(param).then((data) => {
                const {success,msg,result}=data;
                this.$message({
                  type: success? 'success':'error',
                  message: msg
                });
                if(success){
                  this.$emit('reback', 'activityList',this.obj);
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
              if(this.curDailogIndex===1){
                this.activityPic = this.obj.cloudShowUrl + shopFiles[0].fileMd5
                this.activityObj.activityPic = shopFiles[0].fileMd5
              }else if(this.curDailogIndex===2){
                this.activitySPic = this.obj.cloudShowUrl + shopFiles[0].fileMd5
                this.activityObj.activitySPic = shopFiles[0].fileMd5
              }else{
                this.activityIcon = this.obj.cloudShowUrl + shopFiles[0].fileMd5
                this.activityObj.activityIcon = shopFiles[0].fileMd5
              }
          }
      },
      //添加标签
      addActivitySign(){
        if(this.activitySigns.length>=5){
           this.$message.error('最多5个标签');
           return;
        }
        this.$prompt('请输入标签名称', '提示', {
          confirmButtonText: '添加',
          cancelButtonText: '取消',
          inputPattern: /^[^\,\s]{1,6}$/,
          inputErrorMessage: '标签不能为空和英文逗号,最多6个字符'
        }).then(({ value }) => {
        	value = $.trim(value);
        	if(value==''){
        		return;
        	}
          //判断标签名称是否已经存在了
          var isHas = false;
          for(var i=0,li=this.activitySigns.length; i<li; i++){
            if(this.activitySigns[i].name == value){
              this.$message.error('该标签已经存在');
              isHas = true;
              break;
            }
          }
          if( !isHas){
            if(this.activitySigns.length <=0){//直接把默认表情修改
              this.activityObj.activitySigns[0].name = value;
            }else{
              this.activityObj.activitySigns.push({isOpen:true,name:value,goodsItem:[]});
            }
            this.activitySigns.push({ key: new Date().getTime(), name: value, type: 'gray' });
          }
        }).catch(() => {});
      },
      handleCloseSign(tag){
        this.deleteActivitySign(tag.name);
        
      },
      deleteActivitySign(tagName){
        //先判断该标签下是否有数据，如果有数据先提示删除标签会删除下面的商品
        var activityGoodsIds = [];
        var di;
        for(var i=0,li=this.activityObj.activitySigns.length; i<li; i++){
          di = this.activityObj.activitySigns[i];
          if(di.name==tagName && di.goodsItem.length>0){
            for(var j=0,lj=di.goodsItem.length; j<lj; j++){
              if(di.goodsItem[j].activityGoodsId){
                activityGoodsIds.push(di.goodsItem[j].activityGoodsId);
              }
            }
            break;
          }
        }
        if(activityGoodsIds.length>0){
          this.$confirm('该标签下有活动已经保存过的商品(非新增的)，删除标签会把它们一起删除，确定删除么？', '提示', {
            type: 'warning'
          }).then(() => {//确定
            deleteMallActivityGoodsBySign({activityId:this.activityObj.activityId,sign:tagName}).then((data) => {
              const {success,msg,result}=data;
              this.$message({
                type: success? 'success':'error',
                message: msg
              });
              if(success){
                this.deleteActivitySign_(tagName);
              }
            });
            
            
          }).catch(() => {//取消
                      
          });
        }else{
          this.deleteActivitySign_(tagName);
        }
        
      },
      deleteActivitySign_(tagName){
        for(var i=0,li=this.activityObj.activitySigns.length; i<li; i++){
          if(this.activityObj.activitySigns[i].name==tagName){
            this.activityObj.activitySigns.splice(i,1);
            break;
          }
        }
        for(var i=0,li=this.activitySigns.length; i<li; i++){
          if(this.activitySigns[i].name==tagName){
            this.activitySigns.splice(i, 1);
            break;
          }
        }
        if(this.activitySigns.length <=0){//都删光了，添加一个默认的
          this.activityObj.activitySigns.push({isOpen:true,name:'默认标签',goodsItem:[]});
        }
      },
      modifyActivitySign(tagName,newTagName){
      	newTagName = $.trim(newTagName);
      	if(newTagName==''){
      		return;
      	}
        for(var i=0,li=this.activityObj.activitySigns.length; i<li; i++){
          if(this.activityObj.activitySigns[i].name==tagName){
            this.activityObj.activitySigns[i].name = newTagName;
            break;
          }
        }
        var isHas = false;
        for(var i=0,li=this.activitySigns.length; i<li; i++){
          if(this.activitySigns[i].name==tagName){
            this.activitySigns[i].name = newTagName;
            isHas = true;
            break;
          }
        }
        if(!isHas){
          this.activitySigns.push({ key: new Date().getTime(), name: newTagName, type: 'gray' });
        }
      },
      //**********************   
    },
    mounted(){
      
    }
  }
</script>
