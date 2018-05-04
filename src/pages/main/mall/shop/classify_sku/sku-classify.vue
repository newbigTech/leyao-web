<template>
    <div class="_sku-classify">
        <div class="_container-wrapper">
            <!-- 商品分类树 -->
            <div class="menuContent well" style="margin:0;">
                <div class="page-header" style="margin:0;">
                    <!--  <el-alert title="操作提示" type="info" description="请选择您要创建的品类" show-icon :closable="false">
                            </el-alert> -->
                    <h1><i class="el-icon-share"></i> 品类</h1>
                </div>
                <!-- z-tree -->
                <!-- <div>
                    <div class="_z-tree-header">商品分类树</div>
                    <ul id="ztree_classifyTree"></ul>
                </div> -->
                <ul id="ztree_classifyTree" class="ztree" style="margin-top:0px; width:100%;padding-top: 15px;min-height: 690px;overflow: auto;"></ul>
            </div>
            <div class="_sub-body">
                <sku-list :e="e" name="sku_classify"></sku-list>
            </div>
        </div>
    </div>
</template>
<script>
import skuList from "./components/sku-list"
import {
    getShopClassifyList
} from 'actions/goodsAction'
export default {
    props: {
        e: {
            type: Object,
            default: () => {
                return {
                    $emit: () => {},
                    $on: () => {}
                }
            }
        },
    },
    components: {
        skuList
    },
    data() {
        return {
            treeData: [],
            zTreeObj: {},
            inited: false,
            classifyId: '',
            classifyName: '品类规格'
        }
    },
    methods: {
        // 配置z-tree
        initZtree() {
            let setting = { //zTree配置
                view: {
                    showIcon: false
                },
                check: {
                    enable: true,
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
                    onCheck: (event, treeId, treeNode) => this.treeClick(event, treeId, treeNode),
                }
            }
            var treeObj = $.fn.zTree.init($("#ztree_classifyTree"), setting, this.treeData);
            // let setting = {
            //     view: {
            //         showIcon: false
            //     },
            //     data: {
            //         simpleData: {
            //             enable: true,
            //             idKey: "classifyId",
            //             pIdKey: "parentId",
            //         }
            //     },
            //     callback: {
            //         onClick: (ev, id, node) => this.treeClick(ev, id, node),
            //     }
            // }

        },

        treeClick(ev, id, node) {
            // 父节点 return
            if (node.childNumber !== 0) {
                return this.e.$emit('sku-list' + 'sku_classify', {
                    disabledAddBtn: true,
                })
            }
            this.classifyId = node.classifyId
            this.classifyName = node.classifyName
            this.e.$emit('sku-list' + 'sku_classify', {
                disabledAddBtn: false,
                classifyId: node.classifyId,
                panelTitle: node.classifyName + '： 品类规格列表',
            })
        },
        // 获取分类树数据
        getTreeData() {
            getShopClassifyList().then(data => {
                this.treeData = data || []
                this.treeData.forEach(function(item) {
                    if (item.childNumber > 0) {
                        item.nocheck = true
                        item.open = true
                    }
                })
                this.initZtree()
            })
        },
    },
    created() {
        // 获取分类树数据
        this.getTreeData()
        this.e.$on('skuClassify', () => {
            if (this.inited) {
                this.e.$emit('sku-list' + 'sku_classify', {
                    disabledAddBtn: false,
                    inited: this.inited,
                    classifyId: this.classifyId==''?-999:this.classifyId,
                    panelTitle: this.classifyId==''?this.classifyName:this.classifyName + '： 品类规格列表',
                })
            } else {
                this.e.$emit('sku-list' + 'sku_classify', {
                    disabledAddBtn: true,
                    inited: this.inited
                })
                this.inited = true
            }
        })
    },
    mounted() {

    }

}
</script>
