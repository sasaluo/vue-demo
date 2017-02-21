<template>
    <div id="infoCard">
        <div class="card_detail">
            <img class="background" src="../../public/images/car/back.png" alt="">
            <el-row>
                <el-col :span="20" :offset="2" v-loading="loading">
                    <el-row>
                        <el-col :span="24" class="info-card">
                            <div>
                                <img class="background" src="../../public/images/car/info.png" alt="">
                                <div class="info-card-details">
                                    <div class="info-card-details-logo">
                                        <img src="../../public/images/car/personLogo.png" alt="">
                                        <div>湖南德熙进口大众</div>
                                    </div>
                                    <div class="info-card-details-info">
                                        <img :src="info.avatar" alt="">
                                    </div>
                                    <div class="info-card-details-content">
                                        <div>姓名：{{info.name}}</div>
                                        <div>职位：{{info.job}}</div>
                                        <div>电话：<a :href="'tel:' + info.mobile">{{info.mobile}}</a></div>
                                        <div>个性签名：</div>
                                        <div>{{info.signature}}</div>
                                    </div>
                                    <div class="info-card-details-qrcode">
                                        <img :src="info.img" alt="">
                                        <div>长按添加微信</div>
                                    </div>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>
        <mainFooter></mainFooter>
    </div>
</template>

<script>
    import * as main from '../main/main';
    export default {
        name:'myInfo',

        data() {
            return{
                info:{},
                loading:true
            }
        },

        components:{
            mainFooter:main.footer
        },

        created() {
            let _this = this;
            this.$store.state.Check.slug = _this.$route.query.uid;
            localStorage._uid = this.$route.query.uid;
            this.axios.get('http://vw.hnwcl.com/public/api/get_user',{
                params:{
                    uid:_this.$route.query.uid
                }
            }).then(resultData => {
                const data = resultData.data;
                _this.info = data;
                _this.loading = false;
                localStorage.name = data.name;
                localStorage.tel = data.mobile;
                localStorage.share_img = data.avatar;
                localStorage.job = data.job;
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
    .card_detail{
        position:relative;
        .info-card{
            position:relative;
            height: @vw * 25;
            &-details{
                color:@blue;
                &-logo{
                    .translate(80%,22%);
                    text-align: center;
                    width: @vw * 6;
                    img{
                        width:@vw*2;
                        height:auto;
                        margin-bottom:@vw/3;
                    }
                    div{
                        font-size:@vw - 2vw;
                        font-weight:bold;
                        color:@color;
                    }
                }
                &-info{
                    .translate(50%,47%);
                    img{
                        .img-res(@vw*11 + 3vw)
                    }
                }
                &-content{
                    .translate(35%,85%);
                    color:@blue;
                    div{
                        margin-bottom:@vw/2;
                    }
                }
                &-qrcode{
                    .translate(85%,83%);
                    text-align: center;
                    img{
                        .img-res(@vw*4)
                    }
                    div{
                        font-size:@vw/2;
                        color:@color;
                    }
                }
            }
        }
    }
</style>