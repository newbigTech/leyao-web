<template>
	<div class="_table-list">
   <el-table :data="tableData" border>
	  <el-table-column prop="goodsId" label="商品" align="center" inline-template min-width="250">
	      <div class="_goods-item-cell">
	          <div class="_goods-item-img"><img :src="cloudShowUrl + row.goodsPic"></div>
	          <div class="_goods-item-info">
	              <h3>{{row.goodsName}}</h3>
	              <h4>编码: {{row.goodsSn}}</h4>
	              <h5>
	              	<span>评论数: <span class="cSpn_enshrineNumber">{{row.voucherNumber}}</span></span>
	              	<span>关注数: <span class="cSpn_enshrineNumber">{{row.enshrineNumber}}</span></span>
	              </h5>
	          </div>
	      </div>
	  </el-table-column>
	  <el-table-column inline-template label="类型" align="center">
	      <div>
	          {{row.goodsType == 0 ? '单品' : (row.goodsType == 1?'规格商品':'组合商品')}}
	      </div>
	  </el-table-column>
	  <el-table-column inline-template label="库存类型" width="120" align="center">
	      <div>{{row.stockType == 0 ? '无限制' : (row.stockType == 1?'独立库存':(row.stockType == 2?'共享库存':'独立库存'))}}</div>
	  </el-table-column>
	  <el-table-column label="市场价/销售价（元）" inline-template align="center">
	      <div>{{row.mprice}} / {{row.price}}</div>
	  </el-table-column>
	  <el-table-column inline-template label="总销量/总库存" align="center" width="150">
	      <div>
	          <span v-if="row.goodsType==1&&row.stockType==3"> {{row.saleNumber}} / -</span>
	          <span v-else> {{row.saleNumber}} / {{row.stockType == 0 ? '-' : (row.goodsType == 2?'-':row.stockNumber)}} </span>
	      </div>
	  </el-table-column>
	  <el-table-column inline-template label="状态" align="center" width="120">
	      <div>{{row.statusCode == 0 ? '已下架' : '已上架'}}</div>
	  </el-table-column>
	 </el-table>
	</div>
  
</template>
<script>
  export default {
	  name: 'goods_detail_xx',
	  props: {
      paramObj: {
        type: Object,
        default: {}
      }
    },
	  computed: {
	    cloudShowUrl() {
      	return this.$store.getters.cloudShowUrl
      },
	  },
	  data() {
	    return {
        tableData:[this.paramObj],
	    }
	  },
	  methods: {
	  	
      //*******************************************
    
	  },
	  created() {
	  	
	  }
	}

</script>
