/**
 * Created by Administrator on 2016/12/23.
 */
export const Add = {
    state:{
        count:0
    },

    mutations:{
        increment (state){
            state.count++;
        },

        decrement (state){
            state.count--;
        }
    },

    actions:{
        increment:({commit}) => commit('increment'),

        decrement:({commit}) => commit('decrement'),

        incrementIfOdd({commit,state}) {
            if ((state.count + 1) % 2 === 0) {
                commit('increment');
            }
        },

        incrementAsync({commit}) {
            return new Promise((resolve, reject) => {
                    setTimeout(() => {
                        commit('increment');
                        resolve();
                    },1000)
                }
            )
        }
    },

    getters: {
        evenOrOdd: state => state.count % 2 === 0 ? 'even' : 'odd'
    }
};