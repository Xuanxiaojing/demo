<template>
    <div class="music-player" v-show="this.$store.state.mPlayerScreen"> 
        <div class="music-player-cont">
        <div class="filterbg"></div>  
        <h2 class="clearfix music-title">
            <i class="fl fa fa-flip-horizontal fa-clock-o" aria-hidden="true"></i>
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
                <div style="display: none;">
                    <b>来自<strong>XXXXXX</strong>主题站</b><br/>
                    <b>iynas hdsh hska</b><br/>
                    <div class="play-box">
                        <img src="img/play.png" />
                    </div>														
                </div>
                <!-- <div class="middle" 
                @touchstart.prevent="middleTouchStart"
                @touchmove.prevent="middleTouchMove"
                @touchend="middleTouchEnd"
                >
                <div class="middle-l" ref="middleL">
                    <div class="cd-wrapper" ref="cdWrapper">
                    <div class="cd">
                        <img alt="" class="image">
                    </div>
                    </div>
                    <div class="playing-lyric-wrapper">
                    <div class="playing-lyric">
                        
                    </div>
                    </div>
                </div>
                </div> -->
                <div class="lyric">
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
                </div>	
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
                    <span class="ball" ref="ball" ></span>
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

            }
        },
        props:{
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
                    this.$store.commit('pause')
                }else {
                    this.$store.commit('play')
                }                
            },
            ...mapMutations({
                setMPlayerScreen: 'setMPlayerScreen'
            }),
            timerFomart (time) {
			if (isNaN(time)) return '00:00'
                let min = time / 60 > 9 ? Math.floor(time / 60) : '0' + Math.floor(time / 60)
                let miao = time % 60 > 9 ? Math.floor(time % 60) : '0' + Math.floor(time % 60)
                return min + ':' + miao
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
                if (this.$store.getters.getIsLoadStart) {
                    return {
                        'width': '0'
                    }
                } else {
                    return {
                        'width': `calc(${(this.$store.getters.getCurrentTime / this.$store.getters.getMusicDuration * 100).toFixed(2)}%`
                    }
                }                
            }
        }
    }
</script>
<!--
<style>
    .middle{
        position: fixed;
        width: 100%;
        top: 80px;
        bottom: 170px;
        white-space: nowrap;
        font-size: 0;
    }  
    .middle-l{
        display: inline-block;
        vertical-align: top;
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 80%;
    }
          
    .middle .cd-wrapper{
        position: absolute;
        left: 10%;
        top: 0;
        width: 80%;
        height: 100%;
    }
     
    .middle .cd-wrapper .cd{
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        border: 10px solid rgba(255, 255, 255, 0.1);
        border-radius: 50%;
    }
              
    .middle .cd-wrapper .play{
        animation: rotate 20s linear infinite;
    }
                
    .middle .cd-wrapper .pause{
        animation-play-state: paused;
    }
                
    .middle .cd-wrapper .image{
        position: absolute;
        left:0;
        top: 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;
    }
</style>-->
<!--
<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .player
    .normal-player
      position: fixed
      left: 0
      right: 0
      top: 0
      bottom: 0
      z-index: 150
      background: $color-background
      .background
        position: absolute
        left: 0
        top: 0
        width: 100%
        height: 100%
        z-index: -1
        opacity: 0.6
        filter: blur(20px)
      .top
        position: relative
        margin-bottom: 25px
        .back
          position absolute
          top: 0
          left: 6px
          z-index: 50
          .icon-back
            display: block
            padding: 9px
            font-size: $font-size-large-x
            color: $color-theme
            transform: rotate(-90deg)
        .title
          width: 70%
          margin: 0 auto
          line-height: 40px
          text-align: center
          no-wrap()
          font-size: $font-size-large
          color: $color-text
        .subtitle
          line-height: 20px
          text-align: center
          font-size: $font-size-medium
          color: $color-text
      .middle
        position: fixed
        width: 100%
        top: 80px
        bottom: 170px
        white-space: nowrap
        font-size: 0
        .middle-l
          display: inline-block
          vertical-align: top
          position: relative
          width: 100%
          height: 0
          padding-top: 80%
          .cd-wrapper
            position: absolute
            left: 10%
            top: 0
            width: 80%
            height: 100%
            .cd
              width: 100%
              height: 100%
              box-sizing: border-box
              border: 10px solid rgba(255, 255, 255, 0.1)
              border-radius: 50%
              &.play
                animation: rotate 20s linear infinite
              &.pause
                animation-play-state: paused
              .image
                position: absolute
                left: 0
                top: 0
                width: 100%
                height: 100%
                border-radius: 50%

          .playing-lyric-wrapper
            width: 80%
            margin: 30px auto 0 auto
            overflow: hidden
            text-align: center
            .playing-lyric
              height: 20px
              line-height: 20px
              font-size: $font-size-medium
              color: $color-text-l
        .middle-r
          display: inline-block
          vertical-align: top
          width: 100%
          height: 100%
          overflow: hidden
          .lyric-wrapper
            width: 80%
            margin: 0 auto
            overflow: hidden
            text-align: center
            .text
              line-height: 32px
              color: $color-text-l
              font-size: $font-size-medium
              &.current
                color: $color-text
      .bottom
        position: absolute
        bottom: 50px
        width: 100%
        .dot-wrapper
          text-align: center
          font-size: 0
          .dot
            display: inline-block
            vertical-align: middle
            margin: 0 4px
            width: 8px
            height: 8px
            border-radius: 50%
            background: $color-text-l
            &.active
              width: 20px
              border-radius: 5px
              background: $color-text-ll
        .progress-wrapper
          display: flex
          align-items: center
          width: 80%
          margin: 0px auto
          padding: 10px 0
          .time
            color: $color-text
            font-size: $font-size-small
            flex: 0 0 30px
            line-height: 30px
            width: 30px
            &.time-l
              text-align: left
            &.time-r
              text-align: right
          .progress-bar-wrapper
            flex: 1
        .operators
          display: flex
          align-items: center
          .icon
            flex: 1
            color: $color-theme
            &.disable
              color: $color-theme-d
            i
              font-size: 30px
          .i-left
            text-align: right
          .i-center
            padding: 0 20px
            text-align: center
            i
              font-size: 40px
          .i-right
            text-align: left
          .icon-favorite
            color: $color-sub-theme
      &.normal-enter-active, &.normal-leave-active
        transition: all 0.4s
        .top, .bottom
          transition: all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
      &.normal-enter, &.normal-leave-to
        opacity: 0
        .top
          transform: translate3d(0, -100px, 0)
        .bottom
          transform: translate3d(0, 100px, 0)
    .mini-player
      display: flex
      align-items: center
      position: fixed
      left: 0
      bottom: 0
      z-index: 180
      width: 100%
      height: 60px
      background: $color-highlight-background
      &.mini-enter-active, &.mini-leave-active
        transition: all 0.4s
      &.mini-enter, &.mini-leave-to
        opacity: 0
      .icon
        flex: 0 0 40px
        width: 40px
        padding: 0 10px 0 20px
        img
          border-radius: 50%
          &.play
            animation: rotate 10s linear infinite
          &.pause
            animation-play-state: paused
      .text
        display: flex
        flex-direction: column
        justify-content: center
        flex: 1
        line-height: 20px
        overflow: hidden
        .name
          margin-bottom: 2px
          no-wrap()
          font-size: $font-size-medium
          color: $color-text
        .desc
          no-wrap()
          font-size: $font-size-small
          color: $color-text-d
      .control
        flex: 0 0 30px
        width: 30px
        padding: 0 10px
        .icon-play-mini, .icon-pause-mini, .icon-playlist
          font-size: 30px
          color: $color-theme-d
        .icon-mini
          font-size: 32px
          position: absolute
          left: 0
          top: 0

  @keyframes rotate
    0%
      transform: rotate(0)
    100%
      transform: rotate(360deg)
</style>-->
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
