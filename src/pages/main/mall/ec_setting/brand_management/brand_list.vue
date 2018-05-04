<template lang="html">
  <div class="_brand-list">
    <div class="_setting-options">
      <div class="_setting-options-left">
        <el-form :inline="true" :model="brandObj" class="demo-form-inline">
            <el-form-item>
                <el-input v-model="brandObj.brandName" placeholder="品牌名称" :maxlength="20"></el-input>
            </el-form-item>
            <el-form-item>
                <el-input v-model="brandObj.brandFullName" placeholder="品牌全名" :maxlength="120"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="default" @click.native.prevent="loadTableData">查询</el-button>
            </el-form-item>
        </el-form>
      </div>
      <div class="_setting-options-right">
        <el-button type="primary" @click.native.prevent="$emit('forward','BrandForm')">新增</el-button>
      </div>
    </div>
    <div class="_table-container">
      <div class="_table-list">
        <el-table :data="tableData" style="width: 100%" border>
          <el-table-column type="index" width="50" align="center"></el-table-column>
          <el-table-column property="brandName" label="品牌名称" align="center"></el-table-column>
          <el-table-column property="brandFullName" label="品牌全名" align="center"></el-table-column>
          <el-table-column inline-template label="状态" width="70">
              <div>{{row.statusCode == 0 ? '有效' : '无效'}}</div>
          </el-table-column>
          <el-table-column property="sortIndex" label="排序" width="70" align="center"></el-table-column>
          <el-table-column inline-template label="操作" width="180" align="center">
            <div>
              <el-button size="mini" type="warning" @click.native.prevent="$emit('forward','BrandForm',row)">修改</el-button>
              <el-button size="mini" type="info" @click.native.prevent="$emit('forward','BindClassify',row)">关联分类</el-button>
              <el-button size="mini" type="danger" @click.native.prevent="onDelete(row)">删除</el-button>
            </div>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="_pagination">
          <el-pagination :total="total" :page-size="pageSize" layout="total, sizes, prev, pager, next" @current-change="handleCurrentChange" @size-change="handleSizeChange">
          </el-pagination>
        </div>
      </div>
    </div>
</template>

<script>
  import {
    getCustomBrandPageList,
    deleteCustomBrand
  }
  from 'src/vuex/actions/mallBrandAction'
export default {
  name: 'brand_list',
  data() {
    return {
      page: 1,
      pageSize: 20,
      total: 0,
      tableData: [],
      brandObj: {
        brandName: '',
        brandFullName: ''
      }
    }
  },
  methods: {
    onDelete(row){
      this.$confirm('确认删除?', '提示', {
                    type: 'warning'
                })
                .then(() => {
                    deleteCustomBrand({
                        brandId: row.brandId
                    }).then(data => {
                        const { success, msg, result } = data
                        if (success) {
                            this.$message.success('操作成功')
                            this.loadTableData()
                        } else {
                            this.$message.error(msg)
                            return false
                        }
                    })
                }).catch(() => {})
    },
    loadTableData() {
      this.brandObj.pageNo = this.page
      this.brandObj.pageSize = this.pageSize
      getCustomBrandPageList(this.brandObj).then(data => {
        const {
          result,
          success,
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
    }
  },
  created() {
    this.loadTableData()
  }
}
</script>
