<!-- 商品新增修改主界面-->
<template>
  <div class="_container">
    <card-panel style="margin-bottom: 0;" class="_normal">
      <h3 slot="title">编辑商品:
        <el-tag type="danger" v-show="paramObj.goodsObj.goodsName">
          <strong style="font-size: 13px; font-weight: 500;">{{goodsName || paramObj.goodsObj.goodsName}}</strong>
        </el-tag>
      </h3>
      <div slot="panel-btns">
        <el-button size="small" type="success" @click.native.prevent="$emit('forward','GoodsList')">返回商品列表</el-button>
      </div>
      <div slot="panel-body">
        <div class="_v-tab_wrapper">
          <el-tabs @tab-click="handleClick" type="border-card" class="_v-tab" v-model="activeName">
            <el-tab-pane label="基本信息" name="tab1">
              <tab1 :vm="vm" :paramObj="paramObj" @forward="forward"></tab1>
            </el-tab-pane>
            <el-tab-pane label="组合商品" name="tab3" :disabled="goodsType!==2">
              <tab3 :vm="vm" :paramObj="paramObj" @forward="forward"></tab3>
            </el-tab-pane>
            <el-tab-pane label="商品价格" name="tab2">
              <tab2 :vm="vm" :paramObj="paramObj" @forward="forward"></tab2>
            </el-tab-pane>
            <el-tab-pane label="商品详情" name="tab8">
              <tab8 :vm="vm" :paramObj="paramObj" @forward="forward"></tab8>
            </el-tab-pane>
            <el-tab-pane label="分组/标签" name="tab4">
              <tab4 :vm="vm" :paramObj="paramObj" @forward="forward"></tab4>
            </el-tab-pane>
            <el-tab-pane label="商品图片" name="tab5">
              <tab5 :vm="vm" :paramObj="paramObj" @forward="forward"></tab5>
            </el-tab-pane>
            <el-tab-pane label="销售规格" name="tab6" :disabled="goodsType!==1">
              <tab6 :vm="vm" :paramObj="paramObj" @forward="forward"></tab6>
            </el-tab-pane>
            <el-tab-pane label="商品属性" name="tab7">
              <tab7 :vm="vm" :paramObj="paramObj" @forward="forward"></tab7>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </card-panel>
  </div>
</template>
<script>
  import Tab1 from './tab1'
  import Tab2 from './tab2'
  import Tab3 from './tab3'
  import Tab4 from './tab4'
  import Tab5 from './tab5'
  import Tab6 from './tab6'
  import Tab7 from './tab7'
  import Tab8 from './tab8'
  export default {
    name: 'goods_from_index',
    props: {
      paramObj: {
        type: Object,
        default: {}
      }
    },
    components: {
      Tab1,
      Tab2,
      Tab3,
      Tab4,
      Tab5,
      Tab6,
      Tab7,
      Tab8
    },
    data() {
      return {
        activeName: 'tab1',
        goodsType: 0,
        goodsObj: {},
        goodsName: '',
        vm: new this.$root.constructor()
      }
    },
    methods: {
      handleClick(tab) {

      },
      forward(tabName, data) {
        if (typeof data == 'string' && data == 'GoodsList') {
          this.$emit('forward', 'GoodsList')
        } else {
          this.activeName = tabName
          // this.$nextTick(() => {
          //   this.activeName = tabName
          // })
          if (data) {
            this.goodsObj = data || {}
          }
        }
      }
    },
    created() {
      //console.log(this.paramObj)
      this.$store.getters.ev.$on('onchangeGoodsType', (v) => {
            //v:商品类型 0 SPU商品 1 SKU商品 2 组合商品
            this.goodsType = _.toNumber(v)
      })
      // 商品名称修改事件
      this.vm.$on('_goodsNameChange', (goodsName) => {
       // console.log('modified goodsname')
        this.goodsName = goodsName
      })
    }
  }
</script>
