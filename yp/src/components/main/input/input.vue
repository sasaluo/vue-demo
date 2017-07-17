<template>
    <div class="login-input">
        <input @focus="focus"
               @blur="blur"
               class="input-default"
               :type="type"
               :placeholder="place"
               ref="input"
               v-bind:value="value"
               v-on:input="updateValue($event.target.value)">
        <span
                v-show="if_first"
                class="login-input-placeholder"
                :class="animateCss">{{place}}</span>
        <img
                v-show="value != ''"
                class="login-input-delete"
                src="/static/images/form/icon_delete@2x.png"
                @click="deleteVal"
                alt="">
    </div>
</template>

<script>
    export default {
        name: 'input',

        data() {
            return {
                placeholder:'',
                if_show:false,
                if_first:false
            }
        },

        props:['value','type','place','set'],

        methods: {
            focus(e) {
                this.placeholder = e.target.placeholder ? e.target.placeholder : this.placeholder;
                e.target.placeholder = '';
                if (this.value == '') {
                    this.if_show = true;
                    this.if_first = true;
                }
            },

            blur(e) {
                if (this.value == '') {
                    this.if_show = false;
                    setTimeout(() => {
                        this.if_first = false;
                        e.target.placeholder = this.placeholder;
                    },300);
                } else {
                    this.if_show = false;
                    this.if_first = false;
                }
            },

            updateValue(value) {
                switch(this.set) {
                    case 'tel' :
                        let formattedValue = value
                            .trim()
                            .split('.')[0]
                            .substr(0,11);
                        if (formattedValue !== value) {
                            this.$refs.input.value = formattedValue;
                        }
                        this.$emit('input', formattedValue);
                        break;
                    case 'password':
                        let passwordValue = value
                            .substr(0,11);
                        if (passwordValue !== value) {
                            this.$refs.input.value = passwordValue;
                        }
                        this.$emit('input', passwordValue);
                        break;
                    default:
                        break;
                }
            },

            deleteVal() {
                this.$emit('input', '');
                let number = this.set == 'tel' ? 0 : 1;
                let input = document.querySelectorAll('.input-default')[number];
                input.focus();
            }
        },

        computed:{
            animateCss() {
                return {
                    'form-animated' : this.if_show,
                    'form-animated-native' : !this.if_show
                }
            }
        },

        components: {}
    }

</script>

<style scoped lang="less" rel="stylesheet/less" type="text/css">
    @import '../../../public/css/variable.less';
    @import '../../../public/css/animate.less';


    .input-default{
        display: inline-block;
        width:70vw;
        font-size:.28rem;
        font-family:"Microsoft YaHei";
        height:@rem * 4;
        border:none;
        border-bottom:.02rem solid #e8e8e8;
        padding-bottom: @rem * 3;
        .transtion(0.3s,ease-in-out);
    }
    @media screen and (max-width: 640px) {
        .input-default {
            width: 4rem;
        }
    }

    .input-default:focus{
        border:none;
        outline:none;
        border-bottom:0.02rem solid @orange;
    }

    .login-input {
        display: inline-block;
        position: relative;
        &-placeholder{
            position:absolute;
            left: 0;
            top:0;
            font-size:.28rem;
            color: #ccc;
        }
    }
    .login-input{
        display: inline-block;
        position: relative;
        .login-input-delete {
            position: absolute;
            right:0;
            top:0;
            width: .32rem;
            height:auto;
        }
    }
    .login-input:after{
        content: "";
        position: absolute;
        display: block;
        bottom: 0;
        left: 50%;
        width: 0;
        height: 2px;
        background: red;
        .transtion(.3s)
    }
    .login-input:hover:after{
        content: "";
        left:0;
        width: 100%;
    }

</style>