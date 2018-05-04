<template>
<div class="_container">
  <!-- 查询条件 -->
  <div class="_setting-bar">
    <div class="_query-form">
      <div class="_query-form-item">
        <el-form :inline="true">
				  <el-form-item>
		      		<el-input placeholder="卡名称" v-model="saleCardNameSearch"></el-input>
				  </el-form-item>
				  <el-form-item>
            <el-select v-model="isHotSearch" clearable placeholder="是否推荐">
              <el-option
                v-for="item in isHotOptions"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
				  <el-form-item>
            <el-select v-model="hasGiftSearch" clearable placeholder="是否有赠品">
              <el-option
                v-for="item in hasGiftOptions"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
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
      <el-button @click.native="goToForward('rechargeSaleCardAdd')" type="success">新增</el-button>
    </div>
  </div>

  <el-tabs v-model="activeName" style="width:100%" @tab-click="onTabClick">
    <el-tab-pane label="上架" name="tab1"></el-tab-pane>
    <el-tab-pane label="下架" name="tab2"></el-tab-pane>
    <el-tab-pane label="已删除" name="tab3"></el-tab-pane>
  </el-tabs>
  <div class="_table-container">
    <div class="_table-list">
    	<el-table :data="dataList" stripe style="width: 100%" border @sort-change="changeSort">
        <el-table-column align='center' property="cardId" label="编号" width="110" sortable="'custom'"></el-table-column>
        <el-table-column align='center' property="saleCardName" label="销售卡名称" min-width="130" sortable="'custom'"></el-table-column>
        <el-table-column align='center' property="cardPrice" label="卡面额(元)" width="130" sortable="'custom'"></el-table-column>
        <el-table-column align='center' property="salePrice" label="销售价(元)" width="140" sortable="'custom'"></el-table-column>
        <el-table-column align='center' property="isHot_str" label="推荐" width="130" sortable="'custom'"></el-table-column>
        <el-table-column align='center' property="countNumber_str" label="发行量/库存/销售量" min-width="140"></el-table-column>
        <el-table-column align='center' property="orderPayLimit_str" label="订单支付比例" width="150" sortable="'custom'"></el-table-column>
        <el-table-column align='center' property="day_str" label="有效期" width="220"></el-table-column>
        <el-table-column align='center' inline-template label="操作" width="260">
        	<div>
            <el-button size="mini" type="success"   @click.native="goToForward('rechargeSaleCardItemList',row)">已售</el-button>
            <el-button size="mini" type="success"   @click.native="goToForward('rechargeSaleCardDetail',row)">详细</el-button>
            <el-button size="mini" type="danger"    @click.native="modifyRechargeSaleCardStatusCode(row)" v-if="row.statusCode===1 && activeName!='tab3'">下架</el-button>
            <el-button size="mini" type="info"      @click.native="modifyRechargeSaleCardStatusCode(row)" v-if="row.statusCode===0 && activeName!='tab3'">上架</el-button>
            <el-button size="mini" type="warning"   @click.native="goToForward('rechargeSaleCardModify',row)" v-if="row.statusCode===0 && activeName!='tab3'">修改</el-button>
            <el-button size="mini" type="danger"    @click.native="deleteRechargeSaleCard(row)" v-if="row.statusCode===0 && activeName!='tab3'">删除</el-button>
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
  import { getMallRechargeSaleCardList, deleteMallRechargeSaleCard,modifyMallRechargeSaleCard } from 'src/vuex/actions/rechargeSaleCardAction'
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
      	rechargeSaleCardObj:{},
        activeName:'tab1',
        dataList:[],
        pageNo :1,
        pageSize :10,
        total: 0,
        orderByKey:'sortIndex',
        orderByValue:'ASC',
        saleCardNameSearch:'',
        isHotSearch:'',
        isHotOptions:[
        	{value: '0', label: '不推荐'},{value: '1',label: '推荐'},
        ],
        hasGiftSearch:'',
        hasGiftOptions:[
        	{value: '0',label: '无赠品'},{value: '1',label: '有赠品'},
        ],
        useStatusSearch:'',
        useStatusOptions:[
        	{value: '0',label: '未使用'},{value: '1',label: '使用中'},{value: '2',label: '已用完'},
        ],
        statusCode:1,
        deleteFlag:0,
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
    	if(typeof this.obj.cardParam.activeName !='undefined'){
    		this.activeName = this.obj.cardParam.activeName;
    	}
    	if(typeof this.obj.cardParam.statusCode !='undefined'){
    		this.statusCode = this.obj.cardParam.statusCode;
    	}
    	if(typeof this.obj.cardParam.deleteFlag !='undefined'){
    		this.deleteFlag = this.obj.cardParam.deleteFlag;
    	}
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
    	if(typeof this.obj.cardParam.saleCardNameSearch !='undefined'){
    		this.saleCardNameSearch = this.obj.cardParam.saleCardNameSearch;
    	}
    	if(typeof this.obj.cardParam.isHotSearch !='undefined'){
    		this.isHotSearch = this.obj.cardParam.isHotSearch;
    	}
    	if(typeof this.obj.cardParam.hasGiftSearch !='undefined'){
    		this.hasGiftSearch = this.obj.cardParam.hasGiftSearch;
    	}
    	if(typeof this.obj.cardParam.useStatusSearch !='undefined'){
    		this.useStatusSearch = this.obj.cardParam.useStatusSearch;
    	}
      this.loadData();
    },
    methods:{
    	onTabClick(tab){
        this.activeName=tab.name;
        if(tab.name==='tab1'){
          this.pageNo = 1
          this.statusCode=1
          this.deleteFlag=0
        }else if(tab.name==='tab2'){
          this.pageNo = 1
          this.statusCode=0
          this.deleteFlag=0
        }else if(tab.name==='tab3'){
          this.pageNo = 1
          this.statusCode=''
          this.deleteFlag=1
        }
        this.loadData()
      },
      loadData(){
        var param ={
        	 pageNo: this.pageNo
        	,pageSize: this.pageSize
        	,orderByKey: this.orderByKey
        	,orderByValue: this.orderByValue
        	,saleCardName: this.saleCardNameSearch
        	,isHot: this.isHotSearch
        	,hasGift: this.hasGiftSearch
        	,useStatus: this.useStatusSearch
        	,statusCode: this.statusCode
          ,deleteFlag: this.deleteFlag
        };
        this.loading = true;
        getMallRechargeSaleCardList(param).then((data) => {
        	this.loading = false;
            const {success,result}=data;
            //console.log(JSON.stringify(result))
            if(success){
                this.dataList = result.rows ;
                this.dataList.forEach(function(item){
                	item.beginDay_str = dateFormat(item.beginDay,'yyyy-MM-dd');
                	item.endDay_str = dateFormat(item.endDay,'yyyy-MM-dd');
                	item.createdDtm_str = dateFormat(item.createdDtm,'yyyy-MM-dd HH:mm:ss');
                	item.isHot_str = item.isHot==1?'是':'否';
                	item.day_str = item.timeLimitType==0?'从'+item.beginDay_str+'到'+item.endDay_str : item.dayNumber+'天';
                	item.countNumber_str = item.countNumber +' / '+ item.stockNumber +' / '+ item.useNumber;
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
      modifyRechargeSaleCardStatusCode(row){
        this.$confirm('确定把该网销卡'+(row.statusCode==1?'下架':'上架')+'么？', '提示', {
          type: 'warning'
        }).then(() => {//确定
           var param ={
             cardId: row.cardId,
             statusCode: row.statusCode==1?0:1,
          };
          modifyMallRechargeSaleCard(param).then((data) => {
              const {success,msg,result}=data;
              this.$message({
                type: success? 'success':'error',
                message: msg
            });
              if(success){
                //row.statusCode = param.statusCode;
                //row.statusCode_str = row.statusCode==1? '启用' : '停用';
                for(var i=0,li=this.dataList.length; i<li; i++){
                  if(this.dataList[i].cardId==row.cardId){
                    this.dataList.splice(i,1);
                    break;
                  }
                }
              }
          }); 
          
        }).catch(() => {//取消
                    
        });
         
      },
      deleteRechargeSaleCard(row){
      	this.$confirm('确定把该网销卡删除么？', '提示', {
          type: 'warning'
        }).then(() => {//确定
        	 var param ={
	        	 cardId: row.cardId
	        	,companyId: this.supplierID
	        };
	        deleteMallRechargeSaleCard(param).then((data) => {
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
      	this.obj.cardParam.activeName = this.activeName;
      	this.obj.cardParam.statusCode = this.statusCode;
      	this.obj.cardParam.deleteFlag = this.deleteFlag;
      	this.obj.cardParam.pageNo = this.pageNo;
      	this.obj.cardParam.pageSize = this.pageSize;
      	this.obj.cardParam.orderByKey = this.orderByKey;
      	this.obj.cardParam.orderByValue = this.orderByValue;
      	this.obj.cardParam.saleCardNameSearch = this.saleCardNameSearch;
      	this.obj.cardParam.isHotSearch = this.isHotSearch;
      	this.obj.cardParam.hasGiftSearch = this.hasGiftSearch;
      	this.obj.cardParam.useStatusSearch = this.useStatusSearch;
    	
      	this.obj.card = row;
      	this.$emit('forward', url, this.obj);
      },
      //**********************   
    }
  }
</script>
