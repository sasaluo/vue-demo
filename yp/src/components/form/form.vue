<template>
    <div id="form">
        <transition
                enter-active-class="animated fadeInUp"
                leave-active-class="animated fadeOutUp">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import * as form from './item/main';
    import 'animate.css';
    export default {
        name:'form',

        data() {
            return{
                transitionName:''
            }
        },

        components:{
            login:form.login,
            register:form.register
        },

        computed:{
            type() {
                return this.$route.query.type;
            }
        },

        created() {
//            console.log(this.$route.query.type);
        },

        watch: {

        }
    }

</script>

<style lang="less"  rel="stylesheet/less" type="text/css">
    @import '../../public/css/variable.less';
    @import '../../public/css/mobile.less';
    #form {
        text-align: center;
        -webkit-box-sizing: content-box;
        -moz-box-sizing: content-box;
        box-sizing: content-box;
    }
    #login,#register,#setPassword{
        position: fixed;
        left:0;
        top:0;
        width: 100%;
        margin-top:@rem * 8.8;
    }
    .fadeOutUp{
        animation-duration: 1s;    //动画持续时间
        animation-delay: 0s;    //动画延迟时间
        animation-iteration-count: 1;    //动画执行次数
    }
    .fadeInUp{
        animation-duration:1s;    //动画持续时间
        animation-delay: 0s;    //动画延迟时间
        animation-iteration-count: 1;    //动画执行次数
    }
</style>