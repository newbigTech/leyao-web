<template>
	<div id="iDiv_show_order_voucher_list" class="_table-list">
   <el-table :data="dataList" stripe style="width: 100%" border>
    <el-table-column align="center" label="买家信息" width="160">
        	<template scope="scope">
        		<div style="padding:10px 0;">
	          	<div style="height:64px;">
	          		<img style="width:64px;height:64px;border-radius:50%;" :src="cloudShowUrl + scope.row.userPic">
	          	</div>
        			<p>{{scope.row.userAlias}}</p>
        			<p>{{scope.row.userMobile}}</p>
        		</div>
        	</template>
    </el-table-column>
    <el-table-column align="left" label="评论内容" width="">
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
	          	<span title="商品名称" style="margin-right:10px;">{{scope.row.goodsSkuFullName}}</span>
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
      				    <i id="iI_btn" class="el-icon-arrow-up" style="color:#666;" title="显示/隐藏店铺回复内容"></i>
      				 </a>
      				店铺回复：
      			</p>
      			<div id="iDiv_content" style="display: none;">
        			<div v-for="x in scope.row.replyList">
        				<p>{{x.shopReplyNote}}</p>
        				<p style="color:#999;">{{x.shopReplyDtm_str}}</p>
        			</div>
      			</div>
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
	  <el-dialog title="回复商品评论" v-model="goodsVoucherReplyListDialog" class="shop-img-file-dialog">
    	<goodsVoucherReplyList :obj="chooseVoucher"></goodsVoucherReplyList>
	  </el-dialog>
	</div>
  
</template>
<script>
	import { 
  	 getMallGoodsVoucherList,
  } from 'src/vuex/actions/goodsVoucherAction'
	import goodsVoucherReplyList from 'pages/main/mall/shop/voucher_mng/goodsVoucherReplyList'
  import {dateFormat} from 'lib/utils/dateFormat.js'
  export default {
	  name: 'coupons_for_goods',
  	components: {
     goodsVoucherReplyList
    },
	  props: {
      paramObj: {
        type: Object,
        default: {}
      }
    },
	  computed: {
	    cloudShowUrl() {
      	return this.$store.getters.cloudShowUrl
      },
	  },
	  data() {
	    return {
        dataList:[],
        pageNo :1,
        pageSize :10,
        total: 0,
        orderByKey:'',
        orderByValue:'',
        titleName:this.paramObj.isGoods==1?'商品':'店铺',
      	goodsId:this.paramObj.goodsId,//goodsId和shopId二选一
      	shopId:this.paramObj.shopId,//goodsId和shopId二选一
      	isTopMap:{'-1':'隐藏','0':'普通','1':'精评'},
        goodsVoucherReplyListDialog:false,
        chooseVoucher:{},
	    }
	  },
	  methods: {
	  	onSuccess(){
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
      	var obj = $("#iDiv_show_order_voucher_list");
      	if(obj.find('#iDiv_voucher_'+t+'_max_'+voucherId).attr('showIndex')==index){//点击一次显示，再点击一次隐藏
	      	obj.find('.cDiv_voucher_'+t+'_min_'+voucherId).removeClass('i-div-voucher');
	      	obj.find('#iDiv_voucher_'+t+'_max_'+voucherId).hide().attr('showIndex',-1).find('img').attr('src','');
      	}else{
	      	obj.find('.cDiv_voucher_'+t+'_min_'+voucherId).removeClass('i-div-voucher').eq(index).addClass('i-div-voucher');
	      	obj.find('#iDiv_voucher_'+t+'_max_'+voucherId).show().attr('showIndex',index).find('img').attr('src',this.cloudShowUrl+pic);
      	}
      },
      showDivFunc(voucherId,t){
      	var obj = $("#iDiv_show_order_voucher_list").find('#iDiv_voucher_s_'+t+'_'+voucherId);
      	
      	if(obj.find("#iI_btn").hasClass('el-icon-arrow-down')){//打开状态
      		obj.find("#iDiv_content").hide();
      		obj.find("#iI_btn").removeClass('el-icon-arrow-down').addClass('el-icon-arrow-up');
      	}else{
      		obj.find("#iDiv_content").show();
      		obj.find("#iI_btn").removeClass('el-icon-arrow-up').addClass('el-icon-arrow-down');
      	}
      },
      showGoodsVoucherReplyList(row){//审核
      	this.chooseVoucher = row;
      	this.goodsVoucherReplyListDialog = true;
      },
	    //***查询*****
      loadData(){
      	$(".cDiv_voucher_max_all").hide().find("img").attr("src","");//清理掉放到的图片
        var param ={
           pageNo: this.pageNo
          ,pageSize: this.pageSize
          ,orderByKey: this.orderByKey
          ,orderByValue: this.orderByValue
        };
        if(this.paramObj.isGoods==1){
        	param.goodsId = this.goodsId;
        }else{
       	  param.shopId = this.shopId;
        }
        this.loading = true;
        getMallGoodsVoucherList(param).then((data) => {
        	this.loading = false;
            const {success,result}=data;
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
      goback(){
      	this.$emit('forward',this.paramObj.gobackUrl);
      },
      //*******************************************
    
	  },
	  created() {
	  	this.loadData();
	  }
	}
	;(function($) {

    $.museum = function(el, options) {

        var defaults = {
            namespace: 'msm',
            padding: 25,
            disable_url_hash: true,
        }

        var plugin = this;
        plugin.settings = {}
        plugin.current_image = null;
        plugin.loaded = false;

        var init = function() {
            plugin.settings = $.extend({}, defaults, options);
            plugin.el = el;
            plugin.images = [];
            plugin.el.each(function(i, e) {
                var src = $(e).attr('src');
                var title = $(e).attr('title');
                plugin.images[i] = {
                    src: src,
                    title: title,
                    elem: e,
                };
                $(this).wrap($('<a>').attr('href', 'javascript:void(0);').attr("src",src).bind('click', function(ev){
                    if(!ev.metaKey) {
                        ev.preventDefault();
                        plugin.show_image(i);
                    }
                }));
            });
            $(document).keydown(function(e) {
                if (e.keyCode == 27) {
                    // escape key
                    plugin.close();
                } else if(e.keyCode == 39) {
                    // right key
                    plugin.next_image()
                } else if(e.keyCode == 37) {
                    // left key
                    plugin.prev_image()
                }
            });

            $(window).on('hashchange.'+plugin.settings.namespace, plugin.set_image_based_on_hash)
            plugin.set_image_based_on_hash()

        }

        plugin.set_image_based_on_hash = function() {
            if((window.location.hash == '' || window.location.hash == '#') && plugin.loaded === true) {
                plugin.close();
            } else {
                var plugin_hash ='#' + plugin.settings.namespace+'-gallery';
                if(window.location.hash.substring(0, plugin_hash.length) === plugin_hash) {
                    var image_id = window.location.hash.split('-')[2];
                    if(parseInt(image_id) != parseInt(plugin.current_image)) {
                        plugin.show_image(image_id);
                    }
                }
            }
        }

        plugin.show_image = function(i) {
            if(plugin.loaded === false) {
                plugin.container = $('<div>')
                    .addClass(plugin.settings.namespace + '-gallery')
                    .appendTo($('body'))
                    .css({
                        'position': 'absolute',
                        'top': '0',
                        'left': '0',
                        'width': $(document).width() + 'px',
                        'height': $(document).height() + 'px',
                        'background': 'rgba(0, 0, 0, 0.7)',
                        'text-align': 'center',
                        'z-index':2147483647,
                    })
                    .bind('click', function(e){
                        e.preventDefault();
                        plugin.close();
                    });

                plugin.content = $('<div>')
                    .addClass(plugin.settings.namespace + '-content')
                    .css({
                        'visibility': 'invisible',
                    })
                    .on('click', 'img', function(e) {
                        e.stopPropagation();
                        plugin.next_image();
                    });

                plugin.loaded = true;
            }

            if(plugin.settings.disable_url_hash !== true) {
                window.location.hash = plugin.settings.namespace + '-gallery-' + i;
            }

            plugin.current_image = i;
            plugin.content.empty();
            var window_height = window.innerHeight ? window.innerHeight : $(window).height()
            var window_width = window.innerWidth ? window.innerWidth : $(window).width()

            plugin.image = $('<img>')
                .css({
                    'max-height': ( window_height - (plugin.settings.padding*2) ) + 'px',
                    'max-width': ( window_width - (plugin.settings.padding*2) ) + 'px',
                    'box-shadow': '0 0 15px 0 #000',
                    'cursor': 'pointer',
                    'background': 'rgba(0,0,0,0.6)',
                })
                .attr('src', plugin.images[i].src)
                .appendTo(plugin.content);

            plugin.show_image_when_available();
        }

        plugin.show_image_when_available = function() {
            // we will know how wide/tall the image is once it starts downloading it
            if(plugin.image[0].height && plugin.image[0].width) {
                plugin.content = plugin.content.appendTo(plugin.container);

                var window_height = window.innerHeight ? window.innerHeight : $(window).height()
                var window_width = window.innerWidth ? window.innerWidth : $(window).width()

                var margin_top = ($(document).scrollTop() + ((window_height - plugin.image.height()) / 2));
                var margin_left = ($(document).scrollLeft() + ((window_width - plugin.image.width()) / 2));

                plugin.content.css({
                    'margin-top': margin_top + 'px',
                    'margin-left': margin_left + 'px',
                    'width': plugin.image.width(),
                    'height': plugin.image.height(),
                });
                plugin.content.css({
                    'visibility': 'visible',
                });
            } else {
                setTimeout(plugin.show_image_when_available, 50);
            }
        }

        plugin.next_image = function() {
            plugin.show_image((plugin.current_image + 1) % plugin.images.length);
        }

        plugin.prev_image = function() {
            var index = (plugin.images.length + plugin.current_image - 1) % plugin.images.length;
            plugin.show_image(index);
        }

        plugin.close = function() {
            plugin.loaded = false;
            plugin.current_image = null;
            if(plugin.settings.disable_url_hash !== true) {
                window.location.hash = '';
            }
            plugin.container.remove();
        }

        init();
    }

})(jQuery);
</script>
