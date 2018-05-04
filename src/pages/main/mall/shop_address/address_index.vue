<template>
  <div class="_container">
    <card-panel>
      <h3 slot="title">免邮设置</h3>
      <div slot="panel-body">
          <el-form :inline="true" :model="shopParamObj" class="demo-form-inline" :rules="baseRules" ref="ruleForm">  
            <el-form-item label="满包邮" prop="resource">
              <el-radio-group v-model="shopParamObj.actionType" @change="changeShopAmount"> 
                <el-radio :label="0">关闭</el-radio>
                <el-radio :label="1">开通</el-radio> 
              </el-radio-group>
            </el-form-item>  
            <el-form-item label="满足金额(元)" prop="amount" style="margin-left: 50px" v-show="!isShowFlag">  
              <el-input v-model="shopParamObj.amount" placeholder="金额" type="number">
              </el-input>
            </el-form-item>                       
            <el-form-item>
              <el-button type="primary" @click="onSave">保存</el-button> 
            </el-form-item>
          </el-form>      
      </div>
    </card-panel>  
    <card-panel style="margin-top:10px;">
      <h3 slot="title">价格列表</h3>
    <div slot="panel-body">
      <!--<tab-items style="margin-bottom:10px;">
        <li class="active"><a href="javascript:;">价格列表</a></li>
      </tab-items>-->
      <div class="find-set" style="background: #F1FAFD;padding: 9px 8px 0 8px;">
        <div class="find-price" style="display: flex;justify-content: flex-start;">
          <div class="flex-find">
            <div style="margin-bottom: 5px;">
              <!--<el-select v-model="chooseV" placeholder="请选择">
                <el-option
                  v-for="item in area"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>-->
              <el-radio class="radio" v-model="radioPlace" label="1">查询省</el-radio>
              <el-radio class="radio" v-model="radioPlace" label="2">查询市</el-radio>
            </div>
            <div class="findP">
              <div>
                <el-select v-model="pid" @change="pchange">
                  <el-option v-for="p in cityData" :label="p.text" :value="p.id" :key="p.id"></el-option>
                </el-select>
              </div>
              <div v-show="radioPlace==2" style="margin-left: 10px;">
                <el-select v-model="cid" @change="cchange">
                  <el-option v-for="c in cs" :label="c.text" :value="c.id" :key="c.id"></el-option>
                </el-select>
              </div>
              <div style="margin-left: 10px;">
                <el-button type="" @click.native.prevent="search">查询</el-button> 
                <el-button type="" @click.native.prevent="reset">清除</el-button>
              </div>
            </div>
          </div>
        </div>
        <div>
          <el-button type="primary" @click.native.prevent="$emit('forward', 'priceSet')">新增</el-button>
        </div>
      </div>
      <div class="table-list">
        <el-table
          :data="tableData4"
          style="width: 100%"
          :row-class-name="tableRowClassName" border>
          <el-table-column
            align="center"
            type="index"
            label="编号"
            width="70">
          </el-table-column>
          <el-table-column
            align="center"
            prop="strProvince"
            label="省份"
            width="120">
          </el-table-column>
          <el-table-column
            align="center"
            prop="strCity"
            label="城市"
            min-width="100">
          </el-table-column>
          <el-table-column
            align="center"
            prop="sendType"
            label="配送类型"
            width="100">
          </el-table-column>
          <el-table-column
            label="配送价格"
            min-width="500"
            inline-template
          >
            <div>
              <p v-show="typeof row.dPrice == 'object'" v-for="d in row.dPrice">{{d}}</p>
              <p v-show="typeof row.dPrice == 'string'">{{row.dPrice}}</p>
            </div>
          </el-table-column>
          <el-table-column
            align="center"
            inline-template
            label="操作"
            width="120"
          >
            <div>
                <el-button size="mini" type="primary" @click.native="handleUpdate(row)">修改</el-button>
                <el-button size="mini" type="danger" @click.native="handleDelete(row.cid)">删除</el-button>
            </div>
          </el-table-column>
        </el-table>
        <div class="_pagination">
          <!-- 分页 -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalSize">
          </el-pagination>
        </div>
      </div>
    </div>
      </card-panel>
  </div>
</template>
<style lang="sass">
  .find-set {
    display: flex;
    justify-content: space-between;
  }
  .findP {
    display: flex;
    justify-content: flex-start;
    margin-left: 20px;
    margin-top: 1px;
  }
  .flex-find {
    display: flex;
    justify-content: flex-start;

  }
  .table-list {
    margin-top: 10px;
  }
</style>
<script>
  import RegExp from 'lib/utils/regexp'
  import breadcrumb from "components/breadcrumb"
  import tabItems from "components/tab-items"
  import _ from "lodash"
  import { _saveOrUpdateExpressSetting,_findExpressSetting,_deleteExpressSetting} from 'src/vuex/api/shopExpressSetting'
  import { _setShopFreePostage,_getMallShopByShopId } from 'src/vuex/api/shopAPI'
  export default {
    components: {
      breadcrumb,
      tabItems,
    },
    data(){      
      var checkFreePriceLimit = (rule, value, callback) => {
        setTimeout(() => {
          if (parseFloat(value) < 0.01) {
            callback(new Error('金额必须大于0.01'));
          } else {
            callback();
          }
        }, 1000);
      }; 
      return {
        area: [{
          value: '1',
          label: '省'
        }, {
          value: '2',
          label: '城市'
        }],
        chooseV:'',
        tableData:[
          {
            index:'',
            strProvince:'',
            strCity:'',
            sendType:'',
            dPrice:''
          }
        ],
        expressFind:{},
        result:[],
        //------
        cityData: [],
        pid: '110000',
        cid: '110100',
        did: '110101',
        tableData2:[],
        tableData3:[],
        index1:'',
        strProvince1:'',
        strCity1:'',
        district1:'',
        dPrice1:'',
        page :1,
        pageSize :10,
        totalSize: 100,
        radioPlace:'1',
        dPrice:[],
        dataFlag:[],
        tableData5:[],

         _rules:{}, //added by xwen 
        isShowFlag:false,
        shopParamObj:{
          actionType:0,
          amount:0
        },
        baseRules:{
          amount: [
            { type: 'number',required: true, message: '请输入满足金额', trigger: 'blur' },
            { validator: checkFreePriceLimit, trigger: 'blur' }
          ],
        }
      }
    },
    computed: {
      cs() {
        return (_.find(this.cityData, {id: this.pid}) || {}).children || {}
      },
      ds() {
        return (_.find(this.cs, {id: this.cid}) || {}).children || {}
      },
      tableData4:function(){
        let start=this.pageSize*(this.page-1);
        let end=start+this.pageSize;
        return this.tableData3.slice(start,end);
      },
      shopID() {
        return this.$store.getters.shopID
      }
    },
    vuex:{

    },
    methods:{
      tableRowClassName(row, index) {
        if (index === 1) {
          return 'info-row';
        } else if (index === 3) {
          return 'positive-row';
        }
        return '';
      },
      handleSizeChange(val) {
        this.pageSize = val;
      },
      handleCurrentChange(val) {
        this.page = val;
      },
      pchange(val) {
          this.cid = this.cs[0]['id'];
          if(this.ds[0]) {
            this.did = this.ds[0]['id']
          }else{
            this.did=-1;
          }
      },
      cchange(val) {
        this.did = this.ds[0]['id']
      },
      dchange(val) {
        console.log(this.pid, this.cid, this.did)
      },
      forData() {
        for(let i in this.result){
          let areaExpressPrice = this.result[i].areaExpressPrice
          let arr=[];
          for(let index in areaExpressPrice){
            let districtN = areaExpressPrice[index].text
            let districtP = areaExpressPrice[index].price
            let mixnp = districtN + "("+districtP+"元)　"
            arr.push(mixnp);
          }

          let arrv = {
            index:i,
            strProvince:this.result[i].strProvince,
            strCity:this.result[i].strCity,
            district:this.result[i].district,
            dPrice:arr,
            province: this.result[i].province,
            city: this.result[i].city,
            expressType: this.result[i].expressType
          }
          this.tableData3.push(arrv);
        }
      },
      search(val){
        this.forData();
        if(this.radioPlace == 1){
          let cData = _.filter(this.result, {province: this.pid});
          let cData1 = _.filter(cData, function(n) {
            return n.deleteFlag != 1;
          });

          let tabd = [];
          let tabd1 = [];
          for(let index in cData1){
            if(cData1[index].expressType == 0){
              let priceComment=[];
              cData1[index].comments != ' ' ? priceComment = cData1[index].expressPrice.toString() + '元　('+cData1[index].comments+')' : priceComment = cData1[index].expressPrice.toString() + '元'
              let eDataC = {'index':index,cid:cData1[index].expressId,strProvince:cData1[index].strProvince,strCity:cData1[index].strCity,sendType:'市',district:cData1[index].district,dPrice:priceComment}
              tabd.push(eDataC);
            }
            if(cData1[index].expressType == 1){
              let eDataD = _.find(this.tableData5, {strCity: cData1[index].strCity})
              tabd1.push(eDataD);
              //console.log(JSON.stringify(eDataD))
            }
          }
          Array.prototype.push.apply(tabd, tabd1);
          this.tableData3 = [];
          this.tableData3 = tabd;
          this.totalSize=this.tableData3.length;
        }else {
          let fData = _.find(this.result, {city: this.cid});
          let eData = [];

          if(fData == undefined){
            this.tableData3 = [];
          }else {
            if(fData.deleteFlag == 1){
              this.tableData3 = [];
            }else {
              if(fData.expressType == 1){
                eData = _.find(this.tableData5, {strCity: fData.strCity});
                this.tableData3 = [];
                this.tableData3.push(eData);
                this.totalSize=this.tableData3.length;
              }else {
                this.tableData3 = [];
                let priceComments = [];
                fData.comments != ' ' ? priceComments = fData.expressPrice.toString() + '元　('+ fData.comments+')' : priceComments = fData.expressPrice.toString() + '元'
                let arr = {index:1,cid:fData.expressId,strProvince:fData.strProvince,strCity:fData.strCity,district:fData.district,sendType:'市',dPrice:priceComments}
                this.tableData3.push(arr);
                //console.log(JSON.stringify(this.tableData3))
                this.totalSize=this.tableData3.length;
              }
            }
          }

        }
      },
      reset() {
        this.dataFlag = [];
        this.findData();
      },
      handleDelete(cid){
        let ccid = {'ids':cid};
        this.$confirm('是否确认删除?', '提示', {type: 'warning'})
          .then(() => {
          _deleteExpressSetting(ccid).then(data=>{
          const { success, result, msg } = data;
        if (success) {
          this.$set( _.find(this.tableData3,{'cid':cid}),'deleteFlag',1);
          this.tableData3=_.remove(this.tableData3, function(o) { return o.deleteFlag!=1;});
          this.totalSize=this.tableData3.length;
          this.$message.success("删除成功!");
        } else {
          this.$message.success("删除失败!")
        }
      })
      }).catch(() => {})
      },
      handleUpdate(item) {
          this.$emit('forward', 'priceSet', item);
      },

      findData(){
        _findExpressSetting(this.expressFind).then(({success, result, msg})=>{
          if(success){
            this.result = result;
            for(let i in result){
              let areaExpressPrice = result[i].areaExpressPrice
              let arr=[];
              for(let index in areaExpressPrice){
                let districtN = areaExpressPrice[index].text
                let districtP = areaExpressPrice[index].price
                let commentV = [];
                areaExpressPrice[index].comments == null ? commentV = areaExpressPrice[index].comments=' ' : commentV = '(' + areaExpressPrice[index].comments + ')　'
                let mixnp = districtN + "("+districtP+"元)"+ commentV
                arr.push(mixnp);
              }
              //let arrSplice1 = _.chunk(arr, 3)
              let arrSplice = _.chunk(arr, 3).map(a => a.join(' '))
              //console.log(arrSplice1)
              let arrv ={};
              let typeV = '';
              let comment = [];
              result[i].comments == null ? comment = result[i].comments=' ' : comment = '(' + result[i].comments + ')'

              if(result[i].expressType==1){
                typeV = '区/县';
                arrv = {index:i,cid:result[i].expressId,strProvince:result[i].strProvince,strCity:result[i].strCity,sendType:typeV,dPrice:arrSplice,deleteFlag:result[i].deleteFlag};

                arrv = {
                  index:i,
                  cid:result[i].expressId,
                  strProvince:result[i].strProvince,
                  strCity:result[i].strCity,
                  sendType:typeV,
                  dPrice:arrSplice,
                  deleteFlag:result[i].deleteFlag,

                  province: this.result[i].province,
                  city: this.result[i].city,
                  expressType: this.result[i].expressType
                };
              }else {
                typeV = '市';
                //arrv = {index:i,cid:result[i].expressId,strProvince:result[i].strProvince,strCity:result[i].strCity,sendType:typeV,dPrice:result[i].expressPrice+'元'+comment,deleteFlag:result[i].deleteFlag}

                arrv = {
                  index:i,
                  cid:result[i].expressId,
                  strProvince:result[i].strProvince,
                  strCity:result[i].strCity,
                  sendType:typeV,
                  dPrice:result[i].expressPrice+'元'+comment,
                  deleteFlag:result[i].deleteFlag,

                  province: this.result[i].province,
                  city: this.result[i].city,
                  expressType: this.result[i].expressType
                }
              }
              this.dataFlag.push(arrv);
            }
            this.tableData3 = _.filter(this.dataFlag, function(n) {
              return n.deleteFlag != 1;
            });
            this.totalSize=this.tableData3.length;
            let td3=this.tableData3; 
            $.extend(this.tableData5,this.tableData3);
          }
        });
      },

      // added by xwen    
      loadShopData(){
          _getMallShopByShopId(this.shopID).then((data) => {
              const {success,result}=data;
              if(success) {
                this.shopParamObj.amount = result.mallshopVo.shopFreePrice ;
                if(this.shopParamObj.amount > 0){
                  this.shopParamObj.actionType = 1 ;
                }
                this.changeShopAmount() ;
              }else{
                this.shopParamObj.amount = 0 ;
              }
          });
      },
      changeShopAmount(){ 
        if(this.shopParamObj.actionType == '0'){
            this.isShowFlag = true ; 
            this.shopParamObj.amount = 0 ; 
            delete this.baseRules['amount'] ;
        }else{
          this.isShowFlag = false ; 
          if(this.shopParamObj.amount == 0){
            this.shopParamObj.amount = 0.01 ; 
          }
          this.baseRules = {...this._rules} ;
        } 
      },  
      onSave(){
         this.$refs.ruleForm.validate((valid) => {
            if (valid) {
              console.log(JSON.stringify(this.shopParamObj))
              this.$confirm('确认保存吗?', '提示', { 
                type: 'warning'
              }).then(() => {
                _setShopFreePostage(this.shopParamObj).then((data) => {
                    const {success, msg} = data;
                    if(success) {
                      this.$message({message: '操作成功', type: 'success'});
                    } else {
                        this.$message.error('错了哦，'+msg);
                    }
                });
              }).catch(() => {});
            }
         })        
      }
    },
    mounted(){

    },
    created(){
      this.loadShopData() ;
      this._rules = {...this.baseRules}
      // 代码分割
      require.ensure([], () => {
        this.cityData = require('assets/cityforaddress.json')
    });
      this.findData();


      this.changeShopAmount() 

    }
  }
</script>
