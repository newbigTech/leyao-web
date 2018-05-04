/*
* @Author: cycold
* @Date:   2017-02-06 17:32:35
* @Last Modified by:   cycold
* @Last Modified time: 2017-02-07 09:52:49
*/

'use strict';

export default function createMagicTable(data, num = 4) {
  let trs = [], bds = [], index = 1

  for (let i = 0; i < num; i++) {
    let tds = []
    for (let ii = 0; ii < num; ii++) {
      tds.push({
        tid: index++,
        x: ii,
        y: i,
        rowspan: 1,
        colspan: 1,
        show: true,
        active: false,
        selected: false,
        first: false,
        block: false,
        img: '',
        id: 0,
        type: 0,
        name: ''
      })
    }
    trs.push(tds)
  }

  // 获取blocks 注意blocks是三维数组
  if (data.length > 0) {
    data.forEach(b => {
      let _trs = [], _tds = []
      trs.forEach(tr => {
        _tds = []
        tr.forEach(td => {
          if (!td.block && td.x >= b.x && td.y >= b.y && (td.x <= b.x + b.w - 1) && (td.y <= b.y + b.h - 1)) {
            td.show = false
            td.selected = true
            td.block = true
            _tds.push(td)
          }

          if (td.tid == b.tid) {
            td.show = true
            td.first = true
            td.block = true
            td.selected = true
            td.active = true

            td.rowspan = b.h
            td.colspan = b.w

            td.img = b.img
            td.id = b.id
            td.name = b.name
            td.type = b.type
          }

        })
        if (_tds.length > 0) _trs.push(_tds)
      })
      if (_trs.length > 0) bds.push(_trs)
    })
  }

  return { trs, bds }
}
