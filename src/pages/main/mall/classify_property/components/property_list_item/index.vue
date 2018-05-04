<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span style="line-height: 26px;">分类属性选项列表<label v-if="propertyName">【{{propertyName}}】</label></span>
                <el-button style="float: right;" type="primary" @click.native.prevent="openAddDialog" size="small" :disabled="disabledAddBtn">新增</el-button>
            </div>
            <div class="text item">
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="itemName" label="选项名" width="150">
                    </el-table-column>
                    <el-table-column prop="sortIndex" label="排序">
                    </el-table-column>
                    <el-table-column inline-template label="操作" width="120">
                        <div>
                        <el-button size="small" type="primary" icon="edit" @click.native.prevent="onEdit(row)"></el-button>
                        <el-button size="small" type="danger" icon="delete" @click.native.prevent="onDelete(row)"></el-button>
                        </div>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
        <!--新增分类属性选项Dialog-->
        <el-dialog :title="addPropertyDialogTitle" v-model="addPropertyItemsDialogForm">
            <el-form :model="classifyPropertyItemsObj" :rules="rules" ref="classifyPropertyItemsObj">
                <el-form-item label="属性选项名" :label-width="formLabelWidth" prop="itemName">
                    <el-input v-model="classifyPropertyItemsObj.itemName" auto-complete="off" style="width:50%" :maxlength="20"></el-input>
                </el-form-item>
                <el-form-item label="属性选项全名" :label-width="formLabelWidth" prop="itemFullName">
                    <el-input v-model="classifyPropertyItemsObj.itemFullName" auto-complete="off" style="width:50%" :maxlength="50"></el-input>
                </el-form-item>
                </el-form-item>
                <el-form-item label="排序" :label-width="formLabelWidth">
                    <el-input-number v-model="classifyPropertyItemsObj.sortIndex" :min="1" :max="100"></el-input-number>
                </el-form-item>
                <el-form-item label="备注" :label-width="formLabelWidth">
                    <el-input type="textarea" v-model="classifyPropertyItemsObj.comments" style="width:50%"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click.native.prevent="saveClassifyItemsObj">确 定</el-button>
            <el-button @click.native.prevent="addPropertyItemsDialogForm=false">取 消</el-button>
        </span>
        </el-dialog>
    </div>
</template>
<script>
import {
    getPropertyItemsByPropertyId,
    addMallClassifyPropertyItems,
    deleteMallClassifyPropertyItems
} from 'actions/classifyPropertyItemsAction'
export default {
    name: 'property_list_item_index',
    components: {},
    props: {
        prentVm: {
            type: Object,
            default: () => {
                return {
                    $emit: () => {},
                    $on: () => {}
                }
            }
        }
    },
    data() {
        return {
            tableData: [],
            propertyId: '',
            propertyName: '',
            disabledAddBtn: true,
            addPropertyItemsDialogForm:false,
            addPropertyDialogTitle: '新增分类属性选项',
            formLabelWidth: '20%',
            classifyPropertyItemsObj: {
                itemName: '',
                itemFullName: '',
                sortIndex: 1,
                comments: ''
            },
            rules: {
                itemName: [{
                    required: true,
                    message: '请输入属性选项名',
                    trigger: 'blur'
                }],
                itemFullName: [{
                    required: true,
                    message: '请输入属性选项全名',
                    trigger: 'blur'
                }]
            }
        }
    },
    methods: {
        loadTableData() {
            getPropertyItemsByPropertyId({
                propertyId: this.propertyId
            }).then(data => {
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
        openAddDialog() {
            this.addPropertyDialogTitle = '新增分类属性选项'
            this.classifyPropertyItemsObj = {
                itemName: '',
                itemFullName: '',
                sortIndex: 1,
                comments: ''
            }
            this.addPropertyItemsDialogForm = true
        },
        onEdit(row){
            this.addPropertyDialogTitle = '修改分类属性选项'
            this.classifyPropertyItemsObj.itemId=row.itemId
            this.classifyPropertyItemsObj.itemName=row.itemName
            this.classifyPropertyItemsObj.itemFullName=row.itemFullName
            this.classifyPropertyItemsObj.sortIndex=row.sortIndex
            this.classifyPropertyItemsObj.comments=row.comments
            this.addPropertyItemsDialogForm = true
        },
        onDelete(row){
           this.classifyPropertyItemsObj.itemId=row.itemId
           deleteMallClassifyPropertyItems(this.classifyPropertyItemsObj).then(data=>{
                    const { result, msg, success } = data
                        if (success) {
                            this.$message({
                                message: '操作成功',
                                type: 'success'
                            });
                            this.loadTableData()
                        }else{
                             this.$message.error(msg);
                        }
          })
        },
        saveClassifyItemsObj(){
            this.$refs.classifyPropertyItemsObj.validate((valid) => {
                if (valid) {
                    this.classifyPropertyItemsObj.propertyId = this.propertyId
                    addMallClassifyPropertyItems(this.classifyPropertyItemsObj).then(data => {
                        const { result, msg, success } = data
                        if (success) {
                            this.$message({
                                message: '操作成功',
                                type: 'success'
                            });
                            this.addPropertyItemsDialogForm=false
                            this.loadTableData()
                        }else{
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
        this.prentVm.$on('load-classify-item', item => {
            if (item.propertyId) {
                this.disabledAddBtn = false
                this.propertyId = item.propertyId
                this.propertyName = item.propertyName
                this.loadTableData()
            } else {
                this.disabledAddBtn = true
                this.tableData=[]
                this.propertyId = ''
                this.propertyName = ''
            }
        })
    }
}
</script>
