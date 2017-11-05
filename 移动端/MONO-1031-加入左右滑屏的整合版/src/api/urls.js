
let baseUrl = 'http://localhost:3200/api'
let urls1 = {
    // lyric: `https://api.darlin.me/music/lyric/${id}/?`
    // allMusicList: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?tpl=3&page=detail&date=2017-10-17&topid=4&type=top&song_begin=0&song_num=10',
    // oneSong: `https://c.y.qq.com/v8/fcg-bin/fcg_play_single_song.fcg?songmid=${item.data.songmid}&tpl=yqq_song_detail&format=jsonp`
    listData: '/users',
    books:"/books",
    hometitle:"/hometitle",
    find:"/find",
    comunity:'/comunity'
}
for(var attr in urls1){
    urls1[attr] = baseUrl + urls1[attr]
}
let urls2 = {
    movie:"https://api.douban.com/v2/movie/in_theaters",
}


export default {
    urls1,
    urls2
};
