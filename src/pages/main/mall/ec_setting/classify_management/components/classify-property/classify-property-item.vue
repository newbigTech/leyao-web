<template>
  <div class="_classify-property-item">
    <card-panel>
      <h3 slot="title">分类属性列表项</h3>
      <div slot="panel-body">
        <table class="table table-bordered table-hover center">
          <tbody>
            <tr> <td>选项名</td> <td>排序</td> </tr>
            <tr v-for="(m, i) in model">
              <td>{{m.itemName}}</td>
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
  import {
      getPropertyItemsByPropertyId,
      addMallClassifyPropertyItems,
      deleteMallClassifyPropertyItems
  } from 'actions/classifyPropertyItemsAction'

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
      // 保证创建一次事件回调 小hack
      // if (this.e._events['getPropertyItemsByPropertyId' + this.id]) return
      // 注意每次都是新的实例,但是事件依然还是由之前的实例创建,这不行

      // 每次创建删除之前的事件
      this.e.$off('getPropertyItemsByPropertyId' + this.id)

      // 创建很多次 只能创建一次
      this.e.$on('getPropertyItemsByPropertyId' + this.id, id => {
        console.log("this.id", this.id)
        getPropertyItemsByPropertyId({propertyId: id})
        .then(data => {
          // console.log(data)
          if (!data.success) return false
          this.model = data.result
          this.e.$emit('getPropertyItemsByPropertyIdDone', id)
        })
      })
    }
  }
</script>
