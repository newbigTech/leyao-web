<template>
    <!-- 商品列表 组件 -->
    <div class="_container">
        <el-dialog3 v-model="goodsDialog" @open="loadTableData" @close="goodsDialog = false" size="large">
          <card-panel>
            <span slot="title">商品列表</span>
            <div slot="panel-table">
              <spuGoodsForGoods @chooseGoods="chooseGoods"></spuGoodsForGoods>
            </div>
          </card-panel>
        </el-dialog3>
    </div>
</template>

<script>
  import elDialog3 from "components/el-dialog3"
  import spuGoodsForGoods from "../coupon/spuGoodsForGoods"


  export default {
    computed: {

    },
    components: {
      spuGoodsForGoods, elDialog3
    },
    data() {
      return {
        goodsDialog:false ,
        goodsObj:{}
      }
    },
    created(){

    },
    methods: {
        chooseGoods(row){
          //console.log(JSON.stringify(row)) ;
          let goodsSkuName = row.goodsSkuName
          //console.log(goodsSkuName) ;
          if(goodsSkuName){
            this.goodsObj.goodsName = row.goodsSkuName ;
          }else{
            this.goodsObj.goodsName = row.goodsName ;
          }
          this.goodsObj.goodsId = row.goodsId ;
          this.goodsDialog = false ;
          this.$emit('onSuccess',this.goodsObj);
        },

        loadTableData(){

        },
    }
  }
</script>
