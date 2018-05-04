

<template lang="html">

<div class="">
    <el-row :gutter="20">
        <el-col :span="8">
            <div class="grid-content bg-purple">
                <classify-tree @nodeClick="nodeClick"></classify-tree>
            </div>
        </el-col>
        <el-col :span="8">
            <div class="grid-content bg-purple">
                <el-form label-width="100px">
                    <el-form-item label="已关联分类">
                        <el-tag v-for="tag in classifyData" :closable="true" :key="tag" :close-transition="false" @close="removeTag(tag)" style="width:100%">
                            {{tag.label}}
                        </el-tag>
                        <!--<div v-for="(item, index) in classifyData">{{item.label}}</div>-->
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click.native.prevent="handleSubmit">保存</el-button>
                        <el-button @click.native.prevent="$emit('forward','BrandList')">返回</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-col>
        <el-col :span="8">
            <div class="grid-content bg-purple"></div>
        </el-col>
    </el-row>
</div>

</template>

<script>
import ClassifyTree from 'pages/main/mall/common/components/classify_tree'
import {
  getBrandClassifyList
}
from 'actions/mallBrandAction'
export default {
  name: 'brand_bind_classify',
  props: {
    paramObj: {
      type: Object,
      default: {}
    }
  },
  components: {
    ClassifyTree
  },
  data() {
    return {
      classifyData: []
    }
  },
  methods: {
    nodeClick(node) {
      if (node.children.length != 0) {
        return false
      }
    // if(!this.classifyData.some(x => x.id==node.id)){
    //    this.classifyData.push(node)
    // }
      // let f=true
      // this.classifyData.forEach(item=>{
      //   if(item.id===node.id){
      //     f=false
      //   }
      // })
      // if(f){
      //     this.classifyData.push(node)
      // }

    },
    removeTag(tag) {
      this.classifyData.$remove(tag);
    },
    handleSubmit() {}
  },
  created() {
    if (this.paramObj.brandId) {
      getBrandClassifyList(this.paramObj).then(data => {
        this.classifyData = data
      })
    }
  }
}
</script>
