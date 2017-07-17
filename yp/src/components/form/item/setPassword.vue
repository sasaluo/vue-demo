<template>
    <div id="setPassword">
        <div class="login_logo">
            <inputAll set="tel" place="请输入邀请码" type="text" v-model="code"></inputAll>
        </div>
        <div class="login-button">
            <el-row>
                <el-col :span="22" :offset="2">
                    <div class="login-button-item">
                        <buttonAll :boo="boo" v-on:propMethods="setPassword" type="register" value="确定"></buttonAll>
                    </div>
                    <div class="login-button-item">
                        <buttonClear v-on:propMethods="locationHref" type="register" value="没有邀请码，跳过"></buttonClear>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import inputAll from 'src/components/main/input/input-clear.vue';
    import buttonAll from 'src/components/main/button/button.vue';
    import buttonClear from 'src/components/main/button/button-clear.vue';
    import toast from 'src/components/main/toast/toast.vue';
    export default {
        name: 'setPassword',

        data() {
            return {
                code:''
            }
        },

        methods:{
            register() {
                if (this.$store.state.Good.registerInfo.username == '') {
                    this.$store.dispatch('showToast','您还没有填写手机号，为您跳转到注册页面！');
                    this.$router.push('/form/to/register');
                } else {
                    this.axios.post(this.$store.state.Good.ajaxInfo.url + '/moses/user/register', {
                        appId:this.$store.state.Good.ajaxInfo.appId,
                        clientIp:this.$store.state.Good.ajaxInfo.clientIp,
                        username:this.$store.state.Good.registerInfo.username,
                        accountType:this.$store.state.Good.registerInfo.accountType,
                        password:this.$store.state.Good.registerInfo.password,
                        providerUid:'',
                        validateCode:this.$store.state.Good.registerInfo.validateCode
                    })
                        .then(resultData => {
                            console.log(resultData.data);
                            if (resultData.data.message == '验证码错误') {
                                this.$store.dispatch('showToast','手机验证码错误或者已过期，请重新获取~').then(() => {
                                    this.$router.push('/form/to/register');
                                });
                                return;
                            }
                            if (resultData.data.returnCode == 1000) {
                                this.$store.dispatch('showToast','注册成功~').then(() => {
                                    this.$router.push('/form/to/login');
                                });
                            } else {
                                this.$store.dispatch('showToast',resultData.data.message).then(() => {
                                    if (resultData.data.returnCode == 1005) {
                                        this.$router.push('/form/to/register');
                                    }
                                });
                            }
                        })
                        .catch(() => {
                            this.$store.dispatch('showToast','网络情况不是很好，请稍后再试~');
                        })
                }
            },

            setPassword() {
                this.register();
            },

            locationHref() {
                this.register();
            }
        },

        computed: {
            boo() {
                return this.code != '' ? true : false;
            }
        },

        components: {
            inputAll,
            buttonAll,
            buttonClear,
            toast
        }
    }

</script>

<style scoped lang="less" rel="stylesheet/less" type="text/css">
    @import '../../../public/css/variable.less';
    .login_logo{
        margin-top: @rem * 9.6;
    }
    .login-button{
        &-item {
            margin-top: @rem * 4.5;
            margin-bottom: @rem * 3;
        }
    }
</style>