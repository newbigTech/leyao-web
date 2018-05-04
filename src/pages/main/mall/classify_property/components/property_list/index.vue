<template>
    <div>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span style="line-height: 26px;">分类属性列表</span>
                <el-button style="float: right;" type="primary" @click.native.prevent="openAddDialog" size="small" :disabled="disabledAddBtn">新增</el-button>
            </div>
            <div class="text item">
                <el-table :data="tableData" style="width: 100%">
                    <el-table-column prop="propertyName" label="属性名" width="150">
                    </el-table-column>
                    <el-table-column prop="propertyType" inline-template label="类型">
                        <div>{{row.propertyType == 0 ? '文本' : (row.propertyType == 1?'单选':'多选')}}</div>
                    </el-table-column>
                    <el-table-column prop="isRequired" inline-template label="必填">
                    <div>{{row.propertyType == 0 ? '否' : '是'}}</div>
                    </el-table-column>
                    <el-table-column prop="sortIndex" label="排序">
                    </el-table-column>
                    <el-table-column inline-template label="操作" width="150">
                        <div>
                        <el-button size="small" type="primary" icon="edit" @click.native.prevent="onEdit(row)"></el-button>
                        <el-button size="small" type="danger" icon="delete" @click.native.prevent="onDelete(row)"></el-button>
                        <el-button size="small" type="info" icon="setting" @click.native.prevent="onLoadItems(row)"></el-button>
                        </div>
                    </el-table-column>
                </el-table>
            </div>
            <!-- 分页 -->
            <div class="_pagination">
                <el-pagination :total="total" :page-size="pageSize" layout="total, sizes, prev, pager, next" @current-change="handleCurrentChange" @size-change="handleSizeChange">
                </el-pagination>
            </div>
        </el-card>
        <!--新增分类属性Dialog-->
        <el-dialog :title="addPropertyDialogTitle" v-model="addPropertyDialogForm">
            <el-form :model="classifyPropertyObj" :rules="rules" ref="classifyPropertyObj">
                <el-form-item label="属性名" :label-width="formLabelWidth" prop="propertyName">
                    <el-input v-model="classifyPropertyObj.propertyName" auto-complete="off" style="width:50%" :maxlength="20"></el-input>
                </el-form-item>
                <el-form-item label="属性类型" :label-width="formLabelWidth">
                    <el-select v-model="classifyPropertyObj.propertyType" style="width:50%">
                        <el-option label="文本" :value="0"></el-option>
                        <el-option label="单选" :value="1"></el-option>
                        <el-option label="多选" :value="2"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="是否必选" :label-width="formLabelWidth">
                    <el-radio-group v-model="classifyPropertyObj.isRequired">
                        <el-radio :label="0">否</el-radio>
                        <el-radio :label="1">是</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="排序" :label-width="formLabelWidth">
                    <el-input-number v-model="classifyPropertyObj.sortIndex" :min="1" :max="100"></el-input-number>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click.native.prevent="saveClassifyObj">确 定</el-button>
            <el-button @click.native.prevent="addPropertyDialogForm=false">取 消</el-button>
            
        </span>
        </el-dialog>
    </div>
</template>
<script>
import {
    getClassifyPropertyPageList,
    addMallClassifyProperty,
    deleteMallClassifyProperty
} from 'actions/classifyPropertyAction'
export default {
    name: 'property_list_index',
    components: {},
    props: {
        // classifyId: {
        //     type: Number,
        //     required: true
        // },
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
            classifyId: 0,
            tableData: [],
            page: 1,
            pageSize: 10,
            total: 0,
            addPropertyDialogTitle:'新增分类属性',
            disabledAddBtn: true,
            addPropertyDialogForm: false,
            formLabelWidth: '20%',
            classifyPropertyObj: {
                propertyName: '',
                propertyType: 0,
                isRequired: 0,
                sortIndex: 1
            },
            rules: {
                propertyName: [{
                    required: true,
                    message: '请输入属性名',
                    trigger: 'blur'
                }],
                propertyType: [{
                    required: true,
                    message: '请选择属性类型',
                    trigger: 'change'
                }]
            }
        }
    },
    methods: {
        openAddDialog(){
            this.addPropertyDialogTitle='新增分类属性'
            this.classifyPropertyObj={
                propertyName: '',
                propertyType: 0,
                isRequired: 0,
                sortIndex: 1
            }
            this.addPropertyDialogForm = true
        },
        onEdit(row){
            this.addPropertyDialogTitle='修改分类属性'
            this.classifyPropertyObj.propertyName=row.propertyName
            this.classifyPropertyObj.propertyType=row.propertyType
            this.classifyPropertyObj.isRequired=row.isRequired
            this.classifyPropertyObj.sortIndex=row.sortIndex
            this.classifyPropertyObj.propertyId=row.propertyId
            this.addPropertyDialogForm = true
        },
        onDelete(row){
          this.classifyPropertyObj.propertyId=row.propertyId
          deleteMallClassifyProperty(this.classifyPropertyObj).then(data=>{
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
        loadTableData() {
            const params = {
                pageNo: this.page,
                pageSize: this.pageSize,
                classifyId: this.classifyId
            };
            getClassifyPropertyPageList(params).then(data => {
                const { success, result, msg } = data
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
        saveClassifyObj() {
            this.$refs.classifyPropertyObj.validate((valid) => {
                if (valid) {
                    this.classifyPropertyObj.classifyId = this.classifyId
                    addMallClassifyProperty(this.classifyPropertyObj).then(data => {
                        const { result, msg, success } = data
                        if (success) {
                            this.$message({
                                message: '操作成功',
                                type: 'success'
                            });
                            this.addPropertyDialogForm=false
                            this.loadTableData()
                        }else{
                             this.$message.error(msg);
                        }
                    })
                } else {
                    return false;
                }
            })
        },
        onLoadItems(row){
            this.$emit('select-classify-row',row)
        }
    },
    created() {
        //this.loadTableData()
        this.prentVm.$on('load-classify', node => {
            this.classifyId = node.id
            if (node.children.length == 0) {
                this.disabledAddBtn = false
                this.loadTableData()
            } else {
                this.disabledAddBtn = true
                this.tableData = []
            }
        })
    }
}
</script>
