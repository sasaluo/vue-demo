/**
 * Created by Administrator on 2017/1/13.
 */
export const Good = {
    state:{
        time:0,
        msg:''
    },

    mutations:{
        ClearToast (state){
            state.time = 0;
        },

        ShowToast (state,msg){
            state.msg = msg;
            state.time += 3;
        }
    },

    actions:{
        clearToast:({commit}) => commit('ClearToast'),

        showToast({commit},msg) {
            return new Promise((resolve, reject) => {
                commit('ShowToast',msg);
                let i = 0;
                let times = setInterval(() => {
                    if (i >= 3) {
                        clearInterval(times);
                        commit('ClearToast');
                    }
                    i++;
                },1000);
                resolve();
            })
        }
    }
};