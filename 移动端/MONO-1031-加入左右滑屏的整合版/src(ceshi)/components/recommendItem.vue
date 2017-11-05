<template>
	<!-- 最外层div的类名不能确定，需要根据数据来判断添加哪个类名，在外面计算好属性传进来 -->
	<div>
		<div class="kind1 same" v-if="this.itemData.type === '阅读'">
            <div class="clearfix creater">
                <img class="fl" :src="this.itemData.sub_img" />
                <h2 class="fl">{{this.itemData.column}}</h2>
                <span class="fr">
                    {{this.itemData.type}}
                </span>
            </div>
            <div class="sign">
                <img :src="this.itemData.img_json.src" />
            </div>
            <ul class="function clearfix">
                <li class="fa fa-share-square-o" aria-hidden="true"></li>
                <li class="fa fa-heart-o" aria-hidden="true"></li>							
                <li class="fa fa-thumbs-o-up" aria-hidden="true">
                    <span>{{this.itemData.actionBar.fabulous}}</span>
                </li>					
                <li class="fa fa-commenting-o" aria-hidden="true">
                    <span>{{this.itemData.actionBar.comment}}</span>
                </li>	
                <li class="fa fa-ellipsis-h fr lastone" aria-hidden="true"></li>					
            </ul>
        </div>
        <div class="kind2 same" v-if="this.itemData.type === '微信' || this.itemData.type === 'OWSPACE'">
            <div class="clearfix creater">
                <img class="fl" :src="this.itemData.sub_img" />
                <h2 class="fl">{{this.itemData.column}}</h2>
                <span class="fr">
                    <i class="fa fa-link fa-rotate-90" aria-hidden="true"></i>
                    {{this.itemData.type}}
                </span>
            </div>
            <div class="category">
                <div class="topic">
                    <img :src="this.itemData.img_json.src" />
                    <div>
                        <i class="fa fa-quote-left" aria-hidden="true"></i>
                        <p>
                            
                        </p>
                    </div>							
                </div>
                <h2>{{this.itemData.img_json.img_title}}</h2>
                <p class="article">{{this.itemData.img_json.img_describe}}</p>
                <p class="border-bottom"></p>
            </div>
            <ul class="function clearfix">
                <li class="fa fa-share-square-o" aria-hidden="true"></li>
                <li class="fa fa-heart-o" aria-hidden="true"></li>							
                <li class="fa fa-thumbs-o-up" aria-hidden="true">
                    <span>{{this.itemData.actionBar.fabulous}}</span>
                </li>					
                <li class="fa fa-commenting-o" aria-hidden="true">
                    <span>{{this.itemData.actionBar.comment}}</span>
                </li>	
                <li class="fa fa-ellipsis-h fr lastone" aria-hidden="true"></li>					
            </ul>
        </div>
        <div class="kind3" v-if="this.itemData.type === '创意'">
            <div class="clearfix creater">
                <img class="fl" :src="this.itemData.sub_img" />
                <h2 class="fl">{{this.itemData.column}}</h2>
                <span class="fr">
                    <i class="fa fa-link fa-rotate-90" aria-hidden="true"></i>
                    {{this.itemData.type}}
                </span>
            </div>
            <div class="banner">
                <img :src="this.itemData.img_json.src" />
                <p></p>
                <ul class="function clearfix">
                    <li class="fa fa-share-square-o" aria-hidden="true"></li>
                    <li class="fa fa-heart-o" aria-hidden="true"></li>							
                    <li class="fa fa-thumbs-o-up" aria-hidden="true">
                        <span>{{this.itemData.actionBar.fabulous}}</span>
                    </li>					
                    <li class="fa fa-commenting-o" aria-hidden="true">
                        <span>{{this.itemData.actionBar.comment}}</span>
                    </li>	
                    <li class="fa fa-ellipsis-h fr lastone" aria-hidden="true"></li>					
                </ul>
            </div>					
        </div>
        <div class="kind4 same" v-if="this.itemData.type === '音乐'">
            <div class="clearfix creater">
                <img class="fl" :src="this.itemData.sub_img" />
                <h2 class="fl">{{this.itemData.column}}</h2>
                <span class="fr">
                    {{this.itemData.type}}
                </span>
            </div>
            <div class="category">
                <div class="topic">
                    <img :src="this.itemData.img_json.src" />			
                    <div>
                        <p class="transparency"></p>
                        <p class="clearfix music-test">
                            <i class="fa fa-play" aria-hidden="true"></i>
                            <span>hellohellohello</span>
                            <em class="fr">
                                03:47
                                <i class="fa fa-music" aria-hidden="true"></i>
                            </em>
                        </p>
                    </div>							
                </div>
                <h2>{this.itemData.img_json.img_title}</h2>
                <p class="article">{this.itemData.img_json.img_describe}</p>
                <p class="border-bottom"></p>
            </div>
            <ul class="function clearfix">
                <li class="fa fa-share-square-o" aria-hidden="true"></li>
                <li class="fa fa-heart-o" aria-hidden="true"></li>							
                <li class="fa fa-thumbs-o-up" aria-hidden="true">
                    <span>{{this.itemData.actionBar.fabulous}}</span>
                </li>					
                <li class="fa fa-commenting-o" aria-hidden="true">
                    <span>{{this.itemData.actionBar.comment}}</span>
                </li>	
                <li class="fa fa-ellipsis-h fr lastone" aria-hidden="true"></li>					
            </ul>
        </div>
        <div class="kind4 kind5 same" v-if="this.itemData.type === '生活'">
            <div class="clearfix creater">
                <img class="fl" src="img/hm.png" />
                <h2 class="fl">美食台</h2>
                <span class="fr">
                    生活
                </span>
            </div>
            <div class="category" id="videoContainer">
                <div class="topic">
                    <video id="video" preload controls>
                        <source src="img/mv1.mp4" type="video/mp4">
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
            </div>
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
        </div> <!---->
	</div>
</template>
<script>


export default {
	props:['itemData','index'],
	computed: {
		  
	}
}
</script>

<style>
    .banner img{
       width: 100%;
    }
</style>




