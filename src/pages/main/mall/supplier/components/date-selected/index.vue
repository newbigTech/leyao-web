<template lang="html">
    <div>
        <div class="container-fluid _date_selected">
            <div class="_date_selected_bottom flex">
                <div class="_day_line"></div>
                <div class="_day_date" @click="onChangeDate(date1)"><span class="_day_p">{{date1.d1}}</span></div>
                <div class="_day_date" @click="onChangeDate(date2)"><span class="_day_p">{{date2.d1}}</span></div>
                <div class="_day_date _day_cur_date"><span class="_day_p">{{date3.d1}}</span></div>
                <div class="_day_date" @click="onChangeDate(date4)"><span class="_day_p">{{date4.d1}}</span></div>
                <div class="_day_date" @click="onChangeDate(date5)"><span class="_day_p">{{date5.d1}}</span></div>
            </div>
            <div class="_date_selected_bottom flex">
                <div style="margin:auto;">
                    <el-button type="text" @click="onChangeDate(date2)">上一天</el-button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <el-date-picker v-model="curDate" type="date" placeholder="选择日期" :editable="false"></el-date-picker>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <el-button type="text" @click="onChangeDate(date4)">下一天</el-button>
                </div>
            </div>
            <br>
        </div>
    </div>
</template>
<script>
import { dateFormat as _dateFormat } from "lib/utils/dateFormat"

export default {
    name: 'supplier_day_selected_comm',
    data() {
        return {
            curDate: _.now(),
            date1: {
                d1: '',
                d2: ''
            },
            date2: {
                d1: '',
                d2: ''
            },
            date3: {
                d1: '',
                d2: ''
            },
            date4: {
                d1: '',
                d2: ''
            },
            date5: {
                d1: '',
                d2: ''
            },
            pickerOptions: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            }
        }
    },
    methods: {
        disabledDate(time) {
            return new Date(time).getTime() < Date.now() - 8.64e7;
        },
        onChangeDate(ck) {
            this.curDate = ck.d2
            this.initDate()
            this.$emit('onSuccess',this.curDate)
        },
        initDate() {
            let _d = new Date(this.curDate)
            this.$set(this.date3, 'd1', (_d.getMonth() + 1) + "-" + _d.getDate())
            this.$set(this.date3, 'd2', _d.getTime())
            _d.setDate(_d.getDate() - 1)
            this.$set(this.date2, 'd1', (_d.getMonth() + 1) + "-" + _d.getDate())
            this.$set(this.date2, 'd2', _d.getTime())
            _d.setDate(_d.getDate() - 1)
            this.$set(this.date1, 'd1', (_d.getMonth() + 1) + "-" + _d.getDate())
            this.$set(this.date1, 'd2', _d.getTime())
            _d = new Date(this.curDate)
            _d.setDate(_d.getDate() + 1)
            this.$set(this.date4, 'd1', (_d.getMonth() + 1) + "-" + _d.getDate())
            this.$set(this.date4, 'd2', _d.getTime())
            _d.setDate(_d.getDate() + 1)
            this.$set(this.date5, 'd1', (_d.getMonth() + 1) + "-" + _d.getDate())
            this.$set(this.date5, 'd2', _d.getTime())
        }
    },
    watch: {
        curDate(val, oldVal) {
            if (!val) {
                this.$nextTick(() => {
                    this.curDate = oldVal
                })
                return
            }
            if (_.isNumber(oldVal) || _.isEqual(new Date(val), new Date(oldVal))) {
                return false
            }
            this.initDate()
            this.$emit('onSuccess',this.curDate)
        }
    },
    created() {
        this.initDate()
    }
}
</script>
<style lang="sass">
._date_selected {
    margin-top: 30px;
    text-align: center;
}
._date_selected_bottom {
    padding-top: 25px;
    width: 60%;
    margin: auto;
    position: relative;
    ._day_line {
        position: absolute;
        height: 2px;
        background: #d3dce6;
        width: 100%;
        margin-top: 40px;
        z-index: 1;
    }
    ._day_date {
        cursor: pointer;
        box-sizing: border-box;
        margin: auto;
        width: 70px;
        height: 70px;
        background-color: #d3dce6;
        border-radius: 50%;
        position: relative;
        z-index: 2;
        ._day_p {
            text-align: center;
            line-height: 70px;
            font-size: 16px;
        }
        &:hover {
            background-color: #19CFA1;
            width: 80px;
            height: 80px;
            ._day_p {
                text-align: center;
                line-height: 80px;
                font-size: 16px;
            }
        }
    }
    ._day_cur_date {
        width: 80px;
        height: 80px;
        background-color: #19CFA1;
        ._day_p {
            text-align: center;
            line-height: 80px;
            font-size: 16px;
        }
    }
}
</style>
