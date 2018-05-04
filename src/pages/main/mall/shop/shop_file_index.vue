<template>
  <div class="basic-user-setting">
    <!-- 导航面包屑 -->
    <div class="_breadcrumb">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/mall' }">商城</el-breadcrumb-item>
        <el-breadcrumb-item>{{secendTitle}}</el-breadcrumb-item>
        <el-breadcrumb-item>{{threeTitle}}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="_container">
      <div class="panel panel-default shop-img-lib panel-shop-tree">
        <div class="_left">
          <tree
            title="素材分类"
            :tree-data="treeData"
            @treeRename="treeRename"
            @treeAdd="treeAdd"
            @treeRemove="treeRemove"
            @treeClick="treeClick"
          >
            <button  slot="tree-header" class="btn btn-sm btn-default"  @click="queryAllShopFile" v-show="disAll" style="padding: 3px 10px;">全部素材</button>
            <div class="_tree-query" type="" size="mini" @click.stop="queryAllShopFile" v-show="disAll" slot="tree-body">
              <el-input v-model="classifyParam.classifyName" placeholder="素材分类名称" size="small"></el-input>
              <el-button type="" @click.native.prevent="onClassifySubmit" size="small">查询</el-button>
            </div>
          </tree>
        </div>
        <div class="_right">
          <div class="_setting-options" style="margin-bottom: 10px;">
            <div class="_setting-options-left">
            <el-form :inline="true" :model="fParam" class="demo-form-inline">
              <el-form-item>
                <el-input v-model="fParam.fileName" placeholder="素材名称"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="" @click.native.prevent="onSubmit">查询</el-button>
              </el-form-item>
            </el-form>
              </div>
              <div class="_setting-options-right">
                <!-- 2016/11/28<el-button type="success" @click.native="dialogFormVisible = true">上传</el-button>-->
                <el-upload ref="uploadfileComm" style="width:auto;" slot="prepend"  action="/pub/pubController/uploadFiles" :before-upload="beforeUpload" :show-upload-list="showUploadList" :on-success="onSuccessUpload" :accept="'image/*'" :multiple="true">
                  <el-button type="success">上传图片<i class="el-icon-upload el-icon--right"></i></el-button>
                </el-upload>
              </div>
            </div>
          <div class="source">
            <div class="all-choose">
              <el-checkbox v-model="allChecked" style="margin-top: 5px;"></el-checkbox>　全选<span style="padding-left: 15px">
              <transition name="slide-fade"><el-button v-show="ifDelete" type="danger" size="small" icon="delete" @click.native.prevent="allDelShopFile()"></el-button>
              </transition>
              <transition name="slide-fade"><el-button v-show="ifCheckedPic" type="warning" size="small" @click.native.prevent="setFileClassify()">设置分类</el-button>
              </transition>
              <transition name="slide-fade"><el-button v-show="ifCheckedPic" type="primary" size="small" icon="view" @click.native.prevent="viewShopFile()">预览</el-button>
              </transition></span>
            </div>
            <ul>
              <li v-for="(items, i) in shopFileListData" @click="onCheckBox(items)" :key="items.shopFileId" :class="{'li-checked': liChecked(items)}">
                <div class="source-file" style="width: 200px;">
                  <div class="imgBtn">
                    <span>
                      <el-checkbox-group v-model="checked">
                        <el-checkbox :label="items.shopFileId+''">&nbsp;</el-checkbox>
                      </el-checkbox-group>
                    </span>
                    <div class="li-img"></div>
                    <span>
                      <el-button type="danger" size="mini" icon="delete" @click.native.prevent="confirmDelShopFile(items.shopFileId)"></el-button>
                      <el-button type="success" size="mini" icon="edit" @click.native.prevent="updateFileName(items)" style="margin-left:0px;"></el-button>
                    </span>
                    <img :src="items.fileMd5 == 'undefined' ? '/static/images/default.jpg' : (cloudShowUrl+items.fileMd5)" v-show="imgLoaded" class="colorBorder" style="width:200px;height: 150px;" v-img-error @load="imgLoad(items)">  <!-- @click="clickBtn($event,items)"-->
                    <img src="/static/images/default.jpg" v-show="!imgLoaded" style="width:200px;height: 150px;">
                    <div style="position:absolute;bottom: 0px;left:0;background: rgba(0,0,0,0.5);right: 0;height:30px;color: #FFF;line-height: 30px;">{{items.strVal1}}</div>
                    <div :class="{imgSelected: liChecked(items)}"></div>
                  </div>
                  <div class="file-name">
                    <span style="width: 200px;display:block;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">{{items.fileName}}</span>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页 -->
          <div style="padding: 50px 0 40px 100px;clear: both;">
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="page"
              :page-sizes="[15, 20, 30, 40]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalSize">
            </el-pagination>
          </div>
        </div>
      </div>
      <!-- 设置文件分类 -->
      <el-dialog title="设置文件分类" v-model="dialogSetClassify" size="tiny">
          <div>
              <div class="grid-content bg-purple" style="border: 1px solid #EFF2F7;padding-bottom: 20px;">
                  <p class="shop-classify">商品分类：</p>
                  <ul id="classifyTree" class="ztree"></ul>
              </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click.native="confirmSetFileClassify">确 定</el-button>
            <el-button @click.native="dialogSetClassify = false">取 消</el-button>
          </span>
      </el-dialog>
      <!-- 素材预览 -->
      <el-dialog title="素材预览" v-model="dialogViewShopFile" @close="closeShopFile">
          <div>
              <div class="grid-content bg-purple">
                  <img :src="cloudShowUrl+thisShopFileUrl" />
              </div>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click.native="closeHere">关闭</el-button>
          </span>
      </el-dialog>
      <!-- 文件编辑名称 -->
      <el-dialog title="素材重命名" v-model="dialogFileReName" size="tiny">
          <div>
            <el-form ref="fileNameForm" :model="fileModel" :rules="fileRule" label-width="100px" style="width: 800px;">
              <div class="text item">
                    <el-form-item label="素材名称" prop="fileName" style="width:60%">
                        <el-input v-model="fileModel.fileName"></el-input>
                    </el-form-item>
              </div>
              <div style="margin-left:190px">
                    <el-button type="primary" @click.native="confirmSetFileName">确 定</el-button>
                    <el-button @click.native="dialogFileReName = false">取 消</el-button>
              </div>
            </el-form>          
          </div>
      </el-dialog>      
    </div>
  </div>
</template>
<style lang="sass">
  .imgSelected {
    width: 0;
    height: 0;
    border-top: 50px solid #20A0FF;
    border-left: 50px solid transparent;
    position: absolute;
    top: 0;
    right: 0
  }
  .li-img {
    width: 25px;
    text-align: right;
    display: block;
    position: absolute;
    top: 0;bottom: 0; right: 0;
    z-index: 2;
  }
  .bg-purple {
    img {
      width: 100%;
      height: 650px;
    }
  }
  .basic-user-setting {
    height: 100%;
  }
  #box {
    width: 18px;
    height: 18px;
    border: 1px solid #000;
    color: #0B61A4;
    opacity: 0.8;
    cursor: pointer;
  }
  .all-choose {
    padding-bottom: 5px;
    border-bottom: 2px solid #EFF2F7;
    height: 35px;
    .choose-t {
      width: 50px;
      line-height: 50px;
    }
  }
  .source ul {
    /*display: flex;
    justify-content: flex-start;*/

    li {
      margin: 10px 55px 10px 0;
      float:left;
      border-radius:5px;
      border: 2px solid #EFF2F7;
      position: relative;
      &:hover {
         border:2px solid #20A0FF;
         cursor: pointer;
         border-radius:5px;
       }
    }

    .li-checked {
      border:2px solid #20A0FF;
      border-radius:5px;
    }

  }
  .imgBtn {
    position:relative;
    width:200px;

    span{
      position: absolute;
      &:nth-child(0){
        left: 0;
       }
      &:nth-child(1){
         right: 0;
         top:-5px;
       }
    }

  }
  .file-name {
    text-align: center;
    padding: 5px 0;
  }


  .panel-shop-tree {
    padding-left: 3px;
    display: flex;
    ._tree-header {
      margin-left: -3px;
    }
    ._left {
      width: auto;
      border-right: 1px solid #ccc;
    }
    ._right {
      flex: 1;
      padding-left: 10px;
    }
    ._tree-query {
      display: flex;
      margin: 5px 5px 5px -8px;
      .el-input {
        margin-right: 5px;
      }
    }

  }
</style>
<script>
  import breadcrumb from "components/breadcrumb"
  import {_getMallShopFileClassifyZtree} from 'src/vuex/api/shopAPI'
  import _ from "lodash"
  import tree from "components/tree"
  import { _getMallShopFileClassfyTreeData,
           _getMallShopFileClassfyTreeDatas,
           _addMallShopFileClassfy,
           _updateMallShopFileClassfy,
           _deleteMallShopFileClassfy,
           _getMallShopFileData,
           _addMallShopFile,
           _updateMallShopFile,
           _updateBatchShopFileClassifyId,
           _updateShopFileName,
           _deleteMallShopFile} from 'src/vuex/api/shopAPI'

  export default {
    components: {
      breadcrumb,
      tree
    },
    data() {
      return {
        treeData:[],
        fParam:{},
        page :1,
        pageSize :15,
        totalSize: 100,
        shopFileListData:[],
        //dialogFormVisible:false,
        //dialogVisible: false,
        shopFileVo:{},
        fileNameAndMd5:'', // 文件上传
        currentFileClassifyId:0, // 素材分类 默认为0
        checked:[],
//        checkedCount:'',
//        allChecked:[],
        valueA:'',
        ifDelete:false,
        ifCheckedPic:false,
        // 预览路径
        thisShopFileUrl:'',
        fileList:[],
        fileListId: [],
        // 设置分类
        dialogSetClassify:false,
        setting: { //zTree配置
          view: {
            showIcon: false
          },
          check: {
            enable: true,
            chkStyle: "radio",
            radioType:"all",
          },
          data: {
            simpleData: {enable: true,idKey: "id",pIdKey: "parentId",}
          }
        },
        dialogViewShopFile:false ,
        // 上传列表
        showUploadList:false ,
        disAll:true,
        imgLoaded: false,

        fullscreenLoading:false,
        uploadIndex:0,
        uploadFileSize:0,

        // 标题
        secendTitle:'',
        threeTitle:'',
        // 分类查询
        classifyParam:{},

        dialogFileReName:false, // 素材重命名
        tempFileId:'',
        fileModel:{
          fileName:'',
        },

        fileRule: {
          fileName: [
            { required: true, message: '请输入素材名称', trigger: 'blur' },
            { type: 'string', min: 0, max: 50, message: '[素材名称]长度不能超过50' }
          ],
        },
      }
    },
    computed:{
      allChecked:{
        get: function() {
          //console.log(this.shopFileListData.length)
          if(this.shopFileListData.length != 0){
            return this.checkedCount == this.shopFileListData.length;
          }else{
            return false ;
          }

        },
        set: function (value) {

          if(value){
            this.fileList = [];
            this.checked = this.shopFileListData.map((items) => {
              this.fileList.push(items);
              return items.shopFileId+'';
            })
          }else {
            this.checked = [];
            this.fileList = []
          }
        }
      },
      checkedCount: {
        get: function() {
          if(this.checked.length > 0){
            this.ifCheckedPic = true ;
            this.ifDelete = true;
          }else{
            this.ifCheckedPic = false ;
            this.ifDelete = false;
          }
          return this.checked.length;
        }
      },
      cloudShowUrl() {
        return this.$store.getters.cloudShowUrl
      },
      loginType() {
        return this.$store.getters.loginType
      }
    },
    directives:{
      imgError: {
        inserted(el) {
          el.onerror = function () {
            this.src = '/static/images/default.jpg'
          }


        }
      }
    },
    methods: {
      /*clickBtn(e,row){
        let isCheck = $(e.target).parent().find('.el-checkbox__inner');
        //console.log($(e.target));
        isCheck.trigger('click');
        let cssChange = $(e.target).parent().parent().parent('li');
        !cssChange.hasClass('liBorder') ? cssChange.addClass('liBorder') : cssChange.removeClass('liBorder');

      },*/
      imgLoad(){
        this.imgLoaded = true
      },
      onCheckBox(items){
        let index = _.findIndex(this.fileList, {shopFileId: items.shopFileId})
        if (index > -1) {
          this.fileList.splice(index, 1)
          this.checked.splice(index, 1)
        } else {
          this.fileList.push(items)
          this.checked.push(items.shopFileId + '')
        }
      },
      liChecked(items) {
        return this.checked.indexOf(items.shopFileId + '') > -1
      },
      queryAllShopFile(){
        this.currentFileClassifyId = 0 ;
        this.loadFileData();
      },
      // 加载素材分类的数据
      loadFileTreeData(){
          _getMallShopFileClassfyTreeData(0).then((data) => {
            const {success,result}=data;
            this.treeData = result;
          })
      },
      // 加载素材的数据
      loadFileData(){
          this.fParam.pageNo = this.page;
          this.fParam.pageSize = this.pageSize;
          this.fParam.fileClassifyId = this.currentFileClassifyId;
          //console.log(JSON.stringify(this.fParam));
          _getMallShopFileData(this.fParam).then((data) => {
            const {success,result}=data;
            if(result.rows){
              this.shopFileListData = result.rows ;
              //console.log(this.shopFileListData)
              this.totalSize = result.total;
            }
          })
      },
      onSubmit() {
          this.fParam.pageNo = this.page;
          this.fParam.pageSize = this.pageSize;
          this.fParam.fileClassifyId = this.currentFileClassifyId ;
          _getMallShopFileData(this.fParam).then((data) => {
            const {success,result}=data;
            if(result.rows){
              this.shopFileListData = result.rows ;
              this.totalSize = result.total;
            }
          })
      },
      //删除文件
      confirmDelShopFile(shopFileId) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          type: 'warning'
        }).then(() => {
            _deleteMallShopFile(shopFileId).then((data) => {
              const {success,result}=data;
              //console.log(JSON.stringify(result));
              if(success){
                this.$message({type: 'success', message: '删除成功!' });
                this.loadFileData() ;
              }
            });

        }).catch(() => {
          this.$message({type: 'info',message: '已取消删除'});
        });
      },
      // 多选
      allDelShopFile(){
        let fileId = this.checked ;
        if(fileId.length <= 0){
          this.$message({type: 'warning',message: '请选择至少一项素材删除'});
          return ;
        }
        let shopFileIdStr = fileId.join(',') ;
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          type: 'warning'
        }).then(() => {
            _deleteMallShopFile(shopFileIdStr).then((data) => {
            const {success,result}=data;
            if(success){
              this.checked = [];
              $('.liStyle').removeClass('liBorder');
              this.$message({type: 'success', message: '删除成功!' });
              this.loadFileData() ;
            }
        });
        }).catch(() => {
            this.$message({type: 'info',message: '已取消删除'});
        });
      },
      // 设置文件分类
      setFileClassify(){
        this.dialogSetClassify = true ;
        // 加载分类树
        _getMallShopFileClassifyZtree().then(data => {
            //console.log(data)
            if(!data) return ;
            let treeData = data.result ;
            var treeObj = $.fn.zTree.init($("#classifyTree"), this.setting, treeData) ;
            treeObj.expandAll(true);
        })
      },
      confirmSetFileClassify(){ // 确认设置素材分类
        let treeObj = $.fn.zTree.getZTreeObj("classifyTree");
        let nodes = treeObj.getCheckedNodes(true);
        if(nodes.length <= 0){
          this.$message({type: 'warning', message: '请选择素材分类!' });
          return ;
        }
        let param = {
          fileClassifyId:nodes[0].id ,
          shopFileIdStr:this.checked.join(",")
        }
        _updateBatchShopFileClassifyId(param).then((data) => {
          const {success,result}=data;
          this.loadFileData() ;
          this.dialogSetClassify = false ;
        })
      },
      confirmSetFileName(){ // 确认设置素材名称
        this.$refs.fileNameForm.validate((valid) => {
          if (valid) {
            let param = {
              shopFileId:this.tempFileId,
              shopFileName:this.fileModel.fileName,
              fileNameSuffix:this.fileModel.fileNameSuffix,
            }
            //console.log(JSON.stringify(param))
            _updateShopFileName(param).then((data) => {
              const {success,result}=data;
              this.loadFileData() ;
              this.dialogFileReName = false ;
            })
          }
        })
      },      
      viewShopFile(){ // 预览
        let fileId = this.checked ;
        if(this.checked.length != 1){
          this.$message({type: 'warning', message: '只能选择一张素材预览' });
          this.checked = [];
          this.fileList = [] ;
          return ;
        }
        this.dialogViewShopFile = true;
        for(let i=0;i<this.shopFileListData.length ;i++){
          let item = this.shopFileListData[i] ;
          if(fileId[0] == item.shopFileId){
            this.thisShopFileUrl = item.fileMd5 ;
          }
        }
      },
      closeShopFile(){
         this.checked = [];
         this.fileList = [] ;
        // $('.liStyle').removeClass('liBorder');
      },
      closeHere(){
        this.dialogViewShopFile = false;
        this.checked = [];
        this.fileList = [] ;
        //this.checked = []; $('.liStyle').removeClass('liBorder')
      },
      beforeUpload(file) {
        this.fullscreenLoading=true
        return true
      },
      onSuccessUpload(response, file, fileList) {
        this.uploadFileSize=fileList.length
        if (response.success) {
          let shopFileObj = {
            fileName: file.name,
            fileMd5: response.result.picMD5,
            fileType: 0,//只能上传图片
            fileClassifyId: this.currentFileClassifyId,
            strVal1: response.result.resolution, //图片分辨率
          }
          //console.log(JSON.stringify(response.result))
          if(response.result.resolution && response.result.resolution.indexOf("*")!=-1){
          	shopFileObj.fileMd5 = shopFileObj.fileMd5+"?p="+response.result.resolution ;
          }
          //console.log(JSON.stringify(shopFileObj))
          _addMallShopFile(shopFileObj).then((data) => {
            const {success,result}=data;
            if (success) {
              this.uploadIndex++
              if(this.uploadIndex===this.uploadFileSize){
                  this.fullscreenLoading=false;
                  this.$message({message: '上传成功',type: 'success'});
                  this.uploadIndex=0
                  this.$refs.uploadfileComm.clearFiles()
                  this.page = 1 ;
                  this.fParam.fileName = ''
                  this.loadFileData();
              }
            }
          });
        }
      },
      // 分类查询
      onClassifySubmit(){
          _getMallShopFileClassfyTreeDatas(0,this.classifyParam.classifyName).then((data) => {
            const {success,result}=data;
            this.treeData = result;
          })
      },
      // 素材重命名
      updateFileName(item){
          this.tempFileId = item.shopFileId ;
          if(item.fileName){
            let _fileName = item.fileName ;
            this.fileModel.fileName = _fileName.substring(0,_fileName.lastIndexOf('.'));
            this.fileModel.fileNameSuffix = _fileName.substring(_fileName.lastIndexOf('.')+1);
            this.dialogFileReName = true ; 
          }
      },
      // 分页
      handleSizeChange(val) {
        this.pageSize = val ;
        this.loadFileData();
      },
      handleCurrentChange(val) {
        this.checked = [];
        this.fileList = []
        this.page = val ;
        this.loadFileData();
      },
      treeRename(args) {
        _updateMallShopFileClassfy(args).then((data) => {
          const {success,result}=data;
          this.loadFileTreeData();
        })
      },
      treeAdd(args) {
        _addMallShopFileClassfy(args).then((data) => {
          const {success,result}=data;
          this.loadFileTreeData();
        })
        this.$nextTick(function () {

          !!$('.gf ul') ? this.disAll = true : this.disAll = false;
        })
      },
      treeRemove(args) {
         _deleteMallShopFileClassfy(args.cid).then((data) => {
          const {success,result}=data;
          if(success){
            this.$message({type: 'success', message: '删除成功!' });
            this.loadFileTreeData() ;
          }
        })
        this.$nextTick(function () {

          !!$('.gf ul') ? this.disAll = true : this.disAll = false;
        })
      },
      treeClick(args) {
        // 隐藏按钮
        this.ifCheckedPic = false ;
        this.ifDelete = false;

        this.checked = [];
        this.fileList = []
        //console.log(this.allChecked)

        this.page = 1 ;
        this.fParam.fileClassifyId = args.cid ;
        // 当前分类Id
        this.currentFileClassifyId = args.cid ;
        this.loadFileData();
      },
      treeCheck(args) {
        console.log("treeCheck---", args)
      }
    },
    mounted() {
      this.loadFileData() ;
      this.loadFileTreeData() ;
    },
    created(){
      this.$nextTick(function () {
        $('.el-checkbox__label').hide();
        !!$('.gf ul') ? this.disAll = true : this.disAll = false;
      })

      if(this.loginType == 1){
        this.secendTitle = '电商设置';
        this.threeTitle = '平台素材管理'
      }else if(this.loginType == 2){
        this.secendTitle = '基础设置';
        this.threeTitle = '店铺素材管理'
      }
      //console.log('loginType',this.loginType)
    }


  }
</script>
