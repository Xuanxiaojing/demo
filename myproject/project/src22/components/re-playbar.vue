<template>
	<div>
        <p class="transparency"></p>
        <p class="clearfix music-test">
            <i aria-hidden="true" @click="play" :class="playBtnCls"></i>
            <span>hellohellohello</span>
            <em class="fr">
                03:47
                <i class="fa fa-music" aria-hidden="true"></i>
            </em>
        </p>
        <audio src="" ref="audio" autoplay="autoplay"></audio>
        <!-- audio音乐播放标签 -->
    </div>
</template>
<script>

export default {
    data(){
        // playState:false
        return {
            isPlay:false
        }
    },
	computed: {
		playBtnCls(){
            if(this.isPlay===true){
                return 'fa fa-pause'
            }else {
                return 'fa fa-play'
            }
        }
    },
    mounted(){
        console.log(this.$refs.audio,'this.$refs.audio')
        this.$store.dispatch('sendAudio',this.$refs.audio);//在模板编译完成后把audio元素发送给action
        /* Axios.get("../json/recommend-music.json").then(res => {//请求推荐列表数据
            this.$sotre.commit('changeMusicList',res.body.data);
        },error =>{
            console.log(error);
        }); */
    },
    props:['index','itemData'],
    methods:{
        // 点击播放按钮，执行这个函数，
        play(){
            // this.$store.dispatch('play'); // 分发play类型的action
            // this.$emit('playFn'); 
            this.isPlay = !this.isPlay;
            // this.$refs.audio.src="http://ws.stream.qqmusic.qq.com/"+state.musicList[state.musicPlace].songid+".m4a?fromtag=46";
            this.$refs.audio.src=this.itemData.music;
            this.$refs.audio.play();
        }
    }
}
</script>



