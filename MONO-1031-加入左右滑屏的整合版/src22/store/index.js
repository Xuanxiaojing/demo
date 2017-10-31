import Vue from 'vue'
import Vuex from 'vuex'

// 作为vue的插件使用 整个应用要取vuex中的状态
Vue.use(Vuex)


let store = new Vuex.Store({
  state: {
    smallCarList: [],
    dom:'',//音乐播放元素
    musicList:[{
      "name":"笑忘书",
      "img":"https://y.gtimg.cn/music/photo_new/T002R150x150M0000001WFLC3cqaQR.jpg?max_age=2592000",
      "songid":"14361",
      "singer":"王菲"
    }],//音乐列表
    playState:false//播放按钮状态
  },
  mutations: {
    // 每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler),这个回调函数就是我们实际进行状态更改的地方
    // 定义事件类型changeSmallCarList，绑定回调函数，回调函数不会立即执行，
    // 当触发一个类型为 changeSmallCarList 的 mutation 时，调用此函数
    changeMusicList (state, payload) { // 这个回调函数就是我们实际进行状态更改的地方
      // 把smallCarList改成什么？
      state.musicList = payload
    },
    sendAudio(state,obj){
      state.dom = obj;
      
    },
    pause(state){
        state.playState=false;
    },
    play(state){
        state.playState=true;
    }
  },
  actions:{
    sendAudio({commit,state},obj){//添加音乐播放元素，在App.vue里在模板编译完成后把audio元素发送给action
      console.log(obj,'222')
      commit('sendAudio',obj)
    },
    
    play({commit,state}){//播放音乐
      if(state.musicList.length!=0){
        if (state.playState==false){
          // state.dom.play();
          commit('play'); // 提交play类型的mutation
          state.musicPlace=state.musicList.length-1;
          // state.dom.src="http://ws.stream.qqmusic.qq.com/"+state.musicList[state.musicPlace].songid+".m4a?fromtag=46";
        }else {
          state.dom.pause();
          commit('pause')
        }
      }
    }
  }
})
export default store
