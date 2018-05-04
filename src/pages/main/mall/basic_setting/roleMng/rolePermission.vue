<template>
  <div class="_container">
    <card-panel>
      <h3 slot="title">角色权限配置</h3>
      <div slot="panel-body">
        <el-form class="demo-form" style="width:400px;" ref="form" :model="roleObj" >
          <el-form-item>
            <el-tag type="danger">被操作角色【{{obj.roleName}}】</el-tag>
            <el-checkbox v-model="checkAll" @change="changePermission()">全选</el-checkbox>
            <div id="menuTree" class="ztree" style=""></div>
          </el-form-item>
          <el-form-item>
           <el-button @click.native="modifyRolePermission" type="primary">保存</el-button>
          <el-button @click.native.prevent="$emit('reback', 'roleList')">返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </card-panel>
  </div>
</template>
<style>
</style>
<script>
  import { getCompanyRoleMenuFull,getRoleMenu,setUserRoleMenu } from 'src/vuex/actions/roleAction'
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
      	treeObj:{},
      	zNodes:[],
      	checkAll:false,
      	//*************************
      }
    },
    created(){
      this.loadRoleAllPermission();
    },
    methods:{
    	handleCloseTag(tag) {
        this.tags.$remove(tag);
      },
      loadRoleAllPermission(){
        var param ={
        	 companyType: this.obj.companyType
        	,isTree: 1
        };
        this.loading = true;
        getCompanyRoleMenuFull(param).then((data) => {
        	this.loading = false;
            const {success,msg,result}=data;
            //console.log(JSON.stringify(result))
            if(success){
                var setting = {
                	check:{enable:true,
                		chkboxType : { "Y" : "ps", "N" : "s" }
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
						obj.name = obj.functionName;
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
                //加载角色的权限
                this.loadRolePermission();
            }else{
            	this.$message({
	            type: 'error',
	            message: msg
	        });
            }
        });
      },
      loadRolePermission(){
        var param ={
        	 companyId: this.obj.companyId
        	,roleId: this.obj.roleId
        };
        this.loading = true;
        getRoleMenu(param).then((data) => {
        	this.loading = false;
            const {success,msg,result}=data;
            //console.log(JSON.stringify(result))
            if(success){
               // 默认选择节点
				var ids = result;
				var _o_ = [];
				var treeObj_ = this.treeObj;
				var findMyOperation = function(id,mask){
						var node = treeObj_.getNodeByParam("id",id);
						if(node.children && node.children.length>0){
							for(var i=0,li=node.children.length; i<li; i++){
								//console.log(node.children[i].operationMask,mask);
								if((node.children[i].operationMask & mask) === node.children[i].operationMask ){
									_o_.push( node.children[i] );
								}
							}
						}
				};
				var getNode = function(data,obj){
					for(var i=0,li=data.length; i<li; i++){
						if(obj.functionId==data[i].id){//找到了
							_o_.push( data[i] );
							if(data[i].functionType==1){
								findMyOperation(obj.functionId,obj.operationMask);
							}
						}else if(data[i].children){
							getNode(data[i].children,obj);
						}
					}
				}
				var node;
				for(var i=0; i<ids.length; i++) {
					getNode(this.zNodes,ids[i]);
					for(var j=0,lj=_o_.length; j<lj; j++){
						node = this.treeObj.getNodeByParam("id", _o_[j].functionId);
						try{this.treeObj.checkNode(node, true, false);}catch(e){}
					}
					
				} 
            }else{
            	this.$message({
	            type: 'error',
	            message: msg
	        });
            }
        });
      },
      changePermission(){
      	this.treeObj.checkAllNodes(this.checkAll);
      },
      modifyRolePermission(){
      	var ids = [], nodes = this.treeObj.getCheckedNodes(true);
      		var map = {};
      		var me;
      		
			for(var i=0; i<nodes.length; i++) {
				me = nodes[i];
				if(me.functionType==0){//模块菜单
					map[me.functionId] = map[me.functionId] | 0;
				}else if(me.functionType==1 && me.children.length==0){//功能菜单 并且没有孩子
					map[me.functionId] = map[me.functionId] | 0;
				}else if(me.isOperation == 1){//获取操作的
					if(typeof map[me.parentId] == 'undefined'){
						map[me.parentId] = me.operationMask;
					}else{
						map[me.parentId] = map[me.parentId] | me.operationMask;
					}
				}
				
			}
			$.each(map,function(k,v){
				ids.push(k+'|'+v);
			});
      	var param = {};
      	param.roleId = this.obj.roleId;
      	param.companyId = this.obj.companyId;
      	param.functionIDs = ids.join(',');
      	
      	this.$confirm('确定修改角色权限么？', '提示', {
          type: 'info'
        }).then(() => {//确定
	        setUserRoleMenu(param).then((data) => {
	            const {success,msg,result}=data;
	            this.$message({
		            type: success? 'success':'error',
		            message: msg
		        });
	        }); 
          
        }).catch(() => {//取消
                    
        });
         
      },
     
      //**********************   
    }
  }
</script>
