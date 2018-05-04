<template>
<div class="_container">
  <!-- 查询条件 -->
  <div class="_setting-bar">
    <div class="_query-form">
      <div class="_query-form-item">
        <el-form :inline="true">
          <el-form-item>
            <el-input placeholder="充值卡编号" v-model="cardItemIdSearch"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="订单号" v-model="orderNoSearch"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="充值卡批次号" v-model="cardIdSearch"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="卡号查询" v-model="cardNoSearch"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="卡序号查询" v-model="cardSeqSearch"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="statusCodeSearch" clearable placeholder="状态">
              <el-option
                v-for="item in statusCodeOptions"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="width: 350px;">
            <el-row type="flex" justify="space-between">
              <el-col :span="12">
                <el-date-picker
                  style="width: 168px;"
                  v-model="createdDtmStSearch"
                  type="datetime" clearable
                  placeholder="下单时间开始"
                  :picker-options="pickerOptions0">
                </el-date-picker>
              </el-col>
              <el-col :span="0" style="text-align: center; width: 15px;"> ~ </el-col>
              <el-col :span="12">
                <el-date-picker
                  style="width: 168px;"
                  v-model="createdDtmEtSearch"
                  type="datetime" clearable
                  placeholder="下单时间结束"
                  :picker-options="pickerOptions1">
                </el-date-picker>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-button @click.native="searchDataList">查询</el-button>
            <el-button @click.native="resetSearchValue">清空</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>

  <div class="_table-container"> 
    <div class="_table-list">
    	<el-table :data="dataList" stripe style="width: 100%" border @sort-change="changeSort">
        <el-table-column align="center" property="tradeId" label="编号" width="100" sortable="'custom'"></el-table-column>
        <el-table-column align="center" property="price" label="交易金额(元)" width="150" sortable="'custom'"></el-table-column>
        <el-table-column align="center" property="orderNo" label="订单号" min-width="180" sortable="'custom'"></el-table-column>
        <el-table-column align="center" property="statusCode_str" label="状态" width="100" sortable="'custom'"></el-table-column>
        <el-table-column align="center" property="cardItemId" label="卡编号" width="110" sortable="'custom'"></el-table-column>
        <el-table-column align="center" property="cardNo" label="卡号" width="150" sortable="'custom'"></el-table-column>
        <el-table-column align="center" property="cardSeq" label="卡序号" width="180" sortable="'custom'"></el-table-column>
        <el-table-column align="center" property="createdUserId" label="创建用户编号" min-width="150" sortable="'custom'"></el-table-column>
        <el-table-column align="center" property="createdDtm_str" label="创建时间" width="200" sortable="'custom'"></el-table-column>
        <el-table-column align="center" inline-template label="操作" width="80">
        	<el-col :span="24">
            <el-button size="small" type="danger" @click.native="deleteRechargeCardTrade(row.tradeId)" v-if="row.statusCode==1">删除</el-button>
        	</el-col>
        </el-table-column>
    	</el-table>
      <!-- 分页 -->
      <div class="_pagination">
        <el-pagination
		      @size-change="handleSizeChange"
		      @current-change="handleCurrentChange"
		      :current-page="pageNo"
		      :page-sizes="[10, 20, 30, 50]"
		      :page-size="pageSize"
		      layout="total, sizes, prev, pager, next, jumper"
		      :total="total">
	    	</el-pagination>
	    </div>
    </div>
  </div>
</div>   

</template>
<script>
  import { getMallRechargeCardTradeList, deleteMallRechargeCardTrade } from 'src/vuex/actions/rechargeCardAction'
  import {dateFormat} from 'lib/utils/dateFormat.js'
  export default {
    props: {
      obj: {
        type: Object,
        default: {}
      }
    },
    data(){
    	var _this = this;
      return {
      	loading:false,//遮罩层
      	rechargeCardTradeObj:{},
        dataList:[],
        pageNo :1,
        pageSize :10,
        total: 0,
        orderByKey:'',
        orderByValue:'',
        cardItemIdSearch:'',
        orderIdSearch:'',
        orderNoSearch:'',
        cardItemIdSearch:'',
        cardIdSearch:'',
        cardNoSearch:'',
        cardSeqSearch:'',
        createdDtmStSearch:'',
        createdDtmEtSearch:'',
        statusCodeSearch:'',
        statusCodeOptions:[
        	{
        		value: '0',
            label: '锁定订单'
          },{
        		value: '1',
            label: '交易成功'
          },
        ],
        pickerOptions0: {
        	disabledDate(time){
            return _this.createdDtmEtSearch == ''?false:time.getTime() > _this.createdDtmEtSearch.getTime();
          }
        },
        pickerOptions1: {
          disabledDate(time){
            return _this.createdDtmStSearch == ''?false:time.getTime() < _this.createdDtmStSearch.getTime();
          }
        },
      }
    },
    created(){
      this.loadData();
    },
    methods:{
      loadData(){
        var param ={
        	 pageNo: this.pageNo
        	,pageSize: this.pageSize
        	,orderByKey: this.orderByKey
        	,orderByValue: this.orderByValue
        	,cardItemId: this.cardItemIdSearch
        	,orderId: this.orderIdSearch
        	,orderNo: this.orderNoSearch
        	,cardItemId: this.cardItemIdSearch
        	,cardId: this.cardIdSearch
        	,cardNo: this.cardNoSearch
        	,cardSeq: this.cardSeqSearch
        	,createdDtmSt: this.createdDtmStSearch==""? "":dateFormat(this.createdDtmStSearch,'yyyy-MM-dd HH:mm:ss')
        	,createdDtmEt: this.createdDtmEtSearch==""? "":dateFormat(this.createdDtmEtSearch,'yyyy-MM-dd HH:mm:ss')
        	,statusCode: this.statusCodeSearch
        };
        this.loading = true;
        getMallRechargeCardTradeList(param).then((data) => {
        	this.loading = false;
            const {success,result}=data;
            //console.log(JSON.stringify(result))
            if(success){
                this.dataList = result.rows ;
                this.dataList.forEach(function(item){
                	item.statusCode_str = item.statusCode==1? '交易成功':'锁定订单';
                	item.createdDtm_str = dateFormat(item.createdDtm,'yyyy-MM-dd HH:mm:ss');
                });
                if(this.pageNo <=1){//因为只有第一页带总记录数
                	this.total = result.total;
                }
            }
        });
      },
      searchDataList(){
      	 this.pageNo = 1;
      	 this.loadData();
      },
      handleSizeChange(val) {
      	this.pageSize = val;
        this.searchDataList();
      },
      handleCurrentChange(val) {
       	 this.pageNo = val;
      	 this.loadData();
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
      	this.loadData();
      },
      deleteRechargeCardTrade(tradeId){
      	this.$confirm('确定把该充值订单删除么？', '提示', {
          type: 'warning'
        }).then(() => {//确定
        	 var param ={
	        	 tradeId: tradeId
	        };
	        deleteMallRechargeCardTrade(param).then((data) => {
	            const {success,msg,result}=data;
	            this.$message({
		            type: success? 'success':'error',
		            message: msg
		        });
	            if(success){
	              this.searchDataList();
	            }
	        }); 
          
        }).catch(() => {//取消
                    
        });
         
      },
      resetSearchValue(){
      	this.cardItemIdSearch = '';
        this.orderIdSearch = '';
        this.orderNoSearch = '';
        this.cardItemIdSearch = '';
        this.cardIdSearch = '';
        this.cardNoSearch = '';
        this.cardSeqSearch = '';
        this.createdDtmStSearch = '';
        this.createdDtmEtSearch = '';
        this.statusCodeSearch = '';
      },
      //**********************   
    }
  }
</script>
