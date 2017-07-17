<template>
    <div></div>
</template>
<script>
    export default {
        name:'loginOther',

        created() {
            let loading = this.$loading({fullscreen:true,text:'正在验证身份'});
            this.$store.state.Good.registerInfo.accountType = localStorage.loginType;
            this.axios.post(this.$store.state.Good.ajaxInfo.url + '/moses/user/login', {
                appId:this.$store.state.Good.ajaxInfo.appId,
                accountType:this.$store.state.Good.registerInfo.accountType,
                clientIp:this.$store.state.Good.ajaxInfo.clientIp,
                code:this.$route.query.code,
                validateCode:'1234'
            })
                .then(resultData => {
                    console.log(resultData.data);
                    if (resultData.data.returnCode == 1000) {
                        this.$store.dispatch('showToast','登录成功！').then(() => {
                            this.$router.push('/form/to/login');
                        })
                    } else if (resultData.data.returnCode == 1010) {
                        this.$store.dispatch('showToast','你的账号未绑定，请注册或者使用手机号直接登录~').then(() => {
                            loading.close();
                            this.$store.state.Good.registerInfo.accountType = 'mobile';
                            this.$router.push('/form/to/register');
                        });
                    } else {
                        this.$store.dispatch('showToast',resultData.data.message);
                    }
                })
                .catch(() => {
                    this.$store.dispatch('showToast','网络情况不是很好，请稍后再试~');
                });
        }
    }
</script>