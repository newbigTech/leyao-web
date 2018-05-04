<template>
  <div class="_app-slider">
    <!-- default -->
    <div class="_app-slider-default" v-show="!obj.data.list.length">
      <!-- <img src="https://dummyimage.com/750x470/81d6fa/fff&text=+750x470"> -->
      <span class="_app-slider-size">750x470</span>
    </div>
    <div class="_app-slider-container" v-show="!!obj.data.list.length">
      <swiper :options="swiperOption">
        <swiper-slide v-for="(s, i) in obj.data.list">
          <a href="javascript:;"> <img :src="s.img !== '' ? (cloudShowUrl + s.img): '/static/images/default-750x470.png'"> </a>
        </swiper-slide>
        <div class="_swiper-pagination-container" slot="pagination">
          <div class="_swiper-pagination"></div>
        </div>
      </swiper>
    </div>
  </div>
</template>

<script>
  import { swiper, swiperSlide } from 'components/vue-swiper'
  export default {
    name: 'appSlider',
    components: {swiper, swiperSlide},
    props: { obj: { type: Object, default: () => { return {} } } },
    computed:{
      cloudShowUrl() {
        return this.$store.getters.cloudShowUrl
      }
    },
    data() {
      return {
        swiperOption: {
          loop: true,
          autoplay: 3500,
          autoplayDisableOnInteraction: false,
          pagination: '._swiper-pagination',
          autoHeight: false,
          height: 200,
          // observer: true,                       //修改swiper自己或子元素时，自动初始化swiper
          // observeParents: true,                 //修改swiper的父元素时，自动初始化swiper
        },
      }
    },
    created() {
      // console.log('appAds created')
    },
    mounted() {},
    updated() {},
    methods: {}
  }
</script>

<style scoped>
  ._app-slider-container {
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
  .swiper-slide {
    /*width: 750px;*/
    /*height: 200px;*/
    /*height: 154px;*/
  }
  .swiper-slide img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;

    width: 100%;
    height: 100%;
  }

  ._app-slider-default {
    height: 200px;
    background-color: #81D6FA;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  ._app-slider-size {
    font-size: 30px;
    color: #FF2B53;
  }

  ._app-slider-default img {
    width: auto;
    height: auto;
    max-width: 100%;
    max-height: 100%;
  }
</style>

<style>
  ._app-slider-container ._swiper-pagination {
    padding: 3px 1px;
    height: 10px;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 5px;
    display: flex;
  }
  ._app-slider-container .swiper-pagination-bullet {
    margin: 0 5px;
    width: 4px;
    height: 4px;
    text-indent: 99em;
    border-radius: 50%;
    background: #8c8c8c;
    overflow: hidden;
    opacity: 1;
  }
  ._app-slider-container .swiper-pagination-bullet-active {
    background: #fe6c9c;
  }

</style>
