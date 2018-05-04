<template>
  <div class="_mall-page">
    <router-view></router-view>
  </div>
</template>
<script>
  //import sidebarMenu from "./sidebarData.js"
  import { toTree } from 'lib/utils/tree'
  import { openSidebarMenu } from 'lib/utils/sidebar'
  import reg from "lib/utils/regexp"
  export default {
    data() {
      return {
        treeData: []
      }     
    },
    computed: {
      headerMenus(){
        return this.$store.state.loginUser.menus
      }
    },
    // beforeRouteEnter (to, from, next) {
    //   console.log('beforeRouteEnter to from', to, from)
    //   next()
    // },
    watch: {
      $route(newVal, oldVal) {
        if (this.$route.name == 'mall') this.routerToDefautl()
      }
    },
    methods: {
      routerToDefautl(){  // 默认展开第一级路由
        let router = this.treeData[0].children[0]
        let funurl = router.functionUrl.replace('#', '')
        // 暂时对于中文路由处理
        if (reg.chinese.test(funurl)) return

        this.$router.push(funurl)
        this.$nextTick(() => openSidebarMenu(router.functionId))
      }
    },
    created() {
      // 保证创建一次事件回调 小 hack
      if (!this.$store.getters.ev._events['onLoadChildMenuData']) {
        this.$store.getters.ev.$on('onLoadChildMenuData',row => {
          this.treeData = toTree(row.rows, 'functionId', 'parentId')
          this.$store.commit("UPDATE_SIDEBAR", this.treeData)
          this.routerToDefautl()
        })
      }

      if (this.headerMenus && this.headerMenus.length > 0){
        this.treeData = toTree(this.headerMenus[0].rows, 'functionId', 'parentId')
        this.$store.commit("UPDATE_SIDEBAR", this.treeData)
        // 如果是/mall路由
        if ( this.$route.name == 'mall' ) this.routerToDefautl()
      } 
      else {
        this.$store.commit("UPDATE_SIDEBAR", [])
      }
     
    }
  }
</script>
