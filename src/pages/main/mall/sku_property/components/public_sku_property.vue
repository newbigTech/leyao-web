<template>
    <div class="_container">
        <el-row :gutter="20">
            <el-col :span="9">
                <sku-property-list :vm="vm" :public-vm="publicVm"></sku-property-list>
            </el-col>
            <el-col :span="15">
                <sku-property-item-list :vm="vm" :public-vm="publicVm"></sku-property-item-list>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import SkuPropertyList from './sku_property_list'
import SkuPropertyItemList from './sku_property_items_list'
export default {
    name: 'public_sku_property',
    props: {
        vm: {
            type: Object
        }
    },
    components: {
        SkuPropertyList,
        SkuPropertyItemList
    },
    data() {
        return {
            publicVm: new this.$root.constructor()
        }
    },
    created() {
        if (this.vm) {
            this.vm.$on('load-public-tab', () => {
                this.publicVm.$emit('load-public-sku-property', {
                    classifyId: 0
                })
            })
        }

    }
}
</script>
