<template>
    <div class="_container">
      <!-- 查询条件 -->
      <div class="_setting-bar">
        <div class="_query-form">
          <div class="_query-form-item">
            <el-form :inline="true" :model="promotionModel" class="demo-form-inline">
              <el-form-item style="width: 210px;">
                <el-input v-model="promotionModel.fullName" placeholder="业务员"></el-input>
              </el-form-item>
              <el-form-item>
                 <el-date-picker
                    v-model="rangeTime"
                    type="daterange"
                    placeholder="选择日期范围"
                    style="width: 220px" 
                    :picker-options="rangeTimeOptions">
                 </el-date-picker>
              </el-form-item> 
              <el-form-item style="margin-left: 50px;">
                <el-button @click="onSubmit">查询</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>

      <!-- 列表数据 -->
      <div class="_table-container"> 
        <div class="_table-list"> 
            <el-table :data="promotionData" style="width: 100%" border @selection-change="handleSelectionChange">
                <el-table-column align="center" type="selection" min-width="50"></el-table-column>
                <el-table-column align="center" type="index" width="70"></el-table-column>
                <el-table-column align="center" min-width="200" property="fullName" label="业务员"></el-table-column>
                <el-table-column align="center" min-width="120" inline-template label="用户数">
                  <div><a @click="onViewUser(row)">{{row.userCount}}</a></div>
                </el-table-column>
                <el-table-column align="center" min-width="120" property="totalCount" label="用户充值订单笔数"></el-table-column>
                <el-table-column align="center" min-width="120" property="totalPrice" label="用户充值总额(元)"></el-table-column>
                <el-table-column align="center" width="220" inline-template label="统计起止时间">
                    <div>{{getTimeRange(row.minDate)}}</div>
                </el-table-column>
                <el-table-column align="center" min-width="200" inline-template label="统计结束时间">
                  <div>{{getTimeRange(row.maxDate)}}</div>
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
  import { _getPromotionPage } from 'src/vuex/actions/promotionAction'
  //         _startBackpromotion,
  //         _stopBackpromotion,
  //         _deleteBackpromotion } from 'src/vuex/actions/promotionAction'
  import MD5 from 'crypto-js/md5'

  export default {
    name:'promotioner_list',
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

        promotionModel: {
          adName:'',
          linkName:'',
          statusCode:1
        },
        rangeTime:[],
        promotionData: [],

        promotionObj:{}, 
        multipleSelection:[],
      }
    },
    created(){
      console.log(JSON.stringify(this.paramObj))
      if(JSON.stringify(this.paramObj) != '{}'){
        //console.log(JSON.stringify(this.paramObj))
        this.promotionModel = this.paramObj.promotionModel ;
        this.page = this.promotionModel.pageNo ;
      }
      this.searchTableList() ;
    },
    methods: {
      searchTableList() {
        this.promotionModel.pageNo = this.page ;
        this.promotionModel.pageSize = this.pageSize ;

        let tempDtmStart = '' ;  
        let tempDtmEnd = '' ; 
        let rangeDate0 = new Date(this.rangeTime[0]) ;
        let rangeDate1 = new Date(this.rangeTime[1]) ;
        if(this.rangeTime[0] && this.rangeTime[1]){
           tempDtmStart = _dateFormat(rangeDate0,"yyyy-MM-dd") ;
           tempDtmEnd = _dateFormat(rangeDate1,"yyyy-MM-dd") ;
        } 
        this.promotionModel.beginDay = tempDtmStart;
        this.promotionModel.endDay = tempDtmEnd ;

        //console.log(JSON.stringify(this.promotionModel))
        _getPromotionPage(this.promotionModel).then(data => {
          const { success, result, msg } = data
          console.log(JSON.stringify(data))
          if (success) {
            this.promotionData = result.rows ;
            this.total = result.total
          }
        })
      },

      onViewUser(item) {
          let params = {
              promotionerId: item.promotionerId,
              urlPathName:'recharge/shop/promotion',
              r: _.toNumber(_.now())
          }
          //console.log(JSON.stringify(params))
          //params.passKey = MD5(JSON.stringify(params) + 'supplier_user').toString()
          this.$router.push({
              name: 'supplier_user',
              query: params
          })
      },

      
      onSubmit(){
        this.searchTableList() ;
      },

      getTimeRange(tempDate){
        return moment(tempDate).format("YYYY-MM-DD HH:mm:ss");
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
