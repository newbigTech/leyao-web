<template>
  <div class="_shop-management"> 
    <div class="_shop-form _container">
      <card-panel style="margin-bottom: 0;" class="_normal">
        <h3 slot="title">店铺商品</h3>
        <div slot="panel-btns"> 
          <el-button size="small" type="success" @click.native="reback">返回店铺列表</el-button> 
        </div>
        <div slot="panel-body">
          <goods-list :targetShopId="targetShopId" :e="e"></goods-list>
        </div>
      </card-panel>
    </div>
  </div>
 
</template>

<script>
  import GoodsList from 'pages/main/mall/shop/goods/components/goods_list'


  export default {
    name: 'shopGoodsList',
    components: { GoodsList},
    props: {
      e: Object, default: () => { return { $on: () => {}, $emit: () => {} } },
    },
    data() {
      return {
        tabIndex: '1',
        targetShopId:'',
        model: {} 
      }
    },
    methods: {
      tabClick(tab) {
        // console.log(tab.index)
      },
      reback() {
        this.e.$emit('forward', 'shopList')
      }
    },
    created() {
      // console.log(this.e.model)
      if (this.e.model.shopId !== undefined) { 
        this.model = this.e.model
        this.targetShopId = this.e.model.shopId;
      }

      
    }
  }
</script>
