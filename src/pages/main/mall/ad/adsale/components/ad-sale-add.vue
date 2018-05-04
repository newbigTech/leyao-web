<template>
  <div class="_container">
    <card-panel>
      <span slot="title">{{headerTitle}}</span>
      <div slot="panel-btns">
      <el-button type="primary" size="small" @click.native.prevent="handleSubmit" v-show="!isOtherFlag">保存</el-button>
      <el-button type="primary" size="small" @click.native.prevent="$emit('reback', 'adSaleList',paramObj)">返回</el-button></div>
      <div slot="panel-body">
        <div class="_panel-body-container" >

              <div class="_panel-body-lr">
                <div slot="panel-body">
                  <el-form :inline="true" :model="adSaleParam"  class="demo-form-inline" :rules="rules" ref="ruleForm">
                    <el-form-item label="营销广告名称" prop="adName">
                      <el-input v-model="adSaleParam.adName" :maxlength="30" placeholder="请输入营销广告名称" style="width: 200px" :disabled="isOtherFlag"></el-input>
                    </el-form-item>
                    <el-form-item label="营销广告全名" prop="adName">
                      <el-input v-model="adSaleParam.adFullName" :maxlength="30" placeholder="请输入营销广告全名" style="width: 295px" :disabled="isOtherFlag"></el-input>
                    </el-form-item>                    
                    <el-form-item label="选择日期">
                       <el-date-picker
                          v-model="rangeDate"
                          type="daterange"
                          placeholder="选择日期范围"
                          style="width: 295px"
                          :picker-options="rangeDateOptions" :disabled="isUpdateFlag">
                       </el-date-picker>
                    </el-form-item>
                    <!-- <el-form-item style="margin:20px 0;">
                        <el-button type="primary" @click.native.prevent="handleSubmit" v-show="!isOtherFlag">立即创建</el-button>
                        <el-button @click.native.prevent="$emit('reback', 'adSaleList',paramObj)">返回</el-button>
                    </el-form-item> -->
                    </el-form>
                  </div>
                </div>

                <div class="_panel-body-lr">
                 <div class="_panel-body-left" style="width: 578px;height:1080px;">
                   <card-panel>
                     <h3 slot="title">活动页面 <el-tag type="primary" style="background-color: transparent">最多5个图片(1080*1920)</el-tag></h3>
                     <div slot="panel-btns">
                      <el-button size="mini" type="danger" @click="getAdGoods()" :disabled="adPageLength > 5||adPageLength < 1">添加热区</el-button>
                      <el-button size="mini" type="warning" @click="openShopFileDialog(1)" :disabled="adPageLength <= 0">更换图片</el-button>
                      <el-button size="mini" type="success" @click="openShopFileDialog(2)" :disabled="adPageLength >= 5">添加图片</el-button>
                    </div>
                    <div slot="panel-body">
                      <div class="_imgHotArea">
                        <draggable class="_imgHotArea-header" :list="adListPage" @start="dragStart" @end="dragEnd" :class="{'_no-border': adListPage.length == 0}">
                          <div
                            v-for="(item, index) in adListPage"
                            class="_imgHotArea-item"
                            @click="dragClick(item, index, $event)"
                            :class="{'_active': index == curIndex}"
                          >
                            {{item.tabName}}
                            <i class="el-icon-circle-close" @click.stop="imgHotRemove(item, index, $event)"></i>
                          </div>
                        </draggable>
                        <div id="tabs_pagePic" class="_imgHotArea-body">
                          <div v-for="(item, index) in adListPage" class="el-tab-pane _imgHotArea-img"
                             :id="'picTab'+index"
                              v-show="index == curIndex">
                            <div id="iDiv_show_activity_page" style="position:relative;" :dataWidth="item.width" :dataHeight="item.height" :pagePic="item.pagePic" :tabName="item.tabName" :pageId="item.pageId">
                              <img style="width:100%;height:100%;" :src="cloudShowUrl + item.pagePic">
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                   </card-panel>
                 </div>
               </div>
          </div>
      </div>
    </card-panel>


    <!-- dialogData config datasouce-->
    <dialog-data ref="dialogData" @onSuccess="onSuccess"></dialog-data>
    <!--商品图库Dialog-->
    <el-dialog title="商品图库" v-model="shopFileDialog" class="shop-img-file-dialog">
      <shop-file @onSuccess="getShopFile" :vm="tab5vm"></shop-file>
    </el-dialog>
  </div>
</template>

<script>

  import moment from "moment"
  import _ from "lodash"
  import draggable from "vuedraggable"
  import prettysize from "lib/utils/prettysize"
  import RegExp from 'lib/utils/regexp'
  import { dateFormat as _dateFormat } from "lib/utils/dateFormat"
  import { _addOrUpdateAdSale } from 'src/vuex/actions/adSaleAction'
  import dialogData from 'pages/main/mall/supplier/day_home/components/dialog-data'
  import ShopFile from 'pages/main/mall/common/components/shop_file'

  export default {
    props: {
      paramObj: Object, default: () => {},
    },
    computed: {
      cloudShowUrl() {
        return this.$store.getters.cloudShowUrl
      }
    },
    components: {
        dialogData,
        ShopFile,
        draggable
    },
    data(){
      var _this = this;
      return {
         rangeDateOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          },
        },
        timeOptions1:{},
        timeOptions2:{},

        page :1,
        pageSize :5,
        totalSize: 0,
        adSaleParam:{

        },

        rangeDate:[],

        headerTitle:'新增营销广告',
        isUpdateFlag:false, // 是否可以修改
        isOtherFlag:false ,

        shopFileDialog:false, // 选择文件框默认不显示

        defaultDate:"2017-01-01 ",

        curIndex: 0, // 当前第几个页面
        
        adPageLength:0,
        tab5vm: new this.$root.constructor(),
        openShopFileDialogValue:0,
        adListPage:[],

        goodsJson:[],//商品数据
        areaIdIndexs:0,// 每个页面一共多少热区
        currentIndex:0,// 当前第几个热区


        rules: {
          adName: [
            { required: true, message: '请输入营销广告名称', trigger: 'blur' },
            { type: 'string', min: 0, max: 50, message: '营销广告名称不能超过50' }
          ],
          adFullName: [
            { required: true, message: '请输入营销广告全名', trigger: 'blur' },
            { type: 'string', min: 0, max: 50, message: '营销广告全名不能超过100' }
          ],
        }
      }
    },
    methods:{
        openShopFileDialog(v) {
            this.openShopFileDialogValue = v;//标记是更新还是添加按钮
            this.shopFileDialog = true
            this.tab5vm.$emit('on-load')
        },


        loadData(){
            if(JSON.stringify(this.paramObj) != '{}'){
              if(this.paramObj.adSaleModel.actionType == 'detail'){
                this.headerTitle='营销广告详情' ;
                this.isOtherFlag = true ;
              }else{
                this.headerTitle='营销广告弹窗' ;
              }
              this.isUpdateFlag = true ;
              // console.log(JSON.stringify(this.paramObj))
              this.adSaleParam = this.paramObj.row ;
              if(this.adSaleParam.adBeginDay != ''){
                  this.rangeDate[0] = new Date(this.adSaleParam.adBeginDay) ;
                  this.rangeDate[1] = new Date(this.adSaleParam.adEndDay) ;
              }         

              let apl = [];
              let adJsonObj = [] ;
              adJsonObj = JSON.parse(this.paramObj.row.adJson) ;
              adJsonObj.forEach((item) => {
                apl.push({
                  pageId:item.pageId,
                  tabName:item.tabName,
                  pagePic:item.pagePic,
                  width:item.width/2,
                  height:item.height/2,
                  adGoodsList:item.adGoodsList,
                  pageIndex:0
                });
              });
              this.adListPage = apl;
              this.adPageLength = apl.length;
              console.log(JSON.stringify(this.adListPage));
              //把选项卡标签显示出来*****************
              this.activeName = "picTab0";//显示第一个
              this.$nextTick(() => {
                if(this.adListPage.length > 0){
                  this.dragresizeInit(this.adListPage[0].width,this.adListPage[0].height);
                }
                let pj,divWidth,divHeight;
                this.adListPage.forEach((item,index) => {
                  divWidth = item.width;
                  divHeight = item.height;

                  item.adGoodsList.forEach((it,cIndex)=>{
                    this.initCanvas({
                      id:it.id,
                      name:it.name,
                      type:it.type,
                      goodsSkuId:it.goodsSkuId,
                      left:it.left/2,
                      top:it.top/2,
                      width:it.width/2,
                      height:it.height/2,
                      divWidth:divWidth,
                      divHeight:divHeight,
                      tabId:'picTab'+index,
                    });                   
                  });
                });
             });
          }
        },

        dragStart(ev) {
          //console.log("dragStart...")
        },
        dragEnd (ev) {  
          //console.log("dragEnd...", ev.newIndex, ev.oldIndex )
          // 如果没有拖动
          if (ev.newIndex == null || ev.newIndex == ev.oldIndex) return
          console.log("dragEnd...", ev.newIndex);
          let thiz,obj,adGoodsList;
          this.adListPage.forEach((item,index) => {
            obj = $("#picTab"+index).find("#iDiv_show_activity_page");
            adGoodsList = [];
            obj.find(".drsElement").each(function(){
              thiz = $(this);
              if(thiz.attr("ad_id")=='' || typeof thiz.attr("ad_id")=='undefined'){
                return true;
              }
              adGoodsList.push({
                id:thiz.attr("ad_id"),
                name:thiz.attr("ad_name"),
                type:thiz.attr("ad_type"),
                goodsSkuId:thiz.attr("ad_skuid"),
                left:parseInt(thiz.css("left"),10)*2,//方块距离左边(离背景图片左边)
                top:parseInt(thiz.css("top"),10)*2,//方块距离上边(离背景图片上边)
                width:parseInt(thiz.width(),10)*2,//方块宽
                height:parseInt(thiz.height(),10)*2,//方块高
              });
            });
            item.adGoodsList = adGoodsList;
          });
          this.curIndex = ev.newIndex;
          //对调商品
          let oldGoodsList = this.adListPage[ev.oldIndex].adGoodsList;
          let newGoodsList = this.adListPage[ev.newIndex].adGoodsList;
          this.adListPage[ev.oldIndex].adGoodsList = newGoodsList;
          this.adListPage[ev.newIndex].adGoodsList = oldGoodsList;

          this.activeName = "picTab"+this.curIndex;//显示第一个
          this.$nextTick(() => {
            if(this.adListPage.length > 0){
              this.dragresizeInit(this.adListPage[0].width,this.adListPage[0].height);
            }
            $(".drsElement").remove();//全部清理掉
            var divWidth,divHeight;
            this.adListPage.forEach((item,index) => {
              divWidth = item.width;
              divHeight = item.height;
              item.adGoodsList.forEach((it)=>{
                  this.initCanvas({
                    id:it.id,
                    name:it.name,
                    type:it.type,
                    goodsSkuId:it.goodsSkuId,
                    left:it.left/2,
                    top:it.top/2,
                    width:it.width/2,
                    height:it.height/2,
                    divWidth:divWidth,
                    divHeight:divHeight,
                    tabId:'picTab'+index,
                  });
              });
              item.pageIndex=item.adGoodsList.length;
            });
          });           
        },   
        dragresizeInit(width,height){
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
              this.adListPage[this.curIndex].tabName=newFiles[0].fileName;
              this.adListPage[this.curIndex].pagePic=newFiles[0].fileMd5;
            }else{
              var sfLength = 5 - this.adPageLength;//能添加多少张
              for(var i=0;i<sfLength && i<newFiles.length; i++){
                this.adListPage.push({
                  tabName:newFiles[i].fileName,
                  pagePic:newFiles[i].fileMd5,
                  width:540,
                  height:960,
                  goodsList:[],

                  pageIndex:0
                });
                this.adPageLength++;
              }
              this.curIndex = this.adListPage.length - 1
              this.activeName = "picTab" + (this.adListPage.length - 1);
              this.reSetDragresizeInit();
            }
            setTimeout(()=>{
              this.shopFileDialog = false;
            },100);

        },

        reSetDragresizeInit(){
          this.$nextTick(() => {
            var pObj = $("#"+this.activeName).find("#iDiv_show_activity_page");
            pObj.attr("dataWidth",parseInt(pObj.width(),10)).attr("dataHeight",parseInt(pObj.height(),10));
            this.dragresizeInit(parseInt(pObj.width(),10),parseInt(pObj.height(),10));
          });
        },

        dragClick(item, index, ev) {
          this.curIndex = index
          this.activeName = 'picTab'+this.curIndex;
          //console.log("dragClick...",this.activeName)
        },
        imgHotRemove(item, index, ev) {
          //console.log("remove: ", index)
          this.adListPage.splice(index,1);
          this.adPageLength = this.adListPage.length
          this.curIndex = 0;
          this.activeName = 'picTab'+this.curIndex;
        },

        getAdGoods() {
          //console.log("adListPage: ", JSON.stringify(this.adListPage));
          //console.log("curIndex: ", this.adListPage[this.curIndex].pageIndex);

          if(this.adListPage[this.curIndex].pageIndex > 4){
            this.$message({message: '每个活动页面最多选择5个热区', type: 'warning'});
            return ;            
          }


          this.initCanvas({
            // goodsId:activityGoods.goodsId,
            // goodsSkuId:activityGoods.goodsSkuId,
            // goodsName:activityGoods.goodsName,
            left:100*Math.random(),
            top:100**Math.random(),
          })

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
            if(typeof param.id=='undefined'){
              param.id = '';
            }
            if(typeof param.goodsSkuId=='undefined'){
              param.goodsSkuId = '';
            }
            if(typeof param.name=='undefined'){
              param.name = '选择商品';
            }
            if(typeof param.type=='undefined'){
              param.type = '';
            }
            //this.areaIdIndex++;
            //console.log(this.adListPage)
            this.adListPage[this.curIndex].pageIndex++ ;
            param.goodsIndex = this.adListPage[this.curIndex].pageIndex ;

            var pObj = $("#"+param.tabId).find("#iDiv_show_activity_page");
            pObj.append(
               '<div id="drsElement_'+param.goodsIndex+'" class="drsElement drsMoveHandle" '
                    +'style="left:'+param.left+'px;top:'+param.top+'px;width:'+param.width+'px;height:'+param.height+'px;" '
                    +'ad_id="'+param.id+'" '
                    +'ad_name="'+param.name+'" '
                    +'ad_type="'+param.type+'" ' 
                    +'ad_skuid="'+param.goodsSkuId+'" '                 
                    +'>'
                +'<span class="area_add"><i class="el-icon-plus" title="添加商品"></i></span>'
                +'<span class="area_remove"><i class="el-icon-circle-close" title="移除商品"></i></span>'
                +'<span class="area_goods">'+param.name+'</span>'
              +'</div>'
            )
            var dObj = pObj.find('#drsElement_'+param.goodsIndex);
            dObj.find('.area_remove').bind('click',()=> {
              this.adListPage[this.curIndex].pageIndex--;
              dObj.find('.area_remove').parent().remove();
            });

            dObj.find('.area_add').bind('click',() => {
              this.currentIndex = param.goodsIndex   ;
              this.onOpenGoodDataDailog() ;
            });   
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

        },


        onOpenGoodDataDailog(){
          this.$refs.dialogData.dayHomeDataVisible = false;
          this.$refs.dialogData.show();
          // this.$refs.dialogData.onDailogOpen();
        },
        onSuccess(data) {
          let linkObj = {} ;
          linkObj.id = data.id ;
          linkObj.name = data.name ;
          //0：来源商品 1：来源商品组2：来源专题3：来源活动4：充值有礼5：网销卡6：优惠券7 :  拼团商品
          linkObj.type = data.type ;
          $("#picTab"+this.curIndex).find("#drsElement_"+this.currentIndex).find('.area_goods').html(linkObj.name)
          $("#picTab"+this.curIndex).find("#drsElement_"+this.currentIndex).attr("ad_id",data.id);
          $("#picTab"+this.curIndex).find("#drsElement_"+this.currentIndex).attr("ad_name",data.name);
          $("#picTab"+this.curIndex).find("#drsElement_"+this.currentIndex).attr("ad_type",data.type);
          console.log(data.goodsSkuId)
          if(data.goodsSkuId){
            $("#picTab"+this.curIndex).find("#drsElement_"+this.currentIndex).attr("ad_skuid",data.goodsSkuId);
          }
          //console.log(JSON.stringify(data))
        },

        handleSubmit(ev) {
           this.$refs.ruleForm.validate((valid) => {
              if (valid) {
                  if(!this.rangeDate || this.rangeDate.length <= 0){
                    this.$message({message: '请选择日期范围', type: 'warning'});
                    return ;
                  }


                  let tempDtmStart = '' ;
                  let tempDtmEnd = '' ;
                  if(this.rangeDate[0] && this.rangeDate[1]){
                     tempDtmStart = _dateFormat(new Date(this.rangeDate[0]),"yyyy-MM-dd") ;
                     tempDtmEnd = _dateFormat(new Date(this.rangeDate[1]),"yyyy-MM-dd") ;
                  }

                  this.adSaleParam.beginDay = tempDtmStart ;
                  this.adSaleParam.endDay = tempDtmEnd ;                  

                  let thiz;
                  var adPageJsonList = [];
                  var obj,adGoodsList,adPageJson;
                  var err = '';

                  if(this.adPageLength <= 0){
                    this.$message({message: '请选择至少一张图片', type: 'warning'});
                    return ;
                  }
                  $("#tabs_pagePic").find(".el-tab-pane").each(function(index){
                    obj = $(this).find("#iDiv_show_activity_page");
                    adGoodsList = [];
                    obj.find(".drsElement").each(function(){
                      thiz = $(this);
                      if(thiz.attr("id")=='' || typeof thiz.attr("id")=='undefined'){
                        return true;
                      }
   
                      adGoodsList.push({
                        id:thiz.attr("ad_id"),
                        name:thiz.attr("ad_name"),
                        type:thiz.attr("ad_type"),
                        goodsSkuId:thiz.attr("ad_skuid"),
                        left:parseInt(thiz.css("left"),10)*2,//方块距离左边(离背景图片左边)
                        top:parseInt(thiz.css("top"),10)*2,//方块距离上边(离背景图片上边)
                        width:parseInt(thiz.width(),10)*2,//方块宽
                        height:parseInt(thiz.height(),10)*2,//方块高
                      });
                    });
                    if(adGoodsList.length <=0){
                      err = '第 '+(index+1)+' 张图片还没设置热区';
                      return false;
                    }
                    adPageJson = {
                      pageId:obj.attr("pageId"),
                      pagePic:obj.attr('pagePic'),
                      tabName:obj.attr('tabName'),
                      width:parseInt(obj.attr("dataWidth"),10)*2, //保存时换成1080*1920
                      height:parseInt(obj.attr("dataHeight"),10)*2,
                      adGoodsList:adGoodsList,
                    };
                    adPageJsonList.push(adPageJson);

                  });
                  if(err != ''){
                    this.$message.error(err);
                    return false;
                  }
                  this.adSaleParam.adJson = JSON.stringify(adPageJsonList) ;
                  //console.log(JSON.stringify(this.adSaleParam)); return ;

                  this.$confirm('确定保存营销广告页么？', '提示', {
                    type: 'warning'
                  }).then(() => {//确定
                    _addOrUpdateAdSale(this.adSaleParam).then((data) => {
                        const {success, msg} = data;
                        if(success) {
                          this.$message({message: '操作成功', type: 'success'});
                          // 保存成功之后返回
                          this.$emit("reback", "adSaleList", this.paramObj);
                        } else {
                            this.$message.error('错了哦，'+msg);
                            console.log(msg)
                        }
                    });
                  }).catch(() => {//取消

                  });

              }else{
                console.log("校验失败") ;
              }
           })
        },


        selectImg(td, index) {
          console.log('selectImg')
            this.shopFileDialog = true
            setTimeout(() => {
                this.$refs.shopFileComm.onLoadData()
            }, 0)
        },
    },
    created(){
      this.loadData() ;
    },

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
  .area_add {
    cursor: pointer;
    position: absolute;
    left: 2px;
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
