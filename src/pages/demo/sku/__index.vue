<template>
  <div class="sku-demo" style="margin: 20px;">
    <table class="table table-bordered center">
      <thead><tr> <th>颜色</th> <th>内存</th> <th>尺寸</th> <th>价格</th> <th>操作</th> </tr></thead>
      <tbody>
        <tr> <td rowspan="3">红色</td> <td rowspan="3">32G</td> <td>3.5</td> <td><input type="text"></td> <td>删除</td></tr>
        <tr> <td style="display: none">红色</td> <td style="display: none">32G</td> <td>4.5</td> <td><input type="text"></td> <td>删除</td></tr>
        <tr> <td style="display: none">红色</td> <td style="display: none">32G</td> <td>5.5</td> <td><input type="text"></td> <td>删除</td></tr>
      </tbody>
      <tbody>
        <tr v-for="(row, i) in rows" :id="i"> 
          <td v-for="(col, ii) in row" v-sku="{'rows': rows, 'row': row, 'pid': i, 'col': col, cid: ii, minRows: minRows, maxRows: maxRows, mapLen: spListLen}">{{col.label}}</td> 
          <td rowspan="0"><input type="text"></td> <td>删除</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import traverse from "lib/utils/traverse"
  import combine from "lib/utils/combine"
  export default {

    computed: {
      hide() {
        
      },
      spList() {
        return [ this.colorList.values, this.ramList.values, this.sizeList.values ]
      },
      spListLen() {
        return [ this.colorList.values.length, this.ramList.values.length, this.sizeList.values.length ]
      },
      rows() {
        return combine(this.spList)
      },
      maxArr() {
        return this.spList.sort((a, b) => b.length - a.length)[0]
      },
      maxRows() {
        return this.spList.sort((a, b) => b.length - a.length)[0].length
      },
      minArr() {
        return this.spList.sort((a, b) => a.length - b.length)[0]
      },
      minRows() {
        return this.spList.sort((a, b) => a.length - b.length)[0].length
      },
    },
    data() {
      return {
        colorList: {
          label: '颜色',
          values: [{label: '红色', value: 'r'}, {label: '绿色', value: 'g'}, {label: '蓝色', value: 'b'}]
        },
        ramList: {
          label: '内存',
          values: [{label: '16G', value: 16}, {label: '32G', value: 32}, {label: '64G', value: 64}, {label: '128G', value: 128}]
        },
        sizeList: {
          label: '尺寸',
          values: [{label: '3.5寸', value: 3.5}, {label: '4.5寸', value: 4.5}, {label: '5.5寸', value: 5.5}]
        },
        //spList:[ this.colorList.values, this.ramList.values, this.sizeList.values ],
      }
    },
    directives: {
      sku: {
        bind: function(el, binding, vnode) {
          function timesArr(arr) {
            let a = 1
            arr.forEach(s => { a *= s })
            return a
          }

          console.log(binding.value)
          let { rows, row, cid, pid, col, minRows, maxRows, mapLen } = binding.value 
          let _mapLen = mapLen.slice()
          _mapLen.splice(cid, 1)


          // if (pid % (rows.length / mapLen[0]) == 0 ) { 

          //   if (cid == 0) {
          //     el.rowSpan = timesArr(_mapLen)
          //   } else {
          //     // el.style.display = 'none'
          //   }
          // } 
          // console.log(cid, row.length)
          
          if (cid == 0) {
            if (pid % (rows.length / mapLen[0]) == 0 ) {
              el.rowSpan = timesArr(_mapLen)
            } else {
              el.style.display = 'none'
              el.innerHTML = "sds"
            }
          } 

          // 最后一列
          else if (cid == row.length - 1) { 
            if (pid % (mapLen[cid] - 1) == 0) {

            } else {
              // el.innerHTML = ''
              // el.style.display = 'none'
            }
          } 

          // 其他列 
          else {
            if (pid % (mapLen[cid] -1 ) == 0) {
              el.rowSpan = mapLen[cid] - 1
            } else {
              el.style.display = 'none'
            }
          }


        }
      }
    },
    methods: {
      getColor(row, i) {
        return 'color'
      },
      getRam(row, i) {
        return 'ram'
      },
      timesArr(arr) {
        let a = 1
        arr.forEach(s => {
          a *= s
        })
        return a
      }
    }
  }
</script>

<style>
  .sku-demo table td, th {
    text-align: center;
  }
  .table>tbody>tr>td, .table>tbody>tr>th, .table>tfoot>tr>td, .table>tfoot>tr>th, .table>thead>tr>td, .table>thead>tr>th {
    vertical-align: middle;
  }
</style>
