<template>
  <div class="mine">
        <div class="name">
            企鹅
            <span class="tools">
                <i class="fa fa-user-plus" aria-hidden="true"></i>
                <i class="fa fa-cog fa-spin fa-fw"></i>
            </span>			 		
        </div>
        <div class="user">
            <div class="head-img">
                <img src="/static/img/head-portrait.png" />
            </div>
            <p class="attention">
                <span>0</span> 你关注 <em>/</em> <span>0</span> 关注你
            </p>
            <p class="nodec">暂无描述</p>
            <p class="phone">
                <i class="fa fa-tablet fr" aria-hidden="true"></i>
                <span></span>
            </p>			 		
        </div>
        <ul class="toolbar clearfix">
            <li>
                <i class="fa fa-heart-o" aria-hidden="true"></i>
                <span>收藏</span>
            </li>
            <li  @click="changePhotoShow">
                <i class="fa fa-picture-o" aria-hidden="true"></i>
                <span>相册</span>
            </li>
            <router-link tag="li" to="/Undefined">
                <i class="fa fa-envelope-open-o" aria-hidden="true"></i>
                <span>猫信</span>
            </router-link>
            <router-link tag="li" to="/Undefined">
                <i class="fa fa-bell-o" aria-hidden="true"></i>
                <span>提醒</span>
            </router-link>
        </ul>
        <div class="photo-box" v-if="photoShow">
            <i class="fa fa-chevron-left" aria-hidden="true" @click="changeState()">返回</i>
            <preview :list="list">
                    
            </preview>
        </div>
        <router-link class="mine-tool" tag="div" to="/Undefined">
            <i class="fa fa-align-left blue fl" aria-hidden="true"></i>
            <span class="fl">我关注的全部主题站</span>
            <b class="fl">3</b>
            <i class="fa fa-angle-right fr" aria-hidden="true"></i>
        </router-link>
        <div class="mine-tool"  @touchstart="show2=true">
            <i class="fa fa-shopping-cart fl" aria-hidden="true"></i>
            <span class="fl">我的订单</span>
            <i class="fa fa-angle-right fr" aria-hidden="true"></i>
        </div>               
        <div class="dynamic">
            <h2>你关注的朋友动态</h2>
            <div class="clearfix post">
                <div class="head_me fl">
                    <img src="/static/img/head-portrait.png" />
                </div>
                <div class="message fl" @click="show1=true">
                    <input type="text" placeholder="说点什么，发个猫贴吧" />
                    <i class="fa fa-pencil" aria-hidden="true"></i>
                </div>
                
            </div>
            <actionsheet v-model="show1" :menus="menu1" theme="android" @on-click-menu="click"></actionsheet>
            <div v-if="!this.$store.state.dynamicState.length" class="nomessage">
                <img src="/static/img/nomessage.png"/>
            </div>
            <div class="matter" v-for="item in this.$store.state.dynamicState">
                <div class="head_me fl">
                    <div class="head_me fl">
                        <img src="/static/img/head-portrait.png" />
                    </div>
                </div>
                <div class="fl attention-message">
                    <div class="clearfix">
                        <p class="fl">企鹅<span>赞了猫贴</span></p>
                        <em class="fr">2017.09.18 18:07</em>
                    </div>
                    <div class="transmit">
                        <div class="fl">
                            <img :src="item.src"/>
                        </div>
                        <p>{{item.img_title}}</p>
                    </div>
                    <div class="handel clearfix">
                        <i class="fa fa-thumbs-o-up" aria-hidden="true"></i>
                        <i class="fa fa-commenting-o" aria-hidden="true"></i>
                        <a href="javascript:;" class="fr">删除</a>
                    </div>
                </div>			 			
            </div>
        </div>	
        <div v-transfer-dom>
            <confirm v-model="show2"
            :title="$t('绑定手机号')"
            @on-cancel="onCancel"
            @on-confirm="onConfirm"
            @on-show="onShow"
            @on-hide="onHide">
                <p style="text-align:center;">{{ $t('进入商城需要先绑定手机号，是否绑定手机号？') }}</p>
            </confirm>
        </div> 
        <Footer-nav></Footer-nav>	 	
    </div>
</template>

<script>
    import { Confirm,TransferDomDirective as TransferDom ,Actionsheet} from 'vux'
    import FooterNav from '@/components/footer/footer'    
    import Preview from '@/components/preview/preview'
    export default {
        directives: {
            TransferDom
        },
        components:{
            FooterNav,
            Actionsheet,
            Confirm,
            Preview
        },
        data () {
            return {
                list:[
                    {
                        'src':'../../../static/img/1.jpg'
                    },
                    {
                        'src':'../../../static/img/2.jpeg'
                    },
                    {
                        'src':'../../../static/img/3.jpeg'
                    },
                    {
                        'src':'../../../static/img/4.jpeg'
                    },
                    {
                        'src':'../../../static/img/5.jpeg'
                    },
                    {
                        'src':'../../../static/img/6.jpeg'
                    },
                    {
                        'src':'../../../static/img/7.jpeg'
                    },
                    {
                        'src':'../../../static/img/8.jpeg'
                    },
                    {
                        'src':'../../../static/img/9.jpeg'
                    },
                    {
                        'src':'../../../static/img/10.jpeg'
                    },
                    {
                        'src':'../../../static/img/11.jpeg'
                    },
                    {
                        'src':'../../../static/img/12.jpeg'
                    }
                ],
                photoShow:false,
                show2: false,
                show1: false,
                menu1: {
                    menu1: '日签',
                    menu2: '海报',
                    menu3: '图文'
                }
            }
        },
        methods: {
            changePhotoShow(){
                this.photoShow = true;
            },
            changeState(){
                this.photoShow = false;
            },
            click (key) {
                console.log(key)
            },
            onCancel () {
            },
            onConfirm (msg) {
                if (msg) {
                }
            },
            onHide () {
            },
            onShow () {
            }
        }
    }
</script>

<style>
    .transmit p{
        line-height: 70px;
    }
    .nomessage{
        width: 100%;
        height: 540px;
        position: relative;
        background: #ffffff;
    }
    .nomessage img{
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -200px;
        margin-top: -205px;
    }
    .weui-dialog{        
        max-width: 1500px!important;
        width: 80%!important;
        height: 500px;        
    }
    .weui-dialog__hd,.weui-dialog__title{
        padding: 0 0.5em 0.5em!important;
        text-align: left!important;
        height: 150px;
        line-height: 180px;
        font-size: 60px!important;
    }
    .weui-dialog__bd,.weui-dialog__bd p{
        padding: 0.2em 0.5em 0.5em!important;
        text-align: left!important;
        height: 220px;
        line-height: 80px;
        font-size: 50px!important;
    }
    .weui-dialog__ft{
        height: 90px;
        font-size: 50px!important;
    }
    .weui-dialog__ft .weui-dialog__btn{
        float: right;
    }
    .dynamic .weui-actionsheet{
        width: 50%!important;        
    }
    .dynamic .weui-actionsheet .weui-actionsheet__cell{
        height: 120px;
        line-height: 120px;
        font-size: 50px;
        letter-spacing: 4px;
    }
    .photo-box{
        background: #181818;
        background-size: 100% 2208px;
        width: 100%;
        height: 2208px;
        overflow: auto;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 99;
    }
    .photo-box i{
        font-size: 50px;
        color: #ffffff;
        display: block;
        margin: 50px;
    }
    .photo-box img{
        width: 580px;
        height: 580px;
        border-radius: 0;
        margin: 15px;
    }
</style>
