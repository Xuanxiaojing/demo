<template>
  <!-- <li class = 'clearfix'>
    <h3>{{item.data[0].album.name}}</h3> 
    <div class="listMian books clearfix">
      <img :src = " 'https://y.gtimg.cn/music/photo_new/T002R300x300M000'+item.data[0].album.mid+'.jpg?max_age=2592000'" class = "fl"/>
      <div class = "fl text">
          <p class="smallT">歌曲：{{item.data[0].name}}</p> 
          <p class = "smallT">歌手：{{item.data[0].singer[0].title}}</p> 
          <p class = "desc">时间：{{item.data[0].album.time_public}}</p>
      </div>	          
    </div>
  </li> -->  
</template>
<script>
import rePlayBar from '@/views/musicPlayer/re-playbar'
import Preview from '@/components/preview/preview'  // 图片预览效果

  export default {
    props:["item"],
    components: {
      rePlayBar,
      Preview
    }
  }

</script>
<style scope>
</style>

