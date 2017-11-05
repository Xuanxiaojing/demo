<template>
  <div class="find findWrapper">
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
                    <div>
                        <img src="img/img1.png" />
                        <ul>
                            <li>设计</li>
                            <li>Design</li>
                        </ul>
                    </div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
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
                    <li class="border">
                        <h3 class="clearfix">
                            <span class="fl">一条</span>
                            <strong class="fr">
                                <i class="fa fa-plus" aria-hidden="true"></i>
                            </strong>
                        </h3>
                        <dl>
                            <dt class="fl">
                                <img src="img/img3.png" />
                                <span class="v">V</span>
                            </dt>
                            <dd class="fr">
                                <p>每天一条原创短视频，每天讲述一个动人的故事，每天精选人间美物，每天来和我一起过美</p>
                                <div>
                                    <span>3</span>万人关注/<i>生活</i>
                                </div>
                            </dd>
                        </dl>
                    </li>
                    <li class="border">
                        <h3 class="clearfix">
                            <span class="fl">一条</span>
                            <strong class="fr gray">
                                <i class="fa fa-check" aria-hidden="true"></i>
                            </strong>
                        </h3>
                        <dl>
                            <dt class="fl">
                                <img src="img/img3.png" />
                                <span class="v">V</span>
                            </dt>
                            <dd class="fr">
                                <p>每天一条原创短视频，每天讲述一个动人的故事，每天精选人间美物，每天来和我一起过美</p>
                                <div>
                                    <span>3</span>万人关注/<i>生活</i>
                                </div>
                            </dd>
                        </dl>
                    </li>
                </ul>
            </div>
            <div class="ranking-list">
                <h2>排行榜与反馈</h2>
                <div class="theme clearfix">
                    <div>
                        <img src="img/img1.png" />
                        <p class="same-title">排行榜</p>
                    </div>
                    <div>
                        <p class="same-title">告诉我们你想看的主题站</p>
                    </div>
                </div>
            </div>
            <!-- <div class="slideshow show2">
                <img src="img/show1.png" />
                <div class="circle">
                    <div class="white"></div>
                    <div></div>
                </div>
            </div> -->
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
                    <div>
                        <img src="img/img1.png" />
                        <p class="same-title">24小时电影院</p>
                    </div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
            <div class="recommend-edit more-theme">
                <h2 class="clearfix more">
                    <span class="fl">更多主题站</span>
                </h2>
                <ul class="list">
                    <li class="border">
                        <h3 class="clearfix">
                            <span class="fl">一条</span>
                            <strong class="fr gray">
                                <i class="fa fa-check" aria-hidden="true"></i>
                            </strong>
                        </h3>
                        <dl>
                            <dt class="fl">
                                <img src="img/img3.png" />
                                <span class="v">V</span>
                            </dt>
                            <dd class="fr">
                                <p>每天一条原创短视频，每天讲述一个动人的故事，每天精选人间美物，每天来和我一起过美</p>
                                <div>
                                    <span>3</span>万人关注/<i>生活</i>
                                </div>
                            </dd>
                        </dl>
                    </li>
                    <li class="border">
                        <h3 class="clearfix">
                            <span class="fl">一条</span>
                            <strong class="fr gray">
                                <i class="fa fa-check" aria-hidden="true"></i>
                            </strong>
                        </h3>
                        <dl>
                            <dt class="fl">
                                <img src="img/img3.png" />
                                <span class="v">V</span>
                            </dt>
                            <dd class="fr">
                                <p>每天一条原创短视频，每天讲述一个动人的故事，每天精选人间美物，每天来和我一起过美</p>
                                <div>
                                    <span>3</span>万人关注/<i>生活</i>
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

    export default {
        mounted() { 
            // let wrapper = document.querySelector('.find-wrapper')
            // let scroll = new BScroll(this.$refs.findWrapper)
            // this.$nextTick(() => { this.scroll = new Bscroll(this.$refs.findWrapper, {}) }) 
        },
        components:{
            FooterNav,
            SlideShow
            
        }
    }
</script>
