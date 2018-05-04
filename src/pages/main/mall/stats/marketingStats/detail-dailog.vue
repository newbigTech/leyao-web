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
                  placeholder="有效期起始"
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
                  placeholder="有效期截止"
                  :picker-options="pickerOptions1">
                 </el-date-picker>
             </el-col>
           </el-row> 
          </el-form-item>
					<el-form-item>
            <el-select v-model="orderType" placeholder="订单类型">
              <el-option
                v-for="item in parentObj.orderTypeList"
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
            <el-table-column fixed align="center" label="订单号" width="210" sortable="'custom'">
            	<template scope="scope">
            		<span>{{scope.row.orderNo}}</span>
            	</template>
            </el-table-column>
          	<el-table-column fixed type="expand">
				      <template scope="props">
				        <el-table :data="props.row.orderItemList" stripe style="margin-left:210px;width: 100%" border>
			            <el-table-column align="right" property="orderItemId" label="明细编号" width="100"></el-table-column>
			            <el-table-column align="center" label="商品/SKU编号" width="140">
			            	<template scope="scope">
			            		<span>{{scope.row.goodsId}}/{{scope.row.goodsSkuId}}</span>
			            	</template>
			            </el-table-column>
			            <el-table-column align="left" property="goodsName" label="商品名称" width="300"></el-table-column>
			            <el-table-column align="left" property="unitPrice" label="单价" width="90"></el-table-column>
			            <el-table-column align="right" property="number" label="购买数量" width="100"></el-table-column>
			            <el-table-column align="right" property="activityPrice" label="活动优惠" width="100"></el-table-column>
			            <el-table-column align="right" property="vipPrice" label="特权优惠" width="100"></el-table-column>
			            <el-table-column align="right" property="couponsPrice" label="优惠卷优惠" width="130"></el-table-column>
			            <el-table-column align="right" property="alterPrice" label="改后分摊金额" width="130"></el-table-column>
			            <el-table-column align="right" property="amountPrice" label="实际金额" width="100"></el-table-column>
			            <el-table-column align="right" property="orderAllotPrice" label="实际分摊" width="100"></el-table-column>
			          </el-table>
				      </template>
				    </el-table-column>
            <el-table-column align="center" property="orderType_str" label="订单类型" width="120" sortable="'custom'"></el-table-column>
            <el-table-column align="center" property="userId_str" label="下单人" width="140" sortable="'custom'"></el-table-column>
            <el-table-column align="right" property="totalPrice" label="明细金额" width="120" sortable="'custom'"></el-table-column>
            <el-table-column align="right" property="amountPrice" label="实际金额(含邮费)" width="170" sortable="'custom'"></el-table-column>
            <el-table-column align="right" property="postPrice" label="邮费" width="100" sortable="'custom'"></el-table-column>
            <el-table-column align="right" property="paymentPrice" label="支付金额" width="120" sortable="'custom'"></el-table-column>
            <el-table-column align="right" property="accountPrice" label="余额付款" width="120" sortable="'custom'"></el-table-column>
            <el-table-column align="right" property="rechargeCardPrice" label="充值卡付款" width="130" sortable="'custom'"></el-table-column>
            <el-table-column align="right" property="weiXinPrice" label="微信付款" width="120" sortable="'custom'"></el-table-column>
            <el-table-column align="right" property="aliPayPrice" label="支付宝付款" width="130" sortable="'custom'"></el-table-column>
            <el-table-column align="right" property="accountPrice" label="余额付款" width="120" sortable="'custom'"></el-table-column>
            <el-table-column align="right" property="activityPrice" label="活动优惠" width="120" sortable="'custom'"></el-table-column>
            <el-table-column align="right" property="vipPrice" label="特权优惠" width="120" sortable="'custom'"></el-table-column>
            <el-table-column align="right" property="couponsPrice" label="优惠卷" width="120" sortable="'custom'"></el-table-column>
            <el-table-column align="right" property="usePoint" label="积分数量" width="120" sortable="'custom'"></el-table-column>
            <el-table-column align="right" property="pointPrice" label="积分抵扣" width="120" sortable="'custom'"></el-table-column>
            <el-table-column align="right" property="totalCouponsPrice" label="总优惠" width="120" sortable="'custom'"></el-table-column>
            <el-table-column align="right" property="alterPostPrice" label="修改邮费优惠" width="150" sortable="'custom'"></el-table-column>
            <el-table-column align="right" property="alterPrice" label="修改优惠" width="120" sortable="'custom'"></el-table-column>
						<el-table-column fixed="right" align="center" property="orderDtm_str" label="下单时间" width="180" sortable="'custom'"></el-table-column>
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
    getMarketingStatsList, 
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
        orderType:_this.parentObj.orderType || -1,
        payStatus:1,
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
          ,orderType: this.orderType
          ,payStatus:this.payStatus
        };
        this.loading = true;
        getMarketingStatsList(param).then((data) => {
          this.loading = false;
            const {success,result}=data;
            //console.log(JSON.stringify(result))
            if(success){
                this.dataList = result.rows ;
                this.dataList.forEach((item) => {
                  item.orderDtm_str = dateFormat(item.orderDtm,'yyyy-MM-dd HH:mm:ss');
                  item.userId_str = item.userMobile || item.userAlias;
                  
                  item.orderType_str = '--';
                  this.parentObj.orderTypeList.forEach((it)=>{
                  	if(item.orderType == it.value){
                  		item.orderType_str = it.label;
                  		return false;
                  	}
                  });
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
