import Vue from 'vue'
import Vuex from 'vuex'

// 作为vue的插件使用 整个应用要取vuex中的状态
Vue.use(Vuex)


let store = new Vuex.Store({
  state: {
    // recommendListData:[],
    listdata: [], // 下拉更新数据存放数组
    downdata: [],  // 上拉更多的数据存放数组
    dom:'', //音乐播放元素
    btnDom:'', // 当前小播放条的播放按钮
    progressDom:'', // 当前小播放条的进度条元素
    progerssWidth:0, // 当前小播放条的进度条的宽度，大播放条的进度条宽度和这个保持一致
    musicList:[/* {
      "name":"笑忘书",
      "img":"https://y.gtimg.cn/music/photo_new/T002R150x150M0000001WFLC3cqaQR.jpg?max_age=2592000",
      "songid":"14361",
      "singer":"王菲"
    } */], //音乐列表
    AllMusicList:[], // 所有音乐
    playState:false, //播放按钮状态
    mPlayerScreen:false, // 控制音乐播放器页的显示和隐藏，true显示，false隐藏
    currentTime:0,//音乐播放进度
    // duration:0,//音乐长度
    listState:false,//播放列表状态
    isLoadingShow:false,//是否显示loading
		musicDuration: 0,	// 音乐的总播放时长
    currentMusicIndex: 0, // 当前音乐的index索引
    latalyListShow:false // 控制播放列表的显示和隐藏
  },
  getters: {
		// 获取当前的播放进度
		getCurrentTime: state => state.currentTime,
		// 获取音乐的播放时长
		getMusicDuration: state => state.musicDuration,
		// 音乐开始加载
    getIsLoadStart: state => state.musicLoadStart,
    
    getProgerssWidth: state => state.progerssWidth,
    // 当前音乐的详细信息，在播放列表里通过当前音乐的下标获取
    getCurrentMusic: state => state.musicList[state.currentMusicIndex]
	},
  mutations: {
    // 每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler),这个回调函数就是我们实际进行状态更改的地方
    // 定义事件类型changeMusicList，绑定回调函数，回调函数不会立即执行，
    // 当触发一个类型为 changeMusicList 的 mutation 时，调用此函数
    changeMusicList (state, payload) { // 这个回调函数就是我们实际进行状态更改的地方
      // 把musicList改成什么？
      state.musicList = payload
    },
    changeListData(state,payload){
      console.log('我变了：',payload)
      state.listdata = payload;
      state.listdata.forEach((item,index)=>{
        item.isPlay = false;
      }) // 给每条数据加一个isPlay状态，控制音乐的播放和暂停
    },
    changeListIsplay(state,payload){
      state.listdata[payload.index].isPlay = payload.isPlay;
    },
    changeDownData(state,payload){
      // console.log(payload.index,'downdata的payload.index')
      state.downdata.push(payload);
      state.downdata.forEach((item,index)=>{
        item.isPlay = false;
      }) // 给每条数据加一个isPlay状态，控制音乐的播放和暂停
      // state.recommendListData = state.listdata.concat(state.downdata);
      // console.log(state.recommendListData,'recommendListData');
    },
    changeDownIsplay(state,payload){
      state.downdata[payload.index].isPlay = payload.isPlay;
    },
    sendAudio(state,obj){
      state.dom = obj;      
    },
    pause(state){
      state.playState=false;
      state.dom.pause();
      state.btnDom.classList.remove('fa-pause')
      state.btnDom.classList.add('fa-play');
      
      // state.progressDom.style.width = `calc(${(this.getters.getCurrentTime / this.getters.getMusicDuration * 100).toFixed(2)}%`      
    },
    play(state){
      state.playState=true;
      state.dom.play()
      state.btnDom.classList.remove('fa-play')
      state.btnDom.classList.add('fa-pause');
      console.log(`calc(${(this.getters.getCurrentTime / this.getters.getMusicDuration * 100).toFixed(2)}%)`,'000000000000');
      
      
      // console.log(`calc(${(this.getters.getCurrentTime / this.getters.getMusicDuration * 100).toFixed(2)}%`,'state.progressDom')
    },
    setMPlayerScreen(state,flag){
      state.mPlayerScreen = flag;
    },
    setLatalyListShow(state,flag){
      state.latalyListShow = flag;
    },
    sendAdio(state,obj){
      console.log(obj,'ooooo')
      state.dom = obj;
    },
    sendPlayBtn(state,obj){
      state.btnDom = obj;
    },
    // 进度条元素
    sendProgressDom(state,obj){
      state.progressDom = obj;
    },
    sendMusic(state,obj){
      // console.log(state.musicList.includes(state.musicList[state.musicIndex]),'hhhhhhhhahah')
      if(state.musicList.includes(obj)) return; // 如果播放列表里已经有这首歌，就不再往musicList里重复push
      state.musicList.push(obj);
      state.currentMusicIndex=state.musicList.length-1;
      // state.dom.src=state.musicList[state.currentMusicIndex];
      state.dom.src= 'http://'+ state.musicList[state.currentMusicIndex];
      console.log( state.dom.src,' state.dom.src')
    },
    setMusicDuration (state, obj) {
      state.musicDuration = obj.duration
    },
    // 设置音乐是否正在加载
		setMusicLoadStart (state, obj) {
      state.musicLoadStart = obj.isloadstart
      // console.log(state.musicLoadStart,'llll')
    },
    setCurrentTime (state, obj) {
			state.currentTime = obj.time
    },
    setProgressWidth (state) {
			state.progerssWidth = `calc(${(this.getters.getCurrentTime / this.getters.getMusicDuration * 100).toFixed(2)}%)`; 
    } ,/*
    clearPlayBtn(state){
      if(state.btnDom){
        state.btnDom.className = 'fa fa-pause';
      }      
    } */
    setAllMusicList(state,payload){
      console.log(payload,'llll')
      // console.log(payload)
      // state.AllMusicList = payload;
      // 是一个数组，其中每一项的data是想要的歌曲信息（里面有歌名和id等信息）
      let i=0;
      
      state.listdata.forEach(function(item1){                        
          if(item1.type === '音乐'){
              item1.music.push(state.AllMusicList[i]);
              console.log(payload,'payloadlllllllll')
              i++;
          }
      })
      // console.log(state.listdata,'lllllllll');
      
    }
  },
  actions:{
    sendAudio({commit,state},obj){//添加音乐播放元素，在App.vue里在模板编译完成后把audio元素发送给action
      commit('sendAudio',obj)
    },    
    play({commit,state}){//播放音乐
      if(state.musicList.length!=0){
        if (state.playState==false){
          // state.dom.play();
          commit('play'); // 提交play类型的mutation
          // state.musicPlace=state.musicList.length-1;
          // state.dom.src="http://ws.stream.qqmusic.qq.com/"+state.musicList[state.musicPlace].songid+".m4a?fromtag=46";
          
        }else {
          // state.dom.pause();
          commit('pause')
        }
      }
    },
    sendAudio({commit,state},obj){//添加音乐播放元素，在App.vue里在模板编译完成后把audio元素发送给action
      commit('sendAudio',obj)
    },
    sendPlayBtn({commit,state},obj){//添加音乐播放元素，在App.vue里在模板编译完成后把audio元素发送给action
      commit('sendPlayBtn',obj)
    },
    set_MusicDuration ({commit}, obj) {
			commit('setMusicDuration', obj)
    },
    set_CurrentTime ({commit}, obj) {
			commit('setCurrentTime', obj)
		}
  }
})
export default store
