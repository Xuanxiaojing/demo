<template>
	<div>
		<PubNav :nav_data="nav_data"></PubNav>
		<div class="content">
			<section class="searchList">
				<ul id='movielist'>
					<MusiItem v-for="item,index in this.$store.state.AllMusicList " :key="index" :item="item" class='clearfix'>
						<h3>{{item.data[0].album.name}}</h3>
						<div class="listMian books clearfix">
							<img :src=" 'https://y.gtimg.cn/music/photo_new/T002R300x300M000'+item.data[0].album.mid+'.jpg?max_age=2592000'" class="fl" />
							<div class="fl text">
								<p class="smallT">歌曲：{{item.data[0].name}}</p>
								<p class="smallT">歌手：{{item.data[0].singer[0].title}}</p>
								<p class="desc">时间：{{item.data[0].album.time_public}}</p>
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
import MusiItem from '@/views/recommend/music/music-item'
import FooterNav from '@/components/footer/footer'
import PubNav from '@/views/recommend/pub-nav/pub-nav'

import api from '@/api/api.js' // 请求数据的文件

export default {
	props: ["nav_data"],
	components: {
		FooterNav,
		MusiItem,
		PubNav
	},
	mounted() {
		this.getdatalist()
	},
	methods: {	
		getdatalist() {
			if (this.$store.state.listdata.length !== 0) return
			api.getListData().then((data) => {
				let d1 = data.data.data.list;
				this.$store.commit('changeListData', d1)
				api.getAllMusicListData(this.getAllMusicListDataCallBack.bind(this))
			})
		},
		getAllMusicListDataCallBack(err, data) {
			// 这里获取的是排行榜的众多音乐,data.songlist是想要的列表（数组）
			// 转成数组，循环数组，分别拿到每首歌曲的详细信息
			// let arr = []
			// _this.$store.commit('setAllMusicList',data); // 把拿到的每首歌曲的信息存放到公共的AllMusicList数组里 
			// let _this = this;
			console.log(this, 'this')
			let _this = this;
			data.songlist.forEach(function(item) {
				console.log(_this, 'this')
				api.getOneSongData(item.data.songmid, _this.getOneSongDataCallBack)
				// console.log(item.data.songmid,'songmid')
			})
		},
		getOneSongDataCallBack(err, data) {
			// 这里获取的data是单个歌曲的数据，包括url和id

			// let id = data.data[0].id; // 在每首歌曲的详细信息里可以拿到该歌曲的id，通过id拿歌曲地址和歌词

			// let d2 = data; // 每首歌的信息是一个对象，存一下
			this.$store.commit('setAllMusicList', data); // 把拿到的每首歌曲的信息存放到公共的AllMusicList数组里
			console.log('我请求道首页歌曲数据了')
		}

	}
}
</script>
