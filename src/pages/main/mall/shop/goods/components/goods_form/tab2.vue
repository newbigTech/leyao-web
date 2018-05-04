<!-- 商品价格选项卡-->
<template>
    <div class="container-fluid">
        <div class="page-header" style="margin:0;">
            <h1 style="font-weight: bold;">商品价格</h1>
        </div>
      <el-form :model="goodsObj" :rules="rules" ref="goodsObj" label-width="90px" style="width: 720px;padding-top: 15px;">
        <el-form-item label="限购数量">
          <el-input-number v-model="goodsObj.limitNumber" :min="0" :max="99999" :maxlength="5" placeholder="限购数量"></el-input-number>
        </el-form-item>
        <el-form-item label="销售单位" prop="unit">
          <el-input v-model="goodsObj.unit" :maxlength="6"  placeholder="销售单位" style="width:180px;"></el-input>
        </el-form-item>
        <el-form-item label="市场价" prop="mprice" v-if="goodsObj.goodsType===0">
          <el-input v-model.number="goodsObj.mprice" :maxlength="10" type="number" style="width:180px;" placeholder="市场价" min="0.00" step="0.01"></el-input>
        </el-form-item>
        <el-form-item label="销售价" prop="price" v-if="goodsObj.goodsType===0">
          <el-input v-model.number="goodsObj.price" :maxlength="10" type="number" style="width:180px;" placeholder="销售价" min="0.00" step="0.01"></el-input>
        </el-form-item>
        <el-form-item v-if="!paramObj.view">
         <el-button type="primary" @click.native.prevent="nextFlag=true;handleSaveAndNext()">保存商品并继续编辑</el-button>
         <el-button type="primary" @click.native.prevent="nextFlag=false;handleSaveAndNext()">保存</el-button>
         <el-button type="primary" @click.native.prevent="onSaveAndUp()">保存并上架</el-button>
         <el-button type="default" @click.native.prevent="$emit('forward','','GoodsList')">返回到列表</el-button> 
        </el-form-item>
      </el-form> 
    </div>
</template>

<script>
import RegExp from 'lib/utils/regexp'
import {
  saveGoodsFormTab2,saveGoodState
} from 'actions/goodsAction'
export default {
  name: 'goods_from_tab2',
  props:{
    vm:{
      type:Object
    },
    paramObj:{
      type:Object,
      default:{}
    }
  },
  data() {
    return {
      nextFlag:true,
      goodsObj: {
        goodsId: undefined,
        limitNumber: 0, //0表示无限制
        unit: '',
        mprice: 0.00,
        price: 0.00,
        goodsType:0
      },
      rules: {
        unit: [{
          required: true,
          message: '请输入销售单位',
          trigger: 'blur'
        }],
        mprice: [{
          type:'number',
          required: true,
          trigger: 'blur',
          message: '格式错误，请输入大于0且小数位不超过两位的数字 '
        },{
          pattern: RegExp.amount,
          trigger: 'blur',
          message: '格式错误， 格式：0.00'
        }],
        price: [{
          type:'number',
          required: true,
          message: '格式错误，请输入大于0且小数位不超过两位的数字',
          trigger: 'blur'
        },{
          pattern: RegExp.amount,
          trigger: 'blur',
          message: '格式错误， 格式：0.00'
        }]
      }
    }
  },
  methods: {
    onSaveAndUp(){
      this.$refs.goodsObj.validate((valid) => {
        if (valid) {
          if(this.paramObj.goodsObj.goodsId){
            this.goodsObj.goodsId=this.paramObj.goodsObj.goodsId
            this.goodsObj.MPrice=this.goodsObj.mprice
            saveGoodsFormTab2(this.goodsObj).then(data=>{
              const {success,msg,result}=data
              if(success){
                 let params = {
                   statusCode: 1,
                   goodsId: this.goodsObj.goodsId
                 }
                 saveGoodState(params).then(data => {
                    const {
                        success,
                        msg,
                        result
                    } = data
                    if (success) {
                        this.$message({
                            type: 'success',
                            message: '操作成功!'
                        });
                        this.$emit('forward','','GoodsList')
                    } else {
                        if (result) {
                            let gstr = _.map(result, 'goodsName').join(',')
                            this.$alert(`已绑定未上架商品有：${gstr}`, msg, {
                                confirmButtonText: '确定',
                                callback: action => {}
                            });

                        } else {
                            this.$message.error(msg);
                        }
                    }
                })
              }else{
                this.$message.error(msg)
                return false
              }
            })
          }else{
            this.$message.info("请先保存商品基本信息")
            this.$emit('forward','tab1')
          }
        }
      })
    },
    handleSaveAndNext() {
      this.$refs.goodsObj.validate((valid) => {
        if (valid) {
          if(this.paramObj.goodsObj.goodsId){
            this.goodsObj.goodsId=this.paramObj.goodsObj.goodsId
            this.goodsObj.MPrice=this.goodsObj.mprice
            saveGoodsFormTab2(this.goodsObj).then(data=>{
              const {success,msg,result}=data
              if(success){
                this.$message.success('操作成功')
                if(this.nextFlag)
                this.$emit('forward','tab8')
              }else{
                this.$message.error(msg)
                return false
              }
            })
          }else{
            this.$message.info("请先保存商品基本信息")
            this.$emit('forward','tab1')
          }
        }
      })
    }
  },
  created(){
    if (this.paramObj.goodsObj.goodsId) {
      Object.assign(this.goodsObj, _.pick(this.paramObj.goodsObj,['goodsType','limitNumber','unit','mprice','price']))
      //Object.assign(this.goodsObj, this.paramObj.goodsObj)
      //this.goodsObj=_.pick(this.paramObj.goodsObj,_.keys(this.goodsObj))
    }
    this.$store.getters.ev.$on('onchangeGoodsType',(v)=>{
       //v:商品类型 0 SPU商品 1 SKU商品 2 组合商品
      this.$set(this.goodsObj,'goodsType',_.toNumber(v))
      //console.log('this.goodsObj',this.goodsObj.goodsType)
      //this.goodsObj.goodsType=v
    })
  }
}
</script>

<style lang="css">
</style>
