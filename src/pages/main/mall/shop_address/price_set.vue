<template>
  <div class="_container">
    <card-panel class="">
      <h3 slot="title">配送价格</h3>
      <div slot="panel-body">
        <citySelect :curProvince="curProvince" :curCity="curCity" :expressType="expressType"></citySelect>
        <div class="position-Return">
          <el-button @click.native.prevent="$emit('reback','addressList')">返回</el-button>
        </div>
      </div>
    </card-panel>
  </div>
</template>
<style lang="sass">
  .addAddress {
    padding-left: 70px;
  }
  .position-Return {
    position: relative;
    left: 628px;
    top: -65px;
  }
</style>
<script>
  import breadcrumb from "components/breadcrumb"
  import tabItems from "components/tab-items"
  /*import { _getMallShopList } from 'src/vuex/api/shopAPI'
  import { _deleteMallShop } from 'src/vuex/api/shopAPI'*/
  import citySelect from "./city_select"
  
  export default {
    props: {
        obj: {
            type: Object,
            default: {}
        }
    }, 
    components: {
      breadcrumb,
      tabItems,
      citySelect
    },
    data(){
      return {
        curProvince: '',
        curCity: '',
        expressType: 0
      }
    },
    vuex:{

    },
    methods:{
      
    },
    mounted(){

    },
    created(){
       this.curProvince = this.obj.province;
       this.curCity = this.obj.city;
       this.expressType = this.obj.expressType;
    }
  }
</script>
