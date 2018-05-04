<template>
    <div class="_container">
      <!-- 查询条件 -->
      <div class="_setting-options">
        <div class="_setting-options-left">
          <el-form :inline="true" :model="backAddressModel" class="demo-form-inline">
            <el-form-item>
              <el-input v-model="backAddressModel.receiverUserName" placeholder="收件人"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input v-model="backAddressModel.mobilePhone" placeholder="收件人电话"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button @click="onSubmit">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="_setting-options-right">
          <el-button type="success" @click.native.prevent="$emit('forward', 'addBackAddress', backAddressObj)">新增收件地址</el-button>
        </div>
      </div>
      <!-- 列表数据 -->
      <div class="_table-container">
        <div class="_table-list">
            <el-table :data="backAddressData" style="width: 100%" border>
                <el-table-column width="70" align="center" type="index"></el-table-column>
                <el-table-column width="120" align="center" property="receiverUserName" label="收件人"> </el-table-column>
                <el-table-column width="140" align="center" property="mobilePhone" label="收件人电话"> </el-table-column>
                <el-table-column min-width="150" align="center" inline-template label="收货地址">
                    <div>{{row.strProvince}} {{row.strCity}} {{row.strArea}} {{row.strAddress}}</div>
                </el-table-column>
                <el-table-column width="100" align="center" inline-template label="是否默认">
                  <div>
                      <span v-if="row.isDefault == 1">是</span>
                      <span v-if="row.isDefault == 0">否</span>
                  </div>
                </el-table-column>
                <el-table-column width="175" align="center" property="createdDtm" label="创建日期" :formatter="dateFormat"></el-table-column>
                <el-table-column width="180" align="center" inline-template label="操作">
                  <div>
                    <el-button type="primary" size="mini" class="el-button--mini" @click.native.prevent="$emit('forward', 'addBackAddress', row)">编辑</el-button>
                    <el-button type="warning" size="mini" v-if="row.isDefault == 0" @click.native.prevent="setDefaultAddress(row)">默认</el-button>
                    <el-button type="danger" size="mini" v-if="row.isDefault == 0" @click.native.prevent="deleteBackAddress(row)">删除</el-button>
                  </div>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <div class="_pagination">
                <el-pagination
                    :total="total"
                    :page-size="pageSize"
                    :page-sizes="[10, 20, 30, 40]"
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
<script>

  import { dateFormat as _dateFormat } from "lib/utils/dateFormat"
  import { _getBackAddressPage,_setDefaultBackAddress,_deleteBackAddress } from 'src/vuex/actions/backAction'
  import MD5 from 'crypto-js/md5'

  export default {
    name:'invoice_list',
    components: {

    },
    computed: {

    },
    data() {
      return {
        dateFormat: (row, col) => _dateFormat(new Date(row.createdDtm), 'yyyy-MM-dd HH:mm:ss'),
        page: 1,
        pageSize: 10,
        total: 0,
        backAddressModel: {

        },
        backAddressData: [],

        backAddressObj:{} // 新增发票为空对象
      }
    },
    created(){
      this.searchTableList() ;
    },
    methods: {
      searchTableList() {
        let params = {
          pageNo:this.page,
          pageSize:this.pageSize,
          receiverUserName:this.backAddressModel.receiverUserName,
          mobilePhone:this.backAddressModel.mobilePhone,
        }
        //console.log(JSON.stringify(params))
        _getBackAddressPage(params).then(data => {
          const { success, result, msg } = data
          //console.log(JSON.stringify(data))
          if (success) {
            this.backAddressData = result.list ;
            this.total = result.total
          }
        })
      },
      setDefaultAddress(row) {
        this.$confirm('是否设置为默认退货仓地址?', '提示', {
          type: 'warning'
        }).then(() => {
          _setDefaultBackAddress({'backAddressId':row.backAddressId}).then(data => {
            const { success, result, msg } = data
            if (success) {
               this.page = 1 ;
               this.searchTableList() ;
            }else{
               this.$message({type: 'info',message: '设置失败'});
            }
          })
        }).catch(() => {
        });
      },
     deleteBackAddress(row) {
        this.$confirm('是否确认删除退货仓地址?', '提示', {
          type: 'warning'
        }).then(() => {
          _deleteBackAddress({'backAddressId':row.backAddressId}).then(data => {
            const { success, result, msg } = data
            //console.log(JSON.stringify(data))
            if (success) {
              this.page = 1 ;
              this.searchTableList() ;
            }else{
              this.$message({type: 'info',message: '删除失败'});
            }
          })
        }).catch(() => {

        });
      },
      onSubmit(){
        this.searchTableList() ;
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.searchTableList()
      },
      handleCurrentChange(val) {
        this.page = val
        this.searchTableList()
      },
    }
  }
</script>
