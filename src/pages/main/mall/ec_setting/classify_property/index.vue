<template>
  <div class="ec-setting-classify-property">
    <!-- 导航面包屑 -->
    <div class="_breadcrumb">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item to="/mall">商城</el-breadcrumb-item>
        <el-breadcrumb-item>电商设置</el-breadcrumb-item>
        <el-breadcrumb-item>分类属性管理</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <!-- body -->
    <div class="_container-wrapper">
      <!-- 商品分类树 -->
      <div class="_sub-sidebar">
        <!-- z-tree -->
        <div class="_z-tree">
          <div class="_z-tree-header">商品分类树</div>
          <ul id="_classifyTreeProperty" class="ztree"></ul>
        </div>
      </div>
      <!-- 分类属性列表 -->
      <div class="_sub-body">
        <card-panel class="_panel-outer">
          <h3 slot="title">{{panelTitle}}</h3>
          <div slot="panel-btns">
            <button class="btn btn-sm btn-success" :disabled="disabledAddBtn" @click="openAddDialog">新增</button>
          </div>
          <div slot="panel-body">
            <!-- <div class="_no-data bg-blue-light" v-show="!tableData.length"> <span>请选择具体分类</span> </div> -->
            <div class="_table-list">
              <table class="table table-bordered table-hover center">
                <thead><tr> <th>属性名</th> <th>类型</th> <th>必填</th> <th>排序</th> <th>操作</th> <th>属性项</th></tr></thead>
                <tbody>
                  <tr v-show="!tableData.length"><td colspan="6">暂无数据</td></tr>
                  <template v-for="(d, i) in tableData">
                    <tr :id="d.propertyId" :class="{'_open': d.propertyId == propertyId}">
                      <td>{{d.propertyName}}</td>
                      <td>{{d.propertyType == 0 ? '文本' : (d.propertyType == 1?'单选':'多选')}}</td>
                      <td>{{d.isRequired == 0 ? '否' : '是'}}</td>
                      <td>{{d.sortIndex}}</td>
                      <td class="_actions" width="15%">
                        <button class="btn btn-xs btn-warning" @click="onEdit(d)">编辑</button>
                        <button class="btn btn-xs btn-danger" @click="onDelete(d)">删除</button>
                      </td>
                      <td class="_actions" width="10%">
                        <button type="button" v-if="d.propertyType!=0" class="btn btn-xs btn-link" @click.stop="clickProperty(d)">设置属性项 <i class="el-icon-d-arrow-right"></i></button>
                      </td>
                    </tr>
                    <tr class="_hidden-row" v-show="d.propertyId == propertyId">
                      <td colspan="6">
                        <classify-property-item :e="e" :id="d.propertyId" :key="d.propertyId"></classify-property-item>
                      </td>
                    </tr>
                  </template>
                </tbody>
              </table>
              <!-- 分页 -->
              <div class="_pagination">
                <el-pagination :total="total" :page-size="pageSize" layout="total, sizes, prev, pager, next" @current-change="handleCurrentChange" @size-change="handleSizeChange">
                </el-pagination>
              </div>
            </div>
          </div>
        </card-panel>
      </div>

      <!--新增分类属性Dialog-->
      <el-dialog :title="dialogTitle" v-model="showDialog">
        <el-form :model="classifyPropertyObj" :rules="rules" ref="classifyPropertyObj">
          <el-form-item label="属性名" :label-width="formLabelWidth" prop="propertyName">
              <el-input v-model="classifyPropertyObj.propertyName" auto-complete="off" :maxlength="10" style="width:50%"></el-input>
          </el-form-item>
          <el-form-item label="属性类型" :label-width="formLabelWidth">
              <el-select v-model="classifyPropertyObj.propertyType" style="width:50%">
                <el-option label="文本" :value="0"></el-option>
                <el-option label="单选" :value="1"></el-option>
                <el-option label="多选" :value="2"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="是否必选" :label-width="formLabelWidth">
              <el-radio-group v-model="classifyPropertyObj.isRequired">
                  <el-radio :label="0">否</el-radio>
                  <el-radio :label="1">是</el-radio>
              </el-radio-group>
          </el-form-item>
          <el-form-item label="排序" :label-width="formLabelWidth">
              <el-input-number v-model="classifyPropertyObj.sortIndex" :min="1" :max="100"></el-input-number>
          </el-form-item>
        </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click.native.prevent="saveClassifyObj">确 定</el-button>
            <el-button @click.native.prevent="showDialog = false">取 消</el-button>
          </span>
      </el-dialog>

    </div>
  </div>
</template>

<script>
  import { _getClassifyList2zTree } from 'api/goodsClassifyAPI'
  import {
      getClassifyPropertyPageList,
      addMallClassifyProperty,
      deleteMallClassifyProperty
  } from 'actions/classifyPropertyAction'

  import classifyPropertyItem from "./components/classify-property-item"

  export default {
    components: {
      classifyPropertyItem
    },
    data() {
      return {
        e: new this.$root.constructor(),
        title: '',
        treeData: [],
        tableData: [],
        total: 0,
        pageSize: 10,
        page: 1,
        classifyId: 0,
        propertyId: -1,
        panelTitle: "分类属性列表",
        dialogTitle:'新增分类属性',
        disabledAddBtn: true,
        showDialog: false,
        formLabelWidth: '20%',
        classifyPropertyObj: {
            propertyName: '',
            propertyType: 0,
            isRequired: 0,
            sortIndex: 1
        },
        // 表单验证
        rules: {
          propertyName: [{
            required: true,
            message: '请输入属性名',
            trigger: 'blur'
          }],
          propertyType: [{
            required: true,
            message: '请选择属性类型',
            trigger: 'change'
          }]
        }
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
        let zTreeObj = $.fn.zTree.init($(this.$el).find('#_classifyTreeProperty'), setting, zNodes)
        zTreeObj.expandAll(true)
        return zTreeObj
      },

      // 获取分类树数据
      getTreeData() {
        _getClassifyList2zTree({'statusCode':0}).then(data => {
          this.initZtree(data)
          this.treeData = Object.assign({}, data)
        })
      },

      // 分类树点击处理回调
      treeClick(ev, id, node) {
        //console.log(node)
        // 父节点 return
        if (node.childNumber !==0 ) {
          return this.disabledAddBtn = true
        }
        this.disabledAddBtn = false
        this.classifyId = node.classifyId
        this.panelTitle = node.name + ': 分类属性列表'
        this.loadTableData()
      },

      // 加载分类属性列表
      loadTableData() {
        let params = {
          pageNo: this.page,
          pageSize: this.pageSize,
          classifyId: this.classifyId
        }
        getClassifyPropertyPageList(params).then(data => {
          const { success, result, msg } = data
          if (success) {
            this.tableData = result.rows
            this.total = result.total
          }
        })
      },

      // 打开增加窗口
      openAddDialog(){
          this.dialogTitle='新增分类属性'
          this.classifyPropertyObj={
              propertyName: '',
              propertyType: 0,
              isRequired: 0,
              sortIndex: 1
          }
          this.showDialog = true
      },

      // 保存
      saveClassifyObj() {
        this.$refs.classifyPropertyObj.validate((valid) => {
          if (valid) {
            this.classifyPropertyObj.classifyId = this.classifyId
            addMallClassifyProperty(this.classifyPropertyObj).then(data => {
                const { result, msg, success } = data
                if (success) {
                    this.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                    this.showDialog = false
                    this.loadTableData()
                }else{
                    this.$message.error(msg);
                }
            })
          } else {
              return false;
          }
        })
      },


      // 编辑属性
      onEdit(row){
        this.addPropertyDialogTitle='修改分类属性'
        this.classifyPropertyObj.propertyName=row.propertyName
        this.classifyPropertyObj.propertyType=row.propertyType
        this.classifyPropertyObj.isRequired=row.isRequired
        this.classifyPropertyObj.sortIndex=row.sortIndex
        this.classifyPropertyObj.propertyId=row.propertyId
        this.showDialog = true
      },
      // 删除
      onDelete(row){
        this.classifyPropertyObj.propertyId=row.propertyId

        this.$confirm(`确定删除此分类属性: ${row.propertyName} ?`, '', { type: 'warning'})
        .then(data => {
          deleteMallClassifyProperty(this.classifyPropertyObj).then(data=>{
            const { result, msg, success } = data
            if (success) {
              this.$message.success('操作成功')
              this.loadTableData()
            }else{
              this.$message.error(msg);
            }
          })
        })
        .catch(data => {})

      },

      // 查看具体属性项
      clickProperty(item) {
        if (item.propertyId == this.propertyId) {
          this.propertyId = -1
        } else {
          this.e.$emit("load-classify-item" + item.propertyId, item)
        }
      },

      // 处理分页
      handleSizeChange(val) {
        this.pageSize = val
        this.loadTableData()
      },
      handleCurrentChange(val) {
        this.page = val
        this.loadTableData()
      },
    },

    // 组件初始化
    created() {
      this.e.$on('load-classify-item-done', id => this.propertyId = id)
    },
    mounted() {
      // 获取分类树数据
      this.getTreeData()
    }
  }
</script>

<style lang="sass">
  ._classify-property {
    ._tree-item.has-children::after {
      // content: ' ';
      // display: block;
      // width: 245px;
      // height: 34px;
      // background-color: red;
      // position: absolute;
    }
  }
</style>
