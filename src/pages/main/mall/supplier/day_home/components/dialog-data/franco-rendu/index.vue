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
                                        <el-option v-for="item in provinceList" :label="item.strProvince" :value="item.province">
                                        </el-option>
                                    </el-select>
                                </el-col>
                                <el-col class="line" :span="1">-</el-col>
                                <el-col :span="7">
                                    <el-select v-model="queryObj.city" clearable v-on:change="loadArea()" placeholder="市">
                                        <el-option v-for="item in cityList" :label="item.strCity" :value="item.city">
                                        </el-option>
                                    </el-select>
                                </el-col>
                                <el-col class="line" :span="1">-</el-col>
                                <el-col :span="7">
                                    <el-select v-model="queryObj.area" clearable placeholder="区">
                                        <el-option v-for="item in areaList" :label="item.strArea" :value="item.area">
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
               
            </div>
            <div class="_actions-btn">
               <el-button @click.native.prevent="loadData">查询</el-button>
            </div>
        </div>
        <!-- 商品列表 -->
        <div class="_table-container">
            <div class="_table-list">
                <el-table :data="tableData">
                    <!--  <el-table-column type="selection" width="55"></el-table-column> -->
                    <el-table-column type="index" width="50"> </el-table-column>
                    <el-table-column inline-template label="自提点名称">
                        <span><el-button type="text" @click.native="onView(row)">{{row.selfSiteName}}</el-button></span>
                    </el-table-column>
                    <el-table-column inline-template label="所属区域">
                        <span>{{row.strProvince}} {{row.strCity}} {{row.strArea}}</span>
                    </el-table-column>
                    <el-table-column property="selfAddress" label="详细地址"></el-table-column>
                    <el-table-column inline-template label="是否热门">
                        <span>
                          {{row.isHot == 0 ? '否' : '是' }}
                        </span>
                    </el-table-column>
                    <el-table-column inline-template label="操作" min-width="80">
                        <div>
                            <el-button type="success" size="small" @click="onSelected(row)">选择</el-button>
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
    </div>
</template>
<script>
import {
    dateFormat as _dateFormat
} from "lib/utils/dateFormat"
import {
    getMallSelfPurchasePage,
    querySupplierAreaVoList,
    setMallSelfPurchaseStatus,
    delMallSelfPurchase
} from 'actions/francoRenduAction'
export default {
    name: 'groupon_activity_list',
    props: {
        queryParams: {
            type: Object,
            default () {
                return {
                    shopId: ''
                }
            }
        }
    },
    components: {},
    computed: {},
    data() {
        return {
            page: 1,
            pageSize: 20,
            total: 0,
            tableData: [],
            areaSourceData: [],
            provinceList: [],
            cityList: [],
            areaList: [],
            queryObj: {
                selfSiteName: '',
                province: '',
                city: '',
                area: '',
                isHot: ''
            }
        }
    },
    methods: {
        loadCity() {
            this.cityList = [];
            this.areaList = [];
            this.queryObj.city = '';
            this.queryObj.area = '';
            //清空变量
            if (typeof this.queryObj.province == 'undefined' || this.queryObj.province == '') {
                return;
            }
            setTimeout(() => {
                this.cityList = _.unionBy(_.filter(this.areaSourceData, {
                    'province': this.queryObj.province
                }), 'city')
            });
        },
        loadArea() {
            this.areaList = [];
            this.queryObj.area = '';
            //清空变量
            if (typeof this.queryObj.city == 'undefined' || this.queryObj.city == '') {
                return;
            }
            setTimeout(() => {
                this.areaList = _.unionBy(_.filter(this.areaSourceData, {
                    'city': this.queryObj.city
                }), 'area')
            });
        },
        initSupplierAreaData() {
            querySupplierAreaVoList().then(data => {
                if (data.length > 0) {
                    this.areaSourceData = JSON.parse(JSON.stringify(data))
                    this.provinceList = _.unionBy(data, 'province')
                }
            })
        },
        onSelected(item) {
            let result={
                id:item.selfPurchaseId,
                name:item.selfSiteName,
                row:item
            }
            this.$emit('onSuccess',result)
        },
        loadData() {
            this.initSupplierAreaData()
            this.queryObj.pageNo = this.page
            this.queryObj.pageSize = this.pageSize
            this.queryObj.statusCode = 0
            this.queryObj.shopId = this.queryParams.shopId
            getMallSelfPurchasePage(this.queryObj).then(data => {
                this.tableData = data.rows
                this.total = data.total
            })
        },
        handleSizeChange(val) {
            this.pageSize = val
            this.loadData()
        },
        handleCurrentChange(val) {
            this.page = val
            this.loadData()
        }
    },
    created() {
        //this.initSupplierAreaData()
        //this.loadData()
    }
}
</script>
