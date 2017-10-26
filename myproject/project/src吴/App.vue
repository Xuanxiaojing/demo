<template>
  <div id="app">
    <!-- <router-view :navData = 'navData' :navList = "this.navList"></router-view> -->
    <router-view :nav_data = 'nav_data'></router-view>
    <!--播放器全局组件-->
    <music-player></music-player>
    <lataly-list></lataly-list>
  </div>
</template>

<script>
import Jsonp from 'jsonp'
import MusicPlayer from '@/components/musicPlayer/musicplayer'
import LatalyList from '@/components/latalyList/latalyList'
import Axios from 'axios'
import Base64 from '@/assets/js/base64.js'    
import Recommend from '@/views/recommend'
let nav_data = [
		{
			title:'早午茶',
      touched:false,
      url:"http://localhost:3100/api/users",
			path:"/"
		},
		// {
		// 	title:'我的关注',
    //   touched:false,
    //   url:"http://localhost:3100/api/users",
		// 	path:"/"
		// },
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
  // watch:{//观察者模式
  //   navList:{
  //     deep:true,
  //     handler(){
  //       localStorage.setItem("angel",JSON.stringify(this.navList));
  //     }
  //   }
  // },
  components: {
    MusicPlayer,
    LatalyList,
    Recommend
  },
}


/*
  [
  {
    "action": {
      "alert": 100011,
      "icons": 0,
      "msgdown": 0,
      "msgfav": 0,
      "msgid": 0,
      "msgpay": 5,
      "msgshare": 0,
      "switch": 636703
    },
    "album": {
      "id": 2296132,
      "mid": "002W7K2D0LxJJR",
      "name": "蒙面唱将猜猜猜第二季 第6期",
      "subtitle": "",
      "time_public": "2017-10-15",
      "title": "蒙面唱将猜猜猜第二季 第6期"
    },
    "bpm": 0,
    "data_type": 0,
    "file": {
      "media_mid": "000hcT5L3qazwZ",
      "size_128mp3": 3817033,
      "size_192aac": 5775280,
      "size_192ogg": 5116997,
      "size_24aac": 742454,
      "size_320mp3": 9541898,
      "size_48aac": 1458229,
      "size_96aac": 2909421,
      "size_ape": 25712459,
      "size_dts": 0,
      "size_flac": 25897425,
      "size_try": 547107,
      "try_begin": 58021,
      "try_end": 92146
    },
    "fnote": 4009,
    "genre": 1,
    "id": 204505031,
    "index_album": 8,
    "index_cd": 0,
    "interval": 238,
    "isonly": 1,
    "ksong": {
      "id": 3027647,
      "mid": "003hKpdt44Qcsy"
    },
    "label": "0",
    "language": 0,
    "mid": "000hcT5L3qazwZ",
    "modify_stamp": 0,
    "mv": {
      "id": 0,
      "name": "",
      "title": "",
      "vid": ""
    },
    "name": "遗憾",
    "pay": {
      "pay_down": 0,
      "pay_month": 1,
      "pay_play": 0,
      "pay_status": 0,
      "price_album": 0,
      "price_track": 200,
      "time_free": 1
    },
    "singer": [
      {
        "id": 5062,
        "mid": "002J4UUk29y8BY",
        "name": "薛之谦",
        "title": "薛之谦",
        "type": 0,
        "uin": 0
      }
    ],
    "status": 0,
    "subtitle": "",
    "time_public": "2017-10-15",
    "title": "遗憾 (Live)",
    "trace": "",
    "type": 0,
    "url": "http://stream2.qqmusic.qq.com/216505031.wma",
    "version": 3,
    "volume": {
      "gain": -6.232,
      "lra": 14.255,
      "peak": 1
    }
  }
]
  薛之谦：遗憾
  https://c.y.qq.com/v8/fcg-bin/fcg_play_single_song.fcg?songmid=000hcT5L3qazwZ&tpl=yqq_song_detail&format=jsonp&callback=getOneSongInfoCallback&g_tk=2115981700&jsonpCallback=getOneSongInfoCallback&loginUin=546292379&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0

  https://c.y.qq.com/v8/fcg-bin/fcg_play_single_song.fcg?songmid=002Eg7sW1b7tAr&tpl=yqq_song_detail&format=jsonp&callback=getOneSongInfoCallback&g_tk=2115981700&jsonpCallback=getOneSongInfoCallback&loginUin=546292379&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0
*/
</script>
