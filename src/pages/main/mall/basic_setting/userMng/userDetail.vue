<template>
  <div class="_container">
    <card-panel>
      <h3 slot="title">用户信息详情</h3>
      <div slot="panel-btns"><button class="btn btn-sm btn-default" @click.prevent="$emit('reback', 'userList')">返回</button></div>
      <div slot="panel-body">
        <el-form class="demo-form" ref="form" :model="userObj" label-width="80px" style="width: 400px;">
          <el-form-item label="用户编号">
            <!-- <el-col :span="10">{{userObj.userId}}</el-col> -->
            <el-input v-model="userObj.userId" :disabled="true"></el-input>  
          </el-form-item>
          <el-form-item label="用户名">
            <!-- <el-col :span="10">{{userObj.userAlias}}</el-col> -->
            <el-input v-model="userObj.userAlias" :disabled="true"></el-input>  
          </el-form-item>
          <el-form-item label="手机号">
            <!-- <el-col :span="10">{{userObj.userMobile}}</el-col> -->
            <el-input v-model="userObj.userMobile" :disabled="true"></el-input>  
          </el-form-item>
          <el-form-item label="邮箱">
            <!-- <el-col :span="10">{{userObj.userEmail}}</el-col> -->
            <el-input v-model="userObj.userEmail" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="昵称">
            <!-- <el-col :span="10">{{userObj.nickName}}</el-col> -->
            <el-input v-model="userObj.nickName" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <!-- <el-col :span="10">{{userObj.realName}}</el-col> -->
            <el-input v-model="userObj.realName" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <!-- <el-col :span="10">{{userObj.sexStr}}</el-col> -->
            <el-input v-model="userObj.sexStr" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="出生日期">
            <!-- <el-col :span="10">{{userObj.birthday}}</el-col> -->
            <el-input v-model="userObj.birthday" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <!-- <el-col :span="10">{{userObj.statusCodeStr}}</el-col> -->
            <el-input v-model="userObj.statusCodeStr" :disabled="true"></el-input>
          </el-form-item>
          </el-form-item>
          <el-form-item label="用户头像">
            <el-col :span="10">
              <img style="width:100%;" :src="obj.cloudShowUrl+userObj.userPic"/>
            </el-col>
          </el-form-item>
          <el-form-item label="归属地">
            <!-- <el-col :span="10">{{userObj.strAddress}}</el-col> -->
            <el-input v-model="userObj.strAddress" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="详细地址">
            <!-- <el-col :span="10">{{userObj.address}}</el-col> -->
            <el-input v-model="userObj.address" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click.native.prevent="$emit('reback', 'userList')">返回</el-button>
          </el-form-item>
        </el-form>

      </div>
    </card-panel>
  </div>
</template>

<script>
  import { getCompanyUserDetail } from 'src/vuex/actions/userAction'
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
      	userId:1082,
      }
    },
    created(){
      this.loadUserDetail();
    },
    methods:{
      loadUserDetail(){
        var param ={
        	 userId: this.obj.userId
        };
        this.loading = true;
        getCompanyUserDetail(param).then((data) => {
        	this.loading = false;
            const {success,result}=data;
            //console.log(JSON.stringify(result))
            if(success){
                this.userObj = result ;
                if(this.userObj.sex===0){
            		this.userObj.sexStr = '男';
            	}else if(this.userObj.sex===1){
            		this.userObj.sexStr = '女';
            	}else{
            		this.userObj.sexStr = '保密';
            	}
            	this.userObj.statusCodeStr = this.userObj.statusCode===0?'正常':'禁用';
            }
        });
      },
      
      //**********************   
    }
  }
</script>
