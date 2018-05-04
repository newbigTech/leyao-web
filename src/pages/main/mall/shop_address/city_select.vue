<template>
  <div class="demo">
    <div class="" style="margin: 5px 0 30px 60px;width:100%;">
        <div class="city-name" style="width: 100%">
            <div class="province-all" style="width: 515px;">
              <el-select v-model="pid" :span="6" @change="pchange(pid)">
                <el-option v-for="p in cityData" :label="p.text" :value="p.id" :key="p.id"></el-option>
              </el-select>
            </div>  
            <div style="width: 515px;margin-left: 3%" v-show="districtChecked">
              <el-select v-model="cid" :span="6" @change="cchange(cid)">
                <el-option v-for="c in cs" :label="c.text" :value="c.id" :key="c.id"></el-option>
              </el-select>
            </div>
        </div>
        <div class="change-set" style="clear: both">
          <div class="city-part set-con">
            <div class="set-price">
              <div style="padding-top: 10px;padding-bottom: 5px;"><el-checkbox v-model="cityChecked" @change="pselect">设置城市配送价</el-checkbox></div>
              <div>
              </div>
            </div>
            <div class="city-select need-change" v-show="cityChecked">
              <ul class="all-city">
                <div style="display: flex;margin: 10px 0;justify-content: flex-start">
                  <div style="padding-top: 5px;width: 15%"><el-checkbox @change="allChooseCity" v-model="allCheckedCity"></el-checkbox><span style="margin-left: 5px;width: 30px;">全选</span><!--　<span style="">统一价格:</span>--></div>
                  <div style="display: flex;width: 70%">
                    <div style="padding-top: 5px;width: 66px;">批量价格</div>
                    <div style="width: 65%">
                      <el-input
                        type="number"
                        size="small"
                        placeholder="批量价格"
                        v-model="patchPriceCity">
                      </el-input>
                    </div>
                  </div>
                </div>
                
                <li v-for="(c , index) in cs" :key="c.id">
                  <div style="width:22%;">
                    <el-checkbox-group v-model="citySelect">
                      <el-checkbox @change="changedata" :label="c.id">{{c.text}}</el-checkbox>
                    </el-checkbox-group>
                  </div>
                  <!--<div class="input-width" style="display: flex">-->
                    <div style="width:90px;">
                      <el-input
                        type="number"
                        size="small"
                        placeholder="配送价格"
                        :disabled="c.cityPrice==undefined || c.deleteFlag==1"
                        v-model="c.cityPrice"
                        >
                      </el-input>
                    </div>
                    <!--<span style="padding-top: 5px;padding-left: 10px">元</span>-->
                 <!-- </div>-->
                  <div style="width:145px;">
                    <el-input
                      type="text"
                      size="small"
                      :disabled="c.cityPrice==undefined || c.deleteFlag==1"
                      placeholder="请输入配送说明"
                      v-model="c.comments">
                    </el-input>
                  </div>
                  <div class="edit-de">
                    <el-button type="success" style="margin-left: 0;" size="mini" v-if="c.cityPrice==undefined || c.deleteFlag==1" @click.native="open_single(c.id,c.cityPrice,c.text,0)">配送</el-button>
                    <el-button v-else type="danger" size="mini" @click.native="open_single(c.id,c.cityPrice,c.text,1)">不送</el-button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
          <div class="district-part set-con">
            <div class="set-price">
              <div style="padding-top: 10px;padding-bottom: 5px;"><el-checkbox v-model="districtChecked" @change="cselect">设置地区配送价</el-checkbox></div>
            </div>
            <div class="city-select need-change" v-show="districtChecked">
              <ul class="all-city">
                <div style="display: flex;margin: 10px 0;justify-content: flex-start">
                  <div style="padding-top: 5px;width: 15%"><el-checkbox @change="allChoose" v-model="allCheckedDistrict"></el-checkbox><span style="margin-left: 5px">全选</span></div>
                  <div style="display: flex;width: 70%">  
                    <div style="padding-top: 5px;width: 66px;">批量价格</div>
                    <div style="width: 65%">
                      <el-input
                        type="number"
                        size="small"
                        placeholder="批量价格"
                        v-model="patchPriceDistrict">
                      </el-input>
                    </div>
                  </div>
                </div>
                <li v-for="d in ds">
                  <div class="set-input" style="width:19%;">
                    <div>   <!--class="set-input"-->
                      <el-checkbox-group v-model="districtSelect">
                        <el-checkbox @change="changedata(d.id)" :label="d.id">{{d.text}}</el-checkbox>
                      </el-checkbox-group>
                    </div>
                  </div>
                    <div style="width:90px;" v-show="0 == 0"> 
                      <el-input
                        type="number"
                        size="small"  
                        placeholder="配送价格"
                        :disabled="d.priceSend==undefined"
                        v-model="d.priceSend">
                      </el-input>
                    </div>
                   <!-- <span style="padding-top: 5px;padding-left: 10px">元</span>-->
                  <div style="width:145px;">
                    <el-input
                      type="text"
                      size="small"
                      :disabled="d.priceSend==undefined"
                      placeholder="请输入配送说明"
                      v-model="d.comments">
                    </el-input>
                  </div>
                  <div class="edit-de">
                    <el-button type="success" style="margin-left: 0;" size="mini" v-if="d.priceSend==undefined" @click.native="open_single2(d.id,d.priceSend,d.text,0)">配送</el-button>
                    <el-button v-else type="danger" size="mini" @click.native="open_single2(d.id,d.priceSend,d.text,1)">不送</el-button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="sub-data">
          <el-button type="primary" @click.native.prevent="submitAll">保存</el-button>
        </div>
    </div>
  </div>
</template>
<style lang="sass">
  ._container {
    .sub-data {
      text-align: left;
      margin-top: 20px;
      margin-left: 455px;
    }
    .city-name {
      display: flex;
      justify-content:flex-start;
    }
    .box {
      width: 18px;
      height: 18px;
      border: 1px solid #000;
      color: #0B61A4;
      opacity: 0.8;
      cursor: pointer;
    }
    .province-all {
      width: 50%; 
    }
    .set-price {
      margin-top: 20px;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      background: #C0CCDA;
      border: 1px solid #C0CCDA;
      padding: 5px 23px;
      border-radius: 5px;
    }
    .input-width {
      width: 35%;
    }
    .set-con{
      width: 515px;
      margin: 0 3% 0 0;
    }
    .city-select {
      width: 100%;
      margin:10px 0 20px 0;
    }
    .set-input {
      input {float: left}
    }
    .need-change {
      display: flex;
      justify-content: space-between;
      background: #F9FAFC;
      border: 1px solid #F9FAFC;
      padding: 5px 25px;
      border-radius: 5px;
    }
    .change-set {
      display: flex;
      justify-content:flex-start;
    }
    .all-city {
      width: 100%;
      li {
        width: 100%;
        font-family: 'Microsoft YaHei','PingFang SC',"Hiragino Sans GB";
        font-size: 15px;
        margin: 7px 0;  
        display: flex;
        justify-content: space-between;
      }
    }
  .edit-de {
    padding-top: 5px;
  }
  }
  
</style>
<script>
  import _ from "lodash"
  import { _saveOrUpdateExpressSetting,_findExpressSetting,_deleteExpressSetting} from 'src/vuex/api/shopExpressSetting'
  export default {
    props: {
        curProvince: {
            type: String,
            default: ''
        },
        curCity: {
            type: String,
            default: ''
        },
        expressType: {
            type: Number,
            default: 0
        }
    }, 
    data() {
      return {
        cityData: [],
        strProvince: {pid: "", pname: ''},//当前选择的省份
        strCity: {},//当前选中的市
        districts: [],//区列表
        pcd: [],//区域价格变动集合
        pcs: [],
        pds: [],
        express: {},//当前快递设置
        expressWrap: {//提交数据
          shopId: 1,
          expresses: []
        },
        
        areaExpressPrice: [],//区域集合
        flag1:0,//城市价格不能为负
        flag2:0,//区域价格不能为负
        flag3:0,//字不超过15个
        isCFirst: 0,
        isPFirst: 0,
        cityPrice: '',
        citySelect: [],
        districtPrice: '',
        districtSelect: [],
        cityChecked: true,
        districtChecked: false,
        pid: '110000',
        cid: '110100',
        did: '110101',
        inputTurn: '',
        turnBtn: false,
//        checkedCount: '',
//        checkedCount2: '',
//        allCheckedDistrict: false,
//        allCheckedCity: false,
        allPriceCity: '',
        allPriceDistrict: '',
        ifChooseDistrict: true,
        ifChooseCity: true,
        comPrice: [],
        param: [],
//        patchPriceDistrict: '',
        showF: false,
        partcs:[],
        partds:[],
        comments:'',
      
      }
    },
    computed: {
      cs() {
        return (_.find(this.cityData, {id: this.pid}) || {}).children || {}
      },
      ds() {
        return (_.find(this.cs, {id: this.cid}) || {}).children || [{'id': 0, 'text': '无数据'}]
      },
      //设置全部城市价格
      allCheckedCity: {
        get: function () {
          return this.checkedCount2 == this.cs.length;
        },
        set: function (value) {
          if (value) {
            this.citySelect = this.cs.map(function (c) {
              return c.id
            })
          } else {
            this.citySelect = []
          }
        }
      },
      checkedCount2: {
        get: function () {
          return this.citySelect.length;
        }
      },
      patchPriceDistrict: {
        set: function (val) {
          this.districtSelect.forEach(function (value) {
            _.find(this.ds, {'id': value}).priceSend = val
            let arVal = _.find(this.ds, {'id': value}.priceSend);
            this.$set(arVal, val);
          }.bind(this));
        },
      },
      patchPriceCity: {
        set: function (val) {
          this.citySelect.forEach(function (value) {
            _.find(this.cs, {'id': value}).cityPrice = val
            let arrVal = _.find(this.cs, {'id': value}.cityPrice);
            this.$set(arrVal, val, val);
          }.bind(this));
        },
      },
      //设置全部地区价格
      allCheckedDistrict: {
        get: function () {
          return this.checkedCount == this.ds.length;
        },
        set: function (value) {
          if (value) {
            this.districtSelect = this.ds.map(function (d) {
              return d.id
            })
          } else {
            this.districtSelect = []
          }
        }
      },
      checkedCount: {
        get: function () {
          return this.districtSelect.length;
        }
      },
    },
    methods: {
      pchange(valId) {
        this.cid = this.cs[0]['id'];
        this.did = this.ds[0]['id'];
        //组装expressWrap
        this.strProvince.pid = valId;
        this.strProvince.pname = _.find(this.cityData, {id: valId}).text;
        
        this.strCity.cid = this.cid;
        this.strCity.cname = this.cs[0]['text'];
        let expressFind = {'strProvince': this.strProvince.pname, 'expressType': 0};
        _findExpressSetting(expressFind).then(({success, result, msg}) => {
          if (success) {
            //console.log(JSON.stringify(this.cs))
            if (result.length > 0) {
              for (let i in result) {
                let lcity = result[i].strCity;
                let lcid = result[i].city;
                let lprice = result[i].expressPrice;
                let commentsInfo = result[i].comments;
                let lexpressId = result[i].expressId;
                let statusCode = result[i].statusCode;
                let deleteFlag= result[i].deleteFlag;
                
                if (lcid) {
                  this.$set(_.find(this.cs, {id: lcid}), 'statusCode', statusCode);
                  this.$set(_.find(this.cs, {id: lcid}), 'cityPrice', lprice);
                  this.$set(_.find(this.cs, {id: lcid}), 'comments', commentsInfo);
                  this.$set(_.find(this.cs, {id: lcid}), 'expressId', lexpressId);
                  this.$set(_.find(this.cs, {id: lcid}), 'deleteFlag', deleteFlag);
                }
              }
            }
           
          }
        });
      
      },
      cchange(valId) {
       
        this.did = this.ds[0]['id'];
        //区域价格组装
        this.strCity.cid = this.cid;//选中城市
        this.strCity.cname = _.find(this.cs, {id: this.cid}).text;
        let expressFind = {'strProvince': this.strProvince.pname, 'strCity': this.strCity.cname, 'expressType': 1};
        //请求后台数据
        _findExpressSetting(expressFind).then(({success, result, msg}) => {
          if (success) {
            if (result.length > 0 && result[0]['areaExpressPrice']) {
              let lexpressId = result[0].expressId;
              let ex = result[0]['areaExpressPrice'];
              this.strCity.expressId = lexpressId;
              for (let i in ex) {
                let areaId = ex[i].areaId;
                let text = ex[i].text;
                let price = ex[i].price;
                let commentsInfo = ex[i].comments;
                let statusCode=ex[i].statusCode?ex[i].statusCode:0;
                if (areaId) {
                  this.$set(_.find(this.ds, {'text': text}), 'priceSend', price);
                  this.$set(_.find(this.ds, {'text': text}), 'comments', commentsInfo);
                  this.$set(_.find(this.ds, {'text': text}), 'statusCode', statusCode);
                }
              }
            }
          }
        });
        
      },
      dchange(val) {
        
      },
      changedata(did){
        let group = _.groupBy(this.ds,function(n) {
          return n.priceSend;
        });
      },
      allChooseCity(){
      },
      allChoose(){
        let input_select = this.ds;
        if(this.allCheckedDistrict){
          this.ifChoose = false
        }
      },
      open_all(name){
          this.$confirm('此操作将禁用已选择的' + name +
            '价格, 是否继续?', '提示'
            , {
              type: 'warning'
          }).then(() => {
            this.districtSelect.forEach(function (value) {
              _.find(this.ds,{
                'id':value}).statusCode = 1;
            }.bind(this));
            this.$message({type: 'success', message: '删除成功!' });
        }).catch(() => {
            this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },
     open_single(cId,cPrice,name,a){
       if(a==1){
         _.find(this.cs,{'text':name}).cityPrice=undefined;
         _.find(this.cs,{'text':name}).deleteFlag=1;
         let arrValue = _.find(this.cs,{'id':cId});
         this.$set(arrValue,cPrice,undefined);
         this.$set( _.find(this.cs,{'text':name}),'deleteFlag',1);
       }else {
         _.find(this.cs,{'text':name}).cityPrice=0;
         _.find(this.cs,{'id':cId}).deleteFlag=0;
         let arrValue = _.find(this.cs,{'id':cId});
         this.$set(arrValue,cPrice,0);
         this.$set(arrValue,'deleteFlag',0);
       }
      },
      open_single2(dId,dPrice,name,a){
        if(a==1){
          _.find(this.ds,{'text':name}).priceSend=undefined;
          let arrValue = _.find(this.ds,{'id':dId});
          
          this.$set(arrValue,dPrice,undefined)
        }else {
          _.find(this.ds,{'text':name}).priceSend=0;
          let arrValue = _.find(this.ds,{'id':dId});
          this.$set(arrValue,dPrice,0);
        }
      },
      pselect(){//是否第一次操作
        if(this.cityChecked){
          this.districtChecked=false
        }else {
          this.districtChecked=true
        }
        if(this.isPFirst==1) return;
            this.isPFirst=1;     
            this.pchange(this.pid);
      },
      cselect(){
        if(this.districtChecked){
          this.cityChecked=false
        }else {
          this.cityChecked=true
        }
        if(this.isCFirst==1) return;
        this.isCFirst=1;
        if(this.strProvince.pname=="") {
          this.strProvince.pid=this.pid;
          this. strProvince.pname=_.find(this.cityData,{"id":this.pid}).text;
        }
        this.cchange(this.cid);
      },
      submitAll(){
          this.flag1=0;
          this.flag2=0;
          this.flag3=0;
          let abc=this.cs;
        //城市设置
        this.partcs = _.filter(abc, function(n) {
          return (n.cityPrice != undefined || null)||(n.deleteFlag==1);
        });
        for(let i in this.partcs){
          let eid=this.partcs[i].expressId;
          let city=this.partcs[i].id;
          let expressPrice=this.partcs[i].cityPrice;
          let commentsInfo=this.partcs[i].comments;
          let deleteFlag=this.partcs[i].deleteFlag;
          if(expressPrice<0){
            this.flag1=1;
          }
          if(commentsInfo != null){
            if(commentsInfo.length>15)
              this.flag3=1;
          }
          let cname = this.partcs[i].text;
          let statusCode=this.partcs[i].statusCode;
          let obj={
            'strProvince': this.strProvince.pname,
            'province':this.strProvince.pid,
            'city':city,
            'statusCode': statusCode,
            'expressType':0,'expressPrice': expressPrice,'expressId': eid,'strCity':cname,'comments':commentsInfo};
            if(deleteFlag==1){
              obj.deleteFlag=1;
            }
          this.pcs.push(obj);
        }
        //区域设置
        this.partds = _.filter(this.ds, function(n) {
          return n.priceSend != undefined || null;
        });
        for(let i in this.partds){
          let areaId=this.partds[i].id;
          let text=this.partds[i].text;
          let dprice=this.partds[i].priceSend;
          let commentsInfo=this.partds[i].comments;
          let statusCode=this.partds[i].statusCode;
          if(dprice<0){
              this.flag2=1;
          }
          if(commentsInfo != null){
            if(commentsInfo.length>15)
            this.flag3=1;
          }
          let areaEx={};
          areaEx.areaId = areaId;
          areaEx.text=text;
          areaEx.price=dprice;
          areaEx.comments=commentsInfo;
          areaEx.statusCode=statusCode;
          this.areaExpressPrice.push(areaEx);
        }
        this.pds.push({
           'strProvince': this.strProvince.pname,'province': this.strProvince.pid,
           'city':this.strCity.cid,
           'expressType':1, 'expressPrice':'',
           'expressId':this.strCity.expressId,'strCity': this.strCity.cname, 'areaExpressPrice':this.areaExpressPrice
        });
        if(this.cityChecked){
           this.expressWrap={'shopId':1,expresses:this.pcs};
          this.pds = []; 
        }else {
          this.expressWrap={'shopId':1,expresses:this.pds};
          this.pcs = [];
        }
         if(this.flag1==1){
           this.$message.error('城市运费的价格不能有负值！');
           this.pcd=[]
           return false;
         }
         if(this.flag2==1){
           this.$message.error('地区运费的价格不能有负值！');
           this.pcd=[];
           return false;
         }
          if(this.flag3==1){
            this.$message.error('配送说明数字不能超过15个！');
            this.pcd=[];
            return false;
          }
          _saveOrUpdateExpressSetting($.toJSON(this.expressWrap)).then(({success, result, msg})=>{
            if(success){
              this.pcd=[];
              this.$message({
                message: '恭喜你，保存成功！',
                type: 'success'
              });
            }
          }
         );
      },
    },
    created() {
      // 代码分割
      require.ensure([], () => {
        this.cityData = require('../../../../assets/cityforaddress.json')
      });
      
      this.pchange(this.pid);
      this.cchange(this.cid);

      // 初始化
      if(this.curProvince) {
        this.pid = this.curProvince;
        this.cid = this.curCity;

        this.strProvince.pid = this.curProvince;
        this.strProvince.pname = _.find(this.cityData, {id: this.curProvince}).text;
        this.strCity.cid = this.curCity;
        this.strCity.cname = this.cs[0]['text'];

        this.cityChecked = this.expressType == 0;
        this.districtChecked = this.expressType == 1;
        if(this.expressType == 1)
          this.cchange(this.cid);
        else
          this.pchange(this.pid);
      }
    },
    mounted(){
    },
}
</script>

