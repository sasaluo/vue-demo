<template>
  <div id="main">
    <!-- 路由出口 -->
    <!--<transition name="component-fade" mode="out-in">-->
      <router-view></router-view>
    <!--</transition>-->
    <!-- 路由匹配到的组件将渲染在这里 -->
  </div>
</template>

<script>
  export default {
    name: 'app'
  };
</script>

<style lang="less" rel="stylesheet/less" type="text/css">
  .component-fade-enter-active, .component-fade-leave-active {
    transition: opacity .3s ease;
  }
  .component-fade-enter, .component-fade-leave-to
    /* .component-fade-leave-active for <2.1.8 */ {
    opacity: 0;
  }
</style>