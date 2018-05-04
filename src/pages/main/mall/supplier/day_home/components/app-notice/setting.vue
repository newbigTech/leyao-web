<template>
  <appSettingBox class="_app-notice">
    <div class="_row-flex">
      <label style="min-width: 40px;">标题: </label>
      <el-input :maxlength="6" size="small" class="_row-auto" v-model="obj.data.title"></el-input>
    </div>

<!--     <div class="_row-flex" v-if="!!obj.prop.bgColor">
      <label style="min-width: 40px;">背景: </label>
      <el-input type="color" class="_row-auto" size="small" v-model="obj.prop.bgColor"></el-input>
      <el-button style="margin-left: 5px;" size='small' @click="obj.prop.bgColor = defaultColor">重置</el-button>
    </div> -->
    <!-- <div class="_row-flex _app-notice-link-list">
      <label>链接: </label>
      <ul class="_row-auto">
        <li v-for="(item, index) in obj.data.list"><el-tag type="gray" :closable="true" @close="remove(index)">{{item.name}}</el-tag></li>
        <li><el-button size="small"  @click.native.prevent="onOpenDataDailog()">添加链接</el-button></li>
      </ul>
    </div> -->

    <div class="_row-flex _app-notice-link-list">
      <label style="min-width: 40px;">选项: </label>
      <ul class="_row-auto">
        <li v-for="(item, index) in obj.data.list">
          <el-tag v-show="item.title == null" type="gray" :closable="true" @close="remove(index)">{{item.name}}</el-tag>
          <div v-show="item.title != null">
            <div class="_row-flex">
              <label style="min-width: 40px;">标签: </label>
              <el-input size="small" class="_row-auto" v-model="item.title" :maxlength="64"></el-input>
            </div>
            <div class="_row-flex" style="margin-top: 5px;">
              <label style="min-width: 40px;">链接: </label>
              <el-input size="small" class="_row-auto" v-model="item.name" :disabled="true"></el-input>
            </div>
            <div class="_app-setting-remove-icon" @click.stop="remove(index)"><i class="el-icon-circle-close" style="background: #fff;"></i></div>
          </div>
        </li>
        <li><el-button size="small"  @click.native.prevent="onOpenDataDailog()">添加链接</el-button></li>
      </ul>
    </div>
    <div class="_row-flex">
      <label style="min-width: 40px;">方向: </label>
      <el-select v-model.number="obj.prop.direction" placeholder="请选择" size="small" style="width: 100%;">
        <el-option label="不滚动" :value="0"></el-option>
        <el-option label="自上而下" :value="1"></el-option>
        <el-option label="自下而上" :value="2"></el-option>
        <el-option label="从左到右" :value="3"></el-option>
        <el-option label="从右到左" :value="4"></el-option>
      </el-select>
    </div>
    <div class="_row-flex">
      <label style="min-width: 40px;">背景图片: </label>
      <div class="_app-slider-setting-img" style="width:350px;height: 50px;" @click="openShopFileDialog()">
          <img :src="cloudShowUrl + obj.prop.bgImg" v-show="obj.prop.bgImg" style="width:100%;height:100%;min-height: auto;max-width: auto;">
          <p>重新选择</p>
      </div>
    </div>
    <!-- dialogData config datasouce-->
    <dialog-data ref="dialogData" @onSuccess="onSuccess"></dialog-data>
    <!--商品图库Dialog-->
    <el-dialog title="图库" v-model="shopFileDialog" class="shop-img-file-dialog">
      <shop-file @onSuccess="getShopFile" ref="shopFileComm"></shop-file>
    </el-dialog>
  </appSettingBox>
</template>

<script>
  import ShopFile from 'pages/main/mall/common/components/shop_file'
  import appSettingBox from "../app-setting-box"
  import dialogData from '../dialog-data'
  export default {
    name: 'appNoticeSetting',
    props: { obj: { type: Object, default: () => { return {} } } },
    components: { appSettingBox,dialogData,ShopFile },
    data() {
      return {
        shopFileDialog:false,
        defaultColor: this.obj.prop.bgColor
      }
    },
    computed:{
      cloudShowUrl() {
            return this.$store.getters.cloudShowUrl
        }
    },
    methods: {
      openShopFileDialog() {
        this.shopFileDialog = true
        setTimeout(()=>{this.$refs.shopFileComm.onLoadData()},0)
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
              this.obj.prop.bgImg=shopFiles[0].fileMd5
            }
      },
      onOpenDataDailog(){
        this.$refs.dialogData.show()
      },
      onSuccess(data){
        //if (_.findIndex(this.obj.data.list, { 'name': data.name }) !== -1)return
        if (this.obj.data.list.length > 4) return
        let item={}
        item.id=data.id
        item.title = data.name
        item.name=data.name
        item.type=data.type //数据来源类型 0:商品 1:商品分组 2:专题 3:活动
        if(data.type==8){//自定义链接
          item.weburl=data.name
        }
        if(data.goodsSkuId){
          item.goodsSkuId=data.goodsSkuId
        }
        this.obj.data.list.push(item)
      },
      add() {
        if (this.obj.data.list.length > 4) return
        this.obj.data.list.push({
          id: '',
          type:0,//数据来源类型 0:商品 1:商品分组 2:专题 3:活动
          name: '链接--' + (Math.random() * 10).toFixed()
        })
      },
      remove(index) {
        this.obj.data.list.splice(index, 1)
      }
    },
    created() {
      this.defaultColor = this.obj.prop.bgColor || "#4ADA9E"
      console.log("appNoticeSetting: ", this.obj.prop.bgColor)
    }
  }
</script>

<style scoped>
  ._app-notice {

  }
  ._app-notice-link-list ul {
    padding-top: 3px;
  }
  ._app-notice-link-list ul > li {
    position: relative;
    width: 100%;
    margin-bottom: 7px;

    padding: 10px 8px;
    margin-bottom: 12px;
    border: 1px solid #ddd;
    background: #fff;
  }
  ._app-notice-link-list ul li:last-child button{
    width: 100%;
  }

  ._app-notice-link-list ul li .el-tag {
    display: block;
    position: relative;
    padding-right: 20px;
  }
  /* 这里如果加上scoped 样式无效 ? */
  /* ._app-notice-link-list ul li .el-icon-close {
    position: absolute;
    top: 2px;
    right: 2px;
  } */
</style>

<style>
  ._app-notice-link-list ul li .el-icon-close {
    position: absolute;
    top: 2px;
    right: 2px;
  }
</style>
