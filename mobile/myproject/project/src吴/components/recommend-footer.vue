<template>
	<ul class="function clearfix">
        <li class="fa fa-share-square-o" aria-hidden="true"></li>
        <li class="fa fa-heart-o" aria-hidden="true"></li>							
        <li class="fa fa-thumbs-o-up" aria-hidden="true">
            <span>{{this.itemData.actionBar.fabulous}}</span>
        </li>					
        <li class="fa fa-commenting-o" aria-hidden="true">
            <span>{{this.itemData.actionBar.comment}}</span>
        </li>	
        <li class="fa fa-ellipsis-h fr lastone" aria-hidden="true"></li>					
    </ul>
</template>
<script>


export default {
    props:['itemData','index','type'],
    methods:{
        // testFn(){
        //     console.log(this.itemData,this.itemData.type,this.itemData.actionBar.fabulous)
        // }
    }
}
</script>



