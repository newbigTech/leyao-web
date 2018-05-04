<template>
    <div class="_container">
      <card-panel class="">
        <h3 slot="title">验证收货单</h3>
        <div slot="panel-btns">
          <!-- <el-button v-show='!isShowFlag' size="small" type="warning" @click.native.prevent="onSubmit">提交</el-button> -->
          <el-button size="small" type="primary" @click.native.prevent="$emit('reback','backOrderReceiptList',model)">返回</el-button>
        </div>
        <div slot="panel-body">
        <el-form ref="receiptForm" :model="receiptModel" :rules="rules" label-width="120px">
            <div class="flex">
              <card-panel style="min-width: 400px; max-width: 570px; width: 45%; margin-right: 15px;">
                  <h3 slot="title">收货单信息</h3>
                  <div slot="panel-body">

                        <el-form-item label="收货单号:">
                          <el-tag type="primary">{{receiptModel.receiptNo}}</el-tag>                       
                        </el-form-item>
                        <el-form-item label="退换货申请单号:" style="width:220px">
                          <el-tag type="primary">{{receiptModel.backOrderNo}}</el-tag>
                        </el-form-item>
                        <el-form-item label="类型:" prop="backOrderType">
                            <el-tag type="primary">
                              <span v-show="receiptModel.backOrderType == 1">取消</span>
                              <span v-show="receiptModel.backOrderType == 2">退款</span>
                              <span v-show="receiptModel.backOrderType == 3">退货</span>
                              <span v-show="receiptModel.backOrderType == 4">换货</span>
                              <span v-show="receiptModel.backOrderType == 5">维修</span>
                            </el-tag>
                        </el-form-item>
                        <el-form-item label="运单号:" v-show="receiptModel.backType == 2">
                          <el-tag type="primary">{{receiptModel.expressNo || '无'}}</el-tag>
                        </el-form-item>
                        <el-form-item label="订单号:" style="width:220px;">
                          <el-tag type="primary">{{receiptModel.orderNo}}</el-tag>
                        </el-form-item>
                        <el-form-item label="用户:" style="width:220px;">
                          <el-tag type="primary">{{receiptModel.userAlias}}</el-tag>
                        </el-form-item>
                        <el-form-item label="寄回方式:" prop="backType">
                              <el-tag type="primary"> 
                                <span v-show="receiptModel.backType == 0">无</span>
                                <span v-show="receiptModel.backType == 1">上门取件</span>
                                <span v-show="receiptModel.backType == 2">用户自寄</span>
                              </el-tag>
                        </el-form-item>
                 </div>
              </card-panel>
              <card-panel class="flex-item">
                <h3 slot="title">寄回商品</h3>
                <div slot="panel-body">
                  <el-form-item label="运费" prop="expressPayWay">
                      <el-radio-group v-model="receiptModel.expressPayWay" :disabled="isShowFlag">
                        <el-radio :label="0">寄付</el-radio>
                        <el-radio :label="1">到付</el-radio>
                      </el-radio-group>
                  </el-form-item>
                  <el-form-item label="是否寄回发票" prop="isBackInvoice">
                    <el-radio-group v-model="receiptModel.isBackInvoice" :disabled="isShowFlag">
                      <el-radio :label="0">否</el-radio>
                      <el-radio :label="1">是</el-radio>
                      <el-radio :label="2">电子发票</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="运费金额(元)" prop="freight">
                    <el-input v-model="receiptModel.freight" :maxlength="6" type="number" :disabled="isShowFlag" style="width: 220px;"></el-input>
                  </el-form-item>
                  <!-- 列表数据 -->
                  <div class="_table-list">
                    <el-table :data="goodListData" border>
                      <!-- <el-table-column width="70" align="center" type="index"></el-table-column> -->
                      <el-table-column min-width="180" align="center" property="goodsName" label="退货商品名称"></el-table-column>
                      <el-table-column width="130" align="center" property="applyBackNum" label="申请退货数量"> </el-table-column>
                      <el-table-column width="130" align="center" inline-template label="实际退货数量">
                        <el-form-item label="" label-width="0" style="margin-bottom: 0;"
                          :key="row.backOrderItemId"
                          :rules="[{ required: true, message: '请输入退货数量', trigger: 'blur' }]"
                        >
                          <el-input v-model="row.actualBackNum" :disabled="isShowFlag" type="number" min="0" step="1"></el-input>
                        </el-form-item>

                      </el-table-column>
                      <el-table-column width="200" align="center" label="验货状态">
                        <template scope="scope">
                          <el-radio-group v-model="scope.row.statusCode" :disabled="isShowFlag">
                            <el-radio :label="1">合格</el-radio>
                            <el-radio :label="2">不合格</el-radio>
                          </el-radio-group>
                        </template>
                      </el-table-column>
                    </el-table>
                  </div>
                  <div style="margin-top: 20px">
                    <el-form-item label="备注:" label-width="45px" prop="note">
                      <el-input placeholder="请输入备注" :disabled="isShowFlag" type="textarea" v-model="receiptModel.comments"></el-input>
                    </el-form-item>
                  </div>
                  <div v-show='!isShowFlag' style="margin-top: 20px">
                    <el-button size="small" type="warning"  @click.native.prevent="onSubmit">提交</el-button>
                    <el-button size="small" type="primary"  @click.native.prevent="$emit('reback','backOrderReceiptList',model)">返回</el-button>
                  </div>
                </div>
              </card-panel>
            </div>
          </el-form>
        </div>
      </card-panel>
    </div>
</template>

<script>

  import {dateFormat as _dateFormat } from "lib/utils/dateFormat"
  import { _getBackOrderItemList,_checkReceipt} from 'src/vuex/actions/backAction'
  import moment from "moment"
  import RegExp from 'lib/utils/regexp'

  export default {
    props: {
      model: Object, default: () => { return {} },
    },
    computed:{

    },
    data() {
      return {
        isShowFlag:false,
        goodListData:[],
        receiptModel:{

        },

        rules:{
          freight: [
            { type: 'number',required: true, message: '请输入运费金额', trigger: 'blur' },
            { pattern: RegExp.amount,trigger: 'blur',message: '格式错误， 格式：0.00'}
          ]
        }
      }
    },
    created(){
      this.receiptModel = this.model ;
      this.receiptModel.backType = this.model.backType+''
      this.receiptModel.backOrderType = this.model.backOrderType+''
      this.goodListData = this.model.receiptItems ;
      if(this.model.statusCode > 0){
        this.isShowFlag = true ;
      }else{
        this.goodListData.forEach((item) => {
          item.statusCode = 1;
        });
      }
      //console.log(JSON.stringify(this.goodListData))
    },
    methods: {
      searchTableList() {

      },

      onSubmit(){
        this.$refs.receiptForm.validate((valid) => {

            if (valid) {
                  let checkResultList = []

                  for (let item of this.goodListData) {
                    if (!/^(0|[1-9][0-9]*)$/.test(item.actualBackNum)) {
                      this.$message({
                        showClose: true,
                        message: '请输入正确的退货数量!',
                        type: 'warning'
                      })
                      return
                    }
                    if(item.actualBackNum > item.applyBackNum){
                      this.$message({
                        showClose: true,
                        message: '实际退货数量不能大于申请退货数量!',
                        type: 'warning'
                      })
                      return
                    }

                    let checkObj = {} ;
                    checkObj.backReceiptItemId = item.backReceiptItemId ;
                    checkObj.actualBackNum = item.actualBackNum ;
                    checkObj.statusCode = item.statusCode ;
                    checkResultList.push(checkObj)
                  }

                  if(this.receiptModel.backType == 2){
                    if(this.receiptModel.expressNo == null || this.receiptModel.expressNo == ''){
                       this.$message({
                        showClose: true,
                        message: '运单号为空,请买家填写运单号',
                        type: 'warning'
                      })
                      return                     
                    }
                  }

                  let params = {
                    backOrderId: this.model.backOrderId,
                    expressPayWay:this.receiptModel.expressPayWay,
                    freight:this.receiptModel.freight,
                    isBackInvoice:this.receiptModel.isBackInvoice,
                    comments:this.receiptModel.comments,
                    receiptItems:checkResultList
                  }
                  //console.log(JSON.stringify(params));
                  //return ;
                  _checkReceipt(JSON.stringify(params)).then(data => {
                    const { success, result, msg } = data
                    if (success) {
                      this.$message({type: 'success', message: '操作成功' });
                      this.$emit("reback", "backOrderReceiptList", this.model);
                      //console.log(JSON.stringify(result)) ;
                    }
                  })
            }
        })
      },
    }
  }
</script>
