<template>
  <div class="_sku-list">
    <div class="_container">
      <card-panel class="_normal">
        <h3 slot="title">分类规格列表</h3>
        <div slot="panel-btns">
          <button class="btn btn-sm btn-success" @click="add" :disabled="disabledAddBtn">新增</button>
        </div>
        <div slot="panel-table">
          <div class="_table-list">
            <table class="table table-bordered table-hover center">
              <thead><tr> <th>规格名</th> <th>排序</th>  <th> 操作</th> <th>规格项</th></tr></thead>
              <tbody>
                <tr v-show="!tableData.length"><td colspan="20">暂无数据</td></tr>
                <template v-for="(r, i) in tableData">
                  <tr :id="r.skuId" :class="{'_open': r.skuId == skuId}">
                    <td>{{r.skuName}}</td>
                    <td>{{r.sortIndex}}</td>
                    <td width="15%">
                      <el-button type="primary" size="mini" @click="edit(r)">编辑</el-button>
                      <el-button type="danger" size="mini" @click="remove(r)">删除</el-button>
                      <!--<button class="btn btn-xs btn-warning" ></button>
                      <button class="btn btn-xs" style="background: #FF4949 " @click="remove(r)">删除</button>-->
                    </td>
                    <td class="_actions" width="10%">
                      <button type="button" class="btn btn-xs btn-link" style="color: #58B7FF;" @click.stop="clickProperty(r)">设置规格项 <i class="el-icon-d-arrow-right"></i></button> 
                    </td>
                  </tr>
                  <tr class="_hidden-row" v-show="r.skuId == skuId">
                    <td colspan="6">
                      <sku-property-item :e="e" :id="r.skuId" :key="r.skuId"></sku-property-item>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
            <!-- 分页 -->
            <div class="_pagination" v-if="tableData.length > 0">
              <el-pagination :total="total" :page-size="pageSize" layout="total, sizes, prev, pager, next" @current-change="handleCurrentChange" @size-change="handleSizeChange">
              </el-pagination>
            </div>
          </div>
        </div>
      </card-panel>
    </div>

    <!--新增规格属性Dialog-->
    <el-dialog :title="dialogTitle" v-model="dialogShow" size="tiny">
      <el-form :model="sku" :rules="rules" ref="sku">
        <el-form-item label="规格名" :label-width="formLabelWidth" prop="skuName">
          <el-input v-model="sku.skuName" auto-complete="off" style="width:50%" :maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="排序" :label-width="formLabelWidth">
          <el-input-number v-model="sku.sortIndex" :min="1" :max="100"></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click.native.prevent="save">确 定</el-button>
        <el-button @click.native.prevent="dialogShow = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {
    getSkuPropertyPageList,
    addOrUpdateSkuProperty,
    deleteSkuProperty
  } from 'actions/skuPropertyAction'

  import skuPropertyItem from "../sku-property-item"

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
      name: {
        type: String,
        default: ''
      }
    },
    components: {
      skuPropertyItem
    },
    data() {
      return {
        classifyId: 0,
        skuId: -1,
        tableData: [],
        total: 0,
        pageSize: 10,
        page: 1,
        dialogTitle: '新增分类规格',
        dialogShow: false,
        formLabelWidth: '20%',
        disabledAddBtn: false,
        sku: {
          skuName: '',
          sortIndex: 1
        },
        rules: {
          skuName: [{
            required: true,
            message: '请输入规格名',
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      loadTableData() {
        let params = {
          classifyId: this.classifyId,
          pageNo: this.page,
          pageSize: this.pageSize
        }
        getSkuPropertyPageList(params).then(data => {
          const {success, result, msg } = data
          if (success) {
            this.tableData = result.rows
            this.total = result.total
          }
        })
      },
      add() {
        this.dialogTitle = '新增分类规格'
        this.sku = {
          skuName: '',
          sortIndex: 1
        }
        this.dialogShow = true
      },
      edit(row) {
        this.dialogTitle = '修改分类规格'
        this.sku.skuName = row.skuName
        this.sku.sortIndex = row.sortIndex
        this.sku.skuId = row.skuId
        this.dialogShow = true
      },
      remove(row) {
        this.sku.skuId = row.skuId
        this.$confirm(`确定删除此规格: ${row.skuName} ?`, '', { type: 'warning'})
        .then(data => {
          deleteSkuProperty(this.sku).then(data => {
            const { result, msg, success } = data
            if (success) {
              this.$message.success('操作成功')
              this.loadTableData()
            } else {
              this.$message.error(msg);
            }
          })
        })
        .catch(data => {})
      },
      save() {
        this.$refs.sku.validate((valid) => {
          if (valid) {
            this.sku.classifyId = this.classifyId
            addOrUpdateSkuProperty(this.sku).then(data => {
              const { result, msg, success } = data
              if (success) {
                this.$message.success('操作成功')
                this.dialogShow = false
                this.loadTableData()
              } else {
                this.$message.error(msg);
              }
            })
          } else {
            return false
          }
        })
      },

      // 设置属性项
      clickProperty(row) {
        if (row.skuId == this.skuId) {
          this.skuId = -1
        } else {
          this.e.$emit("load-sku-item" + row.skuId, row)
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
    created() {
      // 默认加载全局规格
      // this.loadTableData()

      this.e.$on('sku-list' + this.name, obj => {
        // console.log('sku-list-->' + this.name, obj)

        if (!obj) {  // 来自全局规格
          console.log("sku-public")
          this.classifyId = 0
          this.loadTableData()
        } 
        else {
          this.skuId = ''
          this.disabledAddBtn = obj.disabledAddBtn
          if (this.disabledAddBtn) {
            this.tableData = obj.inited ? this.tableData : []
            this.classifyId = 0
          } else {
            this.classifyId = obj.classifyId
            this.loadTableData()
          }
        }
      })
      
      this.e.$on('load-sku-item-done', id => this.skuId = id)
    }
  }
</script>
