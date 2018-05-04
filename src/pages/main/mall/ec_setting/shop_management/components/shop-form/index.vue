<template>
  <div class="_shop-management">
    <div class="_shop-form _container">
      <card-panel style="margin-bottom: 0;" class="_normal">
        <h3 slot="title">店铺编辑</h3>
        <div slot="panel-btns">
          <el-button size="small" type="success" @click.native="reback" v-if="!e.isShopSet">返回店铺列表</el-button>
          <!-- <el-button size="small" type="primary" @click="save">保存店铺</el-button>  -->
        </div>
        <div slot="panel-body">
          <div class="_v-tab_wrapper">
            <el-tabs  @tab-click="tabClick" type="border-card" class="_v-tab" v-model="tabName">
              <el-tab-pane name="1" label="店铺公司">  <tab1 :model="model" @save="reback" ref="tab1"></tab1></el-tab-pane>
              <el-tab-pane name="2" label="店铺管理">  <tab2 :model="model" @save="reback" ref="tab2"></tab2></el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </card-panel>
    </div>
  </div>
</template>

<script>
  import tab1 from "./tab1.vue"
  import tab2 from "./tab2.vue"

  import { _getMallShopByShopId,_getMallShopClassifyListBySId } from 'src/vuex/api/shopAPI'

  import {
    _addMallShop,
    _getSSOUserPageList,
    _findCompanyList ,
    _getBaseUserById} from 'src/vuex/api/shopAPI'

  export default {
    name: 'shopAdd',
    components: { tab1, tab2},
    props: {
      e: Object, default: () => { return { $on: () => {}, $emit: () => {} } },
    },
    data() {
      return {
        tabName: '1',
        model: {}
      }
    },
    methods: {
      tabClick(tab) {
        // console.log(tab.index)
      },
      reback() {
      	if(!this.e.isShopSet){
        	this.e.$emit('forward', 'shopList')
      	}
      }
    },
    created() {
      // console.log(this.e.model)
      if (this.e.model.shopId !== undefined) {
        this.model = this.e.model
        // 拿到分类的id
        _getMallShopByShopId(this.model.shopId)
        .then(data => {
          // console.log('data: ', data)
          if (data.success) {
            // 获取选择分类id
            this.e.model.classifyStr = data.result.classifyStr

            // 获取logo
            // this.e.model.shopFileMd5 = data.result.mallshopVo.shopFileMd5
            this.$set(this.model, 'shopFileMd5', data.result.mallshopVo.shopFileMd5)

            // 更新树
            this.$refs.tab2.getTreeData()
          }
        })
      }


    }
  }
</script>
