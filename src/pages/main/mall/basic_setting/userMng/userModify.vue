<template>
  <div class="_container">
    <card-panel>
      <h3 slot="title">用户信息修改</h3>
      <div slot="panel-btns"><button class="btn btn-sm btn-default" @click="$emit('reback', 'userList')">返回</button></div>
      <div slot="panel-body">
          <div class="grid-content bg-purple">
            <el-form class="demo-form" style="width:450px;" ref="form" :model="userObj" label-width="80px">
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
                  <el-col :span="0" style="width: 62px; margin-left: 10px;">
                    <el-button @click.native="resetBirthday" >清空</el-button>
                  </el-col>
                </el-row>
              </el-form-item>
              <el-form-item label="状态">
                <el-radio-group v-model="userObj.statusCode">
                  <el-radio :label="0" v-if="userObj.statusCode==0">正常</el-radio>
                  <el-radio :label="1" v-if="userObj.statusCode==1">禁用</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="用户头像">
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
                <el-button @click.native="modifyUserInfo" type="primary">修改</el-button>
                <el-button @click.native.prevent="$emit('reback', 'userList')">返回</el-button>
              </el-form-item>
            </el-form>
        </div>
      </div>
    </card-panel>
  </div>
</template>
<style>
	.demo-form .line { text-align:center;}
</style>
<script>
  import http from 'src/lib/utils/https'
  import { getCompanyUserDetail,modifyCompanyUser } from 'src/vuex/actions/userAction'
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
      return {
      	loading:false,//遮罩层
      	userObj:{},
      	defUserObj:{},
      	provinceList:[],
      	cityList:[],
      	areaList:[],
				isFirst:true,
        // 头像上传
        previewPic: "",
        uploading: 0,
        picMD5_0: '',
      	
      	//标记默认选中
      	defCity:'',
      	defArea:'',
        pickerOptions:{
        	disabledDate(time) {
            return time.getTime() > Date.now();
          }
        },
      }
    },
    created(){
     /* http.get('static/cityforaddress.json').then((data) => {
      	this.provinceList = data;
      });*/

      this.loadUserDetail();
    },
    methods:{
      resetBirthday(){
      	this.userObj.birthday = '';
      },
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
            	// 获取地区数据
					    require.ensure([], require => {
					      this.provinceList = require('assets/cityforaddress.json')
                this.userObj = result ;
                this.defUserObj = _.clone(result);
					    })
            }
        });
      },
      loadCity(){
      	this.cityList = [];
      	this.areaList = [];
      	if( !this.isFirst){
	      	this.userObj.city = '';
	      	this.userObj.area = '';
      	}
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
	        		break;
	        	}
	        }
        });
        
      },
      loadArea(){
      	this.areaList = [];
      	if( !this.isFirst){
	      	this.userObj.area = '';
      	}else{
      		this.isFirst = false;
      	}
      	
        //从城市里读取数据
        
        setTimeout(()=>{
	        var p;
	        for(var i=0,li=this.cityList.length; i<li; i++){
	        	p = this.cityList[i];
	        	if(p.id == this.userObj.city){
	        		this.areaList = p.children;
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
      modifyUserInfo(){
      	var param = {};
      	if(this.defUserObj.nickName != this.userObj.nickName){
      		param.nickName = this.userObj.nickName;
      	}
      	if(this.defUserObj.realName != this.userObj.realName){
      		param.realName = this.userObj.realName;
      	}
      	if(this.defUserObj.sex != this.userObj.sex){
      		param.sex = this.userObj.sex;
      	}
      	if(this.defUserObj.birthday != this.userObj.birthday){
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
      	}
      		
      	/*if(this.defUserObj.statusCode != this.userObj.statusCode){
      		param.statusCode = this.userObj.statusCode;
      	}*/
      	var isChange = false;
      	if(this.defUserObj.province != this.userObj.province){
      		param.province = this.userObj.province;
      		isChange = true;
      	}
      	if(this.defUserObj.city != this.userObj.city){
      		param.city = this.userObj.city;
      		isChange = true;
      	}
      	if(this.defUserObj.area != this.userObj.area){
      		param.area = this.userObj.area;
      		isChange = true;
      	}
      	if(this.defUserObj.userPic != this.userObj.userPic){
      		param.userPic = this.userObj.userPic;
      	}
      	if(this.defUserObj.address != this.userObj.address){
      		param.address = this.userObj.address;
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
      	param.userId = this.defUserObj.userId;
      	
      	if(isChange){
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
      	}
      	
      	this.$confirm('确定修改用户信息么？', '提示', {
          type: 'info'
        }).then(() => {//确定
	        modifyCompanyUser(param).then((data) => {
            const {success,msg,result}=data;
            this.$message({
	            type: success? 'success':'error',
	            message: msg
		        });
		        if(success){
							this.$emit('reback', 'userList');
		        }
	        }); 
          
        }).catch(() => {//取消
                    
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
    }
  }
</script>
