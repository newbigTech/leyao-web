<template>
  <div class="demo-tree" style="margin: 20px">
    <div class="trre-category">
      <tree 
        title="商品分类编辑" 
        :tree-data="treeData"
        label="name"
        id="id"
        @treeRename="treeRename" 
        @treeAdd="treeAdd" 
        @treeRemove="treeRemove"
        @treeClick="treeClick">
      </tree>
    </div>

    <div class="tree-select">
      <tree 
        title="用户权限管理" 
        type="treeSelect"
        :tree-data="treeData"
        @treeCheck="treeCheck">
      </tree>
    </div>


  </div>
</template>

<style>
  .demo-tree { display: flex; }
  .trre-category { margin-right: 30px;  }
</style>

<script>
  import tree from "components/tree"
  import treeData from "components/tree/_model"
  import ids from "components/tree/_ids"
  import {updateTree, getCheckedIds} from "lib/utils/tree"

  updateTree(treeData, ids, 'cid')
  
  export default {
    components: { tree },
    data() { return {
      treeData
    }},
    methods: {
      treeRename(args) {
        console.log("treeRename---", args)
      },
      treeAdd(args) {
        console.log("treeAdd---", args)
      },
      treeRemove(args) {
        console.log("treeRemove---", args)
      },
      treeClick(args) {
        console.log("treeClick---", args)
      },
      treeCheck(args) {
        this.treeData = args.tree
        console.log("treeCheck---", args.tree)

        console.log(getCheckedIds(args.tree, "cid"))
        
        /*this.treeData = []
        this.$nextTick(() => {
          this.treeData = args.tree
        })*/
      }
    },
    created() {
      
    }
  }
</script>
