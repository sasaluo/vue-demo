<template>
    <span>{{details}}</span>
</template>
<script>
    export default {
        name: 'test',

        props: ['msg'],

        data() {
            return {
                detail: this.msg
            }
        },

        computed: {
            details() {
                return this.msg
            }
        }
    }
</script>