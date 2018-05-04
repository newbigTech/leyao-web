<template>
    <div class="_container">
      <!-- 查询条件 -->
      <div class="_setting-bar">
        <div class="_query-form">
          <div class="_query-form-item">
            <el-form :inline="true" :model="popAdModel" class="demo-form-inline">
              <el-form-item style="width: 210px;">
                <el-input v-model="popAdModel.adName" placeholder="广告名称"></el-input>
              </el-form-item>
              <el-form-item style="width: 210px;">
                <el-input v-model="popAdModel.linkName" placeholder="链接名称"></el-input>
              </el-form-item>
              <el-form-item style="width: 85px">
                <el-button @click="onSubmit">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div class="_actions-btn">
          <el-button type="primary" @click.native.prevent="$emit('forward', 'popAdAdd', {})">新增</el-button>
          <el-button type="warning" @click.native.prevent="startAd" v-show="popAdModel.statusCode == 2">启用</el-button>
          <el-button type="warning" @click.native.prevent="stopAd" v-show="popAdModel.statusCode == 1">停用</el-button>
          <el-button type="danger" @click.native.prevent="deleteAd" v-show="popAdModel.statusCode == 2">删除</el-button>
        </div>
      </div>

      <el-tabs :active-name="activeName" style="width:100%" @tab-click="onTabClick">
            <el-tab-pane label="启用" name="tab1"></el-tab-pane>
            <el-tab-pane label="停用" name="tab2"></el-tab-pane>
            <!-- <el-tab-pane label="已删除" name="tab3"></el-tab-pane> -->
      </el-tabs>
      <!-- 列表数据 -->
      <div class="_table-container"> 
        <div class="_table-list"> 
            <el-table :data="popAdData" style="width: 100%" border @selection-change="handleSelectionChange">
                <el-table-column align="center" type="selection" min-width="50"></el-table-column>
                <el-table-column align="center" min-width="200" property="adName" label="广告名称"></el-table-column>
                <el-table-column align="center" min-width="120" property="linkType" label="链接名称"></el-table-column>
                <el-table-column align="center" width="220" inline-template label="有效时间范围">
                    <div>{{getTimeRange(row)}}</div>
                </el-table-column>
                <el-table-column align="center" min-width="200" inline-template label="弹出时间">
                  <div>{{row.showTimes}}</div>
                  <!-- <div>
                    <el-popover
                      ref="timeDetailPopover"
                      placement="bottom"
                      width="300"
                      trigger="click">
                      <el-table :data="showTimesListData">
                        <el-table-column align="center" property="timers"  label="时间段"> </el-table-column>
                      </el-table>
                    </el-popover>
                    <el-button size="small" v-popover:timeDetailPopover @click.native.prevent="popoverClickEvent(row)">查看</el-button>
                  </div>  -->                 
                </el-table-column>                
                <el-table-column align="center" width="100" inline-template label="弹出方式">
                  <div>
                      <span v-if="row.showType == 0">随机</span>
                      <span v-if="row.showType == 1">旋转进入</span>
                      <span v-if="row.showType == 2">从小变大</span>
                      <span v-if="row.showType == 3">从左往右</span>
                      <span v-if="row.showType == 4">从右往左</span>
                      <span v-if="row.showType == 5">从上往下</span>
                      <span v-if="row.showType == 6">从下往上</span>
                  </div>
                </el-table-column>
                <el-table-column align="center" width="100" inline-template label="状态">
                  <div>
                      <el-tag type="danger" v-if="row.statusCode == 0">初始化</el-tag>
                      <el-tag type="danger" v-if="row.statusCode == 1">启用</el-tag>
                      <el-tag type="danger" v-if="row.statusCode == 2">停用</el-tag>
                  </div>
                </el-table-column>
                <el-table-column align="center" width="200" inline-template label="操作">
                  <div>
                      <el-button type="success" size="mini" class="el-button--mini"
                        @click.native.prevent="popAdDetail(row)">
                            详情
                      </el-button>                  
                      <el-button type="warning" size="mini" class="el-button--mini" v-show="row.statusCode == 2"
                        @click.native.prevent="popAdEdit(row)">
                            编辑
                      </el-button>                  
                      <el-button type="warning" size="mini" class="el-button--mini" v-show="row.statusCode == 2"
                        @click.native.prevent="startSingleAd(row.adId)">
                            启用
                      </el-button>  
                      <el-button type="warning" size="mini" class="el-button--mini" v-show="row.statusCode == 1"
                        @click.native.prevent="stopSingleAd(row.adId)">
                            停用
                      </el-button>                                       
                      <el-button type="danger" size="mini" class="el-button--mini" v-show="row.statusCode == 2"
                        @click.native.prevent="deleteSingleRecord(row.adId)">
                            删除
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
    </div>
</template>
<script>

  import moment from "moment"
  import { dateFormat as _dateFormat } from "lib/utils/dateFormat"
  import { _getPopAdPage,
          _startBackPopAd,
          _stopBackPopAd,
          _deleteBackPopAd } from 'src/vuex/actions/popAdAction'
  import MD5 from 'crypto-js/md5'

  export default {
    name:'back_order_list',
    props: {
      paramObj: Object, default: () => {},
    },
    components: {

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
        beginDay: (row, col) => _dateFormat(new Date(row.beginDay), 'yyyy-MM-dd'),
        endDay: (row, col) => _dateFormat(new Date(row.endDay), 'yyyy-MM-dd'),
        page: 1,
        pageSize: 20,
        total: 0,

        popAdModel: {
          adName:'',
          linkName:'',
          statusCode:1
        },
        rangeTime:[],
        popAdData: [],

        popAdObj:{}, // 新增发票为空对象，


        activeName:'tab1',
        isEditStatusFlag : true ,
        showTimesListData:[],


        multipleSelection:[],
      }
    },
    created(){
      console.log(JSON.stringify(this.paramObj))
      if(JSON.stringify(this.paramObj) != '{}'){
        //console.log(JSON.stringify(this.paramObj))
        this.popAdModel = this.paramObj.popAdModel ;
        this.page = this.popAdModel.pageNo ;
        this.activeName=this.paramObj.activeName ;
        if(this.activeName==='tab1'){
            this.popAdModel.statusCode=1
        }else if(this.activeName==='tab2'){
            this.popAdModel.statusCode=2
        }
      }
      this.searchTableList() ;
    },
    methods: {
      searchTableList() {
        this.popAdModel.pageNo = this.page ;
        this.popAdModel.pageSize = this.pageSize ;

        console.log(JSON.stringify(this.popAdModel))
        _getPopAdPage(this.popAdModel).then(data => {
          const { success, result, msg } = data
          // console.log(JSON.stringify(data))
          if (success) {
            this.popAdData = result.list ;
            this.total = result.total
          }
        })
      },

      popAdDetail(row){
        this.popAdModel.actionType = 'detail';
        this.popAdModel.pageNo = this.page ; 
        let _paraObj ={
          row:row,
          popAdModel:this.popAdModel,
          activeName:this.activeName
        }
        this.$emit('forward', 'popAdAdd', _paraObj) 
      },
      popAdEdit(row){
        this.popAdModel.actionType = 'eidt';
        this.popAdModel.pageNo = this.page ;
        let _paraObj ={
          row:row,
          popAdModel:this.popAdModel,
          activeName:this.activeName
        }
        this.$emit('forward', 'popAdAdd', _paraObj);   
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
        _stopBackPopAd({"adIds":adIds}).then((data) => {
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
        _stopBackPopAd({"adIds":adIds}).then((data) => {
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
        _startBackPopAd({"adIds":adIds}).then((data) => {
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
        _startBackPopAd({"adIds":adIds}).then((data) => {
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
          _deleteBackPopAd({"adIds":adIds}).then((data) => {
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
          _deleteBackPopAd({"adIds":adIds}).then((data) => {
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
              this.popAdModel.statusCode=1
          }else if(tab.name==='tab2'){
              this.page= 1
              this.popAdModel.statusCode=2
          }
          this.searchTableList() ;
      },      
      onSubmit(){
        this.searchTableList() ;
      },

      getTimeRange(row){
        return moment(row.beginDay).format("YYYY-MM-DD")+" 至 "+moment(row.endDay).format("YYYY-MM-DD");
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
