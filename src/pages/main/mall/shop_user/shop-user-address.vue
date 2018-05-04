<template>
    <!-- 商品分类列表 组件 -->
    <div class="_container">
        <!-- <tab-items style="margin-bottom:10px;">
          <li class="active"><a>收货地址列表</a></li>
          <li><a @click="$emit('reback', 'shopUserList')">用户关注列表</a></li>
        </tab-items> -->
        <card-panel>
          <h3 slot="title">收货地址列表</h3>
          <div slot="panel-btns"><el-button size="small" type="primary" @click="$emit('reback', 'shopUserList')">返回</el-button></div>
          <div slot="panel-body">
            <div class="_setting-options">
                <div class="_setting-options-left">
                    <el-form :inline="true" :model="shopUserAddress">
                        <el-form-item>
                          <el-input v-model="shopUserAddress.adName" placeholder="收货人"></el-input>
                        </el-form-item>
                        <el-form-item>
                          <el-input v-model="shopUserAddress.adPhone" placeholder="收货手机号"></el-input>
                        </el-form-item>
                        <el-button :plain="true" type="primary" @click.native="searchTableList">查 询</el-button>
                      </el-form-item>
                    </el-form>
                </div>
            </div>
            <div class="_table-container">
                <div class="_table-list" v-show="shopUserAddressData.length >= 0">
                    <el-table :data="shopUserAddressData" style="width: 100%" border>
                        <el-table-column align="center" type="index" width="70"></el-table-column>
                        <el-table-column align="center" property="adName" label="收货人" width="120"></el-table-column>
                        <el-table-column align="center" property="adPhone" label="收货人电话" width="140"></el-table-column>
                        <el-table-column align="center" property="createdDtm" label="收货时间" :formatter="dateFormat" width="172">
                        </el-table-column>
                        <el-table-column align="center" inline-template label="是否默认地址" width="130">
                           <div>{{row.isDefault == 0 ? '否' : '是'}}</div>
                        </el-table-column>
                        <el-table-column align="center" inline-template label="收货类型" width="100">
                           <div>234</div>
                        </el-table-column>
                        <el-table-column align="center" inline-template label="邮政编码" width="100"><div>{{row.zipCode}}</div></el-table-column>
                        <el-table-column inline-template label="详细地址" min-width="200"><div>{{row.strAddress}}</div></el-table-column>
                        <!-- <el-table-column inline-template label="状态" width="180">
                          <div>{{row.statusCode == 0 ? '有效' : '无效'}}</div>
                        </el-table-column> -->
                    </el-table>
                    <!-- 分页 -->
                    <div class="_pagination">
                        <el-pagination
                            :total="total"
                            :page-size="pageSize"
                            :page-sizes="[10, 20, 30, 40]"
                            layout="total, sizes, prev, pager, next"
                            @current-change="handleCurrentChange"
                            @size-change="handleSizeChange"
                        >
                        </el-pagination>
                    </div>
                </div>
            </div>
          </div>
        </card-panel>
    </div>
</template>

<script>

  // import tabItems from "components/tab-items"
  import {dateFormat as dateFormat_ } from "lib/utils/dateFormat"
  // console.log(dateFormat_(1234567+""))
  import {
    _getMallShopAddressPage
  } from 'src/vuex/actions/mallShopUserAction'

  export default {
    props: {
      obj: {
        type: Object,
        default: {}
      }
    },
    computed: {
      shopUserAddress() {
        return this.obj
      },
    },
    components: {
      // tabItems
    },
    data() {
      return {
        page: 1,
        pageSize: 10,
        total: 0,
        //shopUserAddress: {},
        shopUserAddressData: [],
        dateFormat: function(row, col) {
          return row.createdDtm
        }
      }
    },
    created(){
      this.searchTableList()
    },
    methods: {
      searchTableList() {
        let params = {
          adName: this.shopUserAddress.adName,
          adPhone: this.shopUserAddress.adPhone,
          userId:this.shopUserAddress.userId,
          pageNo: this.page,
          pageSize: this.pageSize
        }
        //console.log(JSON.stringify(params))
        _getMallShopAddressPage(params)
        .then(data => {
          const { success, result, msg } = data
          if (success) {
            this.shopUserAddressData = result.rows
            this.total = result.total
          }
        })
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.searchTableList()
      },
      handleCurrentChange(val) {
        this.page = val
        this.searchTableList()
      },
    }
  }
</script>
