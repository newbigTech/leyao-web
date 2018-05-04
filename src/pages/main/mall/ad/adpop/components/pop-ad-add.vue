<template>
  <div class="_container">
    <card-panel>
      <span slot="title">{{headerTitle}}</span>
      <div slot="panel-btns"><el-button type="primary" size="small" @click.native.prevent="$emit('reback', 'popAdList',paramObj)">返回</el-button></div>
      <div slot="panel-body">
        <div class="_panel-body-container" >
          <div class="_panel-body-lr">
                <div slot="panel-body">
                  <el-form :model="popadParam" :rules="rules" ref="ruleForm" label-width="100px" style="width: 800px">
                    <el-form-item label="弹出层名称" prop="adName">
                      <el-input v-model="popadParam.adName" :maxlength="30" placeholder="请输入弹出层名称" style="width: 295px" :disabled="isOtherFlag"></el-input>
                    </el-form-item>
                    <el-form-item label="用途" prop="adNote" >
                      <el-input placeholder="请输入店铺描述" type="textarea" v-model="popadParam.adNote" style="width: 295px" :disabled="isOtherFlag"></el-input>
                    </el-form-item>
                    <el-form-item label="弹出样式" required>
                        <el-select v-model="popadParam.showType" placeholder="弹出样式" style="width: 295px;" :disabled="isOtherFlag">
                            <el-option label="随机" value="0"></el-option>
                            <el-option label="旋转进入" value="1"></el-option>
                            <el-option label="从小变大 " value="2"></el-option>
                            <el-option label="从左往右" value="3"></el-option>
                            <el-option label="从右往左" value="4"></el-option>
                            <el-option label="从上往下" value="5"></el-option>
                            <el-option label="从下往上" value="6"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="链接内容">
                        <el-input v-model="popadParam.linkType" disabled style="width: 210px;"></el-input>
                        <el-button  style="width:80px;" @click.native.prevent="onOpenDataDailog" v-show="!isOtherFlag">选择链接</el-button>
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

<!--                     <el-form-item label="选择时间">
                      <el-time-picker
                        is-range
                        v-model="rangeTime"
                        placeholder="选择时间范围" :disabled="isOtherFlag">
                      </el-time-picker>
                      <el-time-picker
                        is-range
                        v-model="rangeTime1"
                        :picker-options="timeOptions1"
                        placeholder="选择时间范围" v-show="adTimeRange.index >= 1" :disabled="isOtherFlag">
                      </el-time-picker>
                      <el-time-picker
                        is-range
                        v-model="rangeTime2"
                        :picker-options="timeOptions2"
                        placeholder="选择时间范围" v-show="adTimeRange.index >= 2" :disabled="isOtherFlag">
                      </el-time-picker>
                      <span v-show="!isOtherFlag">
                      <el-button @click.native.prevent="addOneRangeTime" ng-disabled="adTimeRange.index == 2 || adTimeRange.plusIconDisabled"><i class="el-icon-plus"></i></el-button>
                      <el-button @click.native.prevent="deleteOneAdTime" v-show="adTimeRange.index > 0" style="margin-left: 1px;"><i class="el-icon-minus"></i></el-button>
                      </span>
                    </el-form-item> -->

                    <el-form-item label="选择时间">
                      <div>
                        <div style="margin-top: 10px">
                          <el-time-select
                            v-model="rangeTimeStart"
                            :editable = "false"
                            :picker-options="{
                              start: '00:00',
                              step: '00:15',
                              end: '23:59'
                            }" :disabled="isOtherFlag" >
                          </el-time-select>
                          <el-time-select
                            :editable = "false"
                            v-model="rangeTimeEnd"
                            :picker-options="{
                              start: '00:00',
                              step: '00:15',
                              end: '23:59'
                            }" :disabled="isOtherFlag">
                          </el-time-select>
                        </div>
                        <div style="margin-top: 10px">
                          <el-time-select
                            :editable = "false"
                            v-model="rangeTimeStart1"
                            :picker-options="{
                              start: '00:00',
                              step: '00:15',
                              end: '23:59'
                            }" v-show="adTimeRange.index >= 1" :disabled="isOtherFlag">
                          </el-time-select>
                          <el-time-select
                            :editable = "false"
                            v-model="rangeTimeEnd1"
                            :picker-options="{
                              start: '00:00',
                              step: '00:15',
                              end: '23:59'
                            }" v-show="adTimeRange.index >= 1" :disabled="isOtherFlag">
                          </el-time-select>
                        </div>
                        <div style="margin-top: 10px">
                          <el-time-select
                            :editable = "false"
                            v-model="rangeTimeStart2"
                            :picker-options="{
                              start: '00:00',
                              step: '00:15',
                              end: '23:59'
                            }" v-show="adTimeRange.index >= 2" :disabled="isOtherFlag">
                          </el-time-select>
                          <el-time-select
                            v-model="rangeTimeEnd2"
                            :editable = "false"
                            :picker-options="{
                              start: '00:00',
                              step: '00:15',
                              end: '23:59'
                            }" v-show="adTimeRange.index >= 2" :disabled="isOtherFlag">
                          </el-time-select>
                        </div>
                      </div>

                      <div v-show="!isOtherFlag" style="margin-top: 10px">
                        <el-button @click.native.prevent="addOneRangeTime" ng-disabled="adTimeRange.index == 2 || adTimeRange.plusIconDisabled"><i class="el-icon-plus"></i></el-button>
                        <el-button @click.native.prevent="deleteOneAdTime" v-show="adTimeRange.index > 0" style="margin-left: 1px;"><i class="el-icon-minus"></i></el-button>
                      </div>

                    </el-form-item>



                    <el-form-item label="选择图片" required>
                      <!-- <el-button type="success" style="width:150px;" @click.native.prevent="selectImg">选择图片<i class="el-icon-search"></i></el-button>
                      <img :src="pictureUrl" style="width: 120px;height: 100px;"> -->
                      <div class="_img-groups">
                        <div class="_img-groups-container">
                          <div class="_img-group">
                            <div class="_img-box" @click.prevent="selectImg">
                              <div class="_img-box-icon"><i class="el-icon-upload"></i></div>
                              <div class="_img-box-text">选择/上传图片</div>
                              <div class="_img-box-view" v-show="!!pictureUrl">
                                <img :src="pictureUrl">
                                <div class="_img-box-view-mask">
                                  <span>更改图片</span>
                                  <!-- <button class="btn btn-xs btn-warning" @click.native.prevent="selectImg">更换</button>
                                  <button class="btn btn-xs btn-danger">移除</button> -->
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                    </el-form-item>

                    <!-- <el-form-item>
                      <el-button size="small" style="width:300px;" @click.native.prevent="onOpenDataDailog">选择链接</el-button>
                    </el-form-item> -->

                    <el-form-item style="margin:20px 0;">
                        <el-button type="primary" @click.native.prevent="handleSubmit" v-show="!isOtherFlag">立即创建</el-button>
                        <el-button @click.native.prevent="$emit('reback', 'popAdList',paramObj)">返回</el-button>
                    </el-form-item>
                  </el-form>
                </div>
          </div>
        </div>
      </div>
    </card-panel>


    <!-- dialogData config datasouce-->
    <dialog-data ref="dialogData" @onSuccess="onSuccess"></dialog-data>
    <!--商品图库Dialog-->
    <el-dialog title="图库" v-model="shopFileDialog" class="shop-img-file-dialog">
            <shop-file @onSuccess="getShopFile" ref="shopFileComm"></shop-file>
    </el-dialog>
  </div>
</template>

<script>

  import moment from "moment"
  import prettysize from "lib/utils/prettysize"
  import RegExp from 'lib/utils/regexp'
  import { dateFormat as _dateFormat } from "lib/utils/dateFormat"
  import { _addOrUpdatePopAd } from 'src/vuex/actions/popAdAction'
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
        ShopFile
    },
    data(){
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
        popadParam:{
          showType:"0",
          linkType:'',
        },

        pictureUrl:'', // 图片路径
        rangeDate:[],
        rangeTime:[],
        rangeTime1:[],
        rangeTime2:[],

        headerTitle:'新增广告弹窗',
        isUpdateFlag:false, // 是否可以修改
        isOtherFlag:false ,

        shopFileDialog:false, // 选择文件框默认不显示

        defaultDate:"2017-01-01 ",
        adTimeRange:{
            index: 0,
            // tr0: "08:00-20:00",
            // tr1: "",
            // tr2: "",
            // endPoint: h2m('23:55') - 10,
            plusIconDisabled: false,
            show: -1,
            locked0: false,
            locked1: false,
            nextTime1: '',
            nextTime2: '',
        },

        rangeTimeStart:'08:00',
        rangeTimeEnd:'20:00',
        rangeTimeStart1:'',
        rangeTimeEnd1:'',
        rangeTimeStart2:'',
        rangeTimeEnd2:'',


        rules: {
          adName: [
            { required: true, message: '请输入弹出层名称', trigger: 'blur' },
            { type: 'string', min: 0, max: 50, message: '弹出层名称不能超过50' }
          ],
          adNote: [
            { required: true, message: '请输入用途', trigger: 'blur' },
          ],
        }
      }
    },
    methods:{
        loadData(){
          if(JSON.stringify(this.paramObj) != '{}'){
            if(this.paramObj.popAdModel.actionType == 'detail'){
              this.headerTitle='广告弹窗详情' ;
              this.isOtherFlag = true ;
            }else{
              this.headerTitle='修改广告弹窗' ;
            }
            this.isUpdateFlag = true ;
            // console.log(JSON.stringify(this.paramObj))
            this.popadParam = this.paramObj.row ;
            this.popadParam.showType = this.popadParam.showType +"" ;

            if(this.popadParam.beginDay != ''){
                this.rangeDate[0] = new Date(this.popadParam.beginDay) ;
                this.rangeDate[1] = new Date(this.popadParam.endDay) ;
            }

            if(this.popadParam.showTimes != ''){
                // let showArray = [];
                // showArray = this.popadParam.showTimes.split(",") ;
                // this.rangeTime[0] = new Date(this.defaultDate+showArray[0].split("-")[0]) ;
                // this.rangeTime[1] = new Date(this.defaultDate+showArray[0].split("-")[1]) ;

                // this.adTimeRange.index = showArray.length-1 ;
                // console.log(showArray.length)
                // if(showArray.length >= 2){
                //   this.rangeTime1[0] = new Date(this.defaultDate+showArray[1].split("-")[0]) ;
                //   this.rangeTime1[1] = new Date(this.defaultDate+showArray[1].split("-")[1]) ;
                // }
                // if(showArray.length == 3){
                //   this.rangeTime2[0] = new Date(this.defaultDate+showArray[2].split("-")[0]) ;
                //   this.rangeTime2[1] = new Date(this.defaultDate+showArray[2].split("-")[1]) ;
                // }
                let showArray = [];
                showArray = this.popadParam.showTimes.split(",") ;
                this.rangeTimeStart = showArray[0].split("-")[0].substring(0,5) ;
                this.rangeTimeEnd = showArray[0].split("-")[1].substring(0,5) ;
                this.adTimeRange.index = showArray.length-1
                if(showArray.length >= 2){
                  this.rangeTimeStart1 = showArray[1].split("-")[0].substring(0,5) ;
                  this.rangeTimeEnd1 = showArray[1].split("-")[1].substring(0,5) ;
                }
                if(showArray.length == 3){
                  this.rangeTimeStart2 = showArray[2].split("-")[0].substring(0,5) ;
                  this.rangeTimeEnd2 = showArray[2].split("-")[1].substring(0,5) ;
                }

            }
            this.pictureUrl = this.cloudShowUrl+this.popadParam.adPic ;
          }else{
                this.rangeTime[0] = new Date(this.defaultDate+"08:00:00") ;
                this.rangeTime[1] = new Date(this.defaultDate+"20:00:00") ;
          }
        },

        handleSubmit(ev) {
           this.$refs.ruleForm.validate((valid) => {
              if (valid) {
                  if(!this.rangeDate || this.rangeDate.length <= 0){
                    this.$message({message: '请选择日期范围', type: 'warning'});
                    return ;
                  }

                  if(!this.rangeTimeStart || this.rangeTimeStart == ""){
                    this.$message({message: '请选择时间范围[1]的开始时间', type: 'warning'});
                    return ;
                  }
                  if(!this.rangeTimeEnd || this.rangeTimeEnd == ""){
                    this.$message({message: '请选择时间范围[1]的结束时间', type: 'warning'});
                    return ;
                  }
                  //console.log(this.compareTime(this.rangeTimeStart+":00",this.rangeTimeEnd+":00"))
                  if(this.compareTime(this.rangeTimeStart+":00",this.rangeTimeEnd+":00") >= 0){
                    this.$message({message: '时间范围[1]的结束时间必须大于时间范围[1]的开始时间', type: 'warning'});
                    return ;
                  }

                  if(this.adTimeRange.index  >= 1){
                    if(!this.rangeTimeStart1 || this.rangeTimeStart1 == ""){
                      this.$message({message: '请选择时间范围[2]的开始时间', type: 'warning'});
                      return ;
                    }
                    if(!this.rangeTimeEnd1 || this.rangeTimeEnd1 == ""){
                      this.$message({message: '请选择时间范围[2]的结束时间', type: 'warning'});
                      return ;
                    }
                    if(this.compareTime(this.rangeTimeStart1+":00",this.rangeTimeEnd1+":00") >= 0){
                      this.$message({message: '时间范围[2]的结束时间必须大于时间范围[2]的开始时间', type: 'warning'});
                      return ;
                    }
                    if(this.compareTime(this.rangeTimeEnd+":00",this.rangeTimeStart1+":00") >= 0){
                      this.$message({message: '时间范围[2]的开始时间必须大于时间范围[1]的结束时间', type: 'warning'});
                      return ;
                    }
                  }
                  if(this.adTimeRange.index == 2){
                    if(!this.rangeTimeStart2 || this.rangeTimeStart2 == ""){
                      this.$message({message: '请选择时间范围[3]的开始时间', type: 'warning'});
                      return ;
                    }
                    if(!this.rangeTimeEnd2 || this.rangeTimeEnd2 == ""){
                      this.$message({message: '请选择时间范围[3]的结束时间', type: 'warning'});
                      return ;
                    }
                    if(this.compareTime(this.rangeTimeStart2+":00",this.rangeTimeEnd2+":00") >= 0){
                      this.$message({message: '时间范围[3]的结束时间必须大于时间范围[3]的开始时间', type: 'warning'});
                      return ;
                    }
                    if(this.compareTime(this.rangeTimeEnd1+":00",this.rangeTimeStart2+":00") >= 0){
                      this.$message({message: '时间范围[3]的开始时间必须大于时间范围[2]的结束时间', type: 'warning'});
                      return ;
                    }
                  }

                  // if(!this.rangeTime || this.rangeTime.length <= 0){
                  //   this.$message({message: '请选择时间范围[1]', type: 'warning'});
                  //   return ;
                  // }
                  // if(this.adTimeRange.index  >= 1){
                  //   if(!this.rangeTime1 || this.rangeTime1.length <= 0){
                  //     this.$message({message: '请选择时间范围[2]', type: 'warning'});
                  //     return ;
                  //   }
                  //   if(moment(this.rangeTime[1]).isAfter(this.rangeTime1[0])){
                  //     this.$message({message: '时间范围[2]的开始时间必须大于时间范围[1]的结束时间', type: 'warning'});
                  //     return ;
                  //   }
                  // }
                  // if(this.adTimeRange.index == 2){
                  //   if(!this.rangeTime2 || this.rangeTime2.length <= 0){
                  //     this.$message({message: '请选择时间范围[3]', type: 'warning'});
                  //     return ;
                  //   }
                  //   if(moment(this.rangeTime1[1]).isAfter(this.rangeTime2[0])){
                  //     this.$message({message: '时间范围[3]的开始时间必须大于时间范围[2]的结束时间', type: 'warning'});
                  //     return ;
                  //   }
                  // }


                  if(!this.popadParam.adPic || this.popadParam.adPic == ''){
                    this.$message({message: '请选择弹出图片', type: 'warning'});
                    return ;
                  }
                  if(!this.popadParam.linkJson || this.popadParam.linkJson == ''){
                    this.$message({message: '请选择链接内容', type: 'warning'});
                    return ;
                  }


                  let tempDtmStart = '' ;
                  let tempDtmEnd = '' ;
                  if(this.rangeDate[0] && this.rangeDate[1]){
                     tempDtmStart = _dateFormat(new Date(this.rangeDate[0]),"yyyy-MM-dd") ;
                     tempDtmEnd = _dateFormat(new Date(this.rangeDate[1]),"yyyy-MM-dd") ;
                  }

                  this.popadParam.beginDay = tempDtmStart ;
                  this.popadParam.endDay = tempDtmEnd ;

                  // let tempStartTime0 = _dateFormat(new Date(this.rangeTime[0]),"HH:mm:ss") ;
                  // let tempEndTime0 = _dateFormat(new Date(this.rangeTime[1]),"HH:mm:ss") ;
                  // this.popadParam.showTimes = tempStartTime0+"-"+tempEndTime0
                  // if(this.adTimeRange.index >= 1){
                  //   let tempStartTime1 = _dateFormat(new Date(this.rangeTime1[0]),"HH:mm:ss") ;
                  //   let tempEndTime1 = _dateFormat(new Date(this.rangeTime1[1]),"HH:mm:ss") ;
                  //   this.popadParam.showTimes +=","+tempStartTime1+"-"+tempEndTime1 ;
                  // }
                  // if(this.adTimeRange.index == 2){
                  //   let tempStartTime2 = _dateFormat(new Date(this.rangeTime2[0]),"HH:mm:ss") ;
                  //   let tempEndTime2 = _dateFormat(new Date(this.rangeTime2[1]),"HH:mm:ss") ;
                  //   this.popadParam.showTimes +=","+tempStartTime2+"-"+tempEndTime2 ;
                  // }
                  this.popadParam.showTimes = this.rangeTimeStart+":00"+"-"+this.rangeTimeEnd+":00"
                  if(this.adTimeRange.index >= 1){
                    this.popadParam.showTimes +=","+this.rangeTimeStart1+":00"+"-"+this.rangeTimeEnd1+":00" ;
                  }
                  if(this.adTimeRange.index == 2){
                    this.popadParam.showTimes +=","+this.rangeTimeStart2+":00"+"-"+this.rangeTimeEnd2+":00" ;
                  }
                  //console.log(JSON.stringify(this.popadParam)); return ;
                  _addOrUpdatePopAd(this.popadParam).then((data) => {
                      const {success, msg} = data;
                      if(success) {
                        this.$message({message: '操作成功', type: 'success'});
                        // 保存成功之后返回
                        this.$emit("reback", "popAdList", this.paramObj);
                      } else {
                          this.$message.error('错了哦，'+msg);
                          console.log(msg)
                      }
                    });
              }else{
                console.log("校验失败") ;
              }
           })
        },

        compareTime(timer1,timer2){
          if(timer1.split(":")[0] > timer2.split(":")[0]){
             return 1;
          }else if(timer1.split(":")[0] == timer2.split(":")[0]){
            if(timer1.split(":")[1] > timer2.split(":")[1]){
              return 1;
            }else if(timer1.split(":")[1] == timer2.split(":")[1]){
              return 0 ;
            }else{
              return -1 ;
            }
          }else{
            return -1;
          }
        },
        //增加时间
        addOneRangeTime(){
	        if(this.adTimeRange.index == 2) return ;
          this.adTimeRange.index++
          let index = this.adTimeRange.index
          if(index == 1){
            let startTime = _dateFormat(new Date(this.rangeTime[1]),"HH:mm:ss")
            if(startTime != '23:59:59'){

            }else{
              this.adTimeRange.plusIconDisabled = true ;
            }
          }
          if(index == 2){
            let startTime2 = _dateFormat(new Date(this.rangeTime1[1]),"HH:mm:ss")
            if(startTime2 != '23:59:59'){

            }else{
              this.adTimeRange.plusIconDisabled = true ;
            }
          }

          this.adTimeRange.show = -1 ;

          if (this.adTimeRange.index == 1) {
            this.adTimeRange.locked0 = true
          }

          if (this.adTimeRange.index == 2) {
            this.adTimeRange.locked1 = true
          }

          if (this.adTimeRange.index > 2) {
            this.adTimeRange.index = 2
          }
        },
        //删除时间
        deleteOneAdTime(){
          if (this.adTimeRange.index == 0 ) return
          let index = this.adTimeRange.index
          if (this.adTimeRange.index == 2) {
            this.adTimeRange.locked1 = false
          }
          if (this.adTimeRange.index == 1) {
            this.adTimeRange.locked0 = false
          }
          this.adTimeRange.plusIconDisabled = false
          this.adTimeRange.index--
        },

        onOpenDataDailog(){
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
          if(data.goodsSkuId){
            linkObj.goodsSkuId = data.goodsSkuId ;
          }
          this.popadParam.linkJson = JSON.stringify(linkObj) ;
          this.popadParam.linkType = data.name;
          //console.log(JSON.stringify(data))
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
                this.popadParam.adPic = shopFiles[0].fileMd5 ;
                this.pictureUrl = this.cloudShowUrl+this.popadParam.adPic ;
                //console.log(shopFiles[0].fileMd5 ;)
            }
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
