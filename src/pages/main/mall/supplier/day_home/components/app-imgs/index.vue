<template>
  <div class="_app-imgs">
    <!-- default -->
    <a href="#" class="_default-img" v-show="!obj.data.list.length">请添加图片</a>

    <div class="_item-img-list">
      <a href="#" v-for="(s, i) in obj.data.list" class="_item-img">
        <span v-show="!s.img" class="_placeholder-span"></span>
        <img :src="cloudShowUrl + s.img" v-show="s.img">
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "appImgs",
    props: { obj: { type: Object, default: () => { return {} } } },
    computed:{
      cloudShowUrl() {
        return this.$store.getters.cloudShowUrl
      }
    },
  }
</script>

<style lang="scss">
  ._default-img {
    background-color: #fff;
    width: 100%;
    height: 160px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  ._item-img-list {
    width: 320px;
    overflow: hidden;

    display: flex;
  }
  ._item-img {
    flex: 1;
    margin-right: 5px;
    background-color: #81D6FA;
    min-width: 90px;
    &:last-child { margin-right: 0; }

    img {
      max-width: 100%;
      max-height: 100%;
      width: auto;
      height: auto;
    }
  }

  ._placeholder-span {
    min-height: 80px;
    min-width: 40px;
    display: inline-block;
  }

</style>
