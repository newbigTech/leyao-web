<template lang="html">
  <div class="panel panel-default">
      <!-- Default panel contents -->
      <div class="panel-heading"></i>{{headerTitle}}</div>
      <div class="panel-body">
        <el-row>
          <el-col :span="12">
            <div class="grid-content bg-purple">
              <el-form :model="brandObj" :rules="rules" ref="brandObj" label-width="100px">
                  <el-form-item label="品牌名称" prop="brandName">
                      <el-input v-model="brandObj.brandName" :maxlength="20"></el-input>
                  </el-form-item>
                  <el-form-item label="品牌全称" prop="brandFullName">
                      <el-input v-model="brandObj.brandFullName" :maxlength="150"></el-input>
                  </el-form-item>
                  <el-form-item label="品牌简介" prop="brandNote">
                      <el-input type="textarea" v-model="brandObj.brandNote" :maxlength="500"></el-input>
                  </el-form-item>
                  <el-form-item label="排序">
                      <el-input-number v-model="brandObj.sortIndex" :min="1" :max="100" :maxlength="3"></el-input-number>
                  </el-form-item>

                  <el-form-item label="品牌图片">
                    <div class="_img-groups">
                      <div class="_img-groups-container">
                        <!-- 分组大图 -->
                        <div class="_img-group">
                          <div class="_img-box" @click="openShopFileDialog(1)">
                            <div class="_img-box-icon"><i class="el-icon-upload"></i></div>
                            <div class="_img-box-text">选择/上传图片</div>
                            <div class="_img-box-view" v-show="!!brandObj.brandPic && (brandObj.brandPic.length > 1)">
                              <img :src="cloudShowUrl+brandObj.brandPic">
                              <div class="_img-box-view-mask">
                                <!-- <span>更改图片</span> -->
                                <button class="btn btn-xs btn-warning">更换</button>
                                <button class="btn btn-xs btn-danger" @click.stop.prevent="brandObj.brandPic='';">移除</button>
                              </div>
                            </div>
                          </div>
                          <div class="_img-group-text">品牌大图</div>
                        </div>
                        <!-- 分组小图 -->
                        <div class="_img-group">
                          <div class="_img-box" @click="openShopFileDialog(2)">
                            <div class="_img-box-icon"><i class="el-icon-upload"></i></div>
                            <div class="_img-box-text">选择/上传图片</div>
                            <div class="_img-box-view" v-show="!!brandObj.brandSPic && (brandObj.brandSPic.length > 1)">
                              <img :src="cloudShowUrl+brandObj.brandSPic">
                              <div class="_img-box-view-mask">
                                <!-- <span>更改图片</span> -->
                                <button class="btn btn-xs btn-warning">更换</button>
                                <button class="btn btn-xs btn-danger" @click.stop.prevent="brandObj.brandSPic='';">移除</button>
                              </div>
                            </div>
                          </div>
                          <div class="_img-group-text">品牌小图</div>
                        </div>
                      </div>
              <!-- <div class="_img-groups-info"> <p>图片大小不能超过500kb,格式只能为jpg,png,gif</p> </div> -->
                  </div>
                  </el-form-item>


                  <!-- <el-form-item label="品牌小图片" prop="brandSPic">
                      <el-input type="hidden" v-model="brandObj.brandSPic"></el-input>
                      <el-upload action="/pub/pubController/uploadPic" :on-remove="onRemoveBrandSPic" :on-success="onSuccessBrandSPic" :accept="'image/*'" :multiple="false">
                          <img :src="brandSPic" style="width: 80px;height:80px;" />
                          <el-button size="small" type="primary">点击上传</el-button>
                          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                      </el-upload>
                  </el-form-item> -->

                  <el-form-item label="备注">
                      <el-input type="textarea" v-model="brandObj.comments" :maxlength="250"></el-input>
                  </el-form-item>
                  <el-form-item>
                      <el-button type="primary" @click.native.prevent="handleSubmit">保存</el-button>
                      <el-button @click.native.prevent="$emit('forward','BrandList')">返回</el-button>
                  </el-form-item>
              </el-form>
            </div>
          </el-col>
        </el-row>
      </div>
       <!--商品图库Dialog-->
   <el-dialog title="图库" v-model="shopFileDialog" class="shop-img-file-dialog">
      <shop-file @onSuccess="getShopFile" ref="shopFileComm"></shop-file>
   </el-dialog>
  </div>
</template>

<script>
import {saveCustomBrand } from 'src/vuex/actions/mallBrandAction'
import prettysize from "lib/utils/prettysize"
import ShopFile from 'pages/main/mall/common/components/shop_file'
export default {
  components:{ShopFile},
  props: {
    paramObj: {
      type: Object,
      default: {}
    }
  },
  computed: {
    cloudShowUrl() {
      return this.$store.getters.cloudShowUrl
    }
  },
  data() {
    return {
      shopFileDialog:false,
      curDailogIndex:1,
      headerTitle:'新增品牌信息',
      defaultPic: 'static/images/uploadPic.jpg',
      brandPic: 'static/images/uploadPic.jpg',
      brandSPic: 'static/images/uploadPic.jpg',
      brandObj: {
        brandId: undefined,
        brandName: '',
        brandFullName: '',
        brandNote: '',
        sortIndex: 1,
        brandPic: '',
        brandSPic: '',
        comments: ''
      },
      previewPic: "",
      previewPic2: "",
      loading: 0,
      loading2: 0,
      picMD5_0: '',
      picMD5_1: '',
      rules: {
        brandName: [{
          required: true,
          message: '请输入品牌名称',
          trigger: 'blur'
        }],
        brandFullName: [{
          required: true,
          message: '请选择品牌全称',
          trigger: 'blur'
        }],
        brandNote: [{
          required: true,
          message: '请填写品牌简介',
          trigger: 'blur'
        }],
        brandPic: [{
          required: true,
          message: '请上传品牌图片',
          trigger: 'blur'
        }],
        brandSPic: [{
          required: true,
          message: '请上传品牌小图片',
          trigger: 'blur'
        }]
      }
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.brandObj.validate((valid) => {
        if (valid) {
          saveCustomBrand(this.brandObj).then(data => {
            const { success, msg } = data
            if (success) {
              this.$message.success('操作成功')
              this.$emit('forward', 'BrandList')
            } else {
              this.$message.error(msg);
            }
          })
        } else {
          return false;
        }
      });
    },
    openShopFileDialog(v) {
            this.curDailogIndex=v
            this.shopFileDialog = true
            setTimeout(()=>{this.$refs.shopFileComm.onLoadData()},0)
            //this.tab5vm.$emit('on-load')
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
              if(this.curDailogIndex===1){
                //this.classifyPic = this.cloudShowUrl + shopFiles[0].fileMd5
                this.brandObj.brandPic = shopFiles[0].fileMd5
              }else{
                //this.classifySPic = this.cloudShowUrl + shopFiles[0].fileMd5
                this.brandObj.brandSPic = shopFiles[0].fileMd5
              }   
            }
      }
  },
  created() {
    if (this.paramObj.brandId) {
      this.headerTitle='修改品牌信息'
      this.brandObj = this.paramObj
      // if (this.paramObj.brandPic) {
      //   this.brandPic = this.cloudShowUrl + this.paramObj.brandPic
      // }
      // if (this.paramObj.brandSPic) {
      //   this.brandSPic = this.cloudShowUrl + this.paramObj.brandSPic
      // }
    }
    // console.log('paramObj',this.paramObj)
  }
}
</script>
