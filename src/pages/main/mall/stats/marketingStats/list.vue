<template>
<div class="_container">
  <card-panel>
    <span slot="title">线性分析</span>
    <div slot="panel-btns"></div>
    <div slot="panel-body">
      <div class="_setting-bar">
		    <div class="_query-form">
		      <div class="_query-form-item">
		        <el-form :inline="true">
		          <el-form-item style="width:200px;">
		            <el-radio-group v-model="statsTypeStr" @change="changeStatsType">
							    <el-radio-button :label="statsTypeList[0]"></el-radio-button>
							    <el-radio-button :label="statsTypeList[1]"></el-radio-button>
							    <el-radio-button :label="statsTypeList[2]"></el-radio-button>
							  </el-radio-group>
		          </el-form-item>
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
		                v-for="item in obj.orderTypeList"
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
		    <div class="_actions-btn" :style="{width: '100px'}">
		     <el-button @click.native="showStatsDetail()" type="info">统计清单</el-button>
		    </div>
		  </div>
			<div id="iDiv_marketing_stats_line" style="height:500px"></div>
  	</div>
  </card-panel>
  <!--Dialog-->
  <el-dialog title="统计清单" size="full" v-model="shopDetailDialog">
    <detail-dailog :parentObj="parentObj"></detail-dailog>
  </el-dialog>
  
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
    getMarketingStats, 
  } from 'src/vuex/actions/statsAction'
  import DetailDailog from './detail-dailog'
	import { mapGetters } from 'vuex'
  import {dateFormat} from 'lib/utils/dateFormat.js'
  export default {
    components: {
      DetailDailog
    },
    props: {
      obj: {
        type: Object,
        default: {}
      }
    },
    data(){
    	var _this = this;
    	var date = new Date();
    	var lastDay = new Date(date.getTime()-1*24*60*60*1000);
    	var firstDay = new Date(lastDay.getTime()-30*24*60*60*1000);//30天
    	var lastWeek = new Date(date.getTime() - date.getDay()*24*60*60*1000);
    	var firstWeek = new Date(lastWeek.getTime()-(12*7-1)*24*60*60*1000);//12周
    	var lastMonth = new Date(date.getTime() - date.getDate()*24*60*60*1000);
    	var _lm = new Date(date.getTime() - date.getDate()*24*60*60*1000);
    	_lm.setMonth(_lm.getMonth() - 12);
    	var _fm = new Date(_lm.getTime());//12月
    	var firstMonth = new Date(_fm.getFullYear(),_fm.getMonth(),1);
      return {
      	loading:false,//遮罩层
      	shopDetailDialog:false,
      	legendSelected:{},
      	legendData:[],
      	myLineChart:{},
      	statsList:[],
      	lastDate:lastDay,
      	lastDay:lastDay,
      	firstDay:firstDay,
      	lastWeek:lastWeek,
      	firstWeek:firstWeek,
      	lastMonth:lastMonth,
      	firstMonth:firstMonth,
        beginDaySearch: firstDay,
        endDaySearch: lastDay,
        statsTypeList:['日报','周报','月报'],
        statsTypeStr:'日报',
        statsType:0,
        defStatsType:0,//用于记录点击是否发生变动
        orderType:_this.obj.orderTypeList[0].value,
        parentObj:{},
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

        lineData:[
        	{key:'orderUserNumber',  value:'下单人数',        show:true},
        	{key:'orderNumber',      value:'下单笔数',        show:true},
        	{key:'totalPrice',       value:'下单金额',        show:false},
        	{key:'amountPrice',      value:'下单金额',        show:true},
        	{key:'accountPrice',     value:'余额付款金额',    show:false},
        	{key:'rechargeCardPrice',value:'充值卡付款金额',  show:false},
        	{key:'weiXinPrice',      value:'微信付款金额',    show:false},
        	{key:'aliPayPrice',      value:'支付宝付款金额',  show:false},
        	{key:'activityPrice',    value:'活动优惠金额',    show:false},
        	{key:'vipPrice',         value:'特权优惠金额',    show:false},
        	{key:'couponsPrice',     value:'优惠卷金额',      show:false},
        	{key:'pointPrice',       value:'积分抵扣金额',    show:false},
        	{key:'alterPostPrice',   value:'修改邮费优惠金额',show:false},
        	{key:'alterPrice',       value:'修改优惠金额',    show:false},
        	{key:'totalCouponsPrice',value:'总优惠金额',      show:true},
        	{key:'paymentPrice',     value:'订单支付金额',    show:false},
        ],
        eColor:[
        	'#9987c2','#edc16b','#b8a68b','#e77a6b',
					'#db6f79','#f1838f','#73d2b8','#61d293',
					'#7cabe6','#b2b8c1','#b2a1e1','#fbc0ab',
					'#fbabb3','#a0e6cc','#accef8','#f6e88b','#f69f8b',
        ],
      }
    },
    created(){
	    this.lineData.forEach((item)=>{
	    	this.legendSelected[item.value] = item.show;
	    	this.legendData.push(item.value);
	    });
	    
	    this.searchDataList();
    },
    methods:{
    	changeStatsType(v){
    		
    		for(var i=0,li=this.statsTypeList.length; i<li; i++){
    			if(this.statsTypeStr == this.statsTypeList[i]){
    				this.statsType = i;
    				break;
    			}
    		}
    		
    		switch(v){
    			case this.statsTypeList[0]: //日
    				this.beginDaySearch = this.firstDay;
        		this.endDaySearch = this.lastDay;
        		this.lastDate = this.endDaySearch;
    				break;
    			case this.statsTypeList[1]: //周
    				this.beginDaySearch = this.firstWeek;
        		this.endDaySearch = this.lastWeek;
        		this.lastDate = this.endDaySearch;
    				break;
    			case this.statsTypeList[2]: //月
    				this.beginDaySearch = this.firstMonth;
        		this.endDaySearch = this.lastMonth;
        		this.lastDate = this.endDaySearch;
    				break;
    			default:
    		}
    		if(this.defStatsType != this.statsType){//切换了才去加载数据
    			this.defStatsType = this.statsType;
    			this.searchDataList();
    		}
    	},
    	showStatsDetail(){
      	this.parentObj = {
      		beginDaySearch: this.beginDaySearch,
      		endDaySearch: this.endDaySearch,
      		supplierId: this.obj.supplierId,
      		shopId: this.obj.shopId,
      		orderType: this.orderType,
      		orderTypeList: this.obj.orderTypeList,
      		orderType: this.obj.orderTypeList[0].value,
      	};
        setTimeout(()=>{
        	this.shopDetailDialog = true;
        },0)
    	},
    	searchDataList(){
    		this.loadData();
    	},
      loadData(){
        var param ={
           supplierId: this.obj.supplierId
          ,shopId: this.obj.shopId
          ,statsType: this.statsType
          ,beginDay:dateFormat(this.beginDaySearch,'yyyy-MM-dd')
          ,endDay: dateFormat(this.endDaySearch,'yyyy-MM-dd')
          ,orderType: this.orderType
        };
        this.loading = true;
        getMarketingStats(param).then((data) => {
          this.loading = false;
            const {success,result}=data;
            //console.log(JSON.stringify(result))
            if(success){
                this.statsList = result ;
                this.drawLine();
            }
        });
      },
      drawLine(){//画线条
      	this.statsList.sort(function(a,b){
      		return a.statsDate < b.statsDate? -1:1;
      	});
      	var xAxisData = [];
      	var yAxis = [];
      	var seriesData =[];
      	this.lineData.forEach((item,index)=>{
		    	seriesData.push({
		    		myKey:item.key,//自定义字段
		    		name:item.value,
	          type:'line',
	          yAxisIndex: index,
	          width:3,//线条宽度
	          symbol:'circle',//拐点样式
            symbolSize: 8,//拐点大小
            smooth:true,//平滑
            itemStyle : {
                normal : {
                    lineStyle:{
                        width:3,//折线宽度
                        color:this.eColor[index]//折线颜色
                    }
                }
            },
	          data:[]
		    	});
		    	yAxis.push({
	            type: 'value',
		    			myKey:item.key,//自定义字段
	            name: item.value,
	            min: 0,
	            max: 250,//根据实际数据进行修改
	            show:false,
		      });
		    });
      	this.statsList.forEach((item)=>{
      		//添加x轴数据
      		xAxisData.push(item.statsDate);
      		seriesData.forEach((it,idx)=>{
      			it.data.push( item[it.myKey] );//根据字段添加相应数据
      		});
      		
      	});
      	//处理y轴最大值
      	var yMax;
      	seriesData.forEach((item,index)=>{
      		yMax = 10;
    			item.data.forEach((it,idx)=>{
    				if(it > yMax){
    					yMax = it;
    				}
    			});
    			yAxis[index].max = Math.ceil(1.2 * yMax);//y轴放大一些
    		});
    		this.myChart.setOption({
			    tooltip: {
			        trigger: 'axis',
			    },
			    grid: {
			        left: '3%',
			        right: '5%',
			    },
			    color:this.eColor,
			    toolbox: {
		        show: true,
		        orient:'vertical',
		        top:'20%',
		        right:'2%',
		        feature: {
	            dataZoom: {
	              yAxisIndex: 'none'
	            },
	            dataView: {readOnly: false},
	            magicType: {type: ['line', 'bar']},
	            restore: {},
	            saveAsImage: {}
		        }
			    },
			    legend: {
			    		type:'scroll',
			    	  selected:this.legendSelected,//{'下单人数':true,'下单笔数':false,'取消订单数':true,}
			        data:this.legendData,//['下单人数','下单笔数','取消订单数']
			    },
			    xAxis: [
			        {
			            type: 'category',
			            axisTick: {
			                alignWithLabel: true
			            },
			            boundaryGap:false,//坐标轴两边留白策略
			            data: xAxisData
			        }
			    ],
			    yAxis: yAxis,
			    series: seriesData
	    	});
      },
      echartsResize(){
      this.myChart.resize();
      },
      goToForward(url,row){
      	this.obj.obj = row;
      	this.$emit('forward', url, this.obj);
      },
      //**********************   
    },
    beforeDestroy(){
    	window.removeEventListener("resize", this.echartsResize);
    },
    mounted() {
	    // 基于准备好的dom，初始化echarts实例
	    this.myChart = echarts.init(document.getElementById('iDiv_marketing_stats_line'));
	    
	    window.addEventListener("resize", this.echartsResize);
	    
    }
  }
</script>
