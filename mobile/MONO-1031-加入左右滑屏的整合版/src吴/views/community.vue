<template>
  <div class="cummunity">
        <div class="club">
            <h2 class="fl">社区</h2>
            <i class="fa fr fa-plus" aria-hidden="true"></i>
        </div>
        <div class="seek">
            <input type="text" value="搜索你感兴趣的内容"/>
            <i class="fa fa-search" aria-hidden="true"></i>					
        </div>
        <div class="special">
            <h2 class="clearfix more">
                <span class="fl">热门小组、活动</span>
                <span class="fr">
                    <a href="javascript:;">查看全部</a>
                </span>
            </h2>
            <div class="theme clearfix">
                <div>
                    <img src="img/img1.png" />
                    <p class="same-title">24小时电影院</p>
                    <p class="person-num"><span>1234</span>人</p>
                </div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
        <div class="more-groups">
            <h3>我参加的小组和活动</h3>
            <p>还美参加任何小组和活动，点我发现更多<br>/^-^/</p>
        </div>
        <!-- <div class="slideshow">
            <img src="img/show1.png" />
            <div class="circle">
                <div class="white"></div>
                <div></div>
            </div>
        </div> -->
        <div class="slideshow">
            <slide-show></slide-show>
        </div>
        <div class="diff-theme">
            <div class="theme clearfix">
                <div>
                    <img src="img/img1.png" />
                    <p class="same-title">24小时电影院</p>
                    <p class="person-num"><span>1234</span>人</p>
                </div>
                <div></div>
            </div>
        </div>	
        <Footer-nav></Footer-nav>			
    </div>
</template>

<script>
    import FooterNav from '@/components/footer'
    import SlideShow from '@/components/slide-show'

    export default {
        components:{
            FooterNav,
            SlideShow
        }
    }
</script>
