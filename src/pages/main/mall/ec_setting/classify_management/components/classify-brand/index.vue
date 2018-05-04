<template>
  <div class="_classify-brand _container">
    <card-panel>
      <h3 slot="title">分类品牌列表</h3>
      <div slot="panel-body">
        <div class="_table-list">
          <el-table :data="model" border style="width: 100%;">
            <el-table-column property="brandName" label="品牌名称"></el-table-column>
            <el-table-column property="brandFullName" label="品牌全名"></el-table-column>
            <el-table-column property="sortIndex" label="排序"></el-table-column>
            <el-table-column inline-template label="状态"><div>{{row.statusCode == 0 ? '有效' : '无效'}}</div></el-table-column>
          </el-table>
          <!-- 分页 -->
          <div class="_pagination">
            <el-pagination
              :total="total"
              :page-size="pageSize"
              layout="total,sizes,prev,pager,next"
              @current-change="handleCurrentChange"
              @size-change="handleSizeChange"
            ></el-pagination>
          </div>
        </div>
      </div>
    </card-panel>
  </div>
</template>


<script>
  import { getMallClassifyBrandPageList } from 'actions/mallBrandAction'
  import cardPanel from "components/card-panel"
  export default {
    components: { cardPanel },
    props: {
      e: {
        type: Object,
        default: () => {}
      },
    },
    data() {
      return {
        page: 1,
        pageSize: 20,
        total: 0,
        classifyId: "",
        model: []
      }
    },
    methods: {
      loadBrandData() {
        getMallClassifyBrandPageList({
          classifyId:this.classifyId,
          brandName: '',
          brandFullName: '',
          pageNo: this.page,
          pageSize: this.pageSize
        })
        .then(data => {
          if (!data.success) return false
          this.model = data.result.rows
          this.total = data.result.total
          // console.log(data.result.rows)
        })
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.loadBrandData()
      },
      handleCurrentChange(val) {
        this.page = val
        this.loadBrandData()
      },
    },
    created() {
      this.e.$on('classifyBrand', id => {
        this.classifyId = id || ""
        this.loadBrandData()
      })
    }
  }
</script>
