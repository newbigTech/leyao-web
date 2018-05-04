<template>
  <div class="_container">
    <card-panel>
      <h3 slot="title"> vip满减分级 </h3>
      <div slot="panel-btns">
        <button class="btn btn-warning btn-sm" @click="setSpending">设置消费</button>
      </div>
      <div slot="panel-body" class="flex">
        <table class="table table-bordered _center">
          <thead><tr> <th>活动</th>    <th>用户级别</th>  <th>消费</th> <th>赠送</th>   <th>用户备注</th> <th>操作</th> </tr></thead>
          <tbody>
            <tr v-for="(li, ii) in list">
              <td v-show="li.anameShow" :rowspan="li.anameSpan">{{li.aname}}</td>
              <td v-show="li.vnameShow" :rowspan="li.vnameSpan">
                {{li.vname}}
                <button class="btn btn-default" @click="addItem(li, ii)"><i class="el-icon-plus"></i></button>
              </td>
              <td v-show="li.vspendingShow" :rowspan="li.vspendingSpan">
                {{li.vspending}}
              </td>
              <td v-show="li.vfreeShow" :rowspan="li.vfreeSpan">
                <input type="text" v-model="li.vfree">
              </td>
              <td v-show="li.vmarkShow" :rowspan="li.vmarkSpan">
                <input type="text" v-model="li.vmark">
              </td>
              <td>
                <button class="btn btn-danger" @click="removeItem(li, ii)">删除</button>
              </td>
            </tr>
          </tbody>
        </table>

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
        list:[
          { aid: 1234, aname: "满减", vtype: 0, vname: "vip0", vspending: 500, vfree: 50, vmark: "满500送30元"},
          { aid: 1234, aname: "满减", vtype: 0, vname: "vip0", vspending: 300, vfree: 30, vmark: "满300送30元"},
          { aid: 1234, aname: "满减", vtype: 1, vname: "vip1", vspending: 400, vfree: 10, vmark: "满400送10元"},
          { aid: 1234, aname: "满减", vtype: 1, vname: "vip1", vspending: 300, vfree: 15, vmark: "满300送15元"},
          { aid: 1234, aname: "满减", vtype: 2, vname: "vip2", vspending: 150, vfree: 15, vmark: "满100送15元"},
          { aid: 1234, aname: "满减", vtype: 2, vname: "vip2", vspending: 150, vfree: 15, vmark: "满100送15元"},
          { aid: 1234, aname: "满减", vtype: 2, vname: "vip2", vspending: 150, vfree: 15, vmark: "满100送15元"},
          { aid: 1234, aname: "满减", vtype: 3, vname: "vip3", vspending: 150, vfree: 15, vmark: "满100送15元"},
          { aid: 1234, aname: "满减", vtype: 3, vname: "vip3", vspending: 150, vfree: 15, vmark: "满100送15元"},
          { aid: 1234, aname: "满减", vtype: 3, vname: "vip3", vspending: 150, vfree: 15, vmark: "满100送15元"},
          { aid: 1234, aname: "满减", vtype: 4, vname: "vip4", vspending: 150, vfree: 15, vmark: "满100送15元"},
          { aid: 1234, aname: "满减", vtype: 5, vname: "vip5", vspending: 150, vfree: 15, vmark: "满100送15元"},
        ],
        list2: []
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
