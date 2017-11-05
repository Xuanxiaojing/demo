<template>
	<div>
		<!-- <PubNav :nav_data = "nav_data"></PubNav> -->
    <div class = "search-content">
			<div>
				<section class="searchList">
					<ul id = 'movielist'>
						 <search-item 
							v-for = "item,index in this.$store.state.navData" 
							:key = "index" 
							:item = "item" :index = "index">								
						</search-item>  
					</ul>
				</section>  
			</div> 
		</div>
		<Footer-nav></Footer-nav> 
	</div>
</template>

<script>
    import Axios from 'axios'
		import FooterNav from '@/components/footer/footer'
		import PubNav from '@/views/recommend/pub-nav/pub-nav'
		import SearchItem from '@/views/recommend/search/search-item'
		import api from '@/api/api.js' // 请求数据的文件
		import Jsonp from 'jsonp'
    export default {
			// props:["nav_data"],
      components:{
          FooterNav,
          PubNav,
          SearchItem
      },
      mounted(){
				let _this = this;
				setTimeout(function() {
					_this.getSearchData()
				});
},
      methods:{
        getSearchData(){
					//消声克的救赎
					if(this.$store.state.searchVal === ""){
						this.$store.state.searchVal = "消声克的救赎";
					}
					let currentSearchVal = this.$store.state.searchVal;	
					let _this = this;
					
					Jsonp(`https://api.douban.com/v2/book/search?q=${currentSearchVal}&start=0&count=15`,{
							//param:'jsonpCallback'
					},function(err,data){
						_this.$store.commit("changeNavData",data.books)
					})
        }
      }
    }
</script>
<style>
	.search-content{
		padding:0;
	}
</style>
