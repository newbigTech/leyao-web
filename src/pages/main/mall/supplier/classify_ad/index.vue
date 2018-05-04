<template>
    <div class="ec-setting-classify-management">
        <!-- 导航面包屑 -->
        <div class="_breadcrumb">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item to="/mall">商城</el-breadcrumb-item>
                <el-breadcrumb-item>电商首页管理</el-breadcrumb-item>
                <el-breadcrumb-item>分类广告</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="_container-wrapper">
            <!-- 商品分类树 -->
            <div class="_sub-sidebar">
                <classifyTree :tree-data="treeData" label="name" id="classifyId" @treeClick="treeClick" :init-classify="classify_"></classifyTree>
            </div>
            <!-- 商品分类属性tabs -->
            <div class="_sub-body" v-show="showPageHome">
                <div class="_tree-header">
                    <h3>分类广告配置 [{{selectedClassifyName}}]</h3>
                    <div>
                    </div>
                </div>
                <!--pageType 页面类型 0 首页 1 导航 2 分类导航  自定义 后期扩展-->
                <day-home ref="dayHomeComm" :typeValue="selectedClassifyId" :pageType="2"></day-home>
            </div>
        </div>
    </div>
</template>
<script>
import classifyTree from "./classify-tree"
import DayHome from '../day_home'
import {
    _getClassifyList2zTree
} from 'api/goodsClassifyAPI'

import {
    toTree
} from "lib/utils/tree"

export default {
    components: {
        classifyTree,
        DayHome
    },
    data() {
        return {
            treeData: [],
            classify: {
                statusCode: 0,
                sortIndex: 1,
                parentId: 0,
                parentName: '顶级分类',
                classifySPic: '',
                classifyPic: ''
            },
            classify_: {},
            selectedClassifyId:-1,
            selectedClassifyName:'',
            showPageHome:false
        }
    },
    methods: {
        // 获取分类树数据
        getTreeData() {
            _getClassifyList2zTree({}).then(data => {
                if (data.length > 0) {
                    this.treeData = toTree(data, 'classifyId', 'parentId')
                        // 拿到初始id
                    let initId = this.treeData[0]['classifyId']
                } else {
                    this.treeData = []
                    this.classify = {}
                }
            })
        },
        treeClick(arg) {
          this.selectedClassifyId=arg.classifyId
          this.selectedClassifyName=arg.name
          this.showPageHome=true
          this.$nextTick(()=>{
              this.$refs.dayHomeComm.loadPageData() 
          })
        }
    },
    // 组件初始化
    created() {
        // 获取分类树数据
        this.getTreeData()
    }
}
</script>
<style lang="sass">
</style>
