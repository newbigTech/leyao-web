<template>
<div class="_row-left-right">
  <div class="_row-left">
    <card-panel>
      <div slot="title"> 换购商品列表</div>
      <div slot="panel-body">
        <!-- 活动添加 -->
        <card-panel>
          <div slot="panel-table">
            <div class="_table-list">
				      <el-table :data="obj.exchangeList" stripe border :row-class-name="tableRowClassName">
				        <el-table-column align="center" property="goodsSn" label="商品编码"></el-table-column>
        				<el-table-column align="center" property="goodsName" label="商品名称" min-width="160"></el-table-column>
				        <el-table-column align="center" property="goodsPrice" label="销售价" min-width="100"></el-table-column>
				        <el-table-column align="center" property="price" label="换购价" min-width="130"></el-table-column>
				        <el-table-column align="center" inline-template label="商品状态" min-width="160">
				          <div><!-- 商品表statusCode=1是上架 -->
				            <div v-if="row.statusCode != 1"  style="color:red;text-decoration:line-through;" title="该商品已被下架">已下架</div>
				            <div v-if="row.statusCode == 1">上架中</div>
				          </div>
				        </el-table-column>
				      </el-table>
            </div>
          </div>
        </card-panel>
        
      </div>
    </card-panel>
  </div>
</div>
</template>
<style>
</style>
<script>

  import {dateFormat} from 'lib/utils/dateFormat.js'
  import prettysize from "lib/utils/prettysize"
  import RegExp from 'lib/utils/regexp'
  import _ from "lodash"
  export default {
    props: {
      obj: {
        type: Object,
        default: {}
      }
    },
    components:{},
    data(){
      var _this = this;
      //console.log(this.obj)
      return {
      	loading:false,//遮罩层
      	exchangeList:[],
      	//*************************
      }
    },
    created(){
    },
    methods:{
    	tableRowClassName(row, index) {
        return 'sds'
      },
      //**********************  
    },
    mounted(){
      
    }
  }
</script>
