<template>
    <div>
        <div class="nav">
            <ul class="clearfix">
                <li><a href="javascript:;">早午茶</a></li>
                <li><a href="javascript:;">我的关注</a></li>
                <li><a href="javascript:;">音乐</a></li>
            </ul>
            <div class="music"><img src="img/music.png"/></div>
        </div>
        <div class="content">
            <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite">
                <div class="morningtea">
                    <p>
                        <img src="img/mortea.png" /> 
                        <span>17.09.18</span>
                    </p>
                    <p><span>MONO今日编辑精选</span></p>
                    <div class="border"></div>
                </div>
                <div class="kind1 same">
                    <div class="clearfix creater">
                        <img class="fl" src="img/hm.png" />
                        <h2 class="fl">MONO日签</h2>
                        <span class="fr">
                            <i class="fa fa-link fa-rotate-90" aria-hidden="true"></i>
                            阅读
                        </span>
                    </div>
                    <div class="sign">
                        <img src="img/riqian.png" />
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
                </div>
                <div class="kind2 same">
                    <div class="clearfix creater">
                        <img class="fl" src="img/hm.png" />
                        <h2 class="fl">虹膜</h2>
                        <span class="fr">
                            <i class="fa fa-link fa-rotate-90" aria-hidden="true"></i>
                            微信
                        </span>
                    </div>
                    <div class="category">
                        <div class="topic">
                            <img src="img/img1.png" />
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
                <div class="kind3">
                    <div class="clearfix creater">
                        <img class="fl" src="img/hm.png" />
                        <h2 class="fl">MONO日签</h2>
                        <span class="fr">
                            <i class="fa fa-link fa-rotate-90" aria-hidden="true"></i>
                            创意
                        </span>
                    </div>
                    <div class="banner">
                        <img src="img/img2.png" />
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
                </div>
                <div class="kind4 same">
                    <div class="clearfix creater">
                        <img class="fl" src="img/hm.png" />
                        <h2 class="fl">虹膜</h2>
                        <span class="fr">
                            <i class="fa fa-link fa-rotate-90" aria-hidden="true"></i>
                            微信
                        </span>
                    </div>
                    <div class="category">
                        <div class="topic">
                            <img src="img/img1.png" />							
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
                </div>
            </v-scroll>
        </div>
        <Footer-nav></Footer-nav>
    </div>
</template>

<script>
    import FooterNav from '@/components/footer'
    import Scroll from '@/components/scroll'
    import Axios from 'axios'
    export default {
        data(){
            return {
                counter : 1, //默认已经显示出15条数据 count等于一是让从16条开始加载
                num : 15,  // 一次显示多少条
                pageStart : 0, // 开始页数
                pageEnd : 0, // 结束页数
                listdata: [], // 下拉更新数据存放数组
                downdata: []  // 上拉更多的数据存放数组
            }
        },
        components:{
            FooterNav,
            'v-scroll': Scroll
        },
        mounted(){
            Axios.get(
                'http://localhost:3100/api/users'
            )
            .then((data)=>{
                console.log(data,'data')
            })
        },
        methods: {
            onRefresh(done) {
                    this.getList();
            
                    done() // call done
            
            },
            onInfinite(done) {
                let vm = this;
                vm.$http.get('https://api.github.com/repos/typecho-fans/plugins/contents/').then((response) => {
                    vm.counter++;
                    vm.pageEnd = vm.num * vm.counter;
                    vm.pageStart = vm.pageEnd - vm.num;
                    let arr = response.data;
                        let i = vm.pageStart;
                        let end = vm.pageEnd;
                        for(; i<end; i++){
                            let obj ={};
                            obj["name"] = arr[i].name;
                            vm.downdata.push(obj);
                            if((i + 1) >= response.data.length){
                            this.$el.querySelector('.load-more').style.display = 'none';
                            return;
                            }
                            }
                    done() // call done
                    }, (response) => {
                        console.log('error');
                    });
            }
        }
    }
</script>

