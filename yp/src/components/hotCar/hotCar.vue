<template>
    <div id="infoCard">
        <div class="card_detail">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(item,index) in img">
                        <!--<router-link :to="item.link"><img :src="item.img" alt=""></router-link>-->
                        <img :src="item.img" alt="">
                    </div>
                </div>
            </div>
            <div class="card-blue">
                <div class="card-blue-left">
                    <div>厂家指导价格：￥<s>50.5万</s></div>
                    <div>优惠价格：<span>￥49.2万</span></div>
                </div>
                <div class="card-blue-right">
                    了解更多详情
                </div>
            </div>
        </div>
        <mainFooter></mainFooter>
    </div>
</template>

<script>
    import * as main from '../main/main';
    import Swiper from 'swiper';
    import 'swiper/dist/css/swiper.min.css';
    export default {
        name:'hotCard',

        data() {
            return{
                img:[

                ]
            }
        },

        components:{
            mainFooter:main.footer
        },

        mounted () {
            let mySwiper = new Swiper('.swiper-container', {
                autoplay: 3000,//可选选项，自动滑动
                loop:true,
                pagination : '.swiper-pagination',
                observer: true,//修改swiper自己或子元素时，自动初始化swiper
                observeParents: true//修改swiper的父元素时，自动初始化swiper
            })
        },

        created() {
            //展示
            let _this = this;
            this.axios.get('http://vw.hnwcl.com/public/api/get_img',{
                params:{
                    type:2
                }
            }).then(resultData => {
                const data = resultData.data;
                _this.img = data;
            }).catch(err => {
                this.$notify({
                    title: '警告',
                    message: '网络出错了~再试试吧~',
                    type: 'warning'
                });
            });
        }
    }
</script>

<style lang="less" rel="stylesheet/less" type="text/css">
    @import '../../public/css/mobile.less';
    body{
        background: #F1F1F1;
    }
    .card_detail{
        position:relative;
        img{
            .img-res;
        }
        .card-blue{
            background: rgba(37,104,174,.8);
            padding:@vw/3;
            position:absolute;
            bottom: 0;
            left:0;
            z-index: 233;
            width:100%;
            color:#fff;
            .card-float{
                width:50%;
                float:left;
                text-align: left;
                padding:0 @vw/2;
                line-height:@vw;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
                font-size:@vw/2;
            }
            &-left{
                border-right:1px solid #fff;
                .card-float;
                div:nth-child(1){
                    color:rgba(255,255,255,.8);
                }
                div:nth-child(2) {
                    span{
                        font-size:@vw;
                    }
                }
            }
            &-right{
                .card-float;
                text-align: center;
                line-height:@vw*2 + 1vw;
                font-size:@vw - 1vw;
            }
        }
    }
</style>