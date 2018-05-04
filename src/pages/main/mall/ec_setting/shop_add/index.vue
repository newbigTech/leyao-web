<template>
  <div class="_shop-management">
    <!-- 面包屑 -->
    <div class="_breadcrumb">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/mall' }">商城</el-breadcrumb-item>
        <el-breadcrumb-item>电商开店</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="_shop-form _container">
      <card-panel style="margin-bottom: 0;" class="_normal">
        <h3 slot="title">添加店铺</h3>
        <div slot="panel-btns">
          <el-button size="small" type="success" @click.native="$router.push('/mall/shop_management')">返回店铺列表</el-button>
          <!-- <el-button size="small" type="p1rimary" @click.native="save">保存店铺</el-button> -->
        </div>
        <div slot="panel-body">
          <div class="_v-tab_wrapper">
            <el-tabs  @tab-click="tabClick" type="border-card" class="_v-tab" v-model="tabName">
              <el-tab-pane name="0" label="1.店铺类型" :disabled="true">
                <span style="height: 5%;">选择店铺类型: </span><!--<el-button type="primary" @click="selectType(1)" :disabled="!isMyselfShowFlag">自营店铺</el-button> <el-button type="danger" @click="selectType(0)" :disabled="true">加盟店铺</el-button>-->
                <div class="choose-type">
                  <div :class="{chooseSelf: isMyselfShowFlag}">
                    <p class="image-self" @click="selectType(1)">
                      <img v-bind:src="isMyselfShowFlag ? '/static/images/self_support.png' : '/static/images/dis_self_support.png'" alt="">
                    </p>
                    <span>自营店铺</span>
                  </div>
                  <div :class="{chooseJoin: isMyselfShowFlag2}">
                    <p class="image-join" @click="selectType(0)">
                      <img v-bind:src="isMyselfShowFlag2 ? '/static/images/join.png' : '/static/images/dis_join.png'" alt="">
                    </p>
                    <span>加盟店铺</span>
                  </div>
                </div>
              </el-tab-pane>
              <el-tab-pane name="1" label="2.店铺公司" :disabled="true">  <tab1 :model="model" @next="next" @back="back" ref="tab1"></tab1></el-tab-pane>
              <el-tab-pane name="2" label="3.店铺用户" :disabled="true">  <tab2 :model="model" @next="next" @back="back" ref="tab2"></tab2></el-tab-pane>
              <el-tab-pane name="3" label="4.店铺设置" :disabled="true">  <tab3 :model="model" @next="next" @back="back" ref="tab3"></tab3></el-tab-pane>
              <el-tab-pane name="4" label="5.售卖品类" :disabled="true">  <tab4 :model="model" @next="next" @back="back" ref="tab4"></tab4></el-tab-pane>
            </el-tabs>
          </div>
        </div>
      </card-panel>
    </div>
  </div>
</template>
<style lang="sass">
  .choose-type {
    height: 60vh;
    display:flex;
    justify-content:center;
    align-items:center;

  .image-join,.image-self {
      width: 240px;
      height: 240px;
      border-radius: 16px;
    }

    div {
      width: 240px;
      text-align: center;
      font-size: 18px;
      margin-left: 50px;
      margin-right: 100px;
      margin-bottom:10px;

      color: #a2a2a2;
      p {
        background: #f9f9f9;
        border: 1px solid #ededed;
        text-align: center;
        line-height: 220px;
        margin-bottom: 10px;
      }
    }

    .chooseSelf {
      color: #454545;
      p {
        background: #edf5fc;
        border: 1px solid #d3dde6;
        text-align: center;
        line-height: 220px;
        &:hover {
            cursor: pointer;
            border: 1px solid #20a1ff;
         }
      }

    }
    .chooseJoin {
      color: #454545;
      p {
        background: #fdfbf2;
        border: 1px solid #d3dde6;
        text-align: center;
        line-height: 220px;
        &:hover {
           cursor: pointer;
           border: 1px solid #20a1ff;
         }
      }
    }


  }
</style>
<script>
  import tab1 from "./components/tab1"
  import tab2 from "./components/tab2"
  import tab3 from "./components/tab3"
  import tab4 from "./components/tab4"

  import {
    _addMallShop,
    _getSSOUserPageList,
    _findCompanyList ,
    _getBaseUserById,
    _getIsMyselfShopCount,
    } from 'src/vuex/api/shopAPI'

  export default {
    name: 'shopAdd',
    components: { tab1, tab2, tab3, tab4 },
    data() {
      return {
        e: new this.$root.constructor(),
        tabName: '0',
        isMyselfShowFlag: true,
        isMyselfShowFlag2:false,
        model: {
          // 公司 相关字段
          companyName: '',        // 公司名称
          contact: '',            // 公司联系电话
          province: '',           // 省份编码
          city: '',               // 城市编码
          area: '',               // 地区编码
          // strAddress: '',         // 省份-城市-地区字符串形式
          address: '',            // 公司详细地址

          // 管理员
          userAlias: '',          // 管理员用户名
          userMobile: '',         // 管理员手机号码
          pass: '',               // 管理员密码
          checkPass: '',          // 管理员确认密码

          // 店铺设置
          shopName: '',           // 店铺名称
          supplierCode: '',       // 运营商编码
          shopCode: '',           // 店铺编码
          orderSD: '5',            // 订单长度
          isMyself: 1,            // 是否自营 1 是 0 否
          isPackStatus: 0,        // 是否打包
          shopKeywords: '',       // 店铺关键字
          description: '',        // 店铺描述
          isCod: 0,               // 货到付款 1 是 0 否
          stockWarn: '0',           // 库存提醒
          shopFreePrice: '0',      // 满额免运费
          statusCode: 1,          // 店铺状态 0 测试 1 开启 2关闭
          shopFileMd5: '', // 店铺logo图片md5值
          shopFileName: '',       // 店铺logo图片文件名
          cFlag: 0,
          uFlag: 0,
          pid: '',
          did: '',
          did: '',
          strVal1:'', // 客服组设置
          intVal2:0,  // 数据来源
          strVal2:'', // 数据来源key，value

          // 店铺授权品类
          classifyIdStr: '',      // 以 , 分割的字符串

        }
      }
    },
    methods: {
      tabClick(tab) {
        // console.log(tab.index)
      },
      next(type) {
        console.log('next...')
        if (typeof type == 'string') {
          this.tabName = ''
          this.$nextTick(() => this.tabName = type)
        } else {
          this.save(true)
        }
      },
      back(tabName) {
        console.log('tabName: ', tabName)
        this.tabName = tabName
      },
      save(type) {
        console.log('save', type)
        this.$refs.tab1.$refs.form.validate(valid => {
          if (!valid) {
            this.tabName = ''
            return  this.$nextTick(() => this.tabName = '1')
          }
          this.$refs.tab2.$refs.form.validate(valid => {
            if (!valid) {
              this.tabName = ''
              console.log("v-1")
              return this.$nextTick(() => this.tabName = '2')
            }
            this.$refs.tab3.$refs.form.validate(valid => {
              if (!valid) {
                this.tabName = ''
                return this.$nextTick(() => this.tabName = '3')
              }
              // added 2016-12-20
              // if(this.model.shopKeywords == ''){
              //   this.tabName = ''
              //   this.$message.warning('请添加标签')
              //   return this.$nextTick(() => this.tabName = '3')
              // }
              //全部验证通过
              if (typeof type == 'boolean' && type) {
                //console.log(this.model);return;
                 _addMallShop(this.model).then((data) => {
                    const {success, msg} = data;
                    if(success) {
                      this.$message.success('添加成功')
                      this.$router.push('/mall/shop_management')
                    } else {
                      this.$message.error('错了哦，' + msg);
                      console.log(msg)
                      console.log("失败")
                    }
                })
                return
              }

              if (!this.$refs.tab4.next()) {
                this.tabName = ''
                return this.$nextTick(() => this.tabName = '4')
              }

            })
          })
        })
      },

      selectType(t) {
        this.model.isMyself = t;
        if(this.isMyselfShowFlag == true && t == 1) {
          this.tabName = '1';
          this.$refs.tab1.loadSupplierCompany();
        };

        if(this.isMyselfShowFlag2 == true && t == 0) {
          this.tabName = '1';
          this.$refs.tab1.loadSupplierCompany();
        };

      }
    },
    created() {
      _getIsMyselfShopCount().then((data) => {
          const {success, msg, result} = data;
          if(success) {
            if(result > 0){
              this.isMyselfShowFlag = false ;
            }
          } else {
            this.$message.error('错了哦，' + msg);
          }
      })
    }
  }
</script>
