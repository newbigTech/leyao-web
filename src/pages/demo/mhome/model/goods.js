export default () => {
  return {
    type: 'appGoods',
    prop: {
      // 商品展示 0:小图 1:一大两小 2:大图 3:详细列表
      "layout": 0,
    },
    data: {
      // 需要展示的商品列表 (选择单个商品)
      goodsList: [],

      // 选择某类商品分组 
      goodsGroupId: '',

      // 选择的商品分组需要在首页显示的商品个数 6 12 18
      goodsNum: 6
    }
  }
}
