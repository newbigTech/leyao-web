<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span style="line-height: 26px;">分类规格选项列表<label v-if="skuName">【{{skuName}}】</label></span>
                <el-button style="float: right;" type="primary" @click.native.prevent="openAddDialog" size="small" :disabled="disabledAddBtn">新增</el-button>
            </div>
            <div class="text item">
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="itemId" label="编号" width="90">
                    </el-table-column>
                    <el-table-column prop="itemName" label="选项值" width="100">
                    </el-table-column>
                    <el-table-column prop="itemFullName" label="选项值全称">
                    </el-table-column>
                    <el-table-column prop="sortIndex" label="排序">
                    </el-table-column>
                    <el-table-column inline-template label="操作">
                        <div>
                            <el-button size="small" type="primary" icon="edit" @click.native.prevent="onEdit(row)"></el-button>
                            <el-button size="small" type="danger" icon="delete" @click.native.prevent="onDelete(row)"></el-button>
                        </div>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
        <!--新增分类属性Dialog-->
        <el-dialog :title="addPropertyItemDialogTitle" v-model="addPropertyItemDialogForm">
            <el-form :model="skuPropertyItemObj" :rules="rules" ref="skuPropertyItemObj">
                <el-form-item label="选项值" :label-width="formLabelWidth" prop="itemName">
                    <el-input v-model="skuPropertyItemObj.itemName" auto-complete="off" style="width:50%" :maxlength="20"></el-input>
                </el-form-item>
                <el-form-item label="选项值全称" :label-width="formLabelWidth" prop="itemFullName">
                    <el-input v-model="skuPropertyItemObj.itemFullName" auto-complete="off" style="width:50%" :maxlength="50"></el-input>
                </el-form-item>
                <el-form-item label="排序" :label-width="formLabelWidth">
                    <el-input-number v-model="skuPropertyItemObj.sortIndex" :min="1" :max="100"></el-input-number>
                </el-form-item>
                <el-form-item label="选项图片" :label-width="formLabelWidth">
                    <el-upload action="/pub/pubController/uploadPic" :on-remove="onRemoveItemPic" :on-success="onSuccessItemPic" :accept="'image/*'" :multiple="false">
                        <img :src="itemPic" style="width: 100px;height:100px;" />
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="选项小图片" :label-width="formLabelWidth">
                    <el-upload action="/pub/pubController/uploadPic" :on-remove="onRemoveItemSPic" :on-success="onSuccessItemSPic" :accept="'image/*'" :multiple="false">
                        <img :src="itemSpic" style="width: 80px;height:80px;" />
                        <el-button size="small" type="primary">点击上传</el-button>
                        <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="备注" :label-width="formLabelWidth">
                    <el-input type="textarea" v-model="skuPropertyItemObj.comments" style="width:50%"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click.native.prevent="saveskuPropertyItemObj">确 定</el-button>
            <el-button @click.native.prevent="addPropertyItemDialogForm=false">取 消</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
import {
    getSkuPropertyItemList,
    addOrUpdateSkuPropertyItem,
    deleteSkuPropertyItem
} from 'actions/skuPropertyAction'
export default {
    name: 'sku_property_item_list',
    props: {
        vm: {
            type: Object
        },
        publicVm: {
            type: Object
        },
        classifyVm: {
            type: Object
        }
    },
    computed: {
        cloudShowUrl() {
            return this.$store.getters.cloudShowUrl
        }
    },
    data() {
        return {
            defaultPic: 'static/images/uploadPic.jpg',
            itemPic: 'static/images/uploadPic.jpg',
            itemSpic: 'static/images/uploadPic.jpg',
            skuId: 0,
            skuName:'',
            tableData: [],
            addPropertyItemDialogTitle: '新增分类规格选项',
            disabledAddBtn: true,
            addPropertyItemDialogForm: false,
            formLabelWidth: '20%',
            skuPropertyItemObj: {
                itemName: '',
                itemFullName: '',
                sortIndex: 1,
                itemPic: '',
                itemSPic: '',
                comments: ''
            },
            rules: {
                itemName: [{
                    required: true,
                    message: '请输入选项值',
                    trigger: 'blur'
                }],
                itemFullName: [{
                    required: true,
                    message: '请输入选项值全称',
                    trigger: 'blur'
                }]
            }
        }
    },
    methods: {
        onRemoveItemPic(file, fileList) {
            this.skuPropertyItemObj.itemPic = ''
            this.itemPic = this.defaultPic
        },
        onSuccessItemPic(response,file, fileList) {
            if (response.success) {
                this.skuPropertyItemObj.itemPic = response.result.picMD5
                this.itemPic = this.cloudShowUrl + response.result.picMD5
            }
        },
        onRemoveItemSPic(file, fileList) {
            this.skuPropertyItemObj.itemSPic = ''
            this.itemSpic = this.defaultPic
        },
        onSuccessItemSPic(response,file, fileList) {
            if (response.success) {
                this.skuPropertyItemObj.itemSPic = response.result.picMD5
                this.itemSpic = this.cloudShowUrl + response.result.picMD5
            }
        },
        openAddDialog() {
            this.itemPic = this.defaultPic
            this.itemSpic = this.defaultPic
            this.addPropertyItemDialogTitle = '新增分类规格选项'
            this.skuPropertyItemObj = {
                itemName: '',
                itemFullName: '',
                sortIndex: 1,
                itemPic: '',
                itemSPic: '',
                comments: ''
            }
            this.addPropertyItemDialogForm = true
        },
        onEdit(row) {
            this.addPropertyItemDialogTitle = '修改分类规格选项'
            this.skuPropertyItemObj.itemName = row.itemName
            this.skuPropertyItemObj.sortIndex = row.sortIndex
            this.skuPropertyItemObj.itemId = row.itemId
            this.skuPropertyItemObj.itemFullName = row.itemFullName
            this.skuPropertyItemObj.itemPic = row.itemPic
            this.skuPropertyItemObj.itemSPic = row.itemSPic
            if (row.itemPic) {
                this.itemPic = this.cloudShowUrl + row.itemPic
            }
            if (row.itemSPic) {
                this.itemSpic = this.cloudShowUrl + row.itemSPic
            }
            this.addPropertyItemDialogForm = true
        },
        onDelete(row) {
            this.skuPropertyItemObj.itemId = row.itemId
            deleteSkuPropertyItem(this.skuPropertyItemObj).then(data => {
                const {
                    result,
                    msg,
                    success
                } = data
                if (success) {
                    this.$message({
                        message: '操作成功',
                        type: 'success'
                    });
                    this.loadTableData()
                } else {
                    this.$message.error(msg);
                }
            })
        },
        loadTableData() {
            const params = {
                skuId: this.skuId
            };
            getSkuPropertyItemList(params).then(data => {
                const {
                    success,
                    result,
                    msg
                } = data
                if (success) {
                    this.tableData = result
                }
            })
        },
        saveskuPropertyItemObj() {
            this.$refs.skuPropertyItemObj.validate((valid) => {
                if (valid) {
                    this.skuPropertyItemObj.skuId = this.skuId
                    addOrUpdateSkuPropertyItem(this.skuPropertyItemObj).then(data => {
                        const {
                            result,
                            msg,
                            success
                        } = data
                        if (success) {
                            this.$message({
                                message: '操作成功',
                                type: 'success'
                            });
                            this.addPropertyItemDialogForm = false
                            this.loadTableData()
                        } else {
                            this.$message.error(msg);
                        }
                    })
                } else {
                    return false;
                }
            })
        }
    },
    created() {
        if (this.publicVm) {
            this.publicVm.$on('load-sku-property_item', params => {
                this.skuId = params.skuId
                if (this.skuId === 0) {
                    this.skuName=''
                    this.tableData = []
                    this.disabledAddBtn = true
                } else {
                    this.skuName=params.skuName
                    this.disabledAddBtn = false
                    this.loadTableData()
                }
            })
        }
        if (this.classifyVm) {
            this.classifyVm.$on('load-sku-property_item', params => {
                this.skuId = params.skuId
                if (this.skuId === 0) {
                    this.skuName=''
                    this.tableData = []
                    this.disabledAddBtn = true
                } else {
                    this.skuName=params.skuName
                    this.disabledAddBtn = false
                    this.loadTableData()
                }
            })
        }

    }
}
</script>
