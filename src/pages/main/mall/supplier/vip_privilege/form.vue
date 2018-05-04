<template>
  <div class="_container">
    <card-panel>
      <h3 slot="title">设置特权</h3>
      <div slot="panel-btns">
        <button class="btn btn-primary btn-sm" @click="onSavePrivilege">保存</button>
        <button class="btn btn-default btn-sm" @click="onBackPage">返回</button>
      </div>
      <div slot="panel-body">
      <div class="_setting-bar">
              <div class="_query-form">
                  <div class="_query-form-item">
                      <el-form :inline="true" :model="paramObj">
                          <el-form-item label="特权类型:" style="width:168px;">
                              <span v-if="paramObj.privilegeType==0">满减</span>
                              <span v-if="paramObj.privilegeType==1">充值返</span>
                              <span v-if="paramObj.privilegeType==2">网销卡返</span>
                          </el-form-item>
                          <el-form-item label="计算方式:" style="width:168px;">
                              <span v-if="paramObj.calculationType==0">比例</span>
                              <span v-if="paramObj.calculationType==1">金额</span>
                          </el-form-item>
                          <!-- <el-form-item label="适用店铺:" style="width:100%;">
                            <el-tag :key="tag" v-for="tag in shopList" :closable="true" :close-transition="false"  @close="onRemoveShop(tag)">{{tag.shopName}}
                            </el-tag>
                            <el-button class="button-new-tag" size="small" @click="onSearchShop">+ 点击设置</el-button>
                          </el-form-item> -->
                      </el-form>
                  </div>
              </div>
          </div>
        <table class="table table-bordered table-hover _center">
          <thead><tr> <th>特权类型</th>    <th>用户等级</th>  <th>消费满(单位：元) <el-button type="primary" size="mini" @click="addItemEach" icon="plus"></el-button> </th> <th><span v-show="paramObj.calculationType==0">优惠/百分比</span>
            <span v-show="paramObj.calculationType==1">优惠/元</span></th> <th>操作</th> </tr></thead>
          <tbody>
            <tr v-for="(li, ii) in list" :data-rowspan="li.anameRowspan + '-' + li.vnameRowspan">
              <td :class="{hidden: li.anameHidden}" :rowspan="li.anameRowspan" style="width: 120px;">{{li.aname}}</td>
              <td :class="{hidden: li.vnameHidden}" :rowspan="li.vnameRowspan" style="width: 120px;">
                <span style="display:inline-block; width: 60px;text-align: right;">{{li.vname}}</span>
                <el-button type="primary" size="mini" @click="addItem(li, ii)" icon="plus"></el-button>
              </td>
              <td rowspan="1" :colspan="li.colspan || 1">
                <span :class="{hidden: li.hidden}">{{li.vspending}}</span>
              </td>
              <td rowspan="1" :class="{hidden: li.hidden}">
                <vue-numeric currency="" separator="" v-model="li.vfree" :max="li.maxVaule" :min="freeMin" :precision="freePrecision"></vue-numeric><span v-show="paramObj.privilegeType!=0&&paramObj.calculationType==0">%</span>
              </td>
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
  import {saveVipPrivilege,queryVipPrivilegeItemList} from 'actions/mallVipPrivilegeAction'
  export default {
    components: { VueNumeric},
    props: {
      paramObj: {
        type: Object,
          default: {
            privilegeType:0,
            calculationType:0
          }
        }
    },
    computed: {
    },
    data() {
      return {
        freeMax:99999,
        freeMin:0,
        freePrecision:2,
        privilegeTypeName:[{
          id:0,
          text:'满减'
        },{
          id:1,
          text:'充值返'
        },{
          id:2,
          text:'网销卡返'
        }],
        calculationTypeName:[{
          id:0,
          text:'比例'
        },{
          id:1,
          text:'金额'
        }],
        list:[]
      }
    },
    methods: {
      onBackPage(){
        this.$emit('forward', 'PrivilegeList')
      },
      onSavePrivilege(){
        this.$confirm('确认提交保存吗?', '提示', {
                type: 'warning'
            }).then(() => {
              let params={
                privilegeType:this.paramObj.privilegeType,
                calculationType:this.paramObj.calculationType,
                paramsJson:JSON.stringify(this.list)
              }
              saveVipPrivilege(params).then(data=>{
                 const { success, msg, result } = data
                    if (success) {
                        this.$message.success('操作成功')
                        this.$emit('forward', 'PrivilegeList')
                    } else {
                        this.$message.error(msg)
                        return false
                    }
              })
                // console.log('submitdata',this.list)
                // console.log('submitdata2',this.shopList)

            }).catch(() => {})
      },
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
            list = _.sortBy(list, ['vtype', 'vspending'])
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
        if (item.vnameRowspan > 4) {
          // return alert("最多只能添加5个")
          this.$message("最多只能添加5个")
          return
        }
        console.log("start add...", item.vnameRowspan)
        this.$prompt('请输入消费金额', '消费金额', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern:/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
                inputErrorMessage: '消费金额格式不正确'
            }).then(({
                value
            }) => {
              if (item.vnameRowspan == 1 && item.hidden) {
                item.colspan = 1
                item.vspending = _.toNumber(value),
                item.hidden = false
                item.maxVaule=this.paramObj.calculationType==0?99:_.toNumber(value)
                return
              }else{
                  let list = this.copy(this.list)
                  list.push({
                  aid: item.aid,
                  aname: item.aname,
                  vtype: item.vtype,
                  vname: item.vname,
                  hidden:false,
                  vspending: _.toNumber(value) ,  // item.vspending
                  vfree:  0, // item.vfree,
                  vmark:  0, //item.vmark
                  maxVaule:this.paramObj.calculationType==0?99:_.toNumber(value)
                })
                // 过滤掉金额重复
                let temp = [], arr = []
                list.forEach(li => {
                  if (temp[li.vtype] == null) temp[li.vtype] = []
                  temp[li.vtype].push(li)
                })
                temp.forEach(te => arr.push(_.uniqBy(te, "vspending")))
                // console.log(arr)
                list = Array.prototype.concat.apply([], arr)
                // console.log(list)
                this.updateList(list)
              }
              console.log("end add...")
            }).catch(() => {
        })
      },
      addItemEach() {
        this.$prompt('请输入消费金额', '消费金额', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPattern:/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
            inputErrorMessage: '消费金额格式不正确'
        })
        .then(data => {
          let value = data.value
          let list = [], types = [], typesMap = {}
          // console.log(this.list.length)
          list = []
          this.list.forEach(item => {
            if (typesMap[item.vtype + ""] == null) typesMap[item.vtype + ""] = 0
            typesMap[item.vtype + ""]++
          })
          console.log("typesMap", typesMap)
          this.list.forEach(item => {

            if (typesMap[item.vtype + ""] > 4) {
              list.push(this.copy(item))
              return
            }

            if (item.vnameRowspan == 1 && item.hidden) {
              item.colspan = 1
              item.vspending = _.toNumber(value),
              item.hidden = false
              item.maxVaule=this.paramObj.calculationType==0?99:_.toNumber(value)
              list.push(this.copy(item))
              return
            }

            list.push(this.copy(item))
            if (types.indexOf(item.vtype) == -1) {
              list.push({
                aid: item.aid,
                aname: item.aname,
                vtype: item.vtype,
                vname: item.vname,
                hidden:false,
                vspending: _.toNumber(value) ,  // item.vspending
                vfree:  0, // item.vfree,
                vmark:  0, //item.vmark
                maxVaule:this.paramObj.calculationType==0?99:_.toNumber(value)
              })
              types.push(item.vtype)
            }
          })

          // 过滤掉金额重复
          let temp = [], arr = []
          list.forEach(li => {
            if (temp[li.vtype] == null) temp[li.vtype] = []
            temp[li.vtype].push(li)
          })
          temp.forEach(te => arr.push(_.uniqBy(te, "vspending")))
          // console.log(arr)
          list = Array.prototype.concat.apply([], arr)
          // console.log(list)
          this.updateList(list)
        })
        .catch(err => {})
      },
      // 批量设置消费金额
      setSpending() {
        let list = this.copy(this.list)
        list.forEach(li => li.vspending= 55.55)
        this.updateList(list, false)
      },
      initTable(){//初始化表格数据
        let aname=_.find(this.privilegeTypeName, { 'id': this.paramObj.privilegeType}).text
        //特权计算类型 0 比例 1 金额
        if(this.paramObj.calculationType===0){
            this.freeMax=99
            this.freePrecision=0
        }
        queryVipPrivilegeItemList({privilegeType:this.paramObj.privilegeType}).then(data=>{
          let initList=[]
          //console.log('data',data)
          if(data.length===0){
              for(let i=0;i<6;i++){
                initList.push({
                        aid: 0, aname: aname, vtype: i, vname: (i===0?"普通用户":"VIP"+i), vspending: 0, vfree: 0, vmark: "", hidden: true,colspan:4,maxVaule:0
                      })
              }
          }else{
            _.each(data,(item)=>{
               initList.push({
                  aid: item.privilegeIdItemId,
                  aname: aname,//满减
                  vtype: item.vipGrade,
                  vname: (item.vipGrade==0?"普通用户":"VIP"+item.vipGrade),//vip1 vip2 ...
                  vspending: _.toNumber(item.price),  // item.vspending
                  vfree:  item.calculationType==0?item.privilegeVal:(item.privilegeVal/100), // item.vfree,
                  calculationType:item.calculationType,
                  privilegeType:item.privilegeType,
                  vmark:  item.privilegeItemNote, //item.vmark
                  hidden:false,
                  colspan:1,
                  maxVaule:this.paramObj.calculationType==0?99:_.toNumber(item.price)
               })
            })
            for(let i=0;i<6;i++){
                if(_.findIndex(initList, {'vtype':i})==-1){
                  initList.push({
                        aid: 0, aname: aname, vtype: i, vname: (i===0?"普通用户":"VIP"+i), vspending: 0, vfree: 0, vmark: "", hidden: true,colspan:4,maxVaule:0
                      })
                }
            }
          }
          //console.log('initList',JSON.parse(JSON.stringify(initList)))
          this.list = this.updateList(initList)
        })

      }
    },
    created() {
      this.initTable()
    }
  }
</script>

<style>
  ._center td{
    text-align: center;
  }
  .hidden { display: none;  }
</style>
