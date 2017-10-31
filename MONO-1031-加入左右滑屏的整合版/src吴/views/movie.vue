<template>
	<div>
		<PubNav :nav_data = "nav_data"></PubNav>
    <div class = "content">
			<section class="searchList">
				<ul id = 'movielist'>
					<MovieItem v-for = "item,index in this.$store.state.navData.subjects" :key="index" :item = "item"></MovieItem> 
				</ul>
			</section>  
		</div>         
    <Footer-nav></Footer-nav>
	</div>
</template>

<script>		
	import Jsonp from 'jsonp'
	import FooterNav from '@/components/footer'
	import PubNav from '@/components/pub-nav'
	import MovieItem from '@/components/movie-item'
	export default {
			props:["nav_data"],
			components:{
					FooterNav,
					PubNav,
					MovieItem
			},
			mounted(){
				this.getMovieData()
			},
			methods:{
					getMovieData(){
						let _this = this;
						console.log("dianying")
						Jsonp(`https://api.douban.com/v2/movie/in_theaters`,{
							//param:'jsonpCallback'				
							},function(err,data){
								console.log(data)
								_this.$store.commit("changeNavData",data);
						})
					}
			}
	}
</script>

