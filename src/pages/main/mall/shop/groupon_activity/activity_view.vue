<!-- 商品新增修改主界面-->
<template>
    <div class="_container">
        <card-panel>
            <span slot="title">查看拼团活动</span>
            <div slot="panel-btns">
                <el-button size="small" type="success" @click.native.prevent="$emit('forward','ActivityList')">返回商品列表</el-button>
            </div>
            <div slot="panel-body">
                <el-form :model="activityObj" ref="activityObj" label-width="150px">
                    <el-form-item label="活动名称" prop="activityName">
                        <el-input v-model="activityObj.activityName" readonly :maxlength="40" style="width:330px"></el-input>
                    </el-form-item>
                    <el-form-item label="活动图片" prop="activityPic">
                            <div class="_classify-uploader">
                                <div class="_upload-select">
                                    <div class="_upload-select-box">
                                        <div class="_upload-select-icon"><i class="el-icon-upload"></i></div>
                                        <div class="_upload-select-text"></div>
                                        <div class="_upload-select-preview" v-show="activityObj.activityPic && (activityObj.activityPic.length > 1)">
                                            <img :src="activityObj.activityPic ? ((cloudShowUrl + activityObj.activityPic)) : ''">
                                            <div class="_upload-select-cover"> <span></span> </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                    </el-form-item>
                    <el-form-item label="活动类型" prop="activityType">
                        <el-checkbox-group v-model="activityObj.activityType" >
                            <el-checkbox :label="0" disabled>普通团</el-checkbox>
                            <el-checkbox :label="1" disabled>定点团</el-checkbox>
                            <el-checkbox :label="2" disabled>一人成团</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="活动截止时间" prop="activityDate">
                        <el-date-picker v-model="activityObj.activityDate" :disabled="true" type="datetimerange" align="right" style="width:330px" :editable="false" :picker-options="pickerOptions0">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="活动商品" prop="goodsName">
                        <el-input v-model="activityObj.goodsName" :maxlength="20" style="width:330px" readonly placeholder="点击选择按钮选择商品"></el-input>
                    </el-form-item>
                    <el-form-item label="销售价">
                        <el-input v-model.number="activityObj.salePrice" readonly :maxlength="10" style="width:330px" :disabled="true"></el-input>&nbsp;&nbsp;（单位：元）
                    </el-form-item>
                    <el-form-item label="可售数量" prop="limitNumber">
                        <el-radio-group v-model.number="activityObj.limitNumberType">
                            <el-radio :label="0" disabled>无限制</el-radio>
                            <el-radio :label="1" disabled>限制</el-radio>
                        </el-radio-group>&nbsp;&nbsp;&nbsp;&nbsp;
                        <el-input :disabled="activityObj.limitNumberType==0" readonly v-model.number="activityObj.limitNumber" :maxlength="6" style="width:180px"></el-input>
                    </el-form-item>
                    <el-form-item label="团长价" prop="leaderPrice">
                        <el-input v-model.number="activityObj.leaderPrice" readonly :maxlength="10" style="width:330px"></el-input>&nbsp;&nbsp;（单位：元）
                    </el-form-item>
                    <el-form-item label="团员价" prop="memberPrice">
                        <el-input v-model.number="activityObj.memberPrice" readonly :maxlength="10" style="width:330px"></el-input>&nbsp;&nbsp;（单位：元）
                    </el-form-item>
                    <el-form-item label="成团人数" prop="memberCount">
                        <el-input v-model.number="activityObj.memberCount" readonly :maxlength="7" style="width:330px"></el-input>
                    </el-form-item>
                    <el-form-item label="成团有效时长" prop="effectiveTimes">
                        <el-input v-model.number="activityObj.effectiveTimes" readonly :maxlength="5" style="width:330px"></el-input>&nbsp;&nbsp;（单位：小时）
                    </el-form-item>
                    <el-form-item label="每人限购次数" prop="limitBuyTimes">
                        <el-radio-group v-model.number="activityObj.limitBuyTimesType">
                            <el-radio :label="0" disabled>无限制</el-radio>
                            <el-radio :label="1" disabled>限制</el-radio>
                        </el-radio-group>&nbsp;&nbsp;&nbsp;&nbsp;
                        <el-input v-model.number="activityObj.limitBuyTimes" readonly :disabled="activityObj.limitBuyTimesType==0" :maxlength="5" style="width:180px"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click.native.prevent="$emit('forward','ActivityList')">返回列表</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </card-panel>
    </div>
</template>
<script>
import RegExp from 'lib/utils/regexp'
import { dateFormat as _dateFormat } from "lib/utils/dateFormat"
export default {
    name: 'groupon_activity_view',
    components: {
    },
    props: {
        paramObj: {
            type: Object,
            default: {}
        }
    },
    computed: {
        cloudShowUrl() {
            return this.$store.getters.cloudShowUrl
        },
        queryParams() {
            return this.$store.getters.queryParams
        }
    },
    data() {
        return {
            activityObj: {
                activityName: '',
                activityPic:'',
                activityType: [],
                activityDate: [],
                goodsId: 0,
                goodSkuId: 0,
                goodsName: '',
                goodSkuName:'',
                limitNumberType: 0,
                limitNumber: 0,
                salePrice: '0.00',
                leaderPrice: '0.00',
                memberPrice: '0.00',
                memberCount: 0,
                effectiveTimes: 24,
                limitBuyTimesType: 0,
                limitBuyTimes: 0
            },
            pickerOptions0: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            }
        }
    },
    methods: {
    },
    created() {
       // console.log('activityObj',this.paramObj)
       if(this.paramObj.activityId){
        _.forEach(_.split(this.paramObj.activityType,''),(v,i)=>{
          if(_.toInteger(v)==1){
            this.activityObj.activityType.push(i)
          }
        })
        this.activityObj.activityDate = [_dateFormat(this.paramObj.beginDtm, 'yyyy-MM-dd hh:mm:ss'), _dateFormat(this.paramObj.endDtm, 'yyyy-MM-dd hh:mm:ss')]
        this.activityObj.goodsName=_.toNumber(this.paramObj.goodSkuId)>0?this.paramObj.goodSkuName:this.paramObj.goodsName
        this.activityObj.salePrice=_.toNumber(this.paramObj.goodSkuId)>0?this.paramObj.skuPrice:this.paramObj.salePrice
        this.activityObj.activityPic=this.paramObj.goodsPic
        this.activityObj.limitNumberType=_.toNumber(this.paramObj.limitNumber)>0?1:0
        this.activityObj.limitBuyTimesType=_.toNumber(this.paramObj.limitBuyTimes)>0?1:0
        Object.assign(this.activityObj, _.pick(this.paramObj,['activityId','activityName','goodsId','goodSkuId','limitNumber','leaderPrice','memberPrice','memberCount','effectiveTimes','limitBuyTimes']))
       }
    }
}
</script>
