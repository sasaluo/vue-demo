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
                v-show="value != '' && set == 'tel'"
                class="login-input-delete"
                src="/static/images/form/icon_delete@2x.png"
                @click="deleteVal"
                alt="">
        <div class="login-input-code" v-show="set == 'code'">
            <div class="login-input-code-item login-input-code-item-word" @click="getCode('word')" v-show="time == 0">获取验证</div>
            <div class="login-input-code-item login-input-code-item-word" v-show="time > 0">{{time}}S获取</div>
            <div class="login-input-code-item login-input-code-item-voice" @click="getCode('voice')">语音验证</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'input',

        data() {
            return {
                placeholder:'',
                if_show:false,
                if_first:false,
                time:0
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
                    case 'code':
                        let codeValue = value
                            .substr(0,4);
                        if (codeValue !== value) {
                            this.$refs.input.value = codeValue;
                        }
                        this.$emit('input', codeValue);
                        break;
                    case 'password':
                        let passwordValue = value
                            .substr(0,16);
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
            },

            getCode(type) {
                this.$emit('propMethods',type,() => {
                    this.time = 60;
                    let times = setInterval(() => {
                        this.time --;
                        if (this.time <= 0) {
                            this.time = 0;
                            clearInterval(times);
                        }
                    },1000)
                });
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

        components: {},

        created() {

        }
    }

</script>

<style scoped lang="less" rel="stylesheet/less" type="text/css">
    @import '../../../public/css/variable.less';
    @import '../../../public/css/animate.less';


    .input-default{
        display: inline-block;
        width: 6.3rem;
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
            width: 5.2rem;
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
        &-code{
            position: absolute;
            right:0;
            top:0;
            overflow: hidden;
            &-item{
                width: .96rem;
                font-size:.24rem;
                float: left;
                color: #505050;
                &-word {
                    padding-right:@rem * 6.7;
                    border-right:1px solid #e8e8e8;
                }
                &-voice{
                    padding-left: @rem * 6.7;
                }
            }
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