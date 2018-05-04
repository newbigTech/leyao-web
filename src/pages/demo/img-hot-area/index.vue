<template>
  <div class="_container">
    <card-panel>
      <h3 slot="title">图片热区选择</h3>
      <div slot="panel-body" class="flex">
        <div class="_img-hot">
          <draggable class="_img-hot-h" :list="imgHotData" @start="dragStart" @end="dragEnd">
          </draggable>
          <section class="_img-hot-b">
            <ul class="_img-hot-p" v-for="(p, i) in imgHotData">
              <li v-for="(it, ii) in p.areas" style="width: 540px;">
                <img src="/static/images/app/1080x1920/a.jpeg">
              </li>
            </ul>
          </section>
        </div>
        <div class="_img-btn">
          <button class="btn btn-default" @click="add">add</button>
        </div>
      </div>
    </card-panel>
  </div>
</template>

<script>
  import draggable from "vuedraggable"
  export default {
    components: { draggable },
    data() {
      return {
        imgHotData: [
          {
            id: 0,
            title: "",
            width: 0,
            height: 0,
            areas: [
              { x: 0, y: 0, w: 0, h: 0, }
            ]
          }
        ]
      }
    },
    methods: {
      dragStart(it) {
        console.log("dragStart: ", it)
      },
      dragEnd(it) {
        console.log("dragEnd: ", it)
      },
      add() {
        let $imgArea = $(this.$el).find("._img-hot-b img")
        var areaOptions = {
          x: Math.floor((Math.random() * 200)),
          y: Math.floor((Math.random() * 200)),
          width: Math.floor((Math.random() * 100)) + 50,
          height: Math.floor((Math.random() * 100)) + 20,
        };
        $imgArea.selectAreas('add', areaOptions);
      }
    },
    mounted() {
      let $imgArea = $(this.$el).find("._img-hot-b img")
      console.log('mounted: ', $imgArea)
      $imgArea.selectAreas({
        allowSelect: false,
        minSize: [10, 10],
        onChanged: function(event, id, areas) {
          console.log(areas.length + " areas", arguments);
        },
        width: 540,
        areas: [
          {
            x: 10,
            y: 20,
            width: 60,
            height: 100,
          }
        ]
      });
    }
  }
</script>

<style>
  ._img-hot-b {
    width: 542px;
    height: 962px;
    border: 1px solid #d1dbd5;
  }
  ._img-hot-b img {
    width: 540px;
  }
</style>
