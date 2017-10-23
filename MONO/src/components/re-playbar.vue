<template>
	<div>
        <p class="transparency"></p>
        <p class="clearfix music-test">
            <!-- <span class="currentProgress" ref="currentProgress"  :style="{width:this.$store.state.progerssWidth}"></span> -->
            <!-- 不能在公共组件里设置样式，否则所有用到的地方都会有同样的样式，样式要交给“当前的”进度条 -->
            <span class="currentProgress" ref="currentProgress"></span>
            <i aria-hidden="true" @click="play(index)" :class="playBtnCls" ref="playBtn"></i>
            <span  v-if="this.itemData.music">{{this.musicName}}</span>
            <em class="fr">
                {{timerFomart(musicDuration)}}
                <i class="fa fa-music" aria-hidden="true"></i>
            </em>
        </p>
        <audio src="" ref="audio" autoplay="autoplay" @canplay="musicCanPlay"  @timeupdate="musicTimeUpdate" preload >
            <!-- <source src="" type="audio/mpeg"> -->
        </audio>
        <!-- audio音乐播放标签 -->
    </div>
</template>
<script>
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
            console.log(this.$store.state.btnDom.className,'ccccccc')    
            // if(this.isPlay===true){
            //     return 'fa fa-pause'
            // }else {
            //     return 'fa fa-play'
            // }
            // if(!this.$store.state.btnDom.className){
            //     return 'fa fa-play'
            // }else{
            //     console.log('走这里了')
                // return this.$store.state.btnDom.className
            // }    
            if(this.itemData.isPlay ==false){
                return 'fa fa-play'
            }else{
                 return 'fa fa-pause'
            }        
        },
        // 进度条的宽度
        progressWidth () {
            // console.log(this.$store.getters.getIsLoadStart,'gggggggg')
            // if (this.$store.getters.getIsLoadStart) {
            //     return {
            //         'width': '0'
            //     }
            // } else {
                // console.log((this.$store.getters.getCurrentTime / this.$store.getters.getMusicDuration * 100).toFixed(2),'nnnnnnnnnnnn')
                // return {
                //     'width': `calc(${(this.$store.getters.getCurrentTime / this.$store.getters.getMusicDuration * 100).toFixed(2)}%`
                // }
            // }                
        },
        musicDuration () {
            return this.$store.getters.getMusicDuration ? this.$store.getters.getMusicDuration : '00:00'
        },
        musicName(){
            // 需要等音乐请求到并且写入listdata之后，再
            // console.log('我走这里了'+n+'次')
            // if(this.$store.state.musicLoadFinish){
                console.log(this.itemData.music,'this.itemData')
                return this.itemData.music[0].data[0].name
            // }else{
            //     return '正在加载'
            // }
            
        }
        // 出现的问题：一上来根据itemData计算musicName，当请求到音乐数据，修改state里的listdata时，这里不能响应到变化
    },
    mounted(){
        // console.log(this.$refs.audio,'this.$refs.audio');
        this.$store.dispatch('sendAudio',this.$refs.audio);//在模板编译完成后把audio元素发送给action
        // console.log(this.itemData.music.data[0].name,'iiiiiiiii')
    },
    props:['index','itemData','type'],
    methods:{
        // 点击播放按钮，执行这个函数，
        play(i){
                    
            this.$store.dispatch('sendAudio',this.$refs.audio);//在模板编译完成后把audio元素发送给action
            this.$store.commit('sendPlayBtn',this.$refs.playBtn);
            this.$store.commit('sendProgressDom',this.$refs.currentProgress);
            
            if ( this.itemData.isPlay ==false ){ 
                console.log(this.itemData.music)
                let id = this.itemData.music[0].data[0].id;
                // 把当前要播放的歌曲的所有信息发送给公共的audio元素
                this.$store.commit('sendMusic',this.itemData.music[0]);
                // this.$store.commit('sendMusic',this.itemData.music[0].url[id]);
                this.$store.commit('play');
            }else{
                this.$store.commit('pause');
            }
            this.isPlay = !this.isPlay;
            // console.log(this.$store.state.listdata.length,'this.$store.state.listdata.length')
            // if(this.type === 'listdata'){ // 如果是一开始加载的listdata数组，就修改listdata数组里的数据的isPlay状态
                this.$store.commit('changeListIsplay',{isPlay:this.isPlay,index:i});
            // }else{ // 如果是后来加载的downdata数组，就修改downdata数组里的数据的isPlay状态
                // this.$store.commit('changeDownIsplay',{isPlay:this.isPlay,index:i});
            // }          
            
            // this.itemData.isPlay = !this.itemData.isPlay;            
        },
        // 音乐播放
        musicCanPlay () {
            
            this.$store.dispatch({
                type: 'set_MusicDuration',
                duration: Math.floor(this.$refs.audio.duration)
            })
            /* this.$store.commit({
                type: 'setMusicLoadStart',
                isloadstart: false
            }) */
        },
        // 音乐播放时间更新事件
        musicTimeUpdate () {
            console.log('触发')
            this.$store.dispatch({
                type: 'set_CurrentTime',
                time: Math.floor(this.$refs.audio.currentTime)
                // time: Math.floor(this.$store.state.dom.currentTime)
            })   
            this.$store.commit('setProgressWidth');
            this.$store.state.progressDom.style.width = this.$store.getters.getProgerssWidth;
            
            // this.$store.state.progressDom.style.width = `calc(${(this.$store.getters.getCurrentTime / this.$store.getters.getMusicDuration * 100).toFixed(2)}%)`; 
            // 设置歌词内容(以索引的形式显示,主要是)
            /* console.log(this.$store.getters.getCurrentMusic,'this.$store.getters.getCurrentMusic')
            let musicLrc = this.$store.getters.getCurrentMusic.lyric
            let currentTime = Math.floor(this.$refs.audio.currentTime)
            if (musicLrc[this.musicLrcIndex] === undefined) return
            if (musicLrc.length === 0) {
                this.$store.commit({
                type: 'setLyricIndex',
                index: -1
                })
                return
            }
            for (let i = 0; i < musicLrc.length; i++) {
                if (currentTime >= Number(musicLrc[this.musicLrcIndex].timeId)) {
                    this.musicLrcIndex += 1
                    // return
                    break
                } else {
                    if (this.musicLrcIndex <= 0) {
                    this.musicLrcIndex = 0
                    } else {
                    this.musicLrcIndex--
                    }
                }
            }
            this.$store.commit({
                type: 'setLyricIndex',
                index: this.musicLrcIndex
            }) */
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
        left: 0;
        background-color:skyblue;
        z-index: -1;
    }
</style>



