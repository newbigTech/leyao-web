<template>
    <!-- 商品分类列表 组件 -->
    <div class="_container">
        <div class="_setting-options">
            <div class="_setting-options-left">
                <el-form :inline="true" :model="mallTag" label-width="0">
                    <el-form-item>
                        <el-input v-model="mallTag.tagName" placeholder="标签名称"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button :plain="true" type="primary" @click.native="onLoadTableData">查 询</el-button>
                    </el-form-item>
                </el-form>
            </div>
            <div class="_setting-options-right">
                <el-button type="primary" @click.native="onAddTag">新 增</el-button>
            </div>
        </div>
        <div class="_table-container">
            <div class="_table-list _goods-group-list">
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column property="tagName" label="标签名称" align="center"></el-table-column>
                    <el-table-column property="createdDtm" label="创建时间" :formatter="dateFormat"> </el-table-column>
                    <el-table-column inline-template label="操作" align="center">
                        <div>
                            <el-button size="small" type="warning" @click.native="onEditTag(row)">编辑</el-button>
                            <el-button size="small" type="danger" @click.native="onDeleteTag(row)">删除</el-button>
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
<style lang="sass">
._goods-group-list {
    ._goods-group-img {
        width: 60px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 5px;
        padding: 2px;
        border-radius: 5px;
        border: 1px solid #ccc;
        cursor: pointer;
        img {
            height: 100%;
            max-width: 100%;
        }
    }
}
</style>
<script>
import {
    dateFormat as _dateFormat
} from "lib/utils/dateFormat"
import {
    queryMallTagPageList,
    deleteMallTag,
    addOrUpdateMallTag
} from 'actions/shopAction'

export default {
    name: "mall_tag_index",
    data() {
        return {
            page: 1,
            pageSize: 10,
            total: 0,
            mallTag: {
                tagName: ''
            },
            tableData: [],
            dateFormat: function(row, col) {
                return _dateFormat(row.createdDtm, 'yyyy-MM-dd HH:mm:ss')
            }
        }
    },
    created() {
        this.onLoadTableData()
    },
    methods: {
        onLoadTableData() {
            this.mallTag.pageNo = this.page
            this.mallTag.pageSize = this.pageSize
            queryMallTagPageList(this.mallTag).then(data => {
                this.tableData = data.rows
                this.total = data.total
            })
        },
        handleSizeChange(val) {
            this.pageSize = val
            this.onLoadTableData()
        },
        handleCurrentChange(val) {
            this.page = val
            this.onLoadTableData()
        },
        onAddTag() {
            this.$prompt(' ', '添加标签', {
                confirmButtonText: '添加',
                cancelButtonText: '取消',
                inputPlaceholder: '请输入标签名称',
                inputPattern: /^.{1,10}$/,
                inputErrorMessage: '格式错误，长度为1-10'
            }).then(({
                value
            }) => {
                addOrUpdateMallTag({
                    tagName: value
                }).then(data => {
                    let {
                        success,
                        msg
                    } = data
                    if (success) {
                        this.$message.success("添加成功!")
                        this.onLoadTableData()
                    }else{
                        this.$message.error(msg)
                    }
                })

            }).catch(() => {});
        },
        onEditTag(row) {
            this.$prompt(' ', '修改标签', {
                confirmButtonText: '修改',
                cancelButtonText: '取消',
                inputPlaceholder: '请输入新标签名称',
                inputPattern: /^.{1,10}$/,
                inputErrorMessage: '格式错误，长度为1-10'
            }).then(({
                value
            }) => {
                addOrUpdateMallTag({
                	tagId:row.tagId,
                    tagName: value
                }).then(data => {
                    let {
                        success,
                        msg
                    } = data
                    if (success) {
                        this.$message.success("修改成功!")
                        this.onLoadTableData()
                    }else{
                        this.$message.error(msg)
                    }
                })

            }).catch(() => {});
        },
        onDeleteTag(item) {
            this.$confirm('是否确认删除?', '提示', {
                    type: 'warning'
                })
                .then(() => {
                    deleteMallTag(item).then(data => {
                        const {
                            success,
                            result,
                            msg
                        } = data;
                        if (success) {
                            this.$message.success("删除成功!")
                            this.onLoadTableData()
                        } else {
                            this.$message.success("删除失败!")
                        }
                    })
                }).catch(() => {})
        }
    }
}
</script>
