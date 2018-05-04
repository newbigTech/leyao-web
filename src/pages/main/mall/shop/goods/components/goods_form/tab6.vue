<!-- 商品规格选项卡-->
<template>
    <div class="container-fluid">
        <div class="page-header" style="margin:0;">
            <h1 style="font-weight: bold;">设置商品规格</h1>
        </div>
        <div class="container-fluid" v-show="goodsObj.goodsType !== 1" style="padding-top: 15px;">
            <el-alert title="只有商品类型选择为规格商品时,才可以设置商品规格!" type="info" :closable="false" show-icon></el-alert>
        </div>
        <div v-show="goodsObj.goodsType == 1" style="padding-top: 15px;">
            <el-row type="flex">
                <el-col style="min-width: 400px;" :span="6">
                    <el-form class="demo-form-inline" label-width="90px">
                        <el-form-item label="规格">
                            <el-select style="width: 100%; height: 36px;" v-model="skuProps" multiple filterable placeholder="请输入关键词" @change="onSelectedSkuProp" :multiple-limit="3" class="_sku-list">
                                <el-option-group v-for="group in skuPropertyData" :label="group.label">
                                    <el-option v-for="item in group.options" :key="item.skuId" :label="item.skuName" :value="item" :disabled="item.disabled">
                                        <span style="float: left">{{ item.skuName }}</span>
                                        <span style="float: right;padding-right: 25px; color: #8492a6; font-size: 13px">--{{ group.label }}</span>
                                    </el-option>
                                </el-option-group>
                                <!--
                                <el-option v-for="item in skuPropertyData" :key="item.skuId" :label="item.skuName" :value="item" :disabled="item.disabled">
                                </el-option> -->
                            </el-select>
                        </el-form-item>
                        <el-form-item label="展示方式">
                            <el-checkbox v-model.number="goodsObj.skuShowType" :true-label="0" :false-label="1">按规格展示商品</el-checkbox>
                            <el-tooltip class="item" effect="dark" content="按规格展示商品是将商品规格以多个商品的方式在前端呈现" placement="right-start">
                                <i class="el-icon-information"></i>
                            </el-tooltip>
                        </el-form-item>
                        <el-form-item label="库存提醒" v-show="goodsObj.stockType===3">
                            <el-input-number v-model.number="goodsObj.stockWarn" :min="0" :max="99999" :maxlength="5"></el-input-number>
                        </el-form-item>
                    </el-form>
                </el-col>
                <el-col>
                    <div v-show="skuProps.length!==0" style="padding-left: 40px;">
                        <div class="page-header" style="margin:0;">
                            <el-alert title="操作提示" type="info" description="点击规格右上角‘标签’可设置规格标签，如想清空标签保存标签为空即可" show-icon :closable="false">
                            </el-alert>
                            <!-- <h1><i class="el-icon-information"></i> 设置商品规格</h1> -->
                        </div>
                    </div>
                    <div style="padding-top: 10px;">
                        <el-form label-width="90px">
                            <el-form-item v-for="(s, i) in skuProps" :label="s.skuName">
                                <el-checkbox-group v-model="s.checked" @change="skuChange(s, i)">
                                    <template v-for="(r, i) in s.items">
                                        <el-checkbox :label="r.itemId+''">
                                            <span>{{r.itemName}}</span>
                                        </el-checkbox>
                                        <el-badge :class="r.strVal1==null?'_badge-none':''" :value="r.strVal1==null?'标签':r.strVal1" class="_badge-item" @click.native.prevent="onSetNote(r)">
                                        </el-badge>
                                    </template>
                                </el-checkbox-group>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-col>
            </el-row>
            <table class="table table-bordered center" v-show="showSkuTable">
                <thead>
                    <tr>
                        <th v-for="(s, i) in skuProps">{{s.skuName}}</th>
                        <th style="width:15%">市场价（元）
                            <input type="number" v-model="globalMPrice" style="width:70px" min="0.00" step="0.01">
                        </th>
                        <th style="width:15%">销售价（元）
                            <input type="number" v-model="globalPrice" style="width:70px" min="0.00" step="0.01">
                        </th>
                        <th style="width:15%">{{goodsObj.stockType===2?'占用库存':'库存'}}
                            <el-tooltip class="item" effect="dark" content="库存类型为共享库存时无需设置此库存" placement="right-start">
                                <i class="el-icon-information"></i>
                            </el-tooltip>
                            <input type="text" v-model="globalStockNumber" style="width:70px" :disabled="goodsObj.stockType===0">
                        </th>
                        <th style="width:15%"> 商品编码
                            <input type="text" v-model="globalGoodsSn" style="width:70px">
                        </th>
                        <th style="width:15%"> 规格标签
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(row, i) in skuRows" :id="`sku-${i}`" :key="'tr' + i">
                        <td v-for="(col, ii) in row.row" :key="'td' + ii" v-sku="{'pid': i, cid: ii, mapLen: skuColsLen}">{{col.itemName}}</td>
                        <td>
                            <!-- <el-form :model="dynamicForm" :rules="rules" ref="dynamicForm"> <el-form-item prop="mPrice"> <el-input v-model="row.mPrice"></el-input> </el-form-item> </el-form> -->
                            <input class="mPrice" type="number" v-model.number="row.mprice" max="999999" min="0.00" step="0.01">
                        </td>
                        <td>
                            <!-- <el-form :model="dynamicForm" :rules="rules" ref="dynamicForm"> <el-form-item prop="price"> <el-input v-model="row.price"></el-input> </el-form-item> </el-form> -->
                            <input class="sPrice" type="number" v-model.number="row.price" max="999999" min="0.00" step="0.01">
                        </td>
                        <td>
                            <input type="number" v-model.number="row.stockNumber" :disabled="goodsObj.stockType===0" max="999999"> </td>
                        <td>
                            <input type="text" v-model="row.goodsSn" maxlength="50"> </td>
                        <td>
                            <input type="text" v-model="row.comments" maxlength="50"> </td>
                    </tr>
                </tbody>
            </table>
            <div style="margin-left: 0px;" v-if="!paramObj.view">
                <el-button type="primary" @click.native.prevent="nextFlag=true;handleSaveAndNext()">保存商品并继续编辑</el-button>
                <el-button type="primary" @click.native.prevent="nextFlag=false;handleSaveAndNext()">保存</el-button>
                <el-button type="primary" @click.native.prevent="handleSaveAndNext(1)">保存并上架</el-button>
                <el-button type="default" @click.native.prevent="$emit('forward','','GoodsList')">返回到列表</el-button>
                <span class="error-info" v-show="ifError" style="color: red;padding-left: 30px;">*{{ErrorInfo}}</span>
            </div>
        </div>
    </div>
</template>
<script>
import combine from "lib/utils/combine"
import _ from "lodash"
import {
    getGlobalSkuPropertyList,
    getSkuPropertyItemList
}
from 'actions/skuPropertyAction'
import {
    mapGetters
} from 'vuex'
import {
    getGoodsSkuMapList,
    getGoodSkuList,
    saveGoodsFormTab6,
    saveGoodState
} from 'actions/goodsAction'
import RegExp from 'lib/utils/regexp'
export default {
    name: 'goods_from_tab6',
    props: {
        vm: {
            type: Object
        },
        paramObj: {
            type: Object,
            default: {}
        }
    },
    computed: {
        ...mapGetters(['supplierID', 'shopID']),
        rowspan() {
            let m = this.skuCheckedArray.map(l => l.length).slice()
            let acc = 1
            m.splice(cid + 1).forEach(a => acc *= a)
            return acc
        }
    },
    watch: {
        globalMPrice(val, oldVal) {
            _.forEach(this.skuRows, (item) => {
                item.mprice = Number(val)
            })
        },
        globalPrice(val, oldVal) {
            _.forEach(this.skuRows, (item) => {
                item.price = Number(val)
            })
        },
        globalStockNumber(val, oldVal) {
            _.forEach(this.skuRows, (item) => {
                item.stockNumber = Number(val)
            })
        },
        globalGoodsSn(val, oldVal) {
            _.forEach(this.skuRows, (item) => {
                item.goodsSn = val
            })
        }
    },
    data() {
        return {
            tagName: '',
            tagItem: {},
            showTagDialog: false,
            nextFlag: false,
            globalMPrice: '',
            globalPrice: '',
            globalStockNumber: '',
            globalGoodsSn: '',
            goodsObj: {
                goodsId: undefined,
                classifyId: undefined,
                goodsName: '',
                skuPropsJson: '', //sku属性
                skusJson: '', //商品sku
                skuShowType: 0,
                stockType: 0,
                stockWarn: 0
            },
            initFlag: true,
            dynamicForm: {},
            // rules: {
            //   mPrice: [{
            //     required: true,
            //     trigger: 'blur',
            //     message: '请输入市场价 '
            //   }, {
            //     pattern: RegExp.amount,
            //     trigger: 'blur',
            //     message: '格式错误， 格式：0.00'
            //   }],
            //   price: [{
            //     required: true,
            //     message: '请输入销售价',
            //     trigger: 'blur'
            //   }, {
            //     pattern: RegExp.amount,
            //     trigger: 'blur',
            //     message: '格式错误， 格式：0.00'
            //   }]
            // },
            skuProps: [],
            skuPropertyData: [],
            flags: [],
            showSkuTable: false,
            skuCheckedArray: [],
            skuRows: [],
            skuColsLen: [],
            ifError: false,
            ErrorInfo: '',
            partRows: {},
            arrRows: [],
            partRows: []
        }
    },
    directives: {
        sku: {
            bind: function(el, binding, vnode) {
                let {
                    pid,
                    cid,
                    mapLen
                } = binding.value

                function rowSpan(mapLen, cid) {
                    let m = mapLen.slice()
                    let acc = 1
                    m.splice(cid + 1).forEach(a => acc *= a)
                    return acc
                }

                let rowspan = rowSpan(mapLen, cid)

                if (pid % rowspan == 0) {
                    el.rowSpan = rowspan
                } else {
                    el.style.display = 'none'
                }
            }
        }
    },
    methods: {
        onSetNote(item) {
            this.$prompt('标签名称', '设置标签', {
                confirmButtonText: '添加',
                cancelButtonText: '取消',
                inputPattern: /^.{0,10}$/,
                inputErrorMessage: '格式错误，最大允许长度为10'
            }).then(({
                value
            }) => {
                this.$set(item, 'strVal1', value)
            }).catch(() => {});
        },
        onSetState() {
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
                    this.$emit('forward', '', 'GoodsList')
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
        },
        handleSaveAndNext(v) {
            // if (this.showSkuTable){
            //   this.$refs.dynamicForm.forEach((f)=>{
            //     f.validate(valid=>{
            //       console.log('v',valid);
            //     })
            //   })
            // }

            //if (!this.showSkuTable) return false
            if (this.skuProps.length === 0) {
                if (this.paramObj.goodsObj.goodsId) {
                    this.goodsObj.goodsId = this.paramObj.goodsObj.goodsId
                    saveGoodsFormTab6(this.goodsObj).then(data => {
                        const {
                            success,
                            msg,
                            result
                        } = data
                        if (success) {
                            if (v && v == 1) {
                                this.onSetState()
                            } else {
                                this.$message.success('操作成功')
                                if (this.nextFlag)
                                    this.$emit('forward', 'tab7')
                            }
                        } else {
                            this.$message.error(msg)
                            return false
                        }
                    })
                } else {
                    this.$message.info("请先保存商品基本信息")
                    this.$emit('forward', 'tab1')
                }
                return false
            }
            let paramsArray = []
            this.skuProps.forEach((s, i) => {
                let skuObj = {
                    skuId: s.skuId,
                    skuName: s.skuName,
                    sortIndex: i + 1
                }
                let itemsArray = []
                if (s.checked.length > 0) {
                    s.checked.forEach((v, i) => {
                        let _o = _.find(s.items, (item) => item.itemId == v)
                        let itemObj = {
                            itemId: v,
                            itemName: _o.itemName,
                            sortIndex: _o.sortIndex,
                            tagName: _o.strVal1
                        }
                        itemsArray.push(itemObj)
                    })
                    skuObj.items = itemsArray
                    skuObj.checked = s.checked.join(',')
                }
                paramsArray.push(skuObj)
            })

            this.goodsObj.skuPropsJson = JSON.stringify(paramsArray)
            this.goodsObj.skusJson = JSON.stringify(this.skuRows)
            let _mprice = []
            let _price = []
                //modify by feig
            this.skuRows.forEach((val) => {
                _mprice.push(val.mprice)
                _price.push(val.price)
                if (val.mprice === "" || val.price === "" || val.stockNumber === "") {
                    this.ifError = true
                    this.ErrorInfo = '市场价、销售价、库存不能为空'
                    setTimeout(() => {
                        this.ifError = false
                    }, 3000);
                    return false
                }


                let reg = /^\d+(\.\d{1,2})?$/;
                if (!reg.test(val.mprice || val.price)) {
                    console.log(val.mprice, val.price)
                    this.ifError = true
                    this.ErrorInfo = '价格最多只能有两位小数'
                    setTimeout(() => {
                        this.ifError = false
                    }, 3000)
                    return false
                }

                if (val.mprice < 0) {

                    this.ifError = true;
                    this.ErrorInfo = '请填入正确的市场价格'
                    setTimeout(() => {
                        this.ifError = false
                    }, 3000);
                    return false
                }

                if (val.price < 0) {
                    this.ifError = true;
                    this.ErrorInfo = '请填入正确的销售价格'
                    setTimeout(() => {
                        this.ifError = false
                    }, 3000)
                    return false
                }

                if (val.stockNumber < 0) {

                    this.ifError = true;
                    this.ErrorInfo = '请填入正确的库存数'
                    setTimeout(() => {
                        this.ifError = false
                    }, 3000)
                    return false
                }

            })
            if (this.ifError) {
                return false
            }
            this.goodsObj.goodsName = this.paramObj.goodsObj.goodsName
                //取市场价最高价
            this.goodsObj.mPrice = _.max(_mprice)
                //取销售价最低价
            this.goodsObj.price = _.min(_price)
                //if(this.skuRows.length===0)return false
                // console.log(this.skuRows);
                // console.log('skuProps',this.skuProps);
                // console.log('paramsArray',paramsArray);
            if (this.paramObj.goodsObj.goodsId) {
                this.goodsObj.goodsId = this.paramObj.goodsObj.goodsId
                saveGoodsFormTab6(this.goodsObj).then(data => {
                    const {
                        success,
                        msg,
                        result
                    } = data
                    if (success) {
                        if (v && v == 1) {
                            this.onSetState()
                        } else {
                            this.$message.success('操作成功')
                            if (this.nextFlag)
                                this.$emit('forward', 'tab7')
                        }
                    } else {
                        this.$message.error(msg)
                        return false
                    }
                })
            } else {
                this.$message.info("请先保存商品基本信息")
                this.$emit('forward', 'tab1')
            }
        },
        onSelectedSkuProp(e) { //下拉选择事件
            // if (e.length === 3) {
            //     this.skuPropertyData.forEach((x, i) => {
            //         _.forEach(x.options,(item)=>{
            //             item.disabled = true
            //         })
            //     })
            // } else if(e.length === 2){
            //     this.skuPropertyData.forEach((x, i) => {
            //         _.forEach(x.options,(item)=>{
            //             item.disabled = false
            //         })
            //     })
            // }
            // reinit
            if (this.initFlag) {
                this.initFlag = false
                    // console.log("this.skuProps: ", this.skuProps)
                    // this.skuPropertyData.forEach(x => this.$set(x, 'checked', []))
            } else {
                this.showSkuTable = false
                this.skuCheckedArray = []
                this.skuRows = []
                this.skuColsLen = []
                if(this.skuProps.length===0)
                    return false
                let options = _.flattenDeep(this.skuPropertyData.map(group => group.options))
                let diffOpts = _.differenceBy(options, this.skuProps, 'skuId')
                // console.log('diffOpts', diffOpts)
                for (let opt of diffOpts) {
                  opt.checked = []
                }

                _.forEach(this.skuProps, (item, index) => {
                    let picked = _.filter(item.items, v => item.checked.indexOf(v.itemId + '') !== -1)
                    this.skuCheckedArray[index] = picked
                })

                // let picked = _.filter(item.items, v => item.checked.indexOf(v.itemId + '') !== -1)
                // this.skuCheckedArray[idx] = picked
                //console.log(JSON.stringify(this.skuCheckedArray))
                // 查询是否可以显示skutable
                this.showSkuTable = _.every(this.skuProps, val => val.checked.length)
                if (this.showSkuTable) {
                    //console.log(JSON.stringify(this.skuCheckedArray))
                    this.skuRows = []
                    this.skuColsLen = []
                    this.$nextTick(() => {
                            this.skuRows = combine(this.skuCheckedArray).map(r => {
                                    return {
                                        row: r
                                    }
                                }

                            )
                            this.skuColsLen = this.skuCheckedArray.map(l => l.length)
                                //console.log(JSON.stringify(this.skuColsLen))
                        })
                        //console.log(JSON.stringify(combine(this.skuCheckedArray)))

                }

                // console.log("this.skuProps: ", this.skuProps)
            }
        },
        skuChange(item, idx) {
            // console.log("this.skuProps: ", this.skuProps)
            // console.log("item: ", item)
            // console.log("idx", idx)
            //modify by cypeng 每次渲染所有已选择规格
            _.forEach(this.skuProps, (item, index) => {
                let picked = _.filter(item.items, v => item.checked.indexOf(v.itemId + '') !== -1)
                this.skuCheckedArray[index] = picked
            })

            // let picked = _.filter(item.items, v => item.checked.indexOf(v.itemId + '') !== -1)
            // this.skuCheckedArray[idx] = picked
            //console.log(JSON.stringify(this.skuCheckedArray))
            // 查询是否可以显示skutable
            this.showSkuTable = _.every(this.skuProps, val => val.checked.length)
            if (this.showSkuTable) {
                //console.log(JSON.stringify(this.skuCheckedArray))
                this.skuRows = []
                this.skuColsLen = []
                this.$nextTick(() => {
                        this.skuRows = combine(this.skuCheckedArray).map(r => {
                                return {
                                    row: r
                                }
                            }

                        )
                        this.skuColsLen = this.skuCheckedArray.map(l => l.length)
                            //console.log(JSON.stringify(this.skuColsLen))
                    })
                    //console.log(JSON.stringify(combine(this.skuCheckedArray)))

            }
        },
        initSkuTable() { //修改时默认加载sku列表数据

        },
        loadSkuPropertyData(classifyId) {
            this.skuPropertyData = []
            this.skuProps = []
            this.skuRows = []
            this.showSkuTable = false
            this.skuCheckedArray = []
            this.skuColsLen = []
            let group1 = {
                label: '电商定义规格',
                options: []
            }
            let group2 = {
                label: '电商品类规格',
                options: []
            }
            let group3 = {
                label: '本电铺定义规格',
                options: []
            }
            let group4 = {
                label: '本电铺品类规格',
                options: []
            }
            getGlobalSkuPropertyList({
                classifyId: classifyId
            }).then(data => {
                //this.skuPropertyData = data||[]
                let _data = data || []
                group1.options = _.filter(_data, {
                    'supplierId': _.toNumber(this.supplierID),
                    'classifyId': 0
                })
                group2.options = _.filter(_data, {
                    'supplierId': _.toNumber(this.supplierID),
                    'classifyId': _.toNumber(classifyId)
                })
                group3.options = _.filter(_data, {
                    'supplierId': _.toNumber(this.shopID),
                    'classifyId': 0
                })
                group4.options = _.filter(_data, {
                    'supplierId': _.toNumber(this.shopID),
                    'classifyId': _.toNumber(classifyId)
                })
                this.skuPropertyData.push(group1, group2, group3, group4)
                    //console.log(JSON.parse(JSON.stringify(this.skuPropertyData)))
            })
        }
    },
    created() {
        if (this.paramObj.goodsObj.goodsId) {
            Object.assign(this.goodsObj, _.pick(this.paramObj.goodsObj, ['goodsId', 'goodsType', 'goodsName', 'stockType', 'classifyId']))
                // this.goodsObj.goodsId = this.paramObj.goodsObj.goodsId
                // this.goodsObj.goodsName = this.paramObj.goodsObj.goodsName
        }
        //商品类型change事件
        this.$store.getters.ev.$on('onchangeGoodsType', (v) => {
            //v:商品类型 0 SPU商品 1 SKU商品 2 组合商品
            //this.goodsObj.goodsType = v
            this.$set(this.goodsObj, 'goodsType', v)
        })
        if (this.vm) {
            this.vm.$on('classify-onchange-skuproperty', (classifyId) => {
                this.loadSkuPropertyData(classifyId)
            })
        }
        //库存类型变更事件
        this.$store.getters.ev.$on('onchangeStockType', (stockType) => {
            this.goodsObj.stockType = stockType
        })
        this.$store.getters.ev.$once('onchangeData', (data) => {
            this.initFlag = true
                //this.skuPropertyData
            let _skuPropertyData = data.shopGlobalSkuPropertyData || []
            if (this.goodsObj.goodsId) {
                _.forEach(_skuPropertyData, (item, i) => {
                        let _o = _.find(data.goodsObj.goodsSkuPropertyData, (d) => Number(d.skuId) == Number(item.skuId))
                            //console.log(JSON.stringify(_o))
                            //console.log(JSON.stringify(item))
                            //if (_.findIndex(data.goodsObj.goodsSkuPropertyData, { 'skuId': item.skuId }) !== -1)
                        if (_o) {
                            this.$set(item, 'checked', _o.checked)
                            this.skuProps.push(item)
                                //设置复选框标签
                            _.forEach(item.items, checkItem => {
                                    let _o1 = _.find(_o.checkedItems, (d) => Number(d.itemId) == Number(checkItem.itemId))
                                    if (_o1) {
                                        this.$set(checkItem, 'strVal1', _o1.comments || null)
                                    }
                                })
                                //console.log('CheckedItems',item.items)
                        } else {
                            this.$set(item, 'checked', [])
                        }
                })

                // 按照服务器返回的规格的顺序展示
                let arr_ = []
                data.goodsObj.goodsSkuPropertyData.forEach(d => {
                  this.skuProps.forEach(s => {
                    if (Number(d.skuId) == Number(s.skuId)) arr_.push(s)
                  })
                })

                this.skuProps = arr_

                    //console.log(JSON.stringify(this.skuProps))
                _.forEach(this.skuProps, (item, index) => {
                    let picked = _.filter(item.items, v => item.checked.indexOf(v.itemId + '') !== -1)
                    this.skuCheckedArray[index] = picked
                });

                if (data.goodsObj.goodsSkuData && data.goodsObj.goodsSkuData.length > 0) {
                    this.showSkuTable = true
                    this.skuRows = data.goodsObj.goodsSkuData
                    this.goodsObj.skuShowType = this.skuRows[0]['isSkuShow']
                    this.goodsObj.stockWarn = this.skuRows[0]['stockWarn']
                        //modify by feig
                        //拿到输入框的值
                    this.skuRows.forEach((val) => {
                        this.partRows = {
                            'price': val.price,
                            'mprice': val.mprice,
                            'stockNumber': val.stockNumber,
                            'goodsSn': val.goodsSn,
                            'comments': val.comments
                        }
                        this.arrRows.push(this.partRows);
                    })

                    this.partRows = []
                    this.skuRows = []
                    this.skuColsLen = []
                    this.$nextTick(() => {
                        this.partRows = combine(this.skuCheckedArray).map(r => {
                            return {
                                row: r
                            }
                        })
                        this.skuColsLen = this.skuCheckedArray.map(l => l.length)
                            //输入框的值和加载的值合并
                        let allRows = _.merge(this.arrRows, this.partRows);
                        this.skuRows = allRows
                    })

                }
            }
            //this.skuPropertyData = _skuPropertyData
            let group1 = {
                label: '电商定义规格',
                options: []
            }
            let group2 = {
                label: '电商品类规格',
                options: []
            }
            let group3 = {
                label: '本电铺定义规格',
                options: []
            }
            let group4 = {
                    label: '本电铺品类规格',
                    options: []
                }
                //this.skuPropertyData = data||[]
            let _data = data || []
            group1.options = _.filter(_skuPropertyData, {
                'supplierId': _.toNumber(this.supplierID),
                'classifyId': 0
            })
            group2.options = _.filter(_skuPropertyData, {
                'supplierId': _.toNumber(this.supplierID),
                'classifyId': _.toNumber(this.goodsObj.classifyId)
            })
            group3.options = _.filter(_skuPropertyData, {
                'supplierId': _.toNumber(this.shopID),
                'classifyId': 0
            })
            group4.options = _.filter(_skuPropertyData, {
                'supplierId': _.toNumber(this.shopID),
                'classifyId': _.toNumber(this.goodsObj.classifyId)
            })
            this.skuPropertyData.push(group1, group2, group3, group4)
        })
    }
}
</script>
<style lang="sass">
._sku-page table td,
th {
    text-align: center;
}

._sku-page {
    .table>tbody>tr>td,
    .table>tbody>tr>th,
    .table>tfoot>tr>td,
    .table>tfoot>tr>th,
    .table>thead>tr>td,
    .table>thead>tr>th {
        vertical-align: middle;
    }
}

._badge-item {
    margin-top: -20px;
    margin-right: 20px;
}

._badge-none .el-badge__content {
    background-color: #8F8F8F
}

.el-select-dropdown__list {
    max-height: 500px;
}
</style>
