<template>
  <div class="_container">
    <card-panel>
      <span slot="title">{{headerTitle}}</span>
      <div slot="panel-btns"><el-button type="primary" size="small" @click.native.prevent="$emit('reback', 'shopCouponsList')">返回</el-button></div>
      <div slot="panel-body">
        <div class="_panel-body-container">
          <div class="_panel-body-lr">
            <div class="_panel-body-left" style="width: 540px;">
              <card-panel>
                <span slot="title">录入优惠券基本信息</span>
                <div slot="panel-body">
                  <el-form :model="couponsParam" :rules="rules" ref="ruleForm" label-width="100px">
                    <el-form-item label="优惠券名称" prop="couponsName">
                      <el-input v-model="couponsParam.couponsName" :maxlength="30" placeholder="请输入优惠券名称"></el-input>
                    </el-form-item>
                    <el-form-item label="发放方式">
                      <el-radio-group v-model="couponsParam.fetchWay" @change="clickDayLimitStatus">
                        <el-radio :label="0" :disabled="isUpdateFlag">推送</el-radio>
                        <el-radio :label="1" :disabled="isUpdateFlag" v-show="isMyselfStatus">充值赠送</el-radio>
                        <el-radio :label="2" :disabled="isUpdateFlag">领取</el-radio>
                        <el-radio :label="3" :disabled="isUpdateFlag" v-show="isMyselfStatus">奖品</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="优惠类型">
                      <el-radio-group v-model="couponsParam.couponsType">
                        <el-radio :label="0" :disabled="isUpdateFlag">现金券</el-radio>
                        <el-radio :label="1" :disabled="isUpdateFlag">折扣券</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="使用范围" prop="couponsLimit">
                      <el-radio-group v-model="couponsParam.couponsLimit" @change="clickCouponsLimit">
                        <el-radio :label="0">全店铺优惠</el-radio>
                        <el-radio :label="1">商品分类优惠</el-radio>
                        <el-radio :label="2">商品优惠</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item label="优惠金额" prop="couponsMoney" v-show="couponsParam.couponsType==0" >
                      <el-input v-model="couponsParam.couponsMoney" :maxlength="10" type="number" :disabled="isUpdateFlag"><!--</el-input><span style="padding-left: 1.5%">元</span>-->
                    </el-form-item>
                    <el-form-item label="折扣比例" prop="couponsDiscount" v-show="couponsParam.couponsType==1">
                      <el-input v-model="couponsParam.couponsDiscount" :maxlength="10" type="number" :disabled="isUpdateFlag"></el-input> <!-- <span style="color:red">注：80代表8折</span> -->
                    </el-form-item>
                    <el-form-item label="价值金额" prop="couponsPrice">
                      <el-input v-model="couponsParam.couponsPrice" :maxlength="10" type="number"></el-input><!--<span style="padding-left: 1.5%">元</span>-->
                    </el-form-item>
                    <el-form-item label="发行数量" prop="couponsNumber" v-show="couponsParam.fetchWay==0||couponsParam.fetchWay==2">
                      <el-input v-model="couponsParam.couponsNumber" type="number" :disabled="isUpdateFlag"></el-input><!--<span style="padding-left: 1.5%">张</span>-->
                    </el-form-item>
                    <el-form-item label="最低消费" prop="couponsLimitPrice">
                      <el-input v-model="couponsParam.couponsLimitPrice" :maxlength="10" type="number" :disabled="isUpdateFlag" ></el-input><!--<span style="padding-left: 1.5%">元</span>-->
                    </el-form-item>
                    <el-form-item label="限领数量" prop="getLimit" v-show="couponsParam.fetchWay==2">
                      <el-input v-model="couponsParam.getLimit" :maxlength="10" type="number"></el-input>
                    </el-form-item>                    
                    <el-form-item label="使用有效期" prop="dayLimit">
                      <el-radio-group v-model="couponsParam.dayLimit">
                        <el-radio :label="1" :disabled="isUpdateFlag">领取后计时</el-radio>
                        <el-radio :label="0" :disabled="isUpdateFlag" v-show="fetchWayFlag">按时间段设置</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item required v-show="couponsParam.dayLimit == 0">
                      <el-row type="flex">
                        <el-col :span="12">
                          <el-form-item prop="beginDay">
                            <el-date-picker
                              v-model="couponsParam.beginDay"
                              type="datetime"
                              style="width: 100%;"
                              placeholder="选择起始日期时间"
                              :picker-options="beginDayOptions" :disabled="isUpdateFlag">
                            </el-date-picker>
                          </el-form-item>
                        </el-col>
                        <el-col class="line" style="text-align: center; width: 40px;"><span> ~ </span></el-col>
                        <el-col :span="12">
                          <el-form-item prop="endDay">
                            <el-date-picker
                              v-model="couponsParam.endDay"
                              type="datetime"
                              style="width: 100%;"
                              placeholder="选择起始日期时间"
                              :picker-options="endDayOptions" :disabled="isUpdateFlag">
                            </el-date-picker>
                          </el-form-item>
                        </el-col>
                      </el-row>
                    </el-form-item>
                    <el-form-item label="有效天数" prop="dayNumber" v-show="couponsParam.dayLimit == 1">
                      <el-input v-model="couponsParam.dayNumber"  type="number" :disabled="isUpdateFlag"></el-input>
                    </el-form-item>

                      <el-form-item style="margin:20px 0;">
                        <el-button type="primary" @click.native.prevent="handleSubmit">立即创建</el-button>
                        <el-button @click.native.prevent="$emit('reback', 'shopCouponsList')">返回</el-button>
                      </el-form-item>
                  </el-form>
                </div>
              </card-panel>
            </div>
            <div class="_panel-body-right">
              <!-- 商品分类选择 -->
              <card-panel v-show="couponsParam.couponsLimit == 1 ">
                <span slot="title">请选择商品分类</span>
                <div slot="panel-body">
                  <ul id="classifyTree" class="ztree"></ul>
                </div>
              </card-panel>

              <!-- 商品列表 -->
              <card-panel v-show="couponsParam.couponsLimit == 2">
                <span slot="title">商品列表</span>
                <div slot="panel-table">
                  <spuGoodsForGoods @chooseGoods="chooseGoods"></spuGoodsForGoods>
                </div>
              </card-panel>

              <!-- 已选择商品 -->
              <card-panel v-show="couponsParam.couponsLimit == 2" style="margin-top: 20px;">
                <span slot="title">已选择商品: {{cmallGoodsList.length}}</span>
                <div slot="panel-table">
                  <el-table
                    :data="cmallGoodsList_"
                    selection-mode="multiple"
                    stripe
                    border
                    @selectionchange="handleMultipleSelectionChange">
                    <el-table-column align="center" inline-template label="编号" width="100">
                      <span>{{row.goodsType == 1 ? row.goodsId + ' / ' + row.goodsSkuId : row.goodsId }}</span>
                    </el-table-column>
                    <el-table-column align="center" prop="goodsSn" label="商品编码" width="120"></el-table-column>
                    <el-table-column align="center" prop="goodsName" label="商品名称" min-width="150"></el-table-column>
                    <el-table-column align="center" inline-template label="商品类型" width="100">
                      <div>{{row.goodsType == 0 ? '单品' : (row.goodsType == 1 ? '规格商品' : '组合商品')}}</div>
                    </el-table-column>
                    <el-table-column align="center" prop="mprice" label="市场价" width="90"></el-table-column>
                    <el-table-column align="center" prop="price" label="销售价" width="90"></el-table-column>
                    <el-table-column align="center" inline-template label="操作" width="90">
                      <el-button type="danger" size="mini" @click.native.prevent="removeToGoods(row)">删除</el-button>
                      </el-table-column>
                  </el-table>
                  <!-- 分页 -->
                  <div class="_pagination">
                    <el-pagination
                      @current-change="pageChange"
                      :current-page="page_"
                      :page-size="size_"
                      layout="total, prev, pager, next"
                      :total="total_">
                    </el-pagination>
                  </div>
                </div>
              </card-panel>
            </div>
          </div>
        </div>
      </div>
    </card-panel>
  </div>
</template>

<script>

  import spuGoodsForGoods from "./spuGoodsForGoods"
  import breadcrumb from "components/breadcrumb"
  import tabItems from "components/tab-items"
  import { _addCoupons,_queryShopIsMyself} from 'src/vuex/actions/mallShopCouponsAction'
  import { _getMallCouponsGoodsPage} from 'src/vuex/actions/mallShopCouponsAction'
  import {dateFormat as dateFormat_ } from "lib/utils/dateFormat"
  import {_getMallShopClassifyList} from 'src/vuex/api/shopAPI'
  import moment from "moment"

  import RegExp from 'lib/utils/regexp'

  export default {
    props: {
      obj: {
        type: Object,
        default: {}
      }
    },
    computed: {
      couponsUpdateParam() {
        return this.obj
      },
      fetchWayFlag() {
        if(this.couponsParam.fetchWay == 1 || this.couponsParam.fetchWay == 3){
          //this.couponsParam.dayLimit = 1
          return false ;
        } else{
          //this.couponsParam.dayLimit = 0
          return true ;
        }
      },
      total_() {
        return this.cmallGoodsList.length
      }
    },
    components: {
      breadcrumb,
      tabItems,
      spuGoodsForGoods,
    },
    data(){
      var checkLimit = (rule, value, callback) => {
        setTimeout(() => {
          if (value > this.couponsParam.couponsNumber) {
            callback(new Error('最大限领：'+this.couponsParam.couponsNumber));
          } else {
            callback();
          }
        }, 1000);
      }; 
      var checkDaysLimit = (rule, value, callback) => {
        setTimeout(() => {
          if (value > 365) {
            callback(new Error('请输入正确的有效天数(1-365)'));
          } else if (value < 1) {
            callback(new Error('请输入正确的有效天数(1-365)'));
          } else {
            callback();
          }
        }, 1000);
      };           
      return {
        beginDayOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        endDayOptions: {
          disabledDate(time) {
            return time.getTime() < Date.now() - 8.64e7;
          }
        },
        page :1,
        pageSize :5,
        totalSize: 0,
        mallGoodsList:[],
        // 已选择商品
        cpage :1,
        cpageSize :5,
        ctotalSize: 0,
        cmallGoodsList:[],
        cmallGoodsList_:[],
        page_: 1,
        size_: 10,
        tmallGoodsList:[],

        isMyselfStatus:true,
        classfyTreeSelect:'',
        errorMsg:'',
        giveFlag:false,
        couponsParam:{
          couponsName:'',
          fetchWay:0,
          couponsType:0,
          couponsMoney:10,
          couponsDiscount:80,
          couponsVal:0,
          couponsPrice:0,
          couponsNumber:10,
          couponsLimitPrice:1,
          couponsLimit:0,
          dayLimit:0,
          beginDay:moment(dateFormat_(new Date(),"yyyy-MM-dd")+" 00:00:00").toDate(),
          endDay:moment(dateFormat_(new Date(),"yyyy-MM-dd")+" 23:59:59").add(10, 'days').toDate(),
          dayNumber:1,
          getLimit:1,
        },
        isUpdateFlag:false, // 是否可以修改
        setting: { //zTree配置
          view: {
            showIcon: false
          },
          check: {
            enable: true
          },
          data: {
            simpleData: {enable: true,idKey: "classifyId",pIdKey: "parentId",}
          }
        },
        rules: {
          couponsName: [
            { required: true, message: '请输入优惠券名称', trigger: 'blur' },
            { type: 'string', min: 0, max: 30, message: '优惠券名称不能超过30' }
          ],
          couponsMoney: [
            { type: 'number',required: true, message: '请输入优惠金额', trigger: 'blur' },
            { pattern: RegExp.amount,trigger: 'blur',message: '请输入正确优惠金额'}
          ],
          couponsDiscount: [
            { type: 'number',required: true, message: '请输入折扣', trigger: 'blur' },
            { pattern: /^([1-9]\d?)$/,trigger: 'blur',message: '请输入正确的折扣  格式：1-99'}
          ],
          couponsPrice: [
            { type: 'number',required: true, message: '请输入优惠卷价值金额', trigger: 'blur' },
            { pattern: RegExp.amount,trigger: 'blur',message: '格式错误， 格式：0.00'}
          ],
          couponsNumber: [
            { type: 'number',required: true, message: '请输入发行数量', trigger: 'blur' },
            { pattern: RegExp.numer,trigger: 'blur',message: '格式错误'}
          ],
          couponsLimitPrice: [
            { type: 'number',required: true, message: '请输入最低消费金额', trigger: 'blur' },
            { pattern: RegExp.amount,trigger: 'blur',message: '格式错误， 格式：0.00'},
            { validator: (rule, value, callback) => {
                if(value <= 0) {
                  callback(new Error("最低消费金额必须大于0"))
                }else{
                  callback()
                }
  
            }, trigger: 'blur'}
          ],
          getLimit: [
            { type: 'number',required: true, message: '请输入限领数量', trigger: 'blur' },
            { pattern: RegExp.numer,trigger: 'blur',message: '格式错误'},
            // { validator: checkLimit, trigger: 'blur' }
          ],          
          beginDay: [
            { type: 'date',required: true, message: '请输入起始时间', trigger: 'blur' },
          ],
          endDay: [
            { type: 'date',required: true, message: '请输入结束时间', trigger: 'blur' },
          ],
          dayNumber: [
            { type: 'number',required: true, message: "请输入正确的有效天数(1-365)" , trigger: 'blur'},
            //{ pattern: /^([1-9]|[1-9][1-9]|[1-2][0-9][0-9]|[3][0-6][0-5])$/,trigger: 'blur',message: '请输入正确的有效天数(1-365)'}
            { validator: checkDaysLimit, trigger: 'blur' }
          ],
        },
      };
    },
    methods:{
        clickDayLimitStatus(){
          if(this.couponsParam.fetchWay == 1 || this.couponsParam.fetchWay == 3){
            this.couponsParam.dayLimit = 1
          } else{
            this.couponsParam.dayLimit = 0
          }          
        },
        clickCouponsLimit(){
          this.loadClassifyTreeData([])
        },
        loadData(){
            if(this.couponsUpdateParam && this.couponsUpdateParam.couponsId) {
                this.isUpdateFlag = true ;
                this.headerTitle='修改优惠券信息'
                // this.couponsParam = this.couponsUpdateParam ;
                this.couponsParam = {...this.couponsParam, ...this.couponsUpdateParam} ;
                // console.log("this.couponsParam: ", this.couponsParam)

                this.couponsParam.beginDay = new Date(this.couponsUpdateParam.beginDay)
                this.couponsParam.endDay = new Date(this.couponsUpdateParam.endDay)
                if(this.couponsParam.couponsLimit == 1){
                  this.loadClassifyTreeData(this.couponsUpdateParam.couponsLimitNote.split(",")) ;
                }
                if(this.couponsParam.couponsType == 0){
                  this.couponsParam.couponsMoney = this.couponsParam.couponsVal ;
                }else{
                  this.couponsParam.couponsDiscount = this.couponsParam.couponsVal ;
                }
                if(this.couponsParam.couponsLimit == 2) {
                    _getMallCouponsGoodsPage({"couponsId":this.couponsParam.couponsId}).then(data => {
                        const {success,result}=data;
                        //console.log(JSON.stringify(result))
                        if(success) {
                          for(var i=0; i<result.length; i++){
                              let item = result[i] ;
                              let goodsType = item.goodsType ;
                              if(goodsType == 1){
                                 this.cmallGoodsList.push({
                                  goodsType:goodsType,
                                  goodsName:item.goodsName+"-"+item.goodsSkuName,
                                  goodsId:item.goodsId,
                                  goodsSn:item.goodsSn,
                                  goodsSkuId:item.goodsSkuId,
                                  price:item.skuPrice,
                                  mprice:item.skuMprice,
                                });
                              }else{
                                 this.cmallGoodsList.push({
                                  goodsType:goodsType,
                                  goodsName:item.goodsName,
                                  goodsId:item.goodsId,
                                  goodsSn:item.goodsSn,
                                  goodsSkuId:item.goodsSkuId,
                                  price:item.price,
                                  mprice:item.mprice,
                                });
                              }

                          }
                        } else {
                            console.log(result)
                        }
                    })
                }
            }else{
              this.headerTitle='新增优惠券信息'
            }
        },
        loadClassifyTreeData(temArray){
            // 加载分类树
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
        handleSubmit(ev) {
           // 去除不需要验证的字段
           let _rules = {...this.rules}
           if (this.couponsParam.couponsType == 1) {
              delete this.rules['couponsMoney']
           } else {
              delete this.rules['couponsDiscount']
           }
           if (this.couponsParam.fetchWay!=2) {
              delete this.rules['couponsNumber']
           }else{
             if(this.couponsParam.getLimit > this.couponsParam.couponsNumber){
                this.$message({message: '限领数量不能大于发放数量', type: 'warning'});
                return ;
             }
           }
           if (this.couponsParam.dayLimit == 1) {
              delete this.rules['beginDay']
              delete this.rules['endDay']
           } else {
              delete this.rules['dayNumber']
           }
           this.$refs.ruleForm.validate((valid) => {
              if (valid) {
                  this.rules = {..._rules}
                  this.couponsParam.tempDtmStart = dateFormat_(new Date(this.couponsParam.beginDay),"yyyy-MM-dd HH:mm:ss") ;
                  this.couponsParam.tempDtmEnd =  dateFormat_(new Date(this.couponsParam.endDay),"yyyy-MM-dd HH:mm:ss") ;
                  // 商品分类
                  if(this.couponsParam.couponsLimit == 1){
                      let treeObj = $.fn.zTree.getZTreeObj("classifyTree")
                      let nodes = treeObj.getCheckedNodes(true)
                      let classifyIds = []
                      if (nodes.length > 0) {
                         nodes.forEach(function(item) {
                          classifyIds.push(item.classifyId)
                        })
                      }else{
                        this.$message({message: '请至少选择一种商品分类', type: 'warning'});
                        return ;
                      }
                      this.classfyTreeSelect = classifyIds.join(",") ;
                      this.couponsParam.couponsLimitNote = this.classfyTreeSelect;

                  }
                  if(this.couponsParam.couponsLimit == 2){
                      let goodsIdstr = '' ;
                      this.cmallGoodsList.forEach(function(item){
                        goodsIdstr+= item.goodsId+"-"+item.goodsSkuId+"," ;
                      })
                      if(goodsIdstr != '') {
                        goodsIdstr=goodsIdstr.substring(0,goodsIdstr.length-1) ;
                      }else{
                        this.$message({message: '请至少选择一种商品', type: 'warning'});
                        return ;
                      }
                      this.couponsParam.goodsIdStr = goodsIdstr;
                  }
                  // 折扣/优惠金额
                  if(this.couponsParam.couponsType == 0){
                      this.couponsParam.couponsVal = this.couponsParam.couponsMoney ;
                  }else{
                      this.couponsParam.couponsVal = this.couponsParam.couponsDiscount ;
                  }
                  // console.log(JSON.stringify(this.couponsParam));return ;
                  _addCoupons(this.couponsParam).then((data) => {
                      const {success, msg} = data;
                      if(success) {

                        this.$message({message: '操作成功', type: 'success'});
                        // 保存成功之后返回
                        let resObj = {} ; resObj.statusCode = 0; resObj.deleteFlag = 0;
                        this.$emit("reback", "shopCouponsList", resObj);
                      } else {
                          this.$message.error('错了哦，'+msg);
                          console.log(msg)
                      }
                    });
             }else {
              console.log('error submit!!');
              return false;
            }
          });
        },
        removeToGoods(row){
              this.cmallGoodsList.splice(this.cmallGoodsList.indexOf(row), 1) ;
              this.ctotalSize -- ;
        },
        contains(arr, obj){
            let _flag = false ;
            for(var i=0; i<arr.length; i++){
                if (arr[i].goodsId == obj.goodsId
                  && arr[i].goodsSkuId == obj.goodsSkuId ) {
                    _flag = true;
                }
            }
            return _flag;
        },
        chooseGoods(row){
          //console.log(JSON.stringify(row)) ;
          if(row.goodsType == 0 || row.goodsType == 2){
            row.goodsSkuId = 0 ;
          }
          if(!this.contains(this.cmallGoodsList,row)){
            if(row.goodsType == 0){
               this.cmallGoodsList.push({
                goodsType:0,
                goodsName:row.goodsName,
                goodsId:row.goodsId,
                goodsSn:row.goodsSn,
                goodsSkuId:row.goodsSkuId,
                price:row.price,
                mprice:row.mprice,
              });
            }else if(row.goodsType == 2){
               this.cmallGoodsList.push({
                goodsType:2,
                goodsName:row.goodsName,
                goodsId:row.goodsId,
                goodsSn:row.goodsSn,
                goodsSkuId:row.goodsSkuId,
                price:row.price,
                mprice:row.mprice,
              });
            }else{
               this.cmallGoodsList.push({
                goodsType:1,
                goodsName:row.goodsSkuName,
                goodsId:row.goodsId,
                goodsSn:row.goodsSn,
                goodsSkuId:row.goodsSkuId,
                price:row.price,
                mprice:row.mprice,
              });
            }
          }else{
            this.$message({message: '该商品已添加!', type: 'warning'});
          }
        },
        changeTab(tab){
          //console.log(tab)
        },
        handleMultipleSelectionChange(val) {
          this.multipleSelection = val;
        },
        handleReset() {
          this.$refs.ruleForm.resetFields();
        },
        handleSizeChange(val) {
          this.pageSize = val ;
        },
        handleCurrentChange(val) {
          this.page = val ;
        },
        pageChange(val) {
          if (val == 1 || this.cmallGoodsList.length <= this.size_) {
            return this.cmallGoodsList_ = this.cmallGoodsList.slice(0, this.size_)
          }
          let _index = (val - 1) * this.size_
          this.cmallGoodsList_ = this.cmallGoodsList.slice(_index, val * this.size_)
        }
    },
    watch: {
      cmallGoodsList(n, o) {
        let l = n.length
        if (l <= this.size_) {
          this.page_ = 1
          return this.cmallGoodsList_ = n
        }

        if (this.headerTitle == '修改优惠券信息') {
          this.page_ = 1
        } else {
          this.page_ = Math.ceil(l / this.size_)
        }
        console.log("this.page: ", this.page_, o)
        this.cmallGoodsList_ = n.slice((this.page_ - 1) * this.size_, this.page_ * this.size_)
      }
    },

    created(){
      // 查询是否自营
      _queryShopIsMyself().then(data => {
          let temStatus = data.result ;
          if(temStatus == 0){
            this.isMyselfStatus = false ;
          }
      })
      this.loadData() ;
      //console.log(this.couponsParam.dayLimit) ;
    }
  }
</script>
