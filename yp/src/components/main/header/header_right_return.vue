<template>
    <div id="header_right">
	    <a class="return_index" v-link="{ path: '/home' }">返回首页<em>></em></a>
    </div>
</template>

<script>
    export default {
        name:'header_right'
    };
</script>

<style lang="less" rel="stylesheet/less" type="text/css">
	@import '../../../public/css/variable.less'; 
	.head_wrap{
        .cf();
        width: 1200px;
        margin: 0 auto;
        line-height: 90px;
        height: 90px;
        .return_index{
            float: right;
            color: @cw;
            height: 90px;
            .fonts(18px);
            em{ 
                .fonts(19px); 
                padding-left: 6px; 
                font-family: "宋体";
            }
            &:hover{ color: @cgolden; }
        }
    }
</style>