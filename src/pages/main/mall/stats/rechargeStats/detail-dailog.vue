<template>
	<div>
    <div>
    	<el-form :inline="true">
          <el-form-item style="width:350px;">
           <el-row type="flex" justify="space-between">
             <el-col :span="12">
                <el-date-picker
                  style="width: 168px;"
                  v-model="beginDaySearch"
                  :clearable=false
                  :editable=false
                  type="date"
                  placeholder="起始日期"
                  :picker-options="pickerOptions0">
                 </el-date-picker>
             </el-col>
             <el-col :span="0" style="text-align: center; width: 15px;"> ~ </el-col>
             <el-col :span="12">
                <el-date-picker
                  style="width: 168px;"
                  v-model="endDaySearch"
                  :clearable=false
                  :editable=false
                  type="date"
                  placeholder="截止日期"
                  :picker-options="pickerOptions1">
                 </el-date-picker>
             </el-col>
           </el-row> 
          </el-form-item>
					<el-form-item>
            <el-select v-model="rechargeType" placeholder="类型">
              <el-option
                v-for="item in rechargeTypeList"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
					<el-form-item>
            <el-select v-model="rechargeStatus" placeholder="状态">
              <el-option
                v-for="item in rechargeStatusList"
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
    <div class="_table-container"> 
        <div class="_table-list">
          <el-table :data="dataList" stripe style="width: 100%" border @sort-change="changeSort">
          	<el-table-column type="expand">
				      <template scope="props">
				        <el-table v-if="props.row.rechargeType != 0" :data="props.row.itemList" stripe style="width: 100%" border>
			            <el-table-column property="tradeId" label="明细编号"></el-table-column>
			            <el-table-column property="orderId" label="对应订单编号"></el-table-column>
			            <el-table-column property="orderNo" label="对应订单号"></el-table-column>
			            <el-table-column align="right" property="price" label="交易金额"></el-table-column>
			            <el-table-column align="right" property="backPrice" label="退回金额"></el-table-column>
			            <el-table-column align="center" label="交易状态">
			            	<template scope="scope">
			            		<span>{{scope.row.statusCode==1? '交易成功':'交易锁定'}}</span>
			            	</template>
			            </el-table-column>
			            <el-table-column align="center" label="交易时间">
			            	<template scope="scope">
			            		<span>{{dateFormat_(scope.row.tradeDtm,'yyyy-MM-dd HH:mm:ss')}}</span>
			            	</template>
			            </el-table-column>
			          </el-table>
			          <div v-else style="text-align:center;color:red;">无消费明细信息</div>
				      </template>
				    </el-table-column>
            <el-table-column align="center" label="订单/卡号" sortable="'custom'">
            	<template scope="scope">
            		<span>{{scope.row.rechargeNo}}</span>
            	</template>
            </el-table-column>
            <el-table-column align="center" property="rechargeType_str" label="类型" sortable="'custom'"></el-table-column>
            <el-table-column align="center" property="userId_str" label="充值/绑定用户" sortable="'custom'"></el-table-column>
            <el-table-column align="right" property="rechargePrice" label="充值/卡金额" sortable="'custom'"></el-table-column>
            <el-table-column align="right" property="rechargeBalance" label="余额"></el-table-column>
            <el-table-column align="right" property="orderPayLimit" label="可支付比例(1-100)" sortable="'custom'"></el-table-column>
						<el-table-column align="center" label="状态" sortable="'custom'">
							<template scope="scope">
            		<span :style="scope.row.rechargeStatus==1? '':'color:red;'">{{scope.row.rechargeStatus_str}}</span>
            	</template>
						</el-table-column>
						<el-table-column align="center" property="rechargeDtm_str" label="充值/绑定/购买时间" sortable="'custom'"></el-table-column>
          </el-table>
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
<style>
	.unpayStyle{
		color:red;
		text-decoration:line-through;
	}
</style>
<script>
  import { 
    getRechargeStatsList, 
  } from 'src/vuex/actions/statsAction'
  import {dateFormat} from 'lib/utils/dateFormat.js'
  export default{
    props: {
        parentObj: {
            type: Object,
            require: true,
            default: {
            }
        }
    },
    data() {
      var _this = this;
    	var date = new Date();
    	var lastDay = new Date(date.getTime()-1*24*60*60*1000);
    	var firstDay = new Date(lastDay.getTime()-30*24*60*60*1000);//30天
      return {
      	dataList:[],
        pageNo :1,
        pageSize :20,
        total: 0,
        orderByKey:'',
        orderByValue:'',
        beginDaySearch: _this.parentObj.beginDaySearch || firstDay,
        endDaySearch: _this.parentObj.endDaySearch || lastDay,
        rechargeType: -1,
        rechargeStatus:-1,
        lastDate:lastDay,
        pickerOptions0: {
        	disabledDate(time){
            return time.getTime() > _this.endDaySearch.getTime() || (time.getTime() > _this.lastDate.getTime());
          }
        },
        pickerOptions1: {
          disabledDate(time){
            return time.getTime() < _this.beginDaySearch.getTime() || (time.getTime() > _this.lastDate.getTime());
          }
        },
        rechargeTypeList:[//清单类型 0 充值 1 充值卡 2 网销卡
        	{value: -1,label: '类型'},
        	{value: 0,label: '充值'},
        	{value: 1,label: '充值卡'},
        	{value: 2,label: '网销卡'},
        ],
        rechargeStatusList:[//-1支付状态 0 未支付 1 已支付
        	{value: -1,label: '状态'},
        	{value: 0,label: '失败'},
        	{value: 1,label: '成功'},
        ],
        dateFormat_:dateFormat,
      }
    },
    methods:{
      loadData(){
        var param ={
           pageNo: this.pageNo
          ,pageSize: this.pageSize
          ,orderByKey: this.orderByKey
          ,orderByValue: this.orderByValue
          ,supplierId: this.parentObj.supplierId
          ,shopId: this.parentObj.shopId
          ,beginDay:dateFormat(this.beginDaySearch,'yyyy-MM-dd')
          ,endDay: dateFormat(this.endDaySearch,'yyyy-MM-dd')
          ,rechargeType: this.rechargeType
          ,rechargeStatus:this.rechargeStatus
        };
        this.loading = true;
        getRechargeStatsList(param).then((data) => {
          this.loading = false;
            const {success,result}=data;
            //console.log(JSON.stringify(result))
            if(success){
                this.dataList = result.rows ;
                this.dataList.forEach((item) => {
                  item.rechargeDtm_str = dateFormat(item.rechargeDtm,'yyyy-MM-dd HH:mm:ss');
                  item.userId_str = item.userMobile || item.userAlias || (item.userId+'');
                  
                  item.rechargeType_str = '--';
                  this.rechargeTypeList.forEach((it)=>{
                  	if(item.rechargeType == it.value){
                  		item.rechargeType_str = it.label;
                  		return false;
                  	}
                  });
                  item.rechargeStatus_str = '';
                  if(item.rechargeType == 1){
                  	item.rechargeStatus_str = '绑定';
                  }else if(item.rechargeType == 2){
                  	item.rechargeStatus_str = '购买';
                  }else{
                  	item.rechargeStatus_str = '充值';
                  }
                  item.rechargeStatus_str += item.rechargeStatus == 1? '成功':'失败';
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
    },
    created() {
    	this.searchDataList();
    },
  }
</script>
