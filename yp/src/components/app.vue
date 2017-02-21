<template>
    <div id="NewApp">
        <mainHeader></mainHeader>
        <!-- register start -->
        <router-view></router-view>
        <!-- register end -->
        <mainFooter></mainFooter>
    </div>
</template>

<script>
    import * as head from './main/main';
    import * as form from './form/main';
    export default {
        name:'NewApp',
        data() {
            return{

            }
        },
        components:{
            mainHeader:head.header,
            mainFooter:head.footer,
            formLogin:form.login,
            formRegister:form.register
        },

        computed:{
            type() {
                return this.$route.params.type;
            },
            url () {
                return this.$route.params.type == 'login' ? '/form/register' : '/form/login';
            }
        },
        created() {

        }
    }
</script>

<style lang="less" rel="stylesheet/less" type="text/css">
    @import '../public/css/variable.less';
    .regist{
        background: url(../public/images/reg_b.jpg) no-repeat 50% 50%;
        background-size: cover;
        padding-top: 91px;
        box-sizing: border-box;
    }
    .regist_wrap{
        h2{
            border: 1px solid @cw;
            .fonts(18px);
            .bdr(5px);
            color: @cw;
            line-height: 50px;
            text-align: center;
            margin-bottom: 15px;
        }
    }

    .vali_list{
        background: @cw;
        padding: 20px 15px 0 10px;
        .bdr(5px);
        h4{
            position: relative;
            .fonts(18px);
            color: #5d5f63;
            padding: 0 0 15px;
            background: @cw;
            margin: 0 25px 15px;
            border-bottom: 1px solid #f5f5f5;
            &:before{
                content: "";
                position: absolute;
                bottom: 0;
                left: 0;
                width: 40px;
                height: 2px;
                background: @cgolden;
            }
        }
        ul{
            width: 450px;
            margin: 0 auto;
        }
        li{
            position: relative;
            line-height: 45px;
            margin-bottom: 10px;


            &:first-child{
                text-align: center;
            }
            &.checkbox{
                .fonts(12px);
                line-height: 10px;
                color: #75777a;
                margin-bottom: 25px;
                a{ color: @cgolden; }
            }

        }
        .heaven{
            color: #5d5f63;
            .fonts(16px);
            border-top: 1px solid #eee;
            padding: 10px 0 15px;
            text-align: center;
            a{ color: @cgolden; }
        }
    }
</style>