<template>
  <div class="_container">
    <card-panel>
      <h3 slot="title"> vip满减分级 </h3>
      <div slot="panel-btns">
        <button class="btn btn-warning btn-sm" @click="setSpending">设置消费</button>
      </div>
      <div slot="panel-body" class="flex">
        <div>
          <ul class="vip-title">

          </ul>
          <div class="_table">
            <div class="_th">
              <div class="_td">活动名称</div>
              <div class="_td">用户级别</div>
              <div class="_td">活动消费</div>
              <div class="_td">活动赠送</div>
              <div class="_td">用户备注</div>
              <div class="_td">操作</div>
            </div>
           <div class="_li _aname">满送</div>
           <ul class="_ul _vuser">
            <li class="_li">vip0</li>
            <li class="_li">vip1</li>
            <li class="_li">vip2</li>
            <li class="_li">vip3</li>
            <li class="_li">vip4</li>
            <li class="_li">vip5</li>
           </ul>
          </ul>
        </div>
      </div>
    </card-panel>
  </div>
</template>

<script>
  import _ from "lodash"
  export default {
    components: { },
    computed: {},
    data() {
      return {
        list: {
          aid: 1002,
          aname: "满减",
          vuser: [
            {
              vtype: "vip0"
              items: [
                { spending: 10, free: 5, remark: "满10送5"},
                { spending: 10, free: 5, remark: "满10送5"},
                { spending: 10, free: 5, remark: "满10送5"},
              ]
            },
            {
              vtype: "vip1"
              items: [
                { spending: 10, free: 5, remark: "满10送5"},
                { spending: 10, free: 5, remark: "满10送5"},
                { spending: 10, free: 5, remark: "满10送5"},
              ]
            },
            {
              vtype: "vip2"
              items: [
                { spending: 10, free: 5, remark: "满10送5"},
                { spending: 10, free: 5, remark: "满10送5"},
                { spending: 10, free: 5, remark: "满10送5"},
              ]
            },
            {
              vtype: "vip3"
              items: [
                { spending: 10, free: 5, remark: "满10送5"},
                { spending: 10, free: 5, remark: "满10送5"},
                { spending: 10, free: 5, remark: "满10送5"},
              ]
            }
          ]
        },
      }
    },
    methods: {
      copy(o) {
        // return JSON.parse(JSON.stringify(o))
        return _.cloneDeep(o)
      },
      updateList(list = [], sort = true) {
        setTimeout(() => {
          if (list.length == 0) return
          if (sort) {
            list = _.sortBy(list, ['aid', 'vtype', "vspending"])
          }
          // 纵向扫描单元格
          for (let k in list[0]) {
            let p = 0, i = 0
            while (p < list.length) {
              list[p][k + 'Span'] = 1
              list[p][k + 'Show'] = true
              for (i = p + 1; i <= list.length - 1; i++) {
                if (["aname", "vname"].indexOf(k) == -1) break
                // 此单元格展示的数据与下一单元格展示的是同一数据,只需要显示一个即可
                if (list[p][k] == list[i][k] && !!list[p][k]) {
                  list[p][k + 'Span']++
                  list[p][k + 'Show'] = true
                  list[i][k + 'Span'] = 1
                  list[i][k + 'Show'] = false
                } else {
                  break
                }
              }
              p = i
            }
          }
          this.list = list
        }, 0)
      },
      removeItem(item, index) {
        let list = this.copy(_.filter(this.list, (li) => li != item))
        this.updateList(list, false)
      },
      addItem(item, index) {
        let list = this.copy(this.list)
        list.push({
          aid: item.aid,
          aname: item.aname,
          vtype: item.vtype,
          vname: item.vname,
          vspending: 0 ,  // item.vspending
          vfree:  0, // item.vfree,
          vmark:  0, //item.vmark
        })
        this.updateList(list)
      },
      // 批量设置消费金额
      setSpending() {
        let list = this.copy(this.list)
        list.forEach(li => li.vspending= 55.55)
        this.updateList(list, false)
      }
    },
    created() {
      this.list = this.updateList(this.list)
    }
  }
</script>

<style>
  ._center td{
    text-align: center;
  }
</style>
