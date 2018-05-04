<template>
    <div class="container-fluid">
        <!-- 查询条件 -->
        <div class="_setting-bar">
            <div class="_query-form">
                <div class="_query-form-item">
                    <el-form :inline="true" :model="classifyObj" class="demo-form-inline">
                        <el-form-item>
                            <el-input v-model="classifyObj.classifyName" placeholder="分组名称" :maxlength="20"></el-input>
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
        <!-- 商品列表 -->
        <div class="_table-container">
            <div class="_table-list">
                <el-table :data="tableData">
                    <el-table-column prop="customClassifyId" label="分组图片" align="center" inline-template min-width="120">
                        <div class="_goods-item-cell" style="height: 61px;margin:0">
                            <div class="_goods-item-img" style="width:60px;height: 60px;"><img :src="cloudShowUrl + row.classifySPic"></div>
                            <div class="_goods-item-info">
                            </div>
                        </div>
                    </el-table-column>
                    <el-table-column prop="classifyName" label="分组名称" align="center"></el-table-column>
                    <el-table-column inline-template label="操作" align="center">
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
import { getCustomClassifyPageList } from 'actions/shopCustomClassifyAction'
export default {
    name: 'goods_data',
    props: {
        queryParams: {
            type: Object,
            default () {
                return {
                  shopId:''
                }
            }
        }
    },
    components: {},
    computed: {
        cloudShowUrl() {
            return this.$store.getters.cloudShowUrl
        }
    },
    data() {
        return {
            page: 1,
            pageSize: 10,
            total: 0,
            tableData: [],
            classifyObj: {
                classifyName:''
            }
        }
    },
    methods: {
        onSelected(row){
            let result={
                id:row.customClassifyId,
                name:row.classifyName,
                row:row
            }
            this.$emit('onSuccess',result)
        },
        loadTableData() {
            this.classifyObj.pageNo = this.page
            this.classifyObj.pageSize = this.pageSize
            this.classifyObj.shopId=this.queryParams.shopId
            getCustomClassifyPageList(this.classifyObj).then(data => {
                const { success, msg, result } = data
                if (success) {
                    this.tableData = result.rows
                    this.total = result.total
                } else {
                    this.tableData = []
                    this.total = 0
                }
            })
        },
        loadData(){
            this.page=1
            if(this.queryParams.shopId==''){
                this.tableData = []
                this.total = 0
            }else{
              this.loadTableData()  
            } 
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
    }
}
</script>
