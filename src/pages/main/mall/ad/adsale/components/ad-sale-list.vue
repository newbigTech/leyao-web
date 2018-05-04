<template>
    <div class="_container">
      <!-- 查询条件 -->
      <div class="_setting-bar">
        <div class="_query-form">
          <div class="_query-form-item">
            <el-form :inline="true" :model="adSaleModel" class="demo-form-inline">
              <el-form-item style="width: 210px;">
                <el-input v-model="adSaleModel.adName" placeholder="广告名称"></el-input>
              </el-form-item>
              <el-form-item>
                 <el-date-picker
                    v-model="adSaleModel.rangeTime"
                    type="daterange"
                    placeholder="选择日期范围"
                    style="width: 220px" 
                    :picker-options="rangeTimeOptions">
                 </el-date-picker>
              </el-form-item>              
              <el-form-item style="width: 85px; margin-left: 80px;">
                <el-button @click="onSubmit">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="_actions-btn">
          <el-button type="primary" @click.native.prevent="$emit('forward', 'adSaleAdd', {})">新增</el-button>
          <el-button type="warning" @click.native.prevent="startAd" v-show="adSaleModel.statusCode == 1">启用</el-button>
          <el-button type="warning" @click.native.prevent="stopAd" v-show="adSaleModel.statusCode == 0">停用</el-button>
          <el-button type="danger" @click.native.prevent="deleteAd" v-show="adSaleModel.statusCode == 1">删除</el-button>
        </div>
      </div>

      <el-tabs :active-name="activeName" style="width:100%" @tab-click="onTabClick">
            <el-tab-pane label="启用" name="tab1"></el-tab-pane>
            <el-tab-pane label="停用" name="tab2"></el-tab-pane>
      </el-tabs>
      <!-- 列表数据 -->
      <div class="_table-container"> 
        <div class="_table-list"> 
            <el-table :data="adSaleData" style="width: 100%" border @selection-change="handleSelectionChange">
                <el-table-column align="center" type="selection" min-width="50"></el-table-column>
                <el-table-column align="center" width="150" property="adId" label="营销广告ID"></el-table-column>
                <el-table-column align="center" min-width="200" property="adName" label="营销广告名称"></el-table-column>
                <el-table-column align="center" width="300" inline-template label="有效时间范围">
                    <div>{{getTimeRange(row)}}</div>
                </el-table-column>
                <el-table-column align="center" width="300" inline-template label="创建时间">
                    <div>{{getTimeStyle(row)}}</div>
                </el-table-column>                                
                <el-table-column align="center" width="150" inline-template label="状态">
                  <div>
                      <el-tag type="danger" v-if="row.statusCode == 0">启用</el-tag>
                      <el-tag type="danger" v-if="row.statusCode == 1">停用</el-tag>
                  </div>
                </el-table-column>
                <el-table-column align="center" width="300" inline-template label="操作">
                  <div>
                      <el-button type="success" size="mini" class="el-button--mini"
                        @click.native.prevent="adSaleDetail(row)">
                            详情
                      </el-button>                  
                      <el-button type="warning" size="mini" class="el-button--mini" v-show="row.statusCode == 1"
                        @click.native.prevent="adSaleEdit(row)">
                            编辑
                      </el-button>                  
                      <el-button type="warning" size="mini" class="el-button--mini" v-show="row.statusCode == 1"
                        @click.native.prevent="startSingleAd(row.adId)">
                            启用
                      </el-button>  
                      <el-button type="warning" size="mini" class="el-button--mini" v-show="row.statusCode == 0"
                        @click.native.prevent="stopSingleAd(row.adId)">
                            停用
                      </el-button>                                       
                      <el-button type="danger" size="mini" class="el-button--mini" v-show="row.statusCode == 1"
                        @click.native.prevent="deleteSingleRecord(row.adId)">
                            删除
                      </el-button>
                      <el-button type="danger" size="mini" class="el-button--mini"  v-show="row.statusCode == 0"
                        @click.native.prevent="pushAd(row)">推广
                      </el-button>
                  </div>
                </el-table-column>
            </el-table>
            <!-- 分页 -->
            <div class="_pagination">
                <el-pagination
                    :total="total"
                    :page-size="pageSize"
                    :page-sizes="[10, 20, 30, 40]"
                    :current-page="page"
                    layout="total, sizes, prev, pager, next"
                    @current-change="handleCurrentChange"
                    @size-change="handleSizeChange"
                >
                </el-pagination>
            </div>
        </div>
      </div>
      <!-- 二维码 -->
      <el-dialog title="营销广告二维码" v-model="dialogAdCode">
          <div>
              <div class="grid-content bg-purple" style="border: 1px solid #EFF2F7;padding-bottom: 20px;height:500px;" align="center">
                <div style="margin-bottom: 10px;" align="center">扫一扫,在手机上查看</div>
                <qriously :value="picCodeUrl.value" :size="400" class="qr"></qriously>
                <div align="center">
                  <a href="javascript:;" @click="downloadCode($event)">下载二维码</a>
                </div>
              </div>          
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click.native="dialogAdCode = false">关闭</el-button>
          </span>
      </el-dialog>
    </div>
</template>
<script>

  import moment from "moment"
  import { dateFormat as _dateFormat } from "lib/utils/dateFormat"
  import { _getAdSalePage,
          _startBackAdSale,
          _stopBackAdSale,
          _deleteBackAdSale } from 'src/vuex/actions/adSaleAction'
  import { _getMallCouponsCodeUrl } from 'src/vuex/actions/mallShopCouponsAction'
  import MD5 from 'crypto-js/md5'

  export default {
    name:'ad_sale_list',
    props: {
      paramObj: Object, default: () => {},
    },
    components: {

    },
    computed:{
      cloudShowUrl() {
        return this.$store.getters.cloudShowUrl
      },
      supplierID() {
        return this.$store.getters.supplierID
      },
      shopID() {
        return this.$store.getters.shopID
      }
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
        page: 1,
        pageSize: 20,
        total: 0,

        adSaleModel: {
          adName:'',
          statusCode:0,
          rangeTime:'',
        },
        //rangeTime:[],
        adSaleData: [],

        adSaleObj:{}, // 新增发票为空对象，


        activeName:'tab1',
        isEditStatusFlag : true ,
        showTimesListData:[],


        multipleSelection:[],

        dialogAdCode:false, //二维码
        picCodeUrl:{},
        adUrl:'',
      }
    },
    created(){
      //console.log(JSON.stringify(this.paramObj.adSaleModel))
      if(JSON.stringify(this.paramObj) != '{}'){
        this.page = this.paramObj.adSaleModel.pageNo ;
        this.adSaleModel = this.paramObj.adSaleModel ;
        this.activeName=this.paramObj.activeName ;
        if(this.activeName==='tab1'){
            this.adSaleModel.statusCode=0
        }else if(this.activeName==='tab2'){
            this.adSaleModel.statusCode=1
        }
      }
      //console.log(this.page)
      this.searchTableList() ;
      _getMallCouponsCodeUrl().then((data) => {
          const {success,result}=data;                
          if(success){     
            this.adUrl = result.couponsUrl ;
            //console.log(this.couponsUrl)
          }
      }) 
    },
    methods: {
      searchTableList() {
        this.adSaleModel.pageNo = this.page ;
        this.adSaleModel.pageSize = this.pageSize ;
        let tempDtmStart = '' ;  
        let tempDtmEnd = '' ;    
        if(this.adSaleModel.rangeTime[0] && this.adSaleModel.rangeTime[1]){
           tempDtmStart = _dateFormat(new Date(this.adSaleModel.rangeTime[0]),"yyyy-MM-dd") ;
           tempDtmEnd = _dateFormat(new Date(this.adSaleModel.rangeTime[1]),"yyyy-MM-dd") ;
        } 
        this.adSaleModel.adBeginDay = tempDtmStart;
        this.adSaleModel.adEndDay = tempDtmEnd ;
        //console.log(JSON.stringify(this.adSaleModel))
        _getAdSalePage(this.adSaleModel).then(data => {
          const { success, result, msg } = data
          if (success) {
            this.adSaleData = result.list ;
            this.total = result.total
          }
        })
      },

      adSaleDetail(row){
        this.adSaleModel.actionType = 'detail';
        this.adSaleModel.pageNo = this.page ; 
        let _paraObj ={
          row:row,
          adSaleModel:this.adSaleModel,
          activeName:this.activeName
        }
        this.$emit('forward', 'adSaleAdd', _paraObj) 
      },
      adSaleEdit(row){
        this.adSaleModel.actionType = 'eidt';
        this.adSaleModel.pageNo = this.page ;
        let _paraObj ={
          row:row,
          adSaleModel:this.adSaleModel,
          activeName:this.activeName
        }
        this.$emit('forward', 'adSaleAdd', _paraObj);   
      },
      popoverClickEvent(row){
        this.showTimesListData=[] ;
        let showTimes = row.showTimes ;
        showTimes.split(",").forEach(item => {this.showTimesListData.push({"timers":item})}) ;
      } ,
      // 停止 
      stopAd(){
        if(this.multipleSelection.length <= 0){
          this.$message({message: '请至少选择一条记录操作', type: 'warning'});
          return ;
        }
        let adIds = '' ;
        this.multipleSelection.forEach(function(item){
            adIds += item.adId+"," ; 
        }) ;
        if(adIds != '') adIds = adIds.substring(0,adIds.length - 1) ;
        _stopBackAdSale({"adIds":adIds}).then((data) => {
            const {success,result}=data;
            if(success){
                this.$message({message: '操作成功', type: 'success'});
                this.searchTableList();
            }else{
              this.$message({message: '操作失败', type: 'warning'});
              //console.log(JSON.stringify(result))
            }
        })

      },
      // 停止单条记录
      stopSingleAd(adIds){
        _stopBackAdSale({"adIds":adIds}).then((data) => {
            const {success,result}=data;
            if(success){
                this.$message({message: '操作成功', type: 'success'});
                this.searchTableList();
            }else{
              this.$message({message: '操作失败', type: 'warning'});
              //console.log(JSON.stringify(result))
            }
        })
      },      
      // 启用
      startAd(){
        if(this.multipleSelection.length <= 0){
          this.$message({message: '请至少选择一条记录操作', type: 'warning'});
          return ;
        }
        let adIds = '' ;
        this.multipleSelection.forEach(function(item){
            adIds += item.adId+"," ;
        }) ;
        if(adIds != '') adIds = adIds.substring(0,adIds.length - 1) ;
        _startBackAdSale({"adIds":adIds}).then((data) => {
            const {success,result}=data;
            if(success){
                this.$message({message: '操作成功', type: 'success'});
                this.searchTableList();
            }else{
              this.$message({message: '操作失败', type: 'warning'});
              //console.log(JSON.stringify(result))
            }
        })
      },
      // 启用单条记录
      startSingleAd(adIds){
        _startBackAdSale({"adIds":adIds}).then((data) => {
            const {success,result}=data;
            if(success){
                this.$message({message: '操作成功', type: 'success'});
                this.searchTableList();
            }else{
              this.$message({message: '操作失败', type: 'warning'});
              //console.log(JSON.stringify(result))
            }
        })
      },      
      // 删除
      deleteAd(){
        if(this.multipleSelection.length <= 0){
          this.$message({message: '请至少选择一条记录操作', type: 'warning'});
          return ;
        }
        let adIds = '' ;
        this.multipleSelection.forEach(function(item){
            adIds += item.adId+"," ;
        }) ;
        if(adIds != '') adIds = adIds.substring(0,adIds.length - 1) ;
        this.$confirm('确认删除吗?', '提示', {
          type: 'warning'
        }).then(() => {
          _deleteBackAdSale({"adIds":adIds}).then((data) => {
              const {success,result}=data;
              if(success){
                  this.$message({message: '操作成功', type: 'success'});
                  this.searchTableList();
              }else{
                this.$message({message: '操作失败', type: 'warning'});
                //console.log(JSON.stringify(result))
              }
          })
        }).catch(() => {});

      },
      deleteSingleRecord(adIds){
        this.$confirm('确认删除吗?', '提示', {
          type: 'warning'
        }).then(() => {
          _deleteBackAdSale({"adIds":adIds}).then((data) => {
              const {success,result}=data;
              if(success){
                  this.$message({message: '操作成功', type: 'success'});
                  this.searchTableList();
              }else{
                this.$message({message: '操作失败', type: 'warning'});
                //console.log(JSON.stringify(result))
              }
          })
        }).catch(() => {});        
      },
      onTabClick(tab, event) {
          this.activeName=tab.name
          if(tab.name==='tab1'){
              this.page = 1
              this.adSaleModel.statusCode=0
          }else if(tab.name==='tab2'){
              this.page= 1
              this.adSaleModel.statusCode=1
          }
          this.searchTableList() ;
      },      
      onSubmit(){
        this.searchTableList() ;
      },
      // 推广
      pushAd(row){
        this.dialogAdCode = true ;
        this.picCodeUrl.value = this.adUrl+"#/ms/"+row.adId+"?supplierId="+this.supplierID ;  
        console.log(this.picCodeUrl.value)  
      },
      downloadCode($event){
        let canvas = this.$el.querySelector(".qr").children[0]
        let down = $event.currentTarget
        down.download = "营销广告二维码.png"
        if (canvas.getContext) {
          var ctx = canvas.getContext("2d");
          var myImage = canvas.toDataURL("image/png").replace(/^data:image\/[^;]/, 'data:application/octet-stream');
          down.href = myImage
        }
      },
      getTimeRange(row){
        return moment(row.adBeginDay).format("YYYY-MM-DD")+" 至 "+moment(row.adEndDay).format("YYYY-MM-DD");
      },
      getTimeStyle(row){
        return moment(row.createdDtm).format("YYYY-MM-DD HH:mm:ss");
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
    }
  }
</script>
