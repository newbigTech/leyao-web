<template>
	<div>
    <div class="_tag-group" v-for="(tag, idx) in dataList" style="margin-bottom: 15px;">
      <div class="_bar-title"> 
        <div class="_bar-title-inner"> <el-tag type="success">{{tag.sign}}</el-tag></div>
      </div>
      <el-table :data="tag.goods" stripe border :row-class-name="tableRowClassName">
        <el-table-column align="center" property="goodsSn" label="商品编码"></el-table-column>
        <el-table-column align="center" property="goodsName" label="商品名称" min-width="160"></el-table-column>
        <el-table-column align="center" property="goodsPrice_str" label="销售价" min-width="100"></el-table-column>
        <el-table-column align="center" property="price_str" v-if="obj.activityType ==1 || obj.activityType ==2 || obj.activityType ==7" :label="titleName+(activityJson.priceType==1?'折扣':'价格')" min-width="130"></el-table-column>
        <el-table-column align="center" property="stockNumber_str" label="库存量" width=""></el-table-column>
        <el-table-column v-if="obj.activityType !=0 && obj.activityType !=3 && obj.activityType !=5 && obj.activityType !=6" align="center" property="limitBuyNumber_str" label="限购量" width=""></el-table-column>
        <el-table-column align="center" inline-template label="商品状态" min-width="160">
          <div>
	            <div v-show="row.statusCode != 0"  style="color:red;text-decoration:line-through;" title="该商品已被下架">已下架</div>
	            <div v-show="row.statusCode == 0">上架中</div>
          </div>
        </el-table-column>
        <!-- <el-table-column align="center" property="stockNumber_str" label="库存" width="90" sortable="'custom'"></el-table-column> -->
        <!-- <el-table-column align="center" property="saleNumber" label="销量" width="90" sortable="'custom'"></el-table-column> -->
        <!-- <el-table-column align="center" property="sign" label="标签" width="150" sortable="'custom'"></el-table-column> -->
        <!-- <el-table-column align="center" property="sortIndex" label="排序" width="90" sortable="'custom'"></el-table-column> -->
        <!-- <el-table-column align="center" inline-template label="操作" width="90" v-if="obj.opt=='activityPage'">
            <el-col :span="24">
              <el-button size="small" type="danger" @click.native="chooseActivityGoods(row)">选择</el-button>
            </el-col>
        </el-table-column> -->
      </el-table>
    </div>
	</div>
</template>	
<style lang="sass">
  
</style>
<script>
  
  import { getMallActivityGoodsList } from 'src/vuex/actions/activityAction'
  import {dateFormat} from 'lib/utils/dateFormat.js'
  import prettysize from "lib/utils/prettysize"
  import _ from "lodash"
  export default {
    props: {
      obj: {
        type: Object,
        default: {}
      }
    },
    data(){
      var _this = this; 
      var titleName = this.obj.isActivity==1?'活动':'专题';
      return {
        goodsIds: [],
      	loading:false,//遮罩层
      	titleName:titleName,
        activitySign:[],//标签
       
        dataList:[],
        pageNo :1,
        pageSize :9999,
        total: 0,
        orderByKey:'',
        orderByValue:'',
        signSearch:'',
        
        activityJson:$.parseJSON(this.obj.activityJson),
      	activityObj:{
      		activityType:'',
      		statusCode:'',
      		activityName:'',
      		activityFullName:'',
      		beginDtm:'',
      		endDtm:'',
      		activityLimitPrice:'',
      		activityPic:'',
      		activitySPic:'',
      		activityIcon:'',
      		activitySign:'',
      		priceType:'',
      		isPage:'',
      	},
      	//*************************
      }
    },
    created(){
      this.activityObj = this.obj;
      this.activityObj.beginDtm_str = this.activityObj.beginDtm? dateFormat(this.activityObj.beginDtm,'yyyy-MM-dd HH:mm:ss') :'';
      this.activityObj.endDtm_str = this.activityObj.endDtm? dateFormat(this.activityObj.endDtm,'yyyy-MM-dd HH:mm:ss') :'';
      //处理标签
      if(typeof this.activityObj.activitySign !='undefined' && this.activityObj.activitySign!=''){
      	var activitySign = this.activityObj.activitySign.split(',');
      	for(var i=0,li=activitySign.length; i<li; i++){
	    		this.activitySign.push({ key: i, name: activitySign[i], type: 'gray' });
	    	}
      }
      this.loadGoodsList();
    },
    methods:{
      loadGoodsList(){
        this.loading = true;
      	getMallActivityGoodsList({
  				activityId:this.obj.activityId,
  				sign:this.signSearch,
  				pageNo:this.pageNo,
  				pageSize:this.pageSize,
        	orderByKey: this.orderByKey,
        	orderByValue: this.orderByValue,
  			}).then((data) => {
        	this.loading = false;
          const {success,msg,result}=data;
	        if(success){
	        	this.dataList = result.rows ;
	        	var di;
	        	this.dataList.forEach((item) => {
            	item.goodsType = item.goodsSkuId>0? 'SKU':'SPU';
            	item.goodsPrice_str = item.goodsPrice.toFixed(2);
            	item.price_str = this.activityJson.priceType==1? item.price : item.price.toFixed(2);
            	item.stockNumber_str = item.stockNumber==-1? '无限制' : item.stockNumber;
            	for(var i=0,li=this.activityJson.goodsList.length; i<li; i++){
            		di = this.activityJson.goodsList[i];
            		if(di.goodsId==item.goodsId && di.goodsSkuId==item.goodsSkuId ){
            			item.limitBuyNumber = di.limitBuyNumber;
            			item.limitBuyNumber_str = di.limitBuyNumber==0?'无限制' : di.limitBuyNumber;
            		}
            	}
            });
            if(this.pageNo <=1){//因为只有第一页带总记录数
            	this.total = result.total;
            }

            // 按标签分组
            let signs = []
            for (let item of this.dataList) {
              if (signs.indexOf(item.sign) < 0) {
                signs.push(item.sign)
              }
            }

            this.dataList = signs.map(sign => {
              return {
                sign: sign,
                goods: this.dataList.filter(item => item.sign == sign)
              }
            })
            //console.log("this.dataList", this.dataList)
          }
	      });
      },
      searchDataList(){
      	 this.pageNo = 1;
      	 this.loadGoodsList();
      },
      handleSizeChange(val) {
      	this.pageSize = val;
        this.searchDataList();
      },
      handleCurrentChange(val) {
       	 this.pageNo = val;
      	 this.loadGoodsList();
      },
      changeSort(column){
      	if(column.prop != null ){
      		if(column.prop.indexOf('_str') == -1){
      			this.orderByKey = column.prop;
      		}else{
      			this.orderByKey = column.prop.substring(0,column.prop.indexOf('_str'));
      		}
      	}else{
      		this.orderByKey = '';
      	}
      		
      	
      	if(column.order == 'ascending'){
      		this.orderByValue = 'ASC';
      	}else if(column.order == 'descending'){
      		this.orderByValue = 'DESC';
      	}else{
      		this.orderByValue = '';
      	}
      	this.loadGoodsList();
      },
      chooseActivityGoods(row){
      	this.$emit('onSuccess',row);
      },
      tableRowClassName(row, index) {
        return 'sds'
      }
      //**********************   
    },
    mounted(){
      
    }
  }
</script>
