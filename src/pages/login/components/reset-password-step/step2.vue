<template>
  <!-- 第二步 验证身份-->
  <div class="container-fluid" style="width:500px;">
        <el-form :model="paramsObj" :rules="rules" ref="paramsObj" label-width="100px" class="demo-paramsObj">
            <el-form-item label="短信验证码" prop="mobileCode">
                <div class="flex-vc">
                  <el-input v-model="paramsObj.mobileCode" placeholder="请输入短信验证码" :maxlength="7"></el-input>
                  <div style="margin-left: 10px;"> <el-button class="" @click.stop.prevent="onSendMobileCode" :disabled="sendSMSEnable">获取短信验证码{{btnText}}</el-button></div>
                </div>
                <!-- <el-col :span="12">
                    <el-form-item prop="mobileCode">
                        <el-input v-model="paramsObj.mobileCode" placeholder="请输入短信验证码" :maxlength="7"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                <div style="padding-left: 10px;"> <el-button class="" @click.stop.prevent="onSendMobileCode" :disabled="sendSMSEnable">获取短信验证码{{btnText}}</el-button></div>
                </el-col> -->
            </el-form-item>
            <el-form-item>
                <el-col :span="12">
                    <el-button type="primary" @click="handleSubmit">下一步</el-button>
                </el-col>
            </el-form-item>
        </el-form>
        <!-- 提示信息 -->
        <p style="margin: 15px 0; color: #FF0033;">{{erroMsg}}</p>
    </div>
</template>

<script>
  import RegExp from 'lib/utils/regexp'
  import { sendMobileCode,verifyMobileCode } from 'actions/userAction'
  export default {
    name: 'forgot-password-step-2',
    props:{
    	paramsObj:Object
    },
    data(){
    	let vmobileCode=(rule, value, callback) => {
            verifyMobileCode({
            	'userMobile':this.paramsObj.userMobile,
                'mobileCode': value
            }).then(data => {
            	if (!data.success) {
                    callback(new Error(data.msg));
                } else {
                    callback()
                }
            })
        }
    	return{
    		btnText:'',
    		erroMsg:'',
    		timerCount:60,
    		sendSMSEnable: true,
    		rules: {
                mobileCode: [{
                    required: true,
                    message: '请输入短信验证码',
                    trigger: 'blur'
                }, {
                    pattern: RegExp.alphaNumber,
                    trigger: 'blur',
                    message: '格式错误，请输入短信验证码'
                },{
                	validator:vmobileCode,
                	trigger:'blur'
                }]
            }
    	}
    },
    methods: {
    	onSendMobileCode() {
            this.timerCount = 60;
            this.sendSMSEnable = true;
            sendMobileCode({'userMobile':this.paramsObj.userMobile})
            .then( data => {
                const { success, msg } = data;
                if (!success) {
                    this.erroMsg = msg
                    return false;
                }
            });
            let timer = setInterval(() => {
                this.timerCount--;
                if (this.timerCount === 0) {
                    clearInterval(timer);
                    this.btnText = '';
                    this.sendSMSEnable = false;
                } else {
                    this.btnText = '(' + this.timerCount + '秒)';
                }
            }, 1000);
        },
        handleSubmit(ev) {
            this.$refs.paramsObj.validate((valid) => {
                if (valid) {
                   this.$emit('forward',3)
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    },
  }
</script>

<style lang="sass">

</style>
