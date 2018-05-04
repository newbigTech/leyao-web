<template>
    <!-- 商品分类列表 组件 -->
    <div class="_container">
      <el-dialog v-model="userAddressDialog" @open="loadTableData" size="large">
          <card-panel>
            <h3 slot="title">收货地址列表</h3>
            <div slot="panel-body">
              <div class="_setting-options">
                  <div class="_setting-options-left">
                      <el-form :inline="true" :model="userAdressObj">
                          <el-form-item>
                            <el-input v-model="userAdressObj.adName" placeholder="收货人"></el-input>
                          </el-form-item>
                          <el-form-item>
                            <el-input v-model="userAdressObj.adPhone" placeholder="收货手机号"></el-input>
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
                          <el-table-column align="center" property="adName" label="收货人" width="180"></el-table-column>

                          <el-table-column align="center" property="adPhone" label="收货人电话" width="180"></el-table-column>
                          <el-table-column align="center" inline-template label="是否默认地址" width="130">
                             <div>{{row.isDefault == 0 ? '否' : '是'}}</div>
                          </el-table-column>
                          <el-table-column align="center" inline-template label="收货类型" width="150">
                             <div>
                                <span v-if="row.adType==0">公司</span>
                                <span v-if="row.adType==1">家庭</span>
                                <span v-if="row.adType==2">亲属</span>
                                <span v-if="row.adType==3">其他</span>
                             </div>
                          </el-table-column>
                          <el-table-column align="center" inline-template label="邮政编码" width="100"><div>{{row.zipCode}}</div></el-table-column>
                          <el-table-column inline-template label="详细地址" min-width="200"><div>{{row.strAddress}}-{{row.address}}</div></el-table-column>
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
      </el-dialog>
    </div>
</template>

<script>

  import { dateFormat as dateFormat_ } from "lib/utils/dateFormat"
  import { _getMallShopAddressPage } from 'src/vuex/actions/mallShopUserAction'


  export default {
    props: {
      userAdressObj: Object, default: () => { return {} },
    },
    computed: {
      // userAdressObj() {
      //   return this.userAdressObj
      // },
    },
    components: {
      // tabItems
    },
    data() {
      return {
        page: 1,
        pageSize: 10,
        total: 0,
        userAddressDialog:false,
        //userAdressObj: {},
        shopUserAddressData: [],
        dateFormat: function(row, col) {
          return row.createdDtm
        }
      }
    },
    created(){

    },
    methods: {
      searchTableList() {
        let params = {
          adName: this.userAdressObj.adName,
          adPhone: this.userAdressObj.adPhone,
          userId:this.userAdressObj.userId,
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
      loadTableData(){
        this.searchTableList();
        //console.log(JSON.stringify(this.userAdressObj))
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
<style lang="sass">
  body .el-dialog--large {
    width: 68%;
  }
</style>
