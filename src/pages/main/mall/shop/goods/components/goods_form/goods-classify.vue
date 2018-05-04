<!-- 商品列表中点击sku商品弹出框 -->
<template>
   <div class="container-fluid">
        <el-dialog v-model="goodsClassifyDialog" @open="loadTableData" title="商品分类">
           <ul id="classTree" class="ztree" style="margin-top:0px; width:100%;padding-top: 15px;min-height: 300px;overflow: auto;"></ul>
           <!-- <div slot="footer" class="dialog-footer">
                <el-button @click="goodsClassifyDialog = false">取 消</el-button>
                <el-button type="primary" @click.stop.prevent="onSuccess">确 定</el-button>
            </div> -->
        </el-dialog>
    </div>
</template>
<script>
import {getShopClassifyData} from 'actions/goodsAction'
export default {
    name: 'goods_classify',
    props: {
        shopId: {
            type: Number,
            default: undefined
        },
    },
    data() {
        return {
            goodsClassifyDialog: false,

        }
    },
    methods: {
      onTreeClick(event, treeId, treeNode){
        this.goodsClassifyDialog=false
          this.$emit('onSuccess',treeNode)
      },
        loadTableData() {
             getShopClassifyData({shopId:this.shopId}).then(data => {
                let setting = { //zTree配置
                view: {
                    showIcon: false
                },
                check: {
                    enable: true,
                    //autoCheckTrigger: true,
                    chkStyle: "radio",
                    radioType: "all"
                },
                data: {
                    key: {
                        name: "classifyName"
                    },
                    simpleData: {
                        enable: true,
                        idKey: "classifyId",
                        pIdKey: "parentId",
                    }
                },
                callback: {
                    onClick: function(event, treeId, treeNode) {
                        treeObj.checkNode(treeNode, true, false, true);
                    },
                    onCheck: (event, treeId, treeNode) => this.onTreeClick(event, treeId, treeNode)
                }
            }
            let cData = data
            cData.forEach(function(item) {
                if (item.childNumber > 0) {
                    item.nocheck = true
                    item.open = true
                }
            })
            var treeObj = $.fn.zTree.init($("#classTree"), setting, cData);
            })
        }
    },
    created() {
        //console.log(this.shopId)
      this.loadTableData()
    }
}
</script>
