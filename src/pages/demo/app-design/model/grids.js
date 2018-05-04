export default () => {
  return {
    name: 'appGrids',
    prop: {
      // 每行3个:3 每行4个:4 每行5个:5
      layout: 4
    },
    data: {
      // 数据来源 商品:0 商品分组:1 活动:2 专题:3 其他-1
      type: 0,
      list: [
        {
          picUrl: "https://dummyimage.com/300x300/81d6fa/fff",
          linkName: "充值有礼",
          linkId: '',
        },
        {
          picUrl: "https://dummyimage.com/300x300/ffbe32/fff",
          linkName: "天天拼团",
          linkId: '',
        },
        {
          picUrl: "https://dummyimage.com/300x300/ff7ec4/fff",
          linkName: "积分兑换",
          linkId: '',
        },
        {
          picUrl: "https://dummyimage.com/300x300/81D5FA/fff",
          linkName: "会员福利",
          linkId: '',
        }
      ]
    }
  }
}
