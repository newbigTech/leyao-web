<template>
  <div class="">
    <div class="tab-components">
      <div class="order-tab" style="margin-top: 15px;">
        <el-tabs type="card" @tab-click="handleClick" @tab-remove="handleRemove" style="width: 100%;">
          <el-tab-pane label="待处理订单(N)">待处理订单(N)</el-tab-pane>
          <el-tab-pane label="历史订单(N)">
              <historyOrder></historyOrder>
          </el-tab-pane>
          <el-tab-pane label="发货清单">
            <orderList></orderList>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>
<style lang="sass">
  
</style>
<script>
  import breadcrumb from "components/breadcrumb"
  import tabItems from "components/tab-items"
  import historyOrder from "./history-order"
  import orderList from "./order-list"
  import _ from "lodash"
  import {findShopOrderList } from 'src/vuex/actions/mallShopOrderAction.js'
  import {dateFormat} from 'lib/utils/dateFormat.js'
  export default {
    components: {
      breadcrumb,
      tabItems,
      historyOrder,
      orderList
    },
    data(){
      return {
        
      }
    },
    computed: {
      
    },
    vuex:{
    },
    methods:{
      handleRemove(tab) {
        console.log(tab);
      },
      handleClick(tab, event) {
        //console.log(tab, event);
      },
      
    },
    mounted(){
    },
    created(){
    }
  }
</script>
