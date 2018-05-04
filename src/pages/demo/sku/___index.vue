<template>
  <div class="sku-demo" style="margin: 20px;">
    <table class="table table-bordered center">
      <thead><tr> <th>颜色</th> <th>内存</th> <th>尺寸</th> <th>价格</th> <th>操作</th> </tr></thead>
      <tbody v-show="0">
        <tr> <td rowspan="3">红色</td> <td rowspan="3">32G</td> <td>3.5</td> <td><input type="text"></td> <td>删除</td></tr>
        <tr> <td style="display: none">红色</td> <td style="display: none">32G</td> <td>4.5</td> <td><input type="text"></td> <td>删除</td></tr>
        <tr> <td style="display: none">红色</td> <td style="display: none">32G</td> <td>5.5</td> <td><input type="text"></td> <td>删除</td></tr>
      </tbody>
      <tbody>
        <tr v-for="(row, i) in rows" :id="i"> 
          <td v-for="(col, ii) in row" v-sku="{'rows': rows, 'row': row, 'pid': i, 'col': col, cid: ii, minRows: minRows, maxRows: maxRows, mapLen: spListLen, flags: flags}">{{col.label}}</td> 
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
        return [ this.colorList.values, this.ramList.values, this.sizeList.values, this.weightList.values ]
      },
      spListLen() {
        return [ this.colorList.values.length, this.ramList.values.length, this.sizeList.values.length, this.weightList.values.length ]
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
        weightList: {
          label: '重量',
          values: [{label: '1.0Kg', value: 1.0}, {label: '2.5kk', value: 2.5}]
        },
        flags: []
        //spList:[ this.colorList.values, this.ramList.values, this.sizeList.values ],
      }
    },
    directives: {
      sku: {
        bind: function(el, binding, vnode) {
          // console.log(binding.value)
          let { rows, row, cid, pid, col, minRows, maxRows, mapLen, flags } = binding.value 

          let _mapLen = mapLen.slice()
          _mapLen.splice(cid, 1)

          function timesArr(arr) {
            let a = 1
            arr.forEach(s => { a *= s })
            return a
          }

          function rowSpan(mapLen, cid) {
            let m = mapLen.slice()
            let acc = 1
            m.splice(cid + 1).forEach(a => acc *= a)
            // console.log("acc", acc)
            return acc
          }
          let rowspan = rowSpan(mapLen, cid)
          if (flags.indexOf(rowspan) < 0) {
            flags.push(rowspan)
          }

          console.log("rowspan", rowspan)
          // console.log(rows.length / rowspan)
          // console.log(rows.length / rowspan / mapLen[cid])
          console.log(pid % mapLen[cid])

          if (pid % rowspan == 0) {
            el.rowSpan = rowspan
          } else {
            el.style.display = 'none'
          }
          
          // if (cid == 0) {
          //   if (pid % (rows.length / mapLen[0]) == 0) {
          //     // console.log(pid)
          //   }
          // }
          
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
