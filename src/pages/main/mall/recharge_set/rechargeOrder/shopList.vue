<template lang="html">
    <div>
        <!-- 查询条件 -->
        <div class="_setting-bar">
            <div class="_query-form">
                <div class="_query-form-item">
                    <el-form :inline="true" :model="mallShop">
                        <el-form-item>
                            <el-input v-model="mallShop.shopName" placeholder="店铺名称"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="_query-form-btn">
                    <el-button @click.native.prevent="loadTableData">查 询</el-button>
                </div>
            </div>
        </div>
        <div class="_container">
            <ul class="_shop_ul clearfix well">
                <li v-for="(item, index) in tableData">
                    <a href="javascript:void(0)" @click="showShop(item)"><img :src="cloudShowUrl + item.shopLogo" width="100px" height="100px" class="img-circle">
                        <p>
                            <span class="label label-default">{{item.shopName}}</span>
                        </p>
                    </a>
                </li>
            </ul>
            <br>
            <!-- 分页 -->
            <div style="text-align: center">
                <el-pagination :total="total" :page-size="pageSize" layout="total, sizes, prev, pager, next" @current-change="handleCurrentChange" @size-change="handleSizeChange">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
import {
    getSupplierShopPageList
} from 'actions/shopAction'
import MD5 from 'crypto-js/md5'
export default {
    name: 'supplier_order_index',
    props: {
        obj: {
            type: Object
        }
    },
    computed: {
        cloudShowUrl() {
            return this.$store.getters.cloudShowUrl
        }
    },
    data() {
        return {
            page: 1,
            pageSize: 50,
            total: 0,
            tableData: [],
            mallShop: {
                shopName: ''
            },
        }
    },
    methods: {
        loadTableData() {
            this.mallShop.pageNo = this.page
            this.mallShop.pageSize = this.pageSize
            getSupplierShopPageList(this.mallShop).then(data => {
                this.tableData = data.rows || []
                this.total = data.total || 0
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
        showShop(item){
        	this.obj.shopParam.page = this.page;
        	this.obj.shopParam.pageSize = this.pageSize;
        	this.obj.shopParam.shopName = this.mallShop.shopName;
        	this.obj.shop = item;
        	this.$emit('forward', 'orderList', this.obj);
        },
    },
    created() {
    	if(typeof this.obj.shopParam.page !='undefined'){
    		this.page = this.obj.shopParam.page;
    	}
    	if(typeof this.obj.shopParam.pageSize !='undefined'){
    		this.pageSize = this.obj.shopParam.pageSize;
    	}
    	if(typeof this.obj.shopParam.shopName !='undefined'){
    		this.mallShop.shopName = this.obj.shopParam.shopName;
    	}
      this.loadTableData();
    }
}
</script>
<style lang="sass">
._shop_ul li {
    float: left;
    list-style: none;
    margin-left: 10px;
    margin-top: 15px;
    border: 2px solid #d0d0d0!important;
    white-space: nowrap;
    width: 7.5em;
    overflow: hidden;
}

._shop_ul li:hover {
    background-color: #333;
    border: 2px solid #E10601!important;
    color: #E10601;
}

._shop_ul li p {
    padding-top: 5px;
    height: 30px;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 7.5em;
}

._shop_ul li p span {
    padding-top: 5px;
    height: 30px;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    width: 6.5em;
}
</style>
