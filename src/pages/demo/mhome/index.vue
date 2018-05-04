<template>
  <div class="style-demo _container">
    <card-panel>
      <span slot="title">电商移动端首页配置</span>
      <div slot="panel-body">
        <div class="_app-design-wrapper clearfix">
          <div class="_app-preview">
            <div class="_app-entry">
              <div class="_app-preview-header">
                <div class="_app-preview-statbar">
                  <div class="_app-preview-statbar-left">
                    <div class="_app-preview-statbar-signal"> <div></div> <div></div> <div></div> <div></div> <div></div> </div>
                    <div class="_app-preview-statbar-carrier"> 中国联通 4G</div>
                  </div>
                  <div class="_app-preview-statbar-center">
                    <div class="_app-preview-statbar-time"> 14:20 </div>
                  </div>
                  <div class="_app-preview-statbar-right">
                    <div class="_app-preview-statbar-battery"> 77% <div></div> </div>
                  </div>
                </div>
                <div class="_app-preview-nav">
                  首页配置
                </div>
              </div>
              <div class="_app-preview-body">
                <div class="_app-fields">
                  <draggable :list="appFields" class="_app-drag-area" :class="{'draging' : draging, 'dragged': dragged}"
                    @start="dragStart" 
                    @update="dragUpdate" 
                    @end="dragEnd" 
                    @move="dragMove"
                    @add="dragAdd"
                  >
                    <div class="_app-field clearfix" v-for="(fd, idx) in appFields" @click="dragClick(fd, $event)" :index="idx">
                      <div class="_app-component-wrapper">
                        <component :is="fd.type" :obj="fd"></component>
                      </div>
                      <div class="_app-component-actions">
                        <div class="_actions-wrap">
                          <span class="_action _edit" @click.stop="editField(fd,idx)">编辑</span><!--
                          --><!-- <span class="_action _add" @click.add="addField">加内容</span> --><!--
                          --><span class="_action _delete" @click.stop="removeFiled(idx)">删除</span>
                        </div>
                      </div>
                    </div>
                  </draggable>
                </div>
              </div>
            </div>
            <div class="_app-add-region">
              <h4>添加内容</h4>
              <ul>
                <li @click="addAds"><el-button>广告</el-button></li>
                <li @click="addGoods"><el-button>商品</el-button></li>
                <li @click="addSearch"><el-button>搜索</el-button></li>
                <li @click="addGrids"><el-button>导航</el-button></li>
                <li @click="addTitle"><el-button>标题</el-button></li>
              </ul>
            </div>
          </div>
          <div class="_app-sidebar" :style="{ marginTop: top }" v-show="settingShow">
            <div class="_app-sidebar-arrow"></div>
            <div class="_app-sidebar-inner">
              <component :is="settingCom" :obj="settingObj"></component>
            </div>
          </div>
        </div>
      </div>
    </card-panel>
  </div>
</template>

<script>
  import appFields from "./model/"
  import draggable from "vuedraggable"
  
  // 搜索组件
  import appSearch from "./components/search"
  import appSearchSetting from "./components/search/setting"
  import appSearchModel from "./model/search"

  // 商品列表组件
  import appGoods from "./components/goods"
  import appGoodsSetting from "./components/goods/setting"
  import appGoodsModel from "./model/goods"

  // 九宫格组件
  import appGrids from "./components/grids"
  import appGridsSetting from "./components/grids/setting"
  import appGridsModel from "./model/grids"

  // 图片广告
  import appAds from "./components/ads"
  import appAdsSetting from "./components/ads/setting"
  import appAdsModel from "./model/ads"

  export default {
    components: { 
      draggable, 
      appSearch, appSearchSetting, 
      appGoods, appGoodsSetting,
      appGrids, appGridsSetting,
      appAds, appAdsSetting
    },
    data() {
      return {
        appFields: appFields,
        editing: false,
        draging: false,
        dragged: false,
        top: '0',
        settingCom: '',
        settingObj: {},
        settingShow: false
      }
    },
    methods: {
      dragStart(ev) {
        this.draging = true
        this.dragged = false
      },
      dragUpdate(ev) {
        // console.log('dragUpdate', ev)
      },
      dragEnd(ev) {
        this.draging = false
        this.dragged = true

        let $cur = $(ev.item).parent().children().eq(ev.newIndex)
        $cur.addClass('editing')
        $cur.siblings().removeClass('editing')

        setTimeout(() => {
          let top = $cur.position().top
          this.top = top + 'px'
          this.settingShow = true
          let field = this.appFields[ev.newIndex]
          this.settingCom = field.type + "Setting"
          this.settingObj = field
        }, 100)
      },
      dragMove(...arg) {

      },
      dragFilter(...arg) {
        // console.log('dragFilter', arg)
      },
      dragChoose(...arg) {
        // console.log('dragChoose', arg)
      },
      dragSort(...arg) {
        // console.log('dragSort', arg)
      },
      dragAdd(...arg) {
        // console.log("dragAdd", arg)
      },

      dragClick(fd, ev) {
        let $cur = $(ev.currentTarget)
        let top = $cur.position().top
        $cur.addClass('editing')
        $cur.siblings().removeClass('editing')
        this.top = top + 'px'
        
        // this.settingCom = ""
        // this.$nextTick(() => this.settingCom = fd.type + "Setting")

        this.settingCom = fd.type + "Setting" 
        this.settingObj = fd
        this.settingShow = true
      },

      addCommon(type, model) {
        console.log('add ', type)
        let field = model()
        this.appFields.push(field)
        this.settingCom = field.type + 'Setting'
        this.settingObj = field
        
        // 获取最后一个元素
        setTimeout(() => {
          let $cur = $('._app-field').last()
          $cur.addClass('editing')
          $cur.siblings().removeClass('editing')

          let top = $cur.position().top
          this.top = top + 'px'
          this.settingShow = true
        }, 200)
      },
    
      addSearch() {
        this.addCommon('appSearch', appSearchModel)
      },  

      addAds() {
        this.addCommon('appAds', appAdsModel)
      },

      addGoods() {
        this.addCommon('appGoods', appGoodsModel)
      },

      addGrids() {
        this.addCommon('appGrids', appGridsModel)
      },

      addTitle() {},


      removeFiled(index) {

        this.appFields.splice(index, 1)

        if (this.appFields.length == 0) {
          this.settingObj = {}
          this.settingCom = ''
          this.settingShow = false
          return
        }

        this.$nextTick(() => {
          if (index > 0) {
            let nextField = this.appFields[--index]
            this.settingCom = nextField.type + "Setting"
            this.settingObj = nextField
            
            let $cur = $('._app-field').eq(index)
            $cur.addClass('editing')
            $cur.siblings().removeClass('editing')
            let top = $cur.position().top
            this.top = top + 'px'

          } else {
            // TODO 
          }
        })
        
      },
      editField(fd, index) {
        let $cur = $('._app-field').eq(index)
        let toViewTop = $cur[0].getBoundingClientRect().top
        let toDocumentTop = $cur.offset().top
        let height = $cur.height()
        let bodyScrollTop = $('body').scrollTop()
        // console.log(toViewTop, toDocumentTop, bodyScrollTop) // Get position in viewport coordinates
        if (toViewTop < 0) {
          $('body').scrollTop(bodyScrollTop - height)
        }
        
        $cur.addClass('editing')
        $cur.siblings().removeClass('editing')
        let top = $cur.position().top
        this.top = top + 'px'

        this.settingCom = fd.type + "Setting"
        this.settingObj = fd
        this.settingShow = true


      },
      addField() {

      }
    }
  }
</script>

<style lang="sass">
  ._app-design-wrapper {
    position: relative;
  }
  ._app-preview {
    width: 320px;
    min-height: 568px;
    background-color: #f8f8f8;
    float: left;
    box-shadow: 0 0 0 1px #e6e5e5;
  }
  ._app-preview-header {
    background-color: #1D8CE0;
    color: #fff;
  }
  ._app-preview-nav {
    height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
  }
  ._app-preview-statbar {
    font-size: 11px;
    padding: 1px 3px;
    position: relative;
    
    ._app-preview-statbar-left {
      height: 18px;
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    ._app-preview-statbar-right {
      height: 18px;
      position: absolute;
      right: 0;
      top: 0;
      width: 100px;

      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding-right: 5px;
    }
    ._app-preview-statbar-center {
      height: 18px;
      position: relative;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  ._app-preview-statbar-signal {
    width: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 3px;
    > div {
      color: #fff;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      margin-right: 2px;
      border: solid 1px currentColor;
    }
    > div:nth-child(1), div:nth-child(2), div:nth-child(3) { background-color: #fff; }
  }

  ._app-preview-statbar-location {
    > div {
      color: #fff;
      position: relative;
      width: 14px;
      height: 18px;
      transform: rotate(45deg);
      &:before {
        content: '';
        position: absolute;
        left: 0;
        top: -17px;
        width: 0;
        height: 0;
        border-top: solid 18px transparent;
        border-bottom: solid 18px currentColor;
        border-left: solid 7px transparent;
        border-right: solid 7px transparent;
      }
      &:after {
        content: '';
        position: absolute;
        left: 0;
        top: 9px;
        width: 0;
        height: 0;
        color: #1D8CE0;
        border-top: solid 5px transparent;
        border-bottom: solid 5px currentColor;
        border-left: solid 7px transparent;
        border-right: solid 7px transparent;
      }
    }
  }

  ._app-preview-statbar-battery {
    display: flex;
    align-items: center;
    > div {
      margin-left: 3px;
      width: 17px;
      height: 9px;
      border-radius: 2px;
      border: solid 1px #fff;
      position: relative;
      &:before {
        content: '';
        position: absolute;
        display: block;
        width: 2px;
        height: 3px;
        border-radius: 0 2px 2px 0;
        border-top: solid 1px #fff;
        border-right: solid 1px #fff;
        border-bottom: solid 1px #fff;
        right: -3px;
        top: 1px;
      }
      &:after {
        content: '';
        position: absolute;
        display: block;
        left: 1px;
        top: 1px;
        width: 8px;
        height: 5px;
        background-color: #fff;
      }
    }
  }


  ._app-enrty {
    min-height: calc( 568px - 245px );
  }

  ._app-add-region {
    min-height: 245px;
    padding: 0 6px 4px 10px;
    background: #f8f8f8;
    width: 320px;
    margin: 20px auto 0;
    border-top: 1px solid #D9D9D9;
    position: relative;
    h4 {
      text-align: center;
      font-size: 14px;
      line-height: 40px;
      font-weight: bold;
    }
    &:before {
      position: absolute;
      content: ' ';
      border: 8px solid transparent;
      border-bottom-width: 10px;
      border-bottom-color: #ccc;
      top: -16px;
      left: 148px;
      top: -19px;
      border-bottom-color: #ddd;
    }
    &:after {
      position: absolute;
      content: ' ';
      border: 8px solid transparent;
      border-bottom-width: 10px;
      border-bottom-color: #f8f8f8;
      top: -16px;
      left: 148px;
    }
    ul {
      color: #333;
      font-size: 12px;
      margin-left: -5px;
      zoom: 1;
    }
    li {
      float: left;
      display: table;
      margin: 0 0 10px 5px;
      background: #fff;
      button {
        padding: 10px 13px;
      }
    }
  }
  ._app-fields { min-height: 200px; }
  ._app-field {
    position: relative;
    cursor: move;
    user-select: none;
    margin-bottom: 10px;
    ._app-component-wrapper {
      min-height: 30px;
      margin: 0;
      width: 100%;
    }
    ._app-component-actions {
      position: absolute;
      left: 0;
      bottom: 0;
      height: 100%;
      width: 320px;
      border: 2px dashed rgba(255,0,0,0.5);
      z-index: 2;
      display: none;
    }
    &:hover ._app-component-actions { display: block; }
  }

  ._app-field.editing {
    ._app-component-actions { display: block; }
  }
  ._app-field.sortable-ghost {
    //._app-component-actions { border: 2px dashed transparent; }
  }
  ._app-field.sortable-chosen {
    //._app-component-actions { border: 2px dashed transparent; }
  }

  ._app-drag-area.draging ._app-field ._app-component-actions {
    display: none;
  }

  // actions
  ._actions-wrap {
    position: absolute;
    right: 0;
    bottom: 0;
    ._action {
      display: inline-block;
      background-color: rgba(0,0,0,0.3);
      color: #fff;
      padding: 0 5px;
      margin-left: 1px;
      font-size: 12px;
      &:hover {
        color: #ddd;
        cursor: pointer;
      }
    }
  }

  // sidebar config
  ._app-sidebar {
    position: relative;
    float: left;
    width: 440px;
    margin-left: 10px;
    padding-bottom: 50px;
    font-size: 14px;
    ._app-sidebar-arrow {
      width: 0px;
      height: 0px;
      border-style: solid;
      border-width: 6px 7px 6px 0;
      border-color: transparent #d4d4d4 transparent transparent;
      position: absolute;
      left: -6px;
      top: 10px;
      &:after {
        width: 0px;
        height: 0px;
        border-style: solid;
        border-width: 6px 7px 6px 0;
        border-color: transparent #d1d1d1 transparent transparent;
        position: absolute;
        left: -6px;
        top: 19px;
        content: "";
        border-right-color: #f8f8f8;
        left: 2px;
        top: -6px;
      }
    }
    ._app-sidebar-inner {
      padding: 10px 8px;
      min-height: 54px;
      background: #f8f8f8;
      border-radius: 3px;
      border: 1px solid #d4d4d4; 
    }
  }
</style>
