let _ = require("lodash")
let traverse = require("traverse")

let colorList = {
      label: '颜色',
      values: [{label: '红色', value: 'r'}, {label: '绿色', value: 'g'}, {label: '蓝色', value: 'b'}]
    }
let ramList = {
      label: '内存',
      values: [{label: '16G', value: 16}, {label: '32G', value: 32}, {label: '64G', value: 64}, {label: '128G', value: 128}]
    }
let sizeList = {
      label: '尺寸',
      values: [{label: '3.5寸', value: 3.5}, {label: '4.5寸', value: 4.5}, {label: '5.5寸', value: 5.5}]
    }
let spList = [ colorList.values, ramList.values, sizeList.values ]

function combine() {
  if (Array.isArray(arguments[0])) {
    return processArrays(arguments[0], [], [])
  } else {
    return processArrays([].slice.call(arguments), [], [])
  }
  function processArrays(arrays, arr, res) {
    for (let i = 0; i < arrays[0].length; i++) {
      let a = arrays[0][i]
      if (arrays.length > 1) {
        processArrays(arrays.slice(1), arr.concat(a), res)
      } else {
        res.push(arr.concat(a))
      }
    }
    return res
  }
}

let co = combine(spList)
console.log(combine(spList))

traverse(co).forEach(function (c) {
  if (this.notRoot && this.notLeaf && !Array.isArray(c)) {
    console.log(c)
  }
})


