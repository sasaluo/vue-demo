<template>
    <div id="setCode">
        <div class="login_logo">
            <inputAll  v-on:propMethods="onPassword" ifSee="true" set="password" place="请输入6-16位密码" :type="inputType" v-model="password"></inputAll>
            <div class="login-button-text">
                密码由6-16位数字，字母，符号组成，不能为纯数字，字母或符号。
            </div>
        </div>
        <div class="login-button">
            <el-row>
                <el-col :span="22" :offset="2">
                    <div class="login-button-item">
                        <buttonAll :boo="boo" v-on:propMethods="setPassword" type="setCode" value="确定"></buttonAll>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
    import inputAll from 'src/components/main/input/input-clear.vue';
    import buttonAll from 'src/components/main/button/button.vue';
    import {Checks} from 'src/public/js/Verification';
    export default {
        name: 'setCode',

        data() {
            return {
                password:'',

                inputType:'password'
            }
        },

        methods:{
            setPassword() {
                try {
                    if (this.password.length < 6) {
                        throw new Error('密码长度不能低于6位')
                    }
                    if (this.password.length > 16) {
                        throw new Error('密码长度不能大于16位')
                    }
                    if (!Checks.CheckPassword(this.password)) {
                        throw new Error('密码不能为纯数字，字母或符号');
                    }
                } catch (e) {
                    this.$store.dispatch('showToast',e.message);
                    return;
                }
                if (this.$route.query.type == 'reset') {
                    this.resetPassword();
                    return;
                }
                this.$store.state.Good.registerInfo.password = this.password;
                this.$router.push('/form/to/setPassword');
            },

            locationHref() {
                this.$router.push('/form/to/register');
            },

            onPassword(see) {
                see();
            },

            resetPassword() {
                if (this.$store.state.Good.registerInfo.username == '') {
                    this.$store.dispatch('showToast','您还没有填写手机号，为您跳转到手机页面！');
                    this.$router.push('/form/to/getCode');
                } else {
                    let loadingInstance = this.$loading({ fullscreen: true });
                    this.axios.post(this.$store.state.Good.ajaxInfo.url + '/moses/user/resetPassword', {
                        appId:this.$store.state.Good.ajaxInfo.appId,
                        clientIp:this.$store.state.Good.ajaxInfo.clientIp,
                        username:this.$store.state.Good.registerInfo.username,
                        accountType:this.$store.state.Good.registerInfo.accountType,
                        newPassword:this.$store.state.Good.registerInfo.password,
                        providerUid:'',
                        validateCode:this.$store.state.Good.registerInfo.validateCode
                    })
                        .then(resultData => {
                            if (resultData.data.message == '验证码错误') {
                                this.$store.dispatch('showToast','手机验证码错误或者已过期，请重新获取~').then(() => {
                                    this.$router.push('/form/to/getCode');
                                });
                                return;
                            }
                            if (resultData.data.returnCode == 1000) {
                                this.$store.dispatch('showToast','密码重置成功~').then(() => {
                                    this.$router.push('/form/to/login');
                                });
                            } else {
                                this.$store.dispatch('showToast',resultData.data.message).then(() => {
                                    if (resultData.data.returnCode == 1005) {
                                        this.$router.push('/form/to/getCode');
                                    }
                                });
                            }
                            loadingInstance.close();
                        })
                        .catch(() => {
                            this.$store.dispatch('showToast','网络情况不是很好，请稍后再试~');
                        })
                }
            },
        },

        computed: {
            boo() {
                return this.password != '' ? true : false;
            }
        },

        components: {
            inputAll,
            buttonAll
        },

        created() {
//            console.log(this.$route.query.type);
            console.log('over');

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
    .login-button-text{
        font-size:.24rem;
        text-indent:.2rem;
        margin-top: @rem * 3;
    }
</style>