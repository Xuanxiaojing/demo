<template>
    <div>
        <div class="nav">
            <ul class="clearfix">
                <li><a href="javascript:;">早午茶</a></li>
                <li><a href="javascript:;">我的关注</a></li>
                <li><a href="javascript:;">音乐</a></li>
                <li><a href="http://localhost:8080/move">电影</a></li>
                <li><a href="javascript:;">读书</a></li>                
                <li><a href="javascript:;">广播</a></li>
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
                <!-- <div class="kind1 same">
                    <div class="clearfix creater">
                        <img class="fl" src="../assets/img/hm.png" />
                        <h2 class="fl">MONO日签</h2>
                        <span class="fr">
                            <i class="fa fa-link fa-rotate-90" aria-hidden="true"></i>
                            阅读
                        </span>
                    </div>
                    <div class="sign">
                        <img src="../assets/img/riqian.png" />
                    </div>
                    <ul class="function clearfix">
                        <li class="fa fa-share-square-o" aria-hidden="true"></li>
                        <li class="fa fa-heart-o" aria-hidden="true"></li>							
                        <li class="fa fa-thumbs-o-up" aria-hidden="true">
                            <span>33</span>
                        </li>					
                        <li class="fa fa-commenting-o" aria-hidden="true">
                            <span>44</span>
                        </li>	
                        <li class="fa fa-ellipsis-h fr lastone" aria-hidden="true"></li>					
                    </ul>
                </div>
                <div class="kind2 same">
                    <div class="clearfix creater">
                        <img class="fl" src="../assets/img/hm.png" />
                        <h2 class="fl">虹膜</h2>
                        <span class="fr">
                            <i class="fa fa-link fa-rotate-90" aria-hidden="true"></i>
                            微信
                        </span>
                    </div>
                    <div class="category">
                        <div class="topic">
                            <img src="../assets/img/img1.png" />
                            <div>
                                <i class="fa fa-quote-left" aria-hidden="true"></i>
                                <p>
                                    「人约巴黎，街头漫步。总会收获很多意外、很多惊奇。」
                                </p>
                            </div>							
                        </div>
                        <h2>这里是世界电影文化的首都，我想赖着一辈子不走</h2>
                        <p class="article">忙碌的巴黎人只需要稍微挤出一点空闲时间，就可以欣赏到这一年出产的最优秀的艺术电影，而其他城市和国家的观众很可能要等上几个月甚至…</p>
                        <p class="border-bottom"></p>
                    </div>
                    <ul class="function clearfix">
                        <li class="fa fa-share-square-o" aria-hidden="true"></li>
                        <li class="fa fa-heart-o" aria-hidden="true"></li>							
                        <li class="fa fa-thumbs-o-up" aria-hidden="true">
                            <span>33</span>
                        </li>					
                        <li class="fa fa-commenting-o" aria-hidden="true">
                            <span>44</span>
                        </li>	
                        <li class="fa fa-ellipsis-h fr lastone" aria-hidden="true"></li>					
                    </ul>
                </div>
                <div class="kind3">
                    <div class="clearfix creater">
                        <img class="fl" src="../assets/img/hm.png" />
                        <h2 class="fl">MONO日签</h2>
                        <span class="fr">
                            <i class="fa fa-link fa-rotate-90" aria-hidden="true"></i>
                            创意
                        </span>
                    </div>
                    <div class="banner">
                        <img src="../assets/img/img2.png" />
                        <p>持反对意见的两个人消失两天后再出现时就改投支持派正营了</p>
                        <ul class="function clearfix">
                            <li class="fa fa-share-square-o" aria-hidden="true"></li>
                            <li class="fa fa-heart-o" aria-hidden="true"></li>							
                            <li class="fa fa-thumbs-o-up" aria-hidden="true">
                                <span>33</span>
                            </li>					
                            <li class="fa fa-commenting-o" aria-hidden="true">
                                <span>44</span>
                            </li>	
                            <li class="fa fa-ellipsis-h fr lastone" aria-hidden="true"></li>					
                        </ul>
                    </div>					
                </div>
                <div class="kind4 same">
                    <div class="clearfix creater">
                        <img class="fl" src="../assets/img/hm.png" />
                        <h2 class="fl">虹膜</h2>
                        <span class="fr">
                            <i class="fa fa-link fa-rotate-90" aria-hidden="true"></i>
                            微信
                        </span>
                    </div>
                    <div class="category">
                        <div class="topic">
                            <img src="../assets/img/img1.png" />							
                            <div>
                                <p class="transparency"></p>
                                <p class="clearfix music-test">
                                    <i class="fa fa-play" aria-hidden="true"></i>
                                    <span>hellohellohello</span>
                                    <em class="fr">
                                        03:47
                                        <i class="fa fa-music" aria-hidden="true"></i>
                                    </em>
                                </p>
                            </div>							
                        </div>
                        <h2>暗黑视觉系包裹下的清澈女声</h2>
                        <p class="article">忙碌的巴黎人只需要稍微挤出一点空闲时间，就可以欣赏到这一年出至忙碌的巴黎人只就可就可以欣赏到这一年出至忙碌的巴黎人只就可以欣赏到这一年出至忙碌的巴黎人只需要稍微挤出一点空闲时间，就可以欣赏到这一上几个月甚至…</p>
                        <p class="border-bottom"></p>
                    </div>
                    <ul class="function clearfix">
                        <li class="fa fa-share-square-o" aria-hidden="true"></li>
                        <li class="fa fa-heart-o" aria-hidden="true"></li>							
                        <li class="fa fa-thumbs-o-up" aria-hidden="true">
                            <span>33</span>
                        </li>					
                        <li class="fa fa-commenting-o" aria-hidden="true">
                            <span>44</span>
                        </li>	
                        <li class="fa fa-ellipsis-h fr lastone" aria-hidden="true"></li>					
                    </ul>
                </div> -->
                <recommend-item 
                    v-for="item,index in listdata" 
                    key="index"
                    :itemData="item"
                    :index="index"
                    type="listdata"
                >
                                      
                </recommend-item>
                <recommend-item 
                    v-for="item,index in downdata" 
                    key="index"
                    :itemData="item"
                    :index="index"
                    type="downdata"
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
                pageEnd : 0, // 结束页数
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
                // 如果一开始公共状态里的listdata数组不为空，说明已经有数据了，不用再重复请求（重复请求会覆盖之前的交互修改的数据）
                if(this.$store.state.listdata.length !== 0){
                    this.listdata = this.$store.state.listdata
                    return
                }
                Axios.get(
                    'http://localhost:3200/api/users'
                )
                .then((data)=>{
                    // console.log(data.data.data.list,'data');
                    // 提交mutation修改listdata，data.data.list是一个数组
                    // let newData = data.data.list.slice(0,4).push()
                    
                    this.getMusic()
                    let i=0;
                    // if(_this.$store.state.listdata.length !==0&&i<4){
                    // console.log(_this.$store.state.listdata,'llll')
                    data.data.data.list.forEach(function(item1){                        
                        if(item1.type === '音乐'){
                            // console.log(_this.$store.state.AllMusicList,'llll')
                            item1.music = _this.$store.state.AllMusicList[i];
                            i++;
                        }
                    })       
                    _this.$store.commit('changeListData',data.data.data.list);             
                })
            },
            ...mapMutations({
                setMPlayerScreen: 'setMPlayerScreen'
            }),
            getMusic(){
                let _this = this;
                Jsonp('https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?tpl=3&page=detail&date=2017-10-17&topid=4&type=top&song_begin=0&song_num=10',{
                    param:'jsonpCallback'
                },function(err,data){
                    
                    // 这里获取的是排行榜的众多音乐,data.songlist是想要的列表（数组）
                    // 转成数组，循环数组，分别拿到每首歌曲的详细信息
                    
                    
                    data.songlist.forEach(function(item){
                    Jsonp(`https://c.y.qq.com/v8/fcg-bin/fcg_play_single_song.fcg?songmid=${item.data.songmid}&tpl=yqq_song_detail&format=jsonp`,{
                        // param:'getOneSongInfoCallback'
                    },function(err,data){
                        
                        _this.$store.commit('setAllMusicList',data);
                        // 这里获取的data是单个歌曲的数据，包括url和id
                        /* let id = data.data[0].id; // 在每首歌曲的详细信息里可以拿到该歌曲的id，通过id拿歌曲地址和歌词
                        
                        let oneSongUrl = data.url[id]; // 通过id拿歌曲地址   

                        // console.log(data.data[0],'d---------------')
                        Jsonp(`https://api.darlin.me/music/lyric/${id}/?`,{
                            // param:'getOneSongInfoCallback'
                        },function(err,data){
                            let oneSongLyric = data.lyric;
                            let base = new Base64();
                            let result2 = base.decode(oneSongLyric); 
                            
                        }) */
                    })
                    })
                    
                })
            }
        },
        computed: {
          
            listdata:{
                get(){
                    return this.$store.state.listdata // 下拉更新数据存放数组
                },
                set(){

                }

                // console.log(this.$store.state.listdata,'sssssssssss')
                
            },
            downdata(){
                return this.$store.state.downdata // 上拉更多的数据存放数组
            }
            
        }
    }
</script>

