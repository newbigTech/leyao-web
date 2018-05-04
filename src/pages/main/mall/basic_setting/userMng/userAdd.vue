<template>
  <div class="_container">
    <card-panel class="">
      <h3 slot="title">新增用户</h3>
      <div slot="panel-body">
        <el-form class="demo-form" style="width:500px;" :rules="rules" ref="userObj" :model="userObj" label-width="100px">
          <el-form-item label="用户名" prop="userAlias">
             <el-input placeholder="请输入4~20位以字母开头，由字母和数字组成的字符" v-model="userObj.userAlias"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="userMobile">
             <el-input placeholder="请输入手机号码" v-model="userObj.userMobile"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input placeholder="请输入密码（由6~20位字母和数字组成）" type="password" v-model="userObj.password" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="repassword">
            <el-input placeholder="请确认密码" type="password" v-model="userObj.repassword" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="userObj.nickName"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="userObj.realName"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="userObj.sex">
              <el-radio :label="0">男</el-radio>
              <el-radio :label="1">女</el-radio>
              <el-radio :label="2">保密</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="出生日期">
            <el-row type="flex" justify="space-between">
              <el-col :span="24">
                <el-date-picker type="date" 
                  format="yyyy-MM-dd"
                  :picker-options="pickerOptions"
                  placeholder="选择日期" v-model="userObj.birthday" style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col :span="0" style="width:62px; margin-left: 10px;">
                <el-button @click.native="resetBirthday" >清空</el-button>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="用户头像">
            <!-- <el-col :span="7">
            <img style="width:100%;" :src="obj.cloudShowUrl+userObj.userPic"/>
            </el-col>
            <el-col class="line" :span="10">
              <el-upload
              action="/pub/pubController/uploadPic"
              :show-uploadList="false"
              accept="image/*"
              :on-success="handleSuccess"
              :on-error="handleError">
              <el-button size="small" type="primary">点击上传</el-button>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload> -->
            <div class="_classify-uploader">
              <el-upload
                action="/pub/pubController/uploadPic"
                type="select"
                :thumbnail-mode="false"
                :show-upload-list="false"
                :before-upload="uploadBefore"
                :on-success="uploadSuccess"
                :on-error="uploadError" 
                class="_upload-select-mode">

                <div class="_upload-select">
                  <div class="_upload-select-box" :class="{'_loading': uploading > 0}">
                    <div class="_upload-select-icon"><i class="el-icon-upload"></i></div>
                    <div class="_upload-select-text">点击上传头像</div>
                    <div class="_upload-select-loading">
                      <div v-show="uploading == 1">上传中 <i class="el-icon-loading"></i></div>
                      <div v-show="uploading == 2" class="__upload-select-loading-error">上传失败,请重试...</div>
                    </div>
                    <div class="_upload-select-preview" v-show="!!userObj.userPic && (userObj.userPic.length > 1)">
                      <!-- <img :src="this.previewPic ? this.previewPic : (obj.cloudShowUrl + userObj.userPic)"> -->
                      <img :src="userObj.userPic !== picMD5_0 ? ((obj.cloudShowUrl + userObj.userPic)) : previewPic">
                      <div class="_upload-select-cover"> <span>点击更换头像</span> </div>
                    </div>
                  </div>
                </div>
              </el-upload>
            </div>
          <!-- </el-col> -->
          </el-form-item>
          <el-form-item label="归属地">
            <el-row type="flex" justify="space-between">
              <el-col :span="7">
                <el-select v-model="userObj.province" clearable v-on:change="loadCity()">
                  <el-option
                    v-for="item in provinceList"
                    :label="item.text"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-col>
              <el-col class="line" :span="1">-</el-col>
              <el-col :span="7">
                <el-select v-model="userObj.city" clearable v-on:change="loadArea()">
                  <el-option
                    v-for="item in cityList"
                    :label="item.text"
                    :value="item.id">
                  </el-option>
              </el-select>
              </el-col>
              <el-col class="line" :span="1">-</el-col>
              <el-col :span="7">
                <el-select v-model="userObj.area" clearable>
                  <el-option
                    v-for="item in areaList"
                    :label="item.text"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="详细地址">
            <el-input type="textarea" v-model="userObj.address"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click.native="addUserInfo" type="primary">新增</el-button>
              <el-button @click.native.prevent="$emit('reback', 'userList')">返回</el-button>
          </el-form-item>
          </el-form>
        </div>
      
    </card-panel>
  </div>
</template>
<style>
</style>
<script>
  import http from 'src/lib/utils/https'
  import { addCompanyUser,validUser } from 'src/vuex/actions/userAction'
  import _ from "lodash"
  import prettysize from "lib/utils/prettysize"
  export default {
		props: {
      obj: {
        type: Object,
        default: {}
      }
    },
    data(){
      var checkUserAliasExists = (rule, value, callback) => {
      	value = _.trim(value);
      	if(value == ''){
      		callback(new Error('请输入用户名'));
      		return;	
      	}else if( !/^[a-zA-Z][a-zA-Z0-9]{3,19}$/.test(value)){
      		callback(new Error('请输入4~20位以字母开头，由字母和数字组成的字符'));
      		return;
      	 }
      	 validUser({validValue:value,validType:1}).then((data) => {
            const {success,msg,result}=data;
            if(!success) {
              callback(new Error(msg));
            }else{
              callback();
            }
        }); 
      };
      var checkUserMobileExists = (rule, value, callback) => {
      	value = _.trim(value);
      	if(value == ''){
      		callback(new Error('请输入手机号码'));
      		return;	
      	}else if( !/^1[0-9]{10}$/.test(value)){
      		callback(new Error('手机号码格式不正确'));
      		return;
      	 }
      	 validUser({validValue:value,validType:0}).then((data) => {
            const {success,msg,result}=data;
            if(!success) {
              callback(new Error(msg));
            }else{
              callback();
            }
        }); 
      };
      var validPassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码（由6~20位字母和数字组成）'));
        } else {
          if (this.userObj.password !== '') {
            this.$refs.userObj.validateField('repassword');
          }
          callback();
        }
      };
      var validRepassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.userObj.password) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };
      return {
      	loading:false,//遮罩层

        previewPic: "",
        uploading: 0,
        picMD5_0: '',

      	provinceList:[],
      	cityList:[],
      	areaList:[],
      	userObj:{
      		userAlias:'',
      		userMobile:'',
      		password:'',
      		repassword:'',
      		nickName:'',
      		realName:'',
      		sex:2,
      		birthday:'',
      		userPic:'',
      		province:'',
      		city:'',
      		area:'',
      		address:'',
      		strAddress:''
      	},
      	rules: {
          userAlias: [
            { required: true, message: '请输入用户名', trigger: 'blur,change' },
            { validator: checkUserAliasExists, trigger: 'blur' }
          ],
          userMobile: [
            { required: true, message: '请输入手机号', trigger: 'blur,change' },
            { validator: checkUserMobileExists, trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入密码(由6-20位组成)', trigger: 'blur' },
            { type: 'string', min: 6, max: 20, message: '密码(由6-20位组成)' },
            { validator: validPassword }
          ],
          repassword: [
            { required: true, message: '请再次输入密码', trigger: 'blur' },
            { validator: validRepassword }
          ],
        },
        pickerOptions:{
        	disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
      	//*************************
      }
    },
    created(){
       // 获取地区数据
	    require.ensure([], require => {
	      this.provinceList = require('assets/cityforaddress.json')
	    })
    },
    methods:{
      resetBirthday(){
      	this.userObj.birthday = '';
      },
      loadCity(){
      	this.cityList = [];
      	this.areaList = [];
      	this.userObj.city = null;
      	this.userObj.area = null;
      	//清空变量
      	if(typeof this.userObj.province =='undefined' || this.userObj.province==''){
      		return;
      	}
        //从省份里读取数据
        
        setTimeout(()=>{
	        var p;
	        for(var i=0,li=this.provinceList.length; i<li; i++){
	        	p = this.provinceList[i];
	        	if(p.id == this.userObj.province){
	        		this.cityList = p.children;
	        		if(this.defCity){
	        			this.userObj.city = this.defCity;
			        	this.defCity = null;
			        }else{
			        	this.userObj.city = '';
			        	this.userObj.area = '';
			        }
	        		break;
	        	}
	        }
        });
        
      },
      loadArea(){
      	this.areaList = [];
      	this.userObj.area = null;
      	if(typeof this.userObj.city =='undefined' || this.userObj.city==''){
      		return;
      	}
      	
        //从城市里读取数据
        
        setTimeout(()=>{
	        var p;
	        for(var i=0,li=this.cityList.length; i<li; i++){
	        	p = this.cityList[i];
	        	if(p.id == this.userObj.city){
	        		this.areaList = p.children;
	        		if(this.defArea){
	        			this.userObj.area = this.defArea;
			        	this.defArea = null;
			        }else{
			        	this.userObj.area = '';
			        }
	        		break;
	        	}
	        }
        });
        
      },
      handleSuccess(file, fileList){
      	const {success,msg,result} = file.response;
      	if(!success){
      		this.$message({
	            type: success? 'success':'error',
	            message: msg
	        });
    		}else{
    			this.userObj.userPic = _.clone(result.picMD5);
    		}
      },
      handleError(err,file, fileList){
      },
      addUserInfo(){
      	var param = {
      		companyId : this.obj.companyId,
	        companyType: this.obj.companyType,
      		userAlias: _.trim(this.userObj.userAlias),
      		userMobile: _.trim(this.userObj.userMobile),
      		password: _.trim(this.userObj.password),
      		nickName: _.trim(this.userObj.nickName),
      		realName: _.trim(this.userObj.realName),
      		sex: this.userObj.sex
      	};
      	param.birthday = this.userObj.birthday;
  		if(typeof param.birthday != 'undefined' && param.birthday!='' && param.birthday.getTime()>new Date().getTime()){
      		this.$message({
      			showClose: true,
	            type: 'error',
	            message: '出生日期不能大于当前日期！'
	        });
      		return ;
      	}else if(typeof param.birthday == 'undefined' || param.birthday==''){
      		param.birthday = '';
      	}else{
      		let d = param.birthday;
      		let yyyy = d.getFullYear();
      		let MM = d.getMonth()+1;
      		let dd = d.getDate();
      		param.birthday = yyyy + '-'+(MM<10? 0:'')+MM +'-'+ (dd<10? 0:'')+dd;
      	}
      	
      	param.province = this.userObj.province;
      	param.city = this.userObj.city;
      	param.area = this.userObj.area;
      	param.userPic = this.userObj.userPic;
      	param.address = this.userObj.address;
      	
      	//处理 strAddress字段
      	
      	var strAddress = '';
      	for(var i=0,li=this.provinceList.length; i<li; i++){
        	if(this.userObj.province == this.provinceList[i].id){
        		strAddress = this.provinceList[i].text;
        		break;
        	}
        }
      	for(var i=0,li=this.cityList.length; i<li; i++){
        	if(this.userObj.city == this.cityList[i].id){
        		strAddress += (strAddress==''? '':'-')+this.cityList[i].text;
        		break;
        	}
        }
      	for(var i=0,li=this.areaList.length; i<li; i++){
        	if(this.userObj.area == this.areaList[i].id){
        		strAddress += (strAddress==''? '':'-')+this.areaList[i].text;
        		break;
        	}
        }
      	if(strAddress != ''){
      		param.strAddress = strAddress;
      	}
      	this.$refs.userObj.validate((valid) => {
          if (valid) {
          	
            addCompanyUser(param).then((data) => {
	            const {success,msg,result}=data;
		            this.$message({
			            type: success? 'success':'error',
			            message: msg
			        });
			        if(success){
								this.$emit('reback', 'userList');
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
      // 头像上传
      uploadBefore(file) {
        console.log('file.size: ', prettysize(file.size))
        // 限制文件大小
        if (parseInt(prettysize(file.size)) > 500) {
          this.$message.error('头像不能超过500kb, 请重新上传!')
          return false
        }

        this.uploading = 1
        try {
          this.previewPic = URL.createObjectURL(file)
        } catch(err) {
          this.previewPic = false
          console.log('URL.createObjectURL', err)
        }
      },

      uploadSuccess(response, file, fileList) {
        if (response.success) {
          this.uploading = 0
          this.picMD5_0 = response.result.picMD5
          this.userObj.userPic = response.result.picMD5
        }
      },

      uploadError (err, response, file) {
        console.log(`${file.name}上传失败!`)
        this.uploading = 2
      },
    },

    
  }
</script>
