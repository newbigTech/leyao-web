<template>
  <div>
    <el-row>
      <el-button @click="hideTab">hideTab</el-button>
      <el-button @click="showTab">showTab</el-button>
    </el-row>
    <el-tabs type="card" @tab-click="handleClick" @tab-remove="handleRemove">
      <!-- <el-tab-pane label="用户管理"><card-panel></card-panel></el-tab-pane> -->
      <!-- <el-tab-pane label="配置管理">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane> -->
      <el-tab-pane v-for="(tab, i) in tabs" :label="tab.label">  
        <component :is="ctab">
          <h3 slot="title">{{'hello' + i}}</h3>
          <div slot="panel-body">helloo</div>
        </component>
      </el-tab-pane>
    </el-tabs>
    <div>
      <component :is="ctab"></component>
    </div>
  </div>
</template>

<script>
  import cardPanel from "components/card-panel"
  export default {
    components: {
      cardPanel
    },
    data() {
      return {
        showTab: false,
        tabs: [
          {label: '用户管理', content: '<card-panel></card-panel>'},
          {label: '配置管理', content: '配置管理'},
          {label: '角色管理', content: '角色管理'},
          {label: '定时任务补偿', content: '定时任务补偿'}
        ],
        ctab: 'cardPanel'
      }
    },
    methods: {
      handleRemove(tab) {
        console.log(tab);
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      hideTab() {
        console.log('hideTab')
        // this.tabs.push({label: '定时任务补偿12', content: '定时任务补偿'})
        // this.tabs.splice(1,1)
        console.log(this.tabs)
      },
      showTab() {
        this.tabs.push({label: '定时任务补偿12', content: '定时任务补偿'})
        console.log('showTab')
      }
    }
  };
</script>
