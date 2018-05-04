<template>
  <div class="demo">
    <!-- 面包屑 -->
    <div class="_breadcrumb">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item>Demo</el-breadcrumb-item>
        <el-breadcrumb-item>省市区选择</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="_container">
      <el-row :gutter="12" type="flex" justify="start">
        <el-col :span="6">
          <el-select v-model="pid" :span="6" @change="pchange">
            <el-option v-for="p in cityData" :label="p.text" :value="p.id" :key="p.id"></el-option>
          </el-select>
        </el-col>
        
        <el-col :span="6">
          <el-select v-model="cid" :span="6" @change="cchange"> 
            <el-option v-for="c in cs" :label="c.text" :value="c.id" :key="c.id"></el-option>
          </el-select>
        </el-col>

        <el-col :span="6">
          <el-select v-model="did" :span="6" @change="dchange"> 
            <el-option v-for="d in ds" :label="d.text" :value="d.id" :key="d.id"></el-option>
          </el-select>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  // import cityData from "components/cityforaddress.json"
  import _ from "lodash"

  export default {
    computed: {
      cs() {
        return (_.find(this.cityData, {id: this.pid}) || {}).children || {}
      },
      ds() {
        return (_.find(this.cs, {id: this.cid}) || {}).children || {}
      },
    },
    data() {
      return {
        cityData: [],
        pid: '110000',
        cid: '110100',
        did: '110101',
      }
    },
    methods: {
      pchange(val) {
        this.cid = this.cs[0]['id']
        this.did = this.ds[0]['id']
      },
      cchange(val) {
        this.did = this.ds[0]['id']
      },
      dchange(val) {
        console.log(this.pid, this.cid, this.did)
      },
    },
    created() {
      // 代码分割 
      require.ensure([], () => {
        this.cityData = require('assets/cityforaddress.json')
        console.log("cityData: ", this.cityData)
      })
    }
  }
</script>
