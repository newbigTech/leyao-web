<template>
  <div>
    <!-- 查询条件 -->
    <div class="_setting-bar">
      <div class="_query-form">
        <div class="_query-form-item">
          <el-form :inline="true">
            <el-form-item>
              <el-input placeholder="商品名称查询" v-model="goodsNameSearch"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="商品编码查询" v-model="goodsSnSearch"></el-input>
            </el-form-item>
            <el-form-item>
                <el-select v-model="goodsTypeSearch" placeholder="商品类型" clearable>
                    <el-option label="单品" value="0"></el-option>
                    <el-option label="规格商品" value="1"></el-option>
                    <el-option label="组合商品" value="2"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-select v-model="stockTypeSearch" placeholder="库存类型" clearable>
                    <el-option label="无限制" value="0"></el-option>
                    <el-option label="单品独立库存" value="1"></el-option>
                    <el-option label="规格品共享库存" value="2"></el-option>
                    <el-option label="规格品独立库存" value="3"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-input v-model="classifyNameSearch" readonly placeholder="商品分类" :maxlength="20" icon="search" :on-icon-click="handleIconClick"></el-input>
            </el-form-item>
            <el-form-item style="width: auto">
              <el-button @click.native="searchGoodsDataList">查询</el-button>
              <el-button @click.native="chooseAllGoods" type="info">全选</el-button>
              <el-button @click.native="unChooseAllGoods" type="danger">反选</el-button>
             <!-- <el-button @click.native="resetGoodsSearchValue">清空</el-button>-->
            </el-form-item>
          </el-form>
        </div>
      </div>
      <!-- <div class="_actions-btn">
        <el-button type="primary">新增</el-button>
      </div> -->
    </div>

    <div class="_table-container">
      <div class="_table-list">
        <el-table :data="goodsDataList" stripe style="width: 100%" border>
          <el-table-column align="center" property="goodsSn" label="商品编码" width="120"></el-table-column>
          <el-table-column align="center" property="goodsName" label="商品名称" min-width="130"></el-table-column>
          <el-table-column align="center" property="goodsType_str" label="商品类型" width="120"></el-table-column>
          <el-table-column align="center" property="stockType_str" label="库存类型" width="150"></el-table-column>
          <el-table-column align="center" property="stockNumber_str" label="库存量" width="150"></el-table-column>
          <el-table-column align="center" property="mPrice" label="市场价" width="110"></el-table-column>
          <el-table-column align="center" property="price" label="销售价" width="110"></el-table-column>
          <el-table-column align="center" inline-template label="操作" width="110">
            <el-col :span="24">
              <el-button v-if="row.goodsType!=1" size="small" type="success" @click.native="chooseGoods(row)" :disabled="row.disabled">添加商品</el-button>
              <el-button v-if="row.goodsType==1" size="small" type="info" @click.native="openFileDialog(row)" :disabled="row.disabled">选择规格</el-button>
            </el-col>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="_pagination">
          <el-pagination
            @size-change="handleGoodsSizeChange"
            @current-change="handleGoodsCurrentChange"
            :current-page="goodsPageNo"
            :page-sizes="[10, 20, 30, 50]"
            :page-size="goodsPageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="goodsTotal">
          </el-pagination>
        </div>
      </div>
    </div>
     <!--商品图库Dialog-->
    <el-dialog title="商品的规格品" v-model="shopFileDialog" class="shop-img-file-dialog">
      <shop-file @onSuccess="getSkuGoods" :vm="tab5vm" :obj="skuParam" ref="shopFileCom"></shop-file>
    </el-dialog>
    <!--商品品类Dialog-->
    <goods-classify ref="goodsClassifyCom" :shopId="paramObj.shopId" @onSuccess="onSelectedClassify"></goods-classify>
  </div>
</template>
<script>
  import ShopFile from "./skuGoodsForGoods"
  import GoodsClassify from 'pages/main/mall/shop/goods/components/goods_form/goods-classify'
  import { 
     getMallGoodsListForRecharge,
     getMallGoodsListForActivity,
  } from 'src/vuex/actions/rechargeGoodsAction'
  import {dateFormat} from 'lib/utils/dateFormat.js'
  import _ from "lodash"
  export default {
    name: 'coupons_for_goods',
    props: {
      obj: {
        type: Object,
        default: {}
      }
    },
    components: {
      ShopFile,
      GoodsClassify
    },
    computed: {
      
    },
    data() {
      return {
        //SPU商品
        goodsDataList:[],
        goodsPageNo :1,
        goodsPageSize :10,
        goodsTotal: 0,
        goodsTypeSearch:'',
        stockTypeSearch:'',
        goodsSnSearch:'',
        goodsNameSearch:'',
        classifyNameSearch:'',
        classifyIdSearch:'',
        paramObj:this.obj,
        goodsTypeMap:{0: '单品', 1:'规格品', 2:'组合品'},
        stockTypeMap:{0: '无限制', 1:'单品独立库存', 2:'规格品共享库存', 3:'规格品独立库存'},
        shopFileDialog:false,
        tab5vm: new this.$root.constructor(),
        skuParam:{},
        parentGoodList:[],//父组件的商品，用于标记列表中哪些已经选择了
      }
    },
    methods: {
      onSelectedClassify(c){
          this.classifyIdSearch=c.classifyId
          this.classifyNameSearch=c.classifyName
      },
      handleIconClick(){
          this.$refs.goodsClassifyCom.shopId = this.paramObj.shopId ;
          this.$refs.goodsClassifyCom.goodsClassifyDialog=true
      },
      //选择sku商品
      getSkuGoods(skuGoodsList){
        this.shopFileDialog=false;
        skuGoodsList.forEach((item)=>{
          this.chooseGoods({
            goodsId:item.goodsId,
            goodsSkuId:item.goodsSkuId,
            goodsName:item.goodsSkuFullName,
            goodsType:1,//1是规格商品
            price:item.price,
            priceRate:100,
            mPrice:item.mPrice,
            goodsSn:item.goodsSn,
            stockNumber:item.stockNumber,
          });
        });
        
      },
      openFileDialog(row) {//弹出选择
          this.shopFileDialog = true
          this.tab5vm.$emit('on-load')
          
          var parentGoodList = [];
      		var di;
      		for(var i=0,li=this.parentGoodList.length; i<li; i++){
      			if(this.parentGoodList[i].goodsId == row.goodsId){
	      			parentGoodList.push({
      					goodsSkuId:this.parentGoodList[i].goodsSkuId
      				});
      			}
	      	}
          
          if(this.$refs.shopFileCom){
          	this.$refs.shopFileCom.goodsSkuDataList = [];
          	//******************
          	
	    		  this.$refs.shopFileCom.parentGoodList = parentGoodList;
          	if(this.paramObj.urlType=='activity'){//活动需要去查询
          		this.$refs.shopFileCom.paramObj = {
	              goodsId:row.goodsId,
	              goodsName:row.goodsName,
	              beginDtm:this.paramObj.beginDtm,
	              endDtm:this.paramObj.endDtm,
	            	activityId: this.paramObj.activityId,
	              shopId:this.paramObj.shopId,
                isExchange: this.paramObj.isExchange,//换商品用到
	              urlType:'activity',
	            };
	            this.$refs.shopFileCom.loadGoodsSkuData();
          
          	}else{//充值规则 已经带了sku列表了
	          	this.$refs.shopFileCom.goodsSkuDataList = _.clone(row.skuList);
		    		  this.$refs.shopFileCom.changeGoodsSkuDataList();
          
		    		}
	    		  //********
            
          }else{
          	this.skuParam = {
	            goodsId:row.goodsId,
	            goodsName:row.goodsName,
	            beginDtm:this.paramObj.beginDtm,
	            endDtm:this.paramObj.endDtm,
	            activityId: this.paramObj.activityId,
	            shopId:this.paramObj.shopId,
              isExchange: this.paramObj.isExchange,//换商品用到
	            urlType:'activity',
	            parentGoodList:parentGoodList,
	            goodsSkuDataList:_.clone(row.skuList)
	          };
          }
      },
     //***SPU商品查询*****
      loadGoodsData(){
        var param ={
           pageNo: this.goodsPageNo
          ,pageSize: this.goodsPageSize
          ,goodsType: this.goodsTypeSearch
          ,stockType: this.stockTypeSearch
          ,goodsSn: this.goodsSnSearch
          ,goodsName: this.goodsNameSearch
          ,classifyId: this.classifyIdSearch
        };
        param.shopId=this.paramObj.shopId;
        this.loading = true;
        param.activityId = this.paramObj.activityId;
        if(this.paramObj.urlType=='activity'){
          param.beginDtm = this.paramObj.beginDtm;
          param.endDtm = this.paramObj.endDtm;
          param.isExchange = this.paramObj.isExchange;//换商品用到
          getMallGoodsListForActivity(param).then((data) => {
            this.loading = false;
              const {success,result}=data;
              //console.log(JSON.stringify(result))
              if(success){
                  this.goodsDataList = result.rows ;
                  this.goodsDataList.forEach((item)=>{
                    item.goodsType_str = this.goodsTypeMap[item.goodsType];
                    item.stockType_str = this.stockTypeMap[item.stockType];
                    item.stockNumber_str = item.stockNumber && item.stockNumber>0? item.stockNumber : '无限';
                  });
                  if(this.goodsPageNo <=1){//因为只有第一页带总记录数
                    this.goodsTotal = result.total;
                  }
              }
              this.signListIsChoose();
          });
        }else{
        	if(typeof this.paramObj.shopId=='undefined' || this.paramObj.shopId==''){
        		return false;
        	}
          getMallGoodsListForRecharge(param).then((data) => {
            this.loading = false;
              const {success,result}=data;
              //console.log(JSON.stringify(result))
              if(success){
                  this.goodsDataList = result.rows ;
                  this.goodsDataList.forEach((item)=>{
                    item.goodsType_str = this.goodsTypeMap[item.goodsType];
                  });
                  if(this.goodsPageNo <=1){//因为只有第一页带总记录数
                    this.goodsTotal = result.total;
                  }
              }
              this.signListIsChoose();
          });
        }
      },
      searchGoodsDataList(){
         this.goodsPageNo = 1;
         this.loadGoodsData();
      },
      handleGoodsSizeChange(val) {
        this.goodsPageSize = val;
        this.searchGoodsDataList();
      },
      handleGoodsCurrentChange(val) {
         this.goodsPageNo = val;
         this.loadGoodsData();
      },
      resetGoodsSearchValue(){
        this.goodsIdSearch = '';
        this.goodsSnSearch = '';
        this.goodsNameSearch = '';
      },
      chooseGoods(row){
        this.$emit('chooseGoods',row);
      },
      unChooseAllGoods(){//反选
      	this.$emit('unChooseGoods');
      },
      chooseAllGoods(){
      	this.goodsDataList.forEach((item)=>{
      		if(item.disabled){ return true;}//已经选择了就不在选择
      		if(item.goodsType==1){
      			item.skuList.forEach((it)=>{
		          this.chooseGoods({
		            goodsId:item.goodsId,
		            goodsSkuId:it.goodsSkuId,
		            goodsName:it.goodsSkuFullName,
		            goodsType:1,//1是规格商品
		            price:it.price,
            		priceRate:100,
		            mPrice:it.mPrice,
		            goodsSn:it.goodsSn,
		          });
		        });
      		}else{
      			this.chooseGoods({
	            goodsId:item.goodsId,
	            goodsSkuId:0,
	            goodsName:item.goodsName,
	            goodsType:item.goodsType,
	            price:item.price,
            	priceRate:100,
	            mPrice:item.mPrice,
	            goodsSn:item.goodsSn,
	          });
      		}
          
        });
      },
      //标记列表已经选择了
      signListIsChoose(){
      	
      	var disabled;
      	this.goodsDataList.forEach((item)=>{
      		disabled = false;
      		if(item.skuList && item.skuList.length > 0){//规格品
      			var c = 0;
      			for(var i=0,li=this.parentGoodList.length; i<li; i++){
	      				if(item.goodsId==this.parentGoodList[i].goodsId){
	      					c ++;
	      				}
	      		}
	      		if(c==item.skuList.length){
	      			disabled = true;
	      		}
      		}else{
	      		for(var i=0,li=this.parentGoodList.length; i<li; i++){
	      				if(item.goodsId==this.parentGoodList[i].goodsId){
	      					disabled = true;
	      					break;
	      				}
	      		}
      		}
      		item.disabled = disabled;
      	});
      },
      //***********************SPU商品查询end********************
      
    },
    created() {
      //this.loadGoodsData();
      this.$store.getters.ev.$once('onchangeSpuGoodsForGoods',(data)=>{//监听变化
        this.paramObj=data || {};
        this.loadGoodsData();
      })
    }
  }
</script>
