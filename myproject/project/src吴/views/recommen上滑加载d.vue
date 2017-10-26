<template>
    <div>
        <div class="nav">
            <ul class="clearfix">
                <li><a href="javascript:;">早午茶</a></li>
                <li><a href="javascript:;">我的关注</a></li>
                <li><a href="javascript:;">音乐</a></li>
            </ul>
            <!-- <div class="music" @click="setMPlayerScreen(true)"><img src="../assets/img/music.png" /></div> -->
            <!-- <router-link to="/musicplayer" tag="div" class="music">
                <img src="../assets/img/music.png" />
            </router-link> -->
        </div>
        <div class="content"  ref="wrapper">
            <v-scroll :on-refresh="onRefresh" :on-infinite="onInfinite">
                <div class="morningtea">
                    <p>
                        <!-- <img src="../assets/img/mortea.png" />  -->
                        <span>17.09.18</span>
                    </p>
                    <p><span>MONO今日编辑精选</span></p>
                    <div class="border"></div>
                </div>
                <recommend-item 
                    v-for="item,index in listdata" 
                    key="index"
                    :itemData="item"
                    :index="index"
                    type="listdata"
                >
                                      
                </recommend-item>
                <recommend-item 
                    v-for="item,index in downdata" 
                    key="index"
                    :itemData="item"
                    :index="index"
                    type="downdata"
                >
                                      
                </recommend-item>
                <!-- <p
                    v-for="item,index in downdata" 
                >
                    {{item.id}}          
                </p> -->
            <!-- </div> -->
            </v-scroll>
            
        </div>
        <Footer-nav></Footer-nav>
    </div>
</template>

<script>
    import FooterNav from '@/components/footer'
    import Scroll from '@/components/scroll'
    import recommendItem from '@/components/recommendItem'
    import recommendFooter from '@/components/recommend-footer'
    // import bpfangqi from '@/components/vue-bofangqi'

    import Axios from 'axios'

    // import Bscroll from 'better-scroll'
   import { mapGetters, mapMutations, mapActions } from 'vuex'
    
    export default {
        data(){
            return {
                recommendList:[],
                counter : 1, //默认已经显示出15条数据 count等于一是让从16条开始加载
                num : 4,  // 一次显示多少条
                pageStart : 0, // 开始页数
                pageEnd : 0, // 结束页数
                // listdata: this.$store.listdata, // 下拉更新数据存放数组
                // downdata: this.$store.downdata // 上拉更多的数据存放数组
            }
        },
        components:{
            FooterNav,
            'v-scroll': Scroll,
            recommendItem,
            recommendFooter
        },
        mounted(){
            this.getList()
        },
        methods: {
            getList(){
                Axios.get(
                    'http://192.168.43.64:3100/api/users'
                )
                .then((data)=>{
                    console.log(data,'data111');
                    // 提交mutation修改listdata
                    this.$store.commit('changeListData',data.data.data.list.slice(0,4));
                    // this.listdata = data.data.list.slice(0,4);
                    // this.listdata.forEach((item,index)=>{
                    //     item.isPlay = false;
                    // }) // 给每条数据加一个isPlay状态，控制音乐的播放和暂停
                    // console.log(this.listdata);
                    // this.$nextTick(() => { this.scroll = new Bscroll(this.$refs.wrapper, {}) }) 
                })
            },
            onRefresh(done) {
                    this.getList();
            
                    done() // call done
            
            },
            onInfinite(done) {
                Axios.get(
                    'http://192.168.43.64:3100/api/users'
                )
                .then((data) => {
                    let vm = this;
                    vm.counter++;
                    vm.pageEnd = vm.num * vm.counter;
                    vm.pageStart = vm.pageEnd - vm.num;
                    let arr = data.data.data.list;
                    let i = vm.pageStart;
                    let end = vm.pageEnd;
                    for(; i<end; i++){
                        console.log(i,'111')
                        let obj = arr[i];
                        // vm.downdata.push(obj);
                        this.$store.commit('changeDownData',obj);
                        console.log(vm.downdata,'1111')
                        console.log(vm.listdata,'111111111')
                        if((i + 1) >= data.data.data.list.length){
                            console.log(this.$el,'222')
                            this.$el.querySelector('.load-more').style.display = 'none';
                            return;
                        }
                    }
                    done() // call done
                }, (response) => {
                    console.log('error');
                });
            },
            ...mapMutations({
                setMPlayerScreen: 'setMPlayerScreen'
            })
        },
        computed: {
            clsName () {
                if(this.itemData.category === '微信'){
                    return 'red'
                }else if(this.itemData.category === '音乐'){
                    return 'yellow'
                }
            },
            middleContent(){
                let middleHtml = '';
                this.recommendList.forEach((item,index)=>{
                    console.log(item,'item')
                    if(item.type === '阅读'){
                    
                        middleHtml = `<div class="sign">
                                    <img src="../assets/img/riqian.png" />
                                </div>`
                    }else if(item.type === 'OWSPACE'){
                        middleHtml =  `<div class="category">
                                <div class="topic">
                                    <img src="../assets/img/img1.png" />
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
                            </div>`
                    }else if(item.type === '创意'){
                        middleHtml =  `<div class="banner">
                                <img src="../assets/img/img2.png" />
                                <p>持反对意见的两个人消失两天后再出现时就改投支持派正营了</p>
                                <recommend-footer></recommend-footer>
                            </div>`
                    }else if(item.type === '微信'){
                        middleHtml =  `<div class="category">
                            <div class="topic">
                                <img src="../assets/img/img1.png" />							
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
                        </div>`
                    }else if(item.type === '其他'){
                        middleHtml =  'yellow'
                    }
                })
                return middleHtml;
                
            },
            listdata(){
                console.log(this.$store.state.listdata,'sssssssssss')
                return this.$store.state.listdata // 下拉更新数据存放数组
            },
            downdata(){
                return this.$store.state.downdata // 上拉更多的数据存放数组
            }
            
        }
    }
</script>

