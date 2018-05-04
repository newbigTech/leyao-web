<template>
    <div class="_container">
      <card-panel class="">
        <h3 slot="title">卖家处理退款申请</h3>
        <div slot="panel-btns">
          <el-button size="small" type="success" @click.native.prevent="$emit('reback','backOrderList',paramObj)">返回</el-button>
        </div>
        <div slot="panel-body" class="flex">
          <card-panel style="margin-right: 15px; min-width:520px; width: 42%;" class="_small">
            <h3 slot="title">退订单商品信息</h3>
            <div slot="panel-body">
              <div class="well">
                <el-row :gutter="20" style="margin-bottom: 15px;">
                  <el-col :span="8">
                    <span>退款买家:</span>
                    <el-tag type="primary">{{model.userAlias}}</el-tag>
                  </el-col>
                  <el-col :span="8">
                    <span>退款金额(元):</span>
                    <el-tag type="error">{{model.refundAmount}}</el-tag>
                  </el-col>
                  <el-col :span="8">
                    <span>退款类型:</span>
                    <el-tag type="gray">{{backTypeName}}</el-tag>
                  </el-col>
                </el-row>
                <el-row :gutter="20" style="margin-bottom: 15px;">
                  <el-col :span="8">
                    <span>退货方式:</span>
                    <el-tag type="gray" v-show="model.backType == 0">无</el-tag>
                    <el-tag type="gray" v-show="model.backType == 1">上门取件</el-tag>
                    <el-tag type="gray" v-show="model.backType == 2">用户自寄</el-tag>
                  </el-col>
                  <el-col :span="16">
                    <span>订单编号:</span>
                    <el-tag type="gray">{{model.orderNo || '无'}}</el-tag>
                  </el-col>
                </el-row>
                <el-row :gutter="20" style="margin-bottom: 15px;">
                  <el-col :span="24">
                    <span>{{backTypeName}}说明:</span>
                    <span>{{model.refundNote || "无"}}</span>
                  </el-col>
                </el-row>                
                <el-row :gutter="20" style="margin-bottom: 15px;">
                  <el-col :span="24">
                    <span>{{backTypeName}}原因:</span>
                    <span>{{model.reason || "无"}}</span>
                  </el-col>
                </el-row>
                <el-row :gutter="20" style="margin-bottom: 15px;" v-show="model.backType == 1">
                  <el-col :span="24">
                    <span>取件地址:</span>
                    <el-tag type="gray">{{ pickupAddress || "无"}}</el-tag>
                  </el-col>
                </el-row>
                <el-row :gutter="20" style="margin-bottom: 15px;">
                  <el-col :span="24">
                    <span>退货图片:</span>
                    <el-tag type="gray" v-show="!model.uploadPics">{{"无"}}</el-tag>
                    <ul v-show="model.uploadPics" class="_reback-images">
                      <li v-for="(item, index) in picUrls"><img :src="item" @click="openWindows(item)"></li>
                    </ul>
                  </el-col>
                </el-row>
              </div>
              <!-- 处理 -->
              <div>
                <!-- 待退款 待退货 -->
                <div v-if="model.needReturn != 0 && model.statusCode == 3">
                  <div v-show='(pickupStatus >= 0 && model.backType == 1)
                              || (expressStatus == 0 && model.backType == 2)'>
                    <el-alert title="您已同意买家退款申请，等待买家寄回商品或安排上门取件" type="info" show-icon :closable="false"></el-alert>
                    <el-button @click.native.prevent="markPickupSuccess" type="error" v-show="model.backType == 1" style="margin-top: 12px;">取件成功 </el-button>
                  </div>
                  <el-alert title="" v-show='model.backType == 2 && expressStatus == 1' type="info" show-icon :closable="false">
                    <div>用户已寄回商品,等待仓库收货质检 运单号: <el-tag type="gray">{{expressNo || '无'}}</el-tag></div>
                  </el-alert>
                </div>
                <div v-if="model.backOrderType == 3 && model.statusCode == 4">
                  <el-alert title="" v-show='model.backType == 1' type="info" show-icon :closable="false">
                    <div>已安排上门取件,等待仓库收货质检</el-tag></div>
                  </el-alert>
                </div>                

                <!-- 退款申请中 -->
                <div v-if="model.backOrderType == 2 && model.statusCode == 1">
                  <el-alert title="" type="warning" show-icon :closable="false">
                    <p>请您及时与买家协商本次退款，如您逾期未处理，本次退款将自动达成并退款给买家 <el-tag type="gray" v-if="timerHtml">{{ timerHtml }}</el-tag> </p>
                  </el-alert>
                  <el-button @click.native.prevent="passBackOrderApply" type="info">同意退款申请</el-button>
                  <el-button @click.native.prevent="rejectBackOrderApply" type="error">拒绝退款申请</el-button>
                    </el-form-item>
                  </el-form>
                </div>

                <!-- 退款退货申请中 -->
                <div v-if="model.backOrderType == 3 && model.statusCode == 1">
                  <el-alert title="" type="warning" show-icon :closable="false">
                    <p>请您及时与买家协商本次退款，如您逾期未处理，本次退款将自动达成并退款给买家 <el-tag type="gray" v-if="timerHtml">{{ timerHtml }}</el-tag> </p>
                  </el-alert>
                  <el-form ref="backOrderForm" :model="backorderItemModel" style="margin-top: 15px;">
                    <el-form-item>
                      <el-radio-group v-model="backorderItemModel.needReturn">
                        <el-radio :label="1">需退回商品</el-radio>
                        <el-radio :label="0">无需退回商品</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item>
                      <el-button @click.native.prevent="passBackOrderApply" type="info">同意退货申请</el-button>
                      <el-button @click.native.prevent="rejectBackOrderApply" type="error">拒绝退货申请</el-button>
                    </el-form-item>
                  </el-form>
                </div>
                <!-- 换货申请中 -->
                <div v-if="model.backOrderType == 4 && model.statusCode == 1">
                  <el-alert title="" type="warning" show-icon :closable="false">
                    <p>请您及时与买家协商本次退款，如您逾期未处理，本次退款将自动达成并退款给买家 <el-tag type="gray" v-if="timerHtml">{{ timerHtml }}</el-tag> </p>
                  </el-alert>
                  <el-form ref="backOrderForm" :model="backorderItemModel" style="margin-top: 15px;">
                    <el-form-item>
                      <el-radio-group v-model="backorderItemModel.needReturn">
                        <el-radio :label="1">需退回商品</el-radio>
                        <el-radio :label="0">无需退回商品</el-radio>
                        <!-- <el-radio :label="2">
                          生成换货订单后再退回商品
                          <el-tooltip content="配送换货商品和取回原商品同时进行" placement="top">
                            <i class="el-icon-information"></i>
                          </el-tooltip>
                        </el-radio> -->
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item>
                      <el-button @click.native.prevent="passBackOrderApply" type="info">同意换货申请</el-button>
                      <el-button @click.native.prevent="rejectBackOrderApply" type="error">拒绝换货申请</el-button>
                    </el-form-item>
                  </el-form>
                </div>

                <!-- 待退款  待确认 -->
                <div v-if="(model.backOrderType == 2 || model.backOrderType == 3) && model.statusCode == 2">
                  <el-alert title="" v-show='model.backType == 1 && pickupStatus == 0 && receiptStatus <= 0' type="info" show-icon :closable="false">
                    上门取件成功，等待仓库收货质检!
                  </el-alert>
                  <div v-show='receiptStatus > 0 && model.needReturn != 0'>
                    <el-alert title="" type="info" show-icon :closable="false">
                      仓库质检结束，请查看                       
                      <el-button type="success" size="mini" 
                            @click.native.prevent="handleReceiptReport">质检报告
                      </el-button>
                    </el-alert>    
                    <el-alert title="" type="info" show-icon :closable="false" style="margin-top: 5px;">
                      <p>请您及时与买家协商本次退款，如您逾期未处理，本次退款将自动达成并退款给买家 <el-tag type="gray" v-if="timerHtml">{{ timerHtml }}</el-tag> </p>
                    </el-alert>
                    <el-form ref="backReceiptForm" :model="backReceiptModel" :rules="repRules" style="margin-top: 12px;">
                      <el-form-item label="" prop="actualRefundAmount">
                        <el-input type="number" v-model="backReceiptModel.actualRefundAmount">
                          <template slot="prepend">请输入实际退款金额(元)</template>
                        </el-input>
                        <!-- 最大退款金额：80 元 -->
                        <!-- <el-input v-model="backReceiptModel.actualRefundAmount" type="number" style="width: 100px;" ></el-input> 元 -->
                      </el-form-item>
                      <el-form-item>
                          <el-button @click.native.prevent="passRefund" type="warning">
                          同意退款
                          </el-button>
                          <el-button @click.native.prevent="rejectRefund" type="error">
                          拒绝退款
                          </el-button>
                      </el-form-item>
                    </el-form>
                  </div>
                  <div v-show='model.needReturn == 0'>
                    <el-form ref="backReceiptForm" :model="backReceiptModel" :rules="repRules" style="margin-top: 12px;">
                      <el-alert title="" type="warning" show-icon :closable="false" style="margin-top: 5px;">
                        <p>请您及时与买家协商本次退款，如您逾期未处理，本次退款将自动达成并退款给买家 <el-tag type="gray" v-if="timerHtml">{{ timerHtml }}</el-tag> </p>
                      </el-alert>                                                             
                      <el-form-item label="" prop="actualRefundAmount">
                        <el-input type="number" v-model="backReceiptModel.actualRefundAmount" >
                          <template slot="prepend">请输入实际退款金额(元)</template>
                        </el-input>
                        <!-- 最大退款金额：80 元 -->
                        <!-- <el-input v-model="backReceiptModel.actualRefundAmount" type="number" style="width: 100px;" ></el-input> 元 -->
                      </el-form-item>
                      <el-form-item>
                          <el-button @click.native.prevent="passRefund" type="warning">
                          同意退款
                          </el-button>
                          <el-button @click.native.prevent="rejectRefund" type="error">
                          拒绝退款
                          </el-button>
                      </el-form-item>
                    </el-form>
                  </div>                  
                </div>

                <!-- 换货 -->
                <div v-if="model.backOrderType == 4 && model.statusCode == 4">
                  <div v-show='model.backType == 1 && pickupStatus == 0 && receiptStatus <= 0'>
                    <el-alert title="上门取件成功，等待仓库收货质检" type="info" show-icon :closable="false"></el-alert>
                  </div>
                  <div v-show='receiptStatus > 0 && model.needReturn != 0'>
                    <el-alert title="" type="info" show-icon :closable="false">
                      仓库质检结束，请查看 
                      <el-button type="success" size="mini" v-if="model.needReturn != 0" 
                            @click.native.prevent="handleReceiptReport">质检报告
                      </el-button>
                    </el-alert>
                    <el-alert title="" type="warning" show-icon :closable="false" style="margin-top: 5px;">
                      <p>请您及时与买家协商本次换货，如您逾期未处理，本次换货将自动达成并换货给买家 <el-tag type="gray" v-if="timerHtml">{{ timerHtml }}</el-tag> </p>
                    </el-alert>                    
                    <div style="margin-top: 12px;">
                      <el-button @click.native.prevent="exangeGoods" type="warning"> 同意换货 </el-button>
                      <el-button @click.native.prevent="rejectExchange" type="error"> 拒绝换货 </el-button>
                    </div>
                  </div>
                  <div v-show='model.needReturn == 0'>
                    <el-alert title="" type="info" show-icon :closable="false">
                      仓库质检结束
                    </el-alert>
                    <div style="margin-top: 12px;">
                      <el-button @click.native.prevent="exangeGoods" type="warning"> 同意换货 </el-button>
                      <el-button @click.native.prevent="rejectExchange" type="error"> 拒绝换货 </el-button>
                    </div>
                  </div>                  
                </div>

                <!-- 换货失败 待确认 -->
                <div v-if="model.backOrderType == 4 && model.statusCode == 5">
                  <el-alert title="商家拒绝换货，换货失败!" type="error" show-icon :closable="false"></el-alert>
                </div>

                <!-- 换货成功 待确认 -->
                <div v-if="model.backOrderType == 4 && model.statusCode == 6">
                  <el-alert title="" type="success" show-icon :closable="false">
                    换货成功！换货订单号: <el-tag type="gray">{{model.exchangeOrderNo}}</el-tag>
                  </el-alert>
                </div>

                <!-- 成功退款 待确认 -->
                <div v-if="(model.backOrderType == 1 || model.backOrderType == 2 || model.backOrderType == 3) 
                          && model.statusCode == 6">
                  <el-alert title="" type="success" show-icon :closable="false">
                    退款成功！退款金额  <el-tag type="error">{{model.actualRefundAmount}}</el-tag> 元 ，
                      详见
                      <el-popover
                        ref="refundItem"
                        placement="right"
                        width="400"
                        trigger="click">
                        <el-table :data="refundItemList">
                          <el-table-column property="name" label="退款方式"></el-table-column>
                          <el-table-column property="amount" label="退款金额(元)"></el-table-column>
                        </el-table>
                        </el-popover>
                        <el-button v-popover:refundItem type="info" size="mini">退款明细</el-button>.
                      <el-button type="info" size="mini" v-if="model.needReturn != 0"
                            @click.native.prevent="handleReceiptReport">质检报告查看
                      </el-button>
                  </el-alert>
                </div>

                <!-- 退款失败 待确认 -->
                <div v-if="(model.backOrderType == 2 || model.backOrderType == 3) && model.statusCode == 5">
                  <el-alert title="商家拒绝退款，退款失败!" type="error" show-icon :closable="false"></el-alert>
                </div>
              </div>

            </div>
          </card-panel>

          <card-panel class="flex-item _small">
            <h3 slot="title">商品图片</h3>
            <div slot="panel-body">
              <div class="_table-list">
                <el-table :data="goodListData" border>
                  <el-table-column width="70" align="center" type="index"></el-table-column>
                  <el-table-column width="120" align="center" inline-template label="商品图片">
                    <div style="width: 120px; margin: 0 -18px; padding: 5px;">
                      <img :src="row.goodsPic == 'undefined' ? '/static/images/default.jpg' : (cloudShowUrl+row.goodsPic)" style="max-width:100%;height: auto;">
                    </div>
                  </el-table-column>
                  <el-table-column min-width="150" align="center" property="goodsName" label="商品名称"></el-table-column>
                  <el-table-column width="100" align="center" property="number" label="商品数量"> </el-table-column>
                  <el-table-column width="120" align="center" property="unitPrice" label="商品单价(元)"> </el-table-column>
                </el-table>
              </div>
            </div>
          </card-panel>
        </div>
      </card-panel>

      <!--收件单Dialog-->
      <back-receipt-report ref="receptReportCom" :targetId="model.backOrderId" @onSuccess="onSelectedSome">
      </back-receipt-report>
    </div>
</template>

<script>

  import {dateFormat as _dateFormat } from "lib/utils/dateFormat"
  import { getOrderObj } from 'src/vuex/actions/mallShopOrderAction'
  import {
  	_getBackOrderItemList,
  	_passBackOrderApply,
  	_rejectBackOrderApply,
  	_getPickupDetail,
  	_getBackOrderDetail,
  	_getBackExpressDetail,
  	_markPickupSuccess ,
    _getReceiptDetail,
    _refund,
    _rejectRefund,
    _exangeGoods,
    _rejectExchange} from 'src/vuex/actions/backAction'
  import BackReceiptReport from './back-receipt-report'
  import moment from "moment"
  import RegExp from 'lib/utils/regexp'

  export default {
    props: {
      paramObj: Object, default: () => {},
    },
    components: {
      BackReceiptReport
    },
    computed:{
      cloudShowUrl() {
        return this.$store.getters.cloudShowUrl
      }
    },
    data() {
      var checkPrice = (rule, value, callback) => {
        setTimeout(() => {
          if (value > this.model.refundAmount) {
            callback(new Error('最大退款金额：'+this.model.refundAmount));
          } else {
            callback();
          }
        }, 1000);
      };
      return {
      	model:{},        // 退订单对象
        goodListData:[], // 退商品详情
        picUrls:[],      // 图片地址
        backorderItemModel:{
          needReturn:1,
        },
        sysDate:'',    // 系统时间
        orderStatus:0, // 原订单状态

        tipHtml:'请您及时与买家协商本次退款，如您逾期未处理，本次退款将自动达成并退款给买家', //提示文字
        timerHtml:'' , // 显示倒计时
        comeDoorFlag:false, // 是否显示上面取件按钮

        pickupStatus:-1 ,// 获取取件状态
        expressStatus:0,// 用户自寄状态
        expressNo:'', // 快递单号

        receiptStatus:-1, //验货状态
        receiptReportDialog:false , // 质检报告是否显示


        refundItemList:[],//退款明细
        pickupAddress:'',//取件地址
        backTypeName:'',


        backOrderModel:{},
        backReceiptModel:{
          actualRefundAmount:0,
        },

        repRules:{
          actualRefundAmount: [
            { type: 'number',required: true, message: '请输入实际退款金额', trigger: 'blur' },
            { pattern: RegExp.amount,trigger: 'blur',message: '格式错误， 格式：0.00'},
            { validator: checkPrice, trigger: 'blur' }
          ]
        }
      }
    },
    created(){
      //console.log(JSON.stringify(this.paramObj))
      this.model = this.paramObj.row ;
      //this.getBackOrderObj() ;
      //console.log(JSON.stringify(this.model))
      // 图片处理
      if(this.model.uploadPics){
        this.model.uploadPics.split(",").forEach((item) => {
          if(item != ''){
            this.picUrls.push(this.cloudShowUrl+item)
          }
        });
      }
      this.backReceiptModel.actualRefundAmount = this.model.refundAmount ;
      //console.log(moment(this.model.overDtm).unix()*1000)
      this.searchTableList() ;
      // 取件状态
      if(this.model.statusCode >= 1){
      	this.initStatus() ;
      }

      if((this.model.backOrderType == 1 
          || this.model.backOrderType == 2 
          || this.model.backOrderType == 3) 
        && this.model.statusCode == 6){
        this.getBackOrderObj() ;
        //console.log('model', this.refundItemList)
      }

      if(this.model.backOrderType == 1){
        this.backTypeName = "取消" ;
      }else if(this.model.backOrderType == 2){
        this.backTypeName = "退款" ;
      }else if(this.model.backOrderType == 3){
        this.backTypeName = "退货" ;
      }else if(this.model.backOrderType == 4){
        this.backTypeName = "换货" ;
      }else if(this.model.backOrderType == 5){
        this.backTypeName = "维修" ;
      }

    },
    methods: {
      searchTableList() {
        // 获取订单状态
        let orderParams = {
          orderId: this.model.orderId,
        }
        getOrderObj(orderParams).then(data => {
          const { success, result, msg } = data
          if (success) {
            //console.log(result.orderObj.statusCode)
            this.orderStatus = result.orderObj.orderCode ;

            let params = {
              backOrderId: this.model.backOrderId,
            }
            _getBackOrderItemList(params).then(data => {
              const { success, result, msg } = data
              if (success) {
                //console.log(JSON.stringify(result))
                this.goodListData = result.mallBackOrderList ;
                this.sysDate = result.currentDate ;
                if((this.model.statusCode == 1 || this.model.statusCode == 2
                      || this.model.statusCode == 4)){
                   this.leftTimer(moment(this.sysDate).unix()*1000)
                }
              }
            })
          }
        })        

      },

      // 获取取件状态 用户自寄状态
      initStatus(){
        console.log("this.expressStatus",11)  ;
		    _getPickupDetail({backOrderId:this.model.backOrderId}).then(data => {
          const { success, result, msg } = data
          if (success) {
          	if(result.statusCode != null){
              this.pickupAddress = result.strProvince+result.strCity+result.strArea+result.strAddress ;
          		this.pickupStatus = result.statusCode ;
          	}
            //console.log("this.pickupStatus",this.pickupStatus) ;
          }
        }) ;
        _getBackExpressDetail({backOrderId:this.model.backOrderId}).then(data => {
          const { success, result, msg } = data
          if (success) {
            if(result.expressNo != null && result.statusCode == "1"){
            	this.expressStatus = 1 ;
            	this.expressNo = result.expressNo
            }
            //console.log("this.expressStatus",this.expressStatus) ;
          }
        });
        _getReceiptDetail({backOrderId:this.model.backOrderId}).then(data => {
          const { success, result, msg } = data
          if (success) {
            if(result.statusCode != null){
              this.receiptStatus = result.statusCode ;
            }
            //console.log("this.receiptStatus",this.receiptStatus) ;
          }
        }) ;
      },
      // 查看质检报告
      handleReceiptReport(){
        this.$refs.receptReportCom.receiptReportDialog=true
      },

      // 退订单详情
      getBackOrderObj(){
        //console.log(this.model.backOrderId)
    		_getBackOrderDetail({backOrderId:this.model.backOrderId}).then(data => {
              const { success, result, msg } = data
              if (success) {
                //console.log(JSON.stringify(result))
                this.model = result.mallBackOrder ;
                this.refundItemList = result.refundItemList ;
                console.log('this.refundItemList---', this.refundItemList)
                this.initStatus() ;
              }
        })
      },

      leftTimer(sysDateFloat){
         var someOne = setInterval( () => {
           var leftTime = parseFloat(moment(this.model.overDtm).unix()*1000)-sysDateFloat; //计算剩余的毫秒数
           //console.log(leftTime)
           if(leftTime <= 0){
              // 关掉定时器
              clearInterval(someOne) ;
              this.timerHtml = '';
              // 处理按钮事件 
              this.backorderItemModel.needReturn = 1 ;
              if(this.model.statusCode == 1){
                this.passBackOrderApply() ;
              }else if(this.model.statusCode == 2){
                this.passRefund() ;
              }else if(this.model.statusCode == 4 && this.model.backOrderType == 4){
                this.exangeGoods() ;
              }
              //console.log(11)

           }else{
             var days = parseInt(leftTime / 1000 / 60 / 60 / 24 , 10); //计算剩余的天数
             var hours = parseInt(leftTime / 1000 / 60 / 60 % 24 , 10); //计算剩余的小时
             var minutes = parseInt(leftTime / 1000 / 60 % 60, 10);//计算剩余的分钟
             var seconds = parseInt(leftTime / 1000 % 60, 10);//计算剩余的秒数
             days = this.checkTime(days);
             hours = this.checkTime(hours);
             minutes = this.checkTime(minutes);
             seconds = this.checkTime(seconds);
             sysDateFloat = sysDateFloat + 1000 ;
             this.timerHtml = "您还有"+days+"天" + hours+"小时" + minutes+"分"+seconds+"秒 处理该退换货";
           }
         },1000);
         //clearInterval(someOne) ;

      },
      checkTime(i){ //将0-9的数字前面加上0，例1变为01
         if(i<10)
         {
          i = "0" + i;
         }
         return i;
      },
      // 同意退换货申请
      passBackOrderApply(){
          let _returnType = 'NEED'
          if(this.backorderItemModel.needReturn == 0){
            _returnType = 'NONE'
          }else if(this.backorderItemModel.needReturn == 2){
            _returnType = 'RETURN_WHEN_GET'
          }
          let _params = {
            backOrderId:this.model.backOrderId,
            returnType:_returnType
          }
          this.$confirm('确认同意退换货申请吗?', '提示', {
            type: 'warning'
          }).then(() => {           
              _passBackOrderApply(_params).then(data => {
                const { success, result, msg } = data
                if (success) {
                  // 处理
                  this.getBackOrderObj()
                  this.$message({type: 'success', message: '操作成功' });
                  //console.log(JSON.stringify(result)) ;
                }
              })
          }).catch(() => {});    
      },
      // 拒绝退换货申请
      rejectBackOrderApply(){
          let _params = {
            backOrderId:this.model.backOrderId,
          }
          this.$confirm('确认拒绝退换货申请吗?', '提示', {
            type: 'warning'
          }).then(() => {          
              _rejectBackOrderApply(_params).then(data => {
                const { success, result, msg } = data
                if (success) {
                  this.getBackOrderObj();
                  this.$message({type: 'success', message: '操作成功' });
                  //console.log(JSON.stringify(result))
                }
              })
          }).catch(() => {});          
      },
      passRefund(){
          this.$refs.backReceiptForm.validate((valid) => {
            if (valid) {
              let _params = {
                backOrderId:this.model.backOrderId,
                actualRefundAmount:this.backReceiptModel.actualRefundAmount
              }
              this.$confirm('确认同意退款吗?', '提示', {
                type: 'warning'
              }).then(() => {
                _refund(_params).then(data => {
                  const { success, result, msg } = data
                  if (success) {
                    this.getBackOrderObj();
                    this.$message({type: 'success', message: '操作成功' });
                    //console.log(JSON.stringify(result))
                  }
                })
              }).catch(() => {});
            }
          })
      },
      rejectRefund(){
          let _params = {
            backOrderId:this.model.backOrderId,
            reason:''
          }
          this.$confirm('确认拒绝退款吗?', '提示', {
            type: 'warning'
          }).then(() => {          
                _rejectRefund(_params).then(data => {
                  const { success, result, msg } = data
                  if (success) {
                    this.getBackOrderObj();
                    this.$message({type: 'success', message: '操作成功' });
                    //console.log(JSON.stringify(result))
                  }
                })
          }).catch(() => {});

      },
      // 同意换货
      exangeGoods(){
          let _params = {
            backOrderId:this.model.backOrderId,
          }
          this.$confirm('确认同意换货吗?', '提示', {
            type: 'warning'
          }).then(() => {          
              _exangeGoods(_params).then(data => {
                const { success, result, msg } = data
                if (success) {
                  this.getBackOrderObj();
                  this.$message({type: 'success', message: '操作成功' });
                  //console.log(JSON.stringify(result))
                }
              })
          }).catch(() => {});
      },
      // 拒绝换货
      rejectExchange(){
          let _params = {
            backOrderId:this.model.backOrderId,
            reason:''
          }
          this.$confirm('确认拒绝换货吗?', '提示', {
            type: 'warning'
          }).then(() => {            
              _rejectExchange(_params).then(data => {
                const { success, result, msg } = data
                if (success) {
                  this.getBackOrderObj();
                  this.$message({type: 'success', message: '操作成功' });
                  //console.log(JSON.stringify(result))
                }
              })
          }).catch(() => {});
      },
      // 取件成功
      markPickupSuccess(){
      	  let _params = {
            backOrderId:this.model.backOrderId,
          }
          _markPickupSuccess(_params).then(data => {
            const { success, result, msg } = data
            if (success) {
              this.getBackOrderObj();
              this.$message({type: 'success', message: '操作成功' });
              //console.log(JSON.stringify(result))
            }
          })
      },
      onSelectedSome(c){

      },
      openWindows(url){
        window.open(url) ;
      }
    }
  }
</script>

<style>
  ._reback-images {
    display: flex;
    margin-top: 10px;
  }
  ._reback-images > li {
    width: 120px;
    height: 100px;
    margin-right: 5px;
    border: 1px solid #ccc;
    border-radius: 3px;
    padding: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
  ._reback-images > li img {
    max-width: 100%;
    height: 100%;
  }
  .gray_cla{
    padding: 0 5px;
    height: 24px;
    line-height: 22px;
    font-size: 12px;
    border-radius: 4px;
    background-color: #e4e8f1;
    border-color: #e4e8f1;
    color: #48576a;
  }
</style>
