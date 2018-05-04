<template>
  <div class="">
    <div class="tab-components">
      <tab-items>
      	<li class="active"><a href="#/mall/addShop">修改店铺</a></li>      
      </tab-items>
      <el-row :gutter="20">
      	  <el-col :span="4"><div class="grid-content bg-purple">&nbsp;&nbsp</div></el-col>
		  <el-col :span="16">
		  	<div class="grid-content bg-purple">
				 <el-form :model="shopParam" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="margin-top: 30px;">
						  <el-form-item label="店铺名称" prop="shopName">
						    <el-input v-model="shopParam.shopName" style="width:50%;"></el-input>
						  </el-form-item>
						  <el-form-item label="运营商编码" prop="supplierCode" >
						    <el-input v-model="shopParam.supplierCode" style="width:20%;" :disabled="true"></el-input>
						  </el-form-item>
						  <el-form-item label="店铺编码" prop="shopCode" >
						    <el-input v-model="shopParam.shopCode" style="width:20%;" :disabled="true"></el-input>
						  </el-form-item>   
						  <el-form-item label="订单长度" prop="orderSD">
						    <el-input v-model="shopParam.orderSD" style="width:10%;" :disabled="true"></el-input>
						  </el-form-item> 
						  <el-form-item label="是否自营" prop="isMyself">
						    <el-radio-group v-model="shopParam.isMyself">
						      <el-radio :label="1">是</el-radio>
						      <el-radio :label="0">否</el-radio>
						    </el-radio-group>
						  </el-form-item>   
						  <el-form-item label="关键字" prop="shopKeywords">
						    <el-input v-model="shopParam.shopKeywords" style="width:20%;"></el-input>
						  </el-form-item>
						  <el-form-item label="店铺描述" prop="description">
						    <el-input type="textarea" v-model="shopParam.description" style="width:50%;">
						   	</el-input>
						  </el-form-item>   
						  <el-form-item label="货到付款">
						    <el-switch on-text="是" off-text="否" v-model="isCod"
						      on-color="#13ce66"
  							  off-color="#ff4949">
  							</el-switch>
						  </el-form-item>
						  <el-form-item label="库存提醒" prop="stockWarn">
						    <el-input v-model="shopParam.stockWarn" style="width:10%;"></el-input>
						  </el-form-item>   
						  <el-form-item label="满额免运费" prop="shopFreePrice">
						    <el-input v-model="shopParam.shopFreePrice" style="width:10%;"></el-input>
						  </el-form-item> 
						  <el-form-item label="开店状态" prop="statusCode">
						    <el-radio-group v-model="shopParam.statusCode">
						      <el-radio :label="0">开启</el-radio>
						      <el-radio :label="1">关闭</el-radio>
						    </el-radio-group>
						  </el-form-item> 
						  <el-form-item label="设置店铺logo">
								<el-upload
								  action="/pub/pubController/uploadPic"
								  type="drag"
								  :thumbnail-mode="true"
								  :on-preview="handlePreview"
								  :on-remove="handleRemove"
								  :on-success="handleSuccess"
								>
								  <i class="el-icon-upload"></i>
								  <div class="el-dragger__text">将文件拖到此处，或<em>点击上传</em></div>
								  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                  <div><img :src="shopParam.shopLogo" /></div>
								</el-upload>
                <div><img :src="shopParam.shopLogo" style="width:200px;" /></div>
						  </el-form-item> 

						  <el-form-item label="选择分类">
                  <ul id="classifyTree" class="ztree"></ul>            
						  </el-form-item>
						  <el-form-item>
						    <el-button type="primary" @click.native.prevent="updateSubmit">修改</el-button>
                <el-button type="primary" @click.native.prevent="$emit('reback','shopList')">返回</el-button>
						  </el-form-item> 
						</el-form>		  	

		 	 </div></el-col>
		  <el-col :span="4"><div class="grid-content bg-purple"></div></el-col>
	  </el-row>
		
	  </div>     
    </div>
  </div>
</template>

<script>
  import {getClassifyList2zTree} from 'src/vuex/actions/mallClassifyAction'
  import breadcrumb from "components/breadcrumb"
  import tabItems from "components/tab-items"
  import { _updateMallShop } from 'src/vuex/api/shopAPI'
  import { _getMallShopByShopId,_getMallShopClassifyListBySId } from 'src/vuex/api/shopAPI'


  export default {
    props: {
      shopUpdateParam: {
        type: Object,
        default: {}
      }
    },
    components: {
      breadcrumb,
      tabItems
    },
    data(){
       var checkStrWithChar = (rule, value, callback) => {
	        setTimeout(() => {
	          if(!/^[a-zA-Z][a-zA-Z0-9_]*$/.test(value)) {
	       	  	callback(new Error('请输入以字母开头一串字符'));
	       	  }else{
	       	  	callback();
	       	  }
	        }, 1000);
      };
      var checkNum = (rule, value, callback) => {
        var _num = parseInt(value, 10);
        setTimeout(() => {
          if (!Number.isInteger(_num)) {
            callback(new Error('请输入数字值'));
          } else{
             callback();
          } 
        }, 1000);
      };   	
      return {
        treeClassifyData:[],
        shopParam:{} ,// 获取结果
      	fileNameAndMd5:'',
        classfyTreeSelect:'',
		    errorMsg:'',
      	isCod:false,
        setting: { //zTree配置
          view: {
            showIcon: false
          },
          check: {
            enable: true
          },
          data: {
            simpleData: {
              enable: true,
              idKey: "classifyId",
              pIdKey: "parentId",
            }
          }
        },
        rules: {
          shopName: [
            { required: true, message: '请输入店铺名称', trigger: 'blur,change' },
            { type: 'string', min: 0, max: 30, message: '店铺长度不能超过30' }
          ],
          // supplierCode: [
          //   { required: true, message: '请输入运营商编码', trigger: 'blur' },
          //   { validator: checkStrWithChar, trigger: 'change' },
          //   { type: 'string', min: 3, max: 3, message: '运营商编码为3位字符' }          
          // ],
          // shopCode: [
          //   { required: true, message: '请输入店铺编码', trigger: 'blur' },
          //   { validator: checkStrWithChar, trigger: 'change' },
          //   { type: 'string', min: 4, max: 4, message: '店铺编码为4位字符' }
          // ],                   
          // orderSD: [
          //   //{ required: true, message: '请填写订单长度', trigger: 'blur' },
          //   { validator: checkNum, trigger: 'blur,change' }
          // ],
          shopKeywords: [
            { required: true, message: '请填写关键字', trigger: 'blur' },
            { type: 'string', max: 30, message: '店铺长度不能超过30' }
          ],
          description: [
            { required: true, message: '请填写店铺简介', trigger: 'blur,change' }
          ],
          stockWarn: [
            //{required: true, message: '请填写库存提醒', trigger: 'blur' },
            { validator: checkNum, trigger: 'blur,change' }
          ],
          shopFreePrice: [
            //{ required: true, message: '请填写满额免运费', trigger: 'blur' },
            { validator: checkNum, trigger: 'blur,change' }
          ]
        }
      }
    },
    vuex:{
      
    },
    methods:{
      loadData(){   
      	    _getMallShopByShopId(this.shopUpdateParam.shopId).then((data) => {
                const {success,result}=data;                
                if(success){
                	this.shopParam = result.mallshopVo ;
                  this.classfyTreeSelect = result.classifyStr ;
                  this.fileNameAndMd5 = this.shopParam.shopFileName+"-"+this.shopParam.shopFileMd5 ;
                	if(this.shopParam.isCod == 1){
                		this.isCod=true ;
                	}else{
                		this.isCod=false ;
                	}
                  // 加载分类树
                  getClassifyList2zTree().then(treeData => {
                      var temArray = this.classfyTreeSelect.split(",") ;
                      treeData.forEach(function(node) {
                        temArray.forEach(function(item) {
                          if (item == node.classifyId)node.checked = true
                        })                      
                      })
                      var treeObj = $.fn.zTree.init($("#classifyTree"), this.setting, treeData) ;
                      treeObj.expandAll(true); 
                  }) 
                }
            });
      },
      /*shop_index(){
        this.router.push('shop_index');
      },*/
      updateSubmit(ev) {                        
             // 是否开启开关   
             if(this.isCod) {
             	this.shopParam.isCod = 1 ;
             }else{
             	this.shopParam.isCod = 0 ;
             }
             this.$refs.ruleForm.validate((valid) => {
	          if (valid) {
  	        	 if(this.fileNameAndMd5==''){
    	        		this.errorMsg = '请上传logo图片';
    	        		this.$message({message: this.errorMsg, type: 'warning'});
    	        		return false ;
  	        	 }     
               // 商品分类
               let treeObj = $.fn.zTree.getZTreeObj("classifyTree")
               let nodes = treeObj.getCheckedNodes(true)
               let classifyIds = []
               if (nodes.length > 0) {
                  nodes.forEach(function(item) {
                    classifyIds.push(item.classifyId)
                  })
               }
               this.classfyTreeSelect = classifyIds.join(",")
               // if(this.classfyTreeSelect == ''){
               //    this.errorMsg = '请选择系统分类';
               //    this.$message({message: this.errorMsg, type: 'warning'});
               //    return false ;
               // } 
               this.shopParam.classifyIdStr = this.classfyTreeSelect;
	             //console.log(JSON.stringify(this.shopParam))
	             //return;
	             _updateMallShop(this.shopParam).then((data) => {
	                const {success, msg} = data;
	                if(success) {
	                	console.log(JSON.stringify(msg))
	                	this.$message({message: '修改成功', type: 'success'});
						        this.$emit("reback", "shopList");
	                } else {
	                    console.log("失败")
	                }
	            });
	          } else {
	            console.log('error submit!!');
	            return false;
	          }
            });         
        },
        handleReset() {
        	this.$refs.ruleForm.resetFields();
        },
        handleRemove(file, fileList) {
        	console.log(file, fileList);
      	},
     	  handlePreview(file) {
        	console.log(file);
      	},
      	handleSuccess(file, fileList){
      		console.log(JSON.stringify(file));     		
      		this.fileNameAndMd5 = file.name+"-"+file.response.result.picMD5;
          this.shopParam.shopFileMd5 = file.response.result.picMD5 ;
          this.shopParam.shopFileName = file.name ;
      	},
    },
    mounted(){
     	this.loadData() ;
      
    }

  }
</script>
