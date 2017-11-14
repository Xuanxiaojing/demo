<template>
  <div class="find findWrapper" >
        <!-- <div> -->
            <div class="seek">
                <input type="text" value="搜索你感兴趣的内容"/>
                <i class="fa fa-search" aria-hidden="true"></i>					
            </div>
            <!-- <div class="slideshow">
                <wc-swiper :duration="900" :interval="2000">
                    <wc-slide v-for="(slide, key) in list" :key="key">
                        <img :src="slide.image"/>
                    </wc-slide>
                </wc-swiper>
            </div> -->
            <div class="slideshow">
                <slide-show></slide-show>
            </div>
            
            
            <div class="subject-term">
                <h2>分类查看主题站</h2>
                <scroll>
                    <div class="theme clearfix" ref="theme">
                        <div v-for="item in this.$store.state.findData.Theme">
                            <img :src="item" ref="themeImg" />
                            <!-- <ul>
                                <li>设计</li>
                                <li>Design</li>
                            </ul> -->
                        </div>
                    </div>
                </scroll>
            </div>
            <div class="recommend-edit">
                <h2 class="clearfix more">
                    <span class="fl">编辑推荐</span>
                    <span class="fr">
                        <b>更多</b>
                        <i class="fa fa-angle-right" aria-hidden="true"></i>
                    </span>
                </h2>
                <ul class="list">
                    <li class="border" v-for="item in this.$store.state.findData.Recommend">
                        <h3 class="clearfix">
                            <span class="fl">{{item.title}}</span>
                            <strong class="fr">
                                <i class="fa fa-plus" aria-hidden="true"></i>
                            </strong>
                        </h3>
                        <dl>
                            <dt class="fl">
                                <img :src="item.src" />
                                <span class="v">V</span>
                            </dt>
                            <dd class="fr">
                                <p>{{item.describe}}</p>
                                <div>
                                    <span>{{item.flow}}</span>/<i>{{item.type}}</i>
                                </div>
                            </dd>
                        </dl>
                    </li>
                </ul>
            </div>
            <div class="ranking-list">
                <h2>排行榜与反馈</h2>
                <scroll>
                    <div class="theme clearfix" ref="theme">
                        <div v-for="item in this.$store.state.findData.rankingTheme">
                            <img :src="item" />
                            <!-- <p class="same-title">排行榜</p> -->
                        </div>
                    </div>
                </scroll>
            </div>

            <div class="slideshow show2">
                <slide-show></slide-show>
            </div>
            
            
            <div class="special">
                <h2 class="clearfix more">
                    <span class="fl">编辑推荐</span>
                    <span class="fr">
                        <b>更多</b>
                        <i class="fa fa-angle-right" aria-hidden="true"></i>
                    </span>
                </h2>
                <scroll>
                    <div class="theme clearfix">
                        <div v-for="item in this.$store.state.findData.specialTheme">
                            <img :src="item" />
                            <!-- <p class="same-title">24小时电影院</p> -->
                        </div>
                    </div>
                </scroll>
            </div>
            <div class="recommend-edit more-theme">
                <h2 class="clearfix more">
                    <span class="fl">更多主题站</span>
                </h2>
                <ul class="list">
                    <li class="border" v-for="item in this.$store.state.findData.MoreTheme">
                        <h3 class="clearfix">
                            <span class="fl">{{item.title}}</span>
                            <strong class="fr gray">
                                <i class="fa fa-check" aria-hidden="true"></i>
                            </strong>
                        </h3>
                        <dl>
                            <dt class="fl">
                                <img :src="item.src" />
                                <span class="v">V</span>
                            </dt>
                            <dd class="fr">
                                <p>{{item.describe}}</p>
                                <div>
                                    <span>{{item.flow}}</span>/<i>{{item.type}}</i>
                                </div>
                            </dd>
                        </dl>
                    </li>
                </ul>
                <p class="show-all">已显示全部内容</p>
            </div>
        <!-- </div> -->
        <Footer-nav></Footer-nav> 
    </div>
</template>

<script>
    import FooterNav from '@/components/footer/footer'
    import SlideShow from '@/components/slide-show/slide-show'
    import Bscroll from 'better-scroll'
    import Axios from 'axios'
    import api from '@/api/api.js' // 请求数据的文件
    import Scroll from '@/components/scroll/index' // 经过处理的better-scroll的可定制组件
    export default {
        components:{
            FooterNav,
            SlideShow,
            Scroll            
        },
        methods:{
            getSubjectTerm(){
                api.getSubjectTerm().then((data) => {
                    this.$store.commit('changeFindData',data.data.data.list)
                })
            }
        },
        mounted() { 
            // let wrapper = document.querySelector('.find-wrapper')
            // let scroll = new BScroll(this.$refs.findWrapper)
            // this.$nextTick(() => { this.scroll = new Bscroll(this.$refs.findWrapper, {}) }) 
            this.getSubjectTerm()
            // 根据渲染的图片的个数来设置theme的宽度
            // let img = this.$refs.theme.getElementsByTagName('img')[0]
            // let _this = this;
            // setTimeout(()=>{
            //     let imgs = _this.$refs.themeImg
            //     // let imgs = this.$refs.theme.getElementsByTagName('img')
            //     _this.$refs.theme.style.width = parseFloat(getComputedStyle(imgs[0])['width'])*(imgs.length+1) + 'px'
            //     console.log( _this.$refs.theme.style.width)
            // },800)                  
        }
    }
</script>

<style>

    .subject-term .theme{
        width:70rem;
    }
    .special .theme{
        width:114rem;
    }
</style>

