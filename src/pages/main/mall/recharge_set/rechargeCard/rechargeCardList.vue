<template>
<div class="_container">
  <!-- 查询条件 -->
  <div class="_setting-bar">
    <div class="_query-form">
      <div class="_query-form-item">
        <el-form :inline="true">
          <el-form-item style="width: 350px;">
           <el-row type="flex" justify="space-between">
             <el-col :span="12">
                <el-date-picker
                  style="width: 168px;"
                  v-model="beginDaySearch"
                  type="date" clearable
                  placeholder="有效期起始"
                  :picker-options="pickerOptions0">
                 </el-date-picker>
             </el-col>
             <el-col :span="0" style="text-align: center; width: 15px;"> ~ </el-col>
             <el-col :span="12">
                <el-date-picker
                  style="width: 168px;"
                  v-model="endDaySearch"
                  type="date" clearable
                  placeholder="有效期截止"
                  :picker-options="pickerOptions1">
                 </el-date-picker>
             </el-col>
           </el-row> 
          </el-form-item>

          <el-form-item>
            <el-select v-model="useStatusSearch" clearable placeholder="使用状态">
              <el-option
                v-for="item in useStatusOptions"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item style="width: auto;">
            <el-button @click.native="searchDataList">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="_actions-btn" style="min-width: 70px;">
      <el-button @click.native="goToForward('rechargeCardAdd')" type="success">新增</el-button>
    </div>
  </div>

  <div class="_table-container">
    <div class="_table-list">
    	<el-table :data="dataList" stripe style="width: 100%" border @sort-change="changeSort">
        <el-table-column align='center' property="cardId" label="批次号" width="110" sortable="'custom'"></el-table-column>
        <el-table-column align='center' property="cardNumber" label="卡发行数量" min-width="130" sortable="'custom'"></el-table-column>
        <el-table-column align='center' property="useNumber" label="已使用数量" min-width="130" sortable="'custom'"></el-table-column>
        <el-table-column align='center' property="cardPrice" label="充值卡金额(元)" min-width="170" sortable="'custom'"></el-table-column>
        <el-table-column align='center' property="mPrice" label="市场价格(元)" width="140" sortable="'custom'"></el-table-column>
        <el-table-column align='center' property="beginDay_str" label="有效期起始" width="130" sortable="'custom'"></el-table-column>
        <el-table-column align='center' property="endDay_str" label="有效期截止" width="130" sortable="'custom'"></el-table-column>
        <el-table-column align='center' property="createdUserId_str" label="创建用户编号" width="160" sortable="'custom'"></el-table-column>
        <el-table-column align='center' property="createdDtm_str" label="创建时间" width="180" sortable="'custom'"></el-table-column>
        <el-table-column align='center' inline-template label="操作" width="130">
        	<div>
            <el-button size="mini" type="success"   @click.native="goToForward('rechargeCardItemList',row)">明细</el-button>
            <el-button size="mini" type="danger"    @click.native="deleteRechargeCard(row)">删除</el-button>
        	</div>
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
<style lang="sass">
  /*.el-form--inline .el-form-item {
    vertical-align: baseline;
  }*/
</style>
<script>
	import { mapGetters } from 'vuex'
  import { getMallRechargeCardList, deleteMallRechargeCard } from 'src/vuex/actions/rechargeCardAction'
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
      	rechargeCardObj:{},
        dataList:[],
        pageNo :1,
        pageSize :10,
        total: 0,
        orderByKey:'',
        orderByValue:'',
        beginDaySearch:'',
        endDaySearch:'',
        useStatusSearch:'',
        useStatusOptions:[
        	{
        		value: '0',
            label: '未使用'
          },{
        		value: '1',
            label: '使用中'
          },{
        		value: '2',
            label: '已用完'
          },
        ],
        pickerOptions0: {
        	disabledDate(time){
            return _this.endDaySearch == '' || typeof _this.endDaySearch =='undefined'?false:time.getTime() > _this.endDaySearch.getTime();
          }
        },
        pickerOptions1: {
          disabledDate(time){
            return _this.beginDaySearch == '' || typeof _this.beginDaySearch =='undefined'?false:time.getTime() < _this.beginDaySearch.getTime();
          }
        },
      }
    },
    computed:{
    	...mapGetters(['supplierID'])
    },
    created(){
    	if(typeof this.obj.cardParam.pageNo !='undefined'){
    		this.pageNo = this.obj.cardParam.pageNo;
    	}
    	if(typeof this.obj.cardParam.pageSize !='undefined'){
    		this.pageSize = this.obj.cardParam.pageSize;
    	}
    	if(typeof this.obj.cardParam.orderByKey !='undefined'){
    		this.orderByKey = this.obj.cardParam.orderByKey;
    	}
    	if(typeof this.obj.cardParam.orderByValue !='undefined'){
    		this.orderByValue = this.obj.cardParam.orderByValue;
    	}
    	if(typeof this.obj.cardParam.beginDaySearch !='undefined'){
    		this.beginDaySearch = this.obj.cardParam.beginDaySearch;
    	}
    	if(typeof this.obj.cardParam.endDaySearch !='undefined'){
    		this.endDaySearch = this.obj.cardParam.endDaySearch;
    	}
    	if(typeof this.obj.cardParam.useStatusSearch !='undefined'){
    		this.useStatusSearch = this.obj.cardParam.useStatusSearch;
    	}
      this.loadData();
    },
    methods:{
      loadData(){
        var param ={
        	 pageNo: this.pageNo
        	,pageSize: this.pageSize
        	,orderByKey: this.orderByKey
        	,orderByValue: this.orderByValue
        	,beginDay: this.beginDaySearch=="" || typeof this.beginDaySearch =='undefined'? "":dateFormat(this.beginDaySearch,'yyyy-MM-dd')
        	,endDay: this.endDaySearch=="" || typeof this.endDaySearch =='undefined'? "":dateFormat(this.endDaySearch,'yyyy-MM-dd')
        	,useStatus: this.useStatusSearch
        };
        this.loading = true;
        getMallRechargeCardList(param).then((data) => {
        	this.loading = false;
            const {success,result}=data;
            //console.log(JSON.stringify(result))
            if(success){
                this.dataList = result.rows ;
                this.dataList.forEach(function(item){
                	item.beginDay_str = dateFormat(item.beginDay,'yyyy-MM-dd');
                	item.endDay_str = dateFormat(item.endDay,'yyyy-MM-dd');
                	item.createdDtm_str = dateFormat(item.createdDtm,'yyyy-MM-dd HH:mm:ss');
                	item.createdUserId_str = item.userMobile;
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
      deleteRechargeCard(row){
      	this.$confirm('确定把该充值卡删除么？', '提示', {
          type: 'warning'
        }).then(() => {//确定
        	 var param ={
	        	 cardId: row.cardId
	        	,companyId: this.supplierID
	        };
	        deleteMallRechargeCard(param).then((data) => {
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
      goToForward(url,row){
      	this.obj.cardParam.pageNo = this.pageNo;
      	this.obj.cardParam.pageSize = this.pageSize;
      	this.obj.cardParam.orderByKey = this.orderByKey;
      	this.obj.cardParam.orderByValue = this.orderByValue;
      	this.obj.cardParam.beginDaySearch = this.beginDaySearch;
      	this.obj.cardParam.endDaySearch = this.endDaySearch;
      	this.obj.cardParam.useStatusSearch = this.useStatusSearch;
    	
      	this.obj.card = row;
      	this.$emit('forward', url, this.obj);
      },
      //**********************   
    }
  }
</script>
