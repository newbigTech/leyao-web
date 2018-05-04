var _ = require('lodash')

let a = [
  [{x: 0, y: 0, id: 0}, {x: 1, y: 0, id: 1}, {x: 2, y: 0, id: 2}, {x: 3, y: 0, id: 3}],
  [{x: 0, y: 1, id: 4}, {x: 3, y: 1, id: 7}],
  [{x: 0, y: 2, id: 8}, {x: 3, y: 2, id: 11}],
  [{x: 0, y: 3, id: 12}, {x: 1, y: 3, id: 13}, {x: 2, y: 3, id: 14}, {x: 3, y: 3, id: 15}],
]

let next = a[0][0]

for (let i = 0, lena = a.length; i < lena; i++) {
  let tr = a[i]
  let _tr = []
  _tr.push(tr[0])
  tr.reduce((preVal, curVal) => {
    if (curVal.x - preVal.x == 1) _tr.push(curVal)
    return curVal
  })
  a[i] = _tr
}

let _a = []
_a.push(a[0])

a.reduce((preVal, curVal) => {
  let tr = []
  for (let i = 0, len = Math.min(preVal.length, curVal.length); i < len; i++) {
    if (curVal[i].y - preVal[i].y == 1) {
      tr.push(curVal[i])
    }
  }
  _a.push(tr)
  return curVal
})
console.log(a)
console.log("____")
console.log(_a)
