<template>
  <div>
    <!-- 查询条件 -->
    <div class="_setting-bar">
      <div class="_query-form">
        <div class="_query-form-item">
          <el-form :inline="true">
            <el-form-item>
              <el-input v-model="goodsObj.goodsName" placeholder="赠品名称" :maxlength="20"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="goodsObj.goodsSn" placeholder="赠品编码" :maxlength="120"></el-input>
            </el-form-item>          
            <el-form-item>
              <el-button @click.native="searchGiftGoodsDataList">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="_query-form-btn">
        </div>
      </div>
	  </div>
    <div class="_table-container">
      <div class="_table-list">
      	<el-table :data="giftDoodsDataList" stripe style="width: 100%" border>
          <el-table-column align="center" property="goodsId" label="编号" width="80"></el-table-column>
          <el-table-column align="center" property="goodsSn" label="赠品编码" width="100"></el-table-column>
          <el-table-column align="center" property="goodsName" label="赠品名称" min-width="130"></el-table-column>
          <el-table-column inline-template align="center" label="市场价(元)" width="150">
              	<div>{{row.marketPrice}}</div>
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
  </div>
</template>
<script>
  import {
	  getGiftPageList
  } from 'actions/giftAction'
  import {dateFormat} from 'lib/utils/dateFormat.js'
  export default {
	  name: 'gift_for_goods',
	  computed: {
	    
	  },
	  data() {
	    return {
	      	giftDoodsDataList:[],
	        goodsPageNo :1,
	        goodsPageSize :10,
	        goodsTotal: 0,
	        goodsObj:{
	        	goodsType:'',
	        	stockType:''
	        },
	    }
	  },
	  methods: {
		  //***赠品商品查询*****
	      loadGiftData(){
	      	this.goodsObj.pageNo = this.goodsPageNo
	        this.goodsObj.pageSize = this.goodsPageSize
	        this.goodsObj.statusCode = 1
	        //console.log(JSON.stringify(this.goodsObj))
	        getGiftPageList(this.goodsObj).then(result => {
	        	//console.log(JSON.stringify(result.rows))
	            this.giftDoodsDataList = result.rows ;
	            if(this.goodsPageNo <=1){//因为只有第一页带总记录数
	            	this.goodsTotal = result.total;
	            }

	      	})
	      },
	      searchGiftGoodsDataList(){
	      	 this.goodsPageNo = 1;
	      	 this.loadGiftData();
	      },
	      handleGoodsSizeChange(val) {
	      	this.goodsPageSize = val;
	        this.searchGiftGoodsDataList();
	      },
	      handleGoodsCurrentChange(val) {
	       	 this.goodsPageNo = val;
	      	 this.loadGiftData();
	      },
	      resetGoodsSearchValue(){
	      	this.goodsObj.goodsName = ''
	      	this.goodsObj.goodsSn = ''
	      },
	      chooseGoods(row){	      	
		     this.$emit('chooseGoods',row);
	      },
      //***********************SPU商品查询end********************
	  },
	  created() {
	    this.loadGiftData();
	  }
	}
</script>
