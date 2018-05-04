<template>
<div class="_row-left-right">
  <div class="_row-left">
    <card-panel>
      <div slot="title"> 赠送商品 <el-tag type="primary" style="background-color: transparent">请在下方赠品列表中添加赠品</el-tag></div>
      <div slot="panel-body">
        <!-- 活动添加 -->
        <card-panel>
          <div slot="panel-table">
            <div class="_table-list" style="text-align:center;">
            	<el-tag type="danger" style="background-color: transparent" v-show="giveGoods.length == 0">请在下面的赠品列表中添加赠品</el-tag>
	            <el-table :data="giveGoods" stripe style="width: 100%" border v-show="giveGoods.length != 0">
	            	<el-table-column align="center" label="" width="120">
			          	<template scope="scope">
			                <img :src="cloudShowUrl + scope.row.goodsPic" width="80px" height="80px" class="img-rounded">
						      </template>
			          </el-table-column>
	              <el-table-column align="center" property="goodsSn" label="赠品编码"></el-table-column>
	              <el-table-column align="center" property="goodsName" label="名称" min-width="130"></el-table-column>
				        <el-table-column align="center" inline-template label="赠品状态">
				          <div>
				            <div v-if="row.deleteFlag == 1"  style="color:red;text-decoration:line-through;" title="该赠品已被删除">已删除</div>
				            <div v-if="row.deleteFlag != 1 && row.statusCode != 1"  style="color:red;text-decoration:line-through;" title="该赠品已被下架">已下架</div>
				            <div v-if="row.deleteFlag != 1 && row.statusCode == 1">上架中</div>
				          </div>
				        </el-table-column>
	              <el-table-column align="center" property="marketPrice" label="市场价"></el-table-column>
								<el-table-column v-if="obj.giveUrlType=='recharge'" align="center" label="赠送数量" width="160">
									<template scope="scope">
										<!--<el-input type="text" @change.native.prevent="checkGiftNumber(scope.row)" v-model="scope.row.number" style="width:98%;"></el-input>-->
									<el-input-number v-model="scope.row.number" size="small" @change="handleNumberChange(scope.row)" :min="1" :max="999999"></el-input-number>
					       </template>
								</el-table-column>
								<el-table-column v-if="obj.giveUrlType=='recharge'" align="center" label="赠送说明" width="340">
									<template scope="scope">
										<el-input type="textarea" v-model="scope.row.giftNote" :maxlength=250 style="width:98%;"></el-input>
									</template>
								</el-table-column>
								<el-table-column align="center" label="操作" width="160">
									<template scope="scope">
										<el-button @click.native.prevent="removeGoods(scope.row)" type="danger" size="mini">移除</el-button>
									</template>
								</el-table-column>
	
	            </el-table>
            </div>
          </div>
        </card-panel>
        
      </div>
    </card-panel>
  </div>
  <div class="">
     <card-panel style="margin-top: 20px;" class="_left">
       <h3 slot="title"> 赠品列表 </h3>
       <div slot="panel-btns" v-if="obj.giveUrlType=='recharge'" class="flex-vc">
	        <el-select v-model="paramObj.shopId" placeholder="请选择店铺" @change="changeChange" class="_small">
	          <el-option
	            v-for="item in shopList"
	            :label="item.label"
	            :value="item.value">
	          </el-option>
	        </el-select>
       </div>
       <div slot="panel-body">
         <giftForGoods @chooseGoods="chooseGoods" :obj="paramObj" ref="giftForGoods"></giftForGoods>
       </div>
     </card-panel>
  </div>
</div>
</template>
<style>
</style>
<script>
	import { mapGetters } from 'vuex'
	import giftForGoods from "../recharge_set/giftForGoods"
    import { getSupplierShop} from 'src/vuex/actions/rechargeGoodsAction'
  import { getMallGiftDetail} from 'src/vuex/actions/giftAction'
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
    components:{giftForGoods},
    data(){
      var _this = this;
      //console.log(this.obj)
      return {
      	loading:false,//遮罩层
      	giveGoods:[],
      	shopList:[],
      	paramObj:{
      		beginDtm:'',
      		endDtm:'',
      		shopId:0,
      	},//传参给获取商品列表
      	//*************************
      }
    },
    computed:{
    	...mapGetters(['shopID','cloudShowUrl'])
    },
    created(){
    	this.giveGoods = this.obj.giveGoods;
    	if(this.obj.giveUrlType=='recharge'){
    		this.loadShopListData();
    	}else{
    		this.paramObj.shopId = parseInt(this.shopID,10);
    	}
    },
    methods:{
      changeTab(tab){
      	//console.log(tab)
      },
      checkGiftNumber(row){
      	if(!/^(1|([1-9]([0-9]*)))$/.test(row.number)){
      		this.$nextTick(() => {
      			row.number = 1;
      	console.log(row.number)
      		});
      	}else if(row.stockNumber>0 && row.number > row.stockNumber){
      		this.$nextTick(() => {
      			row.number = row.stockNumber;
      		});
      	}
      },
      handleNumberChange(row){
      	this.$nextTick(() => {
	      	row.number = parseInt(row.number,10);
	      });
      	
      },
      chooseGoods(row){
      	
      	if(this.giveGoods.length>0 && this.giveGoods[0].goodsId==row.goodsId){
      		this.$message.error('该商品已经在活动赠送商品中');
      		return;
      	}
    		this.giveGoods =[{//添加在最前
    			goodsSn:row.goodsSn,
					goodsId:row.goodsId,
					shopId:row.shopId,
					goodsName:row.goodsName,
  				marketPrice:row.marketPrice,
  				number:1,
  				giftNote:'',
  				statusCode:1,
					goodsPic:row.goodsPic,
  				stockNumber:row.stockNumber
    		}];
      },
      removeGoods(){//移除活动的商品
      	this.giveGoods = [];
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
              	this.paramObj.shopId = this.shopList[0].value;
              	this.reloadGiftForGoods();
              } 
              
          }
        });
      },
      changeChange(){
      	this.reloadGiftForGoods();
      },
    	reloadGiftForGoods(){
      	if(this.$refs.giftForGoods){
      		this.$refs.giftForGoods.paramObj = this.paramObj;
          this.$refs.giftForGoods.loadGoodsData();
        };
      },
      loadGiveGoods(){
        this.loading = true;
        getMallGiftDetail({
          goodsId:this.giveGoods[0].goodsId,
        }).then((data) => {
          this.loading = false;
          const {success,msg,result}=data;
          if(success && result){
          	var di = _.clone(this.obj.giveGoods[0]);
          	di.statusCode = result.statusCode;
          	di.goodsSn = result.goodsSn;
          	di.goodsName = result.goodsName;
          	di.marketPrice = result.marketPrice;
					  di.goodsPic = result.goodsPic;
            this.$set(this,'giveGoods',[_.clone(di)]);
          }
        });
      },
      //**********************  
    },
    mounted(){
      
    }
  }
</script>
