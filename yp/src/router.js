import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

//1.定义（路由）组件
import NotFound from 'src/components/NotFound/NotFound';
import * as login from 'src/components/form/item/main.js';

const form = r => {
    require(['src/components/form/form.vue'], r)
};

const routes = [
    {path:'/',redirect: '/form/to/login'},
    {
        path:'/form/:id',
        component:form,
        name:'form',
        children:[
            {
                path:'login',
                component:login.login
            },
            {
                path:'register',
                component:login.register
            },
            {
                path:'setPassword',
                component:login.setPassword
            },
            {
                path:'setCode',
                component:login.setCode
            }
        ]
    },
  { path: '*', component: NotFound }
];
import { Loading } from 'element-ui';
export const router = new VueRouter({
  // mode: 'history',
  routes // （缩写）相当于 routes: routes
});

router.beforeEach((to, from, next) => {
    let loadingInstance = Loading.service({ fullscreen: true });
    next();
});
router.afterEach(route => {
    let loadingInstance = Loading.service({ fullscreen: true });
    setTimeout(()=>{
        loadingInstance.close();
    },50)
});