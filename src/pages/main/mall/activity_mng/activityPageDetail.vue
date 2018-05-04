<template>
  <div class="_panel-body-container">
    <div class="_panel-body-lr">
      <div class="_panel-body-left" style="width: 578px;height:1080px;">
        <card-panel>
          <h3 slot="title">活动页面</h3>
          <div slot="panel-btns"></div>
         <div slot="panel-body">
           <el-tabs ref="itab" id="tabs_pagePic" class="_mobile-activity-page" type="border-card" style="width: 100%" v-model="activeName" @tab-click="handleClick">
             <el-tab-pane :label="item.tabName" v-for="(item,index) in activityPageList" :name="'picTab'+index" :id="'picTab'+index">
               <div>
                 <div id="iDiv_show_activity_page" style="position:relative;" :pagePic="item.pagePic" :tabName="item.tabName" :pageId="item.pageId">
                   <img :src="obj.cloudShowUrl + item.pagePic">
                 </div>
               </div>
             </el-tab-pane>
           </el-tabs>
         </div>
        </card-panel>
      </div>
      <div class="_panel-body-right">
        <card-panel>
          <h3 slot="title">活动商品</h3>
          <div slot="panel-btns"></div>
          <div slot="panel-body">
            <goodsOfActivity2 :obj="obj"></goodsOfActivity2>
          </div>
        </card-panel>
      </div>
    </div>
  </div>
</template>

<script>
  import goodsOfActivity2 from "./goodsOfActivity2"
  import { 
    getMallActivityPageOfActivity,
  } from 'src/vuex/actions/activityAction'
  import {dateFormat} from 'lib/utils/dateFormat.js'
  import prettysize from "lib/utils/prettysize"
  import _ from "lodash"
  export default {
    props: {
      obj: {
        type: Object,
        default: {}
      }
    },
    components: {
      goodsOfActivity2
    },
    data(){
      var _this = this; 
      var titleName = this.obj.isActivity==1?'活动':'专题';
      return {
        loading:false,//遮罩层
        titleName:titleName,
        activeName:'picTab0',
        dataList:[],
        shopFileDialog:false,
        activityPageList:[],
        activityPageLength:0,
        activityGoodsDialog:false,
        chooseDrsId:'',
        dragresize:{},
        areaIdIndex:0,
        activityPageObj:{
          pagePic:'',
        },
        //*************************
      }
    },
    created(){
      this.obj.opt = 'activityPage';
      this.loadPageList();
    },
    methods:{
      

      handleClick(tab, event) {
        console.log("tab", tab)
        this.activeName = tab.name;
        
      },
      
      loadPageList(){
        this.loading = true;
        getMallActivityPageOfActivity({
          activityId:this.obj.activityId,
        }).then((data) => {
          this.loading = false;
          const {success,msg,result}=data;
          if(success){
            this.dataList = result ;
            var apl = [];
            this.dataList.forEach((item) => {
              item.pageJsonExt = $.parseJSON(item.pageJson);
              apl.push({
                pageId:item.pageId,
                tabName:item.pageJsonExt.tabName,
                pagePic:item.pageJsonExt.pagePic,
              });
            });
            this.activityPageList = apl;
            this.activityPageLength = apl.length;
            //把选项卡标签显示出来*****************
            this.activeName = '';
            this.$nextTick(() => {
              this.activeName = "picTab0";
              var pj,divWidth,divHeight;
              this.dataList.forEach((item,index) => {
                pj = item.pageJsonExt;
                divWidth = pj.width/2;
                divHeight = pj.height/2;
                pj.goodsList.forEach((it)=>{
                  this.initCanvas({
                    goodsId:it.goodsId,
                    goodsSkuId:it.goodsSkuId,
                    goodsName:it.goodsName,
                    left:it.left/2,
                    top:it.top/2,
                    width:it.width/2,
                    height:it.height/2,
                    divWidth:divWidth,
                    divHeight:divHeight,
                    goodsName:it.goodsName,
                    tabId:'picTab'+index,
                  });
                });
                
              });
            });
            
            //****************
          }
        });
      },
      initCanvas(param) {
          param = param ||{};
          if(typeof param.left=='undefined'){
            param.left = 50;
          }
          if(typeof param.top=='undefined'){
            param.top = 50;
          }
          if(typeof param.width=='undefined'){
            param.width = 120;
          }
          if(typeof param.height=='undefined'){
            param.height = 50;
          }
          if(typeof param.tabId=='undefined'){
            param.tabId = this.activeName;
          }
          if(typeof param.goodsId=='undefined'){
            param.goodsId = '';
          }
          if(typeof param.goodsSkuId=='undefined'){
            param.goodsSkuId = '';
          }
          if(typeof param.goodsName=='undefined'){
            param.goodsName = '选择商品';
          }
          this.areaIdIndex++;
          var pObj = $("#"+param.tabId).find("#iDiv_show_activity_page");
          pObj.append(
             '<div id="drsElement_'+this.areaIdIndex+'" class="showDrsElement" '
                  +'style="left:'+param.left+'px;top:'+param.top+'px;width:'+param.width+'px;height:'+param.height+'px;" '
                  +'goodsId="'+param.goodsId+'" '
                  +'goodsSkuId="'+param.goodsSkuId+'" '
                  +'goodsName="'+param.goodsName+'" '
                  +'>'
              +'<span class="area_goods" title="'+param.goodsName+'">'+param.goodsName+'</span>'
            +'</div>'
          )
          
      }

      //**********************   
    },
    mounted(){
      
    }
  }
</script>

<style lang="sass">
html body {
  .showDrsElement {
  	position:absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(11, 10, 12, 0.7);
  }
  .area_goods{
    margin:10px;
    // cursor: pointer;
    color:#fff;
  }
  ._mobile-activity-page {
    min-height: 500px;
    >.el-tabs__header {
      display: flex;
      > .el-tabs__item { flex: 1; text-align: center; white-space: nowrap; }
    }
    > .el-tabs__content {
      padding: 2px;
      min-height: 580px;
      img { max-width: 100%; height: auto; }
    }
  }
}
</style>
