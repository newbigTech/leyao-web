<template>
  <div class="_container">
    <card-panel>
      <h3 slot="title">二维码</h3>
      <div slot="panel-body">
        <qriously value="https://baidu.com" :size="200" class="qr"/>
        <div>
          <a class="btn btn-default" href="javascript:;" @click="putImage($event)">保存二维码图片</a>
        </div>
      </div>
    </card-panel>
  </div>
</template>

<script>

  export default {
    methods: {
      putImage($event) {
        // http://stackoverflow.com/questions/24806167/save-canvas-with-a-custom-file-name
        // http://stackoverflow.com/questions/11112321/how-to-save-canvas-as-png-image
        let canvas = this.$el.querySelector(".qr").children[0]
        let down = $event.currentTarget

        down.download = "qr.png"

        if (canvas.getContext) {
          var ctx = canvas.getContext("2d");
          // var myImage = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
          var myImage = canvas.toDataURL("image/png").replace(/^data:image\/[^;]/, 'data:application/octet-stream');
          down.href = myImage

          // window.location.href=myImage; // it will save locally
        }
      }
    },
    data() {
      return {
      }
    },
  }
</script>
