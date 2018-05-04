<template>
    <!-- 第三步 设置新密码-->
    <div class="container-fluid" style="width:600px;">
        <el-form :model="paramsObj" :rules="rules" ref="paramsObj" label-width="100px" class="demo-paramsObj">
            <el-form-item label="新密码" required>
                <el-col :span="12">
                    <el-form-item prop="password">
                        <el-input type="password" v-model="paramsObj.password" placeholder="请输入密码" :maxlength="20"></el-input>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item label="确认新密码" required>
                <el-col :span="12">
                    <el-form-item prop="password2">
                        <el-input type="password" v-model="paramsObj.password2" placeholder="请输入确认新密码" :maxlength="20"></el-input>
                    </el-form-item>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-col :span="12">
                    <el-button type="primary" @click="handleSubmit" style="width:100%;">提交</el-button>
                </el-col>
            </el-form-item>
        </el-form>
        <!-- 提示信息 -->
        <p style="margin: 15px 0; color: #FF0033;">{{erroMsg}}</p>
    </div>
</template>
<script>
import RegExp from 'lib/utils/regexp'
import MD5 from 'crypto-js/md5'
import { resetUserPassword } from 'actions/userAction'

export default {
    name: 'forgot-password-step-3',
    props: {
        paramsObj: Object
    },
    data() {
        let validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.paramsObj.password2 !== '') {
                    this.$refs.paramsObj.validateField('password2');
                }
                callback();
            }
        };
        let validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.paramsObj.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            btnText: '',
            erroMsg: '',
            rules: {
                password: [{
                    required: true,
                    message: '请输入新密码',
                    trigger: 'blur'
                }, {
                    pattern: RegExp.alphaNumberChineseUnderline,
                    trigger: 'blur',
                    message: '格式错误，请输入新密码'
                }, {
                    validator: validatePass,
                    trigger: 'blur'
                }],
                password2: [{
                    required: true,
                    message: '请输入确认新密码',
                    trigger: 'blur'
                }, {
                    pattern: RegExp.alphaNumberChineseUnderline,
                    trigger: 'blur',
                    message: '格式错误，请输入确认新密码'
                }, {
                    validator: validatePass2,
                    trigger: 'blur'
                }]
            }
        }
    },
    methods: {
        handleSubmit(ev) {
        	this.erroMsg=''
            this.$refs.paramsObj.validate((valid) => {
                if (valid) {
                    let params = {
                        'userMobile': this.paramsObj.userMobile,
                        'mobileCode':this.paramsObj.mobileCode,
                        'password':MD5(this.paramsObj.password).toString()
                    }
                    resetUserPassword(params).then(data=>{
                    	if(data.success){
                    	  this.$emit('forward', 4)
                    	}else{
                    		this.erroMsg=data.msg
                    	}
                    })
                   
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
