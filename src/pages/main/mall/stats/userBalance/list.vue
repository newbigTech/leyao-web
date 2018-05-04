<template>
<div class="_container">
  <card-panel>
    <span slot="title">整体概况</span>
    <div slot="panel-btns"></div>
    <div slot="panel-body">
			<div id="iDiv_sale_data_pie" style="height:500px"></div>
  	</div>
  </card-panel>
  <card-panel style="margin-top:15px;">
    <span slot="title">用户清单</span>
    <div slot="panel-btns"></div>
    <div slot="panel-body">
      <el-tabs v-model="activeName" style="width:100%" @tab-click="onTabClick">
        <el-tab-pane label="余额用户" name="tab1"></el-tab-pane>
        <el-tab-pane label="充值卡用户" name="tab2"></el-tab-pane>
        <el-tab-pane label="网销卡用户" name="tab3"></el-tab-pane>
      </el-tabs>
			<div class="_table-container"> 
          <div class="_table-list">
            <el-table :data="dataList" stripe style="width: 100%" border>
              <el-table-column align="center" property="userId" label="用户编号"></el-table-column>
              <el-table-column align="center" property="userAlias" label="用户名"></el-table-column>
							<el-table-column align="center" property="userMobile" label="手机号码"></el-table-column>
              <el-table-column align="center" property="balance" label="余额"></el-table-column>
              <!-- 充值/网销卡 -->
              <el-table-column v-if="activeName == 'tab2'" align="center" property="cardNo" label="卡号"></el-table-column>
              <el-table-column v-if="activeName == 'tab3'" align="center" property="orderNo" label="订单号"></el-table-column>
              <el-table-column v-if="activeName != 'tab1'" align="center" label="有效期">
              	<template scope="scope">
			            		<span>{{dateFormat_(scope.row.beginDay,'yyyy-MM-dd')}}至{{dateFormat_(scope.row.endDay,'yyyy-MM-dd')}}</span>
			            	</template>
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
  </card-panel>
</div>   

</template>
<style scoped>
  /*.el-form--inline .el-form-item {
    vertical-align: baseline;
  }*/
  .item {
	  margin-top: 10px;
	  margin-right: 40px;
	}
	
</style>
<script>
	import echarts from 'echarts'
  import { 
    getUserBalanceStats,
    getUserBalanceList,
    getRechargeCardItemList,
  } from 'src/vuex/actions/statsAction'
	import { mapGetters } from 'vuex'
  import {dateFormat} from 'lib/utils/dateFormat.js'
  export default {
    components: {
    },
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
      	activeName:'tab1',
      	dataList:[],
        pageNo :1,
        pageSize :10,
        total: 0,
        cardItemType:null,
      	myChart:{},
      	dateFormat_:dateFormat,
      }
    },
    created(){
	    this.searchStatsDataList();
	    this.searchDataList();
    },
    methods:{
    	onTabClick(tab){
        this.activeName=tab.name;
          this.pageNo = 1
        if(tab.name==='tab1'){
          this.cardItemType = null
        }else if(tab.name==='tab2'){
          this.cardItemType = 0
        }else if(tab.name==='tab3'){
          this.cardItemType = 1
        }
        this.loadData()
      },
      loadData(){
        var param ={
           pageNo: this.pageNo
          ,pageSize: this.pageSize
          ,supplierId: this.obj.supplierId
          ,cardItemType:this.cardItemType
        };
        this.loading = true;
        var cb = (data)=>{
          this.loading = false;
            const {success,result}=data;
            if(success){
                this.dataList = result.rows ;
                this.dataList.forEach((item) => {
                  
                });
                if(this.pageNo <=1){//因为只有第一页带总记录数
                  this.total = result.total;
                }
            }
        };
        if(this.activeName==='tab1'){
          getUserBalanceList(param).then(cb);
        }else{
          getRechargeCardItemList(param).then(cb);
        }
        
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
      searchStatsDataList(){
        var param = {
           supplierId: this.obj.supplierId
        };
        this.loading = true;
        getUserBalanceStats(param).then((data) => {
          this.loading = false;
            const {success,result}=data;
            //console.log(JSON.stringify(result))
            if(success){
                this.statsList = result ;
                this.drawPie();
            }
        });
      },
      
      drawPie(){//画线条
      	
      	var userBalance = 0;
      	var rechargeCardBalance = 0;
      	var rechargeSaleCardBalance = 0;
      	
      	
      	if(this.statsList && this.statsList.length >0){
      		var pieData = this.statsList_1[0];
      		userBalance = pieData.userBalance;
      		rechargeCardBalance = pieData.rechargeCardBalance;
      		rechargeSaleCardBalance = pieData.rechargeSaleCardBalance;
      	}
      	
    		this.myChart.setOption({
		      title: {
		        text: '用户余额统计',
		        x: 'center',
		        y: 'center' 
		      },
			    tooltip : {
		        trigger: 'item',
		        show:false,
		        formatter: "{b} : {c} ({d}%)"
			    },
		      legend: {
		        x: 'center',
		        y: 'bottom'
		      },
          label: {
              normal: {
                  formatter: [
                      '{name|{b} : {c} ({d}%)}'
                  ].join('\n'),
                  backgroundColor: '#eee',
                  borderColor: '#777',
                  borderWidth: 1,
                  borderRadius: 4,
                  rich: {
                      name: {
                          padding: [10, 10, 10, 10],
                          color:'#666',
                          align: 'left'
                      },
                  }
              }
          },
			    series: [
		        {
	            name:'余额统计',
	            type:'pie',
	            color:['#86D560', '#AF89D6', '#59ADF3', '#FF999A', '#FFCC67'],
	            roseType: 'radius',
          		center: ['50%', '50%'],
              radius: ['35%', '55%'],
	            data:[
	                {value:userBalance, name:'充值余额'},
	                {value:rechargeCardBalance, name:'充值卡余额'},
	                {value:rechargeSaleCardBalance, name:'网销卡余额'},
	            ]
		        },
		        
			    ]
	    	});
      },
      echartsResize(){
      this.myChart.resize();
      },
      
      //**********************   
    },
    beforeDestroy(){
    	window.removeEventListener("resize", this.echartsResize);
    },
    mounted() {
	    // 基于准备好的dom，初始化echarts实例
	    this.myChart = echarts.init(document.getElementById('iDiv_sale_data_pie'));
	    
	    window.addEventListener("resize", this.echartsResize);
	    
    }
  }
</script>
