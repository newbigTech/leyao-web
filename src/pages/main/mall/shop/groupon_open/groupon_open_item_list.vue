<template>
    <div class="_container">
        <card-panel>
            <span slot="title">参团详情</span>
            <div slot="panel-btns">
                <el-button size="small" type="success" @click.native.prevent="$emit('forward','GroupOpenList')">返回</el-button>
            </div>
            <div slot="panel-body">
                <!-- 商品列表 -->
                <div class="_table-container">
                    <div class="_table-list">
                        <el-table :data="tableData" border>
                            <el-table-column property="grouponItemId" label="参团编号">
                            </el-table-column>
                            <el-table-column label="成员类型" inline-template>
                               <span>{{row.memberUserId==paramObj.leaderUserId?'团长':'团员'}}</span>
                            </el-table-column>
                            <el-table-column property="userAlias" label="成员用户名">
                            </el-table-column>
                            <el-table-column label="订单号" inline-template>
                                <div>
                                    <el-button type="text" @click.native.prevent="onView(row)">{{row.orderNo}}</el-button>
                                </div>
                            </el-table-column>
                            <el-table-column property="memberPrice" label="参团价">
                            </el-table-column>
                            <el-table-column label="参团日期" :formatter="dateFormat">
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
        </card-panel>
    </div>
</template>
<script>
import {
    dateFormat as _dateFormat
} from "lib/utils/dateFormat"
import {
    getGroupOpenItemList
} from 'actions/grouponActivityAction'
export default {
    name: 'groupon_open_item_list',
    props: {
        paramObj: {
            type: Object,
            default: {}
        }
    },
    components: {},
    computed: {},
    data() {
        return {
            tableData: [],
            dateFormat: function(row, col) {
                return _dateFormat(row.createdDtm, 'yyyy-MM-dd HH:mm:ss')
            },
        }
    },
    methods: {
        onView(row){
          let params=_.cloneDeep(row)
          params.grouponId=this.paramObj.grouponId
          this.$emit('forward','OrderView',params)
        },
        loadTableData() {
            getGroupOpenItemList(this.paramObj).then(data => {
                this.tableData = data
            })
        }
    },
    created() {
        this.loadTableData()
    }
}
</script>
