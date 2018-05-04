<template>
    <div class="step-indicator">
        <ul>
            <li :class="{'current': index + 1 <= number }" v-for="(label,index) in this[type]">
                <div class="step-block">
                    <span class="_line"></span>
                    <span class="line"></span>
                    <span class="icon"></span>
                    <span class="step-number">{{index + 1}}</span>
                </div>
                <div class="label-text">{{label}}</div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    props: {
        type: {
            type: String,
            default: 'resetPassword'
        },
        number: {
            type: Number,
            default: 1
        }
    },
    data() {
        return {
            resetPassword: ["填写手机号", "验证身份", "设置新密码", "重置成功"]
        }
    }
}
</script>
<style lang="sass">
.step-indicator {
    > ul {
        position: relative;
        width: 100%;
        display: flex;
        align-items: center;
        padding: 30px 0;
        > li {
            position: relative;
            flex: 1;
            color: #ccc;
            .step-block {
                text-align: center;
                position: relative;
                .icon {
                    display: block;
                    width: 20px;
                    height: 20px;
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    margin: 0 auto;
                    background-color: #C7C7C7;
                    transform: rotate(45deg);
                }
                .step-number {
                    position: relative;
                    color: #fff;
                }
                .line,
                ._line {
                    display: block;
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    left: 0;
                    margin: auto 0;
                    height: 3px;
                }
                .line {
                    width: 0;
                    background-color: #EE5A25;
                }
                ._line {
                    width: 100%;
                    background-color: #C7C7C7;
                }
            }
            .label-text {
                text-align: center;
                margin-top: 5px;
            }
            &.current .step-block {
                color: #EE5A25;
                .icon {
                    background-color: #EE5A25;
                }
                .line {
                    width: 100%;
                }
            }
            &.current .label-text {
                color: #EE5A25;
            }
        }
    }
}
</style>
