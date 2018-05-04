<template>
    <div>
        <!-- 导航面包屑 -->
        <div class="_breadcrumb">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/mall' }">商城</el-breadcrumb-item>
                <el-breadcrumb-item>电商基础设置</el-breadcrumb-item>
                <el-breadcrumb-item>电商管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container-fluid" style="padding-top: 25px;">
            <card-panel>
                <span slot="title">电商管理</span>
                <div slot="panel-btns">
                </div>
                <div slot="panel-body">
                    <el-form :model="supplierObj" :rules="rules" ref="supplierObj" label-width="150px">
                        <el-form-item label="电商名称" prop="supplierName">
                            <el-input v-model="supplierObj.supplierName" :maxlength="20" style="width:330px"></el-input>
                        </el-form-item>
                        <el-form-item label="电商全称" prop="supplierFullName">
                            <el-input v-model="supplierObj.supplierFullName" :maxlength="100" style="width:330px"></el-input>
                        </el-form-item>
                        <el-form-item label="电商编码">
                            <el-input v-model="supplierObj.supplierCode" :maxlength="100" style="width:330px" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="合同编号">
                            <el-input v-model="supplierObj.contractNo" :maxlength="100" style="width:330px" :disabled="true"></el-input>
                        </el-form-item>
                        <el-form-item label="电商LOGO">
                            <div class="_classify-uploader">
                                <div class="_upload-select" @click="openShopFileDialog(0)">
                                    <div class="_upload-select-box" style="width:80px;height:80px;">
                                        <div class="_upload-select-icon"><i class="el-icon-upload"></i></div>
                                        <div class="_upload-select-text">点击上传</div>
                                        <div class="_upload-select-preview" v-show="!!supplierObj.supplierLogo && (supplierObj.supplierLogo.length > 1)">
                                            <img :src="supplierObj.supplierLogo ? ((cloudShowUrl + supplierObj.supplierLogo)) : ''">
                                            <div class="_upload-select-cover"> <span>点击更换图片</span> </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item label="电商图片">
                            <div class="_classify-uploader">
                                <div class="_upload-select" @click="openShopFileDialog(1)">
                                    <div class="_upload-select-box">
                                        <div class="_upload-select-icon"><i class="el-icon-upload"></i></div>
                                        <div class="_upload-select-text">点击上传</div>
                                        <div class="_upload-select-preview" v-show="!!supplierObj.supplierPic && (supplierObj.supplierPic.length > 1)">
                                            <img :src="supplierObj.supplierPic ? ((cloudShowUrl + supplierObj.supplierPic)) : ''">
                                            <div class="_upload-select-cover"> <span>点击更换图片</span> </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item label="商品显示充值">
                            <el-radio-group v-model.number="supplierObj.isShowRecharge">
                                <el-radio :label="0">否</el-radio>
                                <el-radio :label="1">是</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="充值广告备注">
                            <el-input v-model="supplierObj.rechargeNote" :maxlength="150" style="width:330px"></el-input>
                        </el-form-item>
                        <el-form-item label="商品显示网销卡">
                            <el-radio-group v-model.number="supplierObj.isShowRechargeCard">
                                <el-radio :label="0">否</el-radio>
                                <el-radio :label="1">是</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="网销卡广告备注">
                            <el-input v-model="supplierObj.rechargeCardNote" :maxlength="150" style="width:330px"></el-input>
                        </el-form-item>
                        <el-form-item label="是否开启退订">
                            <el-radio-group v-model.number="supplierObj.openBackFlag">
                                <el-radio :label="0">否</el-radio>
                                <el-radio :label="1">是</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click.stop.prevent="onSave()">保存</el-button>
                        </el-form-item>
                    </el-form>
                </div>
            </card-panel>
        </div>
        <!--商品图库Dialog-->
        <el-dialog title="商品图库" v-model="shopFileDialog" class="shop-img-file-dialog">
            <shop-file @onSuccess="getShopFile" :vm="tab5vm"></shop-file>
        </el-dialog>
    </div>
</template>
<script>
import {
    dateFormat as _dateFormat
} from "lib/utils/dateFormat"
import {
    getSupplierObj,
    editSupplierObj,
    exsitSupplierName
} from "actions/supplierAction"
import ShopFile from 'pages/main/mall/common/components/shop_file'
export default {
    name: 'supplierManagement',
    components: {
        ShopFile
    },
    computed: {
        cloudShowUrl() {
            return this.$store.getters.cloudShowUrl
        }
    },
    data() {
        return {
            shopFileDialog: false,
            shopFileIndex: 0,
            tab5vm: new this.$root.constructor(),
            supplierObj: {
                supplierName: '',
                supplierFullName: '',
                supplierCode: '',
                supplierLogo: '',
                supplierPic: '',
                contractNo:'',
                isShowRecharge:0,
                rechargeNote:'',
                isShowRechargeCard:0,
                rechargeCardNote:'',
                openBackFlag:0
            },
            rules: {
                supplierName: [{
                    required: true,
                    message: '请输入电商名称',
                    trigger: 'blur'
                }, {
                    trigger: 'blur',
                    validator(rule, value, callback, source, options) {
                        var errors = [];
                        exsitSupplierName({'supplierName':value}).then(data=>{
                            if(data.success){
                                callback(new Error('已存在的电商名'))
                            }else{
                                callback(errors)
                            }
                        })
                    }
                }],
                supplierFullName: [{
                    required: true,
                    message: '请输入电商全称',
                    trigger: 'blur'
                }],
            }
        }
    },
    methods: {
        onSave() {
            this.$refs.supplierObj.validate((valid) => {
                if (valid) {
                this.$confirm('是否确认提交?', '提示', {
                     type: 'warning'
                    }).then(() => {
                    editSupplierObj(this.supplierObj).then(data => {
                    const {
                        success,
                        msg,
                        result
                    } = data
                    if (success) {
                        this.$message({
                            type: 'success',
                            message: '操作成功!'
                        });
                        this.$store.getters.ev.$emit('changeSupplierName',this.supplierObj.supplierName)
                        this.$store.state.loginUser.selectedName=this.supplierObj.supplierName
                        _.each(this.$store.state.loginUser.selectedList,item=>{
                            if(item.id==this.$store.getters.supplierID){
                               item.itemName= this.supplierObj.supplierName
                            }
                        })
                    } else {
                        this.$message.error(msg);
                    }
                })
            }).catch(() => {})
                }
            })
          
        },
        openShopFileDialog(i) {
            this.shopFileIndex = i
            this.shopFileDialog = true
            this.tab5vm.$emit('on-load')
        },
        getShopFile(shopFiles) {
            if (shopFiles.length == 0) {
                this.shopFileDialog = false
                return false
            }
            if (shopFiles.length > 1) {
                this.$message.error('只能选择一张图片')
                return false
            } else {
                this.shopFileDialog = false
                if (this.shopFileIndex === 0)
                    this.supplierObj.supplierLogo = shopFiles[0].fileMd5
                if (this.shopFileIndex === 1)
                    this.supplierObj.supplierPic = shopFiles[0].fileMd5
            }

        },
        loadData() {
            getSupplierObj().then(data => {
                const { success, result } = data
                if (success) {
                    Object.assign(this.supplierObj, _.pick(result, ['supplierName','supplierFullName', 'supplierCode', 'supplierLogo', 'supplierPic', 'contractNo', 'isShowRecharge', 'rechargeNote', 'isShowRechargeCard', 'rechargeCardNote']))
                    this.supplierObj.openBackFlag=result.intVal1
                    //this.supplierObj = result
                }
            })
        }
    },
    created() {
        this.loadData()
    }
}
</script>
