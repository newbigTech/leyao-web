<!-- 商品列表中点击组合商品弹出框 -->
<template>
    <div class="_container">
        <!-- 商品列表 -->
        <div class="_table-container">
            <div class="_table-list">
                <el-table :data="tableData">
                   <el-table-column prop="goodsId" label="商品" align="center" inline-template min-width="250">
                        <div class="_goods-item-cell">
                            <div class="_goods-item-img"><img :src="cloudShowUrl + row.goodsPic"></div>
                            <div class="_goods-item-info">
                                <h3>{{row.goodsName}}</h3>
                                <h4><a href="javascript:void(0)">编码: {{row.goodsSn}}</a></h4>
                                <h5><a href="javascript:void(0)">市场价: {{row.mprice}}</a><a href="javascript:void(0)">销售价: {{row.price}}</a></h5>
                            </div>
                        </div>
                    </el-table-column>
                    <el-table-column prop="fprice" label="分账价格"></el-table-column>
                    <el-table-column prop="number" label="数量"></el-table-column>
                </el-table>
            </div>
        </div>
    </div>
</template>
<script>
import { dateFormat as _dateFormat } from "lib/utils/dateFormat"
import { getMallGoodsItemList } from 'actions/goodsAction'
export default {
    name: 'group_goods_items',
    props: {
        paramObj: {
            type: Object,
            default: {}
        }
    },
    computed: {
        cloudShowUrl() {
            return this.$store.getters.cloudShowUrl
        }
    },
    data() {
        return {
            tableData: [],
            dateFormat: function(row, col) {
                return _dateFormat(row.createdDtm, 'yyyy-MM-dd hh:mm:ss')
            },
            goodsObj: {
                goodsId: undefined,
            }
        }
    },
    methods: {
        loadTableData() {
            getMallGoodsItemList(this.goodsObj).then(data => {
                this.tableData = data||[]
            })
        }
    },
    created() {
        if (this.paramObj.goodsId) {
            this.goodsObj.goodsId = this.paramObj.goodsId
            this.loadTableData()
        }
    }
}
</script>
