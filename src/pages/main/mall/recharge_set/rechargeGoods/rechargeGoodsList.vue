<template>
  <!-- 页面重构 2016-11-16 by cy -->
  <div class="_container">
    <!-- 查询条件 -->
    <div class="_setting-bar">
      <div class="_query-form">
        <div class="_query-form-item">
          <el-form :inline="true">
            <el-form-item>
              <el-input placeholder="商品编号查询" v-model="goodsIdSearch"></el-input>
            </el-form-item>

            <el-form-item>
              <el-input placeholder="商品名称查询" v-model="goodsNameSearch"></el-input>
            </el-form-item>

            <el-form-item>
              <el-input placeholder="商品全名查询" v-model="goodsFullNameSearch"></el-input>
            </el-form-item>

            <!--<el-form-item>
              <el-select v-model="isLockSearch" clearable placeholder="分期返还" >
                <el-option
                  v-for="item in isLockOptions"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>-->

            <el-form-item>
              <el-select v-model="isHotSearch" clearable placeholder="是否推荐" >
                <el-option
                  v-for="item in isHotOptions"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <!--<el-form-item>
              <el-select v-model="statusCodeSearch" clearable placeholder="商品状态" >
                <el-option
                  v-for="item in statusCodeOptions"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>-->

            <el-form-item>
              <el-select v-model="isTimeSearch" clearable placeholder="充值时间限制" >
                <el-option
                  v-for="item in isTimeOptions"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item style="width: 350px;">
              <el-row type="flex" justify="space-between">
                <el-col :span="12">
                  <el-input placeholder="充值金额开始" v-model="topUpAmountStSearch" style="width: 168px;"></el-input>
                </el-col>
                <el-col :span="0" style="text-align: center; center; width: 15px;"> ~ </el-col>
                <el-col :span="12">
                  <el-input placeholder="充值金额结束" v-model="topUpAmountEtSearch" style="width: 168px;"></el-input>
                </el-col>
              </el-row>
            </el-form-item>

            <el-form-item v-if="isTimeSearch == 1" style="width: 350px;">
              <el-row type="flex" justify="space-between">
                <el-col :span="12">
                  <el-date-picker
                    style="width: 168px;"
                    v-model="beginDaySearch"
                    type="date" clearable
                    placeholder="开始日期"
                    :picker-options="pickerOptions0">
                  </el-date-picker>
                </el-col>
                <el-col :span="0" style="text-align: center; width: 15px;"> ~ </el-col>
                <el-col :span="12">
                  <el-date-picker
                    style="width: 168px;"
                    v-model="endDaySearch"
                    type="date" clearable
                    placeholder="截止日期"
                    :picker-options="pickerOptions1">
                  </el-date-picker>
                </el-col>
              </el-row>
            </el-form-item>

            <el-form-item style="width: auto;">
              <el-button @click.native="searchDataList">查询</el-button>
            </el-form-item>

          </el-form>
        </div>
        <div class="_query-form-btn">
          <!-- <el-button @click.native="searchDataList" style="margin-left: 5%;">查询</el-button>
          <el-button @click.native="resetSearchValue" style="margin-left: 2%;">清空</el-button> -->
        </div>
      </div>
      <div class="_actions-btn">
        <el-button @click.native="gotoForward('rechargeGoodsAdd')" type="success" style="margin-left: 17%" >新增</el-button>
      </div>
    </div>
    <el-tabs v-model="activeName" style="width:100%" @tab-click="onTabClick">
      <el-tab-pane label="上架" name="tab1"></el-tab-pane>
      <el-tab-pane label="下架" name="tab2"></el-tab-pane>
      <el-tab-pane label="已删除" name="tab3"></el-tab-pane>
    </el-tabs>
    <div class="_table-container"> 
      <div class="_table-list">
      	<el-table :data="dataList" stripe style="width: 100%" border @sort-change="changeSort">
          <el-table-column property="goodsId" label="编号" min-width="90" sortable="'custom'" align="center"></el-table-column>
          <el-table-column property="goodsName" label="商品名称" min-width="120" sortable="'custom'" align="center"></el-table-column>
          <!--<el-table-column property="goodsFullName" label="商品全名" min-width="130" sortable="'custom'" align="center"></el-table-column>-->
          <el-table-column property="topUpAmount" label="充值金额(元)" width="150" sortable="'custom'" align="center"></el-table-column>
          <el-table-column property="givenAmount" label="赠送金额(元)" width="150" sortable="'custom'" align="center"></el-table-column>
          <!--<el-table-column property="isLock_str" label="是否锁定" width="120" sortable="'custom'" align="center"></el-table-column>-->
          <el-table-column property="isHot_str" label="是否推荐" width="120" sortable="'custom'" align="center"></el-table-column>
          <!--<el-table-column property="statusCode_str" label="是否上架" width="120" sortable="'custom'" align="center"></el-table-column>-->
          <el-table-column property="isTime_str" label="充值时间设置" min-width="230" sortable="'custom'" align="center"></el-table-column>
          <!--<el-table-column property="createdDtm_str" label="创建时间" width="200" sortable="'custom'" align="center"></el-table-column>-->
          <el-table-column inline-template label="操作" width="260" align="center">
          	<el-col :span="24">
              <el-button size="mini" type="success"  @click.native="gotoForward('rechargeGoodsDetail', row)">明细</el-button>
              <el-button size="mini" type="danger"    @click.native="modifyRechargeGoodsStatusCode(row)" v-if="row.statusCode===1 && activeName!='tab3'">下架</el-button>
              <el-button size="mini" type="info"      @click.native="modifyRechargeGoodsStatusCode(row)" v-if="row.statusCode===0 && activeName!='tab3'">上架</el-button>

              <el-button size="mini" type="info"      @click.native="pushRechargeGoods(row)" v-if="row.statusCode===1 && activeName!='tab3'">推广</el-button>

              <el-button size="mini" type="warning" v-if="row.statusCode===0 && activeName!='tab3'"   @click.native="gotoForward('rechargeGoodsModify', row)">修改</el-button>
              <el-button size="mini" type="danger"  v-if="row.statusCode===0 && activeName!='tab3'"   @click.native="deleteRechargeGoods(row.goodsId)">删除</el-button>
          	</el-col>
          </el-table-column>
      	</el-table>
        <!-- 分页 -->
        <div class="_pagination">
          <el-pagination
  		      @size-change="handleSizeChange"
  		      @current-change="handleCurrentChange"
  		      :current-page="pageNo"
  		      :page-sizes="[10, 20, 30, 50]"
  		      :page-size="pageSize"
  		      layout="total, sizes, prev, pager, next, jumper"
  		      :total="total">
  	    	</el-pagination>
  	    </div>
      </div>
    </div>

    <!-- 二维码 -->
    <el-dialog title="推广二维码" v-model="dialogRechargeCode">
        <div>
          <el-form :inline="true">
            <el-form-item>
              <el-select v-model="promotionName" filterable placeholder="请选择业务员">
                <el-option
                  v-for="item in proOptions"
                  :key="item.promotionerId"
                  :label="item.fullName"
                  :value="item.promotionerId">
                </el-option>
              </el-select>
            </el-form-item>   
            <el-form-item style="width: auto;">
              <el-button @click.native="produceCode">生成二维码</el-button>
            </el-form-item>            
          </el-form>      
        </div>
        <div>
            <div class="grid-content bg-purple" style="border: 1px solid #EFF2F7;padding-bottom: 20px;height:500px;" align="center"  v-show=' picCodeUrl.value!="" '>
              <div style="margin-bottom: 10px;" align="center">扫一扫,在手机上查看并领取</div>
              <qriously :value="picCodeUrl.value" :size="400" class="qr"></qriously>
              <div align="center">
                <a href="javascript:;" @click="downloadCode($event)">下载二维码</a>
              </div>
            </div>          
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click.native="dialogRechargeCode = false">关闭</el-button>
        </span>
    </el-dialog>
  </div>   
</template>

<script>
  import { 
  	getMallRechargeGoodsList, 
  	deleteMallRechargeGoods,
  	modifyMallRechargeGoods,
  } from 'src/vuex/actions/rechargeGoodsAction'
  import { _getMallCouponsCodeUrl } from 'src/vuex/actions/mallShopCouponsAction'
  import { _getPromotionList } from 'src/vuex/actions/promotionAction'
  import {dateFormat} from 'lib/utils/dateFormat.js'
  export default {
    props: {
      obj: {
        type: Object,
        default: {}
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
    data(){
    	var _this = this;
      return {
      	loading:false,//遮罩层
      	rechargeGoodsObj:{},
        activeName:'tab1',
        dataList:[],
        pageNo :1,
        pageSize :10,
        total: 0,
        orderByKey:'sortIndex',
        orderByValue:'ASC',
        goodsIdSearch:'',
        goodsNameSearch:'',
        goodsFullNameSearch:'',
        topUpAmountStSearch:'',
        topUpAmountEtSearch:'',
        isLockSearch:'',
        isLockOptions:[{value: '0',label: '无分期'},{value: '1',label: '有分期'}],
        isHotSearch:'',
        isHotOptions:[{value: '0',label: '不推荐'},{value: '1',label: '推荐'}],
        isTimeSearch:'',
        isTimeOptions:[{value: '0',label: '没限制'},{value: '1',label: '有限制'}],
        statusCodeSearch:'',
        statusCodeOptions:[{value: '0',label: '下架'},{value: '1',label: '上架'}],
        statusCode:1,
        deleteFlag:0,
        beginDaySearch:'',
        endDaySearch:'',
        pickerOptions0: {
        	disabledDate(time){
            return _this.endDaySearch == '' || typeof _this.endDaySearch =='undefined'?false:time.getTime() > _this.endDaySearch.getTime();
          }
        },
        pickerOptions1: {
          disabledDate(time){
            return _this.beginDaySearch == '' || typeof _this.beginDaySearch =='undefined'?false:time.getTime() < _this.beginDaySearch.getTime();
          }
        },


        dialogRechargeCode:false,// 二维码的弹出框
        picCodeUrl:{
          value:''
        },
        rechargeUrl:'',
        promotionName:'',
        proOptions:[]
      }
    },

    created(){
    	if(typeof this.obj.goodsParam.activeName !='undefined'){
    		this.activeName = this.obj.goodsParam.activeName;
    	}
    	if(typeof this.obj.goodsParam.pageNo !='undefined'){
    		this.pageNo = this.obj.goodsParam.pageNo;
    	}
    	if(typeof this.obj.goodsParam.pageSize !='undefined'){
    		this.pageSize = this.obj.goodsParam.pageSize;
    	}
    	if(typeof this.obj.goodsParam.orderByKey !='undefined'){
    		this.orderByKey = this.obj.goodsParam.orderByKey;
    	}
    	if(typeof this.obj.goodsParam.orderByValue !='undefined'){
    		this.orderByValue = this.obj.goodsParam.orderByValue;
    	}
    	if(typeof this.obj.goodsParam.goodsIdSearch !='undefined'){
    		this.goodsIdSearch = this.obj.goodsParam.goodsIdSearch;
    	}
    	if(typeof this.obj.goodsParam.goodsNameSearch !='undefined'){
    		this.goodsNameSearch = this.obj.goodsParam.goodsNameSearch;
    	}
    	if(typeof this.obj.goodsParam.goodsFullNameSearch !='undefined'){
    		this.goodsFullNameSearch = this.obj.goodsParam.goodsFullNameSearch;
    	}
    	if(typeof this.obj.goodsParam.topUpAmountStSearch !='undefined'){
    		this.topUpAmountStSearch = this.obj.goodsParam.topUpAmountStSearch;
    	}
    	if(typeof this.obj.goodsParam.topUpAmountEtSearch !='undefined'){
    		this.topUpAmountEtSearch = this.obj.goodsParam.topUpAmountEtSearch;
    	}
    	if(typeof this.obj.goodsParam.isLockSearch !='undefined'){
    		this.isLockSearch = this.obj.goodsParam.isLockSearch;
    	}
    	if(typeof this.obj.goodsParam.isHotSearch !='undefined'){
    		this.isHotSearch = this.obj.goodsParam.isHotSearch;
    	}
    	if(typeof this.obj.goodsParam.isTimeSearch !='undefined'){
    		this.isTimeSearch = this.obj.goodsParam.isTimeSearch;
    	}
    	if(typeof this.obj.goodsParam.statusCodeSearch !='undefined'){
    		this.statusCodeSearch = this.obj.goodsParam.statusCodeSearch;
    	}
    	if(typeof this.obj.goodsParam.statusCode !='undefined'){
    		this.statusCode = this.obj.goodsParam.statusCode;
    	}
    	if(typeof this.obj.goodsParam.deleteFlag !='undefined'){
    		this.deleteFlag = this.obj.goodsParam.deleteFlag;
    	}
    	if(typeof this.obj.goodsParam.beginDaySearch !='undefined'){
    		this.beginDaySearch = this.obj.goodsParam.beginDaySearch;
    	}
    	if(typeof this.obj.goodsParam.endDaySearch !='undefined'){
    		this.endDaySearch = this.obj.goodsParam.endDaySearch;
    	}

      this.loadData();

      this.initPromotioner() ;
      _getMallCouponsCodeUrl().then((data) => {
          const {success,result}=data;                
          if(success){     
            this.rechargeUrl = result.couponsUrl ;
            //console.log(this.couponsUrl)
          }
      });

       

    },
    methods:{
    	onTabClick(tab){
        this.activeName=tab.name;
        if(tab.name==='tab1'){
          this.pageNo = 1
          this.statusCode=1
          this.deleteFlag=0
        }else if(tab.name==='tab2'){
          this.pageNo = 1
          this.statusCode=0
          this.deleteFlag=0
        }else if(tab.name==='tab3'){
          this.pageNo = 1
          this.statusCode=''
          this.deleteFlag=1
        }
        this.loadData()
      },
      loadData(){
        var param ={
        	 pageNo: this.pageNo
        	,pageSize: this.pageSize
        	,orderByKey: this.orderByKey
        	,orderByValue: this.orderByValue
        	,goodsId: this.goodsIdSearch
        	,goodsName: this.goodsNameSearch
        	,goodsFullName: this.goodsFullNameSearch
        	,topUpAmountSt: this.topUpAmountStSearch
        	,topUpAmountEt: this.topUpAmountEtSearch
        	,isLock: this.isLockSearch
        	,isHot: this.isHotSearch
        	,isTime: this.isTimeSearch
        	,beginDay: this.beginDaySearch==""? "":dateFormat(this.beginDaySearch,'yyyy-MM-dd')
        	,endDay: this.endDaySearch==""? "":dateFormat(this.endDaySearch,'yyyy-MM-dd')
        	,statusCode: this.statusCode
          ,deleteFlag: this.deleteFlag
          
        };
        this.loading = true;
        getMallRechargeGoodsList(param).then((data) => {
        	this.loading = false;
            const {success,result}=data;
            //console.log(JSON.stringify(result))
            if(success){
                this.dataList = result.rows ;
                this.dataList.forEach(function(item){
                	item.beginDay_str = dateFormat(item.beginDay,'yyyy-MM-dd');
                	item.endDay_str = dateFormat(item.endDay,'yyyy-MM-dd');
                	item.createdDtm_str = dateFormat(item.createdDtm,'yyyy-MM-dd HH:mm:ss');
                	item.statusCode_str = item.statusCode == 1? '上架':'下架';
                	item.isLock_str = item.isLock == 1? '是('+item.lockMonth+'期)':'否';
                	item.isHot_str = item.isHot == 1? '是':'否';
                	item.isTime_str = item.isTime == 1? '是('+item.beginDay_str+' 到 '+item.endDay_str+')':'否';
                });
                if(this.pageNo <=1){//因为只有第一页带总记录数
                	this.total = result.total;
                }
            }
        });
      },


      // 推广
      pushRechargeGoods(row){
        this.dialogRechargeCode = true ; 
      }, 
      produceCode(){
        if(!this.promotionName){
            this.$message({message: '请选择业务员', type: 'warning'});
            return ;
        }
        this.picCodeUrl.value = this.rechargeUrl+"#/coupon-center/"+this.promotionName;  
        console.log(this.promotionName) 
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
      initPromotioner(){
        _getPromotionList({}).then(data => {
          const { success, result, msg } = data
          //console.log(JSON.stringify(data))
          if (success) {
            this.proOptions = result ;
          }
        }) 
      },


      searchDataList(){
      	 this.pageNo = 1;
      	 this.loadData();
      },
      handleSizeChange(val) {
      	this.pageSize = val;
        this.searchDataList();
      },
      handleCurrentChange(val) {
       	 this.pageNo = val;
      	 this.loadData();
      },
      changeSort(column){
      	if(column.prop != null ){
      		if(column.prop.indexOf('_str') == -1){
      			this.orderByKey = column.prop;
      		}else{
      			this.orderByKey = column.prop.substring(0,column.prop.indexOf('_str'));
      		}
      	}else{
      		this.orderByKey = '';
      	}
      		
      	
      	if(column.order == 'ascending'){
      		this.orderByValue = 'ASC';
      	}else if(column.order == 'descending'){
      		this.orderByValue = 'DESC';
      	}else{
      		this.orderByValue = '';
      	}
      	this.loadData();
      },
      modifyRechargeGoodsStatusCode(row){
        this.$confirm('确定把该活动商品'+(row.statusCode==1?'下架':'上架')+'么？', '提示', {
          type: 'warning'
        }).then(() => {//确定
           var param ={
             goodsId: row.goodsId,
             statusCode: row.statusCode==1?0:1,
          };
          modifyMallRechargeGoods(param).then((data) => {
              const {success,msg,result}=data;
              this.$message({
                type: success? 'success':'error',
                message: msg
            });
              if(success){
                //row.statusCode = param.statusCode;
                //row.statusCode_str = row.statusCode==1? '启用' : '停用';
                for(var i=0,li=this.dataList.length; i<li; i++){
                  if(this.dataList[i].goodsId==row.goodsId){
                    this.dataList.splice(i,1);
                    break;
                  }
                }
              }
          }); 
          
        }).catch(() => {//取消
                    
        });
         
      },
      deleteRechargeGoods(goodsId){
      	this.$confirm('确定把该充值规则删除么？', '提示', {
          type: 'warning'
        }).then(() => {//确定
        	 var param ={
	        	 goodsId: goodsId,
	        };
	        deleteMallRechargeGoods(param).then((data) => {
	            const {success,msg,result}=data;
	            this.$message({
		            type: success? 'success':'error',
		            message: msg
		        });
	            if(success){
	                this.searchDataList();
	            }
	        }); 
          
        }).catch(() => {//取消
                    
        });
         
      },
      gotoForward(url,row){
        
      	this.obj.goodsParam.activeName = this.activeName;
      	this.obj.goodsParam.pageNo = this.pageNo;
      	this.obj.goodsParam.pageSize = this.pageSize;
      	this.obj.goodsParam.orderByKey = this.orderByKey;
      	this.obj.goodsParam.orderByValue = this.orderByValue;
      	this.obj.goodsParam.goodsIdSearch = this.goodsIdSearch;
      	this.obj.goodsParam.goodsNameSearch = this.goodsNameSearch;
      	this.obj.goodsParam.goodsFullNameSearch = this.goodsFullNameSearch;
      	this.obj.goodsParam.topUpAmountStSearch = this.topUpAmountStSearch;
      	this.obj.goodsParam.topUpAmountEtSearch = this.topUpAmountEtSearch;
      	this.obj.goodsParam.isLockSearch = this.isLockSearch;
      	this.obj.goodsParam.isHotSearch = this.isHotSearch;
      	this.obj.goodsParam.isTimeSearch = this.isTimeSearch;
      	this.obj.goodsParam.statusCodeSearch = this.statusCodeSearch;
      	this.obj.goodsParam.statusCode = this.statusCode;
      	this.obj.goodsParam.deleteFlag = this.deleteFlag;
      	this.obj.goodsParam.beginDaySearch = this.beginDaySearch;
      	this.obj.goodsParam.endDaySearch = this.endDaySearch;
      	
      	this.obj.goods = row || {};
      	this.$emit('forward', url,this.obj);
      },
      //**********************   
    }
  }
</script>
