<template lang="html">
  <div class="">
    <!-- 导航面包屑 -->
    <div class="_breadcrumb">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/mall' }">商城</el-breadcrumb-item>
        <el-breadcrumb-item @click.native.prevent="curComponent = 'GoodsList' ">店铺商品</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <component :is="curComponent" :paramObj="paramObj" :rowData="goodsObj"  @forward="forward"></component>
  </div>
</template>

<script>
import {getMallShopObj} from 'actions/shopAction'
import GoodsErp from './components/goods_erp'
import GoodsList from './components/goods_list'
import GoodsForm from './components/goods_form'
import SetStock from '../goods_stock/set_stock'
import ParamsModel from './components/goods_form/params_model'
import OrderVoucher from 'pages/main/mall/shop/order_voucher/'
import UserEnshrine from 'pages/main/mall/shop/user_enshrine/'
import {
  getGoodsObj
}
from 'actions/goodsAction'
export default {
    name: 'goods_index',
    components: {
        GoodsList,GoodsForm,OrderVoucher,UserEnshrine,SetStock,GoodsErp
    },
    data() {
        return {
          goodsObj:{},
          curComponent:'GoodsList',
          paramObj: ParamsModel
        }
    },
    methods:{
      forward(comp,row){
        this.curComponent=comp
        this.goodsObj=row||{}
        if(comp=='GoodsForm'||comp=='GoodsErp'){
          this.paramObj.view=false
          if(this.goodsObj.goodsId){
            Object.assign(this.paramObj.goodsObj, this.goodsObj)
           var numargs = arguments.length
            if(numargs>2){
              if(_.isString(arguments[2])&&_.eq(arguments[2], 'view')){
                this.paramObj.view=true
              }
            }
          }else{
            this.paramObj.goodsObj={}
          }
          getGoodsObj(this.goodsObj).then(data => {
            //console.log('data=>', JSON.parse(JSON.stringify(data)));
            const {
              success,
              result
            } = data
            if (success) {
              this.paramObj.shopBrandList = result.brandList||[]
              this.paramObj.shopClassifyData = result.shopClassifyData||[]
              this.paramObj.shopCustomClassifyData = result.shopCustomClassifyData.result.rows||[]
              this.paramObj.shopGlobalSkuPropertyData = result.shopGlobalSkuPropertyData||[]
              if(this.goodsObj.goodsId) {
                this.paramObj.goodsObj.goodsPropertData = result.goodsPropertData||[]
                this.paramObj.shopClassifyPropertyData = result.shopClassifyPropertyData||[]
                let goodsPicFile=[]//商品图片列表
                let goodsDetailPicFile=[]//商品详情图片列表
                _.forEach(result.goodsFileData,(item)=>{
                  if(item.goodsFileType===0){
                    goodsPicFile.push(item)
                  }else if(item.goodsFileType===1){
                    goodsDetailPicFile.push(item)
                  }
                })
                this.paramObj.goodsObj.goodsFileData = goodsPicFile
                this.paramObj.goodsObj.goodsDetailFileData = goodsDetailPicFile
                if (parseInt(this.goodsObj.goodsType) === 2) { //组合商品
                  this.paramObj.goodsObj.goodsItemsData = result.goodsItemsData||[]
                }else{
                  this.paramObj.goodsObj.goodsItemsData=[]
                }
                if (parseInt(this.goodsObj.goodsType) === 1) { //sku商品
                  this.paramObj.goodsObj.goodsSkuData = result.goodSkuData||[]
                  this.paramObj.goodsObj.goodsSkuPropertyData = result.goodsSkuPropertyData||[]
                }else{
                  this.paramObj.goodsObj.goodsSkuData = []
                  this.paramObj.goodsObj.goodsSkuPropertyData = []
                }
              }else{
                this.paramObj.goodsObj.goodsPropertData = []
                this.paramObj.shopClassifyPropertyData = []
                this.paramObj.goodsObj.goodsFileData = []
                this.paramObj.goodsObj.goodsDetailFileData = []
                this.paramObj.goodsObj.goodsItemsData=[]
                this.paramObj.goodsObj.goodsSkuData = []
                this.paramObj.goodsObj.goodsSkuPropertyData = []
              }
              this.$store.getters.ev.$emit('onchangeData',this.paramObj)
              //ev.$emit('onchangeData',this.paramObj)
              //console.log('this.paramObj---',this.paramObj);
            }
          })
        }
      }
    },
    created(){
      getMallShopObj().then(data=>{
        if(data){
          this.paramObj.skuSoruceType=data.intVal2
        }
      })
    }
}

</script>
