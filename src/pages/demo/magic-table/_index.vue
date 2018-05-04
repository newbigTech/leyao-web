<template>
  <div class="_container">
    <card-panel>
      <h3 slot="title">魔方</h3>
      <div slot="panel-body" class="_magic-table-wrapper">
        <div class="_magic-table">
          <table>
            <tr v-for="(tr,i) in trs">
              <td v-for="(td, i) in tr"
                v-show="td.show"
                @click="setMagicTable"
                :data-x="td.x"
                :data-y="td.y"
                :rowspan="td.rowspan"
                :colspan="td.colspan"
                ></td>
            </tr>
          </table>
        </div>
      </div>
      <div class="_magic-select">
        <ul>
          <li></li>
        </ul>
      </div>
    </card-panel>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        trs: this.createMagicTable()
      }
    },
    methods: {
      createMagicTable(num = 4) {
        let trs = []
        for (let i = 0; i < num; i++) {
          let tds = []
          for (let ii = 0; ii < num; ii++) {
            tds.push({
              x: ii,
              y: i,
              rowspan: 1,
              colspan: 1,
              show: true
            })
          }
          trs.push(tds)
        }
        return trs
      },

      setMagicTable() {
        let selectedTds0 = [
          [
            this.trs[0],
          ],

        ]

        let selectedTds1 = [
          [
            this.trs[0]
          ],

          [
            [this.trs[1][0], this.trs[1][1]],
            [this.trs[2][0], this.trs[2][1]],
          ],
        ]

        let selectedTds2 = [
          [
            this.trs[0],
          ],

          [
            [this.trs[1][0], this.trs[1][1]],
            [this.trs[2][0], this.trs[2][1]],
            [this.trs[3][0], this.trs[3][1]],
          ],

          [
            [this.trs[1][2], this.trs[1][3]],
            [this.trs[2][2], this.trs[2][3]],
            [this.trs[3][2], this.trs[3][3]],
          ],
        ]

        let updateTrs = (selectedTds) => {
          for (let i = 0, len = selectedTds.length; i < len; i++) {
            let rowspan, colspan, lena, lenb
            for (rowspan = 0, lena = selectedTds[i].length; rowspan < lena; rowspan++) {
              for (colspan = 0, lenb = selectedTds[i][rowspan].length; colspan < lenb; colspan++) {
                selectedTds[i][rowspan][colspan].show = false
              }
            }
            selectedTds[i][0][0].show = true
            selectedTds[i][0][0].rowspan = rowspan
            selectedTds[i][0][0].colspan = colspan
          }
        }
        updateTrs(selectedTds1)
      }
    }
  }
</script>

<style>
  table {
    width: 240px;
    height: 240px;
    background: #f8f8f8;
  }
  td {
    border: 1px solid #4ADA9E;
  }
</style>
