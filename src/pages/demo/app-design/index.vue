<template>
  <div class="_container">
    <card-panel>
      <h3 slot="title">App首页配置</h3>
      <div slot="panel-body">
        <div class="_app-design">
          <div class="_app-page">
            <div class="_app-header">
              <div class="_app-header-inner" @click="dragClick(appModel.search, $event)" :class="{'_editing': appModel.search.type == curType}" :style="{'backgroundColor': appModel.search.prop.bgColor}">
                <div class="_app-status-bar"><app-status></app-status></div>
                <div class="_app-header-nav"><app-search :obj="appModel.search"></app-search></div>
                <div class="_app-com-action"></div>
              </div>
            </div>
            <div class="_app-body">
              <draggable 
                class="_app-drag-area" 
                :list="appModel.sortable" 
                @start="dragStart" 
                @end="dragEnd" 
              >
                <div class="_app-com" v-for="(am, i) in appModel.sortable" @click="dragClick(am, $event)" :index="i" :data-type="am.name" :class="{'_editing': am.name == curType}">
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
                  <li @click="addCom('appAds')"><el-button>广告</el-button></li>
                  <li @click="addCom('appGoods')"><el-button>商品</el-button></li>
                  <li @click="addCom('appGrids')"><el-button>导航</el-button></li>
                  <li @click="addCom('appSlogan')"><el-button>公告</el-button></li>
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
            <div class="_app-conf-inner" v-show="!!comSetting" :style="{'marginTop': marginTop}"> <component :is="comSetting" :obj="objSetting"></component> </div>
          </div>
        </div>
      </div>
    </card-panel>
  </div>
</template>

<script>
  import './style.scss'

  import draggable from "vuedraggable"

  import appModel from "./model"

  import appNavTab from "./components/app-nav-tab"
  import appStatus from "./components/app-status"

  import appSearch from "./components/app-search"
  import appSearchSetting from "./components/app-search/setting"

  import appAds from "./components/app-ads"
  import appAdsSetting from "./components/app-ads/setting"
  import appAdsModel from "./model/ads"

  import appGrids from "./components/app-grids"
  import appGridsSetting from "./components/app-grids/setting"
  import appGridsModel from "./model/grids"

  import appGoods from "./components/app-goods"
  import appGoodsSetting from "./components/app-goods/setting"
  import appGoodsModel from "./model/goods"

  export default {
    name: 'appDesign',
    components: {
      draggable,
      appNavTab,
      appStatus,
      appSearch, appSearchSetting,
      appAds, appAdsSetting, 
      appGrids, appGridsSetting,
      appGoods, appGoodsSetting,
    },
    data() {
      return {
        appModel,
        comSetting: '',
        objSetting: {},
        comEditing: false,
        curType: '',
        marginTop: '0',
      }
    },
    methods: {
      dragStart(ev) {
        
      },

      dragEnd(ev) {
        let $cur = $(ev.item).parent().children().eq(ev.newIndex)

        this.$nextTick(() => {
          // this.curType = $cur[0].dataset.type
          let com = this.appModel.sortable[ev.newIndex]
          this.curType = com.name
          this.comSetting = com.name + 'Setting'
          this.objSetting = com

          this.marginTop =  $cur.position().top + 'px'
        })
      },

      dragClick(am, ev) {
        this.objSetting = am
        this.comSetting = am.name + "Setting"
        this.curType = am.name
        
        let $cur = $(ev.currentTarget)
        this.marginTop = $cur.position().top + 'px'
      },

      addCom(type) {
        if (type == "appAds") {
          return this.appModel.sortable.push(appAdsModel())
        }
        
        if (type == "appGoods") {
          return this.appModel.sortable.push(appGoodsModel())
        }

        if (type == 'appGrids') {
          return this.appModel.sortable.push(appGridsModel())
        }

        if (type == "appSlogan") {
          return 
        }
      },

      deleteCom(am, index) {

        this.appModel.sortable.splice(index, 1)

        if (this.appModel.sortable.length == 0) {
          this.comSetting = ''
          this.objSetting= {}
          return
        }

        /*this.$nextTick(() => {
          console.log(index)
          let nextCom = this.appModel.sortable[index]
          console.log(nextCom)
          if (nextCom) {
            this.curType = nextCom.name
            this.comSetting = nextCom.name + "Setting"
            this.objSetting = nextCom
            let $cur = $('._app-com').eq(index)
            this.marginTop = $cur.position().top + 'px'
          } else {
            this.comSetting = ''
            this.objSetting= {}
          }
        })*/
      }
    }
  }
</script>
