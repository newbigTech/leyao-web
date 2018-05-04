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
							<el-form-item>
		            <el-select v-model="orderType_1" placeholder="订单类型">
		              <el-option
		                v-for="item in obj.orderTypeList"
		                :label="item.label"
		                :value="item.value">
		              </el-option>
		            </el-select>
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
			<div id="iDiv_sale_data_pie" style="height:500px"></div>
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
    getSaleData, 
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
        orderType:_this.obj.orderTypeList[0].value,
      	myChart_1:{},
        statsList_1:[],
        beginDaySearch_1: lastDay,
        statsTypeStr_1:'日报',
        statsType_1:0,
        defStatsType_1:0,//用于记录点击是否发生变动
        orderType_1:_this.obj.orderTypeList[0].value,
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
        	{key:'orderUserNumber',  value:'下单人数',      show:true},
        	{key:'orderNumber',      value:'下单笔数',      show:true},
        	{key:'cancelOrderNumber',value:'取消订单数',    show:false},
        	{key:'amountPrice',      value:'下单金额',      show:true},
        	{key:'payUserNumber',    value:'付款人数',      show:false},
        	{key:'payNumber',        value:'付款订单数',    show:true},
        	{key:'itemNumber',       value:'销售明细数',    show:false},
        	{key:'payPrice',         value:'付款金额',      show:false},
        	{key:'accountPrice',     value:'余额付款金额',  show:false},
        	{key:'rechargeCardPrice',value:'充值卡付款金额',show:false},
        	{key:'weiXinPrice',      value:'微信付款金额',  show:false},
        	{key:'aliPayPrice',      value:'支付宝付款金额',show:false},
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
          ,orderType: this.orderType_1
        };
        this.loading = true;
        getSaleData(param).then((data) => {
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
          ,orderType: this.orderType
        };
        this.loading = true;
        getSaleData(param).then((data) => {
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
      	
      	var amountPrice = 0;
      	var accountPrice = 0;
      	var rechargeCardPrice = 0;
      	var weiXinPrice = 0;
      	var aliPayPrice = 0;
      	var accountPriceRate = 0;
      	var rechargeCardPriceRate = 0;
      	var weiXinPriceRate = 0;
      	var aliPayPriceRate = 0;
      	
      	var orderUserNumber = 0;
      	var orderNumber = 0;
      	var cancelOrderNumber = 0;
      	var amountPrice = 0;
      	var payUserNumber = 0;
      	var payNumber = 0;
      	var itemNumber = 0;
      	var payPrice = 0;
      	var itemRate = 0;
      	var userRate = 0;
      	var numberRate = 0;
      	
      	if(this.statsList_1 && this.statsList_1.length >0){
      		var pieData = this.statsList_1[0];
      		amountPrice = pieData.amountPrice;
      		accountPrice = pieData.accountPrice;
      		rechargeCardPrice = pieData.rechargeCardPrice;
      		weiXinPrice = pieData.weiXinPrice;
      		aliPayPrice = pieData.aliPayPrice;
      		
      		orderUserNumber = pieData.orderUserNumber;
      		orderNumber = pieData.orderNumber;
      		cancelOrderNumber = pieData.cancelOrderNumber;
      		amountPrice = pieData.amountPrice;
      		payUserNumber = pieData.payUserNumber;
      		payNumber = pieData.payNumber;
      		itemNumber = pieData.itemNumber;
      		payPrice = pieData.payPrice;
      		
      		
      		if(amountPrice > 0){
      			accountPriceRate = (accountPrice*100/amountPrice).toFixed(2);
      			rechargeCardPriceRate = (rechargeCardPrice*100/amountPrice).toFixed(2);
      			weiXinPriceRate = (weiXinPrice*100/amountPrice).toFixed(2);
      			aliPayPriceRate = (aliPayPrice*100/amountPrice).toFixed(2);
      			
      			
      		}
      		if(itemNumber > 0){
      			itemRate = (payPrice*100/itemNumber).toFixed(2);
      		}
      		if(orderNumber+cancelOrderNumber > 0){
      			userRate = (payPrice*100/(orderNumber+cancelOrderNumber)).toFixed(2);
      		}
      		if(payNumber > 0){
      			numberRate = (payPrice*100/payNumber).toFixed(2);
      		}
      	}
      	
    		this.myChart_1.setOption({
			    tooltip : {
		        trigger: 'item',
		        formatter: "{a} <br/>{b} : {c} ({d}%)"
			    },
			    grid: {
			        left: '3%',
			        right: '5%',
			    },
			    legend: {
			    		type:'scroll',
			        data:[/*'支付订单','取消订单','销售金额'*/]
			    },
			    color: ['#86D560', '#b2b8c1', '#59ADF3'],
			    series: [
		        {
	            name:'销售订单',
	            type:'pie',
            	selectedMode: 'single',
	            radius: [0, '30%'],
              label: {
                  normal: {
                      formatter: [
                          '{title|{b}}{abg|}',
                          '  {nameHead|支付类型}{valueHead|金额}{rateHead|占比}',
                          '{hr|}',
                          '  {name|余额}{value|'+accountPrice.toFixed(2)+'}{rate|'+accountPriceRate+'%}',
                          '  {name|充值卡}{value|'+rechargeCardPrice.toFixed(2)+'}{rate|'+rechargeCardPriceRate+'%}',
                          '  {name|微信}{value|'+weiXinPrice.toFixed(2)+'}{rate|'+weiXinPriceRate+'%}',
                          '  {name|支付宝}{value|'+aliPayPrice.toFixed(2)+'}{rate|'+aliPayPriceRate+'%}'
                      ].join('\n'),
                      backgroundColor: '#eee',
                      borderColor: '#777',
                      borderWidth: 1,
                      borderRadius: 4,
                      rich: {
                          title: {
                              color: '#eee',
                              align: 'center'
                          },
                          abg: {
                              backgroundColor: '#333',
                              width: '100%',
                              align: 'right',
                              height: 25,
                              borderRadius: [4, 4, 0, 0]
                          },
                          hr: {
                              borderColor: '#777',
                              width: '100%',
                              borderWidth: 0.5,
                              height: 0
                          },
                          name: {
                              padding: [5, 20, 5, 10],
                              color: '#666',
                              align: 'left'
                          },
                          nameHead: {
                              color: '#333',
                              height: 24,
                              align: 'left'
                          },
                          value: {
                              padding: [5, 20, 5, 10],
                              color: '#666',
                              align: 'right'
                          },
                          valueHead: {
                              color: '#333',
                              padding: [0, 20, 0, 10],
                              align: 'right'
                          },
                          rate: {
                          		width:50,
                              padding: [5, 10, 5, 0],
                              color: '#666',
                              align: 'right',
                          },
                          rateHead: {
                          		width:50,
                              color: '#333',
                              align: 'right',
                              padding: [0, 10, 0, 0]
                          }
                      }
                  }
              },
	            labelLine: {
	                normal: {
	                    show: true,
	                    length:80,
	                    length2:120,
	                }
	            },
	            data:[
	                {value:amountPrice, name:'销售金额', selected:true},
	            ]
		        },
		        {
	            name:'销售订单',
	            type:'pie',
	            radius: ['40%', '55%'],
	            data:[
	              {
	              	value:cancelOrderNumber,
	              	name:'取消订单',
			            labelLine: {
			                normal: {
			                    show: true,
			                }
			            },
	              },
	            	{
	            		value:payNumber,
	                name:'支付订单', 
			            labelLine: {
			                normal: {
			                    show: true,
			                    length2:150,
			                }
			            },
	                label: {
                  	normal: {
                      formatter: [
                          '{title|{b}}{abg|}',
                          '  {nameHead|指标名}{valueHead|指标值}',
                          '{hr|}',
                          '  {name|下单笔数}{value|'+orderNumber+'}',
                          '  {name|付款订单数}{value|'+payNumber+'}',
                          '  {name|取消订单数}{value|'+cancelOrderNumber+'}',
                          '  {name|下单人数}{value|'+orderUserNumber+'}',
                          '  {name|付款人数}{value|'+payUserNumber+'}',
                          '  {name|下单金额}{value|'+amountPrice+'}',
                          '  {name|付款金额}{value|'+payPrice+'}',
                          '  {name|客单价}{value|'+userRate+'}',
                          '  {name|客单间}{value|'+itemRate+'}',
                          '  {name|均单价}{value|'+numberRate+'}'
                      ].join('\n'),
                      backgroundColor: '#eee',
                      borderColor: '#777',
                      borderWidth: 1,
                      borderRadius: 4,
                      rich: {
                          title: {
                              color: '#eee',
                              align: 'center'
                          },
                          abg: {
                              backgroundColor: '#333',
                              width: '100%',
                              align: 'right',
                              height: 25,
                              borderRadius: [4, 4, 0, 0]
                          },
                          hr: {
                              borderColor: '#777',
                              width: '100%',
                              borderWidth: 0.5,
                              height: 0
                          },
                          name: {
                              padding: [5, 20, 5, 10],
                              color: '#666',
                              align: 'right'
                          },
                          nameHead: {
                              color: '#333',
                              height: 24,
                              padding: [0, 20, 0, 10],
                              align: 'right'
                          },
                          value: {
                          		width:80,
                              padding: [5, 20, 5, 10],
                              color: '#666',
                              align: 'right'
                          },
                          valueHead: {
                          		width:80,
                              color: '#333',
                              padding: [0, 20, 0, 10],
                              align: 'right'
                          },
                      }
	                  }
	              	},
	              },
	            ]
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
