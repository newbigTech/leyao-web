<template>
<div>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span style="line-height: 26px;">分类规格列表</span>
      <el-button style="float: right;" type="primary" @click.native.prevent="openAddDialog" size="small" :disabled="disabledAddBtn">新增</el-button>
    </div>
    <div class="text item">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="skuName" label="规格名" width="150">
        </el-table-column>
        <el-table-column prop="sortIndex" label="排序">
        </el-table-column>
        <el-table-column inline-template label="操作" width="150">
          <div>
            <el-button size="small" type="primary" icon="edit" @click.native.prevent="onEdit(row)"></el-button>
            <el-button size="small" type="danger" icon="delete" @click.native.prevent="onDelete(row)"></el-button>
            <el-button size="small" type="info" icon="setting" @click.native.prevent="onLoadItems(row)"></el-button>
          </div>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="_pagination">
      <el-pagination :total="total" :page-size="pageSize" layout="total, sizes, prev, pager, next" @current-change="handleCurrentChange" @size-change="handleSizeChange">
      </el-pagination>
    </div>
  </el-card>
  <!--新增分类属性Dialog-->
  <el-dialog :title="addPropertyDialogTitle" v-model="addPropertyDialogForm">
    <el-form :model="skuPropertyObj" :rules="rules" ref="skuPropertyObj">
      <el-form-item label="规格名" :label-width="formLabelWidth" prop="skuName">
        <el-input v-model="skuPropertyObj.skuName" auto-complete="off" style="width:50%" :maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="排序" :label-width="formLabelWidth">
        <el-input-number v-model="skuPropertyObj.sortIndex" :min="1" :max="100"></el-input-number>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click.native.prevent="saveSkuPropertyObj">确 定</el-button>
            <el-button @click.native.prevent="addPropertyDialogForm=false">取 消</el-button>
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
export default {
  name: 'sku_property_list',
  props: {
    vm: {
      type: Object
    },
    publicVm: {
      type: Object
    },
    classifyVm: {
      type: Object
    }
  },
  data() {
    return {
      classifyId: 0,
      tableData: [],
      page: 1,
      pageSize: 10,
      total: 0,
      addPropertyDialogTitle: '新增分类规格',
      disabledAddBtn: true,
      addPropertyDialogForm: false,
      formLabelWidth: '20%',
      skuPropertyObj: {
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
    openAddDialog() {
      this.addPropertyDialogTitle = '新增分类规格'
      this.skuPropertyObj = {
        skuName: '',
        sortIndex: 1
      }
      this.addPropertyDialogForm = true
    },
    onEdit(row) {
      this.addPropertyDialogTitle = '修改分类规格'
      this.skuPropertyObj.skuName = row.skuName
      this.skuPropertyObj.sortIndex = row.sortIndex
      this.skuPropertyObj.skuId = row.skuId
      this.addPropertyDialogForm = true
    },
    onDelete(row) {
      this.skuPropertyObj.skuId = row.skuId
      deleteSkuProperty(this.skuPropertyObj).then(data => {
        const {
          result,
          msg,
          success
        } = data
        if (success) {
          this.$message({
            message: '操作成功',
            type: 'success'
          });
          this.loadTableData()
        } else {
          this.$message.error(msg);
        }
      })
    },
    loadTableData() {
      const params = {
        classifyId: this.classifyId,
        pageNo: this.page,
        pageSize: this.pageSize

      };
      getSkuPropertyPageList(params).then(data => {
        const {
          success,
          result,
          msg
        } = data
        if (success) {
          this.tableData = result.rows
          this.total = result.total
        }
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.loadTableData()
    },
    handleCurrentChange(val) {
      this.page = val
      this.loadTableData()
    },
    saveSkuPropertyObj() {
      this.$refs.skuPropertyObj.validate((valid) => {
        if (valid) {
          this.skuPropertyObj.classifyId = this.classifyId
          addOrUpdateSkuProperty(this.skuPropertyObj).then(data => {
            const {
              result,
              msg,
              success
            } = data
            if (success) {
              this.$message({
                message: '操作成功',
                type: 'success'
              });
              this.addPropertyDialogForm = false
              this.loadTableData()
            } else {
              this.$message.error(msg);
            }
          })
        } else {
          return false;
        }
      })
    },
    onLoadItems(row) {
      if (this.publicVm) {
        this.publicVm.$emit('load-sku-property_item', row)
      }
      if (this.classifyVm) {
        this.classifyVm.$emit('load-sku-property_item', row)
      }
    }
  },
  created() {
    if (this.publicVm) {
      this.publicVm.$on('load-public-sku-property', params => {
        this.classifyId = params.classifyId
        this.disabledAddBtn = false
        this.loadTableData()
      })
    }

    if (this.classifyVm) {
      this.classifyVm.$on('load-classify-sku-property', params => {
        if (params.classifyId) {
          this.classifyId = params.classifyId
          this.disabledAddBtn = false
          this.loadTableData()
        } else {
          this.disabledAddBtn = true
          this.tableData = []
        }

      })
    }
  }
}
</script>
