<template>
  <div class="_container">
    <card-panel>
      <h3 slot="title">vip满减分级</h3>
      <div slot="panel-body" class="flex">
        <table class="table table-bordered _center">
          <thead><tr> <th>活动</th>    <th>用户级别</th>  <th>消费</th> <th>赠送</th>   <th>用户备注</th> <th>操作</th> </tr></thead>
          <tbody>
            <tr v-for="(li, ii) in list">
              <td v-for="(td, ix) in li" :rowspan="td.rowSpan">
                <div v-if="ix == 0">{{td.aname}}</div>
                <div v-if="ix == 1">{{td.vname}}</div>
                <div v-if="ix == 2">{{td.vspending}}</div>
                <div v-if="ix == 3">{{td.vfree}}</div>
                <div v-if="ix == 4">{{td.vmark}}</div>
              </td>
              <!-- <td>{{li.aname}}</td>
              <td>{{li.vname}}</td>
              <td>{{li.vspending}}</td>
              <td>{{li.vfree}}</td>
              <td>{{li.vmark}}</td> -->
              <td>
                <button class="btn btn-success">增加</button>
              </td>
            </tr>
            <!-- <tr> <td v-show="false">满减</td> <td>vip1</td> <td>200</td> <td>备注0</td> <td> <button class="btn btn-success">增加</button> </td></tr>
            <tr> <td v-show="false">满减</td> <td>vip2</td> <td>300</td> <td>备注0</td> <td> <button class="btn btn-success">增加</button> </td></tr>
            <tr> <td v-show="false">满减</td> <td>vip3</td> <td>400</td> <td>备注0</td> <td> <button class="btn btn-success">增加</button> </td></tr>
            <tr> <td>满送</td> <td>普通用户</td> <td>100</td> <td>备注0</td> <td> <button class="btn btn-success">增加</button> </td></tr>
            <tr> <td>满送</td> <td>普通用户</td> <td>100</td> <td>备注0</td> <td> <button class="btn btn-success">增加</button> </td></tr>
            <tr> <td>满送</td> <td>普通用户</td> <td>100</td> <td>备注0</td> <td> <button class="btn btn-success">增加</button> </td></tr>
            <tr> <td>满送</td> <td>普通用户</td> <td>100</td> <td>备注0</td> <td> <button class="btn btn-success">增加</button> </td></tr> -->
          </tbody>
        </table>

      </div>
    </card-panel>
  </div>
</template>

<script>
  let list = [
          {
            aid: 1,                   // 活动id
            type: 1,                  // 活动类型
            aname: "满减",             // 活动名称
            vips: [                   // 特权用户类型
              {
                type: 0,                // vip类型
                label: '普通用户',        // 特权类型名称
                items: [                // 该类特权用户下的优惠活动
                  {
                    spending: 100,          // 消费金额
                    free: 5,                // 赠送金额
                    remark: "备注",          // 备注
                  },
                  {
                    spending: 120,          // 消费金额
                    free: 5,                // 赠送金额
                    remark: "备注",          // 备注
                  },
                ]
              },
              {
                type: 1,                // vip类型
                label: 'vip1',          // 特权类型名称
                items: [                // 该类特权用户下的优惠活动
                  {
                    spending: 180,          // 消费金额
                    free: 5,                // 赠送金额
                    remark: "备注",          // 备注
                  },
                  {
                    spending: 180,          // 消费金额
                    free: 5,                // 赠送金额
                    remark: "备注",          // 备注
                  }
                ],
              }
            ]
          }
        ]

  import _ from "lodash"
  export default {
    components: { },
    computed: {
    },
    data() {
      return {
        list:[
          { aid: 1234, aname: "满减", vtype: 0, vname: "普通用户", vspending: 500, vfree: 50, vmark: "满500送30元"},
          { aid: 1234, aname: "满减", vtype: 0, vname: "普通用户", vspending: 300, vfree: 30, vmark: "满300送30元"},
          { aid: 1235, aname: "满送", vtype: 0, vname: "普通用户", vspending: 500, vfree: 5, vmark: "满50送5元"},
          { aid: 1234, aname: "满减", vtype: 1, vname: "vip1", vspending: 400, vfree: 10, vmark: "满400送10元"},
          { aid: 1234, aname: "满减", vtype: 1, vname: "vip1", vspending: 300, vfree: 15, vmark: "满300送15元"},
          { aid: 1234, aname: "满减", vtype: 2, vname: "vip2", vspending: 150, vfree: 15, vmark: "满100送15元"},
          { aid: 1235, aname: "满送", vtype: 2, vname: "vip2", vspending: 150, vfree: 15, vmark: "满100送15元"},
          { aid: 1234, aname: "满减", vtype: 2, vname: "vip2", vspending: 150, vfree: 15, vmark: "满100送15元"},
          { aid: 1234, aname: "满减", vtype: 2, vname: "vip2", vspending: 150, vfree: 15, vmark: "满100送15元"},
          { aid: 1235, aname: "满送", vtype: 1, vname: "vip1", vspending: 100, vfree: 10, vmark: "满100送10元"},
          { aid: 1234, aname: "满减", vtype: 3, vname: "vip3", vspending: 150, vfree: 15, vmark: "满100送15元"},
          { aid: 1234, aname: "满减", vtype: 3, vname: "vip3", vspending: 150, vfree: 15, vmark: "满100送15元"},
          { aid: 1234, aname: "满减", vtype: 3, vname: "vip3", vspending: 150, vfree: 15, vmark: "满100送15元"},
          { aid: 1235, aname: "满送", vtype: 3, vname: "vip3", vspending: 150, vfree: 15, vmark: "满100送15元"},
          { aid: 1235, aname: "满送", vtype: 3, vname: "vip3", vspending: 150, vfree: 15, vmark: "满100送15元"},
          { aid: 1234, aname: "满减", vtype: 4, vname: "vip4", vspending: 150, vfree: 15, vmark: "满100送15元"},
          { aid: 1234, aname: "满减", vtype: 5, vname: "vip5", vspending: 150, vfree: 15, vmark: "满100送15元"},
          { aid: 1235, aname: "满送", vtype: 0, vname: "普通用户", vspending: 500, vfree: 5, vmark: "满50送5元"},
          { aid: 1235, aname: "满送", vtype: 1, vname: "vip1", vspending: 100, vfree: 10, vmark: "满100送10元"},
          { aid: 1235, aname: "满送", vtype: 2, vname: "vip2", vspending: 150, vfree: 15, vmark: "满100送15元"},
          { aid: 1235, aname: "满送", vtype: 3, vname: "vip3", vspending: 150, vfree: 15, vmark: "满100送15元"},
          { aid: 1235, aname: "满送", vtype: 4, vname: "vip4", vspending: 150, vfree: 15, vmark: "满100送15元"},
          { aid: 1235, aname: "满送", vtype: 5, vname: "vip5", vspending: 150, vfree: 15, vmark: "满100送15元"},
        ],
        list2: []
      }
    },
    methods: {
      updateList() {
        let _list = _.sortBy(this.list, ['aid', 'vtype'])
        let a = _.group
        // this.list =
      },
      removeItem(item, index) {
        this.list = _.filter(this.list, (li) => li == item)
      },
      addItem(aid, aname, vtype, vname, vspending = 0, vfree = 0, vmark = "") {
        this.list.push({
          aid, aname, vtype, vname, vspending, vfree, vmark
        })
        this.updateList()
      },
      getRowspan(list, arr) {
        let o = {}
        arr.reduce((p, c, i, a) => {
          p.push(c)
          let k = p.join("-")
          if (o[k] == null) o[k] = []
          list.forEach(li => {
            let z = []
            p.forEach(n => {
              z.push(li[n])
              let v = z.join("-")
              if (o[k].indexOf(z) == -1) {
                o[k].push(z)
              }
            })
          })
          return p
        },[])
        o = _.mapValues(o, (val, key) => {
          return val.reduce((c, p) => {
            c.push(p.join("-"))
            return c
          }, [])
        })

        function repeatCounter (arr) {
          let uniq = _.uniq(arr)
          let re = {}
          arr.forEach(u => {
            if (re[u] == null) re[u] = 0
            if (uniq.indexOf(u) > -1) re[u]++
          })
          return re
        }
        let res = {}
        _.values(o).forEach(v => {
          // console.log(repeatCounter(v))
          res = Object.assign(res, repeatCounter(v))
        })
        return res
      },
      // setColumn(this.list, [['aid', 'aname'], ['vtype', 'vname'], ['vspending'], ['vfree'], ['vmark']])
      setColumn(list , fileds, rowSpanFileds) {
        list = _.sortBy(list, ['aid', 'vtype'])
        let rs = this.getRowspan(list, rowSpanFileds)
        list = list.map(li => fileds.map(ar => _.pick(li, ar)))
        list.forEach(li => {
          li.forEach((td, i)=> {
            if (i >= rowSpanFileds.length) {
              td.rowSpan = 1
            } else {
              rowSpanFileds.forEach((k, j) => {
                // console.log(td[k])
                if (_.has(rs,td[k] + "")) td.rowSpan = rs[td[k] + ""]
              })
            }
          })
        })

        return list
      },
    },
    created() {
      this.list = this.setColumn(this.list, [['aid', 'aname'], ['vtype', 'vname'], ['vspending'], ['vfree'], ['vmark']], ['aid', 'vtype'])
      console.log(this.list)
    }
  }
</script>

<style>
  ._center td{
    text-align: center;
  }
</style>
