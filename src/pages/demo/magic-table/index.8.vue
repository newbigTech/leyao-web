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
                @click="tdClick(td)"
                :data-x="td.x"
                :data-y="td.y"
                :data-id="td.id"
                :rowspan="td.rowspan"
                :colspan="td.colspan"
                :class="{'active': td.active}"
                >{{td.id}}</td>
            </tr>
          </table>
        </div>
        <div class="_magic-select">
          <ul v-for="(ul, i) in trs2">
            <li v-for="(li, i) in ul"
              :class="{'selected': li.selected}"
              :data-x="li.x"
              :data-y="li.y"
              :data-id="li.id"
              :data-show="li.show"
              @click="selectClick(li)"
              @mouseenter="liMouseenter(li)"
            >{{li.id}}</li>
          </ul>
        </div>
      </div>
    </card-panel>
  </div>
</template>

<script>
  import _ from "lodash"
  export default {
    data() {
      return {
        trs: this.createMagicTable(),
        trs2: [],
        trs3: [],
        blocks: []
      }
    },
    methods: {
      createMagicTable(num = 4) {
        let trs = [], index = 1
        for (let i = 0; i < num; i++) {
          let tds = []
          for (let ii = 0; ii < num; ii++) {
            tds.push({
              id: index++,
              x: ii,
              y: i,
              rowspan: 1,
              colspan: 1,
              show: true,
              active: false,
              selected: false,
              first: false
            })
          }
          trs.push(tds)
        }
        return trs
      },

      getSubArrayByIndex(x, y, arr2, direction = 0) {
        // if (x == 0 && y == 0) return arr2
        let _arr2 = []
        for (let i = 0; i < arr2.length; i++) {
          let _arr = []
          for (let ii = 0; ii < arr2[i].length; ii++) {
            if (direction === 0) {
              if (ii <= x && i <= y) _arr.push(arr2[i][ii])
            } else if (direction === 1){
              if (ii >= x && i >= y) _arr.push(arr2[i][ii])
            } else if (direction ===2 ) {
              if (ii === x && i <= y) _arr.push(arr2[i][ii])
            } else {
              if (ii <= x && i === y) _arr.push(arr2[i][ii])
            }
          }
          if (_arr.length > 0)  _arr2.push(_arr)
        }
        return _arr2
      },

      fakeSelctedTds(d) {
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

        let data = {
          selectedTds0,
          selectedTds1,
          selectedTds2
        }
        return data[d]
      },

      updateTable(selectedTds){
        for (let i = 0, len = selectedTds.length; i < len; i++) {
          let rowspan, colspan, lena, lenb
          for (rowspan = 0, lena = selectedTds[i].length; rowspan < lena; rowspan++) {
            for (colspan = 0, lenb = selectedTds[i][rowspan].length; colspan < lenb; colspan++) {
              selectedTds[i][rowspan][colspan].show = false
              selectedTds[i][rowspan][colspan].active = true
            }
          }
          selectedTds[i][0][0].show = true
          selectedTds[i][0][0].first = true
          selectedTds[i][0][0].rowspan = rowspan
          selectedTds[i][0][0].colspan = colspan
        }
      },

      getSelectedTds(x, y, arr2, direction = 0) {
        let trs = []
        for (let i = 0, lena = arr2.length; i < lena; i++) {
          let tds = []
          for (let ii = 0, lenb = arr2[i].length; ii < lenb; ii++) {
            let td = arr2[i][ii]

            td.selected = false

            if (!td.show || td.active) continue

            if (direction === 0) {
              if (ii >= x && i >= y) tds.push(td)
            } else {
              if (ii <= x && i <= y) tds.push(td)
            }
          }
          if (tds.length > 0) trs.push(tds)
        }
        return trs
      },

      tdClick(td) {
        this.trs2 = []

        if (td.active) return
        // this.updateTable(this.fakeSelctedTds('selectedTds1'))
        // this.trs2 = this.getSelectedTds(td.x, td.y, this.trs, 0)

        let _count = 0
        let _down = true
        for (let i = 0, lena = this.trs.length; i < lena; i++) {
          let trs = []

          let lenb = this.trs[i].length

          if (_count >= lenb && _down) {
            break
          } else {
            _count = 0
          }
          for (let ii = 0; ii < lenb; ii++) {

            let _td = this.trs[i][ii]

            _td.selected = false

            if (_td.first && td.y >= _td.y) _down = false

            if (_td.active) {
              _count++
            }

            if (!_td.show || _td.active) continue

            if (_td.x >= td.x && _td.y >= td.y ) trs.push(_td)

          }
          if (trs.length > 0) this.trs2.push(trs)
        }

        console.log(this.trs2)

        // Todo: 去掉this.trs2 x 坐标不连续的元素
        for (let i = 0, lena = this.trs2.length; i < lena; i++) {
          let tr = this.trs2[i]
          let _tr = []
          _tr.push(tr[0])
          tr.reduce((preVal, curVal) => {
            if (curVal.x - preVal.x == 1) _tr.push(curVal)
            return curVal
          })
          this.trs2[i] = _tr
        }

        // Todo: 以行最少元素合并
        let tails = this.trs2.slice(1)
        tails.sort((a, b) => a.length - b.length)
        tails.forEach((t, index)=> {
          if (index == 0) return
          t.splice(tails[0].length)
        })

        // Todo: 去掉this.trs2 y 坐标不连续元素
        let trs2 = []
        if (this.trs2.length > 1) {
          trs2.push(this.trs2[0])
          this.trs2.reduce((preVal, curVal, curIndex) => {
            let tr = []
            let _break = false
            for (let i = 0, len = this.trs2[0].length; i < len; i++) {
              if (curVal[i] && preVal[i]) {
                if (curVal[i].y - preVal[i].y > 1) {
                  _break = true
                  break
                }

                if (curVal[i].y - preVal[i].y == 1) {
                  tr.push(curVal[i])
                  console.log(curVal[i].id, preVal[i].id)
                }
              }
            }
            trs2.push(tr)
            if (_break) return this.trs2[0]
            return curVal
          })
          this.trs2 = trs2
        }

        // Todo: 去除左下角 右上角
        this.trs2.forEach((tr, i) => {
          if (i + 1 == this.trs2.length) {

          }
        })

      },

      liMouseenter(li) {
        // console.log(li)
        this.trs2.forEach(trs => {
          trs.forEach(td => {
            td.selected = false
            if(li.x >= td.x && li.y >= td.y ) {
              td.selected = true
            }
          })
        })
      },

      selectClick() {
        this.trs2.forEach(trs => {
          let trs_ = []
          trs.forEach(td => {
            if (td.selected) {
              trs_.push(td)
            }
          })
          if (trs_.length > 0) this.trs3.push(trs_)
        })
        this.blocks.push(this.trs3)
        this.updateTable(this.blocks)
        console.log(this.blocks)
        this.trs3 = []
      }

    }
  }
</script>

<style>
  ._magic-table table {
    width: 100%;
    height: 100%;
  }
  ._magic-table td {
    border: 1px solid #4ADA9E;
    cursor: pointer;
    width: 60px;
    height: 60px;
    text-align: center;
  }
  ._magic-table-wrapper {
    display: flex;
  }
  ._magic-table {
    width: 240px;
    height: 240px;
    background: #f8f8f8;
  }
  ._magic-select {
    margin-left: 20px;
    min-width: 240px;
    min-height: 240px;
  }
  ._magic-select ul {
    width: 100%;
    overflow: hidden;
  }
  ._magic-select ul li {
    width: 60px;
    height: 60px;
    float: left;

    margin: 1px;
    background: #f8f8f8;
    border: 1px solid #e9e9e9;
    border-right-width: 2px;
    border-bottom-width: 2px;
    text-align: center;
    line-height: 60px;
  }
  ._magic-select ul li.selected {
    background: #ddeafb;
    border-color: #c3d9ff;
  }
</style>
