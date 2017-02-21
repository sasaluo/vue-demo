<template>
    <div id="header_left">
		<router-link :to="{ path: '/home'}"><img class="logo" src="../../../public/images/logo_g.png"/></router-link>
    </div>
</template>

<script>
    export default {
        name: 'header_left'
    };
</script>

<style lang="less" rel="stylesheet/less" type="text/css">
    .logo{
        display: inline-block;
        vertical-align: middle;
    }
</style>