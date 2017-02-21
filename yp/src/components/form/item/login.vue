<template>
    <div id="login">
        <div class="login_logo">
            <img class="icon_logo" src="/static/images/form/icon_logo@2x.png" alt="">
            <div class="login_tips">您还未登录，请登录后再领取好礼吧~</div>
        </div>
        <div class="login-form">
            <el-row>
                <el-col :span="22" :offset="2">
                    <div class="login-form-item">
                        <img src="/static/images/form/Rectangle%201339%20Copy%202.png" alt="">
                        <inputAll set="tel" place="请输入手机号" type="number" v-model="msg.tel"></inputAll>
                    </div>
                    <div class="login-form-item">
                        <img src="/static/images/form/Rectangle 1339 Copy 3.png" alt="">
                        <inputAll set="password" place="请输入密码" type="password" v-model="msg.password"></inputAll>
                    </div>
                    <div class="login-form-forget">
                        忘记密码？
                    </div>
                    <buttonAll v-on:propMethods="login" :boo="boo" type="login" value="立即登录"></buttonAll>
                </el-col>
            </el-row>
        </div>
        <div class="login-form-register">
            还没有账号？请先<router-link to="/form/to/register">注册</router-link>吧
        </div>
        <toast></toast>
    </div>
</template>

<script>
    import inputAll from 'src/components/main/input/input.vue';
    import buttonAll from 'src/components/main/button/button.vue';
    export default {
        name: 'login',

        data() {
            return {
                msg:{
                    tel:'',
                    password:''
                }
            }
        },

        methods: {
            login() {
                if (this.tel != '' && this.password != '') {
                    this.$store.dispatch('showToast','登录成功!');
                }
            }
        },

        computed:{
          boo() {
              return this.msg.tel != '' && this.msg.password != '' ? true : false;
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

    .icon_logo {
        width: 1.4rem;
        height: 1.4rem;
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
        &-forget{
            font-size:.24rem;
            text-align: right;
            margin-top: @rem * 3.1;
            margin-bottom: @rem * 4.5;
            margin-right: @rem * 9.3;
        }
    }
    .login-form-register{
        margin-top:@rem * 23.1;
    }
</style>