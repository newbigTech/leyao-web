<template>
  <div class="_container">
    <card-panel>
      <h3 slot="title">用户拥有权限</h3>
      <div slot="panel-body">
        <el-row>
          <el-col :span="16">
            <div class="grid-content">
              <el-form class="demo-form" style="width:400px;" ref="form" :model="userObj">
                <el-form-item>
                    <el-tag type="danger">被操作用户【{{obj.userAlias}}】</el-tag>
                    <div id="menuTree" class="ztree" style=""></div>
                  </el-form-item>
                  <el-form-item style="padding-left: 10px;">
                   <el-button @click.native.prevent="$emit('reback', 'userList')">返回</el-button>
                  </el-form-item>
              </el-form>
            </div>
          </el-col>
        </el-row>
      </div>
    </card-panel>
  </div>
</template>
<style>
	.demo-form .line { text-align:center;}
</style>
<script>
  import { getUserPermission } from 'src/vuex/actions/roleAction'
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
      	treeObj:{},
      	zNodes:[],
      
      	//*************************
      }
    },
    created(){
      this.loadUserPermission();
    },
    methods:{
    	 
      loadUserPermission(){
        var param ={
        	 userId: this.obj.userId
        	,companyId: this.obj.companyId
        	,companyType: this.obj.companyType
        	,isTree: 1
        };
        this.loading = true;
        getUserPermission(param).then((data) => {
        	this.loading = false;
            const {success,msg,result}=data;
            //console.log(JSON.stringify(result))
            if(success){
            	if(result.length <= 0 ){
            		this.$message({
			            type: 'error',
			            message: '没有任何权限'
			        });
            		return;
            	}
              var setting = {
              	check:{enable:false,
              		chkboxType : { "Y" : "ps", "N" : "ps" }
              	}
              	,view:{selectedMulti:false}
              	,data:{
              		 simpleData:{
              		 	enable:true,
										//idKey: "functionId",
										//pIdKey: "parentId",
										rootPId: null
              		 }
              	}
                ,callback:{
                  	beforeClick:function(id, node){
												//this.treeObj.checkNode(node, !node.checked, true, true);
												return false;
										}
								}
							};
							// 用户-菜单
							var setResult = function(_result){
								var obj;
								for(var i=0,li=_result.length;i<li;i++){
									obj = _result[i];
									obj.name = obj.operationName || obj.functionName;
									obj.id = obj.functionId;
									obj.pId = obj.parentId;
									if(obj.children){
										setResult(obj.children);
									}
								}
							};
							setResult(result);
							this.zNodes=result;
							// 初始化树结构
							this.treeObj = $.fn.zTree.init($("#menuTree"), setting, this.zNodes);
							// 默认展开全部节点
							this.treeObj.expandAll(true);
               
            }else{
            	this.$message({
			            type: 'error',
			            message: msg
			        });
            }
        });
      },
      
      //**********************   
    }
  }
</script>
