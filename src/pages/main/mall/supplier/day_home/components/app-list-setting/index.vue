<template>
  <appSettingBox class="_app-list-setting">
    <div class="_row-flex">
      <label>商品来源: </label>
      <div class="_row-auto" style="padding-top: 5px;">
        <!-- <el-select size="small" v-model="obj.data.type">
          <el-option :value="0" label="商品"></el-option>
          <el-option :value="1" label="分组"></el-option>
          <el-option :value="2" label="活动"></el-option>
          <el-option :value="3" label="专题"></el-option>
        </el-select> -->
        <el-radio-group v-model.number="obj.data.type" @change="radioClear">
          <el-radio :label="0" v-if="obj.name == 'appListA'">商品</el-radio>
          <el-radio :label="1">分组</el-radio>
          <el-radio :label="2">专题</el-radio>
          <el-radio :label="3">活动</el-radio>
       </el-radio-group>

      </div>
    </div>

    <div class="_row-flex" v-show="obj.name != 'appListC'">
      <label>列表标题: </label>
      <el-input size='small' placeholder="标题最多不能超过10个字" class="_row-auto" v-model="obj.data.title" :maxlength="10"></el-input>
    </div>

    <div class="_row-flex" v-show="obj.name == 'appListB'">
      <label>标题位置: </label>
        <div class="_row-auto" style="padding-top: 5px;">
          <el-radio-group v-model="obj.prop.titleAlign">
            <el-radio :label="'left'">左</el-radio>
            <el-radio :label="'center'">中</el-radio>
          </el-radio-group>
        </div>
    </div>

    <div class="_row-flex" v-show="obj.name == 'appListC'">
      <label>列表图片: </label>
      <div class="_row-auto">
        <div class="_list-cover-img" @click="openShopFileDialog()">
          <img :src="obj.data.img && obj.data.img.length ? cloudShowUrl + obj.data.img : ''" v-show="obj.data.img">
          <p v-show="obj.data.img">点击更换图片</p>
          <i class="el-icon-plus" v-show="!obj.data.img"></i>
        </div>
      </div>
    </div>

    <!-- 商品来源 分组 -->
    <div class="_app-list-setting-group" v-show="obj.data.type != 0">
      <div class="_row-flex">
        <label>选择分组: </label>
        <el-input placeholder="请选择需要展示的商品分组" size="small" class="flex-item" :disabled="true" v-model="obj.data.name"></el-input>
        <el-button size="small" style="margin-left: 5px;" @click="onOpenDataDailog(1)">选择</el-button>
      </div>

      <div class="_row-flex">
        <label>显示个数: </label>
        <div class="_row-auto" style="padding-top: 3px;">
          <el-radio v-model="obj.data.showNumber" :label="3">3</el-radio>
          <el-radio v-model="obj.data.showNumber" :label="6">6</el-radio>
          <el-radio v-model="obj.data.showNumber" :label="9">9</el-radio>
          <el-radio v-model="obj.data.showNumber" :label="12">12</el-radio>
        </div>
      </div>
    </div>

    <!-- 商品来源 商品,活动,专题 -->
    <div class="_app-list-setting-goods" v-show="obj.data.type == 0 && obj.name == 'appListA'">
      <div class="_row-flex">
        <label>选择商品: </label>
        <div class="_row-auto">
          <ul>
            <draggable class="_app-drag-area" :list="obj.data.list">
            <li v-for="(item, index) in obj.data.list">
              <img :src="(item.goodsPic&&item.goodsPic.length > 1) ? (cloudShowUrl + item.goodsPic): 'https://dummyimage.com/100x100/81d6fa/fff&text=+'">
              <div class="_app-setting-remove-icon" @click="remove(index)"><i class="el-icon-circle-close"></i></div>
            </li>
            </draggable>
            <li @click="onOpenDataDailog(0)"> <i class="el-icon-plus"></i> </li>
          </ul>
        </div>
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
  import {getGoodsMapJson} from 'actions/goodsAction'
  import draggable from 'vuedraggable'
  export default {
    name: 'appListSetting',
    props: { obj: { type: Object, default: () => { return {} } } },
    components: { appSettingBox,dialogData,draggable, ShopFile },
    computed: {
        cloudShowUrl() {
            return this.$store.getters.cloudShowUrl
        }
    },
    data() {
      return {
        sflag: false,
        shopFileDialog: false,
      }
    },
    watch: {
      obj(n, o) {
        if (n.data.type != o.data.type) {
          this.sflag = true
        }
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
              this.obj.data.img = shopFiles[0].fileMd5
            }
      },
      onOpenDataDailog(v){
        //0:选择商品 1：选择分组
        if(this.obj.data.type===0){
          this.$refs.dialogData.show({first:true,second:false,third:false,fourth:false,defaultTabName:'first'})
        }else if(this.obj.data.type===1){
          this.$refs.dialogData.show({first:false,second:true,third:false,fourth:false,defaultTabName:'second'})
        }else if(this.obj.data.type===2){
          this.$refs.dialogData.show({first:false,second:false,third:true,fourth:false,defaultTabName:'third'})
        }else if(this.obj.data.type===3){
          this.$refs.dialogData.show({first:false,second:false,third:false,fourth:true,defaultTabName:'fourth'})
        }
      },
      onChangeDBSource(){
        // this.obj.data.name = ''
        // this.obj.data.id = ''

        // this.$set(this.obj.data,'name','')
        // this.$set(this.obj.data,'id','')
        // this.$nextTick(()=>{
        //    delete this.obj.data.id
        //    delete this.obj.data.name
        //    console.log('delete')
        // })
      },
      radioClear() {
        console.log("radio change...", this.sflag)
        // this.$nextTick(function() {
        //   this.sflag = false
        // })
        if (this.sflag) {
          this.sflag = false
          return
        }
        this.obj.data.name = ''
        this.obj.data.id = 0
        this.obj.data.list=[]
      },
      onSuccess(data){
        // if (_.findIndex(this.obj.data.list, { 'goodsId': data.id }) !== -1){
        //   if(data.goodsSkuId){
        //     if (_.findIndex(this.obj.data.list, { 'goodsSkuId': data.goodsSkuId }) !== -1)return false
        //   }else{
        //     return false
        //   }
        // }
        if(data.type===0){
          this.obj.data.id = 0
          this.obj.data.name = ''
          //let sign=data.sign
          // delete this.obj.data.id
          // delete this.obj.data.name
          // getGoodsMapJson({'goodsId':data.id}).then(d=>{
          //   //console.log('dfdfd',data)
          //   const {success,result}=d
          //   if(success){
          //     result['goodsName']=data.name
          //     result['activitySign']=sign
          //     result['price']=data.row.price
          //     if(data.goodsSkuId){
          //       result['goodsSkuId']=data.goodsSkuId
          //     }
          //     this.obj.data.list.push(result)
          //   }
          // })
          let result={
           'goodsId': data.id,
           'goodsName': data.name,
           'goodsDesc': data.row.goodsDesc,
           'mPrice': data.row.mprice,
           'price': data.row.price,
           'goodsPic': data.row.goodsPic,
           'activitySign':data.sign
          }
          if(data.goodsSkuId){
              result['goodsSkuId']=data.goodsSkuId
              result['goodsPic']=data.goodsObj.goodsPic
              result['goodsDesc']=data.goodsObj.goodsDesc
          }
          this.obj.data.list.push(result)
        }else{
          this.obj.data.list=[]
          this.obj.data.id = data.id
          this.obj.data.name = data.name
          // this.$set(this.obj.data,'name',data.name)
          // this.$set(this.obj.data,'id',data.id)
        }
      },
      add() {
        this.obj.data.list.push({
          id: 0,
          name: "哈哈哈哈😁",
          desc: "这是商品描述",
          mprice: "22.22",
          price: "33.33",
          img: "https://dummyimage.com/100x100/81d6fa/fff&text=+",
        })
      },
      remove(index) {
        this.obj.data.list.splice(index, 1)
      }
    }
  }
</script>

<style lang="sass" scoped>
  ._app-list-setting-goods {
    ul li {
      float: left;
      width: 55px;
      height: 55px;
      font-size: 20px;
      font-weight: 300;
      border-radius: 0;
      color: #ccc;
      border: 1px solid #ccc;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-right: 8px;
      margin-bottom: 8px;
      cursor: pointer;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      &:last-child:hover { color: #20A0FF; }
    }
  }
  ._list-cover-img {
    width: 250px;
    height: 120px;
    border: 1px solid #ccc;
    position: relative;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
    }
    p {
      position: absolute;
      top: 0; right: 0; left: 0; bottom: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(0,0,0,.4);
      color: #fff;
      visibility: hidden;
    }

    .el-icon-plus {
      display: block;
      font-size: 30px;
      width: 40px;
      height: 40px;
      line-height: 40px;
      position: absolute;
      top: 0; right: 0; left: 0; bottom: 0;
      margin: auto;
      text-align: center;
      color: #ccc;
    }
    &:hover {
      p { visibility: visible; }
      .el-icon-plus { color: #20A0FF; }
    }
  }
</style>
