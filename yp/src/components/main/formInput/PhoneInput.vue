<template>
        <div class="el-input">
            <input :type="inputType" :placeholder="placeholder" class="el-input__inner" ref="input" v-bind:value="value" v-on:blur="updateValue($event.target.value)">
             <!--$event.target.value 获取当前的值-->
        </div>
</template>
<script>
    import {Checks} from 'src/public/js/Verification';
    export default {
        name:'PhoneInput',

        data() {
            return {

            }
        },

        props: ['value','type','placeholder','inputType'],//value:v-model,type:判断值的正则是什么,inputType：Number,text

        methods: {
            updateValue: function (value) {
                const _this = this;
                switch (this.type)
                {
                    case 'tel':
                        if (Checks.CheckPhone(value)) { //返回true
                            this.$store.dispatch('changeBoo',{key:'phone',type:true}).then(() => { //dispatch调用vuex的actions ()=> ===function()
                                this.$notify({
                                    title: '成功',
                                    message: '手机格式正确',
                                    type: 'success'
                                });
                            });
                        } else { //返回false
                            this.$store.dispatch('changeBoo',{key:'phone',type:false}).then(() => {
                                this.$notify({
                                    title: '警告',
                                    message: '手机格式输入错误',
                                    type: 'warning'
                                });
                            });
                        }
                        break;
                    case 'tel_code':
                        Checks.CheckTelCode(value).then(Boo => {
                            if (Boo) {
                                this.$store.dispatch('changeBoo',{key:'tel_code',type:true}).then(() => {
                                    this.$notify({
                                        title: '成功',
                                        message: '手机验证码正确',
                                        type: 'success'
                                    });
                                });
                            } else {
                                this.$store.dispatch('changeBoo',{key:'tel_code',type:false}).then(() => {
                                    this.$notify({
                                        title: '警告',
                                        message: '手机验证码错误',
                                        type: 'warning'
                                    });
                                });
                            }
                        });
                        break;
                    case 'password':
                        if (Checks.CheckPassword(value)) {
                            this.$store.dispatch('changeBoo',{key:'password',type:true}).then(() => {
                                this.$notify({
                                    title: '成功',
                                    message: '密码可以使用',
                                    type: 'success'
                                });
                            });
                        } else {
                            this.$store.dispatch('changeBoo',{key:'password',type:false}).then(() => {
                                this.$notify({
                                    title: '警告',
                                    message: '密码为6~20位之间',
                                    type: 'warning'
                                });
                            });
                        }
                        break;
                    case 'passwordT':
                        if (Checks.CheckPassword(value)) {
                            this.$store.dispatch('changeBoo',{key:'passwordT',type:true}).then(() => {
                                this.$notify({
                                    title: '成功',
                                    message: '密码正确',
                                    type: 'success'
                                });
                            });
                        } else {
                            this.$store.dispatch('changeBoo',{key:'passwordT',type:false}).then(() => {
                                this.$notify({
                                    title: '警告',
                                    message: '两次输入的密码不一致',
                                    type: 'warning'
                                });
                            });
                        }
                        break;
                }
            }
        }
    }
</script>