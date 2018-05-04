<template>
<div class="_container">
    <div class="_setting-options">
        <div class="_setting-options-left">
	       <el-form :inline="true" class="demo-form-inline">
					  <el-form-item>
			      		<el-input placeholder="角色名查询" v-model="roleName"></el-input>
					  </el-form-item>
					  <el-form-item>
					    <el-button @click.native="searchDataList">查询</el-button>
					  </el-form-item>
				  </el-form>
        </div>
        <div class="_setting-options-right">
		     <el-button @click.native="$emit('forward', 'roleAdd')" type="primary">新增</el-button>
        </div>
    </div>
    <div class="_table-container"> 
        <div class="_table-list">
        	<el-table :data="dataList" stripe style="width: 100%" border>
            <el-table-column property="roleId" label="编号" width="130" align="center"></el-table-column>
            <el-table-column property="roleName" label="角色名称" min-width="120" align="center"></el-table-column>
            <el-table-column property="roleTypeStr" label="类型" min-width="130" align="center"></el-table-column>
            <!--<el-table-column property="sortIndex" label="排序" width="100" align="center"></el-table-column>-->
            <el-table-column property="statusCodeStr" label="状态" width="120" align="center"></el-table-column>
            <!--<el-table-column property="createdDtm" label="创建时间" width="180"></el-table-column>-->
            <el-table-column inline-template label="操作" width="230" align="center">
            	<div>
                <el-button size="mini" type="success"   @click.native="$emit('forward', 'roleUser', row)">用户</el-button>
                <el-button size="mini" type="success"   @click.native="$emit('forward', 'roleDetail', row)">明细</el-button>
                <el-button size="mini" type="warning"      @click.native="$emit('forward', 'rolePermission', row)" v-if="row.roleType==1">权限</el-button>
                <el-button size="mini" type="warning"      @click.native="$emit('forward', 'roleModify', row)" v-if="row.roleType==1">编辑</el-button>
                <el-button size="mini" type="danger"    @click.native="deleteRole(row.roleId)" v-if="row.roleType==1">删除</el-button>
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
  import { getCompanyRoleList, deleteCompanyRole } from 'src/vuex/actions/roleAction'
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
      	roleObj:{},
        dataList:[],
        pageNo :1,
        pageSize :10,
        total: 0,
        roleName:''
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
        	,companyId: this.obj.companyId
        	,companyType: this.obj.companyType
        	,roleName: this.roleName
        };
        this.loading = true;
        getCompanyRoleList(param).then((data) => {
        	this.loading = false;
            const {success,result}=data;
            //console.log(JSON.stringify(result))
            if(success){
                this.dataList = result.rows ;
                this.dataList.forEach(function(item){
                	item.roleTypeStr = item.roleType===0?'系统角色':'自定义角色';
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
      deleteRole(roleId){
      	this.$confirm('确定把该角色删除么？', '提示', {
          type: 'warning'
        }).then(() => {//确定
        	 var param ={
	        	 roleId: roleId
	        	,companyId: this.obj.companyId
	        };
	        deleteCompanyRole(param).then((data) => {
	            const {success,msg,result}=data;
	            this.$message({
		            type: success? 'success':'error',
		            message: msg
		        });
	            if(success){
	            	this.deleteRoleDialogVisible = false;//关闭对话框
	                this.searchDataList();
	            }
	        }); 
          
        }).catch(() => {//取消
                    
        });
         
      },
      
      //**********************   
    }
  }
</script>
