<template>
<div class="_row-left-right">
  <div class="_row-left">
    <card-panel>
      <div slot="title"> {{titleName}}列表 <el-tag type="primary" style="background-color: transparent">请在商品列表中添加商品</el-tag></div>
      <div slot="panel-body">
        <!-- <el-form ref="rechargeGoodsObj" :model="rechargeGoodsObj" label-width="90px" style="width: 500px;">
          <el-form-item :label="titleName + '名称'">
            <el-input :value="obj.activityName" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="价格类型" v-if="obj.isActivity==1">
            <el-col :span="24">{{obj.priceType==1?'折扣(1-99)':'价格'}}</el-col>
            <el-input :value="obj.priceType == 1 ? '折扣(1-99)' : '价格'" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="时间范围">
            <el-input :value="obj.formatDate(obj.beginDtm) + ' ~ ' + obj.formatDate(obj.endDtm)" :disabled="true"></el-input>
          </el-form-item>
        </el-form> -->
        
        <!-- 活动添加 -->
        <card-panel>
          <span slot="title">添加/编辑{{titleName}} <el-tag type="primary" style="background-color: transparent">点击标签名切换标签</el-tag></span>
          <div slot="panel-btns"> <el-button @click.native.prevent="$emit('addActivitySign')" type="success" size="small">添加标签</el-button> </div>
          <div slot="panel-table">
            <div class="_table-list">
              <table class="table table-bordered table-hovers center _clean-border">
                <thead><tr> <th>当前{{titleName}}</th> <th style="text-align: left;">标签名 </th> <th>标签排序</th> <th>操作</th> </tr></thead>
                <tbody>
                  <template v-for="(item,index) in obj.activitySigns">
                    <tr :class="{'_open': item.isOpen}"> 
                      <td width="10%" style="cursor: pointer" @click="chooseNameFocus(item,index)"> <i class="el-icon-check" v-show="focusIndex == index" style="color: #FF4949;"></i> </td>
                      <td style="text-align: left; cursor: pointer" @click="chooseNameFocus(item,index)">{{item.name}}</td> 
                      <td class="_actions" width="15%">
                        <el-button @click.native.prevent="changeSignIndex(item,1,index)" type="text" size="mini" :disabled="index===0">上移</el-button>
                        <el-button @click.native.prevent="changeSignIndex(item,2,index)" type="text" size="mini" :disabled="index==obj.activitySigns.length-1" >下移</el-button>
                        <el-button @click.native.prevent="changeSignIndex(item,3,index)" type="text" size="mini" :disabled="index===0" style="margin-left:1px;">置顶</el-button>
                        <el-button @click.native.prevent="changeSignIndex(item,4,index)" type="text" size="mini" :disabled="index==obj.activitySigns.length-1">置底</el-button>
                      </td>
                      <td class="_actions" width="20%">
                        <el-button @click.native.prevent="modifySign(item,index)" type="warning" size="mini">修改</el-button>
                        <el-button @click.native.prevent="deleteSign(item,index)" type="danger" size="mini">删除</el-button>
                        <el-button @click="changeSignStatus(item,index)" type="primary" size="mini"> 展开标签 <i class="el-icon-d-arrow-right"></i></el-button>
                      </td>
                    </tr>
                    <tr class="_hidden-row" v-show="item.isOpen">
                      <td colspan="6">
                        <div class="_activity-goods-list">
                          <!-- <el-alert style="height: 36px; text-align: left; display: block;" title="该标签还没有商品,请在下面的商品列表中添加商品" type="info" show-icon :closable="false" v-show="item.goodsItem.length == 0"></el-alert> -->
                          <el-tag type="danger" style="background-color: transparent" v-show="item.goodsItem.length == 0">该标签还没有商品,请在下面的商品列表中添加商品</el-tag>
                          <table class="table table-bordered center table-hover" v-show="item.goodsItem.length">
                            <tbody>
                              <tr class="active"> 
                                <th>商品编码</th> 
                                <th>名称</th>  
                                <th>状态</th> 
                                <th>销售价</th>
                                <th style="width:250px;" v-if="obj.activityType ==1 || obj.activityType ==2 || obj.activityType ==7"> 
	                                <span v-if="obj.priceType ==1">活动折扣 </span>
                                	<div class="flex-vc" v-if="obj.priceType !=1">
	                                	<label style="width: 100px">活动价格 </label>
	                                	<div><el-input @change.native.prevent="checkPriceRateAll($event,index)" type="text" style="width:80px"></el-input>%</div>
															    </div>
                                </th>
                                <th style="width:250px;" v-if="obj.activityType !=0 && obj.activityType !=2">
                                	<div class="flex-vc">
															      <label style="width: 160px">库存数量(-1表示无限)</label>
															      <div><el-input @change.native.prevent="checkStockNumberAll($event,index)" type="text" style="width:80px"></el-input> </div>
															    </div>
                                </th>
                                <th style="width:250px;" v-if="obj.activityType ==1 || obj.activityType ==2 || obj.activityType ==4"> 
                                	<div class="flex-vc">
															      <label style="width: 160px">限购数量(0表示无限)</label>
															      <div><el-input @change.native.prevent="checkLimitBuyNumberAll($event,index)" type="text" style="width:80px"></el-input> </div>
															    </div>
                                </th>
                                <th>商品排序</th>
                                <th>操作</th>
                              </tr>
                              <tr v-for="(it,idx) in item.goodsItem" class="active">
                                <td>{{it.goodsSn}}</td> <!-- 商品编码 -->
                                <td>{{it.goodsName_str}}</td> <!-- 商品名称 -->
                                <td>
							                    <div><!-- 商品表statusCode=1是上架 -->
												            <div v-if="it.statusCode != 0"  style="color:red;text-decoration:line-through;" title="该商品已被下架">已下架</div>
												            <div v-if="it.statusCode == 0">上架中</div>
												          </div>
							                  </td> <!-- 状态 -->
                                <td>{{it.goodsPrice}}</td> <!-- 销售价 -->
                                <td v-if="obj.activityType==1 || obj.activityType==2 || obj.activityType ==7"> <!--特价 新人专享支持改价 活动折扣/价格-->
                                  <el-input v-if="obj.priceType ==1" type="text" @change.native="checkPrice(it,index,idx)" v-model="it.price" style="width:90%;"></el-input>
                                  <div class="flex-vc" v-if="obj.priceType !=1">
	                                  <el-input type="text" @change.native="checkPrice(it,index,idx)" v-model="it.price" style="width:100px;"></el-input>
	                                  占比
	                                  <el-input type="text" @change.native="checkPriceRate(it,index,idx)" v-model="it.priceRate" style="width:80px;"></el-input>%
	                               	</div>
                                </td>
                                <td v-if="obj.activityType !=0 && obj.activityType !=2"> <!-- 库存数量 专题、新人不限库存 -->
                                  <el-input @change.native="checkStockNumber(it,index,idx)" type="text" v-model="it.stockNumber" style="width:98%;"></el-input>
                                </td> 
                                <td v-if="obj.activityType ==1 || obj.activityType ==2 || obj.activityType ==4"> <!-- 限购数量 专题、包邮 -->
                                  <el-input @change.native="checkLimitBuyNumber(it,index,idx)" type="text" v-model="it.limitBuyNumber" style="width:98%;"></el-input>
                                </td>
                                <td style="width: 15%;">
                                  <el-button @click.native.prevent="changeGoodsIndex(it,1,index,idx)" type="text" size="small" :disabled="idx===0">上移</el-button>
                                  <el-button @click.native.prevent="changeGoodsIndex(it,2,index,idx)" type="text" size="small" :disabled="idx==item.goodsItem.length-1">下移</el-button>
                                  <el-button @click.native.prevent="changeGoodsIndex(it,3,index,idx)" type="text" size="small" :disabled="idx===0" >置顶</el-button>
                                  <el-button @click.native.prevent="changeGoodsIndex(it,4,index,idx)" type="text" size="small" :disabled="idx==item.goodsItem.length-1">置底</el-button>
                                </td>
                                <td style="width: 5%;"> <!-- 操作 -->
                                  <el-button @click.native.prevent="removeGoods(it,index,idx)" type="danger" size="mini">移除</el-button>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
            </div>
          </div>
        </card-panel>
        
      </div>
    </card-panel>
  </div>
  <div class="_row-right">
     <!-- <el-tabs type="border-card" @tab-click="changeTab" style="margin-top:30px;width:100%;">
       <el-tab-pane label="商品列表">
         <spuGoodsForGoods @chooseGoods="chooseGoods" :obj="paramObj"></spuGoodsForGoods>
       </el-tab-pane>
     </el-tabs> -->
     <card-panel style="margin-top: 20px;">
       <span slot="title">商品列表<span style="color:#ff4949;">{{obj.activityType !=0? '(同一个商品在同一个时间段内只能参加一个活动)':''}}</span></span>
       <div slot="panel-body">
         <spuGoodsForGoods @chooseGoods="chooseGoods" @unChooseGoods="unChooseGoods" :obj="paramObj" ref="spuGoodsForGoods"></spuGoodsForGoods>
       </div>
     </card-panel>
  </div>
</div>
</template>
<style>
</style>
<script>
	import spuGoodsForGoods from "../recharge_set/spuGoodsForGoods"
  import { 
  	 addMallActivityGoods,
  	 getMallActivityGoodsSignList,
  	 getMallActivityGoodsList,
  	 modifyMallActivityGoods,
  	 deleteMallActivityGoods,
  	 sortMallActivityGoods,
  	 sortMallActivityGoodsSign,
  	 modifyMallActivityGoodsBySign,
  	 deleteMallActivityGoodsBySign,
  } from 'src/vuex/actions/activityAction'
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
    components:{spuGoodsForGoods},
    data(){
      var _this = this;
      var titleName = this.obj.isActivity==1?'活动':'专题';
     
      return {
      	loading:false,//遮罩层
      	titleName:titleName,
		    focusIndex:0,//选中哪个标签
      	rechargeGoodsObj:{
      		goodsList:[
      			{	isOpen:true,
      				sign:'',//标签分类
      				goodsItem:[],//产品列表
      			}
      		]
      	},
      	paramObj:{
      		urlType:'activity',
      		beginDtm:this.obj.beginDtm==''? '':this.obj.formatDate(this.obj.beginDtm)+' 00:00:00',
      		endDtm:this.obj.endDtm==''? '':this.obj.formatDate(this.obj.endDtm)+' 23:59:59',
      		activityId:this.obj.activityId,
      		shopId:this.obj.shopId
      	},//传参给获取商品列表
      	goodsTypeMap:{0: '单品', 1:'规格品', 2:'组合品'},
      	//*************************
      }
    },
    created(){
    	if(this.obj.activitySigns.length<=0){
    		this.obj.activitySigns = [{isOpen:true,name:'默认标签',goodsItem:[]}];
    	}
    },
    methods:{
      changeTab(tab){
      	//console.log(tab)
      },
      checkStockNumber(item,index,idx){//
      	if(!/^(-1|([1-9][0-9]*))$/.test(item.stockNumber)){
      		item.stockNumber = -1;
      	}else if(item.stockNumber>item.stockNumberDef){
      		item.stockNumber = item.stockNumberDef;
      	}
      },
      checkPrice(item,index,idx){//
      	if(this.obj.priceType==1){//折扣1-99
	      	if(!/^[1-9][0-9]*$/.test(item.price) || item.price>99){
	      		item.price = 99;
	      	}
	      }else{
	      	if(!/^(0|[1-9][0-9]*)((\.[0-9]{1,2})?)$/.test(item.price) || parseFloat(item.price,10)>parseFloat(item.goodsPrice,10)){
	      		item.price = item.goodsPrice;
	      	}
	      }
      	item.priceRate = (item.price*100 /item.goodsPrice).toFixed(2);
      },
      checkPriceRate(item,index,idx){//
      	if(!/^(0|[1-9][0-9]*)((\.[0-9]{1,2})?)$/.test(item.priceRate) || parseFloat(item.priceRate,10)>100){
      		item.priceRate = 100;
      	}
      	item.price = (item.goodsPrice * (item.priceRate/100)).toFixed(2);
      },
      chooseGoods(row){
      	var di,dj;
      	var isHas = false;
      	//先检查总量不能大于100个
      	var maxLength = 0;
      	for(var i=0,li=this.obj.activitySigns.length; i<li; i++){
      		maxLength += this.obj.activitySigns[i].goodsItem.length;
      	}
      	if(maxLength>=100){
      		this.$message.error('活动运行最大商品数量是100个');
      		return ;
      	}
      	if(typeof row.goodsSkuId == 'undefined'){//处理没有goodsSkuId字段
      		row.goodsSkuId = 0;
      	}
      	for(var i=0,li=this.obj.activitySigns.length; i<li; i++){
      		di = this.obj.activitySigns[i];
      		for(var j=0,lj=di.goodsItem.length; j<lj; j++){
      			dj = di.goodsItem[j];
      			if(dj.goodsId==row.goodsId && 
      			  ( dj.goodsSkuId ==0 || (dj.goodsSkuId !=0 && dj.goodsSkuId==row.goodsSkuId))
      			){
      				isHas = true;
      				break;
      			}
      		}
      		if(isHas){ break;}
      	}
      	if(isHas){
      		this.$message.error('该商品已经在活动中');
      		return;
      	}
      	if(this.obj.activitySigns.length<=0){
    			this.obj.activitySigns = [{isOpen:true,name:'默认',goodsItem:[]}];
    		}
    		if(this.focusIndex>=this.obj.activitySigns.length){
    			this.focusIndex = 0;
    		}
    		this.obj.activitySigns[this.focusIndex].isOpen = true;
    		this.obj.activitySigns[this.focusIndex].goodsItem.unshift({//添加在最前
    			goodsSn:row.goodsSn,
					goodsId:row.goodsId,
					goodsSkuId:parseInt(row.goodsSkuId||'0'),
					goodsName:row.goodsName,
					goodsName_str:this.goodsTypeMap[row.goodsType]+'-'+row.goodsName,
  				goodsPrice:row.price,
  				mPrice:row.mPrice,
  				statusCode:0,
  				price:this.obj.priceType==1? 99:row.price,
  				priceRate:100,
  				stockNumber:row.stockNumber && row.stockNumber>0? row.stockNumber:-1,
  				stockNumberDef:row.stockNumber && row.stockNumber>0? row.stockNumber:-1,
  				limitBuyNumber:0,
    		});
    		//通知商品列表
      	this.notifySpuGoodsForGoods();
      },
      //反选
      unChooseGoods(){
      	var goodsItem;
      	var di;
      	for(var i=0,li=this.obj.activitySigns.length; i<li; i++){
      		di = this.obj.activitySigns[i].goodsItem;
      		goodsItem = [];
      		for(var j=0,lj=di.length; j<lj; j++){
      			if(di[j].activityGoodsId > 0){//已经关联的不能移除
      				goodsItem.push(di[j]);
      			}
      		}
      		this.obj.activitySigns[i].goodsItem = goodsItem;
      	}
      	//通知商品列表
      	this.notifySpuGoodsForGoods();
      },
      //通知商品列表
      notifySpuGoodsForGoods(outerNotity){
      	if(this.$refs.spuGoodsForGoods){
      		var parentGoodList = [];
      		var di;
      		
      		for(var i=0,li=this.obj.activitySigns.length; i<li; i++){
      			di = this.obj.activitySigns[i].goodsItem;
      			for(var j=0,lj=di.length; j<lj; j++){
      				if(di[j].activityGoodsId >0){//修改时，原来关联的数据不算
      					continue;
      				}
      				parentGoodList.push({
      					goodsId:di[j].goodsId,
      					goodsSkuId:di[j].goodsSkuId || 0,
      				});
      			}
	      	}
	      	//把满送的商品列表也添加
	      	/* 不用排除活动商品了for(var i=0,li=this.obj.exchangeList.length; i<li; i++){
	      		di = this.obj.exchangeList[i];
	      		parentGoodList.push({
    					goodsId:di.goodsId,
    					goodsSkuId:di.goodsSkuId || 0,
    				});
	      	}*/
	      	//*************************
    		  this.$refs.spuGoodsForGoods.parentGoodList = parentGoodList;
    		  this.$refs.spuGoodsForGoods.signListIsChoose();
    		  
    		  //通知  不用排除活动商品了
    		  /*if( !outerNotity){//不是其他组件通知，就通知其他组件
	    		  this.$emit('activityGoodsListNotify');
	    		}*/
        };
      },
    	//删除分类
    	deleteSign(item,index){
    		this.$emit('deleteActivitySign',item.name);
    		//通知商品列表
      	this.notifySpuGoodsForGoods();
        //*******************************
    	},
      removeGoods(row,index,idx){//移除活动的商品
      	if(row.activityGoodsId){
      		this.$confirm('该商品是'+this.titleName+'已经保存过的商品(非新增的)，确定删除么？', '提示', {
	          type: 'warning'
	        }).then(() => {//确定
        	  deleteMallActivityGoods({activityGoodsId:row.activityGoodsId}).then((data) => {
            const {success,msg,result}=data;
            this.$message({
	            type: success? 'success':'error',
	            message: msg
		        });
		        if(success){
      				this.obj.activitySigns[index].goodsItem.splice(idx, 1);
      				//通知商品列表
      				this.notifySpuGoodsForGoods();
		        }
	        });
		        
	          
	        }).catch(() => {//取消
	                    
	        });
      	}else{
      		this.obj.activitySigns[index].goodsItem.splice(idx, 1);
      	}
        //通知商品列表
      	this.notifySpuGoodsForGoods();
      },
    	modifySign(item,index){
    		this.$prompt('请输入标签名称', '提示', {
          confirmButtonText: '修改',
          cancelButtonText: '取消',
          inputPattern: /^[^\,\s]{1,6}$/,
          inputErrorMessage: '标签不能为空和英文逗号,最多6个字符'
        }).then(({ value }) => {
        	value = $.trim(value);
        	if(value==''){
        		return;
        	}
        	var isHas = false;
        	for(var i=0,li=this.obj.activitySigns.length; i<li; i++){
        		if(this.obj.activitySigns[i].name == value){
        			isHas = true;
        			break;
        		}
        	}
        	
        	if( !isHas){
        		this.$emit('modifyActivitySign',item.name,value);
        		
        	}
        }).catch(() => {});   
    	},
    	changeGoodsIndex(item,sortType,index,idx){//sortType:1上移2下移3置顶4置底
        let _activity = this.obj.activitySigns[index]
    		var d = [];
      	switch(sortType){
      		case 1:
      			for(var i=0,li=this.obj.activitySigns[index].goodsItem.length; i<li; i++){
      				if(i==idx-1){
      					d.push(this.obj.activitySigns[index].goodsItem[i+1]);
      					d.push(this.obj.activitySigns[index].goodsItem[i]);
      					i++;
      				}else{
      					d.push(this.obj.activitySigns[index].goodsItem[i]);
      				}
      			}
      			break;
      		case 2:
      			for(var i=0,li=this.obj.activitySigns[index].goodsItem.length; i<li; i++){
      				if(i==idx){
      					d.push(this.obj.activitySigns[index].goodsItem[i+1]);
      					d.push(this.obj.activitySigns[index].goodsItem[i]);
      					i++;
      				}else{
      					d.push(this.obj.activitySigns[index].goodsItem[i]);
      				}
      			}
      			break;
      		case 3:
      		  d.push(this.obj.activitySigns[index].goodsItem[idx]);
      			for(var i=0,li=this.obj.activitySigns[index].goodsItem.length; i<li; i++){
      				if(i==idx){ continue;}
      				d.push(this.obj.activitySigns[index].goodsItem[i]);
      			}
      			break;
      		case 4:
      			for(var i=0,li=this.obj.activitySigns[index].goodsItem.length; i<li; i++){
      				if(i==idx){ continue;}
      				d.push(this.obj.activitySigns[index].goodsItem[i]);
      			}
      		  d.push(this.obj.activitySigns[index].goodsItem[idx]);
      			break;
      	}
        // this.obj.activitySigns[index] = d;
        // this.obj.activitySigns[index] = {goodsItem: d};
				
        this.$set(this.obj.activitySigns, index, {..._activity, ...{ goodsItem: d} })
    	},
    	changeSignIndex(item,sortType,index){//sortType:1上移2下移3置顶4置底
    		var d = [];
    		switch(sortType){
      		case 1:
      			for(var i=0,li=this.obj.activitySigns.length; i<li; i++){
      				if(i==index-1){
      					d.push(this.obj.activitySigns[i+1]);
      					d.push(this.obj.activitySigns[i]);
      					i++;
      				}else{
      					d.push(this.obj.activitySigns[i]);
      				}
      			}
      			break;
      		case 2:
      			for(var i=0,li=this.obj.activitySigns.length; i<li; i++){
      				if(i==index){
      					d.push(this.obj.activitySigns[i+1]);
      					d.push(this.obj.activitySigns[i]);
      					i++;
      				}else{
      					d.push(this.obj.activitySigns[i]);
      				}
      			}
      			break;
      		case 3:
      		  d.push(this.obj.activitySigns[index]);
      			for(var i=0,li=this.obj.activitySigns.length; i<li; i++){
      				if(i==index){ continue;}
      				d.push(this.obj.activitySigns[i]);
      			}
      			break;
      		case 4:
      			for(var i=0,li=this.obj.activitySigns.length; i<li; i++){
      				if(i==index){ continue;}
      				d.push(this.obj.activitySigns[i]);
      			}
      		  d.push(this.obj.activitySigns[index]);
      			break;
      	}
      	this.obj.activitySigns = d;
    	},
    	checkPriceRateAll($event,index){
    		var value = $($event.currentTarget).find("input").val();
    		
    		if(/^(0|[1-9][0-9]*)((\.[0-9]{1,2})?)$/.test(value) && parseFloat(value,10)>0 && parseFloat(value,10)<=100){
    			var di;
        	di = this.obj.activitySigns[index].goodsItem;
  				for(var j=0,lj=di.length; j<lj; j++){
  					di[j].priceRate = value;
  					di[j].price = (di[j].goodsPrice * (di[j].priceRate/100)).toFixed(2);
  				}
    		}else{
    			this.$message.error('百分比范围只能>0和<=100');
    		}
    	},
    	checkLimitBuyNumberAll($event,index){
    		var value = $($event.currentTarget).find("input").val();
    		if(/^(0|([1-9]([0-9]*)))$/.test(value)){
    			var di;
        	di = this.obj.activitySigns[index].goodsItem;
  				for(var j=0,lj=di.length; j<lj; j++){
  					di[j].limitBuyNumber = value;
  				}
    		}else{
    			this.$message.error('限购数量只能>=0整数，或0(无限制)');
    		}
    	},
    	checkStockNumberAll($event,index){
    		var value = $($event.currentTarget).find("input").val();
    		if(/^(-1|([1-9]([0-9]*)))$/.test(value)){
    			var di;
        	di = this.obj.activitySigns[index].goodsItem;
  				for(var j=0,lj=di.length; j<lj; j++){
  					di[j].stockNumber = value;
  				}
    		}else{
    			this.$message.error('库存数量只能>0整数，或-1(无限制)');
    		}
    	},
    	checkLimitBuyNumber(item,index,idx){
    		if(!/^(0|([1-9]([0-9]*)))$/.test(item.limitBuyNumber)){
      		item.limitBuyNumber = 0;
      	}
    		
    	},
    	//打开关闭分类
    	changeSignStatus(item,index){
    		item.isOpen = !item.isOpen;
    		console.log(item.isOpen);
    	},
    	chooseNameFocus(item,index){
    		this.focusIndex = index;
    		item.isOpen = true;
    	},
    	reloadSpuGoodsForGoods(){
      	if(this.$refs.spuGoodsForGoods){
      		  this.$refs.spuGoodsForGoods.paramObj = this.paramObj;
            this.$refs.spuGoodsForGoods.loadGoodsData();
        };
      },
      //**********************  
    },
    mounted(){
      
    }
  }
</script>
