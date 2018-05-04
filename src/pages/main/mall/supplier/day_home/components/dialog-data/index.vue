<template lang="html">
    <div class="container-fluid">
        <el-dialog v-model="dayHomeDataVisible" @open="onDailogOpen" id="_appHomeConfigDialog">
            <div style="width:200px;position: absolute;right: 40px;z-index: 100;" v-show="shopData.length>0">
                <el-select v-model.number="queryParams.shopId" filterable clearable placeholder="请选择店铺" @change="onChangeShop">
                    <el-option v-for="(item, index) in shopData" :label="item.shopName" :value="item.shopId"></el-option>
                </el-select>
            </div>
            <el-tabs :active-name="activeName" style="width:100%;" @tab-click="handleClick">
                <el-tab-pane label="已上架商品" name="first" :disabled="!firstDisable">
                    <goods-data ref="goodsDataComm" @onSuccess="onSuccess" :queryParams="queryParams" :ev="ev"></goods-data>
                </el-tab-pane>
                <el-tab-pane label="商品分组" name="second" :disabled="!secondDisable">
                    <goods-classify ref="goodsClassifyComm" @onSuccess="onSuccess" :queryParams="queryParams" :ev="ev"></goods-classify>
                </el-tab-pane>
                <el-tab-pane label="商品专题" name="third" :disabled="!thirdDisable">
                    <goods-subject ref="goodSubjectComm" @onSuccess="onSuccess" :queryParams="queryParams" :ev="ev"></goods-subject>
                </el-tab-pane>
                <el-tab-pane label="商品活动" name="fourth" :disabled="!fourthDisable">
                    <goods-activity ref="goodsActivityComm" @onSuccess="onSuccess" :queryParams="queryParams" :ev="ev"></goods-activity>
                </el-tab-pane>
                <el-tab-pane label="自提点" name="sixth" :disabled="!sixthDisable">
                    <franco-rendu ref="francoRenduComm" @onSuccess="onSuccess" :queryParams="queryParams" :ev="ev"></franco-rendu>
                </el-tab-pane>
                <el-tab-pane label="营销广告" name="seventh" :disabled="!seventhDisable">
                    <ad-salepage ref="adSalePageComm" @onSuccess="onSuccess" :queryParams="queryParams" :ev="ev"></ad-salepage>
                </el-tab-pane>
                <el-tab-pane label="其它" name="fifth" :disabled="!fifthDisable">
                    <el-row :gutter="20">
                      <el-col :span="6"> <el-button @click.native="onAdd(4,'充值有礼')" style="display: block; width: 100%; color: #20A0FF; margin-left: 10px; flex: 1;"> <i class="el-icon-plus"></i> 充值有礼</el-button></el-col>
                      <el-col :span="6"><el-button @click.native="onAdd(5,'网销卡')" style="display: block; width: 100%; color: #20A0FF; margin-left: 10px; flex: 1;"> <i class="el-icon-plus"></i> 网销卡</el-button></el-col>
                      <el-col :span="6">
                          <el-button @click.native="onAdd(6,'优惠券')" style="display: block; width: 100%; color: #20A0FF; margin-left: 10px; flex: 1;"><i class="el-icon-plus"></i> 优惠券 </el-button>
                      </el-col>
                      <el-col :span="6" style="padding-right: 25px;"><el-button @click.native="onAdd(7,'拼团商品')" style="display: block; width: 100%; color: #20A0FF; margin-left: 10px; flex: 1;"><i class="el-icon-plus"></i> 拼团商品 </el-button></el-col>
                    </el-row>
                    <br>
                    <el-row :gutter="20">
                      <el-col :span="6"> <el-button @click.native="onAddWebUrl(8,'自定义链接')" style="display: block; width: 100%; color: #20A0FF; margin-left: 10px; flex: 1;"> <i class="el-icon-plus"></i> 自定义链接</el-button></el-col>

                      <el-col :span="6"> <el-button @click.native="onAdd(10,'自提购')" style="display: block; width: 100%; color: #20A0FF; margin-left: 10px; flex: 1;"> <i class="el-icon-plus"></i> 自提购</el-button></el-col>
                      <!-- <el-col :span="6"> <el-button @click.native="onAdd(9,'全城摇')" style="display: block; width: 100%; color: #20A0FF; margin-left: 10px; flex: 1;"> <i class="el-icon-plus"></i> 全城摇</el-button></el-col> -->
                    </el-row>
                </el-tab-pane>
            </el-tabs>
            <!--  <div slot="footer" class="dialog-footer">
                <el-button @click="dayHomeDataVisible = false">取 消</el-button>
                <el-button type="primary" @click.stop.prevent="onSuccess">确 定</el-button>
            </div> -->
        </el-dialog>
    </div>
</template>
<script>
import GoodsData from './goods-data'
import GoodsClassify from './goods-classify'
import GoodsActivity from './goods-activity'
import GoodsSubject from './goods-subject'
import FrancoRendu from './franco-rendu'
import AdSalepage from './ad-salepage'
import { getSupplierShopPageList } from 'actions/shopAction'
export default {
    name: 'supplier_day_home_data',
    components: {
        GoodsData,GoodsClassify,GoodsActivity,GoodsSubject,FrancoRendu,AdSalepage
    },
    computed: {
        shopData() {
            return this.$store.getters.shopData
        }
    },
    data() {
        return {
            dayHomeDataVisible: false,
            activeName: 'first',
            firstDisable:false,
            secondDisable:false,
            thirdDisable:false,
            fourthDisable:false,
            fifthDisable:false,
            sixthDisable:false,//自提购
            seventhDisable:false,//广告营销
            selectedType:0,//数据来源类型 0:商品 1:商品分组 2:专题 3:活动 4:其它 5:
            queryParams:{
                shopId:'',
            },
            ev:new this.$root.constructor()
        }
    },
    methods: {
        onAdd(type,name){
            this.dayHomeDataVisible=false
            this.selectedType=4
            let data={
                'type':type,
                'id':0,
                'name':name,
                'title':name,
                'img':''
            }
            this.$emit('onSuccess',data)
        },
        onAddWebUrl(type,name){
          this.$prompt('请输入URL', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputValidator(value) {
                    if (value == null || value == undefined || value.length === 0) {
                        return 'URL不允许为空'
                    }
                }
            }).then(({
                value
            }) => {
                this.onAdd(type,value)

            }).catch(() => {

            });
        },
        onSuccess(data) {
          this.dayHomeDataVisible=false
          if(this.activeName==='first'){
               this.selectedType=0
            }else if(this.activeName==='second'){
               this.selectedType=1
            }else if(this.activeName==='third'){
               this.selectedType=2
            }else if(this.activeName==='fourth'){
               this.selectedType=3
            }else if(this.activeName==='sixth'){
               this.selectedType=10
            }else if(this.activeName==='seventh'){
               this.selectedType=11
            }
          data.type=this.selectedType
          this.$emit('onSuccess',data)
        },
        handleClick(tab) {
          this.activeName=tab.name
          this.onChangeShop(this.queryParams.shopId)
        },
        onChangeShop(v){
            if(this.activeName==='first'){
               this.selectedType=0
               this.$refs.goodsDataComm.loadData()
            }else if(this.activeName==='second'){
               this.selectedType=1
               this.$refs.goodsClassifyComm.loadData()
            }else if(this.activeName==='third'){
               this.selectedType=2
               this.$refs.goodSubjectComm.loadData()
            }else if(this.activeName==='fourth'){
               this.selectedType=3
               this.$refs.goodsActivityComm.loadData()
            }else if(this.activeName==='sixth'){
               this.selectedType=10
               this.$refs.francoRenduComm.loadData()
            }else if(this.activeName==='seventh'){
              this.selectedType=11
              this.$refs.adSalePageComm.loadData()
            }
        },
        onDailogOpen(){
            if(this.shopData.length>0){
                this.queryParams.shopId=this.shopData[0].shopId
            }
            if(this.activeName==='first'){
               this.selectedType=0
               setTimeout(()=>{
                this.$refs.goodsDataComm.loadData()
                },0)
            }else if(this.activeName==='second'){
               this.selectedType=1
               setTimeout(()=>{
                this.$refs.goodsClassifyComm.loadData()
                },0)

            }else if(this.activeName==='third'){
               this.selectedType=2
               setTimeout(()=>{
                this.$refs.goodSubjectComm.loadData()
                },0)

            }else if(this.activeName==='fourth'){
               this.selectedType=3
               setTimeout(()=>{
                this.$refs.goodsActivityComm.loadData()
                },0)

            }else if(this.activeName==='sixth'){
               this.selectedType=10
               setTimeout(()=>{
                this.$refs.francoRenduComm.loadData()
                },0)

            }else if(this.activeName==='seventh'){
               this.selectedType=11
               setTimeout(()=>{
                this.$refs.adSalePageComm.loadData()
                },0)

            }
        },
        show(obj) {
            this.dayHomeDataVisible = true
            if(obj){
                this.firstDisable=obj.first
                this.secondDisable=obj.second
                this.thirdDisable=obj.third
                this.fourthDisable=obj.fourth
                this.fifthDisable=false
                this.sixthDisable=false
                this.seventhDisable=false
                if(obj.defaultTabName){
                    this.activeName=obj.defaultTabName
                }
            }else{
                this.firstDisable=true
                this.secondDisable=true
                this.thirdDisable=true
                this.fourthDisable=true
                this.fifthDisable=true
                this.sixthDisable=true
                this.seventhDisable=true
                this.activeName='first'
            }
        }
    },
    created() {
    },
    mounted(){
    }
}
</script>
<style lang="sass">
</style>
