<template>
    <div id="slot" class="text-center">
        slot test
        <innerSlot>
            <div>Now I have something to talk.</div>
        </innerSlot>
        <childSlot>
            <template scope="props">
                <div>Hello from parent</div>
                <div>{{props.text}}</div>
            </template>
        </childSlot>
        <listSlot :items="items">
            <template slot="item" scope="props">
                <li class="my-fancy-item">{{ props.text }}</li>
            </template>
        </listSlot>
    </div>
</template>

<script>
    import innerSlot from './innerSlot.vue';
    import childSlot from './childSlot.vue';
    import listSlot from './listSlot.vue';
    export default {
        name:'slot',

        data() {
            return{
                items:[
                    {
                        _id:1,
                        text:'jack'
                    },
                    {
                        _id:2,
                        text:''
                    },
                    {
                        _id:3,
                        text:'tonny'
                    }
                ]
            }
        },

        components:{
            innerSlot:innerSlot,
            childSlot,
            listSlot
        }
    }

</script>

<style scoped lang="less"  rel="stylesheet/less" type="text/css">
    @import '../../public/css/variable.less';
    .text-center{
        padding:5vw;
        line-height: 5vw;
    }
</style>