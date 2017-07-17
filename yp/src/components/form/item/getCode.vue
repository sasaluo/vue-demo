<template>
    <div id="getcode">
        <div class="login-form">
            <el-row>
                <el-col :span="22" :offset="2">
                    <div class="login-form-item">
                        <inputAll set="tel" place="请输入手机号" type="number" v-model="msg.tel"></inputAll>
                    </div>
                    <div class="login-form-item">
                        <inputAll v-on:propMethods="getCode" ref="child" set="code" place="请输入验证码" type="number" v-model="msg.code"></inputAll>
                    </div>
                    <div class="login-form-item">
                        <buttonAll :boo="boo" v-on:propMethods="register" type="register" value="确定"></buttonAll>
                    </div>
                </el-col>
            </el-row>
        </div>
        <div>
            <slideCheck v-on:propMethods="CheckCode" :boolean="ifTouch"></slideCheck>
        </div>
    </div>
</template>

<script>
    import inputAll from 'src/components/main/input/input-clear.vue';
    import buttonAll from 'src/components/main/button/button.vue';
    import toast from 'src/components/main/toast/toast.vue';
    import slideCheck from 'src/components/main/formInput/slideCheck.vue';
    import {Checks} from 'src/public/js/Verification';
    export default {
        name: 'getCode',

        data() {
            return {
                msg:{
                    tel:this.$store.state.Good.registerInfo.username,
                    code:this.$store.state.Good.registerInfo.validateCode
                },

                oldTel:this.$store.state.Good.registerInfo.username,

                ifTouch:0,

                message:{
                    code:'',
                    sendCode:this.$store.state.Good.registerInfo.validateCode == '' ? false : true
                }
            }
        },

        methods: {
            getCode(type,Countdown) {
                if (type == 'word') {
                    if (Checks.CheckPhone(this.msg.tel)) {
                        if (this.ifTouch == 0) {
                            this.ifTouch = 1;
                            return;
                        }
                        this.axios.post(this.$store.state.Good.ajaxInfo.url + '/moses/user/sendValidateCode', {
                            'clientIp':this.$store.state.Good.ajaxInfo.clientIp,
                            'appId':this.$store.state.Good.ajaxInfo.appId,
                            'username':this.msg.tel
                        })
                            .then(resultData => {
                                console.log(resultData.data);
                                this.message.code = resultData.data.dataInfo.validateCode;
                                this.$store.dispatch('showToast','验证码已发送~').then(() => {
                                    this.oldTel = this.msg.tel;
                                    this.ifTouch = 0;
                                    this.message.sendCode = true;
                                    Countdown();
                                });
                            })
                            .catch(() => {
                                this.$store.dispatch('showToast','网络情况不是很好，请稍后再试~');
                            });
                    } else {
                        this.$store.dispatch('showToast','手机格式错误');
                    }
                }
                if (type == 'voice') {
                    this.$store.dispatch('showToast','语音验证暂未开放，请尝试获取验证码~');
                }
            },

            register() {
                if (!this.message.sendCode) {
                    this.$store.dispatch('showToast','请先发送手机验证码');
                    return;
                }
                if (this.msg.code.toString().length > 2 && Checks.CheckPhone(this.msg.tel)) {
                    if (this.oldTel != this.msg.tel) {
                        this.$store.dispatch('showToast','电话号码被修改');
                        return;
                    }
                    this.$store.state.Good.registerInfo.username = this.msg.tel;
                    this.$store.state.Good.registerInfo.validateCode = this.msg.code;
                    this.$router.push('/form/to/setCode?type=reset  ');
                } else {
                    this.$store.dispatch('showToast','手机验证码格式错误');
                }
            },

            CheckCode() {
                this.ifTouch = 2;
                this.$refs.child.getCode('word');
            }
        },

        computed:{
            boo() {
                return this.msg.tel != '' && this.msg.code != '' ? true : false;
            }
        },

        components: {
            inputAll,
            buttonAll,
            toast,
            slideCheck
        },

        created() {

        }
    }

</script>

<style scoped lang="less" rel="stylesheet/less" type="text/css">
    @import '../../../public/css/variable.less';

    .icon_logo {
        width: 1.4rem;
        height: 1.4rem;
        margin-bottom: @rem * 6;
    }

    .login_tips {
        color: @orange;
        font-size: 0.24rem;
        margin-top: @rem * 3;
        margin-bottom: @rem * 7;
    }

    .login-form {
        &-item {
            text-align: left;
            margin-top: @rem * 4.5;
            img {
                width: .48rem;
                height: auto;
                vertical-align: middle;
                padding-right: @rem * 8;
            }
        }
        &-read{
            font-size:.2rem;
            text-align: left;
            margin-top: @rem * 3.1;
            margin-bottom: @rem * 4.5;
            margin-right: @rem * 9.3;
            color: #9B9B9B;
            img{
                vertical-align: middle;
                margin-right:@rem * 1.3;
            }
            a{
                color: #2a2a2a;
                text-decoration: underline;
            }
        }
    }
    .login-form-register{
        margin-top:@rem * 11.8;
        border-top:@rem * 3 solid #F2F2F2;
        padding: @rem * 2 @rem * 4;
        text-align: left;
        h3{
            font-size:.28rem;
            font-weight:bold;
        }
        p{
            font-size: .24rem;
            margin-bottom: @rem * 1.5;
            margin-top: @rem * 2.5;
            line-height: .3rem;
            width: @rem * 67.3;
        }
    }
</style>