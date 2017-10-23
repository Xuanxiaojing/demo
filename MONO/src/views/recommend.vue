<template>
    <div>
        <div class="nav">
            <ul class="clearfix">
                <li><a href="javascript:;">早午茶</a></li>
                <li><a href="javascript:;">我的关注</a></li>
                <li><a href="javascript:;">音乐</a></li>
            </ul>
            <div class="music" @click="setMPlayerScreen(true)"><img src="../assets/img/music.png" /></div>
            <!-- <router-link to="/musicplayer" tag="div" class="music">
                <img src="../assets/img/music.png" />
            </router-link> -->
        </div>
        <div class="content"  ref="wrapper">
            <!-- <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite"> -->
                <div class="morningtea">
                    <p>
                        <img src="../assets/img/mortea.png" /> 
                        <span>17.09.18</span>
                    </p>
                    <p><span>MONO今日编辑精选</span></p>
                    <div class="border"></div>
                </div>

                <recommend-item 
                    v-for="item,index in listdata" 
                    key="index"
                    :itemData="item"
                    :index="index"
                    type="listdata"
                >
                                      
                </recommend-item>
                <!-- <p
                    v-for="item,index in downdata" 
                >
                    {{item.id}}          
                </p> -->
            <!-- </div> -->
            <!-- </v-scroll> -->
            
        </div>
        <Footer-nav></Footer-nav>
        
    </div>
</template>

<script>
    import FooterNav from '@/components/footer'
    import Scroll from '@/components/scroll'
    import recommendItem from '@/components/recommendItem'
    import recommendFooter from '@/components/recommend-footer'
    // import bpfangqi from '@/components/vue-bofangqi'
    import Jsonp from 'jsonp'
    import Base64 from '@/assets/js/base64.js'

    import Axios from 'axios'

    // import Bscroll from 'better-scroll'
   import { mapGetters, mapMutations, mapActions } from 'vuex'
    
    export default {
        data(){
            return {
                counter : 1, //默认已经显示出15条数据 count等于一是让从16条开始加载
                num : 4,  // 一次显示多少条
                pageStart : 0, // 开始页数
                pageEnd : 0 // 结束页数
            }
        },
        components:{
            FooterNav,
            'v-scroll': Scroll,
            recommendItem,
            recommendFooter
        },
        mounted(){
            this.getList();
        },
        methods: {
            getList(){
                let _this = this;
                Axios.get(
                    'http://192.168.0.104:3100/api/users'
                )
                .then((data)=>{
                    // 提交mutation修改listdata，data.data.list是一个数组
                    // let newData = data.data.list.slice(0,4).push()
                    
                    
                    // if(_this.$store.state.listdata.length !==0&&i<4){
                    // console.log(_this.$store.state.listdata,'llll')
                    let d1 = data.data.data.list;
                    _this.$store.commit('changeListData',d1)
                    Jsonp('https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?tpl=3&page=detail&date=2017-10-17&topid=4&type=top&song_begin=0&song_num=10',{
                        param:'jsonpCallback'
                    },function(err,data){
                        
                        // 这里获取的是排行榜的众多音乐,data.songlist是想要的列表（数组）
                        // 转成数组，循环数组，分别拿到每首歌曲的详细信息
                        
                        // _this.$store.commit('setAllMusicList',data); // 把拿到的每首歌曲的信息存放到公共的AllMusicList数组里 
                        data.songlist.forEach(function(item){
                            // console.log(item.data.songmid,'songmid')
                            Jsonp(`https://c.y.qq.com/v8/fcg-bin/fcg_play_single_song.fcg?songmid=${item.data.songmid}&tpl=yqq_song_detail&format=jsonp`,{
                                // param:'getOneSongInfoCallback'
                            },function(err,data){
                                // 这里获取的data是单个歌曲的数据，包括url和id
                                
                                // let id = data.data[0].id; // 在每首歌曲的详细信息里可以拿到该歌曲的id，通过id拿歌曲地址和歌词
                                
                                // let d2 = data; // 每首歌的信息是一个对象，存一下
                                _this.$store.commit('setAllMusicList',data); // 把拿到的每首歌曲的信息存放到公共的AllMusicList数组里
                                
                                // // 出现的问题：如果把所有单个歌曲的数据都存在一个数组里，然后在这个forEach循环结束后，把整个数组提交修改AllMusicList，
                                // // 那么会发现 第一次刚打开时，用下标取state.AllMusicList[i]会出现undefined

                                // Jsonp(`https://api.darlin.me/music/lyric/${id}/?`,{
                                //     // param:'getOneSongInfoCallback'
                                // },function(err,data){
                                    
                                //     let oneSongLyric = data.lyric;
                                //     let base = new Base64();
                                //     let result = base.decode(oneSongLyric); 
                                //     d2.lyric = result; // 获取到每首歌的歌词之后，在歌曲的信息里添加lyric属性，存放转码后的歌词
                                //     _this.$store.commit('setAllMusicList',d2); // 把拿到的每首歌曲的信息存放到公共的AllMusicList数组里                                    
                                // })
                            })
                        })                                                
                    })      
                })
            },
            ...mapMutations({
                setMPlayerScreen: 'setMPlayerScreen'
            })
        },
        computed: {
            listdata(){
                console.log(this.$store.state.listdata,'this.$store.state.listdata')
                return this.$store.state.listdata // 下拉更新数据存放数组
            },
            downdata(){
                return this.$store.state.downdata // 上拉更多的数据存放数组
            }
            
        }
    }
</script>

