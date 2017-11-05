<template>
  <div>
		<PubNav :nav_data = "nav_data"></PubNav>
	  <div class = "content">
			<section class="searchList">
				<ul id = 'movielist'>
					<MusiItem  v-for = "item,index in this.$store.state.AllMusicList " :key = "index" :item = "item" class = 'clearfix'>
						<h3>{{item.data[0].album.name}}</h3> 
						<div class="listMian books clearfix">
							<img :src = " 'https://y.gtimg.cn/music/photo_new/T002R300x300M000'+item.data[0].album.mid+'.jpg?max_age=2592000'" class = "fl"/>
							<div class = "fl text">
								<p class="smallT">歌曲：{{item.data[0].name}}</p> 
								<p class = "smallT">歌手：{{item.data[0].singer[0].title}}</p> 
								<p class = "desc">时间：{{item.data[0].album.time_public}}</p>
							</div>	          
						</div>
					</MusiItem>
				</ul>
			</section>  
   </div> 
		<Footer-nav></Footer-nav>
	</div>
</template>

<script>
	import Axios from 'axios'	
	import Jsonp from 'jsonp'
	import FooterNav from '@/components/footer'
	import MusiItem from '@/components/music-item'
	import PubNav from '@/components/pub-nav'
    export default {
			props:["nav_data"],
			components:{
				FooterNav,
				MusiItem,
				PubNav
			},
			mounted(){
				this.getdatalist()
			},
			methods:{
				getdatalist(){
					let _this = this;
					Axios.get(
							'http://localhost:3100/api/users'
					)
					.then((data)=>{
							// 提交mutation修改listdata，data.data.list是一个数组
							// let newData = data.data.list.slice(0,4).push()
							
							
							// if(_this.$store.state.listdata.length !==0&&i<4){
							// console.log(_this.$store.state.listdata,'llll')
							let d1 = data.data.data.list;
							_this.$store.commit('changeListData',d1)
							Jsonp('https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg?tpl=3&page=detail&date=2017-10-17&topid=4&type=top&song_begin=0&song_num=10',{
									param:'jsonpCallback'
							},function(err,data){
									
									// 这里获取的是排行榜的众多音乐,data.songlist是想要的列表（数组）
									// 转成数组，循环数组，分别拿到每首歌曲的详细信息
									
									// _this.$store.commit('setAllMusicList',data); // 把拿到的每首歌曲的信息存放到公共的AllMusicList数组里 
									data.songlist.forEach(function(item){
											// console.log(item.data.songmid,'songmid')
											Jsonp(`https://c.y.qq.com/v8/fcg-bin/fcg_play_single_song.fcg?songmid=${item.data.songmid}&tpl=yqq_song_detail&format=jsonp`,{
													// param:'getOneSongInfoCallback'
											},function(err,data){
													// 这里获取的data是单个歌曲的数据，包括url和id
													
													_this.$store.commit('setAllMusicList',data); // 把拿到的每首歌曲的信息存放到公共的AllMusicList数组里
										
											})
									})                                                
							})      
					})
				}
			}
    }
</script>
