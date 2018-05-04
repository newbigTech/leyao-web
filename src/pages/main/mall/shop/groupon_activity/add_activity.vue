<!-- 商品新增修改主界面-->
<template>
    <div class="_container">
        <card-panel>
            <span slot="title">{{paramObj.activityId?'编辑拼团活动':'创建拼团活动'}}</span>
            <div slot="panel-btns">
                <el-button size="small" type="success" @click.native.prevent="$emit('forward','ActivityList')">返回商品列表</el-button>
            </div>
            <div slot="panel-body">
                <el-form :model="activityObj" :rules="rules" ref="activityObj" label-width="150px">
                    <el-form-item label="活动名称" prop="activityName">
                        <el-input v-model="activityObj.activityName" :maxlength="40" style="width:330px"></el-input>
                    </el-form-item>
                    <el-form-item label="活动图片" prop="activityPic">
                            <div class="_classify-uploader">
                                <div class="_upload-select" @click="openShopFileDialog(1)">
                                    <div class="_upload-select-box">
                                        <div class="_upload-select-icon"><i class="el-icon-upload"></i></div>
                                        <div class="_upload-select-text">点击上传</div>
                                        <div class="_upload-select-preview" v-show="activityObj.activityPic && (activityObj.activityPic.length > 1)">
                                        <div @click.stop.prevent="activityObj.activityPic=''" style="position: absolute;right: 0;top:-10px;z-index:99"><i class="el-icon-circle-close"></i></div>
                                            <img :src="activityObj.activityPic ? ((cloudShowUrl + activityObj.activityPic)) : ''">
                                            <div class="_upload-select-cover"> <span>点击更换图片</span> </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            建议上传图片尺寸：750px*375px
                    </el-form-item>
                    <el-form-item label="活动类型" prop="activityType">
                        <!-- <el-checkbox v-model="checked" checked>备选项</el-checkbox> -->
                        <el-checkbox-group v-model="activityObj.activityType">
                            <el-checkbox :label="0">普通团</el-checkbox>
                            <el-checkbox :label="1">定点团</el-checkbox>
                            <el-checkbox :label="2">一人成团</el-checkbox>
                        </el-checkbox-group>
                    </el-form-item>
                    <el-form-item label="活动截止时间" prop="activityDate">
                        <el-date-picker v-model="activityObj.activityDate" type="datetimerange" align="right" style="width:330px" :editable="false" :picker-options="pickerOptions0" @change="onChangeActivityDate">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="活动商品" prop="goodsName">
                        <el-input v-model="activityObj.goodsName" :maxlength="20" icon="search" :on-icon-click="onQueryGoodsClick" style="width:330px" readonly placeholder="点击选择按钮选择商品"></el-input>
                    </el-form-item>
                    <el-form-item label="销售价">
                        <el-input v-model.number="activityObj.salePrice" :maxlength="10" style="width:330px" :disabled="true"></el-input>&nbsp;&nbsp;（单位：元）
                    </el-form-item>
                    <el-form-item label="可售数量" prop="limitNumber">
                        <el-radio-group v-model.number="activityObj.limitNumberType" @change="limitNumberTypeChange">
                            <el-radio :label="0">无限制</el-radio>
                            <el-radio :label="1">限制</el-radio>
                        </el-radio-group>&nbsp;&nbsp;&nbsp;&nbsp;
                        <el-input :disabled="activityObj.limitNumberType==0" v-model.number="activityObj.limitNumber" :maxlength="6" style="width:180px"></el-input>
                    </el-form-item>
                    <el-form-item label="团长价" prop="leaderPrice">
                        <el-input v-model.number="activityObj.leaderPrice" :maxlength="10" style="width:330px"></el-input>&nbsp;&nbsp;（单位：元）
                    </el-form-item>
                    <el-form-item label="团员价" prop="memberPrice">
                        <el-input v-model.number="activityObj.memberPrice" :maxlength="10" style="width:330px"></el-input>&nbsp;&nbsp;（单位：元）
                    </el-form-item>
                    <el-form-item label="成团人数" prop="memberCount">
                        <el-input v-model.number="activityObj.memberCount" :maxlength="7" style="width:330px"></el-input>
                    </el-form-item>
                    <el-form-item label="成团有效时长" prop="effectiveTimes">
                        <el-input v-model.number="activityObj.effectiveTimes" :maxlength="5" style="width:330px"></el-input>&nbsp;&nbsp;（单位：小时）
                    </el-form-item>
                    <el-form-item label="每人限购次数" prop="limitBuyTimes">
                        <el-radio-group v-model.number="activityObj.limitBuyTimesType" @change="limitBuyTimesTypeChange">
                            <el-radio :label="0">无限制</el-radio>
                            <el-radio :label="1">限制</el-radio>
                        </el-radio-group>&nbsp;&nbsp;&nbsp;&nbsp;
                        <el-input v-model.number="activityObj.limitBuyTimes" :disabled="activityObj.limitBuyTimesType==0" :maxlength="5" style="width:180px"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click.stop.prevent="onSave">保存</el-button>
                        <el-button @click.native.prevent="$emit('forward','ActivityList')">返回列表</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </card-panel>
        <shop-goods ref="shopGoodsComm" @onSuccess="getShopGoodSuccess"></shop-goods>
         <!--商品图库Dialog-->
        <el-dialog title="商品图库" v-model="shopFileDialog" class="shop-img-file-dialog">
            <shop-file @onSuccess="getShopFile" :vm="tab5vm"></shop-file>
        </el-dialog>
    </div>
</template>
<script>
import ShopGoods from './shop-goods'
import RegExp from 'lib/utils/regexp'
import { dateFormat as _dateFormat } from "lib/utils/dateFormat"
import {addOrUpdateGrouponActivity} from 'actions/grouponActivityAction'
import ShopFile from 'pages/main/mall/common/components/shop_file'
export default {
    name: 'groupon_activity_add',
    components: {
        ShopGoods,
        ShopFile
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
            shopFileDialog: false,
            shopFileIndex: 0,
            tab5vm: new this.$root.constructor(),
            activityObj: {
                activityName: '',
                activityPic:'',
                activityType: [],
                activityDate: [],
                goodsId: 0,
                goodSkuId: 0,
                goodsName: '',
                limitNumberType: 0,
                limitNumber: 0,
                salePrice: '0.00',
                leaderPrice: '0.00',
                memberPrice: '0.00',
                memberCount: 2,
                effectiveTimes: 24,
                limitBuyTimesType: 0,
                limitBuyTimes: 0
            },
            rules: {
                activityName: [{
                    required: true,
                    message: '请输入拼团活动名称',
                    trigger: 'blur'
                }],
                activityPic: [{
                    required: true,
                    message: '请上传活动图片',
                    trigger: 'change'
                }],
                activityType: [{
                    type: 'array',
                    required: true,
                    message: '请至少选择一项',
                    trigger: 'change'
                }],
                activityDate: [{
                    type: 'array',
                    required: true,
                    message: '活动截止日期不能为空',
                    trigger: 'change'
                }],
                goodsName: [{
                    required: true,
                    message: '请选择活动商品',
                    trigger: 'change'
                }],
                limitNumber: [{
                    type: 'number',
                    required: true,
                    message: '可售数量不能为空',
                    trigger: 'change'
                }, {
                    pattern: RegExp.numer,
                    trigger: 'blur',
                    message: '格式错误， 请输入一个整数'
                }],
                leaderPrice: [{
                    type: 'number',
                    required: true,
                    trigger: 'blur',
                    message: '格式错误，请输入大于0且小数位不超过两位的数字 '
                }, {
                    pattern: RegExp.amount,
                    trigger: 'blur',
                    message: '格式错误， 格式：0.00'
                }],
                memberPrice: [{
                    type: 'number',
                    required: true,
                    message: '格式错误，请输入大于0且小数位不超过两位的数字',
                    trigger: 'blur'
                }, {
                    pattern: RegExp.amount,
                    trigger: 'blur',
                    message: '格式错误， 格式：0.00'
                }],
                memberCount: [{
                    type: 'number',
                    required: true,
                    message: '成团人数不能为空',
                    trigger: 'change'
                }, {
                    pattern: RegExp.numer,
                    trigger: 'blur',
                    message: '格式错误， 请输入一个整数'
                }, {
                    validator(rule, value, callback, source, options) {
                        var errors = [];
                        if(value<2){
                           callback(new Error('成团人数不能小于2'))
                        }
                        callback(errors);
                    }
                }],
                effectiveTimes: [{
                    type: 'number',
                    required: true,
                    message: '成团有效时长不能为空',
                    trigger: 'change'
                }, {
                    pattern: RegExp.numer,
                    trigger: 'blur',
                    message: '格式错误， 请输入一个整数'
                }, {
                    validator(rule, value, callback, source, options) {
                        var errors = [];
                        if(value<1){
                           callback(new Error('成团有效时长不能小于1'))
                        }
                        callback(errors);
                    }
                }],
                limitBuyTimes: [{
                    type: 'number',
                    required: true,
                    message: '每人限购次数不能为空',
                    trigger: 'change'
                }, {
                    pattern: RegExp.numer,
                    trigger: 'blur',
                    message: '格式错误， 请输入一个整数'
                }]
            },
            pickerOptions0: {
                disabledDate(time) {
                    return time.getTime() < Date.now() - 8.64e7;
                }
            },
        }
    },
    methods: {
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
                if (this.shopFileIndex === 1)
                    this.activityObj.activityPic = shopFiles[0].fileMd5
            }

        },
        limitNumberTypeChange(v) {
            if (v == 0) {
                this.activityObj.limitNumber = 0
            }
        },
        limitBuyTimesTypeChange(v) {
            if (v == 0) {
                this.activityObj.limitBuyTimes = 0
            }
        },
        onChangeActivityDate(v) {
            if (!v) {
                this.activityObj.activityDate = []
            }
        },
        onQueryGoodsClick() {
            this.$refs.shopGoodsComm.goodsDataVisible = true
        },
        getShopGoodSuccess(data) {
            this.activityObj.goodsId = data.id
            this.activityObj.goodsName = data.name
            this.activityObj.goodSkuId = data.goodsSkuId || 0
            this.activityObj.salePrice = data.row.price
        },
        onSave() {
            this.$refs.activityObj.validate(valid => {
                if (valid) {
                 let params={}
                 Object.assign(params,this.activityObj)
                 let aType=[0,0,0,0,0,0,0,0,0,0]
                 _.forEach(this.activityObj.activityType,(v)=>{
                    aType[_.toInteger(v)] = 1
                 })
                 params.activityType=aType.join('')
                 params.goodSkuId=this.activityObj.goodSkuId
                 params.beginDtm = _dateFormat(new Date(params.activityDate[0]), 'yyyy-MM-dd HH:mm:ss')
                 params.endDtm = _dateFormat(new Date(params.activityDate[1]), 'yyyy-MM-dd HH:mm:ss')
                 addOrUpdateGrouponActivity(params).then(data=>{
                    if(data.success){
                      this.$message.success('操作成功')
                      this.$emit('forward', 'ActivityList')
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
       if(this.paramObj.activityId){
        _.forEach(_.split(this.paramObj.activityType,''),(v,i)=>{
          if(_.toInteger(v)==1){
            this.activityObj.activityType.push(i)
          }
        })
        this.activityObj.activityDate = [_dateFormat(this.paramObj.beginDtm, 'yyyy-MM-dd HH:mm:ss'), _dateFormat(this.paramObj.endDtm, 'yyyy-MM-dd HH:mm:ss')]
        this.activityObj.goodsName=_.toNumber(this.paramObj.goodSkuId)>0?this.paramObj.goodSkuName:this.paramObj.goodsName
        this.activityObj.salePrice=_.toNumber(this.paramObj.goodSkuId)>0?this.paramObj.skuPrice:this.paramObj.salePrice
        this.activityObj.limitNumberType=_.toNumber(this.paramObj.limitNumber)>0?1:0
        this.activityObj.limitBuyTimesType=_.toNumber(this.paramObj.limitBuyTimes)>0?1:0
         this.activityObj.activityPic=this.paramObj.goodsPic
        Object.assign(this.activityObj, _.pick(this.paramObj,['activityId','activityName','goodsId','goodSkuId','limitNumber','leaderPrice','memberPrice','memberCount','effectiveTimes','limitBuyTimes']))
       }
    }
}
</script>
