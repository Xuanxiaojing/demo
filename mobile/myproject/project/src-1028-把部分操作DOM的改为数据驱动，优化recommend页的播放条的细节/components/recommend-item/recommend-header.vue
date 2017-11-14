<template>
	<div class="clearfix creater">
        <router-link 
            tag="img" 
            class="fl" 
            :src="this.itemData.sub_img" 
            :to="{path: '/Secondpage/' + this.itemData.id}"            
        ></router-link>
        <router-link tag="h2" class="fl" :to="{path: '/Secondpage/' + this.itemData.id}">
            {{this.itemData.column}}
        </router-link>
        <span class="fr">
            <i class="fa fa-link fa-rotate-90" aria-hidden="true"></i>
            {{this.itemData.type}}
        </span>
    </div>
</template>
<script>


export default {
    props:['itemData','index','type'],
    computed:{
        
    },
    methods:{
        // getItenData(){            
        //     this.$store.commit('recordItemData',this.itemData)
        // }
    }
}
</script>



