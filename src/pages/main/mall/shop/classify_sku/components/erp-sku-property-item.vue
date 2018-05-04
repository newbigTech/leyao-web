<template>
  <div class="_classify-property-item">
    <card-panel>
      <h3 slot="title"><i class="el-icon-share"></i> 规格选项列表</h3>
      <div slot="panel-btns">
      </div>
      <div slot="panel-table">
        <table class="table table-hover center">
          <tbody>
            <tr> <td>编号</td> <td>选项值</td> <td> 选项值全称</td> <td>排序</td> <td>操作</td></tr>
            <tr v-show="!tableData.length"><td colspan="20">暂无数据</td></tr>
            <tr v-for="(r, i) in tableData">
              <td>{{r.itemId}}</td>
              <td>{{r.itemName}}</td>
              <td>{{r.itemFullName}}</td>
              <td>{{r.sortIndex}}</td>
              <td width="15%">
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </card-panel>
  </div>
</template>

<script>
  import {
      getSkuPropertyItemList,
      addOrUpdateSkuPropertyItem,
      deleteSkuPropertyItem
  } from 'actions/skuPropertyAction'

  import prettysize from "lib/utils/prettysize"
  export default {
    components:{},
    props: {
      e: {
        type: Object,
        default: () => {
          return {
            $emit: () => {},
            $on: () => {}
          }
        }
      },
      id: {
        type: Number,
        default: 0,
      }
    },
    computed: {
        cloudShowUrl() {
            return this.$store.getters.cloudShowUrl
        }
    },
    data() {
      return {
        shopFileDialog:false,
        curDailogIndex:1,
        tableData: [],
        skuId: 0,
        skuItem: {
          itemName: '',
          itemFullName: '',
          sortIndex: 1,
          itemPic: '',
          itemSPic: '',
          comments: ''
        },
        previewPic: "",
        previewPic2: "",
        loading: 0,
        loading2: 0,
        picMD5_0: '',
        picMD5_1: '',
        dialogShow: false,
        dialogTitle: '新增分类规格选项',
        formLabelWidth: '20%',
        rules: {
          itemName: [{
            required: true,
            message: '请输入选项值',
            trigger: 'blur'
          }],
          itemFullName: [{
            required: true,
            message: '请输入选项值全称',
            trigger: 'blur'
          }]
        },
      }
    },
    methods: {
      loadTableData() {
        let params = { skuId: this.skuId }
        return getSkuPropertyItemList(params).then(data => {
            const {success, result, msg } = data
            if (success) {
              this.tableData = result 
              // this.$forceUpdate()

              // this.tableData = []
              // // this.$nextTick(() => this.tableData = result )
              // setTimeout(() => this.tableData = result, 5000)
              // console.log('data.result', this.tableData)
            }
        })
      }
    },
    created() {
      // console.log('load-classify-item-created', this.id)

      // 保证创建一次事件回调 小hack
      // if (this.e._events['load-sku-item' + this.id]) return 
      // 注意每次都是新的实例,但是事件依然还是由之前的实例创建,这不行

      // 每次创建删除之间的事件
      this.e.$off('load-sku-item' + this.id)

      this.e.$on('load-sku-item' + this.id, item => {
        this.skuId = item.skuId
        this.skuName = item.skuName
        this.loadTableData().then(data => this.e.$emit('load-sku-item-done', item.skuId))
      })
    }
  }
</script>
