<template>
<el-row>
		  	 <div class="_setting-options">
		        <div class="_setting-options-left">
			       <el-form :inline="true" class="demo-form-inline">
							  <el-form-item >
					      		<el-input placeholder="SKU商品编号查询" v-model="goodsSkuIdSearch" style="width: 140px"></el-input>
							  </el-form-item>
							  <el-form-item>
					      		<el-input placeholder="SKU商品名称查询" v-model="goodsSkuNameSearch"></el-input>
							  </el-form-item>
							  <el-form-item>
					      		<el-input placeholder="商品编码查询" v-model="unionGoodsSnSearch" style="width: 140px"></el-input>
							  </el-form-item>
							  <el-form-item>
					      		<el-input placeholder="商品名称查询" v-model="unionGoodsNameSearch" style="width: 140px"></el-input>
							  </el-form-item>
							  <el-form-item>
							    <el-button @click.native="searchGoodsSkuDataList">查询</el-button>
							  </el-form-item>
							  <el-form-item>
							    <el-button @click.native="resetGoodsSkuSearchValue">清空</el-button>
							  </el-form-item>
						  </el-form>
		        </div>
		    </div>
		    <div class="_table-container">
		        <div class="_no-data bg-blue-light" v-show="!goodsSkuDataList.length">
		            <span>暂无数据</span>
		        </div>
		        <div class="_table-list" v-show="!!goodsSkuDataList.length">
		        	<el-table :data="goodsSkuDataList" stripe style="width: 100%" border>
		            <el-table-column property="goodsSkuId" label="编号" width="80"></el-table-column>
		            <el-table-column property="goodsSkuName" label="商品名称" width=""></el-table-column>
		            <el-table-column property="price" label="销售价" width="80"></el-table-column>
		            <el-table-column property="goodsId" label="对应商品编号" width="120"></el-table-column>
		            <el-table-column property="goodsSn" label="对应商品编码" width="120"></el-table-column>
		            <el-table-column property="goodsName" label="对应商品名称" width=""></el-table-column>
		            <el-table-column inline-template label="操作" width="80">
		            	<el-col :span="24">
		                <el-button size="small" type="danger" @click.native="chooseGoodsSku(row)">选择</el-button>
		            	</el-col>
		            </el-table-column>
		        	</el-table>
			        <!-- 分页 -->
			        <div class="_pagination">
				        <el-pagination
						      @size-change="handleGoodsSkuSizeChange"
						      @current-change="handleGoodsSkuCurrentChange"
						      :current-page="goodsSkuPageNo"
						      :page-sizes="[10, 20, 30, 50]"
						      :page-size="goodsSkuPageSize"
						      layout="total, sizes, prev, pager, next, jumper"
						      :total="goodsSkuTotal">
					    	</el-pagination>
					    </div>
				    </div>
		    </div>
  </el-row>
</template>
<script>
	import { 
  	 getMallGoodsSkuListForCoupon
  } from 'src/vuex/actions/rechargeGoodsAction'
  import {dateFormat} from 'lib/utils/dateFormat.js'
  export default {
	  name: 'coupons_for_goods',
	  computed: {
	    
	  },
	  data() {
	    return {
      	//SKU商品
      	goodsSkuDataList:[],
        goodsSkuPageNo :1,
        goodsSkuPageSize :10,
        goodsSkuTotal: 0,
      	goodsSkuIdSearch:'',
      	goodsSkuNameSearch:'',
      	unionGoodsSnSearch:'',
      	unionGoodsNameSearch:'',
	    }
	  },
	  methods: {
	    //***SKU商品查询*****
      loadGoodsSkuData(){
        var param ={
        	 pageNo: this.goodsSkuPageNo
        	,pageSize: this.goodsSkuPageSize
        	,goodsSkuId: this.goodsSkuIdSearch
        	,goodsSkuName: this.goodsSkuNameSearch
        	,goodsSn: this.unionGoodsSnSearch
        	,goodsName: this.unionGoodsNameSearch
        };
        this.loading = true;
        getMallGoodsSkuListForCoupon(param).then((data) => {
        	this.loading = false;
            const {success,result}=data;
            //console.log(JSON.stringify(result))
            if(success){
                this.goodsSkuDataList = result.rows ;
                this.goodsSkuDataList.forEach(function(item){
                });
                if(this.goodsSkuPageNo <=1){//因为只有第一页带总记录数
                	this.goodsSkuTotal = result.total;
                }
            }
        });
      },
      searchGoodsSkuDataList(){
      	 this.goodsSkuPageNo = 1;
      	 this.loadGoodsSkuData();
      },
      handleGoodsSkuSizeChange(val) {
      	this.goodsSkuPageSize = val;
        this.searchGoodsSkuDataList();
      },
      handleGoodsSkuCurrentChange(val) {
       	 this.goodsSkuPageNo = val;
      	 this.loadGoodsSkuData();
      },
      chooseGoodsSku(row){
      	this.$emit('chooseGoodsSku',row);
      },
      resetGoodsSkuSearchValue(){
      	this.goodsSkuIdSearch = '';
      	this.goodsSkuNameSearch = '';
      	this.goodsSnSearch = '';
      	this.goodsNameSearch = '';
      },
      //***********************SKU商品查询end********************
    
	  },
	  created() {
	    this.loadGoodsSkuData();
	  }
	}
</script>