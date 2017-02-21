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
            setPassword() {
                this.$router.push('/form/to/setCode');
            },

            locationHref() {
                this.$router.push('/form/to/setCode');
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