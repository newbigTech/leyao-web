<template lang="html">
    <div>
        <!-- 导航面包屑 -->
        <div class="_breadcrumb">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/mall' }">商城</el-breadcrumb-item>
                <el-breadcrumb-item>电商首页管理</el-breadcrumb-item>
                <el-breadcrumb-item>分类专题</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <component :is="curComponent" :paramObj="paramObj" @forward="forward"></component>
    </div>
</template>
<script>
import DaySubjectList from './day_subject_list'
import DaySubjectForm from './day_subject_form'
export default {
    name: 'supplier_day_subject',
    components: {
        DaySubjectList,
        DaySubjectForm
    },
    data() {
        return {
            curComponent: 'DaySubjectList',
            paramObj: {},
        }
    },
    methods: {
        forward(comp, row) {
            this.curComponent = comp
            this.paramObj = row || {}
        }
    },
    created() {
    }
}
</script>
<style lang="sass">

</style>
