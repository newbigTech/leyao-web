<template>
<div class="_container">
  <card-panel>
    <span slot="title">整体分析</span>
    <div slot="panel-btns"></div>
    <div slot="panel-body">
      <div class="_setting-bar">
		    <div class="_query-form">
		      <div class="_query-form-item">
		        <el-form :inline="true">

		          <el-form-item style="width:200px;">
		            <el-radio-group v-model="statsTypeStr_1" @change="changeStatsType_1">
							    <el-radio-button :label="statsTypeList[0]"></el-radio-button>
							    <el-radio-button :label="statsTypeList[1]"></el-radio-button>
							    <el-radio-button :label="statsTypeList[2]"></el-radio-button>
							  </el-radio-group>
		          </el-form-item>
		          <el-form-item>
		           <el-date-picker
                style="width: 168px;"
                v-model="beginDaySearch_1"
                :clearable=false
                :editable=false
                type="date"
                placeholder="显示日期"
                :picker-options="pickerOptions_1">
               </el-date-picker>
		          </el-form-item>
		          <el-form-item style="width: auto;">
		            <el-button @click.native="searchDataList_1">查询</el-button>
		          </el-form-item>
		        </el-form>
		      </div>
		    </div>
		    <div class="_actions-btn" :style="{width: '100px'}">
		     <el-button @click.native="showStatsDetail_1()" type="info">统计清单</el-button>
		    </div>
		  </div>
			<div id="iDiv_sale_data_pie" style="height:300px"></div>
  	</div>
  </card-panel>
  <card-panel style="margin-top:15px;">
    <span slot="title">线性统计</span>
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
			<div id="iDiv_sale_data_line" style="height:500px"></div>
  	</div>
  </card-panel>
   
  <!--Dialog-->
  <el-dialog title="统计清单" size="full" v-model="shopDetailDialog">
    <detail-dailog ref="detailDailog" :parentObj="parentObj"></detail-dailog>
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
    getRechargeStats, 
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
      	myChart:{},
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
      	myChart_1:{},
        statsList_1:[],
        beginDaySearch_1: lastDay,
        statsTypeStr_1:'日报',
        statsType_1:0,
        defStatsType_1:0,//用于记录点击是否发生变动
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
        pickerOptions_1: {
        	disabledDate(time){
            return time.getTime() > _this.lastDate.getTime();
          }
        },
        
        lineData:[
        	{key:'rechargeAllNumber',            value:'充值订单笔数',       show:false},
        	{key:'rechargeValidNumber',          value:'充值有效订单笔数',   show:true},
        	{key:'rechargeAllPrice',             value:'充值订单金额',       show:false},
        	{key:'rechargeValidPrice',           value:'充值有效订单金额',   show:true},
        	{key:'rechargeCardBindNumber',       value:'充值卡绑定数量',     show:true},
        	{key:'rechargeCardBindPrice',        value:'充值卡绑定金额',     show:true},
        	{key:'rechargeSaleCardAllNumber',    value:'网销卡订单笔数',     show:false},
        	{key:'rechargeSaleCardValidNumber',  value:'网销卡有效订单笔数', show:true},
        	{key:'rechargeSaleCardAllPrice',     value:'网销卡订单金额',     show:false},
        	{key:'rechargeSaleCardValidPrice',   value:'网销卡有效订单金额', show:true},
        ],
        eColor:[
          '#9987c2','#edc16b','#b2b8c1','#e77a6b','#b2a1e1','#f69f8b',
          '#b8a68b','#db6f79','#f1838f','#73d2b8','#61d293','#7cabe6'
        ],
      }
    },
    created(){
	    this.lineData.forEach((item)=>{
	    	this.legendSelected[item.value] = item.show;
	    	this.legendData.push(item.value);
	    });
	    this.searchDataList_1();
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
    	changeStatsType_1(v){
    		
    		for(var i=0,li=this.statsTypeList.length; i<li; i++){
    			if(this.statsTypeStr_1 == this.statsTypeList[i]){
    				this.statsType_1 = i;
    				break;
    			}
    		}
    		if(this.defStatsType_1 != this.statsType_1){//切换了才去加载数据
    			this.defStatsType_1 = this.statsType_1;
    			this.searchDataList_1();
    		}
    		
    	},
    	showStatsDetail(){
      	this.parentObj = {
      		beginDaySearch: this.beginDaySearch,
      		endDaySearch: this.endDaySearch,
      		supplierId: this.obj.supplierId,
      		shopId: this.obj.shopId,
      	};
        setTimeout(()=>{
        	this.shopDetailDialog = true;
        	if(this.$refs.detailDailog){
        		this.$refs.detailDailog.beginDaySearch = this.beginDaySearch;
        		this.$refs.detailDailog.endDaySearch = this.endDaySearch;
        	}
        },0)
    	},
    	showStatsDetail_1(){
      	this.parentObj = {
      		beginDaySearch: this.beginDaySearch_1,
      		endDaySearch: this.beginDaySearch_1,
      		supplierId: this.obj.supplierId,
      		shopId: this.obj.shopId,
      	};
        setTimeout(()=>{
        	this.shopDetailDialog = true;
        	if(this.$refs.detailDailog){
        		this.$refs.detailDailog.beginDaySearch = this.beginDaySearch_1;
        		this.$refs.detailDailog.endDaySearch = this.beginDaySearch_1;
        	}
        },0)
    	},
    	
      searchDataList_1(){
        var param = {
           supplierId: this.obj.supplierId
          ,shopId: this.obj.shopId
          ,statsType: this.statsType_1
          ,beginDay:dateFormat(this.beginDaySearch_1,'yyyy-MM-dd')
          ,endDay: dateFormat(this.beginDaySearch_1,'yyyy-MM-dd')
        };
        this.loading = true;
        getRechargeStats(param).then((data) => {
          this.loading = false;
            const {success,result}=data;
            //console.log(JSON.stringify(result))
            if(success){
                this.statsList_1 = result ;
                this.drawPie();
            }
        });
      },
      searchDataList(){
        var param = {
           supplierId: this.obj.supplierId
          ,shopId: this.obj.shopId
          ,statsType: this.statsType
          ,beginDay:dateFormat(this.beginDaySearch,'yyyy-MM-dd')
          ,endDay: dateFormat(this.endDaySearch,'yyyy-MM-dd')
        };
        this.loading = true;
        getRechargeStats(param).then((data) => {
          this.loading = false;
            const {success,result}=data;
            //console.log(JSON.stringify(result))
            if(success){
                this.statsList = result ;
                this.drawLine();
            }
        });
      },
      drawPie(){//画线条
      	var rechargeAllNumber = 0;
      	var rechargeAllPrice = 0;
      	var rechargeValidNumber = 0;
      	var rechargeValidPrice = 0;
      	var rechargeCardBindNumber = 0;
      	var rechargeCardBindPrice = 0;
      	var rechargeSaleCardAllNumber = 0;
      	var rechargeSaleCardAllPrice = 0;
      	var rechargeSaleCardValidNumber = 0;
      	var rechargeSaleCardValidPrice = 0;
      	var pieSeiesData = [];
      	if(this.statsList_1 && this.statsList_1.length >0){
      		var pieData = this.statsList_1[0];  
      		rechargeAllNumber = pieData.rechargeAllNumber;
      		rechargeAllPrice = pieData.rechargeAllPrice;
      		rechargeValidNumber = pieData.rechargeValidNumber;
      		rechargeValidPrice = pieData.rechargeValidPrice;
      		rechargeCardBindNumber = pieData.rechargeCardBindNumber;
      		rechargeCardBindPrice = pieData.rechargeCardBindPrice;
      		rechargeSaleCardAllNumber = pieData.rechargeSaleCardAllNumber;
      		rechargeSaleCardAllPrice = pieData.rechargeSaleCardAllPrice;
      		rechargeSaleCardValidNumber = pieData.rechargeSaleCardValidNumber;
      		rechargeSaleCardValidPrice = pieData.rechargeSaleCardValidPrice;
      		
      	}
      	
    		this.myChart_1.setOption({
			    tooltip : {
		        trigger: 'item',
		        formatter: "{b} : {c} ({d}%)"
			    },
			    grid: {
			        left: '2%',
			        right: '2%',
			    },
			    legend: {
			    		type:'scroll',
			        data:[/*'支付订单','取消订单','销售金额'*/]
			    },
			    color:this.eColor,
			    series: [
		        {
		            type: 'pie',
		            center: [10 + '%', '50%'],
		            radius: ['45%', '50%'],
		            label: {
						        normal: {
						            position: 'center',
						            formatter: function(params) {
						                if (params.name == "other")
						                    return "";
						                return rechargeAllNumber + '\n' + '充值订单笔数';
						            },
						            textStyle: {
						                fontStyle: 'normal',
						                fontWeight: 'normal',
						                fontSize: 14
						            }
						        }
						    },
		            data: [
		            	{
		                name: 'other',
		                value: rechargeAllNumber - rechargeValidNumber,
		                itemStyle:{ normal: {color: '#ccc'}}
		            	}, 
		            	{
		                name: '充值有效订单笔数',
		                value: rechargeValidNumber,
		            	},
		            ],
		        },
		        {
		            type: 'pie',
		            center: [27 + '%', '50%'],
		            radius: ['45%', '50%'],
		            label: {
						        normal: {
						            position: 'center',
						            formatter: function(params) {
						                if (params.name == "other")
						                    return "";
						                return rechargeAllPrice + '\n' + '充值订单金额';
						            },
						            textStyle: {
						                fontStyle: 'normal',
						                fontWeight: 'normal',
						                fontSize: 14
						            }
						        }
						    },
		            data: [
		            	{
		                name: 'other',
		                value: rechargeAllPrice - rechargeValidPrice,
		                itemStyle:{ normal: {color: '#ccc'}}
		            	}, 
		            	{
		                name: '充值有效订单金额',
		                value: rechargeValidPrice,
		            	},
		            ],
		        },
		        {
		            type: 'pie',
		            center: [45 + '%', '50%'],
		            radius: ['45%', '50%'],
		            label: {
						        normal: {
						            position: 'center',
						            formatter: function(params) {
						                if (params.name == "other")
						                    return "";
						                return rechargeCardBindNumber + '\n' + '充值卡绑定笔数';
						            },
						            textStyle: {
						                fontStyle: 'normal',
						                fontWeight: 'normal',
						                fontSize: 14
						            }
						        }
						    },
		            data: [
		            	{
		                name: 'other',
		                value: 0,
		                itemStyle:{ normal: {color: '#ccc'}}
		            	}, 
		            	{
		                name: '充值卡绑定笔数',
		                value: rechargeCardBindNumber,
		            	},
		            ],
		        },
		        {
		            type: 'pie',
		            center: [60 + '%', '50%'],
		            radius: ['45%', '50%'],
		            label: {
						        normal: {
						            position: 'center',
						            formatter: function(params) {
						                if (params.name == "other")
						                    return "";
						                return rechargeCardBindPrice + '\n' + '充值卡绑定金额';
						            },
						            textStyle: {
						                fontStyle: 'normal',
						                fontWeight: 'normal',
						                fontSize: 14
						            }
						        }
						    },
		            data: [
		            	{
		                name: 'other',
		                value: 0,
		                itemStyle:{ normal: {color: '#ccc'}}
		            	}, 
		            	{
		                name: '充值卡绑定金额',
		                value: rechargeCardBindPrice,
		            	},
		            ],
		        },
		        {
		            type: 'pie',
		            center: [75 + '%', '50%'],
		            radius: ['45%', '50%'],
		            label: {
						        normal: {
						            position: 'center',
						            formatter: function(params) {
						                if (params.name == "other")
						                    return "";
						                return rechargeSaleCardAllPrice + '\n' + '网销卡订单笔数';
						            },
						            textStyle: {
						                fontStyle: 'normal',
						                fontWeight: 'normal',
						                fontSize: 14
						            }
						        }
						    },
		            data: [
		            	{
		                name: 'other',
		                value: rechargeSaleCardAllPrice - rechargeSaleCardValidPrice,
		                itemStyle:{ normal: {color: '#ccc'}}
		            	}, 
		            	{
		                name: '网销卡有效订单笔数',
		                value: rechargeSaleCardValidPrice,
		            	},
		            ],
		        },
		        {
		            type: 'pie',
		            center: [90 + '%', '50%'],
		            radius: ['45%', '50%'],
		            label: {
						        normal: {
						            position: 'center',
						            formatter: function(params) {
						                if (params.name == "other")
						                    return "";
						                return rechargeSaleCardAllPrice + '\n' + '网销卡订单金额';
						            },
						            textStyle: {
						                fontStyle: 'normal',
						                fontWeight: 'normal',
						                fontSize: 14
						            }
						        }
						    },
		            data: [
		            	{
		                name: 'other',
		                value: rechargeSaleCardAllPrice - rechargeSaleCardValidPrice,
		                itemStyle:{ normal: {color: '#ccc'}}
		            	}, 
		            	{
		                name: '网销卡有效订单金额',
		                value: rechargeSaleCardValidPrice,
		            	},
		            ],
		        },
			    ]
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
      this.myChart_1.resize();
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
	    this.myChart = echarts.init(document.getElementById('iDiv_sale_data_line'));
	    this.myChart_1 = echarts.init(document.getElementById('iDiv_sale_data_pie'));
	    
	    window.addEventListener("resize", this.echartsResize);
	    
    }
  }
</script>
