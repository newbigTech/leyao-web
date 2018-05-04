<template>
  <div class="_dashboard">
    <breadcrumb>
      <li><a href="#">Dashboard</a> </li>
      <li><a href="#">菜单-0</a></li>
      <li><span>菜单-0-1</span></li>
    </breadcrumb>
    <div class="tab-components">
      <tab-items>
        <li class="active"><a href="javascript:;">Tab-01</a></li>
        <li><a href="javascript:;">Tab-02</a></li>
        <li><a href="javascript:;">Tab-03超长超产</a></li>
        <li><a href="javascript:;">Tab-04</a></li>
        <li><a href="javascript:;">Tab-05</a></li>
      </tab-items>
      <h2 style="height: 120vh">hello</h2>
    </div>
  </div>
</template>

<script>
  import breadcrumb from "components/breadcrumb"
  import tabItems from "components/tab-items"
  export default {
    components: {
      breadcrumb,
      tabItems
    }
  }
</script>
