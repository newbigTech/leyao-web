<template>
  <card-panel>
    <h3 slot="title">选择店铺授权品类</h3>
    <div slot="panel-btns"></div>
    <div slot="panel-body">
      <ul class="ztree _shop-ztree"></ul>
      <el-button type="primary" @click.native="$emit('back', '3')">上一步</el-button>
      <el-button type="danger" @click.native="$emit('back', '0')">取消</el-button>
      <el-button type="primary" @click.native="next" style="width: 200px; margin-top: 20px;">保存并创建店铺</el-button>
    </div>
  </card-panel>
</template>

<script>
  import { getClassifyList2zTree } from 'src/vuex/actions/mallClassifyAction'
  let ztree = null
  export default {
    name: 'tabShopClassify',
    props: {
      model: { type: Object, default: () => {} }
    },
    data() {
      return {
        ztree: null,
        validatingStatus: false,
      }
    },
    methods: {
      // 获取分类树数据
      getTreeData() {
        getClassifyList2zTree({'statusCode':0}).then(data => {
         ztree = this.initZtree(data)
        })
      },

      // 配置z-tree
      initZtree(zNodes) {
        let setting = {
          view: { showIcon: false },
          check: { enable: true },
          data: {
            simpleData: {
              enable: true,
              idKey: "classifyId",
              pIdKey: "parentId",
            }
          },
          callback: {
            onClick: (ev, id, node) => this.treeClick(ev, id, node),
          }
        }
        let zTreeObj = $.fn.zTree.init($(this.$el).find('._shop-ztree'), setting, zNodes)
        zTreeObj.expandAll(true)
        return zTreeObj
      },

      //
      treeClick(ev, id, node) {

      },
      next() {
        let nodes = ztree.getCheckedNodes(true)
        if (nodes.length == 0) {
          this.$message.warning('请选择店铺授权品类')
          return false
        }
        this.model.classifyIdStr = nodes.map(item => item.classifyId).join(",")
        this.$emit('next', true)
        return true
      }
    },

    created() {
      this.getTreeData()
    }
  }
</script>
