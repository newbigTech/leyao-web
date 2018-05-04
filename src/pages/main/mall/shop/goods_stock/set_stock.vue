<!-- 商品新增修改主界面-->
<template>
  <div class="_container">
    <card-panel>
      <span slot="title">商品库存设置</span>
      <div slot="panel-btns"> <el-button size="small" type="success" @click.native.prevent="$emit('forward','GoodsList')">返回商品列表</el-button> </div>
      <div slot="panel-body">
        <el-form :model="goodsObj" label-width="100px">
          <!-- <el-form-item label="商品名称">
            <el-tag>{{rowData.goodsName}}</el-tag>
          </el-form-item>
          <el-form-item label="商品编码">
            <el-tag>{{rowData.goodsSn}}</el-tag>
          </el-form-item> -->
          <el-form-item label="商品信息">
            <!-- 【{{rowData.goodsType == 0 ? '单品' : (rowData.goodsType == 1?'规格商品':'组合商品')}}】 
            【{{rowData.stockType == 1 ? '独立库存' : (rowData.stockType == 2?'共享库存':'独立库存')}}】【{{rowData.goodsSn}}】-{{rowData.goodsName}} -->
            <el-tooltip class="item" effect="dark" content="商品名称" placement="top" style="line-height: 24px; height: 24px;">
              <el-tag type="primary">{{rowData.goodsName}}</el-tag>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="商品编码" placement="top" style="line-height: 24px; height: 24px;">
              <el-tag type="primary">{{rowData.goodsSn}}</el-tag>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="商品类型" placement="top" style="line-height: 24px; height: 24px;">
              <el-tag type="danger">{{rowData.goodsType == 0 ? '单品' : (rowData.goodsType == 1?'规格商品':'组合商品')}}</el-tag>
            </el-tooltip>
            <el-tooltip class="item" effect="dark" content="库存类型" placement="top" style="line-height: 24px; height: 24px;">
              <el-tag type="danger">{{rowData.stockType == 1 ? '独立库存' : (rowData.stockType == 2?'共享库存':'独立库存')}}</el-tag>
            </el-tooltip>
          </el-form-item>
          <el-form-item label="当前总库存">
            <span v-if="rowData.goodsType == 1 && rowData.stockType == 3"> - </span>
            <el-input v-else :value="rowData.stockType == 0 ? '-' : (rowData.goodsType == 2 ? '-' : rowData.stockNumber)" style="width: 180px;" disabled></el-input>
          </el-form-item>
          <!-- <el-form-item label="库存类型">
              <el-radio-group v-model.number="goodsObj.stockType" @change="onStockTypeChange">
                  <el-radio :label="0">无限制</el-radio>
                  <el-radio :label="1" v-show="goodsObj.goodsType==0">独立库存</el-radio>
                  <el-radio :label="2" v-show="goodsObj.goodsType==1">共享库存</el-radio>
                  <el-radio :label="3" v-show="goodsObj.goodsType==1">独立库存</el-radio>
              </el-radio-group>
          </el-form-item> -->
          <el-form-item label="增加库存数" v-show="goodsObj.stockType===1||goodsObj.stockType===2">
            <el-input-number v-model.number="goodsObj.addNumber" :min="-99999" :max="99999" :maxlength="5"></el-input-number>
          </el-form-item>
          <el-form-item label="规格列表" v-if="rowData.goodsType == 1">
            <el-table :data="goodSkuList" border stripe>
              <el-table-column prop="goodsSkuId" label="ID" width="90" align="center"></el-table-column>
              <el-table-column prop="goodsSkuName" label="规格名称" min-width="120" align="center"></el-table-column>
              <el-table-column prop="goodsSn" label="商品编号" width="120" align="center"></el-table-column>
              <el-table-column inline-template label="市场价/销售价" width="150" align="center">
                <div>{{row.mprice}} / {{row.price}}</div>
              </el-table-column>
              <el-table-column prop="stockNumber" :label="rowData.stockType==2?'占用库存数':'当前库存数'" width="150" align="center"></el-table-column>
              <el-table-column inline-template label="增加库存数" width="220" align="center">
                <el-input-number v-model.number="row.addNumber" :min="-99999" :max="99999" :maxlength="5" :disabled="disabledStock"></el-input-number>
              </el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click.stop.prevent="onSave">保存</el-button>
            <el-button @click.native.prevent="$emit('forward','GoodsList')">返回列表</el-button>
          </el-form-item>
        </el-form>
      </div>
    </card-panel>
  </div>
</template>
<script>
import {
    getGoodSkuList,
    saveGoodsStock
} from 'actions/goodsAction'
import Validator from 'lib/utils/validator'
const validator=new Validator()
export default {
    name: 'goods_stock_set',
    props: {
        rowData: {
            type: Object,
            default: {}
        }
    },
    data() {
        return {
            goodSkuList: [],
            disabledStock: true,
            goodsObj: {
                goodsId: undefined,
                stockType: 0,
                stockNumber: 0,
                goodsType: 0,
                addNumber: 0
            }
        }
    },
    methods: {
        onSave() {
            //规格商品且为独立库存时保存各规格商品库存
            if (this.goodsObj.goodsType === 1 && this.goodsObj.stockType === 3) {
                if (this.goodSkuList.length > 0) {
                    let r=false
                    let v=false
                    _.each(this.goodSkuList,item=>{
                      if(!validator.integer(item.addNumber)){
                          v=true
                      }
                      if(item.stockNumber+item.addNumber<0){
                          r=true
                        }
                    })
                    if(v){
                      this.$message.error('增加库存数必须为整数')
                      return false
                    }
                    if(r){
                      this.$message.error('库存不能小于0')
                      return false
                    }
                    let goodSkuListMap = _.map(this.goodSkuList, item => {
                        return {
                            //'goodsId': item.goodsId,
                            'stockSetVal': item.goodsSkuId,
                            //'goodsSkuName': item.goodsSkuName,
                            //'stockNumber': item.stockNumber,
                            'setNumber': item.addNumber
                        }
                    })
                    this.goodsObj.goodSkuListJson = JSON.stringify(goodSkuListMap)
                }
            }
            if(this.goodsObj.stockType===1||this.goodsObj.stockType===2){
              if(!validator.integer(this.goodsObj.addNumber)){
                this.$message.error('增加库存数必须为整数')
                return false
              }
              if(this.rowData.stockNumber+this.goodsObj.addNumber<0){
                this.$message.error('库存不能小于0')
                return false
              }
            }
            //return false
            //console.log('this.goodsObj', this.goodsObj)
            saveGoodsStock(this.goodsObj).then(data => {
                const {
                    result,
                    msg,
                    success
                } = data
                if (success) {
                    this.$message.success('操作成功')
                        //this.loadSkuTable()
                    this.$emit('forward', 'GoodsList')
                } else {
                    this.$message.error(msg)
                }
            })

        },
        onStockTypeChange(v) {
            this.goodsObj.stockNumber = 0
            this.goodsObj.stockWarn = 0
            if (v === 0 || v === 2) {
                this.disabledStock = true
            } else {
                this.disabledStock = false
            }
        },
        loadSkuTable() {
            if (parseInt(this.goodsObj.goodsType) === 1) {
                getGoodSkuList({
                    goodsId: this.goodsObj.goodsId
                }).then(data => {
                    this.goodSkuList = data || []
                    _.forEach(this.goodSkuList, item => {
                        this.$set(item, 'addNumber', 0)
                            //item.addNumber=0
                    })
                })
            }
        }
    },
    created() {
        Object.assign(this.goodsObj, _.pick(this.rowData, ['goodsId', 'goodsType', 'stockNumber', 'stockType']))
        this.onStockTypeChange(this.goodsObj.stockType)
            //Object.assign(this.goodsObj, this.rowData)
        this.loadSkuTable()
    }
}
</script>
