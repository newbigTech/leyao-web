<template>
  <div class="_container">
    <card-panel>
      <h3 slot="title">新增角色</h3>
      <div slot="panel-body">
        <div class="grid-content bg-purple">
          <el-form class="demo-form" style="width:400px;" :rules="rules" ref="roleObj" :model="roleObj" label-width="100px">
            <el-form-item label="角色名" prop="roleName">
               <el-input placeholder="请输入角色名" v-model="roleObj.roleName"></el-input>
            </el-form-item>
            <!-- <el-form-item label="排序" prop="sortIndex">
               <el-input-number placeholder="请输入排序" v-model="roleObj.sortIndex"></el-input-number>
            </el-form-item> -->
            <el-form-item>
              <el-button @click.native="addRoleInfo" type="primary">新增</el-button>
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
  import { addCompanyRole,validCompanyRole } from 'src/vuex/actions/roleAction'
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
      	validCompanyRole({roleName:value,companyId:this.obj.companyId}).then((data) => {
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
      	
      	roleObj:{
      		roleName:'',
      		sortIndex:0
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
    vuex:{
      
    },
    methods:{
      
      
      addRoleInfo(){
      	var param = {
      		companyId : this.obj.companyId,
      		roleName: _.trim(this.roleObj.roleName),
      		sortIndex: this.roleObj.sortIndex
      	};
      	
      	this.$refs.roleObj.validate((valid) => {
          if (valid) {
          	
            addCompanyRole(param).then((data) => {
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
    },
    mounted(){
      
    }
  }
</script>
