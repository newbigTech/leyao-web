export default (name) => {
  return {
    name: name,
    prop: {
      titleAlign: 'left'
    },
    data: {
      id: 0,
      // 数据来源 商品:0 分组:1
      type: name == 'appListA' ? 0 : 1,
      title: '列表标题',
      // 列表图片
      img: '',
      // 选择分组时分组名称
      name: '',
      showNumber: 3,
      list: []
    }
  }
}
