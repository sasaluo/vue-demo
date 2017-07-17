<template>

    <transition
            enter-active-class="animated flipInX"
            leave-active-class="animated fadeOutUp">
        <div class="mb" v-show="boolean == 1">
            <div class="wrap">
                <div id="slider" class="slider" :class="{'handler-success':ifTouch}">
                    <div id="drag" class="drag_bg"></div>
                    <div class="drag_text" :class="{'text-success':ifTouch}">拖动滑块验证</div>
                    <div class="handler handler_bg"></div>
                </div>
                <div class="drag-alert">请通过滑块验证</div>
            </div>
        </div>
    </transition>
</template>
<script>
    import {Checks} from 'src/public/js/Verification';
    import 'animate.css';
    export default{
        name:'slideCheck',

        props:['boolean'],

        data() {
            return {
                ifTouch:false
            }
        },

        methods:{

        },

        created() {

        },

        mounted() {
            const _this = this;
            const drag = document.getElementById('drag');
            const slider = document.getElementById('slider');
            drag.addEventListener('touchstart', function(e) {
                e.preventDefault();
                let touch = e.touches[0];
                let startX = touch.clientX - drag.offsetLeft;
                drag.addEventListener('touchmove', function(e) {
                    e.preventDefault();
                    let touch = e.touches[0];
                    let endX = touch.clientX - startX;
                    endX = endX <= 0 ? 0 : endX;
                    endX = endX >= slider.offsetWidth - drag.offsetWidth ? slider.offsetWidth - drag.offsetWidth : endX;
                    drag.style.left = endX + 'px';
                    if (endX == slider.offsetWidth - drag.offsetWidth) {
                        if (!_this.ifTouch) {
                            _this.$emit('propMethods');
                            _this.ifTouch = true;
                            setTimeout(() => {
                                _this.ifTouch = false;
                                drag.style.left = 0;
                            },2000)
                        }
                    }
                }, false);
                drag.addEventListener('touchend', function(e) {

                }, false);
            }, false);
        }
    };

</script>

<style lang="less" rel="stylesheet/less" type="text/css">
    @import '../../../public/css/variable.less';
    .wrap{
        position: fixed;
        left: 50%;
        top:50%;
        width: 80%;
        height:@rem * 10;
        border-radius: 10px;
        .translates;
        .slider{
            overflow: hidden;
            height: 100%;
            background: #cccccc;
            position: relative;
            padding: 1px;
            -webkit-border-radius:.5rem;
            -moz-border-radius:.5rem;
            border-radius:.5rem;
            div{
                float: left;
            }
            .drag_bg{
                background: #fff;
                width: 20%;
                height: 100%;
                -webkit-border-radius:.5rem;
                -moz-border-radius:.5rem;
                border-radius:.5rem;
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
                font-size:.3rem;
                padding-top: @rem * 2.5;
            }
            .text-success {
                color: #fff;
            }
        }
        .handler-success{
            background: #4cd964;
        }
        .drag-alert{
            text-align: center;
            color: #fff;
            margin-top: .2rem;
            font-size:.4rem;
        }
    }
</style>