<template>
  <div class="_container">
    <card-panel>
      <h3 slot="title"> 会员特权列表 </h3>
      <div slot="panel-btns">
        <button class="btn btn-primary btn-sm" @click="onAdd">设置特权</button>
      </div>
      <div slot="panel-body">
      <div class="_setting-bar" style="padding: 8px 8px 2px 8px;">
              <div class="_query-form">
                  <!-- <div class="_query-form-item">
                      <el-form :inline="true" >
                          <el-form-item label="适用店铺:" style="width:100%;">
                            <el-tag :key="tag" v-for="tag in shopList" :closable="true" :close-transition="false"  @close="onRemoveShop(tag)">{{tag.shopName}}
                            </el-tag>
                            <el-button class="button-new-tag" size="small" @click="onSearchShop">+ 点击添加</el-button>
                          </el-form-item>
                      </el-form>
                  </div> -->
                  <div style="width: 65px; line-height: 29px;">适用店铺</div>
                  <div class="flex flex-wrap">
                    <el-tag type="danger" :key="tag" v-for="tag in shopList" style="margin: 0 5px 5px 0; height: 29px; line-height: 29px;"
                      :closable="true"
                      :close-transition="false"
                      @close="onRemoveShop(tag)">
                        {{tag.shopName}}
                    </el-tag>
                    <el-button type="danger" class="button-new-tag" size="mini" @click="onSearchShop" style="height: 29px;">点击添加</el-button>
                  </div>
              </div>
          </div>
        <table class="table table-bordered table-hover _center" style="margin-top: 10px;">
          <thead><tr> <th>特权类型</th>    <th>用户等级</th>  <th>消费满(单位：元)</th> <th>优惠</th>  <th>特权备注</th> <th>操作</th> </tr></thead>
          <tbody>
            <tr v-for="(li, ii) in list" :data-rowspan="li.anameRowspan + '-' + li.vnameRowspan">
              <td :class="{hidden: li.anameHidden}" :rowspan="li.anameRowspan" style="width: 120px;">{{li.aname}}
                <p>计算方式-{{li.calculationType==0?'比例':'金额'}}</p>
                <p :style="{color:li.statusCode==0?'#00FF00':'#FF0000' }">({{li.statusCode==0?'已启用':'已停用'}})</p>
              </td>
              <td :class="{hidden: li.vnameHidden}" :rowspan="li.vnameRowspan" style="width: 120px;">
                {{li.vname}}
                <!-- <button class="btn btn-sm btn-default" @click="addItem(li, ii)">+</button> -->
              </td>
              <td rowspan="1" :colspan="li.colspan || 1">
                <!-- <input type="text" v-model="li.vspending" :class="{hidden: li.hidden}" readonly="true"> -->
                <span :class="{hidden: li.hidden}">{{li.vspending}}</span>
                <!-- <div :class="{hidden: !li.hidden}">请添加活动 <button class="btn btn-sm btn-default" @click="addItem(li, ii)">+</button></div> -->
              </td>
              <td rowspan="1" :class="{hidden: li.hidden}">
                 {{li.vfree}}<span v-show="li.privilegeType!=0&&li.calculationType==0">%</span>
              </td>
              <td rowspan="1" :class="{hidden: li.hidden}">
                {{li.vmark}}
              </td>
              <td :class="{hidden: li.anameHidden}" :rowspan="li.anameRowspan">
                <button class="btn btn-warning btn-sm" @click="editStatusCode(li, ii)">{{li.statusCode==0?'停用':'启用'}}</button>
                <button class="btn btn-danger btn-sm" @click="removePrivilege(li, ii)">删除</button>
                <button class="btn btn-info btn-sm" @click="editItem(li, ii)">编辑</button>
              </td>
            </tr>
          </tbody>
        </table>

      </div>
    </card-panel>
    <!-- 选择特权类型 -->
    <el-dialog title="选择特权类型" v-model="privilegeTypeVisible" size="600">
        <el-form :model="privilegeTypeObj" ref="privilegeTypeParams">
            <el-form-item label="特权类型" :label-width="formLabelWidth">
                <el-select v-model.number="privilegeTypeObj.privilegeType" placeholder="请选择" style="width: 100%;">
                <el-option label="满减" :value="0"></el-option>
                <!-- <el-option label="充值返" :value="1"></el-option>
                <el-option label="网销卡返" :value="2"></el-option> -->
              </el-select>
            </el-form-item>
            <el-form-item label="计算方式" :label-width="formLabelWidth">
                <el-select v-model.number="privilegeTypeObj.calculationType" placeholder="请选择" style="width: 100%;">
                <el-option label="比例" :value="0"></el-option>
                <el-option label="金额" :value="1"></el-option>
              </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="privilegeTypeVisible = false">取 消</el-button>
            <el-button type="primary" @click.stop.prevent="onAddNext">确 定</el-button>
        </div>
    </el-dialog>
    <shop-dailog ref="shopDailogRef" @onSuccess="onGetShopData"></shop-dailog>
  </div>
</template>

<script>
  import _ from "lodash"
  import VueNumeric from 'vue-numeric'
  import ShopDailog from './company'
  import {queryVipPrivilegeItemList,saveVipPrivilegeShop,queryVipPrivilegeShopList,deleteVipShop,updateVipPrivilegeStatusCode,deleteVipPrivilege} from 'actions/mallVipPrivilegeAction'
  export default {
    components: { VueNumeric,ShopDailog },
    computed: {},
    data() {
      return {
        shopList:[],
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
        formLabelWidth: '120px',
        privilegeTypeVisible: false,
        privilegeTypeObj:{
          privilegeType:0,
          calculationType:0
        },
        list:[]
        /*list2: [
          { aid: 1234, aname: "满减", vtype: 0, vname: "vip0", vspending: 500, vfree: 50, vmark: "满500送30元", colspan: 4, rowspan: 1, hidden: true},
          { aid: 1234, aname: "满减", vtype: 1, vname: "vip1", vspending: 500, vfree: 50, vmark: "满500送30元", colspan: 4, rowspan: 1, hidden: true},
          { aid: 1234, aname: "满减", vtype: 2, vname: "vip2", vspending: 500, vfree: 50, vmark: "满500送30元", colspan: 4, rowspan: 1, hidden: true},
          { aid: 1234, aname: "满减", vtype: 3, vname: "vip3", vspending: 500, vfree: 50, vmark: "满500送30元", colspan: 4, rowspan: 1, hidden: true},
          { aid: 1234, aname: "满减", vtype: 4, vname: "vip4", vspending: 500, vfree: 50, vmark: "满500送30元", colspan: 4, rowspan: 1, hidden: true},
          { aid: 1234, aname: "满减", vtype: 5, vname: "vip5", vspending: 500, vfree: 50, vmark: "满500送30元", colspan: 4, rowspan: 1, hidden: true},
        ]*/
      }
    },
    methods: {
      editStatusCode(item,i){
        let statusName=item.statusCode==0?'停用':'启用'
        this.$confirm(`确认${statusName}后 ${item.aname} 下所有配置都将被${statusName},确认提交吗？`,"确认提示",{
          type:'warning'
        }).then(()=>{
            updateVipPrivilegeStatusCode({privilegeId:item.aid,statusCode:item.statusCode==0?1:0}).then(data=>{
              const { success, msg, result } = data
              if (success) {
                  this.$message.success('操作成功')
                  this.initTable()
              } else {
                  this.$message.error(msg)
                  return false
              }
            })
        }).catch(()=>{})
      },
      removePrivilege(item,i){
        this.$confirm(`确认操作后 ${item.aname} 下所有配置都将被移除,确认移除吗？`,"确认提示",{
          type:'warning'
        }).then(()=>{
            deleteVipPrivilege({privilegeId:item.aid}).then(data=>{
              const { success, msg, result } = data
              if (success) {
                  this.$message.success('操作成功')
                  this.initTable()
              } else {
                  this.$message.error(msg)
                  return false
              }
            })
        }).catch(()=>{})
      },
      onRemoveShop(tag){
        this.$confirm("确认移除吗？","确认提示",{
          type:'warning'
        }).then(()=>{
            deleteVipShop({vipShopId:tag.vipShopId}).then(data=>{
              const { success, msg, result } = data
              if (success) {
                  this.$message.success('操作成功')
                  this.shopList.splice(this.shopList.indexOf(tag), 1);
              } else {
                  this.$message.error(msg)
                  return false
              }
            })
        }).catch(()=>{})
      },
      onSearchShop(){
       setTimeout(()=>{
        this.$refs.shopDailogRef.dialogVisible=true
        this.$refs.shopDailogRef.loadTableData()
       },0)
      },
      onGetShopData(data){
        if(data.length>0){
          saveVipPrivilegeShop({paramsJson:JSON.stringify(data)}).then(data1=>{
            const { success, msg, result } = data1
              if (success) {
                  this.$message.success('操作成功')
                  this.initShopData()
              } else {
                  this.$message.error(msg)
                  return false
              }
          })
        }
      },
      editItem(item,i){
        this.privilegeTypeObj.privilegeType=item.privilegeType
        this.privilegeTypeObj.calculationType=item.calculationType
        this.$emit('forward', 'PrivilegeForm', this.privilegeTypeObj)
      },
      onAdd(){
          this.privilegeTypeVisible=true
      },
      onAddNext(){
          this.$emit('forward', 'PrivilegeForm', this.privilegeTypeObj)
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
          // return alert("最多只能添加5个")
          return this.$message("最多只能添加5个")
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
      initTable(){//初始化表格数据
        queryVipPrivilegeItemList().then(data=>{
          let initList=[]
          if(data.length>0){
            _.each(data,(item)=>{
               initList.push({
                  aid: item.privilegeId,
                  aname: _.find(this.privilegeTypeName, { 'id': item.privilegeType}).text,//满减
                  vtype: item.vipGrade,
                  vname: (item.vipGrade==0?"普通用户":"VIP"+item.vipGrade),//vip1 vip2 ...
                  vspending: _.toNumber(item.price),  // item.vspending
                  vfree:  item.calculationType==0?item.privilegeVal:(item.privilegeVal/100), // item.vfree,
                  calculationType:item.calculationType,
                  privilegeType:item.privilegeType,
                  vmark:  item.privilegeItemNote, //item.vmark
                  statusCode:item.statusCode,
                  colspan:1
               })
            })
            //console.log('initList',JSON.parse(JSON.stringify(initList)))
            this.list = this.updateList(initList)
          }
        })
      },
      initShopData(){
        queryVipPrivilegeShopList().then(data=>{
          if(data.length>0){
            this.shopList=data
          }
        })
      }
    },
    created() {
      this.initShopData()
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
