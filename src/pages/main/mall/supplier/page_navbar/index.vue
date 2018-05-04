<template>
    <div class="ec-setting-classify-management">
        <!-- 导航面包屑 -->
        <div class="_breadcrumb">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item to="/mall">商城</el-breadcrumb-item>
                <el-breadcrumb-item>电商首页管理</el-breadcrumb-item>
                <el-breadcrumb-item>首页导航</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!-- body -->
        <div class="_container-wrapper">
            <div class="_sub-sidebar" style="width:500px;">
                <div class="_tree-header">
                    <h3>首页导航 (*支持拖动行排序)</h3>
                    <div>
                        <button class="btn btn-sm btn-success" style="padding: 3px 10px;" @click="onAddPageNavbar">新增</button>
                        <button class="btn btn-sm btn-success" style="padding: 3px 10px;" @click="onSavePageNavbarSortIndex" :disabled="!saveSortIndexBtn">保存排序</button>
                    </div>
                </div>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>导航名称</th>
                            <th>状态</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <draggable :list="pageNavbarData" :element="'tbody'" @end="saveSortIndexBtn=true">
                        <tr v-for="(item,index) in pageNavbarData">
                            <td align="center"><span class="glyphicon glyphicon-sort" aria-hidden="true"></span> {{index+1}}</td>
                            <td align="center">{{item.navbarName}}</td>
                            <td align="center">{{item.statusCode==0?'停用':'启用中'}}</td>
                            <td align="center">
                                <div>
                                    <el-button type="primary" size="mini" @click.native.prevent="onEditPageNavbar(item)" v-if="item.statusCode==0">编辑</el-button>
                                    <el-button type="danger" size="mini" @click.native.prevent="onDelPageNavbar(item)" v-if="item.statusCode==0">删除</el-button>
                                    <el-button type="success" size="mini" @click.native.prevent="onSetStatusCode(item,1)" v-if="item.statusCode==0">启用</el-button>
                                    <el-button type="warning" size="mini" @click.native.prevent="onSetStatusCode(item,0)" v-if="item.statusCode==1">停用</el-button>
                                    <el-button type="primary" size="mini" @click.native.prevent="onEditDayPage(item)">首页配置</el-button>
                                </div>
                            </td>
                        </tr>
                    </draggable>
                </table>
            </div>
            <div class="_sub-body" v-show="showPageHome">
                <div class="_tree-header">
                    <h3>导航首页配置 [{{selectedNavbarName}}]</h3>
                    <div>
                    </div>
                </div>
                <!--pageType 页面类型 0 首页 1 导航 2 分类导航  自定义 后期扩展-->
                <day-home ref="dayHomeComm" :typeValue="selectedNavbarId" :pageType="1"></day-home>
            </div>
        </div>
    </div>
</template>
<script>
import draggable from 'vuedraggable'
import {
    queryPageNavbarList,
    addOrUpdatePageNavbar,
    deletePageNavbar,
    updatePageNavbarSortIndex
} from 'actions/activityAction'
import DayHome from '../day_home'

export default {
    components: {
        draggable,
        DayHome
    },
    computed: {
        cloudShowUrl() {
            return this.$store.getters.cloudShowUrl
        }
    },
    data() {
        return {
            saveSortIndexBtn: false,
            showPageHome:false,
            pageNavbarData: [],
            currentRow: null,
            selectedNavbarId:-1,
            selectedNavbarName:undefined
        }
    },
    methods: {
        onEditDayPage(item){
            this.selectedNavbarId=item.navbarId
            this.selectedNavbarName=item.navbarName
            this.showPageHome=true
            this.$nextTick(()=>{
                this.$refs.dayHomeComm.loadPageData() 
            })
        },
        onSavePageNavbarSortIndex() {
            let listJson = []
            _.each(this.pageNavbarData, (item, index) => {
                listJson.push({
                    'navbarId': item.navbarId,
                    'sortIndex': index + 1
                })
            })
            if (listJson.length === 0)
                return false
            let params = {
                'listJson':JSON.stringify(listJson)
            }
            this.$confirm('是否确认保存当前排序?', '提示', {
                type: 'warning'
            }).then(() => {
                updatePageNavbarSortIndex(params).then(data => {
                    const { success, msg, result } = data
                    if (success) {
                        this.$message.success('操作成功')
                        this.loadPageNavbarData()
                        this.saveSortIndexBtn=false
                    } else {
                        this.$message.error(msg)
                        return false
                    }
                })

            }).catch(() => {})
        },
        onDelPageNavbar(item) {
            let params = {
                'navbarId': item.navbarId
            }
            this.$confirm('是否确认删除?', '提示', {
                type: 'warning'
            }).then(() => {
                deletePageNavbar(params).then(data => {
                    const {
                        success,
                        msg,
                        result
                    } = data
                    if (success) {
                        this.$message.success('操作成功')
                        this.loadPageNavbarData()
                    } else {
                        this.$message.error(msg)
                        return false
                    }
                })

            }).catch(() => {})
        },
        onSetStatusCode(item, v) {
            let params = {
                'statusCode': v,
                'navbarId': item.navbarId
            }
            this.$confirm('是否确认提交?', '提示', {
                type: 'warning'
            }).then(() => {
                addOrUpdatePageNavbar(params).then(data => {
                    const {
                        success,
                        msg,
                        result
                    } = data
                    if (success) {
                        this.$message.success('操作成功')
                        this.loadPageNavbarData()
                    } else {
                        this.$message.error(msg)
                        return false
                    }
                })

            }).catch(() => {})
        },
        onAddPageNavbar() {
            this.$prompt('请输入导航名称', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputValidator(value) {
                    if (value == null || value == undefined || value.length === 0) {
                        return '导航名称不允许为空'
                    }
                }
            }).then(({
                value
            }) => {
                if (_.findIndex(this.pageNavbarData, {
                        'navbarName': value
                    }) !== -1) {
                    this.$message.error('导航名称已存在')
                    return false
                }
                let params = {
                    'navbarName': value,
                    'sortIndex': this.pageNavbarData.length + 1
                }
                addOrUpdatePageNavbar(params).then(data => {
                    const {
                        success,
                        msg,
                        result
                    } = data
                    if (success) {
                        this.$message.success('操作成功')
                        this.loadPageNavbarData()
                    } else {
                        this.$message.error(msg)
                        return false
                    }
                })
            }).catch(() => {

            });
        },
        onEditPageNavbar(item) {
            this.$prompt('请输入导航名称', '设置导航名称', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputValidator(value) {
                    if (value == null || value == undefined || value.length === 0) {
                        return '导航名称不允许为空'
                    }
                }
            }).then(({
                value
            }) => {
                if (_.findIndex(this.pageNavbarData, {
                        'navbarName': value
                    }) !== -1) {
                    this.$message.error('导航名称已存在')
                    return false
                }
                let params = {
                    'navbarName': value,
                    'navbarId': item.navbarId
                }
                addOrUpdatePageNavbar(params).then(data => {
                    const {
                        success,
                        msg,
                        result
                    } = data
                    if (success) {
                        this.$message.success('操作成功')
                        this.loadPageNavbarData()
                    } else {
                        this.$message.error(msg)
                        return false
                    }
                })
            }).catch(() => {

            });
        },
        loadPageNavbarData() {
            queryPageNavbarList().then(data => {
                this.pageNavbarData = data
            })
        }
    },
    created() {
        this.loadPageNavbarData()
    }
}
</script>
<style lang="sass">
</style>
