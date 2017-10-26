
let baseUrl = 'http://localhost:3100/api'
let urls = {
    // lyric: `https://api.darlin.me/music/lyric/${id}/?`
    // allMusicList: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?tpl=3&page=detail&date=2017-10-17&topid=4&type=top&song_begin=0&song_num=10',
    // oneSong: `https://c.y.qq.com/v8/fcg-bin/fcg_play_single_song.fcg?songmid=${item.data.songmid}&tpl=yqq_song_detail&format=jsonp`
    listData: '/users'
}
for(var attr in urls){
    urls[attr] = baseUrl + urls[attr]
}
export default urls;
