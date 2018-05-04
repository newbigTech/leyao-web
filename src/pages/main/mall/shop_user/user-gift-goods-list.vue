<template>
    <!-- 商品列表 组件 -->
    <div class="_container">
        <el-dialog v-model="giftGoodsDialog" @open="loadTableData" size="small">
          <card-panel>
            <span slot="title">商品列表</span>
            <div slot="panel-table">
              <giftGoods @chooseGoods="chooseGoods"></giftGoods>
            </div>
          </card-panel>
        </el-dialog>
    </div>
</template>

<script>
  import giftGoods from "./giftGoods"


  export default {
    computed: {

    },
    components: {
      giftGoods
    },
    data() {
      return {
        giftGoodsDialog:false ,
      }
    },
    created(){

    },
    methods: {
        chooseGoods(row){
          this.giftGoodsDialog = false ; 
          this.$emit('onSuccess',row);
        },
        loadTableData(){

        },
    }
  }
</script>
