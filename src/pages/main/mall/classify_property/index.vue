<template>
    <div class="classify_property_index">
        <!-- 面包屑 -->
        <div class="_breadcrumb">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/mall' }">商城</el-breadcrumb-item>
                <el-breadcrumb-item>电商设置</el-breadcrumb-item>
                <el-breadcrumb-item>分类属性管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="_container">
            <component :is="curComponent"></component>
        </div>
    </div>
</template>
<script>
import classifyPropertyList from './classify_property_list'
export default {
    name: 'classify_property_index',
    components: {
        classifyPropertyList
    },
    data() {
        return {
            curComponent: 'classifyPropertyList',
            propertyObj: {
                classify: '',
                propertyName: ''
            }
        }
    }
}
</script>
