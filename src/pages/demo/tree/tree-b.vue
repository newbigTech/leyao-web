<template>
  <div class="demo-tree-b" style="margin: 20px">
    <el-tree
      :data="regions"
      :props="props"
      :load="loadNode"
      render-content="renderContent"
      lazy
      show-checkbox
      @check-change="handleCheckChange" @node-click="handleNodeClick">
    </el-tree>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        regions: [{
          'name': 'region1',
          'a': 'a',
          'checked': true,
        }, {
          'name': 'region2',
          'a': 'b'
        }],
        props: {
          label: 'a',
          children: 'zones'
        },
        count: 1,
        renderContent(h,n) {
          console.log("renderContent")
        }
      }
    },
    methods: {
      handleCheckChange(data, checked, indeterminate) {
        console.log(arguments);
        // console.log(getCheckedNodes())
      },
      handleNodeClick(data) {
        console.log("click: ", data);
      },

      loadNode(node, resolve) {
        console.log("node: ", node)
        
        node.checked = true
        if (node.level === -1) {
          return resolve([
            { a: 'region1s' }, 
            { a: 'region2s' }]
          );
        }
        if (node.level > 4) return resolve([]);

        var hasChild;
        if (node.data.a === 'region1s') {
          hasChild = true;
        } else if (node.data.a === 'region2s') {
          hasChild = false;
        } else {
          hasChild = Math.random() > 0.5;
        }
        
        setTimeout(() => {
          var data;
          if (hasChild) {
            data = [{
              a: 'zone' + this.count++
            }, {
              a: 'zone' + this.count++
            }];
          } else {
            data = [];
          }

          resolve(data);
        }, 500);
      }
    }
  };
</script>
