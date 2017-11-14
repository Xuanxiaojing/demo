<template>
  <div ref="wrapper">
    <!-- <div class="scroll-content"> -->

      <slot></slot>
      <!-- <slot name="pullup"
            :pullUpLoad="pullUpLoad"
            :isPullUpLoad="isPullUpLoad"
      >
        <div class="pullup-wrapper" v-if="pullUpLoad">
          <div class="before-trigger" v-if="!isPullUpLoad">
            <span>123123123</span>
          </div>
          <div class="after-trigger" v-else>
            <loadmore></loadmore>
          </div>
        </div>
      </slot>
    </div>
    <slot name="pulldown"
          :pullDownRefresh="pullDownRefresh"
          :pullDownStyle="pullDownStyle"
          :beforePullDown="beforePullDown"
          :pulling="pulling"
          :bubbleY="bubbleY"
    >
      <div ref="pulldown" class="pulldown-wrapper" :style="pullDownStyle" v-if="pullDownRefresh">
        <div class="before-trigger" v-if="beforePullDown">
          123
        </div>
        <div class="after-trigger" v-else>
          <div v-if="pulling" class="loading">
            <loadmore></loadmore>
          </div>
          <div v-else><span>success</span></div>
        </div>
      </div>
    </slot> -->
  </div>
</template>
<script>
  import BScroll from 'better-scroll'
  import Loadmore from '@/components/loadmore/loadmore'

  export default {
    data(){
      return {
        beforePullDown: true,
        isRebounding: false,
        isPullingDown: false,
        pulling: false,
        isPullUpLoad: false,
        pullUpDirty: true,
        pullDownStyle: '',
        bubbleY: 0
      }
    },
    computed: {
      // pullUpTxt() {
      //   const moreTxt = this.pullUpLoad && this.pullUpLoad.txt && this.pullUpLoad.txt.more || this.$i18n.t('scrollComponent.defaultLoadTxtMore')
      //   const noMoreTxt = this.pullUpLoad && this.pullUpLoad.txt && this.pullUpLoad.txt.noMore || this.$i18n.t('scrollComponent.defaultLoadTxtNoMore')
      //   return this.pullUpDirty ? moreTxt : noMoreTxt
      // },
      // refreshTxt() {
      //   return this.pullDownRefresh && this.pullDownRefresh.txt || this.$i18n.t('scrollComponent.defaultRefreshTxt')
      // }
    },
    components: {
      Loadmore
    },
    props: {
      probeType: {
        type: Number,
        default: 1
      },
      click: {
        type: Boolean,
        default: true
      },
      scrollX: { 
        type: Boolean, 
        default: true 
      },
      data: {
        type: Array,
        default: null
      },
      // pullup: {
      //   type: Boolean, 
      //   default: false 
      // }, /** * 是否派发顶部下拉的事件，用于下拉刷新 */ 
      // pulldown: { 
      //   type: Boolean,
      //    default: false 
      // },
      pullDownRefresh: {
        type: Boolean,
        default: false
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      },
      listenScroll: {
        type: Boolean,
        default: false
      },
      beforeScroll: {
        type: Boolean,
        default: false
      },
      refreshDelay: {
        type: Number,
        default: 20
      },
      scrollbar: {
        type: null,
        default: false
      },
      startY: {
        type: Number,
        default: 0
      }
    },
    created() {
      this.pullDownInitTop = -50
    },
    mounted() {
      // 在this.$nextTick 的回调函数中初始化 better-scroll 。因为这个时候，wrapper 的 DOM 已经渲染了，我们可以正确计算它以及它内层 content 的高度，以确保滚动正常。
      // this.$nextTick(() => {
        // this.wrapperWidth()
        this.$nextTick(() => {            
            this._initScroll()
        })
      // })
    },
    methods: {
      _initScroll() {
        
        if (!this.$refs.wrapper) {
          return
        }
        
        this.scroll = new BScroll(this.$refs.wrapper, {
          probeType: this.probeType,
          click: this.click,
          scrollX:this.scrollX,
          pullDownRefresh: this.pullDownRefresh,
          pullUpLoad: this.pullUpLoad,
          // scrollY: this.freeScroll || this.direction === DIRECTION_V,
          // scrollX: this.freeScroll || this.direction === DIRECTION_H,
          scrollbar: this.scrollbar,
          pullDownRefresh: this.pullDownRefresh,
          pullUpLoad: this.pullUpLoad,
          startY: this.startY
        })
        if (this.listenScroll) {
          let _this = this
          this.scroll.on('scroll', pos => {
            // 派发事件获取pos 值
            _this.$emit('scroll', pos)
          })
        }
        if (this.listenBeforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScrollStart')
          })
        }
        if (this.pullDownRefresh) {
          this._initPullDownRefresh()
        }
        if (this.pullUpLoad) {
          this._initPullUpLoad()
        }
        // 上拉刷新
        if (this.pullUp) {
          this.scroll.on('scrollEnd', () => {
            if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
              this.$emit('scrollToEnd')
            }
          })
        }

        // 开始滚动前判断
        if (this.beforeScroll) {
          this.scroll.on('beforeScrollStart', () => {
            this.$emit('beforeScroll')
          })
        }
      },
      enable() {
        this.scroll && this.scroll.enable()
      },
      disable() {
        this.scroll && this.scroll.disable()
      },
      refresh() {
        this.scroll && this.scroll.refresh()
      },
      scrollTo() {
        this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments)
      },
      scrollToElement() {
        this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments)
      },
      destroy() {
        this.scroll.destroy()
      },
      forceUpdate(dirty) {
        if (this.pullDownRefresh && this.isPullingDown) {
          this.pulling = false
          this._reboundPullDown().then(() => {
            this._afterPullDown()
          })
        } else if (this.pullUpLoad && this.isPullUpLoad) {
          this.isPullUpLoad = false
          this.scroll.finishPullUp()
          this.pullUpDirty = dirty
          this.refresh()
        } else {
          this.refresh()
        }
      },
      _initPullDownRefresh() {
        this.scroll.on('pullingDown', () => {
          this.beforePullDown = false
          this.isPullingDown = true
          this.pulling = true
          this.$emit('pullingDown')
        })
        this.scroll.on('scroll', (pos) => {
          if (this.beforePullDown) {
            // this.bubbleY = Math.max(0, pos.y + this.pullDownInitTop)
            this.pullDownStyle = `top:${Math.min(pos.y + this.pullDownInitTop, 10)}px`
          } else {
            // this.bubbleY = 0
          }
          if (this.isRebounding) {
            this.pullDownStyle = `top:${10 - (this.pullDownRefresh.stop - pos.y)}px`
          }
        })
      },
      _initPullUpLoad() {
        this.scroll.on('pullingUp', () => {
          this.isPullUpLoad = true
          this.$emit('pullingUp')
        })
      },
      _reboundPullDown() {
        const {stopTime = 600} = this.pullDownRefresh
        return new Promise((resolve) => {
          setTimeout(() => {
            this.isRebounding = true
            this.scroll.finishPullDown()
            this.isPullingDown = false
            resolve()
          }, stopTime)
        })
      },
      _afterPullDown() {
        setTimeout(() => {
          this.pullDownStyle = `top:${this.pullDownInitTop}px`
          this.beforePullDown = true
          this.isRebounding = false
          this.refresh()
        }, this.scroll.options.bounceTime)
      }
    },
    watch: {
      data() {
        setTimeout(() => {
          this.forceUpdate(true)
        }, this.refreshDelay)
      }
    }
  }
</script>
<style>
  
  .pullup-wrapper{
    width: 100%;
    display: flex;
    justify-content:center;
    align-items:center;
    padding: 16px 0;
  }    
  .pulldown-wrapper{
    position: absolute;
    width: 100%;
    left: 0;
    display: flex;
    justify-content :center;
    align-items: center;
    transition: all;
    
  }
  .after-trigger{
    margin-top: 10px;
  }
  .pulldown-wrapper .weui-loadmore{
    margin:5rem auto 0;
  }
      
</style>


