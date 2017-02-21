<template>
    <transition name="fade">
        <div class="toast" v-show="liveTime > 0">
            {{msg}}
        </div>
    </transition>
</template>
<script>
    export default {
        name:'toast',

        data() {
            return {

            }
        },

        props:['time'],

        computed:{
            liveTime() {
                return this.$store.state.Good.time;
            },

            msg() {
                return this.$store.state.Good.msg;
            }
        }
    }
</script>

<style scoped lang="less" rel="stylesheet/less" type="text/css">
    @import '../../../public/css/variable.less';
    .toast {
        position:fixed;
        z-index:998;
        left: 50%;
        top:80%;
        background: rgba(0,0,0,.6);
        color: #fff;
        padding: .4rem .25rem;
        -webkit-border-radius:10px;
        -moz-border-radius:10px;
        border-radius:10px;
        text-align: center;
        .translates(-50%,-50%);
    }
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
        opacity: 0
    }
</style>