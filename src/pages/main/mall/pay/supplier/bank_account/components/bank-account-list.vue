<template>
    <div class="_container">
        <!-- <div class="_setting-options-right" style="margin-bottom: 10px;float: right">
              <el-button type="primary" size="small"
                  @click.native.prevent="addBankAccount()">新增</el-button>
        </div> -->
        <!-- 列表数据 -->
        <div class="_table-container">
          <div class="_table-list">
              <el-table :data="bankAccountData" style="width: 100%" border>
                  <el-table-column align="center" type="index" width="80"></el-table-column>
                  <el-table-column align="center" property="bankName" label="银行" ></el-table-column>
                  <el-table-column align="center" property="accountNo" label="帐号" ></el-table-column>
                  <el-table-column align="center" property="userName" label="收款人"></el-table-column>
                  <el-table-column align="center" inline-template label="是否默认">
                    <div>
                      <span v-if="row.default">是</span>
                      <span v-if="!row.default">否</span>
                    </div>
                  </el-table-column>
                  <!-- <el-table-column align="center" inline-template label="操作">
                    <div>
                        <el-button type="primary" size="small" v-if="!row.default"
                        @click.native.prevent="setDefault(row.receiptAccountId)">设为默认</el-button>
                        <el-button type="danger" size="small"
                        @click.native.prevent="deleteBankAccount(row.receiptAccountId)">删除</el-button>
                    </div>
                  </el-table-column> -->
              </el-table>
          </div>
        </div>

         <!-- 设置文件分类 -->
        <el-dialog title="新增账户" v-model="dialogBankAccount" size="tiny">
            <div>
                <el-form :model="bankAccount" :rules="rules" ref="bankAccount" label-width="100px" class="demo-ruleForm">
                  <el-form-item label="银行名称" prop="bankName">
                    <el-input v-model="bankAccount.bankName" :maxlength="50" style="width:80%"></el-input>
                  </el-form-item>
                  <el-form-item label="帐号" prop="accountNo">
                    <el-input v-model="bankAccount.accountNo" :maxlength="50" style="width:80%"></el-input>
                  </el-form-item>
                  <el-form-item label="收款人" prop="userName">
                    <el-input v-model="bankAccount.userName" :maxlength="30" style="width:50%"></el-input>
                  </el-form-item>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="handleSubmit">提交</el-button>
              <el-button @click.native="dialogBankAccount = false">关闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>

  import {dateFormat as _dateFormat } from "lib/utils/dateFormat"
  import { _getBankAccountList,
          _setDefaultReceiptAccount,
          _deleteReceiptAccount,
          _addBankAccount } from 'src/vuex/actions/payAction'

  export default {
    name:'s_bank_account_list',
    components: {

    },
    data() {
      return {
        bankAccountData: [],
        bankAccount:{}, // 表单数据

        dialogBankAccount:false,
        rules: {
          bankName: [
            { type: 'string',required: true, message: '请输入银行名称', trigger: 'blur' }],
          accountNo: [
            { type: 'string',required: true, message: '请输入帐号', trigger: 'blur' },],
            // { pattern:  /^(\d{16}|\d{19})$/,trigger: 'blur',message: '格式错误'},
          userName: [
            { type: 'string',required: true, message: '请输入收款人', trigger: 'blur' }]
        },
      }
    },
    created(){
      this.searchTableList()
    },
    methods: {
      searchTableList() {
        _getBankAccountList({}).then(data => {
          const { success, result, msg } = data
          if (success) {
            //console.log(JSON.stringify(result))
            this.bankAccountData = result
          }
        })
      },
      onSubmit(){
        this.searchTableList()
      },
      setDefault(accountId){
        console.log(accountId)
        this.$confirm('是否设置默认账户?', '提示', {
          type: 'warning'
        }).then(() => {
           _setDefaultReceiptAccount({"accountId":accountId}).then(data => {
            const { success, result, msg } = data
            if (success) {
              this.searchTableList() ;
              this.$message({type: 'success', message: '设置成功!' });
            }else{
              this.$message({type: 'error', message: '设置失败!' });
            }
          })
        })
      },
      addBankAccount(){
        this.dialogBankAccount = true ;
        this.bankAccount = {
          bankName:"",
          accountNo:"",
          userName:""
        }
      },
      handleSubmit(){
        this.$refs.bankAccount.validate((valid) => {
          if (valid) {
            let params = {
              bankName:this.bankAccount.bankName,
              accountNo:this.bankAccount.accountNo,
              userName:this.bankAccount.userName
            }
            _addBankAccount(params).then(data => {
              const { success, result, msg } = data
              console.log(JSON.stringify(params))
              if (success) {
               this.dialogBankAccount = false ;
               this.searchTableList() ;
               this.$message({type: 'success', message: '提交成功!' });
              }else{
                this.$message({type: 'error', message: msg });
              }
            })
          }else{
            console.log('校验失败!!');
            return false;
          }
        })
      },
      deleteBankAccount(accountId){
        this.$confirm('是否确定删除?', '提示', {
          type: 'warning'
        }).then(() => {
             _deleteReceiptAccount({"receiptAccountIds":accountId}).then(data => {
              const { success, result, msg } = data
              if (success) {
                this.searchTableList() ;
                this.$message({type: 'success', message: '删除成功!' });
              }else{
                this.$message({type: 'error', message: '删除失败!' });
              }
            })
        })
      }
    },
  }
</script>
