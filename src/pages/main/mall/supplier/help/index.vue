<template>
    <div class="ec-setting-classify-management">
        <!-- 导航面包屑 -->
        <div class="_breadcrumb">
            <el-breadcrumb separator=">">
                <el-breadcrumb-item to="/mall">商城</el-breadcrumb-item>
                <el-breadcrumb-item>电商设置</el-breadcrumb-item>
                <el-breadcrumb-item>帮助中心管理</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <!-- body -->
        <div class="_container-wrapper">
            <div class="_sub-sidebar">
                <div class="_tree-header">
                    <h3>帮助分类</h3>
                    <div>
                        <button class="btn btn-sm btn-success" style="padding: 3px 10px;" @click="addClassify" :disabled="curClassify.parentId!=0">新增</button>
                        <button class="btn btn-sm btn-info" style="padding: 3px 10px;" @click="editClassify" :disabled="!curClassify.classifyId">修改</button>
                        <button class="btn btn-sm btn-danger" style="padding: 3px 10px;" :disabled="!curClassify.classifyId" @click="removeClassify">删除</button>
                    </div>
                </div>
                <el-tree :data="treeData" :props="defaultProps" :highlight-current="true" :default-expand-all="true" @node-click="handleNodeClick"></el-tree>
            </div>
            <div class="_sub-body">
               <div class="_tree-header">
                    <h3>帮助内容列表</h3>
                    <div>
                        <button class="btn btn-sm btn-success" style="padding: 3px 10px;" @click="addContent" :disabled="curClassify.parentId==0">新增</button>
                    </div>
                </div>
                <div v-show="helpContentData.length===0">无帮助内容</div>
                <el-collapse>
                  <el-collapse-item v-for="item in helpContentData">
                  <template slot="title">
                    {{item.helpTitle}}<span style="float: right;padding-right: 20px;">
                    <button class="btn btn-sm btn-info" style="padding: 3px 10px;" @click="editContent(item)">修改</button>
                    <button class="btn btn-sm btn-danger" style="padding: 3px 10px;" @click="delContent(item)">删除</button></span>
                  </template>
                    <div>{{item.helpContent}}</div>
                    <div> <ul class="flex"><li v-for="imgmd5 in item.imgList"><img width="80px" height="80px" :src="cloudShowUrl+imgmd5"></li></ul></div>
                  </el-collapse-item>
                </el-collapse>
            </div>
        </div>
        <!--新增分组Dialog-->
        <el-dialog :title="helpClassifyObj.classifyId==''?'新增分类':'修改分类'" v-model="classifyDialog">
            <el-form :model="helpClassifyObj" :rules="rules" ref="helpClassifyObj">
                <el-form-item label="分类名称" :label-width="formLabelWidth" prop="classifyName">
                    <el-input v-model="helpClassifyObj.classifyName" auto-complete="off" :maxlength="10" style="width:50%"></el-input>
                </el-form-item>
                <el-form-item label="所属分类" :label-width="formLabelWidth" v-show="helpClassifyObj.classifyId==''">
                    <el-select v-model="helpClassifyObj.parentId">
                        <el-option v-for="item in selectedData" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="排序" :label-width="formLabelWidth">
                    <el-input-number v-model="helpClassifyObj.sortIndex" :min="1" :max="100"></el-input-number>
                </el-form-item>
                <el-form-item label="分类图片" :label-width="formLabelWidth">
                            <div class="_classify-uploader">
                                <div class="_upload-select" @click="openShopFileDialog(1)">
                                    <div class="_upload-select-box" style="width:80px;height:80px;">
                                        <div class="_upload-select-icon"><i class="el-icon-upload"></i></div>
                                        <div class="_upload-select-text">点击上传</div>
                                        <div class="_upload-select-preview" v-show="helpClassifyObj.strVal1">
                                        <div @click.stop.prevent="onDelIMG" style="position: absolute;right: 0;top:-10px;z-index:99"><i class="el-icon-circle-close"></i></div>
                                            <img :src="helpClassifyObj.strVal1 ? ((cloudShowUrl + helpClassifyObj.strVal1)) : ''">
                                            <div class="_upload-select-cover"> <span>点击更换图片</span> </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click.native.prevent="saveClassify">确 定</el-button>
            <el-button @click.native.prevent="classifyDialog = false">取 消</el-button>
          </span>
        </el-dialog>

        <!--新增分组内容Dialog-->
        <el-dialog :title="helpContentObj.contentId==''?'新增帮助':'修改帮助'" v-model="contentDialog">
            <el-form :model="helpContentObj" :rules="crules" ref="helpContentObj">
                <el-form-item label="帮助标题" :label-width="formLabelWidth" prop="helpTitle">
                    <el-input v-model="helpContentObj.helpTitle" auto-complete="off" :maxlength="100" style="width:50%"></el-input>
                </el-form-item>
                <el-form-item label="排序" :label-width="formLabelWidth">
                    <el-input-number v-model="helpContentObj.sortIndex" :min="1" :max="100"></el-input-number>
                </el-form-item>
                <el-form-item label="帮助解答" :label-width="formLabelWidth">
                    <el-input type="textarea" :rows="3" :maxlength="2000" placeholder="请输入内容" v-model="helpContentObj.helpContent"> </el-input>
                </el-form-item>
                <el-form-item label="帮助图片" :label-width="formLabelWidth">
                  <ul class="flex">
                    <draggable :list="imgList" class="flex">
                    <li v-for="(imgmd5, index) in imgList" style="position: relative;margin-left: 15px;">
                      <img width="80px" height="80px" :src="cloudShowUrl+imgmd5">
                      <div @click="removeImg(index)" style="position: absolute;right: 0;top:-10px;"><i class="el-icon-circle-close"></i></div>
                    </li>
                    </draggable>
                    <li @click="openShopFileDialog(0)" style="margin-left: 15px;width: 80px; height: 80px; border: 1px solid #c0ccda;font-size: 30px; cursor: pointer; color: #99A9BF;" class="flex-vhc"><i class="el-icon-plus"></i></li>
                  </ul>

                   <!--  <ul class="flex"><li v-for="imgmd5 in imgList"><img width="80px" height="80px" :src="cloudShowUrl+imgmd5"></li><li @click="openShopFileDialog"> <i class="el-icon-plus"></i> </li><li><el-button type="primary" @click="openShopFileDialog">添加图片</el-button></li></ul> -->
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click.native.prevent="saveContent">确 定</el-button>
            <el-button @click.native.prevent="contentDialog = false">取 消</el-button>
          </span>
        </el-dialog>
         <!--商品图库Dialog-->
         <el-dialog title="图库" v-model="shopFileDialog" class="shop-img-file-dialog">
            <shop-file @onSuccess="getShopFile" ref="shopFileComm"></shop-file>
         </el-dialog>
    </div>
</template>
<script>
import draggable from 'vuedraggable'
import { toTree } from "lib/utils/tree"
import ShopFile from 'pages/main/mall/common/components/shop_file'
import {
    queryHelpClassifyList,
    addOrUpdateHelpClassify,
    deleteHelpClassify,
    queryHelpContentList,
    addOrUpdateHelpContent,
    deleteHelpContent
} from 'actions/helpAction'
export default {
    components:{ShopFile,draggable},
    computed: {
        cloudShowUrl() {
            return this.$store.getters.cloudShowUrl
        }
    },
    data() {
            return {
                classifyDialogTitle: '新增分组',
                classifyDialog: false,
                curClassify: {
                    parentId: 0
                },
                helpClassifyObj: {
                    parentId: 0,
                    classifyId: '',
                    classifyName: '',
                    sortIndex: 1,
                    strVal1:'' //分类图片
                },
                formLabelWidth: '100px',
                treeData: [],
                selectedData: [],
                defaultProps: {
                    children: 'children',
                    label: 'classifyName'
                },
                // 表单验证
                rules: {
                    classifyName: [{
                        required: true,
                        message: '请输入分类名',
                        trigger: 'blur'
                    }]
                },
                // 表单验证
                crules: {
                    helpTitle: [{
                        required: true,
                        message: '请输入帮助标题',
                        trigger: 'blur'
                    }],
                    helpContent: [{
                        required: true,
                        message: '请输入帮助解答',
                        trigger: 'blur'
                    }]
                },
                contentDialog:false,
                helpContentObj:{
                  contentId:'',
                  sortIndex:1,
                  helpTitle:'',
                  helpContent:'',
                  helpPics:''
                },
                helpContentData:[],
                imgList:[],
                shopFileDialog:false,
                shopFileIndex: 0
            }
        },
        methods: {
            onDelIMG(){
                this.helpClassifyObj.strVal1=''
            },
            openShopFileDialog(i){
               this.shopFileIndex = i
               this.shopFileDialog = true
               setTimeout(()=>{this.$refs.shopFileComm.onLoadData()},0)
            },
            getShopFile(shopFiles) {
              if (shopFiles.length == 0) {
                this.shopFileDialog = false
                return false
              }
              if (this.shopFileIndex === 0){
                 if (this.imgList.length+shopFiles.length >= 6) {
                    this.$message.error('最多只能添加5张图片')
                    return false
                  } else {
                      shopFiles.forEach(item=>{
                      if(!this.imgList.some(imgmd5=>imgmd5===item.fileMd5)){
                        this.imgList.unshift(item.fileMd5)
                      }
                    })
                    this.shopFileDialog = false
                  }
              }else{
                if (shopFiles.length >1) {
                    this.$message.error('最多只能添加1张图片')
                    return false
                  } else {
                      this.shopFileDialog = false
                      this.helpClassifyObj.strVal1=shopFiles[0].fileMd5
                  }
              }
            },
            // 获取分类树数据
            getTreeData() {
                queryHelpClassifyList().then(data => {
                    if (data.length > 0) {
                        this.treeData = toTree(data, 'classifyId', 'parentId')
                            //console.log('this.treeData', JSON.parse(JSON.stringify(this.treeData)))
                    }
                })
            },
            // 保存分类信息
            saveClassify() {
                this.$refs.helpClassifyObj.validate((valid) => {
                    if (valid) {
                        addOrUpdateHelpClassify(this.helpClassifyObj).then(data => {
                            const { result, msg, success } = data
                            if (success) {
                                this.$message({
                                    message: '操作成功',
                                    type: 'success'
                                });
                                this.classifyDialog = false
                                this.getTreeData()
                            } else {
                                this.$message.error(msg);
                            }
                        })
                    } else {
                        return false;
                    }
                })
            },
            // 新增分类
            addClassify() {
                this.classifyDialog = true
                this.helpClassifyObj = {
                    parentId: 0,
                    classifyId: '',
                    classifyName: '',
                    sortIndex: 1,
                    strVal1:''
                }
                this.selectedData = [{
                    label: '顶层分类',
                    value: 0
                }]
                if (this.curClassify.classifyId) {
                    this.helpClassifyObj.parentId = this.curClassify.classifyId
                    this.selectedData.push({
                        label: this.curClassify.classifyName,
                        value: this.curClassify.classifyId
                    })
                }
            },
            editClassify() {
                if (!this.curClassify.classifyId) return false
                this.classifyDialog = true
                this.helpClassifyObj = {
                    classifyId: this.curClassify.classifyId,
                    classifyName: this.curClassify.classifyName,
                    sortIndex: this.curClassify.sortIndex,
                    strVal1:this.curClassify.strVal1
                }
            },
            // 删除分类
            removeClassify() {
                if (!this.curClassify.classifyId) return false
                if(this.curClassify.children.length>0){
                  this.$message.warning('不允许直接删除父节点')
                  return false
                }
                this.$confirm('确定删除此分类?', '', {
                        type: 'warning'
                    })
                    .then(() => {
                        deleteHelpClassify(this.curClassify).then(data => {
                            const { result, msg, success } = data
                            if (success) {
                                this.$message({
                                    message: '操作成功',
                                    type: 'success'
                                });
                                this.curClassify = {
                                        parentId: 0
                                    },
                                this.getTreeData()
                            } else {
                                this.$message.error(msg);
                            }
                        })
                    })
                    .catch(() => {})
            },
            handleNodeClick(data) {
                this.curClassify = data
                if(data.parentId!==0){
                  this.loadHelpContentListData()
                }else{
                  this.helpContentData=[]
                }
            },
            loadHelpContentListData(){
              let params={classifyId:this.curClassify.classifyId}
              queryHelpContentList(params).then(data=>{
                _.forEach(data,(item)=>{
                  if(item.helpPics&&item.helpPics.length>0){
                   item.imgList=item.helpPics.split(',')
                   }
                })
                this.helpContentData=data
             })
            },
            addContent(){
              this.contentDialog = true
              this.imgList=[]
              this.helpContentObj={
                  classifyId:this.curClassify.classifyId,
                  contentId:'',
                  sortIndex:1,
                  helpTitle:'',
                  helpContent:'',
                  helpPics:''
                }
            },
            saveContent(){
              if(this.imgList.length>0){
                this.helpContentObj.helpPics=this.imgList.join(',')
              }
              addOrUpdateHelpContent(this.helpContentObj).then(data=>{
                const { result, msg, success } = data
                    if (success) {
                           this.$message({
                                    message: '操作成功',
                                    type: 'success'
                            });
                        this.contentDialog = false
                        this.loadHelpContentListData()
                      } else {
                         this.$message.error(msg);
                      }
              })
            },
            editContent(row){
              this.contentDialog = true
              this.imgList=[]
              if(row.helpPics&&row.helpPics.length>0){
                this.imgList=row.helpPics.split(',')
              }
              this.helpContentObj=row
            },
            removeImg(index){
              this.imgList.splice(index, 1)
            },
            delContent(row){
              this.$confirm('确定删除此帮助?', '', {
                        type: 'warning'
                    })
                    .then(() => {
                        deleteHelpContent(row).then(data => {
                            const { result, msg, success } = data
                            if (success) {
                                this.$message({
                                    message: '操作成功',
                                    type: 'success'
                                });
                                 this.loadHelpContentListData()
                            } else {
                                this.$message.error(msg);
                            }
                        })
                    })
                    .catch(() => {})
            }
        },
        created() {
            this.getTreeData()
        }
}
</script>
<style lang="sass">
</style>
