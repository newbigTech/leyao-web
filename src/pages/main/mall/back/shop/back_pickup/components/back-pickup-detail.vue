<template>
  <!--startprint-->
  <div class="_container">
    <el-dialog v-model="pickupDetailDialog" @open="loadTableData" size="1000">
      <el-form ref="pickupForm" :model="pickupObj" :rules="rules" label-width="85px">
        <card-panel class="">
          <span slot="title"> 打印单 </span> 
          <div slot="panel-body">
            <el-row :gutter="15">
              <el-col :span="8">
                <el-form-item label="取件员" prop="pickerName" v-show='!isShowFlag'>
                  <el-input v-model="pickupObj.pickerName"></el-input>
                </el-form-item>
                <el-form-item label="取件员" prop="pickerName" v-show='isShowFlag'>
                  {{pickupObj.pickerName}}
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="联系电话" prop="pickerPhone" v-show='!isShowFlag'>
                  <el-input v-model="pickupObj.pickerPhone" :disabled="isShowFlag"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="pickerPhone" v-show='isShowFlag'>
                  {{pickupObj.pickerPhone}}
                </el-form-item>
              </el-col>
            </el-row>

            <div class="well">
              <el-row :gutter="15" style="margin-bottom: 15px;">
                <el-col :span="8">
                  <span>客户: </span>
                  <el-tag type="primary">{{pickupObj.adName}}</el-tag>
                </el-col>
                <el-col :span="8">
                  <span>电话: </span>
                  <el-tag type="gray">{{pickupObj.adPhone}}</el-tag>
                </el-col>
                <el-col :span="8">
                  <span>类型: </span>
                  <el-tag type="gray">{{pickupObj.pickupType == '0'?'退货取货':'换货取货'}}</el-tag>
                </el-col>
              </el-row>

              <el-row :gutter="15" style="margin-bottom: 15px;">
                <el-col :span="8">
                  <span>订单号: </span>
                  <el-tag type="gray">{{pickupObj.orderNo}}</el-tag>
                </el-col>
                <el-col :span="8">
                  <span>退订单申请号: </span>
                  <el-tag type="gray">{{pickupObj.backOrderNo}}</el-tag>
                </el-col>
                <el-col :span="8">
                  <span>打印时间: </span>
                  <el-tag type="gray">{{pickupObj.createdDtm | dateformat('yyyy-MM-dd')}}</el-tag>
                </el-col>
              </el-row>

              <el-row style="margin-bottom: 15px;">
                <el-col v-show='pickupObj.backOrderType == 3'>
                  <span>申请退款金额: </span>
                  <el-tag type="danger"> {{pickupObj.actualRefundAmount}}元 </el-tag>
                </el-col>
                <el-col>
                  <span>取件地址: </span>
                  <el-tag type="gray">{{pickupObj.strProvince}}{{pickupObj.strCity}}{{pickupObj.strArea}}{{pickupObj.strAddress || '无'}}</el-tag>
                </el-col>
              </el-row>


              <!-- <div class="_div-table">
                <div class="_div-table-row">
                  <div class="_div-table-cell" style="padding-right: 20px;">订单号：<el-tag type="gray">{{pickupObj.orderNo}}</el-tag></div>
                  <div class="_div-table-cell" style="padding-right: 20px;">退订单申请号：<el-tag type="gray">{{pickupObj.backOrderNo}}</el-tag></div>
                  <div class="_div-table-cell" style="padding-right: 20px;">类型：<el-tag type="gray">
                    {{pickupObj.pickupType == '0'?'退货取货':'换货取货'}}
                  </el-tag></div>
                </div>
              </div>
              <div class="_div-table" style="padding-top: 10px;">
                <div class="_div-table-row">
                 <div class="_div-table-cell" style="padding-right: 20px;">客户：<el-tag type="gray">
                  {{pickupObj.adName}}</el-tag></div>
                  <div class="_div-table-cell" style="padding-right: 20px;">电话：<el-tag type="gray">  {{pickupObj.adPhone}}</el-tag></div>
                  <div class="_div-table-cell" style="padding-right: 20px;">打印时间：<el-tag type="gray"> {{pickupObj.createdDtm}} </el-tag></div>
                </div>
              </div>
              <div class="_div-table" style="padding-top: 10px;">
                <div class="_div-table-row">
                  <div class="_div-table-cell" style="padding-right: 20px;">取件地址：<el-tag type="gray">{{pickupObj.strAddress || '无'}}</el-tag></div>
                </div>
              </div>
              <div class="_div-table" style="padding-top: 10px;">
                <div class="_div-table-row">

                </div>
              </div>
              <div class="_div-table" style="padding-top: 10px;" v-show='pickupObj.backOrderType == 3'>
                <div class="_div-table-row">
                  <div class="_div-table-cell" style="padding-right: 20px;">申请退款金额：<el-tag type="gray"> {{pickupObj.actualRefundAmount}}元 </el-tag></div>
                </div>
              </div> -->
            </div>
            <!-- table data -->
            <div class="_table-container">
              <div class="_table-list">
                <el-table
                  :data="goodListData"
                  selection-mode="multiple"
                  stripe
                  border>
                  <el-table-column align="center" type="index" width="70"></el-table-column>
                  <el-table-column align="center" property="goodsName" label="商品名称" min-width="400"> </el-table-column>
                  <el-table-column align="center" property="number" label="退换货数量" width="120">
                  </el-table-column>
                  <el-table-column align="center" property="unit" label="计件单位" width="100">
                  </el-table-column>
                  <el-table-column align="center" property="unitPrice" label="单价" width="90"></el-table-column>
                </el-table>
              </div>
            </div>
          </div>
        </card-panel>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" type="warning" v-show='!isShowFlag' @click.native.prevent="onSubmit">提交</el-button>
        <el-button size="small" type="default" v-show='!isShowFlag' @click.native.prevent="onCancel">取消</el-button>
        <el-button size="small" type="primary" v-show='isShowFlag' @click.native.prevent="onPrint">打印</el-button>
      </div>
    <el-dialog>
  </div>
  <!--endprint-->
</template>

<script>
  import { _getBackOrderItemList,_assignPicker,_printPickupRecord } from 'src/vuex/actions/backAction'
  import moment from "moment"
  import RegExr from "lib/utils/regexp"

  export default {
    props: {
      pickupObj: Object, default: () => { return {} },
    },
    computed:{

    },
    data() {
      return {
        pickupDetailDialog:false,

        pickupModel:{},
        rules: {
          pickerName: [
            { required: true, message: '请输入收件人', trigger: 'blur' },
            { type: 'string', min: 0, max: 50, message: '[收件人]长度不能超过50' }
          ],
          pickerPhone: [
            { type: 'string', required: true, pattern: RegExr.mobile, trigger: 'blur', message: '请输入正确的手机号码'}
          ],
        },
        isShowFlag:false,
        goodListData:[], // 退货商品信息
      }
    },
    methods: {
      loadTableData(){
        if(this.pickupObj.flag == 'detail'){
          this.isShowFlag = true ;
        }else{
          this.isShowFlag = false ;
        }
        //console.log(JSON.stringify(this.pickupObj));
        let params = {'backOrderId':this.pickupObj.backOrderId}
        _getBackOrderItemList(params).then(data => {
          const { success, result, msg } = data
          if (success) {
            //console.log(JSON.stringify(result))
            this.goodListData = result.mallBackOrderList ;
          }
        })
      },
      onSubmit() {
          this.$refs.pickupForm.validate((valid) => {
              if (valid) {
                  let params = {
                    backOrderId :this.pickupObj.backOrderId,
                    pickerName :this.pickupObj.pickerName,
                    pickerMobilePhone :this.pickupObj.pickerPhone,
                  }
                  _assignPicker(params).then(data => {
                    const { success, result, msg } = data
                    if (success) {
                      this.pickupDetailDialog = false ;
                      this.$message({type: 'success', message: '操作成功' });
                    }
                  })
              }else{
                 console.log('fail') ;
              }
          })
      },
      onCancel(){
        this.pickupDetailDialog = false ;
      },
      onPrint(){
        let params = {'backOrderId':this.pickupObj.backOrderId}
        let $printDiv = $(this.$el).find(".el-form").eq(0).clone().addClass("back-order-print")
        $("body").addClass("printing")

        _printPickupRecord(params).then(data => {
          const { success, result, msg } = data
          if (success) {
            console.log('打印成功')
            // document.body.removeChild(this.$el)
            $printDiv.remove()
            $("body").removeClass("printing")
          }
        })
        // var headstr = "<html><head><title></title></head><body>";
        // var footstr = "</body>";
        // var printData = this.$el.getElementById("dvData").outerHTML; //获得 div 里的所有 html 数据
        // var oldstr = document.body.innerHTML;
        // document.body.innerHTML = headstr+printData+footstr;
        // window.print();
        // document.body.innerHTML = oldstr;

        $printDiv.appendTo("body")
        window.print()
        console.log('print')
        return false;
      }
    }
  }
</script>

<style lang="sass">
  body .back-order-print {
    width: 860px;
  }

  body.printing #_app{
    // visibility: hidden;
    display: none;
  }
  body.printing #nprogress {
    display: none;
  }
</style>




