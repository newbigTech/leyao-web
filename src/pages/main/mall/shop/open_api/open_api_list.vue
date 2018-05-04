<template>
    <div class="_container">
            <!-- 查询条件 -->
        <div class="_setting-bar"><div class="_query-form"></div>
            <div class="_actions-btn">
              <el-button v-show="tableData.length<7" type="primary" icon="plus" @click.native.prevent="setParams();$emit('forward','OpenAdd')">新增</el-button>
            </div>
        </div>
        <!-- 商品列表 -->
        <div class="_table-container">
            <div class="_table-list"> 
                <el-table :data="tableData" border>
                    <el-table-column property="openId" label="序号" width="100" align="center"></el-table-column>
                    <el-table-column property="openName" label="接入应用名称" align="center">
                    </el-table-column>
                    <el-table-column inline-template label="开放类型" align="center">
                        <span>{{row.openType == 0 ? '主动推送' : '服务商应用' }}</span>
                    </el-table-column>
                    <el-table-column inline-template label="密钥" width="400" align="center">
                      <div>
                          <ul>
                              <li>公钥 ：{{row.apiKey}}</li>
                              <li>私钥 ：{{row.apiPrivateKey}}</li>
                              <li v-show="row.openType==0">回调URL ：{{row.apiBackUrl}}</li>
                          </ul>
                      </div>
                    </el-table-column>
                    <el-table-column property="createdDtm" label="创建时间" :formatter="dateFormat1"  width="180" align="center"> </el-table-column>
                    <el-table-column inline-template label="操作" width="200" align="center">
                        <span>
                          <el-button type="success" size="small" @click.stop.prevent="setParams();$emit('forward','OpenAdd',row)">编辑</el-button>
                            <el-button type="danger" size="small" @click.stop.prevent="onDelRow(row)">删除</el-button>
                        </span>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>
<script>
import {
    dateFormat as _dateFormat
} from "lib/utils/dateFormat"
import {
    getMallOpenVoList,
    deleteMallOpen
} from 'actions/shopAction'
export default {
    name: 'groupon_open_list',
    components: {},
    computed: {},
    data() {
        return {
            tableData: [],
            dateFormat1: function(row, col) {
                return _dateFormat(row.createdDtm, 'yyyy-MM-dd HH:mm:ss')
            }
        }
    },
    methods: {
        onDelRow(row){
            this.$confirm('确认删除?', '提示', {
                    type: 'warning'
                })
                .then(() => {
                    deleteMallOpen({
                        openId: row.openId
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
        setParams() {
            this.$store.commit('SET_QUERY_PARAMS', this.grouponOpenObj)
        },
        loadTableData() {
            getMallOpenVoList().then(data => {
                this.tableData = data
            })
        }
    },
    created() {
        this.loadTableData()
    }
}
</script>
