<template>
  <div>
    <el-radio-group v-model="couponsParam.couponsLimit" @change="clickCouponsLimit">
      <el-radio :label="0">全店铺优惠</el-radio>
      <el-radio :label="1">商品分类优惠</el-radio>
      <el-radio :label="2">商品优惠</el-radio>
    </el-radio-group>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        couponsParam: {
          couponsLimit: 1
        }
      }
    },
    methods: {
      clickCouponsLimit(val) {
        console.log(val)
      }
    }
  }
</script>
