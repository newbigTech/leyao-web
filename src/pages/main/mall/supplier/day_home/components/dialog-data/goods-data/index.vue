<template>
    <div class="container-fluid">
        <!-- 查询条件 -->
        <div class="_setting-bar">
            <div class="_query-form">
                <div class="_query-form-item">
                    <el-form :inline="true" :model="goodsObj" class="demo-form-inline">
                        <el-form-item>
                            <el-input v-model="goodsObj.goodsName" placeholder="商品名称" :maxlength="20"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-select v-model="goodsObj.goodsType" placeholder="商品类型" clearable>
                                <el-option label="单品" value="0"></el-option>
                                <el-option label="规格商品" value="1"></el-option>
                                <el-option label="组合商品" value="2"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="_query-form-btn">
                    <el-button @click.native.prevent="loadTableData">查询</el-button>
                </div>
            </div>
            <div class="_actions-btn">
            </div>
        </div>
        <!-- 商品列表 -->
        <div class="_table-container">
            <div class="_table-list">
                <el-table :data="tableData">
                    <el-table-column prop="goodsId" label="商品" align="center" inline-template min-width="120">
                        <div class="_goods-item-cell">
                            <div class="_goods-item-img"><img :src="cloudShowUrl + row.goodsPic"></div>
                            <div class="_goods-item-info">
                                <h3>【{{row.goodsType == 0 ? '单品' : (row.goodsType == 1?'规格商品':'组合商品')}}】{{row.goodsName}}  <span style="color: red;">{{row.activitySign}}</span></h3>
                                <h4 style="padding-left: 8px;"> 编码: {{row.goodsSn}}</h4>
                                <h5 style="padding-left: 8px;"> 市场价: ￥{{row.mprice}}&nbsp;&nbsp;&nbsp;销售价: ￥{{row.price}}</h5>
                            </div>
                        </div>
                    </el-table-column>
                    <el-table-column inline-template label="操作">
                        <div>
                            <el-button type="success" size="small" @click="onSelected(row)">选择</el-button>
                            <el-button type="success" size="small" @click="onSelectSKU(row)" v-show="row.goodsType == 1">选择规格</el-button>
                        </div>
                    </el-table-column>
                </el-table>
                <!-- 分页 -->
                <div class="_pagination">
                    <el-pagination :total="total" :page-size="pageSize" layout="total, sizes, prev, pager, next" @current-change="handleCurrentChange" @size-change="handleSizeChange">
                    </el-pagination>
                </div>
            </div>
        </div>

     <!--商品规格Dialog-->
     <el-dialog2 :title="goodSkuDialogTitle" :show="goodSkuDialog" @close="goodSkuDialog = false">
      <el-table :data="goodSkuList" style="width: 100%">
          <el-table-column prop="goodsSkuId" label="ID" width="80"></el-table-column>
          <el-table-column prop="goodsSkuName" label="规格名称" min-width="100"></el-table-column>
          <el-table-column prop="mprice" label="市场价" width="100"></el-table-column>
          <el-table-column prop="price" label="销售价" width="100"></el-table-column>
          <el-table-column inline-template label="操作" min-width="130">
              <div>
                  <el-button size="small" type="primary" icon="plus" @click.native.prevent="onAddSkuGoods(row)">添加到首页</el-button>
              </div>
          </el-table-column>
      </el-table>
    </el-dialog2>
    </div>
</template>
<script>
import {
    getGoodsPageList,
    getGoodSkuList
} from 'actions/goodsAction'

import elDialog2 from "components/el-dialog2"

export default {
    name: 'goods_data',
    props: {
        queryParams: {
            type: Object,
            default () {
                return {
                    shopId: ''
                }
            }
        }
    },
    components: { elDialog2 },
    computed: {
        cloudShowUrl() {
            return this.$store.getters.cloudShowUrl
        }
    },
    data() {
        return {
            page: 1,
            pageSize: 10,
            total: 0,
            tableData: [],
            goodSkuList: [], //商品sku列表
            goodSkuDialog:false,
            goodSkuDialogTitle:'',
            skuGoods:{},
            goodsObj: {
                goodsId: undefined,
                goodsName: '',
                goodsSn: '',
                goodsType: '',
                stockType: '',
                statusCode: 1,
                deleteFlag: 0,
                strVal1: 'activityGoods'
            }
        }
    },
    methods: {
        onAddSkuGoods(row){
         let result = {
                id: row.goodsId,
                name: row.goodsSkuFullName,
                goodsSkuId:row.goodsSkuId,
                sign: row.activitySign, //商品只有参加活动才会有该值
                row: row,
                goodsObj:this.skuGoods
            }
         this.goodSkuDialog=false
         this.$emit('onSuccess', result)
        },
        onSelectSKU(row){
            this.skuGoods=row
            this.goodSkuDialog=true
            this.goodSkuDialogTitle = `商品规格列表【${row.goodsName}】`
            getGoodSkuList({
             goodsId: row.goodsId,
             activityFlag:'activityGoods'
             }).then(data => {
                //console.log(JSON.parse(JSON.stringify(data)))
              if (data.length > 0){
                this.goodSkuList=data
              }
             })
        },
        onSelected(row) {
            let result = {
                id: row.goodsId,
                name: row.goodsName,
                sign: row.activitySign, //商品只有参加活动才会有该值
                row: row
            }
            this.$emit('onSuccess', result)
        },
        loadTableData() {
            this.goodsObj.pageNo = this.page
            this.goodsObj.pageSize = this.pageSize
            this.goodsObj.shopId = this.queryParams.shopId
            getGoodsPageList(this.goodsObj).then(data => {
                this.tableData = data.rows
                this.total = data.total
            })
        },
        loadData() {
            this.page = 1
            this.tableData = []
            this.total = 0
            if (this.queryParams.shopId != '') {
                this.loadTableData()
            } else {
                this.loadTableData()
            }
        },
        handleSizeChange(val) {
            this.pageSize = val
            this.loadTableData()
        },
        handleCurrentChange(val) {
            this.page = val
            this.loadTableData()
        }
    },
    watch: {
      goodSkuDialog(n, o) {
        if (n === true) {
          this.parentDialog.scrollTop = 0
          this.parentDialog.style.overflow = "hidden"
        } else {
          this.parentDialog.style.overflow = "auto"
          this.parentDialog.scrollTop = 0
        }
      }
    },
    created() {
      this.parentDialog = document.querySelector("#_appHomeConfigDialog")
    }
}
</script>
