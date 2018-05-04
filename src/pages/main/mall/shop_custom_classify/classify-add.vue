<template>
  <div class="_container">
    <card-panel>
      <h3 slot="title">{{ !!this.obj.customClassifyId ? '编辑商品分组' : '新增商品分组'}}</h3>
      <div slot="panel-body">
        <!-- 添加商品分类 -->
        <el-form label-width="90px" :model="classify" :rules="rules" ref="classify" class="_addClassify">
          <el-form-item label="分类名称" prop="classifyName">
            <el-input v-model="classify.classifyName" :maxlength="20"></el-input>
          </el-form-item>
          <!-- <el-form-item label="分类全名">
            <el-input v-model="classify.classifyFullName" :maxlength="100"></el-input>
          </el-form-item> -->
          <el-form-item label="分组图片">

            <div class="_img-groups">
              <div class="_img-groups-container">
                <!-- 分组大图 -->
                <div class="_img-group">
                  <div class="_img-box" @click="openShopFileDialog(1)">
                    <div class="_img-box-icon"><i class="el-icon-upload"></i></div>
                    <div class="_img-box-text">选择/上传图片</div>
                    <div class="_img-box-view" v-show="!!classify.classifyPic && (classify.classifyPic.length > 1)">
                      <img :src="classifyPic">
                      <div class="_img-box-view-mask">
                        <!-- <span>更改图片</span> -->
                        <button class="btn btn-xs btn-warning">更换</button>
                        <button class="btn btn-xs btn-danger" @click.stop.prevent="classify.classifyPic='';classifyPic=''">移除</button>
                      </div>
                    </div>
                  </div>
                  <div class="_img-group-text">分组大图</div>
                </div>
                <!-- 分组小图 -->
                <div class="_img-group">
                  <div class="_img-box" @click="openShopFileDialog(2)">
                    <div class="_img-box-icon"><i class="el-icon-upload"></i></div>
                    <div class="_img-box-text">选择/上传图片</div>
                    <div class="_img-box-view" v-show="!!classify.classifySPic && (classify.classifySPic.length > 1)">
                      <img :src="classifySPic">
                      <div class="_img-box-view-mask">
                        <!-- <span>更改图片</span> -->
                        <button class="btn btn-xs btn-warning">更换</button>
                        <button class="btn btn-xs btn-danger" @click.stop.prevent="classify.classifySPic='';classifySPic=''">移除</button>
                      </div>
                    </div>
                  </div>
                  <div class="_img-group-text">分组小图</div>
                </div>
              </div>
              <!-- <div class="_img-groups-info"> <p>图片大小不能超过500kb,格式只能为jpg,png,gif</p> </div> -->
            </div>

          </el-form-item>
          <el-form-item label="排序" prop="sortIndex">
            <!-- <el-input v-model="classify.sortIndex" :maxlength="5"></el-input> -->
            <el-input-number :min="1" :max="10" v-model.number="classify.sortIndex" @change=""></el-input-number>
          </el-form-item>
          <el-form-item label="备注">
            <el-input v-model="classify.classifyNote" :maxlength="200" type="textarea"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click.native.prevent="save">保存</el-button>
            <el-button @click.native.prevent="$emit('reback', 'classify-list')">返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </card-panel>
    <!--商品图库Dialog-->
    <el-dialog title="商品图库" v-model="shopFileDialog" class="shop-img-file-dialog">
      <!-- <component is="ShopFile" @onSuccess=""></component> -->
      <shop-file @onSuccess="getShopFile" :vm="tab5vm"></shop-file>
    </el-dialog>
  </div>
</template>
<script>
  import ShopFile from 'pages/main/mall/common/components/shop_file'
  import {
    saveCustomClassify,
    getCustomClassifyByID
  } from 'src/vuex/actions/shopCustomClassifyAction'

  export default {
    components: {
     ShopFile,
   },
   props: {
    obj: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    cloudShowUrl() {
      return this.$store.getters.cloudShowUrl
    }
  },
  data() {
    return {
            // classify: {
            //   classifyName: "",
            //   classifyFullName: "",
            //   sortIndex: "",
            //   classifyNote: "",
            //   customClassifyId: undefined,
            // },
            classifyPic:'',
            classifySPic:'',
            shopFileDialog:false,
            curDailogIndex:1,
            tab5vm: new this.$root.constructor(),
            classify: Object.keys(this.obj).length > 0 ? this.obj : {
              classifyName: "",
              classifyFullName: "",
              classifyPic: '',
              classifySPic:'',
              sortIndex: 0,
              classifyNote: "",
            },
            errorMsg: '',
            rules: {
              classifyName: [{
                required: true,
                message: '请输入分类名称',
                trigger: 'blur'
              }],
              classifyFullName: [{
                required: true,
                message: '请输入分类全名',
                trigger: 'blur'
              }],
              sortIndex: [{
                required: true,
                type: "number",
                message: '请输入排序',
                trigger: 'blur'
              }]
            }
          }
        },
        methods: {
          save() {
            this.$refs.classify.validate((valid) => {
              if (valid) {
                saveCustomClassify(this.classify).then(data => {
                  const {
                    success,
                    result,
                    msg
                  } = data;
                  if (success) {
                            // 保存成功之后返回
                            this.$emit("reback", "classify-list")
                          }
                        })
              } else {
                console.log('error submit!!');
                return false;
              }
            })
          },
          openShopFileDialog(v) {
            this.curDailogIndex=v
            this.shopFileDialog = true
            this.tab5vm.$emit('on-load')
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
                this.classifyPic = this.cloudShowUrl + shopFiles[0].fileMd5
                this.classify.classifyPic = shopFiles[0].fileMd5
              }else{
                this.classifySPic = this.cloudShowUrl + shopFiles[0].fileMd5
                this.classify.classifySPic = shopFiles[0].fileMd5
              }   
            }
          },
        },
        created(){
          if(this.classify.customClassifyId){
            this.classifyPic=this.cloudShowUrl +this.classify.classifyPic
            this.classifySPic=this.cloudShowUrl +this.classify.classifySPic
          }
        }
      }
    </script>
    <style>
      ._addClassify {
        width: 450px;
      }
    </style>
