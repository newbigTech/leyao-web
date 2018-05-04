<template>
<div class="_container">
  <!-- <div class="_query-form-btn" style="margin-top:30px;text-align:center;">
    <el-button @click.native="goToList(1)" style="">特价</el-button>
    <el-button @click.native="goToList(2)" style="margin-left:30px;">新人专享</el-button>
    <el-button @click.native="goToList(3)" style="margin-left:30px;">包邮</el-button>
    <el-button @click.native="goToList(4)" style="margin-left:30px;">满减</el-button>
  </div> -->
	<card-panel class="_normal _center">
    <h3 slot="title">活动商品列表</h3>
    <div slot="panel-btns">
      <el-button type="success" @click.native="goToList(1)">特价</el-button>
      <el-button type="warning" @click.native="goToList(3)">包邮</el-button>
      <el-button type="danger" @click.native="goToList(4)">满减</el-button>
      <el-button type="primary" @click.native="goToList(2)">新人专享</el-button>
      <el-button type="success" @click.native="goToList(5)">满送</el-button>
      <el-button type="primary" @click.native="goToList(6)">满换</el-button>
      <el-button type="warning" @click.native="goToList(7)">第二件半价/特价</el-button>
    </div>
	  <div slot="panel-body">
 			<div>
        <div id="timeline" style="margin: 0; border-radius: 0;"></div>
        <div class="_pagination" style="padding-top: 10px; border-color: #92d0e6;">
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
	</card-panel>
</div>
</template>
<style>
	.options {display: inline-block;}

  .options div {
      display: inline-block;
      margin-right: 20px;
  }
  #timeline .itemClass0{
  	background: #20a0ff;
  	box-shadow: -1px 1px 4px #1D8CE0;
  	color: #fff;
  }
  #timeline .itemClass1{
  	box-shadow: -1px 1px 4px #42d885;
  	background: #42d885;
    border-color: #42d885;
    color: #333;
  }
  #timeline .itemClass1:hover{
  	box-shadow: -1px 1px 4px #000;
  }
  #timeline .itemClass2{
  	background: #20a0ff;
  	box-shadow: -1px 1px 4px #20a0ff;
  	color: #333;
  }
  #timeline .itemClass2:hover{
  	box-shadow: -1px 1px 4px #000;
  }
  #timeline .itemClass3{
  	background: #f9c855;
  	box-shadow: -1px 1px 4px #f9c855;
  	color: #333;
  }
  #timeline .itemClass3:hover{
  	box-shadow: -1px 1px 4px #000;
  }
  #timeline .itemClass4{
  	background: #ff6d6d;
  	box-shadow: -1px 1px 4px #ff6d6d;
  	color: #333;
  }
  #timeline .itemClass4:hover{
  	box-shadow: -1px 1px 4px #000;
  }
  
  #timeline .itemClass5{
  	box-shadow: -1px 1px 4px #42d885;
  	background: #42d885;
    border-color: #42d885;
    color: #333;
  }
  #timeline .itemClass5:hover{
  	box-shadow: -1px 1px 4px #000;
  }
  #timeline .itemClass6{
  	background: #20a0ff;
  	box-shadow: -1px 1px 4px #20a0ff;
  	color: #333;
  }
  #timeline .itemClass6:hover{
  	box-shadow: -1px 1px 4px #000;
  }
  #timeline .itemClass7{
  	background: #f9c855;
  	box-shadow: -1px 1px 4px #f9c855;
  	color: #333;
  }
  #timeline .itemClass7:hover{
  	box-shadow: -1px 1px 4px #000;
  }
</style>
<script>
  
  import { getMallActivityList } from 'src/vuex/actions/activityAction'
  import {dateFormat} from 'lib/utils/dateFormat.js'
  import prettysize from "lib/utils/prettysize"
  import _ from "lodash"
  export default {
    data(){
    	var _this = this;
     	return {
     		loading:false,
     		timeline:{},
        dataList:[],
        pageNo :1,
        pageSize :10,
        total: 0,
     		beginDtmSearch:new Date(),
     		endDtmSearch:'',
        pickerOptions0: {
        	disabledDate(time){
            return _this.endDtmSearch==''||typeof _this.endDtmSearch=='undefined'?false:time.getTime() > _this.endDtmSearch.getTime();
          }
        },
        pickerOptions1: {
          disabledDate(time){
            return _this.beginDtmSearch==''||typeof _this.endDtmSearch=='undefined'?false:time.getTime() < _this.beginDtmSearch.getTime();
          }
        },
     	}
    },
    created(){
			setTimeout(()=>{
      	this.loadData();
			});
    },
    methods:{
    	showTimeline() {
    			//{"activityId":13,"statusCode":1,"beginDtm":1479866338000,"activityType":2,"endDtm":1482458338000,"activityName":"新人专享"}
           var testdata1=[];
           var minStartTime = dateFormat(new Date(),'yyyy/MM/01');
           var maxEndTime = dateFormat(new Date(new Date().getTime()+120*24*60*60*1000),'yyyy/MM/dd');
          //console.log(JSON.stringify(maxEndTime))
           var st,et;
           
           this.dataList.forEach((item) => {
           		st = dateFormat(item.beginDtm,'yyyy/MM/dd');
           		et = dateFormat(item.endDtm,'yyyy/MM/dd');
	          	testdata1.push({
	          		id: item.activityId,
	          		startTime:st,
	          		endTime:et,
	          		title:item.activityType_str+'('+item.status_str+')',
	          		itemClickVal:item.activityType,
	          		content:item.activityName,
	          		describe:'活动时间：从 '+dateFormat(item.beginDtm,'yyyy-MM-dd HH:mm:ss')+' 到 '+dateFormat(item.endDtm,'yyyy-MM-dd HH:mm:ss'),
	          		itemClass:"itemClass"+item.activityType,
	          		itemClick:(val)=>{
	          			val = parseInt(val,10);
	          			this.$emit('forward', 'activityList', {activityType:val,activityType_str:this.getActivityTypeStr(val),activeName:'tab1'});
	          		}
	          	});
	          	if(minStartTime> st){ minStartTime = st; }
	          	if(maxEndTime< et){ maxEndTime = et; }
	         });
	         var autoAdjustTime = 'both';
	         if(this.beginDtmSearch=="" && this.endDtmSearch==""){
	         		autoAdjustTime = 'both';
	         }else if(this.beginDtmSearch=="" && this.endDtmSearch!=""){
	         		autoAdjustTime = 'start';
	         }else if(this.beginDtmSearch!="" && this.endDtmSearch==""){
	         		autoAdjustTime = 'end';
	         }else{
	         		autoAdjustTime = 'none';
	         }
	          var startTime = new Date(minStartTime);
	          startTime = dateFormat(startTime,'yyyy/MM/01');
	          var endTime = new Date(maxEndTime);
	          endTime.setMonth(endTime.getMonth() + 1);
	          endTime.setDate(1);
	          endTime.setTime(endTime.getTime() - 24*60*60*1000);
	          endTime = dateFormat(endTime,'yyyy/MM/dd');
            var options = {};
            options.startTime = startTime;
            options.endTime = endTime;
            options.showArrow = true;//显示箭头 true false
            options.timeScalePosition = 'bottom';//时间尺度位置 bottom top
            options.autoAdjustTime = 'none';//自动调时间设置 none both start end
            options.smoothScroll = 'advanced';//平滑滚动 off basic advanced
            options.guides = 'both';//指南 none both start end
            options.showGuidesLabel = true;//显示指南标签 true false
            options.showSlider = false;//显示滑块 true false
            options.zoom = 26;//变焦
            options.data = testdata1;
            options.showStartDay = dateFormat(new Date(),'yyyy/MM/dd');
            this.timeline = $('#timeline').timeline(options);
      },
      loadData(){
        var param ={
        	 pageNo: this.pageNo
        	,pageSize: this.pageSize
        	,isActivity:1
        	,statusCode:1
        	,beginDtm: this.beginDtmSearch==""? "":dateFormat(this.beginDtmSearch,'yyyy-MM-01')+' 00:00:00'
        	,endDtm: this.endDtmSearch==""? "":dateFormat(this.endDtmSearch,'yyyy-MM-dd')+' 23:59:59'
        	,isMinField:1
        };
        this.loading = true;
        getMallActivityList(param).then((data) => {
        	this.loading = false;
            const {success,result}=data;
            //console.log(JSON.stringify(result))   
            if(success){
                this.dataList = result.rows ;
                this.dataList.forEach((item) => {
                	item.beginDtm_str = dateFormat(item.beginDtm,'yyyy-MM-dd HH:mm:ss');
                	item.endDtm_str = dateFormat(item.endDtm,'yyyy-MM-dd HH:mm:ss');
                	item.statusCode_str = item.statusCode==1? '启用' : '停用';
                	item.activityType_str = this.getActivityTypeStr(item.activityType);
                	if(item.beginDtm <= item.nowTime && item.endDtm >= item.nowTime){
                  	item.status_str = '进行中';//进行中
                  }else if(item.endDtm <= item.nowTime){
                  	item.status_str = '已结束';//已结束
                  }else if(item.beginDtm >= item.nowTime){
                  	item.status_str = '未开始';//未开始
                  }
                });
                if(this.pageNo <=1){//因为只有第一页带总记录数
                	this.total = result.total;
                }
                this.showTimeline();
            }
        });
      }, 
      getActivityTypeStr(val){
      	switch(val){
      		case 1: return '特价';
      		case 2: return '新人专享';
      		case 3: return '包邮';
      		case 4: return '满减';
      		case 5: return '满送';
      		case 6: return '满换';
      		case 7: return '第二件半价/特价';
      		default: return '活动';
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
      resetSearchValue(){
      	this.beginDtmSearch = "";
        this.endDtmSearch = "";
      }, 
      goToList(val){
      	this.$emit('forward', 'activityList', {activityType:val,activityType_str:this.getActivityTypeStr(val)});
      },
      //**********************   
    },
    mounted(){
      
    }
  }
</script>
