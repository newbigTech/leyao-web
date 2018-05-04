<template>
    <div class="_container">
        <!-- 查询条件 -->
        <div class="_setting-bar">
            <div class="_query-form">
                <div class="_query-form-item">
                    <el-form :inline="true" :model="grouponActivityObj" class="demo-form-inline">
                        <el-form-item>
                            <el-input v-model="grouponActivityObj.activityName" placeholder="拼团活动名称" :maxlength="20"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-input v-model="grouponActivityObj.goodsName" placeholder="商品名称" :maxlength="120"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-select v-model="grouponActivityObj.statusCode" placeholder="活动状态" clearable>
                                <el-option label="初始化" value="0"></el-option>
                                <el-option label="启用中" value="1"></el-option>
                                <el-option label="停用" value="2"></el-option>
                                <el-option label="已过期" value="3"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="_query-form-btn">
                    <el-button @click.native.prevent="loadTableData">查询</el-button>
                </div>
            </div>
            <div class="_actions-btn">
               <!--  <el-button type="primary" @click.native.prevent="setParams();$emit('forward','ActivityAdd')">新增</el-button> -->
            </div>
        </div>
        <el-tabs v-model="activeName" style="width:100%" @tab-click="onTabClick">
            <el-tab-pane label="拼团" name="tab1"></el-tab-pane>
            <el-tab-pane label="已删除" name="tab2"></el-tab-pane>
        </el-tabs>
        <!-- 商品列表 -->
        <div class="_table-container">
            <div class="_table-list">
                <el-button-group v-show="activeName==='tab1'">
                    <el-button type="primary" icon="plus" @click.native.prevent="setParams();$emit('forward','ActivityAdd')">新增</el-button>
                    <el-button type="success" icon="check" @click.native.prevent="setStatus(1)">启用</el-button>
                    <el-button type="warning" icon="close" @click.native.prevent="setStatus(2)">停用</el-button>
                    <el-button type="danger" icon="delete" @click.native.prevent="onDelBatch">删除</el-button>
                </el-button-group>
                <el-table :data="tableData" border @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55"></el-table-column>
                    <el-table-column property="activityId" label="团编号"  width="100"></el-table-column>
                    <el-table-column property="activityName" label="拼团名称" min-width="180"></el-table-column>
                    <el-table-column inline-template label="商品名称" min-width="180">
                        <span>{{row.goodSkuId != 0 ? row.goodSkuName : row.goodsName }}</span>
                    </el-table-column>
                    <el-table-column property="beginDtm" label="开始时间"  width="170" :formatter="dateFormat1"> </el-table-column>
                    <el-table-column property="endDtm" label="结束时间" width="170" :formatter="dateFormat2"> </el-table-column>
                    <el-table-column label="状态"  width="100" :formatter="statusCodeFormat" v-if="activeName=='tab1'">
                       <!--  <span>{{row.statusCode == 0 ? '初始化' : row.statusCode == 1?'启用中':row.statusCode == 2?'停用':row.statusCode == 3?'已过期':'' }}</span> -->
                    </el-table-column>
                    <el-table-column inline-template label="操作" width="200">
                        <span>
                          <el-button type="info" size="small" @click.stop.prevent="setParams();$emit('forward','ActivityView',row)">查看</el-button>
                            <el-button type="success" size="small" @click.stop.prevent="setParams();$emit('forward','ActivityAdd',row)" :disabled="row.statusCode != 0 || row.deleteFlag===1">编辑</el-button>
                            <el-button type="danger" size="small" :disabled="(row.statusCode != 0 || row.deleteFlag===1)&&row.statusCode != 3" @click.stop.prevent="onDelRow(row)">删除</el-button>
                        </span>
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
    getGrouponActivityPageList,
    updateGrouponActivityState,
    delGrouponActivity
} from 'actions/grouponActivityAction'
export default {
    name: 'groupon_activity_list',
    components: {},
    computed: {},
    data() {
        return {
            page: 1,
            pageSize: 20,
            total: 0,
            tableData: [],
            activeName: 'tab1',
            multipleSelection: [],
            grouponActivityObj: {
                activityName: '',
                goodsName:'',
                statusCode:undefined
            },
            dateFormat1: function(row, col) {
                return _dateFormat(row.beginDtm, 'yyyy-MM-dd HH:mm:ss')
            },
            dateFormat2: function(row, col) {
                return _dateFormat(row.endDtm, 'yyyy-MM-dd HH:mm:ss')
            },
            statusCodeFormat: function(row, col) {
                // if(new Date(row.endDtm).getTime()< _.now()){
                //     row.statusCode=3
                //     return '已过期'
                // }
                if(row.statusCode === 0)
                    return '初始化'
                if(row.statusCode === 1)
                    return '启用中'
                if(row.statusCode === 2)
                    return '停用'
                if(row.statusCode === 3)
                    return '已过期'
                return ''
            }
        }
    },
    methods: {
        setStatus(v){
            if(this.multipleSelection.length===0) return false
            let ids=[]
            if(v===1){
                _.forEach(this.multipleSelection,(item)=>{
                    if(item.statusCode!=1){
                        ids.push(item.activityId)
                    }
                })
            }else{
                _.forEach(this.multipleSelection,(item)=>{
                    if(item.statusCode==1){
                        ids.push(item.activityId)
                    }
                })
            }
            if(ids.length===0) 
                return false
            this.$confirm('确认提交?', '提示', {
                    type: 'warning'
                })
                .then(() => {
                    updateGrouponActivityState({
                        activityIds: ids.join(","),
                        statusCode:v
                    }).then(data => {
                        const {
                            success,
                            msg,
                            result
                        } = data
                        if (success) {
                            this.$message.success('操作成功')
                            this.loadTableData()
                        } else {
                            this.$message.error(msg)
                            return false
                        }
                    })
                }).catch(() => {})
        },
        onDelBatch(){
            if(this.multipleSelection.length===0) return false
            let ids=[]
            _.forEach(this.multipleSelection,(item)=>{
                    if(item.statusCode == 0||item.statusCode ==3){
                        ids.push(item.activityId)
                    }
                })
            if(ids.length===0) 
                return false
            this.$confirm('只有初始化状态活动才会被删除，确认删除?', '提示', {
                    type: 'warning'
                })
                .then(() => {
                    delGrouponActivity({
                        activityIds: ids.join(',')
                    }).then(data => {
                        const { success, msg, result } = data
                        if (success) {
                            this.$message.success('操作成功')
                            this.loadTableData()
                        } else {
                            this.$message.error(msg)
                            return false
                        }
                    })
                }).catch(() => {})
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        onDelRow(row) {
            this.$confirm('确认删除?', '提示', {
                    type: 'warning'
                })
                .then(() => {
                    delGrouponActivity({
                        activityIds: row.activityId
                    }).then(data => {
                        const {
                            success,
                            msg,
                            result
                        } = data
                        if (success) {
                            this.$message.success('操作成功')
                            this.loadTableData()
                        } else {
                            this.$message.error(msg)
                            return false
                        }
                    })
                }).catch(() => {})
        },
        onTabClick(tab, event) {
            this.loadTableData()
        },
        setParams() {
            this.$store.commit('SET_QUERY_PARAMS', this.grouponActivityObj)
        },
        loadTableData() {
            if(this.activeName==='tab1'){
                this.grouponActivityObj.deleteFlag=0
            }else if(this.activeName==='tab2'){
                this.grouponActivityObj.deleteFlag=1
                this.grouponActivityObj.statusCode=undefined
            }
            this.grouponActivityObj.pageNo = this.page
            this.grouponActivityObj.pageSize = this.pageSize
            getGrouponActivityPageList(this.grouponActivityObj).then(data => {
                let initData=data.rows
                _.each(initData,(item)=>{
                    if(new Date(item.endDtm).getTime()< _.now()){
                        item.statusCode=3
                    }
                })
                this.tableData = initData
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
        this.loadTableData()
    }
}
</script>
