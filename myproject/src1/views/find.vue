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
                <div class="theme clearfix">
                    <div v-for="item in this.$store.state.findData.Theme">
                        <img :src="item" />
                        <!-- <ul>
                            <li>设计</li>
                            <li>Design</li>
                        </ul> -->
                    </div>
                </div>
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
                <div class="theme clearfix">
                    <div v-for="item in this.$store.state.findData.rankingTheme">
                        <img :src="item" />
                        <!-- <p class="same-title">排行榜</p> -->
                    </div>
                </div>
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
                <div class="theme clearfix">
                    <div v-for="item in this.$store.state.findData.specialTheme">
                        <img :src="item" />
                        <!-- <p class="same-title">24小时电影院</p> -->
                    </div>
                </div>
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
    import FooterNav from '@/components/footer'
    import SlideShow from '@/components/slide-show'
    import Bscroll from 'better-scroll'
    import Axios from 'axios'

    export default {
        components:{
            FooterNav,
            SlideShow            
        },
        methods:{
            getSubjectTerm(){
                Axios.get(
                    'http://localhost:3200/api/find'
                )
                .then((data) => {
                    this.$store.commit('changeFindData',data.data.data.list)
                })
            }
        },
        mounted() { 
            // let wrapper = document.querySelector('.find-wrapper')
            // let scroll = new BScroll(this.$refs.findWrapper)
            // this.$nextTick(() => { this.scroll = new Bscroll(this.$refs.findWrapper, {}) }) 
            this.getSubjectTerm()
        }
    }
</script>
