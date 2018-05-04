<template>
    <div class="_container">
        <card-panel class="">
          <h3 slot="title">{{globleTitle}}</h3>
          <div slot="panel-btns">
            <el-button size="small" type="success" @click.native.prevent="$emit('reback','backAddressList',model)">返回</el-button>
          </div>
          <div slot="panel-body">
            <el-form ref="backAddressForm" :model="backAddressModel" :rules="rules" label-width="100px" style="width: 800px;">
              <div class="text item">
                    <el-form-item label="收件人" prop="receiverUserName" style="width:50%">
                        <el-input v-model="backAddressModel.receiverUserName"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话" prop="mobilePhone" style="width:50%">
                        <el-input v-model="backAddressModel.mobilePhone"></el-input>
                    </el-form-item>
                    <el-form-item label="所在地区" style="width:70%" prop="cityArea" required>
                       <el-row :gutter="12" type="flex" justify="start">
                        <el-col :span="8">
                          <el-select v-model="pid" :span="6" @change="pchange">
                            <el-option v-for="p in cityData" :label="p ? p.text : ''" :value="p && p.id" :key="p && p.id"></el-option>
                          </el-select>
                        </el-col>
                        <el-col :span="8">
                          <el-select v-model="cid" :span="6" @change="cchange">
                            <el-option v-for="c in cs" :label="c ? c.text : ''" :value="c && c.id" :key="c && c.id"></el-option>
                          </el-select>
                        </el-col>
                        <el-col :span="8">
                          <el-select v-model="did" :span="6" @change="dchange">
                            <el-option v-for="d in ds" :label="d ? d.text : ''" :value="d && d.id" :key="d && d.id"></el-option>
                          </el-select>
                        </el-col>
                      </el-row>
                    </el-form-item>
                    <el-form-item label="详细地址" prop="strAddress" style="width:70%">
                        <el-input v-model="backAddressModel.strAddress"></el-input>
                    </el-form-item>
                    <el-form-item label="退货仓说明" prop="backAddressNote">
                      <el-input type="textarea" v-model="backAddressModel.backAddressNote"></el-input>
                    </el-form-item>
                    <el-form-item label="是否默认" prop="isDefault">
                      <el-radio-group v-model="backAddressModel.isDefault" :disabled="true">
                        <el-radio :label="0">否</el-radio>
                        <el-radio :label="1">是</el-radio>
                      </el-radio-group>
                    </el-form-item>
                    <el-form-item>
                        <el-button
                          @click.native.prevent="handleSubmit" type="warning">提交</el-button>
                        <el-button
                          @click.native.prevent="$emit('reback','backAddressList',model)" type="primary">返回</el-button>
                    </el-form-item>

              </div>
            </el-form>
          </div>
        </card-panel>
    </div>
</template>


<script>
  import RegExr from "lib/utils/regexp"
  import { dateFormat as _dateFormat } from "lib/utils/dateFormat"
  import { _getBackAddressPage,_addOrUpdateBackAddress } from 'src/vuex/actions/backAction'
  import moment from "moment"

  export default {
    name:'add-back-address',
    components: {

    },
    props: {
      model: Object, default: () => {},
    },
    computed: {
      cs() {
        return (_.find(this.cityData, {id: this.pid}) || {}).children || [{}]
      },
      ds() {
        return (_.find(this.cs, {id: this.cid}) || {}).children || [{'id': 0, 'text': '无数据'}]
      },
    },
    data() {
      return {
        cityData: [],
        globleTitle:"",//名称
        isEditFlag:false,//是否可编辑 默认可以编辑
        pid: '',
        cid: '',
        did: '',
        backAddressModel:{
          receiverUserName:'',
          mobilePhone:'',
          strAddress:'',
          isDefault:0,

          province:'', // 省
          city:'', // 市
          area:'', // 区
        },
        rules: {
          receiverUserName: [
            { required: true, message: '请输入收件人', trigger: 'blur' },
            { type: 'string', min: 0, max: 50, message: '[收件人]长度不能超过50' }
          ],
          mobilePhone: [
            { type: 'string', required: true, pattern: RegExr.mobile, trigger: 'blur', message: '请输入正确的手机号码'}
          ],
          strAddress: [
            { type: 'string',required: true, message: '请输入详细地址', trigger: 'blur' },
          ],
          backAddressNote: [
            { type: 'string',required: true, message: '请输入退货仓说明', trigger: 'blur' },
          ],
          cityArea: [{
            validator: (rule, value, callback, source, options) => {
              if (!this.pid) return callback(new Error("请选择所在地区"))
              callback()
            }
          }]
        },

      }
    },
    created(){
      this.loadSelectData() ;
      // 异步加载地区选择列表
      require.ensure([], ()=> {
        this.cityData = require('assets/cityforaddress.json')
        //console.log(this.cityData)
      });
    },
    methods: {
      loadSelectData() {
        if(this.model.backAddressId){
          this.backAddressModel = this.model ;
          this.pid = this.backAddressModel.province ;
          this.cid = this.backAddressModel.city ;
          this.did = this.backAddressModel.area ;
          this.globleTitle = "修改收件地址"
        }else{
          this.globleTitle = "新增收件地址"
          this.fetchIsDefaultCount() ;
        }
      },
      fetchIsDefaultCount(){
        let params = {
          pageNo:1,
          pageSize:10,
          isDefault:1,
        }
        _getBackAddressPage(params).then(data => {
          const { success, result, msg } = data
          //console.log(JSON.stringify(data))
          if (success) {
            if(result.total > 0){
                this.backAddressModel.isDefault = 0
            }else{
                this.backAddressModel.isDefault = 1
            }
          }
        })
      },
      handleSubmit(){
        this.$refs.backAddressForm.validate((valid) => {
            if (valid) {
              //给地区赋值
              this.backAddressModel.province = this.pid ;
              this.backAddressModel.city = this.cid ;
              this.backAddressModel.area = this.did ;
              this.backAddressModel.strProvince = _.find(this.cityData, {id: this.pid}).text ;
              this.backAddressModel.strCity = _.find(this.cs, {id: this.cid}).text ;
              this.backAddressModel.strArea = _.find(this.ds, {id: this.did}).text ;
              //console.log(JSON.stringify(this.backAddressModel)); return ;
              _addOrUpdateBackAddress(this.backAddressModel).then((data) => {
                  const {success, msg} = data;
                  if(success) {
                    this.$message({message: '操作成功', type: 'success'});
                    // 保存成功之后返回
                    this.$emit("reback", "backAddressList", this.backAddressModel);
                  } else {
                      this.$message.error('错了哦，'+msg);
                      console.log(msg)
                  }
                });
            }else{
              console.log('fail') ;
            }
        })
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.searchTableList()
      },
      handleCurrentChange(val) {
        this.page = val
        this.searchTableList()
      },
      pchange(val) {
        if (!this.pid) return
        this.cid = this.cs[0]['id']
        this.did = this.ds[0]['id']
      },
      cchange(val) {
        if (!this.pid) return
        this.did = this.ds[0]['id']
      },
      dchange(val) {
        if (!this.pid) return
      },
    }
  }
</script>
