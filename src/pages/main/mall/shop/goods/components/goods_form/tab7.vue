<!-- 商品属性选项卡-->
<template lang="html">
    <div class="container-fluid">
        <div class="page-header" style="margin:0;">
            <h1 style="font-weight: bold;">设置商品属性</h1>
        </div>
        <div class="container-fluid" v-show="propertyData.length == 0" style="padding-top: 15px;">
            <el-alert title="请在商品基本信息中选择商品属性!" type="info" show-icon :closable="false"></el-alert>
        </div>
        <div v-show="!!propertyData.length" style="padding-top: 15px;">
            <el-row>
                <el-col :span="12">
                    <el-form label-width="100px">
                        <el-form-item :label="item.propertyName" v-for="(item,index) in propertyData">
                            <el-checkbox-group v-model="item.checked" v-if="item.propertyType===2">
                                <el-checkbox v-for="(r, i) in item.items" :label="r.itemId+''">{{r.itemName}}</el-checkbox>
                            </el-checkbox-group>
                            <el-radio-group v-model="item.intVal1" v-if="item.propertyType===1">
                                <el-radio v-for="(r, i) in item.items" :label="r.itemId+''">{{r.itemName}}</el-radio>
                            </el-radio-group>
                            <el-input v-model="item.strVal1" :maxlength="150" v-if="item.propertyType===0"></el-input>
                        </el-form-item>
                        <el-form-item v-if="!paramObj.view">
                            <!-- <el-button type="primary" @click.native.prevent="nextFlag=true;handleSaveAndNext()">保存商品并继续编辑</el-button> -->
                            <el-button type="primary" @click.native.prevent="nextFlag=false;handleSaveAndNext()">保存</el-button>
                            <el-button type="primary" @click.native.prevent="handleSaveAndNext(1)">保存并上架</el-button>
                            <el-button type="default" @click.native.prevent="$emit('forward','','GoodsList')">返回到列表</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col :span="12">
                    <div class="grid-content bg-purple-light"></div>
                </el-col>
            </el-row>
        </div>
</template>
<script>
import {
    getClassifyPropertyAndItems
}
from 'actions/classifyPropertyAction'
import {
    saveGoodsFormTab7,
    saveGoodState
} from 'actions/goodsAction'
export default {
    name: 'goods_from_tab7',
    props: {
        vm: {
            type: Object
        },
        paramObj: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            nextFlag: false,
            goodsId: undefined,
            classifyId: 0,
            propertyData: [],
            goodsObj: {}
        }
    },
    methods: {
        onSetState() {
            let params = {
                statusCode: 1,
                goodsId: this.goodsObj.goodsId
            }
            saveGoodState(params).then(data => {
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
                    this.$emit('forward', '', 'GoodsList')
                } else {
                    if (result) {
                        let gstr = _.map(result, 'goodsName').join(',')
                        this.$alert(`已绑定未上架商品有：${gstr}`, msg, {
                            confirmButtonText: '确定',
                            callback: action => {}
                        });

                    } else {
                        this.$message.error(msg);
                    }
                }
            })
        },
        handleSaveAndNext(v) {
            let reqParams = []
            this.propertyData.forEach((item, i) => {
                let {
                    propertyType,
                    classifyId,
                    intVal1,
                    checked,
                    strVal1,
                    propertyId,
                    propertyName
                } = item
                let paramObj = {}
                paramObj.classifyId = classifyId
                paramObj.propertyType = propertyType
                paramObj.propertyId = propertyId
                paramObj.propertyName = propertyName
                    // propertyType 属性类型 0 文本 1 单选 2 多选 不能修改
                if (propertyType === 0) {
                    paramObj.itemIds = -1
                    paramObj.itemVals = strVal1
                } else if (propertyType === 1) {
                    paramObj.itemVals = _.result(_.find(item.items, {
                        'itemId': parseInt(intVal1)
                    }), 'itemName')
                    paramObj.itemIds = intVal1
                } else if (propertyType === 2) {
                    if (checked.length > 0) {
                        paramObj.itemIds = checked.join('-')
                        let itemNames = []
                        checked.forEach((v) => {
                            itemNames.push(_.result(_.find(item.items, {
                                'itemId': parseInt(v)
                            }), 'itemName'))
                        })
                        paramObj.itemVals = itemNames.join('-')
                    }
                }
                reqParams.push(paramObj)
            })
            if (reqParams.length > 0) {
                if (this.paramObj.goodsObj.goodsId) {
                    this.goodsObj.goodsId = this.paramObj.goodsObj.goodsId
                    this.goodsObj.goodsPropertyJson = JSON.stringify(reqParams)
                    saveGoodsFormTab7(this.goodsObj).then(data => {
                        const {
                            success,
                            msg,
                            result
                        } = data
                        if (success) {
                            if (v && v == 1) {
                                this.onSetState()
                            } else {
                                this.$message.success('操作成功')
                                    //this.$emit('forward','tab3')
                            }
                        } else {
                            this.$message.error(msg)
                            return false
                        }
                    })
                } else {
                    this.$message.info("请先保存商品基本信息")
                    this.$emit('forward', 'tab1')
                }
            }
        },
        loadClassifyPropertyData() {
            getClassifyPropertyAndItems({
                'classifyId': this.classifyId
            }).then(data => {
                if (data.length > 0) {
                    this.propertyData = data
                    this.propertyData.forEach(item => {
                        this.$set(item, 'checked', [])
                    })
                }
            })
        }
    },
    created() {
        if (this.vm) {
            this.vm.$on('classify-onchange', (classifyId) => {
                this.classifyId = classifyId
                this.propertyData = []
                this.loadClassifyPropertyData()
            })
        }
        if (this.paramObj.goodsObj.goodsId) {
            Object.assign(this.goodsObj, _.pick(this.paramObj.goodsObj, ['goodsId', 'classifyId']))
                //this.goodsObj=_.pick(this.paramObj.goodsObj,_.keys(this.goodsObj))
                //Object.assign(this.goodsObj, this.paramObj.goodsObj)
            this.classifyId = parseInt(this.paramObj.classifyId)
            this.propertyData = []
        }
        this.$store.getters.ev.$once('onchangeData', (data) => {
            this.propertyData = data.shopClassifyPropertyData
            this.propertyData.forEach((item) => {
                this.$set(item, 'checked', [])
                let _o = _.find(data.goodsObj.goodsPropertData, (d) => Number(d.propertyId) == Number(item.propertyId))
                let _propertyType = parseInt(item.propertyType)
                if (_o) {
                    if (_propertyType === 0) {
                        item.strVal1 = _o.itemVals
                    } else if (_propertyType === 1) {
                        item.intVal1 = _o.itemIds
                    } else if (_propertyType === 2) {
                        if (_o.itemIds && _o.itemIds.length > 0) {
                            this.$set(item, 'checked', _o.itemIds.split('-'))
                        } else {
                            this.$set(item, 'checked', [])
                        }
                        //item.checked = _o.itemIds.split('-')
                    }
                }
            })
        })
    }

}
</script>
