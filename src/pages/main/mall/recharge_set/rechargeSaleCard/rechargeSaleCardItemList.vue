<template>
<div class="_container">
  <card-panel>
    <h3 slot="title">网销卡明细列表</h3>
    <div slot="panel-btns">
      <el-button size="small" type="primary" @click.native.prevent="$emit('reback', 'rechargeSaleCardList',obj)">返回</el-button>
    </div>
    <div slot="panel-body">
      <!-- 查询条件 -->
      <div class="_setting-bar">
        <div class="_query-form">
          <div class="_query-form-item">
            <el-form :inline="true">
              <el-form-item>
                <el-input placeholder="卡编号查询" :number="true" v-model="cardItemIdSearch"></el-input>
              </el-form-item>
              <!--<el-form-item>
                <el-input placeholder="卡号查询" :number="true" v-model="cardNoSearch"></el-input>
              </el-form-item>-->
              <el-form-item>
                <el-input placeholder="对应订单号查询" v-model="orderNoSearch"></el-input>
              </el-form-item>
              <el-form-item style="width: 350px;">
               <el-row type="flex" justify="space-between">
                 <el-col :span="12">
                    <el-date-picker
                      style="width: 168px;"
                      v-model="bindDtmStSearch"
                      type="datetime" clearable
                      placeholder="购买卡时间开始"
                      :picker-options="pickerOptions0">
                     </el-date-picker>
                 </el-col>
                 <el-col :span="0" style="text-align: center; width: 15px;"> ~ </el-col>
                 <el-col :span="12">
                    <el-date-picker
                      style="width: 168px;"
                      v-model="bindDtmEtSearch"
                      type="datetime" clearable
                      placeholder="购买卡时间结束"
                      :picker-options="pickerOptions1">
                     </el-date-picker>
                 </el-col>
               </el-row> 
              </el-form-item>
              <el-form-item style="width: auto">
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
            <el-table-column align="center" property="cardItemId" label="编号" width="100" sortable="'custom'"></el-table-column>
            <el-table-column align="center" property="orderNo" label="对应订单号" width="200" sortable="'custom'"></el-table-column>
            <el-table-column align="center" property="orderPayLimit_str" label="可支付比例" sortable="'custom'"></el-table-column>
            <el-table-column align="center" property="cardPrice" label="卡金额" sortable="'custom'"></el-table-column>
            <el-table-column align="center" property="cardBalance" label="卡余额" sortable="'custom'"></el-table-column>
            <el-table-column align="center" property="frozenBalance" label="冻结余额" sortable="'custom'"></el-table-column>
            <el-table-column align="center" property="bindUserId" label="购买用户" sortable="'custom'"></el-table-column>
            <el-table-column align="center" property="bindDtm_str" label="购买时间" width="180" sortable="'custom'"></el-table-column>
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
  </card-panel> 
  
</div>   

</template>
<script>
  import { getMallRechargeCardItemList } from 'src/vuex/actions/rechargeCardAction'
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
        dataList:[],
        pageNo :1,
        pageSize :10,
        total: 0,
        orderByKey:'',
        orderByValue:'',
        cardItemIdSearch:'',
        cardNoSearch:'',
        bindDtmStSearch:'',
        bindDtmEtSearch:'',
        orderNoSearch:'',
        pickerOptions0: {
        	disabledDate(time){
            return _this.bindDtmEtSearch == '' || typeof _this.bindDtmEtSearch == 'undefined'?false:time.getTime() >= _this.bindDtmEtSearch.getTime();
          }
        },
        pickerOptions1: {
          disabledDate(time){
            return _this.bindDtmStSearch == '' || typeof _this.bindDtmStSearch == 'undefined'?false:time.getTime() <= _this.bindDtmStSearch.getTime();
          }
        },
       
        //******************
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
        	,cardId: this.obj.card.cardId
        	,cardItemId: this.cardItemIdSearch
        	,cardNo: this.cardNoSearch
        	,bindDtmSt: this.bindDtmStSearch=="" || typeof this.bindDtmStSearch == 'undefined'? "":dateFormat(this.bindDtmStSearch,'yyyy-MM-dd HH:mm:ss')
        	,bindDtmEt: this.bindDtmEtSearch=="" || typeof this.bindDtmEtSearch == 'undefined'? "":dateFormat(this.bindDtmEtSearch,'yyyy-MM-dd HH:mm:ss')
        	,orderNo: this.orderNoSearch
        };
        this.loading = true;
        getMallRechargeCardItemList(param).then((data) => {
        	this.loading = false;
            const {success,result}=data;
            //console.log(JSON.stringify(result))
            if(success){
                this.dataList = result.rows ;
                this.dataList.forEach(function(item){
                	item.beginDay_str = dateFormat(item.beginDay,'yyyy-MM-dd');
                	item.endDay_str = dateFormat(item.endDay,'yyyy-MM-dd');
                	item.bindDtm_str = item.bindDtm== null? '':dateFormat(item.bindDtm,'yyyy-MM-dd HH:mm:ss');
                	item.createdDtm_str = dateFormat(item.createdDtm,'yyyy-MM-dd HH:mm:ss');
                	item.recordVersionStr = dateFormat(item.recordVersion,'yyyy-MM-dd HH:mm:ss');
                	item.orderPayLimit_str = item.orderPayLimit + '%';
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
      
      resetSearchValue(){
      	this.cardItemIdSearch = '';
        this.orderNoSearch = '';
        this.bindDtmStSearch = '';
        this.bindDtmEtSearch = '';
      	this.statusCodeSearch = '';
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
      outputData(){
      	this.$confirm('确定导出【'+this.outputOptions[this.outputSearch].label+'】么？', '提示', {
          type: 'warning'
        }).then(() => {//确定
      		window.location = "/mall/mallRechargeCardController/exportCard?cardId="+this.obj.card.cardId+"&exportType="+this.outputSearch;
      		this.$message({
            type: 'success',
            message: '正在导出数据，请稍候...'
	        });
        }).catch(() => {//取消
                    
        });
      }
      //**********************   
    }
  }
</script>
