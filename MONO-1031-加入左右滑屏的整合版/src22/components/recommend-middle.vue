<template>
	<!-- 最外层div的类名不能确定，需要根据数据来判断添加哪个类名，在外面计算好属性传进来 -->
	<div>
		<div class="sign" v-if="this.itemData.type === '阅读'">
            <img src="../../static/img/riqian.png" />
        </div>
        <div class="category" v-if="this.itemData.type === 'OWSPACE'">
            <div class="topic">
                <img src="../../static/img/img1.png" />
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
        <div class="banner" v-if="this.itemData.type === '创意'">
            <img src="../../static/img/img2.png" />
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
        <div class="category" v-if="this.itemData.type === '微信'">
            <div class="topic">
                <img src="../../static/img/img1.png" />							
                <re-play-bar :index="this.index" :itemData="this.itemData"></re-play-bar>						
            </div>
            <h2>暗黑视觉系包裹下的清澈女声</h2>
            <p class="article">忙碌的巴黎人只需要稍微挤出一点空闲时间，就可以欣赏到这一年出至忙碌的巴黎人只就可就可以欣赏到这一年出至忙碌的巴黎人只就可以欣赏到这一年出至忙碌的巴黎人只需要稍微挤出一点空闲时间，就可以欣赏到这一上几个月甚至…</p>
            <p class="border-bottom"></p>
            <!--音频播放标签-->
            
        </div>
	</div>
</template>
<script>
import recommendHeader from '@/components/recommend-header'
import recommendFooter from '@/components/recommend-footer'
import rePlayBar from '@/components/re-playbar'
import Axios from 'axios'

export default {
	components: {
		recommendHeader,
        recommendFooter,
        rePlayBar
	},
	props:['itemData','index']
}
</script>



