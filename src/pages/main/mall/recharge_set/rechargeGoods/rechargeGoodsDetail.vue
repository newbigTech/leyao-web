<template>
<div class="_container">
  <card-panel class="_normal">
    <h3 slot="title">充值规则明细</h3>
    <div slot="panel-btns"> <el-button size="small" type="primary" @click.native.prevent="$emit('reback', 'rechargeGoodsList',obj)" >返回</el-button></div>
    <div slot="panel-body">
      <div class="_panel-body-container">
        <div class="_panel-body-lr">
          <div class="_panel-body-left" style="width: 520px;">
            <card-panel>
              <h3 slot="title">基本信息</h3>
              <div slot="panel-body">
                <el-form ref="rechargeGoodsObj" :model="rechargeGoodsObj" label-width="110px">
                  <el-form-item label="商品名称">
                     <el-input placeholder="请输入商品名称" v-model="rechargeGoodsObj.goodsName" :disabled="true"></el-input>
                  </el-form-item>
                  <el-form-item label="商品全名">
                     <el-input placeholder="请输入商品全名" v-model="rechargeGoodsObj.goodsFullName" :disabled="true"></el-input>
                  </el-form-item>
                  <el-form-item label="充值金额">
                     <el-input placeholder="请输入充值金额" v-model="rechargeGoodsObj.topUpAmount" :disabled="true"></el-input>
                  </el-form-item>
                  <el-form-item label="是否推荐">
                    <el-radio-group v-model="rechargeGoodsObj.isHot">
                      <el-radio v-if="rechargeGoodsObj.isHot==0" disabled :label="0">否</el-radio>
                      <el-radio v-if="rechargeGoodsObj.isHot==1" disabled :label="1">是</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="状态">
                    <el-radio-group v-model="rechargeGoodsObj.statusCode">
                      <el-radio v-if="rechargeGoodsObj.statusCode==0" disabled :label="0">下架</el-radio>
                      <el-radio v-if="rechargeGoodsObj.statusCode==1" disabled :label="1">上架</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="排序" prop="sortIndex">
                     <el-input-number v-model="rechargeGoodsObj.sortIndex" :min="0" :max="1000000" :disabled="true"></el-input-number>
                  </el-form-item>
                 <!-- <el-form-item label="分期返还">
                    <el-radio-group v-model="rechargeGoodsObj.isLock">
                      <el-radio v-if="rechargeGoodsObj.isLock==0" disabled :label="0">否</el-radio>
                      <el-radio v-if="rechargeGoodsObj.isLock==1" disabled :label="1">是</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="锁定期数(1-12)">
                     <el-input-number v-model="rechargeGoodsObj.lockMonth" :min="0" :max="12" :disabled="true"></el-input-number>
                  </el-form-item>
                  -->
                  <el-form-item label="充值时间设置">
                    <el-radio-group v-model="rechargeGoodsObj.isTime">
                      <el-radio v-if="rechargeGoodsObj.isTime==0" disabled :label="0">无</el-radio>
                      <el-radio v-if="rechargeGoodsObj.isTime==1" disabled :label="1">有</el-radio>
                    </el-radio-group>
                  </el-form-item>
                  <el-form-item label="充值时间段" v-if="rechargeGoodsObj.isTime">
                    <el-col :span="10">
                      <el-form-item>
                        <el-input v-model="rechargeGoodsObj.beginDay" :disabled="true"></el-input>
                      </el-form-item>
                    </el-col>
                    <el-col class="line" :span="2" style="text-align: center;"> ~ </el-col>
                    <el-col :span="10">
                      <el-form-item>
                        <el-input v-model="rechargeGoodsObj.endDay" :disabled="true"></el-input>
                      </el-form-item>
                    </el-col>
                  </el-form-item>
                  <el-form-item label="商品图片">
                    <div class="_img-groups">
                      <div class="_img-groups-container">
                        <div class="_img-group">
                          <div class="_img-box">
                            <div class="_img-box-view">
                              <img :src="obj.cloudShowUrl + rechargeGoodsObj.goodsPic">
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </el-form-item>
                  <el-form-item label="商品简介">
                    <el-input type="textarea" v-model="rechargeGoodsObj.goodsDesc" :disabled="true"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </card-panel>
          </div>
          <div class="_panel-body-right">
            <card-panel>
              <h3 slot="title">赠送商品 <el-tag type="danger" style="background-color: transparent">赠送金额合计: <strong style="font-size: 13px; font-weight: 500;">{{rechargeGoodsObj.givenAmount}}</strong></el-tag></h3>
              <div slot="panel-body">
                <el-table :data="rechargeGoodsObj.goodsItem" stripe border>
                  <el-table-column align="center" prop="itemTypeStr" label="类型" width="120"></el-table-column>
                  <el-table-column align="center" inline-template label="名称" min-width="150">
                    <div>
                      <div v-show="row.status == -1" style="color:red;text-decoration:line-through;" title="该优惠券/商品已被删除">{{row.itemName}}</div>
                      <div v-show="row.status == 0"  style="color:red;text-decoration:line-through;" title="该优惠券/商品已被下架">{{row.itemName}}</div>
                      <div v-show="row.status == 1">{{row.itemName}}</div>
                    </div>
                  </el-table-column>
                  <el-table-column align="center" prop="itemPrice" label="赠送价值" width="120"></el-table-column>
                </el-table>
              </div>
            </card-panel>
          </div>
        </div>
      </div>
    </div>
  </card-panel>
</div>
</template>
<style>
</style>
<script>
  import { 
		getMallRechargeGoodsItemList
  } from 'src/vuex/actions/rechargeGoodsAction'
  import {dateFormat} from 'lib/utils/dateFormat.js'
  import _ from "lodash"
  export default {
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
      	uploading:0,
      	previewPic:'',
        picMD5_0: '',
        goodsTypeMap:{0: '单品商品', 1:'规格商品', 2:'组合商品'},
      	rechargeGoodsObj:{
      		goodsName:'',
      		goodsFullName:'',
      		sortIndex:0,
      		topUpAmount:'0.00',
      		givenAmount:0.00,
      		isLock:0,
      		lockMonth:0,
      		goodsPic:'',
      		goodsDesc:'',
      		isHot:0,
      		isTime:0,
      		beginDay:'',
      		endDay:'',
      		statusCode:1,
      		goodsItem:[],
      	}
      	//*************************
      }
    },
    created(){
      this.rechargeGoodsObj = _.cloneDeep(this.obj.goods);
      this.rechargeGoodsObj.goodsItem = [];
      //加载goodsItem
      this.loadGoodsItemList();
    },
    methods:{
      changeTab(tab){
      	//console.log(tab)
      },
      loadGoodsItemList(){
      	var param ={
        	 goodsId: this.rechargeGoodsObj.goodsId
        };
      	this.loading = true;
        getMallRechargeGoodsItemList(param).then((data) => {
        	this.loading = false;
            const {success,result}=data;
            //console.log(JSON.stringify(result))
            if(success){
            	var goodsItemList = [];
            	var givenAmount = 0.00;
            	var row;
              for(var i=0,li=result.length; i<li; i++){
              	row = result[i];
              	goodsItemList.push({
	              	itemType:row.itemType,
				      		itemTypeStr:row.itemType==0?'优惠券':this.goodsTypeMap[row.goodsType],
				      		itemName:row.itemName,
				      		itemVal1:row.itemVal1,
				      		itemVal2:row.itemVal2,
				      		sortIndex:row.sortIndex,
				      		itemPrice:row.itemPrice,
				      		status: row.deleteFlag==1?-1:(row.statusCode==0?0:1),
              	});
              	givenAmount += row.itemPrice;
              }
              this.rechargeGoodsObj.goodsItem = goodsItemList;
              this.rechargeGoodsObj.givenAmount = givenAmount.toFixed(2);
            }
        });
      },
      
      //**********************   
    },
    mounted(){
      
    }
  }
</script>
