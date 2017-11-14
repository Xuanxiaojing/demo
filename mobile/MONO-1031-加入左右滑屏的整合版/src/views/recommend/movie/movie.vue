<template>
    <div :style="{'width': pinWidth+'px','overflow': 'hidden','float': 'left','background':'#fff'}">
        <div style="width: 100%;height: 500px;line-height: 500px;text-align: center;">
			<MovieI></MovieI>
		</div>
    </div>
</template>

<script>		
import MovieI from './movieI'
export default {
    data(){
        return{
            pinWidth: window.innerWidth
        }
    },
    components:{
        MovieI
    }
}
</script>

<style>
    .movie-page{
		width: 1242px;
		overflow: hidden;
		float: left;
	}
</style>
