<template>
    <div class="_container">
      <el-dialog v-model="receiptReportDialog" @open="loadTableData" size="1200">
        <card-panel class="">
          <h3 slot="title">质检报告</h3>
          <div slot="panel-body">
          <el-form ref="receiptForm" :model="receiptModel" label-width="120px">
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
                          <el-form-item label="运单号:">
                            <el-tag type="primary">{{receiptModel.expressNo || '无'}}</el-tag>
                          </el-form-item>
                          <el-form-item label="订单号:" style="width:220px;">
                            <el-tag type="primary">{{receiptModel.orderNo}}</el-tag>
                          </el-form-item>
                          <el-form-item label="用户:" style="width:220px;">
                            <el-tag type="primary">{{receiptModel.userAlias || '无'}}</el-tag>
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
                    <el-form-item label="运费:" prop="expressPayWay">
                        <el-tag type="primary">
                          <span v-show="receiptModel.expressPayWay == 0">寄付</span>
                          <span v-show="receiptModel.expressPayWay == 1">到付</span>
                        </el-tag>
                    </el-form-item>
                    <el-form-item label="是否寄回发票:" prop="isBackInvoice">
                      <el-tag type="primary">
                        <span v-show="receiptModel.isBackInvoice == 0">否</span>
                        <span v-show="receiptModel.isBackInvoice == 1">是</span>
                        <span v-show="receiptModel.isBackInvoice == 2">电子发票</span>
                      </el-tag>
                    </el-form-item>
                    <el-form-item label="运费金额(元):" prop="freight">
                      <el-tag type="primary">{{receiptModel.freight}}</el-tag>
                    </el-form-item>
                    <!-- 列表数据 -->
                    <div class="_table-list">
                      <el-table :data="goodListData" border>
                        <!-- <el-table-column width="70" align="center" type="index"></el-table-column> -->
                        <el-table-column min-width="180" align="center" property="goodsName" label="退货商品名称"></el-table-column>
                        <el-table-column width="130" align="center" property="applyBackNum" label="申请退货数量"> </el-table-column>
                        <el-table-column width="130" align="center" inline-template label="实际退货数量">
                          <el-form-item label="" label-width="0" style="margin-bottom: 0;">
                            {{row.actualBackNum}}
                          </el-form-item>

                        </el-table-column>
                        <el-table-column width="200" align="center" label="验货状态">
                          <template scope="scope">
                            <span v-show="scope.row.statusCode == 1">合格</span>
                            <span v-show="scope.row.statusCode == 2">不合格</span>                          
                          </template>
                        </el-table-column>
                      </el-table>
                    </div>
                    <div style="margin-top: 20px">
                      <el-form-item label="备注:" label-width="45px" prop="note">
                        {{receiptModel.comments}}
                      </el-form-item>
                    </div>
                  </div>
                </card-panel>
              </div>
            </el-form>
          </div>
        </card-panel>
      </el-dialog>
    </div>
</template>

<script>

  import {dateFormat as _dateFormat } from "lib/utils/dateFormat"
  import { _queryReceiptPageList } from 'src/vuex/actions/backAction'
  import moment from "moment"
  import RegExp from 'lib/utils/regexp'

  export default {
    props: {
       targetId: {
          type: Number,
          default: undefined
       },
    },
    computed:{

    },
    data() {
      return {
        receiptReportDialog:false,
        isShowFlag:false,
        goodListData:[],
        receiptModel:{

        }
      }
    },
    methods: {
      loadTableData(){
        let params={
          pageNo:1,
          pageSize:10,
          backOrderId:this.targetId 
        }
        _queryReceiptPageList(params).then(data => {
          const { success, result, msg } = data
          if (success) {
            //console.log(JSON.stringify(result.list))
            this.receiptModel = result.list[0] ;
            this.goodListData = this.receiptModel.receiptItems ;
          }
        })
      },
    }
  }
</script>
