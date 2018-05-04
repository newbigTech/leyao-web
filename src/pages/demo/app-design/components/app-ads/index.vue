<template>
  <div class="_app-ads">
    <!-- Slider main container -->
    <div class="_app-ads-container">
      <!-- Additional required wrapper -->
      <div class="swiper-wrapper">
        <!-- Slides -->
        <div class="swiper-slide" v-for="(s, i) in obj.data.list">
          <a href="javascript:;"> <img :src="s.picUrl"> </a>
        </div> 
      </div>
      <!-- If we need pagination -->
      <div class="_swiper-pagination-container">
        <div class="_swiper-pagination"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'appAds',
    props: { obj: { type: Object, default: () => { return {} } } },
    created() {
      // console.log('appAds created')
    },
    mounted() {
      // console.log('appAds mounted')
      let swiperContainer = this.$el.querySelector("._app-ads-container")
      let paginationContainer = this.$el.querySelector("._swiper-pagination")

      this.$nextTick(() => {
        let swiper = new Swiper(swiperContainer, {
          autoplay: false,
          autoHeight: false,
          autoplayDisableOnInteraction: false,
          loop: true,
          pagination: paginationContainer,
          paginationClickable: true
        })
      })
    }
  }
</script>

<style scoped>
  ._app-ads-container {
    width: 100%;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    z-index: 0;
    text-align: center; 
  }

  ._swiper-pagination-container {
    position: absolute;
    bottom: 5px;
    z-index: 100;
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 0 10px;
  }
  .swiper-slide img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
  }
</style>

<style>
  ._app-ads-container ._swiper-pagination {
    padding: 3px 1px;
    height: 10px;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 5px;
    display: flex;
  }
  ._app-ads-container .swiper-pagination-bullet {
    margin: 0 5px;
    width: 4px;
    height: 4px;
    text-indent: 99em;
    border-radius: 50%;
    background: #8c8c8c;
    overflow: hidden;
    opacity: 1;
  } 
  ._app-ads-container .swiper-pagination-bullet-active {
    background: #fe6c9c;
  }
  
</style>

