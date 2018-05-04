export default () => {
  return {
    name: 'appNotice',
    prop: {
      bgColor: '#4ADA9E',
      direction: 1, // 1 从下往上 2 从右往左 ...
      bgImg:''//背景图片
    },
    data: {
      title: "",
      list: []
    }
  }
}

