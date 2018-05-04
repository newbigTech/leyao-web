<template>
<div class="_container">
    <div class="_setting-options">
        <div class="_setting-options-left">
	      <el-form :inline="true" class="demo-form-inline">
				  <el-form-item>
		      		<el-input placeholder="手机号/用户名查询" :number="true" v-model="searchValue"></el-input>
				  </el-form-item>
				  <el-form-item>
				    <el-button @click.native="searchDataList">查询</el-button>
				  </el-form-item>
				  <el-form-item>
				    <el-checkbox v-model="onlyRoleUser">只获取角色用户</el-checkbox>
				  </el-form-item>
			  </el-form>
        </div>
        <div class="_setting-options-right">
		     <el-button @click.native="$emit('reback', 'roleList')" type="primary">返回</el-button>
        </div>
    </div>
    <div class="_table-container">
        <div class="_no-data bg-blue-light" v-show="!dataList.length">
            <span>暂无数据</span>
        </div>
        <div class="_table-list" v-show="!!dataList.length">
        	<el-table :data="dataList" stripe style="width: 100%" border>
            <el-table-column property="userId" label="编号" width="100" align="center"></el-table-column>
            <el-table-column property="userAlias" label="用户名" min-width="130" align="center"></el-table-column>
            <el-table-column property="userMobile" label="手机号" width="130" align="center"></el-table-column>
            <el-table-column property="userEmail" label="邮箱" min-width="130" align="center"></el-table-column>
            <el-table-column property="nickName" label="昵称" min-width="130" align="center"></el-table-column>
            <el-table-column property="realName" label="姓名" width="120" align="center"></el-table-column>
            <el-table-column property="sexStr" label="性别" width="80" align="center"></el-table-column>
            <el-table-column property="statusCodeStr" label="状态" width="80" align="center"></el-table-column>
            <el-table-column property="createdDtm" label="创建时间" width="180" align="center"></el-table-column>
            <el-table-column inline-template label="操作" width="80" align="center">
            	<el-col :span="24">
                <el-button size="mini" type="success" v-if="!row.roleId" @click.native="addUserIntoRole(row.userId)">添加</el-button>
                <el-button size="mini" type="danger" v-if="row.roleId"  @click.native="removeUser(row.userId)">移除</el-button>
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

</template>
<script>
  import {
  	 getCompRoleUserPageList
  	,addUserIntoRole 
  	,deleteRoleUser
  } from 'src/vuex/actions/roleAction'
  export default {
     props: {
      obj: {
        type: Object,
        default: {}
      }
    },
    data(){
      return {
      	loading:false,//遮罩层
      	userObj:{},
        dataList:[],
        pageNo :1,
        pageSize :10,
        total: 0,
        onlyRoleUser: false,
        userAlias:'',
        userMobile:'',
        searchValue: '',
      }
    },
    created(){
      this.loadData();
    },
    methods:{
      loadData(){
        var param ={
        	 pageNo: this.pageNo
        	,pageSize: this.pageSize
        	,companyId:this.obj.companyId
        	,roleId: this.obj.roleId
        	,onlyRoleUser :this.onlyRoleUser
        	,searchValue: this.searchValue
        };
        this.loading = true;
        getCompRoleUserPageList(param).then((data) => {
        	this.loading = false;
            const {success,result}=data;
            //console.log(JSON.stringify(result))
            if(success){
                this.dataList = result.rows ;
                this.dataList.forEach(function(item){
                	if(item.sex===0){
                		item.sexStr = '男';
                	}else if(item.sex===1){
                		item.sexStr = '女';
                	}else{
                		item.sexStr = '保密';
                	}
                	item.statusCodeStr = item.statusCode===0?'正常':'禁用';
                });
                this.total = result.total;
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
      removeUser(userId){
      	var param = {
      		 companyId:this.obj.companyId
      		,roleId:this.obj.roleId
      		,userId:userId
      	}
      	deleteRoleUser(param).then((data) => {
            const {success,msg,result}=data;
            this.$message({
	            type: success? 'success':'error',
	            message: msg
	        });
            if(success){
                this.searchDataList();
            }
        }); 
         
      },
      addUserIntoRole(userId){
      	var param = {
      		companyId:this.obj.companyId
      		,roleId:this.obj.roleId
      		,userId:userId
      	}
      	addUserIntoRole(param).then((data) => {
            const {success,msg,result}=data;
            this.$message({
	            type: success? 'success':'error',
	            message: msg
	        });
            if(success){
                this.searchDataList();
            }
        }); 
         
      },
     
      //**********************   
    }
  }
</script>
