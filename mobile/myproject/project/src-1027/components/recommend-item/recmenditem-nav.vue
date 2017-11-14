<template>
	<div class="nav">
		<ul class="clearfix" id = "navAs">
				<li v-for = "item,index in nav_data" :key = "index" :item = "item" :index = "index">
					<router-link 										
						:to="item.path"					
					>{{item.title}}</router-link>
				</li>
		</ul>
		 <div class="music" @click="setMPlayerScreen(true)"><img src="../assets/img/music.png" /></div>
	</div>
</template>
<script>
	//:class = "index===touchedIndex ? 'clickColor' : '' " 
import Axios from 'axios'	
import Jsonp from 'jsonp'
import Base64 from '@/assets/js/base64.js'

export default {
	props:["nav_data"]
}
</script>

<style>
	.nav li {
    float: left;
    padding: 0 2rem;
    height: 5.18518519rem;
	}	

	.nav .router-link-exact-active{
		color:#16a5af;
	}
</style>

