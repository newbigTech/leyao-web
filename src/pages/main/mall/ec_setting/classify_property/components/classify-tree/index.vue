<template>
  <div class="_tree-box">
    <div class="_tree-header">
      <h3>商品分类树</h3>
    </div>
    <ul class="_tree" v-show="treeData.length > 0">
      <tree-item 
        v-for="(m, i) in treeData"
        :label="label"
        :model="m"  
        :index="i" 
        :class="{'has-children': m.children && m.children.length > 0}"
        :e="e"
        :d="treeData"
        :type="type"
        :id="id"
      ></tree-item>
    </ul>
  </div>
</template>

<script>
  // import "./_style.scss"
  import treeItem from "./_tree-item"
  export default {
    name: "tree",
    props: {
      treeData: {
        type: Array,
        default: () => []
      },
      title: {
        type: String,
        default: ""
      },
      type: {
        type: String,
        default: ""
      },
      label: {
        type: String,
        default: "label"
      },
      id: {
        type: String,
        default: "id"
      },
    },
    components: { treeItem },
    data() {
      return {
        e: new this.$root.constructor()
      }
    },
    created() {
      this.e.$on('treeClick',(...arg) => this.$emit('treeClick', ...arg))
    },
  }
</script>
