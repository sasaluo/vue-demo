/**
 * Created by Administrator on 2016/12/26.
 */
import shop from 'src/api/cart.js';
import * as types from '../mutation-type'
export const Cart = {
    state:{
        added:[],
        checkoutStatus:null
    },

    getters:{
        checkoutStatus:state => state.checkoutStatus
    },

    actions:{
        checkout ({dispatch,commit,state}, products) {
            const saveCartItems = [...state.added];
            commit(types.CHECKOUT_REQUEST)
            shop.buyProducts(
                products,
                () => commit(types.CHECKOUT_SUCCESS),
                () => commit(types.CHECKOUT_FAILURE, {saveCartItems})
            )
        }
    },

    mutations:{
        [types.ADD_TO_CART] (state, {id}) {
            state.lastCheckout = null;
            const record = state.added.find(p => p.id === id);
            if (!record) {
                state.added.push({
                    id,
                    quantity: 1
                })
            } else {
                record.quantity++;
            }
        },

        [types.CHECKOUT_REQUEST] (state) {
            state.added = [];
            state.checkStatus = null;
        },

        [types.CHECKOUT_SUCCESS] (state) {
            state.checkoutStatus = 'successful';
        },

        [types.CHECKOUT_FAILURE] (state, {savedCartItems}) {
            state.added = savedCartItems;
            state.checkoutStatus = 'failed';
        }
    }
};