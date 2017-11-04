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
        <span class="fr" @touchstart="showPosition('bottom')">
            <i class="fa fa-link fa-rotate-90" aria-hidden="true"></i>
            {{this.itemData.type}}
        </span>
        <toast ref="w" v-model="showPositionValue" type="text" :time="1000" text="雾霾太大，连页面都看不到了" :position="position">{{ $t('Basic Usage') }}</toast>
    </div>
</template>
<script>

import {Toast} from 'vux'
export default {
    data() {
        return {
            position: 'default',
            showPositionValue: false
        }
    },
    props:['itemData','index','type'],
    components: {
        Toast
    },
    methods:{
        showPosition (position) {
            this.position = position
            this.showPositionValue = true
        }
    }
}
</script>



