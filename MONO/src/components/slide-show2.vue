<template>
  <div class="slideshow">
	<wc-swiper :duration="900" :interval="2000">
		<wc-slide v-for="(slide, key) in list" :key="key">
			
		</wc-slide>
	</wc-swiper>
	</div>
</template>
<script>
/* import wcSwiper from 'wc-swiper'
import 'wc-swiper/style.css'
Vue.use(wcSwiper); */
let data = [
	{
		image: "../../static/img/1.png"
	},
	{
		image: "../../static/img/2.png"
	},
	{
		image: "../../static/img/3.png"
	},
	{
		image: "../../static/img/4.png"
	},
	{
		image: "../../static/img/5.png"
	}
]

export default {
	data () {
		return {
			list:data
		}
	},
	mounted(){
		this.autoPlay();
		list = this.$refs.list;
		console.log(list)
		imgs = list.getElementsByTagName('img');
		spans = this.$refs.spans;
		console.log(imgs,'imgs')
		iW = imgs[0].hasAttribute("width");
		console.log(imgs[0])
	}
}
</script>



