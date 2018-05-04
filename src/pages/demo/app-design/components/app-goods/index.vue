<template>
  <div class="_app-goods">
    <div class="_app-goods-title _app-goods-title-default">
      <div class="_app-goods-label">{{obj.data.listTitle}}</div>
      <div class="_app-goods-more">
        <span>更多</span>
        <svg class="icon"><use xlink:href="#icon-arrow-right"></use></svg>
      </div>
    </div>

    <!-- 详细列表 -->
    <div class="_app-goods-list _app-goods-list-detail" v-show="obj.prop.layout == 0">
      <a href="javascript:;" class="_app-goods-list-detail-item" v-for="(item, index) in obj.data.list">
        <div class="_app-goods-list-detail-item-image">
          <img :src="item.picUrl">
        </div>
        <div class="_app-goods-list-detail-item-info">
          <h1>{{item.linkName}}</h1>
          <h2>{{item.desc}}</h2>
          <div class="_app-goods-list-detail-item-info-meta">
            <p class="_app-goods-list-detail-item-price">
              <strong>{{item.mprice}}</strong>
              <small>{{item.aprice}}</small>
            </p>
            <p class="_app-goods-list-detail-item-sale-number" v-show="0">
              <small>已售9999</small>
            </p>

            <p class="_app-goods-list-detail-item-shopcar-icon">
              <svg class="icon"><use xlink:href="#icon-shopcar-add"></use></svg>
            </p>
          </div>
        </div>
      </a>
    </div>
    
    <!-- 小图列表 -->
    <div class="_app-goods-list _app-goods-list-card _bordered" v-show="obj.prop.layout != 0" :class="{'_app-goods-list-card3': obj.prop.layout == 2}">
      <a href="javascript:;" class="_app-goods-list-card-item" v-for="(item, index) in obj.data.list">
        <div class="_app-goods-list-card-item-image">
          <img :src="item.picUrl">
          <!-- <img src="https://dummyimage.com/320x320/81d6fa/fff" class="_app-goods-list-card2-img">
          <img src="https://dummyimage.com/120x90/81d6fa/fff" class="_app-goods-list-card3-img"> -->
        </div>
        <div class="_app-goods-list-card-item-info">
          <h1>{{item.linkName}}</h1>
          <p class="_app-goods-list-card-item-price">{{item.mprice}}</p>
          <div class="_app-goods-list-card-item-shopcar-icon">
            <svg class="icon"><use xlink:href="#icon-shopcar-add"></use></svg>
          </div>
        </div>
      </a>
    </div>

  </div>
</template>

<style scoped>
  ._app-goods {
    background: #fff;
  }

  /* goods title */
  ._app-goods-title {
    position: relative;
  }
  ._app-goods-title::after {
    content: " ";
    display: block;
    position: absolute; left: 0; right: 0; bottom: 0;
    border-top: 1px solid #d9d9d9;
    height: 1px;
    transform-origin: 0 100%;
    transform: scaleY(0.5);
  }

  ._app-goods-title-default {
    display: flex;
    justify-content: space-between;
  }
  
  ._app-goods-title-default ._app-goods-label {
    position: relative;
    height: 40px;
    display: flex;
    align-items: center;
    flex: 1;
    padding: 0 5px 0 10px;
    font-size: 15px;
    margin-left: 15px;
  }

  ._app-goods-title-default ._app-goods-label::before {
    content: " ";
    display: block;
    color: #1d8ce0;
    height: 21px;
    border-right: 3px solid currentcolor;

    position: absolute;
    left: 0; top: 0px; bottom: 0; margin: auto 0;
  }
  
  ._app-goods-title-default ._app-goods-more {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px 0 10px;
    color: #777;
    font-size: 15px;
    cursor: pointer;
  }
  ._app-goods-title-default ._app-goods-more svg.icon {
    font-size: 16px;
    margin-left: -5px;
  }

  
  /* goods list */

  /* list-detail */
  ._app-goods-list-detail {

  }
  ._app-goods-list-detail-item {
    position: relative;
    margin-left: 15px;
    padding: 10px 10px 10px 0;
    display: flex;
  }
  ._app-goods-list-detail-item::after {
    display: block;
    content: " ";
    position: absolute;
    left: 0; right: 0; bottom: 0;
    border-top: 1px solid #d9d9d9;
    transform-origin: 0 100%;
    transform: scaleY(0.5);
  }
  ._app-goods-list-detail-item-image {
    position: relative;
    font-size: 0;
    margin-right: 10px;
    width: 90px;
    height: 90px;
  }
  ._app-goods-list-detail-item-image img { width: 100%; height: 100%;}
  ._app-goods-list-detail-item-info {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 3px 0 2px 0;
    overflow: hidden;
  }
  ._app-goods-list-detail-item-info > h1 {
    font-size: 17px;
    font-weight: 500;
    max-width: 150px;
    padding-right: 5px;
    margin-bottom: 3px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  ._app-goods-list-detail-item-info > h2 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 13px;
    color: #777;
  }
  ._app-goods-list-detail-item-info-meta {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }
  ._app-goods-list-detail-item-price strong { 
    color: #f63;
    font-size: 21px;
    text-decoration: none;
    font-weight: 500;
  }
  ._app-goods-list-detail-item-price small { 
    font-size: 13px;
    color: #777;
    text-decoration: line-through;
    vertical-align: 1px;
  }
  ._app-goods-list-detail-item-sale-number {
    color: #777;
    font-size: 13px;
  }
  ._app-goods-list-detail-item-shopcar-icon {
    font-size: 25px;
    color: #b3b2b2;
    position: absolute;
    right: 8px;
    bottom: 0px;
  }

  

  /* 小图列表 */
  ._app-goods-list-card {
    position: relative;
    overflow: hidden;
    padding: 0px 0px;
  }
  ._app-goods-list-card._bordered::before,
  ._app-goods-list-card._bordered::after {
    display: block;
    content: " ";
    position: absolute; left: 0; right: 0;
    height: 1px;
    border-top: 1px solid #d9d9d9;
    transform-origin: 0 0;
  }
  ._app-goods-list-card._bordered::before {
    display: none;
    top: 0;
    transform: scaleY(0.5);
  }
  ._app-goods-list-card._bordered::after {
    display: none;
    bottom: 0;
    transform: scaleY(0.5);
  }


  ._app-goods-list-card-item {
    position: relative;
    display: block;
    width: 50%;
    padding: 0 2px;
    float: left;
    margin-bottom: 4px;
  }
  ._app-goods-list-card._bordered ._app-goods-list-card-item {
    margin-bottom: 0px;
    padding: 5px;
  }
  ._app-goods-list-card._bordered ._app-goods-list-card-item::before,
  ._app-goods-list-card._bordered ._app-goods-list-card-item::after {
    content: " ";
    display: block;
    position: absolute;
    bottom: 0; right: 0;
  }
  ._app-goods-list-card._bordered ._app-goods-list-card-item::before {
    top: 0;
    width: 1px;
    border-right: 1px solid #d9d9d9;
    transform-origin: 100% 0;
    transform: scaleX(0.5);
  }
  ._app-goods-list-card._bordered ._app-goods-list-card-item::after {
    left: 0;
    height: 1px;
    border-top: 1px solid #d9d9d9;
    transform-origin: 0 100%;
    transform: scaleY(0.5);
  }

  ._app-goods-list-card-item-image {
    width: 100%;
  }
  ._app-goods-list-card-item-image img { max-width: 100%; height: auto; }

  ._app-goods-list-card3-img { display: none;  }
  
  ._app-goods-list-card-item-info {
    padding-right: 25px; 
  }

  ._app-goods-list-card-item-info h1 {
    padding: 5px 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  ._app-goods-list-card-item-info {
    text-align: center;
  }
  ._app-goods-list-card-item-price {
    color: #ff7e05;
    font-weight: 500;
  }
  ._app-goods-list-card-item-shopcar-icon {
    position: absolute;
    bottom: 0px;
    right: 5px;
    font-size: 25px;
    color: #b3b2b2;
  }

  ._app-goods-list._app-goods-list-card3 ._app-goods-list-card-item {
    width: 33.333%;
  }
  
  ._app-goods-list._app-goods-list-card3 ._app-goods-list-card-item ._app-goods-list-card-item-image img {
    max-height: 90px;
  }

  ._app-goods-list._app-goods-list-card3 ._app-goods-list-card3-img { display: block;  }
  ._app-goods-list._app-goods-list-card3 ._app-goods-list-card2-img { display: none;  }
  /* ._app-goods-list._app-goods-list-card3 ._app-goods-list-card-item-info {
    text-align: left;
  } */
  ._app-goods-list._app-goods-list-card3 ._app-goods-list-card-item-info {
    padding: 0 2px;
  }
  ._app-goods-list._app-goods-list-card3 ._app-goods-list-card-item-info h1 { 
    padding: 3px 0;  
  }
  /* ._app-goods-list._app-goods-list-card3 ._app-goods-list-card-item-price { text-align: center;  } */
  ._app-goods-list._app-goods-list-card3 ._app-goods-list-card-item-shopcar-icon {
    display: none;
  }

  ._app-goods-list._app-goods-list-card3 ._app-goods-list-card-item:nth-child(4) { display: none;  }
</style>

<script>
  export default {
    name: "appGoods",
    props: { obj: { type: Object, default: () => { return {} } } },
  }
</script>
