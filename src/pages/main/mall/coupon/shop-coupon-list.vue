<template>
  <div class="_container">
    <card-panel class="">
      <h3 slot="title">优惠券列表</h3>
      <div slot="panel-body">
        <div class="_setting-bar">
          <div class="_query-form">
            <div class="_query-form-item">
              <el-form :inline="true" :model="couponsParam">
                <el-form-item> 
                  <el-input v-model="couponsParam.couponsName" placeholder="优惠券名称"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-select v-model="couponsParam.fetchWay" placeholder="发行方式" clearable>
                    <!-- <el-option label="全部" value=""></el-option> -->
                    <el-option label="推送" value="0"></el-option>
                    <el-option label="充值赠送" value="1"></el-option>
                    <el-option label="领取" value="2"></el-option>
                    <el-option label="奖品" value="3"></el-option>
                  </el-select>  
                </el-form-item> 
                <el-form-item>
                  <el-select v-model="couponsParam.couponsType" placeholder="优惠券类型" clearable>
                    <!-- <el-option label="全部" value=""></el-option> -->
                    <el-option label="现金券" value="0"></el-option>
                    <el-option label="折扣券" value="1"></el-option>
                  </el-select>  
                </el-form-item>             
                <el-form-item>
                  <el-select v-model="couponsParam.couponsLimit" placeholder="使用范围" clearable>
                    <!-- <el-option label="全部" value=""></el-option> -->
                    <el-option label="全店铺优惠" value="0"></el-option>
                    <el-option label="商品分类优惠" value="1"></el-option>
                    <el-option label="商品优惠" value="2"></el-option>
                  </el-select>  
                </el-form-item>                    
              </el-form>
            </div>
            <div class="_query-form-btn">
              <el-button type="" @click.native.prevent="onSubmit">查询</el-button>
            </div>
          </div>
          <div class="_actions-btn">
            <el-button type="primary" @click.native="$emit('forward', 'couponsAdd')">新增</el-button>
            <el-button type="primary" @click.native="pushCouponsMain">二维码</el-button>
          </div>
        </div>
        <el-tabs :active-name="activeName" style="width:100%" @tab-click="onTabClick">
              <el-tab-pane label="启用" name="tab1"></el-tab-pane>
              <el-tab-pane label="停用" name="tab2"></el-tab-pane>
              <el-tab-pane label="已删除" name="tab3"></el-tab-pane>
        </el-tabs>
        <!-- table data -->
        <div class="_table-list">
          <el-table
            :data="mallCouponsDataList"
            selection-mode="multiple"
            stripe
            border
            @selectionchange="handleMultipleSelectionChange">
            <el-table-column align="center" type="index" width="70"></el-table-column>
            <el-table-column align="center" property="couponsName" label="优惠券名称" min-width="150"> </el-table-column>
            <el-table-column align="center" inline-template label="发行方式" width="100"> 
              <div>
                <span v-if="row.fetchWay == 0">推送</span>
                <span v-if="row.fetchWay == 1">充值赠送</span>
                <span v-if="row.fetchWay == 2">领取</span>
                <span v-if="row.fetchWay == 3">奖品</span>
              </div>
            </el-table-column>
            <el-table-column align="center" inline-template label="限领数量" width="100">
              <div>{{row.getLimit == 0 ? '无限制' : row.getLimit}}</div>
            </el-table-column>            
            <el-table-column align="center" inline-template label="优惠券类型/折扣" width="170">
              <div>{{row.couponsType == 0 ? '现金券' : '折扣券'}}-{{row.couponsValStr}}</div>
            </el-table-column>
            <el-table-column align="center" inline-template label="发行/领取/使用" width="150">
              <div>
                <span v-if="row.couponsNumber == 0">无</span>
                <span v-if="row.couponsNumber > 0">{{row.couponsNumber}}</span>
                /
                <a @click="$emit('forward', 'shopCouponsItemList', row, 0)">{{row.getNumber}}</a>
                /
                <a @click="$emit('forward', 'shopCouponsItemList', row, 1)">{{row.useNumber}}</a>
              </div>
            </el-table-column>
            <el-table-column align="center" property="couponsLimitPrice" label="最低消费(元)" width="120"> </el-table-column>
            <el-table-column align="center" inline-template label="使用范围" width="130">
              <div>
                <span v-if="row.couponsLimit == 0">全店铺优惠</span>
                <span v-if="row.couponsLimit == 1">
                    <a @click="viewConponsClassify(row)">商品分类优惠</a>
                </span>
                <span v-if="row.couponsLimit == 2">
                  <a @click="$emit('forward', 'couponsGoodsDetail', row)">商品优惠</span>
              </div>
            </el-table-column>
            <el-table-column align="center" inline-template label="有效期" width="320">
              <div>
                <span v-if="row.dayLimit == 0">{{row.beginDay}} ~ {{row.endDay}}</span>
                <span v-if="row.dayLimit == 1">{{row.dayNumber}}天</span>
              </div>
            </el-table-column>
            <!-- <el-table-column align="center" inline-template label="状态" width="80">
              <div>
                <span v-if="row.statusCode == 0">已停用</span>
                <span v-if="row.statusCode == 1">已启用</span>
              </div>
            </el-table-column> -->

            <el-table-column align="center" inline-template label="操作" width="300">
              <div>
                <el-button type="primary" size="mini" 
                           :disabled="!(row.statusCode == 1 && row.deleteFlag == 0 && row.fetchWay==0 && row.couponsNumber-row.getNumber > 0)"
                           @click.native.prevent="$emit('forward', 'couponsPushUser', row)">推送</el-button>            
                <el-button type="warning" size="mini" 
                           :disabled="!(row.statusCode == 0 && row.deleteFlag == 0)"
                           @click.native.prevent="$emit('forward', 'couponsAdd', row)">编辑</el-button>
                <el-button type="success" size="mini"
                           @click.native.prevent="startUseCoupons(row.couponsId)" 
                           :disabled="!(row.statusCode == 0 && row.deleteFlag == 0)">启用</el-button>
                <el-button type="warning" size="mini"
                           @click.native.prevent="stopUseCoupons(row.couponsId)"
                           :disabled="!(row.statusCode == 1 && row.deleteFlag == 0)">停用</el-button>
                <el-button type="info" size="mini"
                           @click.native.prevent="$emit('forward', 'shopCouponsItemList', row)">明细</el-button>
                <el-button type="danger" size="mini"
                           :disabled="(!(row.statusCode == 0 && row.deleteFlag == 0))"
                           @click.native.prevent="deleteCoupons(row.couponsId)">删除</el-button>
                <el-button type="primary" size="mini" 
                           :disabled=" !(row.fetchWay == 2 && row.statusCode == 1 && row.deleteFlag == 0)"
                           @click.native.prevent="pushCoupons(row)">推广</el-button>                                   
              </div>
            </el-table-column>
          </el-table>
          <div class="_pagination">
            <!-- 分页 -->
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="page"
              :page-sizes="[10, 20, 30, 40]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totalSize">
            </el-pagination>
          </div>
      </div>
    </div>

      </card-panel>
    <!-- 设置文件分类 -->
    <el-dialog title="优惠商品分类" v-model="dialogCouponsClassify" size="tiny">
        <div>
            <div class="grid-content bg-purple" style="border: 1px solid #EFF2F7;padding-bottom: 2px;">
                <p class="shop-classify">商品分类：</p>
                <ul id="classifyTree" class="ztree"></ul>
            </div>          
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click.native="dialogCouponsClassify = false">关闭</el-button>
        </span>
    </el-dialog>

    <!-- 二维码 -->
    <el-dialog title="优惠券二维码" v-model="dialogCouponsCode">
        <div>
            <div class="grid-content bg-purple" style="border: 1px solid #EFF2F7;padding-bottom: 20px;height:500px;" align="center">
              <div style="margin-bottom: 10px;" align="center">扫一扫,在手机上查看并领取</div>
              <qriously :value="picCodeUrl.value" :size="400" class="qr"></qriously>
              <div align="center">
                <a href="javascript:;" @click="downloadCode($event)">下载二维码</a>
              </div>
            </div>          
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click.native="dialogCouponsCode = false">关闭</el-button>
        </span>
    </el-dialog>    
  </div>
</template>
<script>
  import breadcrumb from "components/breadcrumb"
  import tabItems from "components/tab-items"
  import { _getMallCouponsPage,
           _startMallCoupons,
           _stopMallCoupons,
           _deleteCoupons,
           _getMallCouponsCodeUrl} from 'src/vuex/actions/mallShopCouponsAction'
  import dateFormat from 'src/lib/utils/dateFormat'
  import {_getMallShopClassifyList} from 'src/vuex/api/shopAPI'
  import sconfig from 'src/config/config'

  export default {
    components: {
      breadcrumb,
      tabItems
    },
    props: {
      obj: {
        type: Object,
        default: {}
      },
    }, 
    computed: {
      init() {
        return this.obj
      }
    },       
    data(){
      return {
        dateFormat,
        page :1,
        pageSize :10,
        totalSize: 100,
        mallCouponsDataList:[],
        couponsParam:{
            statusCode:1,
            deleteFlag:0,
            fetchWay: '',
            couponsType:  '',
            couponsLimit:  ''
        },
        multipleSelection:[], // 多选
        activeName:'tab1',

        dialogCouponsClassify:false, // 查看优惠商品分类
        dialogCouponsCode:false, //二维码
        picCodeUrl:{},
        couponsUrl:'',
        setting: { //zTree配置
          view: {
            showIcon: false
          },
          check: {
            enable: true,
            chkDisabled :false
          },
          data: {
            simpleData: {enable: true,idKey: "classifyId",pIdKey: "parentId",}
          }
        },
      }

    },
    computed:{
      cloudShowUrl() {
        return this.$store.getters.cloudShowUrl
      },
      supplierID() {
        return this.$store.getters.supplierID
      },
      shopID() {
        return this.$store.getters.shopID
      }
    },
    methods:{
      onSubmit() {
        this.loadData();
      },
      loadData(){
            this.param = {
                couponsName:this.couponsParam.couponsName,
                couponsType:this.couponsParam.couponsType,
                couponsLimit:this.couponsParam.couponsLimit,
                fetchWay:this.couponsParam.fetchWay,
                statusCode:this.couponsParam.statusCode,
                deleteFlag:this.couponsParam.deleteFlag,
                pageNo:this.page,
                pageSize:this.pageSize
            }
            //console.log(JSON.stringify(this.param))
            _getMallCouponsPage(this.param).then((data) => {
                const {success,result}=data;
                if(success){
                    //console.log(JSON.stringify(result.rows))
                    this.mallCouponsDataList = result.rows ;
                    this.mallCouponsDataList.forEach(function(item){
                        if(item.couponsType==0){ //{0: '优惠券', 1: '折扣券'},
                          item.couponsValStr = item.couponsVal+'元';
                        }else if(item.couponsType==1){
                          item.couponsValStr = item.couponsVal/10+'折';
                        }
                    })
                    this.totalSize = result.total;
                }
            })
      },
      onTabClick(tab, event) {
          this.couponsParam.activeName=tab.name
          if(tab.name==='tab1'){
              this.page = 1
              this.couponsParam.statusCode=1
              this.couponsParam.deleteFlag=0
          }else if(tab.name==='tab2'){
              this.page= 1
              this.couponsParam.statusCode=0
              this.couponsParam.deleteFlag=0
          }else if(tab.name==='tab3'){
              this.page = 1
              this.couponsParam.statusCode=''
              this.couponsParam.deleteFlag=1
          }
          this.loadData() ;
      },      
      onAdd(){
        this.$router.push('addShop');
      },
      deleteCoupons(couponsId){
        this.$confirm('确认需要删除该优惠券?', '提示', {
          type: 'warning'
        }).then(() => {
           _deleteCoupons({"couponsIdStr":couponsId}).then((data) => {
              const {success,result}=data;
              //console.log(JSON.stringify(result))
              if(success){
                  this.$message({message: '删除成功', type: 'success'});             
                  this.loadData();
              }
          }); 
        })    
      },
      startUseCoupons(couponsId){
        this.$confirm('确认需要启用优惠券?', '提示', {
          type: 'warning'
        }).then(() => {
            _startMallCoupons({"couponsId":couponsId}).then((data) => {
                const {success,result}=data;
                //console.log(JSON.stringify(data))
                if(success){      
                    this.$message({message: '操作成功', type: 'success'});             
                    this.loadData();
                }else{
                  this.$message({message: '操作失败', type: 'warning'}); 
                  console.log(JSON.stringify(result))
                }
            })         
        }).catch(() => {
          this.$message({type: 'info',message: '已取消启用'});          
        }); 
      },
      stopUseCoupons(couponsId){
        this.$confirm('确认需要停用优惠券?', '提示', {
          type: 'warning'
        }).then(() => {
            _stopMallCoupons({"couponsId":couponsId}).then((data) => {
                const {success,result}=data;                
                if(success){     
                    this.$message({message: '操作成功', type: 'success'});              
                    this.loadData();
                }else{
                  this.$message({message: '操作失败', type: 'warning'}); 
                  console.log(JSON.stringify(result))
                }
            })       
        }).catch(() => {
          this.$message({type: 'info',message: '已取消停用'});          
        });
      }, 
      // 推广
      pushCoupons(row){
        this.dialogCouponsCode = true ;
        this.picCodeUrl.value = this.couponsUrl+"#/coupon-center/"+this.shopID+"/"+row.couponsId+"?supplierId="+this.supplierID ;  
        console.log(this.picCodeUrl.value)  
      },  
      // 二维码
      pushCouponsMain(){
        
        this.dialogCouponsCode = true ;
        this.picCodeUrl.value = this.couponsUrl+"#/coupon-center/"+this.shopID+"/0?supplierId="+this.supplierID ;    
        console.log(this.picCodeUrl.value)   
      },
      downloadCode($event){
        let canvas = this.$el.querySelector(".qr").children[0]
        let down = $event.currentTarget
        down.download = "优惠券二维码.png"
        if (canvas.getContext) {
          var ctx = canvas.getContext("2d");
          var myImage = canvas.toDataURL("image/png").replace(/^data:image\/[^;]/, 'data:application/octet-stream');
          down.href = myImage
        }
      },
      // 查看优惠分类
      viewConponsClassify(row){
        this.dialogCouponsClassify = true ;
        this.loadClassifyTreeData(row.couponsLimitNote.split(",")) ;
      },
      // 加载分类树
      loadClassifyTreeData(temArray){  
            _getMallShopClassifyList().then(data => {
                if(!data) return ;
                let treeData = data.result ;                
                treeData.forEach(function(node) {
                  temArray.forEach(function(item) {
                    if (item == node.classifyId) node.checked = true
                  })                    
                })
                var treeObj = $.fn.zTree.init($("#classifyTree"), this.setting, treeData) ;
                treeObj.expandAll(true); 
            }) 
      },     
      handleMultipleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleSizeChange(val) {
        this.pageSize = val ;
        this.loadData();
      },
      handleCurrentChange(val) {
        this.page = val ;
        this.loadData();
      },
      initTab(){
        // 初始化标签
        if(this.obj.statusCode != undefined){
          //console.log(this.obj.statusCode+"===="+this.obj.deleteFlag)
          if(this.obj.statusCode == 1 && this.obj.deleteFlag == 0){
            this.activeName='tab1' ;
          }
          if(this.obj.statusCode == 0 && this.obj.deleteFlag == 0){
            this.activeName='tab2' ;
          }
          if(this.obj.deleteFlag == 1){
            this.activeName='tab3' ;
          } 
          this.couponsParam.statusCode = this.obj.statusCode ; 
          this.couponsParam.deleteFlag = this.obj.deleteFlag ;          
        }
      }
    },
    mounted(){
      
    },
    created(){
      this.initTab(); // 初始化标签
      this.loadData();
      _getMallCouponsCodeUrl().then((data) => {
          const {success,result}=data;                
          if(success){     
            this.couponsUrl = result.couponsUrl ;
            //console.log(this.couponsUrl)
          }
      }) 
    }
  }
</script>
