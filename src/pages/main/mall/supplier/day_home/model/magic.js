/*
* @Author: cycold
* @Date:   2017-01-06 09:05:11
* @Last Modified by:   cycold
* @Last Modified time: 2017-02-07 15:57:05
*/

'use strict';

export default (type = 4) => {
  return {
    name: 'appMagic',
    prop: {},
    data: {
      type: type,
      list: [],
    }
  }
}


/*let block = {
  x: b.x,
  y: b.y,
  w: b.colspan,
  h: b.rowspan,
  tid: b.tid,

  img: b.img,
  name: b.name,
  id: b.id,
  type: b.type
}*/

/*function createMagicTable(num = 4) {
  let trs = [], index = 1
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
        // link: '',
        type: 0,
        name: '',
        id: 0,
      })
    }
    trs.push(tds)
  }
  return trs
}*/
