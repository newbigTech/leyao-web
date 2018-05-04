<template>
  <li class="_menu-item" :class="['level-' + model.level, 'index-' + index, {'active':curActived(model.functionUrl)}]">
    <a class="_menu-toggle"
      href="javascript:void(0)"
      :style="{paddingLeft: model.level * 15 + 15 + 'px'}"
      @click="toggle(model.level, index, model.functionUrl)"
      :id="model.functionId"
    >
      <i class="_menu-icon" v-show="!!model.icon"></i>
      <span class="_menu-text">{{model.functionName}}</span>
      <i class="_arrow fa fa-angle-right" v-show="hasChildren"></i>
    </a>
    <ul class="_sub-menu" v-show="hasChildren">
      <item
        v-for="(model, index) in model.children"
        :model="model"
        :index = "index"
      >
      </item>
    </ul>
  </li>
</template>

<script>
  import item from "./item"
  import reg from "lib/utils/regexp"
  export default {
    name: "item",
    components: {
      item
    },
    props: {
      model: {
        type: Object,
        default: () => {}
      },
      index: {
        type: Number,
        default: 0
      }
    },
    computed: {
      hasChildren() {
        return this.model.children && this.model.children.length > 0
      },
      styled() {
        return {
          paddingLeft: '15px'
        }
      }
    },
    data() {
      return {
        open: false,
        activeLi: false
      }
    },
    methods: {
      curActived(v){
        if(v&&v.indexOf('#')!=-1){
          this.activeLi = this.$route.path == v.split('#')[1]
          return this.activeLi
        }
        return false
      },
      toggle(level, index, functionUrl) {
        if (this.hasChildren) {
          let $li = $(this.$el)
          let $curUl = $li.children('._sub-menu')
          let $opens = $li.parent('ul').children("._open")
          // console.log("$opens:", $opens)
          if ($opens.length) {
            $opens.each(function() {
              if ( !$(this).hasClass("index-" + index) ) {
                $(this).removeClass("_open")
                $(this).children("._sub-menu").velocity("slideUp", { duration: 200 })
              }
            })
          }

          if ($li.hasClass('_open')) {
            $li.removeClass('_open')
            $curUl.velocity("slideUp", { duration: 200 })
          } else {
            $li.addClass("_open")
            $curUl.velocity("slideDown",{ duration: 200 })
          }
        } else {

          if (this.model.functionUrl.indexOf('javascript') >= 0) return

          // 处理http开头外部链接 打开新的窗口
          if (/^http(s?):\/\/[^\s]*/.test(functionUrl)) {
            return window.open(functionUrl)
          }

          // 暂时处理开发中的中文路由
          if (reg.chinese.test(this.model.functionUrl)) return

          this.$router.push({path: functionUrl.replace('#', '')})
          this.$nextTick(() => {
            $('._side-bar').find('._menu-item').removeClass('_contain-active')
            $(this.$el).closest('._open').addClass('_contain-active')
          })
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
        if (this.hasChildren) {
          // console.log($(this.$el).find('.active'))
          let $li = $(this.$el)
          if ($li.find('.active').length > 0) {
            let $curUl = $li.children('._sub-menu')
            $li.addClass("_open _contain-active")
            $curUl.velocity("slideDown",{ duration: 200 })
          }
        }
      })
    }
  }
</script>
