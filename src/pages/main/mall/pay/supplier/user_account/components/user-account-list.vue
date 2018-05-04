<template>
    <div class="_container">
      <!-- 查询条件 -->
      <div class="_setting-options">
        <div class="_setting-options-left">
            <el-form :inline="true" ref="userAccountForm" :rules="rules" :model="userAccountModel" class="demo-form-inline">
              <el-form-item prop="userMobile">
                <el-input v-model="userAccountModel.userMobile" placeholder="手机号"></el-input>
              </el-form-item> 
              <el-form-item>
                <el-select v-model="userAccountModel.operator" placeholder="操作符" style="width:90px;" clearable>
                    <el-option label="<" value="LESS_THAN"></el-option>
                    <el-option label="<=" value="LESS_THAN_OR_EQUAL"></el-option>
                    <el-option label=">" value="GREATER_THAN"></el-option>
                    <el-option label=">=" value="GREATER_THAN_OR_EQUAL"></el-option>
                    <el-option label="==" value="EQUAL"></el-option>
                </el-select>
              </el-form-item> 
              <el-form-item prop="amount">
                <el-input v-model="userAccountModel.amount" :maxlength="6" type="number" placeholder="金额"></el-input>
              </el-form-item>                          
              <el-form-item>
                <el-button @click="onSubmit">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      <!-- 列表数据 -->
      <div class="_table-container">
        <div class="_table-list">
            <el-table :data="userAccountData" style="width: 100%" border>
                <el-table-column type="index" width="80" align="center"></el-table-column>
                <el-table-column property="userName" label="用户名"  align="center"></el-table-column>
                <el-table-column property="userMobile" label="联系电话" align="center"></el-table-column>
                <el-table-column property="availableBalance" label="可用余额"  align="center"></el-table-column>
                <!-- <el-table-column property="frozenBalance" label="冻结余额"  align="center"> </el-table-column>
                <el-table-column property="unSettledBalance" label="待结算余额"  align="center"> </el-table-column>
                <el-table-column property="depositBalance" label="保证金余额"  align="center"> </el-table-column>
                <el-table-column property="depositBalance" label="保证金余额"  align="center"> </el-table-column> -->
                <el-table-column inline-template label="操作" width="190"> 
                  <div>
                      <el-button type="primary" size="small"
                      @click.native.prevent="$emit('forward', 'userAccountTransactionList', row)">交易详情</el-button>             
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

  import RegExr from "lib/utils/regexp"
  import {dateFormat as _dateFormat } from "lib/utils/dateFormat"
  import { _getUserAccountPage } from 'src/vuex/actions/payAction'

  export default {
    name:'user_account_list',
    components: {

    },
    data() {
      return {
        dateFormat: (row, col) => _dateFormat(new Date(row.applyTime), 'yyyy-MM-dd HH:mm:ss'),
        page: 1,
        pageSize: 40,
        total: 0,
        userAccountModel: {
          status:'',
          rangeTime:'',
          status:'',
          operator:''
        },
        userAccountData: [],
        rules: {
          userMobile: [
            { type: 'string', pattern: RegExr.mobile, trigger: 'blur', message: '请输入正确的手机号码'}],
          // amount: [
          //   { type: 'number',required: true, message: '请输入金额', trigger: 'blur' }],
        },        
      }
    },
    created(){
      this.searchTableList()
    },
    methods: {
      initParams(){
        let params = {
          userMobile: this.userAccountModel.userMobile,
          amount: this.userAccountModel.amount,
          operator:this.userAccountModel.operator,
          pageNo: this.page,
          pageSize: this.pageSize
        }
        return params ;
      },
      searchTableList() {
        let tempParams = this.initParams() ;
        //console.log(JSON.stringify(tempParams))
        _getUserAccountPage(tempParams).then(data => {
          const { success, result, msg } = data
          if (success) {
            //console.log(JSON.stringify(result.list))
            this.userAccountData = result.list
            this.total = result.total
          }
        })
      },
      onSubmit(){
        this.$refs.userAccountForm.validate((valid) => {
            if (valid) {
              this.searchTableList();
            }
        })
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
