<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span style="line-height: 26px;">商品分类</span>
                <span style="float: right;">{{classifyName}}</span>
            </div>
            <div class="text item">
                <el-tree highlight-current :data="treeData" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
            </div>
        </el-card>
    </div>
</template>
<script>
import { getClassifyTree } from 'src/vuex/actions/mallClassifyAction'
export default {
    name: 'classify_tree',
    data() {
        return {
            treeData: [],
            classifyName:'',
            defaultProps: {
                children: 'children',
                label: 'label'
            }
        }
    },
    methods: {
        getClasssifyTreeData() {
            getClassifyTree().then(data => {
                const { success, result, msg } = data;
                if (success) {
                    this.treeData = result;
                }
            })
        },
        handleNodeClick(node){
          this.classifyName=node.label
          this.$emit('nodeClick',node)
        }
    },
    created(){
      this.getClasssifyTreeData();
    }
}
</script>
<style lang="sass">
    .el-card__body{padding: 0px;}
</style>
