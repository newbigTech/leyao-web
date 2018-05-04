<template>
  <div class="_container">
    <card-panel>
      <h3 slot="title">权限详情</h3>
      <div slot="panel-body">
        <div class="grid-content bg-purple">
          <el-form class="demo-form" style="width:400px;" ref="form" :model="roleObj" label-width="100px">
            <el-form-item label="角色编号">
              <!-- <el-col :span="10">{{roleObj.roleId}}</el-col> -->
              <el-input v-model="roleObj.roleId" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="角色名">
              <!-- <el-col :span="10">{{roleObj.roleName}}</el-col> -->
              <el-input v-model="roleObj.roleName" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="类型">
              <!-- <el-col :span="10">{{roleObj.roleTypeStr}}</el-col> -->
              <el-input v-model="roleObj.roleTypeStr" :disabled="true"></el-input>
            </el-form-item>
            <!-- <el-form-item label="排序">
              <el-input-number v-model="roleObj.sortIndex" :disabled="true"></el-input-number>
            </el-form-item> -->
            <el-form-item label="状态">
              <!-- <el-col :span="10">{{roleObj.statusCodeStr}}</el-col> -->
              <el-input v-model="roleObj.statusCodeStr" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="创建时间">
              <!-- <el-col :span="10">{{roleObj.createdDtm}}</el-col> -->
              <el-input v-model="roleObj.createdDtm" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item>
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
  import { getCompanyRoleDetail } from 'src/vuex/actions/roleAction'
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
      	roleObj:{}
      	//*************************
      }
    },
    created(){
      //this.loadRoleDetail();
      this.roleObj = this.obj;
      this.roleObj.roleTypeStr = this.roleObj.roleType===0?'系统角色':'自定义角色';
      this.roleObj.statusCodeStr = this.roleObj.statusCode===0?'正常':'禁用';
    },
    methods:{
      loadRoleDetail(){
        var param ={
        	 roleId: this.obj.roleId
        };
        this.loading = true;
        getCompanyRoleDetail(param).then((data) => {
        	this.loading = false;
            const {success,msg,result}=data;
            //console.log(JSON.stringify(result))
            if(success){
                this.roleObj = result ;
                this.roleObj.roleTypeStr = this.roleObj.roleType===0?'系统角色':'自定义角色';
                this.roleObj.statusCodeStr = this.roleObj.statusCode===0?'正常':'禁用';
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
