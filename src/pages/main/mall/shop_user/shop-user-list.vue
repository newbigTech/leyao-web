<template>
    <!-- 商品分类列表 组件 -->
    <div class="_container">
      <!-- 查询条件 -->
      <div class="_setting-bar">
        <div class="_query-form">
          <div class="_query-form-item">
            <el-radio-group v-model="queryValue" @change="queryEvent">
                <el-radio-button label="普通查询"></el-radio-button>
                <el-radio-button label="高级查询"></el-radio-button>
            </el-radio-group>
            <el-form ref="userForm" :inline="true" :model="shopUser">
              <div v-show="queryFlag">
                  <el-form-item>
                    <el-select v-model="shopUser.typeFlag" placeholder="查询条件" clearable>
                        <el-option label="用户名" value="1"></el-option>
                        <el-option label="手机号" value="2"></el-option>
                        <el-option label="昵称" value="3"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-input v-model="shopUser.typeContent" placeholder="查询内容"></el-input>
                  </el-form-item>
                  <el-form-item style="width: 220px;">
                     <el-date-picker
                        v-model="shopUser.rangeTime"
                        type="daterange"
                        placeholder="注册时间"
                        style="width: 220px"
                        :picker-options="rangeTimeOptions">
                     </el-date-picker>
                  </el-form-item>
                  <el-form-item style="width: 220px;">
                     <el-date-picker
                        v-model="shopUser.rangeLastTime"
                        type="daterange"
                        placeholder="最后访问时间"
                        style="width: 220px"
                        :picker-options="rangeLastTimeOptions">
                     </el-date-picker>   
                  </el-form-item>
              </div>
            </el-form>
            <el-form ref="userHighForm" :inline="true" :model="highShopUser" :rules="rules">
              <div v-show="!queryFlag">
                  <el-form-item>
                    <el-select v-model="highShopUser.queryType" placeholder="查询条件" @change="changeQueryType" clearable>
                        <el-option label="订单笔数" value="1"></el-option>
                        <el-option label="充值笔数" value="2"></el-option>
                        <el-option label="网销卡订单数" value="3"></el-option>
                        <el-option label="订单商品" value="4"></el-option>
                        <el-option label="订单赠品" value="5"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="大于等于" style="width: 300px;" 
                      v-show="highShopUser.queryType < 4" prop="typeContent">
                     <el-input v-model="highShopUser.typeContent" 
                               placeholder="笔数" :maxlength="6" type="number"></el-input>
                  </el-form-item>
                  <el-form-item label="等于" style="width: 280px;" v-show="highShopUser.queryType==4">
                     <el-input v-model="goodsName" readonly icon="search" placeholder="选择商品" :on-icon-click="handleGoodsIconClick"></el-input>
                  </el-form-item>
                  <el-form-item label="等于" style="width: 280px;" v-show="highShopUser.queryType==5">
                     <el-input v-model="goodsName" readonly icon="search"  placeholder="选择赠品" :on-icon-click="handleGiftGoodsIconClick"></el-input>
                  </el-form-item>                                     
                  <el-form-item style="width: 220px;">
                     <el-date-picker
                        v-model="rangeOrderTime"
                        type="daterange"
                        placeholder="下单时间"
                        style="width: 220px"
                        :picker-options="rangeOrderTimeOptions">
                     </el-date-picker>   
                  </el-form-item>
              </div>              
            </el-form>
          </div>
          <div class="_query-form-btn" style="margin-left: 30px;margin-top: 39px;">
            <el-button @click.native.prevent="searchTableList">查 询</el-button>

            <el-button type="primary" @click="vm.dialogExportExcel = true">导出</el-button>
          </div>
        </div>
      </div>
      <!-- 列表数据 -->
      <div class="_table-container">
        <div class="_table-list">
            <el-table :data="shopUserData" style="width: 100%" border v-show="queryValue=='普通查询'">
                <el-table-column align="center" type="index" width="80"></el-table-column>
                <el-table-column align="center" property="userMobile" label="用户手机号" width="200"></el-table-column>
                <el-table-column align="center" property="userAlias" label="用户名" width="200"></el-table-column>
                <el-table-column align="center" property="nickName" label="会员昵称" width="250"></el-table-column>
                <el-table-column align="center" property="userCreatedDtm" label="注册时间"> </el-table-column>
                <el-table-column align="center" property="lastDtm" label="最后访问时间"> </el-table-column>
                <el-table-column align="center" inline-template label="操作" width="150">
                  <div>
                    <el-button type="primary" size="mini" @click.native.prevent="handleUserAddress(row)">收货地址
                    </el-button>
                  </div>
                </el-table-column>
            </el-table>
            <el-table :data="shopUserData" style="width: 100%" border v-show="queryValue=='高级查询'">
                <el-table-column align="center" type="index" width="80"></el-table-column>
                <el-table-column align="center" property="userMobile" label="用户手机号" width="200"></el-table-column>
                <el-table-column align="center" property="userAlias" label="用户名" width="200"></el-table-column>
                <el-table-column align="center" property="nickName" label="会员昵称" width="200"></el-table-column>
                <el-table-column align="center" property="userCreatedDtm" label="注册时间"> </el-table-column>
                <el-table-column align="center" property="lastDtm" label="最后访问时间"> </el-table-column>
                <el-table-column align="center" property="numCount" label="下单数量" 
                 v-show='numFlag'> </el-table-column>
                <el-table-column align="center" inline-template label="操作" width="150">
                  <div>
                    <el-button type="primary" size="mini" @click.native.prevent="handleUserAddress(row)">收货地址
                    </el-button>
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
         <!--收货地址Dialog-->
        <user-address ref="userAddressCom" :userAdressObj="userAdressObj" @onSuccess="onSelectedSome">
        </user-address>

        <!--商品Dialog-->
        <user-goods-list ref="goodsCom"  @onSuccess="onSelectedGoods">
        </user-goods-list>   

        <!--赠送商品Dialog-->
        <user-gift-goods-list ref="giftGoodsCom"  @onSuccess="onSelectedGiftGoods">
        </user-gift-goods-list>    

        <!-- 导出excel导航 -->
        <el-dialog title="导出excel" v-model="vm.dialogExportExcel" size="tiny">
            <export-excel @exportCurrentPage="exportCurrentPage" @exportAllPage="exportAllPage"
                @gotoSomePage="gotoSomePage" :vm="vm"></export-excel>
        </el-dialog>           
    </div>
</template>

<script>

  import exportExcel from "pages/main/mall/common/components/export_excel"
  import {dateFormat as _dateFormat } from "lib/utils/dateFormat"
  import userAddress  from "pages/main/mall/common/components/user_address"
  import userGoodsList  from "./user-goods-list"
  import userGiftGoodsList  from "./user-gift-goods-list"
  import { _getMallShopMembersPage,_getMallShopOrderUserPage } from 'src/vuex/actions/mallShopUserAction'
  import moment from "moment"

  export default {
    name: 'shop-user-list',

    components: {
      userAddress,userGoodsList,userGiftGoodsList,exportExcel
    },
    computed: {

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
        rangeOrderTimeOptions: {
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
        shopUser: {
          rangeTime:'',
          rangeLastTime:'',
          typeFlag:'1',
          typeContent:'',
          timeFlag:'1',
        },
        highShopUser:{
          queryType : "1",
          typeContent:0,
        },
        userAdressObj:{},
        shopUserData: [],

        queryValue:"普通查询",
        queryFlag:true,

        numFlag:false ,
        rangeOrderTime:[], // 下单时间
        goodsId:0,
        goodsName:'',

        giftGoodsId:0,
        giftGoodsName:'',

        vm:{
          dialogExportExcel:false , // 导出excel
        },
        rules: {
          typeContent: [
            { type: 'number',required: true, message: '请输入数量', trigger: 'blur' }],
        },
      }
    },
    created(){
      this.searchTableList()
    },
    methods: {
      searchTableList() {
        if(this.queryValue == '普通查询'){
          this.loadData() ;
        }else{
          this.loadHighData() ;
        }
      },
      loadData(){
        let tempLastDtmStart = '' ;
        let tempLastDtmEnd = '' ;

        if(this.shopUser.rangeLastTime[0] && this.shopUser.rangeLastTime[1]){
           tempLastDtmStart = _dateFormat(new Date(this.shopUser.rangeLastTime[0]),"yyyy-MM-dd") ;
           tempLastDtmEnd = _dateFormat(new Date(this.shopUser.rangeLastTime[1]),"yyyy-MM-dd") ;
        }

        let tempCreateDtmStart = '' ;
        let tempCreateDtmEnd = '' ;

        if(this.shopUser.rangeTime[0] && this.shopUser.rangeTime[1]){
           tempCreateDtmStart = _dateFormat(new Date(this.shopUser.rangeTime[0]),"yyyy-MM-dd") ;
           tempCreateDtmEnd = _dateFormat(new Date(this.shopUser.rangeTime[1]),"yyyy-MM-dd") ;
        }
        let params = {
          createDtmStart:tempCreateDtmStart,
          createDtmEnd:tempCreateDtmEnd,
          lastDtmStart:tempLastDtmStart,
          lastDtmEnd:tempLastDtmEnd,
          typeFlag:this.shopUser.typeFlag,
          typeContent:this.shopUser.typeContent,
          pageNo: this.page,
          pageSize: this.pageSize
        } 
        //console.log(JSON.stringify(params))
        _getMallShopMembersPage(params)
        .then(data => {
          const { success, result, msg } = data
          if (success) {
            //console.log(JSON.stringify(result))
            this.shopUserData = result.rows
            this.total = result.total
            this.vm.maxPage = this.total % this.pageSize == 0 ? this.total / this.pageSize : Math.ceil(this.total / this.pageSize) ;            
          }
        })        
      },
      // 高级查询
      loadHighData(){
        if(this.highShopUser.queryType == 4 ||
           this.highShopUser.queryType == 5){
           this.selectGoodsData() ;
        }else{
          this.$refs.userHighForm.validate((valid) => {
            if (valid) {
              this.selectGoodsData() ;
            }else{
              console.log('error')
            }
          }) 
        }        
      },
      selectGoodsData(){
          if(this.rangeOrderTime.length == 0){
            this.$message({message: '请选择下单时间', type: 'warning'});
            return ;
          }
          let tempOrderDtmStart = '' ;
          let tempOrderDtmEnd = '' ;

          if(this.rangeOrderTime[0] && this.rangeOrderTime[1]){
             tempOrderDtmStart = _dateFormat(new Date(this.rangeOrderTime[0]),"yyyy-MM-dd") ;
             tempOrderDtmEnd = _dateFormat(new Date(this.rangeOrderTime[1]),"yyyy-MM-dd") ;
          }

          let _params = {
            orderDtmStart:tempOrderDtmStart,
            orderDtmEnd:tempOrderDtmEnd,
            queryType:this.highShopUser.queryType,
            pageNo: this.page,
            pageSize: this.pageSize
          } 
          if(this.highShopUser.queryType == 4 || this.highShopUser.queryType == 5){
              _params.goodsId = this.goodsId ;
          }else{
              _params.num = this.highShopUser.typeContent ;
          }
          //console.log(JSON.stringify(_params))
          _getMallShopOrderUserPage(_params).then(data => {
            const { success, result, msg } = data
            if (success) {
               //console.log(JSON.stringify(result))
               this.shopUserData = result.rows
               this.total = result.total
               this.vm.maxPage = this.total % this.pageSize == 0 ? this.total / this.pageSize : Math.ceil(this.total / this.pageSize) ;
            }
          })          
        },
 
      // 改变查询条件
      queryEvent(){
        if(this.queryValue == "高级查询"){
          this.queryFlag = false; 
          this.numFlag = false ;

          this.rangeOrderTime = [] ;
          let end = new Date();
          let start = new Date();
          var startTime = moment(start).format('YYYY-MM-DD');
          var endTime = moment(end).subtract(3, 'months').format('YYYY-MM-DD');
          this.rangeOrderTime.push(endTime) ;
          this.rangeOrderTime.push(startTime) ;
        }else{
          this.queryFlag = true; 
          this.numFlag = true ;
        }
      },
      // 改变高级选项
      changeQueryType(){
        this.goodsName = '' ;
        //this.highShopUser.typeContent=0;
      },
      handleGoodsIconClick(){
        this.$refs.goodsCom.goodsDialog=true;

      },
      handleGiftGoodsIconClick(){
        this.$refs.giftGoodsCom.giftGoodsDialog=true;
      },
      onSelectedGoods(obj){
        this.goodsName = obj.goodsName ;
        this.goodsId= obj.goodsId ;
        console.log(this.goodsName+"--"+this.goodsId)
      },
      onSelectedGiftGoods(obj){
        this.goodsName = obj.goodsName ;
        this.goodsId= obj.goodsId ;
        console.log(this.goodsName+"--"+this.goodsId)
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


      exportInitParams(){
        let tempLastDtmStart = '' ;
        let tempLastDtmEnd = '' ;

        if(this.shopUser.rangeLastTime[0] && this.shopUser.rangeLastTime[1]){
           tempLastDtmStart = _dateFormat(new Date(this.shopUser.rangeLastTime[0]),"yyyy-MM-dd") ;
           tempLastDtmEnd = _dateFormat(new Date(this.shopUser.rangeLastTime[1]),"yyyy-MM-dd") ;
        }

        let tempCreateDtmStart = '' ;
        let tempCreateDtmEnd = '' ;

        if(this.shopUser.rangeTime[0] && this.shopUser.rangeTime[1]){
           tempCreateDtmStart = _dateFormat(new Date(this.shopUser.rangeTime[0]),"yyyy-MM-dd") ;
           tempCreateDtmEnd = _dateFormat(new Date(this.shopUser.rangeTime[1]),"yyyy-MM-dd") ;
        }
        let params = {
          createDtmStart:tempCreateDtmStart,
          createDtmEnd:tempCreateDtmEnd,
          lastDtmStart:tempLastDtmStart,
          lastDtmEnd:tempLastDtmEnd,
          typeFlag:this.shopUser.typeFlag,
          typeContent:this.shopUser.typeContent,
        } 
        return params ;
      },
      exportInitHighParams(){
          let tempOrderDtmStart = '' ;
          let tempOrderDtmEnd = '' ;

          if(this.rangeOrderTime[0] && this.rangeOrderTime[1]){
             tempOrderDtmStart = _dateFormat(new Date(this.rangeOrderTime[0]),"yyyy-MM-dd") ;
             tempOrderDtmEnd = _dateFormat(new Date(this.rangeOrderTime[1]),"yyyy-MM-dd") ;
          }

          let _params = {
            orderDtmStart:tempOrderDtmStart,
            orderDtmEnd:tempOrderDtmEnd,
            queryType:this.highShopUser.queryType,
          } 
          if(this.highShopUser.queryType == 4 || this.highShopUser.queryType == 5){
              _params.goodsId = this.goodsId ;
          }else{
              _params.num = this.highShopUser.typeContent ;
          }
          return _params ;
      },
      // 导出当前页
      exportCurrentPage(){
        console.log("exportCurrentPage")
        if(this.queryValue == '普通查询'){
          let tempParams = this.exportInitParams() ;
          tempParams.pageNo = this.page
          tempParams.pageSize = this.pageSize
          location.href='/shop/mallExportShopUserController/exportMallShopUserPage?'+$.param(tempParams) ;
        }else{
          let tempParams = this.exportInitHighParams() ;
          tempParams.pageNo = this.page
          tempParams.pageSize = this.pageSize
          location.href='/shop/mallExportShopUserController/exportShopOrderUserPage?'+$.param(tempParams) ;
        }
      },
      // 导出所有
      exportAllPage(){
        if(this.queryValue == '普通查询'){
          let tempParams = this.exportInitParams() ;
          tempParams.pageNo = 1;
          tempParams.pageSize = undefined ;
          location.href='/shop/mallExportShopUserController/exportMallShopUserPage?'+$.param(tempParams) ;
        }else{
          let tempParams = this.exportInitHighParams() ;
          tempParams.pageNo = 1;
          tempParams.pageSize = undefined ;
          location.href='/shop/mallExportShopUserController/exportShopOrderUserPage?'+$.param(tempParams) ;          
        }
      },
      // 导出指定页数
      gotoSomePage(somePage){
        if(this.queryValue == '普通查询'){
          let tempParams = this.exportInitParams() ;
          tempParams.pageNo = 1;
          tempParams.pageSize = somePage*this.pageSize ;
          location.href='/shop/mallExportShopUserController/exportMallShopUserPage?'+$.param(tempParams) ;
        }else{
          let tempParams = this.exportInitHighParams() ;
          tempParams.pageNo = 1;
          tempParams.pageSize = somePage*this.pageSize ;
          location.href='/shop/mallExportShopUserController/exportShopOrderUserPage?'+$.param(tempParams) ;          
        } 
      },
    }
  }
</script>
