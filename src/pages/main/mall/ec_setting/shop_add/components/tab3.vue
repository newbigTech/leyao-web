<template>
  <card-panel>
    <h3 slot="title">店铺配置</h3>
    <div slot="panel-btns">
      <!-- <el-button size="small" type="primary">保存</el-button> -->
    </div>
    <div slot="panel-body">
      <el-form :model="model" :rules="rules" ref="form" style="width: 500px;">
        <el-form-item label="店铺名称" label-width="110px" prop="shopName">
          <el-input placeholder="请输入店铺名称," v-model="model.shopName"></el-input>
        </el-form-item>
        <el-form-item label="运营商编码" label-width="110px" prop="supplierCode">
          <el-input placeholder="请输入运营商编码,字母开头,3位字符" v-model="model.supplierCode" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="店铺编码" label-width="110px" prop="shopCode">
          <el-input placeholder="请输入店铺编码,字母开头,4位字符" v-model="model.shopCode"></el-input>
        </el-form-item>
        <!-- <el-form-item label="是否自营" label-width="110px">
          <el-radio :label="1" v-model="model.isMyself">是</el-radio>
          <el-radio :label="0" v-model="model.isMyself">否</el-radio>
        </el-form-item> -->
        <!-- <el-form-item label="货到付款" label-width="110px">
          <el-radio :label="1" v-model="model.isCod">是</el-radio>
          <el-radio :label="0" v-model="model.isCod">否</el-radio>
        </el-form-item> -->
        <el-form-item label="开店状态" label-width="110px">
          <!-- <el-radio :label="0" v-model="model.statusCode">测试</el-radio> -->
          <el-radio :label="1" v-model="model.statusCode">开启</el-radio>
          <el-radio :label="2" v-model="model.statusCode">关闭</el-radio>
        </el-form-item>
        <!-- <el-form-item label="是否打包" label-width="110px">
          <el-radio :label="1" v-model="model.isPackStatus">是</el-radio>
          <el-radio :label="0" v-model="model.isPackStatus">否</el-radio>
        </el-form-item>
        <el-form-item label="订单流水长度" label-width="110px" prop="orderSD">
          <el-input placeholder="请输入订单流水长度" v-model="model.orderSD"></el-input>
        </el-form-item>
        <el-form-item label="库存预警提醒" label-width="110px" prop="stockWarn">
          <el-input placeholder="请设置库存提醒" v-model="model.stockWarn"></el-input>
        </el-form-item>
        <el-form-item label="满额免运费" label-width="110px" prop="shopFreePrice">
          <el-input placeholder="请输入免运费额度" v-model="model.shopFreePrice"></el-input>
        </el-form-item>
        <el-form-item label="店铺关键字" label-width="110px" prop="shopKeywords">
          <el-input placeholder="请输入关键字" v-model="model.shopKeywords"></el-input>
        </el-form-item>-->
        <!-- <card-panel>
              <h3 slot="title">设置关键字</h3>
              <div slot="panel-body">
                  <el-tag style="margin: 10px;" v-for="tag in signTags" :closable="true" type="success" @close="handleClose(tag)">
                     <span style="font-size: 20px">{{tag}}</span>
                  </el-tag>
                  <el-row class="well" v-show="showSignWell">
                      <el-col :span="16">
                          <el-form :inline="true" :rules="singRules" :model="signObj" ref="singForm" label-width="100px">
                              <el-form-item label="关键字" prop="signName">
                                  <el-input v-model="signObj.signName" :maxlength="20"></el-input>
                                  <div style="position: absolute;top:0;margin-left: 210px;width: 210px;">
                                      <el-button type="primary" @click.native.prevent="onSaveSignName()">添加</el-button>
                                  </div>
                              </el-form-item>
                          </el-form>
                      </el-col>
                  </el-row>
              </div>
        </card-panel> -->
        <el-form-item label-width="100px" label="设置关键字">
          <input-tag :tags="signTags" placeholder="设置关键字" class="_shop-keywords"></input-tag>
          <p>请按回车键输入关键字</p>
        </el-form-item>
        <el-form-item label="店铺描述" label-width="110px" prop="description">
          <el-input placeholder="请输入店铺描述" type="textarea" v-model="model.description"></el-input>
        </el-form-item>

        <el-form-item label="店铺LOGO" label-width="110px" reuqired>
          <div class="_classify-uploader">
            <el-upload
              action="/pub/pubController/uploadPic"
              type="select"
              :thumbnail-mode="false"
              :show-upload-list="false"
              :before-upload="uploadBefore"
              :on-success="uploadSuccess"
              :on-error="uploadError"
              class="_upload-select-mode">

              <div class="_upload-select">
                <div class="_upload-select-box" :class="{'_loading': uploading > 0}">
                  <div class="_upload-select-icon"><i class="el-icon-upload"></i></div>
                  <div class="_upload-select-text">点击上传店铺LOGO</div>
                  <div class="_upload-select-loading">
                    <div v-show="uploading == 1">上传中 <i class="el-icon-loading"></i></div>
                    <div v-show="uploading == 2" class="__upload-select-loading-error">上传失败,请重试...</div>
                  </div>
                  <div class="_upload-select-preview" v-show="!!model.shopFileMd5 && (model.shopFileMd5.length > 1)">
                    <!-- <img :src="this.previewPic ? this.previewPic : (cloudShowUrl + model.shopFileMd5)"> -->
                    <img :src="model.shopFileMd5 !== picMD5_0 ? ((cloudShowUrl + model.shopFileMd5)) : previewPic">
                    <div class="_upload-select-cover"> <span>点击更换LOGO</span> </div>
                  </div>
                </div>
              </div>
            </el-upload>
          </div>
        </el-form-item>
        <el-form-item label="在线客服组设置" label-width="110px" prop="strVal1">
          <el-input placeholder="请输入客服组设置," v-model="model.strVal1" style="width:80%"></el-input>
          <font color="red">[智齿客服]</font>
        </el-form-item>
        <el-form-item label="店铺数据来源" label-width="110px">
              <el-radio :label="0" v-model="model.intVal2">自建数据</el-radio>
              <el-radio :label="1" v-model="model.intVal2">ERP数据</el-radio>
        </el-form-item>
        <el-form-item label="apiKey" label-width="100px" v-show='model.intVal2 == 1'>
          <el-input placeholder="apiKey" v-model="erpKey"></el-input>
        </el-form-item>
        <el-form-item label="apiValue" label-width="100px" v-show='model.intVal2 == 1'>
          <el-input placeholder="apiValue" v-model="erpValue"></el-input>
        </el-form-item>           
        <el-form-item label-width="110px">
          <!-- <el-button type="warning" @click.native="reset">重置输入</el-button> -->
          <el-button type="primary" @click.native="$emit('back', '2')">上一步</el-button>
          <el-button type="warning" @click.native="next">下一步</el-button>
          <el-button type="danger" @click.native="$emit('back', '0')">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </card-panel>
</template>

<script>
  import InputTag from 'components/input-tag'
  import { _getMallShopList,_queryLySupplierVoById } from 'src/vuex/api/shopAPI'
  import prettysize from "lib/utils/prettysize"
  import RegExr from "lib/utils/regexp"
  export default {
    name: 'tabShopSetting',
    components: { InputTag },
    props: {
      model: Object, default: () => {},
      e: Object, default: () => { return { $on: () => {}, $emit: () => {} } },
    },
    computed: {
      cloudShowUrl() {
        return this.$store.getters.cloudShowUrl
      }
    },
    data() {

      return {
        signTags: [],
        showSignWell: true,
        signObj: {
            signName: '',
        },
        // model: this.e.model
        validatingStatus: false,

        // 图片上传
        previewPic: "",
        uploading: 0,
        picMD5_0: '',

        erpKey:'',
        erpValue:'',

        rules: {
          shopName: [
            { type: 'string', required: true, trigger: 'blur', message: '请输入店铺名称', },
            { type: 'string', min: 0, max: 30, message: '店铺长度不能超过30'},
          ],
          shopCode: [
            { type: 'string', required: true, pattern: /^[A-Z][A-Z0-9_]{3}$/, message: '店铺编码,字母必须大写,4位字符' },
            {
              validator: (rule, value, callback) => {
                _getMallShopList( {"code": value }).then((data) => {
                  const { success,result } = data
                  if (!success ) return callback(new Error('系统错误'))
                  result.total > 0 ? callback(new Error('编号已存在')) : callback()
                })
              }
            }
          ],
          supplierCode: [
            { type: 'string', required: true, pattern: /^[a-zA-Z][a-zA-Z0-9_]{2}$/, message: '运营商编码,字母开头,3位字符'},
          ],
          orderSD: [
            { type: 'string', required: true, pattern: /^([1-9]|10)$/ , message: "请输入订单流水长度,只能为1-10"}
          ],
          stockWarn: [
            { type: 'string', required: true, pattern: /^\d+$/ , message: "请输入库存提醒,只能为数字"}
          ],
          shopFreePrice: [
            { type: 'string', required: true, pattern: /^\d+$/ , message: "请输入免运费额度,只能为数字"}
          ],
          // shopKeywords: [
          //   { required: true, message: '请填写关键字', trigger: 'blur' },
          //   { type: 'string', max: 30, message: '关键字长度不能超过30' }
          // ],
          description: [
            { required: true, message: '请填写店铺简介', trigger: 'blur' }
          ],
          strVal1: [
            { type: 'string', min: 0, max: 100, message: '客服组设置不能超过100个字符'},
          ],

        },
        // singRules: {
        //     signName: [{
        //         required: true,
        //         message: '请输入商品标签',
        //         trigger: 'blur'
        //     }]
        // }
      }
    },
    methods: {
      next(){
        // 验证
        this.$refs.form.validate(valid => {
          if (!valid) {
            this.validatingStatus = false
            return false
          }
          // 标签
          // if(this.signTags.length <= 0){
          //   this.$message.warning('请添加标签') ;
          //   this.validatingStatus = false
          //   return false
          // }
          if(this.signTags.length>0){
              this.model.shopKeywords = this.signTags.join(',') ;
          }else{
              this.model.shopKeywords = '' ;
          }

          if(this.model.intVal2 == 1){
            if(this.erpKey == ''){
                this.$message.warning('数据来源key不能为空')
                return false
            }
            if(this.erpKey.length > 64){
                this.$message.warning('数据来源key不能超过64位')
                return false
            }
            if(this.erpValue == ''){
                this.$message.warning('数据来源value不能为空')
                return false
            }
            if(this.erpValue.length > 64){
                this.$message.warning('数据来源value不能超过64位')
                return false
            }
            this.model.strVal2 = this.erpKey+","+this.erpValue ;
          }
          

          // 验证通过
          this.validatingStatus = true
          this.$emit('next', '4')
          return true
        }) ;
      },

      // 图片上传
      uploadBefore(file) {
        console.log('file.size: ', prettysize(file.size))
        // 限制文件大小
        if (parseInt(prettysize(file.size)) > 500) {
          this.$message.error('LOGO不能超过500kb, 请重新上传!')
          return false
        }

        this.uploading = 1
        try {
          this.previewPic = URL.createObjectURL(file)
        } catch(err) {
          this.previewPic = false
          console.log('URL.createObjectURL', err)
        }
      },

      uploadSuccess(response, file, fileList) {
        if (response.success) {
          this.uploading = 0
          this.picMD5_0 = response.result.picMD5
          this.model.shopFileMd5 = response.result.picMD5
          this.model.shopFileName = file.name
        }
      },

      uploadError (err, response, file) {
        console.log(`${file.name}上传失败!`)
        this.uploading = 2
      },
      // 图片上传 end

      onSaveSignName() {
          if(this.signTags.length>4){
              this.$message.error("最多只允许添加5个标签")
              return false
          }
          this.$refs.singForm.validate((valid) => {
              if (valid) {
                  this.signTags.push(this.signObj.signName)
                  this.signObj.signName=''
              }
          })



      },
      handleClose(tag) {
          this.signTags.splice(this.signTags.indexOf(tag), 1);
          if(this.signTags.length>0){
              this.model.shopKeywords = this.signTags.join(',') ;
          }else{
              this.model.shopKeywords = '' ;
          }
      }
    },
    created() {
        _queryLySupplierVoById().then((data) => {
          const {success,msg,result}=data
          if(success) {
            this.model.supplierCode = result ;
          }else{
             console.log(msg)
          }
        })
    }
  }
</script>
