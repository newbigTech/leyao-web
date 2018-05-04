<template lang="html">
    <div class="container-fluid">
        <!-- 设置专题dialog -->
        <el-dialog title="编辑专题" v-model="setSubjectVisible">
            <el-form :model="saveParams" :rules="rules" ref="saveParams">
                <el-form-item label="专题日期" :label-width="formLabelWidth">
                    <el-col :span="8">
                        {{saveParams.day}}
                    </el-col>
                    <el-col :span="16">
                       <el-checkbox v-model="saveParams.updateAllFlag">批量更新&nbsp;
                            <el-tooltip class="item" effect="dark" content="批量更新所有对应该专题的日期数据" placement="right-start">
                              <i class="el-icon-information"></i>
                            </el-tooltip>
                        </el-checkbox>
                    </el-col>
                </el-form-item>
                <el-form-item label="专题名称" :label-width="formLabelWidth" prop="activityName">
                    <el-input v-model="saveParams.activityName" auto-complete="off" placeholder="请设置专题名称" style="width:350px" :maxlength="50"></el-input>
                </el-form-item>
                <el-form-item label="专题图标" :label-width="formLabelWidth">
                        <div class="_upload-select" style="position:relative;" @click="openShopFileDialog()">
                            <div class="_upload-select-box" :class="{'_loading': loading > 0}" style="width:80px;height:80px;border: 0">
                                <div class="_upload-select-icon"><i class="el-icon-upload"></i></div>
                                <div class="_upload-select-text">点击上传图标</div>
                                <div class="_upload-select-loading">
                                    <div v-show="loading == 1">上传中 <i class="el-icon-loading"></i></div>
                                    <div v-show="loading == 2" class="__upload-select-loading-error">上传失败,请重试...</div>
                                </div>
                                <div class="_upload-select-preview" v-show="!!saveParams.activityIcon && (saveParams.activityIcon.length > 1)">
                                    <img :src="saveParams.activityIcon !== activityIcon ? (cloudShowUrl + saveParams.activityIcon) : previewPic">
                                    <div class="_upload-select-cover"> <span>点击更换图片</span></div>
                                    <div style="position:absolute;right: 4px;top:-10px;z-index: 100" @click.stop.prevent="saveParams.activityIcon='';activityIcon='';"> <span>X</span></div>
                                </div>
                            </div>
                            <div class="_upload-select-lable"></div>
                        </div>
                </el-form-item>
                <el-form-item label="位置" :label-width="formLabelWidth">
                    <el-col :span="10">
                        <el-form-item>
                            <el-radio-group v-model.number="saveParams.lbs" @change="onLbsChange">
                                <el-radio :label="0">置顶</el-radio>
                                <el-radio :label="1">置底</el-radio>
                                <el-radio :label="2">自定义 &nbsp;
                                    <el-tooltip class="item" effect="dark" content="自定义专题放置位置会在选择品类下方展示" placement="right-start">
                                        <i class="el-icon-information"></i>
                                    </el-tooltip>
                                </el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="14" v-show="saveParams.lbs===2">
                        <el-form-item prop="classifyId">
                            <el-select v-model.number="saveParams.classifyId" :disabled="saveParams.lbs!==2" clearable placeholder="请选择品类" style="width:150px">
                                <el-option v-for="item in classifyData" :label="item.classifyName" :value="item.classifyId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-form-item>
                <el-form-item label="排序" :label-width="formLabelWidth">
                    <el-input-number v-model="saveParams.sortIndex" :min="0" :max="999" style="display: block;"></el-input-number>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="setSubjectVisible = false">取 消</el-button>
                <el-button type="primary" @click.stop.prevent="onSaveSubject">确 定</el-button>
            </div>
        </el-dialog>
        <!--商品图库Dialog-->
       <el-dialog title="图库" v-model="shopFileDialog" class="shop-img-file-dialog">
          <shop-file @onSuccess="getShopFile" ref="shopFileComm"></shop-file>
       </el-dialog>
    </div>
</template>
<script>
import {
    dateFormat as _dateFormat
} from "lib/utils/dateFormat"
import {
    querySupplierDaySubject,
    editDaySubject
} from 'actions/activityAction'
import prettysize from "lib/utils/prettysize"
import ShopFile from 'pages/main/mall/common/components/shop_file'
export default {
    name: 'supplier_day_subject_form',
    components:{ShopFile},
    computed: {
        cloudShowUrl() {
            return this.$store.getters.cloudShowUrl
        }
    },
    data() {
        return {
            shopFileDialog:false,
            dateFormat: function(val) {
                return _dateFormat(val, 'yyyy-MM-dd hh:mm:ss')
            },
            activityIcon: '',
            previewPic: '',
            loading: 0,
            saveParams: {
                shopId: 0,
                activityId: 0,
                dayClassifyId: '',
                activityName: '',
                activityIcon: '',
                lbs: 0,
                classifyId: 0,
                sortIndex: 0,
                day: '',
                startDay: '',
                endDay: '',
                updateAllFlag:false
            },
            formLabelWidth: '120px',
            setSubjectVisible: false,
            classifyData: [],
            rules: {
                classifyId: [{
                    type: 'number',
                    required: true,
                    message: '请选择品类',
                    trigger: 'change'
                }],
                activityName: [{
                    required: true,
                    message: '专题名称不允许为空',
                    trigger: 'blur'
                }]
            }
        }
    },
    methods: {
      openShopFileDialog() {
        this.shopFileDialog = true
        setTimeout(()=>{this.$refs.shopFileComm.onLoadData()},0)
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
              this.saveParams.activityIcon = shopFiles[0].fileMd5  
            }
      },
        onLbsChange(v) {
            if (v === 2) {
                this.saveParams.classifyId = ''
            } else {
                this.saveParams.classifyId = 0
            }
        },
        onSaveSubject() {
            this.$refs.saveParams.validate(valid => {
                if (valid) {
                    //console.log('this.saveParams',this.saveParams)
                    //console.log('this.saveParams', JSON.parse(JSON.stringify(this.saveParams)))
                    editDaySubject(this.saveParams).then(data => {
                        const {
                            success,
                            msg
                        } = data
                        if (success) {
                            this.setSubjectVisible = false
                            this.$emit('onBack')
                            this.$message.success('操作成功')
                        } else {
                            this.$message.error(msg)
                        }
                    })
                } else {
                    return false;
                }
            })
        },
        initSupplierClassifyData() {
            querySupplierDaySubject({
                parentId: 0
            }).then(data => {
                this.classifyData = data || []
            })
        },
        uploadBefore(file) {
            // 限制文件大小 (大图标200kb一下)
            if (parseInt(prettysize(file.size)) > 200) {
                this.$message.error('小图标不能超过200kb, 请重新上传!')
                return false
            }
            this.loading = 1
            try {
                this.previewPic = URL.createObjectURL(file)
            } catch (err) {
                this.previewPic = false
                console.log('URL.createObjectURL', err)
            }
        },
        uploadSuccess(response, file, fileList) {
            if (response.success) {
                this.loading = 0
                this.activityIcon = response.result.picMD5
                this.saveParams.activityIcon = response.result.picMD5
            }
        },
        uploadError(err, response, file) {
            this.loading = 2
        }
    },
    created() {
        this.initSupplierClassifyData()
    }
}
</script>
<style lang="sass">
</style>
