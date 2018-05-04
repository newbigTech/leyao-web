<template>
  <div class="_classify-property-item">
    <card-panel>
      <h3 slot="title">分类规格选项列表</h3>
      <div slot="panel-btns">
        <button class="btn btn-sm btn-success" @click="add">新增</button>
      </div>
      <div slot="panel-table">
        <table class="table table-bordered table-hover center">
          <tbody>
            <tr> <td>编号</td> <td>选项值</td> <td> 选项值全称</td> <td>排序</td> <td>操作</td></tr>
            <tr v-show="!tableData.length"><td colspan="20">暂无数据</td></tr>
            <tr v-for="(r, i) in tableData">
              <td>{{r.itemId}}</td>
              <td>{{r.itemName}}</td>
              <td>{{r.itemFullName}}</td>
              <td>{{r.sortIndex}}</td>
              <td width="15%">
                <button class="btn btn-xs btn-warning" @click="edit(r)">编辑</button>
                <button class="btn btn-xs btn-danger" @click="remove(r)">删除</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </card-panel>

    <!--新增规格属性选项Dialog-->
    <el-dialog :title="dialogTitle" v-model="dialogShow">
      <el-form :model="skuItem" :rules="rules" ref="skuItem">
        <el-form-item label="选项值" :label-width="formLabelWidth" prop="itemName" style="text-align: left;">
            <el-input v-model="skuItem.itemName" auto-complete="off" style="width:50%" :maxlength="20"></el-input>
        </el-form-item>
        <el-form-item label="选项值全称" :label-width="formLabelWidth" prop="itemFullName" style="text-align: left;">
            <el-input v-model="skuItem.itemFullName" auto-complete="off" style="width:50%" :maxlength="50"></el-input>
        </el-form-item>
        <el-form-item label="排序" :label-width="formLabelWidth">
            <el-input-number v-model="skuItem.sortIndex" :min="1" :max="100" style="display: block;"></el-input-number>
        </el-form-item>

        <el-form-item label="选项图片" :label-width="formLabelWidth">
          <div class="_img-groups">
              <div class="_img-groups-container">
                <!-- 分组大图 -->
                <div class="_img-group">
                  <div class="_img-box" @click="openShopFileDialog(1)">
                    <div class="_img-box-icon"><i class="el-icon-upload"></i></div>
                    <div class="_img-box-text">选择/上传图片</div>
                    <div class="_img-box-view" v-show="!!skuItem.itemPic && (skuItem.itemPic.length > 1)">
                      <img :src="cloudShowUrl+skuItem.itemPic">
                      <div class="_img-box-view-mask">
                        <!-- <span>更改图片</span> -->
                        <button class="btn btn-xs btn-warning">更换</button>
                        <button class="btn btn-xs btn-danger" @click.stop.prevent="skuItem.itemPic='';">移除</button>
                      </div>
                    </div>
                  </div>
                  <div class="_img-group-text">规格大图</div>
                </div>
                <!-- 分组小图 -->
                <div class="_img-group">
                  <div class="_img-box" @click="openShopFileDialog(2)">
                    <div class="_img-box-icon"><i class="el-icon-upload"></i></div>
                    <div class="_img-box-text">选择/上传图片</div>
                    <div class="_img-box-view" v-show="!!skuItem.itemSPic && (skuItem.itemSPic.length > 1)">
                      <img :src="cloudShowUrl+skuItem.itemSPic">
                      <div class="_img-box-view-mask">
                        <!-- <span>更改图片</span> -->
                        <button class="btn btn-xs btn-warning">更换</button>
                        <button class="btn btn-xs btn-danger" @click.stop.prevent="skuItem.itemSPic='';">移除</button>
                      </div>
                    </div>
                  </div>
                  <div class="_img-group-text">规格小图</div>
                </div>
              </div>
              <!-- <div class="_img-groups-info"> <p>图片大小不能超过500kb,格式只能为jpg,png,gif</p> </div> -->
            </div>
        </el-form-item>


        <el-form-item label="备注" :label-width="formLabelWidth" style="text-align: left;">
            <el-input type="textarea" v-model="skuItem.comments" style="width:50%"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click.native.prevent="save">确 定</el-button>
        <el-button @click.native.prevent="dialogShow = false">取 消</el-button>
      </span>
    </el-dialog>
     <!--商品图库Dialog-->
   <el-dialog title="图库" v-model="shopFileDialog" class="shop-img-file-dialog">
      <shop-file @onSuccess="getShopFile" ref="shopFileComm"></shop-file>
   </el-dialog>
  </div>
</template>

<script>
  import {
      getSkuPropertyItemList,
      addOrUpdateSkuPropertyItem,
      deleteSkuPropertyItem
  } from 'actions/skuPropertyAction'
  import prettysize from "lib/utils/prettysize"
  import ShopFile from 'pages/main/mall/common/components/shop_file'
  export default {
    components:{ShopFile},
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
    computed: {
        cloudShowUrl() {
            return this.$store.getters.cloudShowUrl
        }
    },
    data() {
      return {
        shopFileDialog:false,
        curDailogIndex:1,
        tableData: [],
        skuId: 0,
        skuItem: {
          itemName: '',
          itemFullName: '',
          sortIndex: 1,
          itemPic: '',
          itemSPic: '',
          comments: ''
        },
        previewPic: "",
        previewPic2: "",
        loading: 0,
        loading2: 0,
        picMD5_0: '',
        picMD5_1: '',
        dialogShow: false,
        dialogTitle: '新增分类规格选项',
        formLabelWidth: '20%',
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
        },
      }
    },
    methods: {
      loadTableData() {
        let params = { skuId: this.skuId }
        return getSkuPropertyItemList(params).then(data => {
            const {success, result, msg } = data
            if (success) {
              this.tableData = result
              // this.$forceUpdate()

              // this.tableData = []
              // // this.$nextTick(() => this.tableData = result )
              // setTimeout(() => this.tableData = result, 5000)
              // console.log('data.result', this.tableData)
            }
        })
      },

      // 增
      add() {
        this.dialogTitle = '新增分类规格选项'
        this.skuItem = {
          itemName: '',
          itemFullName: '',
          sortIndex: 1,
          itemPic: '',
          itemSPic: '',
          comments: ''
        }
        this.dialogShow = true
      },
      // 改
      edit(row){
        this.dialogTitle = '修改分类规格选项'
        this.skuItem.itemName = row.itemName
        this.skuItem.sortIndex = row.sortIndex
        this.skuItem.itemId = row.itemId
        this.skuItem.itemFullName = row.itemFullName
        this.skuItem.itemPic = row.itemPic
        this.skuItem.itemSPic = row.itemSPic
        if (row.itemPic) {
            this.itemPic = this.cloudShowUrl + row.itemPic
        }
        if (row.itemSPic) {
            this.itemSpic = this.cloudShowUrl + row.itemSPic
        }
        this.dialogShow = true
      },
      // 删
      remove(row){
        this.$confirm(`确定删除此规格选项: ${row.itemName} ?`, '', { type: 'warning'})
        .then(data => {
          this.skuItem.itemId = row.itemId
          deleteSkuPropertyItem(this.skuItem).then(data => {
              const { result, msg, success } = data
              if (success) {
                  this.$message.success('操作成功');
                  this.loadTableData()
              } else {
                this.$message.error(msg);
              }
          })
        })
        .catch(data => {})
      },
      // 存
      save() {
        // return console.log("skuitem: ", this.skuItem, this.skuId)
        this.$refs.skuItem.validate((valid) => {
          if (valid) {
            this.skuItem.skuId = this.skuId
            addOrUpdateSkuPropertyItem(this.skuItem).then(data => {
                const { result, msg, success } = data
                if (success) {
                  this.$message.success('操作成功!')
                  this.dialogShow = false
                  this.loadTableData()
                } else {
                  this.$message.error(msg || '操作失败!');
                }
            })
          } else {
            return false;
          }
        })
      },
      openShopFileDialog(v) {
            this.curDailogIndex=v
            this.shopFileDialog = true
            setTimeout(()=>{this.$refs.shopFileComm.onLoadData()},0)
            //this.tab5vm.$emit('on-load')
        },
      getShopFile(shopFiles) {
            if (shopFiles.length == 0) {
              this.shopFileDialog = false
              return false
            }
            if (shopFiles.length > 1) {
              this.$message.error('只能选择一张图片')
              return false
            } else {
              this.shopFileDialog = false
              if(this.curDailogIndex===1){
                //this.classifyPic = this.cloudShowUrl + shopFiles[0].fileMd5
                this.skuItem.itemPic = shopFiles[0].fileMd5
              }else{
                //this.classifySPic = this.cloudShowUrl + shopFiles[0].fileMd5
                this.skuItem.itemSPic = shopFiles[0].fileMd5
              }   
            }
      }
    },
    created() {
      // console.log('load-classify-item-created', this.id)

      // 保证创建一次事件回调 小hack
      // if (this.e._events['load-sku-item' + this.id]) return
      // 注意每次都是新的实例,但是事件依然还是由之前的实例创建,这不行

      // 每次创建删除之间的事件
      this.e.$off('load-sku-item' + this.id)

      this.e.$on('load-sku-item' + this.id, item => {
        // console.log("load-sku-item", item.skuId)
        this.skuId = item.skuId
        this.skuName = item.skuName
        this.loadTableData().then(data => this.e.$emit('load-sku-item-done', item.skuId))
      })
    }
  }
</script>
