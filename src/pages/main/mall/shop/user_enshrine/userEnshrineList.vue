<template>
    <div class="_table-list">
      <el-table :data="dataList" stripe style="width: 100%" border>
        <el-table-column align="center" label="" width="70" inline-template>
        	<div style="padding:5px 0;">
              <div style="height:32px;"><img style="width:32px;height:32px;" :src="cloudShowUrl + row.userPic"></div>
          </div>
        </el-table-column>
        <el-table-column property="userAlias" label="用户名" min-width="120" align="center"></el-table-column>
        <el-table-column property="userMobile" label="手机号" min-width="130" align="center"></el-table-column>
        <el-table-column property="nickName" label="昵称" min-width="120" align="center"></el-table-column>
        <el-table-column property="realName" label="姓名" min-width="120" align="center"></el-table-column>
        <el-table-column property="enshrineDtm_str" label="收藏时间" width="180"></el-table-column>
        <el-table-column inline-template label="操作" width="80" v-if="paramObj.isShopMng!=1">
        	<div>
            <el-button size="small" type="danger" @click.stop.prevent="onDelRow(row)">取消</el-button>
          </div>
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
</template>
<script>
	import { 
  	 getMallUserEnshrineList,
  	 deleteMallUserEnshrine,
  } from 'src/vuex/actions/userEnshrineAction'
  import {dateFormat} from 'lib/utils/dateFormat.js'
  export default {
	  name: 'coupons_for_goods',
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
      	goodsId:this.paramObj.goodsId,//goodsId和shopId二选一
      	shopId:this.paramObj.shopId,//goodsId和shopId二选一
	    }
	  },
	  methods: {
	  	onSuccess(){
	  	},
	    //***查询*****
      loadData(){
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
        getMallUserEnshrineList(param).then((data) => {
        	this.loading = false;
            const {success,result}=data;
            //console.log(JSON.stringify(result))
            if(success){
                this.dataList = result.rows;
                this.dataList.forEach((item,index)=>{
                  item.enshrineDtm_str = dateFormat(item.enshrineDtm,'yyyy-MM-dd HH:mm:ss');
                  
					      });
					      if(this.pageNo <=1){//因为只有第一页带总记录数
                  this.total = result.total;
                }
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
      onDelRow(row) {
        this.$confirm('是否确认取消该用户关注么?', '提示', {
          type: 'warning'
        }).then(() => {
        	var param = {enshrineId:row.enshrineId};
        	if(this.paramObj.isGoods==1){
	        	param.goodsId = this.goodsId;
	        }else{
	       	  param.shopId = this.shopId;
	        }
          deleteMallUserEnshrine(param).then(data => {
            const {success,msg,result}=data;
              this.$message({
                type: success? 'success':'error',
                message: msg
            });
            if(success){
              this.loadData();
            	var em = $.trim($("#iGd_detail").find(".cSpn_enshrineNumber").text());
            	em = parseInt(em,10);
            	$("#iGd_detail").find(".cSpn_enshrineNumber").text(em>0?em-1:0);
            }
          })
        }).catch(() => {});
      },
      //*******************************************
    
	  },
	  created() {
	  	this.loadData();
	  }
	}
</script>
