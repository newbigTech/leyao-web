<template>
  <appSettingBox class="_app-slider-setting">
    <ul class="_app-slider-setting-list">
      <li v-for="(item, index) in obj.data.list">
        <div class="_app-slider-setting-img" style="width:120px;" @click="openShopFileDialog(index)">
              <!-- <img :src="item.img !== '' ? (cloudShowUrl + item.img): 'https://dummyimage.com/750x360/81d6fa/fff&text=+'"> -->
              <img :src="cloudShowUrl + item.img" v-show="item.img">
              <span v-show="!item.img">750x470</span>
              <p>重新选择</p>
        </div>
        <div class="_add-slider-setting-link">
          <div class="_row-flex">
            <label style="min-width: 40px;">标题: </label>
            <el-input :maxlength="20" placeholder="广告标题最多20个文字" size="small" class="_row-auto" v-model="item.title"></el-input>
          </div>
          <div class="_row-flex" style="margin-bottom: 0;">
            <label style="min-width: 40px;">链接: </label>
            <div class="_row-auto">
              <el-tag type="primary" style="margin-bottom: 10px; width: 235px; height: 30px; line-height: 30px; font-size: 13px;overflow:hidden;text-overflow:ellipsis;" :close-transition="false" :hit="true">{{item.name}}</el-tag>
              <el-input size="small" :disabled="true" placeholder="请选择相应的链接" style="margin-bottom: 10px" v-show="false"></el-input>
              <el-button size="small" style="width: 100%; margin-top: 3px;" @click.native.prevent="onOpenDataDailog(index)">选择链接</el-button>
            </div>
          </div>
        </div>

        <div class="_app-setting-remove-icon" @click="remove(index)"><i class="el-icon-circle-close" style="background: #fff;"></i></div>
      </li>
    </ul>
    <el-button v-show="obj.data.list.length!=5" style="display: block; width: 100%; color: #20A0FF; margin-top: 5px;" @click="add">添加广告/图片 <i class="el-icon-plus"></i> </el-button>
    <p style="color: #999; font-size: 12px; padding-top: 10px;">建议:图片尺寸必须相同(750*470/750*320)!</p>

     <!-- dialogData config datasouce-->
    <dialog-data ref="dialogData" @onSuccess="onSuccess"></dialog-data>
    <!--商品图库Dialog-->
    <el-dialog title="图库" v-model="shopFileDialog" class="shop-img-file-dialog">
      <shop-file @onSuccess="getShopFile" ref="shopFileComm"></shop-file>
    </el-dialog>
  </appSettingBox>
</template>

<script>
  import appSettingBox from "../app-setting-box"
  import dialogData from '../dialog-data'
  import prettysize from "lib/utils/prettysize"
  import ShopFile from 'pages/main/mall/common/components/shop_file'
  export default {
    name: 'appSliderSetting',
    props: { obj: { type: Object, default: () => { return {} } } },
    components: { appSettingBox,dialogData,ShopFile},
    computed:{
      cloudShowUrl() {
            return this.$store.getters.cloudShowUrl
        }
    },
    data(){
      return {
        shopFileDialog:false,
        selectIndex:0
      }
    },
    methods: {
      openShopFileDialog(index) {
        this.selectIndex=index
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
              _.each(this.obj.data.list,(item,index)=>{
              if(index===_.toNumber(this.selectIndex)){
                item.img=shopFiles[0].fileMd5
                return false
                }
              })
            }
      },
      onOpenDataDailog(index){
        this.selectIndex=index
        this.$refs.dialogData.show()
      },
      getImgIndex(index){
        return {'index':index}
      },
      onSuccess(data){
        //console.log('aa',data)
        //if (_.findIndex(this.obj.data.list, { 'id': data.id }) !== -1)return
          _.each(this.obj.data.list,(item,index)=>{
            if(index===this.selectIndex){
              item.id=data.id
              item.name=data.name
              item.title=data.name
              item.type=data.type
              if(data.type==8){
                item.weburl=data.name
              }
              if(data.goodsSkuId){
                item.goodsSkuId=data.goodsSkuId
              }
              return false
            }
          })
      },
      uploadBefore(file) {
        // 限制文件大小 (大图标500kb一下)
        if (parseInt(prettysize(file.size)) > 500) {
          this.$message.error('大图标不能超过500kb, 请重新上传!')
          return false
        }
        try {
          //this.previewPic = URL.createObjectURL(file)
        } catch(err) {
          //this.previewPic = false
          console.log('URL.createObjectURL', err)
        }
      },
      uploadSuccess(response, file, fileList) {
        if (response.success) {
          _.each(this.obj.data.list,(item,index)=>{
            if(index===_.toNumber(response.result.index)){
              item.img=response.result.picMD5
              return false
            }
          })
        }
      },
      uploadError (err, response, file) {
        console.log(`${file.name}上传失败!`)
      },
      item() {
        return {
          id: 0,
          type:0,//数据来源类型 0:商品 1:商品分组 2:专题 3:活动
          name: "图片/广告标题",
          title:'',
          desc: "商品简短的描述",
          img: "",
          weburl:''//自定义链接
        }
      },

      add() {
        if (this.obj.data.list.length == 5) {
          return
        }
        this.obj.data.list.push(this.item())
      },
      remove(index) {
        this.obj.data.list.splice(index, 1);
      }
    }
  }
</script>

<style lang="sass">
  ._app-slider-setting-list {

  }
  ._app-slider-setting-list > li {
    position: relative;
    display: flex;
    padding: 10px;
    margin-bottom: 12px;
    border: 1px solid #ddd;
    background: #fff;
  }
  ._app-slider-setting-img {
    width: 120px;
    height: 120px;
    background: #81D6FA;
    position: relative;
    img {
      max-width: 120px;
      height: auto;
      min-height: 120px;
    }
    p {
      position: absolute;
      bottom: 0px;
      width: 100%;
      padding: 5px;
      text-align: center;
      background: rgba(0,0,0,.5);
      color: #fff;
      cursor: pointer;
    }
    span {
      position: absolute;
      display: block;
      text-align: center;
      color: #FF2B53;
      top: 40px;
      font-size: 20px;
      width: 120px;
    }
  }
  ._add-slider-setting-link {
    flex: 1;
  }
</style>
