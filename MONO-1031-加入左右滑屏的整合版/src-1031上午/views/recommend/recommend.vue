<template>
    <div>
        <PubNav :nav_data = "nav_data" ></PubNav>
        <!-- <scroll
                :data="listdata" 
                :pullDownRefresh="true"
                @pulldown="getList"
                :pullUpLoad="true"
                ref="contentWrapper"
            > -->
        <div id="wrapper" ref="contentWrapper">
            <div class="content">
                <div class="loading">
                    <span v-if="gif">下拉刷新</span>
                    <img v-else src="/static/img/pullLoding.gif" width="120" alt="">
                </div>
                <div class="morningtea">
                    <p>
                        <img src="../../assets/img/mortea.png" /> 
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
                <div class="floading" v-if="reloading">
                    <img src="/static/img/pullLoding.gif" width="120" alt="">
                </div>
            </div> 
        </div>
        <!-- </scroll> -->
        <Footer-nav></Footer-nav>
        
    </div>
</template>

<script>
import Vue from 'vue'
    import PubNav from '@/views/recommend/pub-nav/pub-nav' // 顶部导航
    import FooterNav from '@/components/footer/footer' // 底部菜单栏
    // import Scroll from '@/components/scroll/index'
    import BScroll from 'better-scroll' // 用来滚动的
    
    import recommendItem from '@/components/recommend-item/recommendItem'
    // import bpfangqi from '@/components/vue-bofangqi'
    import Jsonp from 'jsonp'
    import Base64 from '@/assets/js/base64.js'

    import Axios from 'axios'

    import api from '@/api/api.js' // 请求数据的文件

    // import Bscroll from 'better-scroll'
   import { mapGetters, mapMutations, mapActions } from 'vuex'
    
   
    
    export default {
        data(){
            return {
                gif: true,
                reloading: false,
                obj:{

                }
            }
        },
        props:["nav_data"],
        components:{
            FooterNav,
            recommendItem,
            PubNav
        },
        created(){
            if(this.$store.state.listdata.length !== 0) return // 如果数组里已经有数据，不再重复获取，只在发生特定行为（比如下拉刷新和上滑加载时）去获取
            this.getList(); // 第一次一上来获取数据
        },
        mounted(){
            this.nextTick() // 每次页面渲染完毕，都重新获取better-scroll要滚动的对象            
        },
        methods: {
            // 下拉刷新，把向后端请求过来的数据 截取出前几条，提交mutaion，插入listdata的前面，以使刷新出来的数据显示在最前面
            loadingHandler () {
                api.getListData().then((data)=>{
                    let d1 = data.data.data.list.slice(0,data.data.data.list.length-3);
                    // 循环当前的listdata数组，
                    for(var i=0; i<this.$store.state.listdata.length; i++){
                        if(this.$store.state.listdata[i].id === d1[0].id) {
                            // 如果数组里已经有相同的数据，就不再插入，重新初始化better-scroll要滚动的对象
                            setTimeout(()=>{
                                this.nextTick()
                            },1000) 
                            return
                        }
                    }
                    this.$store.commit('RefreshListData',d1)
                    api.getAllMusicListData(this.getAllMusicListDataCallBack.bind(this))
                    setTimeout(()=>{
                        this.nextTick()
                    },1000)                    
                })            
            },
            pullLodingMethod () {
                // this.getList();
                this.loadingHandler()
                // this.nextTick()
            },
            nextTick () {
                var me = this

                me.$nextTick(() => {
                var content = document.getElementsByClassName('content')[0]
                setTimeout(function () {
                    if (me.myScroll) {
                    me.myScroll.refresh()
                    me.floading = false
                    me.reloading = false
                    me.pullLoading = false
                    me.gif = true
                    content.style.marginTop = '-5.65217391rem';
                    } else {
                    var wrapper = document.getElementById('wrapper')
                    me.myScroll = new BScroll(wrapper, {
                        startX: 0,
                        startY: 0,
                        click: true,
                        probeType: 3
                    })
                    console.log(me.myScroll,'me.myScroll')
                    var y = 0

                    content.addEventListener('touchend', function () {
                        if (me.pullLoadingStart && y > 100) {
                        setTimeout(function () {
                            content.style.marginTop = 0
                        }, 30)
                        // 下拉刷新 
                        me.pullLodingMethod()
                        
                        me.pullLoading = true
                        // me.$store.commit('setPullLoading',true)
                        me.gif = false
                        }
                    })

                    me.myScroll.on('scroll', (pos) => {
                        y = pos.y
                        if (pos.y > 100) {
                        me.pullLoadingStart = true
                        }

                        if (!me.floading && pos.y < 0 && (-1 * pos.y + wrapper.offsetHeight) - content.offsetHeight > 30) {
                        // me.pullLodingMethod()
                        // 上拉加载
                        api.getListData().then((data)=>{
                            // let arr = []
                            // arr.push()
                            let d1 = data.data.data.list.slice(data.data.data.list.length-3,data.data.data.list.length);
                            for(var i=0; i<me.$store.state.listdata.length; i++){
                                if(me.$store.state.listdata[i].id === d1[0].id){
                                    setTimeout(()=>{
                                        me.nextTick()
                                    },1000)  
                                    return 
                                }
                            }
                            me.$store.commit('changeListData',d1)
                            api.getAllMusicListData(me.getAllMusicListDataCallBack.bind(me))
                            setTimeout(()=>{
                                me.nextTick()
                            },1000)
                        })
                        me.floading = true
                        me.reloading = true
                        }
                    })
                    }
                })
                })
            },
            // 初始显示中间几条条数据
            getList(){                
                api.getListData().then((data)=>{
                    // 截取中间几条条数据                    
                    let d1 = data.data.data.list.slice(4,data.data.data.list.length-3);
                    this.$store.commit('changeListData',d1)
                    // 获取音乐数据
                    api.getAllMusicListData(this.getAllMusicListDataCallBack.bind(this))
                })
            },
            getAllMusicListDataCallBack(err,data){
                // 这里获取的是排行榜的众多音乐,data.songlist是想要的列表（数组）
                // 转成数组，循环数组，分别拿到每首歌曲的详细信息
                // let arr = []
                // _this.$store.commit('setAllMusicList',data); // 把拿到的每首歌曲的信息存放到公共的AllMusicList数组里 
                // let _this = this;
                //console.log(this,'this')
                let _this = this;
                // Vue.set(_this.obj, 'arr', [])
                // 循环拿到的列表
                data.songlist.forEach(function(item){
                    api.getOneSongData(item.data.songmid,_this.getOneSongDataCallBack)
                }) 
                // if(this.$store.state.AllMusicList.length === 10){
                setTimeout(function(){
                    _this.$store.commit('setListDataMusic')
                },1000)
                    
                // }
                // console.log(this.obj.arr[0],'aaaaaaaaaaaaaaaaaaaaaaa')
            },
            getOneSongDataCallBack(err,data){
                // 这里获取的data是单个歌曲的数据，包括url和id
                
                // let id = data.data[0].id; // 在每首歌曲的详细信息里可以拿到该歌曲的id，通过id拿歌曲地址和歌词
                // this.arr.push(data)
                // let d2 = data; // 每首歌的信息是一个对象，存一下
                this.$store.commit('setAllMusicList',data); // 把拿到的每首歌曲的信息存放到公共的AllMusicList数组里
               console.log('我请求道首页歌曲数据了')
               this.nextTick()
            },
            repeat (obj, n, type) {
                var arr = []

                for (var i = 0; i <= n; i++) {
                    arr.push(obj)
                }

                return arr
            },
            ...mapMutations({
                setMPlayerScreen: 'setMPlayerScreen'
            })
        },
        computed: {
            listdata(){
                // console.log(this.$store.state.pullLoading,'hahahahhhhhhhhhhhhh')
                // if(this.$store.state.pullLoading){
                //     return this.$store.state.listdata // 下拉更新数据存放数组
                // }else{                    
                //     return this.$store.state.listdata.slice(4,this.$store.state.listdata.length-2) // 一开始渲染中间几条数据
                // }
                return this.$store.state.listdata // 下拉更新数据存放数组
            },
            downdata(){
                return this.$store.state.downdata // 上拉更多的数据存放数组
            }
            
        }
    }
</script>
<style>
    /* .content-wrapper{
        height: ;
    } */
    #wrapper{
        position: fixed;
        left: 0;
        top: 5.65217391rem;
        right: 0;
        bottom: 6.39130435rem;
    }
    .content{
        padding-top: 0;
        padding-bottom: 0;
        margin-top: -5.65217391rem;
    }
    /* 下拉刷新的loading */
    .loading {
        width: 100%;
        height: 5.65217391rem;
        text-align: center;
        line-height: 5.65217391rem;
    }
    /*  */
    .floading {
        text-align: center;
        height:100px;
    }
</style>

