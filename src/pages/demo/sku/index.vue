<template>
  <div class="sku-demo" style="margin: 20px;">
    <el-form label-width="80px">
      <el-form-item v-for="(s, i) in spCheckList" :label="s.label">
        <el-checkbox-group v-model="s.checked" @change="skuChange(s, i)">
          <el-checkbox v-for="(r, i) in s.values" :label="r.label"></el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <table class="table table-bordered center" v-show="showSkuTable">
      <thead><tr> <th>颜色</th> <th>内存</th> <th>尺寸</th> <th>价格</th> <th>操作</th> </tr></thead>
      <tbody v-show="0">
        <tr> <td rowspan="3">红色</td> <td rowspan="3">32G</td> <td>3.5</td> <td><input type="text"></td> <td>删除</td></tr>
        <tr> <td style="display: none">红色</td> <td style="display: none">32G</td> <td>4.5</td> <td><input type="text"></td> <td>删除</td></tr>
        <tr> <td style="display: none">红色</td> <td style="display: none">32G</td> <td>5.5</td> <td><input type="text"></td> <td>删除</td></tr>
      </tbody>
      <tbody>
        <tr v-for="(row, i) in skuRows" :id="`sku-${i}`" >
          <td v-for="(col, ii) in row.row"  v-sku="{'pid': i, cid: ii, mapLen: skuColsLen}">{{col.label}}</td>
          <td><input type="text" v-model="row.price" class="price"></td>
          <td @click="remove(i)"><button class="btn btn-xm btn-default">删除</button></td>
        </tr>
      </tbody>
    </table>

    <button class="btn-block btn btn-success" @click="save">保存</button>
    <br>
    <input type="text" class="form-control" v-model="aprice">
    <button class="btn btn-danger" @click="setAll">全局设置</button>
  </div>
</template>

<script>
  import combine from "lib/utils/combine"
  import _ from "lodash"
  export default {

    computed: {
      spList() {
        return [ this.colorList.values, this.ramList.values, this.sizeList.values]
      },
      spListLen() {
        return [ this.colorList.values.length, this.ramList.values.length, this.sizeList.values.length]
      },
      rows() {
        return combine(this.spList)
      },
      spCheckList() {
        return [this.colorList, this.ramList, this.sizeList]
      },
      rowspan() {
        let m = this.skuCheckedArray.map(l => l.length).slice()
        let acc = 1
        m.splice(cid + 1).forEach(a => acc *= a)
        return acc
      }
    },
    data() {
      return {
        colorList: {
          label: '颜色',
          checked: [],
          values: [{label: '红色', value: 'r'}, {label: '绿色', value: 'g'}, {label: '蓝色', value: 'b'}],
        },
        ramList: {
          label: '内存',
          checked: [],
          values: [{label: '16G', value: 16}, {label: '32G', value: 32}, {label: '64G', value: 64}, {label: '128G', value: 128}]
        },
        sizeList: {
          label: '尺寸',
          checked: [],
          values: [{label: '3.5寸', value: 3.5}, {label: '4.5寸', value: 4.5}, {label: '5.5寸', value: 5.5}]
        },
        weightList: {
          label: '重量',
          values: [{label: '1.0Kg', value: 1.0}, {label: '2.5kk', value: 2.5}]
        },
        flags: [],
        showSkuTable: false,
        skuCheckedArray: [],
        skuRows: [],
        skuColsLen: [],
        aprice: ''
        //spList:[ this.colorList.values, this.ramList.values, this.sizeList.values ],
      }
    },
    directives: {
      sku: {
        bind: function(el, binding, vnode) {
          // console.log("binding")
          console.log(binding.value)
          let { pid, cid, mapLen } = binding.value

          function rowSpan(mapLen, cid) {
            let m = mapLen.slice()
            let acc = 1
            m.splice(cid + 1).forEach(a => acc *= a)
            return acc
          }

          let rowspan = rowSpan(mapLen, cid)

          if (pid % rowspan == 0) {
            el.rowSpan = rowspan
          } else {
            el.style.display = 'none'
          }
        },
        update: function() {
          console.log("update")
        }
      }
    },
    methods: {
      skuChange(item, idx) {
        let picked = _.filter(item.values, v => item.checked.indexOf(v.label) !== -1)

        this.skuCheckedArray[idx] = picked

        // 查询是否可以显示skutable
        this.showSkuTable = _.every(this.spCheckList, val => val.checked.length)

        if (this.showSkuTable) {
          // console.log(JSON.stringify(this.skuCheckedArray))
          this.skuRows = []
          this.skuColsLen = []

          this.$nextTick(() => {
            this.skuRows = combine(this.skuCheckedArray).map((r, i) => {
              return { row: r, price: i + 1 }
            })
            this.skuColsLen = this.skuCheckedArray.map(l => l.length)

          })
        }
      },

      save() {
        console.log(this.skuRows)
        this.skuRows.forEach(a => {
          this.$set(a, 'price', 100)
          console.log(a.price)
        })
      },

      setAll() {
        $('.price').val(123)
      },

      remove(i) {
        // this.skuRows.splice(i, 1)
        let curTds = this.$el.querySelector('#sku-' + i)
        console.log(curTr)
      }
    },
    created() {
      // console.log(combine(this.spList))
      // console.log(combine(this.spList).map(r => {
      //   return { rows: r }
      // }))
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
