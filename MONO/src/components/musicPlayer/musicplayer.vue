<template>
    <div class="music-player" v-show="this.$store.state.mPlayerScreen"> 
        <div class="music-player-cont">
        <div class="filterbg"></div>  
        <h2 class="clearfix music-title">
            <!-- <router-link to="/latalyList" tag="i" class=" fl fa fa-flip-horizontal fa-clock-o" aria-hidden="true">
            </router-link>  -->
            <i class="fl fa fa-flip-horizontal fa-clock-o" aria-hidden="true" @click="setLatalyListShow(true)"></i>
            <span class="fl">音乐播放器</span>
            <i class="fr fa fa-chevron-up" aria-hidden="true" @click="setMPlayerScreen(false)"></i>
        </h2>
        <div class="music-b">
            <p class="clearfix">
                <span class="fl">我的收藏</span>
                <i class="fr fa fa-angle-right" aria-hidden="true"></i>
            </p>
            <p class="clearfix">
                <span class="fl">正在播放</span>
                <i class="fr fa fa-angle-right" aria-hidden="true"></i>
            </p>
            <div 
                class="music-box"
                @touchstart.prevent="middleTouchStart"
                @touchmove.prevent="middleTouchMove"
                @touchend="middleTouchEnd"
            >
                <div class="music-left" ref="musicCd">
                    <b>来自<strong>XXXXXX</strong>主题站</b><br/>
                    <b>iynas hdsh hska</b><br/>
                    <div class="play-box" ref="playBox" :style="animationPlayState">
                        <img src="../../assets/img/play.png" />
                    </div>													
                </div>
                <scroll class="music-right" ref="lyriclist" :data="currentLyric && currentLyric.lines">
                    <div class="lyric">
                        <ul class="lyric-box" v-if="currentLyric" ref="lyricBox">
                            
                            <li 
                                ref="lyricLine"
                                v-for="val,index in currentLyric.lines"
                                :key="index.key"
                                :class="{'currentlyc': currentLine === index}"                              
                            >{{val.txt}}</li>
                            <!-- 根据 -->
                        </ul>						
                    </div>
                </scroll>
                <div class="qiehuan" ref="switchBtn">
                    <em :class="{'active':currentShow === 'cdImg'}"></em>
                    <em :class="{'active':currentShow === 'lyric'}"></em>
                </div>				
            </div>
            <div class="music-box-bottom">	
                <!-- 进度条 -->
                <div class="schedule">
                    <!-- 实时播放时间 -->
                    <span class="fl">{{timerFomart(musicCurrentTime)}}</span>
                    <!-- <div class="fl progress-bar">
                        <div class="quan"></div>
                    </div> -->
                    <!-- 进度条 -->
                    <div class="fl progress-bar" ref="duration">
                        <span class="currentProgress" :style="progressWidth" ref="currentProgress" ></span>
                        <span class="ball" ref="ball" @touchstart="touchStart" @touchmove="touchMove($event)" @touchend="touchEnd($event)"></span>
                    </div>
                    <!-- 歌曲的总时长 -->
                    <span class="fr">{{timerFomart(musicDuration)}}</span>
                </div>	
                <!-- 底部播放条 -->
                <div class="music-func">
                    <!--  播放模式按钮 -->
                    <i class="fl fa fa-random" aria-hidden="true"></i>
                    <!-- 上一首按钮 -->
                    <i class="fl fa fa-backward" aria-hidden="true"></i>
                    <!--  播放/暂停 按钮 -->
                    <i :class="playBtnCls" aria-hidden="true" @click="play"></i>
                    <!-- 下一首按钮 -->
                    <i class="fl fa fa-forward" aria-hidden="true"></i>
                    <!-- 分享按钮 -->
                    <i class="fr fa fa-share-square-o" aria-hidden="true"></i>
                </div>		
            </div>	
        </div>
        <ul class="m-bottom">
            <li aria-hidden="true" class="fa fa-thumbs-o-up"><span>111</span></li>
            <li aria-hidden="true" class="fa fa-heart-o"></li>
            <li aria-hidden="true" class="fa fa-commenting-o"><span>111</span></li>
        </ul>
        </div>
    </div>
</template>
<script>
    import { mapGetters, mapMutations, mapActions } from 'vuex'
    import lyricparser from '@/assets/js/lyricparser.js'
    // import BScroll from 'better-scroll'
    import Scroll from '@/components/scroll/index'
    import Axios from 'axios'    
    import Jsonp from 'jsonp'
    import LyricParser from 'lyric-parser'
    import Base64 from '@/assets/js/base64.js'


    export default{
        data(){
            return {
                mPlayerScreen:false,
                canDrag:false,
                persentWidth:0,
                currentLine:0,
                // currentSong:this.$store.state.currentSong,
                currentLyric: null,
                currentShow:'cdImg' // 表示当前展示的是cd图片还是歌词，cd代表目前展示的是cd
            }
        },
        props: {
            currentColor: {
			    type: String,
                default: '#C62F2F'
            },
            ballWidth: {
                type: String,
                default: '16'
            }
        },
        components: {
            Scroll
        },
        // 滑动touch
        created() {
            this.touch = {} // 自定义touch属性，值为对象
        },
        mounted(){
            this.$refs.playBox.style.animationPlayState="paused"; // 一上来先使旋转的cd图片停止旋转
            this.currentcolor = this.currentColor; // 设置进度条的颜色，不设置的话默认是'#C62F2F'
            this.ballwidth = this.ballWidth; // 拖拽的圆圈的尺寸，默认是16px
            this.$refs.ball.style.width = `${this.ballwidth}px`; // 设置拖拽的圆圈的尺寸
            this.$refs.ball.style.height = `${this.ballwidth}px`;
            this.$refs.ball.style.marginTop = `-${this.ballwidth / 2 - 1}px`; // 设置margin值使圆圈串在进度条上
            if (!this.currentcolor.length > 0) return
            this.$refs.currentProgress.style.background = this.currentcolor // 
            console.log(this.currentSong,'ssssssssssssss')
        },
        methods: {
            // 左右滑屏切换cd图片和歌词
            middleTouchStart(e) {
                this.touch.initiated = true // 初始为true
                // 用来判断是否是一次移动
                this.touch.moved = false // 没有拖动
                const touch = e.touches[0] // 获取手指的信息
                this.touch.startX = touch.pageX; // 手指按下时的位置
                this.touch.startY = touch.pageY
            },
            middleTouchMove(e) {
                // 没有touchstart 返回
                if (!this.touch.initiated) {
                    return
                }
                const touch = e.touches[0];
                const deltaX = touch.pageX - this.touch.startX; // 手指横向滑动的距离，如果向左滑动，这个值是负的；如果向右滑动，那么这个值是正的
                const deltaY = touch.pageY - this.touch.startY; // 手指纵向滑动的距离
                // y轴距离大于x轴距离 => 纵向滚动 => 返回
                if (Math.abs(deltaY) > Math.abs(deltaX)) {
                    return
                }
                if (!this.touch.moved) {
                    this.touch.moved = true
                }
                const left = this.currentShow === 'cdImg' ? 0 : -window.innerWidth // 记录距离当前展示的小盒子距离屏幕左边的距离 
                // 如果当前展示的是cd，left在手指拖动过程中一直是0
                // 否则如果当前展示的是歌词，那么left在手指拖动过程中一直是屏幕的宽度
                // 滚动的距离  最大是0
                // console.log(this.$refs.lyriclist,'this.$refs.lyriclist.style[transform]')
                // 滑动过程中不断地计算"music-box的最左边距离页面的最左边的距离
                // 如果当前展示的是cd图片，那么left+ deltaX就是手指横向滑动的距离，如果当前展示的是歌词，那么left是负的屏幕宽度，加上
                const offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + deltaX)); 
                // 计算拖动的百分比：
                this.touch.percent = Math.abs(offsetWidth / window.innerWidth)
                // console.log(offsetWidth,'offsetWidth')
                this.$refs.lyriclist.$el.style['transform'] = `translate3d(${offsetWidth}px,0,0)`
                this.$refs.lyriclist.$el.style['transitionDuration'] = 0
                this.$refs.musicCd.style.opacity = 1 - this.touch.percent
                this.$refs.musicCd.style['transitionDuration'] = 0
            },
            middleTouchEnd() {
                if (!this.touch.moved) {
                    return
                }
                let offsetWidth
                let opacity
                if (this.currentShow === 'cdImg') { // 如果当前展示cd
                    if (this.touch.percent > 0.5) {
                        offsetWidth = -window.innerWidth
                        opacity = 0
                        this.currentShow = 'lyric'
                    } else {
                        offsetWidth = 0
                        opacity = 1
                    }
                } else {
                    if (this.touch.percent < 0.5) {
                        offsetWidth = 0
                        this.currentShow = 'cdImg'
                        opacity = 1
                    } else {
                        offsetWidth = -window.innerWidth
                        opacity = 0
                    }
                }
                // 动画缓冲时间
                const time = 300
                this.$refs.lyriclist.$el.style['transform'] = `translate3d(${offsetWidth}px,0,0)`
                this.$refs.lyriclist.$el.style['transitionDuration'] = `${time}ms`
                this.$refs.musicCd.style.opacity = opacity
                this.$refs.musicCd.style['transitionDuration'] = `${time}ms`
                this.touch.initiated = false
            },
            play(){                
                if(this.$store.state.playState===true){
                    this.$store.commit('pause');
                    // this.currentLyric.stop()
                }else {
                    this.$store.commit('play');
                    // this.currentLyric.play()
                }                
                // 切换播放/暂停状态
                this.currentLyric.togglePlay()
            },
            ...mapMutations({
                setMPlayerScreen: 'setMPlayerScreen',
                setLatalyListShow: 'setLatalyListShow'
            }),
            // 将歌曲时间转换成xx:xx格式
            timerFomart (time) {
			    if (isNaN(time)) return '00:00'
                let min = time / 60 > 9 ? Math.floor(time / 60) : '0' + Math.floor(time / 60)
                let miao = time % 60 > 9 ? Math.floor(time % 60) : '0' + Math.floor(time % 60)
                return min + ':' + miao
            },
            // 进度条的拖拽
            touchStart () {
                // 开始拖拽，设置状态为true
                this.canDrag = true
            },
            touchMove (event) {
                // 如果可以拖拽
                if (this.canDrag) {
                    let mouseX = event.touches[0].pageX
                    let offsetLeft = this.$refs.duration.offsetLeft
                    this.persentWidth = Math.floor((mouseX - offsetLeft) / this.$refs.duration.offsetWidth * 100)
                    this.persentWidth = this.persentWidth > 100 ? 100 : this.persentWidth
                    this.persentWidth = this.persentWidth < 0 ? 0 : this.persentWidth
                    // this.$store.getters.getAudioElement.currentTime = this.duration * this.persentWidth / 100
                    this.$refs.currentProgress.style.width = `calc(${this.persentWidth}%`
                } else {
                    return
                }
            },
            touchEnd (event) {
                if (this.canDrag !== false) {
                    this.canDrag = false
                    if (isNaN(this.$store.state.audioDom.duration)) return
                    this.$store.state.audioDom.currentTime = this.$store.state.audioDom.duration * this.persentWidth / 100
                }
                
                // 点击或滑动 歌曲进度条 歌词滚动到对应的位置
                if (this.currentLyric) {
                    this.currentLyric.seek(this.$store.state.audioDom.currentTime * 1000)
                }
                /* // 如果当前没有正在播放，歌词
                if (!this.$store.state.playState) {
                    console.log('歌词暂停')
                    this.currentLyric.stop()
                }else{
                    this.currentLyric.play()
                } */
            },
            // 参考源码https://github.com/ustbhuangyi/lyric-parser/blob/master/src/index.js，这个回调函数接收两个参数，一个是行的索引值，一个是对应的歌词文本
            
            handleLyric({lineNum, txt}) {
                // 当前播放到的行的下标是lineNum
                this.currentLine = lineNum     
                // console.log(this.currentLine,'this.currentLine')        
                // console.log(this.$refs.lyricLine[lineNum])   
                if (lineNum > 5) { // 如果下标大于5
                    // 获取到所有li，通过下标 找到当前播放到的歌词对应的li
                    console.log(this.$refs.lyricLine,'lll')
                    let lineEl = this.$refs.lyricLine[lineNum]
                    // 把滚动的容器滚动到“当前li”的位置
                console.log(lineEl,'lineEllineEllineEllineEllineEl')
                    this.$refs.lyriclist.scrollToElement(lineEl, 1000)
                } else {
                    // 如果没有大于
                    console.log(this.$refs.lyriclist,'this.$refs.lyriclist')
                    this.$refs.lyriclist.scrollTo(0, 0, 1000)
                }
                // this.playingLyric = txt
            },
            getLyric(){
                // console.log(this.$store.state.currentLyric,'lyricparser(this.$store.state.currentLyric)')
                // this.$store.state.currentLyric是base64转码后的歌词，lyricparser是封装好的函数
                // if(!this.$store.state.currentSong) return // 如果没有当前歌曲，就不执行下面的

                let _this = this;
                // setTimeout(function() {
                    console.log('走到这里获取歌词')
                    let id = _this.$store.state.currentSong.data[0].id; // 当前播放歌曲的id
                    Jsonp(`https://api.darlin.me/music/lyric/${id}/?`,{
                        // param:'getOneSongInfoCallback'
                    },function(err,data){                    
                        let oneSongLyric = data.lyric;
                        let base = new Base64();
                        let result = base.decode(oneSongLyric);
                        // 使用lyric-parser模块，参考源码https://github.com/ustbhuangyi/lyric-parser/blob/master/src/index.js，
                        _this.currentLyric = new LyricParser(result, _this.handleLyric)
                        if (_this.$store.state.playState) {                    
                            _this.currentLyric.play()
                        }
                        console.log(_this.currentLyric,'_this.currentLyric')
                        // return _this.currentLyric
                    })
                // }, 1000);ssssss
                
            }
        },
        // vue官网：https://cn.vuejs.org/v2/guide/computed.html，
        //使用 watch 选项允许我们执行异步操作 (访问一个 API)，限制我们执行该操作的频率，并在我们得到最终结果前，设置中间状态
        watch: {
            currentSong(newSong,prevSong){
                // newSong是新歌
                console.log(newSong,'newSongnnnnnnnnnnn');
                console.log(prevSong,'prevSongooooooooooooo');
                if (!newSong.data[0].id) return // 如果没有当前歌曲，就不执行下面的
                this.getLyric() // 获取歌词
            }
        },
        computed: {
            // 播放按钮的类名
            playBtnCls(){    
                // console.log(this.$store.state.isPlay,'this.itemData.isPlay')        
                if(this.$store.state.playState===true){
                    return 'fl fa fa-pause-circle'
                }else {
                    return 'fl fa fa-play-circle'
                }
            },
            musicCurrentTime () {
                return this.$store.getters.getCurrentTime ? this.$store.getters.getCurrentTime : '00:00'
            },
            musicDuration () {
                return this.$store.getters.getMusicDuration ? this.$store.getters.getMusicDuration : '00:00'
            },
            // 进度条的宽度
            progressWidth () {
                // if (this.$store.getters.getIsLoadStart) {
                //     return {
                //         'width': '0'
                //     }
                // } else {
                    return {
                        'width': `calc(${(this.$store.getters.getCurrentTime / this.$store.getters.getMusicDuration * 100).toFixed(2)}%`
                    }
                // }              
            },
            // 根据播放状态来计算cd图片是否旋转
            animationPlayState(){
                if(this.$store.state.playState===true){
                    return {
                        'animation-play-state': 'running'
                    }
                }else {
                    return {
                        'animation-play-state': 'paused'
                    }
                }
            },
            // 计算一下当前播放的歌曲，因为要用watch监控当前歌曲，然而当前歌曲是在公共仓库里存储（因为“当前歌曲”是点击recommend里的歌曲通过sendMusic传递过去的，组件之间通信，要作为在公共状态管理），所以在这里拿到公共的currentSong
            currentSong(){
                return this.$store.state.currentSong
            }
        }
    }
</script>


<style>
    /* .music-player{
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 20;
        -webkit-transform: translateZ(0);
        transform: translateZ(0);
        background-size: cover;
        background: #aaa;    
    }
    .filterbg{
        position: fixed;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        background: url('../../assets/img/music-player.jpg') no-repeat;
        background-size: cover;
    } */
    /* .music-player-cont{
        z-index: 17;
        background: rgba(0,0,0,.15);
        position: fixed;
        height: 100%;
        width: 100%;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
    } */
    /* .music-player .music-b{
        z-index: 99;
    }
    .music-player .m-bottom{
        z-index: 99;
    } */
    .music-player{
        position: absolute;
        top: 0;
        left: 0;
        z-index: 99;
    }
    .music-player .music-box{
        width: 100%;
        white-space: nowrap;
    } 
    /* .music-player .m-bottom{
        position: absolute;
        left:0;
        bottom: 50px;
        width: 100%;
    }
    .music-box-bottom{
        position: absolute;
        left:0;
        bottom: 150px;
        width: 100%;
        padding:0 20px;
    } */
    .music-player .music-left,.music-player .music-right{
        width:100%;
        display:inline-block;
        vertical-align: top;
        height:40rem;
        color: #fff;
        margin: 12px;
        font-size:22px;
        overflow: auto;
    }
    .music-player .music-box .lyric .lyric-box{
        height:100%;
    }
    .music-player .currentlyc{
        color: seagreen;
    }
    /* 切换图片和歌词时小圆圈的高亮 */
    .music-player .music-box .qiehuan .active{
        background-color: salmon;
   }
    .music-player .schedule .progress-bar{
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        width:34rem;
        height: 2px;
        border-radius: 1px;
        /* background: hsla(0,0%,96%,.3); */
        margin: 0 auto;
        font-size: 0;
        cursor: pointer;
        position: relative;
    }
    .music-player .schedule .currentProgress{
        display: inline-block;
        width: 0;
        height: 0.6rem;
        background: red;
        float: left;
        background: #c62f2f;
    }
    .music-player .schedule .ball{
        width: 1.2rem;
        height: 1.2rem;
        margin-top: -0.3rem;
        position: absolute;
        background: #fff;
        border-radius: 50%;
        float: left;
        cursor: pointer;
    }
    .music-player .schedule span{
        font-size: 1.3rem;
        line-height: 4.3rem;
    }
       
</style>
