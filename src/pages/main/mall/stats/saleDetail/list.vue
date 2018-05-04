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
		  <el-row>
		  	<el-col :span="10">
		  		<div class="_table-container"> 
		        <div class="_table-list">
		          <el-table :data="dataList" height="500" stripe style="width: 100%;" border @sort-change="changeSort">
		            <el-table-column align="left" property="classifyName" label="分类名称" sortable="'custom'"></el-table-column>
		            <el-table-column align="right" property="goodsNumber" label="销售数量" sortable="'custom'"></el-table-column>
		            <el-table-column align="right" property="goodsNumberRate" label="数量比例" sortable="'custom'"></el-table-column>
		            <el-table-column align="right" property="goodsPrice" label="销售金额" sortable="'custom'"></el-table-column>
		            <el-table-column align="right" property="goodsPriceRate" label="金额比例" sortable="'custom'"></el-table-column>
		          </el-table>
		        </div>
		    </div>
		  	</el-col>
  			<el-col :span="14"><div id="iDiv_sale_data_pie" style="height:500px"></div></el-col>
		  </el-row>
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
		          <el-form-item style="margin-left:30px;width:130px;">
		            <el-radio-group v-model="goodsStatsTypeStr" @change="changeGoodsStatsType">
							    <el-radio-button :label="goodsStatsTypeList[0]"></el-radio-button>
							    <el-radio-button :label="goodsStatsTypeList[1]"></el-radio-button>
							  </el-radio-group>
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
    getSaleDetail, 
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
      	dataList:[],
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
        goodsStatsTypeList:['数量','金额'],
        goodsStatsTypeStr:'数量',
        goodsStatsType:0,
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
        
        eColor:[
        	'#9987c2','#edc16b','#b8a68b','#e77a6b',
					'#db6f79','#f1838f','#73d2b8','#61d293',
					'#7cabe6','#b2b8c1','#b2a1e1','#fbc0ab',
					'#fbabb3','#a0e6cc','#accef8','#f6e88b','#f69f8b',
        	'#FF3300','#FF9900','#FFFF00','#CCFF00',
					'#CC9900','#CC3300','#99FF00','#999900',
					'#009900','#003333','#006666','#00FF66',
					'#333366','#33CC66','#663366','#66CC66',
					'#FF3366','#99CC66','#CC3366','#CCCC66',
					'#993366','#FFCC66','#FFFF99','#FF9999',
					'#FF3399','#CCFF99','#CC9999','#99CC99',
					'#993399','#66FF99','#666699','#33FF99',
					'#336699','#00CC99','#003399','#0033CC',
					'#00CCCC','#3366CC','#33FFCC','#6666CC',
        	'#66FFCC','#9966CC','#CC33CC','#CCCCCC',
        	'#FF66CC','#FFFFCC','#0066FF','#00CCFF',
        	'#3366FF','#33CCFF','#6633FF','#6699FF',
        	'#66FFFF','#9900FF','#9966FF','#99CCFF',
        	'#CC00FF','#CC66FF','#CCFFFF','#FF66FF',
        ],
      }
    },
    created(){
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
    	changeGoodsStatsType(v){
    		
    		for(var i=0,li=this.goodsStatsTypeList.length; i<li; i++){
    			if(this.goodsStatsTypeStr == this.goodsStatsTypeList[i]){
    				this.goodsStatsType = i;
    				break;
    			}
    		}
        this.drawLine();
    		
    	},
    	showStatsDetail(){
      	this.parentObj = {
      		beginDaySearch: this.beginDaySearch,
      		endDaySearch: this.endDaySearch,
      		supplierId: this.obj.supplierId,
      		shopId: this.obj.shopId,
      		orderType: this.orderType,
      		orderTypeList: this.obj.orderTypeList,
      	};
        setTimeout(()=>{
        	this.shopDetailDialog = true;
        	if(this.$refs.detailDailog){
        		this.$refs.detailDailog.beginDaySearch = this.beginDaySearch;
        		this.$refs.detailDailog.endDaySearch = this.endDaySearch;
        		this.$refs.detailDailog.orderType = this.orderType;
        	}
        },0)
    	},
    	showStatsDetail_1(){
      	this.parentObj = {
      		beginDaySearch: this.beginDaySearch_1,
      		endDaySearch: this.beginDaySearch_1,
      		supplierId: this.obj.supplierId,
      		shopId: this.obj.shopId,
      		orderType: this.orderType_1,
      		orderTypeList: this.obj.orderTypeList,
      	};
        setTimeout(()=>{
        	this.shopDetailDialog = true;
        	if(this.$refs.detailDailog){
        		this.$refs.detailDailog.beginDaySearch = this.beginDaySearch_1;
        		this.$refs.detailDailog.endDaySearch = this.beginDaySearch_1;
        		this.$refs.detailDailog.orderType = this.orderType_1;
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
        getSaleDetail(param).then((data) => {
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
        getSaleDetail(param).then((data) => {
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
      	//{"classifyId":196,"classifyName":null,"allGoodsNumber":337,"goodsNumber":1,"goodsNumberRate":0.0030,"allGoodsPrice":8378.70,"goodsPrice":7.50,"goodsPriceRate":0.0009}
      	var priceData = [];
      	var numberData = [];
      	var pieNumber = [];
      	var piePrice = [];
      	var legendData = [];
      	var classifyName,goodsNumberRate,goodsPriceRate;
      	this.dataList = [];
      	this.statsList_1.forEach((item)=>{
      		classifyName = item.classifyName || item.classifyId+'';
      		goodsNumberRate = (item.goodsNumberRate*100).toFixed(2)+'%';
      		goodsPriceRate = (item.goodsPriceRate*100).toFixed(2)+'%';
      		legendData.push(classifyName);
      		pieNumber.push({value:item.goodsNumber, name:classifyName,goodsRate:goodsNumberRate});
      		piePrice.push({value:item.goodsPrice, name:classifyName,goodsRate:goodsPriceRate});
      		this.dataList.push({
      			classifyName:classifyName,
      			goodsNumber:item.goodsNumber,
      			goodsNumberRate:goodsNumberRate,
      			goodsPrice:item.goodsPrice,
      			goodsPriceRate:goodsPriceRate,
      		});
      	});
      	
      	
    		this.myChart_1.setOption({
    			title: {
			        text: '',
			        subtext: '按商品分类统计商品销售数量与金额',
			        x: 'center',
			        y: 20,
			        textStyle: {
			            fontWeight: 'normal',
			            fontSize: 16
			        }
			    },
			    color:this.eColor,
			    tooltip : {
		        trigger: 'item',
		        formatter: function (params, ticket, callback) {
						    return [params.data.name,'：',params.data.value,'，占比：',params.data.goodsRate].join('');
						}
			    },
			    grid: {
			        left: '1%',
			        right: '1%',
			    },
			    legend: {
			    		type:'scroll',
			        data:legendData
			    },
			    series: [
		        {
	            name:'商品数量',
	            type:'pie',
            	selectedMode: 'single',
	            radius : [30, 110],
	            center : ['25%', '60%'],
	            roseType : 'radius',
					    label: {
					        normal: {
					            textStyle: {
					                color: '#333',
					            },
					        }
					    },
	            data:pieNumber
		        },
		        {
	            name:'商品价格',
	            type:'pie',
	            radius : [30, 110],
	            center : ['75%', '60%'],
	            roseType : 'radius',
					    label: {
					        normal: {
					            textStyle: {
					                color: '#333',
					            },
					        }
					    },
	            data:piePrice
		        },
			    ]
	    	});
      },
      drawLine(){//画线条
      	//先组装分类
      	var classifyName = {};
      	var statsDateMap = {};
      	var cn;
      	this.statsList.forEach((item)=>{
      		statsDateMap[item.statsDate] = item.statsDate;
      		cn = item.classifyName || item.classifyId+'';
      		classifyName[item.classifyId+''] = cn;
      	});
      	
      	//日期
      	var xAxisData = [];//添加x轴数据
      	for(var x in statsDateMap){
      		xAxisData.push(x);
      	}
      	var yAxis = [];
      	var seriesData =[];
      	var index = 0;
      	var classifyNameX;
      	this.legendData = [];
      	for(var x in classifyName){
      		classifyNameX = classifyName[x];
      		this.legendData.push(classifyNameX);
		    	seriesData.push({
		    		myKey:x,//自定义字段
		    		name:classifyNameX,
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
                    },
                }
            },
	          data:[]
		    	});
		    	yAxis.push({
	            type: 'value',
		    			myKey:x,//自定义字段
	            name: classifyNameX,
	            min: 0,
	            max: 250,//根据实际数据进行修改
	            show:false,
		      });
		      index ++;
		    };
		    this.legendSelected = {};//默认前4个分类显示
      	this.legendData.forEach((item,idx)=>{
      		this.legendSelected[item] = idx < 4;
      	});
		    
		    //根据日期进行组装数据
      	xAxisData.sort(function(a,b){
      		return a < b? -1:1;
      	});
      	var dataTemp,rateTemp;
		    xAxisData.forEach((x)=>{
      		seriesData.forEach((y)=>{
      			dataTemp = 0;
      			rateTemp = '0.00%';
			    	this.statsList.forEach((z)=>{
	      			if(x == z.statsDate && y.myKey == (z.classifyId+'')){//获取当前日期的的当前分类
	      					if(this.goodsStatsType==0){
				      			dataTemp = z.goodsNumber;
				      			rateTemp = (z.goodsNumberRate*100).toFixed(2)+'%';
	      					}else{
				      			dataTemp = z.goodsPrice;
				      			rateTemp = (z.goodsPriceRate*100).toFixed(2)+'%';
	      					}
			      			return false;
	      			}
		      	});
		      	y.data.push({
		      		name:y.name,
		      		value:dataTemp,
		      		rate:rateTemp,
		      	});
		      });
		    });
      	
      	//处理y轴最大值
      	var yMax;
      	seriesData.forEach((item,index)=>{
      		yMax = 10;
    			item.data.forEach((it,idx)=>{
    				if(it.value > yMax){
    					yMax = it;
    				}
    			});
    			yAxis[index].max = Math.ceil(1.2 * yMax);//y轴放大一些
    		});
    		this.myChart.setOption({
			    tooltip: {
			        trigger: 'axis',
			        formatter: function (params, ticket, callback) {
			        		var str = [];
			        		if(params.length > 0){
			        			str.push(params[0].axisValue);
			        		}
			        		params.forEach((item)=>{
			        			if(item.data.value !== 0){
			        				str.push(item.marker+item.data.name+'：'+item.data.value+'，占比：'+item.data.rate);
			        			}
			        		});
							    return str.join('<br>');
							}
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
      changeSort(column){
      	var d1 = -1;
      	var d2 = 1;
      	if(column.order == 'descending'){
      		d1 = 1;
      		d2 = -1;
      	}
      	if(column.prop != null ){
	      	this.dataList.sort(function(a,b){
	      		return a[column.prop] < b[column.prop]? d1:d2;
	      	});
	      }
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
