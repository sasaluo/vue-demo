<template>
    <div class="login-button">
        <button @click="register" class="login-button-style waves-effect waves-light" :class="{'login-button-style-orange':boo}">{{value}}</button>
    </div>
</template>

<script>
    import Waves from 'node-waves';
    import 'node-waves/dist/waves.min.css';
    export default {
        name: 'input',

        data() {
            return {

            }
        },

        props:['value','type','boo'],

        methods: {
            register() {
                this.$emit('propMethods');
            }
        },

        computed:{

        },

        components: {},

        created() {
            let config = {
                duration: 1000,
                delay: 200
            };
            Waves.init(config);
            Waves.attach('.login-button-style', 'waves-light');
        }
    }

</script>

<style scoped lang="less" rel="stylesheet/less" type="text/css">
    @import '../../../public/css/variable.less';
    @import '../../../public/css/animate.less';
    .login-button{
        -webkit-box-sizing: content-box;
        -moz-box-sizing: content-box;
        box-sizing: content-box;
        padding-right: @rem * 8;
    }
    .login-button-style{
        width: 100%;
        height:.8rem;
        font-size:.32rem;
        background: #fff;
        border:.02rem solid #999;
        color: #999;
        font-family: "Microsoft YaHei", "Hiragino Sans GB", Arial;
        -webkit-border-radius:.05rem;
        -moz-border-radius:.05rem;
        border-radius:.05rem;
    }
    .login-button-style-orange{
        background: #FF0047 100%;
    }
</style>