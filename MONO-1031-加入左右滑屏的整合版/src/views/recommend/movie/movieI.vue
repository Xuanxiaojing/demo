<template>
    <div>
        <MovieItem v-for="item,index in this.$store.state.navData.subjects" :key="index" :item="item"></MovieItem>                                
    </div>
</template>

<script>		
import Jsonp from 'jsonp'
import MovieItem from '@/views/recommend/movie/movie-item'
export default {
    // props: ["nav_data"],
    components: {
        // FooterNav,
        // PubNav,
        MovieItem
    },
    mounted() {
        this.getMovieData()
    },
    methods: {
        getMovieData() {
            let _this = this;
            Jsonp(`https://api.douban.com/v2/movie/in_theaters`, {
                //param:'jsonpCallback'				
            }, function(err, data) {
                console.log(data)
                _this.$store.commit("changeNavData", data);
            })
        }
    }
}
</script>

