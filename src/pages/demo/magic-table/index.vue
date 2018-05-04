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
                :class="{'active': td.active, 'block': td.first, 'current': currentId == td.id}"
                >
                  <span v-show="!!td.active">{{td.colspan * 160 + 'x' + td.rowspan * 160}}</span>
                  <i v-show="!!td.active" class="el-icon-circle-close" style="background: rgb(255, 255, 255)" @click.stop="tdRemove(td)"></i>
                </td>
            </tr>
          </table>
        </div>
        <div class="_magic-select" v-show="magicSelectShow">
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
  export default {
    data() {
      return {
        trs: this.createMagicTable(),
        trs2: [],
        trs3: [],
        blocks: [],
        magicSelectShow: false,
        currentId: ''
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
              first: false,
              block: false
            })
          }
          trs.push(tds)
        }
        return trs
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
          selectedTds[i][0][0].blockIndex = i
        }
      },

      doMarkBlockTds(tableArray, td) {
        for (let i = 0, lena = tableArray.length; i < lena; i++) {
          let lenb = tableArray[i].length
          for (let ii = 0; ii < lenb; ii++) {
            let _td = tableArray[i][ii]
            if (td.x <= _td.x && td.y <= _td.y ) {
              _td.block = true
            }
          }
        }
      },

      doSelectingTds(td) {
        for (let i = 0, lena = this.trs.length; i < lena; i++) {
          let trs = []
          let lenb = this.trs[i].length
          for (let ii = 0; ii < lenb; ii++) {
            let _td = this.trs[i][ii]

            _td.selected = false
            _td.block = false

            // if (!_td.show || _td.active) continue
            if (td.x <= _td.x && td.y <= _td.y ) trs.push(_td)
          }
          if (trs.length > 0) this.trs2.push(trs)
        }
      },

      tdClick(td) {
        this.trs2 = []

        if (td.active) {
          this.currentId = td.id
          return
        }

        // handle this.trs2 then this.trs2.length > 0
        this.doSelectingTds(td)

        // 处理包含block
        let trs22 = []
        for (let i = 0, lena = this.trs2.length; i < lena; i++) {
          let trs2 = []
          let lenb = this.trs2[i].length

          for (let ii = 0; ii < lenb; ii++) {
            let _td2 = this.trs2[i][ii]
            if (_td2.first || _td2.active && !_td2.block) {
              this.doMarkBlockTds(this.trs2, _td2)
              continue
            }
            if (_td2.block) continue
            trs2.push(_td2)
          }
          if (trs2.length > 0) trs22.push(trs2)
        }
        this.trs2 = trs22

        if (this.trs2.length == 1 && this.trs2[0].length == 1) {
          this.magicSelectShow = false
          this.trs3.push(this.trs2[0])
          this.blocks.push(this.trs3)
          this.updateTable(this.blocks)
          this.trs3 = []
          this.currentId = td.id
        } else {
          this.magicSelectShow = true
        }

      },

      liMouseenter(li) {
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
          trs.forEach(td => td.selected && trs_.push(td))
          if (trs_.length > 0) this.trs3.push(trs_)
        })

        this.currentId = this.trs3[0][0].id

        this.blocks.push(this.trs3)
        this.updateTable(this.blocks)
        this.trs3 = []
        this.magicSelectShow = false
      },

      tdRemove(td) {
        if (this.blocks.length == 0) return
        let block = []
        let index = 0
        this.blocks.forEach((b, i) => {
          if (b[0][0]['id'] == td.id){
            block = b
            index = i
          }
        })

        if (block.length > 0) {
          this.currentId = ''
          block.forEach(tr => tr.forEach(d => {
            d.show = true
            d.active = false
            d.rowspan = 1
            d.colspan = 1
            d.first = false
            d.block = false
          }))
        }

        this.blocks.splice(index, 1)
      }

    }
  }
</script>

<style scoped>
  ._magic-table table {
    width: 100%;
    height: 100%;
  }
  ._magic-table td {
    /*border: 1px solid #4ADA9E;*/
    border: 0;
    cursor: pointer;
    width: 60px;
    height: 60px;
    text-align: center;
    color: #fff;
    font-size: 14px;
    position: relative;
  }
  ._magic-table td span { text-shadow: 0 0 1px #000; font-weight: 500; }
  ._magic-table td i {
    display: block;
    position: absolute;
    right: 1px;
    top: 1px;
    color: #a7a7a7;
    font-size: 18px;
    cursor: pointer;
    z-index: 2;
    border-radius: 50%;
  }
  ._magic-table td::after {
    content: "+";
    color: #ccc;
  }
  ._magic-table td.block {
    /*background: #81D5FA;*/
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

  ._magic-table tr td.block::after { display: none; }

  ._magic-table tr td.current {
    box-shadow: 0 0 0 2px #858585 inset;
    padding: 2px;
  }


  /* 背景色 */
  ._magic-table tr:nth-child(1) td:nth-child(1).block { background: #BEEB9F; }
  ._magic-table tr:nth-child(1) td:nth-child(2).block { background: #FFFF9D; }
  ._magic-table tr:nth-child(1) td:nth-child(3).block { background: #DB9E36; }
  ._magic-table tr:nth-child(1) td:nth-child(4).block { background: #79BD8F; }


  ._magic-table tr:nth-child(2) td:nth-child(1).block { background: #00A388; }
  ._magic-table tr:nth-child(2) td:nth-child(2).block { background: #1D8CE0; }
  ._magic-table tr:nth-child(2) td:nth-child(3).block { background: #1695A3; }
  ._magic-table tr:nth-child(2) td:nth-child(4).block { background: #BEDB39; }

  ._magic-table tr:nth-child(3) td:nth-child(1).block { background: #F3FFE2; }
  ._magic-table tr:nth-child(3) td:nth-child(2).block { background: #EB7F00; }
  ._magic-table tr:nth-child(3) td:nth-child(3).block { background: #7D8A2E; }
  ._magic-table tr:nth-child(3) td:nth-child(4).block { background: #C9D787; }

  ._magic-table tr:nth-child(4) td:nth-child(1).block { background: #FFC0A9; }
  ._magic-table tr:nth-child(4) td:nth-child(2).block { background: #FF8598; }
  ._magic-table tr:nth-child(4) td:nth-child(3).block { background: #FFD34E; }
  ._magic-table tr:nth-child(4) td:nth-child(4).block { background: #ACF0F2; }

</style>
