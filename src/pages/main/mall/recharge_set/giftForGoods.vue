<template>
  <div>
    <!-- 查询条件 -->
    <div class="_setting-bar">
      <div class="_query-form">
        <div class="_query-form-item">
          <el-form :inline="true">
            <el-form-item>
              <el-input placeholder="赠品名称 模糊查询" v-model="goodsNameSearch"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="赠品编码 精确查询" v-model="goodsSnSearch"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="classifyNameSearch" readonly placeholder="商品分类" :maxlength="20" icon="search" :on-icon-click="handleIconClick"></el-input>
            </el-form-item>
            <el-form-item style="width: auto">
              <el-button @click.native="searchGoodsDataList">查询</el-button>
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
        	<el-table-column align="center" label="" width="120">
          	<template scope="scope">
                <img :src="cloudShowUrl + scope.row.goodsPic" width="80px" height="80px" class="img-rounded">
			      </template>
          </el-table-column>
          <el-table-column align="center" property="goodsSn" label="赠品编码"></el-table-column>
          <el-table-column align="center" property="goodsName" label="赠品名称" min-width="130"></el-table-column>
          <el-table-column align="center" property="goodsFullName" label="赠品全名"></el-table-column>
          <el-table-column align="center" property="unit" label="单位"></el-table-column>
          <el-table-column align="center" property="stockNumber_str" label="库存量"></el-table-column>
          <el-table-column align="center" property="marketPrice" label="市场价"></el-table-column>
          <el-table-column align="center" inline-template label="操作" width="110">
            <el-col :span="24">
              <el-button size="small" type="success" @click.native="chooseGoods(row)">添加赠品</el-button>
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
    <!--商品品类Dialog-->
    <goods-classify ref="goodsClassifyCom" :shopId="paramObj.shopId" @onSuccess="onSelectedClassify"></goods-classify>
  </div>
</template>
<script>
  import GoodsClassify from 'pages/main/mall/shop/goods/components/goods_form/goods-classify'
	import { mapGetters } from 'vuex'
  import { 
     getMallGiftListForRechargeAndActivity,
  } from 'src/vuex/actions/rechargeGoodsAction'
  import {dateFormat} from 'lib/utils/dateFormat.js'
  export default {
    name: 'gift_for_goods',
    props: {
      obj: {
        type: Object,
        default: {}
      }
    },
    components: {
    	GoodsClassify
    },
    computed:{
    	...mapGetters(['cloudShowUrl'])
    },
    data() {
      return {
        //SPU赠品
        goodsDataList:[],
        goodsPageNo :1,
        goodsPageSize :10,
        goodsTotal: 0,
        goodsSnSearch:'',
        classifyNameSearch:'',
        classifyIdSearch:'',
        goodsNameSearch:'',
        paramObj:this.obj,
      }
    },
    methods: {
      
      onSelectedClassify(c){
          this.classifyIdSearch=c.classifyId
          this.classifyNameSearch=c.classifyName
      },
      handleIconClick(){
          this.$refs.goodsClassifyCom.shopId = parseInt(this.paramObj.shopId,10) ;
          this.$refs.goodsClassifyCom.goodsClassifyDialog=true
      },
     //***SPU赠品查询*****
      loadGoodsData(){
        var param ={
           pageNo: this.goodsPageNo
          ,pageSize: this.goodsPageSize
          ,goodsSn: this.goodsSnSearch
          ,goodsName: this.goodsNameSearch
          ,classifyId: this.classifyIdSearch
          ,shopId:this.paramObj.shopId
        };
        this.loading = true;
        getMallGiftListForRechargeAndActivity(param).then((data) => {
          this.loading = false;
            const {success,result}=data;
            //console.log(JSON.stringify(result))
            if(success){
                this.goodsDataList = result.rows ;
                this.goodsDataList.forEach((item)=>{
                  item.stockNumber_str = item.stockNumber && item.stockNumber>0? item.stockNumber : '无限';
                });
                if(this.goodsPageNo <=1){//因为只有第一页带总记录数
                  this.goodsTotal = result.total;
                }
            }
        });
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
      
      //***********************SPU赠品查询end********************
      
    },
    created() {
      this.$store.getters.ev.$once('onchangeGiftForGoods',(data)=>{//监听变化
        this.paramObj=data || {};
        this.loadGoodsData();
      })
    }
  }
</script>
