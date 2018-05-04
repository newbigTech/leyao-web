<template>
    <div>
    <!-- 商品分类列表 组件 -->
        <card-panel class="_normal" style="margin-top: 20px;">
          <h3 slot="title">今日实时(更新时间：{{todayTime}})</h3>
        </card-panel> 
        <el-card class="box-card" style="margin-top: 20px;">
          <div class="text item">
            <el-row>
              <el-col :span="4">
                <div class="grid-content" >
                  <div style="font-size: 20px;margin-left: 50px;">{{recently7IncomeMoney}}元</div>
                  <div>7天收入（截止今日0点）
                    <el-popover
                      ref="7daypopover"
                      placement="right"
                      width="400"
                      trigger="click">
                      <el-table :data="recently7Income">
                        <el-table-column property="date" label="日期" :formatter="dateFormat"></el-table-column>
                        <el-table-column width="100" property="incomeAmount" label="收入(元)"></el-table-column>
                      </el-table>
                    </el-popover>
                    <el-button v-popover:7daypopover>收支明细</el-button>
                  </div>
                </div>
              </el-col>
              <el-col :span="4"><div class="grid-content">&nbsp;</div></el-col>
              <el-col :span="4"><div class="grid-content">
                <div class="grid-content" >
                  <div style="font-size: 20px;margin-left: 50px;">{{recentlyIncomeMoney}}元</div>
                  <div>今日收入（截止当前时间）
                    <el-popover
                      ref="7daypopover"
                      placement="right"
                      width="400"
                      trigger="click">
                      <el-table :data="recentlyIncome">
                        <el-table-column property="date" label="日期" :formatter="dateFormat"></el-table-column>
                        <el-table-column width="100" property="incomeAmount" label="收入(元)"></el-table-column>
                      </el-table>
                    </el-popover>
                    <el-button v-popover:7daypopover>收支明细</el-button>
                  </div>
                </div>                
              </div></el-col>
              <el-col :span="4"><div class="grid-content">&nbsp;</div></el-col>
              <el-col :span="7"><div class="grid-content">
                 <div class="grid-content" >
                  <div>可用余额:<span style="font-size: 20px;">{{fundAccount.availableBalance}}元</span> 
                  <!-- <el-button @click='applyWithdraw()'>申请提现</el-button> -->
                  </div>
                  <div>账户余额（不可用余额{{fundAccount.unavailableBalance}}元：待收{{fundAccount.unSettledBalance}}元 + 提现中{{fundAccount.frozenBalance}}元 ）</div>
                </div>               
              </div></el-col>
              <el-col :span="1"><div class="grid-content"></div></el-col>
            </el-row>
          </div>
        </el-card>        
        <card-panel class="_normal" style="margin-top: 20px;">
          <h3 slot="title">
            <el-popover
              ref="incomeDetailPopver"
              placement="right"
              width="400"
              trigger="click">
              <el-table :data="incomeStatis">
                <el-table-column property="title" label="日期"></el-table-column>
                <el-table-column width="100" property="amount" label="收入(元)"></el-table-column>
              </el-table>
            </el-popover>
            收支概况  <a href="javascript:;" v-popover:incomeDetailPopver>详细>></a>
          </h3>
          <div slot="panel-btns">
            <el-popover ref="hourPopver" placement="left" width="400" trigger="click">
                <el-date-picker
                v-model="statisStartTime"
                type="date"
                placeholder="选择日期"
                @change="hourStatic">
              </el-date-picker>
            </el-popover>
            <a href="javascript:;" v-popover:hourPopver>小时</a>

            <el-popover ref="datePopver" placement="left" width="400" trigger="click">
                <el-date-picker
                v-model="statisDateRange"
                type="daterange"
                placeholder="选择日期"
                @change="dateStatic">
              </el-date-picker>
            </el-popover>
            <a href="javascript:;" v-popover:datePopver>日</a> 

            <el-popover ref="weekPopver" placement="left" width="400" trigger="click">
              <el-date-picker
                v-model="statisWeek"
                type="week"
                format="yyyy 第 WW 周"
                placeholder="选择周"
                @change="weekStatic">
              </el-date-pick>
            </el-popover>
            <a href="javascript:;" v-popover:weekPopver>周</a> 


            <el-popover ref="monthPopver" placement="left" width="400" trigger="click">
              <el-date-picker
                v-model="statisMonth"
                type="month"
                placeholder="选择月"
                @change="monthStatic">
              </el-date-pick>
            </el-popover>
            <a href="javascript:;" v-popover:monthPopver>月</a>
          </div>
        </card-panel> 
        <div style="margin-top: 10px;">
          <canvas id="myChart" width="400" height="110"></canvas>
        </div>

        <!-- 设置文件分类 -->
        <el-dialog title="申请提现" v-model="dialogApplyWithdraw" size="tiny">
            <div>
                <el-form :model="withdrawForm" :rules="rules" ref="withdrawForm" label-width="100px" class="demo-ruleForm">
                  <el-form-item label="提现金额" prop="amount">
                    <el-input v-model="withdrawForm.amount" :maxlength="6" type="number" style="width: 50%"></el-input>
                  </el-form-item>
                </el-form> 
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button type="primary" @click="handleSubmit">提交</el-button>
              <el-button @click.native="dialogApplyWithdraw = false">关闭</el-button>
            </span>
        </el-dialog>                     
    </div>
</template>

<script>

  import tabItems from "components/tab-items"
  import { dateFormat as _dateFormat } from "lib/utils/dateFormat"
  import { dateSeven as _dateSeven } from "lib/utils/dateFormat"
  import { _getIncomeForShop,
           _getShopUserAccount,
           _applyShopWithdrawForPartner } from 'src/vuex/actions/payAction'
  import { _getShopIncomeStatis } from 'src/vuex/api/payAPI'
  import RegExp from 'lib/utils/regexp'
  import _ from "lodash"
  import moment from "moment"
  
  export default {
    computed: {

    }, 
    components: {
      tabItems
    },
    data() {  
      return {
        dateFormat: (row, col) => _dateFormat(new Date(row.date), 'yyyy-MM-dd'),
        withdrawForm:{
          amount:'',
        },
        todayTime:_dateFormat(new Date(),"yyyy-MM-dd HH:mm:ss"),
        dialogApplyWithdraw:false ,
        // 最近1天的数据
        recentlyIncome:[],
        recentlyIncomeMoney:0,
        // 最近7天的收支
        recently7Income:[],
        recently7IncomeMoney:0,
        // 我的收入
        fundAccount:{},

        chartObj: '', // 图表对象
        incomeStatis: [], // 图表数据详情
        statisStartTime: '', // 统计开始时间
        statisEndTime: '', // 统计结束时间
        statisDateRange: [], // 日期范围
        statisWeek: '', // 统计周
        statisMonth: '', // 统计月

        rules: {               
          amount: [
            { type: 'number',required: true, message: '请输入提现金额', trigger: 'blur' },
            { pattern: RegExp.amount,trigger: 'blur',message: '格式错误， 格式：0.00'}]
        },
      }
    },
    methods: {
      loadAccountData(){
        _getShopUserAccount().then(data => {
          const { success, result, msg } = data
          if (success) {
            this.fundAccount = result
            //console.log(JSON.stringify(this.fundAccount))
          }
        })
      },
      loadtodayAccountData(){
        _getIncomeForShop({'day':1}).then(data => {
          const { success, result, msg } = data
          if (success) {
            this.recentlyIncome = result.recentIncomeDTOList ; 
            this.recentlyIncomeMoney = result.recentIncome ;
          }
        })
      },
      load7DayAccountData(){
        _getIncomeForShop({'day':7}).then(data => {
          const { success, result, msg } = data
          if (success) {
            this.recently7Income = result.recentIncomeDTOList ;
            this.recently7IncomeMoney = result.recentIncome;
          }
        })
      },
      applyWithdraw(){
        this.withdrawForm.amount = ''
        this.dialogApplyWithdraw = true ;
      },
      handleSubmit(){                 
        this.$refs.withdrawForm.validate((valid) => {
          if (valid) { 
            this.dialogApplyWithdraw = false ;
            let params = {
              amount:this.withdrawForm.amount
            }
             _applyShopWithdrawForPartner(params).then(data => {
              const { success, result, msg } = data
              if (success) {
                this.$message({type: 'success', message: '提交成功!' });
              }
            })               
          }else{
            console.log('校验失败!!');
            return false;
          }
        })
      },
      lineChart(labels, data){
        let ctx = document.getElementById("myChart").getContext("2d");
        this.chartObj = new Chart(ctx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [
              {
                label: "收入",
                fill: true,
                /*lineTension: 0.1,*/
               /* backgroundColor: "rgba(75,192,192,0.4)",*/
                borderColor: "rgba(75,192,192,1)",
                borderCapStyle: 'butt',
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: 'miter',
                pointBorderColor: "rgba(75,192,192,1)",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 5,
                pointHitRadius: 10,
                data: data,
                spanGaps: false,
              }
            ]
          },
          options: {
            scales: {
              yAxes: [{
                ticks: {
                  beginAtZero:true
                }
              }]
            }
          }
        });
      },

            // 统计 - 小时
      hourStatic(val) {
        var startTime = val;
        var endTime = moment(val).add(1, 'days').format('YYYY-MM-DD');
        _getShopIncomeStatis({'type': 0, 'startTime': startTime, 'endTime': endTime}).then(data => {
          const { success, result, msg } = data
          if (success) {
            this.incomeStatis = result;
            var labels = [], amounts = [];

            for(let hour=0; hour < 24; hour++) {
                labels.push(hour);
                amounts.push(0);
            }
            result.forEach((item) => {
                amounts[item.hour] = item.amount;
            });

            this.chartObj.data.labels = labels;
            this.chartObj.data.datasets[0].data = amounts;
            this.chartObj.update();
          }
        })
      },
      // 统计 - 日期范围
      dateStatic(val) {
        var startTime = this.statisDateRange[0];
        var endTime = this.statisDateRange[1];

        var startTimeMonment = moment(startTime);
        var endTimeMonment = moment(endTime);
        if(startTimeMonment.add(30, 'days').isBefore(endTimeMonment)) {
            this.$message({type: 'error', message: '跨度不能超过30天' });
            return;
        }

        _getShopIncomeStatis({'type': 1, 'startTime': moment(startTime).format('YYYY-MM-DD'), 'endTime': endTimeMonment.add(1, 'days').format('YYYY-MM-DD')}).then(data => {
          const { success, result, msg } = data
          if (success) {
            this.incomeStatis = result;
            var labels = [], amounts = [];

            var stepDate = moment(startTime);
            while(stepDate.isBefore(endTime) || stepDate.isSame(endTime)) {
                labels.push(stepDate.format('YYYY-MM-DD'));
                amounts.push(0);
                stepDate.add(1, 'days');
            }

            result.forEach((item) => {
                var index = _.findIndex(labels, function(o) { return o == item.title; });
                amounts[index] = item.amount;
            });

            this.chartObj.data.labels = labels;
            this.chartObj.data.datasets[0].data = amounts;
            this.chartObj.update();
          }
        })
      },
      // 统计 - 周
      weekStatic(val) {
        var weekText = val;
        if(!weekText) weekText = this.statisWeek;
        if(!weekTextval) return;

        var year = parseInt(weekText.substring(0, 4));
        var week = parseInt(weekText.substring(6));
        var firstDate = moment().year(year).week(week).startOf('week');
        var startTime = firstDate.format('YYYY-MM-DD');
        var endTime = firstDate.add(6, 'days').format('YYYY-MM-DD');
        _getShopIncomeStatis({'type': 2, 'startTime': startTime, 'endTime': endTime}).then(data => {
          const { success, result, msg } = data
          if (success) {
            this.incomeStatis = result;
            var labels = [], amounts = [];

            var stepDate = moment(startTime);
            while(stepDate.isBefore(endTime) || stepDate.isSame(endTime)) {
                labels.push(stepDate.format('YYYY-MM-DD'));
                amounts.push(0);
                stepDate.add(1, 'days');
            }

            result.forEach((item) => {
                var index = _.findIndex(labels, function(o) { return o == item.title; });
                amounts[index] = item.amount;
            });

            this.chartObj.data.labels = labels;
            this.chartObj.data.datasets[0].data = amounts;
            this.chartObj.update();
          }
        })
      },
      // 统计 - 月
      monthStatic(val) {
        var startTime = val;
        var endTime = moment(val).add(1, 'months').format('YYYY-MM-DD');
        _getShopIncomeStatis({'type': 1, 'startTime': startTime, 'endTime': endTime}).then(data => {
          const { success, result, msg } = data
          if (success) {
            this.incomeStatis = result;
            var labels = [], amounts = [];

            var stepDate = moment(startTime);
            while(stepDate.isBefore(endTime)) {
                labels.push(stepDate.format('YYYY-MM-DD'));
                amounts.push(0);
                stepDate.add(1, 'days');
            }

            result.forEach((item) => {
                var index = _.findIndex(labels, function(o) { return o == item.title; });
                amounts[index] = item.amount;
            });

            this.chartObj.data.labels = labels;
            this.chartObj.data.datasets[0].data = amounts;
            this.chartObj.update();
          }
        })
      }

    },
    mounted(){
      
      _getIncomeForShop({'day':7}).then(data => {
        const { success, result, msg } = data
      
        if (success) {
          let sevenDay = result.recentIncomeDTOList;
          let dateD = [];
          _dateSeven(6).forEach((v) => {
            let datev = {date:v,incomeAmount:0}
            dateD.push(datev)
          })
          sevenDay.forEach((val) => {
            val.date = _dateFormat(val.date, 'yyyy-MM-dd');
            _.find(dateD, { 'date': val.date}).incomeAmount = val.incomeAmount;

            this.incomeStatis.push({
                'title': val.date,
                "amount": val.incomeAmount
            });
          })
          let dataIncome = []
          dateD.forEach((v) => {
            dataIncome.push(v.incomeAmount)
          })
          this.lineChart(_dateSeven(6), dataIncome);
        }
      })
      
    },    
    created(){
      this.loadAccountData() ;
      this.load7DayAccountData() ;
      this.loadtodayAccountData() ;
 
    },
  }
</script>
