<template>
<div class="_page-view">
  <div class="_page-header">
    <nav-bar></nav-bar>
  </div>

  <div class="_page-body">
    <aside class="_page-sidebar">
      <side-bar :data-source="dataSidebar"></side-bar>
    </aside>

    <div class="_page-content">
      <!-- router view -->
      <div class="_page-router">
        <router-view></router-view>
      </div>

      <div class="_page-footer">
        <footer-bar></footer-bar>
      </div>
    </div>
  </div>
</div>
</template>
<script>
import navBar from "components/nav-bar"
import sideBar from "components/side-bar"
import footerBar from "components/footer-bar"

// import dataSidebar from "components/side-bar/data.js"
export default {
  name: "app",
  components: {
    footerBar,
    navBar,
    sideBar
  },
  computed: {
    dataSidebar() {
      return this.$store.state.sidebarMenu
    }
  },
  data() {
    return {

    }
  }
}
</script>
