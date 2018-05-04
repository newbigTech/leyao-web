<template lang="html">
    <div class="container-fluid">
        <div class="page-header" style="margin:10px;margin-top:20px;position:relative;">
            <h1 style="font-weight: bold;">添加专题</h1>
            <div style="float: right;position:absolute;right: 10px;top:-15px;">
                <el-button @click.native.prevent="$emit('forward','DaySubjectList')" type="success">返回</el-button>
            </div>
        </div>
        <!-- 查询条件 -->
        <div class="_setting-bar">
            <div class="_query-form">
                <div class="_query-form-item">
                    <el-form :inline="true" :model="queryParams">
                        <el-form-item>
                            <el-input v-model="queryParams.activityName" placeholder="专题名称" clearable></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="queryParams.shopName" placeholder="店铺名称" clearable></el-input>
                        </el-form-item>
                        <!-- <el-form-item style="width: 360px;">
                            <el-date-picker v-model="queryParams.queryDateTime" type="datetimerange" placeholder="专题截止时间范围" align="right" style="width:350px" :editable="false">
                            </el-date-picker>
                        </el-form-item> -->
                    </el-form>
                </div>
                <div class="_query-form-btn">
                    <el-button @click.native.prevent="loadTableData">查 询</el-button>
                </div>
            </div>
            <div class="_actions-btn">
                <!-- <el-button type="primary">新增</el-button> -->
            </div>
        </div>
        <div class="container-fluid">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th style="width:30%">
                            专题名
                        </th>
                        <th style="text-align: left;width:20%">
                            店铺名称
                        </th>
                        <th style="text-align: center;width:30%">
                            专题有效期
                        </th>
                        <th style="text-align: center;width:20%">
                            操作
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(g,i) in tableData">
                        <td>
                            <div class="row">
                                <div class="col-md-3">
                                    <img :src="cloudShowUrl + g.activityIcon" width="80px" height="80px" class="img-rounded">
                                </div>
                                <div class="col-md-9">
                                    <p style="color:blue">{{g.activityName}}</p>
                                </div>
                            </div>
                        </td>
                        <td>
                            {{g.shopName}}
                        </td>
                        <td align="center">
                            {{dateFormat(g.beginDtm)}} / {{dateFormat(g.endDtm)}}
                        </td>
                        <td align="center">
                            <el-button type="success" @click.native.prevent="onAddSubject(g)">添加到品类</el-button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <!-- 分页 -->
            <div class="_pagination" style="border: 0">
                <el-pagination :total="total" :page-size="pageSize" layout="total, sizes, prev, pager, next" @current-change="handleCurrentChange" @size-change="handleSizeChange">
                </el-pagination>
            </div>
        </div>
        <!-- 设置专题dialog -->
        <el-dialog title="设置专题" v-model="setSubjectVisible">
            <el-form :model="saveParams" :rules="rules" ref="saveParams">
                <el-form-item label="专题名称" :label-width="formLabelWidth" prop="activityName">
                    <el-input v-model="saveParams.activityName" auto-complete="off" placeholder="请设置专题名称" style="width:350px" :maxlength="50"></el-input>
                </el-form-item>
                <el-form-item label="专题有效期" :label-width="formLabelWidth" prop="setDateTimeHid">
                    <input type="hidden" v-model="saveParams.setDateTimeHid">
                    <el-date-picker v-model="setDateTime" type="daterange" placeholder="专题截止时间" align="right" style="width:350px" :editable="false" :picker-options="pickerOptions0">
                    </el-date-picker>
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
                    <el-col :span="13">
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
                    <el-col :span="11" v-show="saveParams.lbs===2">
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
    querySupplierActivityPageList,
    querySupplierDaySubject,
    addDaySubject
} from 'actions/activityAction'
import prettysize from "lib/utils/prettysize"
import ShopFile from 'pages/main/mall/common/components/shop_file'
export default {
    name: 'supplier_day_subject_form',
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
            page: 1,
            pageSize: 10,
            total: 0,
            tableData: [],
            dateFormat: function(val) {
                return _dateFormat(val, 'yyyy-MM-dd HH:mm:ss')
            },
            queryParams: {
                activityName: '',
                shopName: '',
                queryDateTime: '',
            },
            activityIcon: '',
            previewPic: '',
            loading: 0,
            setDateTime: '',
            saveParams: {
                shopId: 0,
                activityId: 0,
                activityName: '',
                activityIcon: '',
                lbs: 0,
                classifyId: 0,
                sortIndex: 0
            },
            pickerOptions0: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
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
                }],
                setDateTimeHid: [{
                    required: true,
                    message: '专题有效期不允许为空',
                    trigger: 'change'
                }]
            }
        }
    },
    watch: {
        setDateTime: function(val, oldVal) {
            if (_.isArray(val) && val.length === 2) {
                if (!_.isNull(val[0]) && !_.isNull(val[1])) {
                    this.saveParams.setDateTimeHid = _dateFormat(new Date(val[0]), 'yyyy-MM-dd')
                } else {
                    this.saveParams.setDateTimeHid = ''
                }
            } else {
                this.saveParams.setDateTimeHid = ''
            }
        }
    },
    methods: {
        openShopFileDialog() {
            this.shopFileDialog = true
            setTimeout(() => {
                this.$refs.shopFileComm.onLoadData()
            }, 0)
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
        onAddSubject(item) {
            this.setSubjectVisible = true
            this.saveParams.sortIndex = 0
            this.saveParams.classifyId = 0
            this.saveParams.lbs = 0
            this.saveParams.shopId = item.shopId
            this.saveParams.activityId = item.activityId
            this.saveParams.activityName = item.activityName
            this.saveParams.activityIcon = item.activityIcon
            this.saveParams.setDateTimeHid = item.beginDtm
            this.setDateTime = [_dateFormat(item.beginDtm, 'yyyy-MM-dd'), _dateFormat(item.endDtm, 'yyyy-MM-dd')]

        },
        onSaveSubject() {
            this.$refs.saveParams.validate(valid => {
                if (valid) {
                    if (_.isArray(this.setDateTime) && this.setDateTime.length === 2) {
                        if (!_.isNull(this.setDateTime[0]) && !_.isNull(this.setDateTime[1])) {
                            this.saveParams.startDay = _dateFormat(new Date(this.setDateTime[0]), 'yyyy-MM-dd')
                            this.saveParams.endDay = _dateFormat(new Date(this.setDateTime[1]), 'yyyy-MM-dd')
                        } else {
                            this.saveParams.startDay = ''
                            this.saveParams.endDay = ''
                        }
                    } else {
                        this.saveParams.startDay = ''
                        this.saveParams.endDay = ''
                    }
                    //console.log('this.saveParams', JSON.parse(JSON.stringify(this.saveParams)))
                    addDaySubject(this.saveParams).then(data => {
                        const {
                            success,
                            msg
                        } = data
                        if (success) {
                            this.setSubjectVisible = false
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
        loadTableData() {
            this.queryParams.pageNo = this.page
            this.queryParams.pageSize = this.pageSize
                //活动/专题类型 0 专题 1 特价 2 新人专享 3 包邮 4满减
            this.queryParams.activityType = 0
            // if (_.isArray(this.queryParams.queryDateTime) && this.queryParams.queryDateTime.length === 2) {
            //     if (!_.isNull(this.queryParams.queryDateTime[0]) && !_.isNull(this.queryParams.queryDateTime[1])) {
            //         this.queryParams.beginDtm = _dateFormat(new Date(this.queryParams.queryDateTime[0]), 'yyyy-MM-dd HH:mm:ss')
            //         this.queryParams.endDtm = _dateFormat(new Date(this.queryParams.queryDateTime[1]), 'yyyy-MM-dd HH:mm:ss')
            //     } else {
            //         this.queryParams.beginDtm = ''
            //         this.queryParams.endDtm = ''
            //     }
            // } else {
            //     this.queryParams.beginDtm = ''
            //     this.queryParams.endDtm = ''
            // }
            querySupplierActivityPageList(this.queryParams).then(data => {
                this.tableData = data.rows
                this.total = data.total
            })
        },
        handleSizeChange(val) {
            this.pageSize = val
            this.loadTableData()
        },
        handleCurrentChange(val) {
            this.page = val
            this.loadTableData()
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
        this.loadTableData()
        this.initSupplierClassifyData()
    }
}
</script>
<style lang="sass">
</style>
