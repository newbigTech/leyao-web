<template>
  <div class="_sku-classify">
    <div class="_container-wrapper">
      <!-- 商品分类树 -->
      <div class="_sub-sidebar">
        <!-- z-tree -->
        <div class="_z-tree">
          <div class="_z-tree-header">商品分类树</div>
          <ul class="ztree _classifyTree"></ul>
        </div>
      </div>
      <div class="_sub-body">
        <sku-list :e="e" name="sku_classify"></sku-list>
      </div>
    </div>
  </div>
</template>

<script>
  import skuList from "./components/sku-list"
  import { _getClassifyList2zTree } from 'api/goodsClassifyAPI'
  export default {
    props: {
      e: {
        type: Object,
        default: () => {
          return {
            $emit: () => {},
            $on: () => {}
          }
        }
      },
    },
    components: { skuList },
    data() {
      return {
        treeData: [],
        zTreeObj: {},
        inited: false,
        classifyId: ''
      }
    },
    methods: {
      // 配置z-tree
      initZtree(zNodes) {
        let setting = {
          view: { showIcon: false },
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
        this.zTreeObj = $.fn.zTree.init($(this.$el).find('._classifyTree'), setting, zNodes)
        this.zTreeObj.expandAll(true)
        return this.zTreeObj
      },

      treeClick(ev, id, node) {
        // 父节点 return
        if (node.childNumber !==0 ) {
          return this.e.$emit('sku-list' + 'sku_classify', {
            disabledAddBtn: true,
          })
        }
        this.classifyId = node.classifyId
        this.e.$emit('sku-list' + 'sku_classify', {
          disabledAddBtn: false,
          classifyId: node.classifyId,
          panelTitle: node.name + ': 分类规格列表',
        })
      },

      // 获取分类树数据
      getTreeData() {
        _getClassifyList2zTree({'statusCode':0}).then(data => {
          this.initZtree(data)
          this.treeData = Object.assign({}, data)
        })
      },
    },
    created() {

      this.e.$on('skuClassify', () => {
        if (this.inited) {
          this.e.$emit('sku-list' + 'sku_classify', {
            disabledAddBtn: false,
            inited: this.inited,
            classifyId: this.classifyId
          })
        } else {
          this.e.$emit('sku-list' + 'sku_classify', {
            disabledAddBtn: true,
            inited: this.inited
          })
          this.inited = true
        }
      })
    },
    mounted() {
      // 获取分类树数据
      this.getTreeData()
    }

  }
</script>
