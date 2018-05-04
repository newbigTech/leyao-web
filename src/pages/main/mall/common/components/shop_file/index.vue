<template lang="html">
    <div class="panel panel-default shop-img-lib" style="margin-top: -10px;" v-loading.body="fullscreenLoading">
        <div class="panel-heading" style="height: 50px;">
            <el-input placeholder="搜索商品图库" v-model="paramsObj.fileName" style="width: 250px;">
                <el-button slot="append" icon="search" type="primary" @click.native.prevent="loadTableData"></el-button>
            </el-input>
            <el-button type="primary" @click.native.prevent="loadTableData" style="margin-left: 55%; margin-right: 10px;">刷新</el-button>
            <el-upload ref="uploadfileComm" style="width:auto;" slot="prepend" action="/pub/pubController/uploadFiles" :before-upload="beforeUpload" :show-upload-list="showUploadList" :on-success="onSuccessUpload" :accept="'image/*'" :multiple="true">
                <el-button type="success">上传图片<i class="el-icon-upload el-icon--right"></i></el-button>
            </el-upload>
        </div>
        <div class="panel-body flex" style="padding: 0;">
            <div class="img-lib-tree" style="width: 218px; border-right: 1px solid #ddd;">
                <ul class="ztree fileClassifyTree"></ul>
            </div>
            <div class="img-lib-list flex-item" style="min-height: 300px; padding: 15px 0; width: 740px;">
                <!-- 图片列表 -->
                <ul class="clearfix ul-img-list">
                    <li style="position:relative;" class="li-img" v-for="(item, index) in tableData" @click="onCheckBox($event,item)" :key="item.shopFileId" :class="{'li-checked': liChecked(item)}" :title="item.fileName">
                        <div class="li-img-wrapper" style="width:130px; height: 130px;"><img :src="cloudShowUrl+item.fileMd5"></div>
                        <div class="li-img-checked">
                            <div class="li-img-checked-mask"></div>
                            <el-checkbox v-model="checkFileListId" :label="item.shopFileId + ''" style="position: absolute;top: -1px;"><span></span></el-checkbox>
                        </div>
                        <div style="position:absolute;bottom: 20px;left:0;background: rgba(0,0,0,0.5);right: 0;height:30px;color: #FFF;line-height: 30px; font-size: 13px;">{{item.strVal1}}</div><!-- {{item.fileName}} -->
                        <div :class="{'_img-selected' : liChecked(item)}"></div>
                        <div style="padding: 0 3px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; text-align: left;">{{item.fileName}}</div>
                    </li>
                </ul>
                <!-- 分页 -->
                <div class="_pagination" style="border: 1px solid transparent;">
                    <el-pagination :total="total" :page-size="pageSize" layout="total, sizes, prev, pager, next" @current-change="handleCurrentChange" @size-change="handleSizeChange" :page-sizes="pageSizes">
                    </el-pagination>
                </div>
            </div>
        </div>
        <div class="panel-footer clearfix">
            <el-button type="primary" @click.native.prevent="onOK" style="float: right;">确认</el-button>
        </div>
    </div>
</template>
<style lang="sass">
._img-selected {
    width: 0;
    height: 0;
    border-top: 40px solid #20A0FF;
    border-right: 40px solid transparent;
    position: absolute;
    top: 0;
    left: 0
}

.img-lib-list {
    ul.ul-img-list {
        margin-left: 16px;
    }
    ul.ul-img-list li.li-img {
        position: relative;
        width: 135px;
        // height: 130px;
        float: left;
        margin: 0 10px 10px 0;
        padding: 1px;
        border: 2px solid #ddd;
        cursor: pointer;
        text-align: center;
        &:hover {
            border: 2px solid #20A0FF;
        }
        &.li-checked {
            border: 2px solid #20A0FF;
        }
        .li-img-wrapper {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
        }
        img {
            max-height: 100%;
            max-width: 100%;
            height: auto;
            width: auto;
        }
        .li-img-checked,
        .li-img-checked-mask {
            text-align: left;
            display: block;
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            z-index: 2;
        }
    }
}
</style>
<script>
import {
    getShopFileClassifyList,
    getMallShopFileData,
    addMallShopFile
} from 'actions/shopAction'
import _ from "lodash"
export default {
    name: 'shop_file_index',
    props: {
        vm: {
            type: Object,
        }
    },
    computed: {
        cloudShowUrl() {
            return this.$store.getters.cloudShowUrl
        },
    },
    data() {
        return {
            page: 1,
            pageSize: 15,
            pageSizes:[15,20,30,50,100],
            total: 0,
            tableData: [],
            checkFileList: [],
            checkFileListId: [],
            showUploadList: false,
            fullscreenLoading:false,
            uploadIndex:0,
            uploadFileSize:0,
            paramsObj: {
                fileName: '',
                fileType: 0, //0 图片 1 音频 2 视频 这里只查询图片资源,
                fileClassifyId: 0
            },
            result: null
        }
    },
    methods: {
        onOK() {
            this.$emit('onSuccess', this.checkFileList)
        },
        onCheckBox(e, item) {
            let index = _.findIndex(this.checkFileList, {
                shopFileId: item.shopFileId
            })
            if (index > -1) {
                this.checkFileList.splice(index, 1)
                this.checkFileListId.splice(index, 1)
            } else {
                this.checkFileList.push(item)
                this.checkFileListId.push(item.shopFileId + '')
            }
        },

        liChecked(item) {
            return this.checkFileListId.indexOf(item.shopFileId + '') > -1
        },
        loadTableData() {
            this.paramsObj.pageNo = this.page
            this.paramsObj.pageSize = this.pageSize
                // let l = this.$loading({text:'正在加载...'})
            getMallShopFileData(this.paramsObj).then(data => {
                // l.close()
                const {
                    success,
                    msg,
                    result
                } = data
                if (success) {
                    this.tableData = result.rows
                    this.total = result.total
                }
            })
        },
        handleSizeChange(val) {
            this.pageSize = val
            this.loadTableData()
        },
        handleCurrentChange(val) {
            this.page = val
            this.loadTableData()
        },
        zTreeOnClick(event, treeId, treeNode) {
            if (treeNode.fileClassifyId === -1) {
                this.paramsObj.fileClassifyId = 0
            } else {
                this.paramsObj.fileClassifyId = treeNode.fileClassifyId
            }
            this.loadTableData()
        },
        beforeUpload(file) {
            //console.log('beforeUpload=>',file)
            this.fullscreenLoading=true
            return true
        },
        onSuccessUpload(response, file, fileList) {
            this.uploadFileSize=fileList.length
            if (response.success) {
                let shopFileObj = {
                    fileName: file.name,
                    fileMd5: response.result.picMD5,
                    fileType: 0, //只能上传图片
                    fileClassifyId: this.paramsObj.fileClassifyId,
                    strVal1: response.result.resolution, //图片分辨率
                }
                if(response.result.resolution&&response.result.resolution.indexOf('*')!==-1){
                    shopFileObj.fileMd5=shopFileObj.fileMd5+"?p="+response.result.resolution
                }
                addMallShopFile(shopFileObj).then(data => {
                    this.fullscreenLoading=false
                    const { success, result } = data
                    if (success) {
                        this.uploadIndex++
                        if(this.uploadIndex===this.uploadFileSize){
                           this.$message({
                             message: '上传成功',
                             type: 'success'
                            });
                            this.uploadIndex=0
                            this.$refs.uploadfileComm.clearFiles()
                            this.loadTableData()
                        }
                    }
                })
            }
        },
        loadTree(domTree) {
            let setting = { //zTree配置
                treeId: "_001",
                view: {
                    showIcon: false
                },
                data: {
                    key: {
                        name: "classifyName"
                    },
                    simpleData: {
                        enable: true,
                        idKey: "fileClassifyId",
                        pIdKey: "parentId",
                    }
                },
                callback: {
                    onClick: this.zTreeOnClick
                }
            }
            if (this.result) {
              $.fn.zTree.destroy("_001")
              $.fn.zTree.init(domTree, setting, this.result)
              return
            }
            getShopFileClassifyList().then(data => {
                const { success, msg, result } = data
                result.unshift({
                    "fileClassifyId": -1,
                    "parentId": 0,
                    "classifyName": "未分组"
                })
                if (success && result.length > 0) {
                    this.result = result
                    $.fn.zTree.destroy("_001")
                    $.fn.zTree.init(domTree, setting, result)
                }
            })
        },
        onLoadData(){
            this.checkFileList = []
            this.checkFileListId = []
            this.tableData = []
            this.loadTableData()
        }
    },
    mounted() {
        console.log('mounted')
        let domTree = $(this.$el.querySelector('.fileClassifyTree'))
        this.loadTree(domTree)
        this.loadTableData()
        if (this.vm) {
            this.vm.$on('on-load', () => {
                this.loadTree(domTree)
                this.checkFileList = []
                this.checkFileListId = []
                this.tableData = []
                this.loadTableData()
            })
        }
    }
}
</script>
