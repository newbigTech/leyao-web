<template>
  <div>
    <card-panel>
      <h3 slot="title">设置店铺管理员</h3>
      <div slot="panel-btns">
        <!-- <el-button size="small" type="primary">保存</el-button> -->
      </div>
      <div slot="panel-body">
        <el-form :model="model" :rules="rules" ref="form" style="width: 500px;">
          <el-form-item label="店铺管理员" label-width="100px" prop="userAlias">
            <el-row type="flex">
              <el-col :span="24"><el-input placeholder="请输入店铺管理员" v-model="model.userAlias" :disabled="userEditFlag"></el-input></el-col>
              <el-col :span="0" style="width: 150px; margin-left: 10px;"><el-button @click.native="checkUserData">选择已有用户</el-button></el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="管理员手机" label-width="100px" prop="userMobile">
            <el-col :span="24"><el-input placeholder="请输入管理员手机电话" v-model="model.userMobile" :disabled="userEditFlag"></el-input></el-col>
          </el-form-item>
          <el-form-item label="管理员密码" label-width="100px" prop="pass" v-show="!userEditFlag">
            <el-col :span="24"><el-input placeholder="请输入管理员密码" type="password" v-model="model.pass"></el-input></el-col>
          </el-form-item>
          <el-form-item label="确认密码" label-width="100px" prop="pass2" required v-show="!userEditFlag">
            <el-col :span="24"><el-input placeholder="请再次输入管理员密码" type="password" v-model="model.pass2"></el-input></el-col>
          </el-form-item>

          <el-form-item label-width="100px">
            <!-- <el-button type="warning" @click.native="reset">重置输入</el-button> -->
            <el-button type="primary" @click.native="$emit('back', '1')">上一步</el-button>
            <el-button type="warning" @click.native="next">下一步</el-button>
            <el-button type="danger" @click.native="$emit('back', '0')">取消</el-button>
            <el-button type="danger"  @click.native="cancelSelectedUser" v-show="userEditFlag">取消选择的用户</el-button>
          </el-form-item>
        </el-form>
      </div>
    </card-panel>
    <!-- 选择用户 -->
    <el-dialog title="选择用户" v-model="dialogUserVisible" class="shop-select-user">
      <el-form :inline="true" :model="userParam">
        <el-form-item>
          <el-input v-model="userParam.userAlias" placeholder="用户名称或者手机号码"></el-input>
        </el-form-item>
        <!-- <el-form-item>
          <el-input v-model="userParam.userMobile" placeholder="手机号码"></el-input>
        </el-form-item> -->
        <el-form-item>
          <el-button type="primary" @click.native.prevent="onUserSubmit">查询</el-button>
        </el-form-item>
      </el-form>
        <div class="_table-list">
            <el-table :data="userListData" border>
              <!-- <el-table-column type="selection" width="50">  </el-table-column> -->
              <el-table-column property="userId" label="用户编号" width="120" align="center"> </el-table-column>
              <el-table-column property="userAlias" label="用户名称" min-width="200" align="center"> </el-table-column>
              <el-table-column property="userMobile" label="手机号码" width="200" align="center"> </el-table-column>
              <el-table-column inline-template label="操作" align="center" width="80">
                <div>
                  <el-button type="primary" size="small" @click.native.prevent="confirmCheckUser(row)">选择</el-button>
                </div>
              </el-table-column>
            </el-table>
            <!-- 分页 -->
            <div class="_pagination">
              <el-pagination
                @size-change="userHandleSizeChange"
                @current-change="userHandleCurrentChange"
                :current-page="userPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next"
                :total="userTotalSize">
              </el-pagination>
            </div>
        </div>
      </el-dialog>
  </div>
</template>

<script>
  import RegExr from "lib/utils/regexp"
  import { validUser } from 'src/vuex/actions/userAction'
  import { _getSSOUserPageList, _getBaseUserById } from 'src/vuex/api/shopAPI'
  export default {
    name: "tabShopUser",
    props: {
      model: Object, default: () => {},
      e: Object, default: () => { return { $on: () => {}, $emit: () => {} } },
    },
    computed: {
      userEditFlag() {
        return !!this.model.uFlag
      }
    },
    data() {
      return {
        validatingStatus: false,

        dialogUserVisible:false,
        // userEditFlag:false, // 是否可编辑
        userParam:{},
        userPage :1,
        pageSize:10,
        userTotalSize: 10,
        userListData:[],
        uFlag:0,

        rules: {
          userAlias: [
            { type: 'string', required: true, pattern: /^[a-zA-Z][a-zA-Z0-9_]{3,19}$/, trigger: 'blur', message: '用户名4-20位字符，字母开头'},
            { validator: (rule, value, callback) => {
                if (!this.model.uFlag) {
                  validUser({validValue:value,validType:1}).then((data) => {
                    const {success,msg,result}=data
                    if(!success) {
                      callback(new Error(msg))
                    }else{
                      callback()
                    }
                  })
                } else {
                  callback()
                  console.log('padddddd')
                }
            }, trigger: 'blur'}
          ],
          userMobile: [
            {
              type: 'string', required: true, pattern: RegExr.mobile, trigger: 'blur', message: '请输入正确的手机号码',
            },
            { validator: (rule, value, callback) => {
                if (!this.model.uFlag) {
                  validUser({validValue:value,validType:0}).then((data) => {
                    const { success, msg, result } = data
                    if(!success) {
                      callback(new Error(msg))
                    }else{
                      callback()
                    }
                  })
                } else {
                  callback()
                }
            }, trigger: 'blur'}
          ],
          pass: [{
            validator: (rule, value, callback) => {
              if (this.model.uFlag) return callback()
              if (this.model.pass.trim().length < 6 || this.model.pass.trim().length > 20) return callback(new Error('密码必须是6-20字符之间'))
              callback()
            }
          }],
          pass2: [{
            validator: (rule, value, callback) => {
              if (this.model.uFlag) return callback()
              if (this.model.pass !== value) callback(new Error('前后密码输入不一致!'))
              callback()
            },
            trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      next() {
        // 验证
        if (!this.userEditFlag) {
          this.$refs.form.validate(valid => {
            if (!valid) {
              //this.$emit('next', '2')
              this.validatingStatus = false
              return false
            }
            // 验证通过
            this.validatingStatus = true
            this.$emit('next', '3')
            return true
          })
        } else {
          // 验证通过
          this.validatingStatus = true
          this.$emit('next', '3')
          return true
        }

      },

      // 选择用户
      checkUserData(){
        this.dialogUserVisible = true;
        this.loadUserListData() ;
      },
      loadUserListData(){
        this.userParam.pageNo = this.userPage ;
        this.userParam.pageSize = this.pageSize ;
        //console.log("this.model.companyId: ", this.model.companyId)
        // if(this.model.companyId){
          this.userParam.companyId = this.model.companyId ;
        // }
        _getSSOUserPageList(this.userParam).then((data) => {
          const {success, result} = data;
          if(success) {
            //console.log(JSON.stringify(result))
            this.userListData = result.rows;
            this.userTotalSize = result.total;
          } else {
            console.log("_getSSOUserPageList 失败")
          }
        });
      },

      // dialog用户搜索
      onUserSubmit(){
        this.loadUserListData() ;
      },

      // 用户弹出框选择
      confirmCheckUser(row){

        this.$refs.form.resetFields()

        // console.log('selected user: ', JOSN.stringify(row))
        this.dialogUserVisible = false;

        this.model.userId = row.userId ;
        this.model.userAlias = row.userAlias ;
        this.model.userMobile = row.userMobile ;
        this.model.uFlag = 1 ;

      },
      cancelSelectedUser() {
        // this.$refs.form.resetFields()
        this.model.companyId = ''
        // this.userEditFlag = false ;
        this.model.userAlias = '' ;
        this.model.userMobile = '' ;
        this.model.uFlag = 0 ;
      },

      userHandleSizeChange(val) {
        this.pageSize = val ;
        this.loadUserListData() ;
      },
      userHandleCurrentChange(val) {
        this.userPage = val ;
        this.loadUserListData() ;
      },


    }
  }
</script>

<style>
  .shop-select-user .el-dialog--small { width: 750px;  }
</style>
