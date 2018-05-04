<template>
  <card-panel style="margin-top: -15px;">
    <span slot="title">请选择商品的规格品</span>
    <div slot="panel-btns">
      <el-button @click.native="chooseAllSkuGoods" type="info" v-show="goodsSkuDataList.length">全选</el-button>
      <el-button @click.native="unChooseAllSkuGoods" type="danger" v-show="goodsSkuDataList.length">反选</el-button>
    	<el-button @click.native="chooseGoodsSkuOk" type="success" size="small" v-show="goodsSkuDataList.length">确定选择</el-button>
    	</div>
    <div slot="panel-body">
      <div class="_table-list">
        <el-table :data="goodsSkuDataList" stripe style="width: 100%" border>
          <el-table-column align="center" property="goodsSkuId" label="编号" width="110"></el-table-column>
          <el-table-column align="center" property="goodsSn" label="编码" width="130"></el-table-column>
          <el-table-column align="center" property="goodsSkuFullName" label="规格品名称" min-width="140"></el-table-column>
          <el-table-column align="center" property="mPrice" label="市场价" width="110"></el-table-column>
          <el-table-column align="center" property="price" label="销售价" width="110"></el-table-column>
          <el-table-column align="center" property="stockNumber_str" label="库存量" width="110"></el-table-column>
          <el-table-column align="center" inline-template label="操作" width="80">
            <el-col :span="24">
              <el-button v-if="!row.isChoose" size="small" type="success" @click.native.prevent="chooseGoodsSku(row,$index)" :disabled="row.disabled">选择</el-button>
              <el-button v-if="row.isChoose" size="small" type="danger" @click.native.prevent="cancelGoodsSku(row,$index)" :disabled="row.disabled">取消</el-button>
            </el-col>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </card-panel>
</template>
<script>
	import { 
  	 getMallGoodsSkuListOfGoodsForRecharge,
  	 getMallGoodsSkuListOfGoodsForActivity,
  } from 'src/vuex/actions/rechargeGoodsAction'
  import {dateFormat} from 'lib/utils/dateFormat.js'
  export default {
	  name: 'coupons_for_goods',
	  props: {
      obj: {
        type: Object,
        default: {}
      }
    },
	  computed: {
	    
	  },
	  data() {
	    return {
      	//SKU商品
      	goodsSkuDataList:[],
      	paramObj:this.obj,
      	parentGoodList:[],
	    }
	  },
	  methods: {
	  	onSuccess(){
	  	},
	    //***SKU商品查询*****
      loadGoodsSkuData(){
        var param ={
        	goodsId: this.paramObj.goodsId,
        };
        this.loading = true;
        param.activityId = this.paramObj.activityId;
        if(this.paramObj.urlType=='activity'){
        	param.beginDtm = this.paramObj.beginDtm;
        	param.endDtm = this.paramObj.endDtm;
        	param.shopId = this.paramObj.shopId;
        	param.isExchange = this.paramObj.isExchange;
	        getMallGoodsSkuListOfGoodsForActivity(param).then((data) => {
	        	this.loading = false;
	            const {success,result}=data;
	            //console.log(JSON.stringify(result))
	            if(success){
	                this.goodsSkuDataList = result;
	                this.changeGoodsSkuDataList();
	            }
	        });
        }else{
	        getMallGoodsSkuListOfGoodsForRecharge(param).then((data) => {
	        	this.loading = false;
	            const {success,result}=data;
	            //console.log(JSON.stringify(result))
	            if(success){
	                this.goodsSkuDataList = result ;
	                this.changeGoodsSkuDataList();
	            }
	        });
	      }
      },
      
      chooseGoodsSku(row,index){//选择
      	if( !row.disabled){//没有被禁用
	      	row.isChoose = true;
	      	row.goodsSkuId=parseInt((row.goodsSkuId+"").replace("-",""),10);
      	}
      },
      cancelGoodsSku(row){//反选
      	if( !row.disabled){//没有被禁用
	      	row.isChoose = false;
	      	row.goodsSkuId=(row.goodsSkuId+"").replace("-","")+"-";
	      }
      },
      chooseAllSkuGoods(){
      	this.goodsSkuDataList.forEach(function(item){
      		
      		if( !item.disabled){//没有被禁用
	      		item.isChoose = true;
	      		item.goodsSkuId=parseInt((item.goodsSkuId+"").replace("-",""),10);
	      	}
      	});
      },
      unChooseAllSkuGoods(){
      	this.goodsSkuDataList.forEach(function(item){
      		
	      	if( !item.disabled){//没有被禁用
	      		item.isChoose = false;
	      		item.goodsSkuId= (item.goodsSkuId+"").replace("-","")+"-";
	      	}
      	});
      },
      chooseGoodsSkuOk(){//确定选择
      	var items = [];
      	this.goodsSkuDataList.forEach(function(item){
      		if(item.isChoose && !item.disabled){
      			items.push(item);
      		}
	      });
      	this.$emit('onSuccess',items);
      },
      //标记列表已经选择了
      
      changeGoodsSkuDataList(){
      	var disabled;
      	this.goodsSkuDataList.forEach((item,index)=>{
          disabled = false;
      		for(var i=0,li=this.parentGoodList.length; i<li; i++){
      				if((item.goodsSkuId+"").replace("-","")==this.parentGoodList[i].goodsSkuId){
      					disabled = true;
      					break;
      				}
      		}
      		item.disabled = disabled;
      		
      		item.isChoose = false;
      		item.goodsSkuId=(item.goodsSkuId+"").replace("-","")+"-";
      		item.goodsSkuFullName=this.paramObj.goodsName+'-'+item.goodsSkuName;
          item.stockNumber_str = item.stockNumber && item.stockNumber>0? item.stockNumber : '无限';
	      });
      },
      
      //***********************SKU商品查询end********************
    
	  },
	  created() {
	  	this.parentGoodList = this.obj.parentGoodList;
	  	if(!this.obj.activityId){
	  		this.goodsSkuDataList = this.obj.goodsSkuDataList;
        this.changeGoodsSkuDataList();
	  	}else{
	  		this.loadGoodsSkuData();
	  	}
	    
	  }
	}
</script>
