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
            <div class="music-box">
                <div ref="">
                    <b>来自<strong>XXXXXX</strong>主题站</b><br/>
                    <b>iynas hdsh hska</b><br/>
                    <div class="play-box" ref="playBox" :style="this.animationPlayState">
                        <img src="../../assets/img/play.png" />
                    </div>														
                </div>
                <!-- <div class="lyric">
                    <b>dsva dvvsdav</b><br/>
                    <b>hello</b><br/>
                    <ul class="lyric-box">
                        <li>dsavb sbdfvdsv</li>
                        <li>dsadsafvb sbdfvdsv</li>
                        <li>dsavbafdsv sfbdfvdsv</li>
                        <li>dsavb sbdfvdsv</li>
                        <li>dsavb sbdfvdsv</li>
                        <li>dsavbfsdavf  sbdfvdsv</li>
                        <li>dsavb sbdfvdsv</li>
                        <li>dsavb ssdfvffb bdfvdsv</li>
                        <li>dsavb sbdfvdsv</li>
                        <li>dsavb sbdfvdsv</li>
                        <li>dsavbfsdavf  sbdfvdsv</li>
                        <li>dsavb sbdfvdsv</li>
                        <li>dsavb ssdfvffb bdfvdsv</li>
                        <li>dsavb sbdfvdsv</li>
                        <li>dsavb sbdfvdsv</li>
                        <li>dsavbfsdavf  sbdfvdsv</li>
                        <li>dsavb sbdfvdsv</li>
                        <li>dsavb ssdfvffb bdfvdsv</li>
                    </ul>						
                </div>	 -->
                <div class="qiehuan">
                    <em></em>
                    <em></em>
                </div>				
            </div>	
            <div class="schedule">
                <span class="fl">{{timerFomart(musicCurrentTime)}}</span>
                <!-- <div class="fl progress-bar">
                    <div class="quan"></div>
                </div> -->
                <div class="fl progress-bar" ref="duration">
                    <span class="currentProgress" :style="progressWidth" ref="currentProgress" ></span>
                    <span class="ball" ref="ball" @touchstart="touchStart" @touchmove="touchMove($event)" @touchend="touchEnd($event)"></span>
                </div>
                <span class="fr">{{timerFomart(musicDuration)}}</span>
            </div>	
            <div class="music-func">
                <i class="fl fa fa-random" aria-hidden="true"></i>
                <i class="fl fa fa-backward" aria-hidden="true"></i>
                <i :class="playBtnCls" aria-hidden="true" @click="play"></i>
                <i class="fl fa fa-forward" aria-hidden="true"></i>
                <i class="fr fa fa-share-square-o" aria-hidden="true"></i>
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
    export default{
        data(){
            return {
                mPlayerScreen:false,
                canDrag:false,
                persentWidth:0
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
        mounted(){
            this.$refs.playBox.style.animationPlayState="paused";
            this.currentcolor = this.currentColor
            this.ballwidth = this.ballWidth
            this.$refs.ball.style.width = `${this.ballwidth}px`
            this.$refs.ball.style.height = `${this.ballwidth}px`
            this.$refs.ball.style.marginTop = `-${this.ballwidth / 2 - 1}px`
            if (!this.currentcolor.length > 0) return
            this.$refs.currentProgress.style.background = this.currentcolor
        },
        methods: {
            // back() {
            //     this.setFullScreen(false)
            // },
            // open() {
            //     this.setFullScreen(true)
            // },
            // 左右滑屏切换cd图片和歌词
            middleTouchStart(e) {
                // this.touch.initiated = true
                // // 用来判断是否是一次移动
                // this.touch.moved = false
                // const touch = e.touches[0]
                // this.touch.startX = touch.pageX
                // this.touch.startY = touch.pageY
            },
            middleTouchMove(e) {
                // 没有touchstart 返回
                // if (!this.touch.initiated) {
                // return
                // }
                // const touch = e.touches[0]
                // const deltaX = touch.pageX - this.touch.startX
                // const deltaY = touch.pageY - this.touch.startY
                // // y轴距离大于x轴距离 => 纵向滚动 => 返回
                // if (Math.abs(deltaY) > Math.abs(deltaX)) {
                // return
                // }
                // if (!this.touch.moved) {
                // this.touch.moved = true
                // }
                // const left = this.currentShow === 'cd' ? 0 : -window.innerWidth
                // // 滚动的距离  最大是0
                // const offsetWidth = Math.min(0, Math.max(-window.innerWidth, left + deltaX))
                // this.touch.percent = Math.abs(offsetWidth / window.innerWidth)
                // this.$refs.lyriclist.$el.style[transform] = `translate3d(${offsetWidth}px,0,0)`
                // this.$refs.lyriclist.$el.style[transitionDuration] = 0
                // this.$refs.middleL.style.opacity = 1 - this.touch.percent
                // this.$refs.middleL.style[transitionDuration] = 0
            },
            middleTouchEnd() {
                // if (!this.touch.moved) {
                // return
                // }
                // let offsetWidth
                // let opacity
                // if (this.currentShow === 'cd') {
                // if (this.touch.percent > 0.1) {
                //     offsetWidth = -window.innerWidth
                //     opacity = 0
                //     this.currentShow = 'lyric'
                // } else {
                //     offsetWidth = 0
                //     opacity = 1
                // }
                // } else {
                // if (this.touch.percent < 0.9) {
                //     offsetWidth = 0
                //     this.currentShow = 'cd'
                //     opacity = 1
                // } else {
                //     offsetWidth = -window.innerWidth
                //     opacity = 0
                // }
                // }
            },
            play(){                
                if(this.$store.state.playState===true){
                    this.$store.commit('pause');
                    this.$refs.playBox.style.animationPlayState="paused";
                }else {
                    this.$store.commit('play');
                    this.$refs.playBox.style.animationPlayState="running";
                }                
            },
            ...mapMutations({
                setMPlayerScreen: 'setMPlayerScreen',
                setLatalyListShow: 'setLatalyListShow'
            }),
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
                    if (isNaN(this.$store.state.dom.duration)) return
                    this.$store.state.dom.currentTime = this.$store.state.dom.duration * this.persentWidth / 100
                }
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
                console.log(this.$store.getters.getIsLoadStart,'gggggggg')
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
            animationPlayState(){
                if(this.$store.state.playState===true){
                    return {
                        'animation-play-state': 'running'
                    }
                }else {
                    return {
                        'animation-play-state': 'pause'
                    }
                }
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
    .music-player .schedule .progress-bar{
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
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
        height: 2px;
        background: red;
        float: left;
        background: #c62f2f;
    }
    .music-player .schedule .ball{
        width: 16px;
        height: 16px;
        margin-top: -7px;
        position: absolute;
        background: #fff;
        border-radius: 50%;
        float: left;
        cursor: pointer;
    }
        
</style>
