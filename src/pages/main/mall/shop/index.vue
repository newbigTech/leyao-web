<template>
  <div class="_container">
    <div class="_setting-options" style="margin-bottom: 10px;">
      <div class="_setting-options-left">
        <el-form :inline="true" :model="shopParam" class="demo-form-inline">
          <el-form-item>
            <el-input v-model="shopParam.shopName" placeholder="店铺名称"></el-input>
          </el-form-item>
          <!-- <el-form-item>
            <el-select v-model="formInline.region" placeholder="活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item> -->
          <el-form-item>  
            <el-button type="primary" @click.native.prevent="onSubmit">查询</el-button>
            <!-- <el-button type="success" @click.native.prevent="onAdd">新增</el-button> -->
          </el-form-item>
        </el-form>
      </div>
        <div class="_setting-options-right">
          <el-button type="success" @click.native="$emit('forward', 'addShop')">新增</el-button>
        </div>
    </div>
    <!-- table data -->
    <div class="_table-list">
      <el-table
        :data="mallShopDataList"
        selection-mode="multiple"
        stripe
        border
        style="width: 100%"
        @selectionchange="handleMultipleSelectionChange">
        <el-table-column type="selection" width="50">  </el-table-column>
        <el-table-column property="companyId" min-width="210" label="公司名称"> </el-table-column>
        <el-table-column property="shopName" min-width="220" label="店铺名"> </el-table-column>
        <el-table-column property="supplierCode" label="运营商编码" width="120"> </el-table-column>
        <el-table-column property="shopCode" label="店铺编码" width="120"> </el-table-column>
        <el-table-column property="userAlias" label="店铺管理员" width="120"> </el-table-column>
        <el-table-column inline-template label="是否自营" width="120" align="center"> 
          <div>{{row.isMyself == 0 ? '否' : '是'}}</div>
        </el-table-column>
        <el-table-column inline-template label="是否货到付款" width="150" align="center"> 
          <div>{{row.isCod == 0 ? '否' : '是'}}</div>   
        </el-table-column>
        <el-table-column property="description" min-width="200" label="店铺描述" show-tooltip-when-overflow> </el-table-column>
        <el-table-column inline-template label="状态" width="120" align="center">
          <div>{{row.statusCode == 0 ? '开启' : '关闭'}}</div> 
        </el-table-column> 
        <el-table-column property="createdDtm" label="创建时间" width="130" :formatter="dateFormat"> </el-table-column>
        <el-table-column inline-template label="操作" width="70"> 
          <div>
            <!-- <el-button type="primary" icon="edit" @click.native.prevent="updateShop(row.shopId)"></el-button> -->
            <el-button type="info" size="mini" @click.native.prevent="$emit('forward', 'updateShop', row)">编辑</el-button>           
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
</template>
<script>
  import breadcrumb from "components/breadcrumb"
  import tabItems from "components/tab-items"
  import { _getMallShopList } from 'src/vuex/api/shopAPI'
  import { _deleteMallShop } from 'src/vuex/api/shopAPI'
  import { dateFormat as _dateFormat} from 'src/lib/utils/dateFormat'
  
  export default {
    components: {
      breadcrumb,
      tabItems
    },
    data(){
      return {
        dateFormat(row, col) {
          return _dateFormat(new Date(row.createdDtm), 'yyyy-MM-dd')
        },
        page :1,
        pageSize :10,
        totalSize: 100,
        shopName:'',
        mallShopDataList:[],
        shopParam:{},
        multipleSelection:[], // 多选
      }
    },
    vuex:{
      
    },
    methods:{
      onSubmit() {
        this.loadData();
      },
      loadData(){
            this.param = {
                shopName:this.shopParam.shopName,
                pageNo:this.page,
                pageSize:this.pageSize
            }
            //console.log(JSON.stringify(this.param))
            _getMallShopList(this.param).then((data) => {
                const {success,result}=data;
                //console.log(JSON.stringify(result))
                if(success){
                    this.mallShopDataList = result.rows ;
                    this.totalSize = result.total;
                }
            })
      },
      onAdd(){
        this.$router.push('addShop');
      },
      deleteShop(mallShopId){
             _deleteMallShop(mallShopId).then((data) => {
                const {success,result}=data;
                console.log(JSON.stringify(result))
                if(success){
                    console.log("删除成功");
                    location.href="#/mall/shop";
                }
            })       
      },
      updateShop(mallShopId){
        location.href="#/mall/updateshop/"+mallShopId ;    
      },
      handleMultipleSelectionChange(val) {
        this.multipleSelection = val;
      },
      handleSizeChange(val) {
        this.pageSize = val ;
        this.loadData();
      },
      handleCurrentChange(val) {
        this.page = val ;
        this.loadData();
      }      
    },
    mounted(){
      
    },
    created(){
      this.loadData();
    }
  }
</script>
