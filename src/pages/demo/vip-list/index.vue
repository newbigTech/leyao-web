<template>
  <div class="_container">
    <card-panel>
      <h3 slot="title"> vip满减分级 </h3>
      <div slot="panel-btns">
        <button class="btn btn-default btn-sm" @click="removeAll">全部清空</button>
        <button class="btn btn-default btn-sm" @click="setSpending">添加活动</button>
        <button class="btn btn-warning btn-sm" @click="setSpending">设置消费</button>
      </div>
      <div slot="panel-body" class="flex">
        <table class="table table-bordered _center">
          <thead><tr> <th>活动</th>    <th>用户级别</th>  <th>消费</th> <th>赠送</th>   <!-- <th>用户备注</th> --> <th>操作</th> </tr></thead>
          <tbody>
            <tr v-for="(li, ii) in list" :data-rowspan="li.anameRowspan + '-' + li.vnameRowspan">
              <td :class="{hidden: li.anameHidden}" :rowspan="li.anameRowspan" style="width: 120px;">{{li.aname}}</td>
              <td :class="{hidden: li.vnameHidden}" :rowspan="li.vnameRowspan" style="width: 120px;">
                {{li.vname}}
                <button class="btn btn-sm btn-default" @click="addItem(li, ii)">+</button>
              </td>
              <td rowspan="1" :colspan="li.colspan || 1">
                <!-- <input type="text" v-model="li.vspending" :class="{hidden: li.hidden}" readonly="true"> -->
                <span :class="{hidden: li.hidden}">{{li.vspending}}</span>
                <!-- <div :class="{hidden: !li.hidden}">请添加活动 <button class="btn btn-sm btn-default" @click="addItem(li, ii)">+</button></div> -->
              </td>
              <td rowspan="1" :class="{hidden: li.hidden}">
                <!-- <input type="text" v-model="li.vfree"> -->
                <vue-numeric currency="" separator="" v-model="li.vfree" max="500" :precision="2"></vue-numeric>
              </td>
              <!-- <td rowspan="1" :class="{hidden: li.hidden}">
                <input type="text" v-model="li.vmark">
              </td> -->
              <td :class="{hidden: li.hidden}">
                <button class="btn btn-danger btn-sm" @click="removeItem(li, ii)">删除</button>
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
  import VueNumeric from 'vue-numeric'
  export default {
    components: { VueNumeric },
    computed: {},
    data() {
      return {
        list:[
          { aid: 1234, aname: "满减", vtype: 0, vname: "vip0", vspending: 500, vfree: 50, vmark: "满500送30元", colspan: 1, rowspan: 1, hidden: false},
          { aid: 1234, aname: "满减", vtype: 0, vname: "vip0", vspending: 300, vfree: 30, vmark: "满300送30元", colspan: 1, rowspan: 1, hidden: false},
          { aid: 1235, aname: "满送", vtype: 0, vname: "vip0", vspending: 500, vfree: 5, vmark: "   满50送5元", colspan: 1, rowspan: 1, hidden: false},
          { aid: 1234, aname: "满减", vtype: 1, vname: "vip1", vspending: 400, vfree: 10, vmark: "满400送10元", colspan: 1, rowspan: 1, hidden: false},
          { aid: 1234, aname: "满减", vtype: 1, vname: "vip1", vspending: 300, vfree: 15, vmark: "满300送15元", colspan: 1, rowspan: 1, hidden: false},
          { aid: 1234, aname: "满减", vtype: 2, vname: "vip2", vspending: 150, vfree: 15, vmark: "满100送15元", colspan: 1, rowspan: 1, hidden: false},
          { aid: 1235, aname: "满送", vtype: 2, vname: "vip2", vspending: 150, vfree: 15, vmark: "满100送15元", colspan: 1, rowspan: 1, hidden: false},
          { aid: 1234, aname: "满减", vtype: 2, vname: "vip2", vspending: 150, vfree: 15, vmark: "满100送15元", colspan: 1, rowspan: 1, hidden: false},
          { aid: 1234, aname: "满减", vtype: 2, vname: "vip2", vspending: 150, vfree: 15, vmark: "满100送15元", colspan: 1, rowspan: 1, hidden: false},
          { aid: 1235, aname: "满送", vtype: 1, vname: "vip1", vspending: 100, vfree: 10, vmark: "满100送10元", colspan: 1, rowspan: 1, hidden: false},
          { aid: 1234, aname: "满减", vtype: 3, vname: "vip3", vspending: 150, vfree: 15, vmark: "满100送15元", colspan: 1, rowspan: 1, hidden: false},
          { aid: 1234, aname: "满减", vtype: 3, vname: "vip3", vspending: 150, vfree: 15, vmark: "满100送15元", colspan: 1, rowspan: 1, hidden: false},
          { aid: 1234, aname: "满减", vtype: 3, vname: "vip3", vspending: 150, vfree: 15, vmark: "满100送15元", colspan: 1, rowspan: 1, hidden: false},
          { aid: 1235, aname: "满送", vtype: 3, vname: "vip3", vspending: 150, vfree: 15, vmark: "满100送15元", colspan: 1, rowspan: 1, hidden: false},
          { aid: 1235, aname: "满送", vtype: 3, vname: "vip3", vspending: 150, vfree: 15, vmark: "满100送15元", colspan: 1, rowspan: 1, hidden: false},
          { aid: 1234, aname: "满减", vtype: 4, vname: "vip4", vspending: 150, vfree: 15, vmark: "满100送15元", colspan: 1, rowspan: 1, hidden: false},
          { aid: 1234, aname: "满减", vtype: 5, vname: "vip5", vspending: 150, vfree: 15, vmark: "满100送15元", colspan: 1, rowspan: 1, hidden: false},
          { aid: 1235, aname: "满送", vtype: 0, vname: "vip0", vspending: 500, vfree: 5, vmark:    "满50送5元", colspan: 1, rowspan: 1, hidden: false},
          { aid: 1235, aname: "满送", vtype: 1, vname: "vip1", vspending: 100, vfree: 10, vmark: "满100送10元", colspan: 1, rowspan: 1, hidden: false},
          { aid: 1235, aname: "满送", vtype: 2, vname: "vip2", vspending: 150, vfree: 15, vmark: "满100送15元", colspan: 1, rowspan: 1, hidden: false},
          { aid: 1235, aname: "满送", vtype: 3, vname: "vip3", vspending: 150, vfree: 15, vmark: "满100送15元", colspan: 1, rowspan: 1, hidden: false},
          { aid: 1235, aname: "满送", vtype: 4, vname: "vip4", vspending: 150, vfree: 15, vmark: "满100送15元", colspan: 1, rowspan: 1, hidden: false},
          { aid: 1235, aname: "满送", vtype: 5, vname: "vip5", vspending: 150, vfree: 15, vmark: "满100送15元", colspan: 1, rowspan: 1, hidden: false},
        ],
        list2: [
          { aid: 1234, aname: "满减", vtype: 0, vname: "vip0", vspending: 500, vfree: 50, vmark: "满500送30元", colspan: 4, rowspan: 1, hidden: true},
          { aid: 1234, aname: "满减", vtype: 1, vname: "vip1", vspending: 500, vfree: 50, vmark: "满500送30元", colspan: 4, rowspan: 1, hidden: true},
          { aid: 1234, aname: "满减", vtype: 2, vname: "vip2", vspending: 500, vfree: 50, vmark: "满500送30元", colspan: 4, rowspan: 1, hidden: true},
          { aid: 1234, aname: "满减", vtype: 3, vname: "vip3", vspending: 500, vfree: 50, vmark: "满500送30元", colspan: 4, rowspan: 1, hidden: true},
          { aid: 1234, aname: "满减", vtype: 4, vname: "vip4", vspending: 500, vfree: 50, vmark: "满500送30元", colspan: 4, rowspan: 1, hidden: true},
          { aid: 1234, aname: "满减", vtype: 5, vname: "vip5", vspending: 500, vfree: 50, vmark: "满500送30元", colspan: 4, rowspan: 1, hidden: true},
        ]
      }
    },
    methods: {
      copy(o) {
        return JSON.parse(JSON.stringify(o))
      },
      updateList(list = [], sort = true) {
        setTimeout(() => {
          if (list.length == 0) {
            this.list = []
            return
          }
          if (sort) {
            list = _.sortBy(list, ['aid', 'vtype', 'vspending'])
          }
          // 纵向扫描单元格
          for (let k in list[0]) {
            // console.log("k: ", k)
            let p = 0, j = 0
            while (p < list.length) {
              // 仅仅是前面的两个字段需要(减少遍历次数)
              if (["aname", "vname"].indexOf(k) == -1) break
              list[p][k + 'Rowspan'] = 1
              list[p][k + 'Hidden'] = false
              let i = 0
              for (i = p + 1; i <= list.length - 1; i++) {
                // 此单元格展示的数据与下一单元格展示的是同一数据,只需要显示一个即可
                if (list[p][k] == list[i][k] && !!list[p][k]) {
                  list[p][k + 'Rowspan']++
                  list[p][k + 'Hidden'] = false
                  list[i][k + 'Rowspan'] = 1
                  list[i][k + 'Hidden'] = true
                } else {
                  break
                }
              }
              // k == "aname" && console.log("aname i: ", i, list[p][k + 'Rowspan'])
              // k == "vname" && console.log("vname i: ", i, list[p][k + 'Rowspan'])
              // console.log(list.slice(p, i))
              list.slice(p, i).forEach(li => li[k + 'Rowspan'] = list[p][k + 'Rowspan'])
              // 此时指针p向下移动到第i行
              p = i
            }
          }

          // this.list = list
          this.list = []
          this.$nextTick(() => {
            this.list = list
          })
        }, 0)
      },
      removeItem(item, index) {
        console.log(item.vnameRowspan)
        if (item.vnameRowspan == 1) {
          item.colspan = 4
          item.hidden = true
          this.updateList(this.list, false)
          return
        }
        let list = this.copy(_.filter(this.list, (li) => li != item))
        this.updateList(list, false)
      },
      addItem(item, index) {
        console.log(item.vnameRowspan)
        if (item.vnameRowspan == 1 && item.hidden) {
          item.colspan = 1
          item.hidden = false
          return
        }
        if (item.vnameRowspan > 4) {
          return alert("最多只能添加5个")
        }
        console.log("start add...", item.vnameRowspan)
        let list = this.copy(this.list)
        list.push({
          aid: item.aid,
          aname: item.aname,
          vtype: item.vtype,
          vname: item.vname,
          vspending: 400 ,  // item.vspending
          vfree:  0, // item.vfree,
          vmark:  0, //item.vmark
        })
        this.updateList(list)
        console.log("end add...")
      },
      // 批量设置消费金额
      setSpending() {
        let list = this.copy(this.list)
        list.forEach(li => li.vspending= 55.55)
        this.updateList(list, false)
      },
      removeAll() {
        this.updateList(this.copy(this.list2), false)
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
  .hidden { display: none;  }
</style>
