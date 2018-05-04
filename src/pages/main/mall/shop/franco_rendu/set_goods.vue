<template>
  <div class="_container _franco">
    <card-panel>
      <h3 slot="title">设置商品</h3>
      <div slot="panel-btns">
        <!-- <button class="btn btn-primary btn-sm" @click="onSave">保存</button> -->
        <button class="btn btn-default btn-sm" @click="onBackPage">返回</button>
      </div>
      <div slot="panel-body">
        <div class="_setting-bar">
              <div class="_query-form">
                  <div class="_query-form-item">
                      <el-form :inline="true">
                          <el-form-item label="自提点名称:" style="width:320px;">
                              <span>{{paramObj.selfSiteName}}</span>
                          </el-form-item>
                          <el-form-item label="详细地址:" style="width:500px; height: auto;display: inline-flex;">
                              <span>{{paramObj.strProvince}} {{paramObj.strCity}} {{paramObj.strArea}} {{paramObj.selfAddress}}</span>
                          </el-form-item>
                          <el-form-item label="商品展示样式:" style="width:200px;">
                              <span>{{paramObj.goodsShowType==0?'列表':paramObj.goodsShowType==1?'二列':'三列'}}</span>
                          </el-form-item>
                      </el-form>
                  </div>
              </div>
              <div class="_actions-btn">
                <el-button type="primary" @click.native.prevent="initTable">刷新</el-button>
                <el-button type="primary" @click.native.prevent="onAddGoodsDailog">添加商品</el-button>
                <el-button type="primary" @click.native.prevent="onSaveSortIndex" :disabled="!saveSortIndexBtn">保存排序</el-button>
            </div>
          </div>
         <!-- 商品列表 -->
         <table class="table table-hover">
            <thead>
                <tr>
                  <th>#</th>
                  <th>商品</th>
                  <th>销售数量</th>
                  <th>自提购价</th>
                  <th>销售价</th>
                  <th>状态</th>
                  <th>操作</th>
                </tr>
            </thead>
            <draggable :list="tableData" :element="'tbody'" @end="saveSortIndexBtn=true">
                <tr v-for="(row,index) in tableData">
                    <td align="center"><span class="glyphicon glyphicon-sort" aria-hidden="true"></span> {{index+1}}</td>
                    <td align="center">
                        <div class="_goods-item-cell">
                            <div class="_goods-item-img"><img :src="cloudShowUrl + row.goodsPic"></div>
                            <div class="_goods-item-info">
                                <h3>{{row.goodsName}}</h3>
                                <h4 class="_goods-item-info-desc" :title="row.goodsDesc">描述： {{row.goodsDesc}}</h4>
                                <h4>编码： {{row.goodsSn}}</h4>
                                <h4>原价： {{row.goodsPrice}}</h4>
                            </div>
                        </div>
                    </td>
                    <td align="center">{{row.saleNumber}}</td>
                    <td align="center">
                      <span v-if="row.edit">
                        <vue-numeric currency="" separator="" v-model="row.price" :min="0" :precision="2" class="el-input__inner" style="width:150px;display: inline"></vue-numeric>
                      </span>
                      <span v-else>{{row.price}}</span>
                    </td>
                    <td align="center">
                      <span v-if="row.edit">
                        <vue-numeric currency="" separator="" v-model="row.costPrice" :max="row.price" :min="0" :precision="2" class="el-input__inner" style="width:150px;display: inline"></vue-numeric>
                      </span>
                      <span v-else>{{row.costPrice}}</span>
                    </td>
                    <td align="center">
                        <div :style="{color:row.statusCode==1?'#00FF00':'#FF0000' }">
                           {{row.statusCode==1?'已上架':'已下架'}}
                        </div></td>
                    <td align="center">
                        <div>
                            <el-button type="primary" size="mini" @click.native.prevent="onEdit(row)">{{row.edit?'保存':'编辑'}}</el-button>
                            <el-button :type="row.statusCode==0?'warning':'danger'" size="mini" @click.native.prevent="onSetStatus(row)">{{row.statusCode==0?'上架':'下架'}}</el-button>
                            <el-button type="danger" size="mini" @click.native.prevent="onDel(row,index)">删除</el-button>
                        </div>
                    </td>
                </tr>
            </draggable>
        </table>
      </div>
    </card-panel>
    <shop-goods ref="shopGoodsComm" @onSuccess="getShopGoodSuccess"></shop-goods>
  </div>
</template>

<script>
  import ShopGoods from '../groupon_activity/shop-goods'
  import VueNumeric from 'vue-numeric'
  import draggable from 'vuedraggable'
  import {querySelfPurchaseGoodsList,saveSelfPurchaseGoods,saveSelfPurchaseGoodsPrice,delSelfPurchaseGoods,saveSelfPurchaseGoodsStatus,saveSelfPurchaseGoodsSort} from 'actions/francoRenduAction'
  export default {
    components: { VueNumeric,ShopGoods,draggable},
    props: {
      paramObj: {
        type: Object,
          default: {
          }
        }
    },
    computed: {
      cloudShowUrl() {
            return this.$store.getters.cloudShowUrl
        }
    },
    data() {
      return {
        saveSortIndexBtn:false,
        tableData:[]
      }
    },
    methods: {
      onSaveSortIndex(){
        let listJson = []
        _.each(this.tableData, (item, index) => {
            listJson.push({
                'selfGoodsId': item.selfGoodsId,
                'sortIndex': index + 1
            })
        })
        if (listJson.length === 0)
            return false
        let params = {
            'listJson':JSON.stringify(listJson)
        }
        saveSelfPurchaseGoodsSort(params).then(data => {
          const { success, msg, result } = data
          if (success) {
              this.$message.success('操作成功')
              this.saveSortIndexBtn=false
          } else {
              this.$message.error(msg)
              return false
          }
        })
      },
      onSetStatus(row){
        let params={
          selfGoodsId:row.selfGoodsId,
          statusCode:row.statusCode==0?1:0
        }
        saveSelfPurchaseGoodsStatus(params).then(data=>{
          const { success, msg, result } = data
          if (success) {
                this.$message.success('操作成功')
                row.statusCode=row.statusCode==0?1:0
            } else {
                this.$message.error(msg)
                return false
            }
        })
      },
      onDel(row,index){
        this.$confirm("确认移除吗？","确认提示",{
          type:'warning'
        }).then(()=>{
          delSelfPurchaseGoods(row).then(data=>{
            const { success, msg, result } = data
            if (success) {
                this.$message.success('操作成功')
                this.tableData.splice(index,1)
            } else {
                this.$message.error(msg)
                return false
            }
          })
        }).catch(()=>{})
      },
      onEdit(row){
        if(row.edit){//保存
           //调用修改价格接口
           saveSelfPurchaseGoodsPrice(row).then(data=>{
              const { success, msg, result } = data
              if (success) {
                  row.edit=false
                  this.$message.success('操作成功')
              } else {
                  this.$message.error(msg)
                  return false
              }
           })
        }else{
          row.edit=true
        }
      },
      onAddGoodsDailog(){
        this.$refs.shopGoodsComm.goodsDataVisible = true
      },
      getShopGoodSuccess(data) {
        //console.log('data',JSON.parse(JSON.stringify(data)))
        if(_.findIndex(this.tableData,{goodsId:data.id,goodsSkuId:data.goodsSkuId || 0})!==-1){
          return false
        }
        if(this.tableData.length>19){
          this.$message.info('最多允许添加20个商品')
          return false
        }
        let params={
          selfPurchaseId:this.paramObj.selfPurchaseId,
          goodsId:data.id,
          goodsSkuId:data.goodsSkuId || 0,
          goodsPrice:data.row.price,
          price:data.row.price,
          costPrice:data.row.price,
          sortIndex:this.tableData.length,
          goodsPic:data.goodsPic,
          goodsName:data.name,
          goodsSn:data.goodsSn,
          goodsDesc:data.goodsDesc,
          saleNumber:0,
          statusCode:1,
          edit:false
        }
        //调用保存商品接口
        saveSelfPurchaseGoods(params).then(data=>{
          const { success, msg, result } = data
          if (success) {
              this.$message.success('操作成功')
              params.selfGoodsId=result.selfGoodsId
              this.tableData.push(params)
          } else {
              this.$message.error(msg)
              return false
          }
        })
        //console.log('getShopGoodSuccess',JSON.stringify(params))
      },
      onBackPage(){
        this.$emit('forward', 'RenduList')
      },
      initTable(){//初始化表格数据
        let params={
          selfPurchaseId:this.paramObj.selfPurchaseId
        }
        querySelfPurchaseGoodsList(params).then(data=>{
          this.tableData=data||[]
        })
      }
    },
    created() {
      this.initTable()
    }
  }
</script>

<style>
  ._franco .el-form-item__label { white-space: nowrap; }
  ._franco ._goods-item-info-desc {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 350px;
  }
</style>
