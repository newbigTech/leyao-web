<template lang="html">
    <div>
    	  <div id="i_lodop_err"></div><!--添加给打印使用-->
        <!-- 查询条件 -->
        <div class="_setting-bar">
            <div class="_query-form">
                <div class="_query-form-item">
                    <el-form :inline="true" :model="mallOrder">
                        <el-form-item>
                            <el-select v-model.number="mallOrder.searchType" placeholder="订单类型">
                                <el-option label="订单号" :value="0"></el-option>
                                <!-- <el-option label="外部单号" :value="1"></el-option> -->
                                <el-option label="收货人姓名" :value="2"></el-option>
                                <el-option label="收货人手机号" :value="3"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="mallOrder.searchValue" :placeholder="mallOrder.searchType===0?'订单号':mallOrder.searchType===1?'外部单号':mallOrder.searchType===2?'收货人姓名':'收货人手机号'" clearable></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-select v-model.number="mallOrder.orderType" placeholder="订单类型" clearable>
                                <el-option label="普通订单" :value="0"></el-option>
                                <el-option label="虚拟订单" :value="1"></el-option>
                                <el-option label="赠送订单" :value="3"></el-option>
                                <el-option label="拼团订单" :value="5"></el-option>
                                <el-option label="网销卡赠送订单" :value="7"></el-option>
                                <el-option label="换货订单" :value="8"></el-option>
                                <el-option label="自提购订单" :value="9"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item style="width: 330px;">
                            <el-date-picker v-model="mallOrder.queryDateTime" type="datetimerange" :picker-options="pickerOptions2" placeholder="下订单截止时间范围" align="right" style="width:330px">
                            </el-date-picker>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="_query-form-btn">
                    <el-button @click.native.prevent="loadTableData">查 询</el-button>
                    <el-button @click.native.prevent="onBatchSendGoods" v-show="enableBtn.logisticsBtn&&activeName=='tab5'">批量发货</el-button>
                    <slot name="header"></slot>
                    <!-- <el-button @click.native.prevent="$router.push({name: 'supplierOrder'})">返回</el-button> -->
                </div>
            </div>
            <!-- <div class="_actions-btn">
                <el-button type="primary">新增</el-button>
            </div> -->
        </div>
        <!--1 待确认 2 已确认 3 未支付 4 已支付 5 已发货 6 已完成 99 已取消-->
        <el-tabs v-model="activeName" style="width:100%" @tab-click="onTabClick">
            <el-tab-pane label="全部" name="tab1"></el-tab-pane>
            <el-tab-pane label="待确认" name="tab2"></el-tab-pane>
            <!-- <el-tab-pane label="已确认" name="tab3"></el-tab-pane> -->
            <el-tab-pane label="待付款" name="tab4"></el-tab-pane>
            <el-tab-pane label="待发货" name="tab5"></el-tab-pane>
            <el-tab-pane label="已发货" name="tab6"></el-tab-pane>
            <el-tab-pane label="已完成" name="tab7"></el-tab-pane>
            <el-tab-pane label="已关闭" name="tab8"></el-tab-pane>
        </el-tabs>
        <div class="_container" style="padding: 0;">
            <table class="table table-bordered ui-table-order">
                <thead>
                    <tr class="header-tr">
                        <th style="min-width: 500px;">
                          <el-checkbox v-show="enableBtn.logisticsBtn&&activeName=='tab5'" v-model="checkedAll" style="float: left;left:5px;" @change="handleCheckAllChange">全选/反选</el-checkbox>
                            商品
                        </th>
                        <th>
                            单价(元)/数量
                        </th>
                        <th>
                            是否退订
                        </th>
                        <th>
                            买家
                        </th>
                        <th>
                            订单状态
                        </th>
                        <th>
                            实付金额(元)
                        </th>
                    </tr>
                </thead>
                <tbody v-if="tableData.length===0">
                    <tr>
                        <td colspan="6" style="text-align: center;">暂无相关数据</td>
                    </tr>
                </tbody>
                <tbody v-for="(item, index) in tableData" style="border:0 solid;">
                    <tr class="separation-row">
                        <td colspan="6"></td>
                    </tr>
                    <tr class="header-row">
                        <td colspan="5" class="text-left">
                            <div>
                              <!--  <input type="checkbox" v-model="item.chk">-->
                               <el-checkbox v-show="enableBtn.logisticsBtn&&activeName=='tab5'" v-model="item.chk" @change="handleCheckChange"></el-checkbox> &nbsp;&nbsp;&nbsp;
                                {{dateFormat(item)}}&nbsp;&nbsp;&nbsp;订单号: {{item.orderNo}}
                                &nbsp;&nbsp;&nbsp;
                                <label v-if="item.orderType===0">普通订单</label>
                                <label v-if="item.orderType===1">虚拟订单</label>
                                <label v-if="item.orderType===2">充值订单</label>
                                <label v-if="item.orderType===3">赠送订单</label>
                                <label v-if="item.orderType===4">团购订单</label>
                                <label v-if="item.orderType===5">拼团订单</label>
                                <label v-if="item.orderType===6">网销卡订单</label>
                                <label v-if="item.orderType===7">网销卡赠送订单</label>
                                <label v-if="item.orderType===8">换货订单</label>
                                <label v-if="item.orderType===9">自提购订单</label>
                            </div>
                            <div class="clearfix">
                            </div>
                        </td>
                        <td class="text-right">
                            <div>
                                <a v-if="item.orderCode==5" href="javascript:;" style="color:red;margin-right:10px;" @click="prn_Printer(item)">[打印订单]</a>
                                <a v-if="item.orderCode==5" href="javascript:;" style="color:green;margin-right:10px;" @click="prn_Preview(item)">[打印预览]</a>
                                <a v-if="enableBtn.logisticsBtn" href="javascript:;" style="color:green" @click="onNote(item)">[备注]</a>&nbsp;&nbsp;
                                <a href="javascript:;" style="color:blue" @click="setParams();onViewOrder(item)">订单详情>></a>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="goods-td" colspan="2">
                            <table class="table table-bordered" style="margin-bottom: 0px;border:0 solid;">
                                <tbody>
                                    <tr v-for="(g,i) in item.orderItem">
                                        <td style="border-left:0 solid;border-right:0 solid;border-bottom:0 solid; ">
                                            <div class="row">
                                                <div class="col-md-2">
                                                    <img :src="cloudShowUrl + g.goodsPic" width="80px" height="80px" class="img-rounded">
                                                </div>
                                                <div class="col-md-8">
                                                    <p style="color:blue">{{g.goodsName}}</p>
                                                </div>
                                                <div class="col-md-2" style="text-align: center">
                                                    <p>￥{{g.unitPrice}}</p>
                                                    <br>
                                                    <p>× {{g.number}}</p>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                        <td style="text-align: center">
                            <span v-if="item.isBack==0">否</span>
                            <span v-else style="color:#FF0000">是</span>
                        </td>
                        <td style="text-align: center">
                            <span style="color:blue">{{item.userAlias}}({{item.userMobile}})
                            </span>
                            <svg class="icon">
                                <use xlink:href="#icon-user"></use>
                            </svg>
                            <p style="padding-top: 10px;">{{item.adName}}</p>
                            <p>{{item.adPhone}}</p>
                        </td>
                        <td style="text-align: center">
                            <!--1 待确认 2 已确认 3 未支付 4 已支付 5 已发货 6 已完成 99 已取消-->
                            <p v-if="item.orderCode===1">待确认</p>
                            <p v-if="item.orderCode===2">已确认</p>
                            <p v-if="item.orderCode===3">待支付</p>
                            <p v-if="item.orderCode===4">已支付/待发货</p>
                            <p v-if="item.orderCode===5">已发货</p>
                            <p v-if="item.orderCode===6">已完成</p>
                            <p v-if="item.orderCode===7">已支付待确认</p>
                            <p v-if="item.orderCode===99">已关闭</p>
                            <p v-if="enableBtn.logisticsBtn&&item.orderCode===4" style="padding-top: 10px;">
                                <el-button @click.native.prevent="onSendGoods(item)" size="small">发货</el-button>
                            </p>
                            <p v-if="enableBtn.logisticsBtn&&item.orderCode===3&&item.orderType!=3&&item.orderType!=7" style="padding-top: 10px;">
                                <el-button @click.native.prevent="onChangeOrderPrice(item)" size="small">改价</el-button>
                            </p>
                            <p v-if="enableBtn.logisticsBtn&&item.orderCode===5&&item.expressStatus===2" style="padding-top: 10px;">
                                <el-button @click.native.prevent="onSetExpStatusDialog(item)" size="small">物流信息</el-button>
                            </p>
                        </td>
                        <td style="text-align: center">
                            总额:￥{{item.amountPrice}}
                            <hr>({{item.payType===0?'电商支付':'货到付款'}})
                        </td>
                    </tr>
                    <tr v-if="item.comments"><td colspan="6" style="color: red;"><strong>备注：</strong>{{item.comments}}</td></tr>
                </tbody>
            </table>
            <br>
            <!-- 分页 -->
            <div style="text-align: center">
                <el-pagination :total="total" :page-size="pageSize" layout="total, sizes, prev, pager, next" @current-change="handleCurrentChange" @size-change="handleSizeChange">
                </el-pagination>
            </div>
        </div>

        <!--发货窗口-->
        <el-dialog title="发货物流信息" v-model="dialogExpVisible" size="1000">
            <!-- <table class="table table-bordered ui-table-order">
                <tbody v-for="(item, index) in chkTableData">
                    <tr class="separation-row" style="display:none;">
                        <td colspan="6"></td>
                    </tr>
                    <tr class="header-row">
                        <td colspan="6" class="text-left">
                            <div>
                                订单号: {{item.orderNo}}
                            </div>
                            <div class="clearfix">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td colspan="6" class="text-left">
                            <el-form :inline="true" class="demo-form-inline">
                              <el-form-item label="物流公司">
                                <el-select v-model="item.expressObj" clearable placeholder="请选择">
                                    <el-option v-for="e in expressData"
                                      :label="e.keyCName"
                                      :value="e">
                                    </el-option>
                                </el-select>
                              </el-form-item>
                              <el-form-item label="物流单号">
                                <el-input v-model="item.expressNo" placeholder="物流单号"></el-input>
                              </el-form-item>
                            </el-form>
                        </td>
                    </tr>
                </tbody>
            </table> -->

            <table class="table table-bordered center">
                <thead>
                  <tr><th style="text-align: left;">订单号</th>
                  <th style="text-align: left; width: 380px; white-space: nowrap;">
                    物流公司 <el-select v-model="expressCompany" clearable placeholder="请选择" size="small">
                      <el-option v-for="e in expressData"
                        :label="e.keyCName"
                        :value="e">
                      </el-option>
                    </el-select>
                    (批量设置)
                  </th>
                  <th style="text-align: left;">运单号</th></tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in chkTableData">
                    <td>{{item.orderNo}}</td>
                    <td>
                      物流公司 <el-select v-model="item.expressObj" clearable placeholder="请选择">
                        <el-option v-for="e in expressData"
                          :label="e.keyCName"
                          :value="e">
                        </el-option>
                      </el-select>
                    </td>
                    <td>
                      <el-input v-model="item.expressNo" placeholder="请输入物流单号"></el-input>
                    </td>
                  </tr>
                </tbody>
            </table>


          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogExpVisible = false">取 消</el-button>
            <el-button type="primary" @click="saveExpress">确 定 发 货</el-button>
          </div>
        </el-dialog>

        <!--变更物流状态-->
        <el-dialog title="物流信息" v-model="dialogExpVisible2" size="700">
            <el-form :model="expObj" label-width="150px">
                <el-form-item label="订单号">
                    <!-- <span>{{expObj.orderNo}}</span> -->
                    <el-tag type="danger">{{expObj.orderNo}}</el-tag>
                </el-form-item>
                <el-form-item label="物流单号">
                    <!-- <span>{{expObj.expressNo}} ({{expObj.expressCompanyName || '无'}})</span> -->
                    <el-tag type="gray">{{expObj.expressNo}} ({{expObj.expressCompanyName || '无'}})</el-tag>
                </el-form-item>
                <el-form-item label="物流状态">
                      <el-radio-group v-model.number="expObj.expressStatus">
                            <el-radio :label="3">已签收</el-radio>
                            <el-radio :label="4">拒签</el-radio>
                       </el-radio-group>
                    </el-form-item>
                </el-form>


          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogExpVisible2 = false">取 消</el-button>
            <el-button type="primary" @click="saveExpStatus">确 定</el-button>
          </div>
        </el-dialog>
        <change-order-price ref="changeOrderPriceDailogRef" :orderId="orderId" @onSuccess="onChangeOrderPriceBack"></change-order-price>
    </div>
</template>

<script>
var LODOP; //声明为全局变量
import { mapGetters } from 'vuex'
import {
    sendGoods,
    batchSendGoods,
    getShopOrderPageList,
    setOrderComments,
    getExpressList
} from 'actions/mallShopOrderAction'
import {
    dateFormat as _dateFormat
} from "lib/utils/dateFormat"
import MD5 from 'crypto-js/md5'
import ChangeOrderPrice from './change_order_price'
export default {
    name: 'shop_order_list',
    components:{ChangeOrderPrice},
    props: {
        shopId: {
            type: Number,
            require: true
        },
        enableBtn: {
            type: Object,
            default() {
                return{
                    logisticsBtn: false
                }

            }
        },
        vm: {
            type: Object
        }
    },
    computed: {
        ...mapGetters(['userObj','queryParams','cloudShowUrl'])
    },
    data() {
        return {
            orderId:0,
            expObj:{
                orderId:undefined,
                orderNo:'',
                expressStatus:3,
                expressCompanyName:'',
                expressNo:''
            },
            dialogExpVisible2:false,
            dialogExpVisible:false,
            chkTableData:[],
            expressData:[],
            expressCompany: {},
            checkedAll:false,
            page: 1,
            pageSize: 20,
            total: 0,
            tableData: [],
            activeName: 'tab1',
            mallOrder: {
                shopId: undefined,
                queryDateTime: '',
                shopName: '',
                orderType: '',
                searchType: 0,
                searchValue: '',
                activeName: 'tab1'
            },
            dateFormat: function(row) {
                return _dateFormat(row.createdDtm, 'yyyy-MM-dd HH:mm:ss')
            },
            pickerOptions2: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                        const end = new Date()
                        const start = new Date()
                        start.setHours(0,0,0)
                        start.setDate(start.getDate()-7)
                        end.setHours(23,59,59)
                        //start.setTime(end.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end])
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                        const end = new Date()
                        const start = new Date()
                        start.setHours(0,0,0)
                        start.setMonth(start.getMonth()-1)
                        end.setHours(23,59,59)
                        //start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end])
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                        const end = new Date()
                        const start = new Date()
                        start.setHours(0,0,0)
                        start.setMonth(start.getMonth()-3)
                        end.setHours(23,59,59)
                        //start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end])
                    }
                }]
            },
        }
    },
    methods: {
        onChangeOrderPrice(item){
            this.orderId=item.orderId
            setTimeout(()=>{
                this.$refs.changeOrderPriceDailogRef.dialogVisible=true
                this.$refs.changeOrderPriceDailogRef.loadOrderData()
            },0)
        },
        onChangeOrderPriceBack(result){

        },
        setParams() {
            this.$store.commit('SET_QUERY_PARAMS', this.mallOrder)
        },
        saveExpStatus(){
             let submitData=[]
             submitData.push({
                    'orderId':this.expObj.orderId,
                    'expressCompanyNo':this.expObj.expressCompanyNo,
                    'expressCompanyName':this.expObj.expressCompanyName,
                    'expressNo':this.expObj.expressNo,
                    'expressStatus':this.expObj.expressStatus
                })
             batchSendGoods({
                        params: JSON.stringify(submitData)
                    }).then(data => {
                        const { success, msg, result } = data
                        if (success) {
                            this.dialogExpVisible2=false
                            this.$message.success('操作成功')
                            this.loadTableData()
                        } else {
                            this.$message.error(msg)
                            return false
                        }
            })
        },
        onSetExpStatusDialog(row){
            this.expObj.expressStatus=3
            Object.assign(this.expObj, _.pick(row,['orderId','orderNo','expressCompanyName','expressNo']))
            this.dialogExpVisible2 = true
        },
        loadExpressData(){
            getExpressList().then(data=>{
                this.expressData=data
            })
        },
        onNote(row){
          this.$prompt('请输入备注', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消'
            }).then(({ value }) => {
                let params={
                    orderId:row.orderId,
                    comments:value
                }
              setOrderComments(params).then(data=>{
                const { success, msg, result } = data
                        if (success) {
                            this.$set(row,'comments',value)
                            this.$message.success('操作成功')
                        } else {
                            this.$message.error(msg)
                            return false
                        }
              })
            }).catch(() => {

            });
        },
        handleCheckChange(event){
            if(!event.target.checked){
              this.checkedAll=false
            }
        },
        handleCheckAllChange(event){
            _.each(this.tableData,item=>{
                item.chk=this.checkedAll
            })
        },
        saveExpress(){
            let submitData=[]
            _.each(this.chkTableData,item=>{
                submitData.push({
                    'orderId':item.orderId,
                    'expressCompanyNo':item.expressObj.keyValue,
                    'expressCompanyName':item.expressObj.keyCName,
                    'expressNo':item.expressNo
                })
            })
            //console.log('submitData',submitData)
             batchSendGoods({
                        params: JSON.stringify(submitData)
                    }).then(data => {
                        const { success, msg, result } = data
                        if (success) {
                            this.dialogExpVisible=false
                            this.checkedAll=false
                            this.$message.success('操作成功')
                            this.loadTableData()
                        } else {
                            this.$message.error(msg)
                            return false
                        }
                    })
        },
        onBatchSendGoods(){
            this.chkTableData=[]
            let orderIds=[]
            _.each(this.tableData,item=>{
                if(item.chk){
                    let _o=_.clone(item)
                    _o.expressNo=''
                    _o.expressObj={}
                    this.chkTableData.push(_o)
                    orderIds.push(item.orderId)
                }
            })
            if(orderIds.length===0){
                this.$message.info('请选择您要发货的订单')
                return false
            }
            this.dialogExpVisible = true


            // this.$confirm('是否确认发货?', '提示', {
            //         type: 'warning'
            //     })
            //     .then(() => {
            //         batchSendGoods({
            //             orderIds: orderIds.join(',')
            //         }).then(data => {
            //             const { success, msg, result } = data
            //             if (success) {
            //                 this.checkedAll=false
            //                 this.$message.success('操作成功')
            //                 this.loadTableData()
            //             } else {
            //                 this.$message.error(msg)
            //                 return false
            //             }
            //         })
            //     }).catch(() => {})
        },
        onSendGoods(item) {
            this.chkTableData=[]
            let _o=_.clone(item)
             _o.expressNo=''
            _o.expressObj={}
            this.chkTableData.push(_o)
            this.dialogExpVisible = true
            // this.$confirm('是否确认发货?', '提示', {
            //         type: 'warning'
            //     })
            //     .then(() => {
            //         sendGoods({
            //             orderId: item.orderId
            //         }).then(data => {
            //             const {
            //                 success,
            //                 msg,
            //                 result
            //             } = data
            //             if (success) {
            //                 this.$message.success('操作成功')
            //                 this.loadTableData()
            //             } else {
            //                 this.$message.error(msg)
            //                 return false
            //             }
            //         })
            //     }).catch(() => {})
        },
        onTabClick(tab, event) {
            this.mallOrder.activeName = tab.name
            if (tab.name === 'tab1') {
                this.mallOrder.pageNo = 1
                this.mallOrder.orderCode = ''
            } else if (tab.name === 'tab2') {
                this.mallOrder.pageNo = 1
                this.mallOrder.orderCode = 1
            } else if (tab.name === 'tab3') {
                this.mallOrder.pageNo = 1
                this.mallOrder.orderCode = 2
            } else if (tab.name === 'tab4') {
                this.mallOrder.pageNo = 1
                this.mallOrder.orderCode = 3
            } else if (tab.name === 'tab5') {
                this.mallOrder.pageNo = 1
                this.mallOrder.orderCode = 4
            } else if (tab.name === 'tab6') {
                this.mallOrder.pageNo = 1
                this.mallOrder.orderCode = 5
            } else if (tab.name === 'tab7') {
                this.mallOrder.pageNo = 1
                this.mallOrder.orderCode = 6
            } else if (tab.name === 'tab8') {
                this.mallOrder.pageNo = 1
                this.mallOrder.orderCode = 99
            }
            this.loadTableData()
        },
        onViewOrder(item) {
            this.$emit('onOrderDetail', item)
        },
        loadTableData() {
            this.mallOrder.pageNo = this.page
            this.mallOrder.pageSize = this.pageSize
            if (!_.isNumber(this.mallOrder.shopId)) {
                this.$message.error('请求参数错误')
                return false
            }
            if (_.isArray(this.mallOrder.queryDateTime) && this.mallOrder.queryDateTime.length === 2) {
                if (!_.isNull(this.mallOrder.queryDateTime[0]) && !_.isNull(this.mallOrder.queryDateTime[1])) {
                    this.mallOrder.startDateTime = _dateFormat(this.mallOrder.queryDateTime[0], 'yyyy-MM-dd HH:mm:ss')
                    this.mallOrder.endDateTime = _dateFormat(this.mallOrder.queryDateTime[1], 'yyyy-MM-dd HH:mm:ss')
                } else {
                    this.mallOrder.startDateTime = ''
                    this.mallOrder.endDateTime = ''
                }
            } else {
                this.mallOrder.startDateTime = ''
                this.mallOrder.endDateTime = ''
            }
            this.mallOrder.orderNo = ''
            this.mallOrder.associatedOrid = ''
            this.mallOrder.adName = ''
            this.mallOrder.adPhone = ''
            if (this.mallOrder.searchType === 0) {
                //订单号OrderNo
                this.mallOrder.orderNo = this.mallOrder.searchValue
            } else if (this.mallOrder.searchType === 1) {
                //外部单号
                if (_.isNumber(this.mallOrder.searchValue)) {
                    this.mallOrder.associatedOrid = this.mallOrder.searchValue
                }
            } else if (this.mallOrder.searchType === 2) {
                //收货人姓名
                this.mallOrder.adName = this.mallOrder.searchValue
            } else if (this.mallOrder.searchType === 3) {
                //收货人手机号
                this.mallOrder.adPhone = this.mallOrder.searchValue
            }

            //console.log('this.mallOrder',JSON.parse(JSON.stringify(this.mallOrder)))
            //return false
            getShopOrderPageList(this.mallOrder).then(data => {
                this.tableData = data.rows || []
                _.forEach(this.tableData, item => {
                    this.$set(item,'chk',false)
                    //item.chk=false
                    if (item.orderItemJson) {
                        item.orderItem = JSON.parse(item.orderItemJson)
                    }
                })
                this.total = data.total
                    //console.log('this.tableData',this.tableData)
            })
        },
        handleSizeChange(val) {
            this.pageSize = val
            this.loadTableData()
        },
        handleCurrentChange(val) {
            this.page = val
            this.loadTableData()
        },
		    prn_Preview(order) {//预览打印
					this.CreatePrintPage(order);
					if(typeof LODOP != 'undefined'){
						LODOP.PREVIEW();
					}
				},
		    prn_Printer(order) {//打印
					this.CreatePrintPage(order);
					if(typeof LODOP != 'undefined'){
						if(LODOP.GET_PRINTER_COUNT()<=0){
							this.$message.error('没有任何打印机！')
							return ;
						}
						LODOP.PRINT();
						this.$message.success('已经向打印机发出打印命令！');
					}

				},
		    CreatePrintPage(order) {
		    	var iCurLine = 20;
					LODOP=getLodop();
					if(typeof LODOP == 'undefined'){
						this.$message.error('打印插件没有安装！')
						return ;
					}
					LODOP.PRINT_INIT("打印订单");
					//LODOP.PRINT_INITA(10,10,1080,1000,"打印订单");
					LODOP.SET_PRINT_PAGESIZE(0,1080,1000,"");//页大小

					//LODOP.ADD_PRINT_BARCODE(20,120,200,47,"128A",this.mallOrder.shopId);//打印二维码
					LODOP.SET_PRINT_STYLEA(0,"FontSize",16);
					LODOP.ADD_PRINT_TEXT(iCurLine,20,355,20,"单号："+order.orderNo);
					LODOP.SET_PRINT_STYLEA(1,"FontSize",13);
					LODOP.SET_PRINT_STYLEA(1,"Bold",1);
					LODOP.ADD_PRINT_TEXT(iCurLine+=20,20,120,20,"日期："+_dateFormat(new Date(), 'yyyy-MM-dd'));
					LODOP.ADD_PRINT_TEXT(iCurLine,220,220,20,"操作员："+this.userObj.userId);
					//打印=====
					LODOP.ADD_PRINT_TEXT(iCurLine+=20,20,'90%',20,"=========================================================");
					//**********订单商品start************
					if(order.orderItemJson && order.orderItemJson.length>0){
						var orderItemJson = $.parseJSON(order.orderItemJson);
						var di;
						var nc = 0;
						var pc = 0;
						for(var i=0,li=orderItemJson.length; i<li; i++){
							di = orderItemJson[i];
							nc += di.number;
							pc += di.amountPrice;
							//LODOP.SET_PRINT_STYLE("FontSize",13);
							LODOP.SET_PRINT_STYLE("Bold",1);
							LODOP.ADD_PRINT_TEXT(iCurLine+=25,20,'95%',20,di.goodsName);//商品名称
							LODOP.SET_PRINT_STYLE("Bold",0);
							LODOP.ADD_PRINT_TEXT(iCurLine+=25,20,355,20,"货号："+di.orderItemId);
							LODOP.ADD_PRINT_TEXT(iCurLine+=25,20,100,20,"数量："+di.number);
							LODOP.ADD_PRINT_TEXT(iCurLine,120,120,20,"单价："+di.unitPrice);
							LODOP.ADD_PRINT_TEXT(iCurLine,240,120,20,"小计："+di.amountPrice);
						}

						LODOP.ADD_PRINT_TEXT(iCurLine+=30,20,160,20,"合计："+nc);
						LODOP.ADD_PRINT_TEXT(iCurLine,240,120,20,"￥"+pc);
					}
					//LODOP.ADD_PRINT_TEXT(iCurLine+=20,20,'90%',20,"--------------------------------------------------------");
					LODOP.ADD_PRINT_TEXT(iCurLine+=30,20,160,20,"原价："+order.amountPrice);
					LODOP.ADD_PRINT_TEXT(iCurLine,170,120,20,"优惠金额："+order.totalCouponsPrice);
					LODOP.ADD_PRINT_TEXT(iCurLine+=25,20,160,20,"支付金额："+order.amountPrice);
					LODOP.ADD_PRINT_TEXT(iCurLine,170,160,20,"邮费："+order.postPrice);
					LODOP.ADD_PRINT_TEXT(iCurLine+=25,20,'90%',20,"下单时间："+_dateFormat(order.createdDtm, 'yyyy-MM-dd HH:mm:ss'));
					//**********订单商品end***********
					//打印=====
					LODOP.ADD_PRINT_TEXT(iCurLine+=25,20,'90%',20,"=========================================================");
					//***********配送信息start************************
					LODOP.SET_PRINT_STYLE("Bold",1);
					LODOP.ADD_PRINT_TEXT(iCurLine+=25,20,'95%',20,"配送信息");
					LODOP.SET_PRINT_STYLE("Bold",0);
					LODOP.ADD_PRINT_TEXT(iCurLine+=25,20,160,20,"客户名称："+order.adName);
					LODOP.ADD_PRINT_TEXT(iCurLine+=25,20,160,20,"联系电话："+order.adPhone);
					//LODOP.ADD_PRINT_TEXT(iCurLine+=20,20,'95%',20,"客户备注："+order.comments);
					LODOP.ADD_PRINT_TEXT(iCurLine+=25,20,'95%',20,"配送地址："+order.strAddress);
					//***********配送信息end************************
					LODOP.ADD_PRINT_TEXT(iCurLine+=25,20,'90%',20,"======================== "+_dateFormat(new Date(), 'HH:mm:ss')+" ========================");
					//自动分页
					LODOP.SET_PRINT_MODE("PRINT_DUPLEX",0);
					LODOP.SET_PRINT_MODE("PRINT_DEFAULTSOURCE",1);

				},

    },
    watch: {
      expressCompany (n, o) {
        for (let item of this.chkTableData) {
          item.expressObj = n
        }
      }
    },
    created() {
        if (Object.keys(this.queryParams).length !== 0) {
            Object.assign(this.mallOrder, this.queryParams)
            this.activeName = ''
            this.$nextTick(() => {
                this.activeName = this.queryParams.activeName || 'tab1'
            })
        }
        this.mallOrder.shopId = _.toNumber(this.shopId)
        this.loadTableData()
        this.loadExpressData()
    },
}

</script>
<style lang="sass">
.ui-table-order {
    width: 100%;
    font-size: 12px;
    text-align: left;
    margin-bottom: 0;
    // border: 0;
}

.ui-table-order .header-tr {
    height: 35px;
}

.ui-table-order .header-tr th {
    border: 0px solid;
    background: #f5f5f5;
}

.ui-table-order .separation-row {
    border: none;
    height: 10px;
}

.ui-table-order .separation-row td {
    border: 0;
    height: 10px;
}

.ui-table-order .header-row {
    background: #f5f5f5;
    height: 35px;
}

.ui-table-order .header-row td {
    background: #f5f5f5;
    height: 35px;
}

.ui-table-order td.text-left {
    border-right: 0;
}

.ui-table-order td.text-right {
    text-align: right;
    padding-left: 0;
    border-left: 0;
}

.ui-table-order .goods-td {
    padding: 0px;
}

.ui-table-order .goods-td .list-group {
    padding: 0px;
    border: 0px solid;
    margin: 0;
}
</style>

