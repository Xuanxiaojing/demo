
import axios from 'axios'    
import jsonp from 'jsonp'
import urls from './urls'

function getListData(){
    return  axios.get(urls.listData)
}

function getAllMusicListData(callback){
    jsonp('https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?tpl=3&page=detail&date=2017-10-17&topid=4&type=top&song_begin=0&song_num=10',{
        param:'jsonpCallback'
    },callback) 
}

// 获取单个歌曲的数据，根据传进来的mid来请求
function getOneSongData(mid,callback){
    jsonp(`https://c.y.qq.com/v8/fcg-bin/fcg_play_single_song.fcg?songmid=${mid}&tpl=yqq_song_detail&format=jsonp`,{
        // param:'getOneSongInfoCallback'
    },callback) 
}

function getLyricData(id,callback){
    jsonp(`https://api.darlin.me/music/lyric/${id}/?`,{
        // param:'getOneSongInfoCallback'
    },callback)
}
export default{
    getAllMusicListData,
    getOneSongData,
    getLyricData,
    getListData
}
