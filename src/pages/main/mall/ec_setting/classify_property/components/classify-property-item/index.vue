<template>
  <div class="_classify-property-item">
    <card-panel>
      <h3 slot="title">分类属性列表项</h3>
      <div slot="panel-btns">
        <button class="btn btn-sm btn-success" @click="add">新增</button>
      </div>
      <div slot="panel-body">
        <table class="table table-bordered table-hover center">
          <tbody>
            <tr> <td>选项名</td> <td>排序</td> <td> 操作 </td></tr>
            <tr v-show="!tableData.length"><td colspan="20">暂无数据</td></tr>
            <tr v-for="(m, i) in tableData">
              <td>{{m.itemName}}</td>
              <td>{{m.sortIndex}}</td>
              <td width="15%">
                <button class="btn btn-xs btn-warning" @click="edit(m)">编辑</button>
                <button class="btn btn-xs btn-danger" @click="remove(m)">删除</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </card-panel>

    <!--新增分类属性选项Dialog-->
    <el-dialog :title="dialogTitle" v-model="showDialog">
      <el-form :model="model" :rules="rules" ref="model">
        <el-form-item label="属性选项名" :label-width="formLabelWidth" prop="itemName">
            <el-input v-model="model.itemName" auto-complete="off" style="width:50%" :maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="属性选项全名" :label-width="formLabelWidth" prop="itemFullName">
            <el-input v-model="model.itemFullName" auto-complete="off" style="width:50%" :maxlength="50"></el-input>
        </el-form-item>
        </el-form-item>
        <el-form-item label="排序" :label-width="formLabelWidth">
            <el-input-number v-model="model.sortIndex" :min="1" :max="100" style="display: block;"></el-input-number>
        </el-form-item>
        <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input type="textarea" v-model="model.comments" style="width:50%" :maxlength="200"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click.native.prevent="save">确 定</el-button>
        <el-button @click.native.prevent="showDialog = false">取 消</el-button>
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
      id: {
        type: Number,
        default: 0,
      }
    },
    data() {
      return {
        model: {
          itemName: '',
          itemFullName: '',
          sortIndex: 1,
          comments: ''
        },
        tableData: [],
        propertyId: '',
        showDialog: false,
        dialogTitle: '新增分类属性选项',
        formLabelWidth: '20%',
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
      // 
      loadTableData() {
        return getPropertyItemsByPropertyId({propertyId: this.propertyId })
        .then(data => {
          const { success, result, msg } = data
          if (success) { this.tableData = result }
        })
      },
      // 增
      add() {
        this.dialogTitle = '新增分类属性选项'
        this.model = {
          itemName: '',
          itemFullName: '',
          sortIndex: 1,
          comments: ''
        }
        this.showDialog = true
      },
      // 改
      edit(row){
        this.dialogTitle = '修改分类属性选项'
        this.model.itemId=row.itemId
        this.model.itemName=row.itemName
        this.model.itemFullName=row.itemFullName
        this.model.sortIndex=row.sortIndex
        this.model.comments=row.comments
        this.showDialog = true
      },
      // 删
      remove(row){
        this.$confirm(`确定删除此分类属性项: ${row.itemName} ?`, '', { type: 'warning'})
        .then(data => {
          this.model.itemId=row.itemId
          deleteMallClassifyPropertyItems(this.model).then(data=>{
            const { result, msg, success } = data
            if (success) {
              this.$message.success('操作成功')
              this.loadTableData()
            }else{
              this.$message.error(msg);
            }
          })
        })
        .catch(data => {})
      },
      // 存
      save() {
        this.$refs.model.validate((valid) => {
          if (valid) {
            this.model.propertyId = this.propertyId
            addMallClassifyPropertyItems(this.model).then(data => {
              const { result, msg, success } = data
              if (success) {
                this.$message.success('操作成功')
                this.showDialog = false
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
      // console.log('load-classify-item', this.id)
      this.e.$on('load-classify-item' + this.id, item => {
        // console.log("load-classify-item", item.propertyId)
        this.propertyId = item.propertyId
        this.propertyName = item.propertyName
        this.loadTableData().then(data => this.e.$emit('load-classify-item-done', item.propertyId))
      })
    }
  }
</script>
