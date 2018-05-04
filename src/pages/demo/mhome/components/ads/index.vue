<template>
  <div class="_app-ads-wrapper">
    <div class="_app-ads">
      <div class="_app-ads-image-wrapper">
        <a href="javascript:;" class="_app-ads-item">
          <!-- <div class="_app-ads-image"><img src="http://placehold.it/750x300/81d6fa/fff"></div> -->
          <div class="_app-ads-image"><img src="https://dummyimage.com/750x300/81d6fa/fff"></div>
          <p class="_app-ads-caption">广告文字描述</p>
        </a>
      </div>
      <ul class="_app-ads-indicator">  
        <li class="">0</li>  
        <li class="">1</li> 
        <li class="active">2</li>  
        <li class="">3</li>  
        <li class="">4</li>  
      </ul>
    </div>
  </div>
</template>

<style lang="sass">
  ._app-ads {
    position: relative;
  }
  
  ._app-ads-image-wrapper {
    ._app-ads-item {
      display: block;
      position: relative;
    }
    ._app-ads-image {
      height: 128px;
      width: 100%;
      img { width: 100%; height: 100%; }
    }
    ._app-ads-caption {
      display: none;
      position: absolute;
      line-height: 30px;
      left: 0;
      right: 0;
      bottom: 0;
      text-align: left;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      
      background-color: rgba(0, 0, 0, 0.6);
      color: #fff;

    }
  }

  ._app-ads-indicator {
    position: absolute;
    bottom: 5px;
    left: 50%;
    transform: translateX(-50%);
    padding: 3px 1px;
    height: 9px;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 5px;
    li {
      float: left;
      margin: 0 5px;
      width: 4px;
      height: 4px;
      text-indent: 99em;
      border-radius: 50%;
      background: #8c8c8c;
      overflow: hidden;
    }
    li.active { background-color: #fe6c9c; }
  }
</style>
