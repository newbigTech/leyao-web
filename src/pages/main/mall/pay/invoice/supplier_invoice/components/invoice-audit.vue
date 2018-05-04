<template>
    <div class="_container">
        <card-panel class="" style="width:800px; margin-bottom: 10px;">
            <h3 slot="title">{{globleTitle}}</h3>
            <div slot="panel-btns">
              <el-button size="small" type="success" @click.native.prevent="$emit('reback','invoiceList',model)">发票记录</el-button>
            </div>
        </card-panel>
        <div>
          <el-form ref="invoiceForm" :model="invoiceModel" :rules="rules" label-width="100px">
              <el-card class="box-card" style="width:800px; margin-bottom: 10px;">
                <div slot="header" class="clearfix">
                  <span style="line-height: 36px;">发票信息</span>
                </div>
                <div class="text item">
                        <el-form-item label="开票金额" prop="serviceFeeCollectId">
                          <el-select v-model="invoiceModel.serviceFeeCollectId" placeholder="请选择开票金额" style="width:38%" :disabled="isMonthAndFeeFlag">
                            <el-option v-for="item in monthInvoiceList" 
                             :label="item.collectDateAndFee" :value="item.serviceFeeCollectId+''">
                            </el-option>
                          </el-select>
                        </el-form-item>   
                        <el-form-item label="发票类型" prop="invoiceType">
                          <el-select v-model="invoiceModel.invoiceType" placeholder="请选择发票类型"
                            style="width:38%" :disabled="isEditFlag">
                            <el-option label="普通发票" value="NORMAL"></el-option>
                            <el-option label="增值税发票" value="VAT"></el-option>
                          </el-select>
                        </el-form-item> 
                        <el-form-item label="发票内容" style="width:50%">
                          <el-input v-model="invoiceModel.invoiceContent" :disabled="true"></el-input>
                        </el-form-item>      
                        <el-form-item label="发票抬头" prop="invoiceTitle" style="width:50%">
                          <el-input v-model="invoiceModel.invoiceTitle" :disabled="isEditFlag"></el-input>
                        </el-form-item>    
                        <el-form-item label="税号" style="width:50%" v-show='false'>
                          <!-- <el-input v-model="invoiceModel.taxNo"></el-input> -->
                        </el-form-item> 
                        <el-form-item label="状态" style="width:50%" v-show='false'>
                          <!-- <el-input v-model="invoiceModel.statusCode"></el-input> -->
                        </el-form-item>
                      
                </div>
              </el-card>
              <el-card class="box-card" style="width:800px;">
                <div slot="header" class="clearfix">
                  <span style="line-height: 36px;">邮寄信息</span>
                </div>
                <div class="text item">
                      <el-form-item label="收件人" prop="receiverName" style="width:50%">
                          <el-input v-model="invoiceModel.receiverName" :disabled="isEditFlag"></el-input>
                      </el-form-item>
                      <el-form-item label="联系电话" prop="mobilePhone" style="width:50%">
                          <el-input v-model="invoiceModel.mobilePhone" :disabled="isEditFlag"></el-input>
                      </el-form-item> 
                      <el-form-item label="所在地区" style="width:70%" prop="cityArea" required>
                         <el-row :gutter="12" type="flex" justify="start">
                          <el-col :span="8">
                            <el-select v-model="pid" :span="6" @change="pchange" :disabled="isEditFlag">
                              <el-option v-for="p in cityData" :label="p ? p.text : ''" :value="p && p.id" :key="p && p.id"></el-option>
                            </el-select>
                          </el-col>
                          <el-col :span="8">
                            <el-select v-model="cid" :span="6" @change="cchange" :disabled="isEditFlag">
                              <el-option v-for="c in cs" :label="c ? c.text : ''" :value="c && c.id" :key="c && c.id"></el-option>
                            </el-select>
                          </el-col>
                          <el-col :span="8">
                            <el-select v-model="did" :span="6" @change="dchange" :disabled="isEditFlag">
                              <el-option v-for="d in ds" :label="d ? d.text : ''" :value="d && d.id" :key="d && d.id"></el-option>
                            </el-select>
                          </el-col>
                        </el-row>                         
                      </el-form-item>  
                      <el-form-item label="详细地址" prop="fullAddress" style="width:70%">
                          <el-input v-model="invoiceModel.fullAddress" :disabled="isEditFlag"></el-input>
                      </el-form-item> 
                      <el-form-item>
                          <el-button v-if="str=='detail'"
                            @click.native.prevent="$emit('reback','invoiceList',model)" type="primary">返回</el-button>
                          <el-button v-if="str=='insert' || str=='edit' || str=='audit'"
                            @click.native.prevent="handleSubmit" type="primary">提交审核</el-button>
                          <el-button v-if="(str=='insert' || str=='edit') && (model.statusCode != 'REJECT')"
                            @click.native.prevent="handleApplySubmit" type="primary">存稿</el-button>
                      </el-form-item>                                                             
                </div>
              </el-card>
            </el-form>
        </div>
    </div>
</template>


<script>
  import RegExr from "lib/utils/regexp"
  import { dateFormat as _dateFormat } from "lib/utils/dateFormat"
  import { _getCanApplyMonthInvoice,_submitInvoiceApply,_saveInvoiceApply } from 'src/vuex/actions/payInvoiceAction'
  import moment from "moment"

  export default {
    name:'invoidce-audit',
    components: {

    },
    props: {
      model: Object, default: () => {},
      str:String,default:() => "",
    },
    computed: {
      cs() {
        return (_.find(this.cityData, {id: this.pid}) || {}).children || [{}]
      },
      ds() {
        return (_.find(this.cs, {id: this.cid}) || {}).children || [{'id': 0, 'text': '无数据'}]
      },      
    },
    data() {
      return {
        cityData: [],
        globleTitle:"",//名称
        isEditFlag:false,//是否可编辑 默认可以编辑
        isMonthAndFeeFlag:false ,// 开票月份和金额 是否可以编辑
        monthInvoiceList:[],
        pid: '',
        cid: '',
        did: '',
        invoiceModel:{
          serviceFeeCollectId:'',
          invoiceType:'',
          invoiceContent:'平台使用费',
          receiverName:'',
          mobilePhone:'',
          fullAddress:'',

          provinceCode:'', // 省
          cityCode:'', // 市
          regionCode:'', // 区
        },
        rules: {
          serviceFeeCollectId: [
            { required: true, message: '请选择开票金额', trigger: 'change' }
          ],
          invoiceType: [
            { required: true, message: '请选择发票类型', trigger: 'change' }
          ],          
          invoiceTitle:[
            { required: true, message: '请输入发票抬头', trigger: 'blur' },
            { type: 'string', min: 0, max: 50, message: '[发票抬头]长度不能超过50' }
          ],         
          receiverName: [
            { required: true, message: '请输入收件人', trigger: 'blur' },
            { type: 'string', min: 0, max: 50, message: '[收件人]长度不能超过50' }
          ],
          mobilePhone: [
            { type: 'string', required: true, pattern: RegExr.mobile, trigger: 'blur', message: '请输入正确的手机号码'}
          ],
          fullAddress: [
            { type: 'string',required: true, message: '请输入详细地址', trigger: 'blur' },
          ],
          cityArea: [{
            validator: (rule, value, callback, source, options) => {
              if (!this.pid) return callback(new Error("请选择所在地区"))
              callback()
            }
          }]
        },

      }
    },
    created(){
      this.loadSelectData() ;

      // 异步加载地区选择列表
      require.ensure([], ()=> {
        this.cityData = require('assets/cityforaddress.json')
        //console.log(this.cityData)
      });
    },
    methods: {
      loadSelectData() {
        if(this.str == 'detail'){
          this.invoiceModel = this.model ;
          this.invoiceModel.serviceFeeCollectId = this.model.serviceFeeCollectId+"" ;
          this.pid = this.invoiceModel.provinceCode ;
          this.cid = this.invoiceModel.cityCode ;
          this.did = this.invoiceModel.regionCode ;
          this.globleTitle = "发票详情"
          this.isEditFlag = true ;
        }else if(this.str == 'insert'){
          this.globleTitle = "发票审核"
        }else if(this.str == 'edit' || this.str == 'audit'){
          this.invoiceModel = this.model ;
          this.invoiceModel.serviceFeeCollectId = this.model.serviceFeeCollectId+"" ;
          this.pid = this.invoiceModel.provinceCode ;
          this.cid = this.invoiceModel.cityCode ;
          this.did = this.invoiceModel.regionCode ;          
          this.globleTitle = "发票审核"
        }
        this.getMonthInvoice() ;
      },  
      getMonthInvoice(){
        _getCanApplyMonthInvoice().then(data => {
          //console.log(JSON.stringify(data))
          const { success, result, msg } = data
          if (success) {
            this.monthInvoiceList = result ;
            this.monthInvoiceList.forEach((item) => {
                item.collectDateAndFee = item.serviceFee+
                "元 ("+moment(item.collectDate).format('YYYY年MM月DD日')+")";
            });
            if(this.str != 'insert'){
              this.isMonthAndFeeFlag = true ;
              //console.log(JSON.stringify(this.model.monthDate))
              let _collectDateAndFee = this.model.serviceFee +"元 ("+moment(this.model.monthDate).format('YYYY年MM月DD日')+")";
              this.monthInvoiceList.push({'collectDateAndFee':_collectDateAndFee,
                'serviceFeeCollectId':this.model.serviceFeeCollectId+"",
                'serviceFee':this.model.serviceFee})              
            }

          }
        })
      },
      handleSubmit(){
        this.$refs.invoiceForm.validate((valid) => {
            if (valid) {
              this.monthInvoiceList.forEach((item) => {
                 if(item.serviceFeeCollectId == this.invoiceModel.serviceFeeCollectId){
                    this.invoiceModel.serviceFee = item.serviceFee ;
                    this.invoiceModel.monthDate = moment(item.collectDate).format('YYYY-MM-DD') ;
                 }
              });
              //给地区赋值
              this.invoiceModel.provinceCode = this.pid ;
              this.invoiceModel.cityCode = this.cid ;
              this.invoiceModel.regionCode = this.did ;
              this.invoiceModel.provinceName = _.find(this.cityData, {id: this.pid}).text ;
              this.invoiceModel.cityName = _.find(this.cs, {id: this.cid}).text ;
              this.invoiceModel.regionName = _.find(this.ds, {id: this.did}).text ;
              //console.log(JSON.stringify(this.invoiceModel)); return ;
              _submitInvoiceApply(this.invoiceModel).then((data) => {
                  const {success, msg} = data;
                  if(success) {
                    this.$message({message: '操作成功', type: 'success'});
                    // 保存成功之后返回
                    this.$emit("reback", "invoiceList", this.invoiceModel);
                  } else {
                      this.$message.error('错了哦，'+msg);
                      console.log(msg)
                  }
                });              
            }else{
              console.log('fail') ;
            }
        })
      },
      handleApplySubmit(){
        this.$refs.invoiceForm.validate((valid) => {
            if (valid) {
              this.monthInvoiceList.forEach((item) => {
                 if(item.serviceFeeCollectId == this.invoiceModel.serviceFeeCollectId){
                    this.invoiceModel.serviceFee = item.serviceFee ;
                    this.invoiceModel.monthDate = moment(item.collectDate).format('YYYY-MM-DD') ;
                 }
              });
              //给地区赋值
              this.invoiceModel.provinceCode = this.pid ;
              this.invoiceModel.cityCode = this.cid ;
              this.invoiceModel.regionCode = this.did ;
              this.invoiceModel.provinceName = _.find(this.cityData, {id: this.pid}).text ;
              this.invoiceModel.cityName = _.find(this.cs, {id: this.cid}).text ;
              this.invoiceModel.regionName = _.find(this.ds, {id: this.did}).text ;
              //console.log(JSON.stringify(this.invoiceModel)); return ;
              _saveInvoiceApply(this.invoiceModel).then((data) => {
                  const {success, msg} = data;
                  if(success) {
                    this.$message({message: '操作成功', type: 'success'});
                    // 保存成功之后返回
                    this.$emit("reback", "invoiceList", this.invoiceModel);
                  } else {
                      this.$message.error('错了哦，'+msg);
                      console.log(msg)
                  }
                });              
            }else{
              console.log('fail') ;
            }
        })
      },      
      handleSizeChange(val) {
        this.pageSize = val
        this.searchTableList()
      },
      handleCurrentChange(val) {
        this.page = val
        this.searchTableList()
      },
      pchange(val) {
        if (!this.pid) return
        this.cid = this.cs[0]['id']
        this.did = this.ds[0]['id']
        //console.log(_.find(this.cityData, {id: val}).text)
      },
      cchange(val) {
        if (!this.pid) return
        this.did = this.ds[0]['id']
      },
      dchange(val) {
        if (!this.pid) return
        //console.log(this.pid, this.cid, this.did, val)
      },
    }
  }
</script>