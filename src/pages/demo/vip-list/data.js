/**
 * Created by cycold@qq.com on 2017-05-25.
 */
let _ = require("lodash")


let list =  [
  { aid: 1234, aname: "满减", vtype: 0, vname: "普通用户", vspending: 500, vfree: 50, vmark: "满500送30元"},
  { aid: 1234, aname: "满减", vtype: 0, vname: "普通用户", vspending: 300, vfree: 30, vmark: "满300送30元"},
  { aid: 1235, aname: "满送", vtype: 0, vname: "普通用户", vspending: 500, vfree: 5, vmark: "满50送5元"},
  { aid: 1234, aname: "满减", vtype: 1, vname: "vip1", vspending: 400, vfree: 10, vmark: "满400送10元"},
  { aid: 1234, aname: "满减", vtype: 1, vname: "vip1", vspending: 300, vfree: 15, vmark: "满300送15元"},
  { aid: 1234, aname: "满减", vtype: 2, vname: "vip2", vspending: 150, vfree: 15, vmark: "满100送15元"},
  { aid: 1235, aname: "满送", vtype: 2, vname: "vip2", vspending: 150, vfree: 15, vmark: "满100送15元"},
  { aid: 1234, aname: "满减", vtype: 2, vname: "vip2", vspending: 150, vfree: 15, vmark: "满100送15元"},
  { aid: 1234, aname: "满减", vtype: 2, vname: "vip2", vspending: 150, vfree: 15, vmark: "满100送15元"},
  { aid: 1235, aname: "满送", vtype: 1, vname: "vip1", vspending: 100, vfree: 10, vmark: "满100送10元"},
  { aid: 1234, aname: "满减", vtype: 3, vname: "vip3", vspending: 150, vfree: 15, vmark: "满100送15元"},
  { aid: 1234, aname: "满减", vtype: 3, vname: "vip3", vspending: 150, vfree: 15, vmark: "满100送15元"},
  { aid: 1234, aname: "满减", vtype: 3, vname: "vip3", vspending: 150, vfree: 15, vmark: "满100送15元"},
  { aid: 1235, aname: "满送", vtype: 3, vname: "vip3", vspending: 150, vfree: 15, vmark: "满100送15元"},
  { aid: 1235, aname: "满送", vtype: 3, vname: "vip3", vspending: 150, vfree: 15, vmark: "满100送15元"},
  { aid: 1234, aname: "满减", vtype: 4, vname: "vip4", vspending: 150, vfree: 15, vmark: "满100送15元"},
  { aid: 1234, aname: "满减", vtype: 5, vname: "vip5", vspending: 150, vfree: 15, vmark: "满100送15元"},
  { aid: 1235, aname: "满送", vtype: 0, vname: "普通用户", vspending: 500, vfree: 5, vmark: "满50送5元"},
  { aid: 1235, aname: "满送", vtype: 1, vname: "vip1", vspending: 100, vfree: 10, vmark: "满100送10元"},
  { aid: 1235, aname: "满送", vtype: 2, vname: "vip2", vspending: 150, vfree: 15, vmark: "满100送15元"},
  { aid: 1235, aname: "满送", vtype: 3, vname: "vip3", vspending: 150, vfree: 15, vmark: "满100送15元"},
  { aid: 1235, aname: "满送", vtype: 4, vname: "vip4", vspending: 150, vfree: 15, vmark: "满100送15元"},
  { aid: 1235, aname: "满送", vtype: 5, vname: "vip5", vspending: 150, vfree: 15, vmark: "满100送15元"},
]

function getRowspan(list, arr) {
  let o = {}
  arr.reduce((p, c, i, a) => {
    p.push(c)
    let k = p.join("-")
    if (o[k] == null) o[k] = []
    list.forEach(li => {
      let z = []
      p.forEach(n => {
        z.push(li[n])
        let v = z.join("-")
        if (o[k].indexOf(z) == -1) {
          o[k].push(z)
        }
      })
    })
    return p
  },[])
  o = _.mapValues(o, (val, key) => {
    return val.reduce((c, p) => {
      c.push(p.join("-"))
      return c
    }, [])
  })

  function repeatCounter (arr) {
    let uniq = _.uniq(arr)
    let re = {}
    arr.forEach(u => {
      if (re[u] == null) re[u] = 0
      if (uniq.indexOf(u) > -1) re[u]++
    })
    return re
  }
  let res = {}
  _.values(o).forEach(v => {
    // console.log(repeatCounter(v))
    res = Object.assign(res, repeatCounter(v))
  })
  return res
}

// console.log(getRowspan(list, ['aid', 'vtype']))


function setColumn(list , fileds, rowSpanFileds) {
  list = _.sortBy(list, ['aid', 'vtype'])
  let rs = getRowspan(list, rowSpanFileds)
  list = list.map(li => fileds.map(ar => _.pick(li, ar)))
  list.forEach(li => {
    li.forEach((td, i)=> {
      if (i >= rowSpanFileds.length) {
        td.rowSpan = 1
      } else {
        rowSpanFileds.forEach((k, j) => {
          // console.log(td[k])
          if (_.has(rs,td[k] + "")) td.rowSpan = rs[td[k] + ""]
        })
      }
    })
  })

  return list
}

console.log(setColumn(list, [['aid', 'aname'], ['vtype', 'vname'], ['vspending'], ['vfree'], ['vmark']], ['aid', 'vtype']))


// let _list = _.sortBy(list, ['aid', 'vtype'])
// let _groupObj = _.groupBy(_list, "aid")
// let _tableMap = _.mapValues(_groupObj, g => g.length)
// console.log(_tableMap)


