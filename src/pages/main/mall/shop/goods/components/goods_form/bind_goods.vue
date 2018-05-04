<!-- 组合商品组件-->
<style lang="css">



</style>

<template lang="html">

<div class="">
    <card-panel>
        <h3 slot="title">组合商品配置</h3>
        <div slot="panel-body">
            <div class="_table-list">
                <el-table :data="bindGoodsData" style="width: 100%">
                    <el-table-column prop="goodsName" label="商品名称" min-width="100"></el-table-column>
                    <el-table-column prop="mprice" label="市场价" width="90"></el-table-column>
                    <el-table-column prop="price" label="销售价" width="90"></el-table-column>
                    <el-table-column inline-template label="分账价格" width="120">
                        <div>
                            <el-input v-model.number="row.fprice" :maxlength="10" type="number"></el-input>
                        </div>
                    </el-table-column>
                    <el-table-column inline-template label="数量" width="120">
                        <div>
                            <el-input v-model.number="row.number" :maxlength="10" type="number"></el-input>
                        </div>
                    </el-table-column>
                    <el-table-column inline-template label="操作" min-width="130">
                        <div>
                            <el-button size="small" type="danger" icon="remove" @click.native.prevent="onDelete(row)">移除</el-button>
                        </div>
                    </el-table-column>
                </el-table>
            </div>
            <br>
            <hr>
            <!-- 查询条件 -->
            <div class="_setting-bar">
                <div class="_query-form">
                    <div class="_query-form-item">
                        <el-form :inline="true" :model="goodsObj" class="demo-form-inline">
                            <el-form-item>
                                <el-input v-model="goodsObj.goodsName" placeholder="商品名称" :maxlength="20"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="goodsObj.goodsFullName" placeholder="商品全名" :maxlength="120"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-input v-model="goodsObj.goodsSn" placeholder="商品编码" :maxlength="120"></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="_query-form-btn">
                        <el-button @click.native.prevent="loadTableData">查询</el-button>
                    </div>
                </div>
            </div>
            <!-- 商品列表 -->
            <div class="_table-container">
                <div class="_table-list">
                    <el-table :data="tableData" style="width: 100%">
                        <el-table-column prop="goodsSn" label="商品编码" min-width="100"></el-table-column>
                        <el-table-column prop="goodsName" label="商品名称" min-width="100"></el-table-column>
                        <el-table-column inline-template label="类型" width="100">
                            <div>{{row.goodsType == 0 ? '单品' : (row.goodsType == 1?'规格商品':'组合商品')}}</div>
                        </el-table-column>
                        <el-table-column prop="mprice" label="市场价" width="100"></el-table-column>
                        <el-table-column prop="price" label="销售价" width="100"></el-table-column>
                        <el-table-column inline-template label="操作" min-width="130">
                            <div>
                                <el-button size="small" type="primary" icon="plus" @click.native.prevent="onAddGoods(row)">添加到组合</el-button>
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
        </div>
    </card-panel>
    <!--商品图库Dialog-->
    <el-dialog :title="goodSkuDialogTitle" v-model="goodSkuDialog" class="shop-img-file-dialog">
      <el-table :data="goodSkuList" style="width: 100%">
          <el-table-column prop="goodsSkuId" label="ID" width="80"></el-table-column>
          <el-table-column prop="goodsSkuName" label="规格名称" min-width="100"></el-table-column>
          <el-table-column prop="goodsSn" label="商品编号" min-width="100"></el-table-column>
          <el-table-column prop="mprice" label="市场价" width="100"></el-table-column>
          <el-table-column prop="price" label="销售价" width="100"></el-table-column>
          <el-table-column inline-template label="操作" min-width="130">
              <div>
                  <el-button size="small" type="primary" icon="plus" @click.native.prevent="onAddSkuGoods(row)">添加到组合</el-button>
              </div>
          </el-table-column>
      </el-table>
    </el-dialog>
</div>

</template>

<script>
import {
  getGoodsPageList,
  getGoodSkuList
}
from 'actions/goodsAction'
export default {
  name: 'bind_goods',
  data() {
    return {
      page: 1,
      pageSize: 10,
      total: 0,
      tableData: [],
      bindGoodsData: [],
      gridData: [],
      goodSkuDialog: false,
      goodSkuDialogTitle: '',
      goodSkuList: [], //商品sku列表
      goodsObj: {
        goodsName: '',
        goodsFullName: '',
        goodsSn: '',
        statusCode: ''

      }
    }
  },
  methods: {
    loadTableData() {
      this.goodsObj.pageNo = this.page
      this.goodsObj.pageSize = this.pageSize
      this.goodsObj.statusCode=1//上架
      this.goodsObj.deleteFlag=0//生效
      this.goodsObj.goodsType=0//单品
      getGoodsPageList(this.goodsObj).then(data => {
        this.tableData = data.rows
        this.total = data.total
      })
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.loadTableData()
    },
    handleCurrentChange(val) {
      this.page = val
      this.loadTableData()
    },
    onDelete(row) {
      var index = this.bindGoodsData.indexOf(row)
      if (index !== -1) {
        this.bindGoodsData.splice(index, 1)
      }
    },
    onAddGoods(row) {
     // console.log('this.bindGoodsData',this.bindGoodsData);
      if(this.bindGoodsData.length>5){
        this.$message('最多只能添加6个商品')
        return false
      }
      //商品类型 0 SPU商品 1 SKU商品 2 组合商品
      if (parseInt(row.goodsType) === 1) {
        this.goodSkuDialog = true
        this.goodSkuDialogTitle = `商品规格列表【${row.goodsName}】`
        getGoodSkuList({
          goodsId: row.goodsId
        }).then(data => {
          if (data.length > 0)
            this.goodSkuList = data
        })
      } else {
        if (_.findIndex(this.bindGoodsData, {
            'goodsId': row.goodsId
          }) !== -1) {
          this.$message('商品已添加')
        } else {
          let _row = {
            packageGoodsId: row.goodsId,
            goodsName: row.goodsName,
            goodsType: row.goodsType,
            packageGoodsSkuId:0,
            price: row.price,
            mprice: row.mprice,
            goodsPic: row.goodsPic,
            number: 1,
            fprice: 0.00
          }
          this.bindGoodsData.push(_row)
        }
      }
    },
    onAddSkuGoods(row){
      if(this.bindGoodsData.length>5){
        this.$message('最多只能添加6个商品')
        return false
      }
      if (_.findIndex(this.bindGoodsData, {
          'goodsId': row.goodsId,'goodsSkuId':row.goodsSkuId
        }) !== -1) {
        this.$message('商品已添加');
      } else {
        let _row = {
          packageGoodsId: row.goodsId,
          goodsName: row.goodsSkuFullName,
          packageGoodsSkuId:row.goodsSkuId,
          goodsType: 1,
          price: row.price,
          mprice: row.mprice,
          number: 1,
          fprice: 0.00
        }
        this.bindGoodsData.push(_row)
      }
    }
  },
  created() {
    this.loadTableData()
    this.$store.getters.ev.$once('onchangeData',(data)=>{
      if(data.goodsObj.goodsItemsData&&data.goodsObj.goodsItemsData.length>0)
      this.bindGoodsData=data.goodsObj.goodsItemsData
    })
  }
}
</script>
