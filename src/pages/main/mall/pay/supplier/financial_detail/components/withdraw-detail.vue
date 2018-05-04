<template>
    <div class="_container">
      <card-panel class="">
        <h3 slot="title">资金明细</h3>
        <div slot="panel-btns">
          <el-button size="small" type="success" @click.native.prevent="$emit('reback','financialDetail',model)">资金记录</el-button>
        </div>
        <div slot="panel-body">
          <card-panel class="">
            <h3 slot="title">支付明细</h3>
            <div slot="panel-body">
              <div class="_setting-options">
                <div class="_setting-options-left">
                  <div style="margin-right: 40px;">申请人:{{withdrawDetailModel.applyerUserName}}</div>
                  <div style="margin-right: 40px;">申请时间:{{applyTime}}</div>
                  <div style="margin-right: 40px;">提现状态:{{withStatus}}</div>
                </div>                               
              </div>
            </div>
            <div slot="panel-body" style="margin-top: 20px;">
              <div class="_setting-options">
                <div class="_setting-options-left">
                  <div style="margin-right: 40px;">银行名称:{{withdrawDetailModel.bankName}}</div>
                  <div style="margin-right: 40px;">收款账号:{{withdrawDetailModel.accountNo}}</div>
                  <div style="margin-right: 40px;">收款人:{{withdrawDetailModel.payee}}</div>
                </div>
              </div>
            </div>
            <div slot="panel-body" style="margin-top: 20px;">
              <div class="_setting-options">
                <div class="_setting-options-left">
                  <div style="margin-right: 40px;">提现金额:{{withdrawDetailModel.withdrawAmount}}(元)</div>
                  <div style="margin-right: 40px;">打款金额:{{withdrawDetailModel.payAmount}}(元)</div>
                  <div style="margin-right: 40px;">转账手续费:{{withdrawDetailModel.settleFee}}(元)</div>
                </div>
              </div>
            </div>
            <div slot="panel-body" style="margin-top: 20px;">
              <div class="_setting-options">
                <div class="_setting-options-left">
                  <div style="margin-right: 40px;">审核人:{{withdrawDetailModel.auditorUserName}}</div>
                  <div style="margin-right: 40px;">审核时间:{{auditTime}}</div>
                </div>
              </div>
            </div>
            <div slot="panel-body" style="margin-top: 20px;">
              <div class="_setting-options">
                <div class="_setting-options-left">
                  <div style="margin-right: 40px;">打款人:{{withdrawDetailModel.remitUserName}}</div>
                  <div style="margin-right: 40px;">打款时间:{{remitTime}}</div>
                </div>
              </div>
            </div>            
          </card-panel>
        </div>
      </card-panel>
    </div>
</template>

<script>

  import {dateFormat as _dateFormat } from "lib/utils/dateFormat"
  import { _getWithdrawDetailRecord } from 'src/vuex/actions/payAction'

  export default {
    props: {
      model: Object, default: () => {},
    },
    computed: {
    },
    data() {
      return {
        withdrawDetailModel: {},
        applyTime:'',
        auditTime:'',
        remitTime:'',
        withStatus:'',
      }
    },
    created(){
      this.loadTableList() 
    },
    methods: {
      loadTableList() {
        let params = {
          linkId: this.model.linkId,
        }
        _getWithdrawDetailRecord(params).then(data => {
          const { success, result, msg } = data
          if (success) {
            console.log(JSON.stringify(result))
            this.withdrawDetailModel = result
            if(this.withdrawDetailModel.applyTime != "943891200000"){
              this.applyTime= _dateFormat(new Date(this.withdrawDetailModel.applyTime), 'yyyy-MM-dd HH:mm:ss')
            }
            if(this.withdrawDetailModel.auditTime != "943891200000"){
              this.auditTime= _dateFormat(new Date(this.withdrawDetailModel.auditTime), 'yyyy-MM-dd HH:mm:ss')
            }
            if(this.withdrawDetailModel.remitTime != "943891200000"){
              this.remitTime= _dateFormat(new Date(this.withdrawDetailModel.remitTime), 'yyyy-MM-dd HH:mm:ss')   
            }
            if(result.status == 'APPLYING'){
              this.withStatus = '审核中' ;
            }
            if(result.status == 'CONFIRM'){
              this.withStatus = '待付款' ;
            }
            if(result.status == 'REJECT'){
              this.withStatus = '审核不通过' ;
            }
            if(result.status == 'REMITED'){
              this.withStatus = '已打款' ;
            }
            if(result.status == 'REMIT_FAIL'){
              this.withStatus = '打款失败' ;
            }     
          }
        })
      },
    }
  }
</script>
