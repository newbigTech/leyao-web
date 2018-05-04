<template>
<div class="_row-left-right">
  <div class="_table-container">
    <div id="iDiv_voucher_reply" class="_table-list">
    	<el-table :data="dataList" stripe style="width: 100%" border>
        <el-table-column align='left' label="商品评论回复内容" min-width="600">
        	<template scope="scope">
        		<div style="margin-top:15px;">
        			<p><span style="color:#005ea7;">{{scope.row.user_str}}</span>：
        				<el-tooltip v-if="scope.row.parentReplyId>0" style="display:inline-block;" placement="right">
        					回复
        					<div slot="content">{{scope.row.parentReplyDtm_str}}：<br/>{{scope.row.parentReplyNote}}</div>
        					<span style="color:#005ea7;">{{scope.row.parentReplyType===0?'店铺':scope.row.parentUserMobile}}</span>
        				</el-tooltip>
        			</p>
        			<div id="iDiv_content">
	        			<div>
	        				<p :style="scope.row.replyType===0?'color:#ff561c;':'#1f2d3d;'">{{scope.row.replyNote}}</p>
	        				<p style="color:#999;">{{scope.row.replyDtm_str}}</p>
	        			</div>
        			</div>
        		</div>
        	</template>
        </el-table-column>
    	</el-table>
    </div>
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
</template>
<style>
</style>
<script>
  import { getMallGoodsVoucherReplyList } from 'src/vuex/actions/goodsVoucherAction'
  import {dateFormat} from 'lib/utils/dateFormat.js'
  export default {
    props: {
      obj: {
        type: Object,
        default: {}
      }
    },
    components:{},
    computed: {
	    cloudShowUrl() {
      	return this.$store.getters.cloudShowUrl
      },
	  },
    data(){
      var _this = this;
      //console.log(this.obj)
      return {
      	loading:false,//遮罩层
        dataList:[],
        pageNo :1,
        pageSize :10,
        total: 0,
      	//*************************
      }
    },
    created(){
    	this.searchDataList();
    },
    methods:{
      loadData(){
        var param ={
        	 pageNo: this.pageNo
        	,pageSize: this.pageSize
          ,voucherId: this.obj.voucherId
        };
      	
        this.loading = true;
        getMallGoodsVoucherReplyList(param).then((data) => {
        	this.loading = false;
            const {success,msg,result}=data;
            //console.log(JSON.stringify(result))
            if(success){
                this.dataList = result.rows ;
                this.dataList.forEach((item)=>{
                	item.replyDtm_str = dateFormat(item.replyDtm,'yyyy-MM-dd HH:mm:ss');
                	item.user_str = item.replyType===0? '店铺' : item.userMobile;
                	if(item.parentReplyDtm){
                		item.parentReplyDtm_str = dateFormat(item.parentReplyDtm,'yyyy-MM-dd HH:mm:ss');
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
      //**********************  
    },
    mounted(){
      
    }
  }
</script>
