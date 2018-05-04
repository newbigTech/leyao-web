<template>
  <div class="">
    <div class="tab-components">
      <tab-items>
        <li class="active"><a href="#/mall/addShop">添加店铺</a></li>
      </tab-items>
      <el-row :gutter="20">
          <el-col :span="4"><div class="grid-content bg-purple">&nbsp;&nbsp;</div></el-col>
      <el-col :span="16">
        <div class="grid-content bg-purple">
         <el-form :model="shopParam" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="margin-top: 30px;">
              <!--公司 -->
              <el-form-item label="公司">
                <el-button type="primary" @click.native.prevent="checkCompanyData">选择公司</el-button>
                <el-button type="primary" @click.native.prevent="createNewCom">创建新公司</el-button>
              </el-form-item>
              <el-form-item label="公司名称" prop="companyName">
                <el-input v-model="shopParam.companyName" style="width:20%;" :disabled="comEditFlag"></el-input>
              </el-form-item>
              <el-form-item label="所在地" prop="cityArea" >
                  <el-row :gutter="12" type="flex" justify="start">
                    <el-col :span="6">
                      <el-select v-model="pid" :span="6" @change="pchange" :disabled="comEditFlag">
                        <el-option v-for="p in cityData" :label="p.text" :value="p.id" :key="p.id"></el-option>
                      </el-select>
                    </el-col>                   
                    <el-col :span="6">
                      <el-select v-model="cid" :span="6" @change="cchange" :disabled="comEditFlag"> 
                        <el-option v-for="c in cs" :label="c.text" :value="c.id" :key="c.id"></el-option>
                      </el-select>
                    </el-col>
                    <el-col :span="6">
                      <el-select v-model="did" :span="6" @change="dchange" :disabled="comEditFlag"> 
                        <el-option v-for="d in ds" :label="d.text" :value="d.id" :key="d.id"></el-option>
                      </el-select>
                    </el-col>
                  </el-row>
              </el-form-item>
              <el-form-item label="详细地址" prop="address">
                <el-input v-model="shopParam.address" style="width:40%;" :disabled="comEditFlag"></el-input>
              </el-form-item>
              <el-form-item label="联系电话" prop="contact" >
                <el-input v-model="shopParam.contact" style="width:20%;" :disabled="comEditFlag"></el-input>
              </el-form-item>

              <!--用户 -->
              <el-form-item label="用户">
                <el-button type="primary" @click.native.prevent="checkUserData">选择用户</el-button>
                <el-button type="primary" @click.native.prevent="createNewUser">创建新用户</el-button>
              </el-form-item>
              <el-form-item label="店铺管理员" prop="userAlias">
                <el-input v-model="shopParam.userAlias" style="width:20%;" :disabled="userEditFlag"></el-input>
              </el-form-item>
              <el-form-item label="手机号码" prop="userMobile">
                <el-input v-model="shopParam.userMobile" style="width:20%;" :disabled="userEditFlag"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="pass" v-if="!userEditFlag">
                <el-input type="password" v-model="shopParam.pass" style="width:20%;" auto-complete="off"
                 :disabled="userEditFlag"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass" v-if="!userEditFlag">
                <el-input type="password" v-model="shopParam.checkPass" style="width:20%;" auto-complete="off"
                 :disabled="userEditFlag"></el-input>
              </el-form-item>              
              
              <el-form-item label="店铺名称" prop="shopName">
                <el-input v-model="shopParam.shopName" style="width:50%;"></el-input>
              </el-form-item>
              <el-form-item label="运营商编码" prop="supplierCode">
                <el-input v-model="shopParam.supplierCode" style="width:20%;"></el-input>
              </el-form-item>
              <el-form-item label="店铺编码" prop="shopCode">
                <el-input v-model="shopParam.shopCode" style="width:20%;"></el-input>
              </el-form-item>
              <el-form-item label="订单长度" prop="orderSD">
                <el-input v-model="shopParam.orderSD" style="width:10%;"></el-input>
              </el-form-item>
              <el-form-item label="是否自营" prop="isMyself">
                <el-radio-group v-model="shopParam.isMyself">
                  <el-radio :label="1">是</el-radio>
                  <el-radio :label="0">否</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="关键字" prop="shopKeywords">
                <el-input v-model="shopParam.shopKeywords" style="width:20%;"></el-input>
              </el-form-item>
              <el-form-item label="店铺描述" prop="description">
                <el-input type="textarea" v-model="shopParam.description" style="width:50%;">
                </el-input>
              </el-form-item>
              <el-form-item label="货到付款">
                <el-switch on-text="是" off-text="否" v-model="isCod"
                  on-color="#13ce66"
                  off-color="#ff4949">
                </el-switch>
              </el-form-item>
              <el-form-item label="库存提醒" prop="stockWarn">
                <el-input v-model="shopParam.stockWarn" style="width:10%;"></el-input>
              </el-form-item>
              <el-form-item label="满额免运费" prop="shopFreePrice">
                <el-input v-model="shopParam.shopFreePrice" style="width:10%;"></el-input>
              </el-form-item>
              <el-form-item label="开店状态" prop="statusCode">
                <el-radio-group v-model="shopParam.statusCode">
                  <el-radio :label="0">开启</el-radio>
                  <el-radio :label="1">关闭</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="设置店铺logo">
                <el-upload
                  action="/pub/pubController/uploadPic"
                  type="drag"
                  :thumbnail-mode="true"
                  :on-preview="handlePreview"
                  :on-remove="handleRemove"
                  :on-success="handleSuccess"
                >
                  <i class="el-icon-upload"></i>
                  <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
                  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                </el-upload>
              </el-form-item>
              <el-form-item label="选择分类">  
                  <ul id="classifyTree" class="ztree"></ul>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click.native.prevent="handleSubmit">立即创建</el-button>
                <el-button @click.native.prevent="$emit('reback', 'shopList')">返回</el-button>
              </el-form-item>
            </el-form>

       </div></el-col>
      <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
    </el-row>
    <!-- <choice-company :e="e"></choice-company> -->
    </div>
  
  <!-- 公司 -->
  <el-dialog title="选择公司" v-model="dialogCompanyVisible">
        <el-form :inline="true" :model="comParam" class="demo-form-inline">
          <el-form-item>
            <el-input v-model="comParam.companyName" placeholder="公司名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click.native.prevent="onComSubmit">查询</el-button>
          </el-form-item>
        </el-form>
        <div>          
        <el-table
          :data="companyListData"
          selection-mode="multiple"
          stripe
          style="width: 100%">
          <el-table-column type="selection" width="50">  </el-table-column>
          <el-table-column property="companyId" label="公司编号" width="120"> </el-table-column>
          <el-table-column property="companyName" label="公司名称" show-tooltip-when-overflow> </el-table-column>
          <el-table-column property="contact" label="联系电话"> </el-table-column>
          <el-table-column inline-template label="操作"> 
            <div>
              <el-button type="primary" @click.native.prevent="confirmCheckCompany(row)">选择</el-button>
            </div> 
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          @size-change="comHandleSizeChange"
          @current-change="comHandleCurrentChange"
          :current-page="comPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="comTotalSize">
       </el-pagination>
  </el-dialog>   
  <!-- 选择用户 -->
  <el-dialog title="选择用户" v-model="dialogUserVisible">
        <el-form :inline="true" :model="userParam" class="demo-form-inline">
                <el-form-item>
                  <el-input v-model="userParam.userAlias" placeholder="用户名称"></el-input>                 
                </el-form-item>
                <el-form-item>
                  <el-input v-model="userParam.userMobile" placeholder="手机号码"></el-input>                  
                </el-form-item>                               
                <el-form-item>
                  <el-button type="primary" @click.native.prevent="onUserSubmit">查询</el-button>
                </el-form-item>
        </el-form>          
        <el-table
          :data="userListData"
          selection-mode="multiple"
          stripe
          style="width: 100%">
          <el-table-column type="selection" width="50">  </el-table-column>
          <el-table-column property="userId" label="用户编号" width="120"> </el-table-column>
          <el-table-column property="userAlias" label="用户名称" width="200"> </el-table-column>
          <el-table-column property="userMobile" label="手机号码" width="240"> </el-table-column>
          <el-table-column inline-template label="操作"> 
            <div>
              <el-button type="primary" @click.native.prevent="confirmCheckUser(row)">选择</el-button>  
            </div> 
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          @size-change="userHandleSizeChange"
          @current-change="userHandleCurrentChange"
          :current-page="userPage"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="userTotalSize">
      </el-pagination>
    </el-dialog> 
  </div>  
</template>


<style lang="sass">
  input[type=file]{
    display: none;
  }
</style>
<script>
  import breadcrumb from "components/breadcrumb"
  import tabItems from "components/tab-items"
  import { getCompanyUserList } from 'src/vuex/actions/userAction'
  import { validUser } from 'src/vuex/actions/userAction'
  import {getClassifyList2zTree} from 'src/vuex/actions/mallClassifyAction'
  import { _getMallShopList } from 'src/vuex/api/shopAPI'
  import { _addMallShop,
           _getSSOUserPageList,
           _findCompanyList ,
           _getBaseUserById} from 'src/vuex/api/shopAPI'
 
  export default {
    components: {
      breadcrumb,
      tabItems
    },
    computed: {
      cs() {
        return (_.find(this.cityData, {id: this.pid}) || {}).children || {}
      },
      ds() {
        return (_.find(this.cs, {id: this.cid}) || {}).children || {}
      },
    },
    data(){
      var checkStrWithChar = (rule, value, callback) => {
          setTimeout(() => {
            if(!/^[a-zA-Z][a-zA-Z0-9_]*$/.test(value)) {
              callback(new Error('请输入以字母开头一串字符'));
            }else{
              let tempName = '' ;
              if(value.length == 3) tempName = '';
              if(value.length == 4) tempName = '';
              if (value.length == 3 || value.length == 4) {
                  _getMallShopList({"code":value}).then((data) => {
                      const {success,result}=data;
                      if(success) {
                        if(result.total>0){
                          callback(new Error('编号已存在'));
                        }else{
                          callback() ;
                        }
                      }else{
                        callback(new Error('系统错误'));
                      }
                  }); 
              };
            }
          }, 1000);
      };
      var checkNum = (rule, value, callback) => {
        var _num = parseInt(value, 10);
        setTimeout(() => {
          if (!Number.isInteger(_num)) {
            callback(new Error('请输入数字值'));
          } else{
             callback();
          }
        }, 1000);
      };

      var checkUserAliasExists = (rule, value, callback) => {
        if(this.userEditFlag) callback() ;
        value = _.trim(value);
        if(value == ''){
          callback(new Error('请输入用户名'));
          return; 
        }else if( !/^[a-zA-Z][a-zA-Z0-9]{3,19}$/.test(value)){
          callback(new Error('请输入4-20位字符，字母开头'));
          return;
         }
         validUser({validValue:value,validType:1}).then((data) => {
            const {success,msg,result}=data;
            if(!success) {
              callback(new Error(msg));
            }else{
              callback();
            }
        }); 
      };
      var checkUserMobileExists = (rule, value, callback) => {
        if(this.userEditFlag) callback() ;
        value = _.trim(value);
        if(value == ''){
          callback(new Error('请输入手机号码'));
          return; 
        }else if( !/^1[0-9]{10}$/.test(value)){
          callback(new Error('手机号码格式不正确'));
          return;
         }
         validUser({validValue:value,validType:0}).then((data) => {
            const {success,msg,result}=data;
            if(!success) {
              callback(new Error(msg));
            }else{
              callback();
            }
        }); 
      };
      var validPassword = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码(由6-20位组成)'));
        } else {
          if (this.shopParam.pass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validRepassword = (rule, value, callback) => {       
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if (value !== this.shopParam.pass) {
          callback(new Error('两次输入密码不一致!'));
        } else {
          callback();
        }
      };

      return {
        treeClassifyData:[],
        cityData: [],
        pid: '110000',
        cid: '110100',
        did: '110101',

        fileNameAndMd5:'',
        classfyTreeSelect:'',
        errorMsg:'',
        isCod:false,
        //e: new this.$root.constructor(),
        shopParam:{
          isMyself:1,
          isPackStatus:1,
          statusCode:0,
          companyName:'',
          address:'',
          contact:'',
          userAlias:'',
          userMobile:'',
          pass:'',
          shopName:'',
          supplierCode:'',
          shopCode:'',
          orderSD:'',
          shopKeywords:'',
          stockWarn:'0',
          shopFreePrice:'0',
          checkPass:'',
        },
        setting: { //zTree配置
          view: {
            showIcon: false
          },
          check: {
            enable: true
          },
          data: {
            simpleData: {
              enable: true,
              idKey: "classifyId",
              pIdKey: "parentId",
            }
          }
        },
        rules: {
          companyName: [
            { required: true, message: '请输入公司名称', trigger: 'blur' },
          ],
          address: [
            { required: true, message: '请输入公司地址', trigger: 'blur' },
          ],
          contact: [
            { required: true, message: '请输入公司联系方式', trigger: 'blur' },
          ],
          userAlias: [
            { required: true, message: '请输入管理员名', trigger: 'blur' },
            { validator: checkUserAliasExists, trigger: 'blur' }
          ],  
          userMobile: [
            { required: true, message: '请输入管理员电话', trigger: 'blur' },
            { validator: checkUserMobileExists, trigger: 'blur' }
          ], 
          pass: [            
            { required: true, message: '请输入密码(由6-20位组成)', trigger: 'blur' },
            { type: 'string', min: 6, max: 20, message: '密码(由6-20位组成)' },
            { validator: validPassword }
          ],     
          checkPass:[
            //{ required: true, message: '请再次输入密码', trigger: 'blur' },
            { validator: validRepassword }
          ],              
          shopName: [
            { required: true, message: '请输入店铺名称', trigger: 'blur' },
            { type: 'string', min: 0, max: 30, message: '店铺长度不能超过30' }
          ],
          supplierCode: [
            { required: true, message: '请输入运营商编码', trigger: 'blur' },
            { validator: checkStrWithChar, trigger: 'change' },
            { type: 'string', min: 3, max: 3, message: '运营商编码为3位字符' }
          ],
          shopCode: [
            { required: true, message: '请输入店铺编码', trigger: 'blur' },
            { validator: checkStrWithChar, trigger: 'change' },
            { type: 'string', min: 4, max: 4, message: '店铺编码为4位字符' }
          ],
          orderSD: [
            { required: true, message: '请填写订单长度', trigger: 'blur' },
            { validator: checkNum, trigger: 'change' }
          ],
          shopKeywords: [
            { required: true, message: '请填写关键字', trigger: 'blur' },
            { type: 'string', max: 30, message: '店铺长度不能超过30' }
          ],
          description: [
            { required: true, message: '请填写店铺简介', trigger: 'blur' }
          ],
          stockWarn: [
            { required: true, message: '请填写库存提醒', trigger: 'blur' },
            { validator: checkNum, trigger: 'change' }
          ],
          shopFreePrice: [
            { required: true, message: '请填写满额免运费', trigger: 'blur' },
            { validator: checkNum, trigger: 'change' }
          ]
        },
        // 弹出框信息
        uFlag:0,
        pageSize:10,
        dialogCompanyVisible:false, 
        comEditFlag:false,    // 是否可编辑   
        comParam:{},
        comPage :1,
        comTotalSize: 10,
        companyListData:[],
        
        cFlag:0,
        dialogUserVisible:false,
        userEditFlag:false, // 是否可编辑 
        userParam:{},
        userPage :1,
        userTotalSize: 10,
        userListData:[],

      };
    },
    vuex:{

    },
    methods:{
      pchange(val) {
        this.cid = this.cs[0]['id']
        this.did = this.ds[0]['id']
      },
      cchange(val) {
        this.did = this.ds[0]['id']
      },
      dchange(val) {
        console.log(this.pid, this.cid, this.did)
      },
      handleSubmit(ev) {
             // 是否开启开关
             if(this.isCod) {
                this.shopParam.isCod = 1 ;
             }else{
                this.shopParam.isCod = 0 ;
             }
             this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                   if(this.fileNameAndMd5==''){
                      this.errorMsg = '请上传logo图片';
                      this.$message({message: this.errorMsg, type: 'warning'});
                      return false ;
                   }  
                   // 商品分类
                   let treeObj = $.fn.zTree.getZTreeObj("classifyTree")
                   let nodes = treeObj.getCheckedNodes(true)
                   let classifyIds = []
                   if (nodes.length > 0) {
                      nodes.forEach(function(item) {
                        classifyIds.push(item.classifyId)
                      })
                   }
                   this.classfyTreeSelect = classifyIds.join(",")
                   if(this.classfyTreeSelect == ''){
                      this.errorMsg = '请选择系统分类';
                      this.$message({message: this.errorMsg, type: 'warning'});
                      return false ;
                   } 
                   this.shopParam.classifyIdStr = this.classfyTreeSelect;                                  
                   this.shopParam.cFlag = this.cFlag ;
                   this.shopParam.uFlag = this.uFlag ;
                   this.shopParam.pid = this.pid ;
                   this.shopParam.cid = this.cid ;
                   this.shopParam.did = this.did ;
                   console.log(JSON.stringify(this.shopParam))
                   //return ;
                   _addMallShop(this.shopParam).then((data) => {
                      const {success, msg} = data;
                      if(success) {
                        this.$message({message: '添加成功', type: 'success'});
                        // 保存成功之后返回
                        this.$emit("reback", "shopList");

                      } else {
                          this.$message.error('错了哦，'+msg);
                          console.log(msg)
                          console.log("失败")
                      }
                  });
              } else {
                console.log('error submit!!');
                return false;
              }
          });

        },
        handleReset() {
          this.$refs.ruleForm.resetFields();
        },
        handleRemove(file, fileList) {
          console.log(file, fileList);
        },
        handlePreview(file) {
          console.log(file);
        },
        handleSuccess(response, file, fileList){
          console.log(JSON.stringify(file));
          this.fileNameAndMd5 = file.name+"-"+file.response.result.picMD5;
          this.shopParam.shopFileMd5 = file.response.result.picMD5 ;
          this.shopParam.shopFileName = file.name ;
        },
        // 选择公司
        loadCompanyListData(){
          this.comParam.pageNo = this.comPage ;
          this.comParam.pageSize = this.pageSize ;
          _findCompanyList(this.comParam).then((data) => {
            const {success, result} = data;
            if(success) {
              console.log(result)
              this.companyListData = result.rows;
              this.comTotalSize = result.total;
            } else {
                console.log("失败")
            }
          });   
        },
        checkCompanyData(){
          this.dialogCompanyVisible = true; 
          this.loadCompanyListData()
        },
        onComSubmit(){
          this.loadCompanyListData() ;
        },
        comHandleSizeChange(val) {
          this.pageSize = val ;
          this.loadCompanyListData()
        },
        comHandleCurrentChange(val) {
          this.comPage = val ;
          this.loadCompanyListData()
        },
        // 选择用户
        checkUserData(){
          this.dialogUserVisible = true; 
          this.loadUserListData() ;
        },
        loadUserListData(){
          this.userParam.pageNo = this.userPage ;
          this.userParam.pageSize = this.pageSize ;
          _getSSOUserPageList(this.userParam).then((data) => {
            const {success, result} = data;
            if(success) {
              //console.log(JSON.stringify(result))
              this.userListData = result.rows;
              this.userTotalSize = result.total;
            } else {
                console.log("失败")
            }
          }); 
        },
        onUserSubmit(){
          this.loadUserListData() ;
        },
        userHandleSizeChange(val) {
          this.pageSize = val ;
          this.loadUserListData() ;
        },
        userHandleCurrentChange(val) {
          this.userPage = val ;
          this.loadUserListData() ;
        },        
        // 公司弹出框选择
        confirmCheckCompany(row){
          this.dialogCompanyVisible = false; 
          this.comEditFlag = true ;
          this.shopParam.companyId = row.companyId ;
          this.shopParam.companyName = row.companyName ;
          this.shopParam.address = row.address ;
          this.shopParam.contact = row.contact ;
          this.pid = row.province ;
          this.cid = row.city ;
          this.did = row.area ;
          this.cFlag = 1 ;
          console.log(JSON.stringify(row))
          _getBaseUserById(row.adminUserId).then((data) => {
                const {success, result} = data;
                if(success) {
                  console.log(result)
                  // this.shopParam.userId = result.userId ;
                  // this.shopParam.userAlias = result.userAlias ;
                  // this.shopParam.userMobile = result.userMobile ;       
                } else {
                    console.log("失败")
                }
          });
        },
        createNewCom(){
          this.comEditFlag = false ;
          this.shopParam.companyName = '';
          this.shopParam.address = '' ;
          this.shopParam.contact = '' ;
          this.pid = '110000',
          this.cid = '110100',
          this.did = '110101',
          this.cFlag = 0 ;
        },
        // 用户弹出框选择
        confirmCheckUser(row){
          this.dialogUserVisible = false; 
          this.userEditFlag = true ;
          this.shopParam.userId = row.userId ;
          this.shopParam.userAlias = row.userAlias ;
          this.shopParam.userMobile = row.userMobile ;
          this.uFlag = 1 ;
          console.log("confirmCheckUser ===>"+JSON.stringify(row))
        }, 
        createNewUser(){
          this.userEditFlag = false ;
          this.shopParam.userAlias = '' ;
          this.shopParam.userMobile = '' ;
          this.uFlag = 0 ;
        },
        // 系统分类
        loadTreeClassifyData(){
          getClassifyList2zTree().then(treeData => {
              console.log(JSON.stringify(treeData))
              var treeObj = $.fn.zTree.init($("#classifyTree"), this.setting, treeData) ;
              treeObj.expandAll(true); 
          })
        },
    },
    created(){
      this.loadTreeClassifyData()
      require.ensure([], ()=> {
        this.cityData = require('assets/cityforaddress.json')
      })   
    }

  }
</script>
