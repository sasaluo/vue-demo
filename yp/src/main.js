import Vue from 'vue';
import App from './app';

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import 'reset.css' //这个就是初始化 这里可以引入你的公共css 一般是框架
import axios from 'axios'
import VueAxios from 'vue-axios'
import {router} from  './router.js'
import {store} from 'src/store/store';
import {currency} from './currency';
import {phoneBy} from './filters/phoneBy';
import VueLazyload from 'vue-lazyload';
import toast from './components/main/toast/toast.vue';
import './wx';
// console.log(router);
Vue.filter('currency', currency);
Vue.filter('phoneBy', phoneBy);
Vue.use(ElementUI);
Vue.use(VueAxios, axios);
Vue.use(VueLazyload, {
    error: 'dist/error.png',
    loading: 'dist/loading.gif',
    try: 3 // default 1
});
Vue.component('toast', toast);
new Vue({ // eslint-disable-line
  el: '#app',
    router,
    store,
  render: h => h(App)
}).$mount('#main');
