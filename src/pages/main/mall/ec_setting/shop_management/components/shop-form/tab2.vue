<template>
  <card-panel>
    <h3 slot="title">选择店铺授权品类</h3>
    <div slot="panel-btns"></div>
    <div slot="panel-body">
      <ul class="ztree _shop-ztree"></ul>

      <el-button type="primary" @click.native="save" style="margin-top: 20px;">保存修改</el-button>
    </div>
  </card-panel>
</template>

<script>
  import { getClassifyList2zTree } from 'src/vuex/actions/mallClassifyAction'
  import { _getMallShopByShopId,_getMallShopClassifyListBySId } from 'src/vuex/api/shopAPI'
  import { _updateMallShop } from 'src/vuex/api/shopAPI'
  let ztree = null
  export default {
    name: 'tabShopClassify',
    props: {
      model: { type: Object, default: () => {} }
    },
    data() {
      return {
        // model: this.e.model,
        ztree: null,
        validatingStatus: false,
        validated: false,
      }
    },
    methods: {
      // 获取分类树数据
      getTreeData() {
        let temArray = this.model.classifyStr.split(",")
        getClassifyList2zTree({'statusCode':0}).then(data => {
          data.forEach(function(node) {
            temArray.forEach(function(item) {
              if (item == node.classifyId) node.checked = true
            })                      
          })
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
      save() {
        this.validated = true
        let nodes = ztree.getCheckedNodes(true)
        // if (nodes.length == 0) { 
        //   this.$message.warning('请选择店铺授权品类')
        //   return false
        // }
        this.model.classifyIdStr = nodes.map(item => item.classifyId).join(",")
        _updateMallShop(this.model).then((data) => {
          const {success, msg} = data;
          if(success) {
            // console.log(JSON.stringify(msg))
            this.$message({message: '修改成功', type: 'success'});
            this.$emit('save', true)
          } else {
            console.log("失败")
            // this.$emit('save', false)
          }
        })

        return true
      }
    },

    created() {
    }
  }
</script>
