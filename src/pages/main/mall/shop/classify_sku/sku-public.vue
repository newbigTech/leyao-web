<template>
  <div class="_sku-public">
    <sku-list :e="e"></sku-list>
  </div>
</template>

<script>
  import skuList from "./components/sku-list"
  export default {
    props: {
      e: {
        type: Object,
        default: () => {
          return {
            $emit: () => {},
            $on: () => {}
          }
        }
      },
    },
    components: { skuList },
    created() {
      // 父组件先创建 这里事件发射无效
      // this.e.$emit('sku-list')
      this.$nextTick(() => this.e.$emit('sku-list'))
      
      this.e.$on('skuPublic', () => this.e.$emit('sku-list'))
    }
  }
</script>
