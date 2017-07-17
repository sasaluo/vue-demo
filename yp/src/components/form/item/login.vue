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
                        <router-link to="/form/to/getCode">忘记密码</router-link>
                    </div>
                    <buttonAll v-on:propMethods="login" :boo="boo" type="login" value="立即登录"></buttonAll>
                </el-col>
            </el-row>
        </div>
        <div class="login-form-register">
            还没有账号？请先<router-link to="/form/to/register">注册</router-link>吧
        </div>
        <div class="login-form-other">
            <div>
                ——————&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;第三方登录&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;——————
            </div>
            <div class="login-form-other-icon">
                <div class="login-form-other-icon-item" @click="loginForOther('wechat')">
                    <img src="/static/images/form/icon_wx.png" alt="">
                </div>
                <div class="login-form-other-icon-item" @click="loginForOther('qq')">
                    <img src="/static/images/form/icon_qq.png" alt="">
                </div>
                <div class="login-form-other-icon-item" @click="loginForOther('weibo')">
                    <img src="/static/images/form/icon_wb.png" alt="">
                </div>
            </div>
        </div>
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
                    this.axios.post(this.$store.state.Good.ajaxInfo.url + '/moses/user/login', {
                        appId:this.$store.state.Good.ajaxInfo.appId,
                        accountType:this.$store.state.Good.registerInfo.accountType,
                        clientIp:this.$store.state.Good.ajaxInfo.clientIp,
                        username:this.msg.tel,
                        password:this.msg.password,
                        providerCode:'',
                        validateCode:'1234'
                    })
                        .then(resultData => {
                            console.log(resultData.data);
                            if (resultData.data.returnCode == 1000) {
                                this.$store.dispatch('showToast','登录成功！').then(() => {
                                    this.$router.push('/form/to/login');
                                })
                            } else {
                                this.$store.dispatch('showToast',resultData.data.message);
                            }
                        })
                        .catch(() => {
                            this.$store.dispatch('showToast','网络情况不是很好，请稍后再试~');
                        });
                }
            },

            loginForOther(type) {
                let state = "vpclub appId";
                let redirect_uri,appid,scope,url,client_id;
                redirect_uri = "http://dev.vpclub.cn/moses/dev/user/#/form/to/loginOther";
                redirect_uri = encodeURIComponent(redirect_uri);
                localStorage.loginType = type;
                switch (type) {
                    case 'wechat':
                         appid = "wxec1847407eb40b4a";
                         scope = "snsapi_userinfo";
                         url = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + appid + "&redirect_uri=" + redirect_uri + "&response_type=code&scope=" + scope + "&state=" + state + "#wechat_redirect";
                        window.location.href = url;
                        break;
                    case 'qq':
                         client_id = "1105383333";
                         scope = "get_user_info";
                         url = "https://graph.qq.com/oauth2.0/authorize?client_id=" + client_id + "&redirect_uri=" + redirect_uri + "&response_type=code&scope=" + scope + "&state=" + state;
                        window.location.href = url;
                        break;
                    case 'weibo':
                         client_id = "1902946399";
                         scope = "all";
                         url = "https://open.weibo.cn/oauth2/authorize?client_id=" + client_id + "&redirect_uri=" + redirect_uri + "&response_type=code&scope=" + scope + "&state=" + state;
                        window.location.href = url;
                        break;
                    default:
                        break;
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
        &-forget {
            font-size: .24rem;
            text-align: right;
            margin-top: @rem * 3.1;
            margin-bottom: @rem * 4.5;
            margin-right: @rem * 9.3;
            a {
                color: #666666;
            }
        }
    }
    .login-form-register{
        margin-top:@rem * 5;
    }
    .login-form-other {
        margin-top:@rem * 10;
        font-size:.25rem;
        color: #D5D5D5;
        &-icon{
            overflow: hidden;
            margin-top: .3rem;
            &-item{
                float: left;
                -webkit-box-sizing: border-box;
                -moz-box-sizing:  border-box;
                box-sizing:  border-box;
                width: 33.3%;
                padding:.7rem;
                img{
                    width: 100%;
                    height:auto;
                }
            }
        }
    }
</style>