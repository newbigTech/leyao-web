<template>
<div class="_container">
  <!-- 查询条件 -->
  <div class="_setting-bar">
    <div class="_query-form">
      <div class="_query-form-item">
        <el-form :inline="true">
				  <el-form-item>
		      		<el-input placeholder="商品名称 模糊查询" v-model="goodsNameSearch"></el-input>
				  </el-form-item>
				  <el-form-item>
		      		<el-input placeholder="订单号 模糊查询" v-model="orderNoSearch"></el-input>
				  </el-form-item>
				  <el-form-item>
		      		<el-input placeholder="用户名 模糊查询" v-model="userAliasSearch"></el-input>
				  </el-form-item>
				  <el-form-item>
		      		<el-input placeholder="用户手机 模糊查询" :number="true" v-model="userMobileSearch"></el-input>
				  </el-form-item>
				  <el-form-item>
            <el-select v-model="voucehrStatusSearch" clearable placeholder="全部评价">
              <el-option
                v-for="item in voucherStatusOptions"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item style="width: 360px;">
          	<el-row type="flex" justify="space-between">
               <el-col :span="0" style="width: 120px;">
			          	<el-radio-group v-model="voucherType">
								    <el-radio-button label="评论"></el-radio-button>
								    <el-radio-button label="追评"></el-radio-button>
								  </el-radio-group>
                </el-col>
                <el-col :span="0">
			            <el-date-picker
			              v-model="voucherDtmSearch"
			              type="daterange" clearable
			              placeholder="评论/追评时间段"
			            >
			            </el-date-picker>
                </el-col>
              </el-row>
          </el-form-item>

          <el-form-item style="width: auto;">
            <el-button @click.native="searchDataList">查询</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  
  </div>

  <el-tabs v-model="activeName" style="width:100%" @tab-click="onTabClick">
    <el-tab-pane label="待审核" name="tab1"></el-tab-pane>
    <el-tab-pane label="已发布" name="tab2"></el-tab-pane>
    <el-tab-pane label="审核不通过" name="tab3"></el-tab-pane>
    <el-tab-pane label="已删除" name="tab4"></el-tab-pane>
  </el-tabs>
  <div v-show="isShowBatchOpt">
		<el-button size="small" type="success" @click.native="checkGoodsVouchers()" v-if="activeName=='tab1'">审核评论</el-button>
	  <el-button size="small" type="success" @click.native="replyGoodsVouchers()" v-if="activeName=='tab2'">回复评论</el-button>
	  <el-button size="small" type="danger" @click.native="deleteGoodsVouchers()" v-if="activeName!='tab4'">删除评论</el-button>
  </div>
  <div class="_table-container">
    <div id="iDiv_voucher_data_list" class="_table-list">
    	<el-table :data="dataList" stripe style="width: 100%" border @sort-change="changeSort" @selection-change="handleSelectionChange">
    		<el-table-column type="selection" width="55"></el-table-column>
        <el-table-column align='left' label="商品评论" min-width="600">
        	<template scope="scope">
        		<div style="padding:10px;">
	        		<el-rate v-if="scope.row.grade>=7" v-model="scope.row.gradeHalf" disabled show-text text-color="#ff9900" text-template="【好评】"></el-rate>
	        		<el-rate v-if="scope.row.grade>=3 && scope.row.grade<=6" v-model="scope.row.gradeHalf" disabled show-text text-color="#ff9900" text-template="【中评】"></el-rate>
	        		<el-rate v-if="scope.row.grade<=2" v-model="scope.row.gradeHalf" disabled show-text text-color="#ff9900" text-template="【差评】"></el-rate>
	        		<p style="padding:10px 0;">{{scope.row.voucherNote}}</p>
	        		<div style="width:100%;height:56px;padding:2px 0;margin-top:5px;" v-if="scope.row.picList.length>0">
		          	<div :class="'cDiv_voucher_v_min_'+scope.row.voucherId" style="text-align:center;float:left;width:52px;height:52px;border:1px solid #e2e2e2;margin-right:6px;padding:1px;" v-for="(x,index) in scope.row.picList">
		          		<a href="javascript:;" v-on:click="showMaxPicFunc(scope.row.voucherId,x,index,'v')">
		          			<img class="i-img-voucher" style="max-width:48px;height:48px;" :src="cloudShowUrl + x">
		          		</a>
		          	</div>
		          </div>
		          <div style="margin-top:5px;" v-if="scope.row.voucherSignList.length>0">
		          	<el-tag type="primary" v-for="(x,index) in scope.row.voucherSignList" style="margin-right:5px;">{{x}}</el-tag>
		          </div>
		          <div class="cDiv_voucher_max_all" :id="'iDiv_voucher_v_max_'+scope.row.voucherId" style="display:none;margin-top:10px;">
		          	<img style="max-width:400px;max-height:400px;" src="">
		          </div>
		          <p style="color:#999;">
		          	<span title="评论时间" style="margin-right:10px;">{{scope.row.voucherDtm_str}}</span>
		          	<span style="float:right;">
			          	<span title="回复数" style="margin-right:10px;">
			          		<a href="javascript:;" style="text-decoration:underline;" v-on:click="showGoodsVoucherReplyList(scope.row)">
			          			回复({{scope.row.replyNumber}})
			          		</a>
			          	</span>
			          	<span title="点赞数" style="margin-right:10px;">点赞({{scope.row.goodNumber}})</span>
			          	<span title="挖坑数" style="margin-right:10px;">挖坑({{scope.row.badNumber}})</span>
		          	</span>
		          </p>
        		</div>
        		<div :id="'iDiv_voucher_s_second_'+scope.row.voucherId" style="margin:10px 0;border-top:1px solid #dfe6ec;" v-if="scope.row.isSecondVoucher == 1">
        			<p style="color:#999;">
        				<a href="javascript:;" v-on:click="showDivFunc(scope.row.voucherId,'second')">
        				   <i id="iI_btn" class="el-icon-arrow-down" style="color:#666;" title="显示/隐藏买家追评"></i>
        			  </a>
        				[购买后{{scope.row.secondVoucherDays<=0?'当':scope.row.secondVoucherDays}}天追评]
        			</p>
        			<div id="iDiv_content">
	        			<p style="padding:10px 0;">{{scope.row.secondVoucherNote}}</p>
		        		<div style="width:100%;height:56px;padding:2px 0;margin-top:5px;" v-if="scope.row.secondPicList.length>0">
			          	<div :class="'cDiv_voucher_r_min_'+scope.row.voucherId" style="text-align:center;float:left;width:52px;height:52px;border:1px solid #e2e2e2;margin-right:6px;padding:1px;" v-for="(x,index) in scope.row.secondPicList">
			          		<a href="javascript:;" v-on:click="showMaxPicFunc(scope.row.voucherId,x,index,'r')">
			          			<img class="i-img-voucher" style="max-width:48px;height:48px;" :src="cloudShowUrl + x">
			          		</a>
			          	</div>
			          </div>
			          <div class="cDiv_voucher_max_all" :id="'iDiv_voucher_r_max_'+scope.row.voucherId" style="display:none;margin-top:10px;">
			          	<img style="max-width:400px;max-height:400px;" src="">
			          </div>
			        </div>
        		</div>
        		<div :id="'iDiv_voucher_s_shop_'+scope.row.voucherId" style="color:#ff561c;margin-top:15px;border-top:1px solid #dfe6ec;" v-if="scope.row.replyList.length>0">
        			<p><a href="javascript:;" v-on:click="showDivFunc(scope.row.voucherId,'shop')">
        				    <i id="iI_btn" class="el-icon-arrow-down" style="color:#666;" title="显示/隐藏店铺回复内容"></i>
        				 </a>
        				店铺回复：
        			</p>
        			<div id="iDiv_content">
	        			<div v-for="x in scope.row.replyList">
	        				<p>{{x.shopReplyNote}}</p>
	        				<p style="color:#999;">{{x.shopReplyDtm_str}}</p>
	        			</div>
        			</div>
        		</div>
        	</template>
        </el-table-column>
        <el-table-column align='center' label="商品信息" width="160">
        	<template scope="scope">
        		<div style="padding:10px 0;">
        			<div style="margin:0 auto;width:100px;height:100px;">
	          		<img class="i-img-voucher" style="max-width:100px;height:100px;" :src="cloudShowUrl + scope.row.goodsPic0">
	          	</div>
        			<div>{{scope.row.goodsSkuFullName}}</div>
        		</div>
        	</template>
        </el-table-column>
        <el-table-column align='center' property="orderNo" label="订单号" width="130"></el-table-column>
        <el-table-column align='center' label="买家信息" width="160">
        	<template scope="scope">
        		<div style="padding:10px 0;">
	          	<div style="height:64px;">
	          		<img style="width:64px;height:64px;border-radius:50%;" :src="cloudShowUrl + scope.row.userPic" :onerror="'this.src=\'/static/images/default-u1.png\''">
	          	</div>
        			<p>{{scope.row.userAlias}}</p>
        			<p>{{scope.row.userMobile}}</p>
        		</div>
        	</template>
        </el-table-column>
        <el-table-column align='center' property="isTop_str" label="是否精评" width="120"></el-table-column>
        <el-table-column align='center' label="操作" width="160">
        	<template scope="scope">
	        	<div v-if="scope.row.deleteFlag===0 && scope.row.statusCode===0" style="margin-bottom:10px;">
	            <el-button size="small" type="success" @click.native="checkGoodsVoucher(scope.row)">审核评论</el-button>
	        	</div>
	        	<div v-if="scope.row.deleteFlag===0 && scope.row.statusCode===1" style="margin-bottom:10px;">
	            <el-button size="small" type="success" @click.native="replyGoodsVoucher(scope.row)">回复评论</el-button>
	        	</div>
	        	<div v-if="scope.row.deleteFlag===0 && scope.row.statusCode==1 && scope.row.isTop!==1" style="margin-bottom:10px;">
	            <el-button size="small" type="info" @click.native="modifyGoodsVoucherIsTop(scope.row,1)" title="设为精彩评论">设为精评</el-button>
	        	</div>
	        	<div v-if="scope.row.deleteFlag===0 && scope.row.statusCode==1 && scope.row.isTop!==0" style="margin-bottom:10px;">
	            <el-button size="small" type="info" @click.native="modifyGoodsVoucherIsTop(scope.row,0)" title="设为普通评论">设为普评</el-button>
	        	</div>
	        	<div v-if="scope.row.deleteFlag===0 && scope.row.statusCode==1 && scope.row.isTop!==-1" style="margin-bottom:10px;">
	            <el-button size="small" type="info" @click.native="modifyGoodsVoucherIsTop(scope.row,-1)" title="隐藏评论">设为隐藏</el-button>
	        	</div>
	        	<div v-if="scope.row.deleteFlag===0" style="margin-bottom:10px;">
	            <el-button size="small" type="danger" @click.native="deleteGoodsVoucher(scope.row)">删除评论</el-button>
	        	</div>
        	</template>
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
  <!--商品图库Dialog-->
  <el-dialog title="审核商品评论" v-model="checkGoodsVoucherDialog" class="shop-img-file-dialog">
    <goodsVoucherCheck 
    	@checkGoodsVoucherCallBack="checkGoodsVoucherCallBack" 
    	:obj="chooseVoucher"
      ref="goodsVoucherCheck"
    ></goodsVoucherCheck>
  </el-dialog>
  <el-dialog title="回复商品评论" v-model="replyGoodsVoucherDialog" class="shop-img-file-dialog">
    <goodsVoucherReply 
    	@replyGoodsVoucherCallBack="replyGoodsVoucherCallBack" 
    	:obj="chooseVoucher"
    	ref="goodsVoucherReply"
    ></goodsVoucherReply>
  </el-dialog>
</div>   

</template>
<style lang="sass">
  /*.el-form--inline .el-form-item {
    vertical-align: baseline;
  }*/
  .i-div-voucher{
  	border:1px solid #e53e41!important;
  }
</style>
<script>
	import { mapGetters } from 'vuex'
  import { 
  	getMallGoodsVoucherList,
  	deleteMallGoodsVoucher,
  	modifyMallGoodsVoucher,
  } from 'src/vuex/actions/goodsVoucherAction'
	import goodsVoucherCheck from './goodsVoucherCheck'
	import goodsVoucherReply from './goodsVoucherReply'
  import {dateFormat} from 'lib/utils/dateFormat.js'
  import _ from "lodash"
  export default {
  	components: {
     goodsVoucherCheck,
     goodsVoucherReply,
    },
    props: {
      obj: {
        type: Object,
        default: {}
      }
    },
    data(){
    	var _this = this;
    	
      return {
      	loading:false,//遮罩层
        activeName:'tab1',
        dataList:[],
        pageNo :1,
        pageSize :10,
        total: 0,
        shopId: this.obj.shopId,
        orderByKey:'',
        orderByValue:'',
        goodsNameSearch:'',
        orderNoSearch:'',
        userAliasSearch:'',
        userMobileSearch:'',
        voucherType:'评论',
        voucherDtmSearch:[null,null],
        voucehrStatusSearch:'',
        voucherStatusOptions:[
        	{value: '3', label: '好评'},{value: '2',label: '中评'},{value: '3',label: '差评'},{value: '4',label: '追评'},{value: '5',label: '晒图'},
        ],
        isTopMap:{'-1':'隐藏','0':'普通','1':'精评'},
        statusCode:0,
        deleteFlag:0,
        isShowBatchOpt:false,//显示批量操作
        //弹出对话框
        chooseVoucher:{},
        chooseVoucherList:[],//选择的评论列表 支持批量处理
        checkGoodsVoucherDialog:false,
        replyGoodsVoucherDialog:false,
        deleteGoodsVoucherDialog:false,
        
      }
    },
    computed: {
	    cloudShowUrl() {
      	return this.$store.getters.cloudShowUrl
      },
	  },
    created(){
    	if(typeof this.obj.voucherParam.statusCode !='undefined'){
    		this.statusCode = this.obj.voucherParam.statusCode;
    	}
    	if(typeof this.obj.voucherParam.deleteFlag !='undefined'){
    		this.deleteFlag = this.obj.voucherParam.deleteFlag;
    	}
    	if(typeof this.obj.voucherParam.pageNo !='undefined'){
    		this.pageNo = this.obj.voucherParam.pageNo;
    	}
    	if(typeof this.obj.voucherParam.pageSize !='undefined'){
    		this.pageSize = this.obj.voucherParam.pageSize;
    	}
    	if(typeof this.obj.voucherParam.orderByKey !='undefined'){
    		this.orderByKey = this.obj.voucherParam.orderByKey;
    	}
    	if(typeof this.obj.voucherParam.orderByValue !='undefined'){
    		this.orderByValue = this.obj.voucherParam.orderByValue;
    	}
    	if(typeof this.obj.voucherParam.goodsNameSearch !='undefined'){
    		this.goodsNameSearch = this.obj.voucherParam.goodsNameSearch;
    	}
    	if(typeof this.obj.voucherParam.orderNoSearch !='undefined'){
    		this.orderNoSearch = this.obj.voucherParam.orderNoSearch;
    	}
    	if(typeof this.obj.voucherParam.userAliasSearch !='undefined'){
    		this.userAliasSearch = this.obj.voucherParam.userAliasSearch;
    	}
    	if(typeof this.obj.voucherParam.userMobileSearch !='undefined'){
    		this.userMobileSearch = this.obj.voucherParam.userMobileSearch;
    	}
    	if(typeof this.obj.voucherParam.voucehrStatusSearch !='undefined'){
    		this.voucehrStatusSearch = this.obj.voucherParam.voucehrStatusSearch;
    	}
    	if(typeof this.obj.voucherParam.voucherType !='undefined'){
    		this.voucherType = this.obj.voucherParam.voucherType;
    	}
    	if(typeof this.obj.voucherParam.voucherDtmSearch !='undefined'){
    		this.voucherDtmSearch = this.obj.voucherParam.voucherDtmSearch;
    	}
    	if(typeof this.obj.voucherParam.activeName !='undefined'){
    		this.activeName = this.obj.voucherParam.activeName;
    	}
    	
      this.loadData();
    },
    methods:{
    	onTabClick(tab){
        this.activeName=tab.name;
        if(tab.name==='tab1'){
          this.pageNo = 1
          this.statusCode=0
          this.deleteFlag=0
        }else if(tab.name==='tab2'){
          this.pageNo = 1
          this.statusCode=1
          this.deleteFlag=0
        }else if(tab.name==='tab3'){
          this.pageNo = 1
          this.statusCode=2
          this.deleteFlag=0
        }else if(tab.name==='tab4'){
          this.pageNo = 1
          this.statusCode=''
          this.deleteFlag=1
        }
        this.loadData()
      },
      handleSelectionChange(val) {//全选按钮
      	this.multipleSelection = val;
      	this.isShowBatchOpt = this.multipleSelection.length > 0;
      	
      },
      getGradeStr(val){
      	var ret = '未知';
      	if(val>=7){
      		ret = '好评';
      	}else if(val>=3 && val<=6){
      		ret = '中评';
      	}else if(val<=2){
      		ret = '差评';
      	} 
      	return ret;
      },
      showMaxPicFunc(voucherId,pic,index,t){
      	var obj = $("#iDiv_voucher_data_list");
      	if(obj.find('#iDiv_voucher_'+t+'_max_'+voucherId).attr('showIndex')==index){//点击一次显示，再点击一次隐藏
	      	obj.find('.cDiv_voucher_'+t+'_min_'+voucherId).removeClass('i-div-voucher');
	      	obj.find('#iDiv_voucher_'+t+'_max_'+voucherId).hide().attr('showIndex',-1).find('img').attr('src','');
      	}else{
	      	obj.find('.cDiv_voucher_'+t+'_min_'+voucherId).removeClass('i-div-voucher').eq(index).addClass('i-div-voucher');
	      	obj.find('#iDiv_voucher_'+t+'_max_'+voucherId).show().attr('showIndex',index).find('img').attr('src',this.cloudShowUrl+pic);
      	}
      },
      showDivFunc(voucherId,t){
      	var obj = $("#iDiv_voucher_data_list").find('#iDiv_voucher_s_'+t+'_'+voucherId);
      	
      	if(obj.find("#iI_btn").hasClass('el-icon-arrow-down')){//打开状态
      		obj.find("#iDiv_content").hide();
      		obj.find("#iI_btn").removeClass('el-icon-arrow-down').addClass('el-icon-arrow-up');
      	}else{
      		obj.find("#iDiv_content").show();
      		obj.find("#iI_btn").removeClass('el-icon-arrow-up').addClass('el-icon-arrow-down');
      	}
      },
      showGoodsVoucherReplyList(row){
      	this.goToForward('goodsVoucherReplyListPage',_.cloneDeep(row));
      },
      checkGoodsVouchers(){//批量审核
      	this.goToForward('goodsVoucherCheckPage',_.cloneDeep(this.multipleSelection));
      },
      checkGoodsVoucher(row){//审核
      	this.chooseVoucher = {};
      	this.chooseVoucher.chooseVoucherList = [row];
      	this.checkGoodsVoucherDialog = true;
      	if(this.$refs.goodsVoucherCheck){
            this.$refs.goodsVoucherCheck.chooseVoucherList = this.chooseVoucher.chooseVoucherList;
        };
      },
      checkGoodsVoucherCallBack(status){//审核弹窗口回调
      	this.checkGoodsVoucherDialog = false;
      	if(status){
      		this.searchDataList();
      	}
      },
      replyGoodsVouchers(){//批量回复
      	this.goToForward('goodsVoucherReplyPage',_.cloneDeep(this.multipleSelection));
      },
      replyGoodsVoucher(row){//回复
      	this.chooseVoucher = {};
      	this.chooseVoucher.chooseVoucherList = [row];
      	this.replyGoodsVoucherDialog = true;
      	if(this.$refs.goodsVoucherReply){
            this.$refs.goodsVoucherReply.chooseVoucherList = this.chooseVoucher.chooseVoucherList;
        };
      },
      replyGoodsVoucherCallBack(status){//回复弹窗口回调
      	this.replyGoodsVoucherDialog = false;
      	if(status){
      		this.searchDataList();
      	}
      },
      deleteGoodsVoucher(row){//删除评论
      	this.deleteMallGoodsVoucher([row],0)
      },
      deleteGoodsVouchers(){//批量删除评论
      	this.deleteMallGoodsVoucher(this.multipleSelection,1)
      },
      loadData(){
      	$(".cDiv_voucher_max_all").hide().find("img").attr("src","");//清理掉放到的图片
        var param ={
        	 pageNo: this.pageNo
        	,pageSize: this.pageSize
        	,orderByKey: this.orderByKey
        	,orderByValue: this.orderByValue
        	,goodsName: this.goodsNameSearch
        	,orderNo: this.orderNoSearch
        	,userAlias: this.userAliasSearch
        	,userMobile: this.userMobileSearch
        	,statusCode: this.statusCode
          ,deleteFlag: this.deleteFlag
          ,shopId: this.shopId
        };
      	//处理评论/追评时间
      	if(this.voucherType == '评论'){
      		if(this.voucherDtmSearch[0] && this.voucherDtmSearch[1]){
	      		param.voucherDtmSt = dateFormat(this.voucherDtmSearch[0],'yyyy-MM-dd')+' 00:00:00';
	      		param.voucherDtmEt = dateFormat(this.voucherDtmSearch[1],'yyyy-MM-dd')+' 23:59:59';
      		}
      	}else{
      		if(this.voucherDtmSearch[0] && this.voucherDtmSearch[1]){
	      		param.secondVoucherDtmSt = dateFormat(this.voucherDtmSearch[0],'yyyy-MM-dd')+' 00:00:00';
	      		param.secondVoucherDtmEt = dateFormat(this.voucherDtmSearch[1],'yyyy-MM-dd')+' 23:59:59';
      		}
      	}
      	//处理评论状态
      	if(this.voucehrStatusSearch==1){//好评
      		param.grade = '7-10';
      	}else if(this.voucehrStatusSearch==2){//中评
      		param.grade = '3-6';
      	}else if(this.voucehrStatusSearch==3){//差评
      		param.grade = '1-2';
      	}else if(this.voucehrStatusSearch==4){//追评
      		param.isSecondVoucher = 1;
      	}else if(this.voucehrStatusSearch==5){//晒图
      		param.isPic = 1;
      	}
      	
      	this.multipleSelection = [];
      	
        this.loading = true;
        getMallGoodsVoucherList(param).then((data) => {
        	this.loading = false;
            const {success,msg,result}=data;
            //console.log(JSON.stringify(result))
            if(success){
                this.dataList = result.rows ;
                this.dataList.forEach((item)=>{
                	item.gradeHalf = item.grade /2;
                	item.gradeStr = this.getGradeStr(item.grade);
                	item.picList = typeof item.pics !='undefined' && item.pics !='' ? item.pics.split(",") : [];//晒图
                	if(item.isSecondVoucher==1){//处理追评
	                	item.secondVoucherDays = Math.floor((item.secondVoucherDtm - item.voucherDtm) / (24*60*60*1000));
	                	item.secondPicList = typeof item.secondVoucherPics !='undefined' && item.secondVoucherPics !='' ? item.secondVoucherPics.split(",") : [];//晒图
                	}
                	item.goodsPic0 = typeof item.goodsPic !='undefined' && item.goodsPic !='' ? item.goodsPic.split(",")[0] : '';//商品第一张图片
                	item.voucherDtm_str = dateFormat(item.voucherDtm,'yyyy-MM-dd HH:mm:ss');
                	item.isTop_str = this.isTopMap[item.isTop];
                	item.replyList.forEach((it)=>{
                		it.shopReplyDtm_str = dateFormat(it.shopReplyDtm,'yyyy-MM-dd HH:mm:ss');
                	});
                	item.voucherSignList = [];
                	if(item.voucherSign && item.voucherSign.length>0){
                		item.voucherSignList = item.voucherSign.split(',');
                		if(item.voucherOtherSign && item.voucherOtherSign.length>0){
                			item.voucherSignList.push(item.voucherOtherSign);
                		}
                	}
                });
                if(this.pageNo <=1){//因为只有第一页带总记录数
                	this.total = result.total;
                }
            }else{
            	this.$message({
                type: 'error',
                message: msg
              });
            }
        });
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
      modifyGoodsVoucherIsTop(row,isTop){
        this.$confirm('确定把该评论设置为'+(this.isTopMap[isTop])+'么？', '提示', {
          type: 'warning'
        }).then(() => {//确定
           var param ={
             voucherId: row.voucherId,
             isTop: isTop,
          };
          modifyMallGoodsVoucher(param).then((data) => {
              const {success,msg,result}=data;
              this.$message({
                type: success? 'success':'error',
                message: msg
              });
              if(success){
                for(var i=0,li=this.dataList.length; i<li; i++){
                  if(this.dataList[i].voucherId==row.voucherId){
		              	this.dataList[i].isTop = isTop;
		              	this.dataList[i].isTop_str = this.isTopMap[isTop];
                    break;
                  }
                }
                
              }
          }); 
          
        }).catch(() => {//取消
                    
        });
         
      },
      deleteMallGoodsVoucher(rows,t){//t=0是行 1是批量
      	
      	this.$confirm('确定把'+(t==1?'所选的':'该')+'评论删除么？', '提示', {
          type: 'warning'
        }).then(() => {//确定
        	var vids =[];
	     		for(var i=0,li=rows.length; i<li; i++){
	     			vids.push(rows[i].voucherId);
	     		}
	     		var param = {
	     			voucherId: vids.join(',')
	     		};
	     		
	        deleteMallGoodsVoucher(param).then((data) => {
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
      goToForward(url,row){
      	this.obj.voucherParam.activeName = this.activeName;
      	this.obj.voucherParam.statusCode = this.statusCode;
      	this.obj.voucherParam.deleteFlag = this.deleteFlag;
      	this.obj.voucherParam.pageNo = this.pageNo;
      	this.obj.voucherParam.pageSize = this.pageSize;
      	this.obj.voucherParam.orderByKey = this.orderByKey;
      	this.obj.voucherParam.orderByValue = this.orderByValue;
      	this.obj.voucherParam.goodsNameSearch = this.goodsNameSearch;
      	this.obj.voucherParam.voucherDtmSearch = this.voucherDtmSearch;
      	this.obj.voucherParam.orderNoSearch = this.orderNoSearch;
      	this.obj.voucherParam.userAliasSearch = this.userAliasSearch;
      	this.obj.voucherParam.userMobileSearch = this.userMobileSearch;
    	
      	this.obj.voucher = row;
      	this.$emit('forward', url, this.obj);
      },
      //**********************   
    }
  }
</script>
