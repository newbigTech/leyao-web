<template>
  <el-dialog title="店铺列表" v-model="dialogVisible" size="tiny">
    <el-table :data="tableData" @selection-change="handleSelectionChange">
      <el-table-column  type="selection" width="55"> </el-table-column>
      <el-table-column property="shopName" min-width="220" label="店铺名"> </el-table-column>
    </el-table>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="onSuccess">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
  import { _getMallShopList } from 'src/vuex/api/shopAPI'
  export default {
    computed: {
    },
    data() {
      return {
        tableData:[],
        multipleSelection: [],
        dialogVisible: false
      }
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      loadTableData(){
            let param = {
                pageNo:1,
                pageSize:500
            }
            _getMallShopList(param).then((data) => {
                const {success,result}=data
                if(success){
                    this.tableData = result.rows
                }
            })
      },
      onSuccess(){
        this.$emit('onSuccess',this.multipleSelection)
        this.dialogVisible = false
      }
    }
  }
</script>