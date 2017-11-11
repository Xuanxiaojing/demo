import Vue from 'vue'
import Vuex from 'vuex'

// 作为vue的插件使用 整个应用要取vuex中的状态
Vue.use(Vuex)

/* let store = new Vuex.Store({
  state: {
    shopListData: {
      list: []
    }
  },
  mutations: {
    fn1(){
      
    }
  }
}) */

let store = new Vuex.Store({
  state: {
    smallCarList: []
  },
  mutations: {
    // 每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler),这个回调函数就是我们实际进行状态更改的地方
    // 定义事件类型changeSmallCarList，绑定回调函数，回调函数不会立即执行，
    // 当触发一个类型为 changeSmallCarList 的 mutation 时，调用此函数
    changeSmallCarList (state, payload) { // 这个回调函数就是我们实际进行状态更改的地方
      // 把smallCarList改成什么？
      state.smallCarList = payload.car_list
    }
  }
})
export default store
