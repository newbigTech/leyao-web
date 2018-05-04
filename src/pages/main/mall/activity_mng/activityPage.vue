<template>
  <div class="_container">
    <card-panel class="_normal">
      <h3 slot="title">{{titleName}}操作</h3>
      <div slot="panel-btns">
        <el-button size="small" @click.native="saveActivityPage()" :disabled="!activityPageList.length" type="success">保存</el-button>
        <el-button size="small" @click.native.prevent="$emit('reback', 'activityList',obj)">返回</el-button>
      </div>
      <div slot="panel-body">
         <div class="_panel-body-container">
           <div class="_panel-body-lr">
             <div class="_panel-body-left" style="width: 578px;height:1080px;">
               <card-panel>
                 <h3 slot="title">活动页面 <el-tag type="primary" style="background-color: transparent">最多5个图片(1080*1920)</el-tag></h3>
                 <div slot="panel-btns">
                  <el-button size="mini" type="warning" @click="openShopFileDialog(1)" :disabled="activityPageLength <= 0">更换图片</el-button>
                  <el-button size="mini" type="success" @click="openShopFileDialog(2)" :disabled="activityPageLength >= 5">添加图片</el-button>
                </div>
                <div slot="panel-body">
                  <!-- <el-tabs ref="itab" id="tabs_pagePic" class="_mobile-activity-page" type="border-card" :closable="true" style="width: 100%" v-model="activeName" @tab-click="handleClick" @tab-remove="handleRemove">
                    <el-tab-pane :label="'图片'" v-for="(item,index) in activityPageList" :name="'picTab'+index" :id="'picTab'+index">
                      <div>
                        <div id="iDiv_show_activity_page" style="position:relative;" :dataWidth="item.width" :dataHeight="item.height" :pagePic="item.pagePic" :tabName="item.tabName" :pageId="item.pageId">
                          <img :src="obj.cloudShowUrl + item.pagePic">
                        </div>
                      </div>
                    </el-tab-pane>
                  </el-tabs> -->

                  <div class="_imgHotArea">
                    <draggable class="_imgHotArea-header" :list="activityPageList" @start="dragStart" @end="dragEnd" :class="{'_no-border': activityPageList.length == 0}">
                      <div
                        v-for="(item, index) in activityPageList"
                        class="_imgHotArea-item"
                        @click="dragClick(item, index, $event)"
                        :class="{'_active': index == curIndex}"
                      >
                        {{item.tabName}}
                        <i class="el-icon-circle-close" @click.stop="imgHotRemove(item, index, $event)"></i>
                      </div>
                    </draggable>
                    <div id="tabs_pagePic" class="_imgHotArea-body">
                      <div v-for="(item, index) in activityPageList" class="el-tab-pane _imgHotArea-img"
                      	 :id="'picTab'+index"
                          v-show="index == curIndex">
                        <div id="iDiv_show_activity_page" style="position:relative;" :dataWidth="item.width" :dataHeight="item.height" :pagePic="item.pagePic" :tabName="item.tabName" :pageId="item.pageId">
                          <img style="width:100%;height:100%;" :src="obj.cloudShowUrl + item.pagePic">
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
               </card-panel>
             </div>
             <div class="_panel-body-right">
               <card-panel>
                 <h3 slot="title">商品列表</h3>
                 <div slot="panel-btns"></div>
                 <div slot="panel-body">
                   <goods-of-activity @onSuccess="getActivityGoods" :obj="obj"></goods-of-activity>
                 </div>
               </card-panel>
             </div>
           </div>
         </div>
      </div>
    </card-panel>

    <!--商品图库Dialog-->
    <el-dialog title="商品图库" v-model="shopFileDialog" class="shop-img-file-dialog">
      <shop-file @onSuccess="getShopFile" :vm="tab5vm"></shop-file>
    </el-dialog>
     <!--活动商品Dialog-->
    <el-dialog title="活动商品" v-model="activityGoodsDialog" class="shop-img-file-dialog">
      <goods-of-activity @onSuccess="getActivityGoods" :obj="obj"></goods-of-activity>
    </el-dialog>
  </div>
</template>

<script>
  import draggable from "vuedraggable"
  import GoodsOfActivity from "./goodsOfActivity"
  import ShopFile from 'pages/main/mall/common/components/shop_file'
  import {
    getMallActivityPageOfActivity,
    saveMallActivityPage,
    deleteMallActivityPageOfActivity,
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
     ShopFile,GoodsOfActivity,draggable
    },
    data(){
      var _this = this;
      var titleName = this.obj.isActivity==1?'活动':'专题';
      return {
        loading:false,//遮罩层
        titleName:titleName,
        activeName:'picTab0',
        dataList:[],
        openShopFileDialogValue:0,
        shopFileDialog:false,
        tab5vm: new this.$root.constructor(),
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
        curIndex: 0,
      }
    },
    created(){
      this.obj.opt = 'activityPage';
      this.dragresizeInit(462,662);
      this.loadPageList();
    },
    methods:{

      openShopFileDialog(v) {
      		this.openShopFileDialogValue = v;//标记是更新还是添加按钮
          this.shopFileDialog = true
          this.tab5vm.$emit('on-load')
      },
      getShopFile(shopFiles) {
          if(shopFiles.length<=0){
            return;
          }
          var newFiles = [];
          for(var i=0,li=shopFiles.length; i<li; i++){
            if(shopFiles[i].strVal1=='1080*1920'){
              newFiles.push(shopFiles[i]);
            }
          }
          if(newFiles.length<=0){
            this.$message.error('只能选择1080*1920的图片');
            this.shopFileDialog = false;
            return ;
          }
          if(this.openShopFileDialogValue ==1){//更新操作
          	this.activityPageList[this.curIndex].tabName=newFiles[0].fileName;
          	this.activityPageList[this.curIndex].pagePic=newFiles[0].fileMd5;
          }else{
          	var sfLength = 5 - this.activityPageLength;//能添加多少张
	          for(var i=0;i<sfLength && i<newFiles.length; i++){
	            this.activityPageList.push({
	              tabName:newFiles[i].fileName,
	              pagePic:newFiles[i].fileMd5,
	              width:540,
	              height:960,
	              goodsList:[]
	            });
	            this.activityPageLength++;
	          }
	          this.curIndex = this.activityPageList.length - 1
	          this.activeName = "picTab" + (this.activityPageList.length - 1);
	          this.reSetDragresizeInit();
          }
          setTimeout(()=>{
            this.shopFileDialog = false;
          },100);

      },
      openActivityGoodsDialog() {
         this.activityGoodsDialog = true
      },
      getActivityGoods(activityGoods) {
        //console.log("activityGoods: ", activityGoods);
        this.activityGoodsDialog = false;
        // var obj = $('#'+this.chooseDrsId);
        // obj.attr('goodsId',activityGoods.goodsId).attr('goodsSkuId',activityGoods.goodsSkuId).attr('goodsName',activityGoods.goodsName);
        // obj.find('.area_goods').html(activityGoods.goodsName).attr('title',activityGoods.goodsName);

        this.initCanvas({
          goodsId:activityGoods.goodsId,
          goodsSkuId:activityGoods.goodsSkuId,
          goodsName:activityGoods.goodsName,
          left:100*Math.random(),
          top:100**Math.random(),
          // width:it.width,
          // height:it.height,
          // divWidth:divWidth,
          // divHeight:divHeight,
          // tabId:'picTab'+index,
        })

      },
      handleRemove(tab) {
        console.log('tab.name: ', tab.name)
        this.activityPageLength--;

        // let i = tab.name.replace('picTab', '')
        // this.activityPageList.splice(i, 1)

        //console.log(this.activityPageList)
      },
      handleClick(tab, event) {
        //console.log("tab", tab)
        this.activeName = tab.name;
        this.reSetDragresizeInit();
      },
      saveActivityPage(){
        var thiz;
        var activityPageJsonList = [];
        var obj,goodsList,activityPageJson;
        var err = '';
        $("#tabs_pagePic").find(".el-tab-pane").each(function(index){
          obj = $(this).find("#iDiv_show_activity_page");
          goodsList = [];
          obj.find(".drsElement").each(function(){
            thiz = $(this);
            if(thiz.attr("goodsId")=='' || typeof thiz.attr("goodsId")=='undefined'){
              return true;
            }

            goodsList.push({
              goodsId:parseInt(thiz.attr("goodsId"),10),
              goodsSkuId:parseInt(thiz.attr("goodsSkuId"),10),
              goodsName:thiz.attr('goodsName'),
              left:parseInt(thiz.css("left"),10)*2,//方块距离左边(离背景图片左边)
              top:parseInt(thiz.css("top"),10)*2,//方块距离上边(离背景图片上边)
              width:parseInt(thiz.width(),10)*2,//方块宽
              height:parseInt(thiz.height(),10)*2,//方块高
            });
          });
          if(goodsList.length <=0){
            err = '第 '+(index+1)+' 张图片还没设置商品';
            return false;
          }
          activityPageJson = {
            pageId:obj.attr("pageId"),
            pagePic:obj.attr('pagePic'),
            tabName:obj.attr('tabName'),
            width:parseInt(obj.attr("dataWidth"),10)*2, //保存时换成1080*1920
            height:parseInt(obj.attr("dataHeight"),10)*2,
            goodsList:goodsList,
          };
          activityPageJsonList.push(activityPageJson);

        });
        if(err != ''){
          this.$message.error(err);
          return false;
        }
        //console.log(activityPageJsonList);
        this.$confirm('确定保存活动页么？', '提示', {
          type: 'warning'
        }).then(() => {//确定
          var param = {
            activityId: this.obj.activityId,
            activityPageJsonList:JSON.stringify(activityPageJsonList),
          };
          saveMallActivityPage(param).then((data) => {
            const {success,msg,result}=data;
            this.$message({
              type: success? 'success':'error',
              message: msg
            });
            if(success){
              this.$emit('reback', 'activityList',this.obj);
            }
          });


        }).catch(() => {//取消

        });
        //*******************************
      },
      deleteActivityPage(){
        this.$confirm('确定把该'+this.titleName+'的活动页删除么？', '提示', {
          type: 'warning'
        }).then(() => {//确定
           var param ={
             activityId: this.obj.activityId
          };
          deleteMallActivityPageOfActivity(param).then((data) => {
              const {success,msg,result}=data;
              this.$message({
                type: success? 'success':'error',
                message: msg
            });
              if(success){
                this.$emit('reback', 'activityList',this.obj);
              }
          });

        }).catch(() => {//取消

        });

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
                width:item.pageJsonExt.width/2,
                height:item.pageJsonExt.height/2,
                goodsList:item.pageJsonExt.goodsList
              });
            });
            this.activityPageList = apl;
            this.activityPageLength = apl.length;
            //把选项卡标签显示出来*****************
            this.activeName = "picTab0";//显示第一个
            this.$nextTick(() => {
              if(this.activityPageList.length > 0){
                this.dragresizeInit(this.activityPageList[0].width,this.activityPageList[0].height);
              }
              var pj,divWidth,divHeight;
              this.activityPageList.forEach((item,index) => {
                divWidth = item.width;
                divHeight = item.height;
                item.goodsList.forEach((it)=>{
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
             '<div id="drsElement_'+this.areaIdIndex+'" class="drsElement drsMoveHandle" '
                  +'style="left:'+param.left+'px;top:'+param.top+'px;width:'+param.width+'px;height:'+param.height+'px;" '
                  +'goodsId="'+param.goodsId+'" '
                  +'goodsSkuId="'+param.goodsSkuId+'" '
                  +'goodsName="'+param.goodsName+'" '
                  +'>'
              +'<span class="area_remove"><i class="el-icon-circle-close" title="移除商品"></i></span>'
              +'<span class="area_goods" title="'+param.goodsName+'">'+param.goodsName+'</span>'
            +'</div>'
          )
          var dObj = pObj.find('#drsElement_'+this.areaIdIndex);
          dObj.find('.area_remove').bind('click',function(){
            $(this).parent().remove();
          });
          // dObj.find('.area_goods').bind('click',(event)=>{
          //   this.chooseDrsId = $(event.currentTarget).parent().attr("id");
          //   this.openActivityGoodsDialog();
          // });
          if(typeof param.divWidth=='undefined' || param.divWidth=='' || param.divWidth==0){
            param.divWidth = pObj.width();
          }
          if(typeof param.divHeight=='undefined' || param.divHeight=='' || param.divHeight==0){
            param.divHeight = pObj.height();
          }
          var width = param.divWidth;
          var height = param.divHeight;

          //把该div的高宽保存起来，要不然display：none无法获取
          pObj.attr("dataWidth",parseInt(width,10)).attr("dataHeight",parseInt(height,10));

      }
      ,dragresizeInit(width,height){
          this.dragresize = new DragResize('dragresize', { minWidth: 30, minHeight: 20, minLeft: 0, minTop: 0, maxLeft: width, maxTop: height, elementClass:"drsElement" });
          this.dragresize.isElement = function(elm) {
              //if (elm.className && elm.className.indexOf('drsElement') > -1) return true;
              if(elm.className){
                  if(elm.className.indexOf('drsElement') > -1) {
                      return true;
                  }
              }
          };
          this.dragresize.isHandle = function(elm) {
              if (elm.className && elm.className.indexOf('drsMoveHandle') > -1) return true;
          };
          this.dragresize.ondragfocus = $.proxy(function(){
          }, this);
          this.dragresize.ondragmove = $.proxy(function(isResize) {

          }, this);
          this.dragresize.ondragblur = $.proxy(function(isResize) { }, this);
          // dragresize.ondragstart = function(isResize) { };

          this.dragresize.apply(document);
      },
      reSetDragresizeInit(){
        this.$nextTick(() => {
          var pObj = $("#"+this.activeName).find("#iDiv_show_activity_page");
          pObj.attr("dataWidth",parseInt(pObj.width(),10)).attr("dataHeight",parseInt(pObj.height(),10));
          this.dragresizeInit(parseInt(pObj.width(),10),parseInt(pObj.height(),10));
        });
      },
      //**********************

      dragStart(ev) {
        //console.log("dragStart...")
      },
      dragEnd (ev) {
        //console.log("dragEnd...", ev.newIndex, ev.oldIndex )
        // 如果没有拖动
        if (ev.newIndex == null || ev.newIndex == ev.oldIndex) return
        console.log("dragEnd...", ev.newIndex);
        var thiz,obj,goodsList;
        this.activityPageList.forEach((item,index) => {
          obj = $("#picTab"+index).find("#iDiv_show_activity_page");
          goodsList = [];
          obj.find(".drsElement").each(function(){
            thiz = $(this);
            if(thiz.attr("goodsId")=='' || typeof thiz.attr("goodsId")=='undefined'){
              return true;
            }
            goodsList.push({
              goodsId:parseInt(thiz.attr("goodsId"),10),
              goodsSkuId:parseInt(thiz.attr("goodsSkuId"),10),
              goodsName:thiz.attr('goodsName'),
              left:parseInt(thiz.css("left"),10)*2,//方块距离左边(离背景图片左边)
              top:parseInt(thiz.css("top"),10)*2,//方块距离上边(离背景图片上边)
              width:parseInt(thiz.width(),10)*2,//方块宽
              height:parseInt(thiz.height(),10)*2,//方块高
            });
          });
          item.goodsList = goodsList;
        });
        this.curIndex = ev.newIndex;
        //对调商品
        var oldGoodsList = this.activityPageList[ev.oldIndex].goodsList;
        var newGoodsList = this.activityPageList[ev.newIndex].goodsList;
        this.activityPageList[ev.oldIndex].goodsList = newGoodsList;
        this.activityPageList[ev.newIndex].goodsList = oldGoodsList;

        this.activeName = "picTab"+this.curIndex;//显示第一个
        this.$nextTick(() => {
          if(this.activityPageList.length > 0){
            this.dragresizeInit(this.activityPageList[0].width,this.activityPageList[0].height);
          }
          $(".drsElement").remove();//全部清理掉
          var divWidth,divHeight;
          this.activityPageList.forEach((item,index) => {
            divWidth = item.width;
            divHeight = item.height;
            item.goodsList.forEach((it)=>{
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
      },
      dragClick(item, index, ev) {
        this.curIndex = index
        this.activeName = 'picTab'+this.curIndex;
        //console.log("dragClick...",this.activeName)
      },
      imgHotRemove(item, index, ev) {
        //console.log("remove: ", index)
        this.activityPageList.splice(index,1);
        this.activityPageLength = this.activityPageList.length
        this.curIndex = 0;
        this.activeName = 'picTab'+this.curIndex;
      }
    },
    mounted(){

    }
  }
</script>

<style lang="sass">
html body {
  .drsElement {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(11, 10, 12, 0.7);
  }
  .area_remove {
    cursor: pointer;
    position: absolute;
    right: 2px;
    top: -1px;
    z-index: 200;
    color: #fff;
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

  ._imgHotArea-header {
    display: flex;
    width: 542px;
    border: 1px solid #ccc;
    border-bottom-width: 0;
    &._no-border { border-color: transparent; }
  }
  ._imgHotArea-item {
    flex: 1;
    min-width: 100px;
    height: 45px;
    line-height: 45px;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    border-right: 1px solid #ccc;
    background-color: #f5f5f5;
    cursor: pointer;
    position: relative;
    &:last-child { border-right: 0; }
    i {
      position: absolute;
      top: 2px;
      right: 2px;
      color: #aaa;
      &:hover {
        color: #F54D6B;
      }
    }
    &:hover {
      background-color: #fff;
    }
  }

  ._imgHotArea-item._active {
    background-color: #fff;
    color: #20a0ff;
  }

  ._imgHotArea-body {
    width: 542px;
    height: 962px;
    border: 1px solid #ccc;
    // box-shadow: 0px 0px 1px 1px #ccc;
  }
  ._imgHotArea-img {
    width: 100%;
    height: 100%;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
  }
}
</style>
