<template>
    <div id="header">
        <div class="header">
			<div class="head_top">
				<el-row class="head_row">
				  <el-col :span="8">
				  	<div class="grid-content bg-purple">
				  		<a href=""><i class="iconfont">&#xe602;</i>官方微信</a>
						<a href=""><i class="iconfont">&#xe601;</i>官方微博</a>
						<a href=""><i class="iconfont">&#xe623;</i>在线客服</a>
				  	</div>
				  </el-col>
				  <el-col :span="8"><div class="grid-content bg-purple-light">&nbsp;</div></el-col>
				  <el-col :span="8" class="grid_col">
				  	<div class="grid-content bg-purple">
				  		<b><i class="iconfont">&#xe616;</i>400-816-2283</b>
						<router-link :to="{ path: '/form/login'}">登录</router-link>
						<router-link :to="{ path: '/form/register'}">立即注册</router-link>
				  	</div>
				  </el-col>
				</el-row>
			</div>
			<div class="head_wrap">
				<template v-if=" $route.name == 'form' ">
					<header-right-return></header-right-return>
					<header-left></header-left>
				</template>
				<template v-if="$route.name == 'assets'">
					<header-right></header-right>
					<header-left-golden></header-left-golden>
				</template>
				
				<template v-else>
					<header-right></header-right>
					<header-left></header-left>
				</template>
			</div>
		</div>
    </div>
</template>

<script>
    import * as IFEHEAD from './header/main';
    export default {
        name:'header',
        components:{
        	headerLeft:IFEHEAD.headerLeftW,
            headerLeftGolden:IFEHEAD.headerLeftG,
            headerRight:IFEHEAD.headerRight,
            headerRightReturn:IFEHEAD.headerRightR
        },
        created() {
            name = this.$route.name;
         //   alert(name);
            return name;
		}
		
    };
</script>

<style lang="less" rel="stylesheet/less" type="text/css">
	@import '../../public/css/normalize.less'; 
	@import '../../public/css/variable.less'; 
    .header{
	    position: relative;
	    .cf();
	    color: @cw;
	    box-sizing: border-box;
	    border-bottom: 1px solid #a7b4c5;
	    .head_top{
	        .cf();
	        background: #191f25;
	        .fonts(12px);
	        line-height: 40px;
	        .head_row{
	        	width: 1200px;
	            margin: 0 auto;
	        }
	        .grid_col{
	        	text-align: right;
	        }
	        a{
	            color: @cw;
	            padding: 0 30px 0 0;
	            i{ 
	                display: inline-block; 
	                padding-right: 5px; 
	                vertical-align: middle;
	            }
	            &:hover{
	                color: @cgolden;
	            }
	        }
	         b{
                .fonts(16px);
                color: @cgolden;
                padding-right: 20px;
                vertical-align: middle;
                i{
                    font-weight: normal;
                    padding-right: 5px;
                    .fonts(18px);
                    color: #585043;
                }
            }
	    }
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
	}
	.el-form-item {
    	margin-bottom: 12px;
	}
</style>