<template>
    <div>
        <ul class="function clearfix">
            <li class="fl fa fa-share-square-o" aria-hidden="true" @click="show7=true">                             
            </li>
            <li @touchstart="collect()" :class="['fa','fa-heart-o',{'red':itemData.actionBar.isCollect}]" aria-hidden="true"></li>
            <li @touchstart="liked()" :class="['fa','fa-thumbs-o-up',{'blue':itemData.actionBar.thumbsUp}]" aria-hidden="true">
                <span>{{itemData.actionBar.fabulous}}</span>
            </li>
            <li class="fa fa-commenting-o" aria-hidden="true" @click="showPosition('bottom')">
                <span>{{itemData.actionBar.comment}}</span>
            </li>
            <li class="fa fa-ellipsis-h fr lastone" aria-hidden="true" @click="showPosition('bottom')"></li>
        </ul>
        <actionsheet v-model="show7" :menus="menu7" theme="android" @on-click-menu="click"></actionsheet>
        <toast ref="w" v-model="showPositionValue" type="text" :time="800" text="师傅，数据被妖怪抓走了" :position="position">{{ $t('Basic Usage') }}</toast>
    </div>
    
</template>
<script>
    import {Actionsheet,Toast} from 'vux'
    export default {
        components: {
            Actionsheet,
            Toast
        },
        data() {
            return {
                isChecked: false,
                isThumbsUp: false,
                show7: false,
                menu7: {
                    menu1: this.$t('朋友圈'),
                    menu2: this.$t('微信'),
                    menu3: this.$t('QQ/空间'),
                    menu4: this.$t('新浪微博'),
                    menu5: this.$t('复制链接'),
                    menu6: this.$t('更多分享'),
                },
                position: 'default',
                showPositionValue: false
            }
        },
        props: ['itemData', 'index', 'type'],
        methods: {
            showPosition (position) {
                this.position = position
                this.showPositionValue = true
            },
            click () { //
            },
            liked() {
                // console.log(this.itemData)
                this.$store.commit('changeHeartState', this.itemData)
                if (this.$store.state.SecondData) {
                    this.$store.commit('changeHeartStateSecond', this.$store.state.ActionBarId)
                }
            },
            collect() {
                this.$store.commit('changeCollectState', this.itemData)
                if (this.$store.state.SecondData) {
                    this.$store.commit('changeCollectStateSecond', this.$store.state.CollectId)
                }
            }
        }
    }
</script>

<style>
    .function .red {
        color: #d95f57;
    }

    .function .blue {
        color: #a1dfe4;
    }
    .content .weui-mask_transparent{
        background: rgba(0, 0, 0, 0.8);
    }
    .content .weui-actionsheet__menu,.content .weui-actionsheet{
        width: 1242px;
        left: 10%!important;
    }
    .content .weui-actionsheet__menu div{        
        float: left;
        width: 33.33%;
        height: 300px;
        line-height: 400px;
        font-size: 50px;
        letter-spacing: 4px;
        color: #ffffff;
        text-align: center;
    }
    .content .weui-actionsheet__cell:before{
        border-top: 0;
    }
    .content .weui-actionsheet__menu div:nth-child(1){
         background: url("../../../static/img/circleOfFriends.png") no-repeat center 0; 
    }
    .content .weui-actionsheet__menu div:nth-child(2){
         background: url("../../../static/img/WeChat.png") no-repeat center 0; 
    }
    .content .weui-actionsheet__menu div:nth-child(3){
         background: url("../../../static/img/QQ-Zone.png") no-repeat center 0; 
    }
    .content .weui-actionsheet__menu div:nth-child(4){
         background: url("../../../static/img/sinamicro-blog.png") no-repeat center 0; 
    }
    .content .weui-actionsheet__menu div:nth-child(5){
         background: url("../../../static/img/Copy-link.png") no-repeat center 0; 
    }
    .content .weui-actionsheet__menu div:nth-child(6){
         background: url("../../../static/img/More-share.png") no-repeat center 0; 
    }
</style>


