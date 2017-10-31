import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
    state:{
        recommendList: []
    },
    mutations:{
        recommendListHandle(state,payload){
            // console.log(payload)
            state.recommendList = payload
        }
    }
})

export default store