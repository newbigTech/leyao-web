<template>
    <div class="_container">
        <card-panel>
            <span slot="title">{{paramObj.view?'查看自提点详情':francoRenduObj.selfPurchaseId?'编辑自提点':'新增自提点'}}</span>
            <div slot="panel-btns">
                <el-button size="small" type="success" @click.native.prevent="$emit('forward','RenduList')">返回列表</el-button>
            </div>
            <div slot="panel-body">
                <el-row>
                  <el-col :span="12">
                      <div>
                          <el-form :model="francoRenduObj" :rules="rules" ref="francoRenduObj" label-width="150px">
                            <el-form-item label="自提点名称" prop="selfSiteName">
                                <el-input v-model="francoRenduObj.selfSiteName" :maxlength="50" style="width:450px" placeholder="自提点名称" :disabled="paramObj.view"></el-input>
                            </el-form-item>
                            <el-form-item label="销售日">
                                <el-checkbox-group v-model="francoRenduObj.saleDate" placeholder="每周销售日">
                                    <el-checkbox :label="0" :disabled="paramObj.view">周一</el-checkbox>
                                    <el-checkbox :label="1" :disabled="paramObj.view">周二</el-checkbox>
                                    <el-checkbox :label="2" :disabled="paramObj.view">周三</el-checkbox>
                                    <el-checkbox :label="3" :disabled="paramObj.view">周四</el-checkbox>
                                    <el-checkbox :label="4" :disabled="paramObj.view">周五</el-checkbox>
                                    <el-checkbox :label="5" :disabled="paramObj.view">周六</el-checkbox>
                                    <el-checkbox :label="6" :disabled="paramObj.view">周日</el-checkbox>
                                </el-checkbox-group>
                            </el-form-item>
                            <el-form-item label="所属区域" prop="area">
                                <el-row type="flex" justify="space-between" style="width:450px">
                                  <el-col :span="7">
                                    <el-select v-model="francoRenduObj.province" clearable v-on:change="loadCity()" placeholder="省"  :disabled="paramObj.view">
                                      <el-option
                                        v-for="item in provinceList"
                                        :label="item.strProvince"
                                        :value="item.province">
                                      </el-option>
                                    </el-select>
                                  </el-col>
                                  <el-col class="line" :span="1">-</el-col>
                                  <el-col :span="7">
                                    <el-select v-model="francoRenduObj.city" clearable v-on:change="loadArea()" placeholder="市" :disabled="paramObj.view">
                                      <el-option
                                        v-for="item in cityList"
                                        :label="item.strCity"
                                        :value="item.city">
                                      </el-option>
                                  </el-select>
                                  </el-col>
                                  <el-col class="line" :span="1">-</el-col>
                                  <el-col :span="7">
                                    <el-select v-model="francoRenduObj.area" clearable placeholder="区" :disabled="paramObj.view">
                                      <el-option
                                        v-for="item in areaList"
                                        :label="item.strArea"
                                        :value="item.area">
                                      </el-option>
                                    </el-select>
                                  </el-col>
                                </el-row>
                            </el-form-item>

                            <el-form-item label="详细地址" prop="selfAddress">
                                <input type="text" id="francoRenduAddress" v-model="francoRenduObj.selfAddress" size="20" style="width:450px;" class="el-input__inner" placeholder="详细地址"  :disabled="paramObj.view" :maxlength="50"/>
                                <span v-show="francoRenduObj.longitude">经纬度： {{francoRenduObj.longitude}} / {{francoRenduObj.latitude}}</span>
                            </el-form-item>
                            <el-form-item label="自提点备注">
                                <el-input type="textarea" :rows="3" v-model="francoRenduObj.selfSiteNote" :maxlength="250" style="width:450px" placeholder="自提点备注"  :disabled="paramObj.view"></el-input>
                            </el-form-item>
                            <el-form-item label="日订单截止时间" prop="orderDeadline">
                                <el-time-select v-model="francoRenduObj.orderDeadline" :picker-options="{step:'00:15'}" placeholder="选择时间" style="width:200px"  :disabled="paramObj.view">
                                </el-time-select>
                            </el-form-item>
                            <el-form-item label="提货日期">
                                <el-select v-model.number="francoRenduObj.deliveryDay" placeholder="提货日期" style="width: 200px;"  :disabled="paramObj.view" @change="deliveryDayOnchange">
                                    <el-option label="当天" :value="0"></el-option>
                                    <el-option label="次日" :value="1"></el-option>
                                    <el-option label="隔日" :value="2"></el-option>
                            </el-select>
                            </el-form-item>
                            <el-form-item label="提货时间"  style="width:600px" required>
                                <el-col :span="11">
                                  <el-form-item prop="startTime">
                                    <el-time-select placeholder="起始时间" v-model="francoRenduObj.startTime"
                                        :picker-options="pickerOptions" style="width:200px" :disabled="paramObj.view">
                                    </el-time-select>
                                  </el-form-item>
                                </el-col>
                                <el-col class="line" :span="2">&nbsp;</el-col>
                                <el-col :span="11">
                                  <el-form-item prop="endTime">
                                    <el-time-select placeholder="结束时间" v-model="francoRenduObj.endTime"
                                        :picker-options="{
                                          start: '08:00',
                                          step: '00:15',
                                          end: '24:00',
                                          minTime: francoRenduObj.startTime
                                        }" style="width:200px" :disabled="paramObj.view">
                                      </el-time-select>
                                  </el-form-item>
                                </el-col>
                            </el-form-item>
                            <!-- <el-form-item label="提货时间">
                                <el-time-picker is-range v-model="francoRenduObj.deliveryTime" placeholder="选择时间范围" style="width:200px"  :disabled="paramObj.view"></el-time-picker>
                            </el-form-item> -->
                            <el-form-item label="联系方式" prop="selfPhone">
                                <el-input v-model="francoRenduObj.selfPhone" :maxlength="20" style="width:200px"  placeholder="联系方式"  :disabled="paramObj.view"></el-input>
                            </el-form-item>
                            <el-form-item label="群主编号">
                                <el-input v-model="francoRenduObj.selfGroupOwner" :maxlength="50" style="width:200px"  placeholder="微信号"  :disabled="paramObj.view"></el-input>
                            </el-form-item>
                            <el-form-item label="经营范围" class="line">
                                <el-row type="flex" justify="space-between" style="width:450px">
                                  <el-col :span="7">
                                    <el-input-number v-model="francoRenduObj.selfScope" :min="500" :max="5000" style="width:200px" :step="500" placeholder="经营范围"  :disabled="paramObj.view"></el-input-number>
                                  </el-col>
                                  <el-col :span="7">
                                    (单位：米)
                                  </el-col>
                                </el-row>  
                            </el-form-item>
                            <el-form-item label="虚拟用户数" class="line">
                                <el-row type="flex" justify="space-between" style="width:450px">
                                  <el-col :span="7">
                                    <el-input-number v-model="francoRenduObj.virtualSelfUserNumber" :min="0" :max="99999" style="width:200px" :step="100" placeholder="虚拟用户数"  :disabled="paramObj.view"></el-input-number>
                                  </el-col>
                                  <el-col :span="7">
                                    <el-button type="primary" size="mini" @click.native.prevent="onGenerator('virtualSelfUserNumber')" v-show="!paramObj.view">生成随机数</el-button>
                                  </el-col>
                                </el-row>  
                            </el-form-item>
                            <el-form-item label="虚拟订单数" class="line">
                                <el-row type="flex" justify="space-between" style="width:450px">
                                  <el-col :span="7">
                                    <el-input-number v-model="francoRenduObj.virtualSelfOrderNumber" :min="0" :max="10000" style="width:200px" :step="100" placeholder="虚拟订单数"  :disabled="paramObj.view"></el-input-number>
                                  </el-col>
                                  <el-col :span="7">
                                    <el-button type="primary" size="mini" @click.native.prevent="onGenerator('virtualSelfOrderNumber')" v-show="!paramObj.view">生成随机数</el-button>
                                  </el-col>
                                </el-row>   
                            </el-form-item>
                            <el-form-item label="虚拟点赞数" class="line">
                                <el-row type="flex" justify="space-between" style="width:450px">
                                  <el-col :span="7">
                                    <el-input-number v-model="francoRenduObj.virtualGoodNumber" :min="0" :max="99999" style="width:200px" :step="100" placeholder="虚拟点赞数"  :disabled="paramObj.view"></el-input-number>
                                  </el-col>
                                  <el-col :span="7">
                                    <el-button type="primary" size="mini" @click.native.prevent="onGenerator('virtualGoodNumber')" v-show="!paramObj.view">生成随机数</el-button>
                                  </el-col>
                                </el-row>  
                            </el-form-item>
                            <el-form-item label="虚拟差评数" class="line">
                                <el-row type="flex" justify="space-between" style="width:450px">
                                  <el-col :span="7">
                                    <el-input-number v-model="francoRenduObj.virtualBadNumber" :min="0" :max="10000" style="width:200px" :step="100" placeholder="虚拟差评数"  :disabled="paramObj.view"></el-input-number>
                                  </el-col>
                                  <el-col :span="7">
                                    <el-button type="primary" size="mini" @click.native.prevent="onGenerator('virtualBadNumber')" v-show="!paramObj.view">生成随机数</el-button>
                                  </el-col>
                                </el-row>   
                            </el-form-item>
                            <el-form-item label="商品展示样式">
                                <el-select v-model.number="francoRenduObj.goodsShowType" placeholder="商品展示样式" style="width: 200px;"  :disabled="paramObj.view">
                                    <el-option label="列表" :value="0"></el-option>
                                    <el-option label="二列" :value="1"></el-option>
                                    <!-- <el-option label="三列" :value="2"></el-option> -->
                                </el-select>
                            </el-form-item>
                            <el-form-item label="是否热门">
                                <el-select v-model.number="francoRenduObj.isHot" placeholder="是否热门" style="width: 200px;"  :disabled="paramObj.view">
                                    <el-option label="否" :value="0"></el-option>
                                    <el-option label="是" :value="1"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="图片上传" class="line">
                                <el-row type="flex" justify="space-between" style="width:450px">
                                  <el-col :span="7">
                                    <div class="_classify-uploader">
                                        <div class="_upload-select" @click="openShopFileDialog(0)">
                                            <div class="_upload-select-box" style="width:150px;height: 150px;">
                                                <div class="_upload-select-icon"><i class="el-icon-upload"></i></div>
                                                <div class="_upload-select-text">点击上传</div>
                                                <div class="_upload-select-preview" v-show="francoRenduObj.selfGroupQuickMark && (francoRenduObj.selfGroupQuickMark.length > 1)">
                                                <div @click.stop.prevent="francoRenduObj.selfGroupQuickMark=''" style="position: absolute;right: 0;top:-10px;z-index:99"  v-show="!paramObj.view"><i class="el-icon-circle-close"></i></div>
                                                    <img :src="francoRenduObj.selfGroupQuickMark ? ((cloudShowUrl + francoRenduObj.selfGroupQuickMark)) : ''">
                                                    <div class="_upload-select-cover" v-show="!paramObj.view"> <span>点击更换图片</span> </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    群二维码
                                  </el-col>
                                  <el-col :span="7">
                                    <div class="_classify-uploader">
                                        <div class="_upload-select" @click="openShopFileDialog(1)">
                                            <div class="_upload-select-box" style="width:150px;height: 150px;">
                                                <div class="_upload-select-icon"><i class="el-icon-upload"></i></div>
                                                <div class="_upload-select-text">点击上传</div>
                                                <div class="_upload-select-preview" v-show="francoRenduObj.selfGroupOwnerQuickMark && (francoRenduObj.selfGroupOwnerQuickMark.length > 1)">
                                                <div @click.stop.prevent="francoRenduObj.selfGroupOwnerQuickMark=''" style="position: absolute;right: 0;top:-10px;z-index:99" v-show="!paramObj.view"><i class="el-icon-circle-close"></i></div>
                                                    <img :src="francoRenduObj.selfGroupOwnerQuickMark ? ((cloudShowUrl + francoRenduObj.selfGroupOwnerQuickMark)) : ''">
                                                    <div class="_upload-select-cover" v-show="!paramObj.view"> <span>点击更换图片</span> </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    群主二维码
                                  </el-col>
                                  <el-col :span="7">
                                    <div class="_classify-uploader">
                                        <div class="_upload-select" @click="openShopFileDialog(2)">
                                            <div class="_upload-select-box" style="width:150px;height: 150px;">
                                                <div class="_upload-select-icon"><i class="el-icon-upload"></i></div>
                                                <div class="_upload-select-text">点击上传</div>
                                                <div class="_upload-select-preview" v-show="francoRenduObj.selfSitePic && (francoRenduObj.selfSitePic.length > 1)">
                                                <div @click.stop.prevent="francoRenduObj.selfSitePic=''" style="position: absolute;right: 0;top:-10px;z-index:99" v-show="!paramObj.view"><i class="el-icon-circle-close"></i></div>
                                                    <img :src="francoRenduObj.selfSitePic ? ((cloudShowUrl + francoRenduObj.selfSitePic)) : ''">
                                                    <div class="_upload-select-cover" v-show="!paramObj.view"> <span>点击更换图片</span> </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    自提点图片
                                  </el-col>
                                </el-row>  
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click.stop.prevent="onSave" v-show="!paramObj.view">保存</el-button>
                                <el-button @click.native.prevent="$emit('forward','RenduList')">返回列表</el-button>
                            </el-form-item>
                        </el-form>
                      </div>
                  </el-col>
                  <el-col :span="12">
                      <div>
                        <div class="page-header" style="margin:0;margin-top: 10px;">
                            <h1 style="font-weight: bold;">地图位置</h1>
                        </div>
                        <div id="l-map" style="height:900px;width:100%;"></div>
                      </div>
                  </el-col>
                </el-row>
            </div>
        </card-panel>
        <!--商品图库Dialog-->
        <el-dialog title="商品图库" v-model="shopFileDialog" class="shop-img-file-dialog">
            <shop-file @onSuccess="getShopFile" :vm="tab5vm"></shop-file>
        </el-dialog>
    </div>
</template>
<script>
let _francoBaiduMap
import RegExp from 'lib/utils/regexp'
import {querySupplierAreaVoList,saveMallSelfPurchase} from 'actions/francoRenduAction'
import ShopFile from 'pages/main/mall/common/components/shop_file'
import { dateFormat as _dateFormat } from "lib/utils/dateFormat"
export default {
    name: 'franco_rendu_form',
    components: {
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
        },
        convertDateFromString(dateStr){
            if (dateString) { 
                var arr1 = dateString.split(" "); 
                var sdate = arr1[0].split('-'); 
                var date = new Date(sdate[0], sdate[1]-1, sdate[2]); 
                return date;
             }
        }
    },
    data() {
        return {
            pickerOptions:{
                start: '08:00',
                step: '00:15',
                end: '24:00',
                minTime: '07:00'
            },
            areaSourceData:[],
            provinceList:[],
            cityList:[],
            areaList:[],
            francoRenduObj: {
                isHot:0,
                selfSiteName:'',
                selfSitePic:'',
                selfSiteNote:'',
                province:'',
                city:'',
                area:'',
                strProvince:'',
                strCity:'',
                strArea:'',
                selfAddress:'',
                baiduAreaCode:'',
                longitude:'',
                latitude:'',
                selfScope:1000,
                virtualSelfUserNumber:0,
                virtualSelfOrderNumber:0,
                selfPhone:'',
                saleDate:[],
                orderDeadline:undefined,
                deliveryDay:0,
                deliveryTime:[],
                selfGroupOwner:'',
                goodsShowType:0,
                selfGroupQuickMark:'',
                selfGroupOwnerQuickMark:'',
                startTime: '',
                endTime: '',
                virtualBadNumber:0,
                virtualGoodNumber:0
            },
            shopFileDialog: false,
            shopFileIndex: 0,
            tab5vm: new this.$root.constructor(),
            rules:{
                selfSiteName: [{
                    required: true,
                    message: '请输入自提点名称',
                    trigger: 'blur'
                }],
                saleDate: [{
                    type: 'array',
                    required: true,
                    message: '请至少选择一项',
                    trigger: 'change'
                }],
                area: [{
                    required: true,
                    message: '请选择所属区域',
                    trigger: 'change'
                }],
                selfAddress: [{
                    required: true,
                    message: '请输入详细地址',
                    trigger: 'blur'
                }],
                orderDeadline: [{
                    required: true,
                    pattern: /^([\d]{2}):([\d]{2})$/,
                    message: '请设置提货时间',
                    trigger: 'change'
                }],
                selfPhone: [{
                    required: true,
                    message: '请输入联系方式',
                    trigger: 'blur'
                }],
                startTime: [{
                    required: true,
                    message: '请选择开始时间',
                    trigger: 'change'
                }],
                endTime: [{
                    required: true,
                    message: '请选择结束时间',
                    trigger: 'change'
                }]
            }
        }
    },
    methods: {
        deliveryDayOnchange(v){},
        openShopFileDialog(i) {
            if(this.paramObj.view)
                return false
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
                if (this.shopFileIndex === 0)
                    this.francoRenduObj.selfGroupQuickMark = shopFiles[0].fileMd5
                else if(this.shopFileIndex === 1)
                    this.francoRenduObj.selfGroupOwnerQuickMark = shopFiles[0].fileMd5
                else
                    this.francoRenduObj.selfSitePic = shopFiles[0].fileMd5
            }

        },
        onGenerator(attrName){
            this.francoRenduObj[attrName]=_.random(1, 10000)
        },
        loadCity(){
            this.cityList = [];
            this.areaList = [];
            this.francoRenduObj.city = '';
            this.francoRenduObj.area = '';
            //清空变量
            if(typeof this.francoRenduObj.province =='undefined' || this.francoRenduObj.province==''){
                return;
            }
            setTimeout(()=>{
              this.cityList=_.unionBy(_.filter(this.areaSourceData, { 'province': this.francoRenduObj.province }),'city')
            });
        },
        loadArea(){
            this.areaList = [];
            this.francoRenduObj.area = '';
            //清空变量
            if(typeof this.francoRenduObj.city =='undefined' || this.francoRenduObj.city==''){
                return;
            }
            setTimeout(()=>{
              this.areaList=_.unionBy(_.filter(this.areaSourceData, { 'city': this.francoRenduObj.city }),'area')
               if(this.areaList.length>0){
                     // 初始化地图,设置城市和地图级别。
                    _francoBaiduMap.centerAndZoom(this.areaList[0]['strCity'],12)
                    this.francoRenduObj.baiduAreaCode=this.areaList[0]['baiduAreaCode']
               }
            });
        },
        onSave() {
             //console.log('francoRenduObj',JSON.stringify(this.francoRenduObj))
             this.$refs.francoRenduObj.validate(valid => {
                if (valid) {
                    if(this.francoRenduObj.deliveryDay==0){
                        if(_.toNumber(_.replace(this.francoRenduObj.startTime,':',''))<=_.toNumber(_.replace(this.francoRenduObj.orderDeadline,':',''))){
                            this.$message.warning('提货开始时间需大于订单截止时间')
                            return false
                        }
                    }
                    if(_.toNumber(_.replace(this.francoRenduObj.endTime,':',''))<=_.toNumber(_.replace(this.francoRenduObj.startTime,':',''))){
                            this.$message.warning('提货结束时间需大于提货开始时间')
                            return false
                    }
                   let params={}
                   Object.assign(params,this.francoRenduObj)
                   let areaObj=_.find(this.areaSourceData,{'area':this.francoRenduObj.area})
                   if(areaObj){
                        params.strProvince=areaObj.strProvince
                        params.strCity=areaObj.strCity
                        params.strArea=areaObj.strArea
                   }
                     let aType=[0,0,0,0,0,0,0]
                     _.forEach(this.francoRenduObj.saleDate,(v)=>{
                        aType[_.toInteger(v)] = 1
                     })
                     params.saleDate=aType.join('')
                     params.deliveryTime=this.francoRenduObj.startTime+'-'+this.francoRenduObj.endTime
                     //if(this.francoRenduObj.deliveryTime.length>0){
                        //params.deliveryTime=_.map(this.francoRenduObj.deliveryTime,(item)=>_dateFormat(new Date(item), 'HH:mm:ss')).join('-')
                     //}
                     //console.log('params',JSON.stringify(params))
                     this.$confirm('确认提交保存吗？',"确认提示",{
                          type:'warning'
                        }).then(()=>{
                            saveMallSelfPurchase(params).then(data=>{
                              const { success, msg, result } = data
                              if (success) {
                                  this.$message.success('操作成功')
                                  this.$emit('forward', 'RenduList')
                              } else {
                                  this.$message.error(msg)
                                  return false
                              }
                            })
                        }).catch(()=>{})
                     
                }
            })
        },
        initSupplierAreaData(){
            querySupplierAreaVoList().then(data=>{
                if(data.length>0){
                    this.areaSourceData=JSON.parse(JSON.stringify(data))
                    this.provinceList=_.unionBy(data,'province')
                }
            })
        },
        onSearchComplete(point){
            let pp = point
            _francoBaiduMap.centerAndZoom(pp, 18)
            // 创建标注
            let _marker = new BMap.Marker(pp)
            let _position=_marker.getPosition()
            this.francoRenduObj.longitude=_position.lng
            this.francoRenduObj.latitude=_position.lat
            let vueThis=this
            //添加标注
            _francoBaiduMap.addOverlay(_marker)
            if(this.paramObj.view)
              _marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
            if(!this.paramObj.view)
              _marker.enableDragging()
            _marker.addEventListener('dragend',(e)=>{
                vueThis.francoRenduObj.longitude=e.point.lng
                vueThis.francoRenduObj.latitude=e.point.lat
                var geoc = new BMap.Geocoder()
                geoc.getLocation(e.point, function(rs){
                var addComp = rs.addressComponents
                if(addComp.street.length==0){
                    vueThis.$message.success('未能获取到地点信息')
                }else{
                    //$('#francoRenduAddress').val(addComp.street + addComp.streetNumber)
                    vueThis.francoRenduObj.selfAddress=addComp.street + addComp.streetNumber
                }
                //$('#francoRenduAddress').val(rs.address)
                //console.log('result',rs)
                // alert(addComp.province + ", " + addComp.city + ", " + addComp.district + ", " + addComp.street + ", " + addComp.streetNumber);
                })
            })
        },
        initBaiduMap(){
            _francoBaiduMap = new BMap.Map("l-map");
            if(this.francoRenduObj.longitude.length>0&&this.francoRenduObj.latitude.length>0){
                _francoBaiduMap.centerAndZoom(new BMap.Point(this.francoRenduObj.longitude,this.francoRenduObj.latitude),12)
            }else{
               var myCity = new BMap.LocalCity()
                myCity.get((result)=>{
                    // 初始化地图,设置城市和地图级别。
                    _francoBaiduMap.centerAndZoom(result.name,12)
                }) 
            }

            // 允许缩放
            _francoBaiduMap.enableScrollWheelZoom(true)
            //建立一个自动完成的对象
            let ac = new BMap.Autocomplete({
                "input" : "francoRenduAddress",
                "location" : _francoBaiduMap
             });
            let vueThis=this
            //鼠标点击下拉列表后的事件
            ac.addEventListener("onconfirm", function(e) {
                let _value = e.item.value
                let myValue = _value.province +  _value.city +  _value.district +  _value.street +  _value.business
                //清除地图上所有覆盖物
                _francoBaiduMap.clearOverlays()
                //智能搜索
                let local = new BMap.LocalSearch(_francoBaiduMap, {
                  onSearchComplete(){
                    //获取第一个智能搜索的结果
                    if(!local.getResults().getPoi(0))
                        return false
                    vueThis.onSearchComplete(local.getResults().getPoi(0).point)
                  }
                })
                local.search(myValue)
                setTimeout(()=>{
                   if(_value.business.length==0){
                        vueThis.francoRenduObj.selfAddress=''
                        $('#francoRenduAddress').val('')
                    }else{
                        vueThis.francoRenduObj.selfAddress=_value.street + _value.business
                        $('#francoRenduAddress').val(_value.street + _value.business)
                    } 
                },0)
            })
        }
    },
    created() {
      this.initSupplierAreaData()
      if(this.paramObj.selfPurchaseId){
        _.forEach(_.split(this.paramObj.saleDate,''),(v,i)=>{
          if(_.toInteger(v)==1){
            this.francoRenduObj.saleDate.push(i)
          }
        })
        if(this.paramObj.deliveryTime&&this.paramObj.deliveryTime.length>0){
            let _detime=this.paramObj.deliveryTime.split('-')
            this.francoRenduObj.startTime=_detime[0]
            this.francoRenduObj.endTime=_detime[1]
            //this.francoRenduObj.deliveryTime = [new Date('2017-06-10 '+_detime[0]), new Date('2017-06-10 '+_detime[1])]
        }
        Object.assign(this.francoRenduObj, _.pick(this.paramObj,['selfPurchaseId','isHot','selfSiteName','selfSitePic','selfSiteNote','province','area','strProvince','strCity','strArea','baiduAreaCode','longitude','latitude','selfScope','virtualSelfUserNumber','virtualSelfOrderNumber','selfPhone','orderDeadline','selfGroupOwner','goodsShowType','selfGroupQuickMark','selfGroupOwnerQuickMark','deliveryTime','deliveryDay','virtualBadNumber','virtualGoodNumber']))
        this.loadCity()
        this.francoRenduObj.city=this.paramObj.city
        this.loadArea()
        this.francoRenduObj.area=this.paramObj.area
      }
    },
    mounted(){
      this.initBaiduMap()
      if(this.francoRenduObj.selfPurchaseId){
        this.onSearchComplete(new BMap.Point(this.francoRenduObj.longitude,this.francoRenduObj.latitude))
        setTimeout(()=>{
          this.francoRenduObj.selfAddress=this.paramObj.selfAddress
        },0)
      }
    }
}
</script>
