<template>
<div class="_container">
  <!-- 查询条件 -->
  <div class="_setting-bar">
    <div class="_query-form">
      <div class="_query-form-item">
        <el-form :inline="true">
          <el-form-item>
            <el-input placeholder="订单号码" v-model="orderNoSearch"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="充值商品名" v-model="goodsNameSearch"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="购买人手机号查询" v-model="userMobileSearch"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="购买人用户名查询" v-model="userAliasSearch"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="购买人姓名查询" v-model="realNameSearch"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select v-model="rechargeTypeSearch" clearable placeholder="充值方式">
              <el-option
                v-for="item in rechargeTypeOptions"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="width: 375px;">
            <el-row type="flex" justify="space-between">
              <el-col :span="12">
                <el-date-picker
                  style="width: 180px;"
                  v-model="createdDtmStSearch"
                  type="datetime" clearable
                  placeholder="下单时间开始"
                  :picker-options="pickerOptions0">
                </el-date-picker>
              </el-col>
              <el-col :span="0" style="text-align: center; width: 15px;"> ~ </el-col>
              <el-col :span="12">
                <el-date-picker
                  style="width: 180px;"
                  v-model="createdDtmEtSearch"
                  type="datetime" clearable
                  placeholder="下单时间结束"
                  :picker-options="pickerOptions1">
                </el-date-picker>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item style="width: 75px;">
            <el-button @click.native="searchDataList">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>

  <el-tabs v-model="activeName" style="width:100%" @tab-click="onTabClick">
    <el-tab-pane label="待付款" name="tab0"></el-tab-pane>
    <el-tab-pane label="已完成" name="tab1"></el-tab-pane>
    <el-tab-pane label="已取消" name="tab2"></el-tab-pane>
  </el-tabs>
  <div class="_table-container">
    <div class="_table-list">
    	<el-table :data="dataList" stripe style="width: 100%" border @sort-change="changeSort">
        <!--<el-table-column align="center" property="orderId" label="编号" width="100" sortable="'custom'"></el-table-column>-->
        <el-table-column align="center" property="orderNo" label="订单号" min-width="200" sortable="'custom'"></el-table-column>
        <el-table-column align="center" property="amountPrice" label="实际金额" width="150" sortable="'custom'"></el-table-column>
        <el-table-column align="center" property="paymentPrice" label="支付金额" width="150" sortable="'custom'"></el-table-column>
        <el-table-column align="center" property="goodsName" label="网销卡名称" width="180" sortable="'custom'"></el-table-column>
        <el-table-column align="center" property="userMobile" label="购买人手机号" width="150" sortable="'custom'"></el-table-column>
        <el-table-column align="center" property="userAlias" label="购买人用户名" width="150" sortable="'custom'"></el-table-column>
        <el-table-column align="center" property="realName" label="购买人姓名" width="150" sortable="'custom'"></el-table-column>
        <el-table-column align="center" property="createdDtm_str" label="下单时间" width="200" sortable="'custom'"></el-table-column>
        <el-table-column align="center" property="rechargeType_str" label="充值方式" width="150"></el-table-column>
        <el-table-column align="center" inline-template label="关联赠送订单" width="130">
        	<div>
            <el-button v-if="row.giveOrderId && row.giveOrderId>0" size="mini" type="success" @click.native="goToForward('orderDetail',row)">查看赠送订单</el-button>
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
<script>
  import { getMallRechargeOrderList } from 'src/vuex/actions/rechargeCardAction'
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
      	activeName:'activeName',
      	loading:false,//遮罩层
      	rechargeCardTradeObj:{},
        dataList:[],
        pageNo :1,
        pageSize :10,
        total: 0,
        orderByKey:'',
        orderByValue:'',
        orderCodeSearch:'',
        orderIdSearch:'',
        orderNoSearch:'',
        goodsNameSearch:'',
        userMobileSearch:'',
        userAliasSearch:'',
        realNameSearch:'',
        rechargeTypeSearch:'',
        rechargeTypeOptions:[
        	{
        		value: 'WEIXIN',
            label: '微信'
          },{
        		value: 'ALIPAY',
            label: '支付宝'
          },
        ],
        createdDtmStSearch:'',
        createdDtmEtSearch:'',
        pickerOptions0: {
        	disabledDate(time){
            return _this.createdDtmEtSearch == '' || typeof _this.createdDtmEtSearch=='undefined'?false:time.getTime() > _this.createdDtmEtSearch.getTime();
          }
        },
        pickerOptions1: {
          disabledDate(time){
            return _this.createdDtmStSearch == '' || typeof _this.createdDtmStSearch=='undefined'?false:time.getTime() < _this.createdDtmStSearch.getTime();
          }
        },
      }
    },
    created(){
    	if(typeof this.obj.orderParam.pageNo !='undefined'){
    		this.pageNo = this.obj.orderParam.pageNo;
    	}
    	if(typeof this.obj.orderParam.pageSize !='undefined'){
    		this.pageSize = this.obj.orderParam.pageSize;
    	}
    	if(typeof this.obj.orderParam.orderByKey !='undefined'){
    		this.orderByKey = this.obj.orderParam.orderByKey;
    	}
    	if(typeof this.obj.orderParam.orderByValue !='undefined'){
    		this.orderByValue = this.obj.orderParam.orderByValue;
    	}
    	if(typeof this.obj.orderParam.orderCodeSearch !='undefined'){
    		this.orderCodeSearch = this.obj.orderParam.orderCodeSearch;
    	}
    	if(typeof this.obj.orderParam.orderIdSearch !='undefined'){
    		this.orderIdSearch = this.obj.orderParam.orderIdSearch;
    	}
    	if(typeof this.obj.orderParam.orderNoSearch !='undefined'){
    		this.orderNoSearch = this.obj.orderParam.orderNoSearch;
    	}
    	if(typeof this.obj.orderParam.goodsNameSearch !='undefined'){
    		this.goodsNameSearch = this.obj.orderParam.goodsNameSearch;
    	}
    	if(typeof this.obj.orderParam.userMobileSearch !='undefined'){
    		this.userMobileSearch = this.obj.orderParam.userMobileSearch;
    	}
    	if(typeof this.obj.orderParam.userAliasSearch !='undefined'){
    		this.userAliasSearch = this.obj.orderParam.userAliasSearch;
    	}
    	if(typeof this.obj.orderParam.realNameSearch !='undefined'){
    		this.realNameSearch = this.obj.orderParam.realNameSearch;
    	}
    	if(typeof this.obj.orderParam.rechargeTypeSearch !='undefined'){
    		this.rechargeTypeSearch = this.obj.orderParam.rechargeTypeSearch;
    	}
    	if(typeof this.obj.orderParam.createdDtmStSearch !='undefined'){
    		this.createdDtmStSearch = this.obj.orderParam.createdDtmStSearch;
    	}
    	if(typeof this.obj.orderParam.createdDtmEtSearch !='undefined'){
    		this.createdDtmEtSearch = this.obj.orderParam.createdDtmEtSearch;
    	}

      this.onTabClick({name:'tab1'});
    },
    methods:{
    	onTabClick(tab){
        this.activeName=tab.name;
    		this.obj.activeName = this.activeName;
        if(tab.name==='tab1'){
          this.pageNo = 1
          this.orderCodeSearch=6
        }else if(tab.name==='tab2'){
          this.pageNo = 1
          this.orderCodeSearch=99
        }else if(tab.name==='tab0'){
          this.pageNo = 1
          this.orderCodeSearch=3
        }
        this.loadData();
      },
      loadData(){
        var param ={
        	 pageNo: this.pageNo
        	,pageSize: this.pageSize
        	,orderByKey: this.orderByKey
        	,orderByValue: this.orderByValue
        	,orderType:6
        	,asOrderType:7
        	,orderCode: this.orderCodeSearch
        	,orderId: this.orderIdSearch
        	,orderNo: this.orderNoSearch
        	,goodsName: this.goodsNameSearch
        	,userMobile: this.userMobileSearch
        	,userAlias: this.userAliasSearch
        	,realName: this.realNameSearch
        	,rechargeType: this.rechargeTypeSearch
        	,createdDtmSt: this.createdDtmStSearch=="" || typeof this.createdDtmStSearch=='undefined'? "":dateFormat(this.createdDtmStSearch,'yyyy-MM-dd HH:mm:ss')
        	,createdDtmEt: this.createdDtmEtSearch=="" || typeof this.createdDtmEtSearch=='undefined'? "":dateFormat(this.createdDtmEtSearch,'yyyy-MM-dd HH:mm:ss')
        };
        this.loading = true;
        getMallRechargeOrderList(param).then((data) => {
        	this.loading = false;
            const {success,result}=data;
            //console.log(JSON.stringify(result))
            if(success){
                this.dataList = result.rows ;
                this.dataList.forEach((item)=>{
                	item.createdDtm_str = dateFormat(item.createdDtm,'yyyy-MM-dd HH:mm:ss');
                	item.rechargeType_str = '其它'
                	this.rechargeTypeOptions.forEach((it)=>{
                		if(item.rechargeType == it.value){
                			item.rechargeType_str = it.label;
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
      goToForward(url,row){
      	this.obj.orderParam.pageNo = this.pageNo;
      	this.obj.orderParam.pageSize = this.pageSize;
      	this.obj.orderParam.orderByKey = this.orderByKey;
      	this.obj.orderParam.orderByValue = this.orderByValue;
      	this.obj.orderParam.orderCodeSearch = this.orderCodeSearch;
      	this.obj.orderParam.orderIdSearch = this.orderIdSearch;
      	this.obj.orderParam.orderNoSearch = this.orderNoSearch;
      	this.obj.orderParam.goodsNameSearch = this.goodsNameSearch;
      	this.obj.orderParam.userMobileSearch = this.userMobileSearch;
      	this.obj.orderParam.userAliasSearch = this.userAliasSearch;
      	this.obj.orderParam.realNameSearch = this.realNameSearch;
      	this.obj.orderParam.rechargeTypeSearch = this.rechargeTypeSearch;
      	this.obj.orderParam.createdDtmStSearch = this.createdDtmStSearch;
      	this.obj.orderParam.createdDtmEtSearch = this.createdDtmEtSearch;

      	this.obj.order = {orderId:row.giveOrderId};
      	this.$emit('forward', url, this.obj);
      },
      //**********************
    }
  }
</script>
