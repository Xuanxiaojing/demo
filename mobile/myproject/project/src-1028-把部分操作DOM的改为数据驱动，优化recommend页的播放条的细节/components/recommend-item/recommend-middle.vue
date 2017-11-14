<template>
	<!-- 最外层div的类名不能确定，需要根据数据来判断添加哪个类名，在外面计算好属性传进来 -->
	<div>
		<div class="sign" v-if="this.itemData.type === '阅读'">
            <!-- <x-switch v-model="showHideOnBlur" :title="$t('hide on clicking mask')"></x-switch> -->
            <!-- <img :src="this.itemData.img_json.src" @click="showHideOnBlur"/> -->
            <preview :src="this.itemData.img_json.src">
                    
            </preview>
            <!-- <img :src="this.itemData.img_json.src" /> -->
        </div>
        <div class="category" v-if="this.itemData.type === 'OWSPACE' || this.itemData.type === '微信'">
            <div class="topic">
                <preview :src="this.itemData.img_json.src">
                    <!-- <img :src="this.itemData.img_json.src" /> -->
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
            <preview :src="this.itemData.img_json.src">
                    <!-- <img :src="this.itemData.img_json.src" /> -->
            </preview>
            <!-- <img :src="this.itemData.img_json.src" /> -->
            <ul class="function clearfix">
                <li class="fa fa-share-square-o" aria-hidden="true"></li>
                <li class="fa fa-heart-o" aria-hidden="true"></li>							
                <li class="fa fa-thumbs-o-up" aria-hidden="true">
                    <span>{{this.itemData.thisItem.actionBar.fabulous}}</span>
                </li>					
                <li class="fa fa-commenting-o" aria-hidden="true">
                    <span>{{this.itemData.thisItem.actionBar.comment}}</span>
                </li>	
                <li class="fa fa-ellipsis-h fr lastone" aria-hidden="true"></li>					
            </ul>  
            
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
                <!-- <img :src="songImg" v-if="this.itemData.music" /> -->
                <preview :src="songImg" v-if="this.itemData.music">
                    <!-- <img :src="this.itemData.img_json.src" /> -->
                </preview>
                <re-play-bar :index="this.index" :itemData="this.itemData" :type="type"></re-play-bar>						
            </div>
            <h2>{{this.itemData.img_json.img_title}}</h2>
            <p class="article">{{this.itemData.img_json.img_describe}}</p>
            <p class="border-bottom"></p>
            <!--音频播放标签-->
            
        </div>
	</div>
</template>
<script>
import recommendHeader from '@/components/recommend-item/recommend-header'
import recommendFooter from '@/components/recommend-item/recommend-footer'
import rePlayBar from '@/views/musicPlayer/re-playbar'
import Axios from 'axios'

import Preview from '@/components/preview.vue'

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
    watch:{
        // songImg(){

        // }
    },
    computed: {
        songImg(){
            // console.log(this.itemData.music,'mountedmountedmountedmountedmountedmountedmountedmounted')  
            // console.log(this.itemData,'this.itemData')
            /* if(!this.itemData.music){
                this.itemData.music =
            } */
            return `https://y.gtimg.cn/music/photo_new/T002R300x300M000${this.itemData.music[0].data[0].album.mid}.jpg?max_age=2592000`
        }
    },
    methods: {
        showHideOnBlur(){

        }
    }
}
</script>

<style>
    #app .content .topic{
        height: 25rem;
    }

</style>


