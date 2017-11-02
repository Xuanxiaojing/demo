<template>
	<div>
        <p class="transparency"></p>
        <p class="clearfix music-test">
            <!-- <span class="currentProgress" ref="currentProgress"  :style="{width:this.$store.state.progerssWidth}"></span> -->
            <!-- 不能在公共组件里设置样式，否则所有用到的地方都会有同样的样式，样式要交给“当前的”进度条 -->
            
            <i aria-hidden="true" @touchstart="play(index)" :class="playBtnCls" ref="playBtn"></i>
            <span class="currentProgress" ref="currentProgress" :style="{'width':progressWidth}"></span>
            <span  v-if="this.itemData.music">{{this.musicName}}</span>
            <em class="fr">
                {{timerFomart(musicDuration)}}
                <i class="fa fa-music" aria-hidden="true"></i>
            </em>
        </p>
        <!-- <audio src="" ref="audio" autoplay="autoplay" @canplay="musicCanPlay"  @timeupdate="musicTimeUpdate" preload @ended="musicEnded">
            
        </audio> -->
        <!-- audio音乐播放标签 -->
    </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
let n=0;
export default {
    data(){
        // playState:false
        return {
            isPlay:false, // 每个组件有一个
            listdata:[],
            downdata:[],
            musicLrcIndex:0,
            canDrag:false
        }
    },
	computed: {
		playBtnCls(){    
            // console.log(this.$store.state.isPlay,'this.itemData.isPlay')      
            if(this.itemData.isPlay ==false){
                return 'fa fa-play'
            }else{
                 return 'fa fa-pause'
            }        
        },
        musicDuration () {
            if(this.itemData.isPlay ==false){
                if(this.itemData.music){                    
                    return this.itemData.music[0].data[0].interval
                }
            }else{
                return this.getCurrentTime ? this.getCurrentTime : '00:00'
            }            
        },
        progressWidth(){
            console.log(this.itemData.isPlay,'this.itemData.isPlaythis.itemData.isPlay')
            if(this.itemData.isPlay ==false){
                return 0
            }else{
                return this.$store.state.progressDom.style.width
            }
        },
        musicName(){
            // 需要等音乐请求到并且写入listdata之后，再
            // console.log('我走这里了'+n+'次')
            // if(this.$store.state.musicLoadFinish){
                
                return this.itemData.music[0].data[0].name
            // }else{
            //     return '正在加载'
            // }
            
        },
        // 用mapGetters辅助函数，使用对象展开运算符将getter混入computed对象中
        ...mapGetters([
            'getCurrentTime'
        ])
        // 用mapGetters辅助函数，使用对象展开运算符将getter混入computed对象中
        // ...mapGetters([
        //     'getCurrentLyric'
        // ])
        // 出现的问题：一上来根据itemData计算musicName，当请求到音乐数据，修改state里的listdata时，这里不能响应到变化
    },
    props:['index','itemData','type'],
    methods:{
        // 点击播放按钮，执行这个函数，
        play(i){
            // this.$store.state.currentLyric.togglePlay()
            // this.$store.dispatch('sendAudio',this.$refs.audio);//在模板编译完成后把audio元素发送给action
            // this.$store.commit('sendPlayBtn',this.$refs.playBtn);
            this.$store.commit('sendProgressDom',this.$refs.currentProgress);
            // console.log(this.itemData.isPlay,'this.itemData.isPlay');
            /* this.$refs.playBtn.classList.remove('fa-pause')
            this.$refs.playBtn.classList.add('fa-play') */
            // 根据数据里对应的这条数据的isPlay状态判断
            this.$store.commit('currentListItemId',this.itemData.id);
            if ( this.itemData.isPlay ==false ){
                
                let id = this.itemData.music[0].data[0].id;
                // console.log(this.itemData.music[0],'this.itemData.isPlay');
                // 把当前要播放的歌曲的所有信息发送给公共的audio元素
                this.$store.commit('sendMusic',this.itemData.music[0]);
                // this.$store.commit('sendMusic',this.itemData.music[0].url[id]);
                this.$store.commit('play');
                // 告诉父级
                /* if(this.$store.state.currentLyric){
                
                    this.$store.state.currentLyric.play()
                    console.log('走到这里了播放')
                } */
                // this.$store.commit('changeListIsplay',{isPlay:true,index:i});
                this.$store.commit('changeListIsplay',{isPlay:true,index:this.itemData.id});
            }else{
                this.$store.commit('pause');
                // this.$store.commit('changeListIsplay',{isPlay:false,index:i});
                this.$store.commit('changeListIsplay',{isPlay:false,index:this.itemData.id});
            }
            // this.isPlay = !this.isPlay;
            // console.log(this.$store.state.listdata.length,'this.$store.state.listdata.length')
            // if(this.type === 'listdata'){ // 如果是一开始加载的listdata数组，就修改listdata数组里的数据的isPlay状态
            
            // 提交mutation修改listdata数据里的当前数据的isPlay属性
            // this.$store.commit('changeListIsplay',{isPlay:!this.itemData.isPlay,index:i});
            

            // this.$store.state.currentLyric.togglePlay()
            // }else{ // 如果是后来加载的downdata数组，就修改downdata数组里的数据的isPlay状态
                // this.$store.commit('changeDownIsplay',{isPlay:this.isPlay,index:i});
            // }          
            if(this.$store.state.currentLyric){                    
                this.$store.state.currentLyric.togglePlay()
            }
            // this.itemData.isPlay = !this.itemData.isPlay;            
        },
        timerFomart (time) {
            if (isNaN(time)) return '00:00'
                let min = time / 60 > 9 ? Math.floor(time / 60) : '0' + Math.floor(time / 60)
                let miao = time % 60 > 9 ? Math.floor(time % 60) : '0' + Math.floor(time % 60)
                return min + ':' + miao
        }
    }
}
</script>
<style>
    .music-test .currentProgress{
        width: 0;
        height: 100%;
        background: red;
        position: absolute;
        top: 0;
        left: 5.7rem;
        background-color:skyblue;
        z-index: -1;
    }
</style>



