<template>
    <div id="infoItem">
        <div class="infoItem-content">
            <div class="info-item-title">
                {{title}}
            </div>
            <div class="info-item-border"></div>

            <div class="swiper-container">
                <div class="swiper-wrapper info-item-content">
                    <div class="swiper-slide info-item-content-item" v-for="(item,index) in img">
                        <img :src="'/static/images/car/' +  item.img" alt="">
                        <div>{{item.title}}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Swiper from 'swiper';
    import 'swiper/dist/css/swiper.min.css';
    export default {
        name:'infoItem',

        props:['img','title'],

        data() {
            return{

            }
        },

        components:{

        },

        mounted () {
            let mySwiper = new Swiper('.swiper-container', {
                autoplay: 3000,//可选选项，自动滑动
                autoplayDisableOnInteraction : false,
                slidesPerView :2,
                slidesOffsetBefore :280,
                centeredSlides : true,
                loop:true,
                pagination : '.swiper-pagination',
                observer: true,//修改swiper自己或子元素时，自动初始化swiper
                observeParents: true//修改swiper的父元素时，自动初始化swiper
            })
        }
    }
</script>

<style lang="less" rel="stylesheet/less" type="text/css">
    @import '../../../public/css/mobile.less';
    .infoItem-content{
        margin-top: @vw;
        text-align: center;
        .info-item-title{
            color: @blue;
            padding-bottom: @vw/2;
            width: @vw * 4;
            margin:0 auto;
        }
        .info-item-border{
            width:@vw;
            margin:0 auto;
            border-bottom: 3px solid @blue;
        }
        .info-item-content{
            margin-top:@vw/2;
            &-item{
                float:left;
                background:#fff;
                width: @vw * 8;
                margin-right:@vw/2;
                img{
                    .img-res;
                }
                div{
                    padding:@vw + 2vw @vw;
                    color:@color;
                    font-size:@vw - 2vw;
                }
            }
        }
    }
</style>