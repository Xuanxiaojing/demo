<template>
  <div class="lataly-play" v-show="this.$store.state.latalyListShow">
        <h2 class="clearfix music-title">
            <i class="fl fa fa-chevron-left" aria-hidden="true"  @click="setLatalyListShow(false)"></i>
            <span class="fl">最近播放</span>
            <i class="fr fa fa-trash-o" aria-hidden="true"></i>
        </h2>
        <div class="play-box">
            <p class="clearfix play-all">
                <i class="fl fa fa-play-circle-o" aria-hidden="true"></i>
                <span class="fl">播放全部歌曲</span>
            </p>
            <ul class="music-list">
                <li v-for="item,index in this.$store.state.musicList" @click="selectSong(item,index)">
                    <h2>{{item.data[0].name}}</h2>
                    <p><span>{{item.data[0].singer[0].name}}</span>●来自主<em>不听歌会死</em>主题站</p>
                </li>
            </ul>					
        </div>
    </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'

export default {
  methods: {
    ...mapMutations({
        // 根据状态控制列表的显示和隐藏
        setLatalyListShow: 'setLatalyListShow'
    }),
    selectSong(item,index){
        this.$store.commit('setCurrentMusicIndex',index);          
    },
  }
}
</script>
<style>
    .lataly-play{
        position: absolute;
        top: 0;
        left: 0;
        z-index: 100;
    }
</style>

