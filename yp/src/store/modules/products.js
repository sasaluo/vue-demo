/**
 * Created by Administrator on 2016/12/26.
 */
import shop from 'src/api/cart.js';
import * as types from '../mutation-type'
import {Cart} from './Cart.js';
export const Products = {
    state:{
        all:[]
    },

    getters:{
        allProducts: state => state.all,

        cartProducts: state => {
            return Cart.state.added.map(({id, quantity}) => {
                const product = state.all.find(p => p.id === id)
                return {
                    title:product.title,
                    price:product.price,
                    quantity
                }
            })
        }
    },

    actions:{
        getAllProducts({commit}) {
            shop.getProducts(products => {
                commit(types.RECEIVE_PRODUCTS, {products})
            })
        },

        addToCart({commit}, products) {
            if (products.inventory > 0) {
                commit(types.ADD_TO_CART, {
                    id: products.id
                })
            }
        }
    },

    mutations:{
        [types.RECEIVE_PRODUCTS] (state, {products} ) {
            state.all = products;
        },

        [types.ADD_TO_CART] (state, {id}) {
            state.all.find(p => p.id === id).inventory--
        }
    }
};