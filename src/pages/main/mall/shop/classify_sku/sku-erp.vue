<template>
  <div class="_sku-list">
    <div class="_container">
      <card-panel class="_normal">
        <h3 slot="title">规格列表</h3>
        <div slot="panel-btns">
          <button class="btn btn-sm btn-success" @click="onSyncSku" :disabled="disabledAddBtn">同步ERP规格</button>
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
                    </td>
                    <td class="_actions" width="10%">
                      <button type="button" class="btn btn-xs btn-link" style="color: #58B7FF;" @click.stop="clickProperty(r)">规格项 <i class="el-icon-d-arrow-right"></i></button> 
                    </td>
                  </tr>
                  <tr class="_hidden-row" v-show="r.skuId == skuId">
                    <td colspan="6">
                     <erp-sku-property-item :e="e" :id="r.skuId" :key="r.skuId"></erp-sku-property-item>
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
  </div>
</template>

<script>
  import {
    getSkuPropertyPageList,
    syncShopGoodsSku
  } from 'actions/skuPropertyAction'

  import erpSkuPropertyItem from "./components/erp-sku-property-item"

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
      erpSkuPropertyItem
    },
    data() {
      return {
        classifyId: 0,
        skuId: -1,
        tableData: [],
        total: 0,
        pageSize: 10,
        page: 1,
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
      onSyncSku(){
        this.$confirm("确认同步ERP所有规格数据吗？","确认提示",{
          type:'warning'
        }).then(()=>{
            this.disabledAddBtn=true
            syncShopGoodsSku().then(data=>{
              const {success, result, msg } = data
              if (success) {
                 this.$message.success('同步成功')
                 this.loadTableData()
                 this.disabledAddBtn=false
              }else{
                this.$message.success('同步失败')
                this.disabledAddBtn=false
              }
            })
        }).catch(()=>{})

       
      },
      loadTableData() {
        let params = {
          classifyId: this.classifyId,
          queryType: 1, //查询类型 0 查询运营商规格 1 查询店铺规格 不传后端默认值为0
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
      // 设置属性项
      clickProperty(row) {
        if (row.skuId == this.skuId) {
          this.skuId = -1
        } else {
          this.skuId=row.skuId
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
      this.loadTableData()
    }
  }
</script>
