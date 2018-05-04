<template>
    <div class="_aside-box" v-show="show">
        <div class="_aside-box-content" :style="styleObject">
            <div class="_aside-header">
                <h3 class="_aside-title">{{title}}</h3>
                <span class="_aside-close" @click.prevent="close">&times;</span>
            </div>
            <div class="_aside-body">
                <slot name="body"></slot>
            </div>
            <div class="_aside-footer">
                <slot name="footer"></slot>
            </div>
        </div>
        <div class="_aside-mask"></div>
    </div>
</template>

<script>
    export default {
        name: "aside-box",
        props: {
            show: {
                type: Boolean,
                default: false
            },
            title: {
                type: String,
                default: ""
            },
            width: {
                type: String,
                default: '475px'
            }
        },
        data() {
            return {
                _show: this.show,
                styleObject: {
                    width: this.width,
                }
            }
        },
        methods: {
            close() {
                this.$emit('close')
            }
        }
    }
</script>

<style lang="sass">
    ._aside-box {
        position: fixed;
        top: 0; right: 0; bottom: 0; left: 0;
        z-index: 1000;
    }
    ._aside-mask {
        position: fixed;
        top: 0; right: 0; bottom: 0; left: 0;
        background-color: rgba(0,0,0,.35);
    }
    ._aside-box-content {
        background-color: #fff;
        // border-radius: 4px;
        border: 1px solid transparent;
        // box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.78);
        position: absolute;
        top: 51px; bottom: 0;
        right: 0; left: auto;
        min-width: 475px;
        z-index: 1002;
        overflow: auto;

        display: flex;
        flex-direction: column;
    }
    ._aside-header {
        color: #333;
        background-color: #f5f5f5;
        border-color: #ddd;
        padding: 10px 15px;
        border-bottom: 1px solid #ddd;
        height: 41px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 10px;
        font-size: 15px;
    }
    ._aside-title {
    }
    ._aside-close {
        display: block;
        font-size: 21px;
        font-weight: 500;
        line-height: 1;
        color: #000;
        opacity: .3;
        cursor: pointer;
        &:hover {
            opacity: .6;
        }
    }
    ._aside-body {
        padding: 15px;
        flex: 1;
        overflow: auto;
    }
    ._aside-footer > *{
        border-top: 1px solid #ddd;
        height: 46px;
        display: flex;
        align-items: center;
    }
</style>
