<template>
    <div class="_container">
        <!-- 查询条件 -->
        <div class="_setting-bar">
            <div class="_query-form">
                <div class="_query-form-item">
                    <el-form :inline="true" :model="goodsObj" class="demo-form-inline">
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
                                <!-- <el-option label="无限制" value="0"></el-option> -->
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
            <div class="_actions-btn">
            </div>
        </div>
        <el-tabs :active-name="activeName" style="width:100%" @tab-click="onTabClick">
            <el-tab-pane label="上架商品" name="tab1"></el-tab-pane>
            <el-tab-pane label="下架商品" name="tab2"></el-tab-pane>
            <!-- <el-tab-pane label="全部商品" name="tab3"></el-tab-pane> -->
            <el-tab-pane label="已删除" name="tab4"></el-tab-pane>
        </el-tabs>
        <!-- 商品列表 -->
        <div class="_table-container">
            <div class="_table-list">
                <el-table :data="tableData" border>
                    <el-table-column prop="goodsId" label="商品" align="center" inline-template min-width="200">
                        <div class="_goods-item-cell">
                            <div class="_goods-item-img"><img :src="cloudShowUrl + row.goodsPic"></div>
                            <div class="_goods-item-info">
                                <h3>{{row.goodsName}}</h3>
                                <h4><a href="javascript:void(0)">编码: {{row.goodsSn}}</a></h4>
                                <h5><a href="javascript:void(0)">评论数: {{row.voucherNumber}}</a><a href="javascript:void(0)">关注数: {{row.enshrineNumber}}</a></h5>
                            </div>
                        </div>
                    </el-table-column>
                    <el-table-column inline-template label="类型" align="center" width="120">
                        <div>{{row.goodsType == 0 ? '单品' : (row.goodsType == 1?'规格商品':'组合商品')}}</div>
                    </el-table-column>
                    <el-table-column inline-template label="库存类型" width="120" align="center">
                        <div>{{row.stockType == 0 ? '无限制' : (row.stockType == 1?'独立库存':(row.stockType == 2?'共享库存':'独立库存'))}}</div>
                    </el-table-column>
                    <el-table-column label="市场价/销售价(元)" inline-template align="center" width="150">
                        <div>{{row.mprice}} / {{row.price}}</div>
                    </el-table-column>
                    <el-table-column inline-template label="总销量/总库存" align="center" width="150">
                        <div>
                            <span v-if="row.goodsType==1&&row.stockType==3"> {{row.saleNumber}} / - </span>
                            <span v-else> {{row.saleNumber}} / {{row.stockType == 0 ? '-' : (row.goodsType == 2?'-':row.stockNumber)}} </span>
                        </div>
                    </el-table-column>
                    <el-table-column inline-template label="状态" align="center" width="120">
                        <span>{{row.statusCode == 0 ? '已下架' : '已上架'}}</span>
                    </el-table-column>
                    <el-table-column inline-template label="操作" align="center" v-if="goodsObj.deleteFlag==0"  min-width="150">
                    <div>
                        <el-button type="success" size="small" @click.stop.prevent="setParams();$emit('forward','SetStock',row)" :disabled="row.goodsType == 2 || row.stockType == 0">设置库存</el-button>
                       <el-button type="warning" size="small" @click.native.prevent="onShowLog(row)" :disabled="row.goodsType == 2 || row.stockType == 0">历史记录</el-button> </div>
                    </el-table-column>
                </el-table>
                <!-- 分页 -->
                <div class="_pagination">
                    <el-pagination :total="total" :page-size="pageSize" layout="total, sizes, prev, pager, next" @current-change="handleCurrentChange" @size-change="handleSizeChange">
                    </el-pagination>
                </div>
            </div>
        </div>

         <!--商品库存日志Dialog-->
        <el-dialog title="库存日志" v-model="goodStockDialog">
          <stock-log ref="stockLogCom" :paramObj="paramObj"></stock-log>
        </el-dialog>
        <!--商品品类Dialog-->
        <goods-classify ref="goodsClassifyCom" @onSuccess="onSelectedClassify"></goods-classify>
    </div>
</template>
<script>
import {
    getGoodsPageList
} from 'actions/goodsAction'
import StockLog from './stock_log'
import GoodsClassify from '../goods/components/goods_form/goods-classify'
export default {
    name: 'goods_stock_goods_list',
    components:{StockLog,GoodsClassify},
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
            activeName: 'tab1',
            goodStockDialog:false,
            paramObj:{},
            goodsObj: {
                classifyId:undefined,
                classifyName:'',
                goodsId: undefined,
                goodsName: '',
                goodsSn: '',
                goodsType: '',
                stockType: '',
                statusCode: 1,
                deleteFlag: 0,
                activeName: 'tab1',
                stockFlag:true
            }
        }
    },
    methods: {
         handleIconClick(){
            this.$refs.goodsClassifyCom.goodsClassifyDialog=true
        },
        onSelectedClassify(c){
            this.goodsObj.classifyId=c.classifyId
            this.goodsObj.classifyName=c.classifyName
        },
        onShowLog(row){
          this.paramObj=row
          this.goodStockDialog=true
          if(this.$refs.stockLogCom){
            this.$refs.stockLogCom.goodsObj.goodsId=row.goodsId
            this.$refs.stockLogCom.loadTableData()
          }
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
        loadTableData() {
            this.goodsObj.pageNo = this.page
            this.goodsObj.pageSize = this.pageSize
            //表示本功能为设置商品库存 后台需根据该值过滤掉库存类型为无限制商品
            this.goodsObj.stockFlag=true
            if(this.goodsObj.classifyName.length==0){
                this.goodsObj.classifyId=undefined
            }
            getGoodsPageList(this.goodsObj).then(data => {
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
        if (Object.keys(this.queryParams).length !== 0) {
            Object.assign(this.goodsObj, this.queryParams)
            this.activeName = ''
            this.$nextTick(() => {
                this.activeName = this.queryParams.activeName || 'tab1'
            })
        }
        this.loadTableData()
    }
}
</script>
