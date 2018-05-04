<template lang="html">
      <div>
          <form name="exportExcelForm" class="form-horizontal css-form">
              <el-button type="primary" @click="exportCurrentPage()">导出当前页</el-button>
              <el-button type="primary" @click="exportAllPage()">导出全部</el-button> 导出前
              <input type="number" id="toSomePage" name="toSomePage" v-model="pageObj.toSomePage" min="1"  style="width: 50px;" required > &nbsp;页
              <el-button type="primary" @click="gotoSomePage()" :disabled="isShowFlag">go</el-button>
              <span style="margin-left: 80px;"></span>
              <el-button type="primary" @click="vm.dialogExportExcel=false">关闭</el-button>
          </form>
      </div>
</template>

<script>
  export default {
    name: 'export_excel',
    props: {
      vm: {
        type: Object
      }
    },
    computed: {
       isShowFlag() {
        if(this.pageObj.toSomePage <= 0 || this.pageObj.toSomePage > this.vm.maxPage){
          return true ; 
        }
        return false ; 
      }     
    },
    data() {
      return {      
        pageObj:{
          toSomePage:0
        }
      }
    },
    methods: {
      // 导出当前页
      exportCurrentPage(){
        this.$emit('exportCurrentPage');
      },
      // 导出所有
      exportAllPage(){
        this.$emit('exportAllPage');
      },
      // 导出指定页数
      gotoSomePage(){
        this.$emit('gotoSomePage',this.pageObj.toSomePage);
      },
    },
    created(){
      //console.log(this.vm)
    },
  }

</script>