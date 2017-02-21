<template>
    <div id="header_right">
        <div class="head_nav">
			<router-link :class="{'selected':$route.path == '/home'}" to="/home"><i class="iconfont">&#xe622;</i>首页</router-link>
			<router-link :class="{'selected':$route.name == 'assets'}" to="/assets"><i class="iconfont">&#xe622;</i>资产</router-link>
			<router-link :class="{'selected':$route.path == '/info/newslist' || $route.path == '/info/help' }" to="/info/newslist"><i class="iconfont">&#xe622;</i>资讯</router-link>
			<!--判断路由为登陆或者注册的时候绑定样式，上下同理-->
			<!--此处应该是一个动态url 根据用户是否登陆 那我们用一个参数-->
			<!--判断路由名字为form时，添加selectedy样式-->
			<router-link :class="{'selected':$route.name == 'form'}" :to="url"><i class="iconfont">&#xe622;</i>我的</router-link>
			<router-link :class="{'selected':$route.path == '/about/culture'}" to="/about/culture"><i class="iconfont">&#xe622;</i>关于我们</router-link>
		</div>
    </div>
</template>

<script>
    export default {
        name:'header_right',

		data(){
            return {
                url:localStorage.slug == undefined ? '/form/login' : 'my' //判断登陆后存储的用户凭证是否存在 这里是简单的验证
			}
		},

		created() {
		//	alert(this.$route.name);
        //    console.log(this.$route.params.bookId); //打印routers属性来看看有什么值可以让我们来进行判断，发现只有一个path参数，先用复杂的方法实现
			
		}
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
        .head_nav{
            float: right;
            height: 90px;
            .fonts(18px);
            a{
                padding: 0 30px 0 0;
                color: @cw;
                i{ 
                    opacity: 0; 
                    color: @cgolden; 
                    padding-right: 10px;
                }
                &:before{
                    content: '';
                    padding: 0 50px 0 0;
                    background: url(../../../public/images/line_deg.png) no-repeat ;
                }
                &:first-child{
                    &:before{
                        content: '';
                        background: none;
                    }
                }
                &:last-child{ padding: 0; }
                &:hover,&.selected{
                    color: @cgolden !important;
                    i{ opacity: 1; }
                }
            }
            &.head_nav_g{
                a{ color: #6c6e72; }
            }
        }
    }
</style>