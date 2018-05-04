<template>
  <div class="_app-magic">
    <div class="_magic-table-preview" :class="`_magic-table-preview-${obj.data.type}x${obj.data.type}`" :style="{height: obj.data.list.length == 0 ? '80px' : 'auto'}">
      <table v-show="!!obj.data.list.length">
        <tr v-for="(tr, i) in trs">
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
      <h3 v-show="obj.data.list.length == 0" style="text-align: center; margin-top: 35px; color: #999;">魔方: {{`${obj.data.type}x${obj.data.type}`}}</h3>
    </div>
  </div>
</template>

<script>
  import createMagicTable from "./createMagicTable.js"

  export default {
    name: "appMagic",
    props: { obj: { type: Object, default: () => { return {} } } },
    computed:{
      cloudShowUrl() { return this.$store.getters.cloudShowUrl },
      trs() {
        let mt = createMagicTable(this.obj.data.list, this.obj.data.type)
        return mt.trs
      }
    },
  }
</script>

<style lang="sass">
  ._magic-table-preview {
    min-height: 80px;
    background: #fff;
    overflow: hidden;
  }
  ._magic-table-preview table{
    width: 100%;
  }
  ._magic-table-preview table td.col1 {
    // width: 25%;
    width: 80px;
    img { max-width: 80px; }
  }
  ._magic-table-preview table td.col2 {
    // width: 50%;
    width: 160px;
    img { max-width: 160px; }
  }
  ._magic-table-preview table td.col3 {
    // width: 75%;
    width: 240px;
    img { max-width: 240px; }
  }
  ._magic-table-preview table td.col4 {
    // width: 100%;
    width: 320px;
    img { max-width: 320px;}
  }

  ._magic-table-preview table td {
    position: relative;
    text-align: center;
    // padding: 1px;
    width: 25%;


    // min-height: 80px;
    img {
      max-width: 100%;
      // width: 100%;
      height: auto;
      display: inline-block;
      vertical-align: middle;
    }
  }

  ._magic-table-preview._magic-table-preview-5x5 table td {
    // width: 20%;
    width: 64px;
    height: 64px;
    img { max-width: 64px; }
  }
  ._magic-table-preview._magic-table-preview-5x5 table td.col2 {
    // width: 40%;
    width: 128px;
    img { max-width: 128px; }
  }
  ._magic-table-preview._magic-table-preview-5x5 table td.col3 {
    // width: 60%;
    width: 192px;
    img { max-width: 192px; }
  }
  ._magic-table-preview._magic-table-preview-5x5 table td.col4 {
    // width: 80%;
    width: 256px;
    img { max-width: 256px; }
  }
  ._magic-table-preview._magic-table-preview-5x5 table td.col5 {
    // width: 100%;
    width: 320px;
    img { max-width: 320px; }
  }

  ._magic-table-preview._magic-table-preview-3x3 table td {
    // width: 33.333%;
    width: 106.67px;
    img { max-width: 106.67px; }
  }
  ._magic-table-preview._magic-table-preview-3x3 table td.col2 {
    // width: 66.666%;
    width: 213.33px;
    img { max-width: 213.33px; }
  }
  ._magic-table-preview._magic-table-preview-3x3 table td.col3 {
    // width: 100%;
    width: 320px;
    img { max-width: 320px; }
  }



  @media all and (-ms-high-contrast:none) {

    /* IE 10 */
    ._magic-table-preview._magic-table-preview-4x4 table td img ,
    ._magic-table-preview._magic-table-preview-5x5 table td img {
      display: block;
      position: absolute;
      top: 0;
    }
    /* IE11 */
    *::-ms-backdrop,  ._magic-table-preview._magic-table-preview-4x4 table td img,
    ._magic-table-preview._magic-table-preview-5x5 table td img  {
      display: block;
      position: absolute;
      top: 0;
    }

    /* IE 10 */
    // ._magic-table-preview._magic-table-preview-4x4 table td.row2 { height: 160px; }
    // ._magic-table-preview._magic-table-preview-4x4 table td.row3 { height: 240px; }
    ._magic-table-preview._magic-table-preview-4x4 table td.row4 { height: 320px; }
    /* IE11 */
    *::-ms-backdrop, img {
      // ._magic-table-preview._magic-table-preview-4x4 table td.row2 { height: 160px; }
      // ._magic-table-preview._magic-table-preview-4x4 table td.row3 { height: 240px; }
      ._magic-table-preview._magic-table-preview-4x4 table td.row4 { height: 320px; }
    }

    /* IE 10 */
    ._magic-table-preview._magic-table-preview-5x5 table td.row2 { height: 128px; }
    ._magic-table-preview._magic-table-preview-5x5 table td.row3 { height: 192px; }
    ._magic-table-preview._magic-table-preview-5x5 table td.row4 { height: 256px; }
    ._magic-table-preview._magic-table-preview-5x5 table td.row5 { max-height: 320px; }
    /* IE11 */
    *::-ms-backdrop, img {
      ._magic-table-preview._magic-table-preview-5x5 table td.row2 { height: 128px; }
      ._magic-table-preview._magic-table-preview-5x5 table td.row3 { height: 192px; }
      ._magic-table-preview._magic-table-preview-5x5 table td.row4 { height: 256px; }
      ._magic-table-preview._magic-table-preview-5x5 table td.row5 { max-height: 320px; }
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
