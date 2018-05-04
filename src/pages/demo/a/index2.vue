<template>
  <div class="_container">
    <card-panel>
      <h3 slot="title">二维码</h3>
      <div slot="panel-body">
        <vue-q-art :config="config"></vue-q-art>
      </div>
    </card-panel>
  </div>
</template>

<script>
  import VueQArt from 'vue-qart'
  export default {
    components: {VueQArt}
    data() {
      return {
        qr: {
          value: 'https://www.baidu.com',
          // imagePath: './examples/assets/logo.png',
          // filter: 'color'
        },
      }
    },
  }
</script>
