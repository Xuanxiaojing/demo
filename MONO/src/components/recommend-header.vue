<template>
	<div class="clearfix creater">
        <img class="fl" :src="this.itemData.sub_img" />
        <h2 class="fl">{{this.itemData.column}}</h2>
        <span class="fr">
            <i class="fa fa-link fa-rotate-90" aria-hidden="true"></i>
            {{this.itemData.type}}
        </span>
    </div>
</template>
<script>


export default {
	props:['itemData','index','type']
}
</script>
