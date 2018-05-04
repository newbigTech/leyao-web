<template>
    <div class="_container _goods-list">
        <!-- 查询条件 -->
        <div class="_setting-bar">
            <div class="_query-form">
                <div class="_query-form-item">
                    <el-form :inline="true" :model="goodsObj">
                        <el-form-item>
                            <el-input v-model="goodsObj.goodsName" placeholder="商品名称" :maxlength="20"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="goodsObj.goodsSn" placeholder="商品编码" :maxlength="120"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-select v-model="goodsObj.goodsType" placeholder="商品类型" clearable>
                                <el-option label="单品" value="0"></el-option>
                                <el-option label="规格商品" value="1"></el-option>
                                <el-option label="组合商品" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-select v-model="goodsObj.stockType" placeholder="库存类型" clearable>
                                <el-option label="无限制" value="0"></el-option>
                                <el-option label="单品独立库存" value="1"></el-option>
                                <el-option label="规格品共享库存" value="2"></el-option>
                                <el-option label="规格品独立库存" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="goodsObj.classifyName" placeholder="商品分类" :maxlength="20" icon="search" :on-icon-click="handleIconClick"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="_query-form-btn">
                    <el-button @click.native.prevent="loadTableData">查询</el-button>
                </div>
            </div>
            <div class="_actions-btn" v-if="!targetShopId">
                <el-button type="primary" @click.native.prevent="onAdd(null)">新增</el-button>
            </div>
        </div>
        <el-tabs v-model="activeName" style="width:100%" @tab-click="onTabClick">
            <el-tab-pane label="上架商品" name="tab1"></el-tab-pane>
            <el-tab-pane label="下架商品" name="tab2"></el-tab-pane>
            <!-- <el-tab-pane label="全部商品" name="tab3"></el-tab-pane> -->
            <el-tab-pane label="已删除" name="tab4"></el-tab-pane>
        </el-tabs>
        <el-button type="primary" @click.native.prevent="onSetStateBatch(1)" v-if="goodsObj.activeName=='tab2'">批量上架</el-button>
        <el-button type="primary" @click.native.prevent="onSetStateBatch(0)" v-if="goodsObj.activeName=='tab1'">批量下架</el-button>
        <!-- 商品列表 -->
        <div class="_table-container">
            <div class="_table-list">
                <el-table :data="tableData" border ref="multipleTable" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange">
                <el-table-column
                  type="selection"
                  width="55" v-if="goodsObj.activeName!='tab4'">
                </el-table-column>
                    <el-table-column prop="goodsId" label="商品" align="center" inline-template min-width="200">
                        <div class="_goods-item-cell">
                            <div class="_goods-item-img"><img :src="cloudShowUrl + row.goodsPic"></div>
                            <div class="_goods-item-info">
                                <h3>{{row.goodsName}}</h3>
                                <h4><a href="javascript:void(0)" >编码: {{row.goodsSn}}</a></h4>
                                <h5>
                                    <el-button type="text" @click.stop.prevent="setParams();onViewVoucher(row)">评论数: {{row.voucherNumber}}</el-button>
                                    <el-button type="text" @click.stop.prevent="setParams();onViewEnshrine(row)">关注数: {{row.enshrineNumber}}</el-button>
                                </h5>
                            </div>
                        </div>
                    </el-table-column>
                    <el-table-column inline-template label="类型" align="center">
                        <div>
                            <el-button type="text" @click.stop.prevent="onShowDailog(row)">{{row.goodsType == 0 ? '单品' : (row.goodsType == 1?'规格商品':'组合商品')}}</el-button>
                        </div>
                    </el-table-column>
                    <el-table-column inline-template label="库存类型" align="center">
                        <div>{{row.stockType == 0 ? '无限制' : (row.stockType == 1?'独立库存':(row.stockType == 2?'共享库存':'独立库存'))}}</div>
                    </el-table-column>
                    <el-table-column label="市场价/销售价(元)" inline-template align="center" width="150">
                        <div>{{row.mprice}} / {{row.price}}</div>
                    </el-table-column>
                    <el-table-column inline-template label="总销量/总库存" align="center" width="150">
                        <div>
                            <span v-if="row.goodsType==1&&row.stockType==3"> {{row.saleNumber}} / -</span>
                            <span v-else> {{row.saleNumber}} / {{row.stockType == 0 ? '-' : (row.goodsType == 2?'-':row.stockNumber)}} </span>
                        </div>
                    </el-table-column>
                    <el-table-column inline-template label="状态" align="center">
                        <div>{{row.statusCode == 0 ? '已下架' : '已上架'}}</div>
                    </el-table-column>
                    <el-table-column  label="最后更新时间" align="center" :formatter="dateFormat1" width="180">
                    </el-table-column>
                    <el-table-column inline-template label="操作" align="center" v-if="goodsObj.deleteFlag==0&&!targetShopId" min-width="150">
                        <div>
                            <el-dropdown split-button type="primary" @click="onSetState(row)">
                                {{row.statusCode == 0 ? '上架' : '下架'}}
                                <el-dropdown-menu slot="dropdown">
                                 <el-dropdown-item @click.native.prevent="setParams();$emit('forward','GoodsForm',row,'view')">查看详情</el-dropdown-item>
                                    <el-dropdown-item @click.native.prevent="onAdd(row)" v-if="row.statusCode === 0">修改</el-dropdown-item>
                                    <el-dropdown-item @click.native.prevent="setParams();$emit('forward','SetStock',row)" v-if="row.goodsType != 2 && row.stockType != 0">设置库存</el-dropdown-item>
                                    <el-dropdown-item @click.native.prevent="onShowLog(row)" v-if="row.goodsType != 2 && row.stockType != 0">历史库存记录</el-dropdown-item>
                                    <el-dropdown-item @click.native.prevent="onDelRow(row)" v-if="row.statusCode === 0">删除</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                            <!--
                            <el-button type="success" size="small" @click.stop.prevent="setParams();$emit('forward','SetStock',row)" :disabled="row.goodsType == 2 || row.stockType == 0">设置库存</el-button>
                            <el-button type="warning" size="small" @click.native.prevent="onShowLog(row)" :disabled="row.goodsType == 2 || row.stockType == 0">历史记录</el-button>
                            <el-button size="small" type="success" @click.stop.prevent="onSetState(row)">{{row.statusCode == 0 ? '上架' : '下架'}}</el-button>
                            <el-button size="small" type="warning" @click.stop.prevent="setParams();$emit('forward','GoodsForm',row)" v-if="row.statusCode === 0">修改</el-button>
                            <el-button size="small" type="danger" @click.stop.prevent="onDelRow(row)" v-if="row.statusCode === 0">删除</el-button> -->
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
        <!--组合商品Dialog-->
        <el-dialog title="组合商品列表" v-model="groupGoodsDialog">
            <group-goods ref="groupGoodsCom" :paramObj="rowObj"></group-goods>
        </el-dialog>
        <!--规格商品Dialog-->
        <el-dialog title="规格列表" v-model="goodsSkuDialog">
            <goods-sku ref="goodSkuCom" :paramObj="rowObj"></goods-sku>
        </el-dialog>
        <!--商品库存日志Dialog-->
        <el-dialog title="库存日志" v-model="goodStockDialog">
            <stock-log ref="stockLogCom" :paramObj="rowObj"></stock-log>
        </el-dialog>
        <!--商品品类Dialog-->
        <goods-classify ref="goodsClassifyCom" :shopId="targetShopId" @onSuccess="onSelectedClassify"></goods-classify>
    </div>
</template>
<script>
import {
    delGoods,
    getGoodsPageList,
    saveGoodState
}
from 'actions/goodsAction'
import GoodsSku from './goods_sku_list'
import GroupGoods from './group_goods_items'
import OrderVoucher from 'pages/main/mall/shop/order_voucher/orderVoucherList'
import UserEnshrine from 'pages/main/mall/shop/user_enshrine/userEnshrineList'
import StockLog from '../../goods_stock/stock_log'
import GoodsClassify from './goods_form/goods-classify'
import {
    dateFormat as _dateFormat
} from "lib/utils/dateFormat"
export default {
    name: 'brand_list',
    props: {
        paramObj: {
            type: Object,
            default(){
                return {skuSoruceType:0}
            }
        },
        targetShopId: {
            type: Number,
            default: undefined
        },
        e: Object || {},
    },
    components: {
        GoodsSku,
        GroupGoods,
        OrderVoucher,
        UserEnshrine,
        StockLog,
        GoodsClassify
    },
    computed: {
        cloudShowUrl() {
            return this.$store.getters.cloudShowUrl
        },
        queryParams() {
            return this.$store.getters.queryParams
        }
    },
    data() {
        return {
            page: 1,
            pageSize: 20,
            total: 0,
            tableData: [],
            multipleSelection:[],
            activeName: 'tab1',
            groupGoodsDialog: false,
            goodsSkuDialog: false,
            orderVoucherDialog: false,
            userEnshrineDialog: false,
            goodStockDialog: false,
            goodsClassifyDialog:false,
            rowObj: {},
            goodsObj: {
                goodsId: undefined,
                classifyId:undefined,
                classifyName:'',
                goodsName: '',
                goodsFullName: '',
                goodsSn: '',
                goodsType: '',
                stockType: '',
                statusCode: 1,
                deleteFlag: 0,
                activeName: 'tab1',
                shopId: undefined
            },
            dateFormat1: function(row, col) {
                return _dateFormat(row.lastDtm, 'yyyy-MM-dd HH:mm:ss')
            }
        }
    },
    methods: {
        onAdd(row){
            this.setParams()
            //skuSoruceType:0,//数据来源 0 自建 1 erp
            if(this.paramObj.skuSoruceType==0){
                this.$emit('forward','GoodsForm',row)
            }else{
                this.$emit('forward','GoodsErp',row)
            }
            
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        onSelectedClassify(c){
            this.goodsObj.classifyId=c.classifyId
            this.goodsObj.classifyName=c.classifyName
        },
        handleIconClick(){
            this.$refs.goodsClassifyCom.shopId = this.targetShopId ;
            this.$refs.goodsClassifyCom.goodsClassifyDialog=true
        },
        onShowLog(row) {
            this.rowObj = row
            this.goodStockDialog = true
            if (this.$refs.stockLogCom) {
                this.$refs.stockLogCom.goodsObj.goodsId = row.goodsId
                this.$refs.stockLogCom.loadTableData()
            }
        },
        onShowDailog(row) {
            this.rowObj = row
            if (row.goodsType === 2) { //组合商品
                this.groupGoodsDialog = true
                if (this.$refs.groupGoodsCom) {
                    this.$refs.groupGoodsCom.goodsObj.goodsId = row.goodsId
                    this.$refs.groupGoodsCom.loadTableData()
                }
            } else if (row.goodsType === 1) { //规格商品
                this.goodsSkuDialog = true
                if (this.$refs.goodSkuCom) {
                    this.$refs.goodSkuCom.goodsObj.goodsId = row.goodsId
                    this.$refs.goodSkuCom.goodsObj.stockType = row.stockType
                    this.$refs.goodSkuCom.loadTableData()
                }
            }
            return false
        },
        tableRowClassName(row, index) {
            if (row.goodsType == 0) { // 单品
                return 'singleItem'
            } else if (row.goodsType == 1) { // 规格商品
                return 'skuItem'
            }
            return 'comItem'
        },
        setParams() {
            this.$store.commit('SET_QUERY_PARAMS', this.goodsObj)
        },
        onTabClick(tab, event) {
            this.goodsObj.activeName = tab.name
            if (tab.name === 'tab1') {
                this.goodsObj.pageNo = 1
                this.goodsObj.statusCode = 1
                this.goodsObj.deleteFlag = 0
            } else if (tab.name === 'tab2') {
                this.goodsObj.pageNo = 1
                this.goodsObj.statusCode = 0
                this.goodsObj.deleteFlag = 0
            } else if (tab.name === 'tab3') {
                this.goodsObj.pageNo = 1
                this.goodsObj.statusCode = ''
                this.goodsObj.deleteFlag = 0
            } else if (tab.name === 'tab4') {
                this.goodsObj.pageNo = 1
                this.goodsObj.statusCode = ''
                this.goodsObj.deleteFlag = 1
            }
            this.loadTableData()
        },
        onSetStateBatch(statusCode){//批量上下架商品
            if(this.multipleSelection.length==0)
                return false
            let newArray=_.orderBy(this.multipleSelection, ['goodsType'], ['asc']);
            let goodsIds=_.map(newArray, 'goodsId')
            let params = {
                statusCode: parseInt(statusCode),
                goodsIDArray: goodsIds.join(',')
            }
            this.$confirm('确认提交？', '提示', {
                type: 'warning'
            }).then(() => {
                saveGoodState(params).then(data => {
                    const {
                        success,
                        msg,
                        result
                    } = data
                    if (success) {
                        this.$message({
                            type: 'success',
                            message: '操作成功记录数'+result
                        })
                        this.loadTableData()
                    } else {
                        this.$message.error(msg);
                    }
                })
            })
        },
        onSetState(row) {
            let params = {
                statusCode: parseInt(row.statusCode) === 0 ? 1 : 0,
                goodsId: row.goodsId
            }
            let mess = row.statusCode == 0 ? '是否确认上架' : '是否确认下架'
            if (row.goodsType == 0 && row.statusCode == 1) {
                mess = '单品下架相关联的组合商品也将被下架，' + mess
            }
            this.$confirm(`${mess}?`, '提示', {
                type: 'warning'
            }).then(() => {
                saveGoodState(params).then(data => {
                    const {
                        success,
                        msg,
                        result
                    } = data
                    if (success) {
                        this.$message({
                            type: 'success',
                            message: '操作成功!'
                        });
                        this.loadTableData()
                            //row.statusCode = params.statusCode
                    } else {
                        if (result) {
                            let gstr = _.map(result, 'goodsName').join(',')
                            this.$alert(`已绑定未上架商品有：${gstr}`, msg, {
                                confirmButtonText: '确定',
                                callback: action => {}
                            });

                        } else {
                            this.$message.error(msg);
                        }
                    }
                })
            })
        },
        loadTableData() {
            this.goodsObj.shopId = this.targetShopId
            this.goodsObj.pageNo = this.page
            this.goodsObj.pageSize = this.pageSize
            if(this.goodsObj.classifyName.length==0){
                this.goodsObj.classifyId=undefined
            }
            getGoodsPageList(this.goodsObj).then(data => {
                this.tableData = data.rows
                this.total = data.total
            })
        },
        handleSizeChange(val) {
            console.log('handleSizeChange', val)
            this.pageSize = val
            this.loadTableData()
        },
        handleCurrentChange(val) {
            console.log('handleCurrentChange', val)
            this.page = val
            this.loadTableData()
        },
        onDelRow(row) {
            this.$confirm('是否确认删除?', '提示', {
                type: 'warning'
            }).then(() => {
                delGoods(row).then(data => {
                    const {
                        success,
                        msg,
                        result
                    } = data
                    if (success) {
                        this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        this.loadTableData()
                    } else {
                        if (result) {
                            let gstr = _.map(result, 'goodsName').join(',')
                            this.$alert(`已绑定组合商品有：${gstr}`, msg, {
                                confirmButtonText: '确定',
                                callback: action => {}
                            });
                        } else {
                            this.$message.error(msg);
                        }

                    }
                })
            }).catch(() => {});
        },
        onViewVoucher(row) { //查看评论
            /*if(row.voucherNumber <= 0){
                return ;
            }
          this.rowObj = row;
          this.rowObj.isGoods = 1;//标记是商品
          this.rowObj.isShop = this.targetShopId? 1:0;//标记是店铺过来
          this.orderVoucherDialog = true;
          this.$nextTick(() => {
            if (this.$refs.orderVoucherCom) {
              this.$refs.orderVoucherCom.goodsId = row.goodsId;
              this.$refs.orderVoucherCom.loadData();
              }
          });*/
            if (row.deleteFlag == 1) {
                return false;
            }
            this.rowObj = row;
            this.rowObj.isGoods = 1; //标记是商品
            this.rowObj.isShopMng = this.targetShopId ? 1 : 0; //标记是电商店铺过来
            this.rowObj.gobackUrl = this.targetShopId ? 'shopList' : 'GoodsList'; //返回路径
            if (this.targetShopId) {
                this.e.$emit('forward', 'OrderVoucher', this.rowObj);
            } else {
                this.$emit('forward', 'OrderVoucher', this.rowObj);
            }

            return false
        },
        onViewEnshrine(row) { //查看关注
            /*if(row.enshrineNumber <= 0){
                return ;
            }
          this.rowObj = row;
          this.rowObj.isGoods = 1;//标记是商品
          this.rowObj.isShop = this.targetShopId? 1:0;//标记是店铺过来
          this.userEnshrineDialog = true;
          this.$nextTick(() => {
            if (this.$refs.userEnshrineCom) {
              this.$refs.userEnshrineCom.goodsId = row.goodsId;
              this.$refs.userEnshrineCom.loadData();
              }
          });*/
            if (row.deleteFlag == 1) {
                return false;
            }
            this.rowObj = row;
            this.rowObj.isGoods = 1; //标记是商品
            this.rowObj.isShopMng = this.targetShopId ? 1 : 0; //标记是电商店铺过来
            if (this.targetShopId) {
                this.e.$emit('forward', 'UserEnshrine', this.rowObj);
            } else {
                this.$emit('forward', 'UserEnshrine', this.rowObj);
            }
            return false
        },
        //**************************
    },
    created() {
        if (Object.keys(this.queryParams).length !== 0) {
            Object.assign(this.goodsObj, this.queryParams)
            this.activeName = this.queryParams.activeName || 'tab1'
            // this.activeName = ''
            // this.$nextTick(() => {
            //     this.activeName = this.queryParams.activeName || 'tab1'
            // })
        }
        this.loadTableData()
    }
}
</script>
<style lang="sass">
._goods-list {
    // .el-table .skuItem { background: #c9e5f5; }
    // .el-table .singleItem { background: #e2f0e4; }
    // .el-table__body tr td { transition: none; }
    // .el-table__body tr.hover-row td { background-color: transparent;  }
}
</style>
