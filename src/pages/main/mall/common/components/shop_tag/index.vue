<template lang="html">
    <div>
        <div class="panel panel-default" style="margin-top: -10px;">
            <div class="panel-heading" style="height: 50px;">
                <el-input placeholder="搜索标签名" v-model="paramsObj.tagName" style="width: 250px;">
                    <el-button slot="append" icon="search" type="primary" @click.native.prevent="loadTableData"></el-button>
                </el-input>
            </div>
            <div class="panel-body flex" style="padding: 0;margin:15px;">
                <el-checkbox-group v-model="checkList">
                    <el-checkbox v-for="(tag,index) in tableData" :label="tag.tagName">
                        <el-tag :type="index%2===0?'success':''">
                            <span>{{tag.tagName}}</span>
                        </el-tag>
                    </el-checkbox>
                </el-checkbox-group>
            </div>
            <!-- 分页 -->
            <div class="_pagination" style="border: 1px solid transparent;">
                <el-pagination :total="total" :page-size="pageSize" layout="total, sizes, prev, pager, next" @current-change="handleCurrentChange" @size-change="handleSizeChange">
                </el-pagination>
            </div>
            <div class="panel-footer clearfix">
                <el-button type="primary" @click.native.prevent="onOK" style="float: right;">确认</el-button>
            </div>
        </div>
    </div>
</template>
<style lang="sass">
</style>
<script>
import {
    queryMallTagPageList
} from 'actions/shopAction'
export default {
    name: 'selected_shop_tag_index',
    props: {
        vm: {
            type: Object
        }
    },
    data() {
        return {
            checkList: [],
            page: 1,
            pageSize: 50,
            total: 0,
            tableData: [],
            paramsObj: {
                tagName: ''
            }
        }
    },
    methods: {
        onOK() {
            this.$emit('onSelectTag', this.checkList)
        },
        initData() {
            this.checkList = []
        },
        loadTableData() {
            this.paramsObj.pageNo = this.page
            this.paramsObj.pageSize = this.pageSize
            queryMallTagPageList(this.paramsObj).then(data => {
                this.tableData = data.rows || []
                this.total = data.total || 0
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
