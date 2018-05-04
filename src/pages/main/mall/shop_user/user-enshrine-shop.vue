<template>
  <div>
    <!-- 面包屑 -->
    <div class="_breadcrumb">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item>商城</el-breadcrumb-item>
          <el-breadcrumb-item>店铺关注</el-breadcrumb-item>
        </el-breadcrumb>
    </div>
    <!-- 商品分类列表 组件 -->
    <div class="_container">

        <div class="_setting-options">
            <div class="_setting-options-left">
                <el-form :inline="true" :model="mallUserEnshrine">
                    <el-form-item style="width: 23%;">
                      <el-input v-model="mallUserEnshrine.userAlias" placeholder="收藏者"></el-input>
                    </el-form-item>
                    <!-- <el-form-item style="width: 19%;">
                        <el-select v-model="deal" placeholder="收藏后是否产生交易">
                          <el-option label="是" value="0"></el-option>
                          <el-option label="否" value="1"></el-option>
                        </el-select>
                    </el-form-item> -->
                    <el-form-item style="width: 220px;">
                       <el-date-picker
                          v-model="mallUserEnshrine.rangeTime"
                          type="daterange"
                          placeholder="选择收藏日期范围"
                          style="width: 220px"
                          :picker-options="rangeTimeOptions">
                       </el-date-picker>
                    </el-form-item>
                    </el-form-item>
                      <el-button :plain="true" type="primary" @click.native="searchTableList">查 询</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
        <div class="_table-container">
            <div class="_no-data bg-blue-light" v-show="!mallUserEnshrineData.length && 0">
                <span>暂无数据</span>
            </div>
            <div class="_table-list">
                <el-table :data="mallUserEnshrineData" style="width: 100%" border>
                    <el-table-column align="center" type="index" width="70"></el-table-column>
                    <el-table-column align="center" property="userMobile" label="收藏者手机号" width="250"></el-table-column>
                    <el-table-column align="center" property="userAlias" label="收藏者昵称" width="250"></el-table-column>
                    <el-table-column align="center" property="shopName" label="店铺名称" ></el-table-column>
                    <el-table-column align="center" property="createdDtm" label="收藏时间" :formatter="dateFormat">
                    </el-table-column>
                    <!-- <el-table-column inline-template label="收藏者是否产生交易">
                      <div>{{row.statusCode == 0 ? '有效' : '无效'}}</div>
                    </el-table-column> -->
                    <!-- <el-table-column inline-template label="收藏者状态">
                      <div>{{row.statusCode == 0 ? '有效' : '无效'}}</div>
                    </el-table-column> -->
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
  </div>
</template>

<script>

  import {dateFormat as _dateFormat } from "lib/utils/dateFormat"
  import {
    _getConcernShopPage
  } from 'src/vuex/actions/mallShopUserAction'

  export default {
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
        page: 1,
        pageSize: 10,
        total: 0,
        deal:'',
        mallUserEnshrine: {
          createDtmStart:'',
          createDtmEnd:'',
          rangeTime:'',
        },
        mallUserEnshrineData: [],
        dateFormat: function(row, col) {
          return row.createdDtm
        }
      }
    },
    created(){
      this.searchTableList()
    },
    methods: {
      searchTableList() {
        let tempDtmStart = '' ;
        let tempDtmEnd = '' ;

        if(this.mallUserEnshrine.rangeTime[0] && this.mallUserEnshrine.rangeTime[1]){
           tempDtmStart = _dateFormat(new Date(this.mallUserEnshrine.rangeTime[0]),"yyyy-MM-dd") ;
           tempDtmEnd = _dateFormat(new Date(this.mallUserEnshrine.rangeTime[1]),"yyyy-MM-dd") ;
        }
        let params = {
          userAlias: this.mallUserEnshrine.userAlias,
          userMobile: this.mallUserEnshrine.userMobile,
          createDtmStart:tempDtmStart,
          createDtmEnd:tempDtmEnd,
          pageNo: this.page,
          pageSize: this.pageSize
        }
        //console.log(JSON.stringify(params))
        _getConcernShopPage(params)
        .then(data => {
          const { success, result, msg } = data
          if (success) {
            this.mallUserEnshrineData = result.rows
            this.total = result.total
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
