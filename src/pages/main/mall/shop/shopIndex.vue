<template>
    <div class="shop_custom_classify">
      <!-- 面包屑 -->
      <div class="_breadcrumb">
          <el-breadcrumb separator=">">
            <el-breadcrumb-item :to="{ path: '/mall' }">商城</el-breadcrumb-item>
            <el-breadcrumb-item>基础设置</el-breadcrumb-item>
            <el-breadcrumb-item>店铺基础设置</el-breadcrumb-item>
            <el-breadcrumb-item v-if="currentComponent === 'userModify'">店铺修改页面</el-breadcrumb-item>
          </el-breadcrumb>
      </div>
      <!-- <transition name="fade" mode="out-in" appear> -->
        <!-- <keep-alive> -->
          <component :is="currentComponent" :e="e"></component>
        <!-- </keep-alive> -->
      <!-- </transition> -->
    <!--遮罩层-->
    <div v-loading="loading" class="el-loading-demo"></div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import shopForm from "pages/main/mall/ec_setting/shop_management/components/shop-form"
import { _getMallShopByShopId } from 'api/shopAPI'

export default {
    name: 'mall_shop_basic',
    components: { shopForm },
    data() {
      return {
      	loading:false,//遮罩层
        currentComponent: '',
        e: {},
      }
    },
    computed:{
    	...mapGetters(['shopID','cloudShowUrl'])
    },
    methods: {
       
        loadShopDetail(){
	        
	        this.loading = true;
	        _getMallShopByShopId(this.shopID).then((data) => {
	        	this.loading = false;
	            const {success,result}=data;
	            //console.log(JSON.stringify(result))
	            if(success){
	                this.e.model = result.mallshopVo;
	                this.e.model.classifyStr = result.classifyStr;
	                this.e.isShopSet = true;
	                this.currentComponent = 'shopForm';
	            }
	        });
				},
    },
    created() {
     	 
       this.loadShopDetail();
    }
}
</script>
<style lang="sass">
</style>