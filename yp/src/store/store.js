/**
 * Created by Administrator on 2016/12/22.
 */
import Vue from 'vue';
import Vuex from 'vuex';
import {Add} from './modules/Add.js';
import {Cart} from './modules/Cart.js';
import {Products} from './modules/products.js';
import {Check} from './modules/Check.js';
import {Good} from './modules/Good.js';
Vue.use(Vuex);
export const store = new Vuex.Store({
    modules:{
        Add:Add,
        Cart:Cart,
        Products:Products,
        Check:Check,
        Good
    }
});
