<template>
  <!-- 商品分类列表 组件 -->
  <div class="_container">
    <div class="_setting-options">
      <div class="_setting-options-left">
        <el-form :inline="true" :model="classify" label-width="0">
          <el-form-item>
            <el-input v-model="classify.name" placeholder="分组名称"></el-input>
          </el-form-item>
          <!-- <el-form-item>
            <el-input v-model="classify.fullName" placeholder="分类全名"></el-input>
          </el-form-item> -->
          <el-form-item>
            <el-button :plain="true" type="primary" @click.native="searchTableList">查 询</el-button>
          </el-form-item>
        </el-form>  
      </div>
      <div class="_setting-options-right">
        <el-button type="primary" @click.native="$emit('forward', 'classifyAdd')">新 增</el-button>
      </div>
    </div>
    <div class="_table-container">
      <div class="_table-list _goods-group-list">
        <el-table :data="classifyListData" style="width: 100%">
          <el-table-column property="customClassifyId" inline-template label="分组图片" width="150" align="center">
            <div class="_goods-group-img"><img v-if="row.classifySPic && (row.classifySPic.length > 1)" :src="cloudShowUrl + row.classifySPic"></div>
          </el-table-column>
          <el-table-column property="classifyName" label="分组名称" align="center"></el-table-column>
          <!--  <el-table-column property="classifyFullName" label="分组全名"></el-table-column> -->
          <!-- <el-table-column property="createdDtm" label="创建时间" :formatter="dateFormat" width="130"></el-table-column>
          <el-table-column inline-template label="状态">
              <div>{{row.statusCode == 0 ? '有效' : '无效'}}</div>
          </el-table-column> -->
          <el-table-column property="sortIndex" label="排序" width="100" align="center"></el-table-column>
          <el-table-column inline-template label="操作" width="150" align="center" >
            <div>
              <el-button size="small" type="warning" @click.native="$emit('forward', 'classifyAdd', row)">编辑</el-button>
              <el-button size="small" type="danger" @click.native="deleteItem(row.customClassifyId)">删除</el-button>
            </div>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="_pagination">
          <el-pagination
            :total="total"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="sass">
  ._goods-group-list {
    ._goods-group-img {
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 5px;
      padding: 2px;
      border-radius: 5px;
      border: 1px solid #ccc;
      cursor: pointer;
      img { height: 100%; max-width: 100%;  }
    }
  }
</style>

<script>

  import { dateFormat as _dateFormat } from "lib/utils/dateFormat"
  import {
    getCustomClassifyPageList,
    deleteCustomClassify
} from 'src/vuex/actions/shopCustomClassifyAction'

  export default {
    computed: {
       cloudShowUrl() {
        return this.$store.getters.cloudShowUrl
       }
    },
    data() {
      return {
        page: 1,
        pageSize: 10,
        total: 0,
        classifyId: 0,
        classify: {},
        classifyListData: [],
        dateFormat: function(row, col) {
          // console.log(new Date(row.createdDtm))
          // return row.createdDtm
          return _dateFormat(row.createdDtm, 'yyyy-MM-dd')
        }
      }
    },
    created(){
      this.searchTableList()
    },
    methods: {
      searchTableList() {
        let params = {
          classifyName: this.classify.name,
          classifyFullName: this.classify.fullName,
          pageNo: this.page,
          pageSize: this.pageSize
        }
        getCustomClassifyPageList(params)
        .then(data => {
          const { success, result, msg } = data
          if (success) {
            this.classifyListData = result.rows
            this.total = result.total
            // console.log(result.rows, result.total)
          }
        })
      },  
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`)
        this.pageSize = val
        this.searchTableList()
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`)
        this.page = val
        this.searchTableList()
      },
      deleteItem(customClassifyId){
        this.$confirm('是否确认删除?', '提示', {type: 'warning'})
        .then(() => {
          deleteCustomClassify({customClassifyId}).then(data=>{
            const { success, result, msg } = data;
            if (success) { 
              this.$message.success("删除成功!")
              this.searchTableList() 
            } else {
              this.$message.success("删除失败!")
            }
          })
        }).catch(() => {})
        
      },
    }
  }
</script>
