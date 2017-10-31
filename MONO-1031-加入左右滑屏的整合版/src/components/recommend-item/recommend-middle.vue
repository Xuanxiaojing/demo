<template>
	<!-- 最外层div的类名不能确定，需要根据数据来判断添加哪个类名，在外面计算好属性传进来 -->
	<div>
		<div class="sign" v-if="this.itemData.type === '阅读'">
            <preview :list="[{'src':this.itemData.img_json.src,w:1000,h:1000}]" v-lazy="this.itemData.img_json.src">
                    
            </preview>
        </div>
        <div class="category" v-if="this.itemData.type === 'OWSPACE' || this.itemData.type === '微信'">
            <div class="topic">
                <preview :list="[{'src':this.itemData.img_json.src,w:1200,h:1200}]" v-lazy="this.itemData.img_json.src">
                    <!-- <img v-lazy="this.itemData.img_json.src" /> -->
                </preview>
                <div>
                    <i class="fa fa-quote-left" aria-hidden="true"></i>
                </div>							
            </div>
            <h2>{{this.itemData.img_json.img_title}}</h2>
            <p class="article">{{this.itemData.img_json.img_describe}}</p>
            <p class="border-bottom"></p>
        </div>
        <div class="banner" v-if="this.itemData.type === '创意'">
            <preview :list="[{'src':this.itemData.img_json.src,w:1000,h:1000}]" v-lazy="this.itemData.img_json.src" >
                    <!-- <img v-lazy="this.itemData.img_json.src" /> -->
            </preview>
            <!-- <ul class="function clearfix">
                <li class="fa fa-share-square-o" aria-hidden="true"></li>
                <li class="fa fa-heart-o" aria-hidden="true"></li>							
                <li class="fa fa-thumbs-o-up" aria-hidden="true">
                    <span>{{this.itemData.thisItem.actionBar.fabulous}}</span>
                </li>					
                <li class="fa fa-commenting-o" aria-hidden="true">
                    <span>{{this.itemData.thisItem.actionBar.comment}}</span>
                </li>	
                <li class="fa fa-ellipsis-h fr lastone" aria-hidden="true"></li>					
            </ul>   -->
            <recommend-footer :itemData="this.itemData.thisItem" :index="this.index" :type="type"></recommend-footer>
        </div>
         <!-- <div class="category" v-if="this.itemData.type === '微信'">
            <div class="topic">
                <img :src="this.itemData.img_json.src" />							
                <re-play-bar :index="this.index" :itemData="this.itemData" :type="type"></re-play-bar>						
            </div>
            <h2>{{this.itemData.img_json.img_title}}</h2>
            <p class="article">{{this.itemData.img_json.img_describe}}</p>
            <p class="border-bottom"></p>
            
        </div>  -->
        <div class="category" v-if="this.itemData.type === '音乐'">
            <div class="topic">
                <!-- <img :src="this.itemData.img_json.src" /> -->
                <preview :list="[{'src':songImg,w:1000,h:1000}]" v-if="this.itemData.music" v-lazy="songImg">
                   
                </preview>
                <re-play-bar :index="this.index" :itemData="this.itemData" :type="type"></re-play-bar>						
            </div>
            <h2>{{this.itemData.img_json.img_title}}</h2>
            <p class="article">{{this.itemData.img_json.img_describe}}</p>
            <p class="border-bottom"></p>
        </div>
        <!-- <div class="category" id="videoContainer"  v-if="this.itemData.type === 'MV'">
            <div class="topic">
                <video id="video" preload controls>
                    <source :src="this.itemData.img_json.src" type="video/mp4">
                </video>
                <div id="videoControls">
                    <p class="transparency"></p>
                    <p class="clearfix music-test">
                        <em class="fl" id="mvStart">00:00</em>
                        <span class="fl mv-jindu" id="progressWrap">
                            <strong  id="playProgress">
                                <b id="showProgress"></b>
                            </strong>	
                            
                        </span>
                        <em class="fr">
                            <span id="mvEnd">06:32</span>
                            <i  id="fullScreenBtn" title="FullScreen Toggle" class="fa fa-expand mv-expand" aria-hidden="true"></i>
                        </em>
                    </p>
                </div>								
                <button id="playBtn" aria-hidden="true">
                    <i class="fa fa-play" aria-hidden="true"></i>
                </button>
            </div>

            <h2>暗黑视觉系包裹下的清澈女声</h2>
            <p class="article">忙碌的巴黎人只需要稍微挤出一点空闲时间，就可以欣赏到这一年出至忙碌的巴黎人只就可就可以欣赏到这一年出至忙碌的巴黎人只就可以欣赏到这一年出至忙碌的巴黎人只需要稍微挤出一点空闲时间，就可以欣赏到这一上几个月甚至…</p>
            <p class="border-bottom"></p>
        </div> -->

	</div>
</template>
<script>
import recommendHeader from '@/components/recommend-item/recommend-header'
import recommendFooter from '@/components/recommend-item/recommend-footer'
import rePlayBar from '@/views/musicPlayer/re-playbar'
import Axios from 'axios'
import Preview from '@/components/preview/preview'  // 图片预览效果

export default {
    data(){
        return {
            // songImg:''
        }
    },
	components: {
		recommendHeader,
        recommendFooter,
        rePlayBar,
        Preview
	},
    props:['itemData','index','type'],
    computed: {
        songImg(){
            return `https://y.gtimg.cn/music/photo_new/T002R300x300M000${this.itemData.music[0].data[0].album.mid}.jpg?max_age=2592000`
        }
    }
}

</script>

<style>
    #app .content .topic{
        height: 25rem;
    }

</style>

