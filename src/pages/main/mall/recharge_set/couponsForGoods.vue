<template>
  <div>
    <!-- 查询条件 -->
    <div class="_setting-bar">
      <div class="_query-form">
        <div class="_query-form-item">
          <el-form :inline="true">
            <el-form-item>
              <el-input placeholder="优惠卷编号查询" v-model="couponsIdSearch"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="优惠卷名称查询" v-model="couponsNameSearch"></el-input>
            </el-form-item>
            <el-form-item>
              <el-select v-model="couponsTypeSearch" clearable placeholder="优惠卷类型" clearable >
                <el-option
                  v-for="item in couponsTypeOptions"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item style="width: auto">
              <el-button @click.native="searchCouponsDataList">查询</el-button>
              <el-button @click.native="chooseAllCoupons" type="info">全选</el-button>
              <el-button @click.native="unChooseAllCoupons" type="danger">反选</el-button>
              <!--<el-button @click.native="resetCouponsSearchValue">清空</el-button>-->
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>

    <div class="_table-container">
      <div class="_table-list">
      	<el-table :data="couponsDataList" stripe style="width: 100%" border>
          <el-table-column property="couponsId" label="编号" width="80"></el-table-column>
          <el-table-column property="couponsName" label="优惠卷名称" width=""></el-table-column>
          <el-table-column property="couponsVal" label="优惠/折扣" width=""></el-table-column>
          <el-table-column property="couponsPrice" label="价值金额" width=""></el-table-column>
          <el-table-column property="couponsLimitPrice" label="限制金额" width=""></el-table-column>
          <el-table-column property="beginEndDayStr" label="起止日期/有效期(天)" width="210"></el-table-column>
          <el-table-column inline-template label="操作" width="160">
          	<el-col :span="24">
              <el-button size="small" type="success" @click.native="chooseCoupons(row)" :disabled="row.disabled">添加优惠卷</el-button>
          	</el-col>
          </el-table-column>
      	</el-table>
        <!-- 分页 -->
        <div class="_pagination">
          <el-pagination
  		      @size-change="handleCouponsSizeChange"
  		      @current-change="handleCouponsCurrentChange"
  		      :current-page="couponsPageNo"
  		      :page-sizes="[10, 20, 30, 50]"
  		      :page-size="couponsPageSize"
  		      layout="total, sizes, prev, pager, next, jumper"
  		      :total="couponsTotal">
  	    	</el-pagination>
  	    </div>
      </div>
    </div>
  </div>
</template>
<script>
	import { 
  	 getMallCouponsListForRecharge
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
	      //优惠券
      	couponsDataList:[],
        couponsPageNo :1,
        couponsPageSize :10,
        couponsTotal: 0,
      	couponsIdSearch:'',
      	couponsNameSearch:'',
      	couponsTypeSearch:'',
        couponsTypeOptions:[{value: '0',label: '现金卷'},{value: '1',label: '折扣卷'}],
      	paramObj:this.obj,
        parentGoodList:[],//父组件的商品，用于标记列表中哪些已经选择了
	    }
	  },
	  methods: {
	    //***优惠券查询*****
      loadCouponsData(){
        var param ={
        	 pageNo: this.couponsPageNo
        	,pageSize: this.couponsPageSize
        	,couponsId: this.couponsIdSearch
        	,couponsName: this.couponsNameSearch
        	,couponsType: this.couponsTypeSearch
        	,beginDay: this.paramObj.beginDay
        	,endDay: this.paramObj.endDay
        	,shopId: this.paramObj.shopId
        };
        this.loading = true;
        getMallCouponsListForRecharge(param).then((data) => {
        	this.loading = false;
            const {success,result}=data;
            //console.log(JSON.stringify(result))
            if(success){
                this.couponsDataList = result.rows ;
                this.couponsDataList.forEach(function(item){
                	if(item.couponsType==0){//优惠卷类型 0 现金卷 1 折扣卷
                		item.couponsTypeStr = '现金卷';
                	}else if(item.couponsType==1){
                		item.couponsTypeStr = '折扣卷';
                	}
                	if(item.couponsLimit==0){//优惠约束 0 全店铺优惠 1 商品分类优惠 2 商品优惠
                		item.couponsLimitStr = '全店铺优惠';
                	}else if(item.couponsLimit==1){
                		item.couponsLimitStr = '商品分类优惠';
                	}else if(item.couponsLimit==2){
                		item.couponsLimitStr = '商品优惠';
                	}
                	if(item.dayLimit==1){
                		item.beginEndDayStr = '领取后 '+item.dayNumber+' 天内有效';
                	}else{
                		item.beginEndDayStr = dateFormat(item.beginDay,'yyyy-MM-dd')+'至'+dateFormat(item.endDay,'yyyy-MM-dd');
                	}
                });
                if(this.couponsPageNo <=1){//因为只有第一页带总记录数
                	this.couponsTotal = result.total;
                }
                this.signListIsChoose();
            }
        });
      },
      searchCouponsDataList(){
      	 this.couponsPageNo = 1;
      	 this.loadCouponsData();
      },
      handleCouponsSizeChange(val) {
      	this.couponsPageSize = val;
        this.searchCouponsDataList();
      },
      handleCouponsCurrentChange(val) {
       	 this.couponsPageNo = val;
      	 this.loadCouponsData();
      },
      chooseCoupons(row){
        this.$emit('chooseCoupons',row);
      },
      resetCouponsSearchValue(){
      	this.couponsIdSearch = '';
      	this.couponsNameSearch = '';
      	this.couponsTypeSearch = '';
      },
      unChooseAllCoupons(){//反选
      	this.$emit('unChooseCoupons');
      },
      chooseAllCoupons(){
      	this.couponsDataList.forEach((item)=>{
      		this.chooseCoupons({
            couponsId:item.couponsId,
            couponsName:item.couponsName,
            couponsPrice:item.couponsPrice,
          });
          
        });
      },
      //标记列表已经选择了
      signListIsChoose(){
      	
      	var disabled;
      	this.couponsDataList.forEach((item)=>{
      		disabled = false;
      		for(var i=0,li=this.parentGoodList.length; i<li; i++){
      				if(item.couponsId==this.parentGoodList[i].couponsId){
      					disabled = true;
      					break;
      				}
      		}
      		item.disabled = disabled;
      	});
      	
      },
      //***********************优惠券查询end********************
	  },
	  created() {
	    //this.loadCouponsData();
	    this.$store.getters.ev.$once('onchangeCouponsForGoods',(data)=>{//监听变化
	      this.paramObj=data || {};
	    	this.loadCouponsData();
	    })
	  }
	}
</script>
