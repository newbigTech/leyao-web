<template>
  <div id="_app">
    <!-- top views -->
    <div class="_page-views">
      <router-view></router-view>
    </div>
    <!-- top components -->
    <div class="_page-components"></div>
  </div>
</template>
<script>
	export default{
		name:'MallApp',
		created(){
			this.$store.dispatch('initWebContext')
		}
	}
</script>
