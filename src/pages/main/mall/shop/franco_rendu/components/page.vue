<template>
    <div class="_app-design">
        <div class="_app-page">
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
                        <li v-show="false">
                            <el-button>列表</el-button>
                            <div class="_magic-layout-type">
                                <a @click.stop="addCom('appListA')">A</a>
                                <a @click.stop="addCom('appListB')">B</a>
                                <a @click.stop="addCom('appListC')">C</a>
                            </div>
                        </li>
                        <li @click="addCom('appGrids')">
                            <el-button>导航</el-button>
                        </li>
                        <li @click="addCom('appNotice')">
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
                </div>
            </div>
        </div>
        <div class="_app-conf">
            <div class="_app-conf-inner" v-show="settingShow && !!comSetting" :style="{'marginTop': marginTop}">
                <component :is="comSetting" :obj="objSetting"></component>
            </div>
        </div>
    </div>
</template>
<script>
import 'pages/main/mall/supplier/day_home/style.scss'
import draggable from "vuedraggable"

import appNavTab from "pages/main/mall/supplier/day_home/components/app-nav-tab"
import appStatus from "pages/main/mall/supplier/day_home/components/app-status"

import appSearch from "pages/main/mall/supplier/day_home/components/app-search"
import appSearchSetting from "pages/main/mall/supplier/day_home/components/app-search/setting"

import appSlider from "pages/main/mall/supplier/day_home/components/app-slider"
import appSliderSetting from "pages/main/mall/supplier/day_home/components/app-slider/setting"
import appSliderModel from "pages/main/mall/supplier/day_home/model/slider"

import appGrids from "pages/main/mall/supplier/day_home/components/app-grids"
import appGridsSetting from "pages/main/mall/supplier/day_home/components/app-grids/setting"
import appGridsModel from "pages/main/mall/supplier/day_home/model/grids"

import appListModel from "pages/main/mall/supplier/day_home/model/list"
import appListSetting from "pages/main/mall/supplier/day_home/components/app-list-setting"

import appListA from "pages/main/mall/supplier/day_home/components/app-list-a"
import appListB from "pages/main/mall/supplier/day_home/components/app-list-b"
import appListC from "pages/main/mall/supplier/day_home/components/app-list-c"

import appNotice from "pages/main/mall/supplier/day_home/components/app-notice"
import appNoticeSetting from "pages/main/mall/supplier/day_home/components/app-notice/setting"
import appNoticeModel from "pages/main/mall/supplier/day_home/model/notice"

import appMagic from "pages/main/mall/supplier/day_home/components/app-magic"
import appMagicSetting from "pages/main/mall/supplier/day_home/components/app-magic/setting"
import appMagicModel from "pages/main/mall/supplier/day_home/model/magic"

import appImgs from "pages/main/mall/supplier/day_home/components/app-imgs"
import appImgsSetting from "pages/main/mall/supplier/day_home/components/app-imgs/setting"
import appImgsModel from "pages/main/mall/supplier/day_home/model/imgs"

import dateSelected from 'pages/main/mall/supplier/components/date-selected'
import {model} from '../model'
export default {
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
        appListA,
        appListB,
        appListC,
        appNotice,
        appNoticeSetting,
        dateSelected,
        appMagic,
        appMagicSetting,
        appImgs,
        appImgsSetting
    },
    props: {
        pageJson: {
            type: String,
            default: ''
        }
    },
    computed: {
        cloudShowUrl() {
            return this.$store.getters.cloudShowUrl
        }
    },
    data() {
        return {
            tableData: [],
            appModel: model(),
            appModelBak: {},
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
        dragStart(ev) {},
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
        },
        loadData(data){
            //console.log('pageJson1',data)
            if(data.length>0){
                this.appModel=JSON.parse(data)
            }
        }
    },
    created() {
        this.appModelBak = JSON.parse(JSON.stringify(model()))
    }
}
</script>
<style>
</style>
