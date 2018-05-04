<template>
    <appSettingBox class="_app-magic-setting">
        <div class="_row-flex">
            <label>布局{{`${obj.data.type}x${obj.data.type}`}}: </label>
            <div class="_row-auto">
                <div class="_magic-laout">
                    <table class="_magic-table" :class="`_magic-${obj.data.type}x${obj.data.type}`">
                        <tr v-for="(tr, i) in trs">
                            <td v-for="(td, ii) in tr" v-show="td.show" :rowspan="td.rowspan" :colspan="td.colspan" :data-x="td.x" :data-y="td.y" :data-id="td.tid" :class="['col' + td.colspan, 'row' + td.rowspan, td.active ? 'active': '', td.first ? 'block' : '', currentId == td.tid && td.active ? 'current' : '']" @click="tdClick(td)">
                                <span v-show="!!td.active && !td.img && obj.data.type > 3">{{td.colspan * 160 + 'x' + td.rowspan * 160}}</span>
                                <span v-show="!!td.active && !td.img && obj.data.type == 3">{{td.colspan * 200 + 'x' + td.rowspan * 200}}</span>
                                <i v-show="!!td.active" class="el-icon-circle-close" style="background: rgb(255, 255, 255)" @click.stop="tdRemove(td)"></i>
                                <img :src="td.img!==''?(cloudShowUrl+td.img):td.img" v-show="!!td.img">
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
        <div class="_magic-link-wrapper">
            <ul class="_magic-link">
                <li class="_magic-link-item" v-for="(b, i) in blocks" :data-id="b[0][0]['tid']" v-show="currentId == b[0][0]['tid']">
                    <div class="_row-flex">
                        <label>选择图片: </label>
                        <div class="_row-auto">
                            <div class="_magic-link-item-img" @click="selectImg(b[0][0],i)">
                                <img :src="b[0][0].img!==''?(cloudShowUrl+b[0][0].img):b[0][0].img" v-show="b[0][0].img.length > 0">
                                <div class="_icon-plus" v-show="b[0][0].img.length == 0"><i class="el-icon-plus"></i></div>
                                <div class="_icon-mask" :class="{'_show': b[0][0].img.length > 0}">点击修改</div>
                            </div>
                            <p v-show="obj.data.type > 3">建议尺寸: {{b[0][0]['colspan'] * 160 + 'x' + b[0][0]['rowspan'] * 160 + ' 像素'}}</p>
                            <p v-show="obj.data.type == 3">建议尺寸: {{b[0][0]['colspan'] * 200 + 'x' + b[0][0]['rowspan'] * 200 + ' 像素'}}</p>
                        </div>
                    </div>
                    <div class="_row-flex">
                        <label>选择链接: </label>
                        <el-input placeholder="请选择图片链接" v-model="b[0][0]['name']" size="small" class="_row-auto" style="margin-left: 5px;" :disabled="true"></el-input>
                        <el-button size="small" style="margin-left: 5px; margin-right: 5px;" @click.native.prevent="onOpenDataDailog(i)">选择链接</el-button>
                    </div>
                    <div class="_app-setting-remove-icon" @click.stop="tdRemove(b[0][0])"><i class="el-icon-circle-close" style="background: #fff;"></i></div>
                </li>
            </ul>
        </div>
        <!-- td selecting -->
        <div class="_magic-selecting-box" v-show="magicSelectShow">
            <div class="_magic-model">
                <h3>
          <span>选择布局</span>
          <span @click="magicSelectShow = false">&times;</span>
        </h3>
                <section>
                    <div>
                        <ul v-for="(u, i) in this.trs2">
                            <li v-for="(li, ii) in u" :class="{'selected': li.selected}" :data-x="li.x" :data-y="li.y" :data-id="li.id" :data-show="li.show" @mouseenter="liMouseenter(li)" @click="selectClick(li)">
                            </li>
                        </ul>
                    </div>
                </section>
            </div>
        </div>
        <!-- dialogData config datasouce-->
        <dialog-data ref="dialogData" @onSuccess="onSuccess"></dialog-data>
        <!--商品图库Dialog-->
        <el-dialog title="图库" v-model="shopFileDialog" class="shop-img-file-dialog">
            <shop-file @onSuccess="getShopFile" ref="shopFileComm"></shop-file>
        </el-dialog>
    </appSettingBox>
</template>
<script>
import appSettingBox from "../app-setting-box"
import dialogData from '../dialog-data'
import ShopFile from 'pages/main/mall/common/components/shop_file'
import createMagicTable from "./createMagicTable.js"
export default {
    name: "appMagicSetting",
    props: {
        obj: {
            type: Object,
            default: () => {
                return {}
            }
        }
    },
    components: {
        appSettingBox,
        dialogData,
        ShopFile
    },
    computed: {
        cloudShowUrl() {
            return this.$store.getters.cloudShowUrl
        }
    },
    data() {
        return {
            shopFileDialog: false,
            selectIndex: 0,
            trs: [],
            trs2: [],
            trs3: [],
            blocks: [],
            magicSelectShow: false,
            currentId: '',
            linkShow: false
        }
    },
    watch: {
        obj(newVal, oldVal) {
            this.currentId = ''
            this.linkShow = false
            this.magicSelectShow = false
            this.trs2 = []
            this.trs3 = []

            // console.log("newVal.data.list: ", newVal.data.list[0])
            let mt = createMagicTable(newVal.data.list, newVal.data.type)
            this.trs = mt.trs
            this.blocks = mt.bds
        }
    },
    methods: {
        openShopFileDialog(index) {
            this.selectIndex = index
            this.shopFileDialog = true
            setTimeout(() => {
                this.$refs.shopFileComm.onLoadData()
            }, 0)
        },
        getShopFile(shopFiles) {
            if (shopFiles.length == 0) {
                this.shopFileDialog = false
                return false
            }
            if (shopFiles.length > 1) {
                this.$message.error('只能选择一张图片')
                return false
            } else {
                this.shopFileDialog = false
                _.each(this.blocks, (item, index) => {
                    if (index === _.toNumber(this.selectIndex)) {
                        let b = item[0][0]
                        b.img = shopFiles[0].fileMd5
                        return false
                    }
                })
                setTimeout(() => {
                    // update obj.list
                    this.obj.data.list = this.blocks.map(_b => {
                        let b = _b[0][0]
                            // this.obj.prop.tds.push(b.tid)
                        return {
                            tid: b.tid,
                            x: b.x,
                            y: b.y,
                            w: b.colspan,
                            h: b.rowspan,

                            img: b.img,
                            name: b.name,
                            id: b.id,
                            type: b.type
                        }
                    })
                }, 0)
            }
        },
        onOpenDataDailog(index) {
            this.selectIndex = index
            this.$refs.dialogData.show()
        },
        onSuccess(data) {
            // if (_.findIndex(this.obj.data.list, { 'id': data.id }) !== -1)return
            _.each(this.blocks, (item, index) => {
                if (index === _.toNumber(this.selectIndex)) {
                    let b = item[0][0]
                    b.id = data.id
                    b.name = data.name
                    if(data.type==8){//自定义链接
                      b.weburl=data.name
                    }
                    b.type = data.type
                    if (data.goodsSkuId) {
                        b.goodsSkuId = data.goodsSkuId
                    }
                    return false
                }
            })
            setTimeout(() => {
                // update obj.list
                this.obj.data.list = this.blocks.map(_b => {
                    let b = _b[0][0]
                        // this.obj.prop.tds.push(b.tid)
                    let r = {
                        tid: b.tid,
                        x: b.x,
                        y: b.y,
                        w: b.colspan,
                        h: b.rowspan,
                        img: b.img,
                        name: b.name,
                        id: b.id,
                        type: b.type
                    }
                    if(r.type==8){//自定义链接
                      r.weburl=b.name
                    }
                    if (b.goodsSkuId) {
                        r.goodsSkuId = b.goodsSkuId
                        return r
                    }
                    return r
                })
            }, 0)
        },

        // createMagicTable(data, num = 4) {
        //   let trs = [], bds = [], index = 1

        //   for (let i = 0; i < num; i++) {
        //     let tds = []
        //     for (let ii = 0; ii < num; ii++) {
        //       tds.push({
        //         tid: index++,
        //         x: ii,
        //         y: i,
        //         rowspan: 1,
        //         colspan: 1,
        //         show: data.length > 0 ? false : true,
        //         active: false,
        //         selected: false,
        //         first: false,
        //         block: false,
        //         img: '',
        //         id: 0,
        //         type: 0,
        //         name: ''
        //       })
        //     }
        //     trs.push(tds)
        //   }

        //   if (data.length > 0) {
        //     data.forEach(b => {
        //       trs.forEach(tr => tr.forEach(td => {
        //         if (td.tid == b.tid) {
        //           td.show = true
        //           td.first = true
        //           td.block = true

        //           td.rowspan = b.h
        //           td.colspan = b.w

        //           td.img = b.img
        //           td.id = b.id
        //           td.name = b.name
        //           td.type = b.type

        //           bds.push(td)
        //         }
        //       }))
        //     })
        //   }

        //   return { trs, bds }
        // },

        updateTable(selectedTds) {
            for (let i = 0, len = selectedTds.length; i < len; i++) {
                let rowspan, colspan, lena, lenb
                for (rowspan = 0, lena = selectedTds[i].length; rowspan < lena; rowspan++) {
                    for (colspan = 0, lenb = selectedTds[i][rowspan].length; colspan < lenb; colspan++) {
                        selectedTds[i][rowspan][colspan].show = false
                        selectedTds[i][rowspan][colspan].active = true
                    }
                }
                selectedTds[i][0][0].show = true
                selectedTds[i][0][0].first = true
                selectedTds[i][0][0].rowspan = rowspan
                selectedTds[i][0][0].colspan = colspan
                    // selectedTds[i][0][0].blockIndex = i
            }
        },

        doMarkBlockTds(tableArray, td) {
            for (let i = 0, lena = tableArray.length; i < lena; i++) {
                let lenb = tableArray[i].length
                for (let ii = 0; ii < lenb; ii++) {
                    let _td = tableArray[i][ii]
                    if (td.x <= _td.x && td.y <= _td.y) {
                        _td.block = true
                    }
                }
            }
        },

        doSelectingTds(td) {
            for (let i = 0, lena = this.trs.length; i < lena; i++) {
                let trs = []
                let lenb = this.trs[i].length
                for (let ii = 0; ii < lenb; ii++) {
                    let _td = this.trs[i][ii]

                    _td.selected = false
                    _td.block = false

                    // if (!_td.show || _td.active) continue
                    if (td.x <= _td.x && td.y <= _td.y) trs.push(_td)
                }
                if (trs.length > 0) this.trs2.push(trs)
            }
        },

        tdClick(td) {

            this.trs2 = []

            if (td.active) {
                this.linkShow = true
                this.currentId = td.tid
                return
            }

            // handle this.trs2 then this.trs2.length > 0
            this.doSelectingTds(td)

            // 处理包含block
            let trs22 = []
            for (let i = 0, lena = this.trs2.length; i < lena; i++) {
                let trs2 = []
                let lenb = this.trs2[i].length

                for (let ii = 0; ii < lenb; ii++) {
                    let _td2 = this.trs2[i][ii]
                    if (_td2.first || _td2.active && !_td2.block) {
                        this.doMarkBlockTds(this.trs2, _td2)
                        continue
                    }
                    if (_td2.block) continue
                    trs2.push(_td2)
                }
                if (trs2.length > 0) trs22.push(trs2)
            }
            this.trs2 = trs22

            if (this.trs2.length == 1 && this.trs2[0].length == 1) {
                this.magicSelectShow = false
                this.trs3.push(this.trs2[0])
                this.blocks.push(this.trs3)
                this.updateTable(this.blocks)


                // update obj.list
                this.obj.data.list = this.blocks.map(_b => {
                    let b = _b[0][0]
                    return {
                        tid: b.tid,
                        x: b.x,
                        y: b.y,
                        w: b.colspan,
                        h: b.rowspan,

                        img: b.img,
                        id: b.id,
                        type: b.type,
                        name: b.name
                    }
                })

                // this.obj.prop.tds = []
                // this.blocks.forEach(b => {
                //   let _b = []
                //   b.forEach(tr => tr.forEach(td => _b.push(td.tid)))
                //   if (_b.length > 0) this.obj.prop.tds.push(_b)
                // })

                this.trs3 = []
                this.currentId = td.tid
            } else {
                this.magicSelectShow = true
            }

        },

        liMouseenter(li) {
            this.trs2.forEach(trs => {
                trs.forEach(td => {
                    td.selected = false
                    if (li.x >= td.x && li.y >= td.y) {
                        td.selected = true
                    }
                })
            })
        },

        selectClick() {
            this.trs2.forEach(trs => {
                let trs_ = []
                trs.forEach(td => td.selected && trs_.push(td))
                if (trs_.length > 0) this.trs3.push(trs_)
            })

            this.currentId = this.trs3[0][0].id

            this.blocks.push(this.trs3)
            this.updateTable(this.blocks)
            this.trs3 = []
            this.magicSelectShow = false

            // update obj.list
            this.obj.data.list = this.blocks.map(_b => {
                let b = _b[0][0]
                    // this.obj.prop.tds.push(b.tid)
                return {
                    tid: b.tid,
                    x: b.x,
                    y: b.y,
                    w: b.colspan,
                    h: b.rowspan,
                    img: b.img,

                    id: b.id,
                    type: b.type,
                    name: b.name,
                }
            })

            // this.obj.prop.tds = []
            // this.blocks.forEach(b => {
            //   let _b = []
            //   b.forEach(tr => tr.forEach(td => _b.push(td.tid)))
            //   if (_b.length > 0) this.obj.prop.tds.push(_b)
            // })

            // this.blocks.forEach(b => b.foreach(tr => tr.forEach(td => {

            // })))

        },

        tdRemove(td) {
            if (this.blocks.length == 0) return

            let block = []
            let index = 0
            this.linkShow = false

            this.blocks.forEach((b, i) => {
                if (b[0][0]['tid'] == td.tid) {
                    block = b
                    index = i
                }
            })

            if (block.length > 0) {
                this.currentId = ''
                block.forEach(tr => tr.forEach(d => {
                    d.show = true
                    d.active = false
                    d.rowspan = 1
                    d.colspan = 1
                    d.first = false
                    d.block = false
                    d.selected = false
                    d.img = ''
                    d.id = 0
                    d.type = 0
                    d.name = ''
                }))
            }

            this.blocks.splice(index, 1)

            // update obj.list
            this.obj.data.list = this.blocks.map(_b => {
                let b = _b[0][0]
                    // this.obj.prop.tds.push(b.tid)
                return {
                    tid: b.tid,
                    x: b.x,
                    y: b.y,
                    w: b.colspan,
                    h: b.rowspan,
                    img: b.img,

                    id: b.id,
                    type: b.type,
                    name: b.name
                }
            })

            // this.obj.prop.tds = []
            // this.blocks.forEach(b => {
            //   let _b = []
            //   b.forEach(tr => tr.forEach(td => _b.push(td.tid)))
            //   if (_b.length > 0) this.obj.prop.tds.push(_b)
            // })

        },

        selectImg(td, index) {
            this.selectIndex = index
            this.shopFileDialog = true
            setTimeout(() => {
                this.$refs.shopFileComm.onLoadData()
            }, 0)

            // setTimeout(() => {
            //   td.img = `/static/images/app/fruit/${td.colspan * 160}x${td.rowspan * 160}/${td.colspan * 160}x${td.rowspan * 160}-${Math.floor(Math.random() * 5)}.jpg`

            //   // update obj.list
            //   this.obj.data.list = this.blocks.map(_b => {
            //     let b = _b[0][0]
            //     // this.obj.prop.tds.push(b.tid)
            //     return {
            //       tid: b.tid,
            //       x: b.x,
            //       y: b.y,
            //       w: b.colspan,
            //       h: b.rowspan,
            //       img: b.img,
            //       link: b.link
            //     }
            //   })

            // }, 200)
        },

    },

    created() {
        let mt = createMagicTable(this.obj.data.list, this.obj.data.type)
        this.trs = mt.trs
        this.blocks = mt.bds
    }
}
</script>
<style lang="sass">
._magic-table {
    background: #f8f8f8;
}

._magic-table tr td {
    border: 0;
    cursor: pointer;
    width: 60px;
    height: 60px;
    text-align: center;
    color: #fff;
    font-size: 14px;
    position: relative;
    &::after {
        content: "+";
        font-size: 15px;
        color: #ccc;
    }
    img {
        max-width: 100%;
        width: 100%; // for IE11
        height: auto;
        vertical-align: middle;
    }
}

._magic-3x3 {
    width: 180px;
    height: 180px;
}

._magic-4x4 {
    width: 240px;
    height: 240px;
}

._magic-5x5 {
    width: 300px;
    height: 300px;
}

._magic-table {
    .row2 {
        height: 120px;
    }
    .row3 {
        height: 180px;
    }
    .row4 {
        height: 240px;
    }
    .row5 {
        height: 300px;
    }
    .col2 {
        width: 120px;
    }
    .col3 {
        width: 180px;
    }
    .col4 {
        width: 240px;
    }
    .col5 {
        width: 300px;
    }
    // for IE
    // .row2 { max-height: 120px; }
    // .row3 { max-height: 180px; }
    // .row4 { max-height: 240px; }
    // .row5 { max-height: 300px; }
}

@media all and (-ms-high-contrast:none) {
    ._magic-table .row2,
    ._magic-table .row2,
    ._magic-table .row2,
    ._magic-table .row2 {
        height: auto;
    }
    *::-ms-backdrop,
    ._magic-table .row2,
    ._magic-table .row2,
    ._magic-table .row2,
    ._magic-table .row2 {
        height: auto;
    }
    // IE 10
    ._magic-table._magic-4x4 tr td img,
    ._magic-table._magic-5x5 tr td img {
        display: block;
        position: absolute;
    }
    // IE11
    *::-ms-backdrop,
    ._magic-table._magic-4x4 tr td img,
    ._magic-table._magic-5x5 tr td img {
        display: block;
        position: absolute;
    }
}

._magic-table td span {
    text-shadow: 0 0 1px #000;
    font-weight: 500;
}

._magic-table td i {
    display: none;
    position: absolute;
    right: 1px;
    top: 1px;
    color: #a7a7a7;
    font-size: 18px;
    cursor: pointer;
    z-index: 2;
    border-radius: 50%;
}

._magic-table td:hover i {
    display: block;
}

._magic-table tr td.block::after {
    display: none;
}

._magic-table tr td.current {
    box-shadow: 0 0 0 2px #858585 inset;
    padding: 2px;
}

._magic-selecting-box {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1003;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(0, 0, 0, 0.7);
    ._magic-model {
        border-radius: 6px;
        width: 652px;
        height: 378px;
        background: #fff;
        h3 {
            font-size: 16px;
            font-weight: 500;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 5px 15px;
            border-bottom: 1px solid #eee;
            span:last-child {
                font-size: 25px;
                color: #ccc;
                cursor: pointer;
                &:hover {
                    color: #444;
                }
            }
        }
        section {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 330px;
        }
        section ul {
            overflow: hidden;
            li {
                width: 60px;
                height: 60px;
                float: left;
                margin: 1px;
                background: #f8f8f8;
                border: 1px solid #e9e9e9;
                border-right-width: 2px;
                border-bottom-width: 2px;
                text-align: center;
                line-height: 60px;
                &.selected {
                    background: #ddeafb;
                    border-color: #c3d9ff;
                }
            }
        }
    }
}

._magic-link-wrapper {
    margin-top: 10px;
}

._magic-link-item {
    position: relative;
    background: #fff;
    border: 1px solid #ccc;
    padding: 12px 0;
    min-height: 200px;
}

._magic-link-fade-leave-active,
._magic-link-fade-enter-active {
    transition: opacity .5s ease;
}

._magic-link-fade-enter,
._magic-link-fade-leave-active {
    opacity: 0;
}

._magic-link-item-img {
    width: 140px;
    min-height: 50px;
    position: relative;
    border: 1px solid #ccc;
    cursor: pointer;
    img {
        max-width: 100%;
        height: auto;
    }
    ._icon-plus,
    ._icon-mask {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 25px;
        color: #ccc;
    }
    ._icon-mask {
        font-size: 14px;
        color: #fff;
        background-color: rgba(0, 0, 0, .5);
        visibility: hidden;
    }
    &:hover ._icon-mask._show {
        visibility: visible;
    }
}

._magic-link-item-img + p {
    margin-top: 8px;
    margin-left: 3px;
}


/* 背景色 */

._magic-table tr:nth-child(1) td:nth-child(1).block {
    background: #BEEB9F;
}

._magic-table tr:nth-child(1) td:nth-child(2).block {
    background: #FFFF9D;
}

._magic-table tr:nth-child(1) td:nth-child(3).block {
    background: #DB9E36;
}

._magic-table tr:nth-child(1) td:nth-child(4).block {
    background: #79BD8F;
}

._magic-table tr:nth-child(1) td:nth-child(5).block {
    background: #FF7EC4;
}

._magic-table tr:nth-child(2) td:nth-child(1).block {
    background: #00A388;
}

._magic-table tr:nth-child(2) td:nth-child(2).block {
    background: #1D8CE0;
}

._magic-table tr:nth-child(2) td:nth-child(3).block {
    background: #1695A3;
}

._magic-table tr:nth-child(2) td:nth-child(4).block {
    background: #BEDB39;
}

._magic-table tr:nth-child(2) td:nth-child(5).block {
    background: #81D5FA;
}

._magic-table tr:nth-child(3) td:nth-child(1).block {
    background: #F3FFE2;
}

._magic-table tr:nth-child(3) td:nth-child(2).block {
    background: #EB7F00;
}

._magic-table tr:nth-child(3) td:nth-child(3).block {
    background: #7D8A2E;
}

._magic-table tr:nth-child(3) td:nth-child(4).block {
    background: #C9D787;
}

._magic-table tr:nth-child(3) td:nth-child(5).block {
    background: #98999A;
}

._magic-table tr:nth-child(4) td:nth-child(1).block {
    background: #FFC0A9;
}

._magic-table tr:nth-child(4) td:nth-child(2).block {
    background: #FF8598;
}

._magic-table tr:nth-child(4) td:nth-child(3).block {
    background: #FFD34E;
}

._magic-table tr:nth-child(4) td:nth-child(4).block {
    background: #ACF0F2;
}

._magic-table tr:nth-child(4) td:nth-child(5).block {
    background: #B86D87;
}

._magic-table tr:nth-child(5) td:nth-child(1).block {
    background: #F04F84;
}

._magic-table tr:nth-child(5) td:nth-child(2).block {
    background: #4A3F73;
}

._magic-table tr:nth-child(5) td:nth-child(3).block {
    background: #1D8CE0;
}

._magic-table tr:nth-child(5) td:nth-child(4).block {
    background: #38C45C;
}

._magic-table tr:nth-child(5) td:nth-child(5).block {
    background: #DFE7E7;
}
</style>
