export default () => {
  return {
    name: 'appGoods',
    prop: {
      // 详细列表:0 小图展示A:1 小图展示B:2 
      "layout": 0,
      // 显示个数 6, 12, 18
      "showNumber": 6
    },
    data: {
      // 数据来源 商品:0 商品分组:1 活动:2 专题:3 其他-1
      type: 0,
      listTitle: '列表标题',
      list: [
        {
          picUrl: "https://dummyimage.com/320x320/81d6fa/fff&text=+",
          linkName: "商品名称",
          linkId: '',
          desc: '商品简短描述...',
          mprice: '27.8',
          aprice: '30.5'
        },
        {
          picUrl: "https://dummyimage.com/320x320/81d6fa/fff&text=+",
          linkName: "商品名称",
          linkId: '',
          desc: '商品简短描述...',
          mprice: '27.8',
          aprice: '30.5'
        },
        {
          picUrl: "https://dummyimage.com/320x320/81d6fa/fff&text=+",
          linkName: "商品名称",
          linkId: '',
          desc: '商品简短描述...',
          mprice: '27.8',
          aprice: '30.5'
        }
      ]
    }
  }
}
