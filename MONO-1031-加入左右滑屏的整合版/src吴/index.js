import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import mutations from './mutations'
// 作为vue的插件使用 整个应用要取vuex中的状态
Vue.use(Vuex)


let store = new Vuex.Store({
  state: {
    // recommendListData:[],
    listdata: [], // 下拉更新数据存放数组
    downdata: [],  // 上拉更多的数据存放数组
    audioDom:'', //音乐播放元素
    btnDom:'', // 当前小播放条的播放按钮
    progressDom:'', // 当前小播放条的进度条元素
    progerssWidth:0, // 当前小播放条的进度条的宽度，大播放条的进度条宽度和这个保持一致
    musicList:[/* {
      "name":"笑忘书",
      "img":"https://y.gtimg.cn/music/photo_new/T002R150x150M0000001WFLC3cqaQR.jpg?max_age=2592000",
      "songid":"14361",
      "singer":"王菲"
    } */], // 音乐的播放列表
    AllMusicList:[], // 所有音乐
    playState:false, //播放按钮状态
    mPlayerScreen:false, // 控制音乐播放器页的显示和隐藏，true显示，false隐藏
    currentTime:0,//音乐播放进度
    // duration:0,//音乐长度
    listState:false,//播放列表状态
    isLoadingShow:false,//是否显示loading
		musicDuration: 0,	// 音乐的总播放时长
    currentMusicIndex: 0, // 当前音乐的index索引
    latalyListShow:false, // 控制播放列表的显示和隐藏
    musicLoadFinish:false,
    currentSong:null,
    currentLyric:null
  },
  getters,
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
/*       let i=0;
      let oldListData = _this.$store.state.listdata;
      oldListData.forEach(function(item1){                        
          if(item1.type === '音乐'){
              console.log(_this.$store.state.AllMusicList,'oooooooooooo')
              item1.music.push(_this.$store.state.AllMusicList[i]);
              i++;
          }
      }) */
          
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
      state.audioDom = obj;      
    },
    pause(state){
      state.playState=false;
      console.log(state.playState)
      state.audioDom.pause();
      state.btnDom.classList.remove('fa-pause')
      state.btnDom.classList.add('fa-play');
      
      // state.progressDom.style.width = `calc(${(this.getters.getCurrentTime / this.getters.getMusicDuration * 100).toFixed(2)}%`      
    },
    play(state){
      state.playState=true;
      state.audioDom.play()
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
      state.audioDom = obj;
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
      state.musicList.push(obj); // 歌曲信息放入播放列表
      state.currentMusicIndex=state.musicList.length-1; // 当前播放的音乐的下标为播放列表里的最后一首歌（最新添加进来的歌）
      // state.audioDom.src=state.musicList[state.currentMusicIndex];
      state.audioDom.src= 'http://'+ state.musicList[state.musicList.length-1].url[obj.data[0].id]; // 根据传进来的歌曲信息里的id拿到歌曲地址
      state.currentSong = state.musicList[state.currentMusicIndex] // 当前播放的歌曲默认是最新添加到播放列表里的那首
      // state.currentLyric = state.musicList[state.currentMusicIndex].lyric
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
    // 通过JSONP拿到数据后，设置播放列表，因为大播放器要拿到别的组件添加的音乐，所以公共的播放列表放在公共的仓库管理
    setAllMusicList(state,payload){
      state.AllMusicList.push(payload);
      // 是一个数组，其中每一项的data是想要的歌曲信息（里面有歌名和id等信息）
      // 每次都
      if(state.AllMusicList.length === 10){
        let i=0;
        state.listdata.forEach(function(item1){                        
          if(item1.type === '音乐'){
            // console.log(state.AllMusicList[i],'indexddddlllllllll');
            item1.music.push(state.AllMusicList[i]);
            i++;
          }
        })
      }
    }
  },
  actions:{
    sendAudio({commit,state},obj){//添加音乐播放元素，在App.vue里在模板编译完成后把audio元素发送给action
      commit('sendAudio',obj)
    },    
    play({commit,state}){//播放音乐
      if(state.musicList.length!=0){
        if (state.playState==false){
          // state.audioDom.play();
          commit('play'); // 提交play类型的mutation
          // state.musicPlace=state.musicList.length-1;
          // state.audioDom.src="http://ws.stream.qqmusic.qq.com/"+state.musicList[state.musicPlace].songid+".m4a?fromtag=46";
          
        }else {
          // state.audioDom.pause();
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
