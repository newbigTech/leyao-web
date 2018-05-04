<template>
  <div class="_shop-list _container">
    <!-- 查询 操作 -->
    <div class="_setting-bar">
      <div class="_query-form">
        <div class="_query-form-item">
          <el-form :inline="true">
            <el-form-item>
              <el-input placeholder="店铺名称" v-model="shopParam.shopName"></el-input>
            </el-form-item>
            <el-form-item>
              <el-input placeholder="公司名称" v-model="shopParam.companyName"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="_query-form-btn">
          <el-button type="default" @click.native.prevent="onSubmit">查询</el-button>
        </div>
      </div>
      <div class="_actions-btn">
        <!-- <el-button type="primary" @click.native="addShop">新增</el-button> -->
      </div>
    </div>

    <!-- 数据列表 -->
    <div class="_table-container">
      <div class="_table-list">
        <el-table
          :data="mallShopDataList"
          selection-mode="multiple"
          stripe
          border
          style="width: 100%"
          @selection-change="handleMultipleSelectionChange">
          <el-table-column type="selection" width="50" align="center">  </el-table-column>
          <el-table-column property="shopId" width="70" label="店铺ID"> </el-table-column>
          <el-table-column property="companyName" min-width="200" label="公司名称"> </el-table-column>
          <el-table-column property="shopName" min-width="180" label="店铺名"> </el-table-column>
          <el-table-column property="supplierCode" label="运营商编码" width="120" align="center"> </el-table-column>
          <el-table-column property="shopCode" label="店铺编码" width="110" align="center"> </el-table-column>
          <el-table-column inline-template label="店铺管理员" width="120" align="center">
            <div><a @click="showUserDetailInfo(row.adminUserId)">{{row.adminUserId}}</a></div>
          </el-table-column>
          <el-table-column inline-template label="是否自营" width="120" align="center">
            <div>{{row.isMyself == 0 ? '否' : '是'}}</div>
          </el-table-column>
          <el-table-column inline-template label="是否货到付款" width="150" align="center">
            <div>{{row.isCod == 0 ? '否' : '是'}}</div>
          </el-table-column>
          <el-table-column align="center" property="description" min-width="130" label="店铺描述" show-tooltip-when-overflow> </el-table-column>
          <el-table-column inline-template label="状态" width="120" align="center">
            <div>
              <span v-if="row.statusCode == 0">测试</span>
              <span v-if="row.statusCode == 1">开启</span>
              <span v-if="row.statusCode == 2">关闭</span>
            </div>
          </el-table-column>
          <el-table-column align="center" property="createdDtm" label="创建时间" width="130" :formatter="dateFormat"> </el-table-column>
          <el-table-column align="center" inline-template label="操作" width="140">
            <div>
              <!-- <el-button type="primary" icon="edit" @click.native.prevent="updateShop(row.shopId)"></el-button> -->
              <el-button type="info" size="mini" @click.native.prevent="e.$emit('forward', 'goodsList', row)">商品列表</el-button>
              <el-button v-show="row.statusCode!=3" type="warning" size="mini" @click.native.prevent="e.$emit('forward', 'shopForm', row)">编辑</el-button>
            </div>
          </el-table-column>
        </el-table>
        <div class="_pagination">
          <!-- 分页 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next"
            :total="totalSize">
          </el-pagination>
        </div>
      </div>
    </div>

     <!-- 公司 -->
    <el-dialog title="用户信息" v-model="dialogUserDetailVisible" size="tiny">
       <el-form ref="userDetail" :model="userDetailInfo" label-width="80px">
        <el-form-item label="用户编号">
          <el-input v-model="userDetailInfo.userId" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="用户名称">
          <el-input v-model="userDetailInfo.userAlias" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="手机号码">
          <el-input v-model="userDetailInfo.userMobile" :disabled="true"></el-input>
        </el-form-item>
         <el-form-item label="邮箱">
          <el-input v-model="userDetailInfo.userEmail" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="userDetailInfo.realName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="userDetailInfo.nickName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-input v-model="sexName" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="所在地">
          <el-input v-model="userDetailInfo.strAddress" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input type="textarea" v-model="userDetailInfo.address" :disabled="true"></el-input>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import { _getMallShopList,_getBaseUserById } from 'api/shopAPI'
  import { _deleteMallShop } from 'api/shopAPI'
  import { dateFormat as _dateFormat} from 'lib/utils/dateFormat'
  export default {
    name: 'shopList',
    props: {
      e: Object, default: () => { return { $on: () => {}, $emit: () => {} } }
    },
    data(){
      return {
        dateFormat: (row, col) => _dateFormat(new Date(row.createdDtm), 'yyyy-MM-dd'),
        page :1,
        pageSize :10,
        totalSize: 0,
        shopName:'',
        mallShopDataList:[],
        shopParam:{},
        multipleSelection:[], // 多选

        dialogUserDetailVisible:false, // 用户详情弹出框
        userDetailInfo:{},// 用户详情
        sexName:''
      }
    },

    methods: {
      onSubmit() {
        this.loadData();
      },
      loadData() {
        this.param = {
          companyName:this.shopParam.companyName,
          shopName:this.shopParam.shopName,
          pageNo:this.page,
          pageSize:this.pageSize
        }
        console.log(JSON.stringify(this.param))
        _getMallShopList(this.param).then((data) => {
          const { success, result } = data
          //console.log(JSON.stringify(result))
          if ( success ) {
            this.mallShopDataList = result.rows
            this.totalSize = result.total
          }
        })
      },

      // 新增店铺
      addShop(){
       this.e.$emit('forward', 'shopForm')
      },

      deleteShop(mallShopId){
        this.$confirm('确认删除?', '', {type: 'warning'})
        .then(() => {
          _deleteMallShop(mallShopId).then((data) => {
            const { success, result }= data
            // console.log(JSON.stringify(result))
            if(success){
              this.$message.success('删除成功')
              this.loadData()
            }
          })
        })
        .catch(() => {})
      },
      updateShop(mallShopId){
        location.href="#/mall/updateshop/"+mallShopId ;
      },
      handleMultipleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleSizeChange(val) {
        this.pageSize = val ;
        this.loadData();
      },
      handleCurrentChange(val) {
        this.page = val ;
        this.loadData();
      },
      showUserDetailInfo(userId){
        console.log("userId=>"+userId)
        this.dialogUserDetailVisible = true ;
        _getBaseUserById(userId).then((data) => {
          const { success,msg,result } = data
          if ( success ) {
            this.userDetailInfo = result ;
            if(this.userDetailInfo.sex == 0){
              this.sexName = '男'
            }else if(this.userDetailInfo.sex == 1){
              this.sexName = '女'
            }else{
              this.sexName = '保密'
            }
          }else{
            this.$message.warning(msg) ;
          }
        })
      }
    },

    created(){
      this.loadData();
    }
  }
</script>
