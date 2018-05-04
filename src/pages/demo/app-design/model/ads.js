export default () => { 
  return {
    name: 'appAds',
    prop: {
      // 图片轮播:0 单个图片:1
      layout: 0
    },
    data: {
      // 数据来源 商品:0 商品分组:1 活动:2 专题:3
      type: -1,
      list: [
        {
          // 广告标题
          title: '',
          // 广告图片
          picUrl: 'https://dummyimage.com/750x360/81d6fa/fff',
          // 链接名称
          linkName: '元旦活动优惠',
          // 链接ID
          linkId: ''
        },
        {
          // 广告标题
          title: '',
          // 广告图片
          picUrl: 'https://dummyimage.com/750x360/ffbe32/fff',
          // 商品来源: 商品 专题 活动 商品分组
          from: '',
          // 链接名称
          linkName: '圣诞特辑',
          // 链接ID
          linkId: ''
        },
      ]
    }
  }
}
