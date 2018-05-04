<template>
  <div>
    <card-panel>
      <h3 slot="title">店铺公司配置</h3>
      <div slot="panel-btns">
        <!-- <el-button size="small" type="primary">保存</el-button> -->
      </div>
      <div slot="panel-body">
        <el-form :model="model" :rules="rules" ref="form" style="width: 500px;">
          <el-form-item label="公司名称" label-width="90px" prop="companyName">
            <el-row type="flex">
              <el-col :span="24"><el-input placeholder="请输入公司名" v-model="model.companyName" :disabled="comNameEditFlag"></el-input></el-col>
              <el-col :span="0" style="width: 150px; margin-left: 10px;"><el-button  @click.native.prevent="checkCompanyData" v-show="model.isMyself==0">选择已有公司</el-button></el-col>
            </el-row>
          </el-form-item>

          <el-form-item label="公司电话" label-width="90px" prop="contact">
            <el-col :span="24"><el-input :maxlength="15" placeholder="请输入公司电话" type="text" v-model="model.contact" :disabled="comEditFlag"></el-input></el-col>
          </el-form-item>

          <el-form-item label="所在地区" label-width="90px" prop="cityArea" required>
            <el-row :gutter="12" type="flex" justify="start">
              <el-col :span="8">
                <el-select v-model="pid" :span="6" @change="pchange" :disabled="comEditFlag">
                  <el-option v-for="p in cityData" :label="p ? p.text : ''" :value="p && p.id" :key="p && p.id"></el-option>
                </el-select>
              </el-col>
              <el-col :span="8">
                <el-select v-model="cid" :span="6" @change="cchange" :disabled="comEditFlag">
                  <el-option v-for="c in cs" :label="c ? c.text : ''" :value="c && c.id" :key="c && c.id"></el-option>
                </el-select>
              </el-col>
              <el-col :span="8">
                <el-select v-model="did" :span="6" @change="dchange" :disabled="comEditFlag">
                  <el-option v-for="d in ds" :label="d ? d.text : ''" :value="d && d.id" :key="d && d.id"></el-option>
                </el-select>
              </el-col>
            </el-row>
          </el-form-item>

          <el-form-item label="详细地址" label-width="90px" prop="address">
            <el-input :maxlength="200" placeholder="请输入公司详细地址" type="textarea" v-model="model.address" :disabled="comEditFlag"></el-input>
          </el-form-item>

          <el-form-item label-width="90px">
            <!-- <el-button type="warning" @click.native="reset">重置输入</el-button> -->
            <el-button type="primary" @click.native="$emit('back', '0')">上一步</el-button>
            <el-button type="warning" @click.native="next">下一步</el-button>
            <el-button type="danger" @click.native="$emit('back', '0')">取消</el-button>
            <el-button type="danger"  @click.native="cancelSelectedCompany" v-show="comEditFlag">取消选择的公司</el-button>
          </el-form-item>
        </el-form>
      </div>
    </card-panel>

    <!-- 公司 -->
    <el-dialog title="选择公司" v-model="dialogCompanyVisible" class="shop-select-company">
      <el-form :inline="true" :model="comParam">
        <el-form-item>
          <el-input v-model="comParam.companyName" placeholder="公司名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.native.prevent="onComSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <div>
      <div class="_table-list">
        <el-table :data="companyListData" border>
          <el-table-column property="companyId" label="公司编号" width="100" align="center"> </el-table-column>
          <el-table-column property="companyName" label="公司名称" show-tooltip-when-overflow> </el-table-column>
          <el-table-column property="contact" label="联系电话" width="150"> </el-table-column>
          <el-table-column inline-template label="操作" width="80" align="center">
            <div>
              <el-button type="primary" size="small" @click.native.prevent="confirmCheckCompany(row)">选择</el-button>
            </div>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="_pagination">
          <el-pagination
            layout="total, sizes, prev, pager, next"
            @size-change="comHandleSizeChange"
            @current-change="comHandleCurrentChange"
            :current-page="comPage"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize"
            :total="comTotalSize">
          </el-pagination>
        </div>

      </div>
    </el-dialog>
  </div>
</template>

<script>
  import RegExr from "lib/utils/regexp"
  import { _findCompanyList,
           _validCompanyName,
           _validateExistMallShop,_findSupplierCompanyInfo } from 'src/vuex/api/shopAPI'
  export default {
    name: 'tabShopCompany',
    props: {
      model: Object, default: () => {},
      e: Object, default: () => { return { $on: () => {}, $emit: () => {} } }
    },
    computed: {
      cs() {
        return (_.find(this.cityData, {id: this.pid}) || {}).children || [{}]
      },
      ds() {
        return (_.find(this.cs, {id: this.cid}) || {}).children || [{'id': 0, 'text': '无数据'}]
      },
    },
    data() {
      return {
        cityData: [],
        validatingStatus: false,
        pid: '',
        cid: '',
        did: '',

        // 弹出框信息
        cFlag:0,
        pageSize:10,
        dialogCompanyVisible: false,
        comEditFlag: false,    // 是否可编辑
        comNameEditFlag:false, // 公司名是否可编辑
        comParam:{},
        comPage :1,
        comTotalSize: 10,
        companyListData:[],


        // 表单校验
        rules: {
          companyName: [{
            type: 'string', required: true, trigger: 'blur', message: '请输入公司名称',
          },{ validator: (rule, value, callback) => {
                //console.log("companyName")
                if (!this.model.uFlag) {
                  _validCompanyName(value).then((data) => {
                    const {success,msg,result}=data
                    if(!success) {
                      callback(new Error("公司名称已存在"))
                    }else{
                      callback()
                    }
                  })
                } else {
                  callback()
                  console.log('padddddd')
                }
            }, trigger: 'blur'}],
          contact: [{
            type: 'string', required: true, pattern: RegExr.phoneOrMobile , trigger: 'blur', message: '请输入正确的联系电话,例如13888888888或者400-700-7599'
          }],
          address: [{
            type: 'string', required: true, trigger: 'blur', 'message': '请输入公司详细地址'
          }],
          cityArea: [{
            validator: (rule, value, callback, source, options) => {
              if (!this.pid) return callback(new Error("请选择公司所在地区"))
              callback()
            }
          }]
        }
      }
    },
    methods: {
      pchange(val) {
        //console.log("this.pid: ", this.pid)
        if (!this.pid) return
        this.cid = this.cs[0]['id']
        this.did = this.ds[0]['id']

        // console.log(_.find(this.cityData, {id: val}).text)

        this.model.province = this.pid
        this.model.pid = this.pid
        this.model.city = this.cid
        this.model.cid = this.cid
        this.model.area = this.did
        this.model.did = this.did
      },
      cchange(val) {
        if (!this.pid) return
        this.did = this.ds[0]['id']
        this.model.province = this.pid
        this.model.pid = this.pid
        this.model.city = this.cid
        this.model.cid = this.cid
        this.model.area = this.did
        this.model.did = this.did
      },
      dchange(val) {
        if (!this.pid) return
        //console.log(this.pid, this.cid, this.did, val)
        this.model.province = this.pid
        this.model.pid = this.pid
        this.model.city = this.cid
        this.model.cid = this.cid
        this.model.area = this.did
        this.model.did = this.did
      },

      reset() {
        this.$refs.form.resetFields()
      },
      next() {
        // 验证
        if (!this.comEditFlag) {
           // 去除不需要验证的字段
           // let _rules = {...this.rules}
           // if (this.model.isMyself == 1) {
           //    console.log("this.rules")
           //    delete this.rules['companyName']
           // }else{
           //    this.rules.companyName = this.companyName ;
           // }
          //console.log(this.rules.companyName)
          this.$refs.form.validate(valid => {
            if (!valid) {
              this.validatingStatus = false
              return false
            }
            this.validatingStatus = true
            // 验证通过
            this.$emit('next', '2')
            return true
          })
        } else {
          // 验证通过
          this.$emit('next', '2')
          return true
        }
      },

      back() {
        console.log(this.$parent)
      },

      // 选择公司
      loadCompanyListData(){
        this.comParam.pageNo = this.comPage ;
        this.comParam.pageSize = this.pageSize ;
        _findCompanyList(this.comParam).then((data) => {
          const {success, result} = data;
          if(success) {
            // console.log(result)
            this.companyListData = result.rows;
            this.comTotalSize = result.total;
          } else {
            this.$message.warning("操作失败") ;
            console.log("失败")
          }
        });
      },

      // 选择已有公司
      checkCompanyData() {
        this.dialogCompanyVisible = true;
        this.loadCompanyListData()
      },

      // 公司查询
      onComSubmit(){
        this.loadCompanyListData() ;
      },

      // 分页处理
      comHandleSizeChange(val) {
        this.pageSize = val ;
        this.loadCompanyListData()
      },
      comHandleCurrentChange(val) {
        this.comPage = val ;
        this.loadCompanyListData()
      },

      // 公司弹出框选择
      confirmCheckCompany(row){
        this.model.userId = '' ;
        this.model.userAlias = '' ;
        this.model.userMobile = '' ;
        this.model.uFlag = 0 ;
        // 校验是否可选
        _validateExistMallShop(row.companyId).then((data) => {
          const {success, msg ,result} = data;
          if(!success) {
            this.$message.warning(msg) ;
          }else{
            this.$refs.form.resetFields()

            // console.log(JSON.stringify(row))
            this.dialogCompanyVisible = false;
            this.comEditFlag = true ;
            this.comNameEditFlag = true;
            this.model.companyId = row.companyId ;
            this.model.companyName = row.companyName ;
            this.model.address = row.address ;
            this.model.contact = row.contact ;
            this.model.cFlag = 1 ;
            this.pid = row.province ;
            this.cid = row.city ;
            this.did = row.area ;
          }
        });

      },

      // 取消选择的公司 重新录入
      cancelSelectedCompany() {
        // 同时清空用户
        this.model.userId = '' ;
        this.model.userAlias = '' ;
        this.model.userMobile = '' ;
        this.model.uFlag = 0 ;

        this.comEditFlag = false
        this.comNameEditFlag = false;
        this.model.companyId = ''
        this.model.companyName = ''
        this.model.address = ''
        this.model.contact = ''
        this.model.cFlag = 0

        // 初始强制重新渲染
        this.pid = '0'
        this.cid = '0'
        this.did = '0'
        this.$nextTick(() => {
          this.pid = ''
          this.cid = ''
          this.did = ''
        })
        setTimeout(() => this.$refs.form.resetFields())
      },
      loadSupplierCompany(){
        if(this.model.isMyself == 1){
               _findSupplierCompanyInfo().then((data) => {
                  const {success, result} = data;
                  if(success) {
                    //console.log(result)
                    //this.model.companyId = result.companyId ;
                    this.model.companyName = result.companyName+"-店铺" ;
                    this.model.address = result.address ;
                    this.model.contact = result.contact ;
                    this.model.cFlag = 0 ;
                    this.comEditFlag = false ;
                    this.comNameEditFlag = true;
                    this.pid = result.province ;
                    this.cid = result.city ;
                    this.did = result.area ;
                  } else {
                    this.$message.warning("操作失败") ;
                  }
              });         
        }else{
          this.comEditFlag = false ;
          this.comNameEditFlag = false ;
        }
      }
    },
    created() {
      // 异步加载地区选择列表
      require.ensure([], ()=> {
        this.cityData = require('assets/cityforaddress.json')
        //console.log(this.cityData)
      });
    }
  }
</script>

<style>
  .shop-select-company .el-dialog--small { width: 750px;  }
</style>
