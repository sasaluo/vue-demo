import axios from 'axios';
import wx from 'weixin-js-sdk';
axios.get('http://vw.hnwcl.com/public/api/js?url=' + window.location.href).then(resultData => {
    wx.config(resultData.data);
}).catch(err => {
    console.log(err);
});

setTimeout(function() {
    wx.ready(function () {
        let config = {
            title: localStorage.name + '的名片', // 分享标题
            desc: localStorage.job, //分享描述
            link: 'http://vw.hnwcl.com/dist/#/?uid=' + localStorage._uid, // 分享链接
            imgUrl: localStorage.share_img, // 分享图标
            success: function () {
                // 用户确认分享后执行的回调函数
                alert('谢谢亲的配合！您已分享成功');
                //                    window.open('https://www.baidu.com/','_self');
            },
            cancel: function () {
                // 用户取消分享后执行的回调函数
                alert('您取消了分享，宝宝不开心~');
            }
        };
        wx.onMenuShareTimeline(config);
        wx.onMenuShareAppMessage(config);
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后
        // ，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，
        // 则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，
        // 则可以直接调用，不需要放在ready函数中。
    });
},1000);