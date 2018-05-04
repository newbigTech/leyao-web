

<template lang="html">

<div class="panel panel-default">
    <!-- Default panel contents -->
    <div class="panel-heading">商品分类列表</div>
    <div class="panel-body">
        <el-row :gutter="20">
            <el-col :span="8">
                <p>
                    <ul id="classifyTree" class="ztree"></ul>
                </p>
                <p><br/>
                <div>
                    <el-button type="primary" @click.native.prevent="handleSubmit">保存</el-button>
                    <el-button @click.native.prevent="$emit('forward','BrandList')">返回</el-button>
                </div>
                </p>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple">
                </div>
            </el-col>
            <el-col :span="8">
                <div class="grid-content bg-purple"></div>
            </el-col>
        </el-row>
    </div>
</div>

</template>

<script>
import {
  getBrandClassifyList,
  saveBrandClassify
}
from 'actions/mallBrandAction'
import {
  getClassifyList2zTree2
}
from 'actions/mallClassifyAction'
export default {
  name: 'brand_bind_classify',
  props: {
    paramObj: {
      type: Object,
      default: {}
    }
  },
  components: {},
  data() {
    return {
      classifyData: [],
      setting: { //zTree配置
        view: {
          showIcon: false
        },
        check: {
          enable: true
        },
        data: {
          simpleData: {
            enable: true,
            idKey: "classifyId",
            pIdKey: "parentId",
          }
        }
      }
    }
  },
  methods: {
    handleSubmit() {
      let treeObj = $.fn.zTree.getZTreeObj("classifyTree")
      let nodes = treeObj.getCheckedNodes(true)
      let classifyIds = []
      if (nodes.length > 0) {
        nodes.forEach(function(item) {
          classifyIds.push(item.classifyId)
        })
      }
      this.$confirm('是否确认提交?', '提示', {
        type: 'warning'
      }).then(() => {
        let params = {
          brandId: this.paramObj.brandId,
          classifyIds: classifyIds.join(',')
        }
        saveBrandClassify(params).then(data => {
          const {
            success,
            msg
          } = data
          if (success) {
            this.$message({
              type: 'success',
              message: '保存成功!'
            });
          } else {
            this.$message.error(msg);
          }
        })
      }).catch(() => {});
    }
  },
  created() {
    getClassifyList2zTree2({
      statusCode: 0
    }).then(treeData => {
      //  setTimeout(()=>{
      if (this.paramObj.brandId) {
        getBrandClassifyList(this.paramObj).then(data => {
          treeData.forEach(function(node) {
            data.forEach(function(item) {
              if (item.classifyId == node.classifyId) {
                node.checked = true
              }
            })
          })
          $.fn.zTree.init($("#classifyTree"), this.setting, treeData)
        })
      }
      //  },1000)
    })
  }
}
</script>
