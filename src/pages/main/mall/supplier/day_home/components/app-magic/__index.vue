<template>
  <div class="_app-magic">
    <!-- <h3>magic</h3> -->
    <!-- <div class="_magic-table-default" v-show="!obj.prop.blocks.length">
      <div class=""></div>
      <div class=""></div>
      <div class=""></div>
      <div class=""></div>
    </div> -->

    <div class="_magic-table-preview">
      <table>
        <tr v-for="(tr, i) in obj.prop.trs">
          <td v-for="(td, ii) in tr"
            v-show="td.show"
            :rowspan="td.rowspan"
            :colspan="td.colspan"
            :data-x="td.x"
            :data-y="td.y"
            :data-id="td.tid"
            :class="['col' + td.colspan, 'row' + td.rowspan]"
          >
            <img :src="td.img!==''?(cloudShowUrl+td.img):td.img">
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "appMagic",
    computed:{
      cloudShowUrl() {
            return this.$store.getters.cloudShowUrl
        }
    },
    props: { obj: { type: Object, default: () => { return {} } } },
  }
</script>

<style lang="sass">
  ._magic-table-preview {
    min-height: 80px;
    background: #fff;
  }
  ._magic-table-preview table{
    width: 100%;
  }
  ._magic-table-preview table td.col1 {
    width: 25%; width: 80px;
    img { max-width: 80px; }
  }
  ._magic-table-preview table td.col2 {
    width: 50%; width: 160px;
    img { max-width: 160px; }
  }
  ._magic-table-preview table td.col3 {
    width: 75%; width: 240px;
    img { max-width: 240px; }
  }
  ._magic-table-preview table td.col4 {
    width: 100%; width: 320px;
    img { max-width: 320px;}
  }

  ._magic-table-preview table td {
    text-align: center;
    // padding: 1px;
    width: 25%;
    min-height: 80px;
    img {
      max-width: 100%;
      height: auto;

      display: inline-block;
      vertical-align: middle;
      max-width: 100%;
      max-height: 100%;
      width: auto;
      height: auto;
    }
  }

  ._magic-table-default {
    display: flex;
    div {
      width: 80px;
      height: 80px;
    }
    // div:nth-child(1) { background-color: #1D8CE0; }
    // div:nth-child(2) { background-color: #FFBE32; }
    // div:nth-child(3) { background-color: #81D5FA; }
    // div:nth-child(4) { background-color: #FF7EC4; }
  }
</style>
