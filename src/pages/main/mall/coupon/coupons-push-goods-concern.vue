<template>
  <!-- 商品分类列表 组件 -->
  <div class="">
    <!-- 查询条件 -->
    <div class="_setting-bar">
      <div class="_query-form" >
        <div class="_query-form-item">
          <el-form :inline="true" :model="mallUserEnshrine">
            <el-form-item>
              <el-input v-model="mallUserEnshrine.userAlias" placeholder="收藏者"></el-input>
            </el-form-item>
            <el-form-item style="width: 360px;">
              <el-row type="flex">
                <el-col :span="11">
                  <el-date-picker type="date" placeholder="最后访问起始日期" v-model="mallUserEnshrine.lastDtmStart" style="width: 100%;" ></el-date-picker>
                </el-col>
                <el-col class="line" :span="2" style="text-align: center"> ~ </el-col>
                <el-col :span="11">
                  <el-date-picker type="date" placeholder="最后访问结束日期" v-model="mallUserEnshrine.lastDtmEnd" style="width: 100%;"></el-date-picker>
                </el-col>
              </el-row>
            </el-form-item>                   
            <el-form-item>
              <el-button :plain="true" type="primary" @click.native="searchTableList">查 询</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="_actions-btn">
        <el-button type="success" @click.native.prevent="pushCouponsToUser">推送</el-button>
      </div>
    </div>
    <div class="_table-container">
      <div class="_table-list">
        <el-table :data="mallUserEnshrineData" border style="width: 100%"  @selection-change="handleSelectionChange">
          <el-table-column align="center" type="selection" width="50"></el-table-column>
          <el-table-column align="center" property="userAlias" label="收藏者昵称"></el-table-column>
          <el-table-column align="center" property="userMobile" label="收藏者手机号"></el-table-column>
          <el-table-column align="center" property="createdDtm" label="注册时间"></el-table-column>   
          <el-table-column align="center" property="lastDtm" label="最后访问时间"></el-table-column>           
          <el-table-column align="center" inline-template label="操作" width="100">
            <el-button type="primary" size="small" @click.native.prevent="clickGoodsItem(row)">明细</el-button>
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

    <!-- 明细 dialog -->
    <el-dialog title="明细" v-model="goodsIsShowFlag" class="_mallUserEnshrineData-dialog">
      <!-- 查询条件 -->
      <div class="_setting-bar">
        <div class="_query-form" >
          <div class="_query-form-item">
            <el-form :inline="true" :model="mallUserEnshrine">
              <el-form-item>
                <el-input v-model="mallUserEnshrine.userAlias" placeholder="商品名称"></el-input>
              </el-form-item>   
              <el-form-item>    
                <el-button :plain="true" type="primary" @click.native="loadGoodsList">查 询</el-button>              
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
      <div class="_table-container">
        <div class="_table-list">                            
          <el-table :data="mallUserGoodsData" border>
            <el-table-column align="center" inline-template label="商品分类" width="120"><div>{{row.classifyName}}</div></el-table-column>
            <el-table-column align="center" inline-template label="商品编码" width="100"><div>{{row.goodsSn}}</div></el-table-column>
            <el-table-column align="center" inline-template label="商品名称" width="250"><div>{{row.goodsName}}</div></el-table-column>
            <el-table-column align="center" inline-template label="商品类型" width="100">
              <div>{{row.goodsType == 0 ? '单品' : (row.goodsType == 1?'规格商品':'组合商品')}}</div></el-table-column> 
            </el-table-column>
            <el-table-column align="center" inline-template label="收藏时间"><div>{{row.createdDtm}}</div></el-table-column>                                
          </el-table>
          <!-- 分页 -->
          <div class="_pagination">
            <el-pagination
            :total="goodsTotal"
            :page-size="goodsPageSize"
            :page-sizes="[10, 20, 30, 40]"
            layout="total, sizes, prev, pager, next"
            @current-change="handleGoodsCurrentChange"
            @size-change="handleGoodsSizeChange"
            >
            </el-pagination>
          </div>
        </div>
      </div> 
    </el-dialog>
  </div>
</template>

<script>

  import {dateFormat as dateFormat_ } from "lib/utils/dateFormat"
  import { _getConcernGoodsForCouponsPage } from 'src/vuex/actions/mallShopUserAction'
  import { _getConcernGoodsPage } from 'src/vuex/actions/mallShopUserAction'
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
          lastDtmStart:'',
          lastDtmEnd:''
        },
        mallUserEnshrineData: [],
        dateFormat: function(row, col) {
          return row.createdDtm
        },
        multipleSelection: [],
        goodsIsShowFlag:false ,
        // 相关关注商品
        goodsPage: 1,
        goodsPageSize: 10,
        goodsTotal: 0,
        mallUserGoods: {},
        mallUserGoodsData: [],
        thisUserId:0, //当前页面用户Id
      }
    },
    methods: {
      searchTableList() {
        this.goodsIsShowFlag = false ;
        let tempDtmStart = '' ;     
        if(this.mallUserEnshrine.lastDtmStart){
           tempDtmStart = dateFormat_(new Date(this.mallUserEnshrine.lastDtmStart),"yyyy-MM-dd") ;
        }
        let tempDtmEnd = '' ;
        if(this.mallUserEnshrine.lastDtmEnd){
          tempDtmEnd = dateFormat_(new Date(this.mallUserEnshrine.lastDtmEnd),"yyyy-MM-dd") ;
        }
        let params = {
          userAlias: this.mallUserEnshrine.userAlias,
          userMobile: this.mallUserEnshrine.userMobile,
          usableFlag:1,
          couponsId:this.model.couponsId,
          lastDtmStart:tempDtmStart,
          lastDtmEnd:tempDtmEnd,
          pageNo: this.page,
          pageSize: this.pageSize
        }
        //console.log("goods:"+JSON.stringify(params))
        _getConcernGoodsForCouponsPage(params)
        .then(data => {
          const { success, result, msg } = data
          if (success) {
            this.mallUserEnshrineData = result.rows
            this.total = result.total
          }
        })
      },
      clickGoodsItem(row){
        this.thisUserId = row.userId ;
        this.loadGoodsList() ;
        this.goodsIsShowFlag = true ;
      }, 
      loadGoodsList() {
        let params = {
          goodsName:this.mallUserGoods.goodsName,
          userId: this.thisUserId,
          pageNo: this.goodsPage,
          pageSize: this.goodsPageSize
        }
        //console.log("goods:"+JSON.stringify(params))
        _getConcernGoodsPage(params)
        .then(data => {
          const { success, result, msg } = data
          if (success) {
            this.mallUserGoodsData = result.rows
            this.goodsTotal = result.total
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
      handleGoodsSizeChange(val) {
        this.goodsPageSize = val
        this.loadGoodsList() ;
      },
      handleGoodsCurrentChange(val) {
        this.goodsPage = val
        this.loadGoodsList() ;
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

<style>
  ._mallUserEnshrineData-dialog .el-dialog--small { width: 950px;  }
</style>
