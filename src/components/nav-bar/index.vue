<template>
<div class="_nav-bar">
  <div class="_nav-bar-inner">
    <div class="_nav-bar-logo"><a href="#"><img src="/static/images/main-logo.png"></a></div>
    <div class="_nav-bar-menu">
      <a href="javascript:void(0)" v-for="(m, i) in headerMenus" @click="onLoadChildMenus(m, i, $event)" :class="{'_active': i == index}" :data-index="i">{{m.systemName}}</a>
    </div>
    <div class="_nav-bar-info">
      <div class="_carrier-info" v-if="openSystemAll">
        <el-button @click.native.prevent="onChangeShop" size="small" type="danger" :plain="true" style="background: transparent">{{loginType==1?'运营商切换店铺':'店铺切换电商'}}</el-button>
      </div>
      <div class="_carrier-info">
        <el-select @change="onSelected" v-model="selectedName2">
          <el-option v-for="(item, index) in selectedList" :value="item.itemName" :label="item.itemName"></el-option>
        </el-select>
      </div>
      <div class="_user-info">
        <el-dropdown trigger="click">
          <div class="el-dropdown-link"> <span>{{userName || 'admin'}} </span> <i class="el-icon-arrow-down "></i> </div>
          <!-- <el-button :plain="true"> {{userName || 'admin'}} <i class="el-icon-caret-bottom"></i> </el-button> -->
          <el-dropdown-menu slot="dropdown" class="_user-info-menus">
            <el-dropdown-item><a href="#"><i class="fa fa-info-circle"></i> 个人信息</a></el-dropdown-item>
            <el-dropdown-item><a href="/logout"><i class="fa fa-power-off"></i> 退出登录</a></el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>

<el-dialog :title="loginType==1?'选择进入店铺':'选择进入电商'" v-model="shopFormVisible" size="600">
  <el-card class="box-card _switch-shop-box">
   <div v-for="s in shopData">
    <a href="javascript:void(0);" @click="onInShop(s)">{{ s.itemName }} >></a>
   </div>
  </el-card>
  <!-- <div slot="footer" class="dialog-footer">
    <el-button @click="shopFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="shopFormVisible = false">确 定</el-button>
  </div> -->
</el-dialog>

</div>
</template>
<script>
import downMenu from "components/down-menu"
import {
  mapGetters
} from 'vuex'
import {getUserShopList,changeShopLogin} from 'actions/shopAction'
export default {
  components: {
    downMenu
  },
  data() {
    return {
      showCarrierMenu: false,
      showUserInfo: false,
      index: 0,
      selectedName2: '',
      shopFormVisible:false,
      shopData:[]
    }
  },
  computed: {
    ...mapGetters(['userName', 'loginType', 'selectedList', 'supplierID', 'selectedName', 'shopID','openSystemAll']),
    headerMenus(){
      return this.$store.state.loginUser.menus
    }
  },
  methods:{
    onChangeShop(){
      // 用户登录模式 1:运营商用户登录 2:店铺用户登录 默认运营商用户登录
      let loginType=this.loginType==1?2:1
      getUserShopList({'loginType':loginType}).then(data=>{
        if(data.length>0){
          if(data.length===1){
            changeShopLogin({'companyId':data[0].id,'loginType':loginType}).then(data=>{
                if(data.success){
                  window.location.href="/"
                }
             })
          }else{
            this.shopFormVisible=true
            this.shopData=data
          }
        }else{
          this.$message.info('未开通店铺业务')
        }
      })
    },
    onInShop(row){
      let loginType=this.loginType==1?2:1
      changeShopLogin({'companyId':row.id,'loginType':loginType}).then(data=>{
        if(data.success){
          window.location.href="/"
        }
      })
    },
    onLoadChildMenus(row, i, e){
      this.index = parseInt(e.currentTarget.getAttribute('data-index'))
      this.$store.getters.ev.$emit('onLoadChildMenuData',row)
    },
    onSelected(value){
      let row = _.find(this.selectedList, {itemName: value})
      if(this.selectedName!=row.itemName){
        this.$store.commit("UPDATE_SIDEBAR", [])
        this.$store.dispatch('updateSelected',row).then(data=>{
          if(data.length>0){
            if(data.length==1){//特殊处理 如果后端导常会将systemId置为-999返回并将错误信息放在systemName中
              let {systemId,systemName}=data[0]
              if(systemId==-999){
                alert(systemName)
                //this.$message.error(systemName)
                location.href="/logout"
              }
            }
            this.$store.getters.ev.$emit('onLoadChildMenuData',data[0])
          }
        })
      }
    }
  },
  created() {
    this.selectedName2 = this.selectedName
    // console.log("this.selectedName: ", this.selectedName)
    // console.log("this.selectedList: ", this.selectedList)
    this.$store.getters.ev.$on('changeSupplierName',(supplierName)=>{
      this.selectedName2=supplierName
    })
  },
  mounted() {
    document.addEventListener("click", () => {
      this.showCarrierMenu = false
      this.showUserInfo = false
    });
  }
}
</script>
<style lang="sass">
  ._nav-bar {
      height: 60px;
      background-color: #282d30;
  }

  ._nav-bar-inner {
      position: fixed;
      top: 0;
      width: 100%;
      // height: 50px;
      height: 60px;
      display: flex;
      z-index: 1002;
      color: #d0d0d0;
      background-color: #282d30;
  }

  ._nav-bar-logo {
      // width: 30vh;
      // max-width: 230px;
      // min-width: 190px;
      width: 229px;
      // border-right: 1px solid transparent;
      text-align: left;
      padding-left: 16px;
      // line-height: 50px;
      line-height: 60px;
      color: #d0d0d0;
      font-size: 18px;
      img { height: 40px; }

      border-bottom: 1px solid #000;
  }

  ._nav-bar-menu {
    flex: 1;
    display: flex;
    > a {
      display: inline-block;
      vertical-align: middle;
      color: #d0d0d0;
      font-size: 16px;
      height: 60px;
      line-height: 60px;
      padding: 0 12px;
      &._active, &:hover { background-color: #000; color: #f92e59; }
    }
  }

  ._nav-bar-info {
      width: 650px;
      display: flex;
      justify-content: flex-end;
      ._user-info {
        margin-right: 12px;
        .el-dropdown {
          height: 60px;
          line-height: 60px;
          .el-dropdown-link {
            &:hover { background-color: #000; }
            padding: 0 12px;
            height: 60px;
            line-height: 60px;
            cursor: pointer;
            color: #d0d0d0;
          }
          .el-button {
            color: #d0d0d0;
            background-color: transparent;
            border: 1px solid #4c86ca;
          }
        }
      }
      ._user-name {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 12px;
        ._user-name-text {
          max-width: 120px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
          text-align: right;
          margin-right: 5px;
        }
      }
      ._carrier-info {
        // flex: 1;
        // min-width: 200px;
        position: relative;
        margin-right: 10px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        ._current-carrier {
          display: block;
          // height: 50px;
          height: 60px;
          // line-height: 50px;
          line-height: 60px;
          text-align: right;
        }
        .el-input {
          .el-input__inner {
            height: 31px;
            background-color: transparent;
            // border: 1px solid #4c86ca;
            border: 1px solid #8e8e8e;
            color: #d0d0d0;
            &:focus { border-color: #f92e59; }
          }
        }
        .el-button--danger.is-plain {
          border-color: #8e8e8e;
          color: #d0d0d0;
          &:hover { color: #ff4949; }
        }
      }
  }
  ._user-info-menus li a{
    display: block;
    line-height: 36px;
    padding: 0 10px;
    margin: 0 -10px;
  }

  ._switch-shop-box a{
    color: #20A0FF;
    display: block;
    padding: 10px;
    // margin-bottom: 5px;
    &:hover {
      background: #F1FAFD;
    }
  }
</style>
