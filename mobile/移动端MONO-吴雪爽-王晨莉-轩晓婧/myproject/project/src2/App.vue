<template>
  <div id="app">
    <router-view></router-view>
    <!--播放器全局组件-->
    <music-player></music-player>
    <!-- 最近播放的音乐列表 -->
    <lataly-list></lataly-list>
    <!-- 音频标签 -->
    <audio src="" ref="audio" autoplay="autoplay" @canplay="musicCanPlay"  @timeupdate="musicTimeUpdate" preload @ended="musicEnded">
    </audio>
  </div>
</template>

<script>
import FooterNav from '@/components/footer/footer'
import Jsonp from 'jsonp'
import MusicPlayer from '@/views/musicPlayer/musicPlayer'
import LatalyList from '@/views/musicPlayer/latalyList'
import Axios from 'axios'
import Base64 from '@/assets/js/base64.js'
let nav_data = [
		{
			title:'早午茶',
      touched:false,
      url:"http://localhost:3100/api/users",
			path:"/"
		},
		{
			title:'音乐',
      touched:false,
      url:"http://localhost:3100/api/music",
			path:"/music"
		},
		{
			title:'电影',
      touched:false,
      url:"http://localhost:3100/api/movie",
    // url:"https://api.douban.com/v2/movie/in_theaters",
			path:"/movie"
		},
		{
			title:'图书',
      touched:false,
      url:"http://localhost:3100/api/books",
      //url:"https://api.douban.com/v2/book/search?q=JavaScript权威指南&start=0&count=6",
			path:"/books"
		}
  ]
  

export default {
  name: 'app',
  data(){
    return {
      AllMusicList:[],
      nav_data:nav_data 
    }    
  },
  components: {
    MusicPlayer,
    LatalyList
  },
  methods: {
    // 音乐播放
    musicCanPlay () {
        
        this.$store.dispatch({
            type: 'set_MusicDuration',
            duration: Math.floor(this.$refs.audio.duration)
        })
        /* this.$store.commit({
            type: 'setMusicLoadStart',
            isloadstart: false
        }) */
    },
    // 音乐播放时间更新事件
    musicTimeUpdate () {
        // console.log('触发')
        /* this.$store.dispatch({
            type: 'set_CurrentTime',
            time: Math.floor(this.$refs.audio.currentTime)
            // time: Math.floor(this.$store.state.dom.currentTime)
        })   */ 
        this.$store.commit('setCurrentTime', Math.floor(this.$refs.audio.currentTime))
        this.$store.commit('setProgressWidth');
    },
    // 音乐播放结束后触发
        musicEnded(){
            // 要告诉公共的audio
        }
  },
  mounted(){
      this.$store.dispatch('sendAudio',this.$refs.audio)
  }
}

</script>

<style>
  .kind3{
    padding: 0;
  }
   .kind3 .banner img{
    width: 100%;
  }
  .tagClient ul img{
    height: 100%;
  }
  .special,.subject-term{
    width: 100%;
    overflow: hidden;
  }
  .find{
     width: 100%;
     overflow: hidden;
  }
  #app .vux-toast-bottom,#app .vux-toast-middle,#app .vux-toast-top{ 
      width: 29.63rem!important;
      height: 5.19rem;
      line-height: 5.19rem;               
      border-radius: 3.70rem;
      background: rgba(22,165,175,1);
      bottom: 5.56rem;
      padding: 0;
      
  }
  #app .weui-toast__content{
      text-align: center;
      -width: 29.63rem!important;
      height: 8.19rem;
      line-height: 8.19rem;
      color: #ffffff;
      font-size: 1.85rem;
  }
  #app .vux-toast-middle{
    background: lightcoral;
  }
  #app .vux-toast-top{
    top: 7.41rem;
    background: lightblue;
  }
  ._404{        
      width: 100%;
      height: 81.78rem;
  }
  #app .vux-header{
      position: absolute;
      left: 0;
      top: 0;
      height: 5.19rem!important;
      background: transparent;
  }
  #app .vux-header-left{
      width: 14.81rem;
      height: 5.19rem;
      line-height: 5.19rem;
      font-size: 1.85rem;
      padding-left: 3.33rem;
  }
  .vux-header .vux-header-left .left-arrow:before{
    margin: 1.48rem 1.48rem 0;
    width: 1.85rem!important;
    height: 1.85rem!important;
  }
  
</style>

