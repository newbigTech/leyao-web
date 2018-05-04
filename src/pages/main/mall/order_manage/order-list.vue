<template>
  <div class="">
    <div style="margin-left: 100px;">
      <el-button type="info" size="small" icon="view" @click.native="pintPreview = true">打印预览</el-button>
      <el-button type="info" size="small" icon="document"  @click.native.prevent="pintOrder">打印</el-button>
    </div>
    <el-dialog title="" v-model="pintPreview" size="large">
      <div class="header-top">
        <p class="order-p">订单编号：123432</p>
        <h3>食得鲜发货清单</h3>
        <p class="print-p"><el-button type="info" size="small" icon="document"  @click.native.prevent="pintOrder">打印</el-button></p>
      </div>
      <div>
        <span>收货人：</span>
        <span>电话：</span>
        <span>付款方式：已支付</span>
        <span>收货地址：</span>
        <span>订购日期：2014-5-12</span>
        <div>
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              prop="date"
              label="序号"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="货号"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="商品名称">
            </el-table-column>
            <el-table-column
              prop="address"
              label="商品规格">
            </el-table-column>
            <el-table-column
              prop="address"
              label="单价(元)">
            </el-table-column>
            <el-table-column
              prop="address"
              label="数量">
            </el-table-column>
            <el-table-column
              prop="address"
              label="金额(元)">
            </el-table-column>
          </el-table>
        </div>
      </div>
              <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click.native="pintPreview = false">确 定</el-button>
                <el-button @click.native="pintPreview = false">取 消</el-button>
              </span>
    </el-dialog>
    <div style="margin-top: 15px;">
      <el-form :model="printData" label-width="100px">
        <el-form-item style="width: 25%" label="订单日期从：">
          <el-col :span="11">
            <el-form-item>
              <el-date-picker type="date" placeholder="订单开始日期" v-model="printData.printStart" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2" style="text-align: center;">~</el-col>
          <el-col :span="11">
            <el-form-item>
              <el-date-picker type="date" placeholder="订单结束日期" v-model="printData.printEnd" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>
        <el-form-item style="width: 330px;" label="订单编号：">
          <el-input v-model="printData.orderNo" placeholder="订单编号" :maxlength="120"></el-input>
        </el-form-item>
        <el-form-item style="width: 330px;" label="订单模板：">
          <el-select v-model="printData.orderMode" placeholder="订单模板" clearable>
            <el-option label="所有" value="0"></el-option>
            <el-option label="模板1" value="1"></el-option>
            <el-option label="模板2" value="2"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<style lang="sass">

</style>
<script>
  import orderList from "./order-list"
  import _ from "lodash"
  import {findShopOrderList } from 'src/vuex/actions/mallShopOrderAction.js'
  import {dateFormat} from 'lib/utils/dateFormat.js'
  export default {
    components: {
      orderList
    },
    data(){
      return {
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }],
        pintPreview:false,
        printData:{
          printStart:'',
          printEnd:'',
          orderNo:'',
          orderMode:'',
        },

        searchParam:{
          pageNum:1,
          pageSize:100,
          createDtmStart:'',
          createDtmEnd:'',
          orderCodes:'6,99',
          goodsName:'',
          userMobile:'',
          payStatus:'',
          orderNo:''
        },

      }
    },
    computed: {

    },
    vuex:{
    },
    methods:{
      pintOrder(){
        window.print();
      },
      handleRemove(tab) {
        console.log(tab);
      },
      handleClick(tab, event) {
        //console.log(tab, event);
      },

    },
    mounted(){
    },
    created(){
    }
  }
</script>
