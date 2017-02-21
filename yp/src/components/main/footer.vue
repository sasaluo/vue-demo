<template>
    <div id="footer">
        <el-row class="footer">
            <el-col :span="8">
                <div class="footer_item" @click="push('/?uid=' + uid)">
                    <img class="per_img" src="../../public/images/car/footer-icon-person.png" alt="">
                    <div>个人名片</div>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="footer_item" @click="push('/info')">
                    <img class="logo_img" src="../../public/images/car/footer-icon-logo.png" alt="">
                    <div>关于德熙</div>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="footer_item" @click="push('/hotCar')">
                    <img class="car_img" src="../../public/images/car/footer-icon-car.png" alt="">
                    <div>热推车型</div>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name:'footer',

        methods:{
            push(url) {
                this.$router.push(url);
            }
        },
        computed:{
            uid() {
                return this.$store.state.Check.slug;
            }
        }
    }
</script>
<style lang="less" rel="stylesheet/less" type="text/css">
	@import '../../public/css/mobile.less';
    .footer{
        .pozbottom;
        background: #fff;
        padding: @vw/4 @vw/2;
        width: 100%;
        z-index: 998;
        .footer_item{
            text-align: center;
            color: @blue;
            font-size:@vw - 2vw;
            img {
                width: @vw + 2vw;
                height:auto;
                margin-bottom:@vw/5;
            }
            .logo_img{
                margin-top: @vw/10;
            }
            .per_img{
                width: @vw + 1vw;
                margin-bottom: @vw/3;
                margin-top:@vw/5;
            }
            .car_img{
                width:@vw*2;
                margin-top:@vw/3;
                margin-bottom:@vw/4;
            }
        }
    }

</style>