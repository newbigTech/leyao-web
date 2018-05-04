<template>
    <div class="_container">
        <el-row :gutter="20">
            <el-col :span="5">
                <classify-tree @nodeClick="nodeClick"></classify-tree>
            </el-col>
            <el-col :span="9">
                <sku-property-list :vm="vm" :classify-vm="classifyVm"></sku-property-list>
            </el-col>
            <el-col :span="10">
                <sku-property-item-list :vm="vm" :classify-vm="classifyVm"></sku-property-item-list>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import ClassifyTree from 'pages/main/mall/common/components/classify_tree'
import SkuPropertyList from './sku_property_list'
import SkuPropertyItemList from './sku_property_items_list'
export default {
    name: 'classify_sku_property',
    props: {
        vm: {
            type: Object
        }
    },
    components: {
        SkuPropertyList,
        SkuPropertyItemList,
        ClassifyTree
    },
    methods: {
        nodeClick(node) {
            if (node.children.length == 0) {
                this.classifyVm.$emit('load-classify-sku-property', {
                    classifyId: node.id
                })
            } else {
                this.classifyVm.$emit('load-classify-sku-property', {
                    classifyId: undefined
                })
            }
            this.classifyVm.$emit('load-sku-property_item', {
                skuId: 0
            })
        }
    },
    data() {
        return {
            classifyVm: new this.$root.constructor()
        }
    },
    created() {
        if (this.vm) {
            this.vm.$on('load-classify-tab', () => {
                // this.classifyVm.$emit('load-classify-sku-property', {
                //     classifyId: undefined
                // })
            })
        }
    }
}
</script>
