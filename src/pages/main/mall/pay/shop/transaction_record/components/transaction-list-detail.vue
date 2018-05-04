<template>
    <div class="_container">
      <card-panel class="">
        <h3 slot="title">交易明细</h3>
        <div slot="panel-btns">
          <el-button size="small" type="success" @click.native.prevent="$emit('reback','transactionList',model)">交易记录</el-button>
        </div>
        <div slot="panel-body">
          <card-panel class="">
            <h3 slot="title">支付明细</h3>
            <div slot="panel-body">
              <div class="_setting-options">
                <div class="_setting-options-left">
                  <div style="margin-right: 40px;">支付流水号:{{model.paymentNo}}</div>
                  <div style="margin-right: 40px;">订单号:{{model.merchantOrderNo}}</div>
                  <div style="margin-right: 40px;">交易名称:{{model.productName}}</div>
                  <div style="margin-right: 40px;">支付时间:{{model.payTime}}</div>
                </div>
              </div>
              <!-- 列表数据 -->
              <div class="_table-container">
                <div class="_table-list">
                  <el-table :data="orderPayData" style="width: 30%" border>
                    <el-table-column inline-template label="支付方式" style="width: 15%;">
                      <div>
                        <span v-if="row.payWay == 'ACCOUNT'">余额</span>
                        <span v-if="row.payWay == 'CARD_ACCOUNT'">卡支付</span>
                        <span v-if="row.payWay == 'ALIPAY'">支付宝</span>
                        <span v-if="row.payWay == 'WEIXIN'">微信</span>
                      </div>
                    </el-table-column>
                    <el-table-column property="payAmount" label="支付金额(元)" style="width: 15%;"> </el-table-column>
                  </el-table> 
                </div>
              </div>
            </div>
          </card-panel>
          <card-panel style="margin-top: 15px;">
            <h3 slot="title">商品明细</h3>
            <div slot="panel-body">
            <!-- 列表数据 -->
                <div class="_table-list">
                  <el-table :data="payDetailData" style="width: 60%;" border>
                    <el-table-column type="index" width="50"></el-table-column>
                    <el-table-column property="productName" label="商品名" style="width: 15%;"> </el-table-column>
                    <el-table-column property="price" label="单价(元)" style="width: 15%;"> </el-table-column>
                    <el-table-column property="quantity" label="购买数量(个)" style="width: 15%;"> </el-table-column>
                    <el-table-column property="totalAmount" label="总价(元)" style="width: 15%;"> </el-table-column>
                  </el-table>
                </div>
            </div>
          </card-panel>
        </div>
      </card-panel>
    </div>
</template>

<script>

  import {dateFormat as _dateFormat } from "lib/utils/dateFormat"
  import { _getTransactionListDetailPage } from 'src/vuex/actions/payAction'

  export default {
    props: {
      model: Object, default: () => {},
    },
    computed: {
    },
    data() {
      return {
        payDetailModel: {},
        payDetailData: [], // 支付明细
        orderPayData:[],//支付方式集合
      }
    },
    created(){
      this.model.payTime= _dateFormat(new Date(this.model.payTime), 'yyyy-MM-dd HH:mm:ss')
      this.searchTableList()
    },
    methods: {
      searchTableList() {
        let params = {
          merchantOrderId: this.model.merchantOrderId,
        }
        _getTransactionListDetailPage(params).then(data => {
          const { success, result, msg } = data
          if (success) {
            console.log(JSON.stringify(result))
            this.payDetailData = result.orderItems
            this.orderPayData = result.orderPay
          }
        })
      },
      onSubmit(){
        
      }, 
    }
  }
</script>
