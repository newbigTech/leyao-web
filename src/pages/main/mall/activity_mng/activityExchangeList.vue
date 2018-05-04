<template>
<div class="_row-left-right">
  <div class="_row-left">
    <card-panel>
      <div slot="title"> 换购商品列表 <el-tag type="primary" style="background-color: transparent">请在下方商品列表中添加商品</el-tag></div>
      <div slot="panel-body">
        <!-- 活动添加 -->
        <card-panel>
          <div slot="panel-table">
            <div class="_table-list">
              <table class="table table-bordered center table-hover" v-show="obj.exchangeList.length">
                <tbody>
                  <tr class="active"> 
                    <th>商品编码</th> 
                    <th>名称</th>  
                    <th>状态</th> 
                    <th>销售价</th>
                    <th style="width:200px;"> 换购价 </th>
                    <th>商品排序</th>
                    <th>操作</th>
                  </tr>
                  <tr v-for="(it,index) in obj.exchangeList" class="active">
                    <td>{{it.goodsSn}}</td> <!-- 商品编码 -->
                    <td>{{it.goodsName_str}}</td> <!-- 名称 -->
                    <td>
	                    <div><!-- 商品表statusCode=1是上架 -->
						            <div v-if="it.statusCode != 1"  style="color:red;text-decoration:line-through;" title="该商品已被下架">已下架</div>
						            <div v-if="it.statusCode == 1">上架中</div>
						          </div>
	                  </td> <!-- 名称 -->
                    <td>{{it.goodsPrice}}</td> <!-- 销售价 -->
                    <td> <!--换购价-->
                      <el-input type="text" @change.native="checkPrice(it,index)" v-model="it.price" style="width:90%;"></el-input>
                    </td>
                    <td style="width: 15%;">
                      <el-button @click.native.prevent="changeExchangeIndex(it,1,index)" type="text" size="small" :disabled="index===0">上移</el-button>
                      <el-button @click.native.prevent="changeExchangeIndex(it,2,index)" type="text" size="small" :disabled="index==obj.exchangeList.length-1">下移</el-button>
                      <el-button @click.native.prevent="changeExchangeIndex(it,3,index)" type="text" size="small" :disabled="index===0" >置顶</el-button>
                      <el-button @click.native.prevent="changeExchangeIndex(it,4,index)" type="text" size="small" :disabled="index==obj.exchangeList.length-1">置底</el-button>
                    </td>
                    <td style="width: 5%;"> <!-- 操作 -->
                      <el-button @click.native.prevent="removeGoods(it,index)" type="danger" size="mini">移除</el-button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </card-panel>
        
      </div>
    </card-panel>
  </div>
  <div class="_row-right">
     <card-panel style="margin-top: 20px;">
       <span slot="title">商品列表</span>
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
      
      return {
      	loading:false,//遮罩层
      	exchangeList:[],
      	paramObj:{
      		urlType:'activity',
      		beginDtm:this.obj.beginDtm==''? '':this.obj.formatDate(this.obj.beginDtm)+' 00:00:00',
      		endDtm:this.obj.endDtm==''? '':this.obj.formatDate(this.obj.endDtm)+' 23:59:59',
      		isExchange:1,
      		shopId:this.obj.shopId,
      		activityId:this.obj.activityId,
      	},//传参给获取商品列表
      	goodsTypeMap:{0: '单品', 1:'规格', 2:'组合'},
      	//*************************
      }
    },
    created(){
    },
    methods:{
      changeTab(tab){
      	//console.log(tab)
      },
      checkPrice(item,index){//
      	if(!/^(0|[1-9][0-9]*)((\.[0-9]{1,2})?)$/.test(item.price) || parseFloat(item.price,10)>parseFloat(item.goodsPrice,10)){
      		item.price = item.goodsPrice;
      	}
      },
      chooseGoods(row){
      	var di;
      	var isHas = false;
      	//先检查总量不能大于100个
      	if(this.obj.exchangeList.length>=100){
      		this.$message.error('活动中最大换购商品数量是100个');
      		return ;
      	}
      	if(typeof row.goodsSkuId == 'undefined'){//处理没有goodsSkuId字段
      		row.goodsSkuId = 0;
      	}
      	for(var i=0,li=this.obj.exchangeList.length; i<li; i++){
      		di = this.obj.exchangeList[i];
      		if(di.goodsId==row.goodsId && 
      		  ( di.goodsSkuId ==0 || (di.goodsSkuId !=0 && di.goodsSkuId==row.goodsSkuId))
      		){
    				isHas = true;
    				break;
    			}
      		if(isHas){ break;}
      	}
      	if(isHas){
      		this.$message.error('该商品已经在活动换购商品中');
      		return;
      	}
    		this.obj.exchangeList.unshift({//添加在最前
    			goodsSn:row.goodsSn,
					goodsId:row.goodsId,
					goodsSkuId:parseInt(row.goodsSkuId||'0'),
					goodsName:row.goodsName,
					goodsName_str:this.goodsTypeMap[row.goodsType]+'-'+row.goodsName,
  				goodsPrice:row.price,
  				statusCode:1,
  				price:row.price,
    		});
    		//通知商品列表
      	this.notifySpuGoodsForGoods();
      },
      //反选
      unChooseGoods(){
      	this.obj.exchangeList = [];
      	//通知商品列表
      	this.notifySpuGoodsForGoods();
      },
      //通知商品列表
      notifySpuGoodsForGoods(outerNotity){
      	if(this.$refs.spuGoodsForGoods){
      		var parentGoodList = [];
      		var di;
      		/* 不用排除满送的商品了
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
	      	}*/
	      	//把满送的商品列表也添加
	      	for(var i=0,li=this.obj.exchangeList.length; i<li; i++){
	      		di = this.obj.exchangeList[i];
	      		parentGoodList.push({
    					goodsId:di.goodsId,
    					goodsSkuId:di.goodsSkuId || 0,
    				});
	      	}
	      	//*************************
    		  this.$refs.spuGoodsForGoods.parentGoodList = parentGoodList;
    		  this.$refs.spuGoodsForGoods.signListIsChoose();
    		  
    		  //通知 不用排除满送的商品了
    		  /*if( !outerNotity){//不是其他组件通知，就通知其他组件
	    		  this.$emit('activityExchangeListNotify');
	    		}*/
        };
      },
      removeGoods(row,index){//移除活动的商品
      	this.obj.exchangeList.splice(index, 1);
      	//通知商品列表
      	this.notifySpuGoodsForGoods();
      },
    	changeExchangeIndex(item,sortType,index){//sortType:1上移2下移3置顶4置底
    		var d = [];
    		switch(sortType){
      		case 1:
      			for(var i=0,li=this.obj.exchangeList.length; i<li; i++){
      				if(i==index-1){
      					d.push(this.obj.exchangeList[i+1]);
      					d.push(this.obj.exchangeList[i]);
      					i++;
      				}else{
      					d.push(this.obj.exchangeList[i]);
      				}
      			}
      			break;
      		case 2:
      			for(var i=0,li=this.obj.exchangeList.length; i<li; i++){
      				if(i==index){
      					d.push(this.obj.exchangeList[i+1]);
      					d.push(this.obj.exchangeList[i]);
      					i++;
      				}else{
      					d.push(this.obj.exchangeList[i]);
      				}
      			}
      			break;
      		case 3:
      		  d.push(this.obj.exchangeList[index]);
      			for(var i=0,li=this.obj.exchangeList.length; i<li; i++){
      				if(i==index){ continue;}
      				d.push(this.obj.exchangeList[i]);
      			}
      			break;
      		case 4:
      			for(var i=0,li=this.obj.exchangeList.length; i<li; i++){
      				if(i==index){ continue;}
      				d.push(this.obj.exchangeList[i]);
      			}
      		  d.push(this.obj.exchangeList[index]);
      			break;
      	}
      	this.obj.exchangeList = d;
    	},
    	reloadSpuGoodsForGoods(){
      	if(this.$refs.spuGoodsForGoods){
      		  this.$refs.spuGoodsForGoods.paramObj = this.paramObj;
      		  //通知商品列表
      			this.notifySpuGoodsForGoods();
            this.$refs.spuGoodsForGoods.loadGoodsData();
        };
      },
      //**********************  
    },
    mounted(){
      
    }
  }
</script>
