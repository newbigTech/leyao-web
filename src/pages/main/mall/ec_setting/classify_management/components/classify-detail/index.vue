<template>
  <div class="_commodity-detail _container">
    <card-panel>
      <h3 slot="title">{{title}}</h3>
      <div slot="panel-btns">
       <!--  <button class="btn btn-sm btn-danger">编辑</button> -->
      </div>
      <div slot="panel-body">
        <el-form :model="model" label-width="80px" style="width: 500px;">
          <el-form-item label="分类名称" >
            <el-input v-model="model.classifyName"></el-input>
          </el-form-item>
          <el-form-item label="分类全名">
            <el-input v-model="model.classifyFullName"></el-input>
          </el-form-item>
          <!-- <el-form-item label="父级分类"> -->
            <!-- 查看 -->
            <!-- <el-input v-show="!!model.classifyId" v-model="model.parentName" :disabled="true"></el-input> -->

            <!-- 新增分类显示 -->
            <!-- <el-select v-show="!model.classifyId" v-model="model.parentId" :disabled="treeLength == 0" @change="changeClassifyId">
              <el-option :label="model.parentName" :value="pid"> </el-option>
              <el-option label="顶级分类" :value="0"> </el-option>
            </el-select> -->

          <!-- </el-form-item> -->
          <el-form-item label="分类排序">
            <el-input-number :min="1" :max="10" v-model="model.sortIndex" @change=""></el-input-number>
          </el-form-item>
          <el-form-item label="分类备注">
            <el-input type="textarea" v-model="model.classifyNote"></el-input>
          </el-form-item>
          <el-form-item label="状态">
            <el-radio-group v-model="model.statusCode">
              <el-radio :label="0">有效</el-radio>
              <el-radio :label="1">无效</el-radio>
            </el-radio-group>
          </el-form-item>

          <el-form-item label="分类图标">
            <div class="_img-groups">
              <div class="_img-groups-container">
                <!-- 分组大图 -->
                <div class="_img-group">
                  <div class="_img-box" @click="openShopFileDialog(1)">
                    <div class="_img-box-icon"><i class="el-icon-upload"></i></div>
                    <div class="_img-box-text">选择/上传图片</div>
                    <div class="_img-box-view" v-show="!!model.classifyPic && (model.classifyPic.length > 1)">
                      <img :src="cloudShowUrl+model.classifyPic">
                      <div class="_img-box-view-mask">
                        <!-- <span>更改图片</span> -->
                        <button class="btn btn-xs btn-warning">更换</button>
                        <button class="btn btn-xs btn-danger" @click.stop.prevent="model.classifyPic='';">移除</button>
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
                    <div class="_img-box-view" v-show="!!model.classifySPic && (model.classifySPic.length > 1)">
                      <img :src="cloudShowUrl+model.classifySPic">
                      <div class="_img-box-view-mask">
                        <!-- <span>更改图片</span> -->
                        <button class="btn btn-xs btn-warning">更换</button>
                        <button class="btn btn-xs btn-danger" @click.stop.prevent="model.classifySPic='';">移除</button>
                      </div>
                    </div>
                  </div>
                  <div class="_img-group-text">分组小图</div>
                </div>
              </div>
              <!-- <div class="_img-groups-info"> <p>图片大小不能超过500kb,格式只能为jpg,png,gif</p> </div> -->
            </div>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click.native="save">保存</el-button>
            <!-- 新增分类显示 -->
            <el-button v-show="!model.classifyId" @click.native="$emit('reback')">返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </card-panel>

    <!--商品图库Dialog-->
   <el-dialog title="图库" v-model="shopFileDialog" class="shop-img-file-dialog">
      <shop-file @onSuccess="getShopFile" ref="shopFileComm"></shop-file>
   </el-dialog>
  </div>
</template>

<script>
  import cardPanel from "components/card-panel"
  import prettysize from "lib/utils/prettysize"
  import ShopFile from 'pages/main/mall/common/components/shop_file'
  export default {
    components: { cardPanel,ShopFile },
    props: {
      e: {
        type: Object,
        default: () => {
          return {
            $emit: () => {},
            $on: () => {}
          }
        }
      },
      model: {
        type: Object,
        default: () => {}
      },
      title: {
        type: String,
        default: () => {}
      },
      treeLength: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        curDailogIndex:1,
        previewPic: "",
        previewPic2: "",
        loading: 0,
        loading2: 0,
        picMD5_0: '',
        picMD5_1: '',
        pid: -1,
        shopFileDialog:false
      }
    },
    computed: {
      cloudShowUrl() {
        return this.$store.getters.cloudShowUrl
      }
    },
    methods: {
      save() { 
        // 保存前需要通过表单验证
        if (this.model.classifyName.length == 0 ) return this.$message.warning('分类名不能为空')
        this.$emit('save', this.model)
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
                this.model.classifyPic = shopFiles[0].fileMd5
              }else{
                //this.classifySPic = this.cloudShowUrl + shopFiles[0].fileMd5
                this.model.classifySPic = shopFiles[0].fileMd5
              }   
            }
      },
      changeClassifyId(val) {
        // console.log(val)
        // 不需要二级分类
        this.model.parentId = 0
        if (val != 0) {
          this.pid = val
        }
      }
    },
    created() {
    }
  }
</script>

<style lang="sass">
  .panel-body .flex-vc { min-height: 36px; }
  .panel-body .flex-vc ._label { margin-right: 5px;  }  
</style>
