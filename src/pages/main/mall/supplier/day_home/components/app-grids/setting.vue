<template>
  <appSettingBox class="_app-grids-setting">
    <div class="_row-flex" v-show="0">
      <label>每行显示: </label>
      <div class="_row-auto" style="padding-top: 4px;">
        <el-radio :label="3"></el-radio>
        <el-radio :label="4"></el-radio>
        <el-radio :label="5"></el-radio>
      </div>
    </div>

    <ul class="_app-grids-setting-list">
      <draggable class="_app-drag-area" :list="obj.data.list">
        <li v-for="(item, index) in obj.data.list" class="_app-grids-setting-list-li">
          <div class="_app-grids-setting-item-icon" @click="openShopFileDialog(index)">
            <img :src="item.img !== '' ? (cloudShowUrl + item.img): 'static/images/default-90x90.png'">
            <p>重新选择</p>
          </div>
          <div class="_app-grids-setting-item-link">
            <div class="_row-flex" style="margin-bottom: 9px">
              <el-input placeholder="请输入导航名称,不能超过5个字" size="small" class="flex-item" style="margin-left: 5px;" :maxlength="5" v-model="item.name"></el-input>
            </div>
            <div class="_row-flex" style="margin-bottom: 0">
              <el-input placeholder="请选择导航链接" size="small" v-model="item.title" class="_row-auto" style="margin-left: 5px;" :disabled="true"></el-input>
              <el-button size="small" style="margin-left: 5px;" @click.native.prevent="onOpenDataDailog(index)">选择链接</el-button>
            </div>
          </div>
          <div class="_app-setting-remove-icon" @click.stop="remove(index)"><i class="el-icon-circle-close" style="background: #fff;"></i></div>
        </li>
      </draggable>
    </ul>

    <div class="flex">
      <!-- <el-button @click.native="add(1)" style="display: block; width: 100%; color: #20A0FF; margin-left: 10px; flex: 1;">添加充值有礼 <i class="el-icon-plus"></i> </el-button> -->
      <el-button @click.native="add(2)" style="display: block; width: 100%; color: #20A0FF; flex: 1;">添加导航入口 <i class="el-icon-plus"></i> </el-button>

    </div>
    <p style="color: #999; font-size: 12px; padding-top: 10px;">建议:使用90x90px,显示效果最好!</p>

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
  import draggable from 'vuedraggable'
  import ShopFile from 'pages/main/mall/common/components/shop_file'
  export default {
    name: 'appgridsSetting',
    props: { obj: { type: Object, default: () => { return {} } } },
    components: { appSettingBox,dialogData,draggable,ShopFile },
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
        //if (_.findIndex(this.obj.data.list, { 'id': data.id }) !== -1)return
          _.each(this.obj.data.list,(item,index)=>{
            if(index===this.selectIndex){
              item.id=data.id
              item.name=data.name
              item.title=data.name
              item.type=data.type
              if(data.type==8){//自定义链接
                item.weburl=data.name
                item.name='自定义链接'
              }else if(data.type==10){//自提购
                item.name='自提购'
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
      add(type) {

        this.obj.data.list.push({
          id: 0,
          name: "标题",
          type:0,//数据来源类型 0:商品 1:商品分组 2:专题 3:活动 4:充值有礼
          img: ""
        })

        //1:添加充值有礼 2：添加导航入口
        // if(type===1){
        //   this.obj.data.list.push({
        //   id: 0,
        //   name: "充值有礼",
        //   title: "充值有礼",
        //   type:4,//数据来源类型 0:商品 1:商品分组 2:专题 3:活动 4:充值有礼
        //   img: "",
        //   })
        // }else{
        //   this.obj.data.list.push({
        //   id: 0,
        //   name: "标题",
        //   type:0,//数据来源类型 0:商品 1:商品分组 2:专题 3:活动 4:充值有礼
        //   img: "",
        //   })
        // }
      },
      remove(index) {
        this.obj.data.list.splice(index, 1)
      }

    }
  }
</script>

<style lang="sass" scoped>
  ._app-grids-setting-list {

  }
  ._app-grids-setting-list  ._app-grids-setting-list-li {
    position: relative;
    display: flex;
    margin-bottom: 12px;
    padding: 10px 8px;
    margin-bottom: 12px;
    border: 1px solid #ddd;
    background: #fff;
    ._app-grids-setting-item-icon {
      position: relative;
      width: 71px;
      height: 71px;
      border: 1px solid #ccc;
      cursor: pointer;
      padding: 1px;
      img {
        width: 100%; height: 100%; display: block;
        // border-radius: 50%;
      }

      p {
        position: absolute;
        top: 0; left: 0; right: 0; bottom: 0;
        background-color: rgba(0,0,0,0.5);
        text-align: center;
        color: #fff;
        line-height: 70px;
        visibility: hidden;
        font-size: 12px;
      }
      &:hover p { visibility: visible; }
    }

    ._app-grids-setting-item-link {
      flex: 1;
    }

  }
</style>
