<template>
  <!-- 商品分类列表 组件 -->
  <div class="">
    <!-- 查询条件 -->
    <div class="_setting-bar">
      <div class="_query-form" style="width: 100%;">
        <el-form :inline="true" :model="mallUserEnshrine" style="width: 100%;"> 
          <el-form-item>
            <el-input v-model="mallUserEnshrine.userAlias" placeholder="收藏者"></el-input>
          </el-form-item> 
          <el-form-item>
            <el-input v-model="mallUserEnshrine.userMobile" placeholder="收藏电话"></el-input>
          </el-form-item>                                                        
          <!-- <el-form-item style="width: 22%;"> 
              <el-select v-model="deal" placeholder="收藏后是否产生交易">
                <el-option label="是" value="0"></el-option>
                <el-option label="否" value="1"></el-option>
              </el-select>
          </el-form-item> -->
          <el-form-item style="width: 360px;">
            <el-row type="flex">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="收藏开始日期" v-model="mallUserEnshrine.createDtmStart" style="width: 100%;" ></el-date-picker>
              </el-col>
              <el-col class="line" :span="2" style="text-align: center"> ~ </el-col>
              <el-col :span="11">
                <el-date-picker type="date" placeholder="收藏结束日期" v-model="mallUserEnshrine.createDtmEnd" style="width: 100%;"></el-date-picker>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item>
            <el-button :plain="true" type="primary" @click.native="searchTableList">查 询</el-button>
          </el-form-item>                                    
        </el-form>
      </div>
      <div class="_actions-btn">
        <el-button type="success" @click.native.prevent="pushCouponsToUser">推送</el-button>
      </div>
    </div>
    <!-- 列表数据 -->
    <div class="_table-container">
      <div class="_table-list">                          
        <el-table :data="mallUserEnshrineData" border style="width: 100%"  @selection-change="handleSelectionChange">
            <el-table-column align="center" type="selection" width="50"></el-table-column>
            <el-table-column align="center" property="userMobile" label="收藏者手机号"></el-table-column>
            <el-table-column align="center" property="userAlias" label="收藏者昵称"></el-table-column>
            <el-table-column align="center" property="createdDtm" label="收藏时间"></el-table-column>
            <el-table-column align="center" property="userLastDtm" label="最后访问时间"></el-table-column>
            <el-table-column align="center" inline-template label="收藏者是否产生交易">
              <div>{{row.statusCode == 0 ? '是' : '否'}}</div>
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

  import {dateFormat as dateFormat_ } from "lib/utils/dateFormat"
  import { _getConcernShopPage} from 'src/vuex/actions/mallShopUserAction'
  import { _pushCouponsToUser} from 'src/vuex/actions/mallShopCouponsAction'
  export default {
    props: {
      model: Object, default: () => {},
    },
    data() {
      return {
        page: 1,
        pageSize: 10,
        total: 0,
        mallUserEnshrine: {
          createDtmStart:'',
          createDtmEnd:''
        },
        deal:'',
        mallUserEnshrineData: [],
        dateFormat: function(row, col) {
          return row.createdDtm
        },
        multipleSelection: []
      }
    },
    methods: {
      searchTableList() {
        let tempDtmStart = '' ;      
        if(this.mallUserEnshrine.createDtmStart){
           tempDtmStart = dateFormat_(new Date(this.mallUserEnshrine.createDtmStart),"yyyy-MM-dd") ;
        }
        let tempDtmEnd = '' ;
        if(this.mallUserEnshrine.createDtmEnd){
          tempDtmEnd = dateFormat_(new Date(this.mallUserEnshrine.createDtmEnd),"yyyy-MM-dd") ;
        }
        let params = {
          userAlias: this.mallUserEnshrine.userAlias,
          userMobile: this.mallUserEnshrine.userMobile,
          usableFlag:1,
          couponsId:this.model.couponsId,
          createDtmStart:tempDtmStart,
          createDtmEnd:tempDtmEnd,
          pageNo: this.page,
          pageSize: this.pageSize
        }
        //console.log("shop:"+JSON.stringify(params))
        _getConcernShopPage(params)
        .then(data => {
          const { success, result, msg } = data
          if (success) {
            this.mallUserEnshrineData = result.rows
            this.total = result.total
          }
        })
      },  
      pushCouponsToUser(){
        if(this.multipleSelection.length <= 0){
          this.$message({message: '请至少选择一位用户进行推送', type: 'warning'}); 
          return ;
        }
        let availableCoupons = this.model.couponsNumber-this.model.getNumber
        if(this.multipleSelection.length > availableCoupons){
          this.$message({message: '最多可推送'+availableCoupons+'张优惠券', type: 'warning'}); 
          return ;
        }
        this.$confirm('确认将优惠券推送给店铺用户么?', '提示', {
          type: 'warning'
        }).then(() => {
            let userIdStr = '' ;
            this.multipleSelection.forEach(function(item){
                userIdStr += item.userId+"," ;
            }) ;
            if(userIdStr != '') userIdStr = userIdStr.substring(0,userIdStr.length - 1) ;
            _pushCouponsToUser({"couponsId":this.model.couponsId,"userIdStr":userIdStr}).then((data) => {
                const {success,result}=data;                
                if(success){     
                    this.$message({message: '操作成功', type: 'success'});              
                    this.searchTableList();
                }else{
                  this.$message({message: '操作失败', type: 'warning'}); 
                  console.log(JSON.stringify(result))
                }
            })       
        }).catch(() => {
          this.$message({type: 'info',message: '已取消推送'});          
        });
      },      
      handleSizeChange(val) {
        this.pageSize = val
        this.searchTableList()
      },
      handleCurrentChange(val) {
        this.page = val
        this.searchTableList()
      },
      // 选中
      handleSelectionChange(val) {
        this.multipleSelection = val;
      }
    },
    created(){
      this.searchTableList()
    },
  }
</script>
