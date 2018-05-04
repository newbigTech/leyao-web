<template>
  <el-dialog title="订单改价" v-model="dialogVisible">
    <el-form :inline="true" style="width:100%;">
            <el-form-item label="订单编号:" style="width:60%;">
               {{mallOrder.orderNo}}
            </el-form-item>
            <el-form-item label="客户:" > 
               {{mallOrder.userAlias}}
            </el-form-item>
    </el-form>
     <fieldset>
        <legend class="page-header">商品信息</legend>
                <table class="table table-hover" style="border:2px solid #f5f5f5;">
                    <thead>
                        <tr>
                            <th style="width:25%">
                                商品
                            </th>
                            <th style="text-align: left;width:10%">
                                单价(元)
                            </th>
                            <th style="text-align: left;width:10%">
                                数量
                            </th>
                            <th style="text-align: left;width:10%">
                                小计(元)
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(g,i) in tableData">
                            <td>
                                <div class="row">
                                    <div class="col-md-3">
                                        <img :src="cloudShowUrl + g.goodsPic" width="80px" height="80px" class="img-rounded">
                                    </div>
                                    <div class="col-md-9">
                                        <p style="color:blue">{{g.goodsName}}</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                ￥{{g.unitPrice}}
                            </td>
                            <td>
                                × {{g.number}}
                            </td>
                            <td>
                                <p>￥{{g.totalPrice}}</p>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div class="page-header" style="margin:0;text-align: right;padding-right: 15px;">
                </div>
                <div style="margin:0;text-align: right;padding-right: 25px;padding-top: 10px;">
                    <h1><span style="font-weight: bold;">订单共 {{tableData.length}} 件商品，总计：<span style="color: #f44">￥{{mallOrder.totalPrice||0}}</span></span> （运费 ￥{{mallOrder.postPrice||0}}）</h1>
                </div>
     </fieldset>
     <fieldset style="width:100%;">
        <legend class="page-header">付款信息</legend>
        <el-row>
          <el-col :span="12">
            订单状态: 
            <span v-if="mallOrder.orderCode===1">待确认</span>
            <span v-if="mallOrder.orderCode===2">已确认</span>
            <span v-if="mallOrder.orderCode===3">待支付</span>
            <span v-if="mallOrder.orderCode===4">已支付/待发货</span>
            <span v-if="mallOrder.orderCode===5">已发货</span>
            <span v-if="mallOrder.orderCode===6">已完成</span>
            <span v-if="mallOrder.orderCode===99">已关闭</span>
          </el-col>
          <el-col :span="12">
            订单总金额: ￥ {{mallOrder.totalPrice||0}}
          </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              优惠券支付: - {{mallOrder.couponsPrice||0}}
            </el-col>
            <el-col :span="12">
              卡券支付: - {{mallOrder.rechargeCardPrice||0}}
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              积分支付: - {{mallOrder.usePoint||0}} (折现: ￥ {{mallOrder.pointPirce||0}} 元)
            </el-col>
            <el-col :span="12">
              活动优惠金额：- {{mallOrder.activityPrice||0}}
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              会员折扣: - {{mallOrder.vipPrice||0}}
            </el-col>
            <el-col :span="12">
              还应支付金额:  {{payPrice||0}}
            </el-col>
          </el-row>
     </fieldset>
     <fieldset style="width:100%;">
        <legend class="page-header">&nbsp;</legend>
        <el-form style="width:100%;" :model="changeOrderObj">
            <el-form-item label="商品总金额 优惠:">
              - <vue-numeric currency="" separator="" v-model="changeOrderObj.afterPrice" :max="maxAfterPrice" :min="0" :precision="2" class="el-input__inner" style="width:250px;display: inline"></vue-numeric> 元
            </el-form-item>
            <el-form-item label="运费 优惠:" v-if="mallOrder.postPrice!=0" >
              - <vue-numeric currency="" separator="" v-model="changeOrderObj.postPrice" :max="mallOrder.postPrice" :min="0" :precision="2" class="el-input__inner" style="width:250px;display: inline"></vue-numeric> 元 
            </el-form-item>
            <el-form-item label="优惠原因:" >
              <el-input type="textarea" :rows="3" :maxlength="200" placeholder="请输入优惠原因" v-model="changeOrderObj.alterPriceNote" style="width:400px;"> </el-input>
            </el-form-item>
        </el-form>
     </fieldset>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="onSuccess">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import {updateOrderPrice,getOrderObj} from 'actions/mallShopOrderAction'
import VueNumeric from 'vue-numeric'
  export default {
    components:{VueNumeric},
    props: {
        orderId: {
            type: Number,
            require: true
        }
    },
    computed: {
      cloudShowUrl() {
            return this.$store.getters.cloudShowUrl
        }
    },
    data() {
      return {
        payPrice:0,
        maxAfterPrice:100,
        mallOrder:{},
        tableData: [],
        dialogVisible: false,
        changeOrderObj:{
          orderId:undefined,
          afterPrice:0,
          postPrice:0,
          alterPriceNote:''
        }
      }
    },
    methods: {
      loadOrderData(){
        if(this.orderId===0)
          return;
        let param = {
            orderId:this.orderId
        }
        getOrderObj(param).then((data) => {
         // console.log('data',data)
            const {success,result}=data
            if(success){
                let resultObj=result.orderObj || {}
                this.mallOrder = resultObj
                this.payPrice=Number((resultObj.amountPrice-((resultObj.rechargeCardPrice||0)+(resultObj.pointPirce||0))).toFixed(2))
                this.maxAfterPrice=Number((resultObj.amountPrice-((resultObj.postPrice||0)+(resultObj.rechargeCardPrice||0)+(resultObj.pointPirce||0))).toFixed(2))
                if (_.size(result.orderObj.orderItemJson) > 5) {
                    this.tableData = JSON.parse(result.orderObj.orderItemJson)
                }
            }
        })
      },
      onSuccess(){
        let params={
          orderId:this.orderId,
          afterPrice:this.changeOrderObj.afterPrice,
          postPrice:this.changeOrderObj.postPrice,
          alterPriceNote:this.changeOrderObj.alterPriceNote
        }
        let payPrice=this.payPrice
        let submitPrice=Number((this.payPrice-(this.changeOrderObj.afterPrice+this.changeOrderObj.postPrice)).toFixed(2))
        this.$confirm(`订单原需支付金额：${payPrice}，最后订单实际需要支付金额为：${submitPrice}，确认修改订单金额吗?`, '提示', {
                type: 'warning'
            }).then(() => {
              updateOrderPrice(params).then(data=>{
                 const { success, msg, result } = data
                    if (success) {
                        this.$message.success('操作成功')
                        this.dialogVisible = false
                        this.$emit('onSuccess',this.data)
                    } else {
                        this.$message.error(msg)
                        return false
                    }
              })
            }).catch(() => {})
             
      }
    }
  }
</script>