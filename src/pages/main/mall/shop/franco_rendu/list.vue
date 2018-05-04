<template>
    <div class="_container">
        <!-- 查询条件 -->
        <div class="_setting-bar">
            <div class="_query-form">
                <div class="_query-form-item">
                    <el-form :inline="true" :model="queryObj" class="demo-form-inline">
                         <el-form-item label="所属区域" style="width:480px;">
                            <el-row type="flex" justify="space-between" style="width:400px;">
                              <el-col :span="7">
                                <el-select v-model="queryObj.province" clearable v-on:change="loadCity()" placeholder="省">
                                  <el-option
                                    v-for="item in provinceList"
                                    :label="item.strProvince"
                                    :value="item.province">
                                  </el-option>
                                </el-select>
                              </el-col>
                              <el-col class="line" :span="1">-</el-col>
                              <el-col :span="7">
                                <el-select v-model="queryObj.city" clearable v-on:change="loadArea()" placeholder="市">
                                  <el-option
                                    v-for="item in cityList"
                                    :label="item.strCity"
                                    :value="item.city">
                                  </el-option>
                              </el-select>
                              </el-col>
                              <el-col class="line" :span="1">-</el-col>
                              <el-col :span="7">
                                <el-select v-model="queryObj.area" clearable placeholder="区">
                                  <el-option
                                    v-for="item in areaList"
                                    :label="item.strArea"
                                    :value="item.area">
                                  </el-option>
                                </el-select>
                              </el-col>
                            </el-row>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="queryObj.selfSiteName" placeholder="自提点名称" :maxlength="20"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-select v-model="queryObj.isHot" placeholder="是否热门" clearable>
                                <el-option label="否" value="0"></el-option>
                                <el-option label="是" value="1"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="_query-form-btn">
                    <el-button @click.native.prevent="loadTableData">查询</el-button>
                </div>
            </div>
            <div class="_actions-btn">
                <el-button type="primary" @click.native.prevent="setParams();$emit('forward','RenduForm')">新增</el-button>
                <el-button type="info" @click.native.prevent="onMap()">地图二维码</el-button>
            </div>
        </div>
        <el-tabs v-model="activeName" style="width:100%" @tab-click="onTabClick">
            <el-tab-pane label="列表" name="tab1">
                        <!-- 商品列表 -->
                <div class="_table-container">
                    <div class="_table-list">
                        <el-table :data="tableData" border @selection-change="handleSelectionChange">
                           <!--  <el-table-column type="selection" width="55"></el-table-column> -->
                            <el-table-column type="index" width="50"> </el-table-column>
                            <el-table-column inline-template label="自提点名称"  min-width="130">
                                <span><el-button type="text" @click.native="onView(row)">{{row.selfSiteName}}</el-button></span>
                            </el-table-column>
                            <el-table-column inline-template label="所属区域"  min-width="130">
                                <span>{{row.strProvince}} {{row.strCity}} {{row.strArea}}</span>
                            </el-table-column>
                            <el-table-column property="selfAddress" label="详细地址"  min-width="130"></el-table-column>
                            <el-table-column property="selfUserNumber" label="用户数"></el-table-column>
                            <el-table-column property="selfOrderNumber" label="订单数"></el-table-column>
                            <el-table-column inline-template label="是否热门">
                                <span>
                                  {{row.isHot == 0 ? '否' : '是' }}
                                </span>
                            </el-table-column>
                            <el-table-column inline-template label="状态">
                                <span :style="{color:row.statusCode==1?'#FF0000':'#00FF00' }">
                                  {{row.statusCode==1?'已停用':'已启用'}}
                                </span>
                            </el-table-column>
                            <el-table-column inline-template label="操作" min-width="250">
                                <div>
                                    <el-button type="info" size="mini" @click.native.prevent="onUserList(row)">用户</el-button>
                                    <el-button type="info" size="mini" @click.native.prevent="onOrderList(row)">订单</el-button>
                                    <el-button type="info" size="mini" @click.native.prevent="onHome(row)">首页二维码</el-button>
                                    <el-button type="primary" size="mini" @click.native.prevent="onEdit(row)">编辑</el-button>
                                    <el-button type="primary" size="mini" @click.native.prevent="onSetGoods(row)">商品管理</el-button>
                                    <el-button type="primary" size="mini" @click.native.prevent="onSetPage(row)">首页配置</el-button>
                                    <el-button type="danger" size="mini" @click.native.prevent="onSetStatusCode(row,1)" v-if="row.statusCode==0">停用</el-button>
                                    <el-button type="success" size="mini" @click.native.prevent="onSetStatusCode(row,0)" v-if="row.statusCode==1">启用</el-button>
                                    <el-button type="danger" size="mini" @click.native.prevent="onDel(row)">删除</el-button>
                                </div>
                            </el-table-column>
                        </el-table>
                        <!-- 分页 -->
                        <div class="_pagination">
                            <el-pagination :total="total" :page-size="pageSize" layout="total, sizes, prev, pager, next" @current-change="handleCurrentChange" @size-change="handleSizeChange">
                            </el-pagination>
                        </div>
                    </div>
                </div>
            </el-tab-pane>
           <!--  <el-tab-pane label="地图分布" name="tab2">地图分布</el-tab-pane> -->
        </el-tabs>

        <el-dialog :title="barCodeDialogTitle" v-model="barCodeDialog" size="tiny">
            <div>
                <div class="grid-content bg-purple" style="border: 1px solid #EFF2F7;padding-bottom: 20px;height:450px;" align="center">
                  <div style="margin-bottom: 10px;" align="center"></div>
                  <qriously :value="picCodeUrl" :size="400" class="bc"></qriously>
                  <div align="center">
                    <a href="javascript:;" @click="downloadBarCode($event)">下载二维码</a>
                  </div>
                </div>          
            </div>
            <span slot="footer" class="dialog-footer">
              <el-button @click.native="barCodeDialog = false">关闭</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import {
    dateFormat as _dateFormat
} from "lib/utils/dateFormat"
import {getMallSelfPurchasePage,querySupplierAreaVoList,setMallSelfPurchaseStatus,delMallSelfPurchase} from 'actions/francoRenduAction'
import {_getMallCouponsCodeUrl} from 'actions/mallShopCouponsAction'
export default {
    name: 'franco_rendu_list',
    components: {},
    computed: {
        supplierID() {
            return this.$store.getters.supplierID
          },
    },
    data() {
        return {
            page: 1,
            pageSize: 20,
            total: 0,
            tableData: [],
            activeName: 'tab1',
            multipleSelection: [],
            areaSourceData:[],
            provinceList:[],
            cityList:[],
            areaList:[],
            couponsUrl:'',
            picCodeUrl:'',
            barCodeDialogTitle:'',
            barCodeDialog:false,
            queryObj: {
                selfSiteName:'',
                province:'',
                city:'',
                area:'',
                isHot:''
            }
        }
    },
    methods: {
        onMap(){
            this.barCodeDialogTitle='自提点地图二维码'
            this.barCodeDialog = true
            //https://weixin.leyao.cn/index.html#/quick-purchase?supplierId=24176
            //this.picCodeUrl = this.couponsUrl+"?sid="+this.supplierID+"&fg=1#/geolocation"
            this.picCodeUrl = this.couponsUrl+"#/quick-purchase?supplierId="+this.supplierID
            console.log('onMap.picCodeUrl',this.picCodeUrl)
        },
        onHome(row){
            //https://weixin.leyao.cn/index.html#/qph/4?supplierId=24176
            this.barCodeDialogTitle='自提点首页二维码'
            this.barCodeDialog = true
            //this.picCodeUrl = this.couponsUrl+"?sid="+this.supplierID+"&fg=0#/qph/"+row.selfPurchaseId
            this.picCodeUrl = this.couponsUrl+"#/qph/"+row.selfPurchaseId+"?supplierId="+this.supplierID
            console.log('onHome.picCodeUrl',this.picCodeUrl)
        },
        downloadBarCode($event){
            let canvas = this.$el.querySelector(".bc").children[0]
            let down = $event.currentTarget
            down.download = "二维码.png"
            if (canvas.getContext) {
              var ctx = canvas.getContext("2d");
              var myImage = canvas.toDataURL("image/png").replace(/^data:image\/[^;]/, 'data:application/octet-stream');
              down.href = myImage
            }
        },
         loadCity(){
            this.cityList = [];
            this.areaList = [];
            this.queryObj.city = '';
            this.queryObj.area = '';
            //清空变量
            if(typeof this.queryObj.province =='undefined' || this.queryObj.province==''){
                return;
            }
            setTimeout(()=>{
              this.cityList=_.unionBy(_.filter(this.areaSourceData, { 'province': this.queryObj.province }),'city')
            });
        },
        loadArea(){
            this.areaList = [];
            this.queryObj.area = '';
            //清空变量
            if(typeof this.queryObj.city =='undefined' || this.queryObj.city==''){
                return;
            }
            setTimeout(()=>{
              this.areaList=_.unionBy(_.filter(this.areaSourceData, { 'city': this.queryObj.city }),'area')
            });
        },
        initSupplierAreaData(){
            querySupplierAreaVoList().then(data=>{
                if(data.length>0){
                    this.areaSourceData=JSON.parse(JSON.stringify(data))
                    this.provinceList=_.unionBy(data,'province')
                }
            })
        },
        onUserList(item){
            this.$emit('forward','UserList',item)
        },
        onOrderList(item){
            this.$emit('forward','OrderList',item)
        },
        onView(item){
            let copyItem=_.cloneDeep(item)
            copyItem.view=true
            this.$emit('forward','RenduForm',copyItem)
        },
        onEdit(item){
            this.$emit('forward','RenduForm',item)
        },
        onSetGoods(item){
            this.$emit('forward','SetGoods',item)
        },
        onSetPage(item){
            this.$emit('forward','SetPage',item)
        },
        onDel(item){
            this.$confirm("确认移除吗？","确认提示",{
              type:'warning'
            }).then(()=>{
              let params={
                selfPurchaseId:item.selfPurchaseId
              }
              delMallSelfPurchase(params).then(data=>{
                const { success, msg, result } = data
                if (success) {
                    this.$message.success('操作成功')
                    this.loadTableData()
                } else {
                    this.$message.error(msg)
                    return false
                }
              })
            }).catch(()=>{})
        },
        onSetStatusCode(item,statusCode){
            let params={
              selfPurchaseId:item.selfPurchaseId,
              statusCode:statusCode
            }
            setMallSelfPurchaseStatus(params).then(data=>{
                const { success, msg, result } = data
                if (success) {
                    this.$message.success('操作成功')
                    item.statusCode=statusCode
                } else {
                    this.$message.error(msg)
                    return false
                }
            })
        },
        onTabClick(tab, event) {
            
        },
        handleSelectionChange(val) {
            this.multipleSelection = val
        },
        setParams() {
            this.$store.commit('SET_QUERY_PARAMS', this.queryObj)
        },
        loadTableData() {
            this.queryObj.pageNo = this.page
            this.queryObj.pageSize = this.pageSize
            getMallSelfPurchasePage(this.queryObj).then(data => {
                this.tableData = data.rows
                this.total = data.total
            })
        },
        handleSizeChange(val) {
            this.pageSize = val
            this.loadTableData()
        },
        handleCurrentChange(val) {
            this.page = val
            this.loadTableData()
        }
    },
    created() {
        _getMallCouponsCodeUrl().then((data) => {
          const {success,result}=data
          if(success){
            this.couponsUrl = result.couponsUrl
          }
        })
        this.initSupplierAreaData()
        this.loadTableData()
    }
}
</script>
