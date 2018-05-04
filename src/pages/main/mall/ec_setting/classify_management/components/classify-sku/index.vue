<template>
  <div class="_classify-property _container" v-show="show">
    <card-panel>
      <h3 slot="title">分类规格列表</h3>
      <div slot="panel-body">
        <div class="_table-list">
          <table class="table table-bordered table-hover center">
            <thead><tr> <th>规格名</th> <th>排序</th> <th>操作</th> </tr></thead>
            <tbody>
              <template v-for="(d, i) in tableData">
                <tr :id="d.skuId" :class="{'open': d.skuId == skuId}">
                  <td>{{d.skuName}}</td>
                  <td>{{d.sortIndex}}</td>
                  <td width="10%" class="_actions">
                    <button type="button" class="btn btn-xs btn-link" style="color:#58B7FF" @click.stop="clickProperty(d.skuId)">查看Sku属性项 <i class="el-icon-d-arrow-right"></i></button>
                  </td>
                </tr>
                <tr class="row-property-options" v-show="d.skuId == skuId">
                  <td colspan="3"><classify-sku-item :id="d.skuId" :e="e" :key="d.skuId"></classify-sku-item></td>
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
</template>

<style lang="sass">
  ._classify-property {
    td._actions {
      .el-icon-d-arrow-right {
        transform: rotate(90deg);
        font-size: 10px;
      }
    }
    tr.open td._actions .el-icon-d-arrow-right {
      transform: rotate(-90deg);
    }
    tr.row-property-options > td {
      background-color: #f1f6f8;
      border-top: 3px solid #d1e1ea!important;
    }
  }

</style>

<script>
  import cardPanel from "components/card-panel"
  import classifySkuItem from "./classify-sku-item"

  import { getSkuPropertyPageList } from 'actions/skuPropertyAction'

  export default {
    props: {
      e: {type: Object, default: () => {}}
    },
    components: { cardPanel, classifySkuItem},
    data() {
      return {
        tableData: [],
        page: 1,
        pageSize: 10,
        total: 0,
        show: false,
        classifyId: 0,
        skuId: -1,
      }
    },
    methods: {
      loadTableData() {
        let params = {
          pageNo: this.page,
          pageSize: this.pageSize,
          classifyId: this.classifyId
        }
        getSkuPropertyPageList(params).then(data => {
          this.show = true
          const { success, result, msg } = data
          if (success && result.rows.length > 0) {
            this.tableData = result.rows
            this.total = result.total
          } else {
            this.tableData = []
            this.total = 0
          }
        })
      },

      clickProperty(id) {

        if (id == this.skuId) {
          console.log("this.skuId: ", this.skuId)
          this.skuId = -1
        } else {
          console.log("emit: ", this.skuId)
          this.e.$emit('getSkuItemsBySkuId' + id, id)
        }
      },

      handleSizeChange(val) {
        console.log("handleSizeChange")
        this.pageSize = val
        this.loadTableData()
      },
      handleCurrentChange(val) {
        this.page = val
        this.loadTableData()
      },
    },
    created() {
      // this.loadTableData()
      this.e.$on('classifySku', (id) => {
        this.classifyId = id || ""
        this.loadTableData()
      })
      this.e.$on('getSkuItemsBySkuIdDone', id => this.skuId = id)
    }
  }
</script>
