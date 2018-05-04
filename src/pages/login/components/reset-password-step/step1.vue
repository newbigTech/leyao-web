<template>
    <!-- 第一步 填写账户名-->
    <div class="container-fluid" style="width:500px;">
        <el-form :model="paramsObj" :rules="rules" ref="paramsObj" label-width="100px" class="demo-paramsObj">
            <el-form-item label="手机号" prop="userMobile">
                <el-input v-model="paramsObj.userMobile" placeholder="请输入手机号" :maxlength="11"></el-input>
            </el-form-item>
            <el-form-item label="验证码" prop="authCode" required>
                <div class="flex-vc">
                  <el-input v-model="paramsObj.authCode" placeholder="请输入验证码" :maxlength="5"></el-input>
                  <div class="vcode-img" @click="onGetCode" style="margin-left: 10px; cursor: pointer;"><img :src="getcode"></div>
                </div>
            </el-form-item>
            <el-form-item style="margin-top: 10px;">
                <el-col :span="12">
                    <el-button type="primary" @click="handleSubmit">下一步</el-button>
                </el-col>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
import RegExp from 'lib/utils/regexp'
import { existMobile,existAuthCode } from 'actions/userAction'
export default {
    name: 'forgot-password-step-1',
    props:{
    	paramsObj:Object
    },
    data() {
        let userExist = (rule, value, callback) => {
            existMobile({
                'userMobile': value
            }).then(data => {
                if (!data.success) {
                    callback(new Error(data.msg));
                } else {
                    callback()
                }
            })
        }
        let verifyAuthCode=(rule, value, callback) => {
            existAuthCode({
                'authCode': value
            }).then(data => {
            	let result=JSON.parse(data)
                if (!result.result) {
                    callback(new Error('验证码错误'));
                } else {
                    callback()
                }
            })
        }
        return {
            getCodePath: 'pub/pubController/getCode?r=',
            getcode: 'pub/pubController/getCode',
            rules: {
                userMobile: [{
                    required: true,
                    message: '请输入手机号',
                    trigger: 'blur'
                }, {
                    pattern: RegExp.mobile,
                    trigger: 'blur',
                    message: '格式错误，请输入手机号'
                }, {
                    validator: userExist,
                    trigger: 'blur'
                }],
                authCode: [{
                    required: true,
                    message: '请输入验证码',
                    trigger: 'blur'
                }, {
                    pattern: RegExp.alphaNumber,
                    trigger: 'blur',
                    message: '格式错误，请输入验证码'
                },{
                	validator:verifyAuthCode,
                	trigger:'blur'
                }]
            }
        };
    },
    methods: {
        handleSubmit(ev) {
            this.$refs.paramsObj.validate((valid) => {
                if (valid) {
                   this.$emit('forward',2,this.paramsObj)
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        onGetCode(){
        	this.getcode = this.getCodePath + Math.random()
        }
    },
    mounted() {
    }
}
</script>
<style lang="sass">
</style>
