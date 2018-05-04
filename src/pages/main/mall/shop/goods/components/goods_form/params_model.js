export default{
  skuSoruceType:0,//数据来源 0 自建 1 erp
  view:false,//是否为查看操作 true 是 false 否
  shopClassifyData:[],//店铺品类
  goodsData:[],//商品列表(单品和多规格商品)
  shopCustomClassifyData:[],//店铺自定义分组
  shopGlobalSkuPropertyData:[],//店铺品类规格列表 用于设置商品规格下拉数据
  shopClassifyPropertyData:[],//店铺品类属性列表
  shopBrandList:[],//品牌列表
  goodsObj:{//商品对象
    goodsId:undefined,//商品主键
    classifyId:'',//所属商品分类 0 与分类无关 对应叶子节点
    customClassifyId:0,//所属店铺自定义分类 0 与分类无关 对应叶子节点
    goodsSn: '',//商品编码 店铺唯一
    goodsName: '',//商品名称
    goodsFullName: '',//商品全称
    goodsDesc: '',//商品简介
    sortIndex: 1,//排序
    goodsPic: '',//商品图片
    goodsType: 0,//商品类型 0 SPU商品 1 SKU商品 2 组合商品
    goodsItemsData:[],//组合商品列表
    goodsFileData:[],//商品图片列表
    goodsDetailFileData:[],//商品详情图片列表
    goodsSkuData:[],//商品sku列表
    goodsSkuPropertyData:[],//商品sku属性列表
    goodsPropertData:[],//商品属性列表
    limitNumber:0,//限购数量 0 表示无限制
    unit:'',//销售单位
    mprice:0,//市场价
    price:0,//销售价
    stockType:0,//库存类型 0 无限制 1 SPU独立库存 2 SKU共享库存 3 SKU独立库存
    stockNumber:0,//库存
    stockWarn:0,//库存提醒设置数量

  }
}
