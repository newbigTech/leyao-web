<template>
    <div>
        <el-row :gutter="20">
            <el-col :span="5">
                <div class="grid-content bg-purple">
                    <classify-tree @nodeClick="nodeClick"></classify-tree>
                </div>
            </el-col>
            <el-col :span="12">
                <!-- <property-list :classify-id="classifyId" :prent-vm="prentVm"></property-list> -->
                <property-list :prent-vm="prentVm" @select-classify-row="selectClassifyRow"></property-list>
            </el-col>
            <el-col :span="7">
                <property-list-item :prent-vm="prentVm"></property-list-item>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import classifyTree from 'pages/main/mall/common/components/classify_tree'
import propertyList from './components/property_list'
import propertyListItem from './components/property_list_item'
export default {
    name: 'classify_property_list',
    components: {
        classifyTree,
        propertyList,
        propertyListItem
    },
    methods:{
        nodeClick(node){
            this.prentVm.$emit('load-classify', node)
            this.prentVm.$emit('load-classify-item', {})
        },
        selectClassifyRow(row){
          this.prentVm.$emit('load-classify-item', row)
        }
    },
    data() {
        return {
        	classifyId:0,
            classifyName:'',
            prentVm: new this.$root.constructor()
        }
    }
}
</script>
