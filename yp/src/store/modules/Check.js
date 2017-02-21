/**
 * Created by Administrator on 2017/1/13.
 */
export const Check = {
    state:{
        type:0,
        url:'http://116.62.34.35:8080/ifd/index.php',
        slug:localStorage.slug,
        registerBoo:{
            phone:false,
            tel_code:false,
            code:false,
            password:false,
            passwordT:false
        }
    },

    mutations:{
        RenameType (state){
            state.type = 0;
        },

        ChangeType (state,type){
            state.type += type;
        },

        ChangeBoo (state,info) {
            state.registerBoo[info.key] = info.type;
        }
    },

    actions:{
        renameType:({commit}) => commit('RenameType'), //调用重置type的mutations重置type

        changeType({commit},type) {
            return new Promise((resolve, reject) => {
                commit('ChangeType',type);
                resolve();//这是回调函数
            })
        },

        changeBoo({commit},info) {
            return new Promise((resolve, reject) => {
                commit('ChangeBoo',{key:info.key,type:info.type}); //调用上面的mutations
                resolve();//这是回调函数
            })
        }
    }
};