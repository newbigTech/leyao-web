<template>
  <div class="_container">
    <card-panel>
      <h3 slot="title">角色修改</h3>
      <div slot="panel-body">
        <div class="grid-content bg-purple">
          <el-form class="demo-form" style="width:400px;" :rules="rules" ref="roleObj" :model="roleObj" label-width="100px">
            <el-form-item label="角色编号">
              <!-- <el-col :span="10">{{roleObj.roleId}}</el-col> -->
              <el-input v-model="roleObj.roleId" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="角色名" prop="roleName">
               <el-input placeholder="请输入角色名" v-model="roleObj.roleName"></el-input>
            </el-form-item>
            <!-- <el-form-item label="排序" prop="sortIndex">
               <el-input-number placeholder="请输入排序" v-model="roleObj.sortIndex"></el-input-number>
            </el-form-item> -->
            <el-form-item label="状态">
              <el-radio-group v-model="roleObj.statusCode">
                <el-radio v-if="roleObj.statusCode==0" :label="0" :disabled="true">正常</el-radio>
                <el-radio v-if="roleObj.statusCode==1" :label="1" :disabled="true">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item>
              <el-button @click.native="modifyRoleInfo" type="primary">修改</el-button>
              <el-button @click.native.prevent="$emit('reback', 'roleList')">返回</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </card-panel>
  </div>
</template>
<style>
</style>
<script>
  import { getCompanyRoleDetail,modifyCompanyRole,validCompanyRole } from 'src/vuex/actions/roleAction'
  import _ from "lodash"
  export default {
    props: {
      obj: {
        type: Object,
        default: {}
      }
    },
    data(){
      var checkCompanyRoleNameExists = (rule, value, callback) => {
      	value = _.trim(value);
      	if(value == ''){
      		callback(new Error('请输入角色名'));
      		return;	
      	}
      	validCompanyRole({roleName:value,companyId:this.obj.companyId,roleId:this.obj.roleId}).then((data) => {
            const {success,msg,result}=data;
            if(!success) {
              callback(new Error(msg));
            }else{
              callback();
            }
        }); 
      };
      var checkSortIndex = (rule, value, callback) => {
        setTimeout(() => {
          if ( !/^(0|[1-9][0-9]?)$/.test(value)) {
            callback(new Error('请输入数字值(>=0)'));
          } else{
            callback();
          } 
        }, 1000);
      };
      return {
      	loading:false,//遮罩层
      	defRoleObj:{},
      	roleObj:{
      		roleName:'',
      		sortIndex:0,
      		statusCode:0
      	},
      	rules: {
          roleName: [
            { required: true, message: '请输入角色名', trigger: 'blur,change' },
            //{ validator: checkCompanyRoleNameExists, trigger: 'blur' }
          ],
          sortIndex: [
            { validator: checkSortIndex, trigger: 'change' }
          ]
        },
      	//*************************
      }
    },
    created(){
      //this.loadRoleDetail();
      
      this.roleObj = this.obj ;
      this.defRoleObj = _.clone(this.obj);
    },
    methods:{
      loadRoleDetail(){
        var param ={
        	 roleId: this.obj.roleId
        };
        this.loading = true;
        getCompanyRoleDetail(param).then((data) => {
        	this.loading = false;
            const {success,result}=data;
            //console.log(JSON.stringify(result))
            if(success){
                this.roleObj = result ;
                this.defRoleObj = _.clone(result);
            }
        });
      },
     
      modifyRoleInfo(){
      	var param = {};
      	if(this.defRoleObj.roleName != this.roleObj.roleName){
      		param.roleName = this.roleObj.roleName;
      	}
      	if(this.defRoleObj.sortIndex != this.roleObj.sortIndex){
      		param.sortIndex = this.roleObj.sortIndex;
      	}
      	if(this.defRoleObj.statusCode != this.roleObj.statusCode){
      		param.statusCode = this.roleObj.statusCode;
      	}
      	
      	if(_.isEmpty(param)){
      		this.$message({
      			showClose: true,
	            type: 'warning',
	            message: '没有任何数据变动！'
	        });
      		return;
      	}
      	//处理 strAddress字段
      	param.roleId = this.defRoleObj.roleId;
      	param.companyId = this.obj.companyId;//用于校验当前店铺/运营商角色名称是否存在
      	this.$refs.roleObj.validate((valid) => {
          if (valid) {
            modifyCompanyRole(param).then((data) => {
	            const {success,msg,result}=data;
	            this.$message({
			            type: success? 'success':'error',
			            message: msg
			        });
			        if(success){
			        	this.$emit('reback', 'roleList');
			        }
		        }); 
          } else {
            this.$message({
	            type: 'error',
	            message: '请正确填写必填字段'
	        });
            return false;
          }
        });
      },
      
      //**********************   
    }
  }
</script>
