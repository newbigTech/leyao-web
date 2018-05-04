<template>
<div class="_container">
    <!-- 查询条件 -->
	  <div class="_setting-bar">
	    <div class="_query-form">
	      <div class="_query-form-item">
	        <el-form :inline="true">
					  <el-form-item>
			      		<el-input placeholder="消息标题 模糊查询" v-model="messageTitleSearch"></el-input>
					  </el-form-item>
					  <el-form-item>
			      		<el-input placeholder="消息内容 模糊查询" v-model="messageContentSearch"></el-input>
					  </el-form-item>
	          <el-form-item style="width:220px;">
							<el-date-picker
	              v-model="createdDtmSearch"
	              type="daterange" clearable
	              placeholder="接收时间段"
	            ></el-date-picker>
	          </el-form-item>
	          <el-form-item style="width: auto;">
	            <el-button @click.native="searchDataList">查询</el-button>
	          </el-form-item>
	        </el-form>
	      </div>
	    </div>
	  
	  </div>

	  <el-tabs v-model="activeName" style="width:100%" @tab-click="onTabClick">
	    <el-tab-pane label="未读" name="tab1"></el-tab-pane>
	    <el-tab-pane label="已读" name="tab2"></el-tab-pane>
	    <el-tab-pane label="已删" name="tab3"></el-tab-pane>
	  </el-tabs>
	  <div v-show="isShowBatchOpt">
			<el-button v-if="isReceiverMsg && activeName=='tab1'" size="small" type="success" @click.native="signAllMessageIsReaded()">全部标记已读</el-button>
			<el-button v-if="isReceiverMsg && activeName!='tab3'" size="small" type="danger" @click.native="deleteMessageReceivers()">删除消息</el-button>
	  </div>
	  <div class="_table-container">
	    <div id="iDiv_message_receiver_data_list" class="_table-list">
	    	<el-table :data="dataList" stripe style="width: 100%" border @sort-change="changeSort" @selection-change="handleSelectionChange">
	    		<el-table-column type="selection" width="55"></el-table-column>
	        <el-table-column align='center' property="messageType_str" label="消息类型" width="110"></el-table-column>
	        <el-table-column align='center' property="sendUserName" label="发送人" width="110"></el-table-column>
	        <el-table-column align='left' label="标题" min-width="600">
	        	<template scope="scope">
	        		<div style="padding:10px;text-overflow: ellipsis;white-space: nowrap;overflow: hidden;">
	        			<a href="javascript:;" v-on:click="showMessageDetail(scope.row)">
			        		<span>{{scope.row.messageTitle}}</span>
			        		<span style="color:#a0a0a0;margin-left:5px;">{{scope.row.messageContent}}</span>
	        			</a>
	        		</div>
	        	</template>
	        </el-table-column>
	        <el-table-column align='center' property="createdDtm_str" label="时间" width="180" sortable="'custom'"></el-table-column>
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
<style lang="sass">
  /*.el-form--inline .el-form-item {
    vertical-align: baseline;
  }*/
  .i-div-voucher{
  	border:1px solid #e53e41!important;
  }
</style>
<script>
	import { mapGetters } from 'vuex'
  import { 
  	getMallMessageList,
  	getMallMessageReceiverList,
  	signMallMessageReceiverIsReaded,
  	deleteMallMessage,
  	deleteMallMessageReceiver,
  } from 'src/vuex/actions/messageAction'
  import {dateFormat} from 'lib/utils/dateFormat.js'
  import _ from "lodash"
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
      	messageObj:{},
      	activeName_:'tab1',
      	isReceiverMsg:true,//第一个选项卡是接收信息
        activeName:'tab1',
        dataList:[],
        pageNo :1,
        pageSize :10,
        total: 0,
        shopId: this.obj.shopId,
        orderByKey:'',
        orderByValue:'',
        messageTitleSearch:'',
        messageContentSearch:'',
        isReadedSearch:'',
        isReadedOptions:[
          {value: '0',label: '未读'},{value: '1',label: '已读'},
        ],
        createdDtmSearch:[null,null],
        messageTypeMap:{"0":"系统消息","1":"活动消息","2":"其它"},
        statusCode:0,
        deleteFlag:0,
        isShowBatchOpt:false,//显示批量操作
        
      }
    },
    computed: {
	    cloudShowUrl() {
      	return this.$store.getters.cloudShowUrl
      },
	  },
    created(){
    	if(typeof this.obj.messageParam.statusCode !='undefined'){
    		this.statusCode = this.obj.messageParam.statusCode;
    	}
    	if(typeof this.obj.messageParam.deleteFlag !='undefined'){
    		this.deleteFlag = this.obj.messageParam.deleteFlag;
    	}
    	if(typeof this.obj.messageParam.pageNo !='undefined'){
    		this.pageNo = this.obj.messageParam.pageNo;
    	}
    	if(typeof this.obj.messageParam.pageSize !='undefined'){
    		this.pageSize = this.obj.messageParam.pageSize;
    	}
    	if(typeof this.obj.messageParam.orderByKey !='undefined'){
    		this.orderByKey = this.obj.messageParam.orderByKey;
    	}
    	if(typeof this.obj.messageParam.orderByValue !='undefined'){
    		this.orderByValue = this.obj.messageParam.orderByValue;
    	}
    	
    	if(typeof this.obj.messageParam.messageTitleSearch !='undefined'){
    		this.messageTitleSearch = this.obj.messageParam.messageTitleSearch;
    	}
    	if(typeof this.obj.messageParam.messageContentSearch !='undefined'){
    		this.messageContentSearch = this.obj.messageParam.messageContentSearch;
    	}
    	if(typeof this.obj.messageParam.isReadedSearch !='undefined'){
    		this.isReadedSearch = this.obj.messageParam.isReadedSearch;
    	}
    	if(typeof this.obj.messageParam.createdDtmSearch !='undefined'){
    		this.createdDtmSearch = this.obj.messageParam.createdDtmSearch;
    	}
    	
    	
    	if(typeof this.obj.messageParam.activeName_ !='undefined'){
    		this.activeName_ = this.obj.messageParam.activeName_;
    	}
    	if(typeof this.obj.messageParam.activeName !='undefined'){
    		this.activeName = this.obj.messageParam.activeName;
    	} 
    	
      this.loadData();
    },
    methods:{
    	handleClick(tab){
    		this.activeName_=tab.name;
    		this.isReceiverMsg = this.activeName_==='tab1';
    	},
    	onTabClick(tab){
        this.activeName=tab.name;
        if(tab.name==='tab1'){
          this.pageNo = 1
          this.statusCode=0
          this.deleteFlag=0
        }else if(tab.name==='tab2'){
          this.pageNo = 1
          this.statusCode=1
          this.deleteFlag=0
        }else if(tab.name==='tab3'){
          this.pageNo = 1
          this.statusCode=''
          this.deleteFlag=1
        }
        this.multipleSelection = [];
        this.isShowBatchOpt = false;
        this.loadData()
      },
      handleSelectionChange(val) {//全选按钮
      	this.multipleSelection = val;
      	this.isShowBatchOpt = this.multipleSelection.length > 0;
      	
      },
      signAllMessageIsReaded(){//标记所有的接收消息为已读
      	this.toSignMessageReceiverIsReaded(this.multipleSelection,1)
      },
      deleteMessageReceiver(row){//删除
      	this.deleteMallMessageReceiver([row],0)
      },
      deleteMessageReceivers(){//批量删除
      	this.deleteMallMessageReceiver(this.multipleSelection,1)
      },
      showMessageDetail(row){
      	
      	this.goToForward('messageDetail',_.cloneDeep(row));
      	
      	if(this.isReceiverMsg && row.isReaded===0){//未读消息，要标记为已读
      		this.toSignMessageReceiverIsReaded([row],0);
      	};
      },
      toSignMessageReceiverIsReaded(rows,reflash){
      	if(typeof rows =='undefined' || rows.length<=0){
      		this.$message({
            type: 'error',
            message: '没有任何信息要标记'
          });
      		return;
      	}
      	var rs = []
      	for(var i=0,li=rows.length; i<li; i++){
      		rs.push(rows[i].messageId+"#"+rows[i].msgReceiverId);
      	}
      	var param = {
      		msgReceiverId: rs.join(',')
      	};
      	signMallMessageReceiverIsReaded(param).then((data) => {
	            const {success,msg,result}=data;
	            if(reflash){
	            	if(success){
	            		this.$message({type: 'success',message: '全部标记为已读成功！'});
	                this.searchDataList();
		            }else{
		            	this.$message({type: 'error',message: msg});
		            }
	            }
	      });
      },
      loadData(){
        if(this.isReceiverMsg){
        	this.getMessageReceiverList();
        }else{
        	this.getMessageList();
        }
      },
      getMessageList(){
      },
      getMessageReceiverList(){
      	var param ={
        	 pageNo: this.pageNo
        	,pageSize: this.pageSize
        	,orderByKey: this.orderByKey
        	,orderByValue: this.orderByValue
        	,messageTitle: this.messageTitleSearch
        	,messageContent: this.messageContentSearch
        	,isReaded: this.statusCode
          ,deleteFlag: this.deleteFlag
          ,receiverType:2
          ,receiverId: this.shopId
        };
      	if(this.createdDtmSearch[0] && this.createdDtmSearch[1]){
      		param.createdDtmSt = dateFormat(this.createdDtmSearch[0],'yyyy-MM-dd')+' 00:00:00';
      		param.createdDtmEt = dateFormat(this.createdDtmSearch[1],'yyyy-MM-dd')+' 23:59:59';
    		}
      	
      	this.multipleSelection = [];
      	
        this.loading = true;
        getMallMessageReceiverList(param).then((data) => {
        	this.loading = false;
            const {success,msg,result}=data;
            //console.log(JSON.stringify(result))
            if(success){
                this.dataList = result.rows ;
                this.dataList.forEach((item)=>{
                	item.messageType_str = this.messageTypeMap[item.messageType];
                	item.createdDtm_str = dateFormat(item.createdDtm,'yyyy-MM-dd HH:mm:ss');
                	item.sendUserName = item.sendUserId>0?item.userMobile :'系统';
                });
                if(this.pageNo <=1){//因为只有第一页带总记录数
                	this.total = result.total;
                }
            }else{
            	this.$message({
                type: 'error',
                message: msg
              });
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
     
      deleteMallMessageReceiver(rows,t){//t=0是行 1是批量
      	
      	this.$confirm('确定把'+(t==1?'所选的':'该')+'记录删除么？', '提示', {
          type: 'warning'
        }).then(() => {//确定
        	var mids =[];
	     		for(var i=0,li=rows.length; i<li; i++){
	     			mids.push(rows[i].msgReceiverId);
	     		}
	     		var param = {
	     			msgReceiverId: mids.join(',')
	     		};
	     		
	        deleteMallMessageReceiver(param).then((data) => {
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
      goToForward(url,row){
      	this.obj.messageParam.activeName_ = this.activeName_;
      	this.obj.messageParam.activeName = this.activeName;
      	this.obj.messageParam.statusCode = this.statusCode;
      	this.obj.messageParam.deleteFlag = this.deleteFlag;
      	this.obj.messageParam.pageNo = this.pageNo;
      	this.obj.messageParam.pageSize = this.pageSize;
      	this.obj.messageParam.orderByKey = this.orderByKey;
      	this.obj.messageParam.orderByValue = this.orderByValue;
      	this.obj.messageParam.messageTitleSearch = this.messageTitleSearch;
      	this.obj.messageParam.messageContentSearch = this.messageContentSearch;
      	this.obj.messageParam.hasGiftSearch = this.hasGiftSearch;
      	this.obj.messageParam.useStatusSearch = this.useStatusSearch;
    	
      	this.obj.message = row;
      	this.$emit('forward', url, this.obj);
      },
      //**********************   
    }
  }
</script>
