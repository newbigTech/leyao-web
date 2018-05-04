/**
* Created by cycold on 2016-11-01
*/

import traverse from "./traverse"
import _ from "lodash"

export function updateTree(treeData, ids, field) {
  // 更新id设置checked
  traverse(treeData).forEach(function(nd) {
    if(!this.isRoot && this.notLeaf && !Array.isArray(nd)) {
      nd.checked = nd.checked || 0
      ids.forEach(id => {
        if (nd[field] == id) {
          nd.checked = 2
        } 
      })
    }
  })

  // 更新整个树
  traverse(treeData).forEach(function(nd) {

    if (!this.isRoot && Array.isArray(nd) && nd.length > 0) {
      // console.log("checkStatus: ", this.node)
      // this.parent.node.checked = 1
      let checkStatus = 0
      nd.forEach(tt => checkStatus += tt.checked)
      // console.log("checkStatus: ", this.node)
      if (checkStatus === 0) this.parent.node.checked = 0
      else if (checkStatus === nd.length * 2) this.parent.node.checked = 2
      else this.parent.node.checked = 1 
    }
  })

  return treeData
}

export function getCheckedIds(treeData, field) { 
  let a = []
  traverse(treeData).forEach(function(nd) {
    if(!this.isRoot && this.notLeaf && !Array.isArray(nd)) {
      if (nd.checked > 0) a.push(nd[field])
    }
  })
  return a
}

export function addTreeLevel(treeData) {
  traverse(treeData).forEach(function(node) {
    if (this.notRoot && this.notLeaf && !Array.isArray(node)) {
      node.level = this.level2
    }
  })
  return treeData
}


// 将扁平的数组转为tree结构
export function toTree(arr, idField, pidField) {
  idField = idField || 'id'
  pidField = pidField || 'pid'

  let levels = [] , ids = [] , pids = []

  arr.forEach(a => {
    ids.push(a[idField])
    pids.push(a[pidField])
    // 增加children 字段
    a.children = a.children || []
  })
  
  // 寻找子元素
  _.forEach(pids, pid => {
    let p = _.find(arr, { [idField]: pid })  // 获取指向的父元素 注意是指向父元素的id字段
    if (p) {
      p.children = p.children || []
      _.forEach(arr, a => {
        // 找到子/父元素
        if (a[pidField] == pid) { 
          // a.parent = p
          if (p.children.indexOf(a) < 0) p.children.push(a)
        }
      })
    }
  })

  // 获取顶级节点
  let topNodes = _.difference(pids, ids)
  let tree = []
  _.forEach(topNodes, n => {
    _.forEach(arr, a => {
      if (a[pidField] == n) {
        if (tree.indexOf(a) < 0) tree.push(a)
      }
    })
  })

  // 增加level字段
  return addTreeLevel(tree)
}

