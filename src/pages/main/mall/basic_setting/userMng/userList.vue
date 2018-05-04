<template>
<div class="_container">
    <div class="_setting-options">
        <div class="_setting-options-left">
	      <el-form :inline="true" class="demo-form-inline">
				  <el-form-item>
		      		<el-input placeholder="手机号查询" :number="true" v-model="userMobile"></el-input>
				  </el-form-item>
				  <el-form-item>
		      		<el-input placeholder="用户名查询" v-model="userAlias"></el-input>
				  </el-form-item>
				  <el-form-item>
				    <el-button @click.native="searchDataList">查询</el-button>
				  </el-form-item>
			  </el-form>
        </div>
        <div class="_setting-options-right">
		     <el-button @click.native="importUser()" type="primary">导入</el-button>
		     <el-button @click.native="$emit('forward', 'userAdd')" type="primary">新增</el-button>
        </div>
    </div>
    <div class="_table-container">
        <div class="_table-list">
        	<el-table :data="dataList" stripe style="width: 100%" border>
            <el-table-column property="userId" label="编号" width="130" align="center"></el-table-column>
            <el-table-column property="userAlias" label="用户名" min-width="120" align="center"></el-table-column>
            <el-table-column property="userMobile" label="手机号" min-width="130" align="center"></el-table-column>
            <!--<el-table-column property="userEmail" label="邮箱" width=""></el-table-column> -->
            <el-table-column property="nickName" label="昵称" min-width="120" align="center"></el-table-column>
            <el-table-column property="realName" label="姓名" min-width="120" align="center"></el-table-column>
            <!--<el-table-column property="sexStr" label="性别" width="80"></el-table-column> -->
            <el-table-column property="statusCodeStr" label="状态" width="100" align="center"></el-table-column>
           <!-- <el-table-column property="createdDtm" label="创建时间" width="180"></el-table-column> -->
            <el-table-column inline-template label="操作" width="200" align="center">
            	<div>
                <el-button size="mini" type="success"   @click.native="$emit('forward', 'userDetail', row)">明细</el-button>
                <el-button size="mini" type="warning"   @click.native="$emit('forward', 'userPermission', row)">权限</el-button>
                <el-button size="mini" type="warning"      @click.native="$emit('forward', 'userModify', row)">编辑</el-button>
                <el-button size="mini" type="danger"    @click.native="removeUser(row.userId)" v-if="userObj.userId != row.userId">移除</el-button>
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
	import { mapGetters } from 'vuex'
  import { getCompanyUserList, removeCompanyUser,synCompanyUser } from 'src/vuex/actions/userAction'
  export default {
    props: {
      obj: {
        type: Object,
        default: {}
      }
    },

    data(){
      return {
      	userObj2:{}, //userObj与下面的computed(计算属性)重名, 这里改为userObj2 by cy
        dataList:[],
        pageNo :1,
        pageSize :10,
        total: 0,
        userAlias:'',
        userMobile:''
      }
    },
    computed:{
    	...mapGetters(['userObj'])
    },
    created(){
      this.loadData();
    },
    methods:{
      loadData(){
        var param ={
        	 pageNo: this.pageNo
        	,pageSize: this.pageSize
        	,companyId: this.obj.companyId
        	,userMobile: this.userMobile
        	,userAlias: this.userAlias
        };
        this.loading = true;
        getCompanyUserList(param).then((data) => {
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
      removeUser(userId){
      	this.$confirm('确定把该用户移除出公司么？', '提示', {
          type: 'warning'
        }).then(() => {//确定
        	 var param ={
	        	 userId: userId
	        	,companyId: this.obj.companyId
	        };
	        removeCompanyUser(param).then((data) => {
	            const {success,msg,result}=data;
	            this.$message({
		            type: success? 'success':'error',
		            message: msg
		        });
	            if(success){
	            	this.removeUserDialogVisible = false;//关闭对话框
	                this.searchDataList();
	            }
	        });

        }).catch(() => {//取消

        });

      },
      importUser(){
      	this.$prompt('请输入手机号码', '提示', {
          confirmButtonText: '导入',
          cancelButtonText: '取消',
          inputPattern: /^(1[\d]{10})$/,
          inputErrorMessage: '手机号码格式不正确'
        }).then(({ value }) => {
        	value = $.trim(value);
        	if(value==''){return;}
        	var param ={
	        	 userMobile: value
	        	,companyId: this.obj.companyId
	        	,companyType: this.obj.companyType
	        };
	        synCompanyUser(param).then((data) => {
	            const {success,msg,result}=data;
	            this.$message({
		            type: success? 'success':'error',
		            message: msg
		        });
	            if(success){
	                this.searchDataList();
	            }
	        });
        }).catch(() => {});

      },
      
      gotoUserDetail(userId){
      	location.href="#/mall/basic_user_detail" ;
      },
      gotoUserAdd(){
      	location.href="#/mall/basic_user_add" ;
      },
      gotoUserModify(userId){
      	location.href="#/mall/basic_user_modify" ;
      },
      gotoUserPermission(userId){
      	location.href="#/mall/basic_user_permission" ;
      }
      //**********************
    }
  }
</script>
