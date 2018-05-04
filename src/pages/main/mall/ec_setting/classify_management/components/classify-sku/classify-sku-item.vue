<template>
  <div class="_classify-property-item">
    <card-panel>
      <h3 slot="title">分类属性列表项</h3>
      <div slot="panel-body">
        <table class="table table-bordered table-hover center">
          <tbody>
            <tr> <td>编号</td> <td>选项值</td> <td>选项值全称</td> <td>排序</td> </tr>
            <tr v-for="(m, i) in model">
              <td>{{m.itemId}}</td>
              <td>{{m.itemName}}</td>
              <td>{{m.itemFullName}}</td>
              <td>{{m.sortIndex}}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </card-panel>
  </div>
</template>

<style>
  _classify-property-item .panel { margin-bottom: 0;  }
  _classify-property-item .panel-body { padding: 0;  }
</style>

<script>
  import cardPanel from "components/card-panel"
  import { getSkuPropertyItemList } from 'actions/skuPropertyAction'

  export default {
    props: {
      e: {
        type: Object,
        default: () => {
          return {
            $on: () => {},
            $emit: () => {}
          }
        }
      },
      id: { type: Number, default: 0 }
    },
    components: { cardPanel },
    data() {
      return {
        model: {}
      }
    },
    created() {
      // TODO树为空 则不创建
      // console.log('1')

      // if (this.e._events['getSkuItemsBySkuId' + this.id]) return
      // 注意每次都是新的实例,但是事件依然还是由之前的实例创建,这不行

      // 每次创建删除之前的事件
      this.e.$off('getSkuItemsBySkuId' + this.id)

      // 创建很多次 只能创建一次
      this.e.$on('getSkuItemsBySkuId' + this.id, id => {
        console.log('getSkuItemsBySkuId' + this.id)
        getSkuPropertyItemList({skuId: id})
        .then(data => {
          // console.log(data)
          if (!data.success) return false
          this.model = data.result
          this.e.$emit('getSkuItemsBySkuIdDone', id)
        })
      })
    }
  }
</script>
