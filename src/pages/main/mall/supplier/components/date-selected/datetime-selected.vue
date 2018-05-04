<template lang="html">
    <div class="container-fluid">
        <el-dialog title="选择日期" v-model="selectedDateTimeVisible">
            <el-form :model="saveParams" :rules="rules" ref="saveParams">
                <el-form-item label="截止时间" :label-width="formLabelWidth" prop="setDateTimeHid">
                    <input type="hidden" v-model="saveParams.setDateTimeHid">
                    <el-date-picker v-model="setDateTime" type="daterange" placeholder="截止时间" align="right" style="width:350px" :editable="false" :picker-options="pickerOptions0">
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="selectedDateTimeVisible = false">取 消</el-button>
                <el-button type="primary" @click.stop.prevent="onSuccess">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>
<script>
import { dateFormat as _dateFormat } from "lib/utils/dateFormat"
import prettysize from "lib/utils/prettysize"
export default {
    name: 'date_selected_datetime',
    data() {
        return {
            dateFormat: function(val) {
                return _dateFormat(val, 'yyyy-MM-dd hh:mm:ss')
            },
            setDateTime:'',
            pickerOptions0: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
            saveParams: {
               setDateTimeHid:''
            },
            formLabelWidth: '120px',
            selectedDateTimeVisible: false,
            rules: {
                setDateTimeHid: [{
                    required: true,
                    message: '截止时间不允许为空',
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
        show(){
            this.selectedDateTimeVisible=true
        },
        onSuccess() {
            this.$refs.saveParams.validate(valid => {
                if (valid) {
                   this.selectedDateTimeVisible=false
                   this.$emit('onSuccess',this.setDateTime)
                } else {
                    return false;
                }
            })
        },  
    },
    created() {
    }
}
</script>
<style lang="sass">
</style>
