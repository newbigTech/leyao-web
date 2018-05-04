<template>
  <div>
    <!-- 查询条件 -->
    <div class="_setting-bar">
      <div class="_query-form">
        <div class="_query-form-item">
          <el-form :inline="true">
            <el-form-item>
              <el-input v-model="goodsObj.goodsName" placeholder="商品名称" :maxlength="20"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="goodsObj.goodsSn" placeholder="商品编码" :maxlength="120"></el-input>
            </el-form-item>
			<el-form-item>
				<el-select v-model="goodsObj.goodsType" placeholder="商品类型" clearable>
				    <el-option label="单品" value="0"></el-option>
				    <el-option label="规格商品" value="1"></el-option>
				    <el-option label="组合商品" value="2"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item>
				<el-select v-model="goodsObj.stockType" placeholder="库存类型" clearable>
				    <el-option label="无限制" value="0"></el-option>
				    <el-option label="单品独立库存" value="1"></el-option>
				    <el-option label="规格品共享库存" value="2"></el-option>
				    <el-option label="规格品独立库存" value="3"></el-option>
				</el-select>
			</el-form-item>           
            <el-form-item>
              <el-button @click.native="searchGoodsDataList">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="_query-form-btn">
          <!-- <el-button @click.native="searchGoodsDataList">查询</el-button> -->
          <!-- <el-button @click.native="resetGoodsSearchValue">清空</el-button> -->
        </div>
      </div>
      <!-- <div class="_actions-btn">
        <el-button type="primary">新增</el-button>
      </div> -->
	  </div>
    <div class="_table-container">
      <div class="_table-list">
      	<el-table :data="goodsDataList" stripe style="width: 100%" border>
          <el-table-column align="center" property="goodsId" label="编号" width="80"></el-table-column>
          <el-table-column align="center" property="goodsSn" label="商品编码" width="100"></el-table-column>
          <el-table-column align="center" property="goodsName" label="商品名称" min-width="130"></el-table-column>
          <el-table-column align="center" property="goodsTypeStr" label="商品类型" width="120"></el-table-column>
          <el-table-column inline-template align="center" label="市场价/销售价(元)" width="150">
              	<div>{{row.mprice}}/{{row.price}}</div>
          </el-table-column>      
          <el-table-column inline-template label="库存类型" width="120" align="center">
                <div>{{row.stockType == 0 ? '无限制' : (row.stockType == 1?'独立库存':(row.stockType == 2?'共享库存':'独立库存'))}}</div>
          </el-table-column>   
          <el-table-column align="center" inline-template label="总销量/总库存" width="130">
	            <div>
	                <span v-if="row.goodsType==1&&row.stockType==3"> {{row.saleNumber}} / -</span>
	                <span v-else> {{row.saleNumber}} / {{row.stockType == 0 ? '-' : (row.goodsType == 2?'-':row.stockNumber)}} </span>
	            </div>
          </el-table-column>
          <el-table-column align="center" inline-template label="操作" width="100">
          	<el-col :span="24">
              <el-button size="small" type="success" @click.native="chooseGoods(row)">添加</el-button>
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
    <!--商品规格Dialog-->
    <el-dialog :title="goodSkuDialogTitle" v-model="goodSkuDialog" class="shop-img-file-dialog">
      <card-panel style="margin-top: -15px;">
        <span slot="title">请选择商品的规格品</span>
        <div slot="panel-btns"><el-button @click.native="" type="info" size="small" >确定选择</el-button></div>
        <div slot="panel-table">
          <div class="_table-list">
            <el-table :data="goodSkuList" border stripe>
              <el-table-column align="center" prop="goodsSkuId" label="ID" width="110"></el-table-column>
              <el-table-column align="center" prop="goodsSkuName" label="规格名称" min-width="140"></el-table-column>
              <el-table-column align="center" prop="goodsSn" label="商品编号" width="130"></el-table-column>
              <el-table-column align="center" prop="mprice" label="市场价" width="110"></el-table-column>
              <el-table-column align="center" prop="price" label="销售价" width="110"></el-table-column>
              <el-table-column align="center" inline-template label="操作" width="90">
                <div>
                  <el-button size="small" type="primary" @click.native.prevent="onAddSkuGoods(row)">选择</el-button>
                </div>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </card-panel>
    </el-dialog>
  </div>
</template>
<script>
  import { 
  	 getMallGoodsListForCoupon
  } from 'src/vuex/actions/rechargeGoodsAction'
  import {
	  getGoodsPageList,
	  getGoodSkuList
  } from 'actions/goodsAction'
  import {dateFormat} from 'lib/utils/dateFormat.js'
  export default {
	  name: 'coupons_for_goods',
	  computed: {
	    
	  },
	  data() {
	    return {
	      	//SPU商品
	      	goodsDataList:[],
	        goodsPageNo :1,
	        goodsPageSize :10,
	        goodsTotal: 0,
	        goodsObj:{
	        	goodsType:'',
	        	stockType:''
	        },
	        goodsType:[{value: '0',label: '单品'},{value: '1',label: '规格商品'},{value: '2',label: '组合商品'}],

	        goodSkuDialog: false,
	      	goodSkuDialogTitle: '',
	      	goodSkuList: [], //商品sku列表
	    }
	  },
	  methods: {
		   //***SPU商品查询*****
	      loadGoodsData(){
	      	this.goodsObj.pageNo = this.goodsPageNo
	        this.goodsObj.pageSize = this.goodsPageSize
	        this.goodsObj.statusCode = 1
	        //console.log(JSON.stringify(this.goodsObj))
	        getGoodsPageList(this.goodsObj).then(result => {
	            this.goodsDataList = result.rows ;
	            this.goodsDataList.forEach(function(item){
	            	if(item.goodsType==0){//{0: '单品', 1: '规格商品', 2: '组合商品'},
	            		item.goodsTypeStr = '单品';
	            	}else if(item.goodsType==1){
	            		item.goodsTypeStr = '规格商品';
	            	}else if(item.goodsType==2){
	            		item.goodsTypeStr = '组合商品';
	            	}
	            	item.saleDtmStr = dateFormat(item.saleDtm,'yyyy-MM-dd HH:mm:ss');
	            });
	            if(this.goodsPageNo <=1){//因为只有第一页带总记录数
	            	this.goodsTotal = result.total;
	            }

	      	})
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
	      	this.goodsObj.goodsName = ''
	      	this.goodsObj.goodsSn = ''
	      },
	      chooseGoods(row){	      	
		      //商品类型 0 SPU商品 1 SKU商品 2 组合商品
		      if (parseInt(row.goodsType) === 1) {
		        this.goodSkuDialog = true
		        this.goodSkuDialogTitle = `商品规格列表【${row.goodsName}】`
		        getGoodSkuList({
		          goodsId: row.goodsId
		        }).then(data => {
		          if (data.length > 0)
		            this.goodSkuList = data
		        	this.goodSkuList.forEach(function(item){
		        		item.goodsSkuName = row.goodsName+"-"+item.goodsSkuName;
		        		item.goodsSn = row.goodsSn ;
		        	})
		        })
		      }else{
		      	this.$emit('chooseGoods',row);
		      }
	      },
	      onAddSkuGoods(row){
	      	this.$emit('chooseGoods',row);
	      	this.goodSkuDialog = false ;
	      }
      //***********************SPU商品查询end********************
	  },
	  created() {
	    this.loadGoodsData();
	  }
	}
</script>
