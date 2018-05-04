<template>
  <div class="">




                  <p class="shop-classify" style="margin: 20px 0 0 0;">已选择商品({{cmallGoodsList.length}})：</p>
                   <el-table
                        :data="cmallGoodsList"
                        selection-mode="multiple"
                        stripe
                        style="width: 100%"
                        height="300"
                        @selectionchange="handleMultipleSelectionChange">
                        <el-table-column inline-template label="编号">
                          <div>
                            <span v-if="row.goodsType == 1">{{row.goodsId}}/{{row.goodsSkuId}}</span>
                            <span v-if="row.goodsType != 1">{{row.goodsId}}</span>
                          </div>                         
                        </el-table-column>
                        <el-table-column inline-template label="商品编码"><div>{{row.goodsSn}}</div></el-table-column>                                              
                        <el-table-column inline-template label="商品名称"><div>{{row.goodsName}}</div></el-table-column>
                        <el-table-column inline-template label="商品类型" width="150">
                          <div>{{row.goodsType == 0 ? '单品' : (row.goodsType == 1?'规格商品':'组合商品')}}</div>
                        </el-table-column>                      
                        <el-table-column inline-template label="市场价"><div>{{row.mprice}}</div></el-table-column>
                        <el-table-column inline-template label="销售价"><div>{{row.price}}</div> </el-table-column>
                  </el-table>          
                     


    </div> 
  </div>  
</template>
<script>

  import spuGoodsForGoods from "./spuGoodsForGoods"
  import { _addCoupons,_queryShopIsMyself} from 'src/vuex/actions/mallShopCouponsAction'
  import { _getMallCouponsGoodsPage} from 'src/vuex/actions/mallShopCouponsAction'
  import {dateFormat as dateFormat_ } from "lib/utils/dateFormat"
  import {_getMallShopClassifyList} from 'src/vuex/api/shopAPI'
  
  import RegExp from 'lib/utils/regexp'
 
  export default {
    props: {
      obj: {
        type: Object,
        default: {}
      }
    },
    computed: {
      init() {
        return this.obj
      }
    },    
    components: {
      spuGoodsForGoods,
    },
    data(){
      return {
        // 已选择商品
        cpage :1,
        cpageSize :5,
        ctotalSize: 0,
        cmallGoodsList:[],
        errorMsg:'',

      };
    },
    methods:{
        loadData(){  
            this.headerTitle='商品优惠信息'
            if(this.obj.couponsLimit == 2) {
                _getMallCouponsGoodsPage({"couponsId":this.obj.couponsId}).then(data => {
                    const {success,result}=data;
                    //console.log(JSON.stringify(result)) 
                    if(success) {
                      for(var i=0; i<result.length; i++){
                          let item = result[i] ;
                          let goodsType = item.goodsType ;
                          if(goodsType == 1){
                             this.cmallGoodsList.push({
                              goodsType:goodsType,
                              goodsName:item.goodsSkuName,
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
          
        }, 
        removeToGoods(row){
              this.cmallGoodsList.splice(this.cmallGoodsList.indexOf(row), 1) ;
              this.ctotalSize -- ;
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
    },

    created(){
      this.loadData() ;      
    }
  }
</script>
