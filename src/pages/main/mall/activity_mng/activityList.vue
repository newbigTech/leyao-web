<template>
<div class="_container">
  <card-panel>
    <span slot="title">{{titleName}}页</span>
    <div slot="panel-btns">
      <el-button size="small" v-show="obj.isActivity==1" @click.native="$emit('forward', 'generalActivityHome')" type="primary">返回</el-button>
    </div>
    <div slot="panel-body">
      <div class="_setting-bar">
        <div class="_query-form">
            <div class="_query-form-item">
              <el-form :inline="true">
                <el-form-item>
                  <el-input :placeholder="titleName+'编号查询'" v-model="activityIdSearch"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-input :placeholder="titleName+'名称查询'" v-model="activityNameSearch"></el-input>
                </el-form-item>
                <!--<el-form-item>
                  <el-input :placeholder="titleName+'全名查询'" v-model="activityFullNameSearch"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-select v-model="statusCodeSearch" clearable :placeholder="titleName+'状态'">
                    <el-option
                      v-for="item in statusCodeOptions"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>-->
                <el-form-item>
                  <el-select v-model="isPageSearch" clearable placeholder="有无设置页面">
                    <el-option
                      v-for="item in isPageOptions"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item style="width: 350px;">
                  <el-row type="flex" justify="space-between">
                    <el-col :span="12">
                      <el-date-picker
                        v-model="beginDtmSearch"
                        type="date" clearable
                        placeholder="活动开始时间"
                        :picker-options="pickerOptions0" style="width: 168px">
                      </el-date-picker>
                    </el-col>
                    <el-col :span="0" style="text-align: center; width: 15px;"> ~ </el-col>
                    <el-col :span="12">
                      <el-date-picker
                        v-model="endDtmSearch"
                        type="date" clearable
                        placeholder="活动结束时间"
                        :picker-options="pickerOptions1" style="width: 168px">
                      </el-date-picker>
                    </el-col>
                  </el-row>
                </el-form-item>
               
                <el-form-item>
                  <el-button @click.native="searchDataList">查询</el-button>
                </el-form-item>
              </el-form>
            </div>
            <div class="_query-form-btn">
              
            </div>
        </div>
        <!-- <div class="_actions-btn" :style="{width: obj.isActivity == 1 ? '310px' : '100px'}"> -->
        <div class="_actions-btn" :style="{width: '100px'}">
         <el-button @click.native="gotoForward('activityAdd',{})" type="success">新增{{titleName}}</el-button>
        </div>
      </div>
      <el-tabs v-model="activeName" style="width:100%" @tab-click="onTabClick">
        <el-tab-pane label="启用" name="tab1"></el-tab-pane>
        <el-tab-pane label="停用" name="tab2"></el-tab-pane>
        <el-tab-pane label="已删除" name="tab3"></el-tab-pane>
      </el-tabs>
      <div class="_table-container"> 
          <div class="_table-list">
            <el-table :data="dataList" stripe style="width: 100%" border @sort-change="changeSort">
              <el-table-column align="center" property="activityId" label="编号" width="100" sortable="'custom'"></el-table-column>
              <el-table-column align="center" property="activityName" :label="titleName+'名称'" min-width="130" sortable="'custom'"></el-table-column>
              <!--活动的状态 启用才显示-->
							<el-table-column inline-template v-if="statusCode==1" align="center" label="状态" width="110">
								<el-col :span="24">
									<el-tag type="success" v-if="row.status==1">进行中</el-tag>
									<el-tag type="gray" v-if="row.status==2">已结束</el-tag>
									<el-tag type="danger" v-if="row.status==3">未开始</el-tag>
								</el-col>
							</el-table-column>
							<el-table-column align="center" property="beginDtm_str" label="开始时间" width="180" sortable="'custom'"></el-table-column>
              <el-table-column align="center" property="endDtm_str" label="结束时间" width="180" sortable="'custom'"></el-table-column>

              <!-- 专题是没有浏览 订单 销售量的 活动有 -->
              <el-table-column v-if="obj.isActivity == 1" align="center" property="viewNumber" label="浏览数" width="100" sortable="'custom'"></el-table-column>
              <el-table-column v-if="obj.isActivity == 1" align="center" property="orderSaleNumber" label="订单量" width="110" sortable="'custom'"></el-table-column>
              <el-table-column v-if="obj.isActivity == 1" align="center" property="saleGoodsNumber" label="销售量" width="110" sortable="'custom'"></el-table-column>
							
              <el-table-column align="center" inline-template label="操作" width="310">
                <el-col :span="24">
                  <el-button size="small" type="success"   @click.native="gotoForward('activityDetail', row)">详情</el-button>
                  <el-button size="small" type="info"      @click.native="gotoForward('activityPage', row)" v-if="row.statusCode===0 && activeName!='tab3'">活动页</el-button>
                  <el-button size="small" type="danger"    @click.native="modifyActivityStatusCode(row)" v-if="row.statusCode===1 && activeName!='tab3'">停用</el-button>
                  <el-button size="small" type="info"      @click.native="modifyActivityStatusCode(row)" v-if="row.statusCode===0 && activeName!='tab3'">启用</el-button>
                  <el-button size="small" type="info"      @click.native="gotoForward('activityModify', row)" v-if="row.statusCode===0 && activeName!='tab3'">修改</el-button>
                  <el-button size="small" type="danger"    @click.native="deleteActivity(row.activityId)" v-if="row.statusCode===0 && activeName!='tab3'">删除</el-button>
                </el-col>
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
<style lang="sass">
  /*.el-form--inline .el-form-item {
    vertical-align: baseline;
  }*/
</style>
<script>
  import { 
    getMallActivityList, 
    deleteMallActivity,
    modifyMallActivity, 
    } from 'src/vuex/actions/activityAction'
  import {dateFormat} from 'lib/utils/dateFormat.js'
  import _ from "lodash"
  export default {
    props: {
      obj: {
        type: Object,
        default: {}
      }
    },
    data(){
      var _this = this;
      var titleName = this.obj.isActivity==1?'活动':'专题';
      return {
        loading:false,//遮罩层
        activeName:'tab1',
        activityObj:{},
        titleName:titleName,
        dataList:[],
        pageNo :1,
        pageSize :10,
        total: 0,
        orderByKey:'',
        orderByValue:'',
        activityIdSearch:'',
        activityNameSearch:'',
        activityFullNameSearch:'',
        beginDtmSearch:'',
        endDtmSearch:'',
        statusCodeSearch:'',
        statusCode:1,
        statusCodeOptions:[
          {value: '0',label: '停用'},{value: '1',label: '启用'},
        ],
        isPageSearch:'',
        isPageOptions:[
          {value: '0',label: '无设置页面'},{value: '1',label: '有设置页面'},
        ],
        pickerOptions0: {
          disabledDate(time){
            return _this.endDtmSearch=='' || typeof _this.endDtmSearch=='undefined'? false:time.getTime() > _this.endDtmSearch.getTime();
          }
        },
        pickerOptions1: {
          disabledDate(time){
            return _this.beginDtmSearch=='' || typeof _this.beginDtmSearch=='undefined'? false:time.getTime() < _this.beginDtmSearch.getTime();
          }
        },
      }
    },
    created(){
    	if(typeof this.obj.activityParam != 'undefined'){
    		if(typeof this.obj.activityParam.activeName != 'undefined'){
	    		this.activeName = this.obj.activityParam.activeName;
	    	}
	    	if(typeof this.obj.activityParam.pageNo != 'undefined'){
	    		this.pageNo = this.obj.activityParam.pageNo;
	    	}
	    	if(typeof this.obj.activityParam.pageSize != 'undefined'){
	    		this.pageSize = this.obj.activityParam.pageSize;
	    	}
	    	if(typeof this.obj.activityParam.orderByKey != 'undefined'){
	    		this.orderByKey = this.obj.activityParam.orderByKey;
	    	}
	    	if(typeof this.obj.activityParam.orderByValue != 'undefined'){
	    		this.orderByValue = this.obj.activityParam.orderByValue;
	    	}
	    	if(typeof this.obj.activityParam.activityIdSearch != 'undefined'){
	    		this.activityIdSearch = this.obj.activityParam.activityIdSearch;
	    	}
	    	if(typeof this.obj.activityParam.activityNameSearch != 'undefined'){
	    		this.activityNameSearch = this.obj.activityParam.activityNameSearch;
	    	}
	    	if(typeof this.obj.activityParam.activityFullNameSearch != 'undefined'){
	    		this.activityFullNameSearch = this.obj.activityParam.activityFullNameSearch;
	    	}
	    	if(typeof this.obj.activityParam.beginDtmSearch != 'undefined'){
	    		this.beginDtmSearch = this.obj.activityParam.beginDtmSearch;
	    	}
	    	if(typeof this.obj.activityParam.endDtmSearch != 'undefined'){
	    		this.endDtmSearch = this.obj.activityParam.endDtmSearch;
	    	}
	    	if(typeof this.obj.activityParam.statusCodeSearch != 'undefined'){
	    		this.statusCodeSearch = this.obj.activityParam.statusCodeSearch;
	    	}
	    	if(typeof this.obj.activityParam.statusCode != 'undefined'){
	    		this.statusCode = this.obj.activityParam.statusCode;
	    	}
	    	if(typeof this.obj.activityParam.isPageSearch != 'undefined'){
	    		this.isPageSearch = this.obj.activityParam.isPageSearch;
	    	}
    	}
    	
    	
    	
      this.onTabClick({name:this.obj.activeName||'tab1'});
    },
    methods:{
      onTabClick(tab){
        this.activeName=tab.name;
    		this.obj.activeName = this.activeName;
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
          ,isActivity: this.obj.isActivity
          ,beginDtm: this.beginDtmSearch=="" || typeof this.beginDtmSearch=='undefined'? "":dateFormat(this.beginDtmSearch,'yyyy-MM-dd')+' 00:00:00'
          ,endDtm: this.endDtmSearch=="" || typeof this.endDtmSearch=='undefined'? "":dateFormat(this.endDtmSearch,'yyyy-MM-dd')+' 23:59:59'
          ,statusCode: this.statusCode
          ,deleteFlag: this.deleteFlag
          ,activityType: this.obj.activityType
          ,isPage:this.isPageSearch
          ,activityId:this.activityIdSearch
          ,activityName:this.activityNameSearch
          ,activityFullName:this.activityFullNameSearch
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
                  item.createdDtm_str = dateFormat(item.createdDtm,'yyyy-MM-dd HH:mm:ss');
                  item.statusCode_str = item.statusCode==1? '启用' : '停用';
                  item.activityType_str = this.getActivityTypeStr(item.activityType);
                  if(item.beginDtm <= item.nowTime && item.endDtm >= item.nowTime){
                  	item.status = 1;//进行中
                  }else if(item.endDtm <= item.nowTime){
                  	item.status = 2;//已结束
                  }else if(item.beginDtm >= item.nowTime){
                  	item.status = 3;//未开始
                  }
                });
                if(this.pageNo <=1){//因为只有第一页带总记录数
                  this.total = result.total;
                }
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
      modifyActivityStatusCode(row){
        this.$confirm('确定把该'+this.titleName+(row.statusCode==1?'停用':'启用')+'么？', '提示', {
          type: 'warning'
        }).then(() => {//确定
           var param ={
             activityId: row.activityId,
             statusCode: row.statusCode==1?0:1,
          };
          modifyMallActivity(param).then((data) => {
              const {success,msg,result}=data;
              this.$message({
                type: success? 'success':'error',
                message: msg
            });
              if(success){
                //row.statusCode = param.statusCode;
                //row.statusCode_str = row.statusCode==1? '启用' : '停用';
                for(var i=0,li=this.dataList.length; i<li; i++){
                  if(this.dataList[i].activityId==row.activityId){
                    this.dataList.splice(i,1);
                    break;
                  }
                }
              }
          }); 
          
        }).catch(() => {//取消
                    
        });
         
      },
      deleteActivity(activityId){
        this.$confirm('确定把该'+this.titleName+'删除么？', '提示', {
          type: 'warning'
        }).then(() => {//确定
           var param ={
             activityId: activityId
          };
          deleteMallActivity(param).then((data) => {
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
      gotoForward(url,row){
	    	var activityParam = {
	    		activeName:this.activeName,
	    		pageNo:this.pageNo,
	    		pageSize:this.pageSize,
	    		orderByKey:this.orderByKey,
	    		orderByValue:this.orderByValue,
	    		activityIdSearch:this.activityIdSearch,
	    		activityNameSearch:this.activityNameSearch,
	    		activityFullNameSearch:this.activityFullNameSearch,
	    		beginDtmSearch:this.beginDtmSearch,
	    		endDtmSearch:this.endDtmSearch,
	    		statusCodeSearch:this.statusCodeSearch,
	    		statusCode:this.statusCode,
	    		isPageSearch:this.isPageSearch,
	    	};
	    	if(typeof row == 'undefined'){
	    		row = {};
	    	}
	    	_.assign(this.obj,row);
	    	this.obj.activityParam = activityParam;
	    	this.$emit('forward', url, this.obj);
      }, 
      //**********************   
    }
  }
</script>
