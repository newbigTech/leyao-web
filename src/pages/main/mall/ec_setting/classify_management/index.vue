<template>
  <!-- 商品分类管理 页面重构 by cy 2016-10-31 -->
  <div class="ec-setting-classify-management">
    <!-- 导航面包屑 -->
    <div class="_breadcrumb">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item to="/mall">商城</el-breadcrumb-item>
        <el-breadcrumb-item>电商设置</el-breadcrumb-item>
        <el-breadcrumb-item>商品分类管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- body -->
    <div class="_container-wrapper">
      <!-- 商品分类树 -->
      <div class="_sub-sidebar">
        <classifyTree :tree-data="treeData" label="name" id="classifyId"
          @treeClick="treeClick"
          @remove="removeClassify"
          @add="addClassify"
          :init-classify="classify_"
        ></classifyTree>
      </div>
      <!-- 商品分类属性tabs -->
      <div class="_sub-body">
        <!-- tab选项卡 -->
        <div class="_tab-items">
          <el-tabs type="card" @tab-click="tabClick" v-model="curTabName">
            <el-tab-pane label="分类详情" name="classifyDetail">
              <classify-detail :model="classify" :title="title" :tree-length="treeData.length" @save="saveClassify" @reback="reback" v-show="treeData.length > 0 || addFlage"></classify-detail>
            </el-tab-pane>

            <el-tab-pane label="分类属性" name="classifyProperty">
              <classify-property :e="e"></classify-property>
            </el-tab-pane>

            <el-tab-pane label="分类规格" name="classifySku">
              <classify-sku :e="e"></classify-sku>
            </el-tab-pane>

            <el-tab-pane label="分类品牌" name="classifyBrand">
              <classify-brand :e="e"></classify-brand>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import classifyTree from "./components/classify-tree"

  // 商品分类详情
  import classifyDetail from "./components/classify-detail"
  import classifyProperty from "./components/classify-property"
  import classifySku from "./components/classify-sku"
  import classifyBrand from "./components/classify-brand"

  import {
    _getClassifyTree,
    _getClassifyList2zTree,
    _addClassify,
    _getClassifyById,
    _updateClassifyById
  } from 'api/goodsClassifyAPI'

  import { toTree } from "lib/utils/tree"

  export default {
    components: {
      classifyTree, classifyDetail, classifyProperty, classifySku, classifyBrand
    },
    data() {
      return {
        e: new this.$root.constructor(),
        curTabName: 'classifyDetail',
        treeData: [],
        classify: {
          statusCode: 0,
          sortIndex: 1,
          parentId: 0,
          parentName: '顶级分类',
          classifySPic:'',
          classifyPic:''
        },
        classify_: {},
        title: '查看/修改分类详情',
        addFlage: false
      }
    },
    methods: {
      // 获取分类树数据
      getTreeData() {
        _getClassifyList2zTree({}).then(data => {
          // data = []
          if (data.length > 0) {
            this.treeData = toTree(data, 'classifyId', 'parentId')
            // 拿到初始id
            let initId = this.treeData[0]['classifyId']
            // 获取默认分类详情
            this.getClassifyDetailById(initId)
          } else {
            this.treeData = []
            this.classify = {}
            this.addFlage = false
          }
        })
      },

      // 获取商品分类详情
      getClassifyDetailById(id) {
        return _getClassifyById( { classifyId: id }).then( ({ success, result, msg }) => {
          if (!success) return false
          this.title = '查看/修改分类详情'
          this.classify = result || this.classify
          this.classify_ = Object.assign({}, result)
        })
      },

      // 保存分类信息
      saveClassify(model) {
        // 更新分类
        if (this.classify.classifyId) {
          _updateClassifyById(model).then(({success, result, msg}) => {
            if (!success) return false
            this.getTreeData()
            this.$message.success("保存成功!")
          })
        }
        // 增加分类
        else {
          _addClassify(this.classify).then(data => {
            if (!data.success) return false
            this.getTreeData()
            this.$message.success("新增分类成功!")
          })
        }
      },

      // 新增分类
      addClassify() {
        if (this.treeData.length == 0) this.addFlage = true
        this.title = "新增分类"
        this.classify = {
          classifyName: '',
          classifyId: '',
          parentName: this.classify_.classifyName || this.classify.parentName,
          sortIndex: 1,
          statusCode: 0,
          // parentId: this.classify_.classifyId || 0
          parentId: 0
        }

        // 变化一次,强制更新
        //this.curTabName = ''
        //this.$nextTick(() => {
          this.curTabName = "classifyDetail"
        //})
      },

      // 取消新增分类
      reback() {
        if (this.treeData.length == 0 && this.addFlage) return this.addFlage = false
        this.title = "查看/修改分类详情"
        this.classify = Object.assign({}, this.classify_)
      },


      // 删除分类
      removeClassify() {
        this.$confirm(`确定删除此分类: ${this.classify_.classifyName} ?`, '', {type: 'warning'})
        .then(() => {
          // 确定删除
          _updateClassifyById({
            classifyId: this.classify_.classifyId,
            deleteFlag: 1
          })
          .then(data => {
            if (!data.success) return this.$message.error('删除失败!')
            this.$message.success('删除成功!')
            this.getTreeData()
          })
        })
        .catch(() => {})
      },

      tabClick(tab) {
        // console.log(tab)
        this.e.$emit(tab.name, this.classify_.classifyId)
      },
      treeClick(arg) {
        this.getClassifyDetailById(arg.classifyId)

        // 变化一次,强制更新
        //this.curTabName = ''
       // this.$nextTick(() => {
          //this.curTabName = "classifyDetail"
          this.e.$emit(this.curTabName, arg.classifyId)
        //})
      },

    },

    // 组件初始化
    created() {
      // 获取分类树数据
      this.getTreeData()
    }
  }
</script>

<style lang="sass">

</style>
