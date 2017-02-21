<template>
    <div id="myInfo">
        <div class="info_title">
            <img class="background" src="../../public/images/car/title.png" alt="">
            <div class="mb"></div>
            <el-row>
                <el-col :span="22" :offset="1">
                    <el-row class="title_main">
                        <el-col :span="24" class="title-logo">
                            <img src="../../public/images/car/personLogo.png" alt="">
                        </el-col>
                        <el-col :span="24" class="title-title">
                            {{detail.title}}
                        </el-col>
                        <el-col :span="24" class="title-content" :class="{'title-all':if_show}">
                            {{content}}
                        </el-col>
                        <el-col :span="24" class="title-see" v-show="!if_show">
                            <div @click="showDetail()">
                                <img src="../../public/images/car/bottom.png" alt="">
                                查看全文
                            </div>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </div>
        <div class="info-item">
            <infoItem :img="info.img" :title="info.title"></infoItem>
        </div>
        <div class="info-item">
            <infoItem :img="show.img" :title="show.title"></infoItem>
        </div>
        <div class="info-bottom">
            <div>地址：{{infoMsg.address}}<span @click="openLocation">【导航】</span></div>
            <div>销售热线：<a :href="'tel:' + infoMsg.tel | phoneBy(0)">{{infoMsg.tel | phoneBy(0)}}</a>转<a :href="'tel:' + infoMsg.tel | phoneBy(1)">{{infoMsg.tel | phoneBy(1)}}</a></div>
            <div>售后热线：<a :href="'tel:' + infoMsg.service_tel | phoneBy(0)">{{infoMsg.service_tel | phoneBy(0)}}</a>转<a :href="'tel:' + infoMsg.service_tel | phoneBy(1)">{{infoMsg.service_tel | phoneBy(1)}}</a></div>
            <div>救援电话：<a :href="'tel:' + infoMsg.rescue_tel">{{infoMsg.rescue_tel}}</a></div>
        </div>
        <mainFooter></mainFooter>
    </div>
</template>

<script>
    import * as main from '../main/main';
    import * as info from './infoItem/main';
    import wx from 'weixin-js-sdk';
    export default {
        name:'myInfo',

        data() {
            return{
                if_show:false,

                detail:{
                    title:'湖南德熙进口汽车销售服务有限公司',
                    content:'湖南德熙进口汽车销售服务有限公司成立于2010年10月27日，公司类型为有限责任公司，公司注册资金1000万元。系经大众进口汽车销售有限公司特别批准许可的大众品牌进口汽车中国特约经销商之一，是集整车销售、售后维修服务、配件供应、信息反馈四位一体的现代化、标准化的进口汽车4S店。2013年，随着公司规模的不断扩大，成立了湖南德熙旗舰店，地址位于长沙市星沙中南汽车世界B1区-03号。现有员工160余人，其中：管理人员近40人，各类专业技术人员10余人，均具有大专以上文化程度。遵循“重合同、守信誉”的原则，依托强大的进口品牌优势保持发展后劲，奉行以“诚信为本、铸就品牌，优质服务、赢得市场”的经营理念来经营企业。'
                },

                infoMsg:{},

                info:{
                    title:'展厅介绍',
                    img:[
                        {
                            title:"这里是展示厅的介绍",
                            img:'car-1.png',
                        },
                        {
                            title:"这里是展示厅的内容",
                            img:'car-2.png',
                        },
                        {
                            title:"这里是展示厅的介绍",
                            img:'car-1.png',
                        },
                        {
                            title:"这里是展示厅的内容",
                            img:'car-2.png',
                        },
                        {
                            title:"这里是展示厅的介绍",
                            img:'car-1.png',
                        },
                        {
                            title:"这里是展示厅的内容",
                            img:'car-2.png',
                        },
                        {
                            title:"这里是展示厅的介绍",
                            img:'car-1.png',
                        },
                        {
                            title:"这里是展示厅的内容",
                            img:'car-2.png',
                        }
                    ]
                },

                show:{
                    title:'车间展示',
                    img:[
                        {
                            title:"这里是展示厅的介绍",
                            img:'car-1.png',
                        },
                        {
                            title:"这里是展示厅的内容",
                            img:'car-2.png',
                        },
                        {
                            title:"这里是展示厅的介绍",
                            img:'car-1.png',
                        },
                        {
                            title:"这里是展示厅的内容",
                            img:'car-2.png',
                        },
                        {
                            title:"这里是展示厅的介绍",
                            img:'car-1.png',
                        },
                        {
                            title:"这里是展示厅的内容",
                            img:'car-2.png',
                        },
                        {
                            title:"这里是展示厅的介绍",
                            img:'car-1.png',
                        },
                        {
                            title:"这里是展示厅的内容",
                            img:'car-2.png',
                        }
                    ]
                }
            }
        },

        computed: {
          content() {
              return this.if_show ? this.detail.content : this.detail.content.substr(0,120) + '...';
          }
        },
        components:{
            mainFooter:main.footer,
            infoItem:info.infoItem
        },

        methods:{
            showDetail() {
                this.if_show = true;
            },

            openLocation() {
                wx.openLocation({
                    latitude: 28.240225, // 纬度，浮点数，范围为90 ~ -90
                    longitude: 113.065604, // 经度，浮点数，范围为180 ~ -180。
                    name: '湖南长沙中南汽车世界b区03号', // 位置名
                    address: '', // 地址详情说明
                    scale: 10, // 地图缩放级别,整形值,范围从1~28。默认为最大
                    infoUrl: '' // 在查看位置界面底部显示的超链接,可点击跳转
                });
            }
        },

        created() {
            let _this = this;
            //基本信息
            this.axios.get('http://vw.hnwcl.com/public/api/get_config',{
                params:{

                }
            }).then(resultData => {
                const data = resultData.data;
                _this.infoMsg = data;
            }).catch(err => {
                this.$notify({
                    title: '警告',
                    message: '网络出错了~再试试吧~',
                    type: 'warning'
                });
            });
            //展厅
            this.axios.get('http://vw.hnwcl.com/public/api/get_img',{
                params:{
                    type:0
                }
            }).then(resultData => {
                const data = resultData.data;
                _this.info = data;
                _this.info.title = '展厅介绍';
            }).catch(err => {
                this.$notify({
                    title: '警告',
                    message: '网络出错了~再试试吧~',
                    type: 'warning'
                });
            });
            //展示
            this.axios.get('http://vw.hnwcl.com/public/api/get_img',{
                params:{
                    type:1
                }
            }).then(resultData => {
                const data = resultData.data;
                _this.show = data;
                _this.show.title = '车间展示';
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
        background: #fff;
    }
    .info_title{
        position:relative;
        height:@vw * 17;
        .mb{
            height:100%;
        }
        .title_main{
            margin-top:@vw/2;
            color: #fff;
            .title-logo{
                img {
                    width:@vw * 2 - 2vw;
                    height:auto;
                }
            }
            .title-title{
                text-align: center;
                font-size:@vw;
                /*font-weight:bold;*/
                margin-bottom:@vw;
                margin-top:@vw;
            }
            .title-content{
                color:rgba(255,255,255,.8);
                line-height:@vw;
                height: @vw * 6;
                overflow: auto;
            }
            .title-all{
                height:@vw * 10;
            }
            .title-see{
                text-align: center;
                margin-top: @vw;
                img{
                    vertical-align: middle;
                    .img-res(@vw)
                }
            }
        }
    }

    .info-bottom{
        padding: @vw*2 - 3vw 0 @vw/2 - 1vw 0;
        div{
            margin-bottom:@vw/2;
            text-indent:1em;
            span{
                color:@blue;
            }
            a{
                color:@blue;
            }
        }
    }
</style>