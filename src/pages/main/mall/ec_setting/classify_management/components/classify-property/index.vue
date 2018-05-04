<template>
  <div class="_classify-property _container" v-show="show">
    <card-panel>
      <h3 slot="title">分类属性列表</h3>
      <div slot="panel-body">
        <div class="_table-list">
          <table class="table table-bordered table-hover center">
            <thead><tr> <th>属性名</th> <th>类型</th> <th>必填</th> <th>排序</th> <th>操作</th> </tr></thead>
            <tbody>
              <template v-for="(d, i) in tableData">
                <tr :id="d.propertyId" :class="{'open': d.propertyId == propertyId}">
                  <td>{{d.propertyName}}</td>
                  <td>{{d.propertyType == 0 ? '文本' : (d.propertyType == 1?'单选':'多选')}}</td>
                  <td>{{d.isRequired == 0 ? '否' : '是'}}</td>
                  <td>{{d.sortIndex}}</td>
                  <td width="10%" class="_actions">
                    <button type="button" class="btn btn-xs btn-link" @click.stop="clickProperty(d.propertyId)">查看属性项 <i class="el-icon-d-arrow-right"></i></button>
                  </td>
                </tr>
                <tr class="row-property-options" v-show="d.propertyId == propertyId">
                  <td colspan="5"><classify-property-item :id="d.propertyId" :e="e" :key="d.propertyId"></classify-property-item></td>
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
  import classifyPropertyItem from "./classify-property-item"
  import { getClassifyPropertyPageList } from 'actions/classifyPropertyAction'

  export default {
    props: {
      e: {type: Object, default: () => {}}
    },
    components: { cardPanel, classifyPropertyItem},
    data() {
      return {
        tableData: [],
        page: 1,
        pageSize: 10,
        total: 0,
        show: false,
        classifyId: 0,
        propertyId: -1,
      }
    },
    methods: {
      loadTableData() {
        let params = {
          pageNo: this.page,
          pageSize: this.pageSize,
          classifyId: this.classifyId
        }
        getClassifyPropertyPageList(params).then(data => {
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
        if (id == this.propertyId) {
          this.propertyId = -1
        } else {
          this.e.$emit('getPropertyItemsByPropertyId' + id, id)
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
      this.e.$on('classifyProperty', (id) => {
        this.classifyId = id || ""
        this.loadTableData()
      })

      this.e.$on('getPropertyItemsByPropertyIdDone', id => this.propertyId = id)
    }
  }
</script>
