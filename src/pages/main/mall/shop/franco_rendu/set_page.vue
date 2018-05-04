<template>
    <div class="_container">
        <card-panel>
            <h3 slot="title">首页配置</h3>
            <div slot="panel-btns">
                <button class="btn btn-default btn-sm" @click="onBackPage">返回</button>
            </div>
            <div slot="panel-body">
                <div class="_setting-bar">
                    <div class="_query-form">
                        <div class="_query-form-item">
                            <el-form :inline="true">
                                <el-form-item label="自提点名称:" style="width:320px;">
                                    <span>{{paramObj.selfSiteName}}</span>
                                </el-form-item>
                                <!-- <el-form-item label="详细地址:" style="width:500px;">
                                    <span>{{paramObj.strProvince}} {{paramObj.strCity}} {{paramObj.strArea}} {{paramObj.selfAddress}}</span>
                                </el-form-item> -->
                                <el-form-item label="商品展示样式:" style="width:200px;">
                                    <span>{{paramObj.goodsShowType==0?'列表':paramObj.goodsShowType==1?'二列':'三列'}}</span>
                                </el-form-item>
                            </el-form>
                        </div>
                    </div>
                    <div class="_actions-btn">
                        <el-button type="primary" @click.native.prevent="onSave">保存</el-button>
                        <el-button type="success" @click.native.prevent="onReloadRedis">更新缓存</el-button>
                    </div>
                </div>
                <el-row>
                    <el-col :span="11">
                        <div>
                            <div class="page-header" style="margin:0;margin-top: 10px;">
                                <h1 style="font-weight: bold;">Header首页配置</h1>
                            </div>
                            <br>
                            <page-conf ref="headerPageComm" :pageJson="paramObj.selfTopJson"></page-conf>
                        </div>
                    </el-col>
                    <el-col :span="2">&nbsp;</el-col>
                    <el-col :span="11">
                        <div>
                            <div class="page-header" style="margin:0;margin-top: 10px;">
                                <h1 style="font-weight: bold;">Footer首页配置</h1>
                            </div>
                            <br>
                            <page-conf ref="footerPageComm" :pageJson="paramObj.selfButtonJson"></page-conf>
                        </div>
                    </el-col>
                </el-row>
            </div>
        </card-panel>
    </div>
</template>
<script>
import PageConf from './components/page'
import {
    querySelfPurchaseGoodsList,saveSelfPurchaseJson,getMallSelfPurchasePageJson,reloadSelfPurchasePageRedis
} from 'actions/francoRenduAction'
export default {
    components: {
      PageConf
    },
    props: {
        paramObj: {
            type: Object,
            default: {
              selfTopJson:'',
              selfButtonJson:''
            }
        }
    },
    computed: {
        cloudShowUrl() {
            return this.$store.getters.cloudShowUrl
        }
    },
    data() {
        return {
            tableData: [],
        }
    },
    methods: {
        onReloadRedis(){
          reloadSelfPurchasePageRedis(this.paramObj).then(data=>{
            const { success, msg, result } = data
            if (success) {
                this.$message.success('操作成功')
            } else {
                this.$message.error(msg)
                return false
            }
          })
        },
        onSave() {
          //console.log('headerPage',JSON.stringify(this.$refs.headerPageComm.appModel))
          //console.log('footerPage',JSON.stringify(this.$refs.footerPageComm.appModel))
          let params={
            selfPurchaseId:this.paramObj.selfPurchaseId,
            selfTopJson:JSON.stringify(this.$refs.headerPageComm.appModel),
            selfButtonJson:JSON.stringify(this.$refs.footerPageComm.appModel)
          }
          this.$confirm("确认提交吗？","确认提示",{
            type:'warning'
            }).then(()=>{
              saveSelfPurchaseJson(params).then(data=>{
                const { success, msg, result } = data
                if (success) {
                    this.$message.success('操作成功')
                } else {
                    this.$message.error(msg)
                    return false
                }
              })
            }).catch(()=>{})
        },
        onBackPage() {
            this.$emit('forward', 'RenduList')
        },
        initTable() {
            getMallSelfPurchasePageJson(this.paramObj).then(data => {
              //console.log('data111',data)
              if(data.selfTopJson.length>0){
                this.paramObj.selfTopJson=data.selfTopJson
                this.$refs.headerPageComm.loadData(data.selfTopJson)
                // this.paramObj.selfTopJson=data.selfTopJson
                // this.$nextTick(()=>{
                //   this.$refs.headerPageComm.loadData()
                // })
              }
              if(data.selfButtonJson.length>0){
                this.paramObj.selfButtonJson=data.selfButtonJson
                this.$refs.footerPageComm.loadData(data.selfButtonJson)
                // this.$nextTick(()=>{
                //   this.paramObj.selfButtonJson=data.selfButtonJson
                //   this.$refs.footerPageComm.loadData()
                // }) 
              }
            })
        }
    },
    created() {
        this.initTable()
    }
}
</script>
<style>
</style>
