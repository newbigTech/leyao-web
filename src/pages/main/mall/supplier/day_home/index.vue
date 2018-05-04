<template>
    <div>
        <!-- 导航面包屑 -->
        <div class="_breadcrumb" v-if="pageType===0">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/mall' }">商城</el-breadcrumb-item>
                <el-breadcrumb-item>电商首页管理</el-breadcrumb-item>
                <el-breadcrumb-item>首页管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container-fluid" style="padding-top: 25px;">
            <div class="page-header" style="margin:0;position:relative;">
                <h1 v-if="pageType===0">APP首页配置</h1>
                <h1 v-else>&nbsp;</h1>
                <div style="float: right;position:absolute;right: 10px;top:-15px;">
                    <el-checkbox v-model="isDefault" :true-label="0" :false-label="1" @change="loadPageData">编辑默认首页</el-checkbox>
                    &nbsp;&nbsp;&nbsp;
                    <el-button type="success" @click.native.prevent="onSave">保存</el-button>
                    <el-button type="success" @click.native.prevent="onOpenDateTimeDailog">另存为日期</el-button>
                    <el-button type="success" @click.native.prevent="onSaveDefault" :disabled="isDefault===0">设为默认首页</el-button>
                    <el-button type="success" @click.native.prevent="onReloadRedis">更新缓存</el-button>
                </div>
            </div>
            <date-selected @onSuccess="onChangeDate" v-show="isDefault===1"></date-selected>
            <div class="_app-design">
                <div class="_app-page">
                    <div class="_app-header" v-if="appModel.header.length>0">
                        <div class="_app-header-inner" @click="dragClick(appModel.header[0], $event)" :class="{'_editing': appModel.header[0].type == curType}" :style="{'backgroundColor': appModel.header[0].prop.bgColor}">
                            <div class="_app-status-bar">
                                <app-status></app-status>
                            </div>
                            <div class="_app-header-nav">
                                <app-search :obj="appModel.header[0]"></app-search>
                            </div>
                            <div class="_app-com-action"></div>
                        </div>
                    </div>
                    <div class="_app-body">
                        <draggable class="_app-drag-area" :list="appModel.sortable" @start="dragStart" @end="dragEnd">
                            <div class="_app-com" v-for="(am, i) in appModel.sortable" @click="dragClick(am, $event, i)" :index="i" :data-type="am.name" :class="{'_editing': i == curIndex}">
                                <component :is="am.name" :obj="am"></component>
                                <div class="_app-com-action">
                                    <div class="_app-com-action-btns">
                                        <span class="_action _delete" @click.stop="deleteCom(am, i)">删除</span>
                                    </div>
                                </div>
                            </div>
                        </draggable>
                        <div class="_app-com-add">
                            <h4>添加内容</h4>
                            <ul>
                                <li @click="addCom('appSlider')">
                                    <el-button>轮播</el-button>
                                </li>
                                <li v-show="pageType!==2">
                                    <el-button>列表</el-button>
                                    <div class="_magic-layout-type">
                                        <a @click.stop="addCom('appListA')">A</a>
                                        <a @click.stop="addCom('appListB')">B</a>
                                        <a @click.stop="addCom('appListC')">C</a>
                                    </div>
                                </li>
                                <li @click="addCom('appGrids')" v-show="pageType!==2">
                                    <el-button>导航</el-button>
                                </li>
                                <li @click="addCom('appNotice')" v-show="pageType!==2">
                                    <el-button>通告</el-button>
                                </li>
                                <li>
                                    <el-button>魔方</el-button>
                                    <div class="_magic-layout-type">
                                        <a @click.stop="addCom('appMagic', 3)">3x3</a>
                                        <a @click.stop="addCom('appMagic', 4)">4x4</a>
                                        <a @click.stop="addCom('appMagic', 5)">5x5</a>
                                    </div>
                                </li>
                                <li @click="addCom('appImgs')">
                                    <el-button>图片</el-button>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="_app-footer">
                        <div class="_app-footer-inner">
                            <!-- <app-nav-tab></app-nav-tab> -->
                        </div>
                    </div>
                </div>
                <div class="_app-conf">
                    <div class="_app-conf-inner" v-show="settingShow && !!comSetting" :style="{'marginTop': marginTop}">
                        <component :is="comSetting" :obj="objSetting"></component>
                    </div>
                </div>
            </div>
        </div>
        <datetime-selected @onSuccess="onSaveDate" ref="datetimeSelectedComm"></datetime-selected>
    </div>
</template>
<script>
import './style.scss'

import draggable from "vuedraggable"

import appModel from "./model"
import classifyModel from "./model/classifyAd"

import appNavTab from "./components/app-nav-tab"
import appStatus from "./components/app-status"

import appSearch from "./components/app-search"
import appSearchSetting from "./components/app-search/setting"

import appSlider from "./components/app-slider"
import appSliderSetting from "./components/app-slider/setting"
import appSliderModel from "./model/slider"

import appGrids from "./components/app-grids"
import appGridsSetting from "./components/app-grids/setting"
import appGridsModel from "./model/grids"

// import appGoods from "./components/app-goods"
// import appGoodsSetting from "./components/app-goods/setting"
// import appGoodsModel from "./model/goods"


import appListModel from "./model/list"
import appListSetting from "./components/app-list-setting"

import appListA from "./components/app-list-a"
import appListB from "./components/app-list-b"
import appListC from "./components/app-list-c"

import appNotice from "./components/app-notice"
import appNoticeSetting from "./components/app-notice/setting"
import appNoticeModel from "./model/notice"

import appMagic from "./components/app-magic"
import appMagicSetting from "./components/app-magic/setting"
import appMagicModel from "./model/magic"

import appImgs from "./components/app-imgs"
import appImgsSetting from "./components/app-imgs/setting"
import appImgsModel from "./model/imgs"

import dateSelected from '../components/date-selected'
import datetimeSelected from '../components/date-selected/datetime-selected'

import {
    dateFormat as _dateFormat
} from "lib/utils/dateFormat"

import {
    saveDayHome,
    queryDayHome,
    reloadDayHome
} from 'actions/activityAction'

export default {
    name: 'appDesign',
    props: {
        typeValue: {
            type: Number,
            default: undefined
        },
        pageType: {//页面类型 0 首页 1 导航 2 分类导航  自定义 后期扩展
            type: Number,
            default: 0
        }
    },
    components: {
        draggable,
        appNavTab,
        appStatus,
        appListSetting,
        appSearch,
        appSearchSetting,
        appSlider,
        appSliderSetting,
        appGrids,
        appGridsSetting,
        // appGoods,
        // appGoodsSetting,
        appListA,
        appListB,
        appListC,
        appNotice,
        appNoticeSetting,
        dateSelected,
        datetimeSelected,

        appMagic,
        appMagicSetting,

        appImgs,
        appImgsSetting,
    },
    data() {
        return {
            appModel,
            appModelBak:{},
            comSetting: '',
            objSetting: {},
            comEditing: false,
            curType: '',
            curIndex: -1,
            marginTop: '0',
            isDefault: 1,
            curDate: _.now(),
            settingShow: false
        }
    },
    methods: {
        onReloadRedis() {
            let params = {
                    pageType:this.pageType,
                    typeValue: this.typeValue
                }
            reloadDayHome(params).then(data => {
                this.settingShow = false
                const {
                    success,
                    result,
                    msg
                } = data
                if (success) {
                    this.$message.success('更新成功')
                    this.loadPageData()
                } else {
                    this.$message.error(msg)
                }
            })
        },
        onSave() {
            // return console.log('appModel', JSON.stringify(this.appModel))
            let params = {
                    pageType:this.pageType,
                    typeValue: this.typeValue,
                    pageDaySet: this.isDefault,
                    pageDay: _dateFormat(this.curDate, 'yyyy-MM-dd'),
                    pageJson: JSON.stringify(this.appModel)
                }
                //console.log('2213123',JSON.parse(JSON.stringify(this.appModel)))
                //return false
            this.$confirm('确定提交?', '提示', {
                type: 'warning'
            }).then(d => {
                saveDayHome(params).then(data => {
                    const {
                        success,
                        result,
                        msg
                    } = data
                    if (success) {
                        this.$message.success('保存成功')
                    } else {
                        this.$message.error(msg)
                    }
                })
            }).catch(data => {})
        },
        onSaveDefault() {
            let params = {
                pageType:this.pageType,
                typeValue: this.typeValue,
                pageDaySet: 0,
                pageJson: JSON.stringify(this.appModel)
            }
            this.$confirm('确定提交?', '提示', {
                type: 'warning'
            }).then(d => {
                saveDayHome(params).then(data => {
                    const {
                        success,
                        result,
                        msg
                    } = data
                    if (success) {
                        this.$message.success('保存成功')
                    } else {
                        this.$message.error(msg)
                    }
                })
            }).catch(data => {})
        },
        onOpenDateTimeDailog() {
            this.$refs.datetimeSelectedComm.show()
        },
        onSaveDate(date) {
            if (_.isArray(date) && date.length === 2) {
                if (!_.isNull(date[0]) && !_.isNull(date[1])) {
                    let params = {
                        pageType:this.pageType,
                        typeValue: this.typeValue,
                        pageDaySet: 1,
                        startDay: _dateFormat(new Date(date[0]), 'yyyy-MM-dd'),
                        endDay: _dateFormat(new Date(date[1]), 'yyyy-MM-dd'),
                        pageJson: JSON.stringify(this.appModel)
                    }
                    this.$confirm('确定提交?', '提示', {
                        type: 'warning'
                    }).then(d => {
                        saveDayHome(params).then(data => {
                            const {
                                success,
                                result,
                                msg
                            } = data
                            if (success) {
                                this.$message.success('保存成功')
                            } else {
                                this.$message.error(msg)
                            }
                        })
                    }).catch(data => {})
                } else {
                    return false
                }
            } else {
                return false
            }
        },
        onChangeDate(date) {
            this.curDate = date
            this.loadPageData()

            // 隐藏设置选项
            this.comSetting = ""
        },
        loadPageData() {
            if (this.typeValue == -1)
                return false
            let params = {
                pageType:this.pageType,
                typeValue: this.typeValue,
                pageDay: _dateFormat(this.curDate, 'yyyy-MM-dd'),
                pageDaySet: this.isDefault //页面是否有日期设置 0 无 1 有
            }
            this.comSetting = ''
                //console.log('this.appModelBak',JSON.parse(JSON.stringify(this.appModelBak)))
            queryDayHome(params).then(data => {
                const {
                    success,
                    result
                } = data
                if (success) {
                    //console.log('result',JSON.parse(JSON.stringify(result.pageJson)))
                    this.resolveJson(JSON.parse(result.pageJson))
                        //this.appModel = JSON.parse(result.pageJson)
                } else {
                    this.appModel = JSON.parse(JSON.stringify(this.appModelBak))
                }
            })
        },
        resolveJson(jsonObj) {
            _.each(jsonObj.sortable, (item) => {
                if (item.name === 'appListA') {
                    if (item.data.type > 0) {
                        item.data.list = _.clone(item.data.goodsList)
                    }
                    delete item.data.goodsList
                    _.each(item.data.list, (item1) => {
                        delete item1.sku
                        delete item1.skuMap
                    })
                } else if (item.name === 'appListB' || item.name === 'appListC') {
                    _.each(item.data.list, (item2) => {
                        delete item2.sku
                        delete item2.skuMap
                    })
                }
            })
            this.appModel = jsonObj
            console.log('new appModel', JSON.parse(JSON.stringify(this.appModel)))
        },
        dragStart(ev) {

        },
        dragEnd(ev) {
            // 如果没有拖动
            if (!ev.newIndex || ev.newIndex == ev.oldIndex) return

            let $cur = $(ev.item).parent().children().eq(ev.newIndex)
            this.$nextTick(() => {
                // this.curType = $cur[0].dataset.type
                let com = this.appModel.sortable[ev.newIndex]
                this.curType = com.name

                // app-list组件共用同一个setting组件
                if (/^appList+/.test(com.name)) {
                    this.comSetting = "appList" + 'Setting'
                } else {
                    this.comSetting = com.name + 'Setting'
                }

                this.objSetting = com

                this.marginTop = $cur.position().top + 'px'
            })
        },

        dragClick(am, ev, index) {

            this.settingShow = true

            // app-list组件共用同一个setting组件
            if (/^appList+/.test(am.name)) {
                this.comSetting = "appList" + 'Setting'
            } else {
                this.comSetting = am.name + 'Setting'
            }

            this.objSetting = am

            this.curType = am.name
            this.curIndex = index

            let $cur = $(ev.currentTarget)
            this.marginTop = $cur.position().top + 'px'


            // console.log("appModel", JSON.stringify(appModel))
        },

        addCom(type, flag) {
            if (type == "appSlider") {
                return this.appModel.sortable.push(appSliderModel())
            }

            if (/^appList+/.test(type)) {
                return this.appModel.sortable.push(appListModel(type))
            }

            if (type == 'appGrids') {
                return this.appModel.sortable.push(appGridsModel())
            }

            if (type == "appNotice") {
                return this.appModel.sortable.push(appNoticeModel())
            }

            if (type == "appMagic") {
                return this.appModel.sortable.push(appMagicModel(flag))
            }

            if (type == "appImgs") {
                return this.appModel.sortable.push(appImgsModel())
            }
        },

        deleteCom(am, index) {

            this.appModel.sortable.splice(index, 1)

            if (this.appModel.sortable.length == 0) {
                this.comSetting = ''
                this.objSetting = {}
                return
            }

            this.$nextTick(() => {
                console.log(index)
                let nextCom = this.appModel.sortable[index]
                console.log(nextCom)
                if (nextCom) {
                    this.curType = nextCom.name
                        // this.comSetting = nextCom.name + "Setting"

                    // app-list组件共用同一个setting组件
                    if (/^appList+/.test(nextCom.name)) {
                        this.comSetting = "appList" + 'Setting'
                    } else {
                        this.comSetting = nextCom.name + 'Setting'
                    }

                    this.objSetting = nextCom

                    let $cur = $('._app-com').eq(index)
                    this.marginTop = $cur.position().top + 'px'
                } else {
                    this.comSetting = ''
                    this.objSetting = {}
                }
            })
        }
    },
    created() {
        //页面类型 0 首页 1 导航 2 分类导航  自定义 后期扩展
        if(this.pageType ===2){
            this.appModel=classifyModel
            this.appModelBak=JSON.parse(JSON.stringify(classifyModel))
        }else if(this.pageType ===1){//导航首页无需配置搜索组件
            let navModel=JSON.parse(JSON.stringify(appModel))
            navModel.header=[]
            this.appModel=navModel
            this.appModelBak=JSON.parse(JSON.stringify(navModel))
        }else{
            this.appModelBak=JSON.parse(JSON.stringify(appModel))
        }
        this.$store.dispatch('updateSupplierShopPageList')
        if (this.pageType ===0) {
            this.loadPageData()
        }
    }
}
</script>
