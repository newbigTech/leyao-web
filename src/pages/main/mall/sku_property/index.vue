<template>
    <div>
        <!-- 面包屑 -->
        <div class="_breadcrumb">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item :to="{ path: '/mall' }">商城</el-breadcrumb-item>
                <el-breadcrumb-item>电商设置</el-breadcrumb-item>
                <el-breadcrumb-item>分类规格管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-tabs type="card" @tab-click="handleClick" style="width: 100%">
            <el-tab-pane label="全局规格配置">
                <public-sku-property :vm="vm"></public-sku-property>
            </el-tab-pane>
            <el-tab-pane label="分类规格配置">
                <classify-sku-property :vm="vm"></classify-sku-property>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>
<script>
import PublicSkuProperty from './components/public_sku_property'
import ClassifySkuProperty from './components/classify_sku_property'
export default {
    name: 'sku_property_index',
    components: {
        PublicSkuProperty,
        ClassifySkuProperty
    },
    methods: {
        handleClick(tab) {
            if(tab.key==1){
                this.vm.$emit('load-public-tab')
            }else if(tab.key==2){
                this.vm.$emit('load-classify-tab')
            }
        }
    },
    data() {
        return {
            vm: new this.$root.constructor()
        }
    },
    mounted(){
        this.vm.$emit('load-public-tab')
    }
}
</script>
