<template>
	<ul class="function clearfix">
        <li class="fa fa-share-square-o" aria-hidden="true"></li>
        <li
            @touchstart="collect()"
            :class="['fa','fa-heart-o',{'red':itemData.actionBar.isCollect}]" 
            aria-hidden="true"
        ></li>						
        <li 
            @touchstart="liked()"
            :class="['fa','fa-thumbs-o-up',{'blue':itemData.actionBar.thumbsUp}]" 
            aria-hidden="true"
        >
            <span>{{itemData.actionBar.fabulous}}</span> 
        </li>					
        <li class="fa fa-commenting-o" aria-hidden="true">
            <span>{{itemData.actionBar.comment}}</span>
        </li>	
        <li class="fa fa-ellipsis-h fr lastone" aria-hidden="true"></li>					
    </ul>
</template>
<script>


export default {
    data(){
        return{
            isChecked: false,
            isThumbsUp: false
        }
    },
    props:['itemData','index','type'],
    computed:{
    },
    methods:{
        liked(){
            // console.log(this.itemData)
            this.$store.commit('changeHeartState',this.itemData) 
            if(this.$store.state.SecondData){
                this.$store.commit('changeHeartStateSecond',this.$store.state.ActionBarId)
            }        
        },
        collect(){
            this.$store.commit('changeCollectState',this.itemData) 
            if(this.$store.state.SecondData){
                this.$store.commit('changeCollectStateSecond',this.$store.state.CollectId)
            }
        }
    }
}
</script>

<style>
    .function .red{
        color: #d95f57;
    }
    .function .blue{
        color: #a1dfe4;
    }
</style>


