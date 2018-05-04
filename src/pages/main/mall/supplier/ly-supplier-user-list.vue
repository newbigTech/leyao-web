<template>
    <!-- 商品分类列表 组件 -->
    <div class="">
        <!-- 面包屑 -->
        <div class="_breadcrumb">
            <el-breadcrumb separator=">">
              <el-breadcrumb-item :to="{ path: '/mall' }">商城</el-breadcrumb-item>
              <el-breadcrumb-item>运营商会员</el-breadcrumb-item>
              <!-- <el-breadcrumb-item v-if="currentComponent === 'classifyAdd'">新增商品分类管理</el-breadcrumb-item> -->
            </el-breadcrumb>
        </div>
        <div class="_container">
          <!-- 查询条件 -->
          <div class="_setting-bar">
            <div class="_query-form">
              <div class="_query-form-item">
                <el-form :inline="true">
                  <el-form-item>
                    <el-select v-model="supplierUserParam.typeFlag" placeholder="查询条件" clearable>
                        <!-- <el-option label="全部" value=""></el-option> -->
                        <el-option label="用户名" value="1"></el-option>
                        <el-option label="手机号" value="2"></el-option>
                        <el-option label="昵称" value="3"></el-option>
                        <!-- <el-option label="邮箱" value="4"></el-option> -->
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-input v-model="supplierUserParam.typeContent" placeholder="查询内容"></el-input>
                  </el-form-item>
                  <el-form-item style="width: 220px">
                     <el-date-picker
                        v-model="supplierUserParam.rangeTime"
                        type="daterange"
                        placeholder="注册时间"
                        style="width: 220px"
                        :picker-options="rangeTimeOptions">
                     </el-date-picker>
                  </el-form-item>
                  <el-form-item style="width: 220px;">
                     <el-date-picker
                        v-model="supplierUserParam.rangeLastTime"
                        type="daterange"
                        placeholder="最后访问时间"
                        style="width: 220px"
                        :picker-options="rangeLastTimeOptions">
                     </el-date-picker>   
                  </el-form-item>
                  <el-form-item style="width: auto;">
                    <el-button @click.native.prevent="searchTableList">查 询</el-button>
                    <el-button type="primary" v-show="urlPathName != ''" @click.native.prevent="onBack">返回</el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>
          </div>
          <div class="_table-container">
            <div class="_table-list">
              <el-table :data="supplierUserData" border style="width: 100%">
                  <el-table-column type="index" width="80"></el-table-column>
                  <el-table-column property="userMobile" label="会员手机号" width="200"></el-table-column>
                  <el-table-column property="userAlias" label="用户名" width="200"></el-table-column>
                  <el-table-column property="nickName" label="会员昵称" width="200"></el-table-column>
                  <el-table-column align="center" property="createdDtm" label="注册时间"> </el-table-column>
                  <el-table-column align="center" property="lastDtm" label="最后访问时间"> </el-table-column>
                  </el-table-column>
                  <el-table-column align="center" inline-template label="操作" width="150">
                    <div>
                      <el-button type="primary" size="mini" @click.native.prevent="handleUserAddress(row)">收货地址</el-button>
                    </div>
                  </el-table-column>
              </el-table>
              <!-- 分页 -->
              <div class="_pagination">
                  <el-pagination
                      :total="total"
                      :page-size="pageSize"
                      :page-sizes="[20, 30, 40, 100]"
                      layout="total, sizes, prev, pager, next"
                      @current-change="handleCurrentChange"
                      @size-change="handleSizeChange"
                  >
                  </el-pagination>
              </div>
            </div>
          </div>
        </div>
        <!--收货地址Dialog-->
        <user-address ref="userAddressCom" :userAdressObj="userAdressObj" @onSuccess="onSelectedSome">
        </user-address>  
    </div>
</template>

<script>

  import {dateFormat as _dateFormat } from "lib/utils/dateFormat"
  import userAddress  from "pages/main/mall/common/components/user_address"
  import { _getSupplierUserList } from 'src/vuex/api/supplierUserAPI'

  export default {
    name: 'supplier-user-list',
    components: {
      userAddress
    },
    data() {
      return {
         rangeTimeOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        }, 
        rangeLastTimeOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        page: 1,
        pageSize: 20,
        total: 0,
        supplierUserParam: {
          rangeTime:'',
          rangeLastTime:'',
          typeFlag:'1',
          typeContent:'',
        },
        userAdressObj:{},
        supplierUserData: [],

        // 促销人员
        promotionerId:'',
        urlPathName:'',

        dateFormat: function(row, col) {
          return row.createdDtm
        }
      }
    },
    created(){
      if (_.isObject(this.$route.query) && JSON.stringify(this.$route.query) != '{}') {
          //console.log(JSON.stringify(this.$route.query))

          this.promotionerId = this.$route.query['promotionerId'] ;
          this.urlPathName = this.$route.query['urlPathName'] ;
      } 
      //console.log(this.urlPathName)
      this.searchTableList()
    },
    methods: {
      searchTableList() {
        let tempLastDtmStart = '' ;
        let tempLastDtmEnd = '' ;

        if(this.supplierUserParam.rangeLastTime[0] && this.supplierUserParam.rangeLastTime[1]){
           tempLastDtmStart = _dateFormat(new Date(this.supplierUserParam.rangeLastTime[0]),"yyyy-MM-dd") ;
           tempLastDtmEnd = _dateFormat(new Date(this.supplierUserParam.rangeLastTime[1]),"yyyy-MM-dd") ;
        }

        let tempCreateDtmStart = '' ;
        let tempCreateDtmEnd = '' ;

        if(this.supplierUserParam.rangeTime[0] && this.supplierUserParam.rangeTime[1]){
           tempCreateDtmStart = _dateFormat(new Date(this.supplierUserParam.rangeTime[0]),"yyyy-MM-dd") ;
           tempCreateDtmEnd = _dateFormat(new Date(this.supplierUserParam.rangeTime[1]),"yyyy-MM-dd") ;
        }
        let params = {
          createDtmStart:tempCreateDtmStart,
          createDtmEnd:tempCreateDtmEnd,
          lastDtmStart:tempLastDtmStart,
          lastDtmEnd:tempLastDtmEnd,
          typeFlag:this.supplierUserParam.typeFlag,
          typeContent:this.supplierUserParam.typeContent,
          intVal1:this.promotionerId,
          pageNo: this.page,
          pageSize: this.pageSize
        }
        //console.log(JSON.stringify(params))
        _getSupplierUserList(params)
        .then(data => {
          const { success, result, msg } = data
          if (success) {
            //console.log(JSON.stringify(result))
            this.supplierUserData = result.rows
            this.total = result.total
          }
        })
      },

      onBack() {
            this.$router.push({
                name: this.urlPathName
            })
      },

      handleUserAddress(row){
        this.$refs.userAddressCom.userAddressDialog=true;
        this.userAdressObj = row ;
      },
      onSelectedSome(c){
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
