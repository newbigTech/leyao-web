<template lang="html">
    <div>
        <div class="container-fluid _day_subject">
            <div class="page-header" style="margin:0;position:relative;">
                <h1>分类专题</h1>
                <div style="float: right;position:absolute;right: 10px;top:-15px;">
                    <el-button type="success" @click.native.prevent="$emit('forward','DaySubjectForm')">添加专题</el-button>
                </div>
            </div>
            <div class="_day_header">
                <el-row :gutter="2">
                    <el-col :span="6">
                        <div class="_grid-content _bg-purple">
                            <p class="_day_header_p" :class="curClassifyId===n.classifyId?'high_p':''" v-for="n in classifyData"><a href="javascript:void(0);" @click="onLoadLevel2Data(n)">
                             <el-badge is-dot class="item" v-if="n.type===1">{{n.classifyName}}</el-badge>
                             <span v-else>{{n.classifyName}}</span>
                             <i class="el-icon-d-arrow-right" v-show="curClassifyId===n.classifyId" style="font-size: 10px;float: right;padding-top:5px;"></i></a></p>
                            <!-- <p class="_day_header_p"><a href="void:(0);">食品生鲜</a></p>
                            <p class="_day_header_p"><a href="void:(0);">进口食品</a></p>
                            <p class="_day_header_p"><a href="void:(0);">酒水饮料</a></p>
                            <p class="_day_header_p"><a href="void:(0);">手机数码</a></p>
                            <p class="_day_header_p"><a href="void:(0);">进口食品</a></p>
                            <p class="_day_header_p"><a href="void:(0);">进口食品</a></p>
                            <p class="_day_header_p"><a href="void:(0);">进口食品</a></p>
                            <p class="_day_header_p"><a href="void:(0);">进口食品</a></p>
                            <p class="_day_header_p"><a href="void:(0);">进口食品</a></p>
                            <p class="_day_header_p"><a href="void:(0);">进口食品</a></p>
                            <p class="_day_header_p"><a href="void:(0);">进口食品</a></p>
                            <p class="_day_header_p"><a href="void:(0);">进口食品</a></p>
                            <p class="_day_header_p"><a href="void:(0);">进口食品</a></p>
                            <p class="_day_header_p"><a href="void:(0);">进口食品</a></p> -->
                        </div>
                    </el-col>
                    <el-col :span="18">
                        <div class="_grid-content">
                            <div style="position:absolute;right: 5px;top:5px;" v-if="curSelected.classifyId&&!disabledDate(curDate)">
                                <el-dropdown>
                                    <span class="el-dropdown-link">
                                     编辑当前专题<i class="el-icon-caret-bottom el-icon--right"></i>
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item @click.native.prevent="onEditSubject">编辑</el-dropdown-item>
                                        <el-dropdown-item @click.native.prevent="openDelDailog">删除</el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </div>
                            <ul class="_level_classify_ul clearfix">
                                <li v-for="(item, index) in level2Data">
                                    <a href="javascript:void(0)"><img :src="cloudShowUrl + item.classifyPic" width="60px" height="60px" class="img-circle" v-show="item.classifyPic">
                                        <p>
                                            <span class="label label-default">{{item.classifyName}}</span>
                                        </p>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </el-col>
                </el-row>
            </div>
            <date-selected @onSuccess="onChangeDate"></date-selected>
            <br>
        </div>
        <day-subject-edit ref="day_subject_edit_comm" @onBack="initClassifyData"></day-subject-edit>
        <!-- 删除专题dialog -->
        <el-dialog title="删除专题" v-model="delSubjectVisible">
            <el-form :model="delParams" :rules="rules" ref="delParams">
                <el-form-item label="专题名称" :label-width="formLabelWidth">
                    {{curSelected.classifyName}}
                </el-form-item>
                <el-form-item label="删除选项" :label-width="formLabelWidth">
                    <el-col :span="14">
                        <el-form-item>
                            <el-radio-group v-model.number="delParams.deleteSign">
                                <el-radio :label="0">仅删除当前日期</el-radio>
                                <el-radio :label="1">批量删除</el-radio>
                                <el-radio :label="2">指定日期范围删除 &nbsp;
                                    <!-- <el-tooltip class="item" effect="dark" content="自定义专题放置位置会在选择品类下方展示" placement="right-start">
                                        <i class="el-icon-information"></i>
                                    </el-tooltip> -->
                                </el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                    <el-col :span="10" v-show="delParams.deleteSign===2">
                        <el-form-item prop="delDateTimeHid">
                            <input type="hidden" v-model="delParams.delDateTimeHid">
                            <el-date-picker v-model="delDateTime" type="daterange" placeholder="专题截止时间" align="right" style="width:230px" :editable="false" :picker-options="pickerOptions">
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="delSubjectVisible = false">取 消</el-button>
                <el-button type="primary" @click.stop.prevent="onDelSubject">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import {
    dateFormat as _dateFormat
} from "lib/utils/dateFormat"
import {
    querySupplierDaySubject,
    deleteDaySubject
} from 'actions/activityAction'
import DaySubjectEdit from './day_subject_edit'
import DateSelected from '../components/date-selected'
export default {
    name: 'supplier_day_subject_list',
    components: {
        DaySubjectEdit,DateSelected
    },
    computed: {
        cloudShowUrl() {
            return this.$store.getters.cloudShowUrl
        }
    },
    data() {
        return {
            curSelected: {},
            curClassifyId: 0,
            curDate: _.now(),
            classifyData: [],
            level2Data: [],
            formLabelWidth: '120px',
            delSubjectVisible: false,
            delDateTime: '',
            delParams: {
                deleteSign: 0,
                delDateTimeHid: ''
            },
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            rules: {
                delDateTimeHid: [{
                    required: true,
                    message: '截止日期不允许为空',
                    trigger: 'change'
                }]
            }
        }
    },
    methods: {
        openDelDailog() {
            this.delSubjectVisible = true
            this.delDateTime = ''
        },
        disabledDate(time) {
            return new Date(time).getTime() < Date.now() - 8.64e7;
        },
        onEditSubject() {
            //console.log('this.curSelected',this.curSelected)
            //console.log('this.$refs.day_subject_edit_comm',this.$refs.day_subject_edit_comm)
            Object.assign(this.$refs.day_subject_edit_comm.saveParams, this.curSelected)
            this.$refs.day_subject_edit_comm.saveParams.activityName = this.curSelected.classifyName
            this.$refs.day_subject_edit_comm.saveParams.classifyId = this.curSelected.beClassifyId
            this.$refs.day_subject_edit_comm.saveParams.dayClassifyId = this.curSelected.classifyId
            this.$refs.day_subject_edit_comm.saveParams.updateAllFlag = false
            this.$refs.day_subject_edit_comm.setSubjectVisible = true
        },
        onDelSubject() {
            Object.assign(this.delParams, this.curSelected)
            if (this.delParams.deleteSign !== 2) {
                deleteDaySubject(this.delParams).then(data => {
                    const { success, msg } = data
                    if (success) {
                        this.delSubjectVisible = false
                        this.initClassifyData()
                        this.$message.success('操作成功')
                    } else {
                        this.$message.error(msg)
                    }
                })
            } else {
                this.$refs.delParams.validate(valid => {
                    if (valid) {
                        if (_.isArray(this.delDateTime) && this.delDateTime.length === 2) {
                            if (!_.isNull(this.delDateTime[0]) && !_.isNull(this.delDateTime[1])) {
                                this.delParams.startDay = _dateFormat(new Date(this.delDateTime[0]), 'yyyy-MM-dd')
                                this.delParams.endDay = _dateFormat(new Date(this.delDateTime[1]), 'yyyy-MM-dd')
                            } else {
                                this.delParams.startDay = ''
                                this.delParams.endDay = ''
                            }
                        } else {
                            this.delParams.startDay = ''
                            this.delParams.endDay = ''
                        }
                        deleteDaySubject(this.delParams).then(data => {
                            const { success, msg } = data
                            if (success) {
                                this.delSubjectVisible = false
                                this.initClassifyData()
                                this.$message.success('操作成功')
                            } else {
                                this.$message.error(msg)
                            }
                        })
                    } else {
                        return false;
                    }
                })

            }
        },
        onLoadLevel2Data(item) {
            this.curClassifyId = item.classifyId
                //console.log('item', item)
                //type 品类类型 0:品类 1:专题活动
            let type = _.toNumber(item['type'])
            if (type === 0) {
                this.level2Data = item.items
                this.curSelected = {}
            } else {
                this.curSelected = item
                if (item.activitySign && _.size(item.activitySign) > 0) {
                    let sign = _.split(item.activitySign, ',')
                    this.level2Data = _.map(sign, item => {
                            return {
                                'classifyName': item
                            }
                        })
                        //console.log(this.level2Data)
                }
            }
        },
        onChangeDate(date) {
            this.curDate = date
            this.initClassifyData()
        },
        initClassifyData() {
            this.level2Data = []
            this.curClassifyId = 0
            this.curSelected = {}
            let params = {
                'day': _dateFormat(this.curDate, 'yyyy-MM-dd')
            }
            querySupplierDaySubject(params).then(data => {
                //this.classifyData = data || []
                let _date = data || []
                    //console.log('_date',_date)
                let rootNode = _.filter(_date, {
                    'parentId': 0
                })
                _.forEach(rootNode, node => {
                    node.items = _.filter(_date, {
                        'parentId': node.classifyId
                    })
                })
                this.classifyData = rootNode
                    //console.log('rootNode',rootNode)
            })
        }
    },
    watch: {
        delDateTime(val, oldVal) {
            if (_.isArray(val) && val.length === 2) {
                if (!_.isNull(val[0]) && !_.isNull(val[1])) {
                    this.delParams.delDateTimeHid = _dateFormat(new Date(val[0]), 'yyyy-MM-dd')
                } else {
                    this.delParams.delDateTimeHid = ''
                }
            } else {
                this.delParams.delDateTimeHid = ''
            }
        }
    },
    created() {
        this.initClassifyData()
    }
}
</script>
<style lang="sass">
._day_subject {
    margin-top: 30px;
    text-align: center;
}

._day_subject ._day_header {
    border: 2px solid #d3dce6;
    -moz-border-radius: 10px;
    -webkit-border-radius: 10px;
    border-radius: 10px;
    width: 450px;
    height: 600px;
    margin: auto;
}

._day_header ._bg-purple {
    background: #d3dce6;
}

._day_header ._grid-content {
    position: relative;
    border-radius: 4px;
    height: 596px;
    overflow: auto;
    ._day_header_p {
        padding: 5px;
        margin-left: 10px;
        margin-right: 10px;
        font-weight: bold;
        border-bottom: 1px solid #CCCCCC;
    }
    .high_p {
        color: #F92E59;
    }
}

._level_classify_ul {
    height: 590px;
}

._level_classify_ul li {
    float: left;
    list-style: none;
    margin-left: 10px;
    margin-top: 25px;
    border: 0 solid #d0d0d0!important;
    white-space: nowrap;
    width: 7.5em;
    overflow: hidden;
}

._level_classify_ul li:hover {
    background-color: #d3dce6;
    border: 0 solid #E10601!important;
    color: #E10601;
}

._level_classify_ul li p {
    padding-top: 5px;
    height: 30px;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 7.5em;
}

._level_classify_ul li p span {
    padding-top: 5px;
    height: 30px;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 6.5em;
}
</style>
