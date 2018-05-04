<template>
  <div class="_tree-box">
    <div class="_tree-header">
      <h3>商品分类</h3>
      <div>
      </div>
    </div>
    <ul class="_tree" :class="{'_tree-select': type === 'treeSelect'}" v-show="treeData.length > 0">
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
        :init-classify="initClassify"
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
      initClassify: {
        type: Object,
        default: () => {}
      }
    },
    components: { treeItem },
    data() {
      return {
        e: new this.$root.constructor()
      }
    },

    created() {
      this.e.$on('treeRename',(...arg) => this.$emit('treeRename', ...arg))
      this.e.$on('treeAdd',(...arg) => this.$emit('treeAdd', ...arg))
      this.e.$on('treeRemove',(...arg) => this.$emit('treeRemove', ...arg))
      this.e.$on('treeClick',(...arg) => this.$emit('treeClick', ...arg))
      this.e.$on('treeCheck',(...arg) => this.$emit('treeCheck', ...arg))
    },

    methods: {
      add(arg) {
        this.$emit('add')
      },
      remove(arg) {
        this.$emit('remove')
      }
    },
    mounted() {

    }
  }
</script>
