<!-- 商品新增修改主界面-->
<template>
    <div class="_container">
        <card-panel>
            <span slot="title">{{paramObj.openId?'编辑':'创建开放API'}}</span>
            <div slot="panel-btns">
                <el-button size="small" type="success" @click.native.prevent="$emit('forward','OpenList')">返回列表</el-button>
            </div>
            <div slot="panel-body">
                <el-form :model="openAPIObj" :rules="rules" ref="openAPIObj" label-width="150px">
                <el-form-item label="开放类型">
                      <el-radio-group v-model.number="openAPIObj.openType" @change="openTypeChange" :disabled="paramObj.openId>0">
                            <el-radio :label="0">主动推送</el-radio>
                            <el-radio :label="1">服务商应用</el-radio>
                       </el-radio-group>     
                    </el-form-item>
                    <el-form-item label="接入应用名称" prop="openName">
                        <el-input v-model="openAPIObj.openName" :maxlength="100" style="width:330px" :disabled="openAPIObj.openType===0"></el-input>
                    </el-form-item>
                    <el-form-item label="应用公钥">
                        <el-input v-model="openAPIObj.apiKey" :maxlength="50" style="width:330px" readonly></el-input>
                    </el-form-item>
                    <el-form-item label="应用私钥">
                        <el-input v-model="openAPIObj.apiPrivateKey" :maxlength="50" style="width:330px" readonly></el-input>
                    </el-form-item>
                    <el-form-item v-if="openAPIObj.openType===0" label="应用回调URL" prop="apiBackUrl">
                        <el-input v-model="openAPIObj.apiBackUrl" :maxlength="150" style="width:330px"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click.stop.prevent="onSave">保存</el-button>
                        <el-button @click.native.prevent="$emit('forward','OpenList')">返回列表</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </card-panel>
    </div>
</template>
<script>
import RegExp from 'lib/utils/regexp'
import {
    addOrUpdateMallOpen
} from 'actions/shopAction'

import uuid from 'node-uuid'
import MD5 from 'crypto-js/md5'
export default {
    name: 'open_api_add',
    components: {
    },
    props: {
        paramObj: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            openAPIObj: {
                openType: 0,
                openName: '主动推送',
                apiKey:'',
                apiPrivateKey:'',
                apiBackUrl:''
            },
            rules: {
                openName: [{
                    required: true,
                    message: '请输入接入应用名称',
                    trigger: 'blur'
                }],
                apiBackUrl: [{
                    required: true,
                    message: '请输入应用回调URL',
                    trigger: 'blur'
                }]
            }
        }
    },
    methods: {
        openTypeChange(v) {
            if (v == 0) {
                this.openAPIObj.openName = '主动推送'
            }else{
                this.openAPIObj.openName=''
            }
        },
        onSave() {
            this.$refs.openAPIObj.validate(valid => {
                if (valid) {
                 let params={}
                 Object.assign(params,this.openAPIObj)
                 addOrUpdateMallOpen(params).then(data=>{
                    if(data.success){
                      this.$message.success('操作成功')
                      this.$emit('forward', 'OpenList')
                    }else{
                      this.$message.error(data.msg)
                      return false
                    }
                 })
                }
            })
        }
    },
    created() {
       if(this.paramObj.openId){
         Object.assign(this.openAPIObj, _.pick(this.paramObj,['openId','openType','openName','apiKey','apiPrivateKey','apiBackUrl']))
       }else{
        this.openAPIObj.apiKey= MD5(uuid.v4()).toString()
        this.openAPIObj.apiPrivateKey= MD5(uuid.v4()).toString()
       }
    }
}
</script>
