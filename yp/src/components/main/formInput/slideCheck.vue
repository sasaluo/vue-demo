<template>
    <div class="wrap">
        <div id="slider">
            <div id="drag" class="drag_bg" @mousedown="touchStart($event)" @mouseout="leaveOut"></div>
            <div class="drag_text">拖动滑块验证</div>
            <div class="handler handler_bg"></div>
        </div>
    </div>
</template>
<script>
    import {Checks} from 'src/public/js/Verification';
    import { mapActions } from 'vuex'
    export default{
        name:'slideCheck',

        props:['boolean'],

        methods:{
            touchStart(e) {
                const _this = this;
                const drag = document.getElementById('drag');
                const slider = document.getElementById('slider');
                if (_this.boolean) {
                    this.$notify({
                        title: '成功',
                        message: '您已经通过验证，无需再次验证',
                        type: 'success'
                    });
                    drag.onmousedown = null;
                    return;
                }
                let startX = e.clientX - drag.offsetLeft;
//                console.log(startX);
                drag.onmousemove = e => {
//                    console.log(drag.offsetWidth);
//                    console.log({"clientX":e.clientX});
//                    console.log(this.getPoint(drag));
                    let endX = e.clientX - startX;
                    endX = endX <= 0 ? 0 : endX;
                    endX = endX >= slider.offsetWidth - drag.offsetWidth ? slider.offsetWidth - drag.offsetWidth : endX;
                    drag.style.left = endX + 'px';
                    if(drag.offsetLeft == 250) {
                        drag.onmousedown = null;
                        drag.onmousemove = null;
                        Checks.sleep().then(res => {
//                            console.log(res);
                            this.$store.dispatch('changeBoo',{key:'code',type:true}).then(() => {
                                this.$notify({
                                    title: '成功',
                                    message: '您已经通过验证',
                                    type: 'success'
                                });
                                slider.style.background = '#13CE66';
                                slider.style.color = '#fff';
                            });
                        });
                    }
                };
                drag.onmouseup = () => {
                    if(drag.offsetLeft < 250) {
                        this.$notify({
                            title: '警告',
                            message: '验证错误，请重新来过',
                            type: 'warning'
                        });
                        drag.style.left = '0';
                    }
                    drag.onmousedown = null;
                    drag.onmousemove = null;
                }
            },

            leaveOut() {
                const drag = document.getElementById('drag');
                drag.onmousedown = null;
                drag.onmousemove = null;
            },

            getPoint(obj) {
                let t = obj.offsetTop;
                let l = obj.offsetLeft;
                while (obj = obj.offsetParent) {
                    t += obj.offsetTop;
                    l += obj.offsetLeft;
                }
                return l;
            },

            ...mapActions([
                'changeBoo'
            ])
        }
    };

</script>

<style lang="less" rel="stylesheet/less" type="text/css">
    .wrap{
        width: 100%;
        height:auto;
        border-radius: 10px;
        #slider{
            overflow: hidden;
            background: #cccccc;
            position: relative;
            padding: 1px;
            div{
                float: left;
            }
            .drag_bg{
                background: #fff;
                width: 20%;
                height: 100%;
                border:1px solid #ccc;
                cursor: pointer;
                position: absolute;
                left: 0;
                top:0;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
            }
            .drag_text{
                float: right;
                padding-right: 50px;
            }
        }
    }
</style>