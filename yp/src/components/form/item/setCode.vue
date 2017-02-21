<template>
    <div id="setCode">
        <div class="login_logo">
            <inputAll set="password" place="请输入6-16位密码" type="password" v-model="password"></inputAll>
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
        <toast></toast>
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
                password:''
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

                this.$store.dispatch('clearToast');
                this.$store.dispatch('showToast','注册成功~').then(() => {
                    this.$router.push('/form/to/login');
                });
            },

            locationHref() {
                this.$router.push('/form/to/register');
            }
        },

        computed: {
            boo() {
                return this.password != '' ? true : false;
            }
        },

        components: {
            inputAll,
            buttonAll
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