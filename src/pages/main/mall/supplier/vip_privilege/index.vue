<template lang="html">
    <div>
        <!-- 导航面包屑 -->
        <div class="_breadcrumb">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/mall' }">商城</el-breadcrumb-item>
                <el-breadcrumb-item>会员等级</el-breadcrumb-item>
                <el-breadcrumb-item>会员特权设置</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <component :is="curComponent" :paramObj="paramObj" @forward="forward"></component>
    </div>
</template>
<script>
import PrivilegeList from './list'
import PrivilegeForm from './form'
export default {
    name: 'supplier_day_subject',
    components: {
        PrivilegeList,
        PrivilegeForm
    },
    data() {
        return {
            curComponent: 'PrivilegeList',
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
